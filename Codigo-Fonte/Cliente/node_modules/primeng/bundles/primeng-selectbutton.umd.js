(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/utils'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/selectbutton', ['exports', '@angular/core', '@angular/common', 'primeng/utils', '@angular/forms'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.selectbutton = {}), global.ng.core, global.ng.common, global.primeng.utils, global.ng.forms));
}(this, (function (exports, core, common, utils, forms) { 'use strict';

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
    var SELECTBUTTON_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return SelectButton; }),
        multi: true
    };
    var SelectButton = /** @class */ (function () {
        function SelectButton(cd) {
            this.cd = cd;
            this.tabindex = 0;
            this.onOptionClick = new core.EventEmitter();
            this.onChange = new core.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        Object.defineProperty(SelectButton.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (val) {
                //NoOp
            },
            enumerable: true,
            configurable: true
        });
        SelectButton.prototype.ngOnChanges = function (simpleChange) {
            if (simpleChange.options) {
                this._options = this.optionLabel ? utils.ObjectUtils.generateSelectItems(simpleChange.options.currentValue, this.optionLabel) : simpleChange.options.currentValue;
            }
        };
        SelectButton.prototype.writeValue = function (value) {
            this.value = value;
            this.cd.markForCheck();
        };
        SelectButton.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        SelectButton.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        SelectButton.prototype.setDisabledState = function (val) {
            this.disabled = val;
        };
        SelectButton.prototype.onItemClick = function (event, option, index) {
            if (this.disabled || option.disabled) {
                return;
            }
            if (this.multiple) {
                var itemIndex_1 = this.findItemIndex(option);
                if (itemIndex_1 != -1)
                    this.value = this.value.filter(function (val, i) { return i != itemIndex_1; });
                else
                    this.value = __spread(this.value || [], [option.value]);
            }
            else {
                this.value = option.value;
            }
            this.onOptionClick.emit({
                originalEvent: event,
                option: option,
                index: index
            });
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        };
        SelectButton.prototype.onFocus = function (event) {
            this.focusedItem = event.target;
        };
        SelectButton.prototype.onBlur = function (event) {
            this.focusedItem = null;
            this.onModelTouched();
        };
        SelectButton.prototype.isSelected = function (option) {
            if (this.multiple)
                return this.findItemIndex(option) != -1;
            else
                return utils.ObjectUtils.equals(option.value, this.value, this.dataKey);
        };
        SelectButton.prototype.findItemIndex = function (option) {
            var index = -1;
            if (this.value) {
                for (var i = 0; i < this.value.length; i++) {
                    if (this.value[i] == option.value) {
                        index = i;
                        break;
                    }
                }
            }
            return index;
        };
        SelectButton.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], SelectButton.prototype, "tabindex", void 0);
        __decorate([
            core.Input()
        ], SelectButton.prototype, "multiple", void 0);
        __decorate([
            core.Input()
        ], SelectButton.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], SelectButton.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], SelectButton.prototype, "ariaLabelledBy", void 0);
        __decorate([
            core.Input()
        ], SelectButton.prototype, "disabled", void 0);
        __decorate([
            core.Input()
        ], SelectButton.prototype, "dataKey", void 0);
        __decorate([
            core.Input()
        ], SelectButton.prototype, "optionLabel", void 0);
        __decorate([
            core.Output()
        ], SelectButton.prototype, "onOptionClick", void 0);
        __decorate([
            core.Output()
        ], SelectButton.prototype, "onChange", void 0);
        __decorate([
            core.ContentChild(core.TemplateRef, { static: true })
        ], SelectButton.prototype, "itemTemplate", void 0);
        __decorate([
            core.Input()
        ], SelectButton.prototype, "options", null);
        SelectButton = __decorate([
            core.Component({
                selector: 'p-selectButton',
                template: "\n        <div [ngClass]=\"'ui-selectbutton ui-buttonset ui-widget ui-corner-all ui-buttonset-' + (options ? options.length : 0)\" [ngStyle]=\"style\" [class]=\"styleClass\"  role=\"group\">\n            <div *ngFor=\"let option of options; let i = index\" #btn class=\"ui-button ui-widget ui-state-default ui-button-text-only {{option.styleClass}}\"  role=\"button\" [attr.aria-pressed]=\"isSelected(option)\"\n                [ngClass]=\"{'ui-state-active':isSelected(option), 'ui-state-disabled': disabled || option.disabled, 'ui-state-focus': btn == focusedItem, \n                'ui-button-text-icon-left': (option.icon != null), 'ui-button-icon-only': (option.icon && !option.label)}\" (click)=\"onItemClick($event,option,i)\" (keydown.enter)=\"onItemClick($event,option,i)\"\n                [attr.title]=\"option.title\" [attr.aria-label]=\"option.label\" (focus)=\"onFocus($event)\" (blur)=\"onBlur($event)\" [attr.tabindex]=\"tabindex\" [attr.aria-labelledby]=\"ariaLabelledBy\">\n                <ng-container *ngIf=\"!itemTemplate else customcontent\">\n                    <span [ngClass]=\"['ui-clickable', 'ui-button-icon-left']\" [class]=\"option.icon\" *ngIf=\"option.icon\"></span>\n                    <span class=\"ui-button-text ui-clickable\">{{option.label||'ui-btn'}}</span>\n                </ng-container>\n                <ng-template #customcontent>\n                    <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: option, index: i}\"></ng-container>\n                </ng-template>\n            </div>\n        </div>\n    ",
                providers: [SELECTBUTTON_VALUE_ACCESSOR]
            })
        ], SelectButton);
        return SelectButton;
    }());
    var SelectButtonModule = /** @class */ (function () {
        function SelectButtonModule() {
        }
        SelectButtonModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [SelectButton],
                declarations: [SelectButton]
            })
        ], SelectButtonModule);
        return SelectButtonModule;
    }());

    exports.SELECTBUTTON_VALUE_ACCESSOR = SELECTBUTTON_VALUE_ACCESSOR;
    exports.SelectButton = SelectButton;
    exports.SelectButtonModule = SelectButtonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-selectbutton.umd.js.map
