(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/tooltip'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/tabview', ['exports', '@angular/core', '@angular/common', 'primeng/tooltip', 'primeng/api'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.tabview = {}), global.ng.core, global.ng.common, global.primeng.tooltip, global.primeng.api));
}(this, (function (exports, core, common, tooltip, api) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var idx = 0;
    var TabViewNav = /** @class */ (function () {
        function TabViewNav() {
            this.orientation = 'top';
            this.onTabClick = new core.EventEmitter();
            this.onTabCloseClick = new core.EventEmitter();
        }
        TabViewNav.prototype.getDefaultHeaderClass = function (tab) {
            var styleClass = 'ui-state-default ui-corner-' + this.orientation;
            if (tab.headerStyleClass) {
                styleClass = styleClass + " " + tab.headerStyleClass;
            }
            return styleClass;
        };
        TabViewNav.prototype.clickTab = function (event, tab) {
            this.onTabClick.emit({
                originalEvent: event,
                tab: tab
            });
        };
        TabViewNav.prototype.clickClose = function (event, tab) {
            this.onTabCloseClick.emit({
                originalEvent: event,
                tab: tab
            });
        };
        __decorate([
            core.Input()
        ], TabViewNav.prototype, "tabs", void 0);
        __decorate([
            core.Input()
        ], TabViewNav.prototype, "orientation", void 0);
        __decorate([
            core.Output()
        ], TabViewNav.prototype, "onTabClick", void 0);
        __decorate([
            core.Output()
        ], TabViewNav.prototype, "onTabCloseClick", void 0);
        TabViewNav = __decorate([
            core.Component({
                selector: '[p-tabViewNav]',
                host: {
                    '[class.ui-tabview-nav]': 'true',
                    '[class.ui-helper-reset]': 'true',
                    '[class.ui-helper-clearfix]': 'true',
                    '[class.ui-widget-header]': 'true',
                    '[class.ui-corner-all]': 'true'
                },
                template: "\n        <ng-template ngFor let-tab [ngForOf]=\"tabs\">\n            <li [class]=\"getDefaultHeaderClass(tab)\" [ngStyle]=\"tab.headerStyle\" role=\"presentation\"\n                [ngClass]=\"{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-disabled': tab.disabled}\"\n                (click)=\"clickTab($event,tab)\" *ngIf=\"!tab.closed\" tabindex=\"0\" (keydown.enter)=\"clickTab($event,tab)\">\n                <a [attr.id]=\"tab.id + '-label'\" role=\"tab\" [attr.aria-selected]=\"tab.selected\" [attr.aria-controls]=\"tab.id\" [pTooltip]=\"tab.tooltip\" [tooltipPosition]=\"tab.tooltipPosition\"\n                    [attr.aria-selected]=\"tab.selected\" [positionStyle]=\"tab.tooltipPositionStyle\" [tooltipStyleClass]=\"tab.tooltipStyleClass\">\n                    <ng-container *ngIf=\"!tab.headerTemplate\" >\n                        <span class=\"ui-tabview-left-icon\" [ngClass]=\"tab.leftIcon\" *ngIf=\"tab.leftIcon\"></span>\n                        <span class=\"ui-tabview-title\">{{tab.header}}</span>\n                        <span class=\"ui-tabview-right-icon\" [ngClass]=\"tab.rightIcon\" *ngIf=\"tab.rightIcon\"></span>\n                    </ng-container>\n                    <ng-container *ngIf=\"tab.headerTemplate\">\n                        <ng-container *ngTemplateOutlet=\"tab.headerTemplate\"></ng-container>\n                    </ng-container>\n                </a>\n                <span *ngIf=\"tab.closable\" class=\"ui-tabview-close pi pi-times\" (click)=\"clickClose($event,tab)\"></span>\n            </li>\n        </ng-template>\n    "
            })
        ], TabViewNav);
        return TabViewNav;
    }());
    var TabPanel = /** @class */ (function () {
        function TabPanel(viewContainer, cd) {
            this.viewContainer = viewContainer;
            this.cd = cd;
            this.cache = true;
            this.tooltipPosition = 'top';
            this.tooltipPositionStyle = 'absolute';
            this.id = "ui-tabpanel-" + idx++;
        }
        TabPanel.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    default:
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        Object.defineProperty(TabPanel.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (!this.loaded) {
                    this.cd.detectChanges();
                }
                this.loaded = true;
            },
            enumerable: true,
            configurable: true
        });
        TabPanel.prototype.ngOnDestroy = function () {
            this.view = null;
        };
        TabPanel.ctorParameters = function () { return [
            { type: core.ViewContainerRef },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], TabPanel.prototype, "header", void 0);
        __decorate([
            core.Input()
        ], TabPanel.prototype, "disabled", void 0);
        __decorate([
            core.Input()
        ], TabPanel.prototype, "closable", void 0);
        __decorate([
            core.Input()
        ], TabPanel.prototype, "headerStyle", void 0);
        __decorate([
            core.Input()
        ], TabPanel.prototype, "headerStyleClass", void 0);
        __decorate([
            core.Input()
        ], TabPanel.prototype, "leftIcon", void 0);
        __decorate([
            core.Input()
        ], TabPanel.prototype, "rightIcon", void 0);
        __decorate([
            core.Input()
        ], TabPanel.prototype, "cache", void 0);
        __decorate([
            core.Input()
        ], TabPanel.prototype, "tooltip", void 0);
        __decorate([
            core.Input()
        ], TabPanel.prototype, "tooltipPosition", void 0);
        __decorate([
            core.Input()
        ], TabPanel.prototype, "tooltipPositionStyle", void 0);
        __decorate([
            core.Input()
        ], TabPanel.prototype, "tooltipStyleClass", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], TabPanel.prototype, "templates", void 0);
        __decorate([
            core.Input()
        ], TabPanel.prototype, "selected", null);
        TabPanel = __decorate([
            core.Component({
                selector: 'p-tabPanel',
                template: "\n        <div [attr.id]=\"id\" class=\"ui-tabview-panel ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': !selected}\"\n            role=\"tabpanel\" [attr.aria-hidden]=\"!selected\" [attr.aria-labelledby]=\"id + '-label'\" *ngIf=\"!closed\">\n            <ng-content></ng-content>\n            <ng-container *ngIf=\"contentTemplate && (cache ? loaded : selected)\">\n                <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n            </ng-container>\n        </div>\n    "
            })
        ], TabPanel);
        return TabPanel;
    }());
    var TabView = /** @class */ (function () {
        function TabView(el) {
            this.el = el;
            this.orientation = 'top';
            this.onChange = new core.EventEmitter();
            this.onClose = new core.EventEmitter();
            this.activeIndexChange = new core.EventEmitter();
        }
        TabView.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.initTabs();
            this.tabPanels.changes.subscribe(function (_) {
                _this.initTabs();
            });
        };
        TabView.prototype.initTabs = function () {
            this.tabs = this.tabPanels.toArray();
            var selectedTab = this.findSelectedTab();
            if (!selectedTab && this.tabs.length) {
                if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                    this.tabs[this.activeIndex].selected = true;
                else
                    this.tabs[0].selected = true;
            }
        };
        TabView.prototype.open = function (event, tab) {
            if (tab.disabled) {
                if (event) {
                    event.preventDefault();
                }
                return;
            }
            if (!tab.selected) {
                var selectedTab = this.findSelectedTab();
                if (selectedTab) {
                    selectedTab.selected = false;
                }
                tab.selected = true;
                var selectedTabIndex = this.findTabIndex(tab);
                this.preventActiveIndexPropagation = true;
                this.activeIndexChange.emit(selectedTabIndex);
                this.onChange.emit({ originalEvent: event, index: selectedTabIndex });
            }
            if (event) {
                event.preventDefault();
            }
        };
        TabView.prototype.close = function (event, tab) {
            var _this = this;
            if (this.controlClose) {
                this.onClose.emit({
                    originalEvent: event,
                    index: this.findTabIndex(tab),
                    close: function () {
                        _this.closeTab(tab);
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
        };
        TabView.prototype.closeTab = function (tab) {
            if (tab.disabled) {
                return;
            }
            if (tab.selected) {
                tab.selected = false;
                for (var i = 0; i < this.tabs.length; i++) {
                    var tabPanel = this.tabs[i];
                    if (!tabPanel.closed && !tab.disabled) {
                        tabPanel.selected = true;
                        break;
                    }
                }
            }
            tab.closed = true;
        };
        TabView.prototype.findSelectedTab = function () {
            for (var i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].selected) {
                    return this.tabs[i];
                }
            }
            return null;
        };
        TabView.prototype.findTabIndex = function (tab) {
            var index = -1;
            for (var i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i] == tab) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        TabView.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Object.defineProperty(TabView.prototype, "activeIndex", {
            get: function () {
                return this._activeIndex;
            },
            set: function (val) {
                this._activeIndex = val;
                if (this.preventActiveIndexPropagation) {
                    this.preventActiveIndexPropagation = false;
                    return;
                }
                if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
                    this.findSelectedTab().selected = false;
                    this.tabs[this._activeIndex].selected = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        TabView.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], TabView.prototype, "orientation", void 0);
        __decorate([
            core.Input()
        ], TabView.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], TabView.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], TabView.prototype, "controlClose", void 0);
        __decorate([
            core.ContentChildren(TabPanel)
        ], TabView.prototype, "tabPanels", void 0);
        __decorate([
            core.Output()
        ], TabView.prototype, "onChange", void 0);
        __decorate([
            core.Output()
        ], TabView.prototype, "onClose", void 0);
        __decorate([
            core.Output()
        ], TabView.prototype, "activeIndexChange", void 0);
        __decorate([
            core.Input()
        ], TabView.prototype, "activeIndex", null);
        TabView = __decorate([
            core.Component({
                selector: 'p-tabView',
                template: "\n        <div [ngClass]=\"'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul p-tabViewNav role=\"tablist\" *ngIf=\"orientation!='bottom'\" [tabs]=\"tabs\" [orientation]=\"orientation\"\n                (onTabClick)=\"open($event.originalEvent, $event.tab)\" (onTabCloseClick)=\"close($event.originalEvent, $event.tab)\"></ul>\n            <div class=\"ui-tabview-panels\">\n                <ng-content></ng-content>\n            </div>\n            <ul p-tabViewNav role=\"tablist\" *ngIf=\"orientation=='bottom'\" [tabs]=\"tabs\" [orientation]=\"orientation\"\n                (onTabClick)=\"open($event.originalEvent, $event.tab)\" (onTabCloseClick)=\"close($event.originalEvent, $event.tab)\"></ul>\n        </div>\n    "
            })
        ], TabView);
        return TabView;
    }());
    var TabViewModule = /** @class */ (function () {
        function TabViewModule() {
        }
        TabViewModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, api.SharedModule, tooltip.TooltipModule],
                exports: [TabView, TabPanel, TabViewNav, api.SharedModule],
                declarations: [TabView, TabPanel, TabViewNav]
            })
        ], TabViewModule);
        return TabViewModule;
    }());

    exports.TabPanel = TabPanel;
    exports.TabView = TabView;
    exports.TabViewModule = TabViewModule;
    exports.TabViewNav = TabViewNav;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tabview.umd.js.map
