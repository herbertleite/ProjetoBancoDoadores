var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
        { type: ElementRef }
    ]; };
    CodeHighlighter = __decorate([
        Directive({
            selector: '[pCode]'
        })
    ], CodeHighlighter);
    return CodeHighlighter;
}());
export { CodeHighlighter };
var CodeHighlighterModule = /** @class */ (function () {
    function CodeHighlighterModule() {
    }
    CodeHighlighterModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [CodeHighlighter],
            declarations: [CodeHighlighter]
        })
    ], CodeHighlighterModule);
    return CodeHighlighterModule;
}());
export { CodeHighlighterModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZWhpZ2hsaWdodGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9jb2RlaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJjb2RlaGlnaGxpZ2h0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFLL0M7SUFFSSx5QkFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFBSSxDQUFDO0lBRXRDLHlDQUFlLEdBQWY7UUFDSSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMzRDtJQUNMLENBQUM7O2dCQU5zQixVQUFVOztJQUZ4QixlQUFlO1FBSDNCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxTQUFTO1NBQ3RCLENBQUM7T0FDVyxlQUFlLENBUzNCO0lBQUQsc0JBQUM7Q0FBQSxBQVRELElBU0M7U0FUWSxlQUFlO0FBZ0I1QjtJQUFBO0lBQXFDLENBQUM7SUFBekIscUJBQXFCO1FBTGpDLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDMUIsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO1NBQ2xDLENBQUM7T0FDVyxxQkFBcUIsQ0FBSTtJQUFELDRCQUFDO0NBQUEsQUFBdEMsSUFBc0M7U0FBekIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcENvZGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBDb2RlSGlnaGxpZ2h0ZXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikgeyB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh3aW5kb3dbJ1ByaXNtJ10pIHtcbiAgICAgICAgICAgIHdpbmRvd1snUHJpc20nXS5oaWdobGlnaHRFbGVtZW50KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0NvZGVIaWdobGlnaHRlcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbQ29kZUhpZ2hsaWdodGVyXVxufSlcbmV4cG9ydCBjbGFzcyBDb2RlSGlnaGxpZ2h0ZXJNb2R1bGUgeyB9XG5cblxuIl19