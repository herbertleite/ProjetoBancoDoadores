var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Directive, ElementRef, HostListener, Input, Output, DoCheck, EventEmitter, Optional } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
var InputTextarea = /** @class */ (function () {
    function InputTextarea(el, ngModel) {
        this.el = el;
        this.ngModel = ngModel;
        this.onResize = new EventEmitter();
    }
    InputTextarea.prototype.ngDoCheck = function () {
        this.updateFilledState();
        if (this.autoResize) {
            this.resize();
        }
    };
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    InputTextarea.prototype.onInput = function (e) {
        this.updateFilledState();
        if (this.autoResize) {
            this.resize(e);
        }
    };
    InputTextarea.prototype.updateFilledState = function () {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
    };
    InputTextarea.prototype.onFocus = function (e) {
        if (this.autoResize) {
            this.resize(e);
        }
    };
    InputTextarea.prototype.onBlur = function (e) {
        if (this.autoResize) {
            this.resize(e);
        }
    };
    InputTextarea.prototype.resize = function (event) {
        this.el.nativeElement.style.height = 'auto';
        this.el.nativeElement.style.height = this.el.nativeElement.scrollHeight + 'px';
        if (parseFloat(this.el.nativeElement.style.height) >= parseFloat(this.el.nativeElement.style.maxHeight)) {
            this.el.nativeElement.style.overflowY = "scroll";
            this.el.nativeElement.style.height = this.el.nativeElement.style.maxHeight;
        }
        else {
            this.el.nativeElement.style.overflow = "hidden";
        }
        this.onResize.emit(event || {});
    };
    InputTextarea.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgModel, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        Input()
    ], InputTextarea.prototype, "autoResize", void 0);
    __decorate([
        Output()
    ], InputTextarea.prototype, "onResize", void 0);
    __decorate([
        HostListener('input', ['$event'])
    ], InputTextarea.prototype, "onInput", null);
    __decorate([
        HostListener('focus', ['$event'])
    ], InputTextarea.prototype, "onFocus", null);
    __decorate([
        HostListener('blur', ['$event'])
    ], InputTextarea.prototype, "onBlur", null);
    InputTextarea = __decorate([
        Directive({
            selector: '[pInputTextarea]',
            host: {
                '[class.ui-inputtext]': 'true',
                '[class.ui-corner-all]': 'true',
                '[class.ui-inputtextarea-resizable]': 'autoResize',
                '[class.ui-state-default]': 'true',
                '[class.ui-widget]': 'true',
                '[class.ui-state-filled]': 'filled'
            }
        }),
        __param(1, Optional())
    ], InputTextarea);
    return InputTextarea;
}());
export { InputTextarea };
var InputTextareaModule = /** @class */ (function () {
    function InputTextareaModule() {
    }
    InputTextareaModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [InputTextarea],
            declarations: [InputTextarea]
        })
    ], InputTextareaModule);
    return InputTextareaModule;
}());
export { InputTextareaModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXR0ZXh0YXJlYS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvaW5wdXR0ZXh0YXJlYS8iLCJzb3VyY2VzIjpbImlucHV0dGV4dGFyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFhN0M7SUFVSSx1QkFBbUIsRUFBYyxFQUFxQixPQUFnQjtRQUFuRCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQXFCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFONUQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBTWMsQ0FBQztJQUUxRSxpQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFekIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjtJQUNMLENBQUM7SUFFRCwwR0FBMEc7SUFFMUcsK0JBQU8sR0FBUCxVQUFRLENBQUM7UUFDTCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsQjtJQUNMLENBQUM7SUFFRCx5Q0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxN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RGlyZWN0aXZlLEVsZW1lbnRSZWYsSG9zdExpc3RlbmVyLElucHV0LE91dHB1dCxEb0NoZWNrLEV2ZW50RW1pdHRlcixPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twSW5wdXRUZXh0YXJlYV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHRleHRdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLWNvcm5lci1hbGxdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLWlucHV0dGV4dGFyZWEtcmVzaXphYmxlXSc6ICdhdXRvUmVzaXplJyxcbiAgICAgICAgJ1tjbGFzcy51aS1zdGF0ZS1kZWZhdWx0XSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS13aWRnZXRdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWZpbGxlZF0nOiAnZmlsbGVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRUZXh0YXJlYSBpbXBsZW1lbnRzIERvQ2hlY2sge1xuICAgIFxuICAgIEBJbnB1dCgpIGF1dG9SZXNpemU6IGJvb2xlYW47XG4gICAgXG4gICAgQE91dHB1dCgpIG9uUmVzaXplOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgXG4gICAgZmlsbGVkOiBib29sZWFuO1xuXG4gICAgY2FjaGVkU2Nyb2xsSGVpZ2h0Om51bWJlcjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgQE9wdGlvbmFsKCkgcHVibGljIG5nTW9kZWw6IE5nTW9kZWwpIHt9XG4gICAgICAgIFxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuYXV0b1Jlc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvL1RvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiB0byBtYW5hZ2UgdWktc3RhdGUtZmlsbGVkIGZvciBtYXRlcmlhbCBsYWJlbHMgd2hlbiB0aGVyZSBpcyBubyB2YWx1ZSBiaW5kaW5nXG4gICAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKVxuICAgIG9uSW5wdXQoZSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgIGlmICh0aGlzLmF1dG9SZXNpemUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZUZpbGxlZFN0YXRlKCkge1xuICAgICAgICB0aGlzLmZpbGxlZCA9ICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlLmxlbmd0aCkgfHwgKHRoaXMubmdNb2RlbCAmJiB0aGlzLm5nTW9kZWwubW9kZWwpO1xuICAgIH1cbiAgICBcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1cycsIFsnJGV2ZW50J10pXG4gICAgb25Gb2N1cyhlKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9SZXNpemUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ2JsdXInLCBbJyRldmVudCddKVxuICAgIG9uQmx1cihlKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9SZXNpemUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzaXplKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlc2l6ZShldmVudD86IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAnYXV0byc7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0ICsgJ3B4JztcblxuICAgICAgICBpZiAocGFyc2VGbG9hdCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0KSA+PSBwYXJzZUZsb2F0KHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5tYXhIZWlnaHQpKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUub3ZlcmZsb3dZID0gXCJzY3JvbGxcIjtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25SZXNpemUuZW1pdChldmVudHx8e30pO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbSW5wdXRUZXh0YXJlYV0sXG4gICAgZGVjbGFyYXRpb25zOiBbSW5wdXRUZXh0YXJlYV1cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRUZXh0YXJlYU1vZHVsZSB7IH1cbiJdfQ==