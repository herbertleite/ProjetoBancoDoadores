(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('primeng/paginator'), require('primeng/dom'), require('primeng/utils'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('primeng/table', ['exports', '@angular/core', '@angular/common', 'primeng/api', 'primeng/paginator', 'primeng/dom', 'primeng/utils', 'rxjs'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.table = {}), global.ng.core, global.ng.common, global.primeng.api, global.primeng.paginator, global.primeng.dom, global.primeng.utils, global.rxjs));
}(this, (function (exports, core, common, api, paginator, dom, utils, rxjs) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
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
    var TableService = /** @class */ (function () {
        function TableService() {
            this.sortSource = new rxjs.Subject();
            this.selectionSource = new rxjs.Subject();
            this.contextMenuSource = new rxjs.Subject();
            this.valueSource = new rxjs.Subject();
            this.totalRecordsSource = new rxjs.Subject();
            this.columnsSource = new rxjs.Subject();
            this.sortSource$ = this.sortSource.asObservable();
            this.selectionSource$ = this.selectionSource.asObservable();
            this.contextMenuSource$ = this.contextMenuSource.asObservable();
            this.valueSource$ = this.valueSource.asObservable();
            this.totalRecordsSource$ = this.totalRecordsSource.asObservable();
            this.columnsSource$ = this.columnsSource.asObservable();
        }
        TableService.prototype.onSort = function (sortMeta) {
            this.sortSource.next(sortMeta);
        };
        TableService.prototype.onSelectionChange = function () {
            this.selectionSource.next();
        };
        TableService.prototype.onContextMenu = function (data) {
            this.contextMenuSource.next(data);
        };
        TableService.prototype.onValueChange = function (value) {
            this.valueSource.next(value);
        };
        TableService.prototype.onTotalRecordsChange = function (value) {
            this.totalRecordsSource.next(value);
        };
        TableService.prototype.onColumnsChange = function (columns) {
            this.columnsSource.next(columns);
        };
        TableService = __decorate([
            core.Injectable()
        ], TableService);
        return TableService;
    }());
    var Table = /** @class */ (function () {
        function Table(el, zone, tableService, cd) {
            this.el = el;
            this.zone = zone;
            this.tableService = tableService;
            this.cd = cd;
            this.pageLinks = 5;
            this.alwaysShowPaginator = true;
            this.paginatorPosition = 'bottom';
            this.paginatorDropdownScrollHeight = '200px';
            this.currentPageReportTemplate = '{currentPage} of {totalPages}';
            this.defaultSortOrder = 1;
            this.sortMode = 'single';
            this.resetPageOnSort = true;
            this.selectionChange = new core.EventEmitter();
            this.contextMenuSelectionChange = new core.EventEmitter();
            this.contextMenuSelectionMode = "separate";
            this.rowTrackBy = function (index, item) { return item; };
            this.lazy = false;
            this.lazyLoadOnInit = true;
            this.compareSelectionBy = 'deepEquals';
            this.csvSeparator = ',';
            this.exportFilename = 'download';
            this.filters = {};
            this.filterDelay = 300;
            this.expandedRowKeys = {};
            this.editingRowKeys = {};
            this.rowExpandMode = 'multiple';
            this.virtualScrollDelay = 150;
            this.virtualRowHeight = 28;
            this.columnResizeMode = 'fit';
            this.loadingIcon = 'pi pi-spinner';
            this.showLoader = true;
            this.stateStorage = 'session';
            this.editMode = 'cell';
            this.onRowSelect = new core.EventEmitter();
            this.onRowUnselect = new core.EventEmitter();
            this.onPage = new core.EventEmitter();
            this.onSort = new core.EventEmitter();
            this.onFilter = new core.EventEmitter();
            this.onLazyLoad = new core.EventEmitter();
            this.onRowExpand = new core.EventEmitter();
            this.onRowCollapse = new core.EventEmitter();
            this.onContextMenuSelect = new core.EventEmitter();
            this.onColResize = new core.EventEmitter();
            this.onColReorder = new core.EventEmitter();
            this.onRowReorder = new core.EventEmitter();
            this.onEditInit = new core.EventEmitter();
            this.onEditComplete = new core.EventEmitter();
            this.onEditCancel = new core.EventEmitter();
            this.onHeaderCheckboxToggle = new core.EventEmitter();
            this.sortFunction = new core.EventEmitter();
            this.firstChange = new core.EventEmitter();
            this.rowsChange = new core.EventEmitter();
            this.onStateSave = new core.EventEmitter();
            this.onStateRestore = new core.EventEmitter();
            this._value = [];
            this._totalRecords = 0;
            this._first = 0;
            this.selectionKeys = {};
            this._sortOrder = 1;
        }
        Table.prototype.ngOnInit = function () {
            if (this.lazy && this.lazyLoadOnInit) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
                if (this.restoringFilter) {
                    this.restoringFilter = false;
                }
            }
            this.initialized = true;
        };
        Table.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'caption':
                        _this.captionTemplate = item.template;
                        break;
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'body':
                        _this.bodyTemplate = item.template;
                        break;
                    case 'loadingbody':
                        _this.loadingBodyTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    case 'summary':
                        _this.summaryTemplate = item.template;
                        break;
                    case 'colgroup':
                        _this.colGroupTemplate = item.template;
                        break;
                    case 'rowexpansion':
                        _this.expandedRowTemplate = item.template;
                        break;
                    case 'frozenrows':
                        _this.frozenRowsTemplate = item.template;
                        break;
                    case 'frozenheader':
                        _this.frozenHeaderTemplate = item.template;
                        break;
                    case 'frozenbody':
                        _this.frozenBodyTemplate = item.template;
                        break;
                    case 'frozenfooter':
                        _this.frozenFooterTemplate = item.template;
                        break;
                    case 'frozencolgroup':
                        _this.frozenColGroupTemplate = item.template;
                        break;
                    case 'emptymessage':
                        _this.emptyMessageTemplate = item.template;
                        break;
                    case 'paginatorleft':
                        _this.paginatorLeftTemplate = item.template;
                        break;
                    case 'paginatorright':
                        _this.paginatorRightTemplate = item.template;
                        break;
                }
            });
        };
        Table.prototype.ngAfterViewInit = function () {
            if (this.isStateful() && this.resizableColumns) {
                this.restoreColumnWidths();
            }
        };
        Table.prototype.ngOnChanges = function (simpleChange) {
            if (simpleChange.value) {
                if (this.isStateful() && !this.stateRestored) {
                    this.restoreState();
                }
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
                this.tableService.onValueChange(simpleChange.value.currentValue);
            }
            if (simpleChange.columns) {
                this._columns = simpleChange.columns.currentValue;
                this.tableService.onColumnsChange(simpleChange.columns.currentValue);
                if (this._columns && this.isStateful() && this.reorderableColumns && !this.columnOrderStateRestored) {
                    this.restoreColumnOrder();
                }
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
        };
        Object.defineProperty(Table.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
                this._value = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "columns", {
            get: function () {
                return this._columns;
            },
            set: function (cols) {
                this._columns = cols;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "first", {
            get: function () {
                return this._first;
            },
            set: function (val) {
                this._first = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "rows", {
            get: function () {
                return this._rows;
            },
            set: function (val) {
                this._rows = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "totalRecords", {
            get: function () {
                return this._totalRecords;
            },
            set: function (val) {
                this._totalRecords = val;
                this.tableService.onTotalRecordsChange(this._totalRecords);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "sortField", {
            get: function () {
                return this._sortField;
            },
            set: function (val) {
                this._sortField = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "sortOrder", {
            get: function () {
                return this._sortOrder;
            },
            set: function (val) {
                this._sortOrder = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "multiSortMeta", {
            get: function () {
                return this._multiSortMeta;
            },
            set: function (val) {
                this._multiSortMeta = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Table.prototype, "selection", {
            get: function () {
                return this._selection;
            },
            set: function (val) {
                this._selection = val;
            },
            enumerable: true,
            configurable: true
        });
        Table.prototype.updateSelectionKeys = function () {
            var e_1, _a;
            if (this.dataKey && this._selection) {
                this.selectionKeys = {};
                if (Array.isArray(this._selection)) {
                    try {
                        for (var _b = __values(this._selection), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var data = _c.value;
                            this.selectionKeys[String(utils.ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
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
                else {
                    this.selectionKeys[String(utils.ObjectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
                }
            }
        };
        Table.prototype.onPageChange = function (event) {
            this.first = event.first;
            this.rows = event.rows;
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            this.onPage.emit({
                first: this.first,
                rows: this.rows
            });
            this.firstChange.emit(this.first);
            this.rowsChange.emit(this.rows);
            this.tableService.onValueChange(this.value);
            if (this.isStateful()) {
                this.saveState();
            }
            this.anchorRowIndex = null;
        };
        Table.prototype.sort = function (event) {
            var originalEvent = event.originalEvent;
            if (this.sortMode === 'single') {
                this._sortOrder = (this.sortField === event.field) ? this.sortOrder * -1 : this.defaultSortOrder;
                this._sortField = event.field;
                this.sortSingle();
                if (this.resetPageOnSort) {
                    this.first = 0;
                    this.firstChange.emit(this.first);
                }
            }
            if (this.sortMode === 'multiple') {
                var metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
                var sortMeta = this.getSortMeta(event.field);
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
                    this._multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
                }
                this.sortMultiple();
            }
            if (this.isStateful()) {
                this.saveState();
            }
            this.anchorRowIndex = null;
        };
        Table.prototype.sortSingle = function () {
            var _this = this;
            if (this.sortField && this.sortOrder) {
                if (this.restoringSort) {
                    this.restoringSort = false;
                }
                if (this.lazy) {
                    this.onLazyLoad.emit(this.createLazyLoadMetadata());
                }
                else if (this.value) {
                    if (this.customSort) {
                        this.sortFunction.emit({
                            data: this.value,
                            mode: this.sortMode,
                            field: this.sortField,
                            order: this.sortOrder
                        });
                    }
                    else {
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
                    }
                    if (this.hasFilter()) {
                        this._filter();
                    }
                }
                var sortMeta = {
                    field: this.sortField,
                    order: this.sortOrder
                };
                this.onSort.emit(sortMeta);
                this.tableService.onSort(sortMeta);
            }
        };
        Table.prototype.sortMultiple = function () {
            var _this = this;
            if (this.multiSortMeta) {
                if (this.lazy) {
                    this.onLazyLoad.emit(this.createLazyLoadMetadata());
                }
                else if (this.value) {
                    if (this.customSort) {
                        this.sortFunction.emit({
                            data: this.value,
                            mode: this.sortMode,
                            multiSortMeta: this.multiSortMeta
                        });
                    }
                    else {
                        this.value.sort(function (data1, data2) {
                            return _this.multisortField(data1, data2, _this.multiSortMeta, 0);
                        });
                    }
                    if (this.hasFilter()) {
                        this._filter();
                    }
                }
                this.onSort.emit({
                    multisortmeta: this.multiSortMeta
                });
                this.tableService.onSort(this.multiSortMeta);
            }
        };
        Table.prototype.multisortField = function (data1, data2, multiSortMeta, index) {
            var value1 = utils.ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
            var value2 = utils.ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);
            var result = null;
            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 == 'string' || value1 instanceof String) {
                if (value1.localeCompare && (value1 != value2)) {
                    return (multiSortMeta[index].order * value1.localeCompare(value2));
                }
            }
            else {
                result = (value1 < value2) ? -1 : 1;
            }
            if (value1 == value2) {
                return (multiSortMeta.length - 1) > (index) ? (this.multisortField(data1, data2, multiSortMeta, index + 1)) : 0;
            }
            return (multiSortMeta[index].order * result);
        };
        Table.prototype.getSortMeta = function (field) {
            if (this.multiSortMeta && this.multiSortMeta.length) {
                for (var i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field === field) {
                        return this.multiSortMeta[i];
                    }
                }
            }
            return null;
        };
        Table.prototype.isSorted = function (field) {
            if (this.sortMode === 'single') {
                return (this.sortField && this.sortField === field);
            }
            else if (this.sortMode === 'multiple') {
                var sorted = false;
                if (this.multiSortMeta) {
                    for (var i = 0; i < this.multiSortMeta.length; i++) {
                        if (this.multiSortMeta[i].field == field) {
                            sorted = true;
                            break;
                        }
                    }
                }
                return sorted;
            }
        };
        Table.prototype.handleRowClick = function (event) {
            var target = event.originalEvent.target;
            var targetNode = target.nodeName;
            var parentNode = target.parentElement && target.parentElement.nodeName;
            if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' ||
                parentNode == 'INPUT' || parentNode == 'BUTTON' || parentNode == 'A' ||
                (dom.DomHandler.hasClass(event.originalEvent.target, 'ui-clickable'))) {
                return;
            }
            if (this.selectionMode) {
                this.preventSelectionSetterPropagation = true;
                if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                    dom.DomHandler.clearSelection();
                    if (this.rangeRowIndex != null) {
                        this.clearSelectionRange(event.originalEvent);
                    }
                    this.rangeRowIndex = event.rowIndex;
                    this.selectRange(event.originalEvent, event.rowIndex);
                }
                else {
                    var rowData = event.rowData;
                    var selected = this.isSelected(rowData);
                    var metaSelection = this.rowTouched ? false : this.metaKeySelection;
                    var dataKeyValue = this.dataKey ? String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                    this.anchorRowIndex = event.rowIndex;
                    this.rangeRowIndex = event.rowIndex;
                    if (metaSelection) {
                        var metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                        if (selected && metaKey) {
                            if (this.isSingleSelectionMode()) {
                                this._selection = null;
                                this.selectionKeys = {};
                                this.selectionChange.emit(null);
                            }
                            else {
                                var selectionIndex_1 = this.findIndexInSelection(rowData);
                                this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_1; });
                                this.selectionChange.emit(this.selection);
                                if (dataKeyValue) {
                                    delete this.selectionKeys[dataKeyValue];
                                }
                            }
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                        }
                        else {
                            if (this.isSingleSelectionMode()) {
                                this._selection = rowData;
                                this.selectionChange.emit(rowData);
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
                                this._selection = __spread(this.selection, [rowData]);
                                this.selectionChange.emit(this.selection);
                                if (dataKeyValue) {
                                    this.selectionKeys[dataKeyValue] = 1;
                                }
                            }
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                        }
                    }
                    else {
                        if (this.selectionMode === 'single') {
                            if (selected) {
                                this._selection = null;
                                this.selectionKeys = {};
                                this.selectionChange.emit(this.selection);
                                this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                            }
                            else {
                                this._selection = rowData;
                                this.selectionChange.emit(this.selection);
                                this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                                if (dataKeyValue) {
                                    this.selectionKeys = {};
                                    this.selectionKeys[dataKeyValue] = 1;
                                }
                            }
                        }
                        else if (this.selectionMode === 'multiple') {
                            if (selected) {
                                var selectionIndex_2 = this.findIndexInSelection(rowData);
                                this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_2; });
                                this.selectionChange.emit(this.selection);
                                this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                                if (dataKeyValue) {
                                    delete this.selectionKeys[dataKeyValue];
                                }
                            }
                            else {
                                this._selection = this.selection ? __spread(this.selection, [rowData]) : [rowData];
                                this.selectionChange.emit(this.selection);
                                this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: event.rowIndex });
                                if (dataKeyValue) {
                                    this.selectionKeys[dataKeyValue] = 1;
                                }
                            }
                        }
                    }
                }
                this.tableService.onSelectionChange();
                if (this.isStateful()) {
                    this.saveState();
                }
            }
            this.rowTouched = false;
        };
        Table.prototype.handleRowTouchEnd = function (event) {
            this.rowTouched = true;
        };
        Table.prototype.handleRowRightClick = function (event) {
            if (this.contextMenu) {
                var rowData = event.rowData;
                if (this.contextMenuSelectionMode === 'separate') {
                    this.contextMenuSelection = rowData;
                    this.contextMenuSelectionChange.emit(rowData);
                    this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, data: rowData, index: event.rowIndex });
                    this.contextMenu.show(event.originalEvent);
                    this.tableService.onContextMenu(rowData);
                }
                else if (this.contextMenuSelectionMode === 'joint') {
                    this.preventSelectionSetterPropagation = true;
                    var selected = this.isSelected(rowData);
                    var dataKeyValue = this.dataKey ? String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                    if (!selected) {
                        if (this.isSingleSelectionMode()) {
                            this.selection = rowData;
                            this.selectionChange.emit(rowData);
                        }
                        else if (this.isMultipleSelectionMode()) {
                            this.selection = [rowData];
                            this.selectionChange.emit(this.selection);
                        }
                        if (dataKeyValue) {
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                    this.contextMenu.show(event.originalEvent);
                    this.onContextMenuSelect.emit({ originalEvent: event, data: rowData, index: event.rowIndex });
                }
            }
        };
        Table.prototype.selectRange = function (event, rowIndex) {
            var rangeStart, rangeEnd;
            if (this.anchorRowIndex > rowIndex) {
                rangeStart = rowIndex;
                rangeEnd = this.anchorRowIndex;
            }
            else if (this.anchorRowIndex < rowIndex) {
                rangeStart = this.anchorRowIndex;
                rangeEnd = rowIndex;
            }
            else {
                rangeStart = rowIndex;
                rangeEnd = rowIndex;
            }
            if (this.lazy && this.paginator) {
                rangeStart -= this.first;
                rangeEnd -= this.first;
            }
            for (var i = rangeStart; i <= rangeEnd; i++) {
                var rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
                if (!this.isSelected(rangeRowData)) {
                    this._selection = __spread(this.selection, [rangeRowData]);
                    var dataKeyValue = this.dataKey ? String(utils.ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
                    if (dataKeyValue) {
                        this.selectionKeys[dataKeyValue] = 1;
                    }
                    this.onRowSelect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
                }
            }
            this.selectionChange.emit(this.selection);
        };
        Table.prototype.clearSelectionRange = function (event) {
            var rangeStart, rangeEnd;
            if (this.rangeRowIndex > this.anchorRowIndex) {
                rangeStart = this.anchorRowIndex;
                rangeEnd = this.rangeRowIndex;
            }
            else if (this.rangeRowIndex < this.anchorRowIndex) {
                rangeStart = this.rangeRowIndex;
                rangeEnd = this.anchorRowIndex;
            }
            else {
                rangeStart = this.rangeRowIndex;
                rangeEnd = this.rangeRowIndex;
            }
            var _loop_1 = function (i) {
                var rangeRowData = this_1.value[i];
                var selectionIndex = this_1.findIndexInSelection(rangeRowData);
                this_1._selection = this_1.selection.filter(function (val, i) { return i != selectionIndex; });
                var dataKeyValue = this_1.dataKey ? String(utils.ObjectUtils.resolveFieldData(rangeRowData, this_1.dataKey)) : null;
                if (dataKeyValue) {
                    delete this_1.selectionKeys[dataKeyValue];
                }
                this_1.onRowUnselect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
            };
            var this_1 = this;
            for (var i = rangeStart; i <= rangeEnd; i++) {
                _loop_1(i);
            }
        };
        Table.prototype.isSelected = function (rowData) {
            if (rowData && this.selection) {
                if (this.dataKey) {
                    return this.selectionKeys[utils.ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
                }
                else {
                    if (this.selection instanceof Array)
                        return this.findIndexInSelection(rowData) > -1;
                    else
                        return this.equals(rowData, this.selection);
                }
            }
            return false;
        };
        Table.prototype.findIndexInSelection = function (rowData) {
            var index = -1;
            if (this.selection && this.selection.length) {
                for (var i = 0; i < this.selection.length; i++) {
                    if (this.equals(rowData, this.selection[i])) {
                        index = i;
                        break;
                    }
                }
            }
            return index;
        };
        Table.prototype.toggleRowWithRadio = function (event, rowData) {
            this.preventSelectionSetterPropagation = true;
            if (this.selection != rowData) {
                this._selection = rowData;
                this.selectionChange.emit(this.selection);
                this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
                if (this.dataKey) {
                    this.selectionKeys = {};
                    this.selectionKeys[String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
                }
            }
            else {
                this._selection = null;
                this.selectionChange.emit(this.selection);
                this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
            }
            this.tableService.onSelectionChange();
            if (this.isStateful()) {
                this.saveState();
            }
        };
        Table.prototype.toggleRowWithCheckbox = function (event, rowData) {
            this.selection = this.selection || [];
            var selected = this.isSelected(rowData);
            var dataKeyValue = this.dataKey ? String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
            this.preventSelectionSetterPropagation = true;
            if (selected) {
                var selectionIndex_3 = this.findIndexInSelection(rowData);
                this._selection = this.selection.filter(function (val, i) { return i != selectionIndex_3; });
                this.selectionChange.emit(this.selection);
                this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
                if (dataKeyValue) {
                    delete this.selectionKeys[dataKeyValue];
                }
            }
            else {
                this._selection = this.selection ? __spread(this.selection, [rowData]) : [rowData];
                this.selectionChange.emit(this.selection);
                this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
            }
            this.tableService.onSelectionChange();
            if (this.isStateful()) {
                this.saveState();
            }
        };
        Table.prototype.toggleRowsWithCheckbox = function (event, check) {
            this._selection = check ? this.filteredValue ? this.filteredValue.slice() : this.value.slice() : [];
            this.preventSelectionSetterPropagation = true;
            this.updateSelectionKeys();
            this.selectionChange.emit(this._selection);
            this.tableService.onSelectionChange();
            this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
            if (this.isStateful()) {
                this.saveState();
            }
        };
        Table.prototype.equals = function (data1, data2) {
            return this.compareSelectionBy === 'equals' ? (data1 === data2) : utils.ObjectUtils.equals(data1, data2, this.dataKey);
        };
        Table.prototype.filter = function (value, field, matchMode) {
            var _this = this;
            if (this.filterTimeout) {
                clearTimeout(this.filterTimeout);
            }
            if (!this.isFilterBlank(value)) {
                this.filters[field] = { value: value, matchMode: matchMode };
            }
            else if (this.filters[field]) {
                delete this.filters[field];
            }
            this.filterTimeout = setTimeout(function () {
                _this._filter();
                _this.filterTimeout = null;
            }, this.filterDelay);
            this.anchorRowIndex = null;
        };
        Table.prototype.filterGlobal = function (value, matchMode) {
            this.filter(value, 'global', matchMode);
        };
        Table.prototype.isFilterBlank = function (filter) {
            if (filter !== null && filter !== undefined) {
                if ((typeof filter === 'string' && filter.trim().length == 0) || (filter instanceof Array && filter.length == 0))
                    return true;
                else
                    return false;
            }
            return true;
        };
        Table.prototype._filter = function () {
            if (!this.restoringFilter) {
                this.first = 0;
                this.firstChange.emit(this.first);
            }
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else {
                if (!this.value) {
                    return;
                }
                if (!this.hasFilter()) {
                    this.filteredValue = null;
                    if (this.paginator) {
                        this.totalRecords = this.value ? this.value.length : 0;
                    }
                }
                else {
                    var globalFilterFieldsArray = void 0;
                    if (this.filters['global']) {
                        if (!this.columns && !this.globalFilterFields)
                            throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                        else
                            globalFilterFieldsArray = this.globalFilterFields || this.columns;
                    }
                    this.filteredValue = [];
                    for (var i = 0; i < this.value.length; i++) {
                        var localMatch = true;
                        var globalMatch = false;
                        var localFiltered = false;
                        for (var prop in this.filters) {
                            if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                                localFiltered = true;
                                var filterMeta = this.filters[prop];
                                var filterField = prop;
                                var filterValue = filterMeta.value;
                                var filterMatchMode = filterMeta.matchMode || 'startsWith';
                                var dataFieldValue = utils.ObjectUtils.resolveFieldData(this.value[i], filterField);
                                var filterConstraint = utils.FilterUtils[filterMatchMode];
                                if (!filterConstraint(dataFieldValue, filterValue)) {
                                    localMatch = false;
                                }
                                if (!localMatch) {
                                    break;
                                }
                            }
                        }
                        if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                            for (var j = 0; j < globalFilterFieldsArray.length; j++) {
                                var globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                                globalMatch = utils.FilterUtils[this.filters['global'].matchMode](utils.ObjectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters['global'].value);
                                if (globalMatch) {
                                    break;
                                }
                            }
                        }
                        var matches = void 0;
                        if (this.filters['global']) {
                            matches = localFiltered ? (localFiltered && localMatch && globalMatch) : globalMatch;
                        }
                        else {
                            matches = localFiltered && localMatch;
                        }
                        if (matches) {
                            this.filteredValue.push(this.value[i]);
                        }
                    }
                    if (this.filteredValue.length === this.value.length) {
                        this.filteredValue = null;
                    }
                    if (this.paginator) {
                        this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                    }
                }
            }
            this.onFilter.emit({
                filters: this.filters,
                filteredValue: this.filteredValue || this.value
            });
            this.tableService.onValueChange(this.value);
            if (this.isStateful() && !this.restoringFilter) {
                this.saveState();
            }
            if (this.restoringFilter) {
                this.restoringFilter = false;
            }
            this.cd.detectChanges();
        };
        Table.prototype.hasFilter = function () {
            var empty = true;
            for (var prop in this.filters) {
                if (this.filters.hasOwnProperty(prop)) {
                    empty = false;
                    break;
                }
            }
            return !empty;
        };
        Table.prototype.createLazyLoadMetadata = function () {
            return {
                first: this.first,
                rows: this.virtualScroll ? this.rows * 2 : this.rows,
                sortField: this.sortField,
                sortOrder: this.sortOrder,
                filters: this.filters,
                globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
                multiSortMeta: this.multiSortMeta
            };
        };
        Table.prototype.reset = function () {
            this._sortField = null;
            this._sortOrder = this.defaultSortOrder;
            this._multiSortMeta = null;
            this.tableService.onSort(null);
            this.filteredValue = null;
            this.filters = {};
            this.first = 0;
            this.firstChange.emit(this.first);
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else {
                this.totalRecords = (this._value ? this._value.length : 0);
            }
        };
        Table.prototype.exportCSV = function (options) {
            var _this = this;
            var data = this.filteredValue || this.value;
            var csv = '';
            if (options && options.selectionOnly) {
                data = this.selection || [];
            }
            //headers
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                if (column.exportable !== false && column.field) {
                    csv += '"' + (column.header || column.field) + '"';
                    if (i < (this.columns.length - 1)) {
                        csv += this.csvSeparator;
                    }
                }
            }
            //body
            data.forEach(function (record, i) {
                csv += '\n';
                for (var i_1 = 0; i_1 < _this.columns.length; i_1++) {
                    var column = _this.columns[i_1];
                    if (column.exportable !== false && column.field) {
                        var cellData = utils.ObjectUtils.resolveFieldData(record, column.field);
                        if (cellData != null) {
                            if (_this.exportFunction) {
                                cellData = _this.exportFunction({
                                    data: cellData,
                                    field: column.field
                                });
                            }
                            else
                                cellData = String(cellData).replace(/"/g, '""');
                        }
                        else
                            cellData = '';
                        csv += '"' + cellData + '"';
                        if (i_1 < (_this.columns.length - 1)) {
                            csv += _this.csvSeparator;
                        }
                    }
                }
            });
            var blob = new Blob([csv], {
                type: 'text/csv;charset=utf-8;'
            });
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
            }
            else {
                var link = document.createElement("a");
                link.style.display = 'none';
                document.body.appendChild(link);
                if (link.download !== undefined) {
                    link.setAttribute('href', URL.createObjectURL(blob));
                    link.setAttribute('download', this.exportFilename + '.csv');
                    link.click();
                }
                else {
                    csv = 'data:text/csv;charset=utf-8,' + csv;
                    window.open(encodeURI(csv));
                }
                document.body.removeChild(link);
            }
        };
        Table.prototype.updateEditingCell = function (cell, data, field) {
            this.editingCell = cell;
            this.editingCellData = data;
            this.editingCellField = field;
            this.bindDocumentEditListener();
        };
        Table.prototype.isEditingCellValid = function () {
            return (this.editingCell && dom.DomHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0);
        };
        Table.prototype.bindDocumentEditListener = function () {
            var _this = this;
            if (!this.documentEditListener) {
                this.documentEditListener = function (event) {
                    if (_this.editingCell && !_this.editingCellClick && _this.isEditingCellValid()) {
                        dom.DomHandler.removeClass(_this.editingCell, 'ui-editing-cell');
                        _this.editingCell = null;
                        _this.onEditComplete.emit({ field: _this.editingCellField, data: _this.editingCellData, originalEvent: event });
                        _this.editingCellField = null;
                        _this.editingCellData = null;
                        _this.unbindDocumentEditListener();
                    }
                    _this.editingCellClick = false;
                };
                document.addEventListener('click', this.documentEditListener);
            }
        };
        Table.prototype.unbindDocumentEditListener = function () {
            if (this.documentEditListener) {
                document.removeEventListener('click', this.documentEditListener);
                this.documentEditListener = null;
            }
        };
        Table.prototype.initRowEdit = function (rowData) {
            var dataKeyValue = String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey));
            this.editingRowKeys[dataKeyValue] = true;
        };
        Table.prototype.saveRowEdit = function (rowData, rowElement) {
            if (dom.DomHandler.find(rowElement, '.ng-invalid.ng-dirty').length === 0) {
                var dataKeyValue = String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey));
                delete this.editingRowKeys[dataKeyValue];
            }
        };
        Table.prototype.cancelRowEdit = function (rowData) {
            var dataKeyValue = String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey));
            delete this.editingRowKeys[dataKeyValue];
        };
        Table.prototype.toggleRow = function (rowData, event) {
            if (!this.dataKey) {
                throw new Error('dataKey must be defined to use row expansion');
            }
            var dataKeyValue = String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey));
            if (this.expandedRowKeys[dataKeyValue] != null) {
                delete this.expandedRowKeys[dataKeyValue];
                this.onRowCollapse.emit({
                    originalEvent: event,
                    data: rowData
                });
            }
            else {
                if (this.rowExpandMode === 'single') {
                    this.expandedRowKeys = {};
                }
                this.expandedRowKeys[dataKeyValue] = true;
                this.onRowExpand.emit({
                    originalEvent: event,
                    data: rowData
                });
            }
            if (event) {
                event.preventDefault();
            }
            if (this.isStateful()) {
                this.saveState();
            }
        };
        Table.prototype.isRowExpanded = function (rowData) {
            return this.expandedRowKeys[String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
        };
        Table.prototype.isRowEditing = function (rowData) {
            return this.editingRowKeys[String(utils.ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
        };
        Table.prototype.isSingleSelectionMode = function () {
            return this.selectionMode === 'single';
        };
        Table.prototype.isMultipleSelectionMode = function () {
            return this.selectionMode === 'multiple';
        };
        Table.prototype.onColumnResizeBegin = function (event) {
            var containerLeft = dom.DomHandler.getOffset(this.containerViewChild.nativeElement).left;
            this.lastResizerHelperX = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft);
            event.preventDefault();
        };
        Table.prototype.onColumnResize = function (event) {
            var containerLeft = dom.DomHandler.getOffset(this.containerViewChild.nativeElement).left;
            dom.DomHandler.addClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
            this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild.nativeElement.offsetHeight + 'px';
            this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
            this.resizeHelperViewChild.nativeElement.style.left = (event.pageX - containerLeft + this.containerViewChild.nativeElement.scrollLeft) + 'px';
            this.resizeHelperViewChild.nativeElement.style.display = 'block';
        };
        Table.prototype.onColumnResizeEnd = function (event, column) {
            var delta = this.resizeHelperViewChild.nativeElement.offsetLeft - this.lastResizerHelperX;
            var columnWidth = column.offsetWidth;
            var minWidth = parseInt(column.style.minWidth || 15);
            if (columnWidth + delta < minWidth) {
                delta = minWidth - columnWidth;
            }
            var newColumnWidth = columnWidth + delta;
            if (newColumnWidth >= minWidth) {
                if (this.columnResizeMode === 'fit') {
                    var nextColumn = column.nextElementSibling;
                    while (!nextColumn.offsetParent) {
                        nextColumn = nextColumn.nextElementSibling;
                    }
                    if (nextColumn) {
                        var nextColumnWidth = nextColumn.offsetWidth - delta;
                        var nextColumnMinWidth = nextColumn.style.minWidth || 15;
                        if (newColumnWidth > 15 && nextColumnWidth > parseInt(nextColumnMinWidth)) {
                            if (this.scrollable) {
                                var scrollableView = this.findParentScrollableView(column);
                                var scrollableBodyTable = dom.DomHandler.findSingle(scrollableView, 'table.ui-table-scrollable-body-table');
                                var scrollableHeaderTable = dom.DomHandler.findSingle(scrollableView, 'table.ui-table-scrollable-header-table');
                                var scrollableFooterTable = dom.DomHandler.findSingle(scrollableView, 'table.ui-table-scrollable-footer-table');
                                var resizeColumnIndex = dom.DomHandler.index(column);
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
                    if (newColumnWidth > minWidth) {
                        if (this.scrollable) {
                            this.setScrollableItemsWidthOnExpandResize(column, newColumnWidth, delta);
                        }
                        else {
                            this.tableViewChild.nativeElement.style.width = this.tableViewChild.nativeElement.offsetWidth + delta + 'px';
                            column.style.width = newColumnWidth + 'px';
                            var containerWidth = this.tableViewChild.nativeElement.style.width;
                            this.containerViewChild.nativeElement.style.width = containerWidth + 'px';
                        }
                    }
                }
                this.onColResize.emit({
                    element: column,
                    delta: delta
                });
                if (this.isStateful()) {
                    this.saveState();
                }
            }
            this.resizeHelperViewChild.nativeElement.style.display = 'none';
            dom.DomHandler.removeClass(this.containerViewChild.nativeElement, 'ui-unselectable-text');
        };
        Table.prototype.setScrollableItemsWidthOnExpandResize = function (column, newColumnWidth, delta) {
            var scrollableView = column ? this.findParentScrollableView(column) : this.containerViewChild.nativeElement;
            var scrollableBody = dom.DomHandler.findSingle(scrollableView, '.ui-table-scrollable-body');
            var scrollableHeader = dom.DomHandler.findSingle(scrollableView, '.ui-table-scrollable-header');
            var scrollableFooter = dom.DomHandler.findSingle(scrollableView, '.ui-table-scrollable-footer');
            var scrollableBodyTable = dom.DomHandler.findSingle(scrollableBody, 'table.ui-table-scrollable-body-table');
            var scrollableHeaderTable = dom.DomHandler.findSingle(scrollableHeader, 'table.ui-table-scrollable-header-table');
            var scrollableFooterTable = dom.DomHandler.findSingle(scrollableFooter, 'table.ui-table-scrollable-footer-table');
            var scrollableBodyTableWidth = column ? scrollableBodyTable.offsetWidth + delta : newColumnWidth;
            var scrollableHeaderTableWidth = column ? scrollableHeaderTable.offsetWidth + delta : newColumnWidth;
            var isContainerInViewport = this.containerViewChild.nativeElement.offsetWidth >= scrollableBodyTableWidth;
            var setWidth = function (container, table, width, isContainerInViewport) {
                if (container && table) {
                    container.style.width = isContainerInViewport ? width + dom.DomHandler.calculateScrollbarWidth(scrollableBody) + 'px' : 'auto';
                    table.style.width = width + 'px';
                }
            };
            setWidth(scrollableBody, scrollableBodyTable, scrollableBodyTableWidth, isContainerInViewport);
            setWidth(scrollableHeader, scrollableHeaderTable, scrollableHeaderTableWidth, isContainerInViewport);
            setWidth(scrollableFooter, scrollableFooterTable, scrollableHeaderTableWidth, isContainerInViewport);
            if (column) {
                var resizeColumnIndex = dom.DomHandler.index(column);
                this.resizeColGroup(scrollableHeaderTable, resizeColumnIndex, newColumnWidth, null);
                this.resizeColGroup(scrollableBodyTable, resizeColumnIndex, newColumnWidth, null);
                this.resizeColGroup(scrollableFooterTable, resizeColumnIndex, newColumnWidth, null);
            }
        };
        Table.prototype.findParentScrollableView = function (column) {
            if (column) {
                var parent_1 = column.parentElement;
                while (parent_1 && !dom.DomHandler.hasClass(parent_1, 'ui-table-scrollable-view')) {
                    parent_1 = parent_1.parentElement;
                }
                return parent_1;
            }
            else {
                return null;
            }
        };
        Table.prototype.resizeColGroup = function (table, resizeColumnIndex, newColumnWidth, nextColumnWidth) {
            if (table) {
                var colGroup = table.children[0].nodeName === 'COLGROUP' ? table.children[0] : null;
                if (colGroup) {
                    var col = colGroup.children[resizeColumnIndex];
                    var nextCol = col.nextElementSibling;
                    col.style.width = newColumnWidth + 'px';
                    if (nextCol && nextColumnWidth) {
                        nextCol.style.width = nextColumnWidth + 'px';
                    }
                }
                else {
                    throw "Scrollable tables require a colgroup to support resizable columns";
                }
            }
        };
        Table.prototype.onColumnDragStart = function (event, columnElement) {
            this.reorderIconWidth = dom.DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild.nativeElement);
            this.reorderIconHeight = dom.DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild.nativeElement);
            this.draggedColumn = columnElement;
            event.dataTransfer.setData('text', 'b'); // For firefox
        };
        Table.prototype.onColumnDragEnter = function (event, dropHeader) {
            if (this.reorderableColumns && this.draggedColumn && dropHeader) {
                event.preventDefault();
                var containerOffset = dom.DomHandler.getOffset(this.containerViewChild.nativeElement);
                var dropHeaderOffset = dom.DomHandler.getOffset(dropHeader);
                if (this.draggedColumn != dropHeader) {
                    var dragIndex = dom.DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
                    var dropIndex = dom.DomHandler.indexWithinGroup(dropHeader, 'preorderablecolumn');
                    var targetLeft = dropHeaderOffset.left - containerOffset.left;
                    var targetTop = containerOffset.top - dropHeaderOffset.top;
                    var columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
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
                    if ((dropIndex - dragIndex === 1 && this.dropPosition === -1) || (dropIndex - dragIndex === -1 && this.dropPosition === 1)) {
                        this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
                        this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
                    }
                    else {
                        this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                        this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
                    }
                }
                else {
                    event.dataTransfer.dropEffect = 'none';
                }
            }
        };
        Table.prototype.onColumnDragLeave = function (event) {
            if (this.reorderableColumns && this.draggedColumn) {
                event.preventDefault();
                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            }
        };
        Table.prototype.onColumnDrop = function (event, dropColumn) {
            var _this = this;
            event.preventDefault();
            if (this.draggedColumn) {
                var dragIndex = dom.DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
                var dropIndex = dom.DomHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
                var allowDrop = (dragIndex != dropIndex);
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
                    utils.ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                    this.onColReorder.emit({
                        dragIndex: dragIndex,
                        dropIndex: dropIndex,
                        columns: this.columns
                    });
                    if (this.isStateful()) {
                        this.zone.runOutsideAngular(function () {
                            setTimeout(function () {
                                _this.saveState();
                            });
                        });
                    }
                }
                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
                this.draggedColumn.draggable = false;
                this.draggedColumn = null;
                this.dropPosition = null;
            }
        };
        Table.prototype.onRowDragStart = function (event, index) {
            this.rowDragging = true;
            this.draggedRowIndex = index;
            event.dataTransfer.setData('text', 'b'); // For firefox
        };
        Table.prototype.onRowDragOver = function (event, index, rowElement) {
            if (this.rowDragging && this.draggedRowIndex !== index) {
                var rowY = dom.DomHandler.getOffset(rowElement).top + dom.DomHandler.getWindowScrollTop();
                var pageY = event.pageY;
                var rowMidY = rowY + dom.DomHandler.getOuterHeight(rowElement) / 2;
                var prevRowElement = rowElement.previousElementSibling;
                if (pageY < rowMidY) {
                    dom.DomHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
                    this.droppedRowIndex = index;
                    if (prevRowElement)
                        dom.DomHandler.addClass(prevRowElement, 'ui-table-dragpoint-bottom');
                    else
                        dom.DomHandler.addClass(rowElement, 'ui-table-dragpoint-top');
                }
                else {
                    if (prevRowElement)
                        dom.DomHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
                    else
                        dom.DomHandler.addClass(rowElement, 'ui-table-dragpoint-top');
                    this.droppedRowIndex = index + 1;
                    dom.DomHandler.addClass(rowElement, 'ui-table-dragpoint-bottom');
                }
            }
        };
        Table.prototype.onRowDragLeave = function (event, rowElement) {
            var prevRowElement = rowElement.previousElementSibling;
            if (prevRowElement) {
                dom.DomHandler.removeClass(prevRowElement, 'ui-table-dragpoint-bottom');
            }
            dom.DomHandler.removeClass(rowElement, 'ui-table-dragpoint-bottom');
            dom.DomHandler.removeClass(rowElement, 'ui-table-dragpoint-top');
        };
        Table.prototype.onRowDragEnd = function (event) {
            this.rowDragging = false;
            this.draggedRowIndex = null;
            this.droppedRowIndex = null;
        };
        Table.prototype.onRowDrop = function (event, rowElement) {
            if (this.droppedRowIndex != null) {
                var dropIndex = (this.draggedRowIndex > this.droppedRowIndex) ? this.droppedRowIndex : (this.droppedRowIndex === 0) ? 0 : this.droppedRowIndex - 1;
                utils.ObjectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);
                this.onRowReorder.emit({
                    dragIndex: this.draggedRowIndex,
                    dropIndex: dropIndex
                });
            }
            //cleanup
            this.onRowDragLeave(event, rowElement);
            this.onRowDragEnd(event);
        };
        Table.prototype.handleVirtualScroll = function (event) {
            var _this = this;
            this.first = (event.page - 1) * this.rows;
            this.firstChange.emit(this.first);
            this.virtualScrollCallback = event.callback;
            this.zone.run(function () {
                if (_this.virtualScrollTimer) {
                    clearTimeout(_this.virtualScrollTimer);
                }
                _this.virtualScrollTimer = setTimeout(function () {
                    _this.onLazyLoad.emit(_this.createLazyLoadMetadata());
                }, _this.virtualScrollDelay);
            });
        };
        Table.prototype.isEmpty = function () {
            var data = this.filteredValue || this.value;
            return data == null || data.length == 0;
        };
        Table.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Table.prototype.getStorage = function () {
            switch (this.stateStorage) {
                case 'local':
                    return window.localStorage;
                case 'session':
                    return window.sessionStorage;
                default:
                    throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
            }
        };
        Table.prototype.isStateful = function () {
            return this.stateKey != null;
        };
        Table.prototype.saveState = function () {
            var storage = this.getStorage();
            var state = {};
            if (this.paginator) {
                state.first = this.first;
                state.rows = this.rows;
            }
            if (this.sortField) {
                state.sortField = this.sortField;
                state.sortOrder = this.sortOrder;
            }
            if (this.multiSortMeta) {
                state.multiSortMeta = this.multiSortMeta;
            }
            if (this.hasFilter()) {
                state.filters = this.filters;
            }
            if (this.resizableColumns) {
                this.saveColumnWidths(state);
            }
            if (this.reorderableColumns) {
                this.saveColumnOrder(state);
            }
            if (this.selection) {
                state.selection = this.selection;
            }
            if (Object.keys(this.expandedRowKeys).length) {
                state.expandedRowKeys = this.expandedRowKeys;
            }
            if (Object.keys(state).length) {
                storage.setItem(this.stateKey, JSON.stringify(state));
            }
            this.onStateSave.emit(state);
        };
        Table.prototype.clearState = function () {
            var storage = this.getStorage();
            if (this.stateKey) {
                storage.removeItem(this.stateKey);
            }
        };
        Table.prototype.restoreState = function () {
            var _this = this;
            var storage = this.getStorage();
            var stateString = storage.getItem(this.stateKey);
            if (stateString) {
                var state_1 = JSON.parse(stateString);
                if (this.paginator) {
                    this.first = state_1.first;
                    this.rows = state_1.rows;
                    this.firstChange.emit(this.first);
                    this.rowsChange.emit(this.rows);
                }
                if (state_1.sortField) {
                    this.restoringSort = true;
                    this._sortField = state_1.sortField;
                    this._sortOrder = state_1.sortOrder;
                }
                if (state_1.multiSortMeta) {
                    this.restoringSort = true;
                    this._multiSortMeta = state_1.multiSortMeta;
                }
                if (state_1.filters) {
                    this.restoringFilter = true;
                    this.filters = state_1.filters;
                }
                if (this.resizableColumns) {
                    this.columnWidthsState = state_1.columnWidths;
                    this.tableWidthState = state_1.tableWidth;
                }
                if (state_1.expandedRowKeys) {
                    this.expandedRowKeys = state_1.expandedRowKeys;
                }
                if (state_1.selection) {
                    Promise.resolve(null).then(function () { return _this.selectionChange.emit(state_1.selection); });
                }
                this.stateRestored = true;
                this.onStateRestore.emit(state_1);
            }
        };
        Table.prototype.saveColumnWidths = function (state) {
            var widths = [];
            var headers = dom.DomHandler.find(this.containerViewChild.nativeElement, '.ui-table-thead > tr:first-child > th');
            headers.map(function (header) { return widths.push(dom.DomHandler.getOuterWidth(header)); });
            state.columnWidths = widths.join(',');
            if (this.columnResizeMode === 'expand') {
                state.tableWidth = this.scrollable ? dom.DomHandler.findSingle(this.containerViewChild.nativeElement, '.ui-table-scrollable-header-table').style.width :
                    dom.DomHandler.getOuterWidth(this.tableViewChild.nativeElement) + 'px';
            }
        };
        Table.prototype.restoreColumnWidths = function () {
            if (this.columnWidthsState) {
                var widths_1 = this.columnWidthsState.split(',');
                if (this.columnResizeMode === 'expand' && this.tableWidthState) {
                    if (this.scrollable) {
                        this.setScrollableItemsWidthOnExpandResize(null, this.tableWidthState, 0);
                    }
                    else {
                        this.tableViewChild.nativeElement.style.width = this.tableWidthState;
                        this.containerViewChild.nativeElement.style.width = this.tableWidthState;
                    }
                }
                if (this.scrollable) {
                    var headerCols = dom.DomHandler.find(this.containerViewChild.nativeElement, '.ui-table-scrollable-header-table > colgroup > col');
                    var bodyCols = dom.DomHandler.find(this.containerViewChild.nativeElement, '.ui-table-scrollable-body-table > colgroup > col');
                    headerCols.map(function (col, index) { return col.style.width = widths_1[index] + 'px'; });
                    bodyCols.map(function (col, index) { return col.style.width = widths_1[index] + 'px'; });
                }
                else {
                    var headers = dom.DomHandler.find(this.tableViewChild.nativeElement, '.ui-table-thead > tr:first-child > th');
                    headers.map(function (header, index) { return header.style.width = widths_1[index] + 'px'; });
                }
            }
        };
        Table.prototype.saveColumnOrder = function (state) {
            if (this.columns) {
                var columnOrder_1 = [];
                this.columns.map(function (column) {
                    columnOrder_1.push(column.field || column.key);
                });
                state.columnOrder = columnOrder_1;
            }
        };
        Table.prototype.restoreColumnOrder = function () {
            var _this = this;
            var storage = this.getStorage();
            var stateString = storage.getItem(this.stateKey);
            if (stateString) {
                var state = JSON.parse(stateString);
                var columnOrder = state.columnOrder;
                if (columnOrder) {
                    var reorderedColumns_1 = [];
                    columnOrder.map(function (key) { return reorderedColumns_1.push(_this.findColumnByKey(key)); });
                    this.columnOrderStateRestored = true;
                    this.columns = reorderedColumns_1;
                }
            }
        };
        Table.prototype.findColumnByKey = function (key) {
            var e_2, _a;
            if (this.columns) {
                try {
                    for (var _b = __values(this.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var col = _c.value;
                        if (col.key === key || col.field === key)
                            return col;
                        else
                            continue;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            else {
                return null;
            }
        };
        Table.prototype.ngOnDestroy = function () {
            this.unbindDocumentEditListener();
            this.editingCell = null;
            this.initialized = null;
        };
        Table.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone },
            { type: TableService },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], Table.prototype, "frozenColumns", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "frozenValue", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "tableStyle", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "tableStyleClass", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "paginator", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "pageLinks", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "rowsPerPageOptions", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "alwaysShowPaginator", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "paginatorPosition", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "paginatorDropdownAppendTo", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "paginatorDropdownScrollHeight", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "currentPageReportTemplate", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "showCurrentPageReport", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "defaultSortOrder", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "sortMode", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "resetPageOnSort", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "selectionMode", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "selectionChange", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "contextMenuSelection", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "contextMenuSelectionChange", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "contextMenuSelectionMode", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "dataKey", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "metaKeySelection", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "rowTrackBy", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "lazy", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "lazyLoadOnInit", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "compareSelectionBy", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "csvSeparator", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "exportFilename", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "filters", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "globalFilterFields", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "filterDelay", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "expandedRowKeys", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "editingRowKeys", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "rowExpandMode", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "scrollable", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "scrollHeight", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "virtualScroll", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "virtualScrollDelay", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "virtualRowHeight", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "frozenWidth", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "responsive", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "contextMenu", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "resizableColumns", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "columnResizeMode", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "reorderableColumns", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "loading", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "loadingIcon", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "showLoader", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "rowHover", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "customSort", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "autoLayout", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "exportFunction", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "stateKey", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "stateStorage", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "editMode", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onRowSelect", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onRowUnselect", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onPage", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onSort", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onFilter", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onLazyLoad", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onRowExpand", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onRowCollapse", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onContextMenuSelect", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onColResize", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onColReorder", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onRowReorder", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onEditInit", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onEditComplete", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onEditCancel", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onHeaderCheckboxToggle", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "sortFunction", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "firstChange", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "rowsChange", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onStateSave", void 0);
        __decorate([
            core.Output()
        ], Table.prototype, "onStateRestore", void 0);
        __decorate([
            core.ViewChild('container', { static: false })
        ], Table.prototype, "containerViewChild", void 0);
        __decorate([
            core.ViewChild('resizeHelper', { static: false })
        ], Table.prototype, "resizeHelperViewChild", void 0);
        __decorate([
            core.ViewChild('reorderIndicatorUp', { static: false })
        ], Table.prototype, "reorderIndicatorUpViewChild", void 0);
        __decorate([
            core.ViewChild('reorderIndicatorDown', { static: false })
        ], Table.prototype, "reorderIndicatorDownViewChild", void 0);
        __decorate([
            core.ViewChild('table', { static: false })
        ], Table.prototype, "tableViewChild", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], Table.prototype, "templates", void 0);
        __decorate([
            core.Input()
        ], Table.prototype, "value", null);
        __decorate([
            core.Input()
        ], Table.prototype, "columns", null);
        __decorate([
            core.Input()
        ], Table.prototype, "first", null);
        __decorate([
            core.Input()
        ], Table.prototype, "rows", null);
        __decorate([
            core.Input()
        ], Table.prototype, "totalRecords", null);
        __decorate([
            core.Input()
        ], Table.prototype, "sortField", null);
        __decorate([
            core.Input()
        ], Table.prototype, "sortOrder", null);
        __decorate([
            core.Input()
        ], Table.prototype, "multiSortMeta", null);
        __decorate([
            core.Input()
        ], Table.prototype, "selection", null);
        Table = __decorate([
            core.Component({
                selector: 'p-table',
                template: "\n        <div #container [ngStyle]=\"style\" [class]=\"styleClass\"\n            [ngClass]=\"{'ui-table ui-widget': true, 'ui-table-responsive': responsive, 'ui-table-resizable': resizableColumns,\n                'ui-table-resizable-fit': (resizableColumns && columnResizeMode === 'fit'),\n                'ui-table-hoverable-rows': (rowHover||selectionMode), 'ui-table-auto-layout': autoLayout}\">\n            <div class=\"ui-table-loading ui-widget-overlay\" *ngIf=\"loading && showLoader\"></div>\n            <div class=\"ui-table-loading-content\" *ngIf=\"loading && showLoader\">\n                <i [class]=\"'ui-table-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div *ngIf=\"captionTemplate\" class=\"ui-table-caption ui-widget-header\">\n                <ng-container *ngTemplateOutlet=\"captionTemplate\"></ng-container>\n            </div>\n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-top\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'top' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\"></p-paginator>\n            \n            <div class=\"ui-table-wrapper\" *ngIf=\"!scrollable\">\n                <table role=\"grid\" #table [ngClass]=\"tableStyleClass\" [ngStyle]=\"tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"ui-table-thead\">\n                        <ng-container *ngTemplateOutlet=\"headerTemplate; context: {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tbody class=\"ui-table-tbody\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"bodyTemplate\"></tbody>\n                    <tfoot *ngIf=\"footerTemplate\" class=\"ui-table-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                </table>\n            </div>\n\n            <div class=\"ui-table-scrollable-wrapper\" *ngIf=\"scrollable\">\n               <div class=\"ui-table-scrollable-view ui-table-frozen-view\" *ngIf=\"frozenColumns||frozenBodyTemplate\" [pScrollableView]=\"frozenColumns\" [frozen]=\"true\" [ngStyle]=\"{width: frozenWidth}\" [scrollHeight]=\"scrollHeight\"></div>\n               <div class=\"ui-table-scrollable-view\" [pScrollableView]=\"columns\" [frozen]=\"false\" [scrollHeight]=\"scrollHeight\" [ngStyle]=\"{left: frozenWidth, width: 'calc(100% - '+frozenWidth+')'}\"></div>\n            </div>\n            \n            <p-paginator [rows]=\"rows\" [first]=\"first\" [totalRecords]=\"totalRecords\" [pageLinkSize]=\"pageLinks\" styleClass=\"ui-paginator-bottom\" [alwaysShow]=\"alwaysShowPaginator\"\n                (onPageChange)=\"onPageChange($event)\" [rowsPerPageOptions]=\"rowsPerPageOptions\" *ngIf=\"paginator && (paginatorPosition === 'bottom' || paginatorPosition =='both')\"\n                [templateLeft]=\"paginatorLeftTemplate\" [templateRight]=\"paginatorRightTemplate\" [dropdownAppendTo]=\"paginatorDropdownAppendTo\" [dropdownScrollHeight]=\"paginatorDropdownScrollHeight\"\n                [currentPageReportTemplate]=\"currentPageReportTemplate\" [showCurrentPageReport]=\"showCurrentPageReport\"></p-paginator>\n            \n                <div *ngIf=\"summaryTemplate\" class=\"ui-table-summary ui-widget-header\">\n                <ng-container *ngTemplateOutlet=\"summaryTemplate\"></ng-container>\n            </div>\n\n            <div #resizeHelper class=\"ui-column-resizer-helper ui-state-highlight\" style=\"display:none\" *ngIf=\"resizableColumns\"></div>\n\n            <span #reorderIndicatorUp class=\"pi pi-arrow-down ui-table-reorder-indicator-up\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n            <span #reorderIndicatorDown class=\"pi pi-arrow-up ui-table-reorder-indicator-down\" style=\"display:none\" *ngIf=\"reorderableColumns\"></span>\n        </div>\n    ",
                providers: [TableService]
            })
        ], Table);
        return Table;
    }());
    var TableBody = /** @class */ (function () {
        function TableBody(dt) {
            this.dt = dt;
        }
        TableBody.ctorParameters = function () { return [
            { type: Table }
        ]; };
        __decorate([
            core.Input("pTableBody")
        ], TableBody.prototype, "columns", void 0);
        __decorate([
            core.Input("pTableBodyTemplate")
        ], TableBody.prototype, "template", void 0);
        __decorate([
            core.Input()
        ], TableBody.prototype, "frozen", void 0);
        TableBody = __decorate([
            core.Component({
                selector: '[pTableBody]',
                template: "\n        <ng-container *ngIf=\"!dt.expandedRowTemplate\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}\"></ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.expandedRowTemplate\">\n            <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"(dt.paginator && !dt.lazy) ? ((dt.filteredValue||dt.value) | slice:dt.first:(dt.first + dt.rows)) : (dt.filteredValue||dt.value)\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns, expanded: dt.isRowExpanded(rowData), editing: (dt.editMode === 'row' && dt.isRowEditing(rowData))}\"></ng-container>\n                <ng-container *ngIf=\"dt.isRowExpanded(rowData)\">\n                    <ng-container *ngTemplateOutlet=\"dt.expandedRowTemplate; context: {$implicit: rowData, rowIndex: dt.paginator ? (dt.first + rowIndex) : rowIndex, columns: columns}\"></ng-container>\n                </ng-container>\n            </ng-template>\n        </ng-container>\n        <ng-container *ngIf=\"dt.isEmpty()\">\n            <ng-container *ngTemplateOutlet=\"dt.emptyMessageTemplate; context: {$implicit: columns, frozen: frozen}\"></ng-container>\n        </ng-container>\n    "
            })
        ], TableBody);
        return TableBody;
    }());
    var ScrollableView = /** @class */ (function () {
        function ScrollableView(dt, el, zone) {
            var _this = this;
            this.dt = dt;
            this.el = el;
            this.zone = zone;
            this.loadingArray = [];
            this.subscription = this.dt.tableService.valueSource$.subscribe(function () {
                _this.zone.runOutsideAngular(function () {
                    setTimeout(function () {
                        _this.alignScrollBar();
                        if (_this.scrollLoadingTableViewChild && _this.scrollLoadingTableViewChild.nativeElement) {
                            _this.scrollLoadingTableViewChild.nativeElement.style.display = 'none';
                        }
                    }, 50);
                });
            });
            if (this.dt.virtualScroll) {
                this.totalRecordsSubscription = this.dt.tableService.totalRecordsSource$.subscribe(function () {
                    _this.zone.runOutsideAngular(function () {
                        setTimeout(function () {
                            _this.setVirtualScrollerHeight();
                        }, 50);
                    });
                });
            }
            this.loadingArray = Array(this.dt.rows).fill(1);
            this.initialized = false;
        }
        Object.defineProperty(ScrollableView.prototype, "scrollHeight", {
            get: function () {
                return this._scrollHeight;
            },
            set: function (val) {
                this._scrollHeight = val;
                this.setScrollHeight();
            },
            enumerable: true,
            configurable: true
        });
        ScrollableView.prototype.ngAfterViewChecked = function () {
            if (!this.initialized && this.el.nativeElement.offsetParent) {
                this.alignScrollBar();
                this.setScrollHeight();
                this.initialized = true;
            }
        };
        ScrollableView.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (!this.frozen) {
                if (this.dt.frozenColumns || this.dt.frozenBodyTemplate) {
                    dom.DomHandler.addClass(this.el.nativeElement, 'ui-table-unfrozen-view');
                }
                var frozenView = this.el.nativeElement.previousElementSibling;
                if (frozenView) {
                    this.frozenSiblingBody = dom.DomHandler.findSingle(frozenView, '.ui-table-scrollable-body');
                }
            }
            else {
                if (this.scrollableAlignerViewChild && this.scrollableAlignerViewChild.nativeElement) {
                    this.scrollableAlignerViewChild.nativeElement.style.height = dom.DomHandler.calculateScrollbarHeight() + 'px';
                }
                var scrollableView = this.el.nativeElement.nextElementSibling;
                if (scrollableView) {
                    this.scrollableSiblingBody = dom.DomHandler.findSingle(scrollableView, '.ui-table-scrollable-body');
                }
            }
            this.bindEvents();
            this.setScrollHeight();
            this.alignScrollBar();
            if (this.frozen) {
                this.columnsSubscription = this.dt.tableService.columnsSource$.subscribe(function () {
                    _this.zone.runOutsideAngular(function () {
                        setTimeout(function () {
                            _this.setScrollHeight();
                        }, 50);
                    });
                });
            }
            if (this.dt.virtualScroll) {
                this.setVirtualScrollerHeight();
                if (this.scrollLoadingTableViewChild && this.scrollLoadingTableViewChild.nativeElement) {
                    this.scrollLoadingTableViewChild.nativeElement.style.display = 'table';
                }
            }
        };
        ScrollableView.prototype.bindEvents = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                var scrollBarWidth = dom.DomHandler.calculateScrollbarWidth();
                if (_this.scrollHeaderViewChild && _this.scrollHeaderViewChild.nativeElement) {
                    _this.headerScrollListener = _this.onHeaderScroll.bind(_this);
                    _this.scrollHeaderViewChild.nativeElement.addEventListener('scroll', _this.headerScrollListener);
                }
                if (_this.scrollFooterViewChild && _this.scrollFooterViewChild.nativeElement) {
                    _this.footerScrollListener = _this.onFooterScroll.bind(_this);
                    _this.scrollFooterViewChild.nativeElement.addEventListener('scroll', _this.footerScrollListener);
                }
                if (!_this.frozen) {
                    _this.bodyScrollListener = _this.onBodyScroll.bind(_this);
                    _this.scrollBodyViewChild.nativeElement.addEventListener('scroll', _this.bodyScrollListener);
                }
            });
        };
        ScrollableView.prototype.unbindEvents = function () {
            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                this.scrollHeaderViewChild.nativeElement.removeEventListener('scroll', this.headerScrollListener);
            }
            if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                this.scrollFooterViewChild.nativeElement.removeEventListener('scroll', this.footerScrollListener);
            }
            this.scrollBodyViewChild.nativeElement.removeEventListener('scroll', this.bodyScrollListener);
        };
        ScrollableView.prototype.onHeaderScroll = function (event) {
            var scrollLeft = this.scrollHeaderViewChild.nativeElement.scrollLeft;
            this.scrollBodyViewChild.nativeElement.scrollLeft = scrollLeft;
            if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                this.scrollFooterViewChild.nativeElement.scrollLeft = scrollLeft;
            }
            this.preventBodyScrollPropagation = true;
        };
        ScrollableView.prototype.onFooterScroll = function (event) {
            var scrollLeft = this.scrollFooterViewChild.nativeElement.scrollLeft;
            this.scrollBodyViewChild.nativeElement.scrollLeft = scrollLeft;
            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                this.scrollHeaderViewChild.nativeElement.scrollLeft = scrollLeft;
            }
            this.preventBodyScrollPropagation = true;
        };
        ScrollableView.prototype.onBodyScroll = function (event) {
            var _this = this;
            if (this.preventBodyScrollPropagation) {
                this.preventBodyScrollPropagation = false;
                return;
            }
            if (this.scrollHeaderViewChild && this.scrollHeaderViewChild.nativeElement) {
                this.scrollHeaderBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
            }
            if (this.scrollFooterViewChild && this.scrollFooterViewChild.nativeElement) {
                this.scrollFooterBoxViewChild.nativeElement.style.marginLeft = -1 * this.scrollBodyViewChild.nativeElement.scrollLeft + 'px';
            }
            if (this.frozenSiblingBody) {
                this.frozenSiblingBody.scrollTop = this.scrollBodyViewChild.nativeElement.scrollTop;
            }
            if (this.dt.virtualScroll) {
                var viewport = dom.DomHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
                var tableHeight = dom.DomHandler.getOuterHeight(this.scrollTableViewChild.nativeElement);
                var pageHeight_1 = this.dt.virtualRowHeight * this.dt.rows;
                var virtualTableHeight = dom.DomHandler.getOuterHeight(this.virtualScrollerViewChild.nativeElement);
                var pageCount = (virtualTableHeight / pageHeight_1) || 1;
                var scrollBodyTop = this.scrollTableViewChild.nativeElement.style.top || '0';
                if ((this.scrollBodyViewChild.nativeElement.scrollTop + viewport > parseFloat(scrollBodyTop) + tableHeight) || (this.scrollBodyViewChild.nativeElement.scrollTop < parseFloat(scrollBodyTop))) {
                    if (this.scrollLoadingTableViewChild && this.scrollLoadingTableViewChild.nativeElement) {
                        this.scrollLoadingTableViewChild.nativeElement.style.display = 'table';
                        this.scrollLoadingTableViewChild.nativeElement.style.top = this.scrollBodyViewChild.nativeElement.scrollTop + 'px';
                    }
                    var page_1 = Math.floor((this.scrollBodyViewChild.nativeElement.scrollTop * pageCount) / (this.scrollBodyViewChild.nativeElement.scrollHeight)) + 1;
                    this.dt.handleVirtualScroll({
                        page: page_1,
                        callback: function () {
                            if (_this.scrollLoadingTableViewChild && _this.scrollLoadingTableViewChild.nativeElement) {
                                _this.scrollLoadingTableViewChild.nativeElement.style.display = 'none';
                            }
                            _this.scrollTableViewChild.nativeElement.style.top = ((page_1 - 1) * pageHeight_1) + 'px';
                            if (_this.frozenSiblingBody) {
                                _this.frozenSiblingBody.children[0].style.top = _this.scrollTableViewChild.nativeElement.style.top;
                            }
                            _this.dt.anchorRowIndex = null;
                        }
                    });
                }
            }
        };
        ScrollableView.prototype.setScrollHeight = function () {
            if (this.scrollHeight && this.scrollBodyViewChild && this.scrollBodyViewChild.nativeElement) {
                if (this.scrollHeight.indexOf('%') !== -1) {
                    var relativeHeight = void 0;
                    this.scrollBodyViewChild.nativeElement.style.visibility = 'hidden';
                    this.scrollBodyViewChild.nativeElement.style.height = '100px'; //temporary height to calculate static height
                    var containerHeight = dom.DomHandler.getOuterHeight(this.dt.el.nativeElement.children[0]);
                    if (this.scrollHeight.includes("calc")) {
                        var percentHeight = parseInt(this.scrollHeight.slice(this.scrollHeight.indexOf("(") + 1, this.scrollHeight.indexOf("%")));
                        var diffValue = parseInt(this.scrollHeight.slice(this.scrollHeight.indexOf("-") + 1, this.scrollHeight.indexOf(")")));
                        relativeHeight = (dom.DomHandler.getOuterHeight(this.dt.el.nativeElement.parentElement) * percentHeight / 100) - diffValue;
                    }
                    else {
                        relativeHeight = dom.DomHandler.getOuterHeight(this.dt.el.nativeElement.parentElement) * parseInt(this.scrollHeight) / 100;
                    }
                    var staticHeight = containerHeight - 100; //total height of headers, footers, paginators
                    var scrollBodyHeight = (relativeHeight - staticHeight);
                    if (this.frozen) {
                        scrollBodyHeight -= dom.DomHandler.calculateScrollbarWidth();
                    }
                    this.scrollBodyViewChild.nativeElement.style.height = 'auto';
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = scrollBodyHeight + 'px';
                    this.scrollBodyViewChild.nativeElement.style.visibility = 'visible';
                }
                else {
                    this.scrollBodyViewChild.nativeElement.style.maxHeight = this.scrollHeight;
                }
            }
        };
        ScrollableView.prototype.setVirtualScrollerHeight = function () {
            if (this.virtualScrollerViewChild.nativeElement) {
                this.virtualScrollerViewChild.nativeElement.style.height = this.dt.totalRecords * this.dt.virtualRowHeight + 'px';
            }
        };
        ScrollableView.prototype.hasVerticalOverflow = function () {
            return dom.DomHandler.getOuterHeight(this.scrollTableViewChild.nativeElement) > dom.DomHandler.getOuterHeight(this.scrollBodyViewChild.nativeElement);
        };
        ScrollableView.prototype.alignScrollBar = function () {
            if (!this.frozen) {
                var scrollBarWidth = this.hasVerticalOverflow() ? dom.DomHandler.calculateScrollbarWidth() : 0;
                this.scrollHeaderBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
                if (this.scrollFooterBoxViewChild && this.scrollFooterBoxViewChild.nativeElement) {
                    this.scrollFooterBoxViewChild.nativeElement.style.marginRight = scrollBarWidth + 'px';
                }
            }
            this.initialized = false;
        };
        ScrollableView.prototype.ngOnDestroy = function () {
            this.unbindEvents();
            this.frozenSiblingBody = null;
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            if (this.totalRecordsSubscription) {
                this.totalRecordsSubscription.unsubscribe();
            }
            if (this.columnsSubscription) {
                this.columnsSubscription.unsubscribe();
            }
            this.initialized = false;
        };
        ScrollableView.ctorParameters = function () { return [
            { type: Table },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        __decorate([
            core.Input("pScrollableView")
        ], ScrollableView.prototype, "columns", void 0);
        __decorate([
            core.Input()
        ], ScrollableView.prototype, "frozen", void 0);
        __decorate([
            core.ViewChild('scrollHeader', { static: true })
        ], ScrollableView.prototype, "scrollHeaderViewChild", void 0);
        __decorate([
            core.ViewChild('scrollHeaderBox', { static: true })
        ], ScrollableView.prototype, "scrollHeaderBoxViewChild", void 0);
        __decorate([
            core.ViewChild('scrollBody', { static: true })
        ], ScrollableView.prototype, "scrollBodyViewChild", void 0);
        __decorate([
            core.ViewChild('scrollTable', { static: true })
        ], ScrollableView.prototype, "scrollTableViewChild", void 0);
        __decorate([
            core.ViewChild('loadingTable', { static: false })
        ], ScrollableView.prototype, "scrollLoadingTableViewChild", void 0);
        __decorate([
            core.ViewChild('scrollFooter', { static: true })
        ], ScrollableView.prototype, "scrollFooterViewChild", void 0);
        __decorate([
            core.ViewChild('scrollFooterBox', { static: true })
        ], ScrollableView.prototype, "scrollFooterBoxViewChild", void 0);
        __decorate([
            core.ViewChild('virtualScroller', { static: false })
        ], ScrollableView.prototype, "virtualScrollerViewChild", void 0);
        __decorate([
            core.ViewChild('scrollableAligner', { static: false })
        ], ScrollableView.prototype, "scrollableAlignerViewChild", void 0);
        __decorate([
            core.Input()
        ], ScrollableView.prototype, "scrollHeight", null);
        ScrollableView = __decorate([
            core.Component({
                selector: '[pScrollableView]',
                template: "\n        <div #scrollHeader class=\"ui-table-scrollable-header ui-widget-header\">\n            <div #scrollHeaderBox class=\"ui-table-scrollable-header-box\">\n                <table class=\"ui-table-scrollable-header-table\" [ngClass]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <thead class=\"ui-table-thead\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenHeaderTemplate||dt.headerTemplate : dt.headerTemplate; context {$implicit: columns}\"></ng-container>\n                    </thead>\n                    <tbody class=\"ui-table-tbody\">\n                        <ng-template ngFor let-rowData let-rowIndex=\"index\" [ngForOf]=\"dt.frozenValue\" [ngForTrackBy]=\"dt.rowTrackBy\">\n                            <ng-container *ngTemplateOutlet=\"dt.frozenRowsTemplate; context: {$implicit: rowData, rowIndex: rowIndex, columns: columns}\"></ng-container>\n                        </ng-template>\n                    </tbody>\n                </table>\n            </div>\n        </div>\n        <div #scrollBody class=\"ui-table-scrollable-body\">\n            <table #scrollTable [ngClass]=\"{'ui-table-scrollable-body-table': true, 'ui-table-virtual-table': dt.virtualScroll}\" [class]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                <tbody class=\"ui-table-tbody\" [pTableBody]=\"columns\" [pTableBodyTemplate]=\"frozen ? dt.frozenBodyTemplate||dt.bodyTemplate : dt.bodyTemplate\" [frozen]=\"frozen\"></tbody>\n            </table>\n            <table #loadingTable *ngIf=\"dt.virtualScroll && dt.loadingBodyTemplate != null\" [ngClass]=\"{'ui-table-scrollable-body-table ui-table-loading-virtual-table': true, 'ui-table-virtual-table': dt.virtualScroll}\">\n                <tbody class=\"ui-table-tbody\">\n                    <ng-template ngFor [ngForOf]=\"loadingArray\">\n                        <ng-container *ngTemplateOutlet=\"dt.loadingBodyTemplate; context: {columns: columns}\"></ng-container>\n                    </ng-template>\n                </tbody>\n            </table>\n            <div #scrollableAligner style=\"background-color:transparent\" *ngIf=\"frozen\"></div>\n            <div #virtualScroller class=\"ui-table-virtual-scroller\" *ngIf=\"dt.virtualScroll\"></div>\n        </div>\n        <div #scrollFooter class=\"ui-table-scrollable-footer ui-widget-header\">\n            <div #scrollFooterBox class=\"ui-table-scrollable-footer-box\">\n                <table class=\"ui-table-scrollable-footer-table\" [ngClass]=\"dt.tableStyleClass\" [ngStyle]=\"dt.tableStyle\">\n                    <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenColGroupTemplate||dt.colGroupTemplate : dt.colGroupTemplate; context {$implicit: columns}\"></ng-container>\n                    <tfoot class=\"ui-table-tfoot\">\n                        <ng-container *ngTemplateOutlet=\"frozen ? dt.frozenFooterTemplate||dt.footerTemplate : dt.footerTemplate; context {$implicit: columns}\"></ng-container>\n                    </tfoot>\n                </table>\n            </div>\n        </div>\n    "
            })
        ], ScrollableView);
        return ScrollableView;
    }());
    var SortableColumn = /** @class */ (function () {
        function SortableColumn(dt) {
            var _this = this;
            this.dt = dt;
            if (this.isEnabled()) {
                this.subscription = this.dt.tableService.sortSource$.subscribe(function (sortMeta) {
                    _this.updateSortState();
                });
            }
        }
        SortableColumn.prototype.ngOnInit = function () {
            if (this.isEnabled()) {
                this.updateSortState();
            }
        };
        SortableColumn.prototype.updateSortState = function () {
            this.sorted = this.dt.isSorted(this.field);
        };
        SortableColumn.prototype.onClick = function (event) {
            var targetNode = event.target;
            if ((dom.DomHandler.hasClass(targetNode, 'ui-sortable-column') || dom.DomHandler.hasClass(targetNode, 'ui-sortable-column-icon')) && this.isEnabled()) {
                this.updateSortState();
                this.dt.sort({
                    originalEvent: event,
                    field: this.field
                });
                dom.DomHandler.clearSelection();
            }
        };
        SortableColumn.prototype.onEnterKey = function (event) {
            this.onClick(event);
        };
        SortableColumn.prototype.isEnabled = function () {
            return this.pSortableColumnDisabled !== true;
        };
        SortableColumn.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        SortableColumn.ctorParameters = function () { return [
            { type: Table }
        ]; };
        __decorate([
            core.Input("pSortableColumn")
        ], SortableColumn.prototype, "field", void 0);
        __decorate([
            core.Input()
        ], SortableColumn.prototype, "pSortableColumnDisabled", void 0);
        __decorate([
            core.HostListener('click', ['$event'])
        ], SortableColumn.prototype, "onClick", null);
        __decorate([
            core.HostListener('keydown.enter', ['$event'])
        ], SortableColumn.prototype, "onEnterKey", null);
        SortableColumn = __decorate([
            core.Directive({
                selector: '[pSortableColumn]',
                host: {
                    '[class.ui-sortable-column]': 'isEnabled()',
                    '[class.ui-state-highlight]': 'sorted',
                    '[attr.tabindex]': 'isEnabled() ? "0" : null'
                }
            })
        ], SortableColumn);
        return SortableColumn;
    }());
    var SortIcon = /** @class */ (function () {
        function SortIcon(dt) {
            var _this = this;
            this.dt = dt;
            this.subscription = this.dt.tableService.sortSource$.subscribe(function (sortMeta) {
                _this.updateSortState();
            });
        }
        SortIcon.prototype.ngOnInit = function () {
            this.updateSortState();
        };
        SortIcon.prototype.onClick = function (event) {
            event.preventDefault();
        };
        SortIcon.prototype.updateSortState = function () {
            if (this.dt.sortMode === 'single') {
                this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
            }
            else if (this.dt.sortMode === 'multiple') {
                var sortMeta = this.dt.getSortMeta(this.field);
                this.sortOrder = sortMeta ? sortMeta.order : 0;
            }
        };
        SortIcon.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        SortIcon.ctorParameters = function () { return [
            { type: Table }
        ]; };
        __decorate([
            core.Input()
        ], SortIcon.prototype, "field", void 0);
        SortIcon = __decorate([
            core.Component({
                selector: 'p-sortIcon',
                template: "\n        <i class=\"ui-sortable-column-icon pi pi-fw\" [ngClass]=\"{'pi-sort-up': sortOrder === 1, 'pi-sort-down': sortOrder === -1, 'pi-sort': sortOrder === 0}\"></i>\n    "
            })
        ], SortIcon);
        return SortIcon;
    }());
    var SelectableRow = /** @class */ (function () {
        function SelectableRow(dt, tableService) {
            var _this = this;
            this.dt = dt;
            this.tableService = tableService;
            if (this.isEnabled()) {
                this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                    _this.selected = _this.dt.isSelected(_this.data);
                });
            }
        }
        SelectableRow.prototype.ngOnInit = function () {
            if (this.isEnabled()) {
                this.selected = this.dt.isSelected(this.data);
            }
        };
        SelectableRow.prototype.onClick = function (event) {
            if (this.isEnabled()) {
                this.dt.handleRowClick({
                    originalEvent: event,
                    rowData: this.data,
                    rowIndex: this.index
                });
            }
        };
        SelectableRow.prototype.onTouchEnd = function (event) {
            if (this.isEnabled()) {
                this.dt.handleRowTouchEnd(event);
            }
        };
        SelectableRow.prototype.onKeyDown = function (event) {
            if (this.isEnabled()) {
                var row = event.target;
                switch (event.which) {
                    //down arrow
                    case 40:
                        var nextRow = this.findNextSelectableRow(row);
                        if (nextRow) {
                            nextRow.focus();
                        }
                        event.preventDefault();
                        break;
                    //up arrow
                    case 38:
                        var prevRow = this.findPrevSelectableRow(row);
                        if (prevRow) {
                            prevRow.focus();
                        }
                        event.preventDefault();
                        break;
                    //enter
                    case 13:
                        this.dt.handleRowClick({
                            originalEvent: event,
                            rowData: this.data,
                            rowIndex: this.index
                        });
                        break;
                    default:
                        //no op
                        break;
                }
            }
        };
        SelectableRow.prototype.findNextSelectableRow = function (row) {
            var nextRow = row.nextElementSibling;
            if (nextRow) {
                if (dom.DomHandler.hasClass(nextRow, 'ui-selectable-row'))
                    return nextRow;
                else
                    return this.findNextSelectableRow(nextRow);
            }
            else {
                return null;
            }
        };
        SelectableRow.prototype.findPrevSelectableRow = function (row) {
            var prevRow = row.previousElementSibling;
            if (prevRow) {
                if (dom.DomHandler.hasClass(prevRow, 'ui-selectable-row'))
                    return prevRow;
                else
                    return this.findPrevSelectableRow(prevRow);
            }
            else {
                return null;
            }
        };
        SelectableRow.prototype.isEnabled = function () {
            return this.pSelectableRowDisabled !== true;
        };
        SelectableRow.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        SelectableRow.ctorParameters = function () { return [
            { type: Table },
            { type: TableService }
        ]; };
        __decorate([
            core.Input("pSelectableRow")
        ], SelectableRow.prototype, "data", void 0);
        __decorate([
            core.Input("pSelectableRowIndex")
        ], SelectableRow.prototype, "index", void 0);
        __decorate([
            core.Input()
        ], SelectableRow.prototype, "pSelectableRowDisabled", void 0);
        __decorate([
            core.HostListener('click', ['$event'])
        ], SelectableRow.prototype, "onClick", null);
        __decorate([
            core.HostListener('touchend', ['$event'])
        ], SelectableRow.prototype, "onTouchEnd", null);
        __decorate([
            core.HostListener('keydown', ['$event'])
        ], SelectableRow.prototype, "onKeyDown", null);
        SelectableRow = __decorate([
            core.Directive({
                selector: '[pSelectableRow]',
                host: {
                    '[class.ui-selectable-row]': 'isEnabled()',
                    '[class.ui-state-highlight]': 'selected',
                    '[attr.tabindex]': 'isEnabled() ? 0 : undefined',
                }
            })
        ], SelectableRow);
        return SelectableRow;
    }());
    var SelectableRowDblClick = /** @class */ (function () {
        function SelectableRowDblClick(dt, tableService) {
            var _this = this;
            this.dt = dt;
            this.tableService = tableService;
            if (this.isEnabled()) {
                this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                    _this.selected = _this.dt.isSelected(_this.data);
                });
            }
        }
        SelectableRowDblClick.prototype.ngOnInit = function () {
            if (this.isEnabled()) {
                this.selected = this.dt.isSelected(this.data);
            }
        };
        SelectableRowDblClick.prototype.onClick = function (event) {
            if (this.isEnabled()) {
                this.dt.handleRowClick({
                    originalEvent: event,
                    rowData: this.data,
                    rowIndex: this.index
                });
            }
        };
        SelectableRowDblClick.prototype.isEnabled = function () {
            return this.pSelectableRowDisabled !== true;
        };
        SelectableRowDblClick.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        SelectableRowDblClick.ctorParameters = function () { return [
            { type: Table },
            { type: TableService }
        ]; };
        __decorate([
            core.Input("pSelectableRowDblClick")
        ], SelectableRowDblClick.prototype, "data", void 0);
        __decorate([
            core.Input("pSelectableRowIndex")
        ], SelectableRowDblClick.prototype, "index", void 0);
        __decorate([
            core.Input()
        ], SelectableRowDblClick.prototype, "pSelectableRowDisabled", void 0);
        __decorate([
            core.HostListener('dblclick', ['$event'])
        ], SelectableRowDblClick.prototype, "onClick", null);
        SelectableRowDblClick = __decorate([
            core.Directive({
                selector: '[pSelectableRowDblClick]',
                host: {
                    '[class.ui-selectable-row]': 'isEnabled()',
                    '[class.ui-state-highlight]': 'selected'
                }
            })
        ], SelectableRowDblClick);
        return SelectableRowDblClick;
    }());
    var ContextMenuRow = /** @class */ (function () {
        function ContextMenuRow(dt, tableService) {
            var _this = this;
            this.dt = dt;
            this.tableService = tableService;
            if (this.isEnabled()) {
                this.subscription = this.dt.tableService.contextMenuSource$.subscribe(function (data) {
                    _this.selected = _this.dt.equals(_this.data, data);
                });
            }
        }
        ContextMenuRow.prototype.onContextMenu = function (event) {
            if (this.isEnabled()) {
                this.dt.handleRowRightClick({
                    originalEvent: event,
                    rowData: this.data,
                    rowIndex: this.index
                });
                event.preventDefault();
            }
        };
        ContextMenuRow.prototype.isEnabled = function () {
            return this.pContextMenuRowDisabled !== true;
        };
        ContextMenuRow.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        ContextMenuRow.ctorParameters = function () { return [
            { type: Table },
            { type: TableService }
        ]; };
        __decorate([
            core.Input("pContextMenuRow")
        ], ContextMenuRow.prototype, "data", void 0);
        __decorate([
            core.Input("pContextMenuRowIndex")
        ], ContextMenuRow.prototype, "index", void 0);
        __decorate([
            core.Input()
        ], ContextMenuRow.prototype, "pContextMenuRowDisabled", void 0);
        __decorate([
            core.HostListener('contextmenu', ['$event'])
        ], ContextMenuRow.prototype, "onContextMenu", null);
        ContextMenuRow = __decorate([
            core.Directive({
                selector: '[pContextMenuRow]',
                host: {
                    '[class.ui-contextmenu-selected]': 'selected'
                }
            })
        ], ContextMenuRow);
        return ContextMenuRow;
    }());
    var RowToggler = /** @class */ (function () {
        function RowToggler(dt) {
            this.dt = dt;
        }
        RowToggler.prototype.onClick = function (event) {
            if (this.isEnabled()) {
                this.dt.toggleRow(this.data, event);
                event.preventDefault();
            }
        };
        RowToggler.prototype.isEnabled = function () {
            return this.pRowTogglerDisabled !== true;
        };
        RowToggler.ctorParameters = function () { return [
            { type: Table }
        ]; };
        __decorate([
            core.Input('pRowToggler')
        ], RowToggler.prototype, "data", void 0);
        __decorate([
            core.Input()
        ], RowToggler.prototype, "pRowTogglerDisabled", void 0);
        __decorate([
            core.HostListener('click', ['$event'])
        ], RowToggler.prototype, "onClick", null);
        RowToggler = __decorate([
            core.Directive({
                selector: '[pRowToggler]'
            })
        ], RowToggler);
        return RowToggler;
    }());
    var ResizableColumn = /** @class */ (function () {
        function ResizableColumn(dt, el, zone) {
            this.dt = dt;
            this.el = el;
            this.zone = zone;
        }
        ResizableColumn.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.isEnabled()) {
                dom.DomHandler.addClass(this.el.nativeElement, 'ui-resizable-column');
                this.resizer = document.createElement('span');
                this.resizer.className = 'ui-column-resizer ui-clickable';
                this.el.nativeElement.appendChild(this.resizer);
                this.zone.runOutsideAngular(function () {
                    _this.resizerMouseDownListener = _this.onMouseDown.bind(_this);
                    _this.resizer.addEventListener('mousedown', _this.resizerMouseDownListener);
                });
            }
        };
        ResizableColumn.prototype.bindDocumentEvents = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.documentMouseMoveListener = _this.onDocumentMouseMove.bind(_this);
                document.addEventListener('mousemove', _this.documentMouseMoveListener);
                _this.documentMouseUpListener = _this.onDocumentMouseUp.bind(_this);
                document.addEventListener('mouseup', _this.documentMouseUpListener);
            });
        };
        ResizableColumn.prototype.unbindDocumentEvents = function () {
            if (this.documentMouseMoveListener) {
                document.removeEventListener('mousemove', this.documentMouseMoveListener);
                this.documentMouseMoveListener = null;
            }
            if (this.documentMouseUpListener) {
                document.removeEventListener('mouseup', this.documentMouseUpListener);
                this.documentMouseUpListener = null;
            }
        };
        ResizableColumn.prototype.onMouseDown = function (event) {
            if (event.which === 1) {
                this.dt.onColumnResizeBegin(event);
                this.bindDocumentEvents();
            }
        };
        ResizableColumn.prototype.onDocumentMouseMove = function (event) {
            this.dt.onColumnResize(event);
        };
        ResizableColumn.prototype.onDocumentMouseUp = function (event) {
            this.dt.onColumnResizeEnd(event, this.el.nativeElement);
            this.unbindDocumentEvents();
        };
        ResizableColumn.prototype.isEnabled = function () {
            return this.pResizableColumnDisabled !== true;
        };
        ResizableColumn.prototype.ngOnDestroy = function () {
            if (this.resizerMouseDownListener) {
                this.resizer.removeEventListener('mousedown', this.resizerMouseDownListener);
            }
            this.unbindDocumentEvents();
        };
        ResizableColumn.ctorParameters = function () { return [
            { type: Table },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        __decorate([
            core.Input()
        ], ResizableColumn.prototype, "pResizableColumnDisabled", void 0);
        ResizableColumn = __decorate([
            core.Directive({
                selector: '[pResizableColumn]'
            })
        ], ResizableColumn);
        return ResizableColumn;
    }());
    var ReorderableColumn = /** @class */ (function () {
        function ReorderableColumn(dt, el, zone) {
            this.dt = dt;
            this.el = el;
            this.zone = zone;
        }
        ReorderableColumn.prototype.ngAfterViewInit = function () {
            if (this.isEnabled()) {
                this.bindEvents();
            }
        };
        ReorderableColumn.prototype.bindEvents = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.mouseDownListener = _this.onMouseDown.bind(_this);
                _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
                _this.dragStartListener = _this.onDragStart.bind(_this);
                _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
                _this.dragOverListener = _this.onDragEnter.bind(_this);
                _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
                _this.dragEnterListener = _this.onDragEnter.bind(_this);
                _this.el.nativeElement.addEventListener('dragenter', _this.dragEnterListener);
                _this.dragLeaveListener = _this.onDragLeave.bind(_this);
                _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
            });
        };
        ReorderableColumn.prototype.unbindEvents = function () {
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
        };
        ReorderableColumn.prototype.onMouseDown = function (event) {
            if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || dom.DomHandler.hasClass(event.target, 'ui-column-resizer'))
                this.el.nativeElement.draggable = false;
            else
                this.el.nativeElement.draggable = true;
        };
        ReorderableColumn.prototype.onDragStart = function (event) {
            this.dt.onColumnDragStart(event, this.el.nativeElement);
        };
        ReorderableColumn.prototype.onDragOver = function (event) {
            event.preventDefault();
        };
        ReorderableColumn.prototype.onDragEnter = function (event) {
            this.dt.onColumnDragEnter(event, this.el.nativeElement);
        };
        ReorderableColumn.prototype.onDragLeave = function (event) {
            this.dt.onColumnDragLeave(event);
        };
        ReorderableColumn.prototype.onDrop = function (event) {
            if (this.isEnabled()) {
                this.dt.onColumnDrop(event, this.el.nativeElement);
            }
        };
        ReorderableColumn.prototype.isEnabled = function () {
            return this.pReorderableColumnDisabled !== true;
        };
        ReorderableColumn.prototype.ngOnDestroy = function () {
            this.unbindEvents();
        };
        ReorderableColumn.ctorParameters = function () { return [
            { type: Table },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        __decorate([
            core.Input()
        ], ReorderableColumn.prototype, "pReorderableColumnDisabled", void 0);
        __decorate([
            core.HostListener('drop', ['$event'])
        ], ReorderableColumn.prototype, "onDrop", null);
        ReorderableColumn = __decorate([
            core.Directive({
                selector: '[pReorderableColumn]'
            })
        ], ReorderableColumn);
        return ReorderableColumn;
    }());
    var EditableColumn = /** @class */ (function () {
        function EditableColumn(dt, el, zone) {
            this.dt = dt;
            this.el = el;
            this.zone = zone;
        }
        EditableColumn.prototype.ngAfterViewInit = function () {
            if (this.isEnabled()) {
                dom.DomHandler.addClass(this.el.nativeElement, 'ui-editable-column');
            }
        };
        EditableColumn.prototype.onClick = function (event) {
            if (this.isEnabled()) {
                this.dt.editingCellClick = true;
                if (this.dt.editingCell) {
                    if (this.dt.editingCell !== this.el.nativeElement) {
                        if (!this.dt.isEditingCellValid()) {
                            return;
                        }
                        dom.DomHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
                        this.openCell();
                    }
                }
                else {
                    this.openCell();
                }
            }
        };
        EditableColumn.prototype.openCell = function () {
            var _this = this;
            this.dt.updateEditingCell(this.el.nativeElement, this.data, this.field);
            dom.DomHandler.addClass(this.el.nativeElement, 'ui-editing-cell');
            this.dt.onEditInit.emit({ field: this.field, data: this.data });
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    var focusCellSelector = _this.pFocusCellSelector || 'input, textarea, select';
                    var focusableElement = dom.DomHandler.findSingle(_this.el.nativeElement, focusCellSelector);
                    if (focusableElement) {
                        focusableElement.focus();
                    }
                }, 50);
            });
        };
        EditableColumn.prototype.closeEditingCell = function () {
            dom.DomHandler.removeClass(this.dt.editingCell, 'ui-editing-cell');
            this.dt.editingCell = null;
            this.dt.editingCellData = null;
            this.dt.editingCellField = null;
            this.dt.unbindDocumentEditListener();
        };
        EditableColumn.prototype.onKeyDown = function (event) {
            if (this.isEnabled()) {
                //enter
                if (event.keyCode == 13) {
                    if (this.dt.isEditingCellValid()) {
                        this.closeEditingCell();
                        this.dt.onEditComplete.emit({ field: this.field, data: this.data, originalEvent: event });
                    }
                    event.preventDefault();
                }
                //escape
                else if (event.keyCode == 27) {
                    if (this.dt.isEditingCellValid()) {
                        this.closeEditingCell();
                        this.dt.onEditCancel.emit({ field: this.field, data: this.data, originalEvent: event });
                    }
                    event.preventDefault();
                }
                //tab
                else if (event.keyCode == 9) {
                    this.dt.onEditComplete.emit({ field: this.field, data: this.data, originalEvent: event });
                    if (event.shiftKey)
                        this.moveToPreviousCell(event);
                    else
                        this.moveToNextCell(event);
                }
            }
        };
        EditableColumn.prototype.findCell = function (element) {
            if (element) {
                var cell = element;
                while (cell && !dom.DomHandler.hasClass(cell, 'ui-editing-cell')) {
                    cell = cell.parentElement;
                }
                return cell;
            }
            else {
                return null;
            }
        };
        EditableColumn.prototype.moveToPreviousCell = function (event) {
            var currentCell = this.findCell(event.target);
            var row = currentCell.parentElement;
            var targetCell = this.findPreviousEditableColumn(currentCell);
            if (targetCell) {
                dom.DomHandler.invokeElementMethod(event.target, 'blur');
                dom.DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        };
        EditableColumn.prototype.moveToNextCell = function (event) {
            var currentCell = this.findCell(event.target);
            var row = currentCell.parentElement;
            var targetCell = this.findNextEditableColumn(currentCell);
            if (targetCell) {
                dom.DomHandler.invokeElementMethod(event.target, 'blur');
                dom.DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        };
        EditableColumn.prototype.findPreviousEditableColumn = function (cell) {
            var prevCell = cell.previousElementSibling;
            if (!prevCell) {
                var previousRow = cell.parentElement.previousElementSibling;
                if (previousRow) {
                    prevCell = previousRow.lastElementChild;
                }
            }
            if (prevCell) {
                if (dom.DomHandler.hasClass(prevCell, 'ui-editable-column'))
                    return prevCell;
                else
                    return this.findPreviousEditableColumn(prevCell);
            }
            else {
                return null;
            }
        };
        EditableColumn.prototype.findNextEditableColumn = function (cell) {
            var nextCell = cell.nextElementSibling;
            if (!nextCell) {
                var nextRow = cell.parentElement.nextElementSibling;
                if (nextRow) {
                    nextCell = nextRow.firstElementChild;
                }
            }
            if (nextCell) {
                if (dom.DomHandler.hasClass(nextCell, 'ui-editable-column'))
                    return nextCell;
                else
                    return this.findNextEditableColumn(nextCell);
            }
            else {
                return null;
            }
        };
        EditableColumn.prototype.isEnabled = function () {
            return this.pEditableColumnDisabled !== true;
        };
        EditableColumn.ctorParameters = function () { return [
            { type: Table },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        __decorate([
            core.Input("pEditableColumn")
        ], EditableColumn.prototype, "data", void 0);
        __decorate([
            core.Input("pEditableColumnField")
        ], EditableColumn.prototype, "field", void 0);
        __decorate([
            core.Input()
        ], EditableColumn.prototype, "pEditableColumnDisabled", void 0);
        __decorate([
            core.Input()
        ], EditableColumn.prototype, "pFocusCellSelector", void 0);
        __decorate([
            core.HostListener('click', ['$event'])
        ], EditableColumn.prototype, "onClick", null);
        __decorate([
            core.HostListener('keydown', ['$event'])
        ], EditableColumn.prototype, "onKeyDown", null);
        EditableColumn = __decorate([
            core.Directive({
                selector: '[pEditableColumn]'
            })
        ], EditableColumn);
        return EditableColumn;
    }());
    var EditableRow = /** @class */ (function () {
        function EditableRow(el) {
            this.el = el;
        }
        EditableRow.prototype.isEnabled = function () {
            return this.pEditableRowDisabled !== true;
        };
        EditableRow.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input("pEditableRow")
        ], EditableRow.prototype, "data", void 0);
        __decorate([
            core.Input()
        ], EditableRow.prototype, "pEditableRowDisabled", void 0);
        EditableRow = __decorate([
            core.Directive({
                selector: '[pEditableRow]'
            })
        ], EditableRow);
        return EditableRow;
    }());
    var InitEditableRow = /** @class */ (function () {
        function InitEditableRow(dt, editableRow) {
            this.dt = dt;
            this.editableRow = editableRow;
        }
        InitEditableRow.prototype.onClick = function (event) {
            this.dt.initRowEdit(this.editableRow.data);
            event.preventDefault();
        };
        InitEditableRow.ctorParameters = function () { return [
            { type: Table },
            { type: EditableRow }
        ]; };
        __decorate([
            core.HostListener('click', ['$event'])
        ], InitEditableRow.prototype, "onClick", null);
        InitEditableRow = __decorate([
            core.Directive({
                selector: '[pInitEditableRow]'
            })
        ], InitEditableRow);
        return InitEditableRow;
    }());
    var SaveEditableRow = /** @class */ (function () {
        function SaveEditableRow(dt, editableRow) {
            this.dt = dt;
            this.editableRow = editableRow;
        }
        SaveEditableRow.prototype.onClick = function (event) {
            this.dt.saveRowEdit(this.editableRow.data, this.editableRow.el.nativeElement);
            event.preventDefault();
        };
        SaveEditableRow.ctorParameters = function () { return [
            { type: Table },
            { type: EditableRow }
        ]; };
        __decorate([
            core.HostListener('click', ['$event'])
        ], SaveEditableRow.prototype, "onClick", null);
        SaveEditableRow = __decorate([
            core.Directive({
                selector: '[pSaveEditableRow]'
            })
        ], SaveEditableRow);
        return SaveEditableRow;
    }());
    var CancelEditableRow = /** @class */ (function () {
        function CancelEditableRow(dt, editableRow) {
            this.dt = dt;
            this.editableRow = editableRow;
        }
        CancelEditableRow.prototype.onClick = function (event) {
            this.dt.cancelRowEdit(this.editableRow.data);
            event.preventDefault();
        };
        CancelEditableRow.ctorParameters = function () { return [
            { type: Table },
            { type: EditableRow }
        ]; };
        __decorate([
            core.HostListener('click', ['$event'])
        ], CancelEditableRow.prototype, "onClick", null);
        CancelEditableRow = __decorate([
            core.Directive({
                selector: '[pCancelEditableRow]'
            })
        ], CancelEditableRow);
        return CancelEditableRow;
    }());
    var CellEditor = /** @class */ (function () {
        function CellEditor(dt, editableColumn, editableRow) {
            this.dt = dt;
            this.editableColumn = editableColumn;
            this.editableRow = editableRow;
        }
        CellEditor.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'input':
                        _this.inputTemplate = item.template;
                        break;
                    case 'output':
                        _this.outputTemplate = item.template;
                        break;
                }
            });
        };
        Object.defineProperty(CellEditor.prototype, "editing", {
            get: function () {
                return (this.dt.editingCell && this.editableColumn && this.dt.editingCell === this.editableColumn.el.nativeElement) ||
                    (this.editableRow && this.dt.editMode === 'row' && this.dt.isRowEditing(this.editableRow.data));
            },
            enumerable: true,
            configurable: true
        });
        CellEditor.ctorParameters = function () { return [
            { type: Table },
            { type: EditableColumn, decorators: [{ type: core.Optional }] },
            { type: EditableRow, decorators: [{ type: core.Optional }] }
        ]; };
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], CellEditor.prototype, "templates", void 0);
        CellEditor = __decorate([
            core.Component({
                selector: 'p-cellEditor',
                template: "\n        <ng-container *ngIf=\"editing\">\n            <ng-container *ngTemplateOutlet=\"inputTemplate\"></ng-container>\n        </ng-container>\n        <ng-container *ngIf=\"!editing\">\n            <ng-container *ngTemplateOutlet=\"outputTemplate\"></ng-container>\n        </ng-container>\n    "
            }),
            __param(1, core.Optional()), __param(2, core.Optional())
        ], CellEditor);
        return CellEditor;
    }());
    var TableRadioButton = /** @class */ (function () {
        function TableRadioButton(dt, tableService) {
            var _this = this;
            this.dt = dt;
            this.tableService = tableService;
            this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.checked = _this.dt.isSelected(_this.value);
            });
        }
        TableRadioButton.prototype.ngOnInit = function () {
            this.checked = this.dt.isSelected(this.value);
        };
        TableRadioButton.prototype.onClick = function (event) {
            if (!this.disabled) {
                this.dt.toggleRowWithRadio({
                    originalEvent: event,
                    rowIndex: this.index
                }, this.value);
            }
            dom.DomHandler.clearSelection();
        };
        TableRadioButton.prototype.onFocus = function () {
            dom.DomHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
        };
        TableRadioButton.prototype.onBlur = function () {
            dom.DomHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
        };
        TableRadioButton.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        TableRadioButton.ctorParameters = function () { return [
            { type: Table },
            { type: TableService }
        ]; };
        __decorate([
            core.Input()
        ], TableRadioButton.prototype, "disabled", void 0);
        __decorate([
            core.Input()
        ], TableRadioButton.prototype, "value", void 0);
        __decorate([
            core.Input()
        ], TableRadioButton.prototype, "index", void 0);
        __decorate([
            core.ViewChild('box', { static: true })
        ], TableRadioButton.prototype, "boxViewChild", void 0);
        TableRadioButton = __decorate([
            core.Component({
                selector: 'p-tableRadioButton',
                template: "\n        <div class=\"ui-radiobutton ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"radio\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"disabled\">\n            </div>\n            <div #box [ngClass]=\"{'ui-radiobutton-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled':disabled}\" role=\"radio\" [attr.aria-checked]=\"checked\">\n                <span class=\"ui-radiobutton-icon ui-clickable\" [ngClass]=\"{'pi pi-circle-on':checked}\"></span>\n            </div>\n        </div>\n    "
            })
        ], TableRadioButton);
        return TableRadioButton;
    }());
    var TableCheckbox = /** @class */ (function () {
        function TableCheckbox(dt, tableService) {
            var _this = this;
            this.dt = dt;
            this.tableService = tableService;
            this.subscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.checked = _this.dt.isSelected(_this.value);
            });
        }
        TableCheckbox.prototype.ngOnInit = function () {
            this.checked = this.dt.isSelected(this.value);
        };
        TableCheckbox.prototype.onClick = function (event) {
            if (!this.disabled) {
                this.dt.toggleRowWithCheckbox({
                    originalEvent: event,
                    rowIndex: this.index
                }, this.value);
            }
            dom.DomHandler.clearSelection();
        };
        TableCheckbox.prototype.onFocus = function () {
            dom.DomHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
        };
        TableCheckbox.prototype.onBlur = function () {
            dom.DomHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
        };
        TableCheckbox.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        TableCheckbox.ctorParameters = function () { return [
            { type: Table },
            { type: TableService }
        ]; };
        __decorate([
            core.Input()
        ], TableCheckbox.prototype, "disabled", void 0);
        __decorate([
            core.Input()
        ], TableCheckbox.prototype, "value", void 0);
        __decorate([
            core.Input()
        ], TableCheckbox.prototype, "index", void 0);
        __decorate([
            core.ViewChild('box', { static: true })
        ], TableCheckbox.prototype, "boxViewChild", void 0);
        TableCheckbox = __decorate([
            core.Component({
                selector: 'p-tableCheckbox',
                template: "\n        <div class=\"ui-chkbox ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input type=\"checkbox\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"disabled\">\n            </div>\n            <div #box [ngClass]=\"{'ui-chkbox-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled':disabled}\" role=\"checkbox\" [attr.aria-checked]=\"checked\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    "
            })
        ], TableCheckbox);
        return TableCheckbox;
    }());
    var TableHeaderCheckbox = /** @class */ (function () {
        function TableHeaderCheckbox(dt, tableService) {
            var _this = this;
            this.dt = dt;
            this.tableService = tableService;
            this.valueChangeSubscription = this.dt.tableService.valueSource$.subscribe(function () {
                _this.checked = _this.updateCheckedState();
            });
            this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe(function () {
                _this.checked = _this.updateCheckedState();
            });
        }
        TableHeaderCheckbox.prototype.ngOnInit = function () {
            this.checked = this.updateCheckedState();
        };
        TableHeaderCheckbox.prototype.onClick = function (event) {
            if (!this.disabled) {
                if (this.dt.value && this.dt.value.length > 0) {
                    this.dt.toggleRowsWithCheckbox(event, !this.checked);
                }
            }
            dom.DomHandler.clearSelection();
        };
        TableHeaderCheckbox.prototype.onFocus = function () {
            dom.DomHandler.addClass(this.boxViewChild.nativeElement, 'ui-state-focus');
        };
        TableHeaderCheckbox.prototype.onBlur = function () {
            dom.DomHandler.removeClass(this.boxViewChild.nativeElement, 'ui-state-focus');
        };
        TableHeaderCheckbox.prototype.isDisabled = function () {
            return this.disabled || !this.dt.value || !this.dt.value.length;
        };
        TableHeaderCheckbox.prototype.ngOnDestroy = function () {
            if (this.selectionChangeSubscription) {
                this.selectionChangeSubscription.unsubscribe();
            }
            if (this.valueChangeSubscription) {
                this.valueChangeSubscription.unsubscribe();
            }
        };
        TableHeaderCheckbox.prototype.updateCheckedState = function () {
            if (this.dt.filteredValue) {
                var val = this.dt.filteredValue;
                return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.isAllFilteredValuesChecked());
            }
            else {
                var val = this.dt.value;
                return (val && val.length > 0 && this.dt.selection && this.dt.selection.length > 0 && this.dt.selection.length === val.length);
            }
        };
        TableHeaderCheckbox.prototype.isAllFilteredValuesChecked = function () {
            var e_3, _a;
            if (!this.dt.filteredValue) {
                return false;
            }
            else {
                try {
                    for (var _b = __values(this.dt.filteredValue), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var rowData = _c.value;
                        if (!this.dt.isSelected(rowData)) {
                            return false;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return true;
            }
        };
        TableHeaderCheckbox.ctorParameters = function () { return [
            { type: Table },
            { type: TableService }
        ]; };
        __decorate([
            core.ViewChild('box', { static: true })
        ], TableHeaderCheckbox.prototype, "boxViewChild", void 0);
        __decorate([
            core.Input()
        ], TableHeaderCheckbox.prototype, "disabled", void 0);
        TableHeaderCheckbox = __decorate([
            core.Component({
                selector: 'p-tableHeaderCheckbox',
                template: "\n        <div class=\"ui-chkbox ui-widget\" (click)=\"onClick($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #cb type=\"checkbox\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [disabled]=\"isDisabled()\">\n            </div>\n            <div #box [ngClass]=\"{'ui-chkbox-box ui-widget ui-state-default':true,\n                'ui-state-active':checked, 'ui-state-disabled': isDisabled()}\" role=\"checkbox\" [attr.aria-checked]=\"checked\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':checked}\"></span>\n            </div>\n        </div>\n    "
            })
        ], TableHeaderCheckbox);
        return TableHeaderCheckbox;
    }());
    var ReorderableRowHandle = /** @class */ (function () {
        function ReorderableRowHandle(el) {
            this.el = el;
        }
        ReorderableRowHandle.prototype.ngAfterViewInit = function () {
            dom.DomHandler.addClass(this.el.nativeElement, 'ui-table-reorderablerow-handle');
        };
        ReorderableRowHandle.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input("pReorderableRowHandle")
        ], ReorderableRowHandle.prototype, "index", void 0);
        ReorderableRowHandle = __decorate([
            core.Directive({
                selector: '[pReorderableRowHandle]'
            })
        ], ReorderableRowHandle);
        return ReorderableRowHandle;
    }());
    var ReorderableRow = /** @class */ (function () {
        function ReorderableRow(dt, el, zone) {
            this.dt = dt;
            this.el = el;
            this.zone = zone;
        }
        ReorderableRow.prototype.ngAfterViewInit = function () {
            if (this.isEnabled()) {
                this.el.nativeElement.droppable = true;
                this.bindEvents();
            }
        };
        ReorderableRow.prototype.bindEvents = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.mouseDownListener = _this.onMouseDown.bind(_this);
                _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
                _this.dragStartListener = _this.onDragStart.bind(_this);
                _this.el.nativeElement.addEventListener('dragstart', _this.dragStartListener);
                _this.dragEndListener = _this.onDragEnd.bind(_this);
                _this.el.nativeElement.addEventListener('dragend', _this.dragEndListener);
                _this.dragOverListener = _this.onDragOver.bind(_this);
                _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
                _this.dragLeaveListener = _this.onDragLeave.bind(_this);
                _this.el.nativeElement.addEventListener('dragleave', _this.dragLeaveListener);
            });
        };
        ReorderableRow.prototype.unbindEvents = function () {
            if (this.mouseDownListener) {
                document.removeEventListener('mousedown', this.mouseDownListener);
                this.mouseDownListener = null;
            }
            if (this.dragStartListener) {
                document.removeEventListener('dragstart', this.dragStartListener);
                this.dragStartListener = null;
            }
            if (this.dragEndListener) {
                document.removeEventListener('dragend', this.dragEndListener);
                this.dragEndListener = null;
            }
            if (this.dragOverListener) {
                document.removeEventListener('dragover', this.dragOverListener);
                this.dragOverListener = null;
            }
            if (this.dragLeaveListener) {
                document.removeEventListener('dragleave', this.dragLeaveListener);
                this.dragLeaveListener = null;
            }
        };
        ReorderableRow.prototype.onMouseDown = function (event) {
            if (dom.DomHandler.hasClass(event.target, 'ui-table-reorderablerow-handle'))
                this.el.nativeElement.draggable = true;
            else
                this.el.nativeElement.draggable = false;
        };
        ReorderableRow.prototype.onDragStart = function (event) {
            this.dt.onRowDragStart(event, this.index);
        };
        ReorderableRow.prototype.onDragEnd = function (event) {
            this.dt.onRowDragEnd(event);
            this.el.nativeElement.draggable = false;
        };
        ReorderableRow.prototype.onDragOver = function (event) {
            this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
            event.preventDefault();
        };
        ReorderableRow.prototype.onDragLeave = function (event) {
            this.dt.onRowDragLeave(event, this.el.nativeElement);
        };
        ReorderableRow.prototype.isEnabled = function () {
            return this.pReorderableRowDisabled !== true;
        };
        ReorderableRow.prototype.onDrop = function (event) {
            if (this.isEnabled() && this.dt.rowDragging) {
                this.dt.onRowDrop(event, this.el.nativeElement);
            }
            event.preventDefault();
        };
        ReorderableRow.ctorParameters = function () { return [
            { type: Table },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        __decorate([
            core.Input("pReorderableRow")
        ], ReorderableRow.prototype, "index", void 0);
        __decorate([
            core.Input()
        ], ReorderableRow.prototype, "pReorderableRowDisabled", void 0);
        __decorate([
            core.HostListener('drop', ['$event'])
        ], ReorderableRow.prototype, "onDrop", null);
        ReorderableRow = __decorate([
            core.Directive({
                selector: '[pReorderableRow]'
            })
        ], ReorderableRow);
        return ReorderableRow;
    }());
    var TableModule = /** @class */ (function () {
        function TableModule() {
        }
        TableModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, paginator.PaginatorModule],
                exports: [Table, api.SharedModule, SortableColumn, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow],
                declarations: [Table, SortableColumn, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, ScrollableView, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow]
            })
        ], TableModule);
        return TableModule;
    }());

    exports.CancelEditableRow = CancelEditableRow;
    exports.CellEditor = CellEditor;
    exports.ContextMenuRow = ContextMenuRow;
    exports.EditableColumn = EditableColumn;
    exports.EditableRow = EditableRow;
    exports.InitEditableRow = InitEditableRow;
    exports.ReorderableColumn = ReorderableColumn;
    exports.ReorderableRow = ReorderableRow;
    exports.ReorderableRowHandle = ReorderableRowHandle;
    exports.ResizableColumn = ResizableColumn;
    exports.RowToggler = RowToggler;
    exports.SaveEditableRow = SaveEditableRow;
    exports.ScrollableView = ScrollableView;
    exports.SelectableRow = SelectableRow;
    exports.SelectableRowDblClick = SelectableRowDblClick;
    exports.SortIcon = SortIcon;
    exports.SortableColumn = SortableColumn;
    exports.Table = Table;
    exports.TableBody = TableBody;
    exports.TableCheckbox = TableCheckbox;
    exports.TableHeaderCheckbox = TableHeaderCheckbox;
    exports.TableModule = TableModule;
    exports.TableRadioButton = TableRadioButton;
    exports.TableService = TableService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-table.umd.js.map
