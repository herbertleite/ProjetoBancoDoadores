(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('primeng/dropdown'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/paginator', ['exports', '@angular/core', '@angular/common', '@angular/forms', 'primeng/dropdown', 'primeng/api'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.paginator = {}), global.ng.core, global.ng.common, global.ng.forms, global.primeng.dropdown, global.primeng.api));
}(this, (function (exports, core, common, forms, dropdown, api) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __values = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var Paginator = /** @class */ (function () {
        function Paginator(cd) {
            this.cd = cd;
            this.pageLinkSize = 5;
            this.onPageChange = new core.EventEmitter();
            this.alwaysShow = true;
            this.dropdownScrollHeight = '200px';
            this.currentPageReportTemplate = '{currentPage} of {totalPages}';
            this.totalRecords = 0;
            this.rows = 0;
            this._first = 0;
        }
        Paginator.prototype.ngOnInit = function () {
            this.updatePaginatorState();
        };
        Paginator.prototype.ngOnChanges = function (simpleChange) {
            if (simpleChange.totalRecords) {
                this.updatePageLinks();
                this.updatePaginatorState();
                this.updateFirst();
                this.updateRowsPerPageOptions();
            }
            if (simpleChange.first) {
                this._first = simpleChange.first.currentValue;
                this.updatePageLinks();
                this.updatePaginatorState();
            }
            if (simpleChange.rows) {
                this.updatePageLinks();
                this.updatePaginatorState();
            }
            if (simpleChange.rowsPerPageOptions) {
                this.updateRowsPerPageOptions();
            }
        };
        Object.defineProperty(Paginator.prototype, "first", {
            get: function () {
                return this._first;
            },
            set: function (val) {
                this._first = val;
            },
            enumerable: true,
            configurable: true
        });
        Paginator.prototype.updateRowsPerPageOptions = function () {
            var e_1, _a;
            if (this.rowsPerPageOptions) {
                this.rowsPerPageItems = [];
                try {
                    for (var _b = __values(this.rowsPerPageOptions), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var opt = _c.value;
                        if (typeof opt == 'object' && opt['showAll']) {
                            this.rowsPerPageItems.push({ label: opt['showAll'], value: this.totalRecords });
                        }
                        else {
                            this.rowsPerPageItems.push({ label: String(opt), value: opt });
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        Paginator.prototype.isFirstPage = function () {
            return this.getPage() === 0;
        };
        Paginator.prototype.isLastPage = function () {
            return this.getPage() === this.getPageCount() - 1;
        };
        Paginator.prototype.getPageCount = function () {
            return Math.ceil(this.totalRecords / this.rows) || 1;
        };
        Paginator.prototype.calculatePageLinkBoundaries = function () {
            var numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
            //calculate range, keep current in middle if necessary
            var start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
            //check when approaching to last page
            var delta = this.pageLinkSize - (end - start + 1);
            start = Math.max(0, start - delta);
            return [start, end];
        };
        Paginator.prototype.updatePageLinks = function () {
            this.pageLinks = [];
            var boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
            for (var i = start; i <= end; i++) {
                this.pageLinks.push(i + 1);
            }
        };
        Paginator.prototype.changePage = function (p) {
            var pc = this.getPageCount();
            if (p >= 0 && p < pc) {
                this._first = this.rows * p;
                var state = {
                    page: p,
                    first: this.first,
                    rows: this.rows,
                    pageCount: pc
                };
                this.updatePageLinks();
                this.onPageChange.emit(state);
                this.updatePaginatorState();
            }
        };
        Paginator.prototype.updateFirst = function () {
            var _this = this;
            var page = this.getPage();
            if (page > 0 && this.totalRecords && (this.first >= this.totalRecords)) {
                Promise.resolve(null).then(function () { return _this.changePage(page - 1); });
            }
        };
        Paginator.prototype.getPage = function () {
            return Math.floor(this.first / this.rows);
        };
        Paginator.prototype.changePageToFirst = function (event) {
            if (!this.isFirstPage()) {
                this.changePage(0);
            }
            event.preventDefault();
        };
        Paginator.prototype.changePageToPrev = function (event) {
            this.changePage(this.getPage() - 1);
            event.preventDefault();
        };
        Paginator.prototype.changePageToNext = function (event) {
            this.changePage(this.getPage() + 1);
            event.preventDefault();
        };
        Paginator.prototype.changePageToLast = function (event) {
            if (!this.isLastPage()) {
                this.changePage(this.getPageCount() - 1);
            }
            event.preventDefault();
        };
        Paginator.prototype.onPageLinkClick = function (event, page) {
            this.changePage(page);
            event.preventDefault();
        };
        Paginator.prototype.onRppChange = function (event) {
            this.changePage(this.getPage());
        };
        Paginator.prototype.updatePaginatorState = function () {
            this.paginatorState = {
                page: this.getPage(),
                pageCount: this.getPageCount(),
                rows: this.rows,
                first: this.first,
                totalRecords: this.totalRecords
            };
        };
        Object.defineProperty(Paginator.prototype, "currentPageReport", {
            get: function () {
                return this.currentPageReportTemplate
                    .replace("{currentPage}", (this.getPage() + 1).toString())
                    .replace("{totalPages}", this.getPageCount().toString());
            },
            enumerable: true,
            configurable: true
        });
        Paginator.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], Paginator.prototype, "pageLinkSize", void 0);
        __decorate([
            core.Output()
        ], Paginator.prototype, "onPageChange", void 0);
        __decorate([
            core.Input()
        ], Paginator.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], Paginator.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], Paginator.prototype, "alwaysShow", void 0);
        __decorate([
            core.Input()
        ], Paginator.prototype, "templateLeft", void 0);
        __decorate([
            core.Input()
        ], Paginator.prototype, "templateRight", void 0);
        __decorate([
            core.Input()
        ], Paginator.prototype, "dropdownAppendTo", void 0);
        __decorate([
            core.Input()
        ], Paginator.prototype, "dropdownScrollHeight", void 0);
        __decorate([
            core.Input()
        ], Paginator.prototype, "currentPageReportTemplate", void 0);
        __decorate([
            core.Input()
        ], Paginator.prototype, "showCurrentPageReport", void 0);
        __decorate([
            core.Input()
        ], Paginator.prototype, "totalRecords", void 0);
        __decorate([
            core.Input()
        ], Paginator.prototype, "rows", void 0);
        __decorate([
            core.Input()
        ], Paginator.prototype, "rowsPerPageOptions", void 0);
        __decorate([
            core.Input()
        ], Paginator.prototype, "first", null);
        Paginator = __decorate([
            core.Component({
                selector: 'p-paginator',
                template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'ui-paginator ui-widget ui-widget-header ui-unselectable-text ui-helper-clearfix'\"\n            *ngIf=\"alwaysShow ? true : (pageLinks && pageLinks.length > 1)\">\n            <div class=\"ui-paginator-left-content\" *ngIf=\"templateLeft\">\n                <ng-container *ngTemplateOutlet=\"templateLeft; context: {$implicit: paginatorState}\"></ng-container>\n            </div>\n            <span class=\"ui-paginator-current\" *ngIf=\"showCurrentPageReport\">{{currentPageReport}}</span>\n            <a [attr.tabindex]=\"isFirstPage() ? null : '0'\" class=\"ui-paginator-first ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToFirst($event)\" (keydown.enter)=\"changePageToFirst($event)\" [ngClass]=\"{'ui-state-disabled':isFirstPage()}\" [tabindex]=\"isFirstPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-step-backward\"></span>\n            </a>\n            <a tabindex=\"0\" [attr.tabindex]=\"isFirstPage() ? null : '0'\" class=\"ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToPrev($event)\" (keydown.enter)=\"changePageToPrev($event)\" [ngClass]=\"{'ui-state-disabled':isFirstPage()}\" [tabindex]=\"isFirstPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-caret-left\"></span>\n            </a>\n            <span class=\"ui-paginator-pages\">\n                <a tabindex=\"0\" *ngFor=\"let pageLink of pageLinks\" class=\"ui-paginator-page ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"onPageLinkClick($event, pageLink - 1)\" (keydown.enter)=\"onPageLinkClick($event, pageLink - 1)\" [ngClass]=\"{'ui-state-active': (pageLink-1 == getPage())}\">{{pageLink}}</a>\n            </span>\n            <a [attr.tabindex]=\"isLastPage() ? null : '0'\" class=\"ui-paginator-next ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToNext($event)\" (keydown.enter)=\"changePageToNext($event)\" [ngClass]=\"{'ui-state-disabled':isLastPage()}\" [tabindex]=\"isLastPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-caret-right\"></span>\n            </a>\n            <a [attr.tabindex]=\"isLastPage() ? null : '0'\" class=\"ui-paginator-last ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToLast($event)\" (keydown.enter)=\"changePageToLast($event)\" [ngClass]=\"{'ui-state-disabled':isLastPage()}\" [tabindex]=\"isLastPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-step-forward\"></span>\n            </a>\n            <p-dropdown [options]=\"rowsPerPageItems\" [(ngModel)]=\"rows\" *ngIf=\"rowsPerPageOptions\" \n                (onChange)=\"onRppChange($event)\" [appendTo]=\"dropdownAppendTo\" [scrollHeight]=\"dropdownScrollHeight\"></p-dropdown>\n            <div class=\"ui-paginator-right-content\" *ngIf=\"templateRight\">\n                <ng-container *ngTemplateOutlet=\"templateRight; context: {$implicit: paginatorState}\"></ng-container>\n            </div>\n        </div>\n    "
            })
        ], Paginator);
        return Paginator;
    }());
    var PaginatorModule = /** @class */ (function () {
        function PaginatorModule() {
        }
        PaginatorModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, dropdown.DropdownModule, forms.FormsModule, api.SharedModule],
                exports: [Paginator, dropdown.DropdownModule, forms.FormsModule, api.SharedModule],
                declarations: [Paginator]
            })
        ], PaginatorModule);
        return PaginatorModule;
    }());

    exports.Paginator = Paginator;
    exports.PaginatorModule = PaginatorModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-paginator.umd.js.map
