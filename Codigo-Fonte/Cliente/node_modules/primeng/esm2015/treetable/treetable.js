var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, AfterContentInit, OnInit, OnDestroy, HostListener, Injectable, Directive, Component, Input, Output, EventEmitter, ContentChildren, TemplateRef, QueryList, ElementRef, NgZone, ViewChild, AfterViewInit, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { DomHandler } from 'primeng/dom';
import { PaginatorModule } from 'primeng/paginator';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ObjectUtils } from 'primeng/utils';
import { FilterUtils } from 'primeng/utils';
let TreeTableService = class TreeTableService {
    constructor() {
        this.sortSource = new Subject();
        this.selectionSource = new Subject();
        this.contextMenuSource = new Subject();
        this.uiUpdateSource = new Subject();
        this.totalRecordsSource = new Subject();
        this.sortSource$ = this.sortSource.asObservable();
        this.selectionSource$ = this.selectionSource.asObservable();
        this.contextMenuSource$ = this.contextMenuSource.asObservable();
        this.uiUpdateSource$ = this.uiUpdateSource.asObservable();
        this.totalRecordsSource$ = this.totalRecordsSource.asObservable();
    }
    onSort(sortMeta) {
        this.sortSource.next(sortMeta);
    }
    onSelectionChange() {
        this.selectionSource.next();
    }
    onContextMenu(node) {
        this.contextMenuSource.next(node);
    }
    onUIUpdate(value) {
        this.uiUpdateSource.next(value);
    }
    onTotalRecordsChange(value) {
        this.totalRecordsSource.next(value);
    }
};
TreeTableService = __decorate([
    Injectable()
], TreeTableService);
export { TreeTableService };
let TreeTable = class TreeTable {
    constructor(el, zone, tableService) {
        this.el = el;
        this.zone = zone;
        this.tableService = tableService;
        this.lazy = false;
        this.first = 0;
        this.pageLinks = 5;
        this.alwaysShowPaginator = true;
        this.paginatorPosition = 'bottom';
        this.defaultSortOrder = 1;
        this.sortMode = 'single';
        this.resetPageOnSort = true;
        this.selectionChange = new EventEmitter();
        this.contextMenuSelectionChange = new EventEmitter();
        this.contextMenuSelectionMode = "separate";
        this.compareSelectionBy = 'deepEquals';
        this.loadingIcon = 'pi pi-spinner';
        this.showLoader = true;
        this.virtualScrollDelay = 150;
        this.virtualRowHeight = 28;
        this.columnResizeMode = 'fit';
        this.rowTrackBy = (index, item) => item;
        this.filters = {};
        this.filterDelay = 300;
        this.filterMode = 'lenient';
        this.onFilter = new EventEmitter();
        this.onNodeExpand = new EventEmitter();
        this.onNodeCollapse = new EventEmitter();
        this.onPage = new EventEmitter();
        this.onSort = new EventEmitter();
        this.onLazyLoad = new EventEmitter();
        this.sortFunction = new EventEmitter();
        this.onColResize = new EventEmitter();
        this.onColReorder = new EventEmitter();
        this.onNodeSelect = new EventEmitter();
        this.onNodeUnselect = new EventEmitter();
        this.onContextMenuSelect = new EventEmitter();
        this.onHeaderCheckboxToggle = new EventEmitter();
        this.onEditInit = new EventEmitter();
        this.onEditComplete = new EventEmitter();
        this.onEditCancel = new EventEmitter();
        this._value = [];
        this._totalRecords = 0;
        this._sortOrder = 1;
        this.selectionKeys = {};
    }
    ngOnInit() {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.initialized = true;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'caption':
                    this.captionTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'body':
                    this.bodyTemplate = item.template;
                    break;
                case 'loadingbody':
                    this.loadingBodyTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'summary':
                    this.summaryTemplate = item.template;
                    break;
                case 'colgroup':
                    this.colGroupTemplate = item.template;
                    break;
                case 'emptymessage':
                    this.emptyMessageTemplate = item.template;
                    break;
                case 'paginatorleft':
                    this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    this.paginatorRightTemplate = item.template;
                    break;
                case 'frozenheader':
                    this.frozenHeaderTemplate = item.template;
                    break;
                case 'frozenbody':
                    this.frozenBodyTemplate = item.template;
                    break;
                case 'frozenfooter':
                    this.frozenFooterTemplate = item.template;
                    break;
                case 'frozencolgroup':
                    this.frozenColGroupTemplate = item.template;
                    break;
            }
        });
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.value) {
            this._value = simpleChange.value.currentValue;
            if (!this.lazy) {
                this.totalRecords = (this._value ? this._value.length : 0);
                if (this.sortMode == 'single' && this.sortField)
                    this.sortSingle();
                else if (this.sortMode == 'multiple' && this.multiSortMeta)
                    this.sortMultiple();
                else if (this.hasFilter()) //sort already filters
                    this._filter();
            }
            if (this.virtualScroll && this.virtualScrollCallback) {
                this.virtualScrollCallback();
            }
            this.updateSerializedValue();
            this.tableService.onUIUpdate(this.value);
        }
        if (simpleChange.sortField) {
            this._sortField = simpleChange.sortField.currentValue;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.sortOrder) {
            this._sortOrder = simpleChange.sortOrder.currentValue;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.multiSortMeta) {
            this._multiSortMeta = simpleChange.multiSortMeta.currentValue;
            if (this.sortMode === 'multiple') {
                this.sortMultiple();
            }
        }
        if (simpleChange.selection) {
            this._selection = simpleChange.selection.currentValue;
            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();
            }
            this.preventSelectionSetterPropagation = false;
        }
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
    }
    updateSerializedValue() {
        this.serializedValue = [];
        if (this.paginator)
            this.serializePageNodes();
        else
            this.serializeNodes(null, this.filteredNodes || this.value, 0, true);
    }
    serializeNodes(parent, nodes, level, visible) {
        if (nodes && nodes.length) {
            for (let node of nodes) {
                node.parent = parent;
                const rowNode = {
                    node: node,
                    parent: parent,
                    level: level,
                    visible: visible && (parent ? parent.expanded : true)
                };
                this.serializedValue.push(rowNode);
                if (rowNode.visible && node.expanded) {
                    this.serializeNodes(node, node.children, level + 1, rowNode.visible);
                }
            }
        }
    }
    serializePageNodes() {
        let data = this.filteredNodes || this.value;
        this.serializedValue = [];
        if (data && data.length) {
            const first = this.lazy ? 0 : this.first;
            for (let i = first; i < (first + this.rows); i++) {
                let node = data[i];
                if (node) {
                    this.serializedValue.push({
                        node: node,
                        parent: null,
                        level: 0,
                        visible: true
                    });
                    this.serializeNodes(node, node.children, 1, true);
                }
            }
        }
    }
    get totalRecords() {
        return this._totalRecords;
    }
    set totalRecords(val) {
        this._totalRecords = val;
        this.tableService.onTotalRecordsChange(this._totalRecords);
    }
    get sortField() {
        return this._sortField;
    }
    set sortField(val) {
        this._sortField = val;
    }
    get sortOrder() {
        return this._sortOrder;
    }
    set sortOrder(val) {
        this._sortOrder = val;
    }
    get multiSortMeta() {
        return this._multiSortMeta;
    }
    set multiSortMeta(val) {
        this._multiSortMeta = val;
    }
    get selection() {
        return this._selection;
    }
    set selection(val) {
        this._selection = val;
    }
    updateSelectionKeys() {
        if (this.dataKey && this._selection) {
            this.selectionKeys = {};
            if (Array.isArray(this._selection)) {
                for (let node of this._selection) {
                    this.selectionKeys[String(ObjectUtils.resolveFieldData(node.data, this.dataKey))] = 1;
                }
            }
            else {
                this.selectionKeys[String(ObjectUtils.resolveFieldData(this._selection.data, this.dataKey))] = 1;
            }
        }
    }
    onPageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
        if (this.lazy)
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        else
            this.serializePageNodes();
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
        this.tableService.onUIUpdate(this.value);
    }
    sort(event) {
        let originalEvent = event.originalEvent;
        if (this.sortMode === 'single') {
            this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            this.sortSingle();
        }
        if (this.sortMode === 'multiple') {
            let metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            let sortMeta = this.getSortMeta(event.field);
            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }];
                }
                else {
                    sortMeta.order = sortMeta.order * -1;
                }
            }
            else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];
                }
                this.multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }
            this.sortMultiple();
        }
    }
    sortSingle() {
        if (this.sortField && this.sortOrder) {
            if (this.resetPageOnSort) {
                this.first = 0;
            }
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                this.sortNodes(this.value);
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            let sortMeta = {
                field: this.sortField,
                order: this.sortOrder
            };
            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
            this.updateSerializedValue();
        }
    }
    sortNodes(nodes) {
        if (!nodes || nodes.length === 0) {
            return;
        }
        if (this.customSort) {
            this.sortFunction.emit({
                data: nodes,
                mode: this.sortMode,
                field: this.sortField,
                order: this.sortOrder
            });
        }
        else {
            nodes.sort((node1, node2) => {
                let value1 = ObjectUtils.resolveFieldData(node1.data, this.sortField);
                let value2 = ObjectUtils.resolveFieldData(node2.data, this.sortField);
                let result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2, undefined, { numeric: true });
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                return (this.sortOrder * result);
            });
        }
        for (let node of nodes) {
            this.sortNodes(node.children);
        }
    }
    sortMultiple() {
        if (this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                this.sortMultipleNodes(this.value);
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            this.onSort.emit({
                multisortmeta: this.multiSortMeta
            });
            this.tableService.onSort(this.multiSortMeta);
            this.updateSerializedValue();
        }
    }
    sortMultipleNodes(nodes) {
        if (!nodes || nodes.length === 0) {
            return;
        }
        if (this.customSort) {
            this.sortFunction.emit({
                data: this.value,
                mode: this.sortMode,
                multiSortMeta: this.multiSortMeta
            });
        }
        else {
            this.value.sort((node1, node2) => {
                return this.multisortField(node1, node2, this.multiSortMeta, 0);
            });
        }
        for (let node of nodes) {
            this.sortMultipleNodes(node.children);
        }
    }
    multisortField(node1, node2, multiSortMeta, index) {
        let value1 = ObjectUtils.resolveFieldData(node1.data, multiSortMeta[index].field);
        let value2 = ObjectUtils.resolveFieldData(node2.data, multiSortMeta[index].field);
        let result = null;
        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        if (typeof value1 == 'string' || value1 instanceof String) {
            if (value1.localeCompare && (value1 != value2)) {
                return (multiSortMeta[index].order * value1.localeCompare(value2, undefined, { numeric: true }));
            }
        }
        else {
            result = (value1 < value2) ? -1 : 1;
        }
        if (value1 == value2) {
            return (multiSortMeta.length - 1) > (index) ? (this.multisortField(node1, node2, multiSortMeta, index + 1)) : 0;
        }
        return (multiSortMeta[index].order * result);
    }
    getSortMeta(field) {
        if (this.multiSortMeta && this.multiSortMeta.length) {
            for (let i = 0; i < this.multiSortMeta.length; i++) {
                if (this.multiSortMeta[i].field === field) {
                    return this.multiSortMeta[i];
                }
            }
        }
        return null;
    }
    isSorted(field) {
        if (this.sortMode === 'single') {
            return (this.sortField && this.sortField === field);
        }
        else if (this.sortMode === 'multiple') {
            let sorted = false;
            if (this.multiSortMeta) {
                for (let i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    }
    createLazyLoadMetadata() {
        return {
            first: this.first,
            rows: this.virtualScroll ? this.rows * 2 : this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this.multiSortMeta
        };
    }
    handleVirtualScroll(event) {
        this.first = (event.page - 1) * this.rows;
        this.virtualScrollCallback = event.callback;
        this.zone.run(() => {
            if (this.virtualScrollTimer) {
                clearTimeout(this.virtualScrollTimer);
            }
            this.virtualScrollTimer = setTimeout(() => {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }, this.virtualScrollDelay);
        });
    }
    isEmpty() {
        let data = this.filteredNodes || this.value;
        return data == null || data.length == 0;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    onColumnResizeBegin(event) {
        let containerLeft = DomHandler.getOffset(this.containerViewChild.nativeElement).left;
        this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
        event.preventDefault();
    }
    onColumnResize(event) {
        let containerLeft = DomHandler.getOffset(this.containerViewChild.nativeElement).left;
        DomHandler.addClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
        this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
        this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';
        this.resizeHelperViewChild.nativeElement.style.display = 'block';
    }
    onColumnResizeEnd(event, column) {
        let delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
        let columnWidth = column.offsetWidth;
        let newColumnWidth = columnWidth + delta;
        let minWidth = column.style.minWidth || 15;
        if (columnWidth + delta > parseInt(minWidth)) {
            if (this.columnResizeMode === 'fit') {
                let nextColumn = column.nextElementSibling;
                while (!nextColumn.offsetParent) {
                    nextColumn = nextColumn.nextElementSibling;
                }
                if (nextColumn) {
                    let nextColumnWidth = nextColumn.offsetWidth - delta;
                    let nextColumnMinWidth = nextColumn.style.minWidth || 15;
                    if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                        if (this.scrollable) {
                            let scrollableView = this.findParentScrollableView(column);
                            let scrollableBodyTable = DomHandler.findSingle(scrollableView, 'table.ui-treetable-scrollable-body-table');
                            let scrollableHeaderTable = DomHandler.findSingle(scrollableView, 'table.ui-treetable-scrollable-header-table');
                            let scrollableFooterTable = DomHandler.findSingle(scrollableView, 'table.ui-treetable-scrollable-footer-table');
                            let resizeColumnIndex = DomHandler.index(column);
                            this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                            this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, nextColumnWidth);
                        }
                        else {
                            column.style.width = newColumnWidth + 'px';
                            if (nextColumn) {
                                nextColumn.style.width = nextColumnWidth + 'px';
                            }
                        }
                    }
                }
            }
            else if (this.columnResizeMode === 'expand') {
                if (this.scrollable) {
                    let scrollableView = this.findParentScrollableView(column);
                    let scrollableBodyTable = DomHandler.findSingle(scrollableView, 'table.ui-treetable-scrollable-body-table');
                    let scrollableHeaderTable = DomHandler.findSingle(scrollableView, 'table.ui-treetable-scrollable-header-table');
                    let scrollableFooterTable = DomHandler.findSingle(scrollableView, 'table.ui-treetable-scrollable-footer-table');
                    scrollableBodyTable.style.width = scrollableBodyTable.offsetWidth + delta + 'px';
                    scrollableHeaderTable.style.width = scrollableHeaderTable.offsetWidth + delta + 'px';
                    if (scrollableFooterTable) {
                        scrollableFooterTable.style.width = scrollableFooterTable.offsetWidth + delta + 'px';
                    }
                    let resizeColumnIndex = DomHandler.index(column);
                    this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
                    this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
                }
                else {
                    this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
                    column.style.width = newColumnWidth + 'px';
                    let containerWidth = this.tableViewChild.nativeElement.style.width;
                    this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
                }
            }
            this.onColResize.emit({
                element: column,
                delta: delta
            });
        }
        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        DomHandler.removeClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
    }
    findParentScrollableView(column) {
        if (column) {
            let parent = column.parentElement;
            while (parent && !DomHandler.hasClass(parent, 'ui-treetable-scrollable-view')) {
                parent = parent.parentElement;
            }
            return parent;
        }
        else {
            return null;
        }
    }
    resizeColGroup(table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
        if (table) {
            let colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;
            if (colGroup) {
                let col = colGroup.children[resizeColumnIndex];
                let nextCol = col.nextElementSibling;
                col.style.width = newColumnWidth + 'px';
                if (nextCol && nextColumnWidth) {
                    nextCol.style.width = nextColumnWidth + 'px';
                }
            }
            else {
                throw "Scrollable tables require a colgroup to support resizable columns";
            }
        }
    }
    onColumnDragStart(event, columnElement) {
        this.reorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
        this.reorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b'); // For firefox
    }
    onColumnDragEnter(event, dropHeader) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            let containerOffset = DomHandler.getOffset(this.containerViewChild.nativeElement);
            let dropHeaderOffset = DomHandler.getOffset(dropHeader);
            if (this.draggedColumn != dropHeader) {
                let targetLeft = dropHeaderOffset.left - containerOffset.left;
                let targetTop = containerOffset.top - dropHeaderOffset.top;
                let columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
                this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
                this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = (targetLeft - Math.ceil(this.reorderIconWidth / 2)) + 'px';
                    this.dropPosition = -1;
                }
                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
            }
            else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    }
    onColumnDragLeave(event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
        }
    }
    onColumnDrop(event, dropColumn) {
        event.preventDefault();
        if (this.draggedColumn) {
            let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'ttreorderablecolumn');
            let dropIndex = DomHandler.indexWithinGroup(dropColumn, 'ttreorderablecolumn');
            let allowDrop = (dragIndex != dropIndex);
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }
            if (allowDrop && ((dropIndex < dragIndex && this.dropPosition === 1))) {
                dropIndex = dropIndex + 1;
            }
            if (allowDrop && ((dropIndex > dragIndex && this.dropPosition === -1))) {
                dropIndex = dropIndex - 1;
            }
            if (allowDrop) {
                ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
            }
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    }
    handleRowClick(event) {
        let targetNode = event.originalEvent.target.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || (DomHandler.hasClass(event.originalEvent.target, 'ui-clickable'))) {
            return;
        }
        if (this.selectionMode) {
            this.preventSelectionSetterPropagation = true;
            let rowNode = event.rowNode;
            let selected = this.isSelected(rowNode.node);
            let metaSelection = this.rowTouched ? false : this.metaKeySelection;
            let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowNode.node.data, this.dataKey)) : null;
            if (metaSelection) {
                let metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                if (selected && metaKey) {
                    if (this.isSingleSelectionMode()) {
                        this._selection = null;
                        this.selectionKeys = {};
                        this.selectionChange.emit(null);
                    }
                    else {
                        let selectionIndex = this.findIndexInSelection(rowNode.node);
                        this._selection = this.selection.filter((val, i) => i != selectionIndex);
                        this.selectionChange.emit(this.selection);
                        if (dataKeyValue) {
                            delete this.selectionKeys[dataKeyValue];
                        }
                    }
                    this.onNodeUnselect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row' });
                }
                else {
                    if (this.isSingleSelectionMode()) {
                        this._selection = rowNode.node;
                        this.selectionChange.emit(rowNode.node);
                        if (dataKeyValue) {
                            this.selectionKeys = {};
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                    else if (this.isMultipleSelectionMode()) {
                        if (metaKey) {
                            this._selection = this.selection || [];
                        }
                        else {
                            this._selection = [];
                            this.selectionKeys = {};
                        }
                        this._selection = [...this.selection, rowNode.node];
                        this.selectionChange.emit(this.selection);
                        if (dataKeyValue) {
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                    this.onNodeSelect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row', index: event.rowIndex });
                }
            }
            else {
                if (this.selectionMode === 'single') {
                    if (selected) {
                        this._selection = null;
                        this.selectionKeys = {};
                        this.selectionChange.emit(this.selection);
                        this.onNodeUnselect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row' });
                    }
                    else {
                        this._selection = rowNode.node;
                        this.selectionChange.emit(this.selection);
                        this.onNodeSelect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row', index: event.rowIndex });
                        if (dataKeyValue) {
                            this.selectionKeys = {};
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                }
                else if (this.selectionMode === 'multiple') {
                    if (selected) {
                        let selectionIndex = this.findIndexInSelection(rowNode.node);
                        this._selection = this.selection.filter((val, i) => i != selectionIndex);
                        this.selectionChange.emit(this.selection);
                        this.onNodeUnselect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row' });
                        if (dataKeyValue) {
                            delete this.selectionKeys[dataKeyValue];
                        }
                    }
                    else {
                        this._selection = this.selection ? [...this.selection, rowNode.node] : [rowNode.node];
                        this.selectionChange.emit(this.selection);
                        this.onNodeSelect.emit({ originalEvent: event.originalEvent, node: rowNode.node, type: 'row', index: event.rowIndex });
                        if (dataKeyValue) {
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                }
            }
            this.tableService.onSelectionChange();
        }
        this.rowTouched = false;
    }
    handleRowTouchEnd(event) {
        this.rowTouched = true;
    }
    handleRowRightClick(event) {
        if (this.contextMenu) {
            const node = event.rowNode.node;
            if (this.contextMenuSelectionMode === 'separate') {
                this.contextMenuSelection = node;
                this.contextMenuSelectionChange.emit(node);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, node: node });
                this.contextMenu.show(event.originalEvent);
                this.tableService.onContextMenu(node);
            }
            else if (this.contextMenuSelectionMode === 'joint') {
                this.preventSelectionSetterPropagation = true;
                let selected = this.isSelected(node);
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(node.data, this.dataKey)) : null;
                if (!selected) {
                    if (this.isSingleSelectionMode()) {
                        this.selection = node;
                        this.selectionChange.emit(node);
                    }
                    else if (this.isMultipleSelectionMode()) {
                        this.selection = [node];
                        this.selectionChange.emit(this.selection);
                    }
                    if (dataKeyValue) {
                        this.selectionKeys[dataKeyValue] = 1;
                    }
                }
                this.contextMenu.show(event.originalEvent);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, node: node });
            }
        }
    }
    toggleNodeWithCheckbox(event) {
        this.selection = this.selection || [];
        this.preventSelectionSetterPropagation = true;
        let node = event.rowNode.node;
        let selected = this.isSelected(node);
        if (selected) {
            this.propagateSelectionDown(node, false);
            if (event.rowNode.parent) {
                this.propagateSelectionUp(node.parent, false);
            }
            this.selectionChange.emit(this.selection);
            this.onNodeUnselect.emit({ originalEvent: event, node: node });
        }
        else {
            this.propagateSelectionDown(node, true);
            if (event.rowNode.parent) {
                this.propagateSelectionUp(node.parent, true);
            }
            this.selectionChange.emit(this.selection);
            this.onNodeSelect.emit({ originalEvent: event, node: node });
        }
        this.tableService.onSelectionChange();
    }
    toggleNodesWithCheckbox(event, check) {
        let data = this.filteredNodes || this.value;
        this._selection = check && data ? data.slice() : [];
        if (check) {
            if (data && data.length) {
                for (let node of data) {
                    this.propagateSelectionDown(node, true);
                }
            }
        }
        else {
            this._selection = [];
            this.selectionKeys = {};
        }
        this.preventSelectionSetterPropagation = true;
        this.selectionChange.emit(this._selection);
        this.tableService.onSelectionChange();
        this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
    }
    propagateSelectionUp(node, select) {
        if (node.children && node.children.length) {
            let selectedChildCount = 0;
            let childPartialSelected = false;
            let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(node.data, this.dataKey)) : null;
            for (let child of node.children) {
                if (this.isSelected(child))
                    selectedChildCount++;
                else if (child.partialSelected)
                    childPartialSelected = true;
            }
            if (select && selectedChildCount == node.children.length) {
                this._selection = [...this.selection || [], node];
                node.partialSelected = false;
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
            }
            else {
                if (!select) {
                    let index = this.findIndexInSelection(node);
                    if (index >= 0) {
                        this._selection = this.selection.filter((val, i) => i != index);
                        if (dataKeyValue) {
                            delete this.selectionKeys[dataKeyValue];
                        }
                    }
                }
                if (childPartialSelected || selectedChildCount > 0 && selectedChildCount != node.children.length)
                    node.partialSelected = true;
                else
                    node.partialSelected = false;
            }
        }
        let parent = node.parent;
        if (parent) {
            this.propagateSelectionUp(parent, select);
        }
    }
    propagateSelectionDown(node, select) {
        let index = this.findIndexInSelection(node);
        let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(node.data, this.dataKey)) : null;
        if (select && index == -1) {
            this._selection = [...this.selection || [], node];
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }
        else if (!select && index > -1) {
            this._selection = this.selection.filter((val, i) => i != index);
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        }
        node.partialSelected = false;
        if (node.children && node.children.length) {
            for (let child of node.children) {
                this.propagateSelectionDown(child, select);
            }
        }
    }
    isSelected(node) {
        if (node && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[ObjectUtils.resolveFieldData(node.data, this.dataKey)] !== undefined;
            }
            else {
                if (this.selection instanceof Array)
                    return this.findIndexInSelection(node) > -1;
                else
                    return this.equals(node, this.selection);
            }
        }
        return false;
    }
    findIndexInSelection(node) {
        let index = -1;
        if (this.selection && this.selection.length) {
            for (let i = 0; i < this.selection.length; i++) {
                if (this.equals(node, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    isSingleSelectionMode() {
        return this.selectionMode === 'single';
    }
    isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
    }
    equals(node1, node2) {
        return this.compareSelectionBy === 'equals' ? (node1 === node2) : ObjectUtils.equals(node1.data, node2.data, this.dataKey);
    }
    filter(value, field, matchMode) {
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        if (!this.isFilterBlank(value)) {
            this.filters[field] = { value: value, matchMode: matchMode };
        }
        else if (this.filters[field]) {
            delete this.filters[field];
        }
        this.filterTimeout = setTimeout(() => {
            this._filter();
            this.filterTimeout = null;
        }, this.filterDelay);
    }
    filterGlobal(value, matchMode) {
        this.filter(value, 'global', matchMode);
    }
    isFilterBlank(filter) {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                return true;
            else
                return false;
        }
        return true;
    }
    _filter() {
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (!this.value) {
                return;
            }
            if (!this.hasFilter()) {
                this.filteredNodes = null;
                if (this.paginator) {
                    this.totalRecords = this.value ? this.value.length : 0;
                }
            }
            else {
                let globalFilterFieldsArray;
                if (this.filters['global']) {
                    if (!this.columns && !this.globalFilterFields)
                        throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    else
                        globalFilterFieldsArray = this.globalFilterFields || this.columns;
                }
                this.filteredNodes = [];
                const isStrictMode = this.filterMode === 'strict';
                let isValueChanged = false;
                for (let node of this.value) {
                    let copyNode = Object.assign({}, node);
                    let localMatch = true;
                    let globalMatch = false;
                    let paramsWithoutNode;
                    for (let prop in this.filters) {
                        if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                            let filterMeta = this.filters[prop];
                            let filterField = prop;
                            let filterValue = filterMeta.value;
                            let filterMatchMode = filterMeta.matchMode || 'startsWith';
                            let filterConstraint = FilterUtils[filterMatchMode];
                            paramsWithoutNode = { filterField, filterValue, filterConstraint, isStrictMode };
                            if ((isStrictMode && !(this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode))) ||
                                (!isStrictMode && !(this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode)))) {
                                localMatch = false;
                            }
                            if (!localMatch) {
                                break;
                            }
                        }
                    }
                    if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                        for (let j = 0; j < globalFilterFieldsArray.length; j++) {
                            let copyNodeForGlobal = Object.assign({}, copyNode);
                            let filterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                            let filterValue = this.filters['global'].value;
                            let filterConstraint = FilterUtils[this.filters['global'].matchMode];
                            paramsWithoutNode = { filterField, filterValue, filterConstraint, isStrictMode };
                            if ((isStrictMode && (this.findFilteredNodes(copyNodeForGlobal, paramsWithoutNode) || this.isFilterMatched(copyNodeForGlobal, paramsWithoutNode))) ||
                                (!isStrictMode && (this.isFilterMatched(copyNodeForGlobal, paramsWithoutNode) || this.findFilteredNodes(copyNodeForGlobal, paramsWithoutNode)))) {
                                globalMatch = true;
                                copyNode = copyNodeForGlobal;
                            }
                        }
                    }
                    let matches = localMatch;
                    if (this.filters['global']) {
                        matches = localMatch && globalMatch;
                    }
                    if (matches) {
                        this.filteredNodes.push(copyNode);
                    }
                    isValueChanged = isValueChanged || !localMatch || globalMatch || (localMatch && this.filteredNodes.length > 0) || (!globalMatch && this.filteredNodes.length === 0);
                }
                if (!isValueChanged) {
                    this.filteredNodes = null;
                }
                if (this.paginator) {
                    this.totalRecords = this.filteredNodes ? this.filteredNodes.length : this.value ? this.value.length : 0;
                }
            }
        }
        this.first = 0;
        const filteredValue = this.filteredNodes || this.value;
        this.onFilter.emit({
            filters: this.filters,
            filteredValue: filteredValue
        });
        this.tableService.onUIUpdate(filteredValue);
        this.updateSerializedValue();
    }
    findFilteredNodes(node, paramsWithoutNode) {
        if (node) {
            let matched = false;
            if (node.children) {
                let childNodes = [...node.children];
                node.children = [];
                for (let childNode of childNodes) {
                    let copyChildNode = Object.assign({}, childNode);
                    if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                        matched = true;
                        node.children.push(copyChildNode);
                    }
                }
            }
            if (matched) {
                return true;
            }
        }
    }
    isFilterMatched(node, { filterField, filterValue, filterConstraint, isStrictMode }) {
        let matched = false;
        let dataFieldValue = ObjectUtils.resolveFieldData(node.data, filterField);
        if (filterConstraint(dataFieldValue, filterValue)) {
            matched = true;
        }
        if (!matched || (isStrictMode && !this.isNodeLeaf(node))) {
            matched = this.findFilteredNodes(node, { filterField, filterValue, filterConstraint, isStrictMode }) || matched;
        }
        return matched;
    }
    isNodeLeaf(node) {
        return node.leaf === false ? false : !(node.children && node.children.length);
    }
    hasFilter() {
        let empty = true;
        for (let prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }
        return !empty;
    }
    reset() {
        this._sortField = null;
        this._sortOrder = 1;
        this._multiSortMeta = null;
        this.tableService.onSort(null);
        this.filteredNodes = null;
        this.filters = {};
        this.first = 0;
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.totalRecords = (this._value ? this._value.length : 0);
        }
    }
    updateEditingCell(cell) {
        this.editingCell = cell;
        this.bindDocumentEditListener();
    }
    isEditingCellValid() {
        return (this.editingCell && DomHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0);
    }
    bindDocumentEditListener() {
        if (!this.documentEditListener) {
            this.documentEditListener = (event) => {
                if (this.editingCell && !this.editingCellClick && this.isEditingCellValid()) {
                    DomHandler.removeClass(this.editingCell, 'ui-editing-cell');
                    this.editingCell = null;
                    this.unbindDocumentEditListener();
                }
                this.editingCellClick = false;
            };
            document.addEventListener('click', this.documentEditListener);
        }
    }
    unbindDocumentEditListener() {
        if (this.documentEditListener) {
            document.removeEventListener('click', this.documentEditListener);
            this.documentEditListener = null;
        }
    }
    ngOnDestroy() {
        this.unbindDocumentEditListener();
        this.editingCell = null;
        this.initialized = null;
    }
};
TreeTable.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: TreeTableService }
];
__decorate([
    Input()
], TreeTable.prototype, "columns", void 0);
__decorate([
    Input()
], TreeTable.prototype, "style", void 0);
__decorate([
    Input()
], TreeTable.prototype, "styleClass", void 0);
__decorate([
    Input()
], TreeTable.prototype, "autoLayout", void 0);
__decorate([
    Input()
], TreeTable.prototype, "lazy", void 0);
__decorate([
    Input()
], TreeTable.prototype, "paginator", void 0);
__decorate([
    Input()
], TreeTable.prototype, "rows", void 0);
__decorate([
    Input()
], TreeTable.prototype, "first", void 0);
__decorate([
    Input()
], TreeTable.prototype, "pageLinks", void 0);
__decorate([
    Input()
], TreeTable.prototype, "rowsPerPageOptions", void 0);
__decorate([
    Input()
], TreeTable.prototype, "alwaysShowPaginator", void 0);
__decorate([
    Input()
], TreeTable.prototype, "paginatorPosition", void 0);
__decorate([
    Input()
], TreeTable.prototype, "paginatorDropdownAppendTo", void 0);
__decorate([
    Input()
], TreeTable.prototype, "defaultSortOrder", void 0);
__decorate([
    Input()
], TreeTable.prototype, "sortMode", void 0);
__decorate([
    Input()
], TreeTable.prototype, "resetPageOnSort", void 0);
__decorate([
    Input()
], TreeTable.prototype, "customSort", void 0);
__decorate([
    Input()
], TreeTable.prototype, "selectionMode", void 0);
__decorate([
    Output()
], TreeTable.prototype, "selectionChange", void 0);
__decorate([
    Input()
], TreeTable.prototype, "contextMenuSelection", void 0);
__decorate([
    Output()
], TreeTable.prototype, "contextMenuSelectionChange", void 0);
__decorate([
    Input()
], TreeTable.prototype, "contextMenuSelectionMode", void 0);
__decorate([
    Input()
], TreeTable.prototype, "dataKey", void 0);
__decorate([
    Input()
], TreeTable.prototype, "metaKeySelection", void 0);
__decorate([
    Input()
], TreeTable.prototype, "compareSelectionBy", void 0);
__decorate([
    Input()
], TreeTable.prototype, "rowHover", void 0);
__decorate([
    Input()
], TreeTable.prototype, "loading", void 0);
__decorate([
    Input()
], TreeTable.prototype, "loadingIcon", void 0);
__decorate([
    Input()
], TreeTable.prototype, "showLoader", void 0);
__decorate([
    Input()
], TreeTable.prototype, "scrollable", void 0);
__decorate([
    Input()
], TreeTable.prototype, "scrollHeight", void 0);
__decorate([
    Input()
], TreeTable.prototype, "virtualScroll", void 0);
__decorate([
    Input()
], TreeTable.prototype, "virtualScrollDelay", void 0);
__decorate([
    Input()
], TreeTable.prototype, "virtualRowHeight", void 0);
__decorate([
    Input()
], TreeTable.prototype, "frozenWidth", void 0);
__decorate([
    Input()
], TreeTable.prototype, "frozenColumns", void 0);
__decorate([
    Input()
], TreeTable.prototype, "resizableColumns", void 0);
__decorate([
    Input()
], TreeTable.prototype, "columnResizeMode", void 0);
__decorate([
    Input()
], TreeTable.prototype, "reorderableColumns", void 0);
__decorate([
    Input()
], TreeTable.prototype, "contextMenu", void 0);
__decorate([
    Input()
], TreeTable.prototype, "rowTrackBy", void 0);
__decorate([
    Input()
], TreeTable.prototype, "filters", void 0);
__decorate([
    Input()
], TreeTable.prototype, "globalFilterFields", void 0);
__decorate([
    Input()
], TreeTable.prototype, "filterDelay", void 0);
__decorate([
    Input()
], TreeTable.prototype, "filterMode", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onFilter", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onNodeExpand", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onNodeCollapse", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onPage", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onSort", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onLazyLoad", void 0);
__decorate([
    Output()
], TreeTable.prototype, "sortFunction", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onColResize", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onColReorder", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onNodeSelect", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onNodeUnselect", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onContextMenuSelect", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onHeaderCheckboxToggle", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onEditInit", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onEditComplete", void 0);
__decorate([
    Output()
], TreeTable.prototype, "onEditCancel", void 0);
__decorate([
    ViewChild('container', { static: true })
], TreeTable.prototype, "containerViewChild", void 0);
__decorate([
    ViewChild('resizeHelper', { static: false })
], TreeTable.prototype, "resizeHelperViewChild", void 0);
__decorate([
    ViewChild('reorderIndicatorUp', { static: false })
], TreeTable.prototype, "reorderIndicatorUpViewChild", void 0);
__decorate([
    ViewChild('reorderIndicatorDown', { static: false })
], TreeTable.prototype, "reorderIndicatorDownViewChild", void 0);
__decorate([
    ViewChild('table', { static: false })
], TreeTable.prototype, "tableViewChild", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], TreeTable.prototype, "templates", void 0);
__decorate([
    Input()
], TreeTable.prototype, "value", null);
__decorate([
    Input()
], TreeTable.prototype, "totalRecords", null);
__decorate([
    Input()
], TreeTable.prototype, "sortField", null);
__decorate([
    Input()
], TreeTable.prototype, "sortOrder", null);
__decorate([
    Input()
], TreeTable.prototype, "multiSortMeta", null);
__decorate([
    Input()
], TreeTable.prototype, "selection", null);
TreeTable = __decorate([
    Component({
        selector: 'p-treeTable',
        template: `
        <div #container [ngStyle]="style" [class]="styleClass"
                [ngClass]="{'ui-treetable ui-widget': true, 'ui-treetable-auto-layout': autoLayout, 'ui-treetable-hoverable-rows': (rowHover||(selectionMode === 'single' || selectionMode === 'multiple')),
                'ui-treetable-resizable': resizableColumns, 'ui-treetable-resizable-fit': (resizableColumns && columnResizeMode === 'fit')}">
            <div class="ui-treetable-loading ui-widget-overlay" *ngIf="loading && showLoader"></div>
            <div class="ui-treetable-loading-content" *ngIf="loading && showLoader">
                <i [class]="'ui-treetable-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <div *ngIf="captionTemplate" class="ui-treetable-caption ui-widget-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-top" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo"></p-paginator>
            
            <div class="ui-treetable-wrapper" *ngIf="!scrollable">
                <table #table class="ui-treetable-table">
                    <ng-container *ngTemplateOutlet="colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="ui-treetable-thead">
                        <ng-container *ngTemplateOutlet="headerTemplate; context: {$implicit: columns}"></ng-container>
                    </thead>
                    <tfoot class="ui-treetable-tfoot">
                        <ng-container *ngTemplateOutlet="footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                    <tbody class="ui-treetable-tbody" [pTreeTableBody]="columns" [pTreeTableBodyTemplate]="bodyTemplate"></tbody>
                </table>
            </div>

            <div class="ui-treetable-scrollable-wrapper" *ngIf="scrollable">
               <div class="ui-treetable-scrollable-view ui-treetable-frozen-view" *ngIf="frozenColumns||frozenBodyTemplate" [ttScrollableView]="frozenColumns" [frozen]="true" [ngStyle]="{width: frozenWidth}" [scrollHeight]="scrollHeight"></div>
               <div class="ui-treetable-scrollable-view" [ttScrollableView]="columns" [frozen]="false" [scrollHeight]="scrollHeight"></div>
            </div>

            <p-paginator [rows]="rows" [first]="first" [totalRecords]="totalRecords" [pageLinkSize]="pageLinks" styleClass="ui-paginator-bottom" [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)" [rowsPerPageOptions]="rowsPerPageOptions" *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')"
                [templateLeft]="paginatorLeftTemplate" [templateRight]="paginatorRightTemplate" [dropdownAppendTo]="paginatorDropdownAppendTo"></p-paginator>
            <div *ngIf="summaryTemplate" class="ui-treetable-summary ui-widget-header">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="ui-column-resizer-helper ui-state-highlight" style="display:none" *ngIf="resizableColumns"></div>

            <span #reorderIndicatorUp class="pi pi-arrow-down ui-table-reorder-indicator-up" *ngIf="reorderableColumns"></span>
            <span #reorderIndicatorDown class="pi pi-arrow-up ui-table-reorder-indicator-down" *ngIf="reorderableColumns"></span>
        </div>
    `,
        providers: [TreeTableService]
    })
], TreeTable);
export { TreeTable };
let TTBody = class TTBody {
    constructor(tt) {
        this.tt = tt;
    }
};
TTBody.ctorParameters = () => [
    { type: TreeTable }
];
__decorate([
    Input("pTreeTableBody")
], TTBody.prototype, "columns", void 0);
__decorate([
    Input("pTreeTableBodyTemplate")
], TTBody.prototype, "template", void 0);
TTBody = __decorate([
    Component({
        selector: '[pTreeTableBody]',
        template: `
        <ng-template ngFor let-serializedNode let-rowIndex="index" [ngForOf]="tt.serializedValue" [ngForTrackBy]="tt.rowTrackBy">
            <ng-container *ngIf="serializedNode.visible">
                <ng-container *ngTemplateOutlet="template; context: {$implicit: serializedNode, node: serializedNode.node, rowData: serializedNode.node.data, columns: columns}"></ng-container>
            </ng-container>
        </ng-template>
        <ng-container *ngIf="tt.isEmpty()">
            <ng-container *ngTemplateOutlet="tt.emptyMessageTemplate; context: {$implicit: columns}"></ng-container>
        </ng-container>
    `
    })
], TTBody);
export { TTBody };
let TTScrollableView = class TTScrollableView {
    constructor(tt, el, zone) {
        this.tt = tt;
        this.el = el;
        this.zone = zone;
        this.loadingArray = [];
        this.subscription = this.tt.tableService.uiUpdateSource$.subscribe(() => {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.alignScrollBar();
                    this.initialized = true;
                    if (this.scrollLoadingTableViewChild && this.scrollLoadingTableViewChild.nativeElement) {
                        this.scrollLoadingTableViewChild.nativeElement.style.display = 'none';
                    }
                }, 50);
            });
        });
        if (this.tt.virtualScroll) {
            this.totalRecordsSubscription = this.tt.tableService.totalRecordsSource$.subscribe(() => {
                this.zone.runOutsideAngular(() => {
                    setTimeout(() => {
                        this.setVirtualScrollerHeight();
                    }, 50);
                });
            });
        }
        this.loadingArray = Array(this.tt.rows).fill(1);
        this.initialized = false;
    }
    get scrollHeight() {
        return this._scrollHeight;
    }
    set scrollHeight(val) {
        this._scrollHeight = val;
        this.setScrollHeight();
    }
    ngAfterViewChecked() {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.alignScrollBar();
            this.initialized = true;
        }
    }
    ngAfterViewInit() {
        this.bindEvents();
        this.setScrollHeight();
        this.alignScrollBar();
        if (!this.frozen) {
            if (this.tt.frozenColumns || this.tt.frozenBodyTemplate) {
                DomHandler.addClass(this.el.nativeElement, 'ui-treetable-unfrozen-view');
            }
            if (this.tt.frozenWidth) {
                this.el.nativeElement.style.left = this.tt.frozenWidth;
                this.el.nativeElement.style.width = 'calc(100% - ' + this.tt.frozenWidth + ')';
            }
            let frozenView = this.el.nativeElement.previousElementSibling;
            if (frozenView) {
                this.frozenSiblingBody = DomHandler.findSingle(frozenView, '.ui-treetable-scrollable-body');
            }
        }
        else {
            this.scrollBodyViewChild.nativeElement.style.paddingBottom = DomHandler.calculateScrollbarWidth() + 'px';
        }
        if (this.tt.virtualScroll) {
            this.setVirtualScrollerHeight();
            if (this.scrollLoadingTableViewChild && this.scrollLoadingTableViewChild.nativeElement) {
                this.scrollLoadingTableViewChild.nativeElement.style.display = 'table';
            }
        }
    }
    bindEvents() {
        this.zone.runOutsideAngular(() => {
            let scrollBarWidth = DomHandler.calculateScrollbarWidth();
            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                this.headerScrollListener = this.onHeaderScroll.bind(this);
                this.scrollHeaderBoxViewChild.nativeElement.addEventListener('scroll', this.headerScrollListener);
            }
            if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                this.footerScrollListener = this.onFooterScroll.bind(this);
                this.scrollFooterViewChild.nativeElement.addEventListener('scroll', this.footerScrollListener);
            }
            if (!this.frozen) {
                this.bodyScrollListener = this.onBodyScroll.bind(this);
                this.scrollBodyViewChild.nativeElement.addEventListener('scroll', this.bodyScrollListener);
            }
        });
    }
    unbindEvents() {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.removeEventListener('scroll', this.headerScrollListener);
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterViewChild.nativeElement.removeEventListener('scroll', this.footerScrollListener);
        }
        this.scrollBodyViewChild.nativeElement.addEventListener('scroll', this.bodyScrollListener);
    }
    onHeaderScroll(event) {
        this.scrollHeaderViewChild.nativeElement.scrollLeft = 0;
    }
    onFooterScroll(event) {
        this.scrollFooterViewChild.nativeElement.scrollLeft = 0;
    }
    onBodyScroll(event) {
        if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
            this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }
        if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
            this.scrollFooterBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
        }
        if (this.frozenSiblingBody) {
            this.frozenSiblingBody.scrollTop = this.scrollBodyViewChild.nativeElement.scrollTop;
        }
        if (this.tt.virtualScroll) {
            let viewport = DomHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
            let tableHeight = DomHandler.getOuterHeight(this.scrollTableViewChild.nativeElement);
            let pageHeight = this.tt.virtualRowHeight * this.tt.rows;
            let virtualTableHeight = DomHandler.getOuterHeight(this.virtualScrollerViewChild.nativeElement);
            let pageCount = (virtualTableHeight / pageHeight) || 1;
            let scrollBodyTop = this.scrollTableViewChild.nativeElement.style.top || '0';
            if ((this.scrollBodyViewChild.nativeElement.scrollTop + viewport > parseFloat(scrollBodyTop) + tableHeight) || (this.scrollBodyViewChild.nativeElement.scrollTop < parseFloat(scrollBodyTop))) {
                if (this.scrollLoadingTableViewChild && this.scrollLoadingTableViewChild.nativeElement) {
                    this.scrollLoadingTableViewChild.nativeElement.style.display = 'table';
                    this.scrollLoadingTableViewChild.nativeElement.style.top = this.scrollBodyViewChild.nativeElement.scrollTop + 'px';
                }
                let page = Math.floor((this.scrollBodyViewChild.nativeElement.scrollTop * pageCount) / (this.scrollBodyViewChild.nativeElement.scrollHeight)) + 1;
                this.tt.handleVirtualScroll({
                    page: page,
                    callback: () => {
                        if (this.scrollLoadingTableViewChild && this.scrollLoadingTableViewChild.nativeElement) {
                            this.scrollLoadingTableViewChild.nativeElement.style.display = 'none';
                        }
                        this.scrollTableViewChild.nativeElement.style.top = ((page - 1) * pageHeight) + 'px';
                        if (this.frozenSiblingBody) {
                            this.frozenSiblingBody.children[0].style.top = this.scrollTableViewChild.nativeElement.style.top;
                        }
                    }
                });
            }
        }
    }
    setScrollHeight() {
        if (this.scrollHeight && this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
            if (this.scrollHeight.indexOf('%') !== -1) {
                let relativeHeight;
                this.scrollBodyViewChild.nativeElement.style.visibility = 'hidden';
                this.scrollBodyViewChild.nativeElement.style.height = '100px'; //temporary height to calculate static height
                let containerHeight = DomHandler.getOuterHeight(this.tt.el.nativeElement.children[0]);
                if (this.scrollHeight.includes("calc")) {
                    let percentHeight = parseInt(this.scrollHeight.slice(this.scrollHeight.indexOf("(") + 1, this.scrollHeight.indexOf("%")));
                    let diffValue = parseInt(this.scrollHeight.slice(this.scrollHeight.indexOf("-") + 1, this.scrollHeight.indexOf(")")));
                    relativeHeight = (DomHandler.getOuterHeight(this.tt.el.nativeElement.parentElement) * percentHeight / 100) - diffValue;
                }
                else {
                    relativeHeight = DomHandler.getOuterHeight(this.tt.el.nativeElement.parentElement) * parseInt(this.scrollHeight) / 100;
                }
                let staticHeight = containerHeight - 100; //total height of headers, footers, paginators
                let scrollBodyHeight = (relativeHeight - staticHeight);
                if (this.frozen) {
                    scrollBodyHeight -= DomHandler.calculateScrollbarWidth();
                }
                this.scrollBodyViewChild.nativeElement.style.height = 'auto';
                this.scrollBodyViewChild.nativeElement.style.maxHeight = scrollBodyHeight + 'px';
                this.scrollBodyViewChild.nativeElement.style.visibility = 'visible';
            }
            else {
                if (this.frozen)
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = (parseInt(this.scrollHeight) - DomHandler.calculateScrollbarWidth()) + 'px';
                else
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = this.scrollHeight;
            }
        }
    }
    setVirtualScrollerHeight() {
        if (this.virtualScrollerViewChild.nativeElement) {
            this.virtualScrollerViewChild.nativeElement.style.height = this.tt.totalRecords * this.tt.virtualRowHeight + 'px';
        }
    }
    hasVerticalOverflow() {
        return DomHandler.getOuterHeight(this.scrollTableViewChild.nativeElement) > DomHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
    }
    alignScrollBar() {
        if (!this.frozen) {
            let scrollBarWidth = this.hasVerticalOverflow() ? DomHandler.calculateScrollbarWidth() : 0;
            this.scrollHeaderBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            if (this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                this.scrollFooterBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
            }
        }
        this.initialized = false;
    }
    ngOnDestroy() {
        this.unbindEvents();
        this.frozenSiblingBody = null;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.totalRecordsSubscription) {
            this.totalRecordsSubscription.unsubscribe();
        }
        this.initialized = false;
    }
};
TTScrollableView.ctorParameters = () => [
    { type: TreeTable },
    { type: ElementRef },
    { type: NgZone }
];
__decorate([
    Input("ttScrollableView")
], TTScrollableView.prototype, "columns", void 0);
__decorate([
    Input()
], TTScrollableView.prototype, "frozen", void 0);
__decorate([
    ViewChild('scrollHeader', { static: true })
], TTScrollableView.prototype, "scrollHeaderViewChild", void 0);
__decorate([
    ViewChild('scrollHeaderBox', { static: true })
], TTScrollableView.prototype, "scrollHeaderBoxViewChild", void 0);
__decorate([
    ViewChild('scrollBody', { static: true })
], TTScrollableView.prototype, "scrollBodyViewChild", void 0);
__decorate([
    ViewChild('scrollTable', { static: true })
], TTScrollableView.prototype, "scrollTableViewChild", void 0);
__decorate([
    ViewChild('loadingTable', { static: false })
], TTScrollableView.prototype, "scrollLoadingTableViewChild", void 0);
__decorate([
    ViewChild('scrollFooter', { static: true })
], TTScrollableView.prototype, "scrollFooterViewChild", void 0);
__decorate([
    ViewChild('scrollFooterBox', { static: true })
], TTScrollableView.prototype, "scrollFooterBoxViewChild", void 0);
__decorate([
    ViewChild('virtualScroller', { static: false })
], TTScrollableView.prototype, "virtualScrollerViewChild", void 0);
__decorate([
    Input()
], TTScrollableView.prototype, "scrollHeight", null);
TTScrollableView = __decorate([
    Component({
        selector: '[ttScrollableView]',
        template: `
        <div #scrollHeader class="ui-treetable-scrollable-header ui-widget-header">
            <div #scrollHeaderBox class="ui-treetable-scrollable-header-box">
                <table class="ui-treetable-scrollable-header-table">
                    <ng-container *ngTemplateOutlet="frozen ? tt.frozenColGroupTemplate||tt.colGroupTemplate : tt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <thead class="ui-treetable-thead">
                        <ng-container *ngTemplateOutlet="frozen ? tt.frozenHeaderTemplate||tt.headerTemplate : tt.headerTemplate; context {$implicit: columns}"></ng-container>
                    </thead>
                </table>
            </div>
        </div>
        <div #scrollBody class="ui-treetable-scrollable-body">
            <table #scrollTable [ngClass]="{'ui-treetable-scrollable-body-table': true, 'ui-treetable-virtual-table': tt.virtualScroll}">
                <ng-container *ngTemplateOutlet="frozen ? tt.frozenColGroupTemplate||tt.colGroupTemplate : tt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                <tbody class="ui-treetable-tbody" [pTreeTableBody]="columns" [pTreeTableBodyTemplate]="frozen ? tt.frozenBodyTemplate||tt.bodyTemplate : tt.bodyTemplate"></tbody>
            </table>
            <table #loadingTable *ngIf="tt.virtualScroll && tt.loadingBodyTemplate != null" [ngClass]="{'ui-treetable-scrollable-body-table ui-treetable-loading-virtual-table': true, 'ui-treetable-virtual-table': tt.virtualScroll}">
                <tbody class="ui-treetable-tbody">
                    <ng-template ngFor [ngForOf]="loadingArray">
                        <ng-container *ngTemplateOutlet="tt.loadingBodyTemplate; context: {columns: columns}"></ng-container>
                    </ng-template>
                </tbody>
            </table>
            <div #virtualScroller class="ui-treetable-virtual-scroller" *ngIf="tt.virtualScroll"></div>
        </div>
        <div #scrollFooter *ngIf="tt.footerTemplate" class="ui-treetable-scrollable-footer ui-widget-header">
            <div #scrollFooterBox class="ui-treetable-scrollable-footer-box">
                <table class="ui-treetable-scrollable-footer-table">
                    <ng-container *ngTemplateOutlet="frozen ? tt.frozenColGroupTemplate||tt.colGroupTemplate : tt.colGroupTemplate; context {$implicit: columns}"></ng-container>
                    <tfoot class="ui-treetable-tfoot">
                        <ng-container *ngTemplateOutlet="frozen ? tt.frozenFooterTemplate||tt.footerTemplate : tt.footerTemplate; context {$implicit: columns}"></ng-container>
                    </tfoot>
                </table>
            </div>
        </div>
    `
    })
], TTScrollableView);
export { TTScrollableView };
let TTSortableColumn = class TTSortableColumn {
    constructor(tt) {
        this.tt = tt;
        if (this.isEnabled()) {
            this.subscription = this.tt.tableService.sortSource$.subscribe(sortMeta => {
                this.updateSortState();
            });
        }
    }
    ngOnInit() {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    }
    updateSortState() {
        this.sorted = this.tt.isSorted(this.field);
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.updateSortState();
            this.tt.sort({
                originalEvent: event,
                field: this.field
            });
            DomHandler.clearSelection();
        }
    }
    onEnterKey(event) {
        this.onClick(event);
    }
    isEnabled() {
        return this.ttSortableColumnDisabled !== true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
};
TTSortableColumn.ctorParameters = () => [
    { type: TreeTable }
];
__decorate([
    Input("ttSortableColumn")
], TTSortableColumn.prototype, "field", void 0);
__decorate([
    Input()
], TTSortableColumn.prototype, "ttSortableColumnDisabled", void 0);
__decorate([
    HostListener('click', ['$event'])
], TTSortableColumn.prototype, "onClick", null);
__decorate([
    HostListener('keydown.enter', ['$event'])
], TTSortableColumn.prototype, "onEnterKey", null);
TTSortableColumn = __decorate([
    Directive({
        selector: '[ttSortableColumn]',
        host: {
            '[class.ui-sortable-column]': 'isEnabled()',
            '[class.ui-state-highlight]': 'sorted',
            '[attr.tabindex]': 'isEnabled() ? "0" : null'
        }
    })
], TTSortableColumn);
export { TTSortableColumn };
let TTSortIcon = class TTSortIcon {
    constructor(tt) {
        this.tt = tt;
        this.subscription = this.tt.tableService.sortSource$.subscribe(sortMeta => {
            this.updateSortState();
        });
    }
    ngOnInit() {
        this.updateSortState();
    }
    onClick(event) {
        event.preventDefault();
    }
    updateSortState() {
        if (this.tt.sortMode === 'single') {
            this.sortOrder = this.tt.isSorted(this.field) ? this.tt.sortOrder : 0;
        }
        else if (this.tt.sortMode === 'multiple') {
            let sortMeta = this.tt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
};
TTSortIcon.ctorParameters = () => [
    { type: TreeTable }
];
__decorate([
    Input()
], TTSortIcon.prototype, "field", void 0);
__decorate([
    Input()
], TTSortIcon.prototype, "ariaLabelDesc", void 0);
__decorate([
    Input()
], TTSortIcon.prototype, "ariaLabelAsc", void 0);
TTSortIcon = __decorate([
    Component({
        selector: 'p-treeTableSortIcon',
        template: `
        <i class="ui-sortable-column-icon pi pi-fw" [ngClass]="{'pi-sort-up': sortOrder === 1, 'pi-sort-down': sortOrder === -1, 'pi-sort': sortOrder === 0}"></i>
    `
    })
], TTSortIcon);
export { TTSortIcon };
let TTResizableColumn = class TTResizableColumn {
    constructor(tt, el, zone) {
        this.tt = tt;
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'ui-resizable-column');
            this.resizer = document.createElement('span');
            this.resizer.className = 'ui-column-resizer ui-clickable';
            this.el.nativeElement.appendChild(this.resizer);
            this.zone.runOutsideAngular(() => {
                this.resizerMouseDownListener = this.onMouseDown.bind(this);
                this.resizer.addEventListener('mousedown', this.resizerMouseDownListener);
            });
        }
    }
    bindDocumentEvents() {
        this.zone.runOutsideAngular(() => {
            this.documentMouseMoveListener = this.onDocumentMouseMove.bind(this);
            document.addEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseUpListener = this.onDocumentMouseUp.bind(this);
            document.addEventListener('mouseup', this.documentMouseUpListener);
        });
    }
    unbindDocumentEvents() {
        if (this.documentMouseMoveListener) {
            document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
        }
        if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
        }
    }
    onMouseDown(event) {
        this.tt.onColumnResizeBegin(event);
        this.bindDocumentEvents();
    }
    onDocumentMouseMove(event) {
        this.tt.onColumnResize(event);
    }
    onDocumentMouseUp(event) {
        this.tt.onColumnResizeEnd(event, this.el.nativeElement);
        this.unbindDocumentEvents();
    }
    isEnabled() {
        return this.ttResizableColumnDisabled !== true;
    }
    ngOnDestroy() {
        if (this.resizerMouseDownListener) {
            this.resizer.removeEventListener('mousedown', this.resizerMouseDownListener);
        }
        this.unbindDocumentEvents();
    }
};
TTResizableColumn.ctorParameters = () => [
    { type: TreeTable },
    { type: ElementRef },
    { type: NgZone }
];
__decorate([
    Input()
], TTResizableColumn.prototype, "ttResizableColumnDisabled", void 0);
TTResizableColumn = __decorate([
    Directive({
        selector: '[ttResizableColumn]'
    })
], TTResizableColumn);
export { TTResizableColumn };
let TTReorderableColumn = class TTReorderableColumn {
    constructor(tt, el, zone) {
        this.tt = tt;
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    }
    bindEvents() {
        this.zone.runOutsideAngular(() => {
            this.mouseDownListener = this.onMouseDown.bind(this);
            this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);
            this.dragStartListener = this.onDragStart.bind(this);
            this.el.nativeElement.addEventListener('dragstart', this.dragStartListener);
            this.dragOverListener = this.onDragEnter.bind(this);
            this.el.nativeElement.addEventListener('dragover', this.dragOverListener);
            this.dragEnterListener = this.onDragEnter.bind(this);
            this.el.nativeElement.addEventListener('dragenter', this.dragEnterListener);
            this.dragLeaveListener = this.onDragLeave.bind(this);
            this.el.nativeElement.addEventListener('dragleave', this.dragLeaveListener);
        });
    }
    unbindEvents() {
        if (this.mouseDownListener) {
            document.removeEventListener('mousedown', this.mouseDownListener);
            this.mouseDownListener = null;
        }
        if (this.dragOverListener) {
            document.removeEventListener('dragover', this.dragOverListener);
            this.dragOverListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragEnterListener) {
            document.removeEventListener('dragenter', this.dragEnterListener);
            this.dragEnterListener = null;
        }
        if (this.dragLeaveListener) {
            document.removeEventListener('dragleave', this.dragLeaveListener);
            this.dragLeaveListener = null;
        }
    }
    onMouseDown(event) {
        if (event.target.nodeName === 'INPUT' || DomHandler.hasClass(event.target, 'ui-column-resizer'))
            this.el.nativeElement.draggable = false;
        else
            this.el.nativeElement.draggable = true;
    }
    onDragStart(event) {
        this.tt.onColumnDragStart(event, this.el.nativeElement);
    }
    onDragOver(event) {
        event.preventDefault();
    }
    onDragEnter(event) {
        this.tt.onColumnDragEnter(event, this.el.nativeElement);
    }
    onDragLeave(event) {
        this.tt.onColumnDragLeave(event);
    }
    onDrop(event) {
        if (this.isEnabled()) {
            this.tt.onColumnDrop(event, this.el.nativeElement);
        }
    }
    isEnabled() {
        return this.ttReorderableColumnDisabled !== true;
    }
    ngOnDestroy() {
        this.unbindEvents();
    }
};
TTReorderableColumn.ctorParameters = () => [
    { type: TreeTable },
    { type: ElementRef },
    { type: NgZone }
];
__decorate([
    Input()
], TTReorderableColumn.prototype, "ttReorderableColumnDisabled", void 0);
__decorate([
    HostListener('drop', ['$event'])
], TTReorderableColumn.prototype, "onDrop", null);
TTReorderableColumn = __decorate([
    Directive({
        selector: '[ttReorderableColumn]'
    })
], TTReorderableColumn);
export { TTReorderableColumn };
let TTSelectableRow = class TTSelectableRow {
    constructor(tt, tableService) {
        this.tt = tt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.tt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.tt.isSelected(this.rowNode.node);
            });
        }
    }
    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.tt.isSelected(this.rowNode.node);
        }
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.tt.handleRowClick({
                originalEvent: event,
                rowNode: this.rowNode
            });
        }
    }
    onEnterKey(event) {
        if (event.which === 13) {
            this.onClick(event);
        }
    }
    onTouchEnd(event) {
        if (this.isEnabled()) {
            this.tt.handleRowTouchEnd(event);
        }
    }
    isEnabled() {
        return this.ttSelectableRowDisabled !== true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
};
TTSelectableRow.ctorParameters = () => [
    { type: TreeTable },
    { type: TreeTableService }
];
__decorate([
    Input("ttSelectableRow")
], TTSelectableRow.prototype, "rowNode", void 0);
__decorate([
    Input()
], TTSelectableRow.prototype, "ttSelectableRowDisabled", void 0);
__decorate([
    HostListener('click', ['$event'])
], TTSelectableRow.prototype, "onClick", null);
__decorate([
    HostListener('keydown', ['$event'])
], TTSelectableRow.prototype, "onEnterKey", null);
__decorate([
    HostListener('touchend', ['$event'])
], TTSelectableRow.prototype, "onTouchEnd", null);
TTSelectableRow = __decorate([
    Directive({
        selector: '[ttSelectableRow]',
        host: {
            '[class.ui-state-highlight]': 'selected'
        }
    })
], TTSelectableRow);
export { TTSelectableRow };
let TTSelectableRowDblClick = class TTSelectableRowDblClick {
    constructor(tt, tableService) {
        this.tt = tt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.tt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.tt.isSelected(this.rowNode.node);
            });
        }
    }
    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.tt.isSelected(this.rowNode.node);
        }
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.tt.handleRowClick({
                originalEvent: event,
                rowNode: this.rowNode
            });
        }
    }
    isEnabled() {
        return this.ttSelectableRowDisabled !== true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
};
TTSelectableRowDblClick.ctorParameters = () => [
    { type: TreeTable },
    { type: TreeTableService }
];
__decorate([
    Input("ttSelectableRowDblClick")
], TTSelectableRowDblClick.prototype, "rowNode", void 0);
__decorate([
    Input()
], TTSelectableRowDblClick.prototype, "ttSelectableRowDisabled", void 0);
__decorate([
    HostListener('dblclick', ['$event'])
], TTSelectableRowDblClick.prototype, "onClick", null);
TTSelectableRowDblClick = __decorate([
    Directive({
        selector: '[ttSelectableRowDblClick]',
        host: {
            '[class.ui-state-highlight]': 'selected'
        }
    })
], TTSelectableRowDblClick);
export { TTSelectableRowDblClick };
let TTContextMenuRow = class TTContextMenuRow {
    constructor(tt, tableService) {
        this.tt = tt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.tt.tableService.contextMenuSource$.subscribe((node) => {
                this.selected = this.tt.equals(this.rowNode.node, node);
            });
        }
    }
    onContextMenu(event) {
        if (this.isEnabled()) {
            this.tt.handleRowRightClick({
                originalEvent: event,
                rowNode: this.rowNode
            });
            event.preventDefault();
        }
    }
    isEnabled() {
        return this.ttContextMenuRowDisabled !== true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
};
TTContextMenuRow.ctorParameters = () => [
    { type: TreeTable },
    { type: TreeTableService }
];
__decorate([
    Input("ttContextMenuRow")
], TTContextMenuRow.prototype, "rowNode", void 0);
__decorate([
    Input()
], TTContextMenuRow.prototype, "ttContextMenuRowDisabled", void 0);
__decorate([
    HostListener('contextmenu', ['$event'])
], TTContextMenuRow.prototype, "onContextMenu", null);
TTContextMenuRow = __decorate([
    Directive({
        selector: '[ttContextMenuRow]',
        host: {
            '[class.ui-contextmenu-selected]': 'selected'
        }
    })
], TTContextMenuRow);
export { TTContextMenuRow };
let TTCheckbox = class TTCheckbox {
    constructor(tt, tableService) {
        this.tt = tt;
        this.tableService = tableService;
        this.subscription = this.tt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.tt.isSelected(this.rowNode.node);
        });
    }
    ngOnInit() {
        this.checked = this.tt.isSelected(this.rowNode.node);
    }
    onClick(event) {
        if (!this.disabled) {
            this.tt.toggleNodeWithCheckbox({
                originalEvent: event,
                rowNode: this.rowNode
            });
        }
        DomHandler.clearSelection();
    }
    onFocus() {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    }
    onBlur() {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
};
TTCheckbox.ctorParameters = () => [
    { type: TreeTable },
    { type: TreeTableService }
];
__decorate([
    Input()
], TTCheckbox.prototype, "disabled", void 0);
__decorate([
    Input("value")
], TTCheckbox.prototype, "rowNode", void 0);
__decorate([
    ViewChild('box', { static: true })
], TTCheckbox.prototype, "boxViewChild", void 0);
TTCheckbox = __decorate([
    Component({
        selector: 'p-treeTableCheckbox',
        template: `
        <div class="ui-chkbox ui-treetable-chkbox ui-widget" (click)="onClick($event)">
            <div class="ui-helper-hidden-accessible">
                <input type="checkbox" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()">
            </div>
            <div #box [ngClass]="{'ui-chkbox-box ui-widget ui-state-default':true,
                'ui-state-active':checked, 'ui-state-disabled':disabled}"  role="checkbox" [attr.aria-checked]="checked">
                <span class="ui-chkbox-icon ui-clickable pi" [ngClass]="{'pi-check':checked, 'pi-minus': rowNode.node.partialSelected}"></span>
            </div>
        </div>
    `
    })
], TTCheckbox);
export { TTCheckbox };
let TTHeaderCheckbox = class TTHeaderCheckbox {
    constructor(tt, tableService) {
        this.tt = tt;
        this.tableService = tableService;
        this.valueChangeSubscription = this.tt.tableService.uiUpdateSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });
        this.selectionChangeSubscription = this.tt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });
    }
    ngOnInit() {
        this.checked = this.updateCheckedState();
    }
    onClick(event, checked) {
        if (this.tt.value && this.tt.value.length > 0) {
            this.tt.toggleNodesWithCheckbox(event, !checked);
        }
        DomHandler.clearSelection();
    }
    onFocus() {
        DomHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    }
    onBlur() {
        DomHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
    }
    ngOnDestroy() {
        if (this.selectionChangeSubscription) {
            this.selectionChangeSubscription.unsubscribe();
        }
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    }
    updateCheckedState() {
        let checked;
        const data = this.tt.filteredNodes || this.tt.value;
        if (data) {
            for (let node of data) {
                if (this.tt.isSelected(node)) {
                    checked = true;
                }
                else {
                    checked = false;
                    break;
                }
            }
        }
        else {
            checked = false;
        }
        return checked;
    }
};
TTHeaderCheckbox.ctorParameters = () => [
    { type: TreeTable },
    { type: TreeTableService }
];
__decorate([
    ViewChild('box', { static: true })
], TTHeaderCheckbox.prototype, "boxViewChild", void 0);
TTHeaderCheckbox = __decorate([
    Component({
        selector: 'p-treeTableHeaderCheckbox',
        template: `
        <div class="ui-chkbox ui-treetable-header-chkbox ui-widget" (click)="onClick($event, cb.checked)">
            <div class="ui-helper-hidden-accessible">
                <input #cb type="checkbox" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="!tt.value||tt.value.length === 0">
            </div>
            <div #box [ngClass]="{'ui-chkbox-box ui-widget ui-state-default':true,
                'ui-state-active':checked, 'ui-state-disabled': (!tt.value || tt.value.length === 0)}"  role="checkbox" [attr.aria-checked]="checked">
                <span class="ui-chkbox-icon ui-clickable" [ngClass]="{'pi pi-check':checked}"></span>
            </div>
        </div>
    `
    })
], TTHeaderCheckbox);
export { TTHeaderCheckbox };
let TTEditableColumn = class TTEditableColumn {
    constructor(tt, el, zone) {
        this.tt = tt;
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'ui-editable-column');
        }
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.tt.editingCellClick = true;
            if (this.tt.editingCell) {
                if (this.tt.editingCell !== this.el.nativeElement) {
                    if (!this.tt.isEditingCellValid()) {
                        return;
                    }
                    DomHandler.removeClass(this.tt.editingCell, 'ui-editing-cell');
                    this.openCell();
                }
            }
            else {
                this.openCell();
            }
        }
    }
    openCell() {
        this.tt.updateEditingCell(this.el.nativeElement);
        DomHandler.addClass(this.el.nativeElement, 'ui-editing-cell');
        this.tt.onEditInit.emit({ field: this.field, data: this.data });
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                let focusable = DomHandler.findSingle(this.el.nativeElement, 'input, textarea');
                if (focusable) {
                    focusable.focus();
                }
            }, 50);
        });
    }
    closeEditingCell() {
        DomHandler.removeClass(this.tt.editingCell, 'ui-editing-cell');
        this.tt.editingCell = null;
        this.tt.unbindDocumentEditListener();
    }
    onKeyDown(event) {
        if (this.isEnabled()) {
            //enter
            if (event.keyCode == 13) {
                if (this.tt.isEditingCellValid()) {
                    DomHandler.removeClass(this.tt.editingCell, 'ui-editing-cell');
                    this.closeEditingCell();
                    this.tt.onEditComplete.emit({ field: this.field, data: this.data });
                }
                event.preventDefault();
            }
            //escape
            else if (event.keyCode == 27) {
                if (this.tt.isEditingCellValid()) {
                    DomHandler.removeClass(this.tt.editingCell, 'ui-editing-cell');
                    this.closeEditingCell();
                    this.tt.onEditCancel.emit({ field: this.field, data: this.data });
                }
                event.preventDefault();
            }
            //tab
            else if (event.keyCode == 9) {
                this.tt.onEditComplete.emit({ field: this.field, data: this.data });
                if (event.shiftKey)
                    this.moveToPreviousCell(event);
                else
                    this.moveToNextCell(event);
            }
        }
    }
    findCell(element) {
        if (element) {
            let cell = element;
            while (cell && !DomHandler.hasClass(cell, 'ui-editing-cell')) {
                cell = cell.parentElement;
            }
            return cell;
        }
        else {
            return null;
        }
    }
    moveToPreviousCell(event) {
        let currentCell = this.findCell(event.target);
        let row = currentCell.parentElement;
        let targetCell = this.findPreviousEditableColumn(currentCell);
        if (targetCell) {
            DomHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    }
    moveToNextCell(event) {
        let currentCell = this.findCell(event.target);
        let row = currentCell.parentElement;
        let targetCell = this.findNextEditableColumn(currentCell);
        if (targetCell) {
            DomHandler.invokeElementMethod(targetCell, 'click');
            event.preventDefault();
        }
    }
    findPreviousEditableColumn(cell) {
        let prevCell = cell.previousElementSibling;
        if (!prevCell) {
            let previousRow = cell.parentElement ? cell.parentElement.previousElementSibling : null;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }
        if (prevCell) {
            if (DomHandler.hasClass(prevCell, 'ui-editable-column'))
                return prevCell;
            else
                return this.findPreviousEditableColumn(prevCell);
        }
        else {
            return null;
        }
    }
    findNextEditableColumn(cell) {
        let nextCell = cell.nextElementSibling;
        if (!nextCell) {
            let nextRow = cell.parentElement ? cell.parentElement.nextElementSibling : null;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }
        if (nextCell) {
            if (DomHandler.hasClass(nextCell, 'ui-editable-column'))
                return nextCell;
            else
                return this.findNextEditableColumn(nextCell);
        }
        else {
            return null;
        }
    }
    isEnabled() {
        return this.ttEditableColumnDisabled !== true;
    }
};
TTEditableColumn.ctorParameters = () => [
    { type: TreeTable },
    { type: ElementRef },
    { type: NgZone }
];
__decorate([
    Input("ttEditableColumn")
], TTEditableColumn.prototype, "data", void 0);
__decorate([
    Input("ttEditableColumnField")
], TTEditableColumn.prototype, "field", void 0);
__decorate([
    Input()
], TTEditableColumn.prototype, "ttEditableColumnDisabled", void 0);
__decorate([
    HostListener('click', ['$event'])
], TTEditableColumn.prototype, "onClick", null);
__decorate([
    HostListener('keydown', ['$event'])
], TTEditableColumn.prototype, "onKeyDown", null);
TTEditableColumn = __decorate([
    Directive({
        selector: '[ttEditableColumn]'
    })
], TTEditableColumn);
export { TTEditableColumn };
let TreeTableCellEditor = class TreeTableCellEditor {
    constructor(tt, editableColumn) {
        this.tt = tt;
        this.editableColumn = editableColumn;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'input':
                    this.inputTemplate = item.template;
                    break;
                case 'output':
                    this.outputTemplate = item.template;
                    break;
            }
        });
    }
};
TreeTableCellEditor.ctorParameters = () => [
    { type: TreeTable },
    { type: TTEditableColumn }
];
__decorate([
    ContentChildren(PrimeTemplate)
], TreeTableCellEditor.prototype, "templates", void 0);
TreeTableCellEditor = __decorate([
    Component({
        selector: 'p-treeTableCellEditor',
        template: `
        <ng-container *ngIf="tt.editingCell === editableColumn.el.nativeElement">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!tt.editingCell || tt.editingCell !== editableColumn.el.nativeElement">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `
    })
], TreeTableCellEditor);
export { TreeTableCellEditor };
let TTRow = class TTRow {
    constructor(tt, el, zone) {
        this.tt = tt;
        this.el = el;
        this.zone = zone;
    }
    onKeyDown(event) {
        switch (event.which) {
            //down arrow
            case 40:
                let nextRow = this.el.nativeElement.nextElementSibling;
                if (nextRow) {
                    nextRow.focus();
                }
                event.preventDefault();
                break;
            //down arrow
            case 38:
                let prevRow = this.el.nativeElement.previousElementSibling;
                if (prevRow) {
                    prevRow.focus();
                }
                event.preventDefault();
                break;
            //left arrow
            case 37:
                if (this.rowNode.node.expanded) {
                    this.tt.toggleRowIndex = DomHandler.index(this.el.nativeElement);
                    this.rowNode.node.expanded = false;
                    this.tt.onNodeCollapse.emit({
                        originalEvent: event,
                        node: this.rowNode.node
                    });
                    this.tt.updateSerializedValue();
                    this.tt.tableService.onUIUpdate(this.tt.value);
                    this.restoreFocus();
                }
                break;
            //right arrow
            case 39:
                if (!this.rowNode.node.expanded) {
                    this.tt.toggleRowIndex = DomHandler.index(this.el.nativeElement);
                    this.rowNode.node.expanded = true;
                    this.tt.onNodeExpand.emit({
                        originalEvent: event,
                        node: this.rowNode.node
                    });
                    this.tt.updateSerializedValue();
                    this.tt.tableService.onUIUpdate(this.tt.value);
                    this.restoreFocus();
                }
                break;
        }
    }
    restoreFocus() {
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                let row = DomHandler.findSingle(this.tt.containerViewChild.nativeElement, '.ui-treetable-tbody').children[this.tt.toggleRowIndex];
                if (row) {
                    row.focus();
                }
            }, 25);
        });
    }
};
TTRow.ctorParameters = () => [
    { type: TreeTable },
    { type: ElementRef },
    { type: NgZone }
];
__decorate([
    Input('ttRow')
], TTRow.prototype, "rowNode", void 0);
__decorate([
    HostListener('keydown', ['$event'])
], TTRow.prototype, "onKeyDown", null);
TTRow = __decorate([
    Directive({
        selector: '[ttRow]',
        host: {
            '[attr.tabindex]': '"0"'
        }
    })
], TTRow);
export { TTRow };
let TreeTableToggler = class TreeTableToggler {
    constructor(tt) {
        this.tt = tt;
    }
    onClick(event) {
        this.rowNode.node.expanded = !this.rowNode.node.expanded;
        if (this.rowNode.node.expanded) {
            this.tt.onNodeExpand.emit({
                originalEvent: event,
                node: this.rowNode.node
            });
        }
        else {
            this.tt.onNodeCollapse.emit({
                originalEvent: event,
                node: this.rowNode.node
            });
        }
        this.tt.updateSerializedValue();
        this.tt.tableService.onUIUpdate(this.tt.value);
        event.preventDefault();
    }
};
TreeTableToggler.ctorParameters = () => [
    { type: TreeTable }
];
__decorate([
    Input()
], TreeTableToggler.prototype, "rowNode", void 0);
TreeTableToggler = __decorate([
    Component({
        selector: 'p-treeTableToggler',
        template: `
        <a class="ui-treetable-toggler ui-unselectable-text" *ngIf="rowNode.node.leaf === false || rowNode.level !== 0 || rowNode.node.children && rowNode.node.children.length" (click)="onClick($event)"
            [style.visibility]="rowNode.node.leaf === false || (rowNode.node.children && rowNode.node.children.length) ? 'visible' : 'hidden'" [style.marginLeft]="rowNode.level * 16 + 'px'">
            <i [ngClass]="rowNode.node.expanded ? 'pi pi-fw pi-chevron-down' : 'pi pi-fw pi-chevron-right'"></i>
        </a>
    `
    })
], TreeTableToggler);
export { TreeTableToggler };
let TreeTableModule = class TreeTableModule {
};
TreeTableModule = __decorate([
    NgModule({
        imports: [CommonModule, PaginatorModule],
        exports: [TreeTable, SharedModule, TreeTableToggler, TTSortableColumn, TTSortIcon, TTResizableColumn, TTRow, TTReorderableColumn, TTSelectableRow, TTSelectableRowDblClick, TTContextMenuRow, TTCheckbox, TTHeaderCheckbox, TTEditableColumn, TreeTableCellEditor],
        declarations: [TreeTable, TreeTableToggler, TTScrollableView, TTBody, TTSortableColumn, TTSortIcon, TTResizableColumn, TTRow, TTReorderableColumn, TTSelectableRow, TTSelectableRowDblClick, TTContextMenuRow, TTCheckbox, TTHeaderCheckbox, TTEditableColumn, TreeTableCellEditor]
    })
], TreeTableModule);
export { TreeTableModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZXRhYmxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy90cmVldGFibGUvIiwic291cmNlcyI6WyJ0cmVldGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM3UixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFJMUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzVDLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBQTdCO1FBRVksZUFBVSxHQUFHLElBQUksT0FBTyxFQUF1QixDQUFDO1FBQ2hELG9CQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNoQyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO1FBQ3ZDLG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQztRQUNwQyx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBTyxD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QkFBaUIsRUFBQyxLQUFLLEVBQUMsbUJBQW1CLEVBQUMsZUFBZSxFQUFDLHVCQUF1QixFQUFDLGdCQUFnQixFQUFDLFVBQVUsRUFBQyxnQkFBZ0IsRUFBQyxnQkFBZ0IsRUFBQyxtQkFBbUIsQ0FBQztRQUNwUCxZQUFZLEVBQUUsQ0FBQyxTQUFTLEVBQUMsZ0JBQWdCLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLFVBQVUsRUFBQyxpQkFBaUIsRUFBQyxLQUFLLEVBQUMsbUJBQW1CLEVBQUMsZUFBZSxFQUFDLHVCQUF1QixFQUFDLGdCQUFnQixFQUFDLFVBQVUsRUFBQyxnQkFBZ0IsRUFBQyxnQkFBZ0IsRUFBQyxtQkFBbUIsQ0FBQztLQUN2USxDQUFDO0dBQ1csZUFBZSxDQUFJO1NBQW5CLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQWZ0ZXJDb250ZW50SW5pdCwgT25Jbml0LCBPbkRlc3Ryb3ksIEhvc3RMaXN0ZW5lciwgSW5qZWN0YWJsZSwgRGlyZWN0aXZlLCBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQ29udGVudENoaWxkcmVuLCBUZW1wbGF0ZVJlZiwgUXVlcnlMaXN0LCBFbGVtZW50UmVmLCBOZ1pvbmUsIFZpZXdDaGlsZCwgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUcmVlTm9kZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IFBhZ2luYXRvck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcGFnaW5hdG9yJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IFNvcnRNZXRhIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQmxvY2thYmxlVUkgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBGaWx0ZXJNZXRhZGF0YSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBGaWx0ZXJVdGlscyB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVHJlZVRhYmxlU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHNvcnRTb3VyY2UgPSBuZXcgU3ViamVjdDxTb3J0TWV0YXxTb3J0TWV0YVtdPigpO1xuICAgIHByaXZhdGUgc2VsZWN0aW9uU291cmNlID0gbmV3IFN1YmplY3QoKTtcbiAgICBwcml2YXRlIGNvbnRleHRNZW51U291cmNlID0gbmV3IFN1YmplY3Q8YW55PigpO1xuICAgIHByaXZhdGUgdWlVcGRhdGVTb3VyY2UgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgcHJpdmF0ZSB0b3RhbFJlY29yZHNTb3VyY2UgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgICBzb3J0U291cmNlJCA9IHRoaXMuc29ydFNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBzZWxlY3Rpb25Tb3VyY2UkID0gdGhpcy5zZWxlY3Rpb25Tb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgY29udGV4dE1lbnVTb3VyY2UkID0gdGhpcy5jb250ZXh0TWVudVNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICB1aVVwZGF0ZVNvdXJjZSQgPSB0aGlzLnVpVXBkYXRlU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRvdGFsUmVjb3Jkc1NvdXJjZSQgPSB0aGlzLnRvdGFsUmVjb3Jkc1NvdXJjZS5hc09ic2VydmFibGUoKTtcblxuICAgIG9uU29ydChzb3J0TWV0YTogU29ydE1ldGF8U29ydE1ldGFbXSkge1xuICAgICAgICB0aGlzLnNvcnRTb3VyY2UubmV4dChzb3J0TWV0YSk7XG4gICAgfVxuXG4gICAgb25TZWxlY3Rpb25DaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uU291cmNlLm5leHQoKTtcbiAgICB9XG5cbiAgICBvbkNvbnRleHRNZW51KG5vZGU6IGFueSkge1xuICAgICAgICB0aGlzLmNvbnRleHRNZW51U291cmNlLm5leHQobm9kZSk7XG4gICAgfVxuXG4gICAgb25VSVVwZGF0ZSh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMudWlVcGRhdGVTb3VyY2UubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgb25Ub3RhbFJlY29yZHNDaGFuZ2UodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLnRvdGFsUmVjb3Jkc1NvdXJjZS5uZXh0KHZhbHVlKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10cmVlVGFibGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXRyZWV0YWJsZSB1aS13aWRnZXQnOiB0cnVlLCAndWktdHJlZXRhYmxlLWF1dG8tbGF5b3V0JzogYXV0b0xheW91dCwgJ3VpLXRyZWV0YWJsZS1ob3ZlcmFibGUtcm93cyc6IChyb3dIb3Zlcnx8KHNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnIHx8IHNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aXBsZScpKSxcbiAgICAgICAgICAgICAgICAndWktdHJlZXRhYmxlLXJlc2l6YWJsZSc6IHJlc2l6YWJsZUNvbHVtbnMsICd1aS10cmVldGFibGUtcmVzaXphYmxlLWZpdCc6IChyZXNpemFibGVDb2x1bW5zICYmIGNvbHVtblJlc2l6ZU1vZGUgPT09ICdmaXQnKX1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10cmVldGFibGUtbG9hZGluZyB1aS13aWRnZXQtb3ZlcmxheVwiICpuZ0lmPVwibG9hZGluZyAmJiBzaG93TG9hZGVyXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZXRhYmxlLWxvYWRpbmctY29udGVudFwiICpuZ0lmPVwibG9hZGluZyAmJiBzaG93TG9hZGVyXCI+XG4gICAgICAgICAgICAgICAgPGkgW2NsYXNzXT1cIid1aS10cmVldGFibGUtbG9hZGluZy1pY29uIHBpLXNwaW4gJyArIGxvYWRpbmdJY29uXCI+PC9pPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY2FwdGlvblRlbXBsYXRlXCIgY2xhc3M9XCJ1aS10cmVldGFibGUtY2FwdGlvbiB1aS13aWRnZXQtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNhcHRpb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cC1wYWdpbmF0b3IgW3Jvd3NdPVwicm93c1wiIFtmaXJzdF09XCJmaXJzdFwiIFt0b3RhbFJlY29yZHNdPVwidG90YWxSZWNvcmRzXCIgW3BhZ2VMaW5rU2l6ZV09XCJwYWdlTGlua3NcIiBzdHlsZUNsYXNzPVwidWktcGFnaW5hdG9yLXRvcFwiIFthbHdheXNTaG93XT1cImFsd2F5c1Nob3dQYWdpbmF0b3JcIlxuICAgICAgICAgICAgICAgIChvblBhZ2VDaGFuZ2UpPVwib25QYWdlQ2hhbmdlKCRldmVudClcIiBbcm93c1BlclBhZ2VPcHRpb25zXT1cInJvd3NQZXJQYWdlT3B0aW9uc1wiICpuZ0lmPVwicGFnaW5hdG9yICYmIChwYWdpbmF0b3JQb3NpdGlvbiA9PT0gJ3RvcCcgfHwgcGFnaW5hdG9yUG9zaXRpb24gPT0nYm90aCcpXCJcbiAgICAgICAgICAgICAgICBbdGVtcGxhdGVMZWZ0XT1cInBhZ2luYXRvckxlZnRUZW1wbGF0ZVwiIFt0ZW1wbGF0ZVJpZ2h0XT1cInBhZ2luYXRvclJpZ2h0VGVtcGxhdGVcIiBbZHJvcGRvd25BcHBlbmRUb109XCJwYWdpbmF0b3JEcm9wZG93bkFwcGVuZFRvXCI+PC9wLXBhZ2luYXRvcj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRyZWV0YWJsZS13cmFwcGVyXCIgKm5nSWY9XCIhc2Nyb2xsYWJsZVwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSAjdGFibGUgY2xhc3M9XCJ1aS10cmVldGFibGUtdGFibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbEdyb3VwVGVtcGxhdGU7IGNvbnRleHQgeyRpbXBsaWNpdDogY29sdW1uc31cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPHRoZWFkIGNsYXNzPVwidWktdHJlZXRhYmxlLXRoZWFkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0Zm9vdCBjbGFzcz1cInVpLXRyZWV0YWJsZS10Zm9vdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvb3RlclRlbXBsYXRlOyBjb250ZXh0IHskaW1wbGljaXQ6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvdGZvb3Q+XG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzcz1cInVpLXRyZWV0YWJsZS10Ym9keVwiIFtwVHJlZVRhYmxlQm9keV09XCJjb2x1bW5zXCIgW3BUcmVlVGFibGVCb2R5VGVtcGxhdGVdPVwiYm9keVRlbXBsYXRlXCI+PC90Ym9keT5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10cmVldGFibGUtc2Nyb2xsYWJsZS13cmFwcGVyXCIgKm5nSWY9XCJzY3JvbGxhYmxlXCI+XG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZXRhYmxlLXNjcm9sbGFibGUtdmlldyB1aS10cmVldGFibGUtZnJvemVuLXZpZXdcIiAqbmdJZj1cImZyb3plbkNvbHVtbnN8fGZyb3plbkJvZHlUZW1wbGF0ZVwiIFt0dFNjcm9sbGFibGVWaWV3XT1cImZyb3plbkNvbHVtbnNcIiBbZnJvemVuXT1cInRydWVcIiBbbmdTdHlsZV09XCJ7d2lkdGg6IGZyb3plbldpZHRofVwiIFtzY3JvbGxIZWlnaHRdPVwic2Nyb2xsSGVpZ2h0XCI+PC9kaXY+XG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZXRhYmxlLXNjcm9sbGFibGUtdmlld1wiIFt0dFNjcm9sbGFibGVWaWV3XT1cImNvbHVtbnNcIiBbZnJvemVuXT1cImZhbHNlXCIgW3Njcm9sbEhlaWdodF09XCJzY3JvbGxIZWlnaHRcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8cC1wYWdpbmF0b3IgW3Jvd3NdPVwicm93c1wiIFtmaXJzdF09XCJmaXJzdFwiIFt0b3RhbFJlY29yZHNdPVwidG90YWxSZWNvcmRzXCIgW3BhZ2VMaW5rU2l6ZV09XCJwYWdlTGlua3NcIiBzdHlsZUNsYXNzPVwidWktcGFnaW5hdG9yLWJvdHRvbVwiIFthbHdheXNTaG93XT1cImFsd2F5c1Nob3dQYWdpbmF0b3JcIlxuICAgICAgICAgICAgICAgIChvblBhZ2VDaGFuZ2UpPVwib25QYWdlQ2hhbmdlKCRldmVudClcIiBbcm93c1BlclBhZ2VPcHRpb25zXT1cInJvd3NQZXJQYWdlT3B0aW9uc1wiICpuZ0lmPVwicGFnaW5hdG9yICYmIChwYWdpbmF0b3JQb3NpdGlvbiA9PT0gJ2JvdHRvbScgfHwgcGFnaW5hdG9yUG9zaXRpb24gPT0nYm90aCcpXCJcbiAgICAgICAgICAgICAgICBbdGVtcGxhdGVMZWZ0XT1cInBhZ2luYXRvckxlZnRUZW1wbGF0ZVwiIFt0ZW1wbGF0ZVJpZ2h0XT1cInBhZ2luYXRvclJpZ2h0VGVtcGxhdGVcIiBbZHJvcGRvd25BcHBlbmRUb109XCJwYWdpbmF0b3JEcm9wZG93bkFwcGVuZFRvXCI+PC9wLXBhZ2luYXRvcj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzdW1tYXJ5VGVtcGxhdGVcIiBjbGFzcz1cInVpLXRyZWV0YWJsZS1zdW1tYXJ5IHVpLXdpZGdldC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic3VtbWFyeVRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiAjcmVzaXplSGVscGVyIGNsYXNzPVwidWktY29sdW1uLXJlc2l6ZXItaGVscGVyIHVpLXN0YXRlLWhpZ2hsaWdodFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgKm5nSWY9XCJyZXNpemFibGVDb2x1bW5zXCI+PC9kaXY+XG5cbiAgICAgICAgICAgIDxzcGFuICNyZW9yZGVySW5kaWNhdG9yVXAgY2xhc3M9XCJwaSBwaS1hcnJvdy1kb3duIHVpLXRhYmxlLXJlb3JkZXItaW5kaWNhdG9yLXVwXCIgKm5nSWY9XCJyZW9yZGVyYWJsZUNvbHVtbnNcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAjcmVvcmRlckluZGljYXRvckRvd24gY2xhc3M9XCJwaSBwaS1hcnJvdy11cCB1aS10YWJsZS1yZW9yZGVyLWluZGljYXRvci1kb3duXCIgKm5nSWY9XCJyZW9yZGVyYWJsZUNvbHVtbnNcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbVHJlZVRhYmxlU2VydmljZV1cbn0pXG5leHBvcnQgY2xhc3MgVHJlZVRhYmxlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25Jbml0LCBPbkRlc3Ryb3ksIEJsb2NrYWJsZVVJLCBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCkgY29sdW1uczogYW55W107XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXV0b0xheW91dDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGxhenk6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIHBhZ2luYXRvcjogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHJvd3M6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGZpcnN0OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgcGFnZUxpbmtzOiBudW1iZXIgPSA1O1xuXG4gICAgQElucHV0KCkgcm93c1BlclBhZ2VPcHRpb25zOiBhbnlbXTtcblxuICAgIEBJbnB1dCgpIGFsd2F5c1Nob3dQYWdpbmF0b3I6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgcGFnaW5hdG9yUG9zaXRpb246IHN0cmluZyA9ICdib3R0b20nO1xuXG4gICAgQElucHV0KCkgcGFnaW5hdG9yRHJvcGRvd25BcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgZGVmYXVsdFNvcnRPcmRlcjogbnVtYmVyID0gMTtcblxuICAgIEBJbnB1dCgpIHNvcnRNb2RlOiBzdHJpbmcgPSAnc2luZ2xlJztcbiAgICBcbiAgICBASW5wdXQoKSByZXNldFBhZ2VPblNvcnQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgY3VzdG9tU29ydDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHNlbGVjdGlvbk1vZGU6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCkgY29udGV4dE1lbnVTZWxlY3Rpb246IGFueTtcblxuICAgIEBPdXRwdXQoKSBjb250ZXh0TWVudVNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSBjb250ZXh0TWVudVNlbGVjdGlvbk1vZGU6IHN0cmluZyA9IFwic2VwYXJhdGVcIjtcblxuICAgIEBJbnB1dCgpIGRhdGFLZXk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIG1ldGFLZXlTZWxlY3Rpb246IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBjb21wYXJlU2VsZWN0aW9uQnk6IHN0cmluZyA9ICdkZWVwRXF1YWxzJztcblxuICAgIEBJbnB1dCgpIHJvd0hvdmVyOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGxvYWRpbmdJY29uOiBzdHJpbmcgPSAncGkgcGktc3Bpbm5lcic7XG5cbiAgICBASW5wdXQoKSBzaG93TG9hZGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHNjcm9sbGFibGU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzY3JvbGxIZWlnaHQ6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHZpcnR1YWxTY3JvbGw6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB2aXJ0dWFsU2Nyb2xsRGVsYXk6IG51bWJlciA9IDE1MDtcblxuICAgIEBJbnB1dCgpIHZpcnR1YWxSb3dIZWlnaHQ6IG51bWJlciA9IDI4O1xuXG4gICAgQElucHV0KCkgZnJvemVuV2lkdGg6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGZyb3plbkNvbHVtbnM6IGFueVtdO1xuXG4gICAgQElucHV0KCkgcmVzaXphYmxlQ29sdW1uczogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGNvbHVtblJlc2l6ZU1vZGU6IHN0cmluZyA9ICdmaXQnO1xuXG4gICAgQElucHV0KCkgcmVvcmRlcmFibGVDb2x1bW5zOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgY29udGV4dE1lbnU6IGFueTtcblxuICAgIEBJbnB1dCgpIHJvd1RyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcblxuICAgIEBJbnB1dCgpIGZpbHRlcnM6IHsgW3M6IHN0cmluZ106IEZpbHRlck1ldGFkYXRhOyB9ID0ge307XG5cbiAgICBASW5wdXQoKSBnbG9iYWxGaWx0ZXJGaWVsZHM6IHN0cmluZ1tdO1xuXG4gICAgQElucHV0KCkgZmlsdGVyRGVsYXk6IG51bWJlciA9IDMwMDtcblxuICAgIEBJbnB1dCgpIGZpbHRlck1vZGU6IHN0cmluZyA9ICdsZW5pZW50JztcblxuICAgIEBPdXRwdXQoKSBvbkZpbHRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Ob2RlRXhwYW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbk5vZGVDb2xsYXBzZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25QYWdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvblNvcnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTGF6eUxvYWQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIHNvcnRGdW5jdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Db2xSZXNpemU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQ29sUmVvcmRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Ob2RlU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbk5vZGVVbnNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Db250ZXh0TWVudVNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25IZWFkZXJDaGVja2JveFRvZ2dsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25FZGl0SW5pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25FZGl0Q29tcGxldGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRWRpdENhbmNlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBjb250YWluZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdyZXNpemVIZWxwZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgcmVzaXplSGVscGVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgncmVvcmRlckluZGljYXRvclVwJywgeyBzdGF0aWM6IGZhbHNlIH0pIHJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3Jlb3JkZXJJbmRpY2F0b3JEb3duJywgeyBzdGF0aWM6IGZhbHNlIH0pIHJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgndGFibGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgdGFibGVWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+O1xuXG4gICAgX3ZhbHVlOiBUcmVlTm9kZVtdID0gW107XG5cbiAgICBzZXJpYWxpemVkVmFsdWU6IGFueVtdO1xuXG4gICAgX3RvdGFsUmVjb3JkczogbnVtYmVyID0gMDtcblxuICAgIF9tdWx0aVNvcnRNZXRhOiBTb3J0TWV0YVtdO1xuXG4gICAgX3NvcnRGaWVsZDogc3RyaW5nO1xuXG4gICAgX3NvcnRPcmRlcjogbnVtYmVyID0gMTtcblxuICAgIHZpcnR1YWxTY3JvbGxUaW1lcjogYW55O1xuICAgIFxuICAgIHZpcnR1YWxTY3JvbGxDYWxsYmFjazogRnVuY3Rpb247XG5cbiAgICBmaWx0ZXJlZE5vZGVzOiBhbnlbXTtcblxuICAgIGZpbHRlclRpbWVvdXQ6IGFueTtcblxuICAgIGNvbEdyb3VwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjYXB0aW9uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGJvZHlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGxvYWRpbmdCb2R5VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBmb290ZXJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIHN1bW1hcnlUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGVtcHR5TWVzc2FnZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgcGFnaW5hdG9yTGVmdFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgcGFnaW5hdG9yUmlnaHRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGZyb3plbkhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZnJvemVuQm9keVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgZnJvemVuRm9vdGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBmcm96ZW5Db2xHcm91cFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgbGFzdFJlc2l6ZXJIZWxwZXJYOiBudW1iZXI7XG5cbiAgICByZW9yZGVySWNvbldpZHRoOiBudW1iZXI7XG5cbiAgICByZW9yZGVySWNvbkhlaWdodDogbnVtYmVyO1xuXG4gICAgZHJhZ2dlZENvbHVtbjogYW55O1xuXG4gICAgZHJvcFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICBwcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb246IGJvb2xlYW47XG5cbiAgICBfc2VsZWN0aW9uOiBhbnk7XG5cbiAgICBzZWxlY3Rpb25LZXlzOiBhbnkgPSB7fTtcblxuICAgIHJvd1RvdWNoZWQ6IGJvb2xlYW47XG5cbiAgICBlZGl0aW5nQ2VsbDogRWxlbWVudDtcblxuICAgIGVkaXRpbmdDZWxsQ2xpY2s6IGJvb2xlYW47XG5cbiAgICBkb2N1bWVudEVkaXRMaXN0ZW5lcjogYW55O1xuXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgICB0b2dnbGVSb3dJbmRleDogbnVtYmVyO1xuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjYXB0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXB0aW9uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdib2R5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2R5VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGluZ2JvZHknOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdCb2R5VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzdW1tYXJ5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdW1tYXJ5VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY29sZ3JvdXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbEdyb3VwVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHltZXNzYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eU1lc3NhZ2VUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwYWdpbmF0b3JsZWZ0JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3JMZWZ0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnaW5hdG9ycmlnaHQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvclJpZ2h0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVuaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5IZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmcm96ZW5ib2R5JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5Cb2R5VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVuZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5Gb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmcm96ZW5jb2xncm91cCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuQ29sR3JvdXBUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSwgcHVibGljIHRhYmxlU2VydmljZTogVHJlZVRhYmxlU2VydmljZSkge31cblxuICAgIG5nT25DaGFuZ2VzKHNpbXBsZUNoYW5nZTogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHNpbXBsZUNoYW5nZS52YWx1ZS5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5sYXp5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSAodGhpcy5fdmFsdWUgPyB0aGlzLl92YWx1ZS5sZW5ndGggOiAwKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09ICdzaW5nbGUnICYmIHRoaXMuc29ydEZpZWxkKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRTaW5nbGUoKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLnNvcnRNb2RlID09ICdtdWx0aXBsZScgJiYgdGhpcy5tdWx0aVNvcnRNZXRhKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRNdWx0aXBsZSgpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaGFzRmlsdGVyKCkpICAgICAgIC8vc29ydCBhbHJlYWR5IGZpbHRlcnNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwgJiYgdGhpcy52aXJ0dWFsU2Nyb2xsQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGxDYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNlcmlhbGl6ZWRWYWx1ZSgpO1xuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25VSVVwZGF0ZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2Uuc29ydEZpZWxkKSB7XG4gICAgICAgICAgICB0aGlzLl9zb3J0RmllbGQgPSBzaW1wbGVDaGFuZ2Uuc29ydEZpZWxkLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgLy9hdm9pZCB0cmlnZ2VyaW5nIGxhenkgbG9hZCBwcmlvciB0byBsYXp5IGluaXRpYWxpemF0aW9uIGF0IG9uSW5pdFxuICAgICAgICAgICAgaWYgKCAhdGhpcy5sYXp5IHx8IHRoaXMuaW5pdGlhbGl6ZWQgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc29ydE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydFNpbmdsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2Uuc29ydE9yZGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSBzaW1wbGVDaGFuZ2Uuc29ydE9yZGVyLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgLy9hdm9pZCB0cmlnZ2VyaW5nIGxhenkgbG9hZCBwcmlvciB0byBsYXp5IGluaXRpYWxpemF0aW9uIGF0IG9uSW5pdFxuICAgICAgICAgICAgaWYgKCAhdGhpcy5sYXp5IHx8IHRoaXMuaW5pdGlhbGl6ZWQgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc29ydE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydFNpbmdsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UubXVsdGlTb3J0TWV0YSkge1xuICAgICAgICAgICAgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IHNpbXBsZUNoYW5nZS5tdWx0aVNvcnRNZXRhLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0TXVsdGlwbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2Uuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBzaW1wbGVDaGFuZ2Uuc2VsZWN0aW9uLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uS2V5cygpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IHZhbHVlKCk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsOiBhbnlbXSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbDtcbiAgICB9XG5cbiAgICB1cGRhdGVTZXJpYWxpemVkVmFsdWUoKSB7XG4gICAgICAgIHRoaXMuc2VyaWFsaXplZFZhbHVlID0gW107XG5cbiAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKVxuICAgICAgICAgICAgdGhpcy5zZXJpYWxpemVQYWdlTm9kZXMoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zZXJpYWxpemVOb2RlcyhudWxsLCB0aGlzLmZpbHRlcmVkTm9kZXN8fHRoaXMudmFsdWUsIDAsIHRydWUpO1xuICAgIH1cblxuICAgIHNlcmlhbGl6ZU5vZGVzKHBhcmVudCwgbm9kZXMsIGxldmVsLCB2aXNpYmxlKSB7XG4gICAgICAgIGlmIChub2RlcyAmJiBub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvcihsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvd05vZGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IG5vZGUsXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgICAgICAgICAgICBsZXZlbDogbGV2ZWwsXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHZpc2libGUgJiYgKHBhcmVudCA/IHBhcmVudC5leHBhbmRlZCA6IHRydWUpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcmlhbGl6ZWRWYWx1ZS5wdXNoKHJvd05vZGUpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChyb3dOb2RlLnZpc2libGUgJiYgbm9kZS5leHBhbmRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcmlhbGl6ZU5vZGVzKG5vZGUsIG5vZGUuY2hpbGRyZW4sIGxldmVsICsgMSwgcm93Tm9kZS52aXNpYmxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXJpYWxpemVQYWdlTm9kZXMoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5maWx0ZXJlZE5vZGVzIHx8IHRoaXMudmFsdWU7XG4gICAgICAgIHRoaXMuc2VyaWFsaXplZFZhbHVlID0gW107XG4gICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBmaXJzdCA9IHRoaXMubGF6eSA/IDAgOiB0aGlzLmZpcnN0O1xuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSBmaXJzdDsgaSA8IChmaXJzdCArIHRoaXMucm93cyk7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBub2RlID0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcmlhbGl6ZWRWYWx1ZS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6IG5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcmlhbGl6ZU5vZGVzKG5vZGUsIG5vZGUuY2hpbGRyZW4sIDEsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCB0b3RhbFJlY29yZHMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsUmVjb3JkcztcbiAgICB9XG4gICAgc2V0IHRvdGFsUmVjb3Jkcyh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90b3RhbFJlY29yZHMgPSB2YWw7XG4gICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uVG90YWxSZWNvcmRzQ2hhbmdlKHRoaXMuX3RvdGFsUmVjb3Jkcyk7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IHNvcnRGaWVsZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fc29ydEZpZWxkO1xuICAgIH1cblxuICAgIHNldCBzb3J0RmllbGQodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fc29ydEZpZWxkID0gdmFsO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBzb3J0T3JkZXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvcnRPcmRlcjtcbiAgICB9XG4gICAgc2V0IHNvcnRPcmRlcih2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSB2YWw7XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IG11bHRpU29ydE1ldGEoKTogU29ydE1ldGFbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdWx0aVNvcnRNZXRhO1xuICAgIH1cblxuICAgIHNldCBtdWx0aVNvcnRNZXRhKHZhbDogU29ydE1ldGFbXSkge1xuICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gdmFsO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBzZWxlY3Rpb24oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbjtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0aW9uKHZhbDogYW55KSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHZhbDtcbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3Rpb25LZXlzKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhS2V5ICYmIHRoaXMuX3NlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzID0ge307XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9zZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBub2RlIG9mIHRoaXMuX3NlbGVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEobm9kZS5kYXRhLCB0aGlzLmRhdGFLZXkpKV0gPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YSh0aGlzLl9zZWxlY3Rpb24uZGF0YSwgdGhpcy5kYXRhS2V5KSldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGFnZUNoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLmZpcnN0ID0gZXZlbnQuZmlyc3Q7XG4gICAgICAgIHRoaXMucm93cyA9IGV2ZW50LnJvd3M7XG5cbiAgICAgICAgaWYgKHRoaXMubGF6eSlcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zZXJpYWxpemVQYWdlTm9kZXMoKTtcblxuICAgICAgICB0aGlzLm9uUGFnZS5lbWl0KHtcbiAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25VSVVwZGF0ZSh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBzb3J0KGV2ZW50KSB7XG4gICAgICAgIGxldCBvcmlnaW5hbEV2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudDtcblxuICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHRoaXMuX3NvcnRPcmRlciA9ICh0aGlzLnNvcnRGaWVsZCA9PT0gZXZlbnQuZmllbGQpID8gdGhpcy5zb3J0T3JkZXIgKiAtMSA6IHRoaXMuZGVmYXVsdFNvcnRPcmRlcjtcbiAgICAgICAgICAgIHRoaXMuX3NvcnRGaWVsZCA9IGV2ZW50LmZpZWxkO1xuICAgICAgICAgICAgdGhpcy5zb3J0U2luZ2xlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc29ydE1vZGUgPT09ICdtdWx0aXBsZScpIHtcbiAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gb3JpZ2luYWxFdmVudC5tZXRhS2V5IHx8IG9yaWdpbmFsRXZlbnQuY3RybEtleTtcbiAgICAgICAgICAgIGxldCBzb3J0TWV0YSA9IHRoaXMuZ2V0U29ydE1ldGEoZXZlbnQuZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAoc29ydE1ldGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IFt7IGZpZWxkOiBldmVudC5maWVsZCwgb3JkZXI6IHNvcnRNZXRhLm9yZGVyICogLTEgfV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNvcnRNZXRhLm9yZGVyID0gc29ydE1ldGEub3JkZXIgKiAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIW1ldGFLZXkgfHwgIXRoaXMubXVsdGlTb3J0TWV0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubXVsdGlTb3J0TWV0YS5wdXNoKHsgZmllbGQ6IGV2ZW50LmZpZWxkLCBvcmRlcjogdGhpcy5kZWZhdWx0U29ydE9yZGVyIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLnNvcnRNdWx0aXBsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc29ydFNpbmdsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc29ydEZpZWxkICYmIHRoaXMuc29ydE9yZGVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZXNldFBhZ2VPblNvcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvcnROb2Rlcyh0aGlzLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc0ZpbHRlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpbHRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGxldCBzb3J0TWV0YTogU29ydE1ldGEgPSB7XG4gICAgICAgICAgICAgICAgZmllbGQ6IHRoaXMuc29ydEZpZWxkLFxuICAgICAgICAgICAgICAgIG9yZGVyOiB0aGlzLnNvcnRPcmRlclxuICAgICAgICAgICAgfTtcbiAgICBcbiAgICAgICAgICAgIHRoaXMub25Tb3J0LmVtaXQoc29ydE1ldGEpO1xuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Tb3J0KHNvcnRNZXRhKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VyaWFsaXplZFZhbHVlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzb3J0Tm9kZXMobm9kZXMpIHtcbiAgICAgICAgaWYgKCFub2RlcyB8fCBub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBcblxuICAgICAgICBpZiAodGhpcy5jdXN0b21Tb3J0KSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRGdW5jdGlvbi5lbWl0KHtcbiAgICAgICAgICAgICAgICBkYXRhOiBub2RlcyxcbiAgICAgICAgICAgICAgICBtb2RlOiB0aGlzLnNvcnRNb2RlLFxuICAgICAgICAgICAgICAgIGZpZWxkOiB0aGlzLnNvcnRGaWVsZCxcbiAgICAgICAgICAgICAgICBvcmRlcjogdGhpcy5zb3J0T3JkZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbm9kZXMuc29ydCgobm9kZTEsIG5vZGUyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlMSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEobm9kZTEuZGF0YSwgdGhpcy5zb3J0RmllbGQpO1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZTIgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG5vZGUyLmRhdGEsIHRoaXMuc29ydEZpZWxkKTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZTEgPT0gbnVsbCAmJiB2YWx1ZTIgIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gLTE7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUxICE9IG51bGwgJiYgdmFsdWUyID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IDA7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlMSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlMiA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHZhbHVlMS5sb2NhbGVDb21wYXJlKHZhbHVlMiwgdW5kZWZpbmVkLCB7bnVtZXJpYzogdHJ1ZX0pO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMSA8IHZhbHVlMikgPyAtMSA6ICh2YWx1ZTEgPiB2YWx1ZTIpID8gMSA6IDA7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuc29ydE9yZGVyICogcmVzdWx0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnROb2Rlcyhub2RlLmNoaWxkcmVuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNvcnRNdWx0aXBsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlTb3J0TWV0YSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgIHRoaXMuc29ydE11bHRpcGxlTm9kZXModGhpcy52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNGaWx0ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMub25Tb3J0LmVtaXQoe1xuICAgICAgICAgICAgICAgIG11bHRpc29ydG1ldGE6IHRoaXMubXVsdGlTb3J0TWV0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNvcnQodGhpcy5tdWx0aVNvcnRNZXRhKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2VyaWFsaXplZFZhbHVlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzb3J0TXVsdGlwbGVOb2Rlcyhub2Rlcykge1xuICAgICAgICBpZiAoIW5vZGVzIHx8IG5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IFxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tU29ydCkge1xuICAgICAgICAgICAgdGhpcy5zb3J0RnVuY3Rpb24uZW1pdCh7XG4gICAgICAgICAgICAgICAgZGF0YTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICBtb2RlOiB0aGlzLnNvcnRNb2RlLFxuICAgICAgICAgICAgICAgIG11bHRpU29ydE1ldGE6IHRoaXMubXVsdGlTb3J0TWV0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlLnNvcnQoKG5vZGUxLCBub2RlMikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpc29ydEZpZWxkKG5vZGUxLCBub2RlMiwgdGhpcy5tdWx0aVNvcnRNZXRhLCAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRNdWx0aXBsZU5vZGVzKG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbXVsdGlzb3J0RmllbGQobm9kZTEsIG5vZGUyLCBtdWx0aVNvcnRNZXRhLCBpbmRleCkge1xuICAgICAgICBsZXQgdmFsdWUxID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShub2RlMS5kYXRhLCBtdWx0aVNvcnRNZXRhW2luZGV4XS5maWVsZCk7XG4gICAgICAgIGxldCB2YWx1ZTIgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG5vZGUyLmRhdGEsIG11bHRpU29ydE1ldGFbaW5kZXhdLmZpZWxkKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgICAgICAgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiAhPSBudWxsKVxuICAgICAgICAgICAgcmVzdWx0ID0gLTE7XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlMSAhPSBudWxsICYmIHZhbHVlMiA9PSBudWxsKVxuICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpXG4gICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlMSA9PSAnc3RyaW5nJyB8fCB2YWx1ZTEgaW5zdGFuY2VvZiBTdHJpbmcpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZTEubG9jYWxlQ29tcGFyZSAmJiAodmFsdWUxICE9IHZhbHVlMikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKG11bHRpU29ydE1ldGFbaW5kZXhdLm9yZGVyICogdmFsdWUxLmxvY2FsZUNvbXBhcmUodmFsdWUyLCB1bmRlZmluZWQsIHtudW1lcmljOiB0cnVlfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gKHZhbHVlMSA8IHZhbHVlMikgPyAtMSA6IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUxID09IHZhbHVlMikge1xuICAgICAgICAgICAgcmV0dXJuIChtdWx0aVNvcnRNZXRhLmxlbmd0aCAtIDEpID4gKGluZGV4KSA/ICh0aGlzLm11bHRpc29ydEZpZWxkKG5vZGUxLCBub2RlMiwgbXVsdGlTb3J0TWV0YSwgaW5kZXggKyAxKSkgOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChtdWx0aVNvcnRNZXRhW2luZGV4XS5vcmRlciAqIHJlc3VsdCk7XG4gICAgfVxuXG4gICAgZ2V0U29ydE1ldGEoZmllbGQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5tdWx0aVNvcnRNZXRhICYmIHRoaXMubXVsdGlTb3J0TWV0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tdWx0aVNvcnRNZXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlTb3J0TWV0YVtpXS5maWVsZCA9PT0gZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlTb3J0TWV0YVtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICBcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaXNTb3J0ZWQoZmllbGQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5zb3J0RmllbGQgJiYgdGhpcy5zb3J0RmllbGQgPT09IGZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnNvcnRNb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICBsZXQgc29ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5tdWx0aVNvcnRNZXRhKcKge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm11bHRpU29ydE1ldGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlTb3J0TWV0YVtpXS5maWVsZCA9PSBmaWVsZCnCoHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzb3J0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcbiAgICAgICAgICAgIHJvd3M6IHRoaXMudmlydHVhbFNjcm9sbCA/IHRoaXMucm93cyAqIDIgOiB0aGlzLnJvd3MsXG4gICAgICAgICAgICBzb3J0RmllbGQ6IHRoaXMuc29ydEZpZWxkLFxuICAgICAgICAgICAgc29ydE9yZGVyOiB0aGlzLnNvcnRPcmRlcixcbiAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuZmlsdGVycyxcbiAgICAgICAgICAgIGdsb2JhbEZpbHRlcjogdGhpcy5maWx0ZXJzICYmIHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10gPyB0aGlzLmZpbHRlcnNbJ2dsb2JhbCddLnZhbHVlIDogbnVsbCxcbiAgICAgICAgICAgIG11bHRpU29ydE1ldGE6IHRoaXMubXVsdGlTb3J0TWV0YVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGhhbmRsZVZpcnR1YWxTY3JvbGwoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5maXJzdCA9IChldmVudC5wYWdlIC0gMSkgKiB0aGlzLnJvd3M7XG4gICAgICAgIHRoaXMudmlydHVhbFNjcm9sbENhbGxiYWNrID0gZXZlbnQuY2FsbGJhY2s7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnpvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGxUaW1lcikge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnZpcnR1YWxTY3JvbGxUaW1lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMudmlydHVhbFNjcm9sbFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQodGhpcy5jcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCkpO1xuICAgICAgICAgICAgfSwgdGhpcy52aXJ0dWFsU2Nyb2xsRGVsYXkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZmlsdGVyZWROb2Rlc3x8dGhpcy52YWx1ZTtcbiAgICAgICAgcmV0dXJuIGRhdGEgPT0gbnVsbCB8fCBkYXRhLmxlbmd0aCA9PSAwO1xuICAgIH1cblxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnTCoHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICB9XG4gICAgXG4gICAgb25Db2x1bW5SZXNpemVCZWdpbihldmVudCkge1xuICAgICAgICBsZXQgY29udGFpbmVyTGVmdCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpLmxlZnQ7XG4gICAgICAgIHRoaXMubGFzdFJlc2l6ZXJIZWxwZXJYID0gKGV2ZW50LnBhZ2VYIC0gY29udGFpbmVyTGVmdCArIHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Db2x1bW5SZXNpemUoZXZlbnQpIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lckxlZnQgPSBEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KS5sZWZ0O1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICd1aS11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgICAgICB0aGlzLnJlc2l6ZUhlbHBlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgdGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSAwICsgJ3B4JztcbiAgICAgICAgdGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gKGV2ZW50LnBhZ2VYIC0gY29udGFpbmVyTGVmdCArIHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCkgKyAncHgnO1xuXG4gICAgICAgIHRoaXMucmVzaXplSGVscGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfVxuXG4gICAgb25Db2x1bW5SZXNpemVFbmQoZXZlbnQsIGNvbHVtbikge1xuICAgICAgICBsZXQgZGVsdGEgPSB0aGlzLnJlc2l6ZUhlbHBlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50Lm9mZnNldExlZnQgLSB0aGlzLmxhc3RSZXNpemVySGVscGVyWDtcbiAgICAgICAgbGV0IGNvbHVtbldpZHRoID0gY29sdW1uLm9mZnNldFdpZHRoO1xuICAgICAgICBsZXQgbmV3Q29sdW1uV2lkdGggPSBjb2x1bW5XaWR0aCArIGRlbHRhO1xuICAgICAgICBsZXQgbWluV2lkdGggPSBjb2x1bW4uc3R5bGUubWluV2lkdGggfHwgMTU7XG5cbiAgICAgICAgaWYgKGNvbHVtbldpZHRoICsgZGVsdGEgPiBwYXJzZUludChtaW5XaWR0aCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbHVtblJlc2l6ZU1vZGUgPT09ICdmaXQnKSB7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDb2x1bW4gPSBjb2x1bW4ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIHdoaWxlICghbmV4dENvbHVtbi5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENvbHVtbiA9IG5leHRDb2x1bW4ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChuZXh0Q29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sdW1uV2lkdGggPSBuZXh0Q29sdW1uLm9mZnNldFdpZHRoIC0gZGVsdGE7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sdW1uTWluV2lkdGggPSBuZXh0Q29sdW1uLnN0eWxlLm1pbldpZHRoIHx8IDE1O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdDb2x1bW5XaWR0aCA+IDE1ICYmIG5leHRDb2x1bW5XaWR0aCA+IHBhcnNlSW50KG5leHRDb2x1bW5NaW5XaWR0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsYWJsZVZpZXcgPSB0aGlzLmZpbmRQYXJlbnRTY3JvbGxhYmxlVmlldyhjb2x1bW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxhYmxlQm9keVRhYmxlID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVWaWV3LCAndGFibGUudWktdHJlZXRhYmxlLXNjcm9sbGFibGUtYm9keS10YWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxhYmxlSGVhZGVyVGFibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZVZpZXcsICd0YWJsZS51aS10cmVldGFibGUtc2Nyb2xsYWJsZS1oZWFkZXItdGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsYWJsZUZvb3RlclRhYmxlID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVWaWV3LCAndGFibGUudWktdHJlZXRhYmxlLXNjcm9sbGFibGUtZm9vdGVyLXRhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc2l6ZUNvbHVtbkluZGV4ID0gRG9tSGFuZGxlci5pbmRleChjb2x1bW4pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVDb2xHcm91cChzY3JvbGxhYmxlSGVhZGVyVGFibGUsIHJlc2l6ZUNvbHVtbkluZGV4LCBuZXdDb2x1bW5XaWR0aCwgbmV4dENvbHVtbldpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUNvbEdyb3VwKHNjcm9sbGFibGVCb2R5VGFibGUsIHJlc2l6ZUNvbHVtbkluZGV4LCBuZXdDb2x1bW5XaWR0aCwgbmV4dENvbHVtbldpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUNvbEdyb3VwKHNjcm9sbGFibGVGb290ZXJUYWJsZSwgcmVzaXplQ29sdW1uSW5kZXgsIG5ld0NvbHVtbldpZHRoLCBuZXh0Q29sdW1uV2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uLnN0eWxlLndpZHRoID0gbmV3Q29sdW1uV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0Q29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRDb2x1bW4uc3R5bGUud2lkdGggPSBuZXh0Q29sdW1uV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY29sdW1uUmVzaXplTW9kZSA9PT0gJ2V4cGFuZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxhYmxlVmlldyA9IHRoaXMuZmluZFBhcmVudFNjcm9sbGFibGVWaWV3KGNvbHVtbik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxhYmxlQm9keVRhYmxlID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVWaWV3LCAndGFibGUudWktdHJlZXRhYmxlLXNjcm9sbGFibGUtYm9keS10YWJsZScpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2Nyb2xsYWJsZUhlYWRlclRhYmxlID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHNjcm9sbGFibGVWaWV3LCAndGFibGUudWktdHJlZXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyLXRhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY3JvbGxhYmxlRm9vdGVyVGFibGUgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUoc2Nyb2xsYWJsZVZpZXcsICd0YWJsZS51aS10cmVldGFibGUtc2Nyb2xsYWJsZS1mb290ZXItdGFibGUnKTtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsYWJsZUJvZHlUYWJsZS5zdHlsZS53aWR0aCA9IHNjcm9sbGFibGVCb2R5VGFibGUub2Zmc2V0V2lkdGggKyBkZWx0YSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbGFibGVIZWFkZXJUYWJsZS5zdHlsZS53aWR0aCA9IHNjcm9sbGFibGVIZWFkZXJUYWJsZS5vZmZzZXRXaWR0aCArIGRlbHRhICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcm9sbGFibGVGb290ZXJUYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsYWJsZUZvb3RlclRhYmxlLnN0eWxlLndpZHRoID0gc2Nyb2xsYWJsZUZvb3RlclRhYmxlLm9mZnNldFdpZHRoICsgZGVsdGEgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXNpemVDb2x1bW5JbmRleCA9IERvbUhhbmRsZXIuaW5kZXgoY29sdW1uKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUNvbEdyb3VwKHNjcm9sbGFibGVIZWFkZXJUYWJsZSwgcmVzaXplQ29sdW1uSW5kZXgsIG5ld0NvbHVtbldpZHRoLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVDb2xHcm91cChzY3JvbGxhYmxlQm9keVRhYmxlLCByZXNpemVDb2x1bW5JbmRleCwgbmV3Q29sdW1uV2lkdGgsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUNvbEdyb3VwKHNjcm9sbGFibGVGb290ZXJUYWJsZSwgcmVzaXplQ29sdW1uSW5kZXgsIG5ld0NvbHVtbldpZHRoLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFibGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHRoaXMudGFibGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCArIGRlbHRhICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uLnN0eWxlLndpZHRoID0gbmV3Q29sdW1uV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29udGFpbmVyV2lkdGggPSB0aGlzLnRhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSBjb250YWluZXJXaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uQ29sUmVzaXplLmVtaXQoe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGNvbHVtbixcbiAgICAgICAgICAgICAgICBkZWx0YTogZGVsdGFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICd1aS11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgIH1cblxuICAgIGZpbmRQYXJlbnRTY3JvbGxhYmxlVmlldyhjb2x1bW4pIHtcbiAgICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICAgICAgbGV0IHBhcmVudCA9IGNvbHVtbi5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgd2hpbGUgKHBhcmVudCAmJiAhRG9tSGFuZGxlci5oYXNDbGFzcyhwYXJlbnQsICd1aS10cmVldGFibGUtc2Nyb2xsYWJsZS12aWV3JykpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzaXplQ29sR3JvdXAodGFibGUsIHJlc2l6ZUNvbHVtbkluZGV4LCBuZXdDb2x1bW5XaWR0aCwgbmV4dENvbHVtbldpZHRoKSB7XG4gICAgICAgIGlmICh0YWJsZSkge1xuICAgICAgICAgICAgbGV0IGNvbEdyb3VwID0gdGFibGUuY2hpbGRyZW5bMF0ubm9kZU5hbWUgPT09ICdDT0xHUk9VUCcgPyB0YWJsZS5jaGlsZHJlblswXSA6IG51bGw7XG5cbiAgICAgICAgICAgIGlmIChjb2xHcm91cCkge1xuICAgICAgICAgICAgICAgIGxldCBjb2wgPSBjb2xHcm91cC5jaGlsZHJlbltyZXNpemVDb2x1bW5JbmRleF07XG4gICAgICAgICAgICAgICAgbGV0IG5leHRDb2wgPSBjb2wubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGNvbC5zdHlsZS53aWR0aCA9IG5ld0NvbHVtbldpZHRoICsgJ3B4JztcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAobmV4dENvbCAmJiBuZXh0Q29sdW1uV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dENvbC5zdHlsZS53aWR0aCA9IG5leHRDb2x1bW5XaWR0aCArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgXCJTY3JvbGxhYmxlIHRhYmxlcyByZXF1aXJlIGEgY29sZ3JvdXAgdG8gc3VwcG9ydCByZXNpemFibGUgY29sdW1uc1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db2x1bW5EcmFnU3RhcnQoZXZlbnQsIGNvbHVtbkVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5yZW9yZGVySWNvbldpZHRoID0gRG9tSGFuZGxlci5nZXRIaWRkZW5FbGVtZW50T3V0ZXJXaWR0aCh0aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5yZW9yZGVySWNvbkhlaWdodCA9IERvbUhhbmRsZXIuZ2V0SGlkZGVuRWxlbWVudE91dGVySGVpZ2h0KHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMuZHJhZ2dlZENvbHVtbiA9IGNvbHVtbkVsZW1lbnQ7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJ2InKTsgICAgLy8gRm9yIGZpcmVmb3hcbiAgICB9XG5cbiAgICBvbkNvbHVtbkRyYWdFbnRlcihldmVudCwgZHJvcEhlYWRlcikge1xuICAgICAgICBpZiAodGhpcy5yZW9yZGVyYWJsZUNvbHVtbnMgJiYgdGhpcy5kcmFnZ2VkQ29sdW1uICYmIGRyb3BIZWFkZXIpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgY29udGFpbmVyT2Zmc2V0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgZHJvcEhlYWRlck9mZnNldCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KGRyb3BIZWFkZXIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2VkQ29sdW1uICE9IGRyb3BIZWFkZXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0TGVmdCA9IGRyb3BIZWFkZXJPZmZzZXQubGVmdCAtIGNvbnRhaW5lck9mZnNldC5sZWZ0O1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRUb3AgPSBjb250YWluZXJPZmZzZXQudG9wIC0gZHJvcEhlYWRlck9mZnNldC50b3A7XG4gICAgICAgICAgICAgICAgbGV0IGNvbHVtbkNlbnRlciA9IGRyb3BIZWFkZXJPZmZzZXQubGVmdCArIGRyb3BIZWFkZXIub2Zmc2V0V2lkdGggLyAyO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yVXBWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBkcm9wSGVhZGVyT2Zmc2V0LnRvcCAtIGNvbnRhaW5lck9mZnNldC50b3AgLSAodGhpcy5yZW9yZGVySWNvbkhlaWdodCAtIDEpICsgJ3B4JztcbiAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gZHJvcEhlYWRlck9mZnNldC50b3AgLSBjb250YWluZXJPZmZzZXQudG9wICsgZHJvcEhlYWRlci5vZmZzZXRIZWlnaHQgKyAncHgnO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnBhZ2VYID4gY29sdW1uQ2VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICh0YXJnZXRMZWZ0ICsgZHJvcEhlYWRlci5vZmZzZXRXaWR0aCAtIE1hdGguY2VpbCh0aGlzLnJlb3JkZXJJY29uV2lkdGggLyAyKSkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICh0YXJnZXRMZWZ0ICsgZHJvcEhlYWRlci5vZmZzZXRXaWR0aCAtIE1hdGguY2VpbCh0aGlzLnJlb3JkZXJJY29uV2lkdGggLyAyKSkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3BQb3NpdGlvbiA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSAodGFyZ2V0TGVmdCAtIE1hdGguY2VpbCh0aGlzLnJlb3JkZXJJY29uV2lkdGggLyAyKSkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICh0YXJnZXRMZWZ0IC0gTWF0aC5jZWlsKHRoaXMucmVvcmRlckljb25XaWR0aCAvIDIpKSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJvcFBvc2l0aW9uID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yVXBWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29sdW1uRHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnJlb3JkZXJhYmxlQ29sdW1ucyAmJiB0aGlzLmRyYWdnZWRDb2x1bW4pIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29sdW1uRHJvcChldmVudCwgZHJvcENvbHVtbikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5kcmFnZ2VkQ29sdW1uKSB7XG4gICAgICAgICAgICBsZXQgZHJhZ0luZGV4ID0gRG9tSGFuZGxlci5pbmRleFdpdGhpbkdyb3VwKHRoaXMuZHJhZ2dlZENvbHVtbiwgJ3R0cmVvcmRlcmFibGVjb2x1bW4nKTtcbiAgICAgICAgICAgIGxldCBkcm9wSW5kZXggPSBEb21IYW5kbGVyLmluZGV4V2l0aGluR3JvdXAoZHJvcENvbHVtbiwgJ3R0cmVvcmRlcmFibGVjb2x1bW4nKTtcbiAgICAgICAgICAgIGxldCBhbGxvd0Ryb3AgPSAoZHJhZ0luZGV4ICE9IGRyb3BJbmRleCk7XG4gICAgICAgICAgICBpZiAoYWxsb3dEcm9wICYmICgoZHJvcEluZGV4IC0gZHJhZ0luZGV4ID09IDEgJiYgdGhpcy5kcm9wUG9zaXRpb24gPT09IC0xKSB8fCAoZHJhZ0luZGV4IC0gZHJvcEluZGV4ID09IDEgJiYgdGhpcy5kcm9wUG9zaXRpb24gPT09IDEpKSkge1xuICAgICAgICAgICAgICAgIGFsbG93RHJvcCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWxsb3dEcm9wICYmICgoZHJvcEluZGV4IDwgZHJhZ0luZGV4ICYmIHRoaXMuZHJvcFBvc2l0aW9uID09PSAxKSkpIHtcbiAgICAgICAgICAgICAgICBkcm9wSW5kZXggPSBkcm9wSW5kZXggKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWxsb3dEcm9wICYmICgoZHJvcEluZGV4ID4gZHJhZ0luZGV4ICYmIHRoaXMuZHJvcFBvc2l0aW9uID09PSAtMSkpKSB7XG4gICAgICAgICAgICAgICAgZHJvcEluZGV4ID0gZHJvcEluZGV4IC0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFsbG93RHJvcCkge1xuICAgICAgICAgICAgICAgIE9iamVjdFV0aWxzLnJlb3JkZXJBcnJheSh0aGlzLmNvbHVtbnMsIGRyYWdJbmRleCwgZHJvcEluZGV4KTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25Db2xSZW9yZGVyLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBkcmFnSW5kZXg6IGRyYWdJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZHJvcEluZGV4OiBkcm9wSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY29sdW1uc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dlZENvbHVtbi5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dlZENvbHVtbiA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmRyb3BQb3NpdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVSb3dDbGljayhldmVudCkge1xuICAgICAgICBsZXQgdGFyZ2V0Tm9kZSA9ICg8SFRNTEVsZW1lbnQ+IGV2ZW50Lm9yaWdpbmFsRXZlbnQudGFyZ2V0KS5ub2RlTmFtZTtcbiAgICAgICAgaWYgKHRhcmdldE5vZGUgPT0gJ0lOUFVUJyB8fCB0YXJnZXROb2RlID09ICdCVVRUT04nIHx8IHRhcmdldE5vZGUgPT0gJ0EnIHx8IChEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50Lm9yaWdpbmFsRXZlbnQudGFyZ2V0LCAndWktY2xpY2thYmxlJykpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICBsZXQgcm93Tm9kZSA9IGV2ZW50LnJvd05vZGU7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLmlzU2VsZWN0ZWQocm93Tm9kZS5ub2RlKTtcbiAgICAgICAgICAgIGxldCBtZXRhU2VsZWN0aW9uID0gdGhpcy5yb3dUb3VjaGVkID8gZmFsc2UgOiB0aGlzLm1ldGFLZXlTZWxlY3Rpb247XG4gICAgICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93Tm9kZS5ub2RlLmRhdGEsIHRoaXMuZGF0YUtleSkpIDogbnVsbDtcblxuICAgICAgICAgICAgaWYgKG1ldGFTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBsZXQgbWV0YUtleSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQubWV0YUtleXx8ZXZlbnQub3JpZ2luYWxFdmVudC5jdHJsS2V5O1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICYmIG1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKHJvd05vZGUubm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbCxpKSA9PiBpICE9IHNlbGVjdGlvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlVW5zZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgbm9kZTogcm93Tm9kZS5ub2RlLCB0eXBlOiAncm93J30pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHJvd05vZGUubm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQocm93Tm9kZS5ub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0YUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9ufHxbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBbLi4udGhpcy5zZWxlY3Rpb24sIHJvd05vZGUubm9kZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBub2RlOiByb3dOb2RlLm5vZGUsIHR5cGU6ICdyb3cnLCBpbmRleDogZXZlbnQucm93SW5kZXh9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgbm9kZTogcm93Tm9kZS5ub2RlLCB0eXBlOiAncm93JyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHJvd05vZGUubm9kZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVTZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIG5vZGU6IHJvd05vZGUubm9kZSwgdHlwZTogJ3JvdycsIGluZGV4OiBldmVudC5yb3dJbmRleCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbkluZGV4ID0gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihyb3dOb2RlLm5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsIGkpID0+IGkgIT0gc2VsZWN0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVVuc2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBub2RlOiByb3dOb2RlLm5vZGUsIHR5cGU6ICdyb3cnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uID8gWy4uLnRoaXMuc2VsZWN0aW9uLCByb3dOb2RlLm5vZGVdIDogW3Jvd05vZGUubm9kZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlU2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBub2RlOiByb3dOb2RlLm5vZGUsIHR5cGU6ICdyb3cnLCBpbmRleDogZXZlbnQucm93SW5kZXggfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yb3dUb3VjaGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaGFuZGxlUm93VG91Y2hFbmQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5yb3dUb3VjaGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoYW5kbGVSb3dSaWdodENsaWNrKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHRNZW51KSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gZXZlbnQucm93Tm9kZS5ub2RlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0TWVudVNlbGVjdGlvbk1vZGUgPT09ICdzZXBhcmF0ZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51U2VsZWN0aW9uID0gbm9kZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51U2VsZWN0aW9uQ2hhbmdlLmVtaXQobm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbnRleHRNZW51U2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIG5vZGU6IG5vZGV9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51LnNob3coZXZlbnQub3JpZ2luYWxFdmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Db250ZXh0TWVudShub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY29udGV4dE1lbnVTZWxlY3Rpb25Nb2RlID09PSAnam9pbnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChub2RlKTtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEobm9kZS5kYXRhLCB0aGlzLmRhdGFLZXkpKSA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IG5vZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaXNNdWx0aXBsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbbm9kZV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuc2hvdyhldmVudC5vcmlnaW5hbEV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29udGV4dE1lbnVTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgbm9kZTogbm9kZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlTm9kZVdpdGhDaGVja2JveChldmVudCkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9ufHxbXTtcbiAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICBsZXQgbm9kZSA9IGV2ZW50LnJvd05vZGUubm9kZTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKG5vZGUpO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVTZWxlY3Rpb25Eb3duKG5vZGUsIGZhbHNlKTtcbiAgICAgICAgICAgIGlmIChldmVudC5yb3dOb2RlLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlU2VsZWN0aW9uVXAobm9kZS5wYXJlbnQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogbm9kZX0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVTZWxlY3Rpb25Eb3duKG5vZGUsIHRydWUpO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnJvd05vZGUucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVTZWxlY3Rpb25VcChub2RlLnBhcmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMub25Ob2RlU2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIHRvZ2dsZU5vZGVzV2l0aENoZWNrYm94KGV2ZW50OiBFdmVudCwgY2hlY2s6IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmZpbHRlcmVkTm9kZXMgfHwgdGhpcy52YWx1ZTtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gY2hlY2sgJiYgZGF0YSA/IGRhdGEuc2xpY2UoKSA6IFtdO1xuICAgICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlU2VsZWN0aW9uRG93bihub2RlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuX3NlbGVjdGlvbik7XG4gICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICAgIHRoaXMub25IZWFkZXJDaGVja2JveFRvZ2dsZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgY2hlY2tlZDogY2hlY2t9KTtcbiAgICB9XG4gICAgXG4gICAgcHJvcGFnYXRlU2VsZWN0aW9uVXAobm9kZTogVHJlZU5vZGUsIHNlbGVjdDogYm9vbGVhbikge1xuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkQ2hpbGRDb3VudDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGxldCBjaGlsZFBhcnRpYWxTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZSA9IHRoaXMuZGF0YUtleSA/IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG5vZGUuZGF0YSwgdGhpcy5kYXRhS2V5KSkgOiBudWxsO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZChjaGlsZCkpXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDaGlsZENvdW50Kys7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY2hpbGQucGFydGlhbFNlbGVjdGVkKVxuICAgICAgICAgICAgICAgICAgICBjaGlsZFBhcnRpYWxTZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzZWxlY3QgJiYgc2VsZWN0ZWRDaGlsZENvdW50ID09IG5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gIFsuLi50aGlzLnNlbGVjdGlvbnx8W10sIG5vZGVdO1xuICAgICAgICAgICAgICAgIG5vZGUucGFydGlhbFNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7ICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24obm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSAgdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsaSkgPT4gaSE9aW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChjaGlsZFBhcnRpYWxTZWxlY3RlZCB8fCBzZWxlY3RlZENoaWxkQ291bnQgPiAwICYmIHNlbGVjdGVkQ2hpbGRDb3VudCAhPSBub2RlLmNoaWxkcmVuLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJ0aWFsU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJ0aWFsU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICBsZXQgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XG4gICAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlU2VsZWN0aW9uVXAocGFyZW50LCBzZWxlY3QpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHByb3BhZ2F0ZVNlbGVjdGlvbkRvd24obm9kZTogVHJlZU5vZGUsIHNlbGVjdDogYm9vbGVhbikge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xuICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEobm9kZS5kYXRhLCB0aGlzLmRhdGFLZXkpKSA6IG51bGw7XG4gICAgICAgIFxuICAgICAgICBpZiAoc2VsZWN0ICYmIGluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSAgWy4uLnRoaXMuc2VsZWN0aW9ufHxbXSxub2RlXVxuICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghc2VsZWN0ICYmIGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9ICB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbCxpKSA9PiBpIT1pbmRleCk7XG4gICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBub2RlLnBhcnRpYWxTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZVNlbGVjdGlvbkRvd24oY2hpbGQsIHNlbGVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUgJiYgdGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGFLZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25LZXlzW09iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEobm9kZS5kYXRhLCB0aGlzLmRhdGFLZXkpXSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpID4gLTE7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lcXVhbHMobm9kZSwgdGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGU6IGFueSkge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IC0xO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24gJiYgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXF1YWxzKG5vZGUsIHRoaXMuc2VsZWN0aW9uW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBpc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnO1xuICAgIH1cblxuICAgIGlzTXVsdGlwbGVTZWxlY3Rpb25Nb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnbXVsdGlwbGUnO1xuICAgIH1cblxuICAgIGVxdWFscyhub2RlMSwgbm9kZTIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZVNlbGVjdGlvbkJ5ID09PSAnZXF1YWxzJyA/IChub2RlMSA9PT0gbm9kZTIpIDogT2JqZWN0VXRpbHMuZXF1YWxzKG5vZGUxLmRhdGEsIG5vZGUyLmRhdGEsIHRoaXMuZGF0YUtleSk7XG4gICAgfVxuXG4gICAgZmlsdGVyKHZhbHVlLCBmaWVsZCwgbWF0Y2hNb2RlKSB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlclRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmZpbHRlclRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMuaXNGaWx0ZXJCbGFuayh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyc1tmaWVsZF0gPSB7IHZhbHVlOiB2YWx1ZSwgbWF0Y2hNb2RlOiBtYXRjaE1vZGUgfTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmZpbHRlcnNbZmllbGRdKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5maWx0ZXJzW2ZpZWxkXTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5maWx0ZXJUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9maWx0ZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVGltZW91dCA9IG51bGw7XG4gICAgICAgIH0sIHRoaXMuZmlsdGVyRGVsYXkpO1xuICAgIH1cblxuICAgIGZpbHRlckdsb2JhbCh2YWx1ZSwgbWF0Y2hNb2RlKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyKHZhbHVlLCAnZ2xvYmFsJywgbWF0Y2hNb2RlKTtcbiAgICB9XG5cbiAgICBpc0ZpbHRlckJsYW5rKGZpbHRlcjogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChmaWx0ZXIgIT09IG51bGwgJiYgZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICgodHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZycgJiYgZmlsdGVyLnRyaW0oKS5sZW5ndGggPT0gMCkgfHwgKGZpbHRlciBpbnN0YW5jZW9mIEFycmF5ICYmIGZpbHRlci5sZW5ndGggPT0gMCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9maWx0ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0ZpbHRlcigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZE5vZGVzID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSB0aGlzLnZhbHVlID8gdGhpcy52YWx1ZS5sZW5ndGggOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBnbG9iYWxGaWx0ZXJGaWVsZHNBcnJheTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzWydnbG9iYWwnXSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29sdW1ucyAmJiAhdGhpcy5nbG9iYWxGaWx0ZXJGaWVsZHMpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0dsb2JhbCBmaWx0ZXJpbmcgcmVxdWlyZXMgZHluYW1pYyBjb2x1bW5zIG9yIGdsb2JhbEZpbHRlckZpZWxkcyB0byBiZSBkZWZpbmVkLicpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxGaWx0ZXJGaWVsZHNBcnJheSA9IHRoaXMuZ2xvYmFsRmlsdGVyRmllbGRzfHx0aGlzLmNvbHVtbnM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWROb2RlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzU3RyaWN0TW9kZSA9IHRoaXMuZmlsdGVyTW9kZSA9PT0gJ3N0cmljdCc7XG4gICAgICAgICAgICAgICAgbGV0IGlzVmFsdWVDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcHlOb2RlID0gey4uLm5vZGV9O1xuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxNYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBnbG9iYWxNYXRjaCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGFyYW1zV2l0aG91dE5vZGU7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gdGhpcy5maWx0ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzLmhhc093blByb3BlcnR5KHByb3ApICYmIHByb3AgIT09ICdnbG9iYWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlck1ldGEgPSB0aGlzLmZpbHRlcnNbcHJvcF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlckZpZWxkID0gcHJvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSBmaWx0ZXJNZXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJNYXRjaE1vZGUgPSBmaWx0ZXJNZXRhLm1hdGNoTW9kZSB8fCAnc3RhcnRzV2l0aCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlckNvbnN0cmFpbnQgPSBGaWx0ZXJVdGlsc1tmaWx0ZXJNYXRjaE1vZGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtc1dpdGhvdXROb2RlID0ge2ZpbHRlckZpZWxkLCBmaWx0ZXJWYWx1ZSwgZmlsdGVyQ29uc3RyYWludCwgaXNTdHJpY3RNb2RlfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGlzU3RyaWN0TW9kZSAmJiAhKHRoaXMuZmluZEZpbHRlcmVkTm9kZXMoY29weU5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSB8fCB0aGlzLmlzRmlsdGVyTWF0Y2hlZChjb3B5Tm9kZSwgcGFyYW1zV2l0aG91dE5vZGUpKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCFpc1N0cmljdE1vZGUgJiYgISh0aGlzLmlzRmlsdGVyTWF0Y2hlZChjb3B5Tm9kZSwgcGFyYW1zV2l0aG91dE5vZGUpIHx8IHRoaXMuZmluZEZpbHRlcmVkTm9kZXMoY29weU5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbE1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbG9jYWxNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10gJiYgIWdsb2JhbE1hdGNoICYmIGdsb2JhbEZpbHRlckZpZWxkc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgZ2xvYmFsRmlsdGVyRmllbGRzQXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY29weU5vZGVGb3JHbG9iYWwgPSB7Li4uY29weU5vZGV9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJGaWVsZCA9IGdsb2JhbEZpbHRlckZpZWxkc0FycmF5W2pdLmZpZWxkfHxnbG9iYWxGaWx0ZXJGaWVsZHNBcnJheVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSB0aGlzLmZpbHRlcnNbJ2dsb2JhbCddLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJDb25zdHJhaW50ID0gRmlsdGVyVXRpbHNbdGhpcy5maWx0ZXJzWydnbG9iYWwnXS5tYXRjaE1vZGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtc1dpdGhvdXROb2RlID0ge2ZpbHRlckZpZWxkLCBmaWx0ZXJWYWx1ZSwgZmlsdGVyQ29uc3RyYWludCwgaXNTdHJpY3RNb2RlfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoaXNTdHJpY3RNb2RlICYmICh0aGlzLmZpbmRGaWx0ZXJlZE5vZGVzKGNvcHlOb2RlRm9yR2xvYmFsLCBwYXJhbXNXaXRob3V0Tm9kZSkgfHwgdGhpcy5pc0ZpbHRlck1hdGNoZWQoY29weU5vZGVGb3JHbG9iYWwsIHBhcmFtc1dpdGhvdXROb2RlKSkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICghaXNTdHJpY3RNb2RlICYmICh0aGlzLmlzRmlsdGVyTWF0Y2hlZChjb3B5Tm9kZUZvckdsb2JhbCwgcGFyYW1zV2l0aG91dE5vZGUpIHx8IHRoaXMuZmluZEZpbHRlcmVkTm9kZXMoY29weU5vZGVGb3JHbG9iYWwsIHBhcmFtc1dpdGhvdXROb2RlKSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxNYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3B5Tm9kZSA9IGNvcHlOb2RlRm9yR2xvYmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgbWF0Y2hlcyA9IGxvY2FsTWF0Y2g7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcnNbJ2dsb2JhbCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzID0gbG9jYWxNYXRjaCAmJiBnbG9iYWxNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkTm9kZXMucHVzaChjb3B5Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpc1ZhbHVlQ2hhbmdlZCA9IGlzVmFsdWVDaGFuZ2VkIHx8ICFsb2NhbE1hdGNoIHx8IGdsb2JhbE1hdGNoIHx8IChsb2NhbE1hdGNoICYmIHRoaXMuZmlsdGVyZWROb2Rlcy5sZW5ndGggPiAwKSB8fCAoIWdsb2JhbE1hdGNoICYmIHRoaXMuZmlsdGVyZWROb2Rlcy5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIGlmICghaXNWYWx1ZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJlZE5vZGVzID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gdGhpcy5maWx0ZXJlZE5vZGVzID8gdGhpcy5maWx0ZXJlZE5vZGVzLmxlbmd0aCA6IHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJzdCA9IDA7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyZWRWYWx1ZSA9IHRoaXMuZmlsdGVyZWROb2RlcyB8fCB0aGlzLnZhbHVlO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5vbkZpbHRlci5lbWl0KHtcbiAgICAgICAgICAgIGZpbHRlcnM6IHRoaXMuZmlsdGVycyxcbiAgICAgICAgICAgIGZpbHRlcmVkVmFsdWU6IGZpbHRlcmVkVmFsdWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25VSVVwZGF0ZShmaWx0ZXJlZFZhbHVlKTtcbiAgICAgICAgdGhpcy51cGRhdGVTZXJpYWxpemVkVmFsdWUoKTtcbiAgICB9XG5cbiAgICBmaW5kRmlsdGVyZWROb2Rlcyhub2RlLCBwYXJhbXNXaXRob3V0Tm9kZSkge1xuICAgICAgICBpZiAobm9kZSkge1xuICAgICAgICAgICAgbGV0IG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNoaWxkTm9kZXMgPSBbLi4ubm9kZS5jaGlsZHJlbl07XG4gICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkTm9kZSBvZiBjaGlsZE5vZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb3B5Q2hpbGROb2RlID0gey4uLmNoaWxkTm9kZX07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRmlsdGVyTWF0Y2hlZChjb3B5Q2hpbGROb2RlLCBwYXJhbXNXaXRob3V0Tm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5wdXNoKGNvcHlDaGlsZE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAobWF0Y2hlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNGaWx0ZXJNYXRjaGVkKG5vZGUsIHtmaWx0ZXJGaWVsZCwgZmlsdGVyVmFsdWUsIGZpbHRlckNvbnN0cmFpbnQsIGlzU3RyaWN0TW9kZX0pIHtcbiAgICAgICAgbGV0IG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGRhdGFGaWVsZFZhbHVlID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShub2RlLmRhdGEsIGZpbHRlckZpZWxkKTtcbiAgICAgICAgaWYgKGZpbHRlckNvbnN0cmFpbnQoZGF0YUZpZWxkVmFsdWUsIGZpbHRlclZhbHVlKSkge1xuICAgICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW1hdGNoZWQgfHwgKGlzU3RyaWN0TW9kZSAmJiAhdGhpcy5pc05vZGVMZWFmKG5vZGUpKSkge1xuICAgICAgICAgICAgbWF0Y2hlZCA9IHRoaXMuZmluZEZpbHRlcmVkTm9kZXMobm9kZSwge2ZpbHRlckZpZWxkLCBmaWx0ZXJWYWx1ZSwgZmlsdGVyQ29uc3RyYWludCwgaXNTdHJpY3RNb2RlfSkgfHwgbWF0Y2hlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtYXRjaGVkO1xuICAgIH1cblxuICAgIGlzTm9kZUxlYWYobm9kZSkge1xuICAgICAgICByZXR1cm4gbm9kZS5sZWFmID09PSBmYWxzZSA/IGZhbHNlIDogIShub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBoYXNGaWx0ZXIoKSB7XG4gICAgICAgIGxldCBlbXB0eSA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IHByb3AgaW4gdGhpcy5maWx0ZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgZW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhZW1wdHk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlc2V0KCkge1xuICAgICAgICB0aGlzLl9zb3J0RmllbGQgPSBudWxsO1xuICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSAxO1xuICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Tb3J0KG51bGwpO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyZWROb2RlcyA9IG51bGw7XG4gICAgICAgIHRoaXMuZmlsdGVycyA9IHt9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICB0aGlzLmZpcnN0ID0gMDtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzID0gKHRoaXMuX3ZhbHVlID8gdGhpcy5fdmFsdWUubGVuZ3RoIDogMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVFZGl0aW5nQ2VsbChjZWxsKSB7XG4gICAgICAgIHRoaXMuZWRpdGluZ0NlbGwgPSBjZWxsO1xuICAgICAgICB0aGlzLmJpbmREb2N1bWVudEVkaXRMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIGlzRWRpdGluZ0NlbGxWYWxpZCgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmVkaXRpbmdDZWxsICYmIERvbUhhbmRsZXIuZmluZCh0aGlzLmVkaXRpbmdDZWxsLCAnLm5nLWludmFsaWQubmctZGlydHknKS5sZW5ndGggPT09IDApO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudEVkaXRMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZWRpdGluZ0NlbGwgJiYgIXRoaXMuZWRpdGluZ0NlbGxDbGljayAmJiB0aGlzLmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5lZGl0aW5nQ2VsbCwgJ3VpLWVkaXRpbmctY2VsbCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudEVkaXRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdGluZ0NlbGxDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAgXG4gICAgdW5iaW5kRG9jdW1lbnRFZGl0TGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZG9jdW1lbnRFZGl0TGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVkaXRMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudEVkaXRMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmVkaXRpbmdDZWxsID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IG51bGw7XG4gICAgfVxuXG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3BUcmVlVGFibGVCb2R5XScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC1zZXJpYWxpemVkTm9kZSBsZXQtcm93SW5kZXg9XCJpbmRleFwiIFtuZ0Zvck9mXT1cInR0LnNlcmlhbGl6ZWRWYWx1ZVwiIFtuZ0ZvclRyYWNrQnldPVwidHQucm93VHJhY2tCeVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInNlcmlhbGl6ZWROb2RlLnZpc2libGVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHNlcmlhbGl6ZWROb2RlLCBub2RlOiBzZXJpYWxpemVkTm9kZS5ub2RlLCByb3dEYXRhOiBzZXJpYWxpemVkTm9kZS5ub2RlLmRhdGEsIGNvbHVtbnM6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInR0LmlzRW1wdHkoKVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInR0LmVtcHR5TWVzc2FnZVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRUQm9keSB7XG5cbiAgICBASW5wdXQoXCJwVHJlZVRhYmxlQm9keVwiKSBjb2x1bW5zOiBhbnlbXTtcblxuICAgIEBJbnB1dChcInBUcmVlVGFibGVCb2R5VGVtcGxhdGVcIikgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHQ6IFRyZWVUYWJsZSkge31cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbdHRTY3JvbGxhYmxlVmlld10nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI3Njcm9sbEhlYWRlciBjbGFzcz1cInVpLXRyZWV0YWJsZS1zY3JvbGxhYmxlLWhlYWRlciB1aS13aWRnZXQtaGVhZGVyXCI+XG4gICAgICAgICAgICA8ZGl2ICNzY3JvbGxIZWFkZXJCb3ggY2xhc3M9XCJ1aS10cmVldGFibGUtc2Nyb2xsYWJsZS1oZWFkZXItYm94XCI+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidWktdHJlZXRhYmxlLXNjcm9sbGFibGUtaGVhZGVyLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmcm96ZW4gPyB0dC5mcm96ZW5Db2xHcm91cFRlbXBsYXRlfHx0dC5jb2xHcm91cFRlbXBsYXRlIDogdHQuY29sR3JvdXBUZW1wbGF0ZTsgY29udGV4dCB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3M9XCJ1aS10cmVldGFibGUtdGhlYWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmcm96ZW4gPyB0dC5mcm96ZW5IZWFkZXJUZW1wbGF0ZXx8dHQuaGVhZGVyVGVtcGxhdGUgOiB0dC5oZWFkZXJUZW1wbGF0ZTsgY29udGV4dCB7JGltcGxpY2l0OiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgI3Njcm9sbEJvZHkgY2xhc3M9XCJ1aS10cmVldGFibGUtc2Nyb2xsYWJsZS1ib2R5XCI+XG4gICAgICAgICAgICA8dGFibGUgI3Njcm9sbFRhYmxlIFtuZ0NsYXNzXT1cInsndWktdHJlZXRhYmxlLXNjcm9sbGFibGUtYm9keS10YWJsZSc6IHRydWUsICd1aS10cmVldGFibGUtdmlydHVhbC10YWJsZSc6IHR0LnZpcnR1YWxTY3JvbGx9XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZyb3plbiA/IHR0LmZyb3plbkNvbEdyb3VwVGVtcGxhdGV8fHR0LmNvbEdyb3VwVGVtcGxhdGUgOiB0dC5jb2xHcm91cFRlbXBsYXRlOyBjb250ZXh0IHskaW1wbGljaXQ6IGNvbHVtbnN9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzPVwidWktdHJlZXRhYmxlLXRib2R5XCIgW3BUcmVlVGFibGVCb2R5XT1cImNvbHVtbnNcIiBbcFRyZWVUYWJsZUJvZHlUZW1wbGF0ZV09XCJmcm96ZW4gPyB0dC5mcm96ZW5Cb2R5VGVtcGxhdGV8fHR0LmJvZHlUZW1wbGF0ZSA6IHR0LmJvZHlUZW1wbGF0ZVwiPjwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPHRhYmxlICNsb2FkaW5nVGFibGUgKm5nSWY9XCJ0dC52aXJ0dWFsU2Nyb2xsICYmIHR0LmxvYWRpbmdCb2R5VGVtcGxhdGUgIT0gbnVsbFwiIFtuZ0NsYXNzXT1cInsndWktdHJlZXRhYmxlLXNjcm9sbGFibGUtYm9keS10YWJsZSB1aS10cmVldGFibGUtbG9hZGluZy12aXJ0dWFsLXRhYmxlJzogdHJ1ZSwgJ3VpLXRyZWV0YWJsZS12aXJ0dWFsLXRhYmxlJzogdHQudmlydHVhbFNjcm9sbH1cIj5cbiAgICAgICAgICAgICAgICA8dGJvZHkgY2xhc3M9XCJ1aS10cmVldGFibGUtdGJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0Zvck9mXT1cImxvYWRpbmdBcnJheVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInR0LmxvYWRpbmdCb2R5VGVtcGxhdGU7IGNvbnRleHQ6IHtjb2x1bW5zOiBjb2x1bW5zfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPGRpdiAjdmlydHVhbFNjcm9sbGVyIGNsYXNzPVwidWktdHJlZXRhYmxlLXZpcnR1YWwtc2Nyb2xsZXJcIiAqbmdJZj1cInR0LnZpcnR1YWxTY3JvbGxcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgI3Njcm9sbEZvb3RlciAqbmdJZj1cInR0LmZvb3RlclRlbXBsYXRlXCIgY2xhc3M9XCJ1aS10cmVldGFibGUtc2Nyb2xsYWJsZS1mb290ZXIgdWktd2lkZ2V0LWhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdiAjc2Nyb2xsRm9vdGVyQm94IGNsYXNzPVwidWktdHJlZXRhYmxlLXNjcm9sbGFibGUtZm9vdGVyLWJveFwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzcz1cInVpLXRyZWV0YWJsZS1zY3JvbGxhYmxlLWZvb3Rlci10YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZnJvemVuID8gdHQuZnJvemVuQ29sR3JvdXBUZW1wbGF0ZXx8dHQuY29sR3JvdXBUZW1wbGF0ZSA6IHR0LmNvbEdyb3VwVGVtcGxhdGU7IGNvbnRleHQgeyRpbXBsaWNpdDogY29sdW1uc31cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPHRmb290IGNsYXNzPVwidWktdHJlZXRhYmxlLXRmb290XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZnJvemVuID8gdHQuZnJvemVuRm9vdGVyVGVtcGxhdGV8fHR0LmZvb3RlclRlbXBsYXRlIDogdHQuZm9vdGVyVGVtcGxhdGU7IGNvbnRleHQgeyRpbXBsaWNpdDogY29sdW1uc31cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC90Zm9vdD5cbiAgICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVFRTY3JvbGxhYmxlVmlldyBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG5cbiAgICBASW5wdXQoXCJ0dFNjcm9sbGFibGVWaWV3XCIpIGNvbHVtbnM6IGFueVtdO1xuXG4gICAgQElucHV0KCkgZnJvemVuOiBib29sZWFuO1xuXG4gICAgQFZpZXdDaGlsZCgnc2Nyb2xsSGVhZGVyJywgeyBzdGF0aWM6IHRydWUgfSkgc2Nyb2xsSGVhZGVyVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnc2Nyb2xsSGVhZGVyQm94JywgeyBzdGF0aWM6IHRydWUgfSkgc2Nyb2xsSGVhZGVyQm94Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnc2Nyb2xsQm9keScsIHsgc3RhdGljOiB0cnVlIH0pIHNjcm9sbEJvZHlWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdzY3JvbGxUYWJsZScsIHsgc3RhdGljOiB0cnVlIH0pIHNjcm9sbFRhYmxlVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuXG4gICAgQFZpZXdDaGlsZCgnbG9hZGluZ1RhYmxlJywgeyBzdGF0aWM6IGZhbHNlIH0pIHNjcm9sbExvYWRpbmdUYWJsZVZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3Njcm9sbEZvb3RlcicsIHsgc3RhdGljOiB0cnVlIH0pIHNjcm9sbEZvb3RlclZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3Njcm9sbEZvb3RlckJveCcsIHsgc3RhdGljOiB0cnVlIH0pIHNjcm9sbEZvb3RlckJveFZpZXdDaGlsZDogRWxlbWVudFJlZjtcblxuICAgIEBWaWV3Q2hpbGQoJ3ZpcnR1YWxTY3JvbGxlcicsIHsgc3RhdGljOiBmYWxzZSB9KSB2aXJ0dWFsU2Nyb2xsZXJWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBoZWFkZXJTY3JvbGxMaXN0ZW5lcjogRnVuY3Rpb247XG5cbiAgICBib2R5U2Nyb2xsTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gICAgZm9vdGVyU2Nyb2xsTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gICAgZnJvemVuU2libGluZ0JvZHk6IEVsZW1lbnQ7XG5cbiAgICBfc2Nyb2xsSGVpZ2h0OiBzdHJpbmc7XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHRvdGFsUmVjb3Jkc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIFxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xuXG4gICAgbG9hZGluZ0FycmF5OiBudW1iZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHR0OiBUcmVlVGFibGUsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMudHQudGFibGVTZXJ2aWNlLnVpVXBkYXRlU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnblNjcm9sbEJhcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxMb2FkaW5nVGFibGVWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxMb2FkaW5nVGFibGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxMb2FkaW5nVGFibGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnR0LnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzU3Vic2NyaXB0aW9uID0gdGhpcy50dC50YWJsZVNlcnZpY2UudG90YWxSZWNvcmRzU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRWaXJ0dWFsU2Nyb2xsZXJIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvYWRpbmdBcnJheSA9IEFycmF5KHRoaXMudHQucm93cykuZmlsbCgxKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBzY3JvbGxIZWlnaHQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Njcm9sbEhlaWdodDtcbiAgICB9XG4gICAgc2V0IHNjcm9sbEhlaWdodCh2YWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9zY3JvbGxIZWlnaHQgPSB2YWw7XG4gICAgICAgIHRoaXMuc2V0U2Nyb2xsSGVpZ2h0KCk7XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmluaXRpYWxpemVkICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuYWxpZ25TY3JvbGxCYXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5zZXRTY3JvbGxIZWlnaHQoKTtcbiAgICAgICAgdGhpcy5hbGlnblNjcm9sbEJhcigpO1xuXG4gICAgICAgIGlmICghdGhpcy5mcm96ZW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR0LmZyb3plbkNvbHVtbnMgfHwgdGhpcy50dC5mcm96ZW5Cb2R5VGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3VpLXRyZWV0YWJsZS11bmZyb3plbi12aWV3Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnR0LmZyb3plbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSB0aGlzLnR0LmZyb3plbldpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9ICdjYWxjKDEwMCUgLSAnICsgdGhpcy50dC5mcm96ZW5XaWR0aCArICcpJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGZyb3plblZpZXcgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGlmIChmcm96ZW5WaWV3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5TaWJsaW5nQm9keSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZShmcm96ZW5WaWV3LCAnLnVpLXRyZWV0YWJsZS1zY3JvbGxhYmxlLWJvZHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLnBhZGRpbmdCb3R0b20gPSBEb21IYW5kbGVyLmNhbGN1bGF0ZVNjcm9sbGJhcldpZHRoKCkgKyAncHgnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHQudmlydHVhbFNjcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5zZXRWaXJ0dWFsU2Nyb2xsZXJIZWlnaHQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbExvYWRpbmdUYWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAndGFibGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIGxldCBzY3JvbGxCYXJXaWR0aCA9IERvbUhhbmRsZXIuY2FsY3VsYXRlU2Nyb2xsYmFyV2lkdGgoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGVhZGVyVmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsSGVhZGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclNjcm9sbExpc3RlbmVyID0gdGhpcy5vbkhlYWRlclNjcm9sbC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGVhZGVyQm94Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oZWFkZXJTY3JvbGxMaXN0ZW5lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZCAmJiB0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb290ZXJTY3JvbGxMaXN0ZW5lciA9IHRoaXMub25Gb290ZXJTY3JvbGwuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZm9vdGVyU2Nyb2xsTGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZnJvemVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5U2Nyb2xsTGlzdGVuZXIgPSB0aGlzLm9uQm9keVNjcm9sbC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuYm9keVNjcm9sbExpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdW5iaW5kRXZlbnRzKCkge1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxIZWFkZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIZWFkZXJCb3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhlYWRlclNjcm9sbExpc3RlbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZCAmJiB0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEZvb3RlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuZm9vdGVyU2Nyb2xsTGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5ib2R5U2Nyb2xsTGlzdGVuZXIpO1xuICAgIH1cblxuICAgIG9uSGVhZGVyU2Nyb2xsKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsSGVhZGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCA9IDA7XG4gICAgfVxuXG4gICAgb25Gb290ZXJTY3JvbGwoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0ID0gMDtcbiAgICB9XG5cbiAgICBvbkJvZHlTY3JvbGwoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGVhZGVyVmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsSGVhZGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGVhZGVyQm94Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWFyZ2luTGVmdCA9IC0xICogdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCArICdweCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxGb290ZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxGb290ZXJCb3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5tYXJnaW5MZWZ0ID0gLTEgKiB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0ICsgJ3B4JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZyb3plblNpYmxpbmdCb2R5KSB7XG4gICAgICAgICAgICB0aGlzLmZyb3plblNpYmxpbmdCb2R5LnNjcm9sbFRvcCA9IHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnR0LnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgIGxldCB2aWV3cG9ydCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgbGV0IHRhYmxlSGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLnNjcm9sbFRhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgbGV0IHBhZ2VIZWlnaHQgPSB0aGlzLnR0LnZpcnR1YWxSb3dIZWlnaHQgKiB0aGlzLnR0LnJvd3M7XG4gICAgICAgICAgICBsZXQgdmlydHVhbFRhYmxlSGVpZ2h0ID0gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLnZpcnR1YWxTY3JvbGxlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICAgIGxldCBwYWdlQ291bnQgPSAodmlydHVhbFRhYmxlSGVpZ2h0IC8gcGFnZUhlaWdodCl8fDE7XG4gICAgICAgICAgICBsZXQgc2Nyb2xsQm9keVRvcCA9IHRoaXMuc2Nyb2xsVGFibGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS50b3B8fCcwJztcblxuICAgICAgICAgICAgaWYgKCh0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgKyB2aWV3cG9ydCA+IHBhcnNlRmxvYXQoc2Nyb2xsQm9keVRvcCkgKyB0YWJsZUhlaWdodCkgfHzCoCh0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPCBwYXJzZUZsb2F0KHNjcm9sbEJvZHlUb3ApKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbExvYWRpbmdUYWJsZVZpZXdDaGlsZCAmJiB0aGlzLnNjcm9sbExvYWRpbmdUYWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICd0YWJsZSc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IHBhZ2UgPSBNYXRoLmZsb29yKCh0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgKiBwYWdlQ291bnQpIC8gKHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodCkpICsgMTtcbiAgICAgICAgICAgICAgICB0aGlzLnR0LmhhbmRsZVZpcnR1YWxTY3JvbGwoe1xuICAgICAgICAgICAgICAgICAgICBwYWdlOiBwYWdlLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsTG9hZGluZ1RhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbExvYWRpbmdUYWJsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVGFibGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSAoKHBhZ2UgLSAxKSAqIHBhZ2VIZWlnaHQpICsgJ3B4JztcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJvemVuU2libGluZ0JvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPEhUTUxFbGVtZW50PiB0aGlzLmZyb3plblNpYmxpbmdCb2R5LmNoaWxkcmVuWzBdKS5zdHlsZS50b3AgPSB0aGlzLnNjcm9sbFRhYmxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTY3JvbGxIZWlnaHQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEhlaWdodCAmJiB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQgJiYgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbEhlaWdodC5pbmRleE9mKCclJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlbGF0aXZlSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnMTAwcHgnOyAgICAgLy90ZW1wb3JhcnkgaGVpZ2h0IHRvIGNhbGN1bGF0ZSBzdGF0aWMgaGVpZ2h0XG4gICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lckhlaWdodCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy50dC5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxIZWlnaHQuaW5jbHVkZXMoXCJjYWxjXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZXJjZW50SGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5zY3JvbGxIZWlnaHQuc2xpY2UodGhpcy5zY3JvbGxIZWlnaHQuaW5kZXhPZihcIihcIikgKyAxLCB0aGlzLnNjcm9sbEhlaWdodC5pbmRleE9mKFwiJVwiKSkpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGlmZlZhbHVlID0gcGFyc2VJbnQodGhpcy5zY3JvbGxIZWlnaHQuc2xpY2UodGhpcy5zY3JvbGxIZWlnaHQuaW5kZXhPZihcIi1cIikgKyAxLCB0aGlzLnNjcm9sbEhlaWdodC5pbmRleE9mKFwiKVwiKSkpO1xuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZUhlaWdodCA9IChEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMudHQuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50KSAqIHBlcmNlbnRIZWlnaHQgLyAxMDApIC0gZGlmZlZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMudHQuZWwubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50KSAqIHBhcnNlSW50KHRoaXMuc2Nyb2xsSGVpZ2h0KSAvIDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IHN0YXRpY0hlaWdodCA9IGNvbnRhaW5lckhlaWdodCAtIDEwMDsgICAvL3RvdGFsIGhlaWdodCBvZiBoZWFkZXJzLCBmb290ZXJzLCBwYWdpbmF0b3JzXG4gICAgICAgICAgICAgICAgbGV0IHNjcm9sbEJvZHlIZWlnaHQgPSAocmVsYXRpdmVIZWlnaHQgLSBzdGF0aWNIZWlnaHQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJvemVuKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJvZHlIZWlnaHQgLT0gRG9tSGFuZGxlci5jYWxjdWxhdGVTY3JvbGxiYXJXaWR0aCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEJvZHlWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gc2Nyb2xsQm9keUhlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZyb3plbilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gKHBhcnNlSW50KHRoaXMuc2Nyb2xsSGVpZ2h0KSAtIERvbUhhbmRsZXIuY2FsY3VsYXRlU2Nyb2xsYmFyV2lkdGgoKSkgKyAncHgnO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxCb2R5Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gdGhpcy5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRWaXJ0dWFsU2Nyb2xsZXJIZWlnaHQoKSB7XG4gICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGxlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnZpcnR1YWxTY3JvbGxlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLmhlaWdodCA9IHRoaXMudHQudG90YWxSZWNvcmRzICogdGhpcy50dC52aXJ0dWFsUm93SGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc1ZlcnRpY2FsT3ZlcmZsb3coKSB7XG4gICAgICAgIHJldHVybiBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuc2Nyb2xsVGFibGVWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkgPiBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMuc2Nyb2xsQm9keVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBhbGlnblNjcm9sbEJhcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmZyb3plbikge1xuICAgICAgICAgICAgbGV0IHNjcm9sbEJhcldpZHRoID0gdGhpcy5oYXNWZXJ0aWNhbE92ZXJmbG93KCkgPyBEb21IYW5kbGVyLmNhbGN1bGF0ZVNjcm9sbGJhcldpZHRoKCkgOiAwO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIZWFkZXJCb3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5tYXJnaW5SaWdodCA9IHNjcm9sbEJhcldpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMuc2Nyb2xsRm9vdGVyQm94Vmlld0NoaWxkICYmIHRoaXMuc2Nyb2xsRm9vdGVyQm94Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEZvb3RlckJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLm1hcmdpblJpZ2h0ID0gc2Nyb2xsQmFyV2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcblxuICAgICAgICB0aGlzLmZyb3plblNpYmxpbmdCb2R5ID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50b3RhbFJlY29yZHNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudG90YWxSZWNvcmRzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t0dFNvcnRhYmxlQ29sdW1uXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnVpLXNvcnRhYmxlLWNvbHVtbl0nOiAnaXNFbmFibGVkKCknLFxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWhpZ2hsaWdodF0nOiAnc29ydGVkJyxcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICdpc0VuYWJsZWQoKSA/IFwiMFwiIDogbnVsbCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRUU29ydGFibGVDb2x1bW4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoXCJ0dFNvcnRhYmxlQ29sdW1uXCIpIGZpZWxkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0dFNvcnRhYmxlQ29sdW1uRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBzb3J0ZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHQ6IFRyZWVUYWJsZSkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLnR0LnRhYmxlU2VydmljZS5zb3J0U291cmNlJC5zdWJzY3JpYmUoc29ydE1ldGEgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU29ydFN0YXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNvcnRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zb3J0ZWQgPSB0aGlzLnR0LmlzU29ydGVkKHRoaXMuZmllbGQpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNvcnRTdGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy50dC5zb3J0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBmaWVsZDogdGhpcy5maWVsZFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIERvbUhhbmRsZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uZW50ZXInLCBbJyRldmVudCddKVxuICAgIG9uRW50ZXJLZXkoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5vbkNsaWNrKGV2ZW50KTtcbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR0U29ydGFibGVDb2x1bW5EaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdHJlZVRhYmxlU29ydEljb24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxpIGNsYXNzPVwidWktc29ydGFibGUtY29sdW1uLWljb24gcGkgcGktZndcIiBbbmdDbGFzc109XCJ7J3BpLXNvcnQtdXAnOiBzb3J0T3JkZXIgPT09IDEsICdwaS1zb3J0LWRvd24nOiBzb3J0T3JkZXIgPT09IC0xLCAncGktc29ydCc6IHNvcnRPcmRlciA9PT0gMH1cIj48L2k+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBUVFNvcnRJY29uIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgZmllbGQ6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBhcmlhTGFiZWxEZXNjOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgYXJpYUxhYmVsQXNjOiBzdHJpbmc7XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHNvcnRPcmRlcjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHR0OiBUcmVlVGFibGUpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLnR0LnRhYmxlU2VydmljZS5zb3J0U291cmNlJC5zdWJzY3JpYmUoc29ydE1ldGEgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU29ydFN0YXRlKCk7XG4gICAgfVxuICAgIFxuICAgIG9uQ2xpY2soZXZlbnQpe1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNvcnRTdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMudHQuc29ydE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRPcmRlciA9IHRoaXMudHQuaXNTb3J0ZWQodGhpcy5maWVsZCkgPyB0aGlzLnR0LnNvcnRPcmRlciA6IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy50dC5zb3J0TW9kZSA9PT0gJ211bHRpcGxlJykge1xuICAgICAgICAgICAgbGV0IHNvcnRNZXRhID0gdGhpcy50dC5nZXRTb3J0TWV0YSh0aGlzLmZpZWxkKTtcbiAgICAgICAgICAgIHRoaXMuc29ydE9yZGVyID0gc29ydE1ldGEgPyBzb3J0TWV0YS5vcmRlcjogMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3R0UmVzaXphYmxlQ29sdW1uXSdcbn0pXG5leHBvcnQgY2xhc3MgVFRSZXNpemFibGVDb2x1bW4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgdHRSZXNpemFibGVDb2x1bW5EaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIHJlc2l6ZXI6IEhUTUxTcGFuRWxlbWVudDtcblxuICAgIHJlc2l6ZXJNb3VzZURvd25MaXN0ZW5lcjogYW55O1xuXG4gICAgZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lcjogYW55O1xuXG4gICAgZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0dDogVHJlZVRhYmxlLCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUpIHsgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd1aS1yZXNpemFibGUtY29sdW1uJyk7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZXIuY2xhc3NOYW1lID0gJ3VpLWNvbHVtbi1yZXNpemVyIHVpLWNsaWNrYWJsZSc7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5yZXNpemVyKTtcbiAgICBcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVyTW91c2VEb3duTGlzdGVuZXIgPSB0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMucmVzaXplck1vdXNlRG93bkxpc3RlbmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50RXZlbnRzKCkge1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyID0gdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyID0gdGhpcy5vbkRvY3VtZW50TW91c2VVcC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudEV2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kb2N1bWVudE1vdXNlVXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlVXBMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlRG93bihldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy50dC5vbkNvbHVtblJlc2l6ZUJlZ2luKGV2ZW50KTtcbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBvbkRvY3VtZW50TW91c2VNb3ZlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLnR0Lm9uQ29sdW1uUmVzaXplKGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbkRvY3VtZW50TW91c2VVcChldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy50dC5vbkNvbHVtblJlc2l6ZUVuZChldmVudCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudEV2ZW50cygpO1xuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHRSZXNpemFibGVDb2x1bW5EaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVzaXplck1vdXNlRG93bkxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5yZXNpemVyTW91c2VEb3duTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RXZlbnRzKCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t0dFJlb3JkZXJhYmxlQ29sdW1uXSdcbn0pXG5leHBvcnQgY2xhc3MgVFRSZW9yZGVyYWJsZUNvbHVtbiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSB0dFJlb3JkZXJhYmxlQ29sdW1uRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBkcmFnU3RhcnRMaXN0ZW5lcjogYW55O1xuXG4gICAgZHJhZ092ZXJMaXN0ZW5lcjogYW55O1xuXG4gICAgZHJhZ0VudGVyTGlzdGVuZXI6IGFueTtcblxuICAgIGRyYWdMZWF2ZUxpc3RlbmVyOiBhbnk7XG5cbiAgICBtb3VzZURvd25MaXN0ZW5lcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHR0OiBUcmVlVGFibGUsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkgeyB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxpc3RlbmVyID0gdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duTGlzdGVuZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdTdGFydExpc3RlbmVyID0gdGhpcy5vbkRyYWdTdGFydC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0TGlzdGVuZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdPdmVyTGlzdGVuZXIgPSB0aGlzLm9uRHJhZ0VudGVyLmJpbmQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVyTGlzdGVuZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdFbnRlckxpc3RlbmVyID0gdGhpcy5vbkRyYWdFbnRlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIHRoaXMuZHJhZ0VudGVyTGlzdGVuZXIpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdMZWF2ZUxpc3RlbmVyID0gdGhpcy5vbkRyYWdMZWF2ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmJpbmRFdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vdXNlRG93bkxpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bkxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ092ZXJMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVyTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRyYWdFbnRlckxpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCB0aGlzLmRyYWdFbnRlckxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0VudGVyTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ0VudGVyTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIHRoaXMuZHJhZ0VudGVyTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kcmFnRW50ZXJMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcmFnTGVhdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRyYWdMZWF2ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VEb3duKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXQubm9kZU5hbWUgPT09ICdJTlBVVCcgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICd1aS1jb2x1bW4tcmVzaXplcicpKVxuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkRyYWdTdGFydChldmVudCkge1xuICAgICAgICB0aGlzLnR0Lm9uQ29sdW1uRHJhZ1N0YXJ0KGV2ZW50LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIG9uRHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkRyYWdFbnRlcihldmVudCkge1xuICAgICAgICB0aGlzLnR0Lm9uQ29sdW1uRHJhZ0VudGVyKGV2ZW50LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudHQub25Db2x1bW5EcmFnTGVhdmUoZXZlbnQpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICAgIG9uRHJvcChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy50dC5vbkNvbHVtbkRyb3AoZXZlbnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR0UmVvcmRlcmFibGVDb2x1bW5EaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdHRTZWxlY3RhYmxlUm93XScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWhpZ2hsaWdodF0nOiAnc2VsZWN0ZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUVFNlbGVjdGFibGVSb3cgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoXCJ0dFNlbGVjdGFibGVSb3dcIikgcm93Tm9kZTogYW55O1xuXG4gICAgQElucHV0KCkgdHRTZWxlY3RhYmxlUm93RGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHR0OiBUcmVlVGFibGUsIHB1YmxpYyB0YWJsZVNlcnZpY2U6IFRyZWVUYWJsZVNlcnZpY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy50dC50YWJsZVNlcnZpY2Uuc2VsZWN0aW9uU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnR0LmlzU2VsZWN0ZWQodGhpcy5yb3dOb2RlLm5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnR0LmlzU2VsZWN0ZWQodGhpcy5yb3dOb2RlLm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnR0LmhhbmRsZVJvd0NsaWNrKHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICByb3dOb2RlOiB0aGlzLnJvd05vZGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25FbnRlcktleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xpY2soZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigndG91Y2hlbmQnLCBbJyRldmVudCddKVxuICAgIG9uVG91Y2hFbmQoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnR0LmhhbmRsZVJvd1RvdWNoRW5kKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHRTZWxlY3RhYmxlUm93RGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t0dFNlbGVjdGFibGVSb3dEYmxDbGlja10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy51aS1zdGF0ZS1oaWdobGlnaHRdJzogJ3NlbGVjdGVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVFRTZWxlY3RhYmxlUm93RGJsQ2xpY2sgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoXCJ0dFNlbGVjdGFibGVSb3dEYmxDbGlja1wiKSByb3dOb2RlOiBhbnk7XG5cbiAgICBASW5wdXQoKSB0dFNlbGVjdGFibGVSb3dEaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIHNlbGVjdGVkOiBib29sZWFuO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHQ6IFRyZWVUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVHJlZVRhYmxlU2VydmljZSkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLnR0LnRhYmxlU2VydmljZS5zZWxlY3Rpb25Tb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudHQuaXNTZWxlY3RlZCh0aGlzLnJvd05vZGUubm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMudHQuaXNTZWxlY3RlZCh0aGlzLnJvd05vZGUubm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkYmxjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMudHQuaGFuZGxlUm93Q2xpY2soe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHJvd05vZGU6IHRoaXMucm93Tm9kZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR0U2VsZWN0YWJsZVJvd0Rpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdHRDb250ZXh0TWVudVJvd10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy51aS1jb250ZXh0bWVudS1zZWxlY3RlZF0nOiAnc2VsZWN0ZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUVENvbnRleHRNZW51Um93IHtcblxuICAgIEBJbnB1dChcInR0Q29udGV4dE1lbnVSb3dcIikgcm93Tm9kZTogYW55O1xuXG4gICAgQElucHV0KCkgdHRDb250ZXh0TWVudVJvd0Rpc2FibGVkOiBib29sZWFuO1xuXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0dDogVHJlZVRhYmxlLCBwdWJsaWMgdGFibGVTZXJ2aWNlOiBUcmVlVGFibGVTZXJ2aWNlKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMudHQudGFibGVTZXJ2aWNlLmNvbnRleHRNZW51U291cmNlJC5zdWJzY3JpYmUoKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy50dC5lcXVhbHModGhpcy5yb3dOb2RlLm5vZGUsIG5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjb250ZXh0bWVudScsIFsnJGV2ZW50J10pXG4gICAgb25Db250ZXh0TWVudShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMudHQuaGFuZGxlUm93UmlnaHRDbGljayh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgcm93Tm9kZTogdGhpcy5yb3dOb2RlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHRDb250ZXh0TWVudVJvd0Rpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRyZWVUYWJsZUNoZWNrYm94JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktY2hrYm94IHVpLXRyZWV0YWJsZS1jaGtib3ggdWktd2lkZ2V0XCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWhlbHBlci1oaWRkZW4tYWNjZXNzaWJsZVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJjaGVja2VkXCIgKGZvY3VzKT1cIm9uRm9jdXMoKVwiIChibHVyKT1cIm9uQmx1cigpXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgI2JveCBbbmdDbGFzc109XCJ7J3VpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQnOnRydWUsXG4gICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWFjdGl2ZSc6Y2hlY2tlZCwgJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIiAgcm9sZT1cImNoZWNrYm94XCIgW2F0dHIuYXJpYS1jaGVja2VkXT1cImNoZWNrZWRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWNoa2JveC1pY29uIHVpLWNsaWNrYWJsZSBwaVwiIFtuZ0NsYXNzXT1cInsncGktY2hlY2snOmNoZWNrZWQsICdwaS1taW51cyc6IHJvd05vZGUubm9kZS5wYXJ0aWFsU2VsZWN0ZWR9XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVFRDaGVja2JveCAge1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoXCJ2YWx1ZVwiKSByb3dOb2RlOiBhbnk7XG5cbiAgICBAVmlld0NoaWxkKCdib3gnLCB7IHN0YXRpYzogdHJ1ZSB9KSBib3hWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjaGVja2VkOiBib29sZWFuO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHQ6IFRyZWVUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVHJlZVRhYmxlU2VydmljZSkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMudHQudGFibGVTZXJ2aWNlLnNlbGVjdGlvblNvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMudHQuaXNTZWxlY3RlZCh0aGlzLnJvd05vZGUubm9kZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnR0LmlzU2VsZWN0ZWQodGhpcy5yb3dOb2RlLm5vZGUpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy50dC50b2dnbGVOb2RlV2l0aENoZWNrYm94KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICByb3dOb2RlOiB0aGlzLnJvd05vZGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIERvbUhhbmRsZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuYm94Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICd1aS1zdGF0ZS1mb2N1cycpO1xuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktc3RhdGUtZm9jdXMnKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgXG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10cmVlVGFibGVIZWFkZXJDaGVja2JveCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveCB1aS10cmVldGFibGUtaGVhZGVyLWNoa2JveCB1aS13aWRnZXRcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQsIGNiLmNoZWNrZWQpXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNjYiB0eXBlPVwiY2hlY2tib3hcIiBbY2hlY2tlZF09XCJjaGVja2VkXCIgKGZvY3VzKT1cIm9uRm9jdXMoKVwiIChibHVyKT1cIm9uQmx1cigpXCIgW2Rpc2FibGVkXT1cIiF0dC52YWx1ZXx8dHQudmFsdWUubGVuZ3RoID09PSAwXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgI2JveCBbbmdDbGFzc109XCJ7J3VpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQnOnRydWUsXG4gICAgICAgICAgICAgICAgJ3VpLXN0YXRlLWFjdGl2ZSc6Y2hlY2tlZCwgJ3VpLXN0YXRlLWRpc2FibGVkJzogKCF0dC52YWx1ZSB8fCB0dC52YWx1ZS5sZW5ndGggPT09IDApfVwiICByb2xlPVwiY2hlY2tib3hcIiBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiY2hlY2tlZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY2hrYm94LWljb24gdWktY2xpY2thYmxlXCIgW25nQ2xhc3NdPVwieydwaSBwaS1jaGVjayc6Y2hlY2tlZH1cIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBUVEhlYWRlckNoZWNrYm94ICB7XG5cbiAgICBAVmlld0NoaWxkKCdib3gnLCB7IHN0YXRpYzogdHJ1ZSB9KSBib3hWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBjaGVja2VkOiBib29sZWFuO1xuXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBzZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHQ6IFRyZWVUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVHJlZVRhYmxlU2VydmljZSkge1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uID0gdGhpcy50dC50YWJsZVNlcnZpY2UudWlVcGRhdGVTb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnVwZGF0ZUNoZWNrZWRTdGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMudHQudGFibGVTZXJ2aWNlLnNlbGVjdGlvblNvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMudXBkYXRlQ2hlY2tlZFN0YXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnVwZGF0ZUNoZWNrZWRTdGF0ZSgpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50LCBjaGVja2VkKSB7XG4gICAgICAgIGlmICh0aGlzLnR0LnZhbHVlICYmIHRoaXMudHQudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy50dC50b2dnbGVOb2Rlc1dpdGhDaGVja2JveChldmVudCwgIWNoZWNrZWQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBEb21IYW5kbGVyLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmJveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LCAndWktc3RhdGUtZm9jdXMnKTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5ib3hWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCwgJ3VpLXN0YXRlLWZvY3VzJyk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbkNoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVDaGVja2VkU3RhdGUoKSB7XG4gICAgICAgIGxldCBjaGVja2VkOiBib29sZWFuO1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy50dC5maWx0ZXJlZE5vZGVzfHx0aGlzLnR0LnZhbHVlO1xuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50dC5pc1NlbGVjdGVkKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gICBcbiAgICAgICAgICAgICAgICBlbHNlICB7XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNoZWNrZWQ7XG4gICAgfVxuICAgXG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3R0RWRpdGFibGVDb2x1bW5dJ1xufSlcbmV4cG9ydCBjbGFzcyBUVEVkaXRhYmxlQ29sdW1uIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoXCJ0dEVkaXRhYmxlQ29sdW1uXCIpIGRhdGE6IGFueTtcblxuICAgIEBJbnB1dChcInR0RWRpdGFibGVDb2x1bW5GaWVsZFwiKSBmaWVsZDogYW55O1xuXG4gICAgQElucHV0KCkgdHRFZGl0YWJsZUNvbHVtbkRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHR0OiBUcmVlVGFibGUsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWktZWRpdGFibGUtY29sdW1uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy50dC5lZGl0aW5nQ2VsbENsaWNrID0gdHJ1ZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudHQuZWRpdGluZ0NlbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50dC5lZGl0aW5nQ2VsbCAhPT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy50dC5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMudHQuZWRpdGluZ0NlbGwsICd1aS1lZGl0aW5nLWNlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuQ2VsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkNlbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9wZW5DZWxsKCkge1xuICAgICAgICB0aGlzLnR0LnVwZGF0ZUVkaXRpbmdDZWxsKHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWktZWRpdGluZy1jZWxsJyk7XG4gICAgICAgIHRoaXMudHQub25FZGl0SW5pdC5lbWl0KHsgZmllbGQ6IHRoaXMuZmllbGQsIGRhdGE6IHRoaXMuZGF0YX0pO1xuICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvY3VzYWJsZSA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpbnB1dCwgdGV4dGFyZWEnKTtcbiAgICAgICAgICAgICAgICBpZiAoZm9jdXNhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2xvc2VFZGl0aW5nQ2VsbCgpIHtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnR0LmVkaXRpbmdDZWxsLCAndWktZWRpdGluZy1jZWxsJyk7XG4gICAgICAgIHRoaXMudHQuZWRpdGluZ0NlbGwgPSBudWxsO1xuICAgICAgICB0aGlzLnR0LnVuYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAxMykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR0LmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy50dC5lZGl0aW5nQ2VsbCwgJ3VpLWVkaXRpbmctY2VsbCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRWRpdGluZ0NlbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50dC5vbkVkaXRDb21wbGV0ZS5lbWl0KHsgZmllbGQ6IHRoaXMuZmllbGQsIGRhdGE6IHRoaXMuZGF0YSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIC8vZXNjYXBlXG4gICAgICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHQuaXNFZGl0aW5nQ2VsbFZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnR0LmVkaXRpbmdDZWxsLCAndWktZWRpdGluZy1jZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFZGl0aW5nQ2VsbCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnR0Lm9uRWRpdENhbmNlbC5lbWl0KHsgZmllbGQ6IHRoaXMuZmllbGQsIGRhdGE6IHRoaXMuZGF0YSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIC8vdGFiXG4gICAgICAgICAgICBlbHNlIGlmIChldmVudC5rZXlDb2RlID09IDkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnR0Lm9uRWRpdENvbXBsZXRlLmVtaXQoeyBmaWVsZDogdGhpcy5maWVsZCwgZGF0YTogdGhpcy5kYXRhIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9QcmV2aW91c0NlbGwoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlVG9OZXh0Q2VsbChldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kQ2VsbChlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgY2VsbCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICB3aGlsZSAoY2VsbCAmJiAhRG9tSGFuZGxlci5oYXNDbGFzcyhjZWxsLCAndWktZWRpdGluZy1jZWxsJykpIHtcbiAgICAgICAgICAgICAgICBjZWxsID0gY2VsbC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY2VsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZVRvUHJldmlvdXNDZWxsKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGxldCBjdXJyZW50Q2VsbCA9IHRoaXMuZmluZENlbGwoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgbGV0IHJvdyA9IGN1cnJlbnRDZWxsLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGxldCB0YXJnZXRDZWxsID0gdGhpcy5maW5kUHJldmlvdXNFZGl0YWJsZUNvbHVtbihjdXJyZW50Q2VsbCk7XG5cbiAgICAgICAgaWYgKHRhcmdldENlbGwpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0YXJnZXRDZWxsLCAnY2xpY2snKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlVG9OZXh0Q2VsbChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBsZXQgY3VycmVudENlbGwgPSB0aGlzLmZpbmRDZWxsKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGxldCByb3cgPSBjdXJyZW50Q2VsbC5wYXJlbnRFbGVtZW50O1xuICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IHRoaXMuZmluZE5leHRFZGl0YWJsZUNvbHVtbihjdXJyZW50Q2VsbCk7XG5cbiAgICAgICAgaWYgKHRhcmdldENlbGwpIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0YXJnZXRDZWxsLCAnY2xpY2snKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kUHJldmlvdXNFZGl0YWJsZUNvbHVtbihjZWxsOiBFbGVtZW50KSB7XG4gICAgICAgIGxldCBwcmV2Q2VsbCA9IGNlbGwucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgICAgICBpZiAoIXByZXZDZWxsKSB7XG4gICAgICAgICAgICBsZXQgcHJldmlvdXNSb3cgPSBjZWxsLnBhcmVudEVsZW1lbnQgPyBjZWxsLnBhcmVudEVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZyA6IG51bGw7XG4gICAgICAgICAgICBpZiAocHJldmlvdXNSb3cpIHtcbiAgICAgICAgICAgICAgICBwcmV2Q2VsbCA9IHByZXZpb3VzUm93Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldkNlbGwpIHtcbiAgICAgICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKHByZXZDZWxsLCAndWktZWRpdGFibGUtY29sdW1uJykpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZDZWxsO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbmRQcmV2aW91c0VkaXRhYmxlQ29sdW1uKHByZXZDZWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZE5leHRFZGl0YWJsZUNvbHVtbihjZWxsOiBFbGVtZW50KSB7XG4gICAgICAgIGxldCBuZXh0Q2VsbCA9IGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmICghbmV4dENlbGwpIHtcbiAgICAgICAgICAgIGxldCBuZXh0Um93ID0gY2VsbC5wYXJlbnRFbGVtZW50ID8gY2VsbC5wYXJlbnRFbGVtZW50Lm5leHRFbGVtZW50U2libGluZyA6IG51bGw7XG4gICAgICAgICAgICBpZiAobmV4dFJvdykge1xuICAgICAgICAgICAgICAgIG5leHRDZWxsID0gbmV4dFJvdy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0Q2VsbCkge1xuICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MobmV4dENlbGwsICd1aS1lZGl0YWJsZS1jb2x1bW4nKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dENlbGw7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZE5leHRFZGl0YWJsZUNvbHVtbihuZXh0Q2VsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHRFZGl0YWJsZUNvbHVtbkRpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdHJlZVRhYmxlQ2VsbEVkaXRvcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInR0LmVkaXRpbmdDZWxsID09PSBlZGl0YWJsZUNvbHVtbi5lbC5uYXRpdmVFbGVtZW50XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaW5wdXRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF0dC5lZGl0aW5nQ2VsbCB8fCB0dC5lZGl0aW5nQ2VsbCAhPT0gZWRpdGFibGVDb2x1bW4uZWwubmF0aXZlRWxlbWVudFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm91dHB1dFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVHJlZVRhYmxlQ2VsbEVkaXRvciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPjtcblxuICAgIGlucHV0VGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBvdXRwdXRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0dDogVHJlZVRhYmxlLCBwdWJsaWMgZWRpdGFibGVDb2x1bW46IFRURWRpdGFibGVDb2x1bW4pIHsgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5wdXQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ291dHB1dCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0cHV0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t0dFJvd10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1thdHRyLnRhYmluZGV4XSc6ICdcIjBcIidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRUUm93IHtcblxuICAgIEBJbnB1dCgndHRSb3cnKSByb3dOb2RlOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHQ6IFRyZWVUYWJsZSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7fVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgICAgICAgIC8vZG93biBhcnJvd1xuICAgICAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFJvdyA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFJvdy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9kb3duIGFycm93XG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIGxldCBwcmV2Um93ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldlJvdy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy9sZWZ0IGFycm93XG4gICAgICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvd05vZGUubm9kZS5leHBhbmRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnR0LnRvZ2dsZVJvd0luZGV4ID0gRG9tSGFuZGxlci5pbmRleCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd05vZGUubm9kZS5leHBhbmRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHQub25Ob2RlQ29sbGFwc2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6IHRoaXMucm93Tm9kZS5ub2RlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHQudXBkYXRlU2VyaWFsaXplZFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHQudGFibGVTZXJ2aWNlLm9uVUlVcGRhdGUodGhpcy50dC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yZUZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vcmlnaHQgYXJyb3dcbiAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnJvd05vZGUubm9kZS5leHBhbmRlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnR0LnRvZ2dsZVJvd0luZGV4ID0gRG9tSGFuZGxlci5pbmRleCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd05vZGUubm9kZS5leHBhbmRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy50dC5vbk5vZGVFeHBhbmQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGU6IHRoaXMucm93Tm9kZS5ub2RlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHQudXBkYXRlU2VyaWFsaXplZFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHQudGFibGVTZXJ2aWNlLm9uVUlVcGRhdGUodGhpcy50dC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yZUZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN0b3JlRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcm93ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMudHQuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcudWktdHJlZXRhYmxlLXRib2R5JykuY2hpbGRyZW5bdGhpcy50dC50b2dnbGVSb3dJbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKHJvdykge1xuICAgICAgICAgICAgICAgICAgICByb3cuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyNSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRyZWVUYWJsZVRvZ2dsZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxhIGNsYXNzPVwidWktdHJlZXRhYmxlLXRvZ2dsZXIgdWktdW5zZWxlY3RhYmxlLXRleHRcIiAqbmdJZj1cInJvd05vZGUubm9kZS5sZWFmID09PSBmYWxzZSB8fCByb3dOb2RlLmxldmVsICE9PSAwIHx8IHJvd05vZGUubm9kZS5jaGlsZHJlbiAmJiByb3dOb2RlLm5vZGUuY2hpbGRyZW4ubGVuZ3RoXCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICBbc3R5bGUudmlzaWJpbGl0eV09XCJyb3dOb2RlLm5vZGUubGVhZiA9PT0gZmFsc2UgfHwgKHJvd05vZGUubm9kZS5jaGlsZHJlbiAmJiByb3dOb2RlLm5vZGUuY2hpbGRyZW4ubGVuZ3RoKSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nXCIgW3N0eWxlLm1hcmdpbkxlZnRdPVwicm93Tm9kZS5sZXZlbCAqIDE2ICsgJ3B4J1wiPlxuICAgICAgICAgICAgPGkgW25nQ2xhc3NdPVwicm93Tm9kZS5ub2RlLmV4cGFuZGVkID8gJ3BpIHBpLWZ3IHBpLWNoZXZyb24tZG93bicgOiAncGkgcGktZncgcGktY2hldnJvbi1yaWdodCdcIj48L2k+XG4gICAgICAgIDwvYT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVUYWJsZVRvZ2dsZXIge1xuXG4gICAgQElucHV0KCkgcm93Tm9kZTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHR0OiBUcmVlVGFibGUpIHt9XG5cbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLnJvd05vZGUubm9kZS5leHBhbmRlZCA9ICF0aGlzLnJvd05vZGUubm9kZS5leHBhbmRlZDtcblxuICAgICAgICBpZiAodGhpcy5yb3dOb2RlLm5vZGUuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMudHQub25Ob2RlRXhwYW5kLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIG5vZGU6IHRoaXMucm93Tm9kZS5ub2RlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHQub25Ob2RlQ29sbGFwc2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgbm9kZTogdGhpcy5yb3dOb2RlLm5vZGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50dC51cGRhdGVTZXJpYWxpemVkVmFsdWUoKTtcbiAgICAgICAgdGhpcy50dC50YWJsZVNlcnZpY2Uub25VSVVwZGF0ZSh0aGlzLnR0LnZhbHVlKTtcbiAgICAgICAgXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsUGFnaW5hdG9yTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbVHJlZVRhYmxlLFNoYXJlZE1vZHVsZSxUcmVlVGFibGVUb2dnbGVyLFRUU29ydGFibGVDb2x1bW4sVFRTb3J0SWNvbixUVFJlc2l6YWJsZUNvbHVtbixUVFJvdyxUVFJlb3JkZXJhYmxlQ29sdW1uLFRUU2VsZWN0YWJsZVJvdyxUVFNlbGVjdGFibGVSb3dEYmxDbGljayxUVENvbnRleHRNZW51Um93LFRUQ2hlY2tib3gsVFRIZWFkZXJDaGVja2JveCxUVEVkaXRhYmxlQ29sdW1uLFRyZWVUYWJsZUNlbGxFZGl0b3JdLFxuICAgIGRlY2xhcmF0aW9uczogW1RyZWVUYWJsZSxUcmVlVGFibGVUb2dnbGVyLFRUU2Nyb2xsYWJsZVZpZXcsVFRCb2R5LFRUU29ydGFibGVDb2x1bW4sVFRTb3J0SWNvbixUVFJlc2l6YWJsZUNvbHVtbixUVFJvdyxUVFJlb3JkZXJhYmxlQ29sdW1uLFRUU2VsZWN0YWJsZVJvdyxUVFNlbGVjdGFibGVSb3dEYmxDbGljayxUVENvbnRleHRNZW51Um93LFRUQ2hlY2tib3gsVFRIZWFkZXJDaGVja2JveCxUVEVkaXRhYmxlQ29sdW1uLFRyZWVUYWJsZUNlbGxFZGl0b3JdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVUYWJsZU1vZHVsZSB7IH0iXX0=