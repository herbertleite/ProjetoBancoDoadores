import { EventEmitter, ElementRef, Input, Output, ContentChild, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer, SharedModule } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let idx = 0;
let Panel = class Panel {
    constructor(el) {
        this.el = el;
        this.collapsed = false;
        this.expandIcon = 'pi pi-plus';
        this.collapseIcon = 'pi pi-minus';
        this.showHeader = true;
        this.toggler = "icon";
        this.collapsedChange = new EventEmitter();
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = `ui-panel-${idx++}`;
    }
    onHeaderClick(event) {
        if (this.toggler === 'header') {
            this.toggle(event);
        }
    }
    onIconClick(event) {
        if (this.toggler === 'icon') {
            this.toggle(event);
        }
    }
    toggle(event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.toggleable) {
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
        }
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
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
    }
};
Panel.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], Panel.prototype, "toggleable", void 0);
__decorate([
    Input()
], Panel.prototype, "header", void 0);
__decorate([
    Input()
], Panel.prototype, "collapsed", void 0);
__decorate([
    Input()
], Panel.prototype, "style", void 0);
__decorate([
    Input()
], Panel.prototype, "styleClass", void 0);
__decorate([
    Input()
], Panel.prototype, "expandIcon", void 0);
__decorate([
    Input()
], Panel.prototype, "collapseIcon", void 0);
__decorate([
    Input()
], Panel.prototype, "showHeader", void 0);
__decorate([
    Input()
], Panel.prototype, "toggler", void 0);
__decorate([
    Output()
], Panel.prototype, "collapsedChange", void 0);
__decorate([
    Output()
], Panel.prototype, "onBeforeToggle", void 0);
__decorate([
    Output()
], Panel.prototype, "onAfterToggle", void 0);
__decorate([
    Input()
], Panel.prototype, "transitionOptions", void 0);
__decorate([
    ContentChild(Footer, { static: true })
], Panel.prototype, "footerFacet", void 0);
Panel = __decorate([
    Component({
        selector: 'p-panel',
        template: `
        <div [attr.id]="id" [ngClass]="'ui-panel ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <div [ngClass]="{'ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all': true, 'ui-panel-titlebar-clickable': (toggleable && toggler === 'header')}" 
                *ngIf="showHeader" (click)="onHeaderClick($event)">
                <span class="ui-panel-title" *ngIf="header" [attr.id]="id + '_header'">{{header}}</span>
                <ng-content select="p-header"></ng-content>
                <a *ngIf="toggleable" [attr.id]="id + '-label'" class="ui-panel-titlebar-icon ui-panel-titlebar-toggler ui-corner-all ui-state-default" tabindex="0"
                    (click)="onIconClick($event)" (keydown.enter)="onIconClick($event)" [attr.aria-controls]="id + '-content'" role="tab" [attr.aria-expanded]="!collapsed">
                    <span [class]="collapsed ? expandIcon : collapseIcon"></span>
                </a>
            </div>
            <div [attr.id]="id + '-content'" class="ui-panel-content-wrapper" [@panelContent]="collapsed ? {value: 'hidden', params: {transitionParams: animating ? transitionOptions : '0ms', height: '0', opacity:'0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*', opacity: '1'}}" (@panelContent.done)="onToggleDone($event)"
                [ngClass]="{'ui-panel-content-wrapper-overflown': collapsed||animating}"
                role="region" [attr.aria-hidden]="collapsed" [attr.aria-labelledby]="id + '-label'">
                <div class="ui-panel-content ui-widget-content">
                    <ng-content></ng-content>
                </div>
                
                <div class="ui-panel-footer ui-widget-content" *ngIf="footerFacet">
                    <ng-content select="p-footer"></ng-content>
                </div>
            </div>
        </div>
    `,
        animations: [
            trigger('panelContent', [
                state('hidden', style({
                    height: '0',
                    opacity: 0
                })),
                state('void', style({
                    height: '{{height}}',
                    opacity: '{{opacity}}'
                }), { params: { height: '0', opacity: '0' } }),
                state('visible', style({
                    height: '*',
                    opacity: 1
                })),
                transition('visible <=> hidden', animate('{{transitionParams}}')),
                transition('void => hidden', animate('{{transitionParams}}')),
                transition('void => visible', animate('{{transitionParams}}'))
            ])
        ]
    })
], Panel);
let PanelModule = class PanelModule {
};
PanelModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Panel, SharedModule],
        declarations: [Panel]
    })
], PanelModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Panel, PanelModule };
//# sourceMappingURL=primeng-panel.js.map
