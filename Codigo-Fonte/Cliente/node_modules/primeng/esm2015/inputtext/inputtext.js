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
let InputText = class InputText {
    constructor(el, ngModel) {
        this.el = el;
        this.ngModel = ngModel;
    }
    ngDoCheck() {
        this.updateFilledState();
    }
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    onInput(e) {
        this.updateFilledState();
    }
    updateFilledState() {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) ||
            (this.ngModel && this.ngModel.model);
    }
};
InputText.ctorParameters = () => [
    { type: ElementRef },
    { type: NgModel, decorators: [{ type: Optional }] }
];
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
export { InputText };
let InputTextModule = class InputTextModule {
};
InputTextModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [InputText],
        declarations: [InputText]
    })
], InputTextModule);
export { InputTextModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXR0ZXh0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9pbnB1dHRleHQvIiwic291cmNlcyI6WyJpbnB1dHRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFZN0MsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQUlsQixZQUFtQixFQUFjLEVBQXFCLE9BQWdCO1FBQW5ELE9BQUUsR0FBRixFQUFFLENBQVk7UUFBcUIsWUFBTyxHQUFQLE9BQU8sQ0FBUztJQUFHLENBQUM7SUFFMUUsU0FBUztRQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCwwR0FBMEc7SUFFMUcsT0FBTyxDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ2pFLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDSixDQUFBOztZQWhCMEIsVUFBVTtZQUE4QixPQUFPLHVCQUFsQyxRQUFROztBQVE1QztJQURDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3Q0FHakM7QUFkUSxTQUFTO0lBVnJCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLElBQUksRUFBRTtZQUNGLHNCQUFzQixFQUFFLE1BQU07WUFDOUIsdUJBQXVCLEVBQUUsTUFBTTtZQUMvQiwwQkFBMEIsRUFBRSxNQUFNO1lBQ2xDLG1CQUFtQixFQUFFLE1BQU07WUFDM0IseUJBQXlCLEVBQUUsUUFBUTtTQUN0QztLQUNKLENBQUM7SUFLc0MsV0FBQSxRQUFRLEVBQUUsQ0FBQTtHQUpyQyxTQUFTLENBb0JyQjtTQXBCWSxTQUFTO0FBMkJ0QixJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0NBQUksQ0FBQTtBQUFuQixlQUFlO0lBTDNCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDcEIsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO0tBQzVCLENBQUM7R0FDVyxlQUFlLENBQUk7U0FBbkIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsRGlyZWN0aXZlLEVsZW1lbnRSZWYsSG9zdExpc3RlbmVyLERvQ2hlY2ssT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ01vZGVsfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcElucHV0VGV4dF0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHRleHRdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLWNvcm5lci1hbGxdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWRlZmF1bHRdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLXdpZGdldF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MudWktc3RhdGUtZmlsbGVkXSc6ICdmaWxsZWQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBJbnB1dFRleHQgaW1wbGVtZW50cyBEb0NoZWNrIHtcblxuICAgIGZpbGxlZDogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgQE9wdGlvbmFsKCkgcHVibGljIG5nTW9kZWw6IE5nTW9kZWwpIHt9XG4gICAgICAgIFxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgIH1cbiAgICBcbiAgICAvL1RvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiB0byBtYW5hZ2UgdWktc3RhdGUtZmlsbGVkIGZvciBtYXRlcmlhbCBsYWJlbHMgd2hlbiB0aGVyZSBpcyBubyB2YWx1ZSBiaW5kaW5nXG4gICAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKSBcbiAgICBvbklucHV0KGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVGaWxsZWRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5maWxsZWQgPSAodGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZS5sZW5ndGgpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5uZ01vZGVsICYmIHRoaXMubmdNb2RlbC5tb2RlbCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtJbnB1dFRleHRdLFxuICAgIGRlY2xhcmF0aW9uczogW0lucHV0VGV4dF1cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRUZXh0TW9kdWxlIHsgfSJdfQ==