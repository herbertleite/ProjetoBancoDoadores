var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
let idx = 0;
let Fieldset = class Fieldset {
    constructor(el) {
        this.el = el;
        this.collapsed = false;
        this.collapsedChange = new EventEmitter();
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = `ui-fieldset-${idx++}`;
    }
    toggle(event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.collapsed)
            this.expand(event);
        else
            this.collapse(event);
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
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
    }
};
Fieldset.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], Fieldset.prototype, "legend", void 0);
__decorate([
    Input()
], Fieldset.prototype, "toggleable", void 0);
__decorate([
    Input()
], Fieldset.prototype, "collapsed", void 0);
__decorate([
    Output()
], Fieldset.prototype, "collapsedChange", void 0);
__decorate([
    Output()
], Fieldset.prototype, "onBeforeToggle", void 0);
__decorate([
    Output()
], Fieldset.prototype, "onAfterToggle", void 0);
__decorate([
    Input()
], Fieldset.prototype, "style", void 0);
__decorate([
    Input()
], Fieldset.prototype, "styleClass", void 0);
__decorate([
    Input()
], Fieldset.prototype, "transitionOptions", void 0);
Fieldset = __decorate([
    Component({
        selector: 'p-fieldset',
        template: `
        <fieldset [attr.id]="id" [ngClass]="{'ui-fieldset ui-widget ui-widget-content ui-corner-all': true, 'ui-fieldset-toggleable': toggleable}" [ngStyle]="style" [class]="styleClass">
            <legend class="ui-fieldset-legend ui-corner-all ui-state-default ui-unselectable-text">
                <ng-container *ngIf="toggleable; else legendContent">
                    <a tabindex="0" (click)="toggle($event)" (keydown.enter)="toggle($event)" [attr.aria-controls]="id + '-content'" [attr.aria-expanded]="!collapsed">
                        <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                    </a>
                </ng-container>
                <ng-template #legendContent>
                    <span class="ui-fieldset-toggler pi" *ngIf="toggleable" [ngClass]="{'pi-minus': !collapsed,'pi-plus':collapsed}"></span>
                    <span class="ui-fieldset-legend-text">{{legend}}</span>
                    <ng-content select="p-header"></ng-content>
                </ng-template>
            </legend>
            <div [attr.id]="id + '-content'" class="ui-fieldset-content-wrapper" [@fieldsetContent]="collapsed ? {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}}" 
                        [attr.aria-labelledby]="id" [ngClass]="{'ui-fieldset-content-wrapper-overflown': collapsed||animating}" [attr.aria-hidden]="collapsed"
                         (@fieldsetContent.done)="onToggleDone($event)" role="region">
                <div class="ui-fieldset-content">
                    <ng-content></ng-content>
                </div>
            </div>
        </fieldset>
    `,
        animations: [
            trigger('fieldsetContent', [
                state('hidden', style({
                    height: '0'
                })),
                state('void', style({
                    height: '{{height}}'
                }), { params: { height: '0' } }),
                state('visible', style({
                    height: '*'
                })),
                transition('visible => hidden', animate('{{transitionParams}}')),
                transition('hidden => visible', animate('{{transitionParams}}')),
                transition('void => hidden', animate('{{transitionParams}}')),
                transition('void => visible', animate('{{transitionParams}}'))
            ])
        ]
    })
], Fieldset);
export { Fieldset };
let FieldsetModule = class FieldsetModule {
};
FieldsetModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Fieldset, SharedModule],
        declarations: [Fieldset]
    })
], FieldsetModule);
export { FieldsetModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2ZpZWxkc2V0LyIsInNvdXJjZXMiOlsiZmllbGRzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RGLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDM0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFHekMsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDO0FBNkNwQixJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBc0JqQixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQWhCekIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUxQixvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhELG1CQUFjLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdkQsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU12RCxzQkFBaUIsR0FBVyxzQ0FBc0MsQ0FBQztRQU01RSxPQUFFLEdBQVcsZUFBZSxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBRkMsQ0FBQztJQUl0QyxNQUFNLENBQUMsS0FBSztRQUNSLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFB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QUFFLENBQUMsUUFBUSxDQUFDO0tBQzNCLENBQUM7R0FDVyxjQUFjLENBQUk7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsRWxlbWVudFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge3RyaWdnZXIsc3RhdGUsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtTaGFyZWRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7QmxvY2thYmxlVUl9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxubGV0IGlkeDogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWZpZWxkc2V0JyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZmllbGRzZXQgW2F0dHIuaWRdPVwiaWRcIiBbbmdDbGFzc109XCJ7J3VpLWZpZWxkc2V0IHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzogdHJ1ZSwgJ3VpLWZpZWxkc2V0LXRvZ2dsZWFibGUnOiB0b2dnbGVhYmxlfVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxsZWdlbmQgY2xhc3M9XCJ1aS1maWVsZHNldC1sZWdlbmQgdWktY29ybmVyLWFsbCB1aS1zdGF0ZS1kZWZhdWx0IHVpLXVuc2VsZWN0YWJsZS10ZXh0XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRvZ2dsZWFibGU7IGVsc2UgbGVnZW5kQ29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiAoY2xpY2spPVwidG9nZ2xlKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJ0b2dnbGUoJGV2ZW50KVwiIFthdHRyLmFyaWEtY29udHJvbHNdPVwiaWQgKyAnLWNvbnRlbnQnXCIgW2F0dHIuYXJpYS1leHBhbmRlZF09XCIhY29sbGFwc2VkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibGVnZW5kQ29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNsZWdlbmRDb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWZpZWxkc2V0LXRvZ2dsZXIgcGlcIiAqbmdJZj1cInRvZ2dsZWFibGVcIiBbbmdDbGFzc109XCJ7J3BpLW1pbnVzJzogIWNvbGxhcHNlZCwncGktcGx1cyc6Y29sbGFwc2VkfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1maWVsZHNldC1sZWdlbmQtdGV4dFwiPnt7bGVnZW5kfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L2xlZ2VuZD5cbiAgICAgICAgICAgIDxkaXYgW2F0dHIuaWRdPVwiaWQgKyAnLWNvbnRlbnQnXCIgY2xhc3M9XCJ1aS1maWVsZHNldC1jb250ZW50LXdyYXBwZXJcIiBbQGZpZWxkc2V0Q29udGVudF09XCJjb2xsYXBzZWQgPyB7dmFsdWU6ICdoaWRkZW4nLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiB0cmFuc2l0aW9uT3B0aW9ucywgaGVpZ2h0OiAnMCd9fSA6IHt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiBhbmltYXRpbmcgPyB0cmFuc2l0aW9uT3B0aW9ucyA6ICcwbXMnLCBoZWlnaHQ6ICcqJ319XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiaWRcIiBbbmdDbGFzc109XCJ7J3VpLWZpZWxkc2V0LWNvbnRlbnQtd3JhcHBlci1vdmVyZmxvd24nOiBjb2xsYXBzZWR8fGFuaW1hdGluZ31cIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJjb2xsYXBzZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIChAZmllbGRzZXRDb250ZW50LmRvbmUpPVwib25Ub2dnbGVEb25lKCRldmVudClcIiByb2xlPVwicmVnaW9uXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWZpZWxkc2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZmllbGRzZXQ+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ2ZpZWxkc2V0Q29udGVudCcsIFtcbiAgICAgICAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMCdcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIGhlaWdodDogJ3t7aGVpZ2h0fX0nXG4gICAgICAgICAgICB9KSwge3BhcmFtczoge2hlaWdodDogJzAnfX0pLFxuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnKidcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gaGlkZGVuJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCdoaWRkZW4gPT4gdmlzaWJsZScsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiBoaWRkZW4nLCBhbmltYXRlKCd7e3RyYW5zaXRpb25QYXJhbXN9fScpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpXG4gICAgICAgIF0pXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGaWVsZHNldCBpbXBsZW1lbnRzIEJsb2NrYWJsZVVJIHtcblxuICAgIEBJbnB1dCgpIGxlZ2VuZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdG9nZ2xlYWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGNvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIGNvbGxhcHNlZENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uQmVmb3JlVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkFmdGVyVG9nZ2xlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgICAgICBcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0cmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzQwMG1zIGN1YmljLWJlemllcigwLjg2LCAwLCAwLjA3LCAxKSc7XG4gICAgXG4gICAgcHVibGljIGFuaW1hdGluZzogYm9vbGVhbjtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuICAgIFxuICAgIGlkOiBzdHJpbmcgPSBgdWktZmllbGRzZXQtJHtpZHgrK31gO1xuICAgICAgICBcbiAgICB0b2dnbGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkJlZm9yZVRvZ2dsZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlZH0pO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuY29sbGFwc2VkKVxuICAgICAgICAgICAgdGhpcy5leHBhbmQoZXZlbnQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlKGV2ZW50KTtcbiAgICAgICAgICAgIFxuICAgICAgICB0aGlzLm9uQWZ0ZXJUb2dnbGUuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGNvbGxhcHNlZDogdGhpcy5jb2xsYXBzZWR9KTsgICBcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgZXhwYW5kKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkQ2hhbmdlLmVtaXQodGhpcy5jb2xsYXBzZWQpO1xuICAgIH1cbiAgICBcbiAgICBjb2xsYXBzZShldmVudCkge1xuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkQ2hhbmdlLmVtaXQodGhpcy5jb2xsYXBzZWQpO1xuICAgIH1cbiAgICBcbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50wqB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgfVxuICAgIFxuICAgIG9uVG9nZ2xlRG9uZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbRmllbGRzZXQsU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtGaWVsZHNldF1cbn0pXG5leHBvcnQgY2xhc3MgRmllbGRzZXRNb2R1bGUgeyB9Il19