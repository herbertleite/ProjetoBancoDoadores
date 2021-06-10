var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Chart from 'chart.js';
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
export { UIChart };
let ChartModule = class ChartModule {
};
ChartModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [UIChart],
        declarations: [UIChart]
    })
], ChartModule);
export { ChartModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2NoYXJ0LyIsInNvdXJjZXMiOlsiY2hhcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUcsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sS0FBSyxLQUFLLE1BQU0sVUFBVSxDQUFDO0FBVWxDLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQU87SUFzQmhCLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBbEJ4QixZQUFPLEdBQVEsRUFBRSxDQUFDO1FBRWxCLFlBQU8sR0FBVSxFQUFFLENBQUM7UUFNcEIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUxQixpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBUTNCLENBQUM7SUFFNUIsSUFBSSxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLElBQUksQ0FBQyxHQUFPO1FBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBSztRQUNmLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxD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LE1BQWEsV0FBVztDQUFJLENBQUE7QUFBZixXQUFXO0lBTHZCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO0tBQzFCLENBQUM7R0FDVyxXQUFXLENBQUk7U0FBZixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LE9uRGVzdHJveSxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0ICogYXMgQ2hhcnQgZnJvbSAnY2hhcnQuanMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY2hhcnQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjpyZWxhdGl2ZVwiIFtzdHlsZS53aWR0aF09XCJyZXNwb25zaXZlICYmICF3aWR0aCA/IG51bGwgOiB3aWR0aFwiIFtzdHlsZS5oZWlnaHRdPVwicmVzcG9uc2l2ZSAmJiAhaGVpZ2h0ID8gbnVsbCA6IGhlaWdodFwiPlxuICAgICAgICAgICAgPGNhbnZhcyBbYXR0ci53aWR0aF09XCJyZXNwb25zaXZlICYmICF3aWR0aCA/IG51bGwgOiB3aWR0aFwiIFthdHRyLmhlaWdodF09XCJyZXNwb25zaXZlICYmICFoZWlnaHQgPyBudWxsIDogaGVpZ2h0XCIgKGNsaWNrKT1cIm9uQ2FudmFzQ2xpY2soJGV2ZW50KVwiPjwvY2FudmFzPlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFVJQ2hhcnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgb3B0aW9uczogYW55ID0ge307XG5cbiAgICBASW5wdXQoKSBwbHVnaW5zOiBhbnlbXSA9IFtdO1xuICAgIFxuICAgIEBJbnB1dCgpIHdpZHRoOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgaGVpZ2h0OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSByZXNwb25zaXZlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25EYXRhU2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xuICAgIFxuICAgIF9kYXRhOiBhbnk7XG5cbiAgICBjaGFydDogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuICAgIFxuICAgIEBJbnB1dCgpIGdldCBkYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH1cblxuICAgIHNldCBkYXRhKHZhbDphbnkpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHZhbDtcbiAgICAgICAgdGhpcy5yZWluaXQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdENoYXJ0KCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQ2FudmFzQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgICAgICAgIGxldCBlbGVtZW50ID0gdGhpcy5jaGFydC5nZXRFbGVtZW50QXRFdmVudChldmVudCk7XG4gICAgICAgICAgICBsZXQgZGF0YXNldCA9IHRoaXMuY2hhcnQuZ2V0RGF0YXNldEF0RXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQmJmVsZW1lbnRbMF0mJmRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRGF0YVNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgZWxlbWVudDogZWxlbWVudFswXSwgZGF0YXNldDogZGF0YXNldH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdENoYXJ0KCkge1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMub3B0aW9uc3x8e307XG4gICAgICAgIG9wdHMucmVzcG9uc2l2ZSA9IHRoaXMucmVzcG9uc2l2ZTtcblxuICAgICAgICAvLyBhbGxvd3MgY2hhcnQgdG8gcmVzaXplIGluIHJlc3BvbnNpdmUgbW9kZVxuICAgICAgICBpZiAob3B0cy5yZXNwb25zaXZlJiYodGhpcy5oZWlnaHR8fHRoaXMud2lkdGgpKSB7XG4gICAgICAgICAgICBvcHRzLm1haW50YWluQXNwZWN0UmF0aW8gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hhcnQgPSBuZXcgQ2hhcnQodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLCB7XG4gICAgICAgICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICAgICAgICBkYXRhOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgICBwbHVnaW5zOiB0aGlzLnBsdWdpbnNcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGdldENhbnZhcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXS5jaGlsZHJlblswXTtcbiAgICB9XG4gICAgXG4gICAgZ2V0QmFzZTY0SW1hZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJ0LnRvQmFzZTY0SW1hZ2UoKTtcbiAgICB9XG4gICAgXG4gICAgZ2VuZXJhdGVMZWdlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGFydC5nZW5lcmF0ZUxlZ2VuZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIGlmICh0aGlzLmNoYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLmNoYXJ0LnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlaW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhcnQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0Q2hhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhcnQuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5jaGFydCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1VJQ2hhcnRdLFxuICAgIGRlY2xhcmF0aW9uczogW1VJQ2hhcnRdXG59KVxuZXhwb3J0IGNsYXNzIENoYXJ0TW9kdWxlIHsgfVxuIl19