import { EventEmitter, ElementRef, Renderer2, ChangeDetectorRef, NgZone, Input, Output, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { trigger, state, style, transition, animate } from '@angular/animations';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let OverlayPanel = class OverlayPanel {
    constructor(el, renderer, cd, zone) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.dismissable = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.visible = false;
        this.isContainerClicked = true;
    }
    onContainerClick() {
        this.isContainerClicked = true;
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener && this.dismissable) {
            this.zone.runOutsideAngular(() => {
                let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
                this.documentClickListener = this.renderer.listen('document', documentEvent, (event) => {
                    if (!this.container.contains(event.target) && this.target !== event.target && !this.target.contains(event.target) && !this.isContainerClicked) {
                        this.zone.run(() => {
                            this.hide();
                        });
                    }
                    this.isContainerClicked = false;
                    this.cd.markForCheck();
                });
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    toggle(event, target) {
        if (this.visible) {
            this.visible = false;
            if (this.hasTargetChanged(event, target)) {
                this.target = target || event.currentTarget || event.target;
                setTimeout(() => {
                    this.visible = true;
                }, 200);
            }
        }
        else {
            this.show(event, target);
        }
    }
    show(event, target) {
        this.target = target || event.currentTarget || event.target;
        this.visible = true;
    }
    hasTargetChanged(event, target) {
        return this.target != null && this.target !== (target || event.currentTarget || event.target);
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
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.onShow.emit(null);
                this.appendContainer();
                if (this.autoZIndex) {
                    this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                DomHandler.absolutePosition(this.container, this.target);
                if (DomHandler.getOffset(this.container).top < DomHandler.getOffset(this.target).top) {
                    DomHandler.addClass(this.container, 'ui-overlaypanel-flipped');
                }
                if (Math.floor(DomHandler.getOffset(this.container).left) < Math.floor(DomHandler.getOffset(this.target).left) &&
                    DomHandler.getOffset(this.container).left > 0) {
                    DomHandler.addClass(this.container, 'ui-overlaypanel-shifted');
                }
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                break;
            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
                break;
        }
    }
    hide() {
        this.visible = false;
    }
    onCloseClick(event) {
        this.hide();
        event.preventDefault();
    }
    onWindowResize(event) {
        this.hide();
    }
    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    onContainerDestroy() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
    }
    ngOnDestroy() {
        this.target = null;
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
    }
};
OverlayPanel.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
__decorate([
    Input()
], OverlayPanel.prototype, "dismissable", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "showCloseIcon", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "style", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "styleClass", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "appendTo", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "ariaCloseLabel", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "showTransitionOptions", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "hideTransitionOptions", void 0);
__decorate([
    Output()
], OverlayPanel.prototype, "onShow", void 0);
__decorate([
    Output()
], OverlayPanel.prototype, "onHide", void 0);
OverlayPanel = __decorate([
    Component({
        selector: 'p-overlayPanel',
        template: `
        <div [ngClass]="'ui-overlaypanel ui-widget ui-widget-content ui-corner-all ui-shadow'" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick()"
            [@animation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@animation.start)="onAnimationStart($event)" *ngIf="visible">
            <div class="ui-overlaypanel-content">
                <ng-content></ng-content>
            </div>
            <a tabindex="0" *ngIf="showCloseIcon" class="ui-overlaypanel-close ui-state-default" (click)="onCloseClick($event)" (keydown.enter)="hide()" [attr.aria-label]="ariaCloseLabel">
                <span class="ui-overlaypanel-close-icon pi pi-times"></span>
            </a>
        </div>
    `,
        animations: [
            trigger('animation', [
                state('void', style({
                    transform: 'translateY(5%)',
                    opacity: 0
                })),
                state('visible', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                transition('void => visible', animate('{{showTransitionParams}}')),
                transition('visible => void', animate('{{hideTransitionParams}}'))
            ])
        ]
    })
], OverlayPanel);
let OverlayPanelModule = class OverlayPanelModule {
};
OverlayPanelModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [OverlayPanel],
        declarations: [OverlayPanel]
    })
], OverlayPanelModule);

/**
 * Generated bundle index. Do not edit.
 */

export { OverlayPanel, OverlayPanelModule };
//# sourceMappingURL=primeng-overlaypanel.js.map
