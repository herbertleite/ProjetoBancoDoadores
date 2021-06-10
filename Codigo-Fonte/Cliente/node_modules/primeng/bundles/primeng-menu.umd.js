(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('primeng/menu', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', '@angular/router'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.menu = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.ng.router));
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
    var __values = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var MenuItemContent = /** @class */ (function () {
        function MenuItemContent(menu) {
            this.menu = menu;
        }
        MenuItemContent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return Menu; }),] }] }
        ]; };
        __decorate([
            core.Input("pMenuItemContent")
        ], MenuItemContent.prototype, "item", void 0);
        MenuItemContent = __decorate([
            core.Component({
                selector: '[pMenuItemContent]',
                template: "\n        <a *ngIf=\"!item.routerLink\" [attr.href]=\"item.url||null\" class=\"ui-menuitem-link ui-corner-all\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\" [attr.data-automationid]=\"item.automationId\" [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\"\n            [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"menu.itemClick($event, item)\" role=\"menuitem\">\n            <span class=\"ui-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n        </a>\n        <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [attr.data-automationid]=\"item.automationId\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'ui-state-active'\"\n            [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\" \n             [attr.title]=\"item.title\" [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"menu.itemClick($event, item)\" role=\"menuitem\">\n            <span class=\"ui-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n        </a>\n    "
            }),
            __param(0, core.Inject(core.forwardRef(function () { return Menu; })))
        ], MenuItemContent);
        return MenuItemContent;
    }());
    var Menu = /** @class */ (function () {
        function Menu(el, renderer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.showTransitionOptions = '225ms ease-out';
            this.hideTransitionOptions = '195ms ease-in';
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
        }
        Menu.prototype.toggle = function (event) {
            if (this.visible)
                this.hide();
            else
                this.show(event);
            this.preventDocumentDefault = true;
        };
        Menu.prototype.show = function (event) {
            this.target = event.currentTarget;
            this.visible = true;
            this.preventDocumentDefault = true;
        };
        Menu.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    if (this.popup) {
                        this.container = event.element;
                        this.moveOnTop();
                        this.onShow.emit({});
                        this.appendOverlay();
                        dom.DomHandler.absolutePosition(this.container, this.target);
                        this.bindDocumentClickListener();
                        this.bindDocumentResizeListener();
                    }
                    break;
                case 'void':
                    this.onOverlayHide();
                    this.onHide.emit({});
                    break;
            }
        };
        Menu.prototype.appendOverlay = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.container);
                else
                    dom.DomHandler.appendChild(this.container, this.appendTo);
            }
        };
        Menu.prototype.restoreOverlayAppend = function () {
            if (this.container && this.appendTo) {
                this.el.nativeElement.appendChild(this.container);
            }
        };
        Menu.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                this.container.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
        };
        Menu.prototype.hide = function () {
            this.visible = false;
            this.cd.detectChanges();
        };
        Menu.prototype.onWindowResize = function () {
            this.hide();
        };
        Menu.prototype.itemClick = function (event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (!item.url) {
                event.preventDefault();
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
            if (this.popup) {
                this.hide();
            }
        };
        Menu.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                this.documentClickListener = this.renderer.listen('document', 'click', function () {
                    if (!_this.preventDocumentDefault) {
                        _this.hide();
                    }
                    _this.preventDocumentDefault = false;
                });
            }
        };
        Menu.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        Menu.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        Menu.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        Menu.prototype.onOverlayHide = function () {
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
            this.preventDocumentDefault = false;
            this.target = null;
        };
        Menu.prototype.ngOnDestroy = function () {
            if (this.popup) {
                this.restoreOverlayAppend();
                this.onOverlayHide();
            }
        };
        Menu.prototype.hasSubMenu = function () {
            var e_1, _a;
            if (this.model) {
                try {
                    for (var _b = __values(this.model), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var item = _c.value;
                        if (item.items) {
                            return true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return false;
        };
        Menu.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], Menu.prototype, "model", void 0);
        __decorate([
            core.Input()
        ], Menu.prototype, "popup", void 0);
        __decorate([
            core.Input()
        ], Menu.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], Menu.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], Menu.prototype, "appendTo", void 0);
        __decorate([
            core.Input()
        ], Menu.prototype, "autoZIndex", void 0);
        __decorate([
            core.Input()
        ], Menu.prototype, "baseZIndex", void 0);
        __decorate([
            core.Input()
        ], Menu.prototype, "showTransitionOptions", void 0);
        __decorate([
            core.Input()
        ], Menu.prototype, "hideTransitionOptions", void 0);
        __decorate([
            core.ViewChild('container', { static: true })
        ], Menu.prototype, "containerViewChild", void 0);
        __decorate([
            core.Output()
        ], Menu.prototype, "onShow", void 0);
        __decorate([
            core.Output()
        ], Menu.prototype, "onHide", void 0);
        Menu = __decorate([
            core.Component({
                selector: 'p-menu',
                template: "\n        <div #container [ngClass]=\"{'ui-menu ui-widget ui-widget-content ui-corner-all': true, 'ui-menu-dynamic ui-shadow': popup}\"\n            [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"preventDocumentDefault=true\" *ngIf=\"!popup || visible\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"popup !== true\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\">\n            <ul>\n                <ng-template ngFor let-submenu [ngForOf]=\"model\" *ngIf=\"hasSubMenu()\">\n                    <li class=\"ui-menu-separator ui-widget-content\" *ngIf=\"submenu.separator\" [ngClass]=\"{'ui-helper-hidden': submenu.visible === false}\"></li>\n                    <li class=\"ui-submenu-header ui-widget-header ui-corner-all\" [attr.data-automationid]=\"submenu.automationId\" *ngIf=\"!submenu.separator\" [ngClass]=\"{'ui-helper-hidden': submenu.visible === false}\">{{submenu.label}}</li>\n                    <ng-template ngFor let-item [ngForOf]=\"submenu.items\">\n                        <li class=\"ui-menu-separator ui-widget-content\" *ngIf=\"item.separator\" [ngClass]=\"{'ui-helper-hidden': (item.visible === false ||\u00A0submenu.visible === false)}\"></li>\n                        <li class=\"ui-menuitem ui-widget ui-corner-all\" *ngIf=\"!item.separator\" [pMenuItemContent]=\"item\" [ngClass]=\"{'ui-helper-hidden': (item.visible === false || submenu.visible === false)}\" [ngStyle]=\"item.style\" [class]=\"item.styleClass\"></li>\n                    </ng-template>\n                </ng-template>\n                <ng-template ngFor let-item [ngForOf]=\"model\" *ngIf=\"!hasSubMenu()\">\n                    <li class=\"ui-menu-separator ui-widget-content\" *ngIf=\"item.separator\" [ngClass]=\"{'ui-helper-hidden': item.visible === false}\"></li>\n                    <li class=\"ui-menuitem ui-widget ui-corner-all\" *ngIf=\"!item.separator\" [pMenuItemContent]=\"item\" [ngClass]=\"{'ui-helper-hidden': item.visible === false}\" [ngStyle]=\"item.style\" [class]=\"item.styleClass\"></li>\n                </ng-template>\n            </ul>\n        </div>\n    ",
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
        ], Menu);
        return Menu;
    }());
    var MenuModule = /** @class */ (function () {
        function MenuModule() {
        }
        MenuModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, router.RouterModule],
                exports: [Menu, router.RouterModule],
                declarations: [Menu, MenuItemContent]
            })
        ], MenuModule);
        return MenuModule;
    }());

    exports.Menu = Menu;
    exports.MenuItemContent = MenuItemContent;
    exports.MenuModule = MenuModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-menu.umd.js.map
