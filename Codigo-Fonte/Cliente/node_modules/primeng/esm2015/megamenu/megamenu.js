var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
let MegaMenu = class MegaMenu {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.orientation = 'horizontal';
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    onItemMouseEnter(event, item, menuitem) {
        if (menuitem.disabled) {
            return;
        }
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
        this.activeItem = item;
        if (menuitem.items) {
            let submenu = item.children[0].nextElementSibling;
            if (submenu) {
                if (this.autoZIndex) {
                    submenu.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                if (this.orientation === 'horizontal') {
                    submenu.style.top = DomHandler.getOuterHeight(item.children[0]) + 'px';
                    submenu.style.left = '0px';
                }
                else if (this.orientation === 'vertical') {
                    submenu.style.top = '0px';
                    submenu.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                }
            }
        }
    }
    onItemMouseLeave(event, link) {
        this.hideTimeout = setTimeout(() => {
            this.activeItem = null;
        }, 1000);
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
    getColumnClass(menuitem) {
        let length = menuitem.items ? menuitem.items.length : 0;
        let columnClass;
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
    }
};
MegaMenu.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
__decorate([
    Input()
], MegaMenu.prototype, "model", void 0);
__decorate([
    Input()
], MegaMenu.prototype, "style", void 0);
__decorate([
    Input()
], MegaMenu.prototype, "styleClass", void 0);
__decorate([
    Input()
], MegaMenu.prototype, "orientation", void 0);
__decorate([
    Input()
], MegaMenu.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], MegaMenu.prototype, "baseZIndex", void 0);
MegaMenu = __decorate([
    Component({
        selector: 'p-megaMenu',
        template: `
        <div [class]="styleClass" [ngStyle]="style"
            [ngClass]="{'ui-megamenu ui-widget ui-widget-content ui-corner-all':true,'ui-megamenu-horizontal': orientation == 'horizontal','ui-megamenu-vertical': orientation == 'vertical'}">
            <ul class="ui-megamenu-root-list" role="menubar">
                <ng-template ngFor let-category [ngForOf]="model">
                    <li *ngIf="category.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': category.visible === false}">
                    <li *ngIf="!category.separator" #item [ngClass]="{'ui-menuitem ui-corner-all':true,'ui-menuitem-active':item==activeItem, 'ui-helper-hidden': category.visible === false}"
                        (mouseenter)="onItemMouseEnter($event, item, category)" (mouseleave)="onItemMouseLeave($event, item)">
   
                        <a *ngIf="!category.routerLink" [href]="category.url||'#'" [attr.target]="category.target" [attr.title]="category.title" [attr.id]="category.id" (click)="itemClick($event, category)" [attr.tabindex]="category.tabindex ? category.tabindex : '0'"
                            [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':category.disabled}" [ngStyle]="category.style" [class]="category.styleClass">
                            <span class="ui-menuitem-icon" *ngIf="category.icon" [ngClass]="category.icon"></span>
                            <span class="ui-menuitem-text">{{category.label}}</span>
                            <span *ngIf="category.items" class="ui-submenu-icon pi pi-fw" [ngClass]="{'pi-caret-down':orientation=='horizontal','pi-caret-right':orientation=='vertical'}"></span>
                        </a>
                        <a *ngIf="category.routerLink" [routerLink]="category.routerLink" [queryParams]="category.queryParams" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="category.routerLinkActiveOptions||{exact:false}" [attr.tabindex]="category.tabindex ? category.tabindex : '0'" 
                            [attr.target]="category.target" [attr.title]="category.title" [attr.id]="category.id"
                            (click)="itemClick($event, category)" [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':category.disabled}" [ngStyle]="category.style" [class]="category.styleClass">
                            <span class="ui-menuitem-icon" *ngIf="category.icon" [ngClass]="category.icon"></span>
                            <span class="ui-menuitem-text">{{category.label}}</span>
                        </a>

                        <div class="ui-megamenu-panel ui-widget-content ui-corner-all ui-shadow" *ngIf="category.items">
                            <div class="ui-g">
                                <ng-template ngFor let-column [ngForOf]="category.items">
                                    <div [class]="getColumnClass(category)">
                                        <ng-template ngFor let-submenu [ngForOf]="column">
                                            <ul class="ui-megamenu-submenu" role="menu">
                                                <li class="ui-widget-header ui-megamenu-submenu-header ui-corner-all">{{submenu.label}}</li>
                                                <ng-template ngFor let-item [ngForOf]="submenu.items">
                                                    <li *ngIf="item.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': item.visible === false}" role="separator">
                                                    <li *ngIf="!item.separator" class="ui-menuitem ui-corner-all" [ngClass]="{'ui-helper-hidden': item.visible === false}" role="none">
                                                        <a *ngIf="!item.routerLink" role="menuitem" [href]="item.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id" [attr.tabindex]="item.tabindex ? item.tabindex : '0'"
                                                            [ngClass]="{'ui-state-disabled':item.disabled}" (click)="itemClick($event, item)">
                                                            <span class="ui-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                                                            <span class="ui-menuitem-text">{{item.label}}</span>
                                                        </a>
                                                        <a *ngIf="item.routerLink" role="menuitem" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'ui-state-active'" [attr.tabindex]="item.tabindex ? item.tabindex : '0'"
                                                            [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link ui-corner-all" 
                                                             [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id"
                                                            [ngClass]="{'ui-state-disabled':item.disabled}" (click)="itemClick($event, item)">
                                                            <span class="ui-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
                                                            <span class="ui-menuitem-text">{{item.label}}</span>
                                                        </a>
                                                    </li>
                                                </ng-template>
                                            </ul>
                                        </ng-template>
                                    </div>
                                </ng-template>
                            </div>
                        </div>
                    </li>
                </ng-template>
                <li class="ui-menuitem ui-menuitem-custom ui-corner-all" *ngIf="orientation === 'horizontal'">
                    <ng-content></ng-content>
                </li>
            </ul>
        </div>
    `
    })
], MegaMenu);
export { MegaMenu };
let MegaMenuModule = class MegaMenuModule {
};
MegaMenuModule = __decorate([
    NgModule({
        imports: [CommonModule, RouterModule],
        exports: [MegaMenu, RouterModule],
        declarations: [MegaMenu]
    })
], MegaMenuModule);
export { MegaMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL21lZ2FtZW51LyIsInNvdXJjZXMiOlsibWVnYW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBaUU3QyxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBa0JqQixZQUFtQixFQUFjLEVBQVMsUUFBbUI7UUFBMUMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVc7UUFWcEQsZ0JBQVcsR0FBVyxZQUFZLENBQUM7UUFFbkMsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixlQUFVLEdBQVcsQ0FBQyxDQUFDO0lBTWdDLENBQUM7SUFFakUsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxRQUFrQjtRQUM1QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDbkIsT0FBTztTQUNWO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDM0I7UUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUV2QixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDaEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztZQUNsRCxJQUFJLE9BQU8sRUFBRTtnQkFD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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTJEVDtLQUNKLENBQUM7R0FDVyxRQUFRLENBd0dwQjtTQXhHWSxRQUFRO0FBK0dyQixJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0NBQUksQ0FBQTtBQUFsQixjQUFjO0lBTDFCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxZQUFZLENBQUM7UUFDcEMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFDLFlBQVksQ0FBQztRQUNoQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7S0FDM0IsQ0FBQztHQUNXLGNBQWMsQ0FBSTtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixJbnB1dCxSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7TWVudUl0ZW19IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7Um91dGVyTW9kdWxlfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbWVnYU1lbnUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLW1lZ2FtZW51IHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1tZWdhbWVudS1ob3Jpem9udGFsJzogb3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnLCd1aS1tZWdhbWVudS12ZXJ0aWNhbCc6IG9yaWVudGF0aW9uID09ICd2ZXJ0aWNhbCd9XCI+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJ1aS1tZWdhbWVudS1yb290LWxpc3RcIiByb2xlPVwibWVudWJhclwiPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtY2F0ZWdvcnkgW25nRm9yT2ZdPVwibW9kZWxcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiY2F0ZWdvcnkuc2VwYXJhdG9yXCIgY2xhc3M9XCJ1aS1tZW51LXNlcGFyYXRvciB1aS13aWRnZXQtY29udGVudFwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IGNhdGVnb3J5LnZpc2libGUgPT09IGZhbHNlfVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgKm5nSWY9XCIhY2F0ZWdvcnkuc2VwYXJhdG9yXCIgI2l0ZW0gW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbSB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1tZW51aXRlbS1hY3RpdmUnOml0ZW09PWFjdGl2ZUl0ZW0sICd1aS1oZWxwZXItaGlkZGVuJzogY2F0ZWdvcnkudmlzaWJsZSA9PT0gZmFsc2V9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cIm9uSXRlbU1vdXNlRW50ZXIoJGV2ZW50LCBpdGVtLCBjYXRlZ29yeSlcIiAobW91c2VsZWF2ZSk9XCJvbkl0ZW1Nb3VzZUxlYXZlKCRldmVudCwgaXRlbSlcIj5cbiAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCIhY2F0ZWdvcnkucm91dGVyTGlua1wiIFtocmVmXT1cImNhdGVnb3J5LnVybHx8JyMnXCIgW2F0dHIudGFyZ2V0XT1cImNhdGVnb3J5LnRhcmdldFwiIFthdHRyLnRpdGxlXT1cImNhdGVnb3J5LnRpdGxlXCIgW2F0dHIuaWRdPVwiY2F0ZWdvcnkuaWRcIiAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgY2F0ZWdvcnkpXCIgW2F0dHIudGFiaW5kZXhdPVwiY2F0ZWdvcnkudGFiaW5kZXggPyBjYXRlZ29yeS50YWJpbmRleCA6ICcwJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpjYXRlZ29yeS5kaXNhYmxlZH1cIiBbbmdTdHlsZV09XCJjYXRlZ29yeS5zdHlsZVwiIFtjbGFzc109XCJjYXRlZ29yeS5zdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJjYXRlZ29yeS5pY29uXCIgW25nQ2xhc3NdPVwiY2F0ZWdvcnkuaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2NhdGVnb3J5LmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjYXRlZ29yeS5pdGVtc1wiIGNsYXNzPVwidWktc3VibWVudS1pY29uIHBpIHBpLWZ3XCIgW25nQ2xhc3NdPVwieydwaS1jYXJldC1kb3duJzpvcmllbnRhdGlvbj09J2hvcml6b250YWwnLCdwaS1jYXJldC1yaWdodCc6b3JpZW50YXRpb249PSd2ZXJ0aWNhbCd9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJjYXRlZ29yeS5yb3V0ZXJMaW5rXCIgW3JvdXRlckxpbmtdPVwiY2F0ZWdvcnkucm91dGVyTGlua1wiIFtxdWVyeVBhcmFtc109XCJjYXRlZ29yeS5xdWVyeVBhcmFtc1wiIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIid1aS1zdGF0ZS1hY3RpdmUnXCIgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cImNhdGVnb3J5LnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCIgW2F0dHIudGFiaW5kZXhdPVwiY2F0ZWdvcnkudGFiaW5kZXggPyBjYXRlZ29yeS50YWJpbmRleCA6ICcwJ1wiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJjYXRlZ29yeS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJjYXRlZ29yeS50aXRsZVwiIFthdHRyLmlkXT1cImNhdGVnb3J5LmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgY2F0ZWdvcnkpXCIgW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpjYXRlZ29yeS5kaXNhYmxlZH1cIiBbbmdTdHlsZV09XCJjYXRlZ29yeS5zdHlsZVwiIFtjbGFzc109XCJjYXRlZ29yeS5zdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJjYXRlZ29yeS5pY29uXCIgW25nQ2xhc3NdPVwiY2F0ZWdvcnkuaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2NhdGVnb3J5LmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1tZWdhbWVudS1wYW5lbCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsIHVpLXNoYWRvd1wiICpuZ0lmPVwiY2F0ZWdvcnkuaXRlbXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWNvbHVtbiBbbmdGb3JPZl09XCJjYXRlZ29yeS5pdGVtc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBbY2xhc3NdPVwiZ2V0Q29sdW1uQ2xhc3MoY2F0ZWdvcnkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1zdWJtZW51IFtuZ0Zvck9mXT1cImNvbHVtblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJ1aS1tZWdhbWVudS1zdWJtZW51XCIgcm9sZT1cIm1lbnVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLXdpZGdldC1oZWFkZXIgdWktbWVnYW1lbnUtc3VibWVudS1oZWFkZXIgdWktY29ybmVyLWFsbFwiPnt7c3VibWVudS5sYWJlbH19PC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtaXRlbSBbbmdGb3JPZl09XCJzdWJtZW51Lml0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiaXRlbS5zZXBhcmF0b3JcIiBjbGFzcz1cInVpLW1lbnUtc2VwYXJhdG9yIHVpLXdpZGdldC1jb250ZW50XCIgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzogaXRlbS52aXNpYmxlID09PSBmYWxzZX1cIiByb2xlPVwic2VwYXJhdG9yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiIWl0ZW0uc2VwYXJhdG9yXCIgY2xhc3M9XCJ1aS1tZW51aXRlbSB1aS1jb3JuZXItYWxsXCIgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzogaXRlbS52aXNpYmxlID09PSBmYWxzZX1cIiByb2xlPVwibm9uZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFpdGVtLnJvdXRlckxpbmtcIiByb2xlPVwibWVudWl0ZW1cIiBbaHJlZl09XCJpdGVtLnVybHx8JyMnXCIgY2xhc3M9XCJ1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGxcIiBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJpdGVtLnRpdGxlXCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiIFthdHRyLnRhYmluZGV4XT1cIml0ZW0udGFiaW5kZXggPyBpdGVtLnRhYmluZGV4IDogJzAnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOml0ZW0uZGlzYWJsZWR9XCIgKGNsaWNrKT1cIml0ZW1DbGljaygkZXZlbnQsIGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiAqbmdJZj1cIml0ZW0uaWNvblwiIFtuZ0NsYXNzXT1cIml0ZW0uaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0tdGV4dFwiPnt7aXRlbS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwiaXRlbS5yb3V0ZXJMaW5rXCIgcm9sZT1cIm1lbnVpdGVtXCIgW3JvdXRlckxpbmtdPVwiaXRlbS5yb3V0ZXJMaW5rXCIgW3F1ZXJ5UGFyYW1zXT1cIml0ZW0ucXVlcnlQYXJhbXNcIiBbcm91dGVyTGlua0FjdGl2ZV09XCIndWktc3RhdGUtYWN0aXZlJ1wiIFthdHRyLnRhYmluZGV4XT1cIml0ZW0udGFiaW5kZXggPyBpdGVtLnRhYmluZGV4IDogJzAnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3V0ZXJMaW5rQWN0aXZlT3B0aW9uc109XCJpdGVtLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCIgY2xhc3M9XCJ1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGxcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci50YXJnZXRdPVwiaXRlbS50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJpdGVtLnRpdGxlXCIgW2F0dHIuaWRdPVwiaXRlbS5pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzppdGVtLmRpc2FibGVkfVwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBpdGVtKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS1pY29uXCIgKm5nSWY9XCJpdGVtLmljb25cIiBbbmdDbGFzc109XCJpdGVtLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2l0ZW0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktbWVudWl0ZW0gdWktbWVudWl0ZW0tY3VzdG9tIHVpLWNvcm5lci1hbGxcIiAqbmdJZj1cIm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCdcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE1lZ2FNZW51IHtcblxuICAgIEBJbnB1dCgpIG1vZGVsOiBNZW51SXRlbVtdO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBvcmllbnRhdGlvbjogc3RyaW5nID0gJ2hvcml6b250YWwnO1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuICAgIFxuICAgIGFjdGl2ZUl0ZW06IGFueTtcblxuICAgIGhpZGVUaW1lb3V0OiBhbnk7XG4gICAgICAgICAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cbiAgICBcbiAgICBvbkl0ZW1Nb3VzZUVudGVyKGV2ZW50LCBpdGVtLCBtZW51aXRlbTogTWVudUl0ZW0pIHtcbiAgICAgICAgaWYgKG1lbnVpdGVtLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5oaWRlVGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaGlkZVRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5oaWRlVGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IGl0ZW07XG5cbiAgICAgICAgaWYgKG1lbnVpdGVtLml0ZW1zKSB7XG4gICAgICAgICAgICBsZXQgc3VibWVudSA9IGl0ZW0uY2hpbGRyZW5bMF0ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgaWYgKHN1Ym1lbnUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1lbnUuc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51LnN0eWxlLnRvcCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51LnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51LnN0eWxlLnRvcCA9ICcwcHgnO1xuICAgICAgICAgICAgICAgICAgICBzdWJtZW51LnN0eWxlLmxlZnQgPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbkl0ZW1Nb3VzZUxlYXZlKGV2ZW50LCBsaW5rKSB7XG4gICAgICAgIHRoaXMuaGlkZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgICBcbiAgICBpdGVtQ2xpY2soZXZlbnQsIGl0ZW06IE1lbnVJdGVtKcKge1xuICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCFpdGVtLnVybCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGl0ZW0uY29tbWFuZCkge1xuICAgICAgICAgICAgaXRlbS5jb21tYW5kKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGdldENvbHVtbkNsYXNzKG1lbnVpdGVtOiBNZW51SXRlbSkge1xuICAgICAgICBsZXQgbGVuZ3RoID0gbWVudWl0ZW0uaXRlbXMgPyBtZW51aXRlbS5pdGVtcy5sZW5ndGg6IDA7XG4gICAgICAgIGxldCBjb2x1bW5DbGFzcztcbiAgICAgICAgc3dpdGNoKGxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzPSAndWktZy02JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgY29sdW1uQ2xhc3M9ICd1aS1nLTQnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBjb2x1bW5DbGFzcz0gJ3VpLWctMyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzPSAndWktZy0yJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGNvbHVtbkNsYXNzPSAndWktZy0xMic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGNvbHVtbkNsYXNzO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFJvdXRlck1vZHVsZV0sXG4gICAgZXhwb3J0czogW01lZ2FNZW51LFJvdXRlck1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbTWVnYU1lbnVdXG59KVxuZXhwb3J0IGNsYXNzIE1lZ2FNZW51TW9kdWxlIHsgfSJdfQ==