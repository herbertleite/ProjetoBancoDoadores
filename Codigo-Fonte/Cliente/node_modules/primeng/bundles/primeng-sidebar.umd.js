(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/sidebar', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.sidebar = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom));
}(this, (function (exports, core, animations, common, dom) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Sidebar = /** @class */ (function () {
        function Sidebar(el, renderer) {
            this.el = el;
            this.renderer = renderer;
            this.position = 'left';
            this.blockScroll = false;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.modal = true;
            this.dismissible = true;
            this.showCloseIcon = true;
            this.closeOnEscape = true;
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
            this.visibleChange = new core.EventEmitter();
        }
        Sidebar.prototype.ngAfterViewInit = function () {
            this.initialized = true;
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.containerViewChild.nativeElement);
                else
                    dom.DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
            }
            if (this.visible) {
                this.show();
            }
        };
        Object.defineProperty(Sidebar.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (val) {
                this._visible = val;
                if (this.initialized && this.containerViewChild && this.containerViewChild.nativeElement) {
                    if (this._visible)
                        this.show();
                    else {
                        if (this.preventVisibleChangePropagation)
                            this.preventVisibleChangePropagation = false;
                        else
                            this.hide();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Sidebar.prototype.ngAfterViewChecked = function () {
            if (this.executePostDisplayActions) {
                this.onShow.emit({});
                this.executePostDisplayActions = false;
            }
        };
        Sidebar.prototype.show = function () {
            this.executePostDisplayActions = true;
            if (this.autoZIndex) {
                this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
            if (this.modal) {
                this.enableModality();
            }
        };
        Sidebar.prototype.hide = function () {
            this.onHide.emit({});
            if (this.modal) {
                this.disableModality();
            }
        };
        Sidebar.prototype.close = function (event) {
            this.preventVisibleChangePropagation = true;
            this.hide();
            this.visibleChange.emit(false);
            event.preventDefault();
        };
        Sidebar.prototype.enableModality = function () {
            var _this = this;
            if (!this.mask) {
                this.mask = document.createElement('div');
                this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1);
                dom.DomHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-sidebar-mask');
                if (this.dismissible) {
                    this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                        if (_this.dismissible) {
                            _this.close(event);
                        }
                    });
                }
                document.body.appendChild(this.mask);
                if (this.blockScroll) {
                    dom.DomHandler.addClass(document.body, 'ui-overflow-hidden');
                }
            }
        };
        Sidebar.prototype.disableModality = function () {
            if (this.mask) {
                this.unbindMaskClickListener();
                document.body.removeChild(this.mask);
                if (this.blockScroll) {
                    dom.DomHandler.removeClass(document.body, 'ui-overflow-hidden');
                }
                this.mask = null;
            }
        };
        Sidebar.prototype.onAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    if (this.closeOnEscape) {
                        this.bindDocumentEscapeListener();
                    }
                    break;
                case 'hidden':
                    this.unbindGlobalListeners();
                    break;
            }
        };
        Sidebar.prototype.bindDocumentEscapeListener = function () {
            var _this = this;
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
                if (event.which == 27) {
                    if (parseInt(_this.containerViewChild.nativeElement.style.zIndex) === (dom.DomHandler.zindex + _this.baseZIndex)) {
                        _this.close(event);
                    }
                }
            });
        };
        Sidebar.prototype.unbindDocumentEscapeListener = function () {
            if (this.documentEscapeListener) {
                this.documentEscapeListener();
                this.documentEscapeListener = null;
            }
        };
        Sidebar.prototype.unbindMaskClickListener = function () {
            if (this.maskClickListener) {
                this.maskClickListener();
                this.maskClickListener = null;
            }
        };
        Sidebar.prototype.unbindGlobalListeners = function () {
            this.unbindMaskClickListener();
            this.unbindDocumentEscapeListener();
        };
        Sidebar.prototype.ngOnDestroy = function () {
            this.initialized = false;
            if (this.visible) {
                this.hide();
            }
            if (this.appendTo) {
                this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
            }
            this.unbindGlobalListeners();
        };
        Sidebar.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input()
        ], Sidebar.prototype, "position", void 0);
        __decorate([
            core.Input()
        ], Sidebar.prototype, "fullScreen", void 0);
        __decorate([
            core.Input()
        ], Sidebar.prototype, "appendTo", void 0);
        __decorate([
            core.Input()
        ], Sidebar.prototype, "blockScroll", void 0);
        __decorate([
            core.Input()
        ], Sidebar.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], Sidebar.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], Sidebar.prototype, "ariaCloseLabel", void 0);
        __decorate([
            core.Input()
        ], Sidebar.prototype, "autoZIndex", void 0);
        __decorate([
            core.Input()
        ], Sidebar.prototype, "baseZIndex", void 0);
        __decorate([
            core.Input()
        ], Sidebar.prototype, "modal", void 0);
        __decorate([
            core.Input()
        ], Sidebar.prototype, "dismissible", void 0);
        __decorate([
            core.Input()
        ], Sidebar.prototype, "showCloseIcon", void 0);
        __decorate([
            core.Input()
        ], Sidebar.prototype, "closeOnEscape", void 0);
        __decorate([
            core.ViewChild('container', { static: true })
        ], Sidebar.prototype, "containerViewChild", void 0);
        __decorate([
            core.Output()
        ], Sidebar.prototype, "onShow", void 0);
        __decorate([
            core.Output()
        ], Sidebar.prototype, "onHide", void 0);
        __decorate([
            core.Output()
        ], Sidebar.prototype, "visibleChange", void 0);
        __decorate([
            core.Input()
        ], Sidebar.prototype, "visible", null);
        Sidebar = __decorate([
            core.Component({
                selector: 'p-sidebar',
                template: "\n        <div #container [ngClass]=\"{'ui-sidebar ui-widget ui-widget-content ui-shadow':true, 'ui-sidebar-active': visible, \n            'ui-sidebar-left': (position === 'left'), 'ui-sidebar-right': (position === 'right'),\n            'ui-sidebar-top': (position === 'top'), 'ui-sidebar-bottom': (position === 'bottom'), \n            'ui-sidebar-full': fullScreen}\"\n            [@panelState]=\"visible ? 'visible' : 'hidden'\" (@panelState.start)=\"onAnimationStart($event)\" [ngStyle]=\"style\" [class]=\"styleClass\"  role=\"complementary\" [attr.aria-modal]=\"modal\">\n            <a [ngClass]=\"{'ui-sidebar-close ui-corner-all':true}\" *ngIf=\"showCloseIcon\" tabindex=\"0\" role=\"button\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\" [attr.aria-label]=\"ariaCloseLabel\">\n                <span class=\"pi pi-times\"></span>\n            </a>\n            <ng-content></ng-content>\n        </div>\n    ",
                animations: [
                    animations.trigger('panelState', [
                        animations.state('hidden', animations.style({
                            opacity: 0
                        })),
                        animations.state('visible', animations.style({
                            opacity: 1
                        })),
                        animations.transition('visible => hidden', animations.animate('300ms ease-in')),
                        animations.transition('hidden => visible', animations.animate('300ms ease-out'))
                    ])
                ]
            })
        ], Sidebar);
        return Sidebar;
    }());
    var SidebarModule = /** @class */ (function () {
        function SidebarModule() {
        }
        SidebarModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [Sidebar],
                declarations: [Sidebar]
            })
        ], SidebarModule);
        return SidebarModule;
    }());

    exports.Sidebar = Sidebar;
    exports.SidebarModule = SidebarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-sidebar.umd.js.map
