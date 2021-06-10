import { EventEmitter, ElementRef, Renderer2, NgZone, ChangeDetectorRef, Input, ContentChild, ViewChild, Component, NgModule } from '@angular/core';
import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { ConfirmationService, Footer, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}', style({ transform: 'none', opacity: 1 }))
]);
const hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);
let ConfirmDialog = class ConfirmDialog {
    constructor(el, renderer, confirmationService, zone, cd) {
        this.el = el;
        this.renderer = renderer;
        this.confirmationService = confirmationService;
        this.zone = zone;
        this.cd = cd;
        this.acceptIcon = 'pi pi-check';
        this.acceptLabel = 'Yes';
        this.acceptVisible = true;
        this.rejectIcon = 'pi pi-times';
        this.rejectLabel = 'No';
        this.rejectVisible = true;
        this.closeOnEscape = true;
        this.blockScroll = true;
        this.closable = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
        this.focusTrap = true;
        this._position = "center";
        this.transformOptions = "scale(0.7)";
        this.subscription = this.confirmationService.requireConfirmation$.subscribe(confirmation => {
            if (confirmation.key === this.key) {
                this.confirmation = confirmation;
                this.message = this.confirmation.message || this.message;
                this.icon = this.confirmation.icon || this.icon;
                this.header = this.confirmation.header || this.header;
                this.rejectVisible = this.confirmation.rejectVisible == null ? this.rejectVisible : this.confirmation.rejectVisible;
                this.acceptVisible = this.confirmation.acceptVisible == null ? this.acceptVisible : this.confirmation.acceptVisible;
                this.acceptLabel = this.confirmation.acceptLabel || this.acceptLabel;
                this.rejectLabel = this.confirmation.rejectLabel || this.rejectLabel;
                if (this.confirmation.accept) {
                    this.confirmation.acceptEvent = new EventEmitter();
                    this.confirmation.acceptEvent.subscribe(this.confirmation.accept);
                }
                if (this.confirmation.reject) {
                    this.confirmation.rejectEvent = new EventEmitter();
                    this.confirmation.rejectEvent.subscribe(this.confirmation.reject);
                }
                if (this.confirmation.blockScroll === false || this.confirmation.blockScroll === true) {
                    this.blockScroll = this.confirmation.blockScroll;
                }
                this.visible = true;
            }
        });
    }
    get visible() {
        return this._visible;
    }
    set visible(value) {
        this._visible = value;
        if (this._visible && !this.maskVisible) {
            this.maskVisible = true;
        }
    }
    get position() {
        return this._position;
    }
    ;
    set position(value) {
        this._position = value;
        switch (value) {
            case 'topleft':
            case 'bottomleft':
            case 'left':
                this.transformOptions = "translate3d(-100%, 0px, 0px)";
                break;
            case 'topright':
            case 'bottomright':
            case 'right':
                this.transformOptions = "translate3d(100%, 0px, 0px)";
                break;
            case 'bottom':
                this.transformOptions = "translate3d(0px, 100%, 0px)";
                break;
            case 'top':
                this.transformOptions = "translate3d(0px, -100%, 0px)";
                break;
            default:
                this.transformOptions = "scale(0.7)";
                break;
        }
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container.parentElement;
                this.contentContainer = DomHandler.findSingle(this.container, '.ui-dialog-content');
                if (this.acceptVisible || this.rejectVisible) {
                    DomHandler.findSingle(this.container, 'button').focus();
                }
                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();
                this.enableModality();
                break;
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                this.onOverlayHide();
                break;
        }
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }
    restoreAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }
    enableModality() {
        if (this.blockScroll) {
            DomHandler.addClass(document.body, 'ui-overflow-hidden');
        }
    }
    disableModality() {
        this.maskVisible = false;
        if (this.blockScroll) {
            DomHandler.removeClass(document.body, 'ui-overflow-hidden');
        }
        this.cd.detectChanges();
    }
    close(event) {
        if (this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }
        this.hide();
        event.preventDefault();
    }
    hide() {
        this.visible = false;
    }
    moveOnTop() {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
            this.wrapper.style.zIndex = String(this.baseZIndex + (DomHandler.zindex - 1));
        }
    }
    getWrapperClass() {
        let wrapperClass = { 'ui-widget-overlay ui-dialog-mask': true, 'ui-dialog-mask-scrollblocker': this.blockScroll };
        wrapperClass[this.getPositionClass().toString()] = true;
        return wrapperClass;
    }
    getPositionClass() {
        const positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
        const pos = positions.find(item => item === this.position);
        return pos ? `ui-dialog-${pos}` : '';
    }
    bindGlobalListeners() {
        if ((this.closeOnEscape && this.closable) || this.focusTrap && !this.documentEscapeListener) {
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) => {
                if (event.which == 27 && (this.closeOnEscape && this.closable)) {
                    if (parseInt(this.container.style.zIndex) === (DomHandler.zindex + this.baseZIndex) && this.visible) {
                        this.close(event);
                    }
                }
                if (event.which === 9 && this.focusTrap) {
                    event.preventDefault();
                    let focusableElements = DomHandler.getFocusableElements(this.container);
                    if (focusableElements && focusableElements.length > 0) {
                        if (!document.activeElement) {
                            focusableElements[0].focus();
                        }
                        else {
                            let focusedIndex = focusableElements.indexOf(document.activeElement);
                            if (event.shiftKey) {
                                if (focusedIndex == -1 || focusedIndex === 0)
                                    focusableElements[focusableElements.length - 1].focus();
                                else
                                    focusableElements[focusedIndex - 1].focus();
                            }
                            else {
                                if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                                    focusableElements[0].focus();
                                else
                                    focusableElements[focusedIndex + 1].focus();
                            }
                        }
                    }
                }
            });
        }
    }
    unbindGlobalListeners() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }
    onOverlayHide() {
        this.disableModality();
        this.unbindGlobalListeners();
        this.container = null;
    }
    ngOnDestroy() {
        this.restoreAppend();
        this.onOverlayHide();
        this.subscription.unsubscribe();
    }
    accept() {
        if (this.confirmation.acceptEvent) {
            this.confirmation.acceptEvent.emit();
        }
        this.hide();
        this.confirmation = null;
    }
    reject() {
        if (this.confirmation.rejectEvent) {
            this.confirmation.rejectEvent.emit();
        }
        this.hide();
        this.confirmation = null;
    }
};
ConfirmDialog.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ConfirmationService },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], ConfirmDialog.prototype, "header", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "icon", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "message", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "style", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "styleClass", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "acceptIcon", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "acceptLabel", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "acceptVisible", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "rejectIcon", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "rejectLabel", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "rejectVisible", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "acceptButtonStyleClass", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "rejectButtonStyleClass", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "closeOnEscape", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "blockScroll", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "rtl", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "closable", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "appendTo", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "key", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "transitionOptions", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "focusTrap", void 0);
__decorate([
    Input()
], ConfirmDialog.prototype, "visible", null);
__decorate([
    Input()
], ConfirmDialog.prototype, "position", null);
__decorate([
    ContentChild(Footer, { static: true })
], ConfirmDialog.prototype, "footer", void 0);
__decorate([
    ViewChild('content', { static: true })
], ConfirmDialog.prototype, "contentViewChild", void 0);
ConfirmDialog = __decorate([
    Component({
        selector: 'p-confirmDialog',
        template: `
        <div class="ui-dialog-wrapper" [ngClass]="getWrapperClass()" *ngIf="maskVisible">
            <div [ngClass]="{'ui-dialog ui-confirmdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl}" [ngStyle]="style" [class]="styleClass" (mousedown)="moveOnTop()"
                [@animation]="{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}" (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" *ngIf="visible">
                <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top">
                    <span class="ui-dialog-title" *ngIf="header">{{header}}</span>
                    <div class="ui-dialog-titlebar-icons">
                        <a *ngIf="closable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}" tabindex="0" role="button" (click)="close($event)" (keydown.enter)="close($event)">
                            <span class="pi pi-times"></span>
                        </a>
                    </div>
                </div>
                <div #content class="ui-dialog-content ui-widget-content">
                    <i [ngClass]="'ui-confirmdialog-icon'" [class]="icon" *ngIf="icon"></i>
                    <span class="ui-confirmdialog-message" [innerHTML]="message"></span>
                </div>
                <div class="ui-dialog-footer ui-widget-content" *ngIf="footer">
                    <ng-content select="p-footer"></ng-content>
                </div>
                <div class="ui-dialog-footer ui-widget-content" *ngIf="!footer">
                    <button type="button" pButton [icon]="acceptIcon" [label]="acceptLabel" (click)="accept()" [class]="acceptButtonStyleClass" *ngIf="acceptVisible"></button>
                    <button type="button" pButton [icon]="rejectIcon" [label]="rejectLabel" (click)="reject()" [class]="rejectButtonStyleClass" *ngIf="rejectVisible"></button>
                </div>
            </div>
        </div>
    `,
        animations: [
            trigger('animation', [
                transition('void => visible', [
                    useAnimation(showAnimation)
                ]),
                transition('visible => void', [
                    useAnimation(hideAnimation)
                ])
            ])
        ]
    })
], ConfirmDialog);
let ConfirmDialogModule = class ConfirmDialogModule {
};
ConfirmDialogModule = __decorate([
    NgModule({
        imports: [CommonModule, ButtonModule],
        exports: [ConfirmDialog, ButtonModule, SharedModule],
        declarations: [ConfirmDialog]
    })
], ConfirmDialogModule);

/**
 * Generated bundle index. Do not edit.
 */

export { ConfirmDialog, ConfirmDialogModule };
//# sourceMappingURL=primeng-confirmdialog.js.map
