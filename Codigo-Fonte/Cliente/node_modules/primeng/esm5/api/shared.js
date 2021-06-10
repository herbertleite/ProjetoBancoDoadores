var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, EventEmitter, Directive, Input, Output, ContentChildren, ContentChild, TemplateRef, AfterContentInit, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
var Header = /** @class */ (function () {
    function Header() {
    }
    Header = __decorate([
        Component({
            selector: 'p-header',
            template: '<ng-content></ng-content>'
        })
    ], Header);
    return Header;
}());
export { Header };
var Footer = /** @class */ (function () {
    function Footer() {
    }
    Footer = __decorate([
        Component({
            selector: 'p-footer',
            template: '<ng-content></ng-content>'
        })
    ], Footer);
    return Footer;
}());
export { Footer };
var PrimeTemplate = /** @class */ (function () {
    function PrimeTemplate(template) {
        this.template = template;
    }
    PrimeTemplate.prototype.getType = function () {
        return this.name;
    };
    PrimeTemplate.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
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
    return PrimeTemplate;
}());
export { PrimeTemplate };
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Header, Footer, PrimeTemplate],
            declarations: [Header, Footer, PrimeTemplate]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9hcGkvIiwic291cmNlcyI6WyJzaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUMsZ0JBQWdCLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQy9JLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBTXhDO0lBQUE7SUFBcUIsQ0FBQztJQUFULE1BQU07UUFKbEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLDJCQUEyQjtTQUN4QyxDQUFDO09BQ1csTUFBTSxDQUFHO0lBQUQsYUFBQztDQUFBLEFBQXRCLElBQXNCO1NBQVQsTUFBTTtBQU1uQjtJQUFBO0lBQXFCLENBQUM7SUFBVCxNQUFNO1FBSmxCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSwyQkFBMkI7U0FDeEMsQ0FBQztPQUNXLE1BQU0sQ0FBRztJQUFELGFBQUM7Q0FBQSxBQUF0QixJQUFzQjtTQUFULE1BQU07QUFPbkI7SUFNSSx1QkFBbUIsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDO0lBRWpELCtCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7Z0JBSjRCLFdBQVc7O0lBSi9CO1FBQVIsS0FBSyxFQUFFOytDQUFjO0lBRUY7UUFBbkIsS0FBSyxDQUFDLFdBQVcsQ0FBQzsrQ0FBYztJQUp4QixhQUFhO1FBTHpCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLElBQUksRUFBRSxFQUNMO1NBQ0osQ0FBQztPQUNXLGFBQWEsQ0FXekI7SUFBRCxvQkFBQztDQUFBLEFBWEQsSUFXQztTQVhZLGFBQWE7QUFrQjFCO0lBQUE7SUFBNEIsQ0FBQztJQUFoQixZQUFZO1FBTHhCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGFBQWEsQ0FBQztZQUN0QyxZQUFZLEVBQUUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLGFBQWEsQ0FBQztTQUM5QyxDQUFDO09BQ1csWUFBWSxDQUFJO0lBQUQsbUJBQUM7Q0FBQSxBQUE3QixJQUE2QjtTQUFoQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxFdmVudEVtaXR0ZXIsRGlyZWN0aXZlLElucHV0LE91dHB1dCxDb250ZW50Q2hpbGRyZW4sQ29udGVudENoaWxkLFRlbXBsYXRlUmVmLEFmdGVyQ29udGVudEluaXQsUXVlcnlMaXN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlciB7fVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtZm9vdGVyJyxcbiAgICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nXG59KVxuZXhwb3J0IGNsYXNzIEZvb3RlciB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twVGVtcGxhdGVdJyxcbiAgICBob3N0OiB7XG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBQcmltZVRlbXBsYXRlIHtcbiAgICBcbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCdwVGVtcGxhdGUnKSBuYW1lOiBzdHJpbmc7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxuICAgIFxuICAgIGdldFR5cGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0hlYWRlcixGb290ZXIsUHJpbWVUZW1wbGF0ZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbSGVhZGVyLEZvb3RlcixQcmltZVRlbXBsYXRlXVxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZWRNb2R1bGUgeyB9XG4iXX0=