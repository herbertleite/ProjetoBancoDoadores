var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, EventEmitter, Renderer2, ContentChild, NgZone, ViewChild, ChangeDetectorRef } from '@angular/core';
import { trigger, style, transition, animate, useAnimation, animation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Footer, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
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
export { ConfirmDialog };
let ConfirmDialogModule = class ConfirmDialogModule {
};
ConfirmDialogModule = __decorate([
    NgModule({
        imports: [CommonModule, ButtonModule],
        exports: [ConfirmDialog, ButtonModule, SharedModule],
        declarations: [ConfirmDialog]
    })
], ConfirmDialogModule);
export { ConfirmDialogModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWRpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvY29uZmlybWRpYWxvZy8iLCJzb3VyY2VzIjpbImNvbmZpcm1kaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxZQUFZLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwSixPQUFPLEVBQUMsT0FBTyxFQUFPLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFpQixZQUFZLEVBQUUsU0FBUyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDbkgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDaEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTVDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUdoRCxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUM7SUFDNUIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDakQsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDdEUsQ0FBQyxDQUFDO0FBRUgsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDO0lBQzVCLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE9B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QUFSLEtBQUssRUFBRTtnREFBMkI7QUFFMUI7SUFBUixLQUFLLEVBQUU7NENBRVA7QUFVUTtJQUFSLEtBQUssRUFBRTs2Q0FFUDtBQTRCdUM7SUFBdkMsWUFBWSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzs2Q0FBUTtBQUVQO0lBQXZDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7dURBQThCO0FBNUY1RCxhQUFhO0lBdkN6QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXlCVDtRQUNELFVBQVUsRUFBRTtZQUNSLE9BQU8sQ0FBQyxXQUFXLEVBQUU7Z0JBQ2pCLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTtvQkFDMUIsWUFBWSxDQUFDLGFBQWEsQ0FBQztpQkFDOUIsQ0FBQztnQkFDRixVQUFVLENBQUMsaUJBQWlCLEVBQUU7b0JBQzFCLFlBQVksQ0FBQyxhQUFhLENBQUM7aUJBQzlCLENBQUM7YUFDTCxDQUFDO1NBQ0w7S0FDSixDQUFDO0dBQ1csYUFBYSxDQTBUekI7U0ExVFksYUFBYTtBQWlVMUIsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7Q0FBSSxDQUFBO0FBQXZCLG1CQUFtQjtJQUwvQixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO1FBQ3BDLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO1FBQ2xELFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQztLQUNoQyxDQUFDO0dBQ1csbUJBQW1CLENBQUk7U0FBdkIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixPbkRlc3Ryb3ksSW5wdXQsRXZlbnRFbWl0dGVyLFJlbmRlcmVyMixDb250ZW50Q2hpbGQsTmdab25lLFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZSxBbmltYXRpb25FdmVudCwgdXNlQW5pbWF0aW9uLCBhbmltYXRpb259IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7Rm9vdGVyLFNoYXJlZE1vZHVsZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtCdXR0b25Nb2R1bGV9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcbmltcG9ydCB7Q29uZmlybWF0aW9ufSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge0NvbmZpcm1hdGlvblNlcnZpY2V9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSAgIGZyb20gJ3J4anMnO1xuXG5jb25zdCBzaG93QW5pbWF0aW9uID0gYW5pbWF0aW9uKFtcbiAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3t7dHJhbnNmb3JtfX0nLCBvcGFjaXR5OiAwIH0pLFxuICAgIGFuaW1hdGUoJ3t7dHJhbnNpdGlvbn19Jywgc3R5bGUoeyB0cmFuc2Zvcm06ICdub25lJywgb3BhY2l0eTogMSB9KSlcbl0pO1xuXG5jb25zdCBoaWRlQW5pbWF0aW9uID0gYW5pbWF0aW9uKFtcbiAgICBhbmltYXRlKCd7e3RyYW5zaXRpb259fScsIHN0eWxlKHsgdHJhbnNmb3JtOiAne3t0cmFuc2Zvcm19fScsIG9wYWNpdHk6IDAgfSkpXG5dKTtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jb25maXJtRGlhbG9nJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGlhbG9nLXdyYXBwZXJcIiBbbmdDbGFzc109XCJnZXRXcmFwcGVyQ2xhc3MoKVwiICpuZ0lmPVwibWFza1Zpc2libGVcIj5cbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1kaWFsb2cgdWktY29uZmlybWRpYWxvZyB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1zaGFkb3cnOnRydWUsJ3VpLWRpYWxvZy1ydGwnOnJ0bH1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKG1vdXNlZG93bik9XCJtb3ZlT25Ub3AoKVwiXG4gICAgICAgICAgICAgICAgW0BhbmltYXRpb25dPVwie3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3RyYW5zZm9ybTogdHJhbnNmb3JtT3B0aW9ucywgdHJhbnNpdGlvbjogdHJhbnNpdGlvbk9wdGlvbnN9fVwiIChAYW5pbWF0aW9uLnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiIChAYW5pbWF0aW9uLmRvbmUpPVwib25BbmltYXRpb25FbmQoJGV2ZW50KVwiICpuZ0lmPVwidmlzaWJsZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kaWFsb2ctdGl0bGViYXIgdWktd2lkZ2V0LWhlYWRlciB1aS1oZWxwZXItY2xlYXJmaXggdWktY29ybmVyLXRvcFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWRpYWxvZy10aXRsZVwiICpuZ0lmPVwiaGVhZGVyXCI+e3toZWFkZXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWRpYWxvZy10aXRsZWJhci1pY29uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJjbG9zYWJsZVwiIFtuZ0NsYXNzXT1cInsndWktZGlhbG9nLXRpdGxlYmFyLWljb24gdWktZGlhbG9nLXRpdGxlYmFyLWNsb3NlIHVpLWNvcm5lci1hbGwnOnRydWV9XCIgdGFiaW5kZXg9XCIwXCIgcm9sZT1cImJ1dHRvblwiIChjbGljayk9XCJjbG9zZSgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiY2xvc2UoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGkgcGktdGltZXNcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgI2NvbnRlbnQgY2xhc3M9XCJ1aS1kaWFsb2ctY29udGVudCB1aS13aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBbbmdDbGFzc109XCIndWktY29uZmlybWRpYWxvZy1pY29uJ1wiIFtjbGFzc109XCJpY29uXCIgKm5nSWY9XCJpY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNvbmZpcm1kaWFsb2ctbWVzc2FnZVwiIFtpbm5lckhUTUxdPVwibWVzc2FnZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGlhbG9nLWZvb3RlciB1aS13aWRnZXQtY29udGVudFwiICpuZ0lmPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kaWFsb2ctZm9vdGVyIHVpLXdpZGdldC1jb250ZW50XCIgKm5nSWY9XCIhZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gW2ljb25dPVwiYWNjZXB0SWNvblwiIFtsYWJlbF09XCJhY2NlcHRMYWJlbFwiIChjbGljayk9XCJhY2NlcHQoKVwiIFtjbGFzc109XCJhY2NlcHRCdXR0b25TdHlsZUNsYXNzXCIgKm5nSWY9XCJhY2NlcHRWaXNpYmxlXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gW2ljb25dPVwicmVqZWN0SWNvblwiIFtsYWJlbF09XCJyZWplY3RMYWJlbFwiIChjbGljayk9XCJyZWplY3QoKVwiIFtjbGFzc109XCJyZWplY3RCdXR0b25TdHlsZUNsYXNzXCIgKm5nSWY9XCJyZWplY3RWaXNpYmxlXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ2FuaW1hdGlvbicsIFtcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIFtcbiAgICAgICAgICAgICAgICB1c2VBbmltYXRpb24oc2hvd0FuaW1hdGlvbilcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiB2b2lkJywgW1xuICAgICAgICAgICAgICAgIHVzZUFuaW1hdGlvbihoaWRlQW5pbWF0aW9uKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1EaWFsb2cgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIG1lc3NhZ2U6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGFjY2VwdEljb246IHN0cmluZyA9ICdwaSBwaS1jaGVjayc7XG4gICAgXG4gICAgQElucHV0KCkgYWNjZXB0TGFiZWw6IHN0cmluZyA9ICdZZXMnO1xuICAgIFxuICAgIEBJbnB1dCgpIGFjY2VwdFZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgcmVqZWN0SWNvbjogc3RyaW5nID0gJ3BpIHBpLXRpbWVzJztcbiAgICBcbiAgICBASW5wdXQoKSByZWplY3RMYWJlbDogc3RyaW5nID0gJ05vJztcbiAgICBcbiAgICBASW5wdXQoKSByZWplY3RWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSBhY2NlcHRCdXR0b25TdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgcmVqZWN0QnV0dG9uU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgY2xvc2VPbkVzY2FwZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBibG9ja1Njcm9sbDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBydGw6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBjbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBrZXk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuICAgIFxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XG4gICAgXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcxNTBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKSc7XG5cbiAgICBASW5wdXQoKSBmb2N1c1RyYXA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZ2V0IHZpc2libGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Zpc2libGU7XG4gICAgfVxuICAgIHNldCB2aXNpYmxlKHZhbHVlOmFueSkge1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gdmFsdWU7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZSAmJiAhdGhpcy5tYXNrVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5tYXNrVmlzaWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcbiAgICBASW5wdXQoKSBnZXQgcG9zaXRpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICAgIH07XG5cbiAgICBzZXQgcG9zaXRpb24odmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvcGxlZnQnOlxuICAgICAgICAgICAgY2FzZSAnYm90dG9tbGVmdCc6XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInRyYW5zbGF0ZTNkKC0xMDAlLCAwcHgsIDBweClcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG9wcmlnaHQnOlxuICAgICAgICAgICAgY2FzZSAnYm90dG9tcmlnaHQnOlxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9IFwidHJhbnNsYXRlM2QoMTAwJSwgMHB4LCAwcHgpXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PcHRpb25zID0gXCJ0cmFuc2xhdGUzZCgwcHgsIDEwMCUsIDBweClcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInRyYW5zbGF0ZTNkKDBweCwgLTEwMCUsIDBweClcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInNjYWxlKDAuNylcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQENvbnRlbnRDaGlsZChGb290ZXIsIHsgc3RhdGljOiB0cnVlIH0pIGZvb3RlcjtcblxuICAgIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250ZW50Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuICAgIFxuICAgIGNvbmZpcm1hdGlvbjogQ29uZmlybWF0aW9uO1xuICAgICAgICBcbiAgICBfdmlzaWJsZTogYm9vbGVhbjtcblxuICAgIG1hc2tWaXNpYmxlOiBib29sZWFuO1xuICAgIFxuICAgIGRvY3VtZW50RXNjYXBlTGlzdGVuZXI6IGFueTtcbiAgICAgICAgXG4gICAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcblxuICAgIHdyYXBwZXI6IEhUTUxFbGVtZW50O1xuICAgICAgICBcbiAgICBjb250ZW50Q29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcbiAgICAgIFxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgcHJlV2lkdGg6IG51bWJlcjtcblxuICAgIF9wb3NpdGlvbjogc3RyaW5nID0gXCJjZW50ZXJcIjtcblxuICAgIHRyYW5zZm9ybU9wdGlvbnM6IGFueSA9IFwic2NhbGUoMC43KVwiO1xuICAgICAgICAgICAgICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgY29uZmlybWF0aW9uU2VydmljZTogQ29uZmlybWF0aW9uU2VydmljZSwgcHVibGljIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmNvbmZpcm1hdGlvblNlcnZpY2UucmVxdWlyZUNvbmZpcm1hdGlvbiQuc3Vic2NyaWJlKGNvbmZpcm1hdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoY29uZmlybWF0aW9uLmtleSA9PT0gdGhpcy5rZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbiA9IGNvbmZpcm1hdGlvbjtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2UgPSB0aGlzLmNvbmZpcm1hdGlvbi5tZXNzYWdlfHx0aGlzLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgdGhpcy5pY29uID0gdGhpcy5jb25maXJtYXRpb24uaWNvbnx8dGhpcy5pY29uO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gdGhpcy5jb25maXJtYXRpb24uaGVhZGVyfHx0aGlzLmhlYWRlcjtcbiAgICAgICAgICAgICAgICB0aGlzLnJlamVjdFZpc2libGUgPSB0aGlzLmNvbmZpcm1hdGlvbi5yZWplY3RWaXNpYmxlID09IG51bGwgPyB0aGlzLnJlamVjdFZpc2libGUgOiB0aGlzLmNvbmZpcm1hdGlvbi5yZWplY3RWaXNpYmxlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWNjZXB0VmlzaWJsZSA9IHRoaXMuY29uZmlybWF0aW9uLmFjY2VwdFZpc2libGUgPT0gbnVsbCA/IHRoaXMuYWNjZXB0VmlzaWJsZSA6IHRoaXMuY29uZmlybWF0aW9uLmFjY2VwdFZpc2libGU7XG4gICAgICAgICAgICAgICAgdGhpcy5hY2NlcHRMYWJlbCA9IHRoaXMuY29uZmlybWF0aW9uLmFjY2VwdExhYmVsfHx0aGlzLmFjY2VwdExhYmVsO1xuICAgICAgICAgICAgICAgIHRoaXMucmVqZWN0TGFiZWwgPSB0aGlzLmNvbmZpcm1hdGlvbi5yZWplY3RMYWJlbHx8dGhpcy5yZWplY3RMYWJlbDtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpcm1hdGlvbi5hY2NlcHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24uYWNjZXB0RXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uLmFjY2VwdEV2ZW50LnN1YnNjcmliZSh0aGlzLmNvbmZpcm1hdGlvbi5hY2NlcHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maXJtYXRpb24ucmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uLnJlamVjdEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpcm1hdGlvbi5yZWplY3RFdmVudC5zdWJzY3JpYmUodGhpcy5jb25maXJtYXRpb24ucmVqZWN0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maXJtYXRpb24uYmxvY2tTY3JvbGwgPT09IGZhbHNlIHx8IHRoaXMuY29uZmlybWF0aW9uLmJsb2NrU2Nyb2xsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmxvY2tTY3JvbGwgPSB0aGlzLmNvbmZpcm1hdGlvbi5ibG9ja1Njcm9sbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgICAgICAgICBcbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBldmVudC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlciA9IHRoaXMuY29udGFpbmVyLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Q29udGFpbmVyID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyLCAnLnVpLWRpYWxvZy1jb250ZW50Jyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWNjZXB0VmlzaWJsZSB8fCB0aGlzLnJlamVjdFZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyLCAnYnV0dG9uJykuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFwcGVuZENvbnRhaW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZU9uVG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVNb2RhbGl0eSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvbkVuZChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3ZvaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb250YWluZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIsIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZUFwcGVuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIGVuYWJsZU1vZGFsaXR5KCkge1xuICAgICAgICBpZiAodGhpcy5ibG9ja1Njcm9sbCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZGlzYWJsZU1vZGFsaXR5KCkge1xuICAgICAgICB0aGlzLm1hc2tWaXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuYmxvY2tTY3JvbGwpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3VpLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICAgIFxuICAgIGNsb3NlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5jb25maXJtYXRpb24ucmVqZWN0RXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlybWF0aW9uLnJlamVjdEV2ZW50LmVtaXQoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIFxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBtb3ZlT25Ub3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnpJbmRleCA9IFN0cmluZyh0aGlzLmJhc2VaSW5kZXggKyAoKytEb21IYW5kbGVyLnppbmRleCkpO1xuICAgICAgICAgICAgdGhpcy53cmFwcGVyLnN0eWxlLnpJbmRleCA9IFN0cmluZyh0aGlzLmJhc2VaSW5kZXggKyAoRG9tSGFuZGxlci56aW5kZXggLSAxKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRXcmFwcGVyQ2xhc3MoKSB7XG4gICAgICAgIGxldCB3cmFwcGVyQ2xhc3MgPSB7J3VpLXdpZGdldC1vdmVybGF5IHVpLWRpYWxvZy1tYXNrJzogdHJ1ZSwgJ3VpLWRpYWxvZy1tYXNrLXNjcm9sbGJsb2NrZXInOnRoaXMuYmxvY2tTY3JvbGx9O1xuICAgICAgICB3cmFwcGVyQ2xhc3NbdGhpcy5nZXRQb3NpdGlvbkNsYXNzKCkudG9TdHJpbmcoKV0gPSB0cnVlO1xuICAgICAgICByZXR1cm4gd3JhcHBlckNsYXNzO1xuICAgIH1cblxuICAgIGdldFBvc2l0aW9uQ2xhc3MoKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAndG9wbGVmdCcsICd0b3ByaWdodCcsICdib3R0b20nLCAnYm90dG9tbGVmdCcsICdib3R0b21yaWdodCddO1xuICAgICAgICBjb25zdCBwb3MgPSBwb3NpdGlvbnMuZmluZChpdGVtID0+IGl0ZW0gPT09IHRoaXMucG9zaXRpb24pO1xuXG4gICAgICAgIHJldHVybiBwb3MgPyBgdWktZGlhbG9nLSR7cG9zfWAgOiAnJztcbiAgICB9XG4gICAgXG4gICAgYmluZEdsb2JhbExpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKCh0aGlzLmNsb3NlT25Fc2NhcGUgJiYgdGhpcy5jbG9zYWJsZSkgfHwgdGhpcy5mb2N1c1RyYXAgJiYgIXRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMjcgJiYgKHRoaXMuY2xvc2VPbkVzY2FwZSAmJiB0aGlzLmNsb3NhYmxlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQodGhpcy5jb250YWluZXIuc3R5bGUuekluZGV4KSA9PT0gKERvbUhhbmRsZXIuemluZGV4ICsgdGhpcy5iYXNlWkluZGV4KSAmJiB0aGlzLnZpc2libGUpwqB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChldmVudC53aGljaCA9PT0gOSAmJiB0aGlzLmZvY3VzVHJhcCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzYWJsZUVsZW1lbnRzID0gRG9tSGFuZGxlci5nZXRGb2N1c2FibGVFbGVtZW50cyh0aGlzLmNvbnRhaW5lcik7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2FibGVFbGVtZW50cyAmJiBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzZWRJbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkSW5kZXggPT0gLTEgfHwgZm9jdXNlZEluZGV4ID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNlZEluZGV4IC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkSW5kZXggPT0gLTEgfHwgZm9jdXNlZEluZGV4ID09PSAoZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2VkSW5kZXggKyAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVuYmluZEdsb2JhbExpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5SGlkZSgpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlTW9kYWxpdHkoKTtcbiAgICAgICAgdGhpcy51bmJpbmRHbG9iYWxMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5yZXN0b3JlQXBwZW5kKCk7XG4gICAgICAgIHRoaXMub25PdmVybGF5SGlkZSgpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBcbiAgICBhY2NlcHQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpcm1hdGlvbi5hY2NlcHRFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24uYWNjZXB0RXZlbnQuZW1pdCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy5jb25maXJtYXRpb24gPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICByZWplY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpcm1hdGlvbi5yZWplY3RFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5jb25maXJtYXRpb24ucmVqZWN0RXZlbnQuZW1pdCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy5jb25maXJtYXRpb24gPSBudWxsO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEJ1dHRvbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0NvbmZpcm1EaWFsb2csQnV0dG9uTW9kdWxlLFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ29uZmlybURpYWxvZ11cbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlybURpYWxvZ01vZHVsZSB7IH0iXX0=