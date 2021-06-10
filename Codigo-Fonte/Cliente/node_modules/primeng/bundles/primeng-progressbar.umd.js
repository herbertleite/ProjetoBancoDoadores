(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/progressbar', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.progressbar = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var ProgressBar = /** @class */ (function () {
        function ProgressBar() {
            this.showValue = true;
            this.unit = '%';
            this.mode = 'determinate';
        }
        __decorate([
            core.Input()
        ], ProgressBar.prototype, "value", void 0);
        __decorate([
            core.Input()
        ], ProgressBar.prototype, "showValue", void 0);
        __decorate([
            core.Input()
        ], ProgressBar.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], ProgressBar.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], ProgressBar.prototype, "unit", void 0);
        __decorate([
            core.Input()
        ], ProgressBar.prototype, "mode", void 0);
        ProgressBar = __decorate([
            core.Component({
                selector: 'p-progressBar',
                template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" role=\"progressbar\" aria-valuemin=\"0\" [attr.aria-valuenow]=\"value\" aria-valuemax=\"100\"\n            [ngClass]=\"{'ui-progressbar ui-widget ui-widget-content ui-corner-all': true, 'ui-progressbar-determinate': (mode === 'determinate'), 'ui-progressbar-indeterminate': (mode === 'indeterminate')}\">\n            <div class=\"ui-progressbar-value ui-progressbar-value-animate ui-widget-header ui-corner-all\" [style.width]=\"value + '%'\" style=\"display:block\"></div>\n            <div class=\"ui-progressbar-label\" [style.display]=\"value != null ? 'block' : 'none'\" *ngIf=\"showValue\">{{value}}{{unit}}</div>\n        </div>\n    "
            })
        ], ProgressBar);
        return ProgressBar;
    }());
    var ProgressBarModule = /** @class */ (function () {
        function ProgressBarModule() {
        }
        ProgressBarModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [ProgressBar],
                declarations: [ProgressBar]
            })
        ], ProgressBarModule);
        return ProgressBarModule;
    }());

    exports.ProgressBar = ProgressBar;
    exports.ProgressBarModule = ProgressBarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-progressbar.umd.js.map
