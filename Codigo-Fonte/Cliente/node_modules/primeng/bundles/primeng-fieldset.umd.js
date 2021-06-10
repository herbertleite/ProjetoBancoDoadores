(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/fieldset', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/api'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.fieldset = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.api));
}(this, (function (exports, core, animations, common, api) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var idx = 0;
    var Fieldset = /** @class */ (function () {
        function Fieldset(el) {
            this.el = el;
            this.collapsed = false;
            this.collapsedChange = new core.EventEmitter();
            this.onBeforeToggle = new core.EventEmitter();
            this.onAfterToggle = new core.EventEmitter();
            this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
            this.id = "ui-fieldset-" + idx++;
        }
        Fieldset.prototype.toggle = function (event) {
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
        };
        Fieldset.prototype.expand = function (event) {
            this.collapsed = false;
            this.collapsedChange.emit(this.collapsed);
        };
        Fieldset.prototype.collapse = function (event) {
            this.collapsed = true;
            this.collapsedChange.emit(this.collapsed);
        };
        Fieldset.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Fieldset.prototype.onToggleDone = function (event) {
            this.animating = false;
        };
        Fieldset.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], Fieldset.prototype, "legend", void 0);
        __decorate([
            core.Input()
        ], Fieldset.prototype, "toggleable", void 0);
        __decorate([
            core.Input()
        ], Fieldset.prototype, "collapsed", void 0);
        __decorate([
            core.Output()
        ], Fieldset.prototype, "collapsedChange", void 0);
        __decorate([
            core.Output()
        ], Fieldset.prototype, "onBeforeToggle", void 0);
        __decorate([
            core.Output()
        ], Fieldset.prototype, "onAfterToggle", void 0);
        __decorate([
            core.Input()
        ], Fieldset.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], Fieldset.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], Fieldset.prototype, "transitionOptions", void 0);
        Fieldset = __decorate([
            core.Component({
                selector: 'p-fieldset',
                template: "\n        <fieldset [attr.id]=\"id\" [ngClass]=\"{'ui-fieldset ui-widget ui-widget-content ui-corner-all': true, 'ui-fieldset-toggleable': toggleable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <legend class=\"ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text\">\n                <ng-container *ngIf=\"toggleable; else legendContent\">\n                    <a tabindex=\"0\" (click)=\"toggle($event)\" (keydown.enter)=\"toggle($event)\" [attr.aria-controls]=\"id + '-content'\" [attr.aria-expanded]=\"!collapsed\">\n                        <ng-container *ngTemplateOutlet=\"legendContent\"></ng-container>\n                    </a>\n                </ng-container>\n                <ng-template #legendContent>\n                    <span class=\"ui-fieldset-toggler pi\" *ngIf=\"toggleable\" [ngClass]=\"{'pi-minus': !collapsed,'pi-plus':collapsed}\"></span>\n                    <span class=\"ui-fieldset-legend-text\">{{legend}}</span>\n                    <ng-content select=\"p-header\"></ng-content>\n                </ng-template>\n            </legend>\n            <div [attr.id]=\"id + '-content'\" class=\"ui-fieldset-content-wrapper\" [@fieldsetContent]=\"collapsed ? {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}}\" \n                        [attr.aria-labelledby]=\"id\" [ngClass]=\"{'ui-fieldset-content-wrapper-overflown': collapsed||animating}\" [attr.aria-hidden]=\"collapsed\"\n                         (@fieldsetContent.done)=\"onToggleDone($event)\" role=\"region\">\n                <div class=\"ui-fieldset-content\">\n                    <ng-content></ng-content>\n                </div>\n            </div>\n        </fieldset>\n    ",
                animations: [
                    animations.trigger('fieldsetContent', [
                        animations.state('hidden', animations.style({
                            height: '0'
                        })),
                        animations.state('void', animations.style({
                            height: '{{height}}'
                        }), { params: { height: '0' } }),
                        animations.state('visible', animations.style({
                            height: '*'
                        })),
                        animations.transition('visible => hidden', animations.animate('{{transitionParams}}')),
                        animations.transition('hidden => visible', animations.animate('{{transitionParams}}')),
                        animations.transition('void => hidden', animations.animate('{{transitionParams}}')),
                        animations.transition('void => visible', animations.animate('{{transitionParams}}'))
                    ])
                ]
            })
        ], Fieldset);
        return Fieldset;
    }());
    var FieldsetModule = /** @class */ (function () {
        function FieldsetModule() {
        }
        FieldsetModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [Fieldset, api.SharedModule],
                declarations: [Fieldset]
            })
        ], FieldsetModule);
        return FieldsetModule;
    }());

    exports.Fieldset = Fieldset;
    exports.FieldsetModule = FieldsetModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-fieldset.umd.js.map
