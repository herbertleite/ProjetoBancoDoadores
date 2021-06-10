(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('chart.js')) :
    typeof define === 'function' && define.amd ? define('primeng/chart', ['exports', '@angular/core', '@angular/common', 'chart.js'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.chart = {}), global.ng.core, global.ng.common, global.Chart));
}(this, (function (exports, core, common, Chart) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var UIChart = /** @class */ (function () {
        function UIChart(el) {
            this.el = el;
            this.options = {};
            this.plugins = [];
            this.responsive = true;
            this.onDataSelect = new core.EventEmitter();
        }
        Object.defineProperty(UIChart.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (val) {
                this._data = val;
                this.reinit();
            },
            enumerable: true,
            configurable: true
        });
        UIChart.prototype.ngAfterViewInit = function () {
            this.initChart();
            this.initialized = true;
        };
        UIChart.prototype.onCanvasClick = function (event) {
            if (this.chart) {
                var element = this.chart.getElementAtEvent(event);
                var dataset = this.chart.getDatasetAtEvent(event);
                if (element && element[0] && dataset) {
                    this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
                }
            }
        };
        UIChart.prototype.initChart = function () {
            var opts = this.options || {};
            opts.responsive = this.responsive;
            // allows chart to resize in responsive mode
            if (opts.responsive && (this.height || this.width)) {
                opts.maintainAspectRatio = false;
            }
            this.chart = new Chart(this.el.nativeElement.children[0].children[0], {
                type: this.type,
                data: this.data,
                options: this.options,
                plugins: this.plugins
            });
        };
        UIChart.prototype.getCanvas = function () {
            return this.el.nativeElement.children[0].children[0];
        };
        UIChart.prototype.getBase64Image = function () {
            return this.chart.toBase64Image();
        };
        UIChart.prototype.generateLegend = function () {
            if (this.chart) {
                return this.chart.generateLegend();
            }
        };
        UIChart.prototype.refresh = function () {
            if (this.chart) {
                this.chart.update();
            }
        };
        UIChart.prototype.reinit = function () {
            if (this.chart) {
                this.chart.destroy();
                this.initChart();
            }
        };
        UIChart.prototype.ngOnDestroy = function () {
            if (this.chart) {
                this.chart.destroy();
                this.initialized = false;
                this.chart = null;
            }
        };
        UIChart.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], UIChart.prototype, "type", void 0);
        __decorate([
            core.Input()
        ], UIChart.prototype, "options", void 0);
        __decorate([
            core.Input()
        ], UIChart.prototype, "plugins", void 0);
        __decorate([
            core.Input()
        ], UIChart.prototype, "width", void 0);
        __decorate([
            core.Input()
        ], UIChart.prototype, "height", void 0);
        __decorate([
            core.Input()
        ], UIChart.prototype, "responsive", void 0);
        __decorate([
            core.Output()
        ], UIChart.prototype, "onDataSelect", void 0);
        __decorate([
            core.Input()
        ], UIChart.prototype, "data", null);
        UIChart = __decorate([
            core.Component({
                selector: 'p-chart',
                template: "\n        <div style=\"position:relative\" [style.width]=\"responsive && !width ? null : width\" [style.height]=\"responsive && !height ? null : height\">\n            <canvas [attr.width]=\"responsive && !width ? null : width\" [attr.height]=\"responsive && !height ? null : height\" (click)=\"onCanvasClick($event)\"></canvas>\n        </div>\n    "
            })
        ], UIChart);
        return UIChart;
    }());
    var ChartModule = /** @class */ (function () {
        function ChartModule() {
        }
        ChartModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [UIChart],
                declarations: [UIChart]
            })
        ], ChartModule);
        return ChartModule;
    }());

    exports.ChartModule = ChartModule;
    exports.UIChart = UIChart;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-chart.umd.js.map
