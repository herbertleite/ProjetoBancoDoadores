var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, Output, EventEmitter, AfterContentInit, ContentChildren, QueryList, TemplateRef, EmbeddedViewRef, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule, PrimeTemplate } from 'primeng/api';
let idx = 0;
let TabViewNav = class TabViewNav {
    constructor() {
        this.orientation = 'top';
        this.onTabClick = new EventEmitter();
        this.onTabCloseClick = new EventEmitter();
    }
    getDefaultHeaderClass(tab) {
        let styleClass = 'ui-state-default ui-corner-' + this.orientation;
        if (tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    }
    clickTab(event, tab) {
        this.onTabClick.emit({
            originalEvent: event,
            tab: tab
        });
    }
    clickClose(event, tab) {
        this.onTabCloseClick.emit({
            originalEvent: event,
            tab: tab
        });
    }
};
__decorate([
    Input()
], TabViewNav.prototype, "tabs", void 0);
__decorate([
    Input()
], TabViewNav.prototype, "orientation", void 0);
__decorate([
    Output()
], TabViewNav.prototype, "onTabClick", void 0);
__decorate([
    Output()
], TabViewNav.prototype, "onTabCloseClick", void 0);
TabViewNav = __decorate([
    Component({
        selector: '[p-tabViewNav]',
        host: {
            '[class.ui-tabview-nav]': 'true',
            '[class.ui-helper-reset]': 'true',
            '[class.ui-helper-clearfix]': 'true',
            '[class.ui-widget-header]': 'true',
            '[class.ui-corner-all]': 'true'
        },
        template: `
        <ng-template ngFor let-tab [ngForOf]="tabs">
            <li [class]="getDefaultHeaderClass(tab)" [ngStyle]="tab.headerStyle" role="presentation"
                [ngClass]="{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-disabled': tab.disabled}"
                (click)="clickTab($event,tab)" *ngIf="!tab.closed" tabindex="0" (keydown.enter)="clickTab($event,tab)">
                <a [attr.id]="tab.id + '-label'" role="tab" [attr.aria-selected]="tab.selected" [attr.aria-controls]="tab.id" [pTooltip]="tab.tooltip" [tooltipPosition]="tab.tooltipPosition"
                    [attr.aria-selected]="tab.selected" [positionStyle]="tab.tooltipPositionStyle" [tooltipStyleClass]="tab.tooltipStyleClass">
                    <ng-container *ngIf="!tab.headerTemplate" >
                        <span class="ui-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon"></span>
                        <span class="ui-tabview-title">{{tab.header}}</span>
                        <span class="ui-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon"></span>
                    </ng-container>
                    <ng-container *ngIf="tab.headerTemplate">
                        <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                    </ng-container>
                </a>
                <span *ngIf="tab.closable" class="ui-tabview-close pi pi-times" (click)="clickClose($event,tab)"></span>
            </li>
        </ng-template>
    `
    })
], TabViewNav);
export { TabViewNav };
let TabPanel = class TabPanel {
    constructor(viewContainer, cd) {
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.cache = true;
        this.tooltipPosition = 'top';
        this.tooltipPositionStyle = 'absolute';
        this.id = `ui-tabpanel-${idx++}`;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    get selected() {
        return this._selected;
    }
    set selected(val) {
        this._selected = val;
        if (!this.loaded) {
            this.cd.detectChanges();
        }
        this.loaded = true;
    }
    ngOnDestroy() {
        this.view = null;
    }
};
TabPanel.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], TabPanel.prototype, "header", void 0);
__decorate([
    Input()
], TabPanel.prototype, "disabled", void 0);
__decorate([
    Input()
], TabPanel.prototype, "closable", void 0);
__decorate([
    Input()
], TabPanel.prototype, "headerStyle", void 0);
__decorate([
    Input()
], TabPanel.prototype, "headerStyleClass", void 0);
__decorate([
    Input()
], TabPanel.prototype, "leftIcon", void 0);
__decorate([
    Input()
], TabPanel.prototype, "rightIcon", void 0);
__decorate([
    Input()
], TabPanel.prototype, "cache", void 0);
__decorate([
    Input()
], TabPanel.prototype, "tooltip", void 0);
__decorate([
    Input()
], TabPanel.prototype, "tooltipPosition", void 0);
__decorate([
    Input()
], TabPanel.prototype, "tooltipPositionStyle", void 0);
__decorate([
    Input()
], TabPanel.prototype, "tooltipStyleClass", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], TabPanel.prototype, "templates", void 0);
__decorate([
    Input()
], TabPanel.prototype, "selected", null);
TabPanel = __decorate([
    Component({
        selector: 'p-tabPanel',
        template: `
        <div [attr.id]="id" class="ui-tabview-panel ui-widget-content" [ngClass]="{'ui-helper-hidden': !selected}"
            role="tabpanel" [attr.aria-hidden]="!selected" [attr.aria-labelledby]="id + '-label'" *ngIf="!closed">
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </ng-container>
        </div>
    `
    })
], TabPanel);
export { TabPanel };
let TabView = class TabView {
    constructor(el) {
        this.el = el;
        this.orientation = 'top';
        this.onChange = new EventEmitter();
        this.onClose = new EventEmitter();
        this.activeIndexChange = new EventEmitter();
    }
    ngAfterContentInit() {
        this.initTabs();
        this.tabPanels.changes.subscribe(_ => {
            this.initTabs();
        });
    }
    initTabs() {
        this.tabs = this.tabPanels.toArray();
        let selectedTab = this.findSelectedTab();
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else
                this.tabs[0].selected = true;
        }
    }
    open(event, tab) {
        if (tab.disabled) {
            if (event) {
                event.preventDefault();
            }
            return;
        }
        if (!tab.selected) {
            let selectedTab = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false;
            }
            tab.selected = true;
            let selectedTabIndex = this.findTabIndex(tab);
            this.preventActiveIndexPropagation = true;
            this.activeIndexChange.emit(selectedTabIndex);
            this.onChange.emit({ originalEvent: event, index: selectedTabIndex });
        }
        if (event) {
            event.preventDefault();
        }
    }
    close(event, tab) {
        if (this.controlClose) {
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab),
                close: () => {
                    this.closeTab(tab);
                }
            });
        }
        else {
            this.closeTab(tab);
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab)
            });
        }
        event.stopPropagation();
    }
    closeTab(tab) {
        if (tab.disabled) {
            return;
        }
        if (tab.selected) {
            tab.selected = false;
            for (let i = 0; i < this.tabs.length; i++) {
                let tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        tab.closed = true;
    }
    findSelectedTab() {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    }
    findTabIndex(tab) {
        let index = -1;
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(val) {
        this._activeIndex = val;
        if (this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }
        if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
            this.findSelectedTab().selected = false;
            this.tabs[this._activeIndex].selected = true;
        }
    }
};
TabView.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], TabView.prototype, "orientation", void 0);
__decorate([
    Input()
], TabView.prototype, "style", void 0);
__decorate([
    Input()
], TabView.prototype, "styleClass", void 0);
__decorate([
    Input()
], TabView.prototype, "controlClose", void 0);
__decorate([
    ContentChildren(TabPanel)
], TabView.prototype, "tabPanels", void 0);
__decorate([
    Output()
], TabView.prototype, "onChange", void 0);
__decorate([
    Output()
], TabView.prototype, "onClose", void 0);
__decorate([
    Output()
], TabView.prototype, "activeIndexChange", void 0);
__decorate([
    Input()
], TabView.prototype, "activeIndex", null);
TabView = __decorate([
    Component({
        selector: 'p-tabView',
        template: `
        <div [ngClass]="'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation" [ngStyle]="style" [class]="styleClass">
            <ul p-tabViewNav role="tablist" *ngIf="orientation!='bottom'" [tabs]="tabs" [orientation]="orientation"
                (onTabClick)="open($event.originalEvent, $event.tab)" (onTabCloseClick)="close($event.originalEvent, $event.tab)"></ul>
            <div class="ui-tabview-panels">
                <ng-content></ng-content>
            </div>
            <ul p-tabViewNav role="tablist" *ngIf="orientation=='bottom'" [tabs]="tabs" [orientation]="orientation"
                (onTabClick)="open($event.originalEvent, $event.tab)" (onTabCloseClick)="close($event.originalEvent, $event.tab)"></ul>
        </div>
    `
    })
], TabView);
export { TabView };
let TabViewModule = class TabViewModule {
};
TabViewModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule, TooltipModule],
        exports: [TabView, TabPanel, TabViewNav, SharedModule],
        declarations: [TabView, TabPanel, TabViewNav]
    })
], TabViewModule);
export { TabViewModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFidmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvdGFidmlldy8iLCJzb3VyY2VzIjpbInRhYnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxnQkFBZ0IsRUFDbEYsZUFBZSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsZUFBZSxFQUFDLGdCQUFnQixFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBQyxhQUFhLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFHdkQsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDO0FBZ0NwQixJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBQXZCO1FBSWEsZ0JBQVcsR0FBVyxLQUFLLENBQUM7UUFFM0IsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUF1QnRFLENBQUM7SUFyQkcscUJBQXFCLENBQUMsR0FBWTtRQUM5QixJQUFJLFVBQVUsR0FBRyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2xFLElBQUksR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQ3RCLFVBQVUsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztTQUN4RDtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQWE7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDakIsYUFB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O1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDaEQ7SUFDTCxDQUFDO0NBQ0osQ0FBQTs7WUE5SDBCLFVBQVU7O0FBeEJ4QjtJQUFSLEtBQUssRUFBRTs0Q0FBNkI7QUFFNUI7SUFBUixLQUFLLEVBQUU7c0NBQVk7QUFFWDtJQUFSLEtBQUssRUFBRTsyQ0FBb0I7QUFFbkI7SUFBUixLQUFLLEVBQUU7NkNBQXVCO0FBRUo7SUFBMUIsZUFBZSxDQUFDLFFBQVEsQ0FBQzswQ0FBZ0M7QUFFaEQ7SUFBVCxNQUFNLEVBQUU7eUNBQWtEO0FBRWpEO0lBQVQsTUFBTSxFQUFFO3dDQUFpRDtBQUVoRDtJQUFULE1BQU0sRUFBRTtrREFBOEQ7QUF3SDlEO0lBQVIsS0FBSyxFQUFFOzBDQUVQO0FBMUlRLE9BQU87SUFkbkIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7O0tBVVQ7S0FDSixDQUFDO0dBQ1csT0FBTyxDQXdKbkI7U0F4SlksT0FBTztBQWdLcEIsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUFJLENBQUE7QUFBakIsYUFBYTtJQUx6QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLGFBQWEsQ0FBQztRQUNsRCxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxZQUFZLENBQUM7UUFDbkQsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxVQUFVLENBQUM7S0FDOUMsQ0FBQztHQUNXLGFBQWEsQ0FBSTtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixPbkRlc3Ryb3ksSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixBZnRlckNvbnRlbnRJbml0LFxuICAgICAgICBDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFRlbXBsYXRlUmVmLEVtYmVkZGVkVmlld1JlZixWaWV3Q29udGFpbmVyUmVmLCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7VG9vbHRpcE1vZHVsZX0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlLFByaW1lVGVtcGxhdGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7QmxvY2thYmxlVUl9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxubGV0IGlkeDogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbcC10YWJWaWV3TmF2XScsXG4gICAgaG9zdDp7XG4gICAgICAgICdbY2xhc3MudWktdGFidmlldy1uYXZdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLWhlbHBlci1yZXNldF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MudWktaGVscGVyLWNsZWFyZml4XSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS13aWRnZXQtaGVhZGVyXSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS1jb3JuZXItYWxsXSc6ICd0cnVlJ1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC10YWIgW25nRm9yT2ZdPVwidGFic1wiPlxuICAgICAgICAgICAgPGxpIFtjbGFzc109XCJnZXREZWZhdWx0SGVhZGVyQ2xhc3ModGFiKVwiIFtuZ1N0eWxlXT1cInRhYi5oZWFkZXJTdHlsZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktdGFidmlldy1zZWxlY3RlZCB1aS1zdGF0ZS1hY3RpdmUnOiB0YWIuc2VsZWN0ZWQsICd1aS1zdGF0ZS1kaXNhYmxlZCc6IHRhYi5kaXNhYmxlZH1cIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjbGlja1RhYigkZXZlbnQsdGFiKVwiICpuZ0lmPVwiIXRhYi5jbG9zZWRcIiB0YWJpbmRleD1cIjBcIiAoa2V5ZG93bi5lbnRlcik9XCJjbGlja1RhYigkZXZlbnQsdGFiKVwiPlxuICAgICAgICAgICAgICAgIDxhIFthdHRyLmlkXT1cInRhYi5pZCArICctbGFiZWwnXCIgcm9sZT1cInRhYlwiIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwidGFiLnNlbGVjdGVkXCIgW2F0dHIuYXJpYS1jb250cm9sc109XCJ0YWIuaWRcIiBbcFRvb2x0aXBdPVwidGFiLnRvb2x0aXBcIiBbdG9vbHRpcFBvc2l0aW9uXT1cInRhYi50b29sdGlwUG9zaXRpb25cIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cInRhYi5zZWxlY3RlZFwiIFtwb3NpdGlvblN0eWxlXT1cInRhYi50b29sdGlwUG9zaXRpb25TdHlsZVwiIFt0b29sdGlwU3R5bGVDbGFzc109XCJ0YWIudG9vbHRpcFN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0YWIuaGVhZGVyVGVtcGxhdGVcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXRhYnZpZXctbGVmdC1pY29uXCIgW25nQ2xhc3NdPVwidGFiLmxlZnRJY29uXCIgKm5nSWY9XCJ0YWIubGVmdEljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXRhYnZpZXctdGl0bGVcIj57e3RhYi5oZWFkZXJ9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktdGFidmlldy1yaWdodC1pY29uXCIgW25nQ2xhc3NdPVwidGFiLnJpZ2h0SWNvblwiICpuZ0lmPVwidGFiLnJpZ2h0SWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0YWIuaGVhZGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWIuaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidGFiLmNsb3NhYmxlXCIgY2xhc3M9XCJ1aS10YWJ2aWV3LWNsb3NlIHBpIHBpLXRpbWVzXCIgKGNsaWNrKT1cImNsaWNrQ2xvc2UoJGV2ZW50LHRhYilcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIFRhYlZpZXdOYXYge1xuICAgIFxuICAgIEBJbnB1dCgpIHRhYnM6IFRhYlBhbmVsW107XG5cbiAgICBASW5wdXQoKSBvcmllbnRhdGlvbjogc3RyaW5nID0gJ3RvcCc7XG5cbiAgICBAT3V0cHV0KCkgb25UYWJDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uVGFiQ2xvc2VDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgZ2V0RGVmYXVsdEhlYWRlckNsYXNzKHRhYjpUYWJQYW5lbCkge1xuICAgICAgICBsZXQgc3R5bGVDbGFzcyA9ICd1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci0nICsgdGhpcy5vcmllbnRhdGlvbjtcbiAgICAgICAgaWYgKHRhYi5oZWFkZXJTdHlsZUNsYXNzKSB7XG4gICAgICAgICAgICBzdHlsZUNsYXNzID0gc3R5bGVDbGFzcyArIFwiIFwiICsgdGFiLmhlYWRlclN0eWxlQ2xhc3M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0eWxlQ2xhc3M7XG4gICAgfVxuICAgIFxuICAgIGNsaWNrVGFiKGV2ZW50LCB0YWI6IFRhYlBhbmVsKSB7XG4gICAgICAgIHRoaXMub25UYWJDbGljay5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdGFiOiB0YWJcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgY2xpY2tDbG9zZShldmVudCwgdGFiOiBUYWJQYW5lbCkge1xuICAgICAgICB0aGlzLm9uVGFiQ2xvc2VDbGljay5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdGFiOiB0YWJcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10YWJQYW5lbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbYXR0ci5pZF09XCJpZFwiIGNsYXNzPVwidWktdGFidmlldy1wYW5lbCB1aS13aWRnZXQtY29udGVudFwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6ICFzZWxlY3RlZH1cIlxuICAgICAgICAgICAgcm9sZT1cInRhYnBhbmVsXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIXNlbGVjdGVkXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImlkICsgJy1sYWJlbCdcIiAqbmdJZj1cIiFjbG9zZWRcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb250ZW50VGVtcGxhdGUgJiYgKGNhY2hlID8gbG9hZGVkIDogc2VsZWN0ZWQpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVGFiUGFuZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBjbG9zYWJsZTogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBoZWFkZXJTdHlsZTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIGhlYWRlclN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBsZWZ0SWNvbjogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHJpZ2h0SWNvbjogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGNhY2hlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHRvb2x0aXA6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSB0b29sdGlwUG9zaXRpb246IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgQElucHV0KCkgdG9vbHRpcFBvc2l0aW9uU3R5bGU6IHN0cmluZyA9ICdhYnNvbHV0ZSc7XG5cbiAgICBASW5wdXQoKSB0b29sdGlwU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cbiAgICBcbiAgICBjbG9zZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgdmlldzogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gICAgXG4gICAgX3NlbGVjdGVkOiBib29sZWFuO1xuICAgIFxuICAgIGxvYWRlZDogYm9vbGVhbjtcbiAgICBcbiAgICBpZDogc3RyaW5nID0gYHVpLXRhYnBhbmVsLSR7aWR4Kyt9YDtcbiAgICBcbiAgICBjb250ZW50VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBASW5wdXQoKSBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0ZWQodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsO1xuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnZpZXcgPSBudWxsO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRhYlZpZXcnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3VpLXRhYnZpZXcgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwgdWktdGFidmlldy0nICsgb3JpZW50YXRpb25cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8dWwgcC10YWJWaWV3TmF2IHJvbGU9XCJ0YWJsaXN0XCIgKm5nSWY9XCJvcmllbnRhdGlvbiE9J2JvdHRvbSdcIiBbdGFic109XCJ0YWJzXCIgW29yaWVudGF0aW9uXT1cIm9yaWVudGF0aW9uXCJcbiAgICAgICAgICAgICAgICAob25UYWJDbGljayk9XCJvcGVuKCRldmVudC5vcmlnaW5hbEV2ZW50LCAkZXZlbnQudGFiKVwiIChvblRhYkNsb3NlQ2xpY2spPVwiY2xvc2UoJGV2ZW50Lm9yaWdpbmFsRXZlbnQsICRldmVudC50YWIpXCI+PC91bD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10YWJ2aWV3LXBhbmVsc1wiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHVsIHAtdGFiVmlld05hdiByb2xlPVwidGFibGlzdFwiICpuZ0lmPVwib3JpZW50YXRpb249PSdib3R0b20nXCIgW3RhYnNdPVwidGFic1wiIFtvcmllbnRhdGlvbl09XCJvcmllbnRhdGlvblwiXG4gICAgICAgICAgICAgICAgKG9uVGFiQ2xpY2spPVwib3BlbigkZXZlbnQub3JpZ2luYWxFdmVudCwgJGV2ZW50LnRhYilcIiAob25UYWJDbG9zZUNsaWNrKT1cImNsb3NlKCRldmVudC5vcmlnaW5hbEV2ZW50LCAkZXZlbnQudGFiKVwiPjwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIFRhYlZpZXcgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LEJsb2NrYWJsZVVJIHtcblxuICAgIEBJbnB1dCgpIG9yaWVudGF0aW9uOiBzdHJpbmcgPSAndG9wJztcbiAgICBcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBjb250cm9sQ2xvc2U6IGJvb2xlYW47XG4gICAgXG4gICAgQENvbnRlbnRDaGlsZHJlbihUYWJQYW5lbCkgdGFiUGFuZWxzOiBRdWVyeUxpc3Q8VGFiUGFuZWw+O1xuXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBhY3RpdmVJbmRleENoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgdGFiczogVGFiUGFuZWxbXTtcbiAgICBcbiAgICBfYWN0aXZlSW5kZXg6IG51bWJlcjtcbiAgICBcbiAgICBwcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbjogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cbiAgICAgIFxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0VGFicygpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy50YWJQYW5lbHMuY2hhbmdlcy5zdWJzY3JpYmUoXyA9PiB7XG4gICAgICAgICAgICB0aGlzLmluaXRUYWJzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBpbml0VGFicygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWJzID0gdGhpcy50YWJQYW5lbHMudG9BcnJheSgpO1xuICAgICAgICBsZXQgc2VsZWN0ZWRUYWI6IFRhYlBhbmVsID0gdGhpcy5maW5kU2VsZWN0ZWRUYWIoKTtcbiAgICAgICAgaWYgKCFzZWxlY3RlZFRhYiAmJiB0aGlzLnRhYnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVJbmRleCAhPSBudWxsICYmIHRoaXMudGFicy5sZW5ndGggPiB0aGlzLmFjdGl2ZUluZGV4KVxuICAgICAgICAgICAgICAgIHRoaXMudGFic1t0aGlzLmFjdGl2ZUluZGV4XS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy50YWJzWzBdLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvcGVuKGV2ZW50OiBFdmVudCwgdGFiOiBUYWJQYW5lbCkge1xuICAgICAgICBpZiAodGFiLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRhYi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkVGFiOiBUYWJQYW5lbCA9IHRoaXMuZmluZFNlbGVjdGVkVGFiKCk7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRUYWIpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRhYi5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRUYWJJbmRleCA9IHRoaXMuZmluZFRhYkluZGV4KHRhYik7XG4gICAgICAgICAgICB0aGlzLnByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXhDaGFuZ2UuZW1pdChzZWxlY3RlZFRhYkluZGV4KTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGluZGV4OiBzZWxlY3RlZFRhYkluZGV4fSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjbG9zZShldmVudDogRXZlbnQsIHRhYjogVGFiUGFuZWwpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udHJvbENsb3NlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuZmluZFRhYkluZGV4KHRhYiksXG4gICAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVRhYih0YWIpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVRhYih0YWIpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmZpbmRUYWJJbmRleCh0YWIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIFxuICAgIGNsb3NlVGFiKHRhYjogVGFiUGFuZWwpIHtcbiAgICAgICAgaWYgKHRhYi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YWIuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCB0YWJQYW5lbCA9IHRoaXMudGFic1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRhYlBhbmVsLmNsb3NlZCYmIXRhYi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0YWJQYW5lbC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGFiLmNsb3NlZCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIGZpbmRTZWxlY3RlZFRhYigpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFic1tpXS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIFxuICAgIGZpbmRUYWJJbmRleCh0YWI6IFRhYlBhbmVsKSB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWJzW2ldID09IHRhYikge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICAgIFxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnTCoHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICB9XG4gICAgXG4gICAgQElucHV0KCkgZ2V0IGFjdGl2ZUluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVJbmRleDtcbiAgICB9XG5cbiAgICBzZXQgYWN0aXZlSW5kZXgodmFsOm51bWJlcikge1xuICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IHZhbDtcbiAgICAgICAgaWYgKHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRhYnMgJiYgdGhpcy50YWJzLmxlbmd0aCAmJiB0aGlzLl9hY3RpdmVJbmRleCAhPSBudWxsICYmIHRoaXMudGFicy5sZW5ndGggPiB0aGlzLl9hY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5maW5kU2VsZWN0ZWRUYWIoKS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50YWJzW3RoaXMuX2FjdGl2ZUluZGV4XS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLFNoYXJlZE1vZHVsZSxUb29sdGlwTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbVGFiVmlldyxUYWJQYW5lbCxUYWJWaWV3TmF2LFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbVGFiVmlldyxUYWJQYW5lbCxUYWJWaWV3TmF2XVxufSlcbmV4cG9ydCBjbGFzcyBUYWJWaWV3TW9kdWxlIHsgfVxuIl19