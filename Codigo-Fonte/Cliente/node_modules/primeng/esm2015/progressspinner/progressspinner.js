var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
let ProgressSpinner = class ProgressSpinner {
    constructor() {
        this.strokeWidth = "2";
        this.fill = "none";
        this.animationDuration = "2s";
    }
};
__decorate([
    Input()
], ProgressSpinner.prototype, "style", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "styleClass", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "strokeWidth", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "fill", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "animationDuration", void 0);
ProgressSpinner = __decorate([
    Component({
        selector: 'p-progressSpinner',
        template: `
        <div class="ui-progress-spinner" [ngStyle]="style" [ngClass]="styleClass"  role="alert" aria-busy="true">
            <svg class="ui-progress-spinner-svg" viewBox="25 25 50 50" [style.animation-duration]="animationDuration">
                <circle class="ui-progress-spinner-circle" cx="50" cy="50" r="20" [attr.fill]="fill" [attr.stroke-width]="strokeWidth" stroke-miterlimit="10"/>
            </svg>
        </div>
    `
    })
], ProgressSpinner);
export { ProgressSpinner };
let ProgressSpinnerModule = class ProgressSpinnerModule {
};
ProgressSpinnerModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [ProgressSpinner],
        declarations: [ProgressSpinner]
    })
], ProgressSpinnerModule);
export { ProgressSpinnerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NzcGlubmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9wcm9ncmVzc3NwaW5uZXIvIiwic291cmNlcyI6WyJwcm9ncmVzc3NwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQVk3QyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBQTVCO1FBTWEsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFFMUIsU0FBSSxHQUFXLE1BQU0sQ0FBQztRQUV0QixzQkFBaUIsR0FBVyxJQUFJLENBQUM7SUFFOUMsQ0FBQztDQUFBLENBQUE7QUFWWTtJQUFSLEtBQUssRUFBRTs4Q0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFO21EQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTtvREFBMkI7QUFFMUI7SUFBUixLQUFLLEVBQUU7NkNBQXVCO0FBRXRCO0lBQVIsS0FBSyxFQUFFOzBEQUFrQztBQVZqQyxlQUFlO0lBVjNCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsUUFBUSxFQUFFOzs7Ozs7S0FNVDtLQUNKLENBQUM7R0FDVyxlQUFlLENBWTNCO1NBWlksZUFBZTtBQW1CNUIsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7Q0FBSSxDQUFBO0FBQXpCLHFCQUFxQjtJQUxqQyxRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO1FBQzFCLFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQztLQUNsQyxDQUFDO0dBQ1cscUJBQXFCLENBQUk7U0FBekIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wcm9ncmVzc1NwaW5uZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wcm9ncmVzcy1zcGlubmVyXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCJzdHlsZUNsYXNzXCIgIHJvbGU9XCJhbGVydFwiIGFyaWEtYnVzeT1cInRydWVcIj5cbiAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJ1aS1wcm9ncmVzcy1zcGlubmVyLXN2Z1wiIHZpZXdCb3g9XCIyNSAyNSA1MCA1MFwiIFtzdHlsZS5hbmltYXRpb24tZHVyYXRpb25dPVwiYW5pbWF0aW9uRHVyYXRpb25cIj5cbiAgICAgICAgICAgICAgICA8Y2lyY2xlIGNsYXNzPVwidWktcHJvZ3Jlc3Mtc3Bpbm5lci1jaXJjbGVcIiBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCIyMFwiIFthdHRyLmZpbGxdPVwiZmlsbFwiIFthdHRyLnN0cm9rZS13aWR0aF09XCJzdHJva2VXaWR0aFwiIHN0cm9rZS1taXRlcmxpbWl0PVwiMTBcIi8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc1NwaW5uZXIge1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgc3Ryb2tlV2lkdGg6IHN0cmluZyA9IFwiMlwiO1xuICAgIFxuICAgIEBJbnB1dCgpIGZpbGw6IHN0cmluZyA9IFwibm9uZVwiO1xuICAgIFxuICAgIEBJbnB1dCgpIGFuaW1hdGlvbkR1cmF0aW9uOiBzdHJpbmcgPSBcIjJzXCI7XG4gICAgXG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1Byb2dyZXNzU3Bpbm5lcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbUHJvZ3Jlc3NTcGlubmVyXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc1NwaW5uZXJNb2R1bGUgeyB9Il19