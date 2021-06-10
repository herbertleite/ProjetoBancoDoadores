(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('primeng/megamenu', ['exports', '@angular/core', '@angular/common', 'primeng/dom', '@angular/router'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.megamenu = {}), global.ng.core, global.ng.common, global.primeng.dom, global.ng.router));
}(this, (function (exports, core, common, dom, router) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var MegaMenu = /** @class */ (function () {
        function MegaMenu(el, renderer) {
            this.el = el;
            this.renderer = renderer;
            this.orientation = 'horizontal';
            this.autoZIndex = true;
            this.baseZIndex = 0;
        }
        MegaMenu.prototype.onItemMouseEnter = function (event, item, menuitem) {
            if (menuitem.disabled) {
                return;
            }
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
            this.activeItem = item;
            if (menuitem.items) {
                var submenu = item.children[0].nextElementSibling;
                if (submenu) {
                    if (this.autoZIndex) {
                        submenu.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                    }
                    if (this.orientation === 'horizontal') {
                        submenu.style.top = dom.DomHandler.getOuterHeight(item.children[0]) + 'px';
                        submenu.style.left = '0px';
                    }
                    else if (this.orientation === 'vertical') {
                        submenu.style.top = '0px';
                        submenu.style.left = dom.DomHandler.getOuterWidth(item.children[0]) + 'px';
                    }
                }
            }
        };
        MegaMenu.prototype.onItemMouseLeave = function (event, link) {
            var _this = this;
            this.hideTimeout = setTimeout(function () {
                _this.activeItem = null;
            }, 1000);
        };
        MegaMenu.prototype.itemClick = function (event, item) {
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
            this.activeItem = null;
        };
        MegaMenu.prototype.getColumnClass = function (menuitem) {
            var length = menuitem.items ? menuitem.items.length : 0;
            var columnClass;
            switch (length) {
                case 2:
                    columnClass = 'ui-g-6';
                    break;
                case 3:
                    columnClass = 'ui-g-4';
                    break;
                case 4:
                    columnClass = 'ui-g-3';
                    break;
                case 6:
                    columnClass = 'ui-g-2';
                    break;
                default:
                    columnClass = 'ui-g-12';
                    break;
            }
            return columnClass;
        };
        MegaMenu.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input()
        ], MegaMenu.prototype, "model", void 0);
        __decorate([
            core.Input()
        ], MegaMenu.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], MegaMenu.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], MegaMenu.prototype, "orientation", void 0);
        __decorate([
            core.Input()
        ], MegaMenu.prototype, "autoZIndex", void 0);
        __decorate([
            core.Input()
        ], MegaMenu.prototype, "baseZIndex", void 0);
        MegaMenu = __decorate([
            core.Component({
                selector: 'p-megaMenu',
                template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\"\n            [ngClass]=\"{'ui-megamenu ui-widget ui-widget-content ui-corner-all':true,'ui-megamenu-horizontal': orientation == 'horizontal','ui-megamenu-vertical': orientation == 'vertical'}\">\n            <ul class=\"ui-megamenu-root-list\" role=\"menubar\">\n                <ng-template ngFor let-category [ngForOf]=\"model\">\n                    <li *ngIf=\"category.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': category.visible === false}\">\n                    <li *ngIf=\"!category.separator\" #item [ngClass]=\"{'ui-menuitem ui-corner-all':true,'ui-menuitem-active':item==activeItem, 'ui-helper-hidden': category.visible === false}\"\n                        (mouseenter)=\"onItemMouseEnter($event, item, category)\" (mouseleave)=\"onItemMouseLeave($event, item)\">\n   \n                        <a *ngIf=\"!category.routerLink\" [href]=\"category.url||'#'\" [attr.target]=\"category.target\" [attr.title]=\"category.title\" [attr.id]=\"category.id\" (click)=\"itemClick($event, category)\" [attr.tabindex]=\"category.tabindex ? category.tabindex : '0'\"\n                            [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':category.disabled}\" [ngStyle]=\"category.style\" [class]=\"category.styleClass\">\n                            <span class=\"ui-menuitem-icon\" *ngIf=\"category.icon\" [ngClass]=\"category.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{category.label}}</span>\n                            <span *ngIf=\"category.items\" class=\"ui-submenu-icon pi pi-fw\" [ngClass]=\"{'pi-caret-down':orientation=='horizontal','pi-caret-right':orientation=='vertical'}\"></span>\n                        </a>\n                        <a *ngIf=\"category.routerLink\" [routerLink]=\"category.routerLink\" [queryParams]=\"category.queryParams\" [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"category.routerLinkActiveOptions||{exact:false}\" [attr.tabindex]=\"category.tabindex ? category.tabindex : '0'\" \n                            [attr.target]=\"category.target\" [attr.title]=\"category.title\" [attr.id]=\"category.id\"\n                            (click)=\"itemClick($event, category)\" [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':category.disabled}\" [ngStyle]=\"category.style\" [class]=\"category.styleClass\">\n                            <span class=\"ui-menuitem-icon\" *ngIf=\"category.icon\" [ngClass]=\"category.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{category.label}}</span>\n                        </a>\n\n                        <div class=\"ui-megamenu-panel ui-widget-content ui-corner-all ui-shadow\" *ngIf=\"category.items\">\n                            <div class=\"ui-g\">\n                                <ng-template ngFor let-column [ngForOf]=\"category.items\">\n                                    <div [class]=\"getColumnClass(category)\">\n                                        <ng-template ngFor let-submenu [ngForOf]=\"column\">\n                                            <ul class=\"ui-megamenu-submenu\" role=\"menu\">\n                                                <li class=\"ui-widget-header ui-megamenu-submenu-header ui-corner-all\">{{submenu.label}}</li>\n                                                <ng-template ngFor let-item [ngForOf]=\"submenu.items\">\n                                                    <li *ngIf=\"item.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': item.visible === false}\" role=\"separator\">\n                                                    <li *ngIf=\"!item.separator\" class=\"ui-menuitem ui-corner-all\" [ngClass]=\"{'ui-helper-hidden': item.visible === false}\" role=\"none\">\n                                                        <a *ngIf=\"!item.routerLink\" role=\"menuitem\" [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                                                            [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"itemClick($event, item)\">\n                                                            <span class=\"ui-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                                                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                                                        </a>\n                                                        <a *ngIf=\"item.routerLink\" role=\"menuitem\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'ui-state-active'\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                                                            [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"ui-menuitem-link ui-corner-all\" \n                                                             [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\"\n                                                            [ngClass]=\"{'ui-state-disabled':item.disabled}\" (click)=\"itemClick($event, item)\">\n                                                            <span class=\"ui-menuitem-icon\" *ngIf=\"item.icon\" [ngClass]=\"item.icon\"></span>\n                                                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                                                        </a>\n                                                    </li>\n                                                </ng-template>\n                                            </ul>\n                                        </ng-template>\n                                    </div>\n                                </ng-template>\n                            </div>\n                        </div>\n                    </li>\n                </ng-template>\n                <li class=\"ui-menuitem ui-menuitem-custom ui-corner-all\" *ngIf=\"orientation === 'horizontal'\">\n                    <ng-content></ng-content>\n                </li>\n            </ul>\n        </div>\n    "
            })
        ], MegaMenu);
        return MegaMenu;
    }());
    var MegaMenuModule = /** @class */ (function () {
        function MegaMenuModule() {
        }
        MegaMenuModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, router.RouterModule],
                exports: [MegaMenu, router.RouterModule],
                declarations: [MegaMenu]
            })
        ], MegaMenuModule);
        return MegaMenuModule;
    }());

    exports.MegaMenu = MegaMenu;
    exports.MegaMenuModule = MegaMenuModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-megamenu.umd.js.map
