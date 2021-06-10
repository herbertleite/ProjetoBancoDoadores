var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Directive, ElementRef, HostListener, DoCheck, Optional } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
var InputText = /** @class */ (function () {
    function InputText(el, ngModel) {
        this.el = el;
        this.ngModel = ngModel;
    }
    InputText.prototype.ngDoCheck = function () {
        this.updateFilledState();
    };
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    InputText.prototype.onInput = function (e) {
        this.updateFilledState();
    };
    InputText.prototype.updateFilledState = function () {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) ||
            (this.ngModel && this.ngModel.model);
    };
    InputText.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgModel, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        HostListener('input', ['$event'])
    ], InputText.prototype, "onInput", null);
    InputText = __decorate([
        Directive({
            selector: '[pInputText]',
            host: {
                '[class.ui-inputtext]': 'true',
                '[class.ui-corner-all]': 'true',
                '[class.ui-state-default]': 'true',
                '[class.ui-widget]': 'true',
                '[class.ui-state-filled]': 'filled'
            }
        }),
        __param(1, Optional())
    ], InputText);
    return InputText;
}());
export { InputText };
var InputTextModule = /** @class */ (function () {
    function InputTextModule() {
    }
    InputTextModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [InputText],
            declarations: [InputText]
        })
    ], InputTextModule);
    return InputTextModule;
}());
export { InputTextModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXR0ZXh0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9pbnB1dHRleHQvIiwic291cmNlcyI6WyJpbnB1dHRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFZN0M7SUFJSSxtQkFBbUIsRUFBYyxFQUFxQixPQUFnQjtRQUFuRCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQXFCLFlBQU8sR0FBUCxPQUFPLENBQVM7SUFBRyxDQUFDO0lBRTFFLDZCQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsMEdBQTBHO0lBRTFHLDJCQUFPLEdBQVAsVUFBUSxDQUFDO1FBQ0wsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELHFDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNqRSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6RCxDQUFDOztnQkFmc0IsVUFBVTtnQkFBOEIsT0FBTyx1QkFBbEMsUUFBUTs7SUFRNUM7UUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7NENBR2pDO0lBZFEsU0FBUztRQVZyQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsY0FBYztZQUN4QixJQUFJLEVBQUU7Z0JBQ0Ysc0JBQXNCLEVBQUUsTUFBTTtnQkFDOUIsdUJBQXVCLEVBQUUsTUFBTTtnQkFDL0IsMEJBQTBCLEVBQUUsTUFBTTtnQkFDbEMsbUJBQW1CLEVBQUUsTUFBTTtnQkFDM0IseUJBQXlCLEVBQUUsUUFBUTthQUN0QztTQUNKLENBQUM7UUFLc0MsV0FBQSxRQUFRLEVBQUUsQ0FBQTtPQUpyQyxTQUFTLENBb0JyQjtJQUFELGdCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FwQlksU0FBUztBQTJCdEI7SUFBQTtJQUErQixDQUFDO0lBQW5CLGVBQWU7UUFMM0IsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNwQixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDNUIsQ0FBQztPQUNXLGVBQWUsQ0FBSTtJQUFELHNCQUFDO0NBQUEsQUFBaEMsSUFBZ0M7U0FBbkIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsRGlyZWN0aXZlLEVsZW1lbnRSZWYsSG9zdExpc3RlbmVyLERvQ2hlY2ssT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ01vZGVsfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcElucHV0VGV4dF0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHRleHRdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLWNvcm5lci1hbGxdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWRlZmF1bHRdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLXdpZGdldF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MudWktc3RhdGUtZmlsbGVkXSc6ICdmaWxsZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dFRleHQgaW1wbGVtZW50cyBEb0NoZWNrIHtcblxuICAgIGZpbGxlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgQE9wdGlvbmFsKCkgcHVibGljIG5nTW9kZWw6IE5nTW9kZWwpIHt9XG4gICAgICAgIFxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgIH1cbiAgICBcbiAgICAvL1RvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiB0byBtYW5hZ2UgdWktc3RhdGUtZmlsbGVkIGZvciBtYXRlcmlhbCBsYWJlbHMgd2hlbiB0aGVyZSBpcyBubyB2YWx1ZSBiaW5kaW5nXG4gICAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKSBcbiAgICBvbklucHV0KGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVGaWxsZWRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5maWxsZWQgPSAodGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZS5sZW5ndGgpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5uZ01vZGVsICYmIHRoaXMubmdNb2RlbC5tb2RlbCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtJbnB1dFRleHRdLFxuICAgIGRlY2xhcmF0aW9uczogW0lucHV0VGV4dF1cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRUZXh0TW9kdWxlIHsgfSJdfQ==