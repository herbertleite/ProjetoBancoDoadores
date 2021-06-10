(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('primeng/utils'), require('primeng/api'), require('@angular/forms'), require('@angular/cdk/scrolling'), require('primeng/tooltip')) :
    typeof define === 'function' && define.amd ? define('primeng/multiselect', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', 'primeng/utils', 'primeng/api', '@angular/forms', '@angular/cdk/scrolling', 'primeng/tooltip'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.multiselect = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.primeng.utils, global.primeng.api, global.ng.forms, global.ng.cdk.scrolling, global.primeng.tooltip));
}(this, (function (exports, core, animations, common, dom, utils, api, forms, scrolling, tooltip) { 'use strict';

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
    var MULTISELECT_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MultiSelect; }),
        multi: true
    };
    var MultiSelectItem = /** @class */ (function () {
        function MultiSelectItem() {
            this.onClick = new core.EventEmitter();
            this.onKeydown = new core.EventEmitter();
        }
        MultiSelectItem.prototype.onOptionClick = function (event) {
            this.onClick.emit({
                originalEvent: event,
                option: this.option
            });
        };
        MultiSelectItem.prototype.onOptionKeydown = function (event) {
            this.onKeydown.emit({
                originalEvent: event,
                option: this.option
            });
        };
        __decorate([
            core.Input()
        ], MultiSelectItem.prototype, "option", void 0);
        __decorate([
            core.Input()
        ], MultiSelectItem.prototype, "selected", void 0);
        __decorate([
            core.Input()
        ], MultiSelectItem.prototype, "disabled", void 0);
        __decorate([
            core.Input()
        ], MultiSelectItem.prototype, "visible", void 0);
        __decorate([
            core.Input()
        ], MultiSelectItem.prototype, "itemSize", void 0);
        __decorate([
            core.Input()
        ], MultiSelectItem.prototype, "template", void 0);
        __decorate([
            core.Input()
        ], MultiSelectItem.prototype, "maxSelectionLimitReached", void 0);
        __decorate([
            core.Output()
        ], MultiSelectItem.prototype, "onClick", void 0);
        __decorate([
            core.Output()
        ], MultiSelectItem.prototype, "onKeydown", void 0);
        MultiSelectItem = __decorate([
            core.Component({
                selector: 'p-multiSelectItem',
                template: "\n        <li class=\"ui-multiselect-item ui-corner-all\" (click)=\"onOptionClick($event)\" (keydown)=\"onOptionKeydown($event)\" [attr.aria-label]=\"option.label\"\n            [style.display]=\"visible ? 'block' : 'none'\" [attr.tabindex]=\"option.disabled ? null : '0'\" [ngStyle]=\"{'height': itemSize + 'px'}\"\n            [ngClass]=\"{'ui-state-highlight': selected, 'ui-state-disabled': (option.disabled || (maxSelectionLimitReached && !selected))}\">\n            <div class=\"ui-chkbox ui-widget\">\n                <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\"\n                    [ngClass]=\"{'ui-state-active': selected}\">\n                    <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check': selected}\"></span>\n                </div>\n            </div>\n            <span *ngIf=\"!template\">{{option.label}}</span>\n            <ng-container *ngTemplateOutlet=\"template; context: {$implicit: option}\"></ng-container>\n        </li>\n    "
            })
        ], MultiSelectItem);
        return MultiSelectItem;
    }());
    var MultiSelect = /** @class */ (function () {
        function MultiSelect(el, renderer, cd) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.scrollHeight = '200px';
            this._defaultLabel = 'Choose';
            this.filter = true;
            this.displaySelectedLabel = true;
            this.maxSelectedLabels = 3;
            this.selectedItemsLabel = '{0} items selected';
            this.showToggleAll = true;
            this.emptyFilterMessage = 'No results found';
            this.resetFilterOnHide = false;
            this.dropdownIcon = 'pi pi-chevron-down';
            this.showHeader = true;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.filterBy = 'label';
            this.showTransitionOptions = '225ms ease-out';
            this.hideTransitionOptions = '195ms ease-in';
            this.filterMatchMode = "contains";
            this.tooltip = '';
            this.tooltipPosition = 'right';
            this.tooltipPositionStyle = 'absolute';
            this.onChange = new core.EventEmitter();
            this.onFocus = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
            this.onClick = new core.EventEmitter();
            this.onPanelShow = new core.EventEmitter();
            this.onPanelHide = new core.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
            this.disabledSelectedOptions = [];
        }
        Object.defineProperty(MultiSelect.prototype, "defaultLabel", {
            get: function () {
                return this._defaultLabel;
            },
            set: function (val) {
                this._defaultLabel = val;
                this.updateLabel();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiSelect.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (val) {
                var opts = this.optionLabel ? utils.ObjectUtils.generateSelectItems(val, this.optionLabel) : val;
                this.visibleOptions = opts;
                this._options = opts;
                this.updateLabel();
                if (this.filterValue && this.filterValue.length) {
                    this.activateFilter();
                }
            },
            enumerable: true,
            configurable: true
        });
        MultiSelect.prototype.ngOnInit = function () {
            this.updateLabel();
        };
        MultiSelect.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    case 'selectedItems':
                        _this.selectedItemsTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        MultiSelect.prototype.ngAfterViewInit = function () {
            if (this.overlayVisible) {
                this.show();
            }
        };
        MultiSelect.prototype.ngAfterViewChecked = function () {
            if (this.filtered) {
                this.alignOverlay();
                this.filtered = false;
            }
        };
        MultiSelect.prototype.writeValue = function (value) {
            this.value = value;
            this.updateLabel();
            this.updateFilledState();
            this.setDisabledSelectedOptions();
            this.checkSelectionLimit();
            this.cd.markForCheck();
        };
        MultiSelect.prototype.checkSelectionLimit = function () {
            if (this.selectionLimit && (this.value && this.value.length === this.selectionLimit)) {
                this.maxSelectionLimitReached = true;
            }
        };
        MultiSelect.prototype.updateFilledState = function () {
            this.filled = (this.value && this.value.length > 0);
        };
        MultiSelect.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        MultiSelect.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        MultiSelect.prototype.setDisabledState = function (val) {
            this.disabled = val;
        };
        MultiSelect.prototype.onOptionClick = function (event) {
            var option = event.option;
            if (option.disabled) {
                return;
            }
            var optionValue = option.value;
            var selectionIndex = this.findSelectionIndex(optionValue);
            if (selectionIndex != -1) {
                this.value = this.value.filter(function (val, i) { return i != selectionIndex; });
                if (this.selectionLimit) {
                    this.maxSelectionLimitReached = false;
                }
            }
            else {
                if (!this.selectionLimit || (!this.value || this.value.length < this.selectionLimit)) {
                    this.value = __spread(this.value || [], [optionValue]);
                }
                this.checkSelectionLimit();
            }
            this.onModelChange(this.value);
            this.onChange.emit({ originalEvent: event.originalEvent, value: this.value, itemValue: optionValue });
            this.updateLabel();
            this.updateFilledState();
        };
        MultiSelect.prototype.isSelected = function (value) {
            return this.findSelectionIndex(value) != -1;
        };
        MultiSelect.prototype.findSelectionIndex = function (val) {
            var index = -1;
            if (this.value) {
                for (var i = 0; i < this.value.length; i++) {
                    if (utils.ObjectUtils.equals(this.value[i], val, this.dataKey)) {
                        index = i;
                        break;
                    }
                }
            }
            return index;
        };
        MultiSelect.prototype.toggleAll = function (event) {
            if (this.isAllChecked()) {
                if (this.disabledSelectedOptions && this.disabledSelectedOptions.length > 0) {
                    var value = [];
                    value = __spread(this.disabledSelectedOptions);
                    this.value = value;
                }
                else {
                    this.value = [];
                }
            }
            else {
                var opts = this.getVisibleOptions();
                if (opts) {
                    var value = [];
                    if (this.disabledSelectedOptions && this.disabledSelectedOptions.length > 0) {
                        value = __spread(this.disabledSelectedOptions);
                    }
                    for (var i = 0; i < opts.length; i++) {
                        var option = opts[i];
                        if (!option.disabled) {
                            value.push(opts[i].value);
                        }
                    }
                    this.value = value;
                }
            }
            this.onModelChange(this.value);
            this.onChange.emit({ originalEvent: event, value: this.value });
            this.updateFilledState();
            this.updateLabel();
        };
        MultiSelect.prototype.isAllChecked = function () {
            if (this.filterValue && this.filterValue.trim().length) {
                return this.value && this.visibleOptions && this.visibleOptions.length && this.isAllVisibleOptionsChecked();
            }
            else {
                var optionCount = this.getEnabledOptionCount();
                var disabledSelectedOptionCount = this.disabledSelectedOptions.length;
                return this.value && this.options && (this.value.length > 0 && this.value.length == optionCount + disabledSelectedOptionCount);
            }
        };
        MultiSelect.prototype.isAllVisibleOptionsChecked = function () {
            var e_1, _a;
            if (!this.visibleOptions || this.visibleOptions.length === 0) {
                return false;
            }
            else {
                try {
                    for (var _b = __values(this.visibleOptions), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var option = _c.value;
                        if (!this.isSelected(option.value)) {
                            return false;
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
                return true;
            }
        };
        MultiSelect.prototype.getEnabledOptionCount = function () {
            var e_2, _a;
            if (this.options) {
                var count = 0;
                try {
                    for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var opt = _c.value;
                        if (!opt.disabled) {
                            count++;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return count;
            }
            else {
                return 0;
            }
        };
        MultiSelect.prototype.setDisabledSelectedOptions = function () {
            var e_3, _a;
            if (this.options) {
                this.disabledSelectedOptions = [];
                if (this.value) {
                    try {
                        for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var opt = _c.value;
                            if (opt.disabled && this.isSelected(opt.value)) {
                                this.disabledSelectedOptions.push(opt.value);
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
                }
            }
        };
        MultiSelect.prototype.show = function () {
            var _this = this;
            if (!this.overlayVisible) {
                this.overlayVisible = true;
            }
            if (this.filter) {
                setTimeout(function () {
                    if (_this.filterInputChild != undefined) {
                        _this.filterInputChild.nativeElement.focus();
                    }
                }, 200);
            }
            this.bindDocumentClickListener();
        };
        MultiSelect.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.overlay = event.element;
                    this.appendOverlay();
                    if (this.autoZIndex) {
                        this.overlay.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                    }
                    this.alignOverlay();
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.onPanelShow.emit();
                    break;
                case 'void':
                    this.onOverlayHide();
                    break;
            }
        };
        MultiSelect.prototype.appendOverlay = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.overlay);
                else
                    dom.DomHandler.appendChild(this.overlay, this.appendTo);
                this.overlay.style.minWidth = dom.DomHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
            }
        };
        MultiSelect.prototype.restoreOverlayAppend = function () {
            if (this.overlay && this.appendTo) {
                this.el.nativeElement.appendChild(this.overlay);
            }
        };
        MultiSelect.prototype.alignOverlay = function () {
            if (this.overlay) {
                if (this.appendTo)
                    dom.DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
                else
                    dom.DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
            }
        };
        MultiSelect.prototype.hide = function () {
            this.overlayVisible = false;
            this.unbindDocumentClickListener();
            if (this.resetFilterOnHide) {
                this.filterInputChild.nativeElement.value = '';
                this.onFilter();
            }
            this.onPanelHide.emit();
        };
        MultiSelect.prototype.close = function (event) {
            this.hide();
            event.preventDefault();
            event.stopPropagation();
        };
        MultiSelect.prototype.onMouseclick = function (event, input) {
            if (this.disabled || this.readonly) {
                return;
            }
            this.onClick.emit(event);
            if (!this.panelClick) {
                if (this.overlayVisible) {
                    this.hide();
                }
                else {
                    input.focus();
                    this.show();
                }
            }
            this.selfClick = true;
        };
        MultiSelect.prototype.onInputFocus = function (event) {
            this.focus = true;
            this.onFocus.emit({ originalEvent: event });
        };
        MultiSelect.prototype.onInputBlur = function (event) {
            this.focus = false;
            this.onBlur.emit({ originalEvent: event });
            this.onModelTouched();
        };
        MultiSelect.prototype.onOptionKeydown = function (event) {
            if (this.readonly) {
                return;
            }
            switch (event.originalEvent.which) {
                //down
                case 40:
                    var nextItem = this.findNextItem(event.originalEvent.target.parentElement);
                    if (nextItem) {
                        nextItem.focus();
                    }
                    event.originalEvent.preventDefault();
                    break;
                //up
                case 38:
                    var prevItem = this.findPrevItem(event.originalEvent.target.parentElement);
                    if (prevItem) {
                        prevItem.focus();
                    }
                    event.originalEvent.preventDefault();
                    break;
                //enter
                case 13:
                    this.onOptionClick(event);
                    event.originalEvent.preventDefault();
                    break;
            }
        };
        MultiSelect.prototype.findNextItem = function (item) {
            var nextItem = item.nextElementSibling;
            if (nextItem)
                return dom.DomHandler.hasClass(nextItem.children[0], 'ui-state-disabled') || dom.DomHandler.isHidden(nextItem.children[0]) ? this.findNextItem(nextItem) : nextItem.children[0];
            else
                return null;
        };
        MultiSelect.prototype.findPrevItem = function (item) {
            var prevItem = item.previousElementSibling;
            if (prevItem)
                return dom.DomHandler.hasClass(prevItem.children[0], 'ui-state-disabled') || dom.DomHandler.isHidden(prevItem.children[0]) ? this.findPrevItem(prevItem) : prevItem.children[0];
            else
                return null;
        };
        MultiSelect.prototype.onKeydown = function (event) {
            switch (event.which) {
                //down
                case 40:
                    if (!this.overlayVisible && event.altKey) {
                        this.show();
                    }
                    break;
                //space
                case 32:
                    if (!this.overlayVisible) {
                        this.show();
                        event.preventDefault();
                    }
                    break;
                //escape
                case 27:
                    this.hide();
                    break;
            }
        };
        MultiSelect.prototype.updateLabel = function () {
            if (this.value && this.options && this.value.length && this.displaySelectedLabel) {
                var label = '';
                for (var i = 0; i < this.value.length; i++) {
                    var itemLabel = this.findLabelByValue(this.value[i]);
                    if (itemLabel) {
                        if (label.length > 0) {
                            label = label + ', ';
                        }
                        label = label + itemLabel;
                    }
                }
                if (this.value.length <= this.maxSelectedLabels) {
                    this.valuesAsString = label;
                }
                else {
                    var pattern = /{(.*?)}/;
                    if (pattern.test(this.selectedItemsLabel)) {
                        this.valuesAsString = this.selectedItemsLabel.replace(this.selectedItemsLabel.match(pattern)[0], this.value.length + '');
                    }
                    else {
                        this.valuesAsString = this.selectedItemsLabel;
                    }
                }
            }
            else {
                this.valuesAsString = this.defaultLabel;
            }
        };
        MultiSelect.prototype.findLabelByValue = function (val) {
            var label = null;
            for (var i = 0; i < this.options.length; i++) {
                var option = this.options[i];
                if (val == null && option.value == null || utils.ObjectUtils.equals(val, option.value, this.dataKey)) {
                    label = option.label;
                    break;
                }
            }
            return label;
        };
        MultiSelect.prototype.onFilter = function () {
            var inputValue = this.filterInputChild.nativeElement.value;
            if (inputValue && inputValue.length) {
                this.filterValue = inputValue;
                this.activateFilter();
            }
            else {
                this.filterValue = null;
                this.visibleOptions = this.options;
                this.filtered = false;
            }
        };
        MultiSelect.prototype.activateFilter = function () {
            if (this.options && this.options.length) {
                var searchFields = this.filterBy.split(',');
                this.visibleOptions = utils.FilterUtils.filter(this.options, searchFields, this.filterValue, this.filterMatchMode);
                this.filtered = true;
            }
        };
        MultiSelect.prototype.isItemVisible = function (option) {
            if (this.filterValue && this.filterValue.trim().length) {
                for (var i = 0; i < this.visibleOptions.length; i++) {
                    if (this.visibleOptions[i].value == option.value) {
                        return true;
                    }
                }
            }
            else {
                return true;
            }
        };
        MultiSelect.prototype.getVisibleOptions = function () {
            return this.visibleOptions || this.options;
        };
        MultiSelect.prototype.onHeaderCheckboxFocus = function () {
            this.headerCheckboxFocus = true;
        };
        MultiSelect.prototype.onHeaderCheckboxBlur = function () {
            this.headerCheckboxFocus = false;
        };
        MultiSelect.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                this.documentClickListener = this.renderer.listen('document', 'click', function () {
                    if (!_this.selfClick && !_this.panelClick && _this.overlayVisible) {
                        _this.hide();
                    }
                    _this.selfClick = false;
                    _this.panelClick = false;
                    _this.cd.markForCheck();
                });
            }
        };
        MultiSelect.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        MultiSelect.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        MultiSelect.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        MultiSelect.prototype.onWindowResize = function () {
            if (!dom.DomHandler.isAndroid()) {
                this.hide();
            }
        };
        MultiSelect.prototype.onOverlayHide = function () {
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
            this.overlay = null;
        };
        MultiSelect.prototype.ngOnDestroy = function () {
            this.restoreOverlayAppend();
            this.onOverlayHide();
        };
        MultiSelect.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "scrollHeight", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "defaultLabel", null);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "panelStyle", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "panelStyleClass", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "inputId", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "disabled", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "readonly", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "filter", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "filterPlaceHolder", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "overlayVisible", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "tabindex", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "appendTo", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "dataKey", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "name", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "ariaLabelledBy", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "displaySelectedLabel", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "maxSelectedLabels", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "selectionLimit", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "selectedItemsLabel", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "showToggleAll", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "emptyFilterMessage", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "resetFilterOnHide", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "dropdownIcon", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "optionLabel", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "showHeader", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "autoZIndex", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "baseZIndex", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "filterBy", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "virtualScroll", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "itemSize", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "showTransitionOptions", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "hideTransitionOptions", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "ariaFilterLabel", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "filterMatchMode", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "tooltip", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "tooltipPosition", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "tooltipPositionStyle", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "tooltipStyleClass", void 0);
        __decorate([
            core.ViewChild('container', { static: true })
        ], MultiSelect.prototype, "containerViewChild", void 0);
        __decorate([
            core.ViewChild('filterInput', { static: false })
        ], MultiSelect.prototype, "filterInputChild", void 0);
        __decorate([
            core.ContentChild(api.Footer, { static: true })
        ], MultiSelect.prototype, "footerFacet", void 0);
        __decorate([
            core.ContentChild(api.Header, { static: true })
        ], MultiSelect.prototype, "headerFacet", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], MultiSelect.prototype, "templates", void 0);
        __decorate([
            core.Output()
        ], MultiSelect.prototype, "onChange", void 0);
        __decorate([
            core.Output()
        ], MultiSelect.prototype, "onFocus", void 0);
        __decorate([
            core.Output()
        ], MultiSelect.prototype, "onBlur", void 0);
        __decorate([
            core.Output()
        ], MultiSelect.prototype, "onClick", void 0);
        __decorate([
            core.Output()
        ], MultiSelect.prototype, "onPanelShow", void 0);
        __decorate([
            core.Output()
        ], MultiSelect.prototype, "onPanelHide", void 0);
        __decorate([
            core.Input()
        ], MultiSelect.prototype, "options", null);
        MultiSelect = __decorate([
            core.Component({
                selector: 'p-multiSelect',
                template: "\n        <div #container [ngClass]=\"{'ui-multiselect ui-widget ui-state-default ui-corner-all':true,'ui-multiselect-open':overlayVisible,'ui-state-focus':focus,'ui-state-disabled': disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\"\n            (click)=\"onMouseclick($event,in)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in type=\"text\" readonly=\"readonly\" [attr.id]=\"inputId\" [attr.name]=\"name\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\"\n                       [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" (keydown)=\"onKeydown($event)\" aria-haspopup=\"listbox\" [attr.aria-expanded]=\"overlayVisible\" \n                       [attr.aria-labelledby]=\"ariaLabelledBy\">\n            </div>\n            <div class=\"ui-multiselect-label-container\" [pTooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\" [positionStyle]=\"tooltipPositionStyle\" [tooltipStyleClass]=\"tooltipStyleClass\">\n                <span class=\"ui-multiselect-label ui-corner-all\">\n                    <ng-container *ngIf=\"!selectedItemsTemplate\">{{valuesAsString}}</ng-container>\n                    <ng-container *ngTemplateOutlet=\"selectedItemsTemplate; context: {$implicit: value}\"></ng-container>\n                </span>\n            </div>\n            <div [ngClass]=\"{'ui-multiselect-trigger ui-state-default ui-corner-right':true}\">\n                <span class=\"ui-multiselect-trigger-icon ui-clickable\" [ngClass]=\"dropdownIcon\"></span>\n            </div>\n            <div *ngIf=\"overlayVisible\" [ngClass]=\"['ui-multiselect-panel ui-widget ui-widget-content ui-corner-all ui-shadow']\" [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\"\n                [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\" (click)=\"panelClick=true\" (keydown)=\"onKeydown($event)\">\n                <div class=\"ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix\" [ngClass]=\"{'ui-multiselect-header-no-toggleall': !showToggleAll}\" *ngIf=\"showHeader\">\n                <ng-content select=\"p-header\"></ng-content>  \n                <div class=\"ui-chkbox ui-widget\" *ngIf=\"showToggleAll && !selectionLimit\">\n                        <div class=\"ui-helper-hidden-accessible\">\n                            <input type=\"checkbox\" readonly=\"readonly\" [checked]=\"isAllChecked()\" (focus)=\"onHeaderCheckboxFocus()\" (blur)=\"onHeaderCheckboxBlur()\" (keydown.space)=\"toggleAll($event)\">\n                        </div>\n                        <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" role=\"checkbox\" [attr.aria-checked]=\"isAllChecked()\" [ngClass]=\"{'ui-state-active':isAllChecked(), 'ui-state-focus': headerCheckboxFocus}\" (click)=\"toggleAll($event)\">\n                            <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':isAllChecked()}\"></span>\n                        </div>\n                    </div>\n                    <div class=\"ui-multiselect-filter-container\" *ngIf=\"filter\">\n                        <input #filterInput type=\"text\" role=\"textbox\" [value]=\"filterValue||''\" (input)=\"onFilter()\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceHolder\" [attr.aria-label]=\"ariaFilterLabel\">\n                        <span class=\"ui-multiselect-filter-icon pi pi-search\"></span>\n                    </div>\n                    <a class=\"ui-multiselect-close ui-corner-all\" tabindex=\"0\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\">\n                        <span class=\"pi pi-times\"></span>\n                    </a>\n                </div>\n                <div class=\"ui-multiselect-items-wrapper\" [style.max-height]=\"virtualScroll ? 'auto' : (scrollHeight||'auto')\">\n                    <ul class=\"ui-multiselect-items ui-multiselect-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\" role=\"listbox\" aria-multiselectable=\"true\">\n                        <ng-container *ngIf=\"!virtualScroll; else virtualScrollList\">\n                            <ng-template ngFor let-option let-i=\"index\" [ngForOf]=\"options\">\n                                <p-multiSelectItem [option]=\"option\" [selected]=\"isSelected(option.value)\" (onClick)=\"onOptionClick($event)\" (onKeydown)=\"onOptionKeydown($event)\" \n                                        [maxSelectionLimitReached]=\"maxSelectionLimitReached\" [visible]=\"isItemVisible(option)\" [template]=\"itemTemplate\"></p-multiSelectItem>\n                            </ng-template>\n                        </ng-container>\n                        <ng-template #virtualScrollList>\n                            <cdk-virtual-scroll-viewport #viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" *ngIf=\"virtualScroll && visibleOptions && visibleOptions.length\">\n                                <ng-container *cdkVirtualFor=\"let option of visibleOptions; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd\">\n                                    <p-multiSelectItem [option]=\"option\" [selected]=\"isSelected(option.value)\" (onClick)=\"onOptionClick($event)\" (onKeydown)=\"onOptionKeydown($event)\" \n                                        [maxSelectionLimitReached]=\"maxSelectionLimitReached\" [visible]=\"isItemVisible(option)\" [template]=\"itemTemplate\" [itemSize]=\"itemSize\"></p-multiSelectItem>\n                                </ng-container>\n                            </cdk-virtual-scroll-viewport>\n                        </ng-template>\n                        <li *ngIf=\"filter && visibleOptions && visibleOptions.length === 0\" class=\"ui-multiselect-empty-message\">{{emptyFilterMessage}}</li>\n                    </ul>\n                </div>\n                <div class=\"ui-multiselect-footer ui-widget-content\" *ngIf=\"footerFacet\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                </div>\n            </div>\n        </div>\n    ",
                animations: [
                    animations.trigger('overlayAnimation', [
                        animations.state('void', animations.style({
                            transform: 'translateY(5%)',
                            opacity: 0
                        })),
                        animations.state('visible', animations.style({
                            transform: 'translateY(0)',
                            opacity: 1
                        })),
                        animations.transition('void => visible', animations.animate('{{showTransitionParams}}')),
                        animations.transition('visible => void', animations.animate('{{hideTransitionParams}}'))
                    ])
                ],
                host: {
                    '[class.ui-inputwrapper-filled]': 'filled',
                    '[class.ui-inputwrapper-focus]': 'focus'
                },
                providers: [MULTISELECT_VALUE_ACCESSOR]
            })
        ], MultiSelect);
        return MultiSelect;
    }());
    var MultiSelectModule = /** @class */ (function () {
        function MultiSelectModule() {
        }
        MultiSelectModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, api.SharedModule, scrolling.ScrollingModule, tooltip.TooltipModule],
                exports: [MultiSelect, api.SharedModule, scrolling.ScrollingModule],
                declarations: [MultiSelect, MultiSelectItem]
            })
        ], MultiSelectModule);
        return MultiSelectModule;
    }());

    exports.MULTISELECT_VALUE_ACCESSOR = MULTISELECT_VALUE_ACCESSOR;
    exports.MultiSelect = MultiSelect;
    exports.MultiSelectItem = MultiSelectItem;
    exports.MultiSelectModule = MultiSelectModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-multiselect.umd.js.map
