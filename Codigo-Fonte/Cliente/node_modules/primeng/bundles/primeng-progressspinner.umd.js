(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/progressspinner', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.progressspinner = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var ProgressSpinner = /** @class */ (function () {
        function ProgressSpinner() {
            this.strokeWidth = "2";
            this.fill = "none";
            this.animationDuration = "2s";
        }
        __decorate([
            core.Input()
        ], ProgressSpinner.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], ProgressSpinner.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], ProgressSpinner.prototype, "strokeWidth", void 0);
        __decorate([
            core.Input()
        ], ProgressSpinner.prototype, "fill", void 0);
        __decorate([
            core.Input()
        ], ProgressSpinner.prototype, "animationDuration", void 0);
        ProgressSpinner = __decorate([
            core.Component({
                selector: 'p-progressSpinner',
                template: "\n        <div class=\"ui-progress-spinner\" [ngStyle]=\"style\" [ngClass]=\"styleClass\"  role=\"alert\" aria-busy=\"true\">\n            <svg class=\"ui-progress-spinner-svg\" viewBox=\"25 25 50 50\" [style.animation-duration]=\"animationDuration\">\n                <circle class=\"ui-progress-spinner-circle\" cx=\"50\" cy=\"50\" r=\"20\" [attr.fill]=\"fill\" [attr.stroke-width]=\"strokeWidth\" stroke-miterlimit=\"10\"/>\n            </svg>\n        </div>\n    "
            })
        ], ProgressSpinner);
        return ProgressSpinner;
    }());
    var ProgressSpinnerModule = /** @class */ (function () {
        function ProgressSpinnerModule() {
        }
        ProgressSpinnerModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [ProgressSpinner],
                declarations: [ProgressSpinner]
            })
        ], ProgressSpinnerModule);
        return ProgressSpinnerModule;
    }());

    exports.ProgressSpinner = ProgressSpinner;
    exports.ProgressSpinnerModule = ProgressSpinnerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-progressspinner.umd.js.map
