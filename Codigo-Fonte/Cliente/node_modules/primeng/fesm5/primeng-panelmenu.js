import { ChangeDetectorRef, Input, Component, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var BasePanelMenuItem = /** @class */ (function () {
    function BasePanelMenuItem(ref) {
        this.ref = ref;
    }
    BasePanelMenuItem.prototype.handleClick = function (event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        item.expanded = !item.expanded;
        this.ref.detectChanges();
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    };
    return BasePanelMenuItem;
}());
var PanelMenuSub = /** @class */ (function (_super) {
    __extends(PanelMenuSub, _super);
    function PanelMenuSub(ref) {
        return _super.call(this, ref) || this;
    }
    PanelMenuSub.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], PanelMenuSub.prototype, "item", void 0);
    __decorate([
        Input()
    ], PanelMenuSub.prototype, "expanded", void 0);
    __decorate([
        Input()
    ], PanelMenuSub.prototype, "transitionOptions", void 0);
    PanelMenuSub = __decorate([
        Component({
            selector: 'p-panelMenuSub',
            template: "\n        <ul class=\"ui-submenu-list\" [@submenu]=\"expanded ? {value: 'visible', params: {transitionParams: transitionOptions, height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}\" role=\"tree\">\n            <ng-template ngFor let-child [ngForOf]=\"item.items\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\" role=\"separator\">\n                <li *ngIf=\"!child.separator\" class=\"ui-menuitem ui-corner-all\" [ngClass]=\"child.styleClass\" [class.ui-helper-hidden]=\"child.visible === false\" [ngStyle]=\"child.style\">\n                    <a *ngIf=\"!child.routerLink\" [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.tabindex]=\"item.expanded ? null : child.tabindex ? child.tabindex : '-1'\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled, 'ui-state-active': child.expanded}\" role=\"treeitem\" [attr.aria-expanded]=\"child.expanded\"\n                        (click)=\"handleClick($event,child)\" [attr.target]=\"child.target\" [attr.title]=\"child.title\">\n                        <span class=\"ui-panelmenu-icon pi pi-fw\" [ngClass]=\"{'pi-caret-right':!child.expanded,'pi-caret-down':child.expanded}\" *ngIf=\"child.items\"></span\n                        ><span class=\"ui-menuitem-icon\" [ngClass]=\"child.icon\" *ngIf=\"child.icon\"></span\n                        ><span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" class=\"ui-menuitem-link ui-corner-all\" \n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" [attr.tabindex]=\"item.expanded ? null : child.tabindex ? child.tabindex : '-1'\" [attr.id]=\"child.id\" role=\"treeitem\" [attr.aria-expanded]=\"child.expanded\"\n                        (click)=\"handleClick($event,child)\" [attr.target]=\"child.target\" [attr.title]=\"child.title\">\n                        <span class=\"ui-panelmenu-icon pi pi-fw\" [ngClass]=\"{'pi-caret-right':!child.expanded,'pi-caret-down':child.expanded}\" *ngIf=\"child.items\"></span\n                        ><span class=\"ui-menuitem-icon\" [ngClass]=\"child.icon\" *ngIf=\"child.icon\"></span\n                        ><span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <p-panelMenuSub [item]=\"child\" [expanded]=\"child.expanded\" [transitionOptions]=\"transitionOptions\" *ngIf=\"child.items\"></p-panelMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    ",
            animations: [
                trigger('submenu', [
                    state('hidden', style({
                        height: '0px'
                    })),
                    state('void', style({
                        height: '{{height}}'
                    }), { params: { height: '0' } }),
                    state('visible', style({
                        height: '*'
                    })),
                    transition('visible => hidden', animate('{{transitionParams}}')),
                    transition('hidden => visible', animate('{{transitionParams}}')),
                    transition('void => hidden', animate('{{transitionParams}}')),
                    transition('void => visible', animate('{{transitionParams}}'))
                ])
            ]
        })
    ], PanelMenuSub);
    return PanelMenuSub;
}(BasePanelMenuItem));
var PanelMenu = /** @class */ (function (_super) {
    __extends(PanelMenu, _super);
    function PanelMenu(ref) {
        var _this = _super.call(this, ref) || this;
        _this.multiple = true;
        _this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        return _this;
    }
    PanelMenu.prototype.collapseAll = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.model), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                if (item.expanded) {
                    item.expanded = false;
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
    };
    PanelMenu.prototype.handleClick = function (event, item) {
        var e_2, _a;
        if (!this.multiple) {
            try {
                for (var _b = __values(this.model), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var modelItem = _c.value;
                    if (item !== modelItem && modelItem.expanded) {
                        modelItem.expanded = false;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        this.animating = true;
        _super.prototype.handleClick.call(this, event, item);
    };
    PanelMenu.prototype.onToggleDone = function () {
        this.animating = false;
    };
    PanelMenu.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], PanelMenu.prototype, "model", void 0);
    __decorate([
        Input()
    ], PanelMenu.prototype, "style", void 0);
    __decorate([
        Input()
    ], PanelMenu.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], PanelMenu.prototype, "multiple", void 0);
    __decorate([
        Input()
    ], PanelMenu.prototype, "transitionOptions", void 0);
    PanelMenu = __decorate([
        Component({
            selector: 'p-panelMenu',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'ui-panelmenu ui-widget'\">\n            <ng-container *ngFor=\"let item of model;let f=first;let l=last;\">\n                <div class=\"ui-panelmenu-panel\" [ngClass]=\"{'ui-helper-hidden': item.visible === false}\">\n                    <div [ngClass]=\"{'ui-widget ui-panelmenu-header ui-state-default':true,'ui-corner-top':f,'ui-corner-bottom':l&&!item.expanded,\n                    'ui-state-active':item.expanded,'ui-state-disabled':item.disabled}\" [class]=\"item.styleClass\" [ngStyle]=\"item.style\">\n                        <a *ngIf=\"!item.routerLink\" [href]=\"item.url||'#'\" (click)=\"handleClick($event,item)\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\" [attr.id]=\"item.id\"\n                           [attr.target]=\"item.target\" [attr.title]=\"item.title\" class=\"ui-panelmenu-header-link\" [attr.aria-expanded]=\"item.expanded\" [attr.id]=\"item.id + '_header'\" [attr.aria-controls]=\"item.id +'_content'\">\n                        <span *ngIf=\"item.items\" class=\"ui-panelmenu-icon pi pi-fw\" [ngClass]=\"{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}\"></span\n                        ><span class=\"ui-menuitem-icon\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span\n                        ><span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                        <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\"\n                           (click)=\"handleClick($event,item)\" [attr.target]=\"item.target\" [attr.title]=\"item.title\" class=\"ui-panelmenu-header-link\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.tabindex ? item.tabindex : '0'\">\n                        <span *ngIf=\"item.items\" class=\"ui-panelmenu-icon pi pi-fw\" [ngClass]=\"{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}\"></span\n                        ><span class=\"ui-menuitem-icon\" [ngClass]=\"item.icon\" *ngIf=\"item.icon\"></span\n                        ><span class=\"ui-menuitem-text\">{{item.label}}</span>\n                        </a>\n                    </div>\n                    <div *ngIf=\"item.items\" class=\"ui-panelmenu-content-wrapper\" [@rootItem]=\"item.expanded ? {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}\"  (@rootItem.done)=\"onToggleDone()\"\n                         [ngClass]=\"{'ui-panelmenu-content-wrapper-overflown': !item.expanded||animating}\">\n                        <div class=\"ui-panelmenu-content ui-widget-content\" role=\"region\" [attr.id]=\"item.id +'_content' \" [attr.aria-labelledby]=\"item.id +'_header'\">\n                            <p-panelMenuSub [item]=\"item\" [expanded]=\"true\" [transitionOptions]=\"transitionOptions\" class=\"ui-panelmenu-root-submenu\"></p-panelMenuSub>\n                        </div>\n                    </div>\n                </div>\n            </ng-container>\n        </div>\n    ",
            animations: [
                trigger('rootItem', [
                    state('hidden', style({
                        height: '0px'
                    })),
                    state('void', style({
                        height: '{{height}}'
                    }), { params: { height: '0' } }),
                    state('visible', style({
                        height: '*'
                    })),
                    transition('visible => hidden', animate('{{transitionParams}}')),
                    transition('hidden => visible', animate('{{transitionParams}}')),
                    transition('void => hidden', animate('{{transitionParams}}')),
                    transition('void => visible', animate('{{transitionParams}}'))
                ])
            ]
        })
    ], PanelMenu);
    return PanelMenu;
}(BasePanelMenuItem));
var PanelMenuModule = /** @class */ (function () {
    function PanelMenuModule() {
    }
    PanelMenuModule = __decorate([
        NgModule({
            imports: [CommonModule, RouterModule],
            exports: [PanelMenu, RouterModule],
            declarations: [PanelMenu, PanelMenuSub]
        })
    ], PanelMenuModule);
    return PanelMenuModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { BasePanelMenuItem, PanelMenu, PanelMenuModule, PanelMenuSub };
//# sourceMappingURL=primeng-panelmenu.js.map
