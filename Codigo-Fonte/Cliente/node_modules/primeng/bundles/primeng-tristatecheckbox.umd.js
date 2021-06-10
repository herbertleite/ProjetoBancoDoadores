(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/tristatecheckbox', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.tristatecheckbox = {}), global.ng.core, global.ng.common, global.ng.forms));
}(this, (function (exports, core, common, forms) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var TRISTATECHECKBOX_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return TriStateCheckbox; }),
        multi: true
    };
    var TriStateCheckbox = /** @class */ (function () {
        function TriStateCheckbox(cd) {
            this.cd = cd;
            this.onChange = new core.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        TriStateCheckbox.prototype.onClick = function (event, input) {
            if (!this.disabled && !this.readonly) {
                this.toggle(event);
                this.focus = true;
                input.focus();
            }
        };
        TriStateCheckbox.prototype.onKeydown = function (event) {
            if (event.keyCode == 32) {
                event.preventDefault();
            }
        };
        TriStateCheckbox.prototype.onKeyup = function (event) {
            if (event.keyCode == 32 && !this.readonly) {
                this.toggle(event);
                event.preventDefault();
            }
        };
        TriStateCheckbox.prototype.toggle = function (event) {
            if (this.value == null || this.value == undefined)
                this.value = true;
            else if (this.value == true)
                this.value = false;
            else if (this.value == false)
                this.value = null;
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        };
        TriStateCheckbox.prototype.onFocus = function () {
            this.focus = true;
        };
        TriStateCheckbox.prototype.onBlur = function () {
            this.focus = false;
            this.onModelTouched();
        };
        TriStateCheckbox.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        TriStateCheckbox.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        TriStateCheckbox.prototype.writeValue = function (value) {
            this.value = value;
            this.cd.markForCheck();
        };
        TriStateCheckbox.prototype.setDisabledState = function (disabled) {
            this.disabled = disabled;
        };
        TriStateCheckbox.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], TriStateCheckbox.prototype, "disabled", void 0);
        __decorate([
            core.Input()
        ], TriStateCheckbox.prototype, "name", void 0);
        __decorate([
            core.Input()
        ], TriStateCheckbox.prototype, "ariaLabelledBy", void 0);
        __decorate([
            core.Input()
        ], TriStateCheckbox.prototype, "tabindex", void 0);
        __decorate([
            core.Input()
        ], TriStateCheckbox.prototype, "inputId", void 0);
        __decorate([
            core.Input()
        ], TriStateCheckbox.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], TriStateCheckbox.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], TriStateCheckbox.prototype, "label", void 0);
        __decorate([
            core.Input()
        ], TriStateCheckbox.prototype, "readonly", void 0);
        __decorate([
            core.Output()
        ], TriStateCheckbox.prototype, "onChange", void 0);
        TriStateCheckbox = __decorate([
            core.Component({
                selector: 'p-triStateCheckbox',
                template: "\n        <div [ngStyle]=\"style\" [ngClass]=\"{'ui-chkbox ui-tristatechkbox ui-widget': true,'ui-chkbox-readonly': readonly}\" [class]=\"styleClass\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #input type=\"text\" [attr.id]=\"inputId\" [name]=\"name\" [attr.tabindex]=\"tabindex\" [readonly]=\"readonly\" [disabled]=\"disabled\" (keyup)=\"onKeyup($event)\" (keydown)=\"onKeydown($event)\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [attr.aria-labelledby]=\"ariaLabelledBy\">\n            </div>\n            <div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" (click)=\"onClick($event,input)\"  role=\"checkbox\" [attr.aria-checked]=\"value === true\"\n                [ngClass]=\"{'ui-state-active':value!=null,'ui-state-disabled':disabled,'ui-state-focus':focus}\">\n                <span class=\"ui-chkbox-icon pi ui-clickable\" [ngClass]=\"{'pi-check':value==true,'pi-times':value==false}\"></span>\n            </div>\n        </div>\n        <label class=\"ui-chkbox-label\" (click)=\"onClick($event,input)\"\n               [ngClass]=\"{'ui-label-active':value!=null, 'ui-label-disabled':disabled, 'ui-label-focus':focus}\"\n               *ngIf=\"label\" [attr.for]=\"inputId\">{{label}}</label>\n    ",
                providers: [TRISTATECHECKBOX_VALUE_ACCESSOR]
            })
        ], TriStateCheckbox);
        return TriStateCheckbox;
    }());
    var TriStateCheckboxModule = /** @class */ (function () {
        function TriStateCheckboxModule() {
        }
        TriStateCheckboxModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [TriStateCheckbox],
                declarations: [TriStateCheckbox]
            })
        ], TriStateCheckboxModule);
        return TriStateCheckboxModule;
    }());

    exports.TRISTATECHECKBOX_VALUE_ACCESSOR = TRISTATECHECKBOX_VALUE_ACCESSOR;
    exports.TriStateCheckbox = TriStateCheckbox;
    exports.TriStateCheckboxModule = TriStateCheckboxModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tristatecheckbox.umd.js.map
