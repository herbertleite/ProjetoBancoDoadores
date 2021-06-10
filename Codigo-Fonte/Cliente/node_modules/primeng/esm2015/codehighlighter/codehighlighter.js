var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export { CodeHighlighter };
let CodeHighlighterModule = class CodeHighlighterModule {
};
CodeHighlighterModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [CodeHighlighter],
        declarations: [CodeHighlighter]
    })
], CodeHighlighterModule);
export { CodeHighlighterModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZWhpZ2hsaWdodGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9jb2RlaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJjb2RlaGlnaGxpZ2h0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFLL0MsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQUV4QixZQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUFJLENBQUM7SUFFdEMsZUFBZTtRQUNYLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzNEO0lBQ0wsQ0FBQztDQUNKLENBQUE7O1lBUDBCLFVBQVU7O0FBRnhCLGVBQWU7SUFIM0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFNBQVM7S0FDdEIsQ0FBQztHQUNXLGVBQWUsQ0FTM0I7U0FUWSxlQUFlO0FBZ0I1QixJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtDQUFJLENBQUE7QUFBekIscUJBQXFCO0lBTGpDLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFDMUIsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO0tBQ2xDLENBQUM7R0FDVyxxQkFBcUIsQ0FBSTtTQUF6QixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twQ29kZV0nXG59KVxuZXhwb3J0IGNsYXNzIENvZGVIaWdobGlnaHRlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7IH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvd1snUHJpc20nXSkge1xuICAgICAgICAgICAgd2luZG93WydQcmlzbSddLmhpZ2hsaWdodEVsZW1lbnQodGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQ29kZUhpZ2hsaWdodGVyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtDb2RlSGlnaGxpZ2h0ZXJdXG59KVxuZXhwb3J0IGNsYXNzIENvZGVIaWdobGlnaHRlck1vZHVsZSB7IH1cblxuXG4iXX0=