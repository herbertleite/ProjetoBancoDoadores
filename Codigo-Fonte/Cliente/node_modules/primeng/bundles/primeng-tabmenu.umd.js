(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('primeng/tabmenu', ['exports', '@angular/core', '@angular/common', 'primeng/api', '@angular/router'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.tabmenu = {}), global.ng.core, global.ng.common, global.primeng.api, global.ng.router));
}(this, (function (exports, core, common, api, router) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var TabMenu = /** @class */ (function () {
        function TabMenu() {
        }
        TabMenu.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        TabMenu.prototype.itemClick = function (event, item) {
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
            this.activeItem = item;
        };
        __decorate([
            core.Input()
        ], TabMenu.prototype, "model", void 0);
        __decorate([
            core.Input()
        ], TabMenu.prototype, "activeItem", void 0);
        __decorate([
            core.Input()
        ], TabMenu.prototype, "popup", void 0);
        __decorate([
            core.Input()
        ], TabMenu.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], TabMenu.prototype, "styleClass", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], TabMenu.prototype, "templates", void 0);
        TabMenu = __decorate([
            core.Component({
                selector: 'p-tabMenu',
                template: "\n        <div [ngClass]=\"'ui-tabmenu ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul class=\"ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all\" role=\"tablist\">\n                <li *ngFor=\"let item of model; let i = index\" role=\"tab\" [attr.aria-selected]=\"activeItem==item\" [attr.aria-expanded]=\"activeItem==item\"\n                    [ngClass]=\"{'ui-tabmenuitem ui-state-default ui-corner-top':true,'ui-state-disabled':item.disabled,\n                        'ui-tabmenuitem-hasicon':item.icon,'ui-state-active':activeItem==item,'ui-helper-hidden': item.visible === false}\"\n                        [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\">\n                    <a *ngIf=\"!item.routerLink\" [href]=\"item.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" role=\"presentation\" (click)=\"itemClick($event,item)\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\">\n                        <ng-container *ngIf=\"!itemTemplate\">\n                            <span class=\"ui-menuitem-icon \" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </ng-container>\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                    </a>\n                    <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" role=\"presentation\" class=\"ui-menuitem-link ui-corner-all\" (click)=\"itemClick($event,item)\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\"\n                        [attr.target]=\"item.target\" [attr.title]=\"item.title\" [attr.id]=\"item.id\">\n                        <ng-container *ngIf=\"!itemTemplate\">\n                            <span class=\"ui-menuitem-icon \" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span>\n                            <span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </ng-container>\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    "
            })
        ], TabMenu);
        return TabMenu;
    }());
    var TabMenuModule = /** @class */ (function () {
        function TabMenuModule() {
        }
        TabMenuModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, router.RouterModule, api.SharedModule],
                exports: [TabMenu, router.RouterModule, api.SharedModule],
                declarations: [TabMenu]
            })
        ], TabMenuModule);
        return TabMenuModule;
    }());

    exports.TabMenu = TabMenu;
    exports.TabMenuModule = TabMenuModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tabmenu.umd.js.map
