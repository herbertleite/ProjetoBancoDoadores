import { EventEmitter, ElementRef, Input, Output, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Chart from 'chart.js';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let UIChart = class UIChart {
    constructor(el) {
        this.el = el;
        this.options = {};
        this.plugins = [];
        this.responsive = true;
        this.onDataSelect = new EventEmitter();
    }
    get data() {
        return this._data;
    }
    set data(val) {
        this._data = val;
        this.reinit();
    }
    ngAfterViewInit() {
        this.initChart();
        this.initialized = true;
    }
    onCanvasClick(event) {
        if (this.chart) {
            let element = this.chart.getElementAtEvent(event);
            let dataset = this.chart.getDatasetAtEvent(event);
            if (element && element[0] && dataset) {
                this.onDataSelect.emit({ originalEvent: event, element: element[0], dataset: dataset });
            }
        }
    }
    initChart() {
        let opts = this.options || {};
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
    }
    getCanvas() {
        return this.el.nativeElement.children[0].children[0];
    }
    getBase64Image() {
        return this.chart.toBase64Image();
    }
    generateLegend() {
        if (this.chart) {
            return this.chart.generateLegend();
        }
    }
    refresh() {
        if (this.chart) {
            this.chart.update();
        }
    }
    reinit() {
        if (this.chart) {
            this.chart.destroy();
            this.initChart();
        }
    }
    ngOnDestroy() {
        if (this.chart) {
            this.chart.destroy();
            this.initialized = false;
            this.chart = null;
        }
    }
};
UIChart.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], UIChart.prototype, "type", void 0);
__decorate([
    Input()
], UIChart.prototype, "options", void 0);
__decorate([
    Input()
], UIChart.prototype, "plugins", void 0);
__decorate([
    Input()
], UIChart.prototype, "width", void 0);
__decorate([
    Input()
], UIChart.prototype, "height", void 0);
__decorate([
    Input()
], UIChart.prototype, "responsive", void 0);
__decorate([
    Output()
], UIChart.prototype, "onDataSelect", void 0);
__decorate([
    Input()
], UIChart.prototype, "data", null);
UIChart = __decorate([
    Component({
        selector: 'p-chart',
        template: `
        <div style="position:relative" [style.width]="responsive && !width ? null : width" [style.height]="responsive && !height ? null : height">
            <canvas [attr.width]="responsive && !width ? null : width" [attr.height]="responsive && !height ? null : height" (click)="onCanvasClick($event)"></canvas>
        </div>
    `
    })
], UIChart);
let ChartModule = class ChartModule {
};
ChartModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [UIChart],
        declarations: [UIChart]
    })
], ChartModule);

/**
 * Generated bundle index. Do not edit.
 */

export { ChartModule, UIChart };
//# sourceMappingURL=primeng-chart.js.map
