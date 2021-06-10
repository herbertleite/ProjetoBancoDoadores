var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, ElementRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Footer } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
let idx = 0;
let Panel = class Panel {
    constructor(el) {
        this.el = el;
        this.collapsed = false;
        this.expandIcon = 'pi pi-plus';
        this.collapseIcon = 'pi pi-minus';
        this.showHeader = true;
        this.toggler = "icon";
        this.collapsedChange = new EventEmitter();
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = `ui-panel-${idx++}`;
    }
    onHeaderClick(event) {
        if (this.toggler === 'header') {
            this.toggle(event);
        }
    }
    onIconClick(event) {
        if (this.toggler === 'icon') {
            this.toggle(event);
        }
    }
    toggle(event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.toggleable) {
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
        }
        event.preventDefault();
    }
    expand(event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }
    collapse(event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    onToggleDone(event) {
        this.animating = false;
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
    }
};
Panel.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], Panel.prototype, "toggleable", void 0);
__decorate([
    Input()
], Panel.prototype, "header", void 0);
__decorate([
    Input()
], Panel.prototype, "collapsed", void 0);
__decorate([
    Input()
], Panel.prototype, "style", void 0);
__decorate([
    Input()
], Panel.prototype, "styleClass", void 0);
__decorate([
    Input()
], Panel.prototype, "expandIcon", void 0);
__decorate([
    Input()
], Panel.prototype, "collapseIcon", void 0);
__decorate([
    Input()
], Panel.prototype, "showHeader", void 0);
__decorate([
    Input()
], Panel.prototype, "toggler", void 0);
__decorate([
    Output()
], Panel.prototype, "collapsedChange", void 0);
__decorate([
    Output()
], Panel.prototype, "onBeforeToggle", void 0);
__decorate([
    Output()
], Panel.prototype, "onAfterToggle", void 0);
__decorate([
    Input()
], Panel.prototype, "transitionOptions", void 0);
__decorate([
    ContentChild(Footer, { static: true })
], Panel.prototype, "footerFacet", void 0);
Panel = __decorate([
    Component({
        selector: 'p-panel',
        template: `
        <div [attr.id]="id" [ngClass]="'ui-panel ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <div [ngClass]="{'ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all': true, 'ui-panel-titlebar-clickable': (toggleable && toggler === 'header')}" 
                *ngIf="showHeader" (click)="onHeaderClick($event)">
                <span class="ui-panel-title" *ngIf="header" [attr.id]="id + '_header'">{{header}}</span>
                <ng-content select="p-header"></ng-content>
                <a *ngIf="toggleable" [attr.id]="id + '-label'" class="ui-panel-titlebar-icon ui-panel-titlebar-toggler ui-corner-all ui-state-default" tabindex="0"
                    (click)="onIconClick($event)" (keydown.enter)="onIconClick($event)" [attr.aria-controls]="id + '-content'" role="tab" [attr.aria-expanded]="!collapsed">
                    <span [class]="collapsed ? expandIcon : collapseIcon"></span>
                </a>
            </div>
            <div [attr.id]="id + '-content'" class="ui-panel-content-wrapper" [@panelContent]="collapsed ? {value: 'hidden', params: {transitionParams: animating ? transitionOptions : '0ms', height: '0', opacity:'0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*', opacity: '1'}}" (@panelContent.done)="onToggleDone($event)"
                [ngClass]="{'ui-panel-content-wrapper-overflown': collapsed||animating}"
                role="region" [attr.aria-hidden]="collapsed" [attr.aria-labelledby]="id + '-label'">
                <div class="ui-panel-content ui-widget-content">
                    <ng-content></ng-content>
                </div>
                
                <div class="ui-panel-footer ui-widget-content" *ngIf="footerFacet">
                    <ng-content select="p-footer"></ng-content>
                </div>
            </div>
        </div>
    `,
        animations: [
            trigger('panelContent', [
                state('hidden', style({
                    height: '0',
                    opacity: 0
                })),
                state('void', style({
                    height: '{{height}}',
                    opacity: '{{opacity}}'
                }), { params: { height: '0', opacity: '0' } }),
                state('visible', style({
                    height: '*',
                    opacity: 1
                })),
                transition('visible <=> hidden', animate('{{transitionParams}}')),
                transition('void => hidden', animate('{{transitionParams}}')),
                transition('void => visible', animate('{{transitionParams}}'))
            ])
        ]
    })
], Panel);
export { Panel };
let PanelModule = class PanelModule {
};
PanelModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Panel, SharedModule],
        declarations: [Panel]
    })
], PanelModule);
export { PanelModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3BhbmVsLyIsInNvdXJjZXMiOlsicGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFaEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUUzRSxJQUFJLEdBQUcsR0FBVyxDQUFDLENBQUM7QUFnRHBCLElBQWEsS0FBSyxHQUFsQixNQUFhLEtBQUs7SUFrQ2QsWUFBb0IsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUE1QnpCLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFNM0IsZUFBVSxHQUFXLFlBQVksQ0FBQztRQUVsQyxpQkFBWSxHQUFXLGFBQWEsQ0FBQztRQUVyQyxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLFlBQU8sR0FBVyxNQUFNLENBQUM7UUFFeEIsb0JBQWUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV4RCxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXZELGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdkQsc0JBQWlCLEdBQVcsc0NBQXNDLENBQUM7UUFNNUUsT0FBRSxHQUFXLFlBQVksR0FBRyxFQUFFLEVBQUUsQ0FBQztJQUVJLENBQUM7SUFFdEMsYUFBYSxDQUFDLEtBQVk7UUFDdEIsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUMzQixJQUFJ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QixNQUFNLEVBQUUsWUFBWTtvQkFDcEIsT0FBTyxFQUFFLGFBQWE7aUJBQ3pCLENBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBQyxFQUFDLENBQUM7Z0JBQzFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO29CQUNuQixNQUFNLEVBQUUsR0FBRztvQkFDWCxPQUFPLEVBQUUsQ0FBQztpQkFDYixDQUFDLENBQUM7Z0JBQ0gsVUFBVSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNqRSxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQzdELFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQzthQUNqRSxDQUFDO1NBQ0w7S0FDSixDQUFDO0dBQ1csS0FBSyxDQXFGakI7U0FyRlksS0FBSztBQTRGbEIsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztDQUFJLENBQUE7QUFBZixXQUFXO0lBTHZCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUMsWUFBWSxDQUFDO1FBQzdCLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FBQztLQUN4QixDQUFDO0dBQ1csV0FBVyxDQUFJO1NBQWYsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsRWxlbWVudFJlZixDb250ZW50Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1NoYXJlZE1vZHVsZSxGb290ZXJ9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7QmxvY2thYmxlVUl9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5sZXQgaWR4OiBudW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtcGFuZWwnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2F0dHIuaWRdPVwiaWRcIiBbbmdDbGFzc109XCIndWktcGFuZWwgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLXBhbmVsLXRpdGxlYmFyIHVpLXdpZGdldC1oZWFkZXIgdWktaGVscGVyLWNsZWFyZml4IHVpLWNvcm5lci1hbGwnOiB0cnVlLCAndWktcGFuZWwtdGl0bGViYXItY2xpY2thYmxlJzogKHRvZ2dsZWFibGUgJiYgdG9nZ2xlciA9PT0gJ2hlYWRlcicpfVwiIFxuICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd0hlYWRlclwiIChjbGljayk9XCJvbkhlYWRlckNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXBhbmVsLXRpdGxlXCIgKm5nSWY9XCJoZWFkZXJcIiBbYXR0ci5pZF09XCJpZCArICdfaGVhZGVyJ1wiPnt7aGVhZGVyfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1oZWFkZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJ0b2dnbGVhYmxlXCIgW2F0dHIuaWRdPVwiaWQgKyAnLWxhYmVsJ1wiIGNsYXNzPVwidWktcGFuZWwtdGl0bGViYXItaWNvbiB1aS1wYW5lbC10aXRsZWJhci10b2dnbGVyIHVpLWNvcm5lci1hbGwgdWktc3RhdGUtZGVmYXVsdFwiIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvbkljb25DbGljaygkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwib25JY29uQ2xpY2soJGV2ZW50KVwiIFthdHRyLmFyaWEtY29udHJvbHNdPVwiaWQgKyAnLWNvbnRlbnQnXCIgcm9sZT1cInRhYlwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiIWNvbGxhcHNlZFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbY2xhc3NdPVwiY29sbGFwc2VkID8gZXhwYW5kSWNvbiA6IGNvbGxhcHNlSWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgW2F0dHIuaWRdPVwiaWQgKyAnLWNvbnRlbnQnXCIgY2xhc3M9XCJ1aS1wYW5lbC1jb250ZW50LXdyYXBwZXJcIiBbQHBhbmVsQ29udGVudF09XCJjb2xsYXBzZWQgPyB7dmFsdWU6ICdoaWRkZW4nLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiBhbmltYXRpbmcgPyB0cmFuc2l0aW9uT3B0aW9ucyA6ICcwbXMnLCBoZWlnaHQ6ICcwJywgb3BhY2l0eTonMCd9fSA6IHt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiBhbmltYXRpbmcgPyB0cmFuc2l0aW9uT3B0aW9ucyA6ICcwbXMnLCBoZWlnaHQ6ICcqJywgb3BhY2l0eTogJzEnfX1cIiAoQHBhbmVsQ29udGVudC5kb25lKT1cIm9uVG9nZ2xlRG9uZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXBhbmVsLWNvbnRlbnQtd3JhcHBlci1vdmVyZmxvd24nOiBjb2xsYXBzZWR8fGFuaW1hdGluZ31cIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJyZWdpb25cIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJjb2xsYXBzZWRcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaWQgKyAnLWxhYmVsJ1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wYW5lbC1jb250ZW50IHVpLXdpZGdldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcGFuZWwtZm9vdGVyIHVpLXdpZGdldC1jb250ZW50XCIgKm5nSWY9XCJmb290ZXJGYWNldFwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcigncGFuZWxDb250ZW50JywgW1xuICAgICAgICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgndm9pZCcsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICd7e2hlaWdodH19JyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAne3tvcGFjaXR5fX0nXG4gICAgICAgICAgICB9KSwge3BhcmFtczoge2hlaWdodDogJzAnLCBvcGFjaXR5OiAnMCd9fSksXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcqJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlIDw9PiBoaWRkZW4nLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gaGlkZGVuJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKVxuICAgICAgICBdKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgUGFuZWwgaW1wbGVtZW50cyBCbG9ja2FibGVVSSB7XG5cbiAgICBASW5wdXQoKSB0b2dnbGVhYmxlOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBjb2xsYXBzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBleHBhbmRJY29uOiBzdHJpbmcgPSAncGkgcGktcGx1cyc7XG4gICAgXG4gICAgQElucHV0KCkgY29sbGFwc2VJY29uOiBzdHJpbmcgPSAncGkgcGktbWludXMnO1xuICBcbiAgICBASW5wdXQoKSBzaG93SGVhZGVyOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHRvZ2dsZXI6IHN0cmluZyA9IFwiaWNvblwiO1xuICAgIFxuICAgIEBPdXRwdXQoKSBjb2xsYXBzZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQmVmb3JlVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkFmdGVyVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzQwMG1zIGN1YmljLWJlemllcigwLjg2LCAwLCAwLjA3LCAxKSc7XG5cbiAgICBAQ29udGVudENoaWxkKEZvb3RlciwgeyBzdGF0aWM6IHRydWUgfSkgZm9vdGVyRmFjZXQ7XG4gICAgXG4gICAgYW5pbWF0aW5nOiBib29sZWFuO1xuICAgIFxuICAgIGlkOiBzdHJpbmcgPSBgdWktcGFuZWwtJHtpZHgrK31gO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBvbkhlYWRlckNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy50b2dnbGVyID09PSAnaGVhZGVyJykge1xuICAgICAgICAgICAgdGhpcy50b2dnbGUoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JY29uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnRvZ2dsZXIgPT09ICdpY29uJykge1xuICAgICAgICAgICAgdGhpcy50b2dnbGUoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHRvZ2dsZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkJlZm9yZVRvZ2dsZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlZH0pO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMudG9nZ2xlYWJsZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKVxuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kKGV2ZW50KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgZXhwYW5kKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkQ2hhbmdlLmVtaXQodGhpcy5jb2xsYXBzZWQpO1xuICAgIH1cbiAgICBcbiAgICBjb2xsYXBzZShldmVudCkge1xuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkQ2hhbmdlLmVtaXQodGhpcy5jb2xsYXBzZWQpO1xuICAgIH1cbiAgICBcbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50wqB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgfVxuICAgIFxuICAgIG9uVG9nZ2xlRG9uZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkFmdGVyVG9nZ2xlLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBjb2xsYXBzZWQ6IHRoaXMuY29sbGFwc2VkfSk7XG4gICAgfVxuXG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1BhbmVsLFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbUGFuZWxdXG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsTW9kdWxlIHsgfVxuIl19