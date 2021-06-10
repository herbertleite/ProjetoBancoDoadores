(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/card', ['exports', '@angular/core', '@angular/common', 'primeng/api'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.card = {}), global.ng.core, global.ng.common, global.primeng.api));
}(this, (function (exports, core, common, api) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Card = /** @class */ (function () {
        function Card(el) {
            this.el = el;
        }
        Card.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Card.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], Card.prototype, "header", void 0);
        __decorate([
            core.Input()
        ], Card.prototype, "subheader", void 0);
        __decorate([
            core.Input()
        ], Card.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], Card.prototype, "styleClass", void 0);
        __decorate([
            core.ContentChild(api.Header, { static: true })
        ], Card.prototype, "headerFacet", void 0);
        __decorate([
            core.ContentChild(api.Footer, { static: true })
        ], Card.prototype, "footerFacet", void 0);
        Card = __decorate([
            core.Component({
                selector: 'p-card',
                template: "\n        <div [ngClass]=\"'ui-card ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-card-header\" *ngIf=\"headerFacet\">\n               <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <div class=\"ui-card-body\">\n                <div class=\"ui-card-title\" *ngIf=\"header\">{{header}}</div>\n                <div class=\"ui-card-subtitle\" *ngIf=\"subheader\">{{subheader}}</div>\n                <div class=\"ui-card-content\">\n                    <ng-content></ng-content>\n                </div>\n                <div class=\"ui-card-footer\" *ngIf=\"footerFacet\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                </div>\n            </div>\n        </div>\n    "
            })
        ], Card);
        return Card;
    }());
    var CardModule = /** @class */ (function () {
        function CardModule() {
        }
        CardModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [Card, api.SharedModule],
                declarations: [Card]
            })
        ], CardModule);
        return CardModule;
    }());

    exports.Card = Card;
    exports.CardModule = CardModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-card.umd.js.map
