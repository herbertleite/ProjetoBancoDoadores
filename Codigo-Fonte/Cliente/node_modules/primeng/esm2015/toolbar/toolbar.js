var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
let Toolbar = class Toolbar {
    constructor(el) {
        this.el = el;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
};
Toolbar.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], Toolbar.prototype, "style", void 0);
__decorate([
    Input()
], Toolbar.prototype, "styleClass", void 0);
Toolbar = __decorate([
    Component({
        selector: 'p-toolbar',
        template: `
        <div [ngClass]="'ui-toolbar ui-widget ui-widget-header ui-corner-all ui-helper-clearfix'" [ngStyle]="style" [class]="styleClass" role="toolbar">
            <ng-content></ng-content>
        </div>
    `
    })
], Toolbar);
export { Toolbar };
let ToolbarModule = class ToolbarModule {
};
ToolbarModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Toolbar],
        declarations: [Toolbar]
    })
], ToolbarModule);
export { ToolbarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvdG9vbGJhci8iLCJzb3VyY2VzIjpbInRvb2xiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFXN0MsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBTztJQU1oQixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtJQUFHLENBQUM7SUFFdEMsbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FFSixDQUFBOztZQU4yQixVQUFVOztBQUp6QjtJQUFSLEtBQUssRUFBRTtzQ0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFOzJDQUFvQjtBQUpuQixPQUFPO0lBUm5CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRTs7OztLQUlUO0tBQ0osQ0FBQztHQUNXLE9BQU8sQ0FZbkI7U0FaWSxPQUFPO0FBbUJwQixJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0NBQUksQ0FBQTtBQUFqQixhQUFhO0lBTHpCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO0tBQzFCLENBQUM7R0FDVyxhQUFhLENBQUk7U0FBakIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LEVsZW1lbnRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Jsb2NrYWJsZVVJfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10b29sYmFyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIid1aS10b29sYmFyIHVpLXdpZGdldCB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGwgdWktaGVscGVyLWNsZWFyZml4J1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiByb2xlPVwidG9vbGJhclwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xiYXIgaW1wbGVtZW50cyBCbG9ja2FibGVVSSB7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICB9XG5cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbVG9vbGJhcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbVG9vbGJhcl1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbGJhck1vZHVsZSB7IH1cbiJdfQ==