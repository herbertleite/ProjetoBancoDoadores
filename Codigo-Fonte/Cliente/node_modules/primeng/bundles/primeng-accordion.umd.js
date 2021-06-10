(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/accordion', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/api'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.accordion = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.api));
}(this, (function (exports, core, animations, common, api) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var idx = 0;
    var AccordionTab = /** @class */ (function () {
        function AccordionTab(accordion, changeDetector) {
            this.changeDetector = changeDetector;
            this.cache = true;
            this.selectedChange = new core.EventEmitter();
            this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
            this.id = "ui-accordiontab-" + idx++;
            this.accordion = accordion;
        }
        Object.defineProperty(AccordionTab.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (val) {
                this._selected = val;
                if (!this.loaded) {
                    this.changeDetector.detectChanges();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AccordionTab.prototype, "animating", {
            get: function () {
                return this._animating;
            },
            set: function (val) {
                this._animating = val;
                if (!this.changeDetector.destroyed) {
                    this.changeDetector.detectChanges();
                }
            },
            enumerable: true,
            configurable: true
        });
        AccordionTab.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'content':
                        _this.contentTemplate = item.template;
                        break;
                    default:
                        _this.contentTemplate = item.template;
                        break;
                }
            });
        };
        AccordionTab.prototype.toggle = function (event) {
            if (this.disabled || this.animating) {
                return false;
            }
            this.animating = true;
            var index = this.findTabIndex();
            if (this.selected) {
                this.selected = false;
                this.accordion.onClose.emit({ originalEvent: event, index: index });
            }
            else {
                if (!this.accordion.multiple) {
                    for (var i = 0; i < this.accordion.tabs.length; i++) {
                        this.accordion.tabs[i].selected = false;
                        this.accordion.tabs[i].selectedChange.emit(false);
                    }
                }
                this.selected = true;
                this.loaded = true;
                this.accordion.onOpen.emit({ originalEvent: event, index: index });
            }
            this.selectedChange.emit(this.selected);
            event.preventDefault();
        };
        AccordionTab.prototype.findTabIndex = function () {
            var index = -1;
            for (var i = 0; i < this.accordion.tabs.length; i++) {
                if (this.accordion.tabs[i] == this) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        Object.defineProperty(AccordionTab.prototype, "hasHeaderFacet", {
            get: function () {
                return this.headerFacet && this.headerFacet.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        AccordionTab.prototype.onToggleDone = function (event) {
            this.animating = false;
        };
        AccordionTab.prototype.onKeydown = function (event) {
            if (event.which === 32 || event.which === 13) {
                this.toggle(event);
                event.preventDefault();
            }
        };
        AccordionTab.prototype.ngOnDestroy = function () {
            this.accordion.tabs.splice(this.findTabIndex(), 1);
        };
        AccordionTab.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return Accordion; }),] }] },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], AccordionTab.prototype, "header", void 0);
        __decorate([
            core.Input()
        ], AccordionTab.prototype, "disabled", void 0);
        __decorate([
            core.Input()
        ], AccordionTab.prototype, "cache", void 0);
        __decorate([
            core.Output()
        ], AccordionTab.prototype, "selectedChange", void 0);
        __decorate([
            core.Input()
        ], AccordionTab.prototype, "transitionOptions", void 0);
        __decorate([
            core.ContentChildren(api.Header)
        ], AccordionTab.prototype, "headerFacet", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], AccordionTab.prototype, "templates", void 0);
        __decorate([
            core.Input()
        ], AccordionTab.prototype, "selected", null);
        AccordionTab = __decorate([
            core.Component({
                selector: 'p-accordionTab',
                template: "\n        <div class=\"ui-accordion-header ui-state-default ui-corner-all\" [ngClass]=\"{'ui-state-active': selected,'ui-state-disabled':disabled}\">\n            <a [attr.tabindex]=\"disabled ? -1 : 0\" [attr.id]=\"id\" [attr.aria-controls]=\"id + '-content'\" role=\"tab\" [attr.aria-expanded]=\"selected\" (click)=\"toggle($event)\" \n                (keydown)=\"onKeydown($event)\">\n                <span class=\"ui-accordion-toggle-icon\" [ngClass]=\"selected ? accordion.collapseIcon : accordion.expandIcon\"></span>\n                <span class=\"ui-accordion-header-text\" *ngIf=\"!hasHeaderFacet\">\n                    {{header}}\n                </span>\n                <ng-content select=\"p-header\" *ngIf=\"hasHeaderFacet\"></ng-content>\n            </a>\n        </div>\n        <div [attr.id]=\"id + '-content'\" class=\"ui-accordion-content-wrapper\" [@tabContent]=\"selected ? {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}\" (@tabContent.done)=\"onToggleDone($event)\"\n            [ngClass]=\"{'ui-accordion-content-wrapper-overflown': !selected||animating}\" \n            role=\"region\" [attr.aria-hidden]=\"!selected\" [attr.aria-labelledby]=\"id\">\n            <div class=\"ui-accordion-content ui-widget-content\">\n                <ng-content></ng-content>\n                <ng-container *ngIf=\"contentTemplate && (cache ? loaded : selected)\">\n                    <ng-container *ngTemplateOutlet=\"contentTemplate\"></ng-container>\n                </ng-container>\n            </div>\n        </div>\n    ",
                animations: [
                    animations.trigger('tabContent', [
                        animations.state('hidden', animations.style({
                            height: '0'
                        })),
                        animations.state('void', animations.style({
                            height: '{{height}}'
                        }), { params: { height: '0' } }),
                        animations.state('visible', animations.style({
                            height: '*'
                        })),
                        animations.transition('visible <=> hidden', animations.animate('{{transitionParams}}')),
                        animations.transition('void => hidden', animations.animate('{{transitionParams}}')),
                        animations.transition('void => visible', animations.animate('{{transitionParams}}'))
                    ])
                ]
            }),
            __param(0, core.Inject(core.forwardRef(function () { return Accordion; })))
        ], AccordionTab);
        return AccordionTab;
    }());
    var Accordion = /** @class */ (function () {
        function Accordion(el, changeDetector) {
            this.el = el;
            this.changeDetector = changeDetector;
            this.onClose = new core.EventEmitter();
            this.onOpen = new core.EventEmitter();
            this.expandIcon = 'pi pi-fw pi-chevron-right';
            this.collapseIcon = 'pi pi-fw pi-chevron-down';
            this.tabs = [];
        }
        Accordion.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.initTabs();
            this.tabListSubscription = this.tabList.changes.subscribe(function (_) {
                _this.initTabs();
                _this.changeDetector.markForCheck();
            });
        };
        Accordion.prototype.initTabs = function () {
            this.tabs = this.tabList.toArray();
            this.updateSelectionState();
        };
        Accordion.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Object.defineProperty(Accordion.prototype, "activeIndex", {
            get: function () {
                return this._activeIndex;
            },
            set: function (val) {
                this._activeIndex = val;
                this.updateSelectionState();
            },
            enumerable: true,
            configurable: true
        });
        Accordion.prototype.updateSelectionState = function () {
            if (this.tabs && this.tabs.length && this._activeIndex != null) {
                for (var i = 0; i < this.tabs.length; i++) {
                    var selected = this.multiple ? this._activeIndex.includes(i) : (i === this._activeIndex);
                    var changed = selected !== this.tabs[i].selected;
                    if (changed) {
                        this.tabs[i].animating = true;
                        this.tabs[i].selected = selected;
                        this.tabs[i].selectedChange.emit(selected);
                    }
                }
            }
        };
        Accordion.prototype.ngOnDestroy = function () {
            if (this.tabListSubscription) {
                this.tabListSubscription.unsubscribe();
            }
        };
        Accordion.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], Accordion.prototype, "multiple", void 0);
        __decorate([
            core.Output()
        ], Accordion.prototype, "onClose", void 0);
        __decorate([
            core.Output()
        ], Accordion.prototype, "onOpen", void 0);
        __decorate([
            core.Input()
        ], Accordion.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], Accordion.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], Accordion.prototype, "expandIcon", void 0);
        __decorate([
            core.Input()
        ], Accordion.prototype, "collapseIcon", void 0);
        __decorate([
            core.ContentChildren(AccordionTab)
        ], Accordion.prototype, "tabList", void 0);
        __decorate([
            core.Input()
        ], Accordion.prototype, "activeIndex", null);
        Accordion = __decorate([
            core.Component({
                selector: 'p-accordion',
                template: "\n        <div [ngClass]=\"'ui-accordion ui-widget ui-helper-reset'\" [ngStyle]=\"style\" [class]=\"styleClass\" role=\"tablist\">\n            <ng-content></ng-content>\n        </div>\n    "
            })
        ], Accordion);
        return Accordion;
    }());
    var AccordionModule = /** @class */ (function () {
        function AccordionModule() {
        }
        AccordionModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [Accordion, AccordionTab, api.SharedModule],
                declarations: [Accordion, AccordionTab]
            })
        ], AccordionModule);
        return AccordionModule;
    }());

    exports.Accordion = Accordion;
    exports.AccordionModule = AccordionModule;
    exports.AccordionTab = AccordionTab;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-accordion.umd.js.map
