import { forwardRef, EventEmitter, Input, Output, ViewChild, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TOGGLEBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ToggleButton; }),
    multi: true
};
var ToggleButton = /** @class */ (function () {
    function ToggleButton() {
        this.onLabel = 'Yes';
        this.offLabel = 'No';
        this.iconPos = 'left';
        this.onChange = new EventEmitter();
        this.checked = false;
        this.focus = false;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    ToggleButton.prototype.ngAfterViewInit = function () {
        if (this.checkboxViewChild) {
            this.checkbox = this.checkboxViewChild.nativeElement;
        }
    };
    ToggleButton.prototype.toggle = function (event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            if (this.checkbox) {
                this.checkbox.focus();
            }
        }
    };
    ToggleButton.prototype.onFocus = function () {
        this.focus = true;
    };
    ToggleButton.prototype.onBlur = function () {
        this.focus = false;
        this.onModelTouched();
    };
    ToggleButton.prototype.writeValue = function (value) {
        this.checked = value;
    };
    ToggleButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    ToggleButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    ToggleButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Object.defineProperty(ToggleButton.prototype, "hasOnLabel", {
        get: function () {
            return this.onLabel && this.onLabel.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleButton.prototype, "hasOffLabel", {
        get: function () {
            return this.onLabel && this.onLabel.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input()
    ], ToggleButton.prototype, "onLabel", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "offLabel", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "onIcon", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "offIcon", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "style", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "iconPos", void 0);
    __decorate([
        Output()
    ], ToggleButton.prototype, "onChange", void 0);
    __decorate([
        ViewChild('checkbox', { static: true })
    ], ToggleButton.prototype, "checkboxViewChild", void 0);
    ToggleButton = __decorate([
        Component({
            selector: 'p-toggleButton',
            template: "\n        <div [ngClass]=\"{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon && !offIcon), \n                'ui-button-text-icon-left': (onIcon && offIcon && hasOnLabel && hasOffLabel && iconPos === 'left'), \n                'ui-button-text-icon-right': (onIcon && offIcon && hasOnLabel && hasOffLabel && iconPos === 'right'),'ui-button-icon-only': (onIcon && offIcon && !hasOnLabel && !hasOffLabel),\n                'ui-state-active': checked,'ui-state-focus':focus,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\" \n                (click)=\"toggle($event)\" (keydown.enter)=\"toggle($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #checkbox type=\"checkbox\" [attr.id]=\"inputId\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [attr.tabindex]=\"tabindex\"\n                    role=\"button\" [attr.aria-pressed]=\"checked\" [attr.aria-labelledby]=\"ariaLabelledBy\">\n            </div>\n            <span *ngIf=\"onIcon||offIcon\" class=\"ui-button-icon-left\" [class]=\"checked ? this.onIcon : this.offIcon\" [ngClass]=\"{'ui-button-icon-left': (iconPos === 'left'), \n            'ui-button-icon-right': (iconPos === 'right')}\"></span>\n            <span class=\"ui-button-text ui-unselectable-text\">{{checked ? hasOnLabel ? onLabel : 'ui-btn' : hasOffLabel ? offLabel : 'ui-btn'}}</span>\n        </div>\n    ",
            providers: [TOGGLEBUTTON_VALUE_ACCESSOR]
        })
    ], ToggleButton);
    return ToggleButton;
}());
var ToggleButtonModule = /** @class */ (function () {
    function ToggleButtonModule() {
    }
    ToggleButtonModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [ToggleButton],
            declarations: [ToggleButton]
        })
    ], ToggleButtonModule);
    return ToggleButtonModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { TOGGLEBUTTON_VALUE_ACCESSOR, ToggleButton, ToggleButtonModule };
//# sourceMappingURL=primeng-togglebutton.js.map
