(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/inputtext', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.inputtext = {}), global.ng.core, global.ng.forms, global.ng.common));
}(this, (function (exports, core, forms, common) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var InputText = /** @class */ (function () {
        function InputText(el, ngModel) {
            this.el = el;
            this.ngModel = ngModel;
        }
        InputText.prototype.ngDoCheck = function () {
            this.updateFilledState();
        };
        //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
        InputText.prototype.onInput = function (e) {
            this.updateFilledState();
        };
        InputText.prototype.updateFilledState = function () {
            this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) ||
                (this.ngModel && this.ngModel.model);
        };
        InputText.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: forms.NgModel, decorators: [{ type: core.Optional }] }
        ]; };
        __decorate([
            core.HostListener('input', ['$event'])
        ], InputText.prototype, "onInput", null);
        InputText = __decorate([
            core.Directive({
                selector: '[pInputText]',
                host: {
                    '[class.ui-inputtext]': 'true',
                    '[class.ui-corner-all]': 'true',
                    '[class.ui-state-default]': 'true',
                    '[class.ui-widget]': 'true',
                    '[class.ui-state-filled]': 'filled'
                }
            }),
            __param(1, core.Optional())
        ], InputText);
        return InputText;
    }());
    var InputTextModule = /** @class */ (function () {
        function InputTextModule() {
        }
        InputTextModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [InputText],
                declarations: [InputText]
            })
        ], InputTextModule);
        return InputTextModule;
    }());

    exports.InputText = InputText;
    exports.InputTextModule = InputTextModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-inputtext.umd.js.map
