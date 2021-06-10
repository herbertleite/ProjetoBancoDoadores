var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Directive, ViewContainerRef } from '@angular/core';
let DynamicDialogContent = class DynamicDialogContent {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
};
DynamicDialogContent.ctorParameters = () => [
    { type: ViewContainerRef }
];
DynamicDialogContent = __decorate([
    Directive({
        selector: '[pDynamicDialogContent]'
    })
], DynamicDialogContent);
export { DynamicDialogContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY2RpYWxvZ2NvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2R5bmFtaWNkaWFsb2cvIiwic291cmNlcyI6WyJkeW5hbWljZGlhbG9nY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzVELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBRWhDLFlBQW1CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQztDQUV6RCxDQUFBOztZQUZxQyxnQkFBZ0I7O0FBRnpDLG9CQUFvQjtJQUhoQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUseUJBQXlCO0tBQ3BDLENBQUM7R0FDVyxvQkFBb0IsQ0FJaEM7U0FKWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BEeW5hbWljRGlhbG9nQ29udGVudF0nXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNEaWFsb2dDb250ZW50IHtcbiAgXG5cdGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxuXG59XG4iXX0=