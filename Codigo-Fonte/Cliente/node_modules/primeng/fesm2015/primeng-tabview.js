import { EventEmitter, Input, Output, Component, ViewContainerRef, ChangeDetectorRef, ContentChildren, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { PrimeTemplate, SharedModule } from 'primeng/api';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let TabViewModule = class TabViewModule {
};
TabViewModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule, TooltipModule],
        exports: [TabView, TabPanel, TabViewNav, SharedModule],
        declarations: [TabView, TabPanel, TabViewNav]
    })
], TabViewModule);

/**
 * Generated bundle index. Do not edit.
 */

export { TabPanel, TabView, TabViewModule, TabViewNav };
//# sourceMappingURL=primeng-tabview.js.map
