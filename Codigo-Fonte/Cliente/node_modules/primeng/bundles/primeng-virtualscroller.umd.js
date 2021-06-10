(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('@angular/cdk/scrolling')) :
    typeof define === 'function' && define.amd ? define('primeng/virtualscroller', ['exports', '@angular/core', '@angular/common', 'primeng/api', '@angular/cdk/scrolling'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.virtualscroller = {}), global.ng.core, global.ng.common, global.primeng.api, global.ng.cdk.scrolling));
}(this, (function (exports, core, common, api, scrolling) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __read = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    var VirtualScroller = /** @class */ (function () {
        function VirtualScroller(el) {
            this.el = el;
            this.cache = true;
            this.first = 0;
            this.trackBy = function (index, item) { return item; };
            this.onLazyLoad = new core.EventEmitter();
            this._totalRecords = 0;
            this.lazyValue = [];
            this.page = 0;
        }
        Object.defineProperty(VirtualScroller.prototype, "totalRecords", {
            get: function () {
                return this._totalRecords;
            },
            set: function (val) {
                this._totalRecords = val;
                this.lazyValue = Array.from({ length: this._totalRecords });
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
                this.first = 0;
                this.scrollTo(0);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VirtualScroller.prototype, "value", {
            get: function () {
                return this.lazy ? this.lazyValue : this._value;
            },
            set: function (val) {
                if (this.lazy) {
                    if (val) {
                        var arr = this.cache ? __spread(this.lazyValue) : Array.from({ length: this._totalRecords });
                        for (var i = this.first, j = 0; i < (this.first + this.rows); i++, j++) {
                            arr[i] = val[j];
                        }
                        this.lazyValue = arr;
                    }
                }
                else {
                    this._value = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        VirtualScroller.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    case 'loadingItem':
                        _this.loadingItemTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        VirtualScroller.prototype.onScrollIndexChange = function (index) {
            var p = Math.floor(index / this.rows);
            if (p !== this.page) {
                this.page = p;
                this.first = this.page * this.rows;
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
        };
        VirtualScroller.prototype.createLazyLoadMetadata = function () {
            return {
                first: this.first,
                rows: this.rows
            };
        };
        VirtualScroller.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        VirtualScroller.prototype.scrollTo = function (index) {
            if (this.viewPortViewChild && this.viewPortViewChild['elementRef'] && this.viewPortViewChild['elementRef'].nativeElement) {
                this.viewPortViewChild['elementRef'].nativeElement.scrollTop = index * this.itemSize;
            }
        };
        VirtualScroller.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "itemSize", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "scrollHeight", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "lazy", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "cache", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "rows", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "first", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "trackBy", void 0);
        __decorate([
            core.ContentChild(api.Header, { static: true })
        ], VirtualScroller.prototype, "header", void 0);
        __decorate([
            core.ContentChild(api.Footer, { static: true })
        ], VirtualScroller.prototype, "footer", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], VirtualScroller.prototype, "templates", void 0);
        __decorate([
            core.ViewChild('viewport', { static: true })
        ], VirtualScroller.prototype, "viewPortViewChild", void 0);
        __decorate([
            core.Output()
        ], VirtualScroller.prototype, "onLazyLoad", void 0);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "totalRecords", null);
        __decorate([
            core.Input()
        ], VirtualScroller.prototype, "value", null);
        VirtualScroller = __decorate([
            core.Component({
                selector: 'p-virtualScroller',
                template: "\n        <div [ngClass]=\"'ui-virtualscroller ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-virtualscroller-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <div #content class=\"ui-virtualscroller-content ui-widget-content\">\n                <ul class=\"ui-virtualscroller-list\">\n                    <cdk-virtual-scroll-viewport #viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" (scrolledIndexChange)=\"onScrollIndexChange($event)\">\n                        <ng-container *cdkVirtualFor=\"let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd; \">\n                            <li [ngStyle]=\"{'height': itemSize + 'px'}\">\n                                <ng-container *ngTemplateOutlet=\"item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}\"></ng-container>\n                            </li>\n                        </ng-container>\n                    </cdk-virtual-scroll-viewport>\n                </ul>\n            </div>\n            <div class=\"ui-virtualscroller-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    "
            })
        ], VirtualScroller);
        return VirtualScroller;
    }());
    var VirtualScrollerModule = /** @class */ (function () {
        function VirtualScrollerModule() {
        }
        VirtualScrollerModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, scrolling.ScrollingModule],
                exports: [VirtualScroller, api.SharedModule, scrolling.ScrollingModule],
                declarations: [VirtualScroller]
            })
        ], VirtualScrollerModule);
        return VirtualScrollerModule;
    }());

    exports.VirtualScroller = VirtualScroller;
    exports.VirtualScrollerModule = VirtualScrollerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-virtualscroller.umd.js.map
