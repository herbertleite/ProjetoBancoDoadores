import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { forwardRef, EventEmitter, Input, Output, Component, ElementRef, Renderer2, ChangeDetectorRef, NgZone, ViewChild, ContentChildren, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils, FilterUtils } from 'primeng/utils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';

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
var DROPDOWN_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Dropdown; }),
    multi: true
};
var DropdownItem = /** @class */ (function () {
    function DropdownItem() {
        this.onClick = new EventEmitter();
    }
    DropdownItem.prototype.onOptionClick = function (event) {
        this.onClick.emit({
            originalEvent: event,
            option: this.option
        });
    };
    __decorate([
        Input()
    ], DropdownItem.prototype, "option", void 0);
    __decorate([
        Input()
    ], DropdownItem.prototype, "selected", void 0);
    __decorate([
        Input()
    ], DropdownItem.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], DropdownItem.prototype, "visible", void 0);
    __decorate([
        Input()
    ], DropdownItem.prototype, "itemSize", void 0);
    __decorate([
        Input()
    ], DropdownItem.prototype, "template", void 0);
    __decorate([
        Output()
    ], DropdownItem.prototype, "onClick", void 0);
    DropdownItem = __decorate([
        Component({
            selector: 'p-dropdownItem',
            template: "\n        <li (click)=\"onOptionClick($event)\" role=\"option\"\n            [attr.aria-label]=\"option.label\" [attr.aria-selected]=\"selected\"\n            [ngStyle]=\"{'height': itemSize + 'px'}\"\n            [ngClass]=\"{'ui-dropdown-item ui-corner-all':true,\n                                                'ui-state-highlight': selected,\n                                                'ui-state-disabled':(option.disabled),\n                                                'ui-dropdown-item-empty': !option.label||option.label.length === 0}\">\n            <span *ngIf=\"!template\">{{option.label||'empty'}}</span>\n            <ng-container *ngTemplateOutlet=\"template; context: {$implicit: option}\"></ng-container>\n        </li>\n    "
        })
    ], DropdownItem);
    return DropdownItem;
}());
var Dropdown = /** @class */ (function () {
    function Dropdown(el, renderer, cd, zone) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.scrollHeight = '200px';
        this.filterBy = 'label';
        this.resetFilterOnHide = false;
        this.dropdownIcon = 'pi pi-chevron-down';
        this.autoDisplayFirst = true;
        this.emptyFilterMessage = 'No results found';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.filterMatchMode = "contains";
        this.tooltip = '';
        this.tooltipPosition = 'right';
        this.tooltipPositionStyle = 'absolute';
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.viewPortOffsetTop = 0;
    }
    Object.defineProperty(Dropdown.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (_disabled) {
            if (_disabled)
                this.focused = false;
            this._disabled = _disabled;
            if (!this.cd.destroyed) {
                this.cd.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Dropdown.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                case 'selectedItem':
                    _this.selectedItemTemplate = item.template;
                    break;
                case 'group':
                    _this.groupTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Dropdown.prototype.ngOnInit = function () {
        this.optionsToDisplay = this.options;
        this.updateSelectedOption(null);
    };
    Object.defineProperty(Dropdown.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            var opts = this.optionLabel ? ObjectUtils.generateSelectItems(val, this.optionLabel) : val;
            this._options = opts;
            this.optionsToDisplay = this._options;
            this.updateSelectedOption(this.value);
            this.optionsChanged = true;
            if (this.filterValue && this.filterValue.length) {
                this.activateFilter();
            }
        },
        enumerable: true,
        configurable: true
    });
    Dropdown.prototype.ngAfterViewInit = function () {
        if (this.editable) {
            this.updateEditableLabel();
        }
    };
    Object.defineProperty(Dropdown.prototype, "label", {
        get: function () {
            return (this.selectedOption ? this.selectedOption.label : null);
        },
        enumerable: true,
        configurable: true
    });
    Dropdown.prototype.updateEditableLabel = function () {
        if (this.editableInputViewChild && this.editableInputViewChild.nativeElement) {
            this.editableInputViewChild.nativeElement.value = (this.selectedOption ? this.selectedOption.label : this.value || '');
        }
    };
    Dropdown.prototype.onItemClick = function (event) {
        var _this = this;
        var option = event.option;
        this.itemClick = true;
        if (!option.disabled) {
            this.selectItem(event, option);
            this.focusViewChild.nativeElement.focus();
        }
        setTimeout(function () {
            _this.hide(event);
        }, 150);
    };
    Dropdown.prototype.selectItem = function (event, option) {
        var _this = this;
        if (this.selectedOption != option) {
            this.selectedOption = option;
            this.value = option.value;
            this.filled = true;
            this.onModelChange(this.value);
            this.updateEditableLabel();
            this.onChange.emit({
                originalEvent: event.originalEvent,
                value: this.value
            });
            if (this.virtualScroll) {
                setTimeout(function () {
                    _this.viewPortOffsetTop = _this.viewPort.measureScrollOffset();
                }, 1);
            }
        }
    };
    Dropdown.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.optionsChanged && this.overlayVisible) {
            this.optionsChanged = false;
            if (this.virtualScroll) {
                this.updateVirtualScrollSelectedIndex(true);
            }
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.alignOverlay();
                }, 1);
            });
        }
        if (this.selectedOptionUpdated && this.itemsWrapper) {
            if (this.virtualScroll && this.viewPort) {
                var range = this.viewPort.getRenderedRange();
                this.updateVirtualScrollSelectedIndex(false);
                if (range.start > this.virtualScrollSelectedIndex || range.end < this.virtualScrollSelectedIndex) {
                    this.viewPort.scrollToIndex(this.virtualScrollSelectedIndex);
                }
            }
            var selectedItem = DomHandler.findSingle(this.overlay, 'li.ui-state-highlight');
            if (selectedItem) {
                DomHandler.scrollInView(this.itemsWrapper, DomHandler.findSingle(this.overlay, 'li.ui-state-highlight'));
            }
            this.selectedOptionUpdated = false;
        }
    };
    Dropdown.prototype.writeValue = function (value) {
        if (this.filter) {
            this.resetFilter();
        }
        this.value = value;
        this.updateSelectedOption(value);
        this.updateEditableLabel();
        this.updateFilledState();
        this.cd.markForCheck();
    };
    Dropdown.prototype.resetFilter = function () {
        this.filterValue = null;
        if (this.filterViewChild && this.filterViewChild.nativeElement) {
            this.filterViewChild.nativeElement.value = '';
        }
        this.optionsToDisplay = this.options;
    };
    Dropdown.prototype.updateSelectedOption = function (val) {
        this.selectedOption = this.findOption(val, this.optionsToDisplay);
        if (this.autoDisplayFirst && !this.placeholder && !this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length && !this.editable) {
            this.selectedOption = this.optionsToDisplay[0];
        }
        this.selectedOptionUpdated = true;
    };
    Dropdown.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Dropdown.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Dropdown.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Dropdown.prototype.onMouseclick = function (event) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.onClick.emit(event);
        this.selfClick = true;
        this.clearClick = DomHandler.hasClass(event.target, 'ui-dropdown-clear-icon');
        if (!this.itemClick && !this.clearClick) {
            this.focusViewChild.nativeElement.focus();
            if (this.overlayVisible)
                this.hide(event);
            else
                this.show();
            this.cd.detectChanges();
        }
    };
    Dropdown.prototype.onEditableInputClick = function (event) {
        this.itemClick = true;
        this.bindDocumentClickListener();
    };
    Dropdown.prototype.onEditableInputFocus = function (event) {
        this.focused = true;
        this.hide(event);
        this.onFocus.emit(event);
    };
    Dropdown.prototype.onEditableInputChange = function (event) {
        this.value = event.target.value;
        this.updateSelectedOption(this.value);
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    Dropdown.prototype.show = function () {
        this.overlayVisible = true;
    };
    Dropdown.prototype.onOverlayAnimationStart = function (event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                var itemsWrapperSelector = this.virtualScroll ? '.cdk-virtual-scroll-viewport' : '.ui-dropdown-items-wrapper';
                this.itemsWrapper = DomHandler.findSingle(this.overlay, itemsWrapperSelector);
                this.appendOverlay();
                if (this.autoZIndex) {
                    this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                if (this.options && this.options.length) {
                    if (!this.virtualScroll) {
                        var selectedListItem = DomHandler.findSingle(this.itemsWrapper, '.ui-dropdown-item.ui-state-highlight');
                        if (selectedListItem) {
                            DomHandler.scrollInView(this.itemsWrapper, selectedListItem);
                        }
                    }
                }
                if (this.filterViewChild && this.filterViewChild.nativeElement) {
                    this.filterViewChild.nativeElement.focus();
                }
                this.onShow.emit(event);
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    };
    Dropdown.prototype.scrollToSelectedVirtualScrollElement = function () {
        if (!this.virtualAutoScrolled) {
            if (this.viewPortOffsetTop) {
                this.viewPort.scrollToOffset(this.viewPortOffsetTop);
            }
            else if (this.virtualScrollSelectedIndex > -1) {
                this.viewPort.scrollToIndex(this.virtualScrollSelectedIndex);
            }
        }
        this.virtualAutoScrolled = true;
    };
    Dropdown.prototype.updateVirtualScrollSelectedIndex = function (resetOffset) {
        if (this.selectedOption && this.optionsToDisplay && this.optionsToDisplay.length) {
            if (resetOffset) {
                this.viewPortOffsetTop = 0;
            }
            this.virtualScrollSelectedIndex = this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay);
        }
    };
    Dropdown.prototype.appendOverlay = function () {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
            this.overlay.style.minWidth = DomHandler.getWidth(this.containerViewChild.nativeElement) + 'px';
        }
    };
    Dropdown.prototype.restoreOverlayAppend = function () {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    };
    Dropdown.prototype.hide = function (event) {
        this.overlayVisible = false;
        if (this.filter && this.resetFilterOnHide) {
            this.resetFilter();
        }
        if (this.virtualScroll) {
            this.virtualAutoScrolled = false;
        }
        this.cd.markForCheck();
        this.onHide.emit(event);
    };
    Dropdown.prototype.alignOverlay = function () {
        if (this.overlay) {
            if (this.appendTo)
                DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
            else
                DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
        }
    };
    Dropdown.prototype.onInputFocus = function (event) {
        this.focused = true;
        this.onFocus.emit(event);
    };
    Dropdown.prototype.onInputBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    Dropdown.prototype.findPrevEnabledOption = function (index) {
        var prevEnabledOption;
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (var i = (index - 1); 0 <= i; i--) {
                var option = this.optionsToDisplay[i];
                if (option.disabled) {
                    continue;
                }
                else {
                    prevEnabledOption = option;
                    break;
                }
            }
            if (!prevEnabledOption) {
                for (var i = this.optionsToDisplay.length - 1; i >= index; i--) {
                    var option = this.optionsToDisplay[i];
                    if (option.disabled) {
                        continue;
                    }
                    else {
                        prevEnabledOption = option;
                        break;
                    }
                }
            }
        }
        return prevEnabledOption;
    };
    Dropdown.prototype.findNextEnabledOption = function (index) {
        var nextEnabledOption;
        if (this.optionsToDisplay && this.optionsToDisplay.length) {
            for (var i = (index + 1); index < (this.optionsToDisplay.length - 1); i++) {
                var option = this.optionsToDisplay[i];
                if (option.disabled) {
                    continue;
                }
                else {
                    nextEnabledOption = option;
                    break;
                }
            }
            if (!nextEnabledOption) {
                for (var i = 0; i < index; i++) {
                    var option = this.optionsToDisplay[i];
                    if (option.disabled) {
                        continue;
                    }
                    else {
                        nextEnabledOption = option;
                        break;
                    }
                }
            }
        }
        return nextEnabledOption;
    };
    Dropdown.prototype.onKeydown = function (event, search) {
        if (this.readonly || !this.optionsToDisplay || this.optionsToDisplay.length === null) {
            return;
        }
        switch (event.which) {
            //down
            case 40:
                if (!this.overlayVisible && event.altKey) {
                    this.show();
                }
                else {
                    if (this.group) {
                        var selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                        if (selectedItemIndex !== -1) {
                            var nextItemIndex = selectedItemIndex.itemIndex + 1;
                            if (nextItemIndex < (this.optionsToDisplay[selectedItemIndex.groupIndex].items.length)) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[nextItemIndex]);
                                this.selectedOptionUpdated = true;
                            }
                            else if (this.optionsToDisplay[selectedItemIndex.groupIndex + 1]) {
                                this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex + 1].items[0]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                        else {
                            this.selectItem(event, this.optionsToDisplay[0].items[0]);
                        }
                    }
                    else {
                        var selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                        var nextEnabledOption = this.findNextEnabledOption(selectedItemIndex);
                        if (nextEnabledOption) {
                            this.selectItem(event, nextEnabledOption);
                            this.selectedOptionUpdated = true;
                        }
                    }
                }
                event.preventDefault();
                break;
            //up
            case 38:
                if (this.group) {
                    var selectedItemIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                    if (selectedItemIndex !== -1) {
                        var prevItemIndex = selectedItemIndex.itemIndex - 1;
                        if (prevItemIndex >= 0) {
                            this.selectItem(event, this.optionsToDisplay[selectedItemIndex.groupIndex].items[prevItemIndex]);
                            this.selectedOptionUpdated = true;
                        }
                        else if (prevItemIndex < 0) {
                            var prevGroup = this.optionsToDisplay[selectedItemIndex.groupIndex - 1];
                            if (prevGroup) {
                                this.selectItem(event, prevGroup.items[prevGroup.items.length - 1]);
                                this.selectedOptionUpdated = true;
                            }
                        }
                    }
                }
                else {
                    var selectedItemIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
                    var prevEnabledOption = this.findPrevEnabledOption(selectedItemIndex);
                    if (prevEnabledOption) {
                        this.selectItem(event, prevEnabledOption);
                        this.selectedOptionUpdated = true;
                    }
                }
                event.preventDefault();
                break;
            //space
            case 32:
            case 32:
                if (!this.overlayVisible) {
                    this.show();
                    event.preventDefault();
                }
                break;
            //enter
            case 13:
                if (!this.filter || (this.optionsToDisplay && this.optionsToDisplay.length > 0)) {
                    this.hide(event);
                }
                event.preventDefault();
                break;
            //escape and tab
            case 27:
            case 9:
                this.hide(event);
                break;
            //search item based on keyboard input
            default:
                if (search) {
                    this.search(event);
                }
                break;
        }
    };
    Dropdown.prototype.search = function (event) {
        var _this = this;
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        var char = event.key;
        this.previousSearchChar = this.currentSearchChar;
        this.currentSearchChar = char;
        if (this.previousSearchChar === this.currentSearchChar)
            this.searchValue = this.currentSearchChar;
        else
            this.searchValue = this.searchValue ? this.searchValue + char : char;
        var newOption;
        if (this.group) {
            var searchIndex = this.selectedOption ? this.findOptionGroupIndex(this.selectedOption.value, this.optionsToDisplay) : { groupIndex: 0, itemIndex: 0 };
            newOption = this.searchOptionWithinGroup(searchIndex);
        }
        else {
            var searchIndex = this.selectedOption ? this.findOptionIndex(this.selectedOption.value, this.optionsToDisplay) : -1;
            newOption = this.searchOption(++searchIndex);
        }
        if (newOption) {
            this.selectItem(event, newOption);
            this.selectedOptionUpdated = true;
        }
        this.searchTimeout = setTimeout(function () {
            _this.searchValue = null;
        }, 250);
    };
    Dropdown.prototype.searchOption = function (index) {
        var option;
        if (this.searchValue) {
            option = this.searchOptionInRange(index, this.optionsToDisplay.length);
            if (!option) {
                option = this.searchOptionInRange(0, index);
            }
        }
        return option;
    };
    Dropdown.prototype.searchOptionInRange = function (start, end) {
        for (var i = start; i < end; i++) {
            var opt = this.optionsToDisplay[i];
            if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                return opt;
            }
        }
        return null;
    };
    Dropdown.prototype.searchOptionWithinGroup = function (index) {
        var option;
        if (this.searchValue) {
            for (var i = index.groupIndex; i < this.optionsToDisplay.length; i++) {
                for (var j = (index.groupIndex === i) ? (index.itemIndex + 1) : 0; j < this.optionsToDisplay[i].items.length; j++) {
                    var opt = this.optionsToDisplay[i].items[j];
                    if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                        return opt;
                    }
                }
            }
            if (!option) {
                for (var i = 0; i <= index.groupIndex; i++) {
                    for (var j = 0; j < ((index.groupIndex === i) ? index.itemIndex : this.optionsToDisplay[i].items.length); j++) {
                        var opt = this.optionsToDisplay[i].items[j];
                        if (opt.label.toLowerCase().startsWith(this.searchValue.toLowerCase())) {
                            return opt;
                        }
                    }
                }
            }
        }
        return null;
    };
    Dropdown.prototype.findOptionIndex = function (val, opts) {
        var index = -1;
        if (opts) {
            for (var i = 0; i < opts.length; i++) {
                if ((val == null && opts[i].value == null) || ObjectUtils.equals(val, opts[i].value, this.dataKey)) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    Dropdown.prototype.findOptionGroupIndex = function (val, opts) {
        var groupIndex, itemIndex;
        if (opts) {
            for (var i = 0; i < opts.length; i++) {
                groupIndex = i;
                itemIndex = this.findOptionIndex(val, opts[i].items);
                if (itemIndex !== -1) {
                    break;
                }
            }
        }
        if (itemIndex !== -1) {
            return { groupIndex: groupIndex, itemIndex: itemIndex };
        }
        else {
            return -1;
        }
    };
    Dropdown.prototype.findOption = function (val, opts, inGroup) {
        var e_1, _a;
        if (this.group && !inGroup) {
            var opt = void 0;
            if (opts && opts.length) {
                try {
                    for (var opts_1 = __values(opts), opts_1_1 = opts_1.next(); !opts_1_1.done; opts_1_1 = opts_1.next()) {
                        var optgroup = opts_1_1.value;
                        opt = this.findOption(val, optgroup.items, true);
                        if (opt) {
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (opts_1_1 && !opts_1_1.done && (_a = opts_1.return)) _a.call(opts_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return opt;
        }
        else {
            var index = this.findOptionIndex(val, opts);
            return (index != -1) ? opts[index] : null;
        }
    };
    Dropdown.prototype.onFilter = function (event) {
        var inputValue = event.target.value;
        if (inputValue && inputValue.length) {
            this.filterValue = inputValue;
            this.activateFilter();
        }
        else {
            this.filterValue = null;
            this.optionsToDisplay = this.options;
        }
        this.optionsChanged = true;
    };
    Dropdown.prototype.activateFilter = function () {
        var e_2, _a;
        var searchFields = this.filterBy.split(',');
        if (this.options && this.options.length) {
            if (this.group) {
                var filteredGroups = [];
                try {
                    for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var optgroup = _c.value;
                        var filteredSubOptions = FilterUtils.filter(optgroup.items, searchFields, this.filterValue, this.filterMatchMode);
                        if (filteredSubOptions && filteredSubOptions.length) {
                            filteredGroups.push({
                                label: optgroup.label,
                                value: optgroup.value,
                                items: filteredSubOptions
                            });
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
                this.optionsToDisplay = filteredGroups;
            }
            else {
                this.optionsToDisplay = FilterUtils.filter(this.options, searchFields, this.filterValue, this.filterMatchMode);
            }
            this.optionsChanged = true;
        }
    };
    Dropdown.prototype.applyFocus = function () {
        if (this.editable)
            DomHandler.findSingle(this.el.nativeElement, '.ui-dropdown-label.ui-inputtext').focus();
        else
            DomHandler.findSingle(this.el.nativeElement, 'input[readonly]').focus();
    };
    Dropdown.prototype.focus = function () {
        this.applyFocus();
    };
    Dropdown.prototype.bindDocumentClickListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
                if (!_this.selfClick && !_this.itemClick) {
                    _this.hide(event);
                    _this.unbindDocumentClickListener();
                }
                _this.clearClickState();
                _this.cd.markForCheck();
            });
        }
    };
    Dropdown.prototype.clearClickState = function () {
        this.selfClick = false;
        this.itemClick = false;
    };
    Dropdown.prototype.unbindDocumentClickListener = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    Dropdown.prototype.bindDocumentResizeListener = function () {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    };
    Dropdown.prototype.unbindDocumentResizeListener = function () {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    };
    Dropdown.prototype.onWindowResize = function () {
        if (!DomHandler.isAndroid()) {
            this.hide(event);
        }
    };
    Dropdown.prototype.updateFilledState = function () {
        this.filled = (this.selectedOption != null);
    };
    Dropdown.prototype.clear = function (event) {
        this.clearClick = true;
        this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
        this.updateSelectedOption(this.value);
        this.updateEditableLabel();
        this.updateFilledState();
    };
    Dropdown.prototype.onOverlayHide = function () {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
        this.itemsWrapper = null;
    };
    Dropdown.prototype.ngOnDestroy = function () {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    };
    Dropdown.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], Dropdown.prototype, "scrollHeight", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "filter", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "name", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "style", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "panelStyle", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "panelStyleClass", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "readonly", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "required", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "editable", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "appendTo", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "placeholder", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "filterPlaceholder", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "selectId", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "dataKey", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "filterBy", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "autofocus", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "resetFilterOnHide", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "dropdownIcon", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "optionLabel", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "autoDisplayFirst", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "group", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "showClear", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "emptyFilterMessage", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "virtualScroll", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "itemSize", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "showTransitionOptions", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "hideTransitionOptions", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "ariaFilterLabel", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "filterMatchMode", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "maxlength", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "tooltip", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "tooltipPosition", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "tooltipPositionStyle", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "tooltipStyleClass", void 0);
    __decorate([
        Output()
    ], Dropdown.prototype, "onChange", void 0);
    __decorate([
        Output()
    ], Dropdown.prototype, "onFocus", void 0);
    __decorate([
        Output()
    ], Dropdown.prototype, "onBlur", void 0);
    __decorate([
        Output()
    ], Dropdown.prototype, "onClick", void 0);
    __decorate([
        Output()
    ], Dropdown.prototype, "onShow", void 0);
    __decorate([
        Output()
    ], Dropdown.prototype, "onHide", void 0);
    __decorate([
        ViewChild('container', { static: true })
    ], Dropdown.prototype, "containerViewChild", void 0);
    __decorate([
        ViewChild('filter', { static: false })
    ], Dropdown.prototype, "filterViewChild", void 0);
    __decorate([
        ViewChild('in', { static: true })
    ], Dropdown.prototype, "focusViewChild", void 0);
    __decorate([
        ViewChild(CdkVirtualScrollViewport, { static: false })
    ], Dropdown.prototype, "viewPort", void 0);
    __decorate([
        ViewChild('editableInput', { static: false })
    ], Dropdown.prototype, "editableInputViewChild", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], Dropdown.prototype, "templates", void 0);
    __decorate([
        Input()
    ], Dropdown.prototype, "disabled", null);
    __decorate([
        Input()
    ], Dropdown.prototype, "options", null);
    Dropdown = __decorate([
        Component({
            selector: 'p-dropdown',
            template: "\n         <div #container [ngClass]=\"{'ui-dropdown ui-widget ui-state-default ui-corner-all ui-helper-clearfix':true,\n            'ui-state-disabled':disabled, 'ui-dropdown-open':overlayVisible, 'ui-state-focus':focused, 'ui-dropdown-clearable': showClear && !disabled}\"\n            (click)=\"onMouseclick($event)\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #in [attr.id]=\"inputId\" type=\"text\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" readonly (focus)=\"onInputFocus($event)\" aria-haspopup=\"listbox\"\n                    aria-haspopup=\"listbox\" [attr.aria-expanded]=\"overlayVisible\" [attr.aria-labelledby]=\"ariaLabelledBy\" (blur)=\"onInputBlur($event)\" (keydown)=\"onKeydown($event, true)\" \n                    [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\" [attr.autofocus]=\"autofocus\">\n            </div>\n            <div class=\"ui-helper-hidden-accessible ui-dropdown-hidden-select\">\n                <select [attr.required]=\"required\" [attr.name]=\"name\" tabindex=\"-1\" aria-hidden=\"true\">\n                    <option *ngIf=\"placeholder\" value=\"\">{{placeholder}}</option>\n                    <option *ngIf=\"selectedOption\" [value]=\"selectedOption.value\" [selected]=\"true\">{{selectedOption.label}}</option>\n                </select>\n            </div>\n            <div class=\"ui-dropdown-label-container\" [pTooltip]=\"tooltip\" [tooltipPosition]=\"tooltipPosition\" [positionStyle]=\"tooltipPositionStyle\" [tooltipStyleClass]=\"tooltipStyleClass\">\n                <label [ngClass]=\"{'ui-dropdown-label ui-inputtext ui-corner-all':true,'ui-dropdown-label-empty':(label == null || label.length === 0)}\" *ngIf=\"!editable && (label != null)\">\n                    <ng-container *ngIf=\"!selectedItemTemplate\">{{label||'empty'}}</ng-container>\n                    <ng-container *ngTemplateOutlet=\"selectedItemTemplate; context: {$implicit: selectedOption}\"></ng-container>\n                </label>\n                <label [ngClass]=\"{'ui-dropdown-label ui-inputtext ui-corner-all ui-placeholder':true,'ui-dropdown-label-empty': (placeholder == null || placeholder.length === 0)}\" *ngIf=\"!editable && (label == null)\">{{placeholder||'empty'}}</label>\n                <input #editableInput type=\"text\" [attr.maxlength]=\"maxlength\" [attr.aria-label]=\"selectedOption ? selectedOption.label : ' '\" class=\"ui-dropdown-label ui-inputtext ui-corner-all\" *ngIf=\"editable\" [disabled]=\"disabled\" [attr.placeholder]=\"placeholder\"\n                    aria-haspopup=\"listbox\" [attr.aria-expanded]=\"overlayVisible\" (click)=\"onEditableInputClick($event)\" (input)=\"onEditableInputChange($event)\" (focus)=\"onEditableInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n                <i class=\"ui-dropdown-clear-icon pi pi-times\" (click)=\"clear($event)\" *ngIf=\"value != null && showClear && !disabled\"></i>\n            </div>\n            <div class=\"ui-dropdown-trigger ui-state-default ui-corner-right\" role=\"button\" aria-haspopup=\"listbox\" [attr.aria-expanded]=\"overlayVisible\">\n                <span class=\"ui-dropdown-trigger-icon ui-clickable\" [ngClass]=\"dropdownIcon\"></span>\n            </div>\n            <div *ngIf=\"overlayVisible\" [ngClass]=\"'ui-dropdown-panel  ui-widget ui-widget-content ui-corner-all ui-shadow'\" [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" [ngStyle]=\"panelStyle\" [class]=\"panelStyleClass\">\n                <div *ngIf=\"filter\" class=\"ui-dropdown-filter-container\" (click)=\"$event.stopPropagation()\">\n                    <input #filter type=\"text\" autocomplete=\"off\" [value]=\"filterValue||''\" class=\"ui-dropdown-filter ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceholder\"\n                    (keydown.enter)=\"$event.preventDefault()\" (keydown)=\"onKeydown($event, false)\" (input)=\"onFilter($event)\" [attr.aria-label]=\"ariaFilterLabel\">\n                    <span class=\"ui-dropdown-filter-icon pi pi-search\"></span>\n                </div>\n                <div class=\"ui-dropdown-items-wrapper\" [style.max-height]=\"virtualScroll ? 'auto' : (scrollHeight||'auto')\">\n                    <ul class=\"ui-dropdown-items ui-dropdown-list ui-widget-content ui-widget ui-corner-all ui-helper-reset\" role=\"listbox\">\n                        <ng-container *ngIf=\"group\">\n                            <ng-template ngFor let-optgroup [ngForOf]=\"optionsToDisplay\">\n                                <li class=\"ui-dropdown-item-group\">\n                                    <span *ngIf=\"!groupTemplate\">{{optgroup.label||'empty'}}</span>\n                                    <ng-container *ngTemplateOutlet=\"groupTemplate; context: {$implicit: optgroup}\"></ng-container>\n                                </li>\n                                <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: optgroup.items, selectedOption: selectedOption}\"></ng-container>\n                            </ng-template>\n                        </ng-container>\n                        <ng-container *ngIf=\"!group\">\n                            <ng-container *ngTemplateOutlet=\"itemslist; context: {$implicit: optionsToDisplay, selectedOption: selectedOption}\"></ng-container>\n                        </ng-container>\n                        <ng-template #itemslist let-options let-selectedOption=\"selectedOption\">\n\n                            <ng-container *ngIf=\"!virtualScroll; else virtualScrollList\">\n                                <ng-template ngFor let-option let-i=\"index\" [ngForOf]=\"options\">\n                                    <p-dropdownItem [option]=\"option\" [selected]=\"selectedOption == option\" \n                                                    (onClick)=\"onItemClick($event)\"\n                                                    [template]=\"itemTemplate\"></p-dropdownItem>\n                                </ng-template>\n                            </ng-container>\n                            <ng-template #virtualScrollList>\n                                <cdk-virtual-scroll-viewport (scrolledIndexChange)=\"scrollToSelectedVirtualScrollElement()\" #viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" *ngIf=\"virtualScroll && optionsToDisplay && optionsToDisplay.length\">\n                                    <ng-container *cdkVirtualFor=\"let option of options; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd\">         \n                                        <p-dropdownItem [option]=\"option\" [selected]=\"selectedOption == option\"\n                                                                   (onClick)=\"onItemClick($event)\"\n                                                                   [template]=\"itemTemplate\"></p-dropdownItem>\n                                    </ng-container>\n                                </cdk-virtual-scroll-viewport>\n                            </ng-template>\n                        </ng-template>\n                        <li *ngIf=\"filter && (!optionsToDisplay || (optionsToDisplay && optionsToDisplay.length === 0))\" class=\"ui-dropdown-empty-message\">{{emptyFilterMessage}}</li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    ",
            animations: [
                trigger('overlayAnimation', [
                    state('void', style({
                        transform: 'translateY(5%)',
                        opacity: 0
                    })),
                    state('visible', style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    transition('void => visible', animate('{{showTransitionParams}}')),
                    transition('visible => void', animate('{{hideTransitionParams}}'))
                ])
            ],
            host: {
                '[class.ui-inputwrapper-filled]': 'filled',
                '[class.ui-inputwrapper-focus]': 'focused'
            },
            providers: [DROPDOWN_VALUE_ACCESSOR]
        })
    ], Dropdown);
    return Dropdown;
}());
var DropdownModule = /** @class */ (function () {
    function DropdownModule() {
    }
    DropdownModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule, ScrollingModule, TooltipModule],
            exports: [Dropdown, SharedModule, ScrollingModule],
            declarations: [Dropdown, DropdownItem]
        })
    ], DropdownModule);
    return DropdownModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { DROPDOWN_VALUE_ACCESSOR, Dropdown, DropdownItem, DropdownModule };
//# sourceMappingURL=primeng-dropdown.js.map
