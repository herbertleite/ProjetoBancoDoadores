import { ElementRef, Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let CodeHighlighter = class CodeHighlighter {
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        if (window['Prism']) {
            window['Prism'].highlightElement(this.el.nativeElement);
        }
    }
};
CodeHighlighter.ctorParameters = () => [
    { type: ElementRef }
];
CodeHighlighter = __decorate([
    Directive({
        selector: '[pCode]'
    })
], CodeHighlighter);
let CodeHighlighterModule = class CodeHighlighterModule {
};
CodeHighlighterModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [CodeHighlighter],
        declarations: [CodeHighlighter]
    })
], CodeHighlighterModule);

/**
 * Generated bundle index. Do not edit.
 */

export { CodeHighlighter, CodeHighlighterModule };
//# sourceMappingURL=primeng-codehighlighter.js.map
