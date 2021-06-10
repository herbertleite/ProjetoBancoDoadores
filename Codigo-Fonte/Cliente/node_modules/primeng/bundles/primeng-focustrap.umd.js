(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/focustrap', ['exports', '@angular/core', '@angular/common', 'primeng/dom'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.focustrap = {}), global.ng.core, global.ng.common, global.primeng.dom));
}(this, (function (exports, core, common, dom) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var FocusTrap = /** @class */ (function () {
        function FocusTrap(el) {
            this.el = el;
        }
        FocusTrap.prototype.onkeydown = function (e) {
            if (e.which === 9) {
                e.preventDefault();
                var focusableElements = dom.DomHandler.getFocusableElements(this.el.nativeElement);
                if (focusableElements && focusableElements.length > 0) {
                    if (!document.activeElement) {
                        focusableElements[0].focus();
                    }
                    else {
                        var focusedIndex = focusableElements.indexOf(document.activeElement);
                        if (e.shiftKey) {
                            if (focusedIndex == -1 || focusedIndex === 0)
                                focusableElements[focusableElements.length - 1].focus();
                            else
                                focusableElements[focusedIndex - 1].focus();
                        }
                        else {
                            if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                                focusableElements[0].focus();
                            else
                                focusableElements[focusedIndex + 1].focus();
                        }
                    }
                }
            }
        };
        FocusTrap.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.HostListener('keydown', ['$event'])
        ], FocusTrap.prototype, "onkeydown", null);
        FocusTrap = __decorate([
            core.Directive({
                selector: '[pFocusTrap]',
            })
        ], FocusTrap);
        return FocusTrap;
    }());
    var FocusTrapModule = /** @class */ (function () {
        function FocusTrapModule() {
        }
        FocusTrapModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [FocusTrap],
                declarations: [FocusTrap]
            })
        ], FocusTrapModule);
        return FocusTrapModule;
    }());

    exports.FocusTrap = FocusTrap;
    exports.FocusTrapModule = FocusTrapModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-focustrap.umd.js.map
