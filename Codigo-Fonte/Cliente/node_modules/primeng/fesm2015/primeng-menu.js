import { Inject, forwardRef, Input, Component, EventEmitter, ElementRef, Renderer2, ChangeDetectorRef, ViewChild, Output, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
let MenuItemContent = class MenuItemContent {
    constructor(menu) {
        this.menu = menu;
    }
};
MenuItemContent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => Menu),] }] }
];
__decorate([
    Input("pMenuItemContent")
], MenuItemContent.prototype, "item", void 0);
MenuItemContent = __decorate([
    Component({
        selector: '[pMenuItemContent]',
        template: `
        <a *ngIf="!item.routerLink" [attr.href]="item.url||null" class="ui-menuitem-link ui-corner-all" [attr.tabindex]="item.tabindex ? item.tabindex : '0'" [attr.data-automationid]="item.automationId" [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id"
            [ngClass]="{'ui-state-disabled':item.disabled}" (click)="menu.itemClick($event, item)" role="menuitem">
            <span class="ui-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
            <span class="ui-menuitem-text">{{item.label}}</span>
        </a>
        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [attr.data-automationid]="item.automationId" [queryParams]="item.queryParams" [routerLinkActive]="'ui-state-active'"
            [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link ui-corner-all" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.tabindex ? item.tabindex : '0'" 
             [attr.title]="item.title" [ngClass]="{'ui-state-disabled':item.disabled}" (click)="menu.itemClick($event, item)" role="menuitem">
            <span class="ui-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
            <span class="ui-menuitem-text">{{item.label}}</span>
        </a>
    `
    }),
    __param(0, Inject(forwardRef(() => Menu)))
], MenuItemContent);
let Menu = class Menu {
    constructor(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
    }
    toggle(event) {
        if (this.visible)
            this.hide();
        else
            this.show(event);
        this.preventDocumentDefault = true;
    }
    show(event) {
        this.target = event.currentTarget;
        this.visible = true;
        this.preventDocumentDefault = true;
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                if (this.popup) {
                    this.container = event.element;
                    this.moveOnTop();
                    this.onShow.emit({});
                    this.appendOverlay();
                    DomHandler.absolutePosition(this.container, this.target);
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                }
                break;
            case 'void':
                this.onOverlayHide();
                this.onHide.emit({});
                break;
        }
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }
    restoreOverlayAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }
    moveOnTop() {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }
    hide() {
        this.visible = false;
        this.cd.detectChanges();
    }
    onWindowResize() {
        this.hide();
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
        if (this.popup) {
            this.hide();
        }
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.preventDocumentDefault) {
                    this.hide();
                }
                this.preventDocumentDefault = false;
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
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
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.preventDocumentDefault = false;
        this.target = null;
    }
    ngOnDestroy() {
        if (this.popup) {
            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
    }
    hasSubMenu() {
        if (this.model) {
            for (var item of this.model) {
                if (item.items) {
                    return true;
                }
            }
        }
        return false;
    }
};
Menu.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], Menu.prototype, "model", void 0);
__decorate([
    Input()
], Menu.prototype, "popup", void 0);
__decorate([
    Input()
], Menu.prototype, "style", void 0);
__decorate([
    Input()
], Menu.prototype, "styleClass", void 0);
__decorate([
    Input()
], Menu.prototype, "appendTo", void 0);
__decorate([
    Input()
], Menu.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], Menu.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], Menu.prototype, "showTransitionOptions", void 0);
__decorate([
    Input()
], Menu.prototype, "hideTransitionOptions", void 0);
__decorate([
    ViewChild('container', { static: true })
], Menu.prototype, "containerViewChild", void 0);
__decorate([
    Output()
], Menu.prototype, "onShow", void 0);
__decorate([
    Output()
], Menu.prototype, "onHide", void 0);
Menu = __decorate([
    Component({
        selector: 'p-menu',
        template: `
        <div #container [ngClass]="{'ui-menu ui-widget ui-widget-content ui-corner-all': true, 'ui-menu-dynamic ui-shadow': popup}"
            [class]="styleClass" [ngStyle]="style" (click)="preventDocumentDefault=true" *ngIf="!popup || visible"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true" (@overlayAnimation.start)="onOverlayAnimationStart($event)">
            <ul>
                <ng-template ngFor let-submenu [ngForOf]="model" *ngIf="hasSubMenu()">
                    <li class="ui-menu-separator ui-widget-content" *ngIf="submenu.separator" [ngClass]="{'ui-helper-hidden': submenu.visible === false}"></li>
                    <li class="ui-submenu-header ui-widget-header ui-corner-all" [attr.data-automationid]="submenu.automationId" *ngIf="!submenu.separator" [ngClass]="{'ui-helper-hidden': submenu.visible === false}">{{submenu.label}}</li>
                    <ng-template ngFor let-item [ngForOf]="submenu.items">
                        <li class="ui-menu-separator ui-widget-content" *ngIf="item.separator" [ngClass]="{'ui-helper-hidden': (item.visible === false || submenu.visible === false)}"></li>
                        <li class="ui-menuitem ui-widget ui-corner-all" *ngIf="!item.separator" [pMenuItemContent]="item" [ngClass]="{'ui-helper-hidden': (item.visible === false || submenu.visible === false)}" [ngStyle]="item.style" [class]="item.styleClass"></li>
                    </ng-template>
                </ng-template>
                <ng-template ngFor let-item [ngForOf]="model" *ngIf="!hasSubMenu()">
                    <li class="ui-menu-separator ui-widget-content" *ngIf="item.separator" [ngClass]="{'ui-helper-hidden': item.visible === false}"></li>
                    <li class="ui-menuitem ui-widget ui-corner-all" *ngIf="!item.separator" [pMenuItemContent]="item" [ngClass]="{'ui-helper-hidden': item.visible === false}" [ngStyle]="item.style" [class]="item.styleClass"></li>
                </ng-template>
            </ul>
        </div>
    `,
        animations: [
            trigger('overlayAnimation', [
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
], Menu);
let MenuModule = class MenuModule {
};
MenuModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [Menu, RouterModule],
        declarations: [Menu, MenuItemContent]
    })
], MenuModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Menu, MenuItemContent, MenuModule };
//# sourceMappingURL=primeng-menu.js.map
