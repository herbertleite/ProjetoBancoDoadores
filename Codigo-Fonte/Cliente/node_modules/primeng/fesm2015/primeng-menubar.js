import { Renderer2, ChangeDetectorRef, Input, Component, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let MenubarSub = class MenubarSub {
    constructor(renderer, cd) {
        this.renderer = renderer;
        this.cd = cd;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.menuHoverActive = false;
    }
    get parentActive() {
        return this._parentActive;
    }
    set parentActive(value) {
        if (!this.root) {
            this._parentActive = value;
            if (!value)
                this.activeItem = null;
        }
    }
    onItemMenuClick(event, item, menuitem) {
        if (!this.autoDisplay) {
            if (menuitem.disabled) {
                return;
            }
            this.activeItem = this.activeMenu ? (this.activeMenu.isEqualNode(item) ? null : item) : item;
            let nextElement = item.children[0].nextElementSibling;
            if (nextElement) {
                let sublist = nextElement.children[0];
                if (this.autoZIndex) {
                    sublist.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                if (this.root) {
                    sublist.style.top = DomHandler.getOuterHeight(item.children[0]) + 'px';
                    sublist.style.left = '0px';
                }
                else {
                    sublist.style.top = '0px';
                    sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                }
            }
            this.menuClick = true;
            this.menuHoverActive = this.activeMenu ? (!this.activeMenu.isEqualNode(item)) : true;
            this.activeMenu = this.activeMenu ? (this.activeMenu.isEqualNode(item) ? null : item) : item;
            this.bindEventListener();
        }
    }
    bindEventListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
                if (!this.menuClick) {
                    this.activeItem = null;
                    this.menuHoverActive = false;
                    this.activeMenu = false;
                }
                this.menuClick = false;
            });
        }
    }
    onItemMouseEnter(event, item, menuitem) {
        if (this.autoDisplay || (!this.autoDisplay && this.root && this.menuHoverActive)) {
            if (menuitem.disabled) {
                return;
            }
            if ((this.activeItem && !this.activeItem.isEqualNode(item) || !this.activeItem)) {
                this.activeItem = item;
                let nextElement = item.children[0].nextElementSibling;
                if (nextElement) {
                    let sublist = nextElement.children[0];
                    sublist.style.zIndex = String(++DomHandler.zindex);
                    if (this.root) {
                        sublist.style.top = DomHandler.getOuterHeight(item.children[0]) + 'px';
                        sublist.style.left = '0px';
                    }
                    else {
                        sublist.style.top = '0px';
                        sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                    }
                }
                this.activeMenu = item;
            }
        }
    }
    itemClick(event, item) {
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
    }
    listClick(event) {
        if (this.autoDisplay) {
            this.activeItem = null;
        }
    }
    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
};
MenubarSub.ctorParameters = () => [
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], MenubarSub.prototype, "item", void 0);
__decorate([
    Input()
], MenubarSub.prototype, "root", void 0);
__decorate([
    Input()
], MenubarSub.prototype, "autoDisplay", void 0);
__decorate([
    Input()
], MenubarSub.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], MenubarSub.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], MenubarSub.prototype, "parentActive", null);
MenubarSub = __decorate([
    Component({
        selector: 'p-menubarSub',
        template: `
        <ul [ngClass]="{'ui-menubar-root-list':root, 'ui-widget-content ui-corner-all ui-submenu-list ui-shadow':!root}"
            (click)="listClick($event)">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #listItem [ngClass]="{'ui-menuitem ui-corner-all':true,
                        'ui-menu-parent':child.items,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}"
                        (mouseenter)="onItemMouseEnter($event,listItem,child)" (click)="onItemMenuClick($event, listItem, child)">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" [attr.data-automationid]="child.automationId" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" (click)="itemClick($event, child)"
                         [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass" 
                         [attr.tabindex]="child.tabindex ? child.tabindex : '0'" [attr.aria-haspopup]="item.items != null" [attr.aria-expanded]="item === activeItem">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw" *ngIf="child.items" [ngClass]="{'pi-caret-down':root,'pi-caret-right':!root}"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [attr.data-automationid]="child.automationId" [queryParams]="child.queryParams" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}"
                        [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.tabindex ? child.tabindex : '0'" role="menuitem"
                        (click)="itemClick($event, child)" [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw" *ngIf="child.items" [ngClass]="{'pi-caret-down':root,'pi-caret-right':!root}"></span>
                    </a>
                    <p-menubarSub class="ui-submenu" [parentActive]="listItem==activeItem" [item]="child" *ngIf="child.items" [autoDisplay]="true"></p-menubarSub>
                </li>
            </ng-template>
        </ul>
    `
    })
], MenubarSub);
let Menubar = class Menubar {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    get autoDisplay() {
        return this._autoDisplay;
    }
    set utc(_utc) {
        console.log("AutoDisplay property is deprecated and functionality is not available.");
    }
};
Menubar.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Input()
], Menubar.prototype, "model", void 0);
__decorate([
    Input()
], Menubar.prototype, "style", void 0);
__decorate([
    Input()
], Menubar.prototype, "styleClass", void 0);
__decorate([
    Input()
], Menubar.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], Menubar.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], Menubar.prototype, "autoDisplay", null);
Menubar = __decorate([
    Component({
        selector: 'p-menubar',
        template: `
        <div [ngClass]="{'ui-menubar ui-widget ui-widget-content ui-corner-all':true}" [class]="styleClass" [ngStyle]="style">
            <p-menubarSub [item]="model" root="root" [baseZIndex]="baseZIndex" [autoZIndex]="autoZIndex">
                <ng-content></ng-content>
            </p-menubarSub>
            <div class="ui-menubar-custom">
                <ng-content></ng-content>
            </div>
        </div>
    `
    })
], Menubar);
let MenubarModule = class MenubarModule {
};
MenubarModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [Menubar, RouterModule],
        declarations: [Menubar, MenubarSub]
    })
], MenubarModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Menubar, MenubarModule, MenubarSub };
//# sourceMappingURL=primeng-menubar.js.map
