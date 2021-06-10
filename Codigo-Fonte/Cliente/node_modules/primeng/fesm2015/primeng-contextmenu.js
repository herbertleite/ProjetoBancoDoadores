import { Inject, forwardRef, Input, Component, EventEmitter, ElementRef, Renderer2, NgZone, Output, ViewChild, NgModule } from '@angular/core';
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
let ContextMenuSub = class ContextMenuSub {
    constructor(contextMenu) {
        this.contextMenu = contextMenu;
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
    onItemMouseEnter(event, item, menuitem) {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        this.activeItem = item;
        if (menuitem.disabled) {
            return;
        }
        let nextElement = item.children[0].nextElementSibling;
        if (nextElement) {
            let sublist = nextElement.children[0];
            sublist.style.zIndex = ++DomHandler.zindex;
            this.position(sublist, item);
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
    }
    listClick(event) {
        this.activeItem = null;
    }
    position(sublist, item) {
        this.containerOffset = DomHandler.getOffset(item.parentElement);
        let viewport = DomHandler.getViewport();
        let sublistWidth = sublist.offsetParent ? sublist.offsetWidth : DomHandler.getHiddenElementOuterWidth(sublist);
        let itemOuterWidth = DomHandler.getOuterWidth(item.children[0]);
        let itemOuterHeight = DomHandler.getOuterHeight(item.children[0]);
        let sublistHeight = sublist.offsetHeight ? sublist.offsetHeight : DomHandler.getHiddenElementOuterHeight(sublist);
        if ((parseInt(this.containerOffset.top) + itemOuterHeight + sublistHeight) > (viewport.height - DomHandler.calculateScrollbarHeight())) {
            sublist.style.bottom = '0px';
        }
        else {
            sublist.style.top = '0px';
        }
        if ((parseInt(this.containerOffset.left) + itemOuterWidth + sublistWidth) > (viewport.width - DomHandler.calculateScrollbarWidth())) {
            sublist.style.left = -sublistWidth + 'px';
        }
        else {
            sublist.style.left = itemOuterWidth + 'px';
        }
    }
};
ContextMenuSub.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => ContextMenu),] }] }
];
__decorate([
    Input()
], ContextMenuSub.prototype, "item", void 0);
__decorate([
    Input()
], ContextMenuSub.prototype, "root", void 0);
__decorate([
    Input()
], ContextMenuSub.prototype, "parentActive", null);
ContextMenuSub = __decorate([
    Component({
        selector: 'p-contextMenuSub',
        template: `
        <ul [ngClass]="{'ui-widget-content ui-corner-all ui-submenu-list ui-shadow':!root}" class="ui-menu-list" (click)="listClick($event)">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': child.visible === false}" role="separator">
                <li *ngIf="!child.separator" #item [ngClass]="{'ui-menuitem ui-corner-all':true,'ui-menuitem-active':item==activeItem,'ui-helper-hidden': child.visible === false}"
                    (mouseenter)="onItemMouseEnter($event,item,child)" role="none">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.tabindex ? child.tabindex : '0'" (click)="itemClick($event, child)"
                        [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass"
                        [attr.aria-haspopup]="item.items != null" [attr.aria-expanded]="item === activeItem">
                        <span class="ui-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'ui-state-active'" role="menuitem"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.tabindex ? child.tabindex : '0'"
                        (click)="itemClick($event, child)" [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}"
                        [ngStyle]="child.style" [class]="child.styleClass">
                        <span class="ui-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <p-contextMenuSub class="ui-submenu" [parentActive]="item==activeItem" [item]="child" *ngIf="child.items"></p-contextMenuSub>
                </li>
            </ng-template>
        </ul>
    `
    }),
    __param(0, Inject(forwardRef(() => ContextMenu)))
], ContextMenuSub);
let ContextMenu = class ContextMenu {
    constructor(el, renderer, zone) {
        this.el = el;
        this.renderer = renderer;
        this.zone = zone;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.triggerEvent = 'contextmenu';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
    }
    ngAfterViewInit() {
        if (this.global) {
            this.triggerEventListener = this.renderer.listen('document', this.triggerEvent, (event) => {
                this.show(event);
                event.preventDefault();
            });
        }
        else if (this.target) {
            this.triggerEventListener = this.renderer.listen(this.target, this.triggerEvent, (event) => {
                this.show(event);
                event.preventDefault();
                event.stopPropagation();
            });
        }
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
    }
    show(event) {
        this.position(event);
        this.moveOnTop();
        this.containerViewChild.nativeElement.style.display = 'block';
        this.parentActive = true;
        DomHandler.fadeIn(this.containerViewChild.nativeElement, 250);
        this.bindGlobalListeners();
        if (event) {
            event.preventDefault();
        }
        this.onShow.emit();
    }
    hide() {
        this.containerViewChild.nativeElement.style.display = 'none';
        this.parentActive = false;
        this.unbindGlobalListeners();
        this.onHide.emit();
    }
    moveOnTop() {
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }
    toggle(event) {
        if (this.containerViewChild.nativeElement.offsetParent)
            this.hide();
        else
            this.show(event);
    }
    position(event) {
        if (event) {
            let left = event.pageX + 1;
            let top = event.pageY + 1;
            let width = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetWidth : DomHandler.getHiddenElementOuterWidth(this.containerViewChild.nativeElement);
            let height = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetHeight : DomHandler.getHiddenElementOuterHeight(this.containerViewChild.nativeElement);
            let viewport = DomHandler.getViewport();
            //flip
            if (left + width - document.body.scrollLeft > viewport.width) {
                left -= width;
            }
            //flip
            if (top + height - document.body.scrollTop > viewport.height) {
                top -= height;
            }
            //fit
            if (left < document.body.scrollLeft) {
                left = document.body.scrollLeft;
            }
            //fit
            if (top < document.body.scrollTop) {
                top = document.body.scrollTop;
            }
            this.containerViewChild.nativeElement.style.left = left + 'px';
            this.containerViewChild.nativeElement.style.top = top + 'px';
        }
    }
    bindGlobalListeners() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
                if (this.containerViewChild.nativeElement.offsetParent && event.button !== 2) {
                    this.hide();
                }
            });
        }
        this.zone.runOutsideAngular(() => {
            if (!this.windowResizeListener) {
                this.windowResizeListener = this.onWindowResize.bind(this);
                window.addEventListener('resize', this.windowResizeListener);
            }
        });
    }
    unbindGlobalListeners() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
        if (this.windowResizeListener) {
            window.removeEventListener('resize', this.windowResizeListener);
            this.windowResizeListener = null;
        }
    }
    onWindowResize(event) {
        if (this.containerViewChild.nativeElement.offsetParent) {
            this.hide();
        }
    }
    ngOnDestroy() {
        this.unbindGlobalListeners();
        if (this.triggerEventListener) {
            this.triggerEventListener();
        }
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
    }
};
ContextMenu.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
__decorate([
    Input()
], ContextMenu.prototype, "model", void 0);
__decorate([
    Input()
], ContextMenu.prototype, "global", void 0);
__decorate([
    Input()
], ContextMenu.prototype, "target", void 0);
__decorate([
    Input()
], ContextMenu.prototype, "style", void 0);
__decorate([
    Input()
], ContextMenu.prototype, "styleClass", void 0);
__decorate([
    Input()
], ContextMenu.prototype, "appendTo", void 0);
__decorate([
    Input()
], ContextMenu.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], ContextMenu.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], ContextMenu.prototype, "triggerEvent", void 0);
__decorate([
    Output()
], ContextMenu.prototype, "onShow", void 0);
__decorate([
    Output()
], ContextMenu.prototype, "onHide", void 0);
__decorate([
    ViewChild('container', { static: true })
], ContextMenu.prototype, "containerViewChild", void 0);
ContextMenu = __decorate([
    Component({
        selector: 'p-contextMenu',
        template: `
        <div #container [ngClass]="'ui-contextmenu ui-widget ui-widget-content ui-corner-all ui-shadow'"
            [class]="styleClass" [ngStyle]="style">
            <p-contextMenuSub [item]="model" [parentActive]="parentActive" root="root"></p-contextMenuSub>
        </div>
    `
    })
], ContextMenu);
let ContextMenuModule = class ContextMenuModule {
};
ContextMenuModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [ContextMenu, RouterModule],
        declarations: [ContextMenu, ContextMenuSub]
    })
], ContextMenuModule);

/**
 * Generated bundle index. Do not edit.
 */

export { ContextMenu, ContextMenuModule, ContextMenuSub };
//# sourceMappingURL=primeng-contextmenu.js.map
