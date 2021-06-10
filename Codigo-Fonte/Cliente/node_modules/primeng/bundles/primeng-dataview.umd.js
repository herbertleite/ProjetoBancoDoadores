(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/utils'), require('primeng/api'), require('primeng/paginator')) :
    typeof define === 'function' && define.amd ? define('primeng/dataview', ['exports', '@angular/core', '@angular/common', 'primeng/utils', 'primeng/api', 'primeng/paginator'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.dataview = {}), global.ng.core, global.ng.common, global.primeng.utils, global.primeng.api, global.primeng.paginator));
}(this, (function (exports, core, common, utils, api, paginator) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var DataView = /** @class */ (function () {
        function DataView(el) {
            this.el = el;
            this.layout = 'list';
            this.pageLinks = 5;
            this.paginatorPosition = 'bottom';
            this.alwaysShowPaginator = true;
            this.paginatorDropdownScrollHeight = '200px';
            this.currentPageReportTemplate = '{currentPage} of {totalPages}';
            this.emptyMessage = 'No records found';
            this.onLazyLoad = new core.EventEmitter();
            this.trackBy = function (index, item) { return item; };
            this.loadingIcon = 'pi pi-spinner';
            this.first = 0;
            this.onPage = new core.EventEmitter();
            this.onSort = new core.EventEmitter();
            this.onChangeLayout = new core.EventEmitter();
        }
        DataView.prototype.ngOnInit = function () {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            this.initialized = true;
        };
        DataView.prototype.ngOnChanges = function (simpleChanges) {
            if (simpleChanges.value) {
                this._value = simpleChanges.value.currentValue;
                this.updateTotalRecords();
                if (!this.lazy && this.hasFilter()) {
                    this.filter(this.filterValue);
                }
            }
            if (simpleChanges.sortField || simpleChanges.sortOrder) {
                //avoid triggering lazy load prior to lazy initialization at onInit
                if (!this.lazy || this.initialized) {
                    this.sort();
                }
            }
        };
        DataView.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'listItem':
                        _this.listItemTemplate = item.template;
                        break;
                    case 'gridItem':
                        _this.gridItemTemplate = item.template;
                        break;
                    case 'paginatorleft':
                        _this.paginatorLeftTemplate = item.template;
                        break;
                    case 'paginatorright':
                        _this.paginatorRightTemplate = item.template;
                        break;
                }
            });
            this.updateItemTemplate();
        };
        DataView.prototype.updateItemTemplate = function () {
            switch (this.layout) {
                case 'list':
                    this.itemTemplate = this.listItemTemplate;
                    break;
                case 'grid':
                    this.itemTemplate = this.gridItemTemplate;
                    break;
            }
        };
        DataView.prototype.changeLayout = function (layout) {
            this.layout = layout;
            this.onChangeLayout.emit({
                layout: this.layout
            });
            this.updateItemTemplate();
        };
        DataView.prototype.updateTotalRecords = function () {
            this.totalRecords = this.lazy ? this.totalRecords : (this._value ? this._value.length : 0);
        };
        DataView.prototype.paginate = function (event) {
            this.first = event.first;
            this.rows = event.rows;
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            this.onPage.emit({
                first: this.first,
                rows: this.rows
            });
        };
        DataView.prototype.sort = function () {
            var _this = this;
            this.first = 0;
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                this.value.sort(function (data1, data2) {
                    var value1 = utils.ObjectUtils.resolveFieldData(data1, _this.sortField);
                    var value2 = utils.ObjectUtils.resolveFieldData(data2, _this.sortField);
                    var result = null;
                    if (value1 == null && value2 != null)
                        result = -1;
                    else if (value1 != null && value2 == null)
                        result = 1;
                    else if (value1 == null && value2 == null)
                        result = 0;
                    else if (typeof value1 === 'string' && typeof value2 === 'string')
                        result = value1.localeCompare(value2);
                    else
                        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                    return (_this.sortOrder * result);
                });
                if (this.hasFilter()) {
                    this.filter(this.filterValue);
                }
            }
            this.onSort.emit({
                sortField: this.sortField,
                sortOrder: this.sortOrder
            });
        };
        DataView.prototype.isEmpty = function () {
            var data = this.filteredValue || this.value;
            return data == null || data.length == 0;
        };
        DataView.prototype.createLazyLoadMetadata = function () {
            return {
                first: this.first,
                rows: this.rows,
                sortField: this.sortField,
                sortOrder: this.sortOrder
            };
        };
        DataView.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        DataView.prototype.filter = function (filter, filterMatchMode) {
            if (filterMatchMode === void 0) { filterMatchMode = "contains"; }
            this.filterValue = filter;
            if (this.value && this.value.length) {
                var searchFields = this.filterBy.split(',');
                this.filteredValue = utils.FilterUtils.filter(this.value, searchFields, filter, filterMatchMode);
                if (this.filteredValue.length === this.value.length) {
                    this.filteredValue = null;
                }
                if (this.paginator) {
                    this.first = 0;
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                }
            }
        };
        DataView.prototype.hasFilter = function () {
            return this.filterValue && this.filterValue.trim().length > 0;
        };
        DataView.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], DataView.prototype, "layout", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "paginator", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "rows", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "totalRecords", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "pageLinks", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "rowsPerPageOptions", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "paginatorPosition", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "alwaysShowPaginator", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "paginatorDropdownAppendTo", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "paginatorDropdownScrollHeight", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "currentPageReportTemplate", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "showCurrentPageReport", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "lazy", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "emptyMessage", void 0);
        __decorate([
            core.Output()
        ], DataView.prototype, "onLazyLoad", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "trackBy", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "filterBy", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "loading", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "loadingIcon", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "first", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "sortField", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "sortOrder", void 0);
        __decorate([
            core.Input()
        ], DataView.prototype, "value", void 0);
        __decorate([
            core.Output()
        ], DataView.prototype, "onPage", void 0);
        __decorate([
            core.Output()
        ], DataView.prototype, "onSort", void 0);
        __decorate([
            core.Output()
        ], DataView.prototype, "onChangeLayout", void 0);
        __decorate([
            core.ContentChild(api.Header, { static: true })
        ], DataView.prototype, "header", void 0);
        __decorate([
            core.ContentChild(api.Footer, { static: true })
        ], DataView.prototype, "footer", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], DataView.prototype, "templates", void 0);
        DataView = __decorate([
            core.Component({
                selector: 'p-dataView',
                template: "\n        <div [ngClass]=\"{'ui-dataview ui-widget': true, 'ui-dataview-list': (layout === 'list'), 'ui-dataview-grid': (layout === 'grid')}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-dataview-loading ui-widget-overlay\" *ngIf=\"loading\"></div>\n            <div class=\"ui-dataview-loading-content\" *ngIf=\"loading\">\n                <i [class]=\"'ui-dataview-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div class=\"ui-dataview-header ui-widget-header ui-corner-top\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-top\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\" [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\"></p-paginator>\n            <div class=\"ui-dataview-content ui-widget-content\">\n                <div class=\"ui-g\">\n                    <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"paginator ? ((filteredValue||value) | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : (filteredValue||value)\" [ngForTrackBy]=\"trackBy\">\n                        <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: rowData, rowIndex: rowIndex}\"></ng-container>\n                    </ng-template>\n                    <div *ngIf=\"isEmpty()\" class=\"ui-g-12 ui-dataview-emptymessage\">{{emptyMessage}}</div>\n                </div>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"paginate($event)\" styleClass=\"ui-paginator-bottom\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\" [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\"></p-paginator>\n            <div class=\"ui-dataview-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    "
            })
        ], DataView);
        return DataView;
    }());
    var DataViewLayoutOptions = /** @class */ (function () {
        function DataViewLayoutOptions(dv) {
            this.dv = dv;
        }
        DataViewLayoutOptions.prototype.changeLayout = function (event, layout) {
            this.dv.changeLayout(layout);
            event.preventDefault();
        };
        DataViewLayoutOptions.ctorParameters = function () { return [
            { type: DataView }
        ]; };
        __decorate([
            core.Input()
        ], DataViewLayoutOptions.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], DataViewLayoutOptions.prototype, "styleClass", void 0);
        DataViewLayoutOptions = __decorate([
            core.Component({
                selector: 'p-dataViewLayoutOptions',
                template: "\n        <div [ngClass]=\"'ui-dataview-layout-options ui-selectbutton ui-buttonset'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <a tabindex=\"0\" class=\"ui-button ui-button-icon-only ui-state-default\" (click)=\"changeLayout($event, 'list')\" (keydown.enter)=\"changeLayout($event, 'list')\"\n                [ngClass]=\"{'ui-state-active': dv.layout === 'list'}\">\n                <i class=\"pi pi-bars ui-button-icon-left\"></i>\n                <span class=\"ui-button-text ui-clickable\">ui-btn</span>\n            </a><a tabindex=\"0\" class=\"ui-button ui-button-icon-only ui-state-default\" (click)=\"changeLayout($event, 'grid')\" (keydown.enter)=\"changeLayout($event, 'grid')\"\n                [ngClass]=\"{'ui-state-active': dv.layout === 'grid'}\">\n                <i class=\"pi pi-th-large ui-button-icon-left\"></i>\n                <span class=\"ui-button-text ui-clickable\">ui-btn</span>\n            </a>\n        </div>\n    "
            })
        ], DataViewLayoutOptions);
        return DataViewLayoutOptions;
    }());
    var DataViewModule = /** @class */ (function () {
        function DataViewModule() {
        }
        DataViewModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, api.SharedModule, paginator.PaginatorModule],
                exports: [DataView, api.SharedModule, DataViewLayoutOptions],
                declarations: [DataView, DataViewLayoutOptions]
            })
        ], DataViewModule);
        return DataViewModule;
    }());

    exports.DataView = DataView;
    exports.DataViewLayoutOptions = DataViewLayoutOptions;
    exports.DataViewModule = DataViewModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-dataview.umd.js.map
