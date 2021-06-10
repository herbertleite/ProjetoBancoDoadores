import { EventEmitter, ElementRef, Input, Output, ContentChild, ContentChildren, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectUtils, FilterUtils } from 'primeng/utils';
import { Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let DataView = class DataView {
    constructor(el) {
        this.el = el;
        this.layout = 'list';
        this.pageLinks = 5;
        this.paginatorPosition = 'bottom';
        this.alwaysShowPaginator = true;
        this.paginatorDropdownScrollHeight = '200px';
        this.currentPageReportTemplate = '{currentPage} of {totalPages}';
        this.emptyMessage = 'No records found';
        this.onLazyLoad = new EventEmitter();
        this.trackBy = (index, item) => item;
        this.loadingIcon = 'pi pi-spinner';
        this.first = 0;
        this.onPage = new EventEmitter();
        this.onSort = new EventEmitter();
        this.onChangeLayout = new EventEmitter();
    }
    ngOnInit() {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    }
    ngOnChanges(simpleChanges) {
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
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'listItem':
                    this.listItemTemplate = item.template;
                    break;
                case 'gridItem':
                    this.gridItemTemplate = item.template;
                    break;
                case 'paginatorleft':
                    this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    this.paginatorRightTemplate = item.template;
                    break;
            }
        });
        this.updateItemTemplate();
    }
    updateItemTemplate() {
        switch (this.layout) {
            case 'list':
                this.itemTemplate = this.listItemTemplate;
                break;
            case 'grid':
                this.itemTemplate = this.gridItemTemplate;
                break;
        }
    }
    changeLayout(layout) {
        this.layout = layout;
        this.onChangeLayout.emit({
            layout: this.layout
        });
        this.updateItemTemplate();
    }
    updateTotalRecords() {
        this.totalRecords = this.lazy ? this.totalRecords : (this._value ? this._value.length : 0);
    }
    paginate(event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
    }
    sort() {
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else if (this.value) {
            this.value.sort((data1, data2) => {
                let value1 = ObjectUtils.resolveFieldData(data1, this.sortField);
                let value2 = ObjectUtils.resolveFieldData(data2, this.sortField);
                let result = null;
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
                return (this.sortOrder * result);
            });
            if (this.hasFilter()) {
                this.filter(this.filterValue);
            }
        }
        this.onSort.emit({
            sortField: this.sortField,
            sortOrder: this.sortOrder
        });
    }
    isEmpty() {
        let data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    }
    createLazyLoadMetadata() {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder
        };
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    filter(filter, filterMatchMode = "contains") {
        this.filterValue = filter;
        if (this.value && this.value.length) {
            let searchFields = this.filterBy.split(',');
            this.filteredValue = FilterUtils.filter(this.value, searchFields, filter, filterMatchMode);
            if (this.filteredValue.length === this.value.length) {
                this.filteredValue = null;
            }
            if (this.paginator) {
                this.first = 0;
                this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
            }
        }
    }
    hasFilter() {
        return this.filterValue && this.filterValue.trim().length > 0;
    }
};
DataView.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], DataView.prototype, "layout", void 0);
__decorate([
    Input()
], DataView.prototype, "paginator", void 0);
__decorate([
    Input()
], DataView.prototype, "rows", void 0);
__decorate([
    Input()
], DataView.prototype, "totalRecords", void 0);
__decorate([
    Input()
], DataView.prototype, "pageLinks", void 0);
__decorate([
    Input()
], DataView.prototype, "rowsPerPageOptions", void 0);
__decorate([
    Input()
], DataView.prototype, "paginatorPosition", void 0);
__decorate([
    Input()
], DataView.prototype, "alwaysShowPaginator", void 0);
__decorate([
    Input()
], DataView.prototype, "paginatorDropdownAppendTo", void 0);
__decorate([
    Input()
], DataView.prototype, "paginatorDropdownScrollHeight", void 0);
__decorate([
    Input()
], DataView.prototype, "currentPageReportTemplate", void 0);
__decorate([
    Input()
], DataView.prototype, "showCurrentPageReport", void 0);
__decorate([
    Input()
], DataView.prototype, "lazy", void 0);
__decorate([
    Input()
], DataView.prototype, "emptyMessage", void 0);
__decorate([
    Output()
], DataView.prototype, "onLazyLoad", void 0);
__decorate([
    Input()
], DataView.prototype, "style", void 0);
__decorate([
    Input()
], DataView.prototype, "styleClass", void 0);
__decorate([
    Input()
], DataView.prototype, "trackBy", void 0);
__decorate([
    Input()
], DataView.prototype, "filterBy", void 0);
__decorate([
    Input()
], DataView.prototype, "loading", void 0);
__decorate([
    Input()
], DataView.prototype, "loadingIcon", void 0);
__decorate([
    Input()
], DataView.prototype, "first", void 0);
__decorate([
    Input()
], DataView.prototype, "sortField", void 0);
__decorate([
    Input()
], DataView.prototype, "sortOrder", void 0);
__decorate([
    Input()
], DataView.prototype, "value", void 0);
__decorate([
    Output()
], DataView.prototype, "onPage", void 0);
__decorate([
    Output()
], DataView.prototype, "onSort", void 0);
__decorate([
    Output()
], DataView.prototype, "onChangeLayout", void 0);
__decorate([
    ContentChild(Header, { static: true })
], DataView.prototype, "header", void 0);
__decorate([
    ContentChild(Footer, { static: true })
], DataView.prototype, "footer", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], DataView.prototype, "templates", void 0);
DataView = __decorate([
    Component({
        selector: 'p-dataView',
        template: `
        <div [ngClass]="{'ui-dataview ui-widget': true, 'ui-dataview-list': (layout === 'list'), 'ui-dataview-grid': (layout === 'grid')}" [ngStyle]="style" [class]="styleClass">
            <div class="ui-dataview-loading ui-widget-overlay" *ngIf="loading"></div>
            <div class="ui-dataview-loading-content" *ngIf="loading">
                <i [class]="'ui-dataview-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <div class="ui-dataview-header ui-widget-header ui-corner-top">
                <ng-content select="p-header"></ng-content>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)" styleClass="ui-paginator-top" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo" [dropdownScrollHeight]="paginatorDropdownScrollHeight" [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate"
                [currentPageReportTemplate]="currentPageReportTemplate" [showCurrentPageReport]="showCurrentPageReport"></p-paginator>
            <div class="ui-dataview-content ui-widget-content">
                <div class="ui-g">
                    <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="paginator ? ((filteredValue||value) | slice:(lazy ? 0 : first):((lazy ? 0 : first) + rows)) : (filteredValue||value)" [ngForTrackBy]="trackBy">
                        <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: rowData, rowIndex: rowIndex}"></ng-container>
                    </ng-template>
                    <div *ngIf="isEmpty()" class="ui-g-12 ui-dataview-emptymessage">{{emptyMessage}}</div>
                </div>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="paginate($event)" styleClass="ui-paginator-bottom" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [dropdownAppendTo]="paginatorDropdownAppendTo" [dropdownScrollHeight]="paginatorDropdownScrollHeight" [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate"
                [currentPageReportTemplate]="currentPageReportTemplate" [showCurrentPageReport]="showCurrentPageReport"></p-paginator>
            <div class="ui-dataview-footer ui-widget-header ui-corner-bottom" *ngIf="footer">
                <ng-content select="p-footer"></ng-content>
            </div>
        </div>
    `
    })
], DataView);
let DataViewLayoutOptions = class DataViewLayoutOptions {
    constructor(dv) {
        this.dv = dv;
    }
    changeLayout(event, layout) {
        this.dv.changeLayout(layout);
        event.preventDefault();
    }
};
DataViewLayoutOptions.ctorParameters = () => [
    { type: DataView }
];
__decorate([
    Input()
], DataViewLayoutOptions.prototype, "style", void 0);
__decorate([
    Input()
], DataViewLayoutOptions.prototype, "styleClass", void 0);
DataViewLayoutOptions = __decorate([
    Component({
        selector: 'p-dataViewLayoutOptions',
        template: `
        <div [ngClass]="'ui-dataview-layout-options ui-selectbutton ui-buttonset'" [ngStyle]="style" [class]="styleClass">
            <a tabindex="0" class="ui-button ui-button-icon-only ui-state-default" (click)="changeLayout($event, 'list')" (keydown.enter)="changeLayout($event, 'list')"
                [ngClass]="{'ui-state-active': dv.layout === 'list'}">
                <i class="pi pi-bars ui-button-icon-left"></i>
                <span class="ui-button-text ui-clickable">ui-btn</span>
            </a><a tabindex="0" class="ui-button ui-button-icon-only ui-state-default" (click)="changeLayout($event, 'grid')" (keydown.enter)="changeLayout($event, 'grid')"
                [ngClass]="{'ui-state-active': dv.layout === 'grid'}">
                <i class="pi pi-th-large ui-button-icon-left"></i>
                <span class="ui-button-text ui-clickable">ui-btn</span>
            </a>
        </div>
    `
    })
], DataViewLayoutOptions);
let DataViewModule = class DataViewModule {
};
DataViewModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule, PaginatorModule],
        exports: [DataView, SharedModule, DataViewLayoutOptions],
        declarations: [DataView, DataViewLayoutOptions]
    })
], DataViewModule);

/**
 * Generated bundle index. Do not edit.
 */

export { DataView, DataViewLayoutOptions, DataViewModule };
//# sourceMappingURL=primeng-dataview.js.map
