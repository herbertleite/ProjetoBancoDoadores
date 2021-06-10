var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, EventEmitter, Directive, Input, Output, ContentChildren, ContentChild, TemplateRef, AfterContentInit, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
let Header = class Header {
};
Header = __decorate([
    Component({
        selector: 'p-header',
        template: '<ng-content></ng-content>'
    })
], Header);
export { Header };
let Footer = class Footer {
};
Footer = __decorate([
    Component({
        selector: 'p-footer',
        template: '<ng-content></ng-content>'
    })
], Footer);
export { Footer };
let PrimeTemplate = class PrimeTemplate {
    constructor(template) {
        this.template = template;
    }
    getType() {
        return this.name;
    }
};
PrimeTemplate.ctorParameters = () => [
    { type: TemplateRef }
];
__decorate([
    Input()
], PrimeTemplate.prototype, "type", void 0);
__decorate([
    Input('pTemplate')
], PrimeTemplate.prototype, "name", void 0);
PrimeTemplate = __decorate([
    Directive({
        selector: '[pTemplate]',
        host: {}
    })
], PrimeTemplate);
export { PrimeTemplate };
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Header, Footer, PrimeTemplate],
        declarations: [Header, Footer, PrimeTemplate]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9hcGkvIiwic291cmNlcyI6WyJzaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsZ0JBQWdCLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9JLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTXhDLElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU07Q0FBRyxDQUFBO0FBQVQsTUFBTTtJQUpsQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsMkJBQTJCO0tBQ3hDLENBQUM7R0FDVyxNQUFNLENBQUc7U0FBVCxNQUFNO0FBTW5CLElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU07Q0FBRyxDQUFBO0FBQVQsTUFBTTtJQUpsQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUUsMkJBQTJCO0tBQ3hDLENBQUM7R0FDVyxNQUFNLENBQUc7U0FBVCxNQUFNO0FBT25CLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFNdEIsWUFBbUIsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDO0lBRWpELE9BQU87UUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQUNKLENBQUE7O1lBTGdDLFdBQVc7O0FBSi9CO0lBQVIsS0FBSyxFQUFFOzJDQUFjO0FBRUY7SUFBbkIsS0FBSyxDQUFDLFdBQVcsQ0FBQzsyQ0FBYztBQUp4QixhQUFhO0lBTHpCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLElBQUksRUFBRSxFQUNMO0tBQ0osQ0FBQztHQUNXLGFBQWEsQ0FXekI7U0FYWSxhQUFhO0FBa0IxQixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBQUksQ0FBQTtBQUFoQixZQUFZO0lBTHhCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGFBQWEsQ0FBQztRQUN0QyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGFBQWEsQ0FBQztLQUM5QyxDQUFDO0dBQ1csWUFBWSxDQUFJO1NBQWhCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLEV2ZW50RW1pdHRlcixEaXJlY3RpdmUsSW5wdXQsT3V0cHV0LENvbnRlbnRDaGlsZHJlbixDb250ZW50Q2hpbGQsVGVtcGxhdGVSZWYsQWZ0ZXJDb250ZW50SW5pdCxRdWVyeUxpc3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1oZWFkZXInLFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pidcbn0pXG5leHBvcnQgY2xhc3MgSGVhZGVyIHt9XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1mb290ZXInLFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pidcbn0pXG5leHBvcnQgY2xhc3MgRm9vdGVyIHt9XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BUZW1wbGF0ZV0nLFxuICAgIGhvc3Q6IHtcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFByaW1lVGVtcGxhdGUge1xuICAgIFxuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoJ3BUZW1wbGF0ZScpIG5hbWU6IHN0cmluZztcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG4gICAgXG4gICAgZ2V0VHlwZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbSGVhZGVyLEZvb3RlcixQcmltZVRlbXBsYXRlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtIZWFkZXIsRm9vdGVyLFByaW1lVGVtcGxhdGVdXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlZE1vZHVsZSB7IH1cbiJdfQ==