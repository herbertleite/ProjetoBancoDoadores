import { forwardRef, EventEmitter, ChangeDetectorRef, Input, Output, ViewChild, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RadioButton; }),
    multi: true
};
var RadioButton = /** @class */ (function () {
    function RadioButton(cd) {
        this.cd = cd;
        this.onClick = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    RadioButton.prototype.handleClick = function (event, radioButton, focus) {
        event.preventDefault();
        if (this.disabled) {
            return;
        }
        this.select(event);
        if (focus) {
            radioButton.focus();
        }
    };
    RadioButton.prototype.select = function (event) {
        if (!this.disabled) {
            this.inputViewChild.nativeElement.checked = true;
            this.checked = true;
            this.onModelChange(this.value);
            this.onClick.emit(event);
        }
    };
    RadioButton.prototype.writeValue = function (value) {
        this.checked = (value == this.value);
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            this.inputViewChild.nativeElement.checked = this.checked;
        }
        this.cd.markForCheck();
    };
    RadioButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    RadioButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    RadioButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    RadioButton.prototype.onInputFocus = function (event) {
        this.focused = true;
        this.onFocus.emit(event);
    };
    RadioButton.prototype.onInputBlur = function (event) {
        this.focused = false;
        this.onModelTouched();
        this.onBlur.emit(event);
    };
    RadioButton.prototype.onChange = function (event) {
        this.select(event);
    };
    RadioButton.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], RadioButton.prototype, "value", void 0);
    __decorate([
        Input()
    ], RadioButton.prototype, "name", void 0);
    __decorate([
        Input()
    ], RadioButton.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], RadioButton.prototype, "label", void 0);
    __decorate([
        Input()
    ], RadioButton.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], RadioButton.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], RadioButton.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Input()
    ], RadioButton.prototype, "style", void 0);
    __decorate([
        Input()
    ], RadioButton.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], RadioButton.prototype, "labelStyleClass", void 0);
    __decorate([
        Output()
    ], RadioButton.prototype, "onClick", void 0);
    __decorate([
        Output()
    ], RadioButton.prototype, "onFocus", void 0);
    __decorate([
        Output()
    ], RadioButton.prototype, "onBlur", void 0);
    __decorate([
        ViewChild('rb', { static: true })
    ], RadioButton.prototype, "inputViewChild", void 0);
    RadioButton = __decorate([
        Component({
            selector: 'p-radioButton',
            template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"'ui-radiobutton ui-widget'\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #rb type=\"radio\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.value]=\"value\" [attr.tabindex]=\"tabindex\" [attr.aria-labelledby]=\"ariaLabelledBy\"\n                    [checked]=\"checked\" (change)=\"onChange($event)\" (focus)=\"onInputFocus($event)\" (blur)=\"onInputBlur($event)\" [disabled]=\"disabled\">\n            </div>\n            <div (click)=\"handleClick($event, rb, true)\" role=\"radio\" [attr.aria-checked]=\"checked\"\n                [ngClass]=\"{'ui-radiobutton-box ui-widget ui-state-default':true,\n                'ui-state-active':rb.checked,'ui-state-disabled':disabled,'ui-state-focus':focused}\">\n                <span class=\"ui-radiobutton-icon ui-clickable\" [ngClass]=\"{'pi pi-circle-on':rb.checked}\"></span>\n            </div>\n        </div>\n        <label (click)=\"select($event)\" [class]=\"labelStyleClass\"\n            [ngClass]=\"{'ui-radiobutton-label':true, 'ui-label-active':rb.checked, 'ui-label-disabled':disabled, 'ui-label-focus':focused}\"\n            *ngIf=\"label\" [attr.for]=\"inputId\">{{label}}</label>\n    ",
            providers: [RADIO_VALUE_ACCESSOR]
        })
    ], RadioButton);
    return RadioButton;
}());
var RadioButtonModule = /** @class */ (function () {
    function RadioButtonModule() {
    }
    RadioButtonModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [RadioButton],
            declarations: [RadioButton]
        })
    ], RadioButtonModule);
    return RadioButtonModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { RADIO_VALUE_ACCESSOR, RadioButton, RadioButtonModule };
//# sourceMappingURL=primeng-radiobutton.js.map
