import { EventEmitter, ElementRef, Input, Output, Component, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let idx = 0;
let Fieldset = class Fieldset {
    constructor(el) {
        this.el = el;
        this.collapsed = false;
        this.collapsedChange = new EventEmitter();
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = `ui-fieldset-${idx++}`;
    }
    toggle(event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.collapsed)
            this.expand(event);
        else
            this.collapse(event);
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        event.preventDefault();
    }
    expand(event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }
    collapse(event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    onToggleDone(event) {
        this.animating = false;
    }
};
Fieldset.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], Fieldset.prototype, "legend", void 0);
__decorate([
    Input()
], Fieldset.prototype, "toggleable", void 0);
__decorate([
    Input()
], Fieldset.prototype, "collapsed", void 0);
__decorate([
    Output()
], Fieldset.prototype, "collapsedChange", void 0);
__decorate([
    Output()
], Fieldset.prototype, "onBeforeToggle", void 0);
__decorate([
    Output()
], Fieldset.prototype, "onAfterToggle", void 0);
__decorate([
    Input()
], Fieldset.prototype, "style", void 0);
__decorate([
    Input()
], Fieldset.prototype, "styleClass", void 0);
__decorate([
    Input()
], Fieldset.prototype, "transitionOptions", void 0);
Fieldset = __decorate([
    Component({
        selector: 'p-fieldset',
        template: `
        <fieldset [attr.id]="id" [ngClass]="{'ui-fieldset ui-widget ui-widget-content ui-corner-all': true, 'ui-fieldset-toggleable': toggleable}" [ngStyle]="style" [class]="styleClass">
            <legend class="ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text">
                <ng-container *ngIf="toggleable; else legendContent">
                    <a tabindex="0" (click)="toggle($event)" (keydown.enter)="toggle($event)" [attr.aria-controls]="id + '-content'" [attr.aria-expanded]="!collapsed">
                        <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                    </a>
                </ng-container>
                <ng-template #legendContent>
                    <span class="ui-fieldset-toggler pi" *ngIf="toggleable" [ngClass]="{'pi-minus': !collapsed,'pi-plus':collapsed}"></span>
                    <span class="ui-fieldset-legend-text">{{legend}}</span>
                    <ng-content select="p-header"></ng-content>
                </ng-template>
            </legend>
            <div [attr.id]="id + '-content'" class="ui-fieldset-content-wrapper" [@fieldsetContent]="collapsed ? {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}}" 
                        [attr.aria-labelledby]="id" [ngClass]="{'ui-fieldset-content-wrapper-overflown': collapsed||animating}" [attr.aria-hidden]="collapsed"
                         (@fieldsetContent.done)="onToggleDone($event)" role="region">
                <div class="ui-fieldset-content">
                    <ng-content></ng-content>
                </div>
            </div>
        </fieldset>
    `,
        animations: [
            trigger('fieldsetContent', [
                state('hidden', style({
                    height: '0'
                })),
                state('void', style({
                    height: '{{height}}'
                }), { params: { height: '0' } }),
                state('visible', style({
                    height: '*'
                })),
                transition('visible => hidden', animate('{{transitionParams}}')),
                transition('hidden => visible', animate('{{transitionParams}}')),
                transition('void => hidden', animate('{{transitionParams}}')),
                transition('void => visible', animate('{{transitionParams}}'))
            ])
        ]
    })
], Fieldset);
let FieldsetModule = class FieldsetModule {
};
FieldsetModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Fieldset, SharedModule],
        declarations: [Fieldset]
    })
], FieldsetModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Fieldset, FieldsetModule };
//# sourceMappingURL=primeng-fieldset.js.map
