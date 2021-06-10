var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, Output, EventEmitter, Renderer2, ContentChildren, QueryList, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
import { trigger, style, transition, animate, animation, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Header, Footer, SharedModule } from 'primeng/api';
let idx = 0;
const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}', style({ transform: 'none', opacity: 1 }))
]);
const hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);
let Dialog = class Dialog {
    constructor(el, renderer, zone, cd) {
        this.el = el;
        this.renderer = renderer;
        this.zone = zone;
        this.cd = cd;
        this.draggable = true;
        this.resizable = true;
        this.closeOnEscape = true;
        this.closable = true;
        this.showHeader = true;
        this.blockScroll = false;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.minX = 0;
        this.minY = 0;
        this.focusOnShow = true;
        this.keepInViewport = true;
        this.focusTrap = true;
        this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
        this.closeIcon = 'pi pi-times';
        this.minimizeIcon = 'pi pi-window-minimize';
        this.maximizeIcon = 'pi pi-window-maximize';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.visibleChange = new EventEmitter();
        this.id = `ui-dialog-${idx++}`;
        this._style = {};
        this._position = "center";
        this.transformOptions = "scale(0.7)";
    }
    get responsive() {
        return false;
    }
    ;
    set responsive(_responsive) {
        console.log("Responsive property is deprecated.");
    }
    get breakpoint() {
        return 649;
    }
    ;
    set breakpoint(_breakpoint) {
        console.log("Breakpoint property is not utilized and deprecated, use CSS media queries instead.");
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
    get style() {
        return this._style;
    }
    set style(value) {
        if (value) {
            this._style = Object.assign({}, value);
            this.originalStyle = value;
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
    focus() {
        let focusable = DomHandler.findSingle(this.container, 'button');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }
    close(event) {
        this.visibleChange.emit(false);
        event.preventDefault();
    }
    enableModality() {
        if (this.closable && this.dismissableMask) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'click', (event) => {
                if (!this.container.isSameNode(event.target) && !this.container.contains(event.target)) {
                    this.close(event);
                }
            });
        }
        if (this.modal) {
            DomHandler.addClass(document.body, 'ui-overflow-hidden');
        }
    }
    disableModality() {
        if (this.wrapper) {
            if (this.dismissableMask) {
                this.unbindMaskClickListener();
            }
            if (this.modal) {
                DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            this.cd.detectChanges();
        }
    }
    maximize() {
        this.maximized = !this.maximized;
        if (!this.modal && !this.blockScroll) {
            if (this.maximized)
                DomHandler.addClass(document.body, 'ui-overflow-hidden');
            else
                DomHandler.removeClass(document.body, 'ui-overflow-hidden');
        }
    }
    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    moveOnTop() {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
            this.wrapper.style.zIndex = String(this.baseZIndex + (DomHandler.zindex - 1));
        }
    }
    getWrapperClass() {
        let wrapperClass = { 'ui-widget-overlay ui-dialog-mask': this.modal, 'ui-dialog-mask-scrollblocker': this.modal || this.blockScroll };
        wrapperClass[this.getPositionClass().toString()] = true;
        return wrapperClass;
    }
    getPositionClass() {
        const positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
        const pos = positions.find(item => item === this.position);
        return pos ? `ui-dialog-${pos}` : '';
    }
    initDrag(event) {
        if (DomHandler.hasClass(event.target, 'ui-dialog-titlebar-icon') || DomHandler.hasClass(event.target.parentElement, 'ui-dialog-titlebar-icon')) {
            return;
        }
        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            DomHandler.addClass(document.body, 'ui-unselectable-text');
        }
    }
    onKeydown(event) {
        if (this.focusTrap) {
            if (event.which === 9) {
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
        }
    }
    onDrag(event) {
        if (this.dragging) {
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let offset = DomHandler.getOffset(this.container);
            let leftPos = offset.left + deltaX;
            let topPos = offset.top + deltaY;
            let viewport = DomHandler.getViewport();
            if (this.keepInViewport) {
                if (leftPos >= this.minX && (leftPos + containerWidth) < viewport.width) {
                    this._style.left = leftPos + 'px';
                    this.lastPageX = event.pageX;
                    this.container.style.left = leftPos + 'px';
                }
                if (topPos >= this.minY && (topPos + containerHeight) < viewport.height) {
                    this._style.top = topPos + 'px';
                    this.lastPageY = event.pageY;
                    this.container.style.top = topPos + 'px';
                }
            }
            else {
                this.lastPageX = event.pageX;
                this.container.style.left = leftPos + 'px';
                this.lastPageY = event.pageY;
                this.container.style.top = topPos + 'px';
            }
        }
    }
    endDrag(event) {
        if (this.draggable) {
            this.dragging = false;
            DomHandler.removeClass(document.body, 'ui-unselectable-text');
        }
    }
    initResize(event) {
        if (this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            DomHandler.addClass(document.body, 'ui-unselectable-text');
        }
    }
    onResize(event) {
        if (this.resizing) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let contentHeight = DomHandler.getOuterHeight(this.contentViewChild.nativeElement);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;
            let minWidth = this.container.style.minWidth;
            let minHeight = this.container.style.minHeight;
            let offset = DomHandler.getOffset(this.container);
            let viewport = DomHandler.getViewport();
            if ((!minWidth || newWidth > parseInt(minWidth)) && (offset.left + newWidth) < viewport.width) {
                this._style.width = newWidth + 'px';
                this.container.style.width = this._style.width;
            }
            if ((!minHeight || newHeight > parseInt(minHeight)) && (offset.top + newHeight) < viewport.height) {
                this.contentViewChild.nativeElement.style.height = contentHeight + deltaY + 'px';
            }
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    onResizeEnd() {
        if (this.resizing) {
            this.resizing = false;
            DomHandler.removeClass(document.body, 'ui-unselectable-text');
        }
    }
    bindGlobalListeners() {
        if (this.focusTrap) {
            this.bindDocumentKeydownListener();
        }
        if (this.draggable) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
        }
        if (this.resizable) {
            this.bindDocumentResizeListeners();
        }
        if (this.closeOnEscape && this.closable) {
            this.bindDocumentEscapeListener();
        }
    }
    unbindGlobalListeners() {
        this.unbindDocumentDragListener();
        this.unbindDocumentKeydownListener();
        this.unbindDocumentDragEndListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentEscapeListener();
    }
    bindDocumentKeydownListener() {
        this.zone.runOutsideAngular(() => {
            this.documentKeydownListener = this.onKeydown.bind(this);
            window.document.addEventListener('keydown', this.documentKeydownListener);
        });
    }
    unbindDocumentKeydownListener() {
        if (this.documentKeydownListener) {
            window.document.removeEventListener('keydown', this.documentKeydownListener);
            this.documentKeydownListener = null;
        }
    }
    bindDocumentDragListener() {
        this.zone.runOutsideAngular(() => {
            this.documentDragListener = this.onDrag.bind(this);
            window.document.addEventListener('mousemove', this.documentDragListener);
        });
    }
    unbindDocumentDragListener() {
        if (this.documentDragListener) {
            window.document.removeEventListener('mousemove', this.documentDragListener);
            this.documentDragListener = null;
        }
    }
    bindDocumentDragEndListener() {
        this.zone.runOutsideAngular(() => {
            this.documentDragEndListener = this.endDrag.bind(this);
            window.document.addEventListener('mouseup', this.documentDragEndListener);
        });
    }
    unbindDocumentDragEndListener() {
        if (this.documentDragEndListener) {
            window.document.removeEventListener('mouseup', this.documentDragEndListener);
            this.documentDragEndListener = null;
        }
    }
    bindDocumentResizeListeners() {
        this.zone.runOutsideAngular(() => {
            this.documentResizeListener = this.onResize.bind(this);
            this.documentResizeEndListener = this.onResizeEnd.bind(this);
            window.document.addEventListener('mousemove', this.documentResizeListener);
            window.document.addEventListener('mouseup', this.documentResizeEndListener);
        });
    }
    unbindDocumentResizeListeners() {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            window.document.removeEventListener('mousemove', this.documentResizeListener);
            window.document.removeEventListener('mouseup', this.documentResizeEndListener);
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    }
    bindDocumentEscapeListener() {
        this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.container.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
                    this.close(event);
                }
            }
        });
    }
    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
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
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container.parentElement;
                this.onShow.emit({});
                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();
                if (this.modal) {
                    this.enableModality();
                }
                if (!this.modal && this.blockScroll) {
                    DomHandler.addClass(document.body, 'ui-overflow-hidden');
                }
                if (this.focusOnShow) {
                    this.focus();
                }
                break;
        }
    }
    onAnimationEnd(event) {
        switch (event.toState) {
            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
                break;
        }
    }
    onContainerDestroy() {
        this.unbindGlobalListeners();
        this.dragging = false;
        this.maskVisible = false;
        if (this.maximized) {
            DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            this.maximized = false;
        }
        if (this.modal) {
            this.disableModality();
        }
        if (this.blockScroll) {
            DomHandler.removeClass(document.body, 'ui-overflow-hidden');
        }
        this.container = null;
        this.wrapper = null;
        this._style = this.originalStyle ? Object.assign({}, this.originalStyle) : {};
    }
    ngOnDestroy() {
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
    }
};
Dialog.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], Dialog.prototype, "header", void 0);
__decorate([
    Input()
], Dialog.prototype, "draggable", void 0);
__decorate([
    Input()
], Dialog.prototype, "resizable", void 0);
__decorate([
    Input()
], Dialog.prototype, "positionLeft", void 0);
__decorate([
    Input()
], Dialog.prototype, "positionTop", void 0);
__decorate([
    Input()
], Dialog.prototype, "contentStyle", void 0);
__decorate([
    Input()
], Dialog.prototype, "modal", void 0);
__decorate([
    Input()
], Dialog.prototype, "closeOnEscape", void 0);
__decorate([
    Input()
], Dialog.prototype, "dismissableMask", void 0);
__decorate([
    Input()
], Dialog.prototype, "rtl", void 0);
__decorate([
    Input()
], Dialog.prototype, "closable", void 0);
__decorate([
    Input()
], Dialog.prototype, "responsive", null);
__decorate([
    Input()
], Dialog.prototype, "appendTo", void 0);
__decorate([
    Input()
], Dialog.prototype, "styleClass", void 0);
__decorate([
    Input()
], Dialog.prototype, "showHeader", void 0);
__decorate([
    Input()
], Dialog.prototype, "breakpoint", null);
__decorate([
    Input()
], Dialog.prototype, "blockScroll", void 0);
__decorate([
    Input()
], Dialog.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], Dialog.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], Dialog.prototype, "minX", void 0);
__decorate([
    Input()
], Dialog.prototype, "minY", void 0);
__decorate([
    Input()
], Dialog.prototype, "focusOnShow", void 0);
__decorate([
    Input()
], Dialog.prototype, "maximizable", void 0);
__decorate([
    Input()
], Dialog.prototype, "keepInViewport", void 0);
__decorate([
    Input()
], Dialog.prototype, "focusTrap", void 0);
__decorate([
    Input()
], Dialog.prototype, "transitionOptions", void 0);
__decorate([
    Input()
], Dialog.prototype, "closeIcon", void 0);
__decorate([
    Input()
], Dialog.prototype, "minimizeIcon", void 0);
__decorate([
    Input()
], Dialog.prototype, "maximizeIcon", void 0);
__decorate([
    ContentChildren(Header, { descendants: false })
], Dialog.prototype, "headerFacet", void 0);
__decorate([
    ContentChildren(Footer, { descendants: false })
], Dialog.prototype, "footerFacet", void 0);
__decorate([
    ViewChild('titlebar')
], Dialog.prototype, "headerViewChild", void 0);
__decorate([
    ViewChild('content')
], Dialog.prototype, "contentViewChild", void 0);
__decorate([
    ViewChild('footer')
], Dialog.prototype, "footerViewChild", void 0);
__decorate([
    Output()
], Dialog.prototype, "onShow", void 0);
__decorate([
    Output()
], Dialog.prototype, "onHide", void 0);
__decorate([
    Output()
], Dialog.prototype, "visibleChange", void 0);
__decorate([
    Input()
], Dialog.prototype, "visible", null);
__decorate([
    Input()
], Dialog.prototype, "style", null);
__decorate([
    Input()
], Dialog.prototype, "position", null);
Dialog = __decorate([
    Component({
        selector: 'p-dialog',
        template: `
    <div class="ui-dialog-wrapper" [ngClass]="getWrapperClass()" *ngIf="maskVisible">
        <div #container [ngClass]="{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true, 'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable,'ui-dialog-resizable':resizable, 'ui-dialog-maximized': maximized}"
            [ngStyle]="style" [class]="styleClass" *ngIf="visible"
            [@animation]="{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}" (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" role="dialog" [attr.aria-labelledby]="id + '-label'">
            <div #titlebar class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top" (mousedown)="initDrag($event)" *ngIf="showHeader">
                <span [attr.id]="id + '-label'" class="ui-dialog-title" *ngIf="header">{{header}}</span>
                <span [attr.id]="id + '-label'" class="ui-dialog-title" *ngIf="headerFacet && headerFacet.first">
                    <ng-content select="p-header"></ng-content>
                </span>
                <div class="ui-dialog-titlebar-icons">
                    <a *ngIf="maximizable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-maximize ui-corner-all':true}" tabindex="0" role="button" (click)="maximize()" (keydown.enter)="maximize()">
                        <span [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                    </a>
                    <a *ngIf="closable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}" tabindex="0" role="button" (click)="close($event)" (keydown.enter)="close($event)">
                        <span [class]="closeIcon"></span>
                    </a>
                </div>
            </div>
            <div #content class="ui-dialog-content ui-widget-content" [ngStyle]="contentStyle">
                <ng-content></ng-content>
            </div>
            <div #footer class="ui-dialog-footer ui-widget-content" *ngIf="footerFacet && footerFacet.first">
                <ng-content select="p-footer"></ng-content>
            </div>
            <div *ngIf="resizable" class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;" (mousedown)="initResize($event)"></div>
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
], Dialog);
export { Dialog };
let DialogModule = class DialogModule {
};
DialogModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Dialog, SharedModule],
        declarations: [Dialog]
    })
], DialogModule);
export { DialogModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9kaWFsb2cvIiwic291cmNlcyI6WyJkaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxTQUFTLEVBQy9FLGVBQWUsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4RixPQUFPLEVBQUMsT0FBTyxFQUFPLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFrQixTQUFTLEVBQUUsWUFBWSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDcEgsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXZELElBQUksR0FBRyxHQUFXLENBQUMsQ0FBQztBQUVwQixNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUM7SUFDNUIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDakQsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDdEUsQ0FBQyxDQUFDO0FBRUgsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDO0lBQzVCLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0NBQy9FLENBQUMsQ0FBQztBQTRDSCxJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0lBOElmLFlBQW1CLEVBQWMsRUFBUyxRQUFtQixFQUFTLElBQVksRUFBVSxFQUFxQjtRQUE5RixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQTFJeEcsY0FBUyxHQUFZLElBQUksQ0FBQztRQUUxQixjQUFTLEdBQVksSUFBSSxDQUFDO1FBVTFCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBTTlCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFjekIsZUFBVSxHQUFZLElBQUksQ0FBQztRQVUzQixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUU3QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUVqQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBRWpCLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBSTVCLG1CQUFjLEdBQVksSUFBSSxDQUFDO1FBRS9CLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsc0JBQWlCLEdBQVcsa0NBQWtDLENBQUM7UUFFL0QsY0FBUyxHQUFXLGFBQWEsQ0FBQztRQUVsQyxpQkFBWSxHQUFXLHVCQUF1QixDQUFDO1FBRS9DLGlCQUFZLEdBQVcsdUJBQXVCLENBQUM7UUFZOUMsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRS9DLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUvQyxrQkFBYSxHQUFxQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBOEMvRCxPQUFFLEdBQVcsYUFBYSxHQUFHLEVBQUUsRUFBRSxDQUFDO1FBRWxDLFdBQU0sR0FBUSxFQUFFLENBQUM7UUFFakIsY0FBUyxHQUFXLFFBQVEsQ0FBQztRQUk3QixxQkFBZ0IsR0FBUSxZQUFZLENBQUM7SUFFZ0YsQ0FBQztJQXRIN0csSUFBSSxVQUFVO1FBQ25CLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFBQSxDQUFDO0lBRUYsSUFBSSxVQUFVLENBQUMsV0FBb0I7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFRUSxJQUFJLFVBQVU7UUFDbkIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBQUEsQ0FBQztJQUVGLElBQUksVUFBVSxDQUFDLFdBQW1CO1FBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0ZBQW9GLENBQUMsQ0FBQztJQUN0RyxDQUFDO0lBb0dRLElBQUksT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUNELElBQUksT0FBTyxDQUFDLEtBQVM7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFUSxJQUFJLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksS0FBSyxDQUFDLEtBQVM7UUFDZixJQUFJLEtBQUssRUFBRTtZQUNQLElBQUksQ0FBQyxNQUFNLHFCQUFPLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQUVRLElBQUksUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUFBLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQyxLQUFhO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBRXZCLFFBQVEsS0FBSyxFQUFFO1lBQ1gsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLFlBQVksQ0FBQztZQUNsQixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLGdCQUFnQixHQUFHLDhCQUE4QixDQUFDO2dCQUMzRCxNQUFNO1lBQ04sS0FBSyxVQUFVLENBQUM7WUFDaEIsS0FBSyxhQUFhLENBQUM7WUFDbkIsS0FBSyxPQUFPO2dCQUNSLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyw2QkFBNkIsQ0FBQztnQkFDMUQsTUFBTTtZQUNOLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsNkJBQTZCLENBQUM7Z0JBQzFELE1BQU07WUFDTixLQUFLLEtBQUs7Z0JBQ04sSUFBSSxDQUFDLGdCQUFnQixHQUFHLDhCQUE4QixDQUFDO2dCQUMzRCxNQUFNO1lBQ047Z0JBQ0ksSUFBSSxDQUFDLGdCQUFnQixHQUFHLFlBQVksQ0FBQztnQkFDekMsTUFBTTtTQUNUO0lBQ0wsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDaEUsSUFBSSxTQUFTLEVBQUU7WUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDN0IsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFZO1FBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxjQUFjO1FBQ1YsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQ2hGLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ3BGLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3JCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1NBQzVEO0lBQ0wsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2FBQ2xDO1lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNaLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO2FBQy9EO1lBRUQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFFakMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xDLElBQUksSUFBSSxDQUFDLFNBQVM7Z0JBQ2QsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUM7O2dCQUV6RCxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztTQUNuRTtJQUNMLENBQUM7SUFFRCx1QkFBdUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pGO0lBQ0wsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLFlBQVksR0FBRyxFQUFDLGtDQUFrQyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsOEJBQThCLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFDLENBQUM7UUFDcEksWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3hELE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixNQUFNLFNBQVMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN6RyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzRCxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBaUI7UUFDdEIsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUseUJBQXlCLENBQUMsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFnQixLQUFLLENBQUMsTUFBTyxDQUFDLGFBQWEsRUFBRSx5QkFBeUIsQ0FBQyxFQUFFO1lBQzVKLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzdCLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1NBQzlEO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFvQjtRQUMxQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDbkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUV2QixJQUFJLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRXhFLElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7d0JBQ3pCLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUNoQzt5QkFDSTt3QkFDRCxJQUFJLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUVyRSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7NEJBQ2hCLElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksS0FBSyxDQUFDO2dDQUN4QyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7O2dDQUV4RCxpQkFBaUIsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7eUJBQ25EOzZCQUNJOzRCQUNELElBQUksWUFBWSxJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksS0FBSyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0NBQ3JFLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOztnQ0FFN0IsaUJBQWlCLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO3lCQUNuRDtxQkFDSjtpQkFDSjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQWlCO1FBQ3BCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlELElBQUksZUFBZSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMxQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUMsSUFBSSxNQUFNLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDbkMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7WUFDakMsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRXhDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDckIsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFO29CQUNyRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDO2lCQUM5QztnQkFFRCxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUU7b0JBQ3JFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztvQkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7aUJBQzVDO2FBQ0o7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQzthQUM1QztTQUNKO0lBQ0wsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFpQjtRQUNyQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHNCQUFzQixDQUFDLENBQUM7U0FDakU7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWlCO1FBQ3hCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzdCLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1NBQzlEO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFpQjtRQUN0QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFDLElBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlELElBQUksZUFBZSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksYUFBYSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ25GLElBQUksUUFBUSxHQUFHLGNBQWMsR0FBRyxNQUFNLENBQUM7WUFDdkMsSUFBSSxTQUFTLEdBQUcsZUFBZSxHQUFHLE1BQU0sQ0FBQztZQUN6QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDN0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQy9DLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xELElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUV4QyxJQUFJLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUMzRixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDbEQ7WUFFRCxJQUFJLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUMvRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsYUFBYSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDcEY7WUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztTQUNqRTtJQUNMLENBQUM7SUFFRCxtQkFBbUI7UUFDZixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7U0FDdEM7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7U0FDdEM7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7U0FDdEM7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNyQyxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCxxQkFBcUI7UUFDakIsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELDJCQUEyQjtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDOUUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsNkJBQTZCO1FBQ3pCLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQzlCLE1BQU0sQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQzdFLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRUQsd0JBQXdCO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQzdCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwwQkFBMEI7UUFDdEIsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDM0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCwyQkFBMkI7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDN0IsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzlFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZCQUE2QjtRQUN6QixJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUM5QixNQUFNLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVELDJCQUEyQjtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUM3QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQzNFLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ2hGLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELDZCQUE2QjtRQUN6QixJQUFJLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLENBQUMseUJBQXlCLEVBQUU7WUFDL0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDOUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDL0UsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztZQUNuQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1NBQ3pDO0lBQ0wsQ0FBQztJQUVELDBCQUEwQjtRQUN0QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2hGLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUU7Z0JBQ25CLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ2pGLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3JCO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw0QkFBNEI7UUFDeEIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDN0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztTQUN0QztJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU07Z0JBQ3hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7Z0JBRTFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0Q7SUFDTCxDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDckQ7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsS0FBcUI7UUFDbEMsUUFBTyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2xCLEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBRTNCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDWixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7aUJBQ3pCO2dCQUVELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ2pDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO2lCQUM1RDtnQkFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDaEI7Z0JBQ0wsTUFBTTtTQUNUO0lBQ0wsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFxQjtRQUNoQyxRQUFPLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDbEIsS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDekIsTUFBTTtTQUNUO0lBQ0wsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXRCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBRXpCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztTQUMvRDtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBRXBCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLG1CQUFLLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNwRSxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDN0I7SUFDTCxDQUFDO0NBRUosQ0FBQTs7WUEvYjBCLFVBQVU7WUFBbUIsU0FBUztZQUFlLE1BQU07WUFBYyxpQkFBaUI7O0FBNUl4RztJQUFSLEtBQUssRUFBRTtzQ0FBZ0I7QUFFZjtJQUFSLEtBQUssRUFBRTt5Q0FBMkI7QUFFMUI7SUFBUixLQUFLLEVBQUU7eUNBQTJCO0FBRTFCO0lBQVIsS0FBSyxFQUFFOzRDQUFzQjtBQUVyQjtJQUFSLEtBQUssRUFBRTsyQ0FBcUI7QUFFcEI7SUFBUixLQUFLLEVBQUU7NENBQW1CO0FBRWxCO0lBQVIsS0FBSyxFQUFFO3FDQUFnQjtBQUVmO0lBQVIsS0FBSyxFQUFFOzZDQUErQjtBQUU5QjtJQUFSLEtBQUssRUFBRTsrQ0FBMEI7QUFFekI7SUFBUixLQUFLLEVBQUU7bUNBQWM7QUFFYjtJQUFSLEtBQUssRUFBRTt3Q0FBMEI7QUFFekI7SUFBUixLQUFLLEVBQUU7d0NBRVA7QUFNUTtJQUFSLEtBQUssRUFBRTt3Q0FBZTtBQUVkO0lBQVIsS0FBSyxFQUFFOzBDQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTswQ0FBNEI7QUFFM0I7SUFBUixLQUFLLEVBQUU7d0NBRVA7QUFNUTtJQUFSLEtBQUssRUFBRTsyQ0FBOEI7QUFFN0I7SUFBUixLQUFLLEVBQUU7MENBQTRCO0FBRTNCO0lBQVIsS0FBSyxFQUFFOzBDQUF3QjtBQUV2QjtJQUFSLEtBQUssRUFBRTtvQ0FBa0I7QUFFakI7SUFBUixLQUFLLEVBQUU7b0NBQWtCO0FBRWpCO0lBQVIsS0FBSyxFQUFFOzJDQUE2QjtBQUU1QjtJQUFSLEtBQUssRUFBRTsyQ0FBc0I7QUFFckI7SUFBUixLQUFLLEVBQUU7OENBQWdDO0FBRS9CO0lBQVIsS0FBSyxFQUFFO3lDQUEyQjtBQUUxQjtJQUFSLEtBQUssRUFBRTtpREFBZ0U7QUFFL0Q7SUFBUixLQUFLLEVBQUU7eUNBQW1DO0FBRWxDO0lBQVIsS0FBSyxFQUFFOzRDQUFnRDtBQUUvQztJQUFSLEtBQUssRUFBRTs0Q0FBZ0Q7QUFFVDtJQUE5QyxlQUFlLENBQUMsTUFBTSxFQUFFLEVBQUMsV0FBVyxFQUFFLEtBQUssRUFBQyxDQUFDOzJDQUFnQztBQUUvQjtJQUE5QyxlQUFlLENBQUMsTUFBTSxFQUFFLEVBQUMsV0FBVyxFQUFFLEtBQUssRUFBQyxDQUFDOzJDQUFnQztBQUV2RDtJQUF0QixTQUFTLENBQUMsVUFBVSxDQUFDOytDQUE2QjtBQUU3QjtJQUFyQixTQUFTLENBQUMsU0FBUyxDQUFDO2dEQUE4QjtBQUU5QjtJQUFwQixTQUFTLENBQUMsUUFBUSxDQUFDOytDQUE2QjtBQUV2QztJQUFULE1BQU0sRUFBRTtzQ0FBZ0Q7QUFFL0M7SUFBVCxNQUFNLEVBQUU7c0NBQWdEO0FBRS9DO0lBQVQsTUFBTSxFQUFFOzZDQUFzRDtBQTBEdEQ7SUFBUixLQUFLLEVBQUU7cUNBRVA7QUFTUTtJQUFSLEtBQUssRUFBRTttQ0FFUDtBQVFRO0lBQVIsS0FBSyxFQUFFO3NDQUVQO0FBdktRLE1BQU07SUExQ2xCLFNBQVMsQ0FBQztRQUNYLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTRCVDtRQUNELFVBQVUsRUFBRTtZQUNSLE9BQU8sQ0FBQyxXQUFXLEVBQUU7Z0JBQ2pCLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTtvQkFDMUIsWUFBWSxDQUFDLGFBQWEsQ0FBQztpQkFDOUIsQ0FBQztnQkFDRixVQUFVLENBQUMsaUJBQWlCLEVBQUU7b0JBQzFCLFlBQVksQ0FBQyxhQUFhLENBQUM7aUJBQzlCLENBQUM7YUFDTCxDQUFDO1NBQ0w7S0FDQSxDQUFDO0dBQ1csTUFBTSxDQTZrQmxCO1NBN2tCWSxNQUFNO0FBb2xCbkIsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtDQUFJLENBQUE7QUFBaEIsWUFBWTtJQUx4QixRQUFRLENBQUM7UUFDVixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFDLFlBQVksQ0FBQztRQUM5QixZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7S0FDckIsQ0FBQztHQUNXLFlBQVksQ0FBSTtTQUFoQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixPbkRlc3Ryb3ksSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixSZW5kZXJlcjIsXG4gICAgQ29udGVudENoaWxkcmVuLFF1ZXJ5TGlzdCxWaWV3Q2hpbGQsTmdab25lLCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3RyaWdnZXIsc3RhdGUsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlLCBBbmltYXRpb25FdmVudCwgYW5pbWF0aW9uLCB1c2VBbmltYXRpb259IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7SGVhZGVyLEZvb3RlcixTaGFyZWRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxubGV0IGlkeDogbnVtYmVyID0gMDtcblxuY29uc3Qgc2hvd0FuaW1hdGlvbiA9IGFuaW1hdGlvbihbXG4gICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd7e3RyYW5zZm9ybX19Jywgb3BhY2l0eTogMCB9KSxcbiAgICBhbmltYXRlKCd7e3RyYW5zaXRpb259fScsIHN0eWxlKHsgdHJhbnNmb3JtOiAnbm9uZScsIG9wYWNpdHk6IDEgfSkpXG5dKTtcblxuY29uc3QgaGlkZUFuaW1hdGlvbiA9IGFuaW1hdGlvbihbXG4gICAgYW5pbWF0ZSgne3t0cmFuc2l0aW9ufX0nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3t7dHJhbnNmb3JtfX0nLCBvcGFjaXR5OiAwIH0pKVxuXSk7XG5cbkBDb21wb25lbnQoe1xuc2VsZWN0b3I6ICdwLWRpYWxvZycsXG50ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJ1aS1kaWFsb2ctd3JhcHBlclwiIFtuZ0NsYXNzXT1cImdldFdyYXBwZXJDbGFzcygpXCIgKm5nSWY9XCJtYXNrVmlzaWJsZVwiPlxuICAgICAgICA8ZGl2ICNjb250YWluZXIgW25nQ2xhc3NdPVwieyd1aS1kaWFsb2cgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktc2hhZG93Jzp0cnVlLCAndWktZGlhbG9nLXJ0bCc6cnRsLCd1aS1kaWFsb2ctZHJhZ2dhYmxlJzpkcmFnZ2FibGUsJ3VpLWRpYWxvZy1yZXNpemFibGUnOnJlc2l6YWJsZSwgJ3VpLWRpYWxvZy1tYXhpbWl6ZWQnOiBtYXhpbWl6ZWR9XCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cInZpc2libGVcIlxuICAgICAgICAgICAgW0BhbmltYXRpb25dPVwie3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3RyYW5zZm9ybTogdHJhbnNmb3JtT3B0aW9ucywgdHJhbnNpdGlvbjogdHJhbnNpdGlvbk9wdGlvbnN9fVwiIChAYW5pbWF0aW9uLnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiIChAYW5pbWF0aW9uLmRvbmUpPVwib25BbmltYXRpb25FbmQoJGV2ZW50KVwiIHJvbGU9XCJkaWFsb2dcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaWQgKyAnLWxhYmVsJ1wiPlxuICAgICAgICAgICAgPGRpdiAjdGl0bGViYXIgY2xhc3M9XCJ1aS1kaWFsb2ctdGl0bGViYXIgdWktd2lkZ2V0LWhlYWRlciB1aS1oZWxwZXItY2xlYXJmaXggdWktY29ybmVyLXRvcFwiIChtb3VzZWRvd24pPVwiaW5pdERyYWcoJGV2ZW50KVwiICpuZ0lmPVwic2hvd0hlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIFthdHRyLmlkXT1cImlkICsgJy1sYWJlbCdcIiBjbGFzcz1cInVpLWRpYWxvZy10aXRsZVwiICpuZ0lmPVwiaGVhZGVyXCI+e3toZWFkZXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBbYXR0ci5pZF09XCJpZCArICctbGFiZWwnXCIgY2xhc3M9XCJ1aS1kaWFsb2ctdGl0bGVcIiAqbmdJZj1cImhlYWRlckZhY2V0ICYmIGhlYWRlckZhY2V0LmZpcnN0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGlhbG9nLXRpdGxlYmFyLWljb25zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwibWF4aW1pemFibGVcIiBbbmdDbGFzc109XCJ7J3VpLWRpYWxvZy10aXRsZWJhci1pY29uIHVpLWRpYWxvZy10aXRsZWJhci1tYXhpbWl6ZSB1aS1jb3JuZXItYWxsJzp0cnVlfVwiIHRhYmluZGV4PVwiMFwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwibWF4aW1pemUoKVwiIChrZXlkb3duLmVudGVyKT1cIm1heGltaXplKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cIm1heGltaXplZCA/IG1pbmltaXplSWNvbiA6IG1heGltaXplSWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cImNsb3NhYmxlXCIgW25nQ2xhc3NdPVwieyd1aS1kaWFsb2ctdGl0bGViYXItaWNvbiB1aS1kaWFsb2ctdGl0bGViYXItY2xvc2UgdWktY29ybmVyLWFsbCc6dHJ1ZX1cIiB0YWJpbmRleD1cIjBcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImNsb3NlKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJjbG9zZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY2xvc2VJY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgI2NvbnRlbnQgY2xhc3M9XCJ1aS1kaWFsb2ctY29udGVudCB1aS13aWRnZXQtY29udGVudFwiIFtuZ1N0eWxlXT1cImNvbnRlbnRTdHlsZVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjZm9vdGVyIGNsYXNzPVwidWktZGlhbG9nLWZvb3RlciB1aS13aWRnZXQtY29udGVudFwiICpuZ0lmPVwiZm9vdGVyRmFjZXQgJiYgZm9vdGVyRmFjZXQuZmlyc3RcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cInJlc2l6YWJsZVwiIGNsYXNzPVwidWktcmVzaXphYmxlLWhhbmRsZSB1aS1yZXNpemFibGUtc2UgdWktaWNvbiB1aS1pY29uLWdyaXBzbWFsbC1kaWFnb25hbC1zZVwiIHN0eWxlPVwiei1pbmRleDogOTA7XCIgKG1vdXNlZG93bik9XCJpbml0UmVzaXplKCRldmVudClcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5gLFxuYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2FuaW1hdGlvbicsIFtcbiAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgW1xuICAgICAgICAgICAgdXNlQW5pbWF0aW9uKHNob3dBbmltYXRpb24pXG4gICAgICAgIF0pLFxuICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBbXG4gICAgICAgICAgICB1c2VBbmltYXRpb24oaGlkZUFuaW1hdGlvbilcbiAgICAgICAgXSlcbiAgICBdKVxuXVxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2cgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkcmFnZ2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgcmVzaXphYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHBvc2l0aW9uTGVmdDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgcG9zaXRpb25Ub3A6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGNvbnRlbnRTdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgbW9kYWw6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBjbG9zZU9uRXNjYXBlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGRpc21pc3NhYmxlTWFzazogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHJ0bDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGdldCByZXNwb25zaXZlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHNldCByZXNwb25zaXZlKF9yZXNwb25zaXZlOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2l2ZSBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLlwiKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc2hvd0hlYWRlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBnZXQgYnJlYWtwb2ludCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gNjQ5O1xuICAgIH07XG5cbiAgICBzZXQgYnJlYWtwb2ludChfYnJlYWtwb2ludDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBwcm9wZXJ0eSBpcyBub3QgdXRpbGl6ZWQgYW5kIGRlcHJlY2F0ZWQsIHVzZSBDU1MgbWVkaWEgcXVlcmllcyBpbnN0ZWFkLlwiKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBibG9ja1Njcm9sbDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgbWluWDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIG1pblk6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBmb2N1c09uU2hvdzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBtYXhpbWl6YWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGtlZXBJblZpZXdwb3J0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGZvY3VzVHJhcDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzE1MG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpJztcblxuICAgIEBJbnB1dCgpIGNsb3NlSWNvbjogc3RyaW5nID0gJ3BpIHBpLXRpbWVzJztcblxuICAgIEBJbnB1dCgpIG1pbmltaXplSWNvbjogc3RyaW5nID0gJ3BpIHBpLXdpbmRvdy1taW5pbWl6ZSc7XG5cbiAgICBASW5wdXQoKSBtYXhpbWl6ZUljb246IHN0cmluZyA9ICdwaSBwaS13aW5kb3ctbWF4aW1pemUnO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihIZWFkZXIsIHtkZXNjZW5kYW50czogZmFsc2V9KSBoZWFkZXJGYWNldDogUXVlcnlMaXN0PEhlYWRlcj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKEZvb3Rlciwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pIGZvb3RlckZhY2V0OiBRdWVyeUxpc3Q8SGVhZGVyPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RpdGxlYmFyJykgaGVhZGVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdmb290ZXInKSBmb290ZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAT3V0cHV0KCkgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIHZpc2libGVDaGFuZ2U6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBfdmlzaWJsZTogYm9vbGVhbjtcblxuICAgIG1hc2tWaXNpYmxlOiBib29sZWFuO1xuXG4gICAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcblxuICAgIHdyYXBwZXI6IEhUTUxFbGVtZW50O1xuXG4gICAgZHJhZ2dpbmc6IGJvb2xlYW47XG5cbiAgICBkb2N1bWVudERyYWdMaXN0ZW5lcjogYW55O1xuXG4gICAgZG9jdW1lbnRLZXlkb3duTGlzdGVuZXI6IGFueTtcblxuICAgIGRvY3VtZW50RHJhZ0VuZExpc3RlbmVyOiBhbnk7XG5cbiAgICByZXNpemluZzogYm9vbGVhbjtcblxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IGFueTtcblxuICAgIGRvY3VtZW50UmVzaXplRW5kTGlzdGVuZXI6IGFueTtcblxuICAgIGRvY3VtZW50RXNjYXBlTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gICAgbWFza0NsaWNrTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gICAgbGFzdFBhZ2VYOiBudW1iZXI7XG5cbiAgICBsYXN0UGFnZVk6IG51bWJlcjtcblxuICAgIHByZXZlbnRWaXNpYmxlQ2hhbmdlUHJvcGFnYXRpb246IGJvb2xlYW47XG5cbiAgICBtYXhpbWl6ZWQ6IGJvb2xlYW47XG5cbiAgICBwcmVNYXhpbWl6ZUNvbnRlbnRIZWlnaHQ6IG51bWJlcjtcblxuICAgIHByZU1heGltaXplQ29udGFpbmVyV2lkdGg6IG51bWJlcjtcblxuICAgIHByZU1heGltaXplQ29udGFpbmVySGVpZ2h0OiBudW1iZXI7XG5cbiAgICBwcmVNYXhpbWl6ZVBhZ2VYOiBudW1iZXI7XG5cbiAgICBwcmVNYXhpbWl6ZVBhZ2VZOiBudW1iZXI7XG5cbiAgICBpZDogc3RyaW5nID0gYHVpLWRpYWxvZy0ke2lkeCsrfWA7XG5cbiAgICBfc3R5bGU6IGFueSA9IHt9O1xuXG4gICAgX3Bvc2l0aW9uOiBzdHJpbmcgPSBcImNlbnRlclwiO1xuXG4gICAgb3JpZ2luYWxTdHlsZTogYW55O1xuXG4gICAgdHJhbnNmb3JtT3B0aW9uczogYW55ID0gXCJzY2FsZSgwLjcpXCI7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgem9uZTogTmdab25lLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG5cbiAgICBASW5wdXQoKSBnZXQgdmlzaWJsZSgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZTtcbiAgICB9XG4gICAgc2V0IHZpc2libGUodmFsdWU6YW55KSB7XG4gICAgICAgIHRoaXMuX3Zpc2libGUgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5fdmlzaWJsZSAmJiAhdGhpcy5tYXNrVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5tYXNrVmlzaWJsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgc3R5bGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlO1xuICAgIH1cbiAgICBzZXQgc3R5bGUodmFsdWU6YW55KSB7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSB7Li4udmFsdWV9O1xuICAgICAgICAgICAgdGhpcy5vcmlnaW5hbFN0eWxlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgcG9zaXRpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICAgIH07XG5cbiAgICBzZXQgcG9zaXRpb24odmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHZhbHVlO1xuXG4gICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3RvcGxlZnQnOlxuICAgICAgICAgICAgY2FzZSAnYm90dG9tbGVmdCc6XG4gICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInRyYW5zbGF0ZTNkKC0xMDAlLCAwcHgsIDBweClcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG9wcmlnaHQnOlxuICAgICAgICAgICAgY2FzZSAnYm90dG9tcmlnaHQnOlxuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtT3B0aW9ucyA9IFwidHJhbnNsYXRlM2QoMTAwJSwgMHB4LCAwcHgpXCI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1PcHRpb25zID0gXCJ0cmFuc2xhdGUzZCgwcHgsIDEwMCUsIDBweClcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInRyYW5zbGF0ZTNkKDBweCwgLTEwMCUsIDBweClcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zZm9ybU9wdGlvbnMgPSBcInNjYWxlKDAuNylcIjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXMoKSB7XG4gICAgICAgIGxldCBmb2N1c2FibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXIsICdidXR0b24nKTtcbiAgICAgICAgaWYgKGZvY3VzYWJsZSkge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGZvY3VzYWJsZS5mb2N1cygpLCA1KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBlbmFibGVNb2RhbGl0eSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2FibGUgJiYgdGhpcy5kaXNtaXNzYWJsZU1hc2spIHtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLndyYXBwZXIsICdjbGljaycsIChldmVudDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lci5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkgJiYgIXRoaXMuY29udGFpbmVyLmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZShldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNhYmxlTW9kYWxpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLndyYXBwZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRpc21pc3NhYmxlTWFzaykge1xuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kTWFza0NsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICd1aS1vdmVyZmxvdy1oaWRkZW4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtYXhpbWl6ZSgpIHtcbiAgICAgICAgdGhpcy5tYXhpbWl6ZWQgPSAhdGhpcy5tYXhpbWl6ZWQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLm1vZGFsICYmICF0aGlzLmJsb2NrU2Nyb2xsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXhpbWl6ZWQpXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRNYXNrQ2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMubWFza0NsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMubWFza0NsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZU9uVG9wKCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcbiAgICAgICAgICAgIHRoaXMud3JhcHBlci5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKERvbUhhbmRsZXIuemluZGV4IC0gMSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0V3JhcHBlckNsYXNzKCkge1xuICAgICAgICBsZXQgd3JhcHBlckNsYXNzID0geyd1aS13aWRnZXQtb3ZlcmxheSB1aS1kaWFsb2ctbWFzayc6IHRoaXMubW9kYWwsICd1aS1kaWFsb2ctbWFzay1zY3JvbGxibG9ja2VyJzogdGhpcy5tb2RhbCB8fCB0aGlzLmJsb2NrU2Nyb2xsfTtcbiAgICAgICAgd3JhcHBlckNsYXNzW3RoaXMuZ2V0UG9zaXRpb25DbGFzcygpLnRvU3RyaW5nKCldID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXJDbGFzcztcbiAgICB9XG5cbiAgICBnZXRQb3NpdGlvbkNsYXNzKCkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbnMgPSBbJ2xlZnQnLCAncmlnaHQnLCAndG9wJywgJ3RvcGxlZnQnLCAndG9wcmlnaHQnLCAnYm90dG9tJywgJ2JvdHRvbWxlZnQnLCAnYm90dG9tcmlnaHQnXTtcbiAgICAgICAgY29uc3QgcG9zID0gcG9zaXRpb25zLmZpbmQoaXRlbSA9PiBpdGVtID09PSB0aGlzLnBvc2l0aW9uKTtcblxuICAgICAgICByZXR1cm4gcG9zID8gYHVpLWRpYWxvZy0ke3Bvc31gIDogJyc7XG4gICAgfVxuXG4gICAgaW5pdERyYWcoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAndWktZGlhbG9nLXRpdGxlYmFyLWljb24nKSB8fMKgRG9tSGFuZGxlci5oYXNDbGFzcygoPEhUTUxFbGVtZW50PiBldmVudC50YXJnZXQpLnBhcmVudEVsZW1lbnQsICd1aS1kaWFsb2ctdGl0bGViYXItaWNvbicpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnZ2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVggPSBldmVudC5wYWdlWDtcbiAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VZID0gZXZlbnQucGFnZVk7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICd1aS11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmZvY3VzVHJhcCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSA5KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBmb2N1c2FibGVFbGVtZW50cyA9IERvbUhhbmRsZXIuZ2V0Rm9jdXNhYmxlRWxlbWVudHModGhpcy5jb250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvY3VzYWJsZUVsZW1lbnRzICYmIGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1swXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvY3VzZWRJbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkSW5kZXggPT0gLTEgfHwgZm9jdXNlZEluZGV4ID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNlZEluZGV4IC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkSW5kZXggPT0gLTEgfHwgZm9jdXNlZEluZGV4ID09PSAoZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2VkSW5kZXggKyAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EcmFnKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICBsZXQgY29udGFpbmVyV2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgbGV0IGNvbnRhaW5lckhlaWdodCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgbGV0IGRlbHRhWCA9IGV2ZW50LnBhZ2VYIC0gdGhpcy5sYXN0UGFnZVg7XG4gICAgICAgICAgICBsZXQgZGVsdGFZID0gZXZlbnQucGFnZVkgLSB0aGlzLmxhc3RQYWdlWTtcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSBEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBsZXQgbGVmdFBvcyA9IG9mZnNldC5sZWZ0ICsgZGVsdGFYO1xuICAgICAgICAgICAgbGV0IHRvcFBvcyA9IG9mZnNldC50b3AgKyBkZWx0YVk7XG4gICAgICAgICAgICBsZXQgdmlld3BvcnQgPSBEb21IYW5kbGVyLmdldFZpZXdwb3J0KCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmtlZXBJblZpZXdwb3J0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGxlZnRQb3MgPj0gdGhpcy5taW5YICYmIChsZWZ0UG9zICsgY29udGFpbmVyV2lkdGgpIDwgdmlld3BvcnQud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUubGVmdCA9IGxlZnRQb3MgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gbGVmdFBvcyArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRvcFBvcyA+PSB0aGlzLm1pblkgJiYgKHRvcFBvcyArIGNvbnRhaW5lckhlaWdodCkgPCB2aWV3cG9ydC5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUudG9wID0gdG9wUG9zICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0UGFnZVkgPSBldmVudC5wYWdlWTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gdG9wUG9zICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBsZWZ0UG9zICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RQYWdlWSA9IGV2ZW50LnBhZ2VZO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCA9IHRvcFBvcyArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmREcmFnKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdnYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5kcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktdW5zZWxlY3RhYmxlLXRleHQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRSZXNpemUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXphYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWSA9IGV2ZW50LnBhZ2VZO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktdW5zZWxlY3RhYmxlLXRleHQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUmVzaXplKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6aW5nKSB7XG4gICAgICAgICAgICBsZXQgZGVsdGFYID0gZXZlbnQucGFnZVggLSB0aGlzLmxhc3RQYWdlWDtcbiAgICAgICAgICAgIGxldCBkZWx0YVkgPSBldmVudC5wYWdlWSAtIHRoaXMubGFzdFBhZ2VZO1xuICAgICAgICAgICAgbGV0IGNvbnRhaW5lcldpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGxldCBjb250YWluZXJIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGxldCBjb250ZW50SGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgbmV3V2lkdGggPSBjb250YWluZXJXaWR0aCArIGRlbHRhWDtcbiAgICAgICAgICAgIGxldCBuZXdIZWlnaHQgPSBjb250YWluZXJIZWlnaHQgKyBkZWx0YVk7XG4gICAgICAgICAgICBsZXQgbWluV2lkdGggPSB0aGlzLmNvbnRhaW5lci5zdHlsZS5taW5XaWR0aDtcbiAgICAgICAgICAgIGxldCBtaW5IZWlnaHQgPSB0aGlzLmNvbnRhaW5lci5zdHlsZS5taW5IZWlnaHQ7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgbGV0IHZpZXdwb3J0ID0gRG9tSGFuZGxlci5nZXRWaWV3cG9ydCgpO1xuXG4gICAgICAgICAgICBpZiAoKCFtaW5XaWR0aCB8fCBuZXdXaWR0aCA+IHBhcnNlSW50KG1pbldpZHRoKSkgJiYgKG9mZnNldC5sZWZ0ICsgbmV3V2lkdGgpIDwgdmlld3BvcnQud2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdHlsZS53aWR0aCA9IG5ld1dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IHRoaXMuX3N0eWxlLndpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoKCFtaW5IZWlnaHQgfHwgbmV3SGVpZ2h0ID4gcGFyc2VJbnQobWluSGVpZ2h0KSkgJiYgKG9mZnNldC50b3AgKyBuZXdIZWlnaHQpIDwgdmlld3BvcnQuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZW50Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gY29udGVudEhlaWdodCArIGRlbHRhWSArICdweCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubGFzdFBhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgICAgICAgICB0aGlzLmxhc3RQYWdlWSA9IGV2ZW50LnBhZ2VZO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25SZXNpemVFbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICd1aS11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZEdsb2JhbExpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNUcmFwKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudEtleWRvd25MaXN0ZW5lcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmREb2N1bWVudERyYWdMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnREcmFnRW5kTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlc2l6YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRSZXNpemVMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNsb3NlT25Fc2NhcGUgJiYgdGhpcy5jbG9zYWJsZSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kR2xvYmFsTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RHJhZ0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRLZXlkb3duTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudERyYWdFbmRMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXJzKCk7XG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudEtleWRvd25MaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRLZXlkb3duTGlzdGVuZXIgPSB0aGlzLm9uS2V5ZG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmRvY3VtZW50S2V5ZG93bkxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRLZXlkb3duTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50S2V5ZG93bkxpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuZG9jdW1lbnRLZXlkb3duTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEtleWRvd25MaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnREcmFnTGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RHJhZ0xpc3RlbmVyID0gdGhpcy5vbkRyYWcuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY3VtZW50RHJhZ0xpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnREcmFnTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50RHJhZ0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2N1bWVudERyYWdMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RHJhZ0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudERyYWdFbmRMaXN0ZW5lcigpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIgPSB0aGlzLmVuZERyYWcuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5kb2N1bWVudERyYWdFbmRMaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50RHJhZ0VuZExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudERyYWdFbmRMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY3VtZW50RHJhZ0VuZExpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnREcmFnRW5kTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUVuZExpc3RlbmVyID0gdGhpcy5vblJlc2l6ZUVuZC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jdW1lbnRSZXNpemVFbmRMaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyICYmIHRoaXMuZG9jdW1lbnRSZXNpemVFbmRMaXN0ZW5lcikge1xuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jdW1lbnRSZXNpemVFbmRMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUVuZExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudEVzY2FwZUxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09IDI3KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHRoaXMuY29udGFpbmVyLnN0eWxlLnpJbmRleCkgPT09IChEb21IYW5kbGVyLnppbmRleCArIHRoaXMuYmFzZVpJbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZShldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudEVzY2FwZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcHBlbmRDb250YWluZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIsIHRoaXMuYXBwZW5kVG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZUFwcGVuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyICYmIHRoaXMuYXBwZW5kVG8pIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBldmVudC5lbGVtZW50O1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcHBlciA9IHRoaXMuY29udGFpbmVyLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5vblNob3cuZW1pdCh7fSk7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmRDb250YWluZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVPblRvcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZEdsb2JhbExpc3RlbmVycygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGVNb2RhbGl0eSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tb2RhbCAmJiB0aGlzLmJsb2NrU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3VpLW92ZXJmbG93LWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZvY3VzT25TaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2goZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbnRhaW5lckRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uSGlkZS5lbWl0KHt9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db250YWluZXJEZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZEdsb2JhbExpc3RlbmVycygpO1xuICAgICAgICB0aGlzLmRyYWdnaW5nID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5tYXNrVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLm1heGltaXplZCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgICAgICB0aGlzLm1heGltaXplZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZU1vZGFsaXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ibG9ja1Njcm9sbCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktb3ZlcmZsb3ctaGlkZGVuJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgICAgIHRoaXMud3JhcHBlciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fc3R5bGUgPSB0aGlzLm9yaWdpbmFsU3R5bGUgPyB7Li4udGhpcy5vcmlnaW5hbFN0eWxlfSA6IHt9O1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdG9yZUFwcGVuZCgpO1xuICAgICAgICAgICAgdGhpcy5vbkNvbnRhaW5lckRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG5leHBvcnRzOiBbRGlhbG9nLFNoYXJlZE1vZHVsZV0sXG5kZWNsYXJhdGlvbnM6IFtEaWFsb2ddXG59KVxuZXhwb3J0IGNsYXNzIERpYWxvZ01vZHVsZSB7IH1cbiJdfQ==