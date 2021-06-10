import { Inject, forwardRef, ChangeDetectorRef, Renderer2, Input, Component, ElementRef, NgModule } from '@angular/core';
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
let TieredMenuSub = class TieredMenuSub {
    constructor(tieredMenu, cf, renderer) {
        this.cf = cf;
        this.renderer = renderer;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.tieredMenu = tieredMenu;
    }
    get parentActive() {
        return this._parentActive;
    }
    set parentActive(value) {
        this._parentActive = value;
        if (!value) {
            this.activeItem = null;
        }
    }
    ngAfterViewInit() {
        if (this.root && !this.tieredMenu.popup) {
            this.bindDocumentClickListener();
        }
    }
    onItemMouseEnter(event, item, menuitem) {
        if (this.tieredMenu.popup || (!this.root || this.activeItem)) {
            if (menuitem.disabled) {
                return;
            }
            this.activeItem = item;
            let nextElement = item.children[0].nextElementSibling;
            if (nextElement) {
                let sublist = nextElement.children[0];
                if (this.autoZIndex) {
                    sublist.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                sublist.style.zIndex = String(++DomHandler.zindex);
                sublist.style.top = '0px';
                sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
    }
    itemClick(event, item, menuitem) {
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
            let nextElement = item.children[0].nextElementSibling;
            if (nextElement) {
                let sublist = nextElement.children[0];
                if (this.autoZIndex) {
                    sublist.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                sublist.style.zIndex = String(++DomHandler.zindex);
                sublist.style.top = '0px';
                sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                this.rootItemClick = true;
            }
        }
        if (!menuitem.items && this.tieredMenu.popup) {
            this.tieredMenu.hide();
        }
    }
    listClick(event) {
        if (!this.rootItemClick) {
            this.activeItem = null;
        }
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.rootItemClick) {
                    this.parentActive = false;
                    this.activeItem = null;
                }
                this.rootItemClick = false;
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    ngOnDestroy() {
        if (this.root && !this.tieredMenu.popup) {
            this.unbindDocumentClickListener();
        }
    }
};
TieredMenuSub.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => TieredMenu),] }] },
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
__decorate([
    Input()
], TieredMenuSub.prototype, "item", void 0);
__decorate([
    Input()
], TieredMenuSub.prototype, "root", void 0);
__decorate([
    Input()
], TieredMenuSub.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], TieredMenuSub.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], TieredMenuSub.prototype, "parentActive", null);
TieredMenuSub = __decorate([
    Component({
        selector: 'p-tieredMenuSub',
        template: `
        <ul [ngClass]="{'ui-widget-content ui-corner-all ui-shadow ui-submenu-list': !root}" (click)="listClick($event)" role="menubar">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': child.visible === false}" role="separator">
                <li *ngIf="!child.separator" #listItem [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}"
                    [class]="child.styleClass" [ngStyle]="child.style" role="none"
                    (mouseenter)="onItemMouseEnter($event, listItem, child)">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url" class="ui-menuitem-link ui-corner-all" [attr.target]="child.target" [attr.tabindex]="child.tabindex ? child.tabindex : '0'" [attr.title]="child.title" [attr.id]="child.id" 
                        [ngClass]="{'ui-state-disabled':child.disabled}" (click)="itemClick($event, listItem, child)" role="menuitem" [attr.aria-haspopup]="item.items != null" [attr.aria-expanded]="item === activeItem">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" role="menuitem" [queryParams]="child.queryParams" [routerLinkActive]="'ui-state-active'" role="menuitem" [attr.tabindex]="child.tabindex ? child.tabindex : '0'"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}"
                        class="ui-menuitem-link ui-corner-all" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'ui-state-disabled':child.disabled}" (click)="itemClick($event, listItem, child)">
                        
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                    </a>
                    <p-tieredMenuSub class="ui-submenu" [item]="child" *ngIf="child.items" [baseZIndex]="baseZIndex" [parentActive]="listItem==activeItem" [autoZIndex]="autoZIndex"></p-tieredMenuSub>
                </li>
            </ng-template>
        </ul>
    `
    }),
    __param(0, Inject(forwardRef(() => TieredMenu)))
], TieredMenuSub);
let TieredMenu = class TieredMenu {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
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
        this.parentActive = true;
        this.preventDocumentDefault = true;
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                if (this.popup) {
                    this.container = event.element;
                    this.moveOnTop();
                    this.appendOverlay();
                    DomHandler.absolutePosition(this.container, this.target);
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                }
                break;
            case 'void':
                this.onOverlayHide();
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
        this.parentActive = false;
    }
    onWindowResize() {
        this.hide();
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.preventDocumentDefault && this.popup) {
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
};
TieredMenu.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Input()
], TieredMenu.prototype, "model", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "popup", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "style", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "styleClass", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "appendTo", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "showTransitionOptions", void 0);
__decorate([
    Input()
], TieredMenu.prototype, "hideTransitionOptions", void 0);
TieredMenu = __decorate([
    Component({
        selector: 'p-tieredMenu',
        template: `
        <div [ngClass]="{'ui-tieredmenu ui-widget ui-widget-content ui-corner-all':true, 'ui-tieredmenu-dynamic ui-shadow':popup}" [class]="styleClass" [ngStyle]="style"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" *ngIf="!popup || visible">
            <p-tieredMenuSub [item]="model" root="root" [parentActive]="parentActive" [baseZIndex]="baseZIndex" [autoZIndex]="autoZIndex"></p-tieredMenuSub>
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
], TieredMenu);
let TieredMenuModule = class TieredMenuModule {
};
TieredMenuModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [TieredMenu, RouterModule],
        declarations: [TieredMenu, TieredMenuSub]
    })
], TieredMenuModule);

/**
 * Generated bundle index. Do not edit.
 */

export { TieredMenu, TieredMenuModule, TieredMenuSub };
//# sourceMappingURL=primeng-tieredmenu.js.map
