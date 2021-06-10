var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Renderer2, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
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
export { MenubarSub };
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
export { Menubar };
let MenubarModule = class MenubarModule {
};
MenubarModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [Menubar, RouterModule],
        declarations: [Menubar, MenubarSub]
    })
], MenubarModule);
export { MenubarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbWVudWJhci8iLCJzb3VyY2VzIjpbIm1lbnViYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9HLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQWdDL0MsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtJQXFDbkIsWUFBbUIsUUFBbUIsRUFBVSxFQUFxQjtRQUFsRCxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUE3QjVELGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztRQXFCaEMsb0JBQWUsR0FBWSxLQUFLLENBQUM7SUFNd0MsQ0FBQztJQXpCakUsSUFBSSxZQUFZO1FBRXJCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxZQUFZLENBQUMsS0FBSztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNaLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBRTNCLElBQUksQ0FBQyxLQUFLO2dCQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQWdCRCxlQUFlLENBQUMsS0FBWSxFQUFFLElBQW1CLEVBQUUsUUFBa0I7UUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO2dC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LGFBQVEsR0FBUixRQUFRLENBQVc7UUFicEQsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixlQUFVLEdBQVcsQ0FBQyxDQUFDO0lBV2lDLENBQUM7SUFQekQsSUFBSSxXQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxHQUFHLENBQUMsSUFBYTtRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHdFQUF3RSxDQUFDLENBQUM7SUFDMUYsQ0FBQztDQUdKLENBQUE7O1lBRDBCLFVBQVU7WUFBbUIsU0FBUzs7QUFuQnBEO0lBQVIsS0FBSyxFQUFFO3NDQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTtzQ0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFOzJDQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTsyQ0FBNEI7QUFFM0I7SUFBUixLQUFLLEVBQUU7MkNBQXdCO0FBSXZCO0lBQVIsS0FBSyxFQUFFOzBDQUVQO0FBaEJRLE9BQU87SUFibkIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7S0FTVDtLQUNKLENBQUM7R0FDVyxPQUFPLENBc0JuQjtTQXRCWSxPQUFPO0FBNkJwQixJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0NBQUksQ0FBQTtBQUFqQixhQUFhO0lBTHpCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUM7UUFDckMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQztRQUNoQyxZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDO0tBQ3RDLENBQUM7R0FDVyxhQUFhLENBQUk7U0FBakIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBSZW5kZXJlcjIsIE9uRGVzdHJveSxDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBNZW51SXRlbSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1tZW51YmFyU3ViJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8dWwgW25nQ2xhc3NdPVwieyd1aS1tZW51YmFyLXJvb3QtbGlzdCc6cm9vdCwgJ3VpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktc3VibWVudS1saXN0IHVpLXNoYWRvdyc6IXJvb3R9XCJcbiAgICAgICAgICAgIChjbGljayk9XCJsaXN0Q2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1jaGlsZCBbbmdGb3JPZl09XCIocm9vdCA/IGl0ZW0gOiBpdGVtLml0ZW1zKVwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cImNoaWxkLnNlcGFyYXRvclwiIGNsYXNzPVwidWktbWVudS1zZXBhcmF0b3IgdWktd2lkZ2V0LWNvbnRlbnRcIiBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiBjaGlsZC52aXNpYmxlID09PSBmYWxzZX1cIj5cbiAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCIhY2hpbGQuc2VwYXJhdG9yXCIgI2xpc3RJdGVtIFtuZ0NsYXNzXT1cInsndWktbWVudWl0ZW0gdWktY29ybmVyLWFsbCc6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd1aS1tZW51LXBhcmVudCc6Y2hpbGQuaXRlbXMsJ3VpLW1lbnVpdGVtLWFjdGl2ZSc6bGlzdEl0ZW09PWFjdGl2ZUl0ZW0sJ3VpLWhlbHBlci1oaWRkZW4nOiBjaGlsZC52aXNpYmxlID09PSBmYWxzZX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwib25JdGVtTW91c2VFbnRlcigkZXZlbnQsbGlzdEl0ZW0sY2hpbGQpXCIgKGNsaWNrKT1cIm9uSXRlbU1lbnVDbGljaygkZXZlbnQsIGxpc3RJdGVtLCBjaGlsZClcIj5cbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhY2hpbGQucm91dGVyTGlua1wiIFtocmVmXT1cImNoaWxkLnVybHx8JyMnXCIgW2F0dHIuZGF0YS1hdXRvbWF0aW9uaWRdPVwiY2hpbGQuYXV0b21hdGlvbklkXCIgW2F0dHIudGFyZ2V0XT1cImNoaWxkLnRhcmdldFwiIFthdHRyLnRpdGxlXT1cImNoaWxkLnRpdGxlXCIgW2F0dHIuaWRdPVwiY2hpbGQuaWRcIiAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgY2hpbGQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLW1lbnVpdGVtLWxpbmsgdWktY29ybmVyLWFsbCc6dHJ1ZSwndWktc3RhdGUtZGlzYWJsZWQnOmNoaWxkLmRpc2FibGVkfVwiIFtuZ1N0eWxlXT1cImNoaWxkLnN0eWxlXCIgW2NsYXNzXT1cImNoaWxkLnN0eWxlQ2xhc3NcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJjaGlsZC50YWJpbmRleCA/IGNoaWxkLnRhYmluZGV4IDogJzAnXCIgW2F0dHIuYXJpYS1oYXNwb3B1cF09XCJpdGVtLml0ZW1zICE9IG51bGxcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIml0ZW0gPT09IGFjdGl2ZUl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2NoaWxkLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXN1Ym1lbnUtaWNvbiBwaSBwaS1md1wiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIiBbbmdDbGFzc109XCJ7J3BpLWNhcmV0LWRvd24nOnJvb3QsJ3BpLWNhcmV0LXJpZ2h0Jzohcm9vdH1cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJjaGlsZC5yb3V0ZXJMaW5rXCIgW3JvdXRlckxpbmtdPVwiY2hpbGQucm91dGVyTGlua1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbmlkXT1cImNoaWxkLmF1dG9tYXRpb25JZFwiIFtxdWVyeVBhcmFtc109XCJjaGlsZC5xdWVyeVBhcmFtc1wiIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIid1aS1zdGF0ZS1hY3RpdmUnXCIgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cImNoaWxkLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJjaGlsZC50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJjaGlsZC50aXRsZVwiIFthdHRyLmlkXT1cImNoaWxkLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiY2hpbGQudGFiaW5kZXggPyBjaGlsZC50YWJpbmRleCA6ICcwJ1wiIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgY2hpbGQpXCIgW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpjaGlsZC5kaXNhYmxlZH1cIiBbbmdTdHlsZV09XCJjaGlsZC5zdHlsZVwiIFtjbGFzc109XCJjaGlsZC5zdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiAqbmdJZj1cImNoaWxkLmljb25cIiBbbmdDbGFzc109XCJjaGlsZC5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zdWJtZW51LWljb24gcGkgcGktZndcIiAqbmdJZj1cImNoaWxkLml0ZW1zXCIgW25nQ2xhc3NdPVwieydwaS1jYXJldC1kb3duJzpyb290LCdwaS1jYXJldC1yaWdodCc6IXJvb3R9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxwLW1lbnViYXJTdWIgY2xhc3M9XCJ1aS1zdWJtZW51XCIgW3BhcmVudEFjdGl2ZV09XCJsaXN0SXRlbT09YWN0aXZlSXRlbVwiIFtpdGVtXT1cImNoaWxkXCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiIFthdXRvRGlzcGxheV09XCJ0cnVlXCI+PC9wLW1lbnViYXJTdWI+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvdWw+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBNZW51YmFyU3ViIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGl0ZW06IE1lbnVJdGVtO1xuXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGF1dG9EaXNwbGF5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgZ2V0IHBhcmVudEFjdGl2ZSgpOmJvb2xlYW4gXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50QWN0aXZlO1xuICAgIH1cbiAgICBzZXQgcGFyZW50QWN0aXZlKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5yb290KSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnRBY3RpdmUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3BhcmVudEFjdGl2ZTpib29sZWFuO1xuXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG5cbiAgICBtZW51Q2xpY2s6IGJvb2xlYW47XG4gIFxuICAgIG1lbnVIb3ZlckFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgYWN0aXZlSXRlbTogYW55O1xuXG4gICAgYWN0aXZlTWVudTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICAgIG9uSXRlbU1lbnVDbGljayhldmVudDogRXZlbnQsIGl0ZW06IEhUTUxMSUVsZW1lbnQsIG1lbnVpdGVtOiBNZW51SXRlbSkge1xuICAgICAgICBpZiAoIXRoaXMuYXV0b0Rpc3BsYXkpIHtcbiAgICAgICAgICAgIGlmIChtZW51aXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gdGhpcy5hY3RpdmVNZW51ID8gKHRoaXMuYWN0aXZlTWVudS5pc0VxdWFsTm9kZShpdGVtKSA/IG51bGwgOiBpdGVtKSA6IGl0ZW07XG4gICAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSA8SFRNTExJRWxlbWVudD5pdGVtLmNoaWxkcmVuWzBdLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGlmIChuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGxldCBzdWJsaXN0ID0gPEhUTUxVTGlzdEVsZW1lbnQ+bmV4dEVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnpJbmRleCA9IFN0cmluZyh0aGlzLmJhc2VaSW5kZXggKyAoKytEb21IYW5kbGVyLnppbmRleCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS50b3AgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KGl0ZW0uY2hpbGRyZW5bMF0pICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS5sZWZ0ID0gJzBweCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUubGVmdCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aChpdGVtLmNoaWxkcmVuWzBdKSArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1lbnVDbGljayA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1lbnVIb3ZlckFjdGl2ZSA9IHRoaXMuYWN0aXZlTWVudSA/ICghdGhpcy5hY3RpdmVNZW51LmlzRXF1YWxOb2RlKGl0ZW0pKSA6IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZU1lbnUgPSB0aGlzLmFjdGl2ZU1lbnUgPyAodGhpcy5hY3RpdmVNZW51LmlzRXF1YWxOb2RlKGl0ZW0pID8gbnVsbDogaXRlbSkgOiBpdGVtO1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2NsaWNrJywoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWVudUNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudUhvdmVyQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlTWVudSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1Nb3VzZUVudGVyKGV2ZW50OiBFdmVudCwgaXRlbTogSFRNTExJRWxlbWVudCwgbWVudWl0ZW06IE1lbnVJdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9EaXNwbGF5IHx8ICghdGhpcy5hdXRvRGlzcGxheSAmJiB0aGlzLnJvb3QgJiYgdGhpcy5tZW51SG92ZXJBY3RpdmUpKSB7XG4gICAgICAgICAgICBpZiAobWVudWl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgodGhpcy5hY3RpdmVJdGVtICYmICF0aGlzLmFjdGl2ZUl0ZW0uaXNFcXVhbE5vZGUoaXRlbSkgfHwgIXRoaXMuYWN0aXZlSXRlbSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBpdGVtO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IDxIVE1MTElFbGVtZW50Pml0ZW0uY2hpbGRyZW5bMF0ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3VibGlzdCA9IDxIVE1MVUxpc3RFbGVtZW50Pm5leHRFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnpJbmRleCA9IFN0cmluZygrK0RvbUhhbmRsZXIuemluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb290KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnRvcCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS5sZWZ0ID0gJzBweCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLmxlZnQgPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlTWVudSA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGl0ZW1DbGljayhldmVudCwgaXRlbTogTWVudUl0ZW0pIMKge1xuICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXRlbS51cmwpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gbnVsbDtcbiAgICB9XG5cbiAgICBsaXN0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b0Rpc3BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICB9XG5cbiAgICB9XG5cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW1lbnViYXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1tZW51YmFyIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzp0cnVlfVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIj5cbiAgICAgICAgICAgIDxwLW1lbnViYXJTdWIgW2l0ZW1dPVwibW9kZWxcIiByb290PVwicm9vdFwiIFtiYXNlWkluZGV4XT1cImJhc2VaSW5kZXhcIiBbYXV0b1pJbmRleF09XCJhdXRvWkluZGV4XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9wLW1lbnViYXJTdWI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktbWVudWJhci1jdXN0b21cIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBNZW51YmFyIHtcblxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGF1dG9aSW5kZXg6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgX2F1dG9EaXNwbGF5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZ2V0IGF1dG9EaXNwbGF5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYXV0b0Rpc3BsYXk7XG4gICAgfVxuICAgIHNldCB1dGMoX3V0YzogYm9vbGVhbikge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkF1dG9EaXNwbGF5IHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQgYW5kIGZ1bmN0aW9uYWxpdHkgaXMgbm90IGF2YWlsYWJsZS5cIik7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUm91dGVyTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbTWVudWJhciwgUm91dGVyTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtNZW51YmFyLCBNZW51YmFyU3ViXVxufSlcbmV4cG9ydCBjbGFzcyBNZW51YmFyTW9kdWxlIHsgfVxuIl19