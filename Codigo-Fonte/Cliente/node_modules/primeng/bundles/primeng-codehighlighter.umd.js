(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/codehighlighter', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.codehighlighter = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var CodeHighlighter = /** @class */ (function () {
        function CodeHighlighter(el) {
            this.el = el;
        }
        CodeHighlighter.prototype.ngAfterViewInit = function () {
            if (window['Prism']) {
                window['Prism'].highlightElement(this.el.nativeElement);
            }
        };
        CodeHighlighter.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        CodeHighlighter = __decorate([
            core.Directive({
                selector: '[pCode]'
            })
        ], CodeHighlighter);
        return CodeHighlighter;
    }());
    var CodeHighlighterModule = /** @class */ (function () {
        function CodeHighlighterModule() {
        }
        CodeHighlighterModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [CodeHighlighter],
                declarations: [CodeHighlighter]
            })
        ], CodeHighlighterModule);
        return CodeHighlighterModule;
    }());

    exports.CodeHighlighter = CodeHighlighter;
    exports.CodeHighlighterModule = CodeHighlighterModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-codehighlighter.umd.js.map
