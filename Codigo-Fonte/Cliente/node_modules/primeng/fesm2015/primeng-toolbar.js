import { ElementRef, Input, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Toolbar = class Toolbar {
    constructor(el) {
        this.el = el;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
};
Toolbar.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], Toolbar.prototype, "style", void 0);
__decorate([
    Input()
], Toolbar.prototype, "styleClass", void 0);
Toolbar = __decorate([
    Component({
        selector: 'p-toolbar',
        template: `
        <div [ngClass]="'ui-toolbar ui-widget ui-widget-header ui-corner-all ui-helper-clearfix'" [ngStyle]="style" [class]="styleClass" role="toolbar">
            <ng-content></ng-content>
        </div>
    `
    })
], Toolbar);
let ToolbarModule = class ToolbarModule {
};
ToolbarModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Toolbar],
        declarations: [Toolbar]
    })
], ToolbarModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Toolbar, ToolbarModule };
//# sourceMappingURL=primeng-toolbar.js.map
