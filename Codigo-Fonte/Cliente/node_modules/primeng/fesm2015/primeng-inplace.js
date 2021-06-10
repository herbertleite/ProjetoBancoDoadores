import { Component, EventEmitter, Input, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let InplaceDisplay = class InplaceDisplay {
};
InplaceDisplay = __decorate([
    Component({
        selector: 'p-inplaceDisplay',
        template: '<ng-content></ng-content>'
    })
], InplaceDisplay);
let InplaceContent = class InplaceContent {
};
InplaceContent = __decorate([
    Component({
        selector: 'p-inplaceContent',
        template: '<ng-content></ng-content>'
    })
], InplaceContent);
let Inplace = class Inplace {
    constructor() {
        this.onActivate = new EventEmitter();
        this.onDeactivate = new EventEmitter();
    }
    activate(event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
        }
    }
    deactivate(event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
        }
    }
    onKeydown(event) {
        if (event.which === 13) {
            this.activate(event);
            event.preventDefault();
        }
    }
};
__decorate([
    Input()
], Inplace.prototype, "active", void 0);
__decorate([
    Input()
], Inplace.prototype, "closable", void 0);
__decorate([
    Input()
], Inplace.prototype, "disabled", void 0);
__decorate([
    Input()
], Inplace.prototype, "style", void 0);
__decorate([
    Input()
], Inplace.prototype, "styleClass", void 0);
__decorate([
    Output()
], Inplace.prototype, "onActivate", void 0);
__decorate([
    Output()
], Inplace.prototype, "onDeactivate", void 0);
Inplace = __decorate([
    Component({
        selector: 'p-inplace',
        template: `
        <div [ngClass]="{'ui-inplace ui-widget': true, 'ui-inplace-closable': closable}" [ngStyle]="style" [class]="styleClass">
            <div class="ui-inplace-display" (click)="activate($event)" tabindex="0" (keydown)="onKeydown($event)"   
                [ngClass]="{'ui-state-disabled':disabled}" *ngIf="!active">
                <ng-content select="[pInplaceDisplay]"></ng-content>
            </div>
            <div class="ui-inplace-content" *ngIf="active">
                <ng-content select="[pInplaceContent]"></ng-content>
                <button type="button" icon="pi pi-times" pButton (click)="deactivate($event)" *ngIf="closable"></button>
            </div>
        </div>
    `
    })
], Inplace);
let InplaceModule = class InplaceModule {
};
InplaceModule = __decorate([
    NgModule({
        imports: [CommonModule, ButtonModule],
        exports: [Inplace, InplaceDisplay, InplaceContent, ButtonModule],
        declarations: [Inplace, InplaceDisplay, InplaceContent]
    })
], InplaceModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Inplace, InplaceContent, InplaceDisplay, InplaceModule };
//# sourceMappingURL=primeng-inplace.js.map
