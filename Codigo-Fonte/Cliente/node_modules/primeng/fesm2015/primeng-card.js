import { ElementRef, Input, ContentChild, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, Footer, SharedModule } from 'primeng/api';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Card = class Card {
    constructor(el) {
        this.el = el;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
};
Card.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], Card.prototype, "header", void 0);
__decorate([
    Input()
], Card.prototype, "subheader", void 0);
__decorate([
    Input()
], Card.prototype, "style", void 0);
__decorate([
    Input()
], Card.prototype, "styleClass", void 0);
__decorate([
    ContentChild(Header, { static: true })
], Card.prototype, "headerFacet", void 0);
__decorate([
    ContentChild(Footer, { static: true })
], Card.prototype, "footerFacet", void 0);
Card = __decorate([
    Component({
        selector: 'p-card',
        template: `
        <div [ngClass]="'ui-card ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-card-header" *ngIf="headerFacet">
               <ng-content select="p-header"></ng-content>
            </div>
            <div class="ui-card-body">
                <div class="ui-card-title" *ngIf="header">{{header}}</div>
                <div class="ui-card-subtitle" *ngIf="subheader">{{subheader}}</div>
                <div class="ui-card-content">
                    <ng-content></ng-content>
                </div>
                <div class="ui-card-footer" *ngIf="footerFacet">
                    <ng-content select="p-footer"></ng-content>
                </div>
            </div>
        </div>
    `
    })
], Card);
let CardModule = class CardModule {
};
CardModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Card, SharedModule],
        declarations: [Card]
    })
], CardModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Card, CardModule };
//# sourceMappingURL=primeng-card.js.map
