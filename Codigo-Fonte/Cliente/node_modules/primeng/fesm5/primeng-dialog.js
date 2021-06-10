import { EventEmitter, ElementRef, Renderer2, NgZone, ChangeDetectorRef, Input, ContentChildren, ViewChild, Output, Component, NgModule } from '@angular/core';
import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Header, Footer, SharedModule } from 'primeng/api';

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var idx = 0;
var showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}', style({ transform: 'none', opacity: 1 }))
]);
var hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);
var Dialog = /** @class */ (function () {
    function Dialog(el, renderer, zone, cd) {
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
        this.id = "ui-dialog-" + idx++;
        this._style = {};
        this._position = "center";
        this.transformOptions = "scale(0.7)";
    }
    Object.defineProperty(Dialog.prototype, "responsive", {
        get: function () {
            return false;
        },
        set: function (_responsive) {
            console.log("Responsive property is deprecated.");
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Dialog.prototype, "breakpoint", {
        get: function () {
            return 649;
        },
        set: function (_breakpoint) {
            console.log("Breakpoint property is not utilized and deprecated, use CSS media queries instead.");
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Dialog.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            this._visible = value;
            if (this._visible && !this.maskVisible) {
                this.maskVisible = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "style", {
        get: function () {
            return this._style;
        },
        set: function (value) {
            if (value) {
                this._style = __assign({}, value);
                this.originalStyle = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    ;
    Dialog.prototype.focus = function () {
        var focusable = DomHandler.findSingle(this.container, 'button');
        if (focusable) {
            this.zone.runOutsideAngular(function () {
                setTimeout(function () { return focusable.focus(); }, 5);
            });
        }
    };
    Dialog.prototype.close = function (event) {
        this.visibleChange.emit(false);
        event.preventDefault();
    };
    Dialog.prototype.enableModality = function () {
        var _this = this;
        if (this.closable && this.dismissableMask) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'click', function (event) {
                if (!_this.container.isSameNode(event.target) && !_this.container.contains(event.target)) {
                    _this.close(event);
                }
            });
        }
        if (this.modal) {
            DomHandler.addClass(document.body, 'ui-overflow-hidden');
        }
    };
    Dialog.prototype.disableModality = function () {
        if (this.wrapper) {
            if (this.dismissableMask) {
                this.unbindMaskClickListener();
            }
            if (this.modal) {
                DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            this.cd.detectChanges();
        }
    };
    Dialog.prototype.maximize = function () {
        this.maximized = !this.maximized;
        if (!this.modal && !this.blockScroll) {
            if (this.maximized)
                DomHandler.addClass(document.body, 'ui-overflow-hidden');
            else
                DomHandler.removeClass(document.body, 'ui-overflow-hidden');
        }
    };
    Dialog.prototype.unbindMaskClickListener = function () {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    };
    Dialog.prototype.moveOnTop = function () {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
            this.wrapper.style.zIndex = String(this.baseZIndex + (DomHandler.zindex - 1));
        }
    };
    Dialog.prototype.getWrapperClass = function () {
        var wrapperClass = { 'ui-widget-overlay ui-dialog-mask': this.modal, 'ui-dialog-mask-scrollblocker': this.modal || this.blockScroll };
        wrapperClass[this.getPositionClass().toString()] = true;
        return wrapperClass;
    };
    Dialog.prototype.getPositionClass = function () {
        var _this = this;
        var positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
        var pos = positions.find(function (item) { return item === _this.position; });
        return pos ? "ui-dialog-" + pos : '';
    };
    Dialog.prototype.initDrag = function (event) {
        if (DomHandler.hasClass(event.target, 'ui-dialog-titlebar-icon') || DomHandler.hasClass(event.target.parentElement, 'ui-dialog-titlebar-icon')) {
            return;
        }
        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            DomHandler.addClass(document.body, 'ui-unselectable-text');
        }
    };
    Dialog.prototype.onKeydown = function (event) {
        if (this.focusTrap) {
            if (event.which === 9) {
                event.preventDefault();
                var focusableElements = DomHandler.getFocusableElements(this.container);
                if (focusableElements && focusableElements.length > 0) {
                    if (!document.activeElement) {
                        focusableElements[0].focus();
                    }
                    else {
                        var focusedIndex = focusableElements.indexOf(document.activeElement);
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
    };
    Dialog.prototype.onDrag = function (event) {
        if (this.dragging) {
            var containerWidth = DomHandler.getOuterWidth(this.container);
            var containerHeight = DomHandler.getOuterHeight(this.container);
            var deltaX = event.pageX - this.lastPageX;
            var deltaY = event.pageY - this.lastPageY;
            var offset = DomHandler.getOffset(this.container);
            var leftPos = offset.left + deltaX;
            var topPos = offset.top + deltaY;
            var viewport = DomHandler.getViewport();
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
    };
    Dialog.prototype.endDrag = function (event) {
        if (this.draggable) {
            this.dragging = false;
            DomHandler.removeClass(document.body, 'ui-unselectable-text');
        }
    };
    Dialog.prototype.initResize = function (event) {
        if (this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            DomHandler.addClass(document.body, 'ui-unselectable-text');
        }
    };
    Dialog.prototype.onResize = function (event) {
        if (this.resizing) {
            var deltaX = event.pageX - this.lastPageX;
            var deltaY = event.pageY - this.lastPageY;
            var containerWidth = DomHandler.getOuterWidth(this.container);
            var containerHeight = DomHandler.getOuterHeight(this.container);
            var contentHeight = DomHandler.getOuterHeight(this.contentViewChild.nativeElement);
            var newWidth = containerWidth + deltaX;
            var newHeight = containerHeight + deltaY;
            var minWidth = this.container.style.minWidth;
            var minHeight = this.container.style.minHeight;
            var offset = DomHandler.getOffset(this.container);
            var viewport = DomHandler.getViewport();
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
    };
    Dialog.prototype.onResizeEnd = function () {
        if (this.resizing) {
            this.resizing = false;
            DomHandler.removeClass(document.body, 'ui-unselectable-text');
        }
    };
    Dialog.prototype.bindGlobalListeners = function () {
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
    };
    Dialog.prototype.unbindGlobalListeners = function () {
        this.unbindDocumentDragListener();
        this.unbindDocumentKeydownListener();
        this.unbindDocumentDragEndListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentEscapeListener();
    };
    Dialog.prototype.bindDocumentKeydownListener = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentKeydownListener = _this.onKeydown.bind(_this);
            window.document.addEventListener('keydown', _this.documentKeydownListener);
        });
    };
    Dialog.prototype.unbindDocumentKeydownListener = function () {
        if (this.documentKeydownListener) {
            window.document.removeEventListener('keydown', this.documentKeydownListener);
            this.documentKeydownListener = null;
        }
    };
    Dialog.prototype.bindDocumentDragListener = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentDragListener = _this.onDrag.bind(_this);
            window.document.addEventListener('mousemove', _this.documentDragListener);
        });
    };
    Dialog.prototype.unbindDocumentDragListener = function () {
        if (this.documentDragListener) {
            window.document.removeEventListener('mousemove', this.documentDragListener);
            this.documentDragListener = null;
        }
    };
    Dialog.prototype.bindDocumentDragEndListener = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentDragEndListener = _this.endDrag.bind(_this);
            window.document.addEventListener('mouseup', _this.documentDragEndListener);
        });
    };
    Dialog.prototype.unbindDocumentDragEndListener = function () {
        if (this.documentDragEndListener) {
            window.document.removeEventListener('mouseup', this.documentDragEndListener);
            this.documentDragEndListener = null;
        }
    };
    Dialog.prototype.bindDocumentResizeListeners = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.documentResizeListener = _this.onResize.bind(_this);
            _this.documentResizeEndListener = _this.onResizeEnd.bind(_this);
            window.document.addEventListener('mousemove', _this.documentResizeListener);
            window.document.addEventListener('mouseup', _this.documentResizeEndListener);
        });
    };
    Dialog.prototype.unbindDocumentResizeListeners = function () {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            window.document.removeEventListener('mousemove', this.documentResizeListener);
            window.document.removeEventListener('mouseup', this.documentResizeEndListener);
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    };
    Dialog.prototype.bindDocumentEscapeListener = function () {
        var _this = this;
        this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
            if (event.which == 27) {
                if (parseInt(_this.container.style.zIndex) === (DomHandler.zindex + _this.baseZIndex)) {
                    _this.close(event);
                }
            }
        });
    };
    Dialog.prototype.unbindDocumentEscapeListener = function () {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    };
    Dialog.prototype.appendContainer = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    };
    Dialog.prototype.restoreAppend = function () {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    };
    Dialog.prototype.onAnimationStart = function (event) {
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
    };
    Dialog.prototype.onAnimationEnd = function (event) {
        switch (event.toState) {
            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
                break;
        }
    };
    Dialog.prototype.onContainerDestroy = function () {
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
        this._style = this.originalStyle ? __assign({}, this.originalStyle) : {};
    };
    Dialog.prototype.ngOnDestroy = function () {
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
    };
    Dialog.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgZone },
        { type: ChangeDetectorRef }
    ]; };
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
            template: "\n    <div class=\"ui-dialog-wrapper\" [ngClass]=\"getWrapperClass()\" *ngIf=\"maskVisible\">\n        <div #container [ngClass]=\"{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true, 'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable,'ui-dialog-resizable':resizable, 'ui-dialog-maximized': maximized}\"\n            [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"visible\"\n            [@animation]=\"{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}\" (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\" role=\"dialog\" [attr.aria-labelledby]=\"id + '-label'\">\n            <div #titlebar class=\"ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top\" (mousedown)=\"initDrag($event)\" *ngIf=\"showHeader\">\n                <span [attr.id]=\"id + '-label'\" class=\"ui-dialog-title\" *ngIf=\"header\">{{header}}</span>\n                <span [attr.id]=\"id + '-label'\" class=\"ui-dialog-title\" *ngIf=\"headerFacet && headerFacet.first\">\n                    <ng-content select=\"p-header\"></ng-content>\n                </span>\n                <div class=\"ui-dialog-titlebar-icons\">\n                    <a *ngIf=\"maximizable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-maximize ui-corner-all':true}\" tabindex=\"0\" role=\"button\" (click)=\"maximize()\" (keydown.enter)=\"maximize()\">\n                        <span [ngClass]=\"maximized ? minimizeIcon : maximizeIcon\"></span>\n                    </a>\n                    <a *ngIf=\"closable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}\" tabindex=\"0\" role=\"button\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\">\n                        <span [class]=\"closeIcon\"></span>\n                    </a>\n                </div>\n            </div>\n            <div #content class=\"ui-dialog-content ui-widget-content\" [ngStyle]=\"contentStyle\">\n                <ng-content></ng-content>\n            </div>\n            <div #footer class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"footerFacet && footerFacet.first\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n            <div *ngIf=\"resizable\" class=\"ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se\" style=\"z-index: 90;\" (mousedown)=\"initResize($event)\"></div>\n        </div>\n    </div>\n",
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
    return Dialog;
}());
var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Dialog, SharedModule],
            declarations: [Dialog]
        })
    ], DialogModule);
    return DialogModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Dialog, DialogModule };
//# sourceMappingURL=primeng-dialog.js.map
