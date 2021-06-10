import { Input, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ProgressBar = class ProgressBar {
    constructor() {
        this.showValue = true;
        this.unit = '%';
        this.mode = 'determinate';
    }
};
__decorate([
    Input()
], ProgressBar.prototype, "value", void 0);
__decorate([
    Input()
], ProgressBar.prototype, "showValue", void 0);
__decorate([
    Input()
], ProgressBar.prototype, "style", void 0);
__decorate([
    Input()
], ProgressBar.prototype, "styleClass", void 0);
__decorate([
    Input()
], ProgressBar.prototype, "unit", void 0);
__decorate([
    Input()
], ProgressBar.prototype, "mode", void 0);
ProgressBar = __decorate([
    Component({
        selector: 'p-progressBar',
        template: `
        <div [class]="styleClass" [ngStyle]="style" role="progressbar" aria-valuemin="0" [attr.aria-valuenow]="value" aria-valuemax="100"
            [ngClass]="{'ui-progressbar ui-widget ui-widget-content ui-corner-all': true, 'ui-progressbar-determinate': (mode === 'determinate'), 'ui-progressbar-indeterminate': (mode === 'indeterminate')}">
            <div class="ui-progressbar-value ui-progressbar-value-animate ui-widget-header ui-corner-all" [style.width]="value + '%'" style="display:block"></div>
            <div class="ui-progressbar-label" [style.display]="value != null ? 'block' : 'none'" *ngIf="showValue">{{value}}{{unit}}</div>
        </div>
    `
    })
], ProgressBar);
let ProgressBarModule = class ProgressBarModule {
};
ProgressBarModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [ProgressBar],
        declarations: [ProgressBar]
    })
], ProgressBarModule);

/**
 * Generated bundle index. Do not edit.
 */

export { ProgressBar, ProgressBarModule };
//# sourceMappingURL=primeng-progressbar.js.map
