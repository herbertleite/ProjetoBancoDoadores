var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Directive, ViewContainerRef } from '@angular/core';
var DynamicDialogContent = /** @class */ (function () {
    function DynamicDialogContent(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    DynamicDialogContent.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    DynamicDialogContent = __decorate([
        Directive({
            selector: '[pDynamicDialogContent]'
        })
    ], DynamicDialogContent);
    return DynamicDialogContent;
}());
export { DynamicDialogContent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY2RpYWxvZ2NvbnRlbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2R5bmFtaWNkaWFsb2cvIiwic291cmNlcyI6WyJkeW5hbWljZGlhbG9nY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzVEO0lBRUMsOEJBQW1CLGdCQUFrQztRQUFsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0lBQUcsQ0FBQzs7Z0JBQXBCLGdCQUFnQjs7SUFGekMsb0JBQW9CO1FBSGhDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx5QkFBeUI7U0FDcEMsQ0FBQztPQUNXLG9CQUFvQixDQUloQztJQUFELDJCQUFDO0NBQUEsQUFKRCxJQUlDO1NBSlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twRHluYW1pY0RpYWxvZ0NvbnRlbnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRGlhbG9nQ29udGVudCB7XG4gIFxuXHRjb25zdHJ1Y3RvcihwdWJsaWMgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZikge31cblxufVxuIl19