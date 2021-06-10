(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('primeng/tieredmenu', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', '@angular/router'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.tieredmenu = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.ng.router));
}(this, (function (exports, core, animations, common, dom, router) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var TieredMenuSub = /** @class */ (function () {
        function TieredMenuSub(tieredMenu, cf, renderer) {
            this.cf = cf;
            this.renderer = renderer;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.tieredMenu = tieredMenu;
        }
        Object.defineProperty(TieredMenuSub.prototype, "parentActive", {
            get: function () {
                return this._parentActive;
            },
            set: function (value) {
                this._parentActive = value;
                if (!value) {
                    this.activeItem = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        TieredMenuSub.prototype.ngAfterViewInit = function () {
            if (this.root && !this.tieredMenu.popup) {
                this.bindDocumentClickListener();
            }
        };
        TieredMenuSub.prototype.onItemMouseEnter = function (event, item, menuitem) {
            if (this.tieredMenu.popup || (!this.root || this.activeItem)) {
                if (menuitem.disabled) {
                    return;
                }
                this.activeItem = item;
                var nextElement = item.children[0].nextElementSibling;
                if (nextElement) {
                    var sublist = nextElement.children[0];
                    if (this.autoZIndex) {
                        sublist.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                    }
                    sublist.style.zIndex = String(++dom.DomHandler.zindex);
                    sublist.style.top = '0px';
                    sublist.style.left = dom.DomHandler.getOuterWidth(item.children[0]) + 'px';
                }
            }
        };
        TieredMenuSub.prototype.itemClick = function (event, item, menuitem) {
            if (menuitem.disabled) {
                event.preventDefault();
                return true;
            }
            if (!menuitem.url) {
                event.preventDefault();
            }
            if (menuitem.command) {
                menuitem.command({
                    originalEvent: event,
                    item: item
                });
            }
            if (this.root && !this.activeItem && !this.tieredMenu.popup) {
                this.activeItem = item;
                var nextElement = item.children[0].nextElementSibling;
                if (nextElement) {
                    var sublist = nextElement.children[0];
                    if (this.autoZIndex) {
                        sublist.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                    }
                    sublist.style.zIndex = String(++dom.DomHandler.zindex);
                    sublist.style.top = '0px';
                    sublist.style.left = dom.DomHandler.getOuterWidth(item.children[0]) + 'px';
                    this.rootItemClick = true;
                }
            }
            if (!menuitem.items && this.tieredMenu.popup) {
                this.tieredMenu.hide();
            }
        };
        TieredMenuSub.prototype.listClick = function (event) {
            if (!this.rootItemClick) {
                this.activeItem = null;
            }
        };
        TieredMenuSub.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                this.documentClickListener = this.renderer.listen('document', 'click', function () {
                    if (!_this.rootItemClick) {
                        _this.parentActive = false;
                        _this.activeItem = null;
                    }
                    _this.rootItemClick = false;
                });
            }
        };
        TieredMenuSub.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        TieredMenuSub.prototype.ngOnDestroy = function () {
            if (this.root && !this.tieredMenu.popup) {
                this.unbindDocumentClickListener();
            }
        };
        TieredMenuSub.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return TieredMenu; }),] }] },
            { type: core.ChangeDetectorRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input()
        ], TieredMenuSub.prototype, "item", void 0);
        __decorate([
            core.Input()
        ], TieredMenuSub.prototype, "root", void 0);
        __decorate([
            core.Input()
        ], TieredMenuSub.prototype, "autoZIndex", void 0);
        __decorate([
            core.Input()
        ], TieredMenuSub.prototype, "baseZIndex", void 0);
        __decorate([
            core.Input()
        ], TieredMenuSub.prototype, "parentActive", null);
        TieredMenuSub = __decorate([
            core.Component({
                selector: 'p-tieredMenuSub',
                template: "\n        <ul [ngClass]=\"{'ui-widget-content ui-corner-all ui-shadow ui-submenu-list': !root}\" (click)=\"listClick($event)\" role=\"menubar\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': child.visible === false}\" role=\"separator\">\n                <li *ngIf=\"!child.separator\" #listItem [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}\"\n                    [class]=\"child.styleClass\" [ngStyle]=\"child.style\" role=\"none\"\n                    (mouseenter)=\"onItemMouseEnter($event, listItem, child)\">\n                    <a *ngIf=\"!child.routerLink\" [attr.href]=\"child.url\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"child.target\" [attr.tabindex]=\"child.tabindex ? child.tabindex : '0'\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" \n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" (click)=\"itemClick($event, listItem, child)\" role=\"menuitem\" [attr.aria-haspopup]=\"item.items != null\" [attr.aria-expanded]=\"item === activeItem\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" role=\"menuitem\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-state-active'\" role=\"menuitem\" [attr.tabindex]=\"child.tabindex ? child.tabindex : '0'\"\n                        [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\"\n                        class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" (click)=\"itemClick($event, listItem, child)\">\n                        \n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <p-tieredMenuSub class=\"ui-submenu\" [item]=\"child\" *ngIf=\"child.items\" [baseZIndex]=\"baseZIndex\" [parentActive]=\"listItem==activeItem\" [autoZIndex]=\"autoZIndex\"></p-tieredMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    "
            }),
            __param(0, core.Inject(core.forwardRef(function () { return TieredMenu; })))
        ], TieredMenuSub);
        return TieredMenuSub;
    }());
    var TieredMenu = /** @class */ (function () {
        function TieredMenu(el, renderer) {
            this.el = el;
            this.renderer = renderer;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.showTransitionOptions = '225ms ease-out';
            this.hideTransitionOptions = '195ms ease-in';
        }
        TieredMenu.prototype.toggle = function (event) {
            if (this.visible)
                this.hide();
            else
                this.show(event);
            this.preventDocumentDefault = true;
        };
        TieredMenu.prototype.show = function (event) {
            this.target = event.currentTarget;
            this.visible = true;
            this.parentActive = true;
            this.preventDocumentDefault = true;
        };
        TieredMenu.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    if (this.popup) {
                        this.container = event.element;
                        this.moveOnTop();
                        this.appendOverlay();
                        dom.DomHandler.absolutePosition(this.container, this.target);
                        this.bindDocumentClickListener();
                        this.bindDocumentResizeListener();
                    }
                    break;
                case 'void':
                    this.onOverlayHide();
                    break;
            }
        };
        TieredMenu.prototype.appendOverlay = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.container);
                else
                    dom.DomHandler.appendChild(this.container, this.appendTo);
            }
        };
        TieredMenu.prototype.restoreOverlayAppend = function () {
            if (this.container && this.appendTo) {
                this.el.nativeElement.appendChild(this.container);
            }
        };
        TieredMenu.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                this.container.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
        };
        TieredMenu.prototype.hide = function () {
            this.visible = false;
            this.parentActive = false;
        };
        TieredMenu.prototype.onWindowResize = function () {
            this.hide();
        };
        TieredMenu.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                this.documentClickListener = this.renderer.listen('document', 'click', function () {
                    if (!_this.preventDocumentDefault && _this.popup) {
                        _this.hide();
                    }
                    _this.preventDocumentDefault = false;
                });
            }
        };
        TieredMenu.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        TieredMenu.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        TieredMenu.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        TieredMenu.prototype.onOverlayHide = function () {
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
            this.preventDocumentDefault = false;
            this.target = null;
        };
        TieredMenu.prototype.ngOnDestroy = function () {
            if (this.popup) {
                this.restoreOverlayAppend();
                this.onOverlayHide();
            }
        };
        TieredMenu.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input()
        ], TieredMenu.prototype, "model", void 0);
        __decorate([
            core.Input()
        ], TieredMenu.prototype, "popup", void 0);
        __decorate([
            core.Input()
        ], TieredMenu.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], TieredMenu.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], TieredMenu.prototype, "appendTo", void 0);
        __decorate([
            core.Input()
        ], TieredMenu.prototype, "autoZIndex", void 0);
        __decorate([
            core.Input()
        ], TieredMenu.prototype, "baseZIndex", void 0);
        __decorate([
            core.Input()
        ], TieredMenu.prototype, "showTransitionOptions", void 0);
        __decorate([
            core.Input()
        ], TieredMenu.prototype, "hideTransitionOptions", void 0);
        TieredMenu = __decorate([
            core.Component({
                selector: 'p-tieredMenu',
                template: "\n        <div [ngClass]=\"{'ui-tieredmenu ui-widget ui-widget-content ui-corner-all':true, 'ui-tieredmenu-dynamic ui-shadow':popup}\" [class]=\"styleClass\" [ngStyle]=\"style\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"popup !== true\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" *ngIf=\"!popup || visible\">\n            <p-tieredMenuSub [item]=\"model\" root=\"root\" [parentActive]=\"parentActive\" [baseZIndex]=\"baseZIndex\" [autoZIndex]=\"autoZIndex\"></p-tieredMenuSub>\n        </div>\n    ",
                animations: [
                    animations.trigger('overlayAnimation', [
                        animations.state('void', animations.style({
                            transform: 'translateY(5%)',
                            opacity: 0
                        })),
                        animations.state('visible', animations.style({
                            transform: 'translateY(0)',
                            opacity: 1
                        })),
                        animations.transition('void => visible', animations.animate('{{showTransitionParams}}')),
                        animations.transition('visible => void', animations.animate('{{hideTransitionParams}}'))
                    ])
                ]
            })
        ], TieredMenu);
        return TieredMenu;
    }());
    var TieredMenuModule = /** @class */ (function () {
        function TieredMenuModule() {
        }
        TieredMenuModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, router.RouterModule],
                exports: [TieredMenu, router.RouterModule],
                declarations: [TieredMenu, TieredMenuSub]
            })
        ], TieredMenuModule);
        return TieredMenuModule;
    }());

    exports.TieredMenu = TieredMenu;
    exports.TieredMenuModule = TieredMenuModule;
    exports.TieredMenuSub = TieredMenuSub;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tieredmenu.umd.js.map
