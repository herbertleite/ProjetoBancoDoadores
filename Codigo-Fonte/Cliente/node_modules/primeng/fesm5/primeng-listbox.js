import { forwardRef, EventEmitter, ElementRef, ChangeDetectorRef, Input, Output, ViewChild, ContentChild, ContentChildren, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils, FilterUtils } from 'primeng/utils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
var LISTBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Listbox; }),
    multi: true
};
var Listbox = /** @class */ (function () {
    function Listbox(el, cd) {
        this.el = el;
        this.cd = cd;
        this.checkbox = false;
        this.filter = false;
        this.filterMode = 'contains';
        this.metaKeySelection = true;
        this.showToggleAll = true;
        this.onChange = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onDblClick = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
        this.disabledSelectedOptions = [];
    }
    Object.defineProperty(Listbox.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (val) {
            var opts = this.optionLabel ? ObjectUtils.generateSelectItems(val, this.optionLabel) : val;
            this._options = opts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Listbox.prototype, "filterValue", {
        get: function () {
            return this._filterValue;
        },
        set: function (val) {
            this._filterValue = val;
        },
        enumerable: true,
        configurable: true
    });
    Listbox.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Listbox.prototype.writeValue = function (value) {
        this.value = value;
        this.setDisabledSelectedOptions();
        this.cd.markForCheck();
    };
    Listbox.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Listbox.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Listbox.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Listbox.prototype.onOptionClick = function (event, option) {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }
        if (this.multiple) {
            if (this.checkbox)
                this.onOptionClickCheckbox(event, option);
            else
                this.onOptionClickMultiple(event, option);
        }
        else {
            this.onOptionClickSingle(event, option);
        }
        this.onClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
        this.optionTouched = false;
    };
    Listbox.prototype.onOptionTouchEnd = function (event, option) {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }
        this.optionTouched = true;
    };
    Listbox.prototype.onOptionDoubleClick = function (event, option) {
        if (this.disabled || option.disabled || this.readonly) {
            return;
        }
        this.onDblClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
    };
    Listbox.prototype.onOptionClickSingle = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.value = null;
                    valueChanged = true;
                }
            }
            else {
                this.value = option.value;
                valueChanged = true;
            }
        }
        else {
            this.value = selected ? null : option.value;
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.onOptionClickMultiple = function (event, option) {
        var selected = this.isSelected(option);
        var valueChanged = false;
        var metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            var metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.removeOption(option);
                }
                else {
                    this.value = [option.value];
                }
                valueChanged = true;
            }
            else {
                this.value = (metaKey) ? this.value || [] : [];
                this.value = __spread(this.value, [option.value]);
                valueChanged = true;
            }
        }
        else {
            if (selected) {
                this.removeOption(option);
            }
            else {
                this.value = __spread(this.value || [], [option.value]);
            }
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    };
    Listbox.prototype.onOptionClickCheckbox = function (event, option) {
        if (this.disabled || this.readonly) {
            return;
        }
        var selected = this.isSelected(option);
        if (selected) {
            this.removeOption(option);
        }
        else {
            this.value = this.value ? this.value : [];
            this.value = __spread(this.value, [option.value]);
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    };
    Listbox.prototype.removeOption = function (option) {
        var _this = this;
        this.value = this.value.filter(function (val) { return !ObjectUtils.equals(val, option.value, _this.dataKey); });
    };
    Listbox.prototype.isSelected = function (option) {
        var e_1, _a;
        var selected = false;
        if (this.multiple) {
            if (this.value) {
                try {
                    for (var _b = __values(this.value), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var val = _c.value;
                        if (ObjectUtils.equals(val, option.value, this.dataKey)) {
                            selected = true;
                            break;
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
        }
        else {
            selected = ObjectUtils.equals(this.value, option.value, this.dataKey);
        }
        return selected;
    };
    Object.defineProperty(Listbox.prototype, "allChecked", {
        get: function () {
            if (this.filterValue) {
                return this.allFilteredSelected();
            }
            else {
                var optionCount = this.getEnabledOptionCount();
                var disabledSelectedOptionCount = this.disabledSelectedOptions.length;
                return this.value && this.options && (this.value.length > 0 && this.value.length == optionCount + disabledSelectedOptionCount);
            }
        },
        enumerable: true,
        configurable: true
    });
    Listbox.prototype.getEnabledOptionCount = function () {
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
    Listbox.prototype.allFilteredSelected = function () {
        var e_3, _a;
        var allSelected;
        var options = this.filterValue ? this.getFilteredOptions() : this.options;
        if (this.value && options && options.length) {
            allSelected = true;
            try {
                for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var opt = _c.value;
                    if (this.isItemVisible(opt)) {
                        if (!this.isSelected(opt)) {
                            allSelected = false;
                            break;
                        }
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
        return allSelected;
    };
    Listbox.prototype.onFilter = function (event) {
        this._filterValue = event.target.value;
    };
    Listbox.prototype.toggleAll = function (event) {
        if (this.disabled || this.readonly || !this.options || this.options.length === 0) {
            return;
        }
        if (this.allChecked) {
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
            if (this.options) {
                this.value = [];
                if (this.disabledSelectedOptions && this.disabledSelectedOptions.length > 0) {
                    this.value = __spread(this.disabledSelectedOptions);
                }
                for (var i = 0; i < this.options.length; i++) {
                    var opt = this.options[i];
                    if (this.isItemVisible(opt) && !opt.disabled) {
                        this.value.push(opt.value);
                    }
                }
            }
        }
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        event.preventDefault();
    };
    Listbox.prototype.isItemVisible = function (option) {
        if (this.filterValue) {
            var visible = void 0;
            var filterText = ObjectUtils.removeAccents(this.filterValue).toLowerCase();
            if (this.filterMode) {
                visible = FilterUtils[this.filterMode](option.label, this.filterValue);
            }
            else {
                visible = true;
            }
            return visible;
        }
        else {
            return true;
        }
    };
    Listbox.prototype.onInputFocus = function (event) {
        this.focus = true;
    };
    Listbox.prototype.onInputBlur = function (event) {
        this.focus = false;
    };
    Listbox.prototype.onOptionKeyDown = function (event, option) {
        if (this.readonly) {
            return;
        }
        var item = event.currentTarget;
        switch (event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(item);
                if (nextItem) {
                    nextItem.focus();
                }
                event.preventDefault();
                break;
            //up
            case 38:
                var prevItem = this.findPrevItem(item);
                if (prevItem) {
                    prevItem.focus();
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                this.onOptionClick(event, option);
                event.preventDefault();
                break;
        }
    };
    Listbox.prototype.findNextItem = function (item) {
        var nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem, 'ui-state-disabled') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    };
    Listbox.prototype.findPrevItem = function (item) {
        var prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem, 'ui-state-disabled') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    };
    Listbox.prototype.getFilteredOptions = function () {
        var filteredOptions = [];
        if (this.filterValue) {
            for (var i = 0; i < this.options.length; i++) {
                var opt = this.options[i];
                if (this.isItemVisible(opt) && !opt.disabled) {
                    filteredOptions.push(opt);
                }
            }
            return filteredOptions;
        }
        else {
            return this.options;
        }
    };
    Listbox.prototype.onHeaderCheckboxFocus = function () {
        this.headerCheckboxFocus = true;
    };
    Listbox.prototype.onHeaderCheckboxBlur = function () {
        this.headerCheckboxFocus = false;
    };
    Listbox.prototype.setDisabledSelectedOptions = function () {
        var e_4, _a;
        if (this.options) {
            this.disabledSelectedOptions = [];
            if (this.value) {
                try {
                    for (var _b = __values(this.options), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var opt = _c.value;
                        if (opt.disabled && this.isSelected(opt)) {
                            this.disabledSelectedOptions.push(opt.value);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
    };
    Listbox.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Listbox.prototype, "multiple", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "style", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "listStyle", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "readonly", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "checkbox", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "filter", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "filterMode", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "metaKeySelection", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "dataKey", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "showToggleAll", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "optionLabel", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "ariaFilterLabel", void 0);
    __decorate([
        Output()
    ], Listbox.prototype, "onChange", void 0);
    __decorate([
        Output()
    ], Listbox.prototype, "onClick", void 0);
    __decorate([
        Output()
    ], Listbox.prototype, "onDblClick", void 0);
    __decorate([
        ViewChild('headerchkbox', { static: true })
    ], Listbox.prototype, "headerCheckboxViewChild", void 0);
    __decorate([
        ContentChild(Header, { static: true })
    ], Listbox.prototype, "headerFacet", void 0);
    __decorate([
        ContentChild(Footer, { static: true })
    ], Listbox.prototype, "footerFacet", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], Listbox.prototype, "templates", void 0);
    __decorate([
        Input()
    ], Listbox.prototype, "options", null);
    __decorate([
        Input()
    ], Listbox.prototype, "filterValue", null);
    Listbox = __decorate([
        Component({
            selector: 'p-listbox',
            template: "\n    <div [ngClass]=\"{'ui-listbox ui-inputtext ui-widget ui-widget-content ui-corner-all':true,'ui-state-disabled':disabled,'ui-state-focus':focus}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n      <div class=\"ui-helper-hidden-accessible\">\n        <input type=\"text\" readonly=\"readonly\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\">\n      </div>\n      <div class=\"ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix\" *ngIf=\"headerFacet\">\n        <ng-content select=\"p-header\"></ng-content>\n      </div>\n      <div class=\"ui-widget-header ui-corner-all ui-listbox-header ui-helper-clearfix\" *ngIf=\"(checkbox && multiple && showToggleAll) || filter\" [ngClass]=\"{'ui-listbox-header-w-checkbox': checkbox}\">\n        <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple && showToggleAll\">\n          <div class=\"ui-helper-hidden-accessible\">\n            <input type=\"checkbox\" readonly=\"readonly\" [checked]=\"allChecked\" (focus)=\"onHeaderCheckboxFocus()\" (blur)=\"onHeaderCheckboxBlur()\" (keydown.space)=\"toggleAll($event)\">\n          </div>\n          <div #headerchkbox class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active': allChecked, 'ui-state-focus': headerCheckboxFocus}\" (click)=\"toggleAll($event)\">\n            <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':allChecked}\"></span>\n          </div>\n        </div>\n        <div class=\"ui-listbox-filter-container\" *ngIf=\"filter\">\n          <input type=\"text\" [value]=\"filterValue||''\" (input)=\"onFilter($event)\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [disabled]=\"disabled\" [attr.aria-label]=\"ariaFilterLabel\">\n          <span class=\"ui-listbox-filter-icon pi pi-search\"></span>\n        </div>\n      </div>\n      <div class=\"ui-listbox-list-wrapper\" [ngStyle]=\"listStyle\">\n        <ul class=\"ui-listbox-list\" role=\"listbox\" aria-multiselectable=\"multiple\">\n          <li *ngFor=\"let option of options; let i = index;\" [style.display]=\"isItemVisible(option) ? 'block' : 'none'\" [attr.tabindex]=\"option.disabled ? null : '0'\"\n              [ngClass]=\"{'ui-listbox-item ui-corner-all':true,'ui-state-highlight':isSelected(option), 'ui-state-disabled': option.disabled}\" role=\"option\" [attr.aria-label]=\"option.label\"\n              [attr.aria-selected]=\"isSelected(option)\" (click)=\"onOptionClick($event,option)\" (dblclick)=\"onOptionDoubleClick($event,option)\" (touchend)=\"onOptionTouchEnd($event,option)\" (keydown)=\"onOptionKeyDown($event,option)\">\n            <div class=\"ui-chkbox ui-widget\" *ngIf=\"checkbox && multiple\">\n              <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-active':isSelected(option)}\">\n                <span class=\"ui-chkbox-icon ui-clickable\" [ngClass]=\"{'pi pi-check':isSelected(option)}\"></span>\n              </div>\n            </div>\n            <span *ngIf=\"!itemTemplate\">{{option.label}}</span>\n            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: i}\"></ng-container>\n          </li>\n        </ul>\n      </div>\n      <div class=\"ui-listbox-footer ui-widget-header ui-corner-all\" *ngIf=\"footerFacet\">\n        <ng-content select=\"p-footer\"></ng-content>\n      </div>\n    </div>\n  ",
            providers: [LISTBOX_VALUE_ACCESSOR]
        })
    ], Listbox);
    return Listbox;
}());
var ListboxModule = /** @class */ (function () {
    function ListboxModule() {
    }
    ListboxModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule],
            exports: [Listbox, SharedModule],
            declarations: [Listbox]
        })
    ], ListboxModule);
    return ListboxModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { LISTBOX_VALUE_ACCESSOR, Listbox, ListboxModule };
//# sourceMappingURL=primeng-listbox.js.map
