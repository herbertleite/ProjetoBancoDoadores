(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/inputtextarea', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.inputtextarea = {}), global.ng.core, global.ng.forms, global.ng.common));
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
    var InputTextarea = /** @class */ (function () {
        function InputTextarea(el, ngModel) {
            this.el = el;
            this.ngModel = ngModel;
            this.onResize = new core.EventEmitter();
        }
        InputTextarea.prototype.ngDoCheck = function () {
            this.updateFilledState();
            if (this.autoResize) {
                this.resize();
            }
        };
        //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
        InputTextarea.prototype.onInput = function (e) {
            this.updateFilledState();
            if (this.autoResize) {
                this.resize(e);
            }
        };
        InputTextarea.prototype.updateFilledState = function () {
            this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
        };
        InputTextarea.prototype.onFocus = function (e) {
            if (this.autoResize) {
                this.resize(e);
            }
        };
        InputTextarea.prototype.onBlur = function (e) {
            if (this.autoResize) {
                this.resize(e);
            }
        };
        InputTextarea.prototype.resize = function (event) {
            this.el.nativeElement.style.height = 'auto';
            this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';
            if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
                this.el.nativeElement.style.overflowY = "scroll";
                this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
            }
            else {
                this.el.nativeElement.style.overflow = "hidden";
            }
            this.onResize.emit(event || {});
        };
        InputTextarea.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: forms.NgModel, decorators: [{ type: core.Optional }] }
        ]; };
        __decorate([
            core.Input()
        ], InputTextarea.prototype, "autoResize", void 0);
        __decorate([
            core.Output()
        ], InputTextarea.prototype, "onResize", void 0);
        __decorate([
            core.HostListener('input', ['$event'])
        ], InputTextarea.prototype, "onInput", null);
        __decorate([
            core.HostListener('focus', ['$event'])
        ], InputTextarea.prototype, "onFocus", null);
        __decorate([
            core.HostListener('blur', ['$event'])
        ], InputTextarea.prototype, "onBlur", null);
        InputTextarea = __decorate([
            core.Directive({
                selector: '[pInputTextarea]',
                host: {
                    '[class.ui-inputtext]': 'true',
                    '[class.ui-corner-all]': 'true',
                    '[class.ui-inputtextarea-resizable]': 'autoResize',
                    '[class.ui-state-default]': 'true',
                    '[class.ui-widget]': 'true',
                    '[class.ui-state-filled]': 'filled'
                }
            }),
            __param(1, core.Optional())
        ], InputTextarea);
        return InputTextarea;
    }());
    var InputTextareaModule = /** @class */ (function () {
        function InputTextareaModule() {
        }
        InputTextareaModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [InputTextarea],
                declarations: [InputTextarea]
            })
        ], InputTextareaModule);
        return InputTextareaModule;
    }());

    exports.InputTextarea = InputTextarea;
    exports.InputTextareaModule = InputTextareaModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-inputtextarea.umd.js.map
