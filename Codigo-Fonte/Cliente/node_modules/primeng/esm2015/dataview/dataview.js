var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnInit, AfterContentInit, Input, Output, EventEmitter, ContentChild, ContentChildren, QueryList, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectUtils } from 'primeng/utils';
import { Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { FilterUtils } from 'primeng/utils';
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
export { DataView };
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
export { DataViewLayoutOptions };
let DataViewModule = class DataViewModule {
};
DataViewModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule, PaginatorModule],
        exports: [DataView, SharedModule, DataViewLayoutOptions],
        declarations: [DataView, DataViewLayoutOptions]
    })
], DataViewModule);
export { DataViewModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXZpZXcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2RhdGF2aWV3LyIsInNvdXJjZXMiOlsiZGF0YXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxnQkFBZ0IsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzTCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVsRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBbUMxQyxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBa0ZqQixZQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQWhGeEIsV0FBTSxHQUFXLE1BQU0sQ0FBQztRQVF4QixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBSXRCLHNCQUFpQixHQUFXLFFBQVEsQ0FBQztRQUVyQyx3QkFBbUIsR0FBWSxJQUFJLENBQUM7UUFJcEMsa0NBQTZCLEdBQVcsT0FBTyxDQUFDO1FBRWhELDhCQUF5QixHQUFXLCtCQUErQixDQUFDO1FBTXBFLGlCQUFZLEdBQVcsa0JBQWtCLENBQUM7UUFFekMsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTXBELFlBQU8sR0FBYSxDQUFDLEtBQWEsRUFBRSxJQUFTLEVBQUUsRUFBRSxDQUFDLElB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QUFRLEVBQUMscUJBQXFCLENBQUM7S0FDakQsQ0FBQztHQUNXLGNBQWMsQ0FBSTtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixPbkluaXQsQWZ0ZXJDb250ZW50SW5pdCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLENvbnRlbnRDaGlsZCxDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFRlbXBsYXRlUmVmLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge09iamVjdFV0aWxzfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7SGVhZGVyLEZvb3RlcixQcmltZVRlbXBsYXRlLFNoYXJlZE1vZHVsZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtQYWdpbmF0b3JNb2R1bGV9IGZyb20gJ3ByaW1lbmcvcGFnaW5hdG9yJztcbmltcG9ydCB7QmxvY2thYmxlVUl9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7RmlsdGVyVXRpbHN9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZGF0YVZpZXcnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1kYXRhdmlldyB1aS13aWRnZXQnOiB0cnVlLCAndWktZGF0YXZpZXctbGlzdCc6IChsYXlvdXQgPT09ICdsaXN0JyksICd1aS1kYXRhdmlldy1ncmlkJzogKGxheW91dCA9PT0gJ2dyaWQnKX1cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0YXZpZXctbG9hZGluZyB1aS13aWRnZXQtb3ZlcmxheVwiICpuZ0lmPVwibG9hZGluZ1wiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWRhdGF2aWV3LWxvYWRpbmctY29udGVudFwiICpuZ0lmPVwibG9hZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxpIFtjbGFzc109XCIndWktZGF0YXZpZXctbG9hZGluZy1pY29uIHBpLXNwaW4gJyArIGxvYWRpbmdJY29uXCI+PC9pPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0YXZpZXctaGVhZGVyIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLXRvcFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cC1wYWdpbmF0b3IgW3Jvd3NdPVwicm93c1wiIFtmaXJzdF09XCJmaXJzdFwiIFt0b3RhbFJlY29yZHNdPVwidG90YWxSZWNvcmRzXCIgW3BhZ2VMaW5rU2l6ZV09XCJwYWdlTGlua3NcIiBbYWx3YXlzU2hvd109XCJhbHdheXNTaG93UGFnaW5hdG9yXCJcbiAgICAgICAgICAgICAgICAob25QYWdlQ2hhbmdlKT1cInBhZ2luYXRlKCRldmVudClcIiBzdHlsZUNsYXNzPVwidWktcGFnaW5hdG9yLXRvcFwiIFtyb3dzUGVyUGFnZU9wdGlvbnNdPVwicm93c1BlclBhZ2VPcHRpb25zXCIgKm5nSWY9XCJwYWdpbmF0b3IgJiYgKHBhZ2luYXRvclBvc2l0aW9uID09PSAndG9wJyB8fCBwYWdpbmF0b3JQb3NpdGlvbiA9PSdib3RoJylcIlxuICAgICAgICAgICAgICAgIFtkcm9wZG93bkFwcGVuZFRvXT1cInBhZ2luYXRvckRyb3Bkb3duQXBwZW5kVG9cIiBbZHJvcGRvd25TY3JvbGxIZWlnaHRdPVwicGFnaW5hdG9yRHJvcGRvd25TY3JvbGxIZWlnaHRcIiBbdGVtcGxhdGVMZWZ0XT1cInBhZ2luYXRvckxlZnRUZW1wbGF0ZVwiIFt0ZW1wbGF0ZVJpZ2h0XT1cInBhZ2luYXRvclJpZ2h0VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlXT1cImN1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGVcIiBbc2hvd0N1cnJlbnRQYWdlUmVwb3J0XT1cInNob3dDdXJyZW50UGFnZVJlcG9ydFwiPjwvcC1wYWdpbmF0b3I+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0YXZpZXctY29udGVudCB1aS13aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcm93RGF0YSBsZXQtcm93SW5kZXg9XCJpbmRleFwiIFtuZ0Zvck9mXT1cInBhZ2luYXRvciA/ICgoZmlsdGVyZWRWYWx1ZXx8dmFsdWUpIHwgc2xpY2U6KGxhenkgPyAwIDogZmlyc3QpOigobGF6eSA/IDAgOiBmaXJzdCkgKyByb3dzKSkgOiAoZmlsdGVyZWRWYWx1ZXx8dmFsdWUpXCIgW25nRm9yVHJhY2tCeV09XCJ0cmFja0J5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogcm93SW5kZXh9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc0VtcHR5KClcIiBjbGFzcz1cInVpLWctMTIgdWktZGF0YXZpZXctZW1wdHltZXNzYWdlXCI+e3tlbXB0eU1lc3NhZ2V9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cC1wYWdpbmF0b3IgW3Jvd3NdPVwicm93c1wiIFtmaXJzdF09XCJmaXJzdFwiIFt0b3RhbFJlY29yZHNdPVwidG90YWxSZWNvcmRzXCIgW3BhZ2VMaW5rU2l6ZV09XCJwYWdlTGlua3NcIiBbYWx3YXlzU2hvd109XCJhbHdheXNTaG93UGFnaW5hdG9yXCJcbiAgICAgICAgICAgICAgICAob25QYWdlQ2hhbmdlKT1cInBhZ2luYXRlKCRldmVudClcIiBzdHlsZUNsYXNzPVwidWktcGFnaW5hdG9yLWJvdHRvbVwiIFtyb3dzUGVyUGFnZU9wdGlvbnNdPVwicm93c1BlclBhZ2VPcHRpb25zXCIgKm5nSWY9XCJwYWdpbmF0b3IgJiYgKHBhZ2luYXRvclBvc2l0aW9uID09PSAnYm90dG9tJyB8fCBwYWdpbmF0b3JQb3NpdGlvbiA9PSdib3RoJylcIlxuICAgICAgICAgICAgICAgIFtkcm9wZG93bkFwcGVuZFRvXT1cInBhZ2luYXRvckRyb3Bkb3duQXBwZW5kVG9cIiBbZHJvcGRvd25TY3JvbGxIZWlnaHRdPVwicGFnaW5hdG9yRHJvcGRvd25TY3JvbGxIZWlnaHRcIiBbdGVtcGxhdGVMZWZ0XT1cInBhZ2luYXRvckxlZnRUZW1wbGF0ZVwiIFt0ZW1wbGF0ZVJpZ2h0XT1cInBhZ2luYXRvclJpZ2h0VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlXT1cImN1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGVcIiBbc2hvd0N1cnJlbnRQYWdlUmVwb3J0XT1cInNob3dDdXJyZW50UGFnZVJlcG9ydFwiPjwvcC1wYWdpbmF0b3I+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZGF0YXZpZXctZm9vdGVyIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLWJvdHRvbVwiICpuZ0lmPVwiZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVmlldyBpbXBsZW1lbnRzIE9uSW5pdCxBZnRlckNvbnRlbnRJbml0LEJsb2NrYWJsZVVJLE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKSBsYXlvdXQ6IHN0cmluZyA9ICdsaXN0JztcblxuICAgIEBJbnB1dCgpIHBhZ2luYXRvcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHJvd3M6IG51bWJlcjtcbiAgICBcbiAgICBASW5wdXQoKSB0b3RhbFJlY29yZHM6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHBhZ2VMaW5rczogbnVtYmVyID0gNTtcbiAgICBcbiAgICBASW5wdXQoKSByb3dzUGVyUGFnZU9wdGlvbnM6IGFueVtdO1xuXG4gICAgQElucHV0KCkgcGFnaW5hdG9yUG9zaXRpb246IHN0cmluZyA9ICdib3R0b20nO1xuICAgIFxuICAgIEBJbnB1dCgpIGFsd2F5c1Nob3dQYWdpbmF0b3I6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgcGFnaW5hdG9yRHJvcGRvd25BcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgcGFnaW5hdG9yRHJvcGRvd25TY3JvbGxIZWlnaHQ6IHN0cmluZyA9ICcyMDBweCc7XG5cbiAgICBASW5wdXQoKSBjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlOiBzdHJpbmcgPSAne2N1cnJlbnRQYWdlfSBvZiB7dG90YWxQYWdlc30nO1xuXG4gICAgQElucHV0KCkgc2hvd0N1cnJlbnRQYWdlUmVwb3J0OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbGF6eTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGVtcHR5TWVzc2FnZTogc3RyaW5nID0gJ05vIHJlY29yZHMgZm91bmQnO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkxhenlMb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0cmFja0J5OiBGdW5jdGlvbiA9IChpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IGl0ZW07XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJCeTogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGxvYWRpbmc6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBsb2FkaW5nSWNvbjogc3RyaW5nID0gJ3BpIHBpLXNwaW5uZXInO1xuXG4gICAgQElucHV0KCkgZmlyc3Q6IG51bWJlciA9IDA7XG5cbiAgICBASW5wdXQoKSBzb3J0RmllbGQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNvcnRPcmRlcjogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgdmFsdWU6IGFueVtdO1xuXG4gICAgQE91dHB1dCgpIG9uUGFnZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Tb3J0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZUxheW91dDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQENvbnRlbnRDaGlsZChIZWFkZXIsIHsgc3RhdGljOiB0cnVlIH0pIGhlYWRlcjtcblxuICAgIEBDb250ZW50Q2hpbGQoRm9vdGVyLCB7IHN0YXRpYzogdHJ1ZSB9KSBmb290ZXI7XG4gICAgXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuICAgIFxuICAgIF92YWx1ZTogYW55W107XG4gICAgXG4gICAgbGlzdEl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGdyaWRJdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwYWdpbmF0b3JMZWZ0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBwYWdpbmF0b3JSaWdodFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIFxuICAgIGZpbHRlcmVkVmFsdWU6IGFueVtdO1xuXG4gICAgZmlsdGVyVmFsdWU6IHN0cmluZztcblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBzaW1wbGVDaGFuZ2VzLnZhbHVlLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVG90YWxSZWNvcmRzKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghdGhpcy5sYXp5ICYmIHRoaXMuaGFzRmlsdGVyKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcih0aGlzLmZpbHRlclZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2VzLnNvcnRGaWVsZCB8fCBzaW1wbGVDaGFuZ2VzLnNvcnRPcmRlcikge1xuICAgICAgICAgICAgLy9hdm9pZCB0cmlnZ2VyaW5nIGxhenkgbG9hZCBwcmlvciB0byBsYXp5IGluaXRpYWxpemF0aW9uIGF0IG9uSW5pdFxuICAgICAgICAgICAgaWYgKCF0aGlzLmxhenkgfHwgdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc29ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnbGlzdEl0ZW0nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RJdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNhc2UgJ2dyaWRJdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkSXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3BhZ2luYXRvcmxlZnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvckxlZnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwYWdpbmF0b3JyaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yUmlnaHRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXBkYXRlSXRlbVRlbXBsYXRlKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSXRlbVRlbXBsYXRlKCkge1xuICAgICAgICBzd2l0Y2godGhpcy5sYXlvdXQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2xpc3QnOlxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gdGhpcy5saXN0SXRlbVRlbXBsYXRlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgJ2dyaWQnOlxuICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gdGhpcy5ncmlkSXRlbVRlbXBsYXRlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY2hhbmdlTGF5b3V0KGxheW91dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMubGF5b3V0ID0gbGF5b3V0O1xuICAgICAgICB0aGlzLm9uQ2hhbmdlTGF5b3V0LmVtaXQoe1xuICAgICAgICAgICAgbGF5b3V0OiB0aGlzLmxheW91dFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVJdGVtVGVtcGxhdGUoKTtcbiAgICB9XG4gICAgICAgIFxuICAgIHVwZGF0ZVRvdGFsUmVjb3JkcygpIHtcbiAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSB0aGlzLmxhenkgPyB0aGlzLnRvdGFsUmVjb3JkcyA6ICh0aGlzLl92YWx1ZSA/IHRoaXMuX3ZhbHVlLmxlbmd0aCA6IDApO1xuICAgIH1cblxuICAgIHBhZ2luYXRlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZmlyc3QgPSBldmVudC5maXJzdDtcbiAgICAgICAgdGhpcy5yb3dzID0gZXZlbnQucm93cztcblxuICAgICAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uUGFnZS5lbWl0KHtcbiAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNvcnQoKSB7XG4gICAgICAgIHRoaXMuZmlyc3QgPSAwO1xuXG4gICAgICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnNvcnQoKGRhdGExLCBkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTEgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKGRhdGExLCB0aGlzLnNvcnRGaWVsZCk7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlMiA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YTIsIHRoaXMuc29ydEZpZWxkKTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZTEgPT0gbnVsbCAmJiB2YWx1ZTIgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gLTE7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUxICE9IG51bGwgJiYgdmFsdWUyID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IDA7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlMSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlMiA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZhbHVlMS5sb2NhbGVDb21wYXJlKHZhbHVlMik7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAodmFsdWUxIDwgdmFsdWUyKSA/IC0xIDogKHZhbHVlMSA+IHZhbHVlMikgPyAxIDogMDtcblxuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5zb3J0T3JkZXIgKiByZXN1bHQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0ZpbHRlcigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXIodGhpcy5maWx0ZXJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uU29ydC5lbWl0KHtcbiAgICAgICAgICAgIHNvcnRGaWVsZDogdGhpcy5zb3J0RmllbGQsXG4gICAgICAgICAgICBzb3J0T3JkZXI6IHRoaXMuc29ydE9yZGVyXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5maWx0ZXJlZFZhbHVlfHx0aGlzLnZhbHVlO1xuICAgICAgICByZXR1cm4gZGF0YSA9PSBudWxsIHx8IGRhdGEubGVuZ3RoID09IDA7XG4gICAgfVxuICAgIFxuICAgIGNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzLFxuICAgICAgICAgICAgc29ydEZpZWxkOiB0aGlzLnNvcnRGaWVsZCxcbiAgICAgICAgICAgIHNvcnRPcmRlcjogdGhpcy5zb3J0T3JkZXJcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudMKge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIGZpbHRlcihmaWx0ZXI6IHN0cmluZywgZmlsdGVyTWF0Y2hNb2RlOnN0cmluZyA9XCJjb250YWluc1wiKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBmaWx0ZXI7XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCBzZWFyY2hGaWVsZHMgPSB0aGlzLmZpbHRlckJ5LnNwbGl0KCcsJyk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkVmFsdWUgPSBGaWx0ZXJVdGlscy5maWx0ZXIodGhpcy52YWx1ZSwgc2VhcmNoRmllbGRzLCBmaWx0ZXIsIGZpbHRlck1hdGNoTW9kZSk7XG4gICAgXG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJlZFZhbHVlLmxlbmd0aCA9PT0gdGhpcy52YWx1ZS5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZFZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3QgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gdGhpcy5maWx0ZXJlZFZhbHVlID8gdGhpcy5maWx0ZXJlZFZhbHVlLmxlbmd0aCA6IHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gICAgICAgXG4gICAgfVxuXG4gICAgaGFzRmlsdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJWYWx1ZSAmJiB0aGlzLmZpbHRlclZhbHVlLnRyaW0oKS5sZW5ndGggPiAwO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWRhdGFWaWV3TGF5b3V0T3B0aW9ucycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktZGF0YXZpZXctbGF5b3V0LW9wdGlvbnMgdWktc2VsZWN0YnV0dG9uIHVpLWJ1dHRvbnNldCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiBjbGFzcz1cInVpLWJ1dHRvbiB1aS1idXR0b24taWNvbi1vbmx5IHVpLXN0YXRlLWRlZmF1bHRcIiAoY2xpY2spPVwiY2hhbmdlTGF5b3V0KCRldmVudCwgJ2xpc3QnKVwiIChrZXlkb3duLmVudGVyKT1cImNoYW5nZUxheW91dCgkZXZlbnQsICdsaXN0JylcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtYWN0aXZlJzogZHYubGF5b3V0ID09PSAnbGlzdCd9XCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJwaSBwaS1iYXJzIHVpLWJ1dHRvbi1pY29uLWxlZnRcIj48L2k+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1idXR0b24tdGV4dCB1aS1jbGlja2FibGVcIj51aS1idG48L3NwYW4+XG4gICAgICAgICAgICA8L2E+PGEgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJ1aS1idXR0b24gdWktYnV0dG9uLWljb24tb25seSB1aS1zdGF0ZS1kZWZhdWx0XCIgKGNsaWNrKT1cImNoYW5nZUxheW91dCgkZXZlbnQsICdncmlkJylcIiAoa2V5ZG93bi5lbnRlcik9XCJjaGFuZ2VMYXlvdXQoJGV2ZW50LCAnZ3JpZCcpXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWFjdGl2ZSc6IGR2LmxheW91dCA9PT0gJ2dyaWQnfVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwicGkgcGktdGgtbGFyZ2UgdWktYnV0dG9uLWljb24tbGVmdFwiPjwvaT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWJ1dHRvbi10ZXh0IHVpLWNsaWNrYWJsZVwiPnVpLWJ0bjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBEYXRhVmlld0xheW91dE9wdGlvbnMgIHtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHY6IERhdGFWaWV3KSB7fVxuXG4gICAgY2hhbmdlTGF5b3V0KGV2ZW50OiBFdmVudCwgbGF5b3V0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kdi5jaGFuZ2VMYXlvdXQobGF5b3V0KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsU2hhcmVkTW9kdWxlLFBhZ2luYXRvck1vZHVsZV0sXG4gICAgZXhwb3J0czogW0RhdGFWaWV3LFNoYXJlZE1vZHVsZSxEYXRhVmlld0xheW91dE9wdGlvbnNdLFxuICAgIGRlY2xhcmF0aW9uczogW0RhdGFWaWV3LERhdGFWaWV3TGF5b3V0T3B0aW9uc11cbn0pXG5leHBvcnQgY2xhc3MgRGF0YVZpZXdNb2R1bGUgeyB9XG4iXX0=