var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Component, ElementRef, AfterContentInit, OnDestroy, Input, Output, EventEmitter, ContentChildren, QueryList, ChangeDetectorRef, Inject, forwardRef, TemplateRef, ViewRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule, Header, PrimeTemplate } from 'primeng/api';
let idx = 0;
let AccordionTab = class AccordionTab {
    constructor(accordion, changeDetector) {
        this.changeDetector = changeDetector;
        this.cache = true;
        this.selectedChange = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = `ui-accordiontab-${idx++}`;
        this.accordion = accordion;
    }
    get selected() {
        return this._selected;
    }
    set selected(val) {
        this._selected = val;
        if (!this.loaded) {
            this.changeDetector.detectChanges();
        }
    }
    get animating() {
        return this._animating;
    }
    set animating(val) {
        this._animating = val;
        if (!this.changeDetector.destroyed) {
            this.changeDetector.detectChanges();
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    toggle(event) {
        if (this.disabled || this.animating) {
            return false;
        }
        this.animating = true;
        let index = this.findTabIndex();
        if (this.selected) {
            this.selected = false;
            this.accordion.onClose.emit({ originalEvent: event, index: index });
        }
        else {
            if (!this.accordion.multiple) {
                for (var i = 0; i < this.accordion.tabs.length; i++) {
                    this.accordion.tabs[i].selected = false;
                    this.accordion.tabs[i].selectedChange.emit(false);
                }
            }
            this.selected = true;
            this.loaded = true;
            this.accordion.onOpen.emit({ originalEvent: event, index: index });
        }
        this.selectedChange.emit(this.selected);
        event.preventDefault();
    }
    findTabIndex() {
        let index = -1;
        for (var i = 0; i < this.accordion.tabs.length; i++) {
            if (this.accordion.tabs[i] == this) {
                index = i;
                break;
            }
        }
        return index;
    }
    get hasHeaderFacet() {
        return this.headerFacet && this.headerFacet.length > 0;
    }
    onToggleDone(event) {
        this.animating = false;
    }
    onKeydown(event) {
        if (event.which === 32 || event.which === 13) {
            this.toggle(event);
            event.preventDefault();
        }
    }
    ngOnDestroy() {
        this.accordion.tabs.splice(this.findTabIndex(), 1);
    }
};
AccordionTab.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => Accordion),] }] },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], AccordionTab.prototype, "header", void 0);
__decorate([
    Input()
], AccordionTab.prototype, "disabled", void 0);
__decorate([
    Input()
], AccordionTab.prototype, "cache", void 0);
__decorate([
    Output()
], AccordionTab.prototype, "selectedChange", void 0);
__decorate([
    Input()
], AccordionTab.prototype, "transitionOptions", void 0);
__decorate([
    ContentChildren(Header)
], AccordionTab.prototype, "headerFacet", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], AccordionTab.prototype, "templates", void 0);
__decorate([
    Input()
], AccordionTab.prototype, "selected", null);
AccordionTab = __decorate([
    Component({
        selector: 'p-accordionTab',
        template: `
        <div class="ui-accordion-header ui-state-default ui-corner-all" [ngClass]="{'ui-state-active': selected,'ui-state-disabled':disabled}">
            <a [attr.tabindex]="disabled ? -1 : 0" [attr.id]="id" [attr.aria-controls]="id + '-content'" role="tab" [attr.aria-expanded]="selected" (click)="toggle($event)" 
                (keydown)="onKeydown($event)">
                <span class="ui-accordion-toggle-icon" [ngClass]="selected ? accordion.collapseIcon : accordion.expandIcon"></span>
                <span class="ui-accordion-header-text" *ngIf="!hasHeaderFacet">
                    {{header}}
                </span>
                <ng-content select="p-header" *ngIf="hasHeaderFacet"></ng-content>
            </a>
        </div>
        <div [attr.id]="id + '-content'" class="ui-accordion-content-wrapper" [@tabContent]="selected ? {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}" (@tabContent.done)="onToggleDone($event)"
            [ngClass]="{'ui-accordion-content-wrapper-overflown': !selected||animating}" 
            role="region" [attr.aria-hidden]="!selected" [attr.aria-labelledby]="id">
            <div class="ui-accordion-content ui-widget-content">
                <ng-content></ng-content>
                <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </ng-container>
            </div>
        </div>
    `,
        animations: [
            trigger('tabContent', [
                state('hidden', style({
                    height: '0'
                })),
                state('void', style({
                    height: '{{height}}'
                }), { params: { height: '0' } }),
                state('visible', style({
                    height: '*'
                })),
                transition('visible <=> hidden', animate('{{transitionParams}}')),
                transition('void => hidden', animate('{{transitionParams}}')),
                transition('void => visible', animate('{{transitionParams}}'))
            ])
        ]
    }),
    __param(0, Inject(forwardRef(() => Accordion)))
], AccordionTab);
export { AccordionTab };
let Accordion = class Accordion {
    constructor(el, changeDetector) {
        this.el = el;
        this.changeDetector = changeDetector;
        this.onClose = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.expandIcon = 'pi pi-fw pi-chevron-right';
        this.collapseIcon = 'pi pi-fw pi-chevron-down';
        this.tabs = [];
    }
    ngAfterContentInit() {
        this.initTabs();
        this.tabListSubscription = this.tabList.changes.subscribe(_ => {
            this.initTabs();
            this.changeDetector.markForCheck();
        });
    }
    initTabs() {
        this.tabs = this.tabList.toArray();
        this.updateSelectionState();
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(val) {
        this._activeIndex = val;
        this.updateSelectionState();
    }
    updateSelectionState() {
        if (this.tabs && this.tabs.length && this._activeIndex != null) {
            for (let i = 0; i < this.tabs.length; i++) {
                let selected = this.multiple ? this._activeIndex.includes(i) : (i === this._activeIndex);
                let changed = selected !== this.tabs[i].selected;
                if (changed) {
                    this.tabs[i].animating = true;
                    this.tabs[i].selected = selected;
                    this.tabs[i].selectedChange.emit(selected);
                }
            }
        }
    }
    ngOnDestroy() {
        if (this.tabListSubscription) {
            this.tabListSubscription.unsubscribe();
        }
    }
};
Accordion.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], Accordion.prototype, "multiple", void 0);
__decorate([
    Output()
], Accordion.prototype, "onClose", void 0);
__decorate([
    Output()
], Accordion.prototype, "onOpen", void 0);
__decorate([
    Input()
], Accordion.prototype, "style", void 0);
__decorate([
    Input()
], Accordion.prototype, "styleClass", void 0);
__decorate([
    Input()
], Accordion.prototype, "expandIcon", void 0);
__decorate([
    Input()
], Accordion.prototype, "collapseIcon", void 0);
__decorate([
    ContentChildren(AccordionTab)
], Accordion.prototype, "tabList", void 0);
__decorate([
    Input()
], Accordion.prototype, "activeIndex", null);
Accordion = __decorate([
    Component({
        selector: 'p-accordion',
        template: `
        <div [ngClass]="'ui-accordion ui-widget ui-helper-reset'" [ngStyle]="style" [class]="styleClass" role="tablist">
            <ng-content></ng-content>
        </div>
    `
    })
], Accordion);
export { Accordion };
let AccordionModule = class AccordionModule {
};
AccordionModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Accordion, AccordionTab, SharedModule],
        declarations: [Accordion, AccordionTab]
    })
], AccordionModule);
export { AccordionModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9hY2NvcmRpb24vIiwic291cmNlcyI6WyJhY2NvcmRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDOUYsZUFBZSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEgsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSWxFLElBQUksR0FBRyxHQUFXLENBQUMsQ0FBQztBQTJDcEIsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQW1EckIsWUFBaUQsU0FBUyxFQUFTLGNBQWlDO1FBQWpDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQTdDM0YsVUFBSyxHQUFZLElBQUksQ0FBQztRQUVyQixtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXhELHNCQUFpQixHQUFXLHNDQUFzQyxDQUFDO1FBbUM1RSxPQUFFLEdBQVcsbUJBQW1CLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFPcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFzQixDQUFDO0lBQzVDLENBQUM7SUFqQ1EsSUFBSSxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxRQUFRLENBQUMsR0FBUTtRQUNq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ZUFBZSxHQUE1QixNQUFhLGVBQWU7Q0FBSSxDQUFBO0FBQW5CLGVBQWU7SUFMM0IsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO1FBQzlDLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBQyxZQUFZLENBQUM7S0FDekMsQ0FBQztHQUNXLGVBQWUsQ0FBSTtTQUFuQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFxuICAgIENvbnRlbnRDaGlsZHJlbiwgUXVlcnlMaXN0LCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0LCBmb3J3YXJkUmVmLCBUZW1wbGF0ZVJlZiwgVmlld1JlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUsIEhlYWRlciwgUHJpbWVUZW1wbGF0ZSB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEJsb2NrYWJsZVVJIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbmxldCBpZHg6IG51bWJlciA9IDA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1hY2NvcmRpb25UYWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1hY2NvcmRpb24taGVhZGVyIHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtYWN0aXZlJzogc2VsZWN0ZWQsJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIj5cbiAgICAgICAgICAgIDxhIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gLTEgOiAwXCIgW2F0dHIuaWRdPVwiaWRcIiBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cImlkICsgJy1jb250ZW50J1wiIHJvbGU9XCJ0YWJcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInNlbGVjdGVkXCIgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCIgXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWFjY29yZGlvbi10b2dnbGUtaWNvblwiIFtuZ0NsYXNzXT1cInNlbGVjdGVkID8gYWNjb3JkaW9uLmNvbGxhcHNlSWNvbiA6IGFjY29yZGlvbi5leHBhbmRJY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktYWNjb3JkaW9uLWhlYWRlci10ZXh0XCIgKm5nSWY9XCIhaGFzSGVhZGVyRmFjZXRcIj5cbiAgICAgICAgICAgICAgICAgICAge3toZWFkZXJ9fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiICpuZ0lmPVwiaGFzSGVhZGVyRmFjZXRcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IFthdHRyLmlkXT1cImlkICsgJy1jb250ZW50J1wiIGNsYXNzPVwidWktYWNjb3JkaW9uLWNvbnRlbnQtd3JhcHBlclwiIFtAdGFiQ29udGVudF09XCJzZWxlY3RlZCA/IHt2YWx1ZTogJ3Zpc2libGUnLCBwYXJhbXM6IHt0cmFuc2l0aW9uUGFyYW1zOiBhbmltYXRpbmcgPyB0cmFuc2l0aW9uT3B0aW9ucyA6ICcwbXMnLCBoZWlnaHQ6ICcqJ319IDoge3ZhbHVlOiAnaGlkZGVuJywgcGFyYW1zOiB7dHJhbnNpdGlvblBhcmFtczogdHJhbnNpdGlvbk9wdGlvbnMsIGhlaWdodDogJzAnfX1cIiAoQHRhYkNvbnRlbnQuZG9uZSk9XCJvblRvZ2dsZURvbmUoJGV2ZW50KVwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWFjY29yZGlvbi1jb250ZW50LXdyYXBwZXItb3ZlcmZsb3duJzogIXNlbGVjdGVkfHxhbmltYXRpbmd9XCIgXG4gICAgICAgICAgICByb2xlPVwicmVnaW9uXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIXNlbGVjdGVkXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImlkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktYWNjb3JkaW9uLWNvbnRlbnQgdWktd2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnRlbnRUZW1wbGF0ZSAmJiAoY2FjaGUgPyBsb2FkZWQgOiBzZWxlY3RlZClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCd0YWJDb250ZW50JywgW1xuICAgICAgICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcwJ1xuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAne3toZWlnaHR9fSdcbiAgICAgICAgICAgIH0pLCB7cGFyYW1zOiB7aGVpZ2h0OiAnMCd9fSksXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcqJ1xuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA8PT4gaGlkZGVuJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGhpZGRlbicsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSlcbiAgICAgICAgXSlcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFjY29yZGlvblRhYiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgY2FjaGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnNDAwbXMgY3ViaWMtYmV6aWVyKDAuODYsIDAsIDAuMDcsIDEpJztcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oSGVhZGVyKSBoZWFkZXJGYWNldDogUXVlcnlMaXN0PEhlYWRlcj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PGFueT47XG5cbiAgICBwcml2YXRlIF9zZWxlY3RlZDogYm9vbGVhbjtcblxuICAgIHByaXZhdGUgX2FuaW1hdGluZzogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGdldCBzZWxlY3RlZCgpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNlbGVjdGVkKHZhbDogYW55KSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsO1xuICAgICAgICBcbiAgICAgICAgaWYgKCF0aGlzLmxvYWRlZCkge1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rvci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgYW5pbWF0aW5nKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW5pbWF0aW5nO1xuICAgIH1cbiAgICBzZXQgYW5pbWF0aW5nKHZhbDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9hbmltYXRpbmcgPSB2YWw7XG5cbiAgICAgICAgaWYgKCEodGhpcy5jaGFuZ2VEZXRlY3RvciBhcyBWaWV3UmVmKS5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgaWQ6IHN0cmluZyA9IGB1aS1hY2NvcmRpb250YWItJHtpZHgrK31gO1xuXG4gICAgbG9hZGVkOiBib29sZWFuO1xuXG4gICAgYWNjb3JkaW9uOiBBY2NvcmRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gQWNjb3JkaW9uKSkgYWNjb3JkaW9uLCBwdWJsaWMgY2hhbmdlRGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuYWNjb3JkaW9uID0gYWNjb3JkaW9uIGFzIEFjY29yZGlvbjtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaChpdGVtLmdldFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2NvbnRlbnQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0b2dnbGUoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maW5kVGFiSW5kZXgoKTtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5hY2NvcmRpb24ub25DbG9zZS5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGluZGV4OiBpbmRleCB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5hY2NvcmRpb24ubXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYWNjb3JkaW9uLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2NvcmRpb24udGFic1tpXS5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjY29yZGlvbi50YWJzW2ldLnNlbGVjdGVkQ2hhbmdlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFjY29yZGlvbi5vbk9wZW4uZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogaW5kZXggfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZCk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBmaW5kVGFiSW5kZXgoKSB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYWNjb3JkaW9uLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjY29yZGlvbi50YWJzW2ldID09IHRoaXMpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIGdldCBoYXNIZWFkZXJGYWNldCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhZGVyRmFjZXQgJiYgdGhpcy5oZWFkZXJGYWNldC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIG9uVG9nZ2xlRG9uZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAzMiB8fCBldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGV2ZW50KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5hY2NvcmRpb24udGFicy5zcGxpY2UodGhpcy5maW5kVGFiSW5kZXgoKSwgMSk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtYWNjb3JkaW9uJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIid1aS1hY2NvcmRpb24gdWktd2lkZ2V0IHVpLWhlbHBlci1yZXNldCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgcm9sZT1cInRhYmxpc3RcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBBY2NvcmRpb24gaW1wbGVtZW50cyBCbG9ja2FibGVVSSwgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICBcbiAgICBASW5wdXQoKSBtdWx0aXBsZTogYm9vbGVhbjtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25DbG9zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25PcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZXhwYW5kSWNvbjogc3RyaW5nID0gJ3BpIHBpLWZ3IHBpLWNoZXZyb24tcmlnaHQnO1xuXG4gICAgQElucHV0KCkgY29sbGFwc2VJY29uOiBzdHJpbmcgPSAncGkgcGktZncgcGktY2hldnJvbi1kb3duJztcbiAgICBcbiAgICBAQ29udGVudENoaWxkcmVuKEFjY29yZGlvblRhYikgdGFiTGlzdDogUXVlcnlMaXN0PEFjY29yZGlvblRhYj47XG5cbiAgICB0YWJMaXN0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gICAgXG4gICAgcHJpdmF0ZSBfYWN0aXZlSW5kZXg6IGFueTtcbiAgICBcbiAgICBwdWJsaWMgdGFiczogQWNjb3JkaW9uVGFiW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0VGFicygpO1xuXG4gICAgICAgIHRoaXMudGFiTGlzdFN1YnNjcmlwdGlvbiA9IHRoaXMudGFiTGlzdC5jaGFuZ2VzLnN1YnNjcmliZShfID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRhYnMoKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRUYWJzKCk6IGFueSB7XG4gICAgICAgIHRoaXMudGFicyA9IHRoaXMudGFiTGlzdC50b0FycmF5KCk7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uU3RhdGUoKTtcbiAgICB9XG4gICAgICBcbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50wqB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgfSBcbiAgICBcbiAgICBASW5wdXQoKSBnZXQgYWN0aXZlSW5kZXgoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZUluZGV4O1xuICAgIH1cblxuICAgIHNldCBhY3RpdmVJbmRleCh2YWw6IGFueSkge1xuICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IHZhbDtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25TdGF0ZSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNlbGVjdGlvblN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy50YWJzICYmIHRoaXMudGFicy5sZW5ndGggJiYgdGhpcy5fYWN0aXZlSW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLm11bHRpcGxlID8gdGhpcy5fYWN0aXZlSW5kZXguaW5jbHVkZXMoaSkgOiAoaSA9PT0gdGhpcy5fYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgIGxldCBjaGFuZ2VkID0gc2VsZWN0ZWQgIT09IHRoaXMudGFic1tpXS5zZWxlY3RlZDtcblxuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFic1tpXS5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhYnNbaV0uc2VsZWN0ZWQgPSBzZWxlY3RlZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJzW2ldLnNlbGVjdGVkQ2hhbmdlLmVtaXQoc2VsZWN0ZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy50YWJMaXN0U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRhYkxpc3RTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbQWNjb3JkaW9uLEFjY29yZGlvblRhYixTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0FjY29yZGlvbixBY2NvcmRpb25UYWJdXG59KVxuZXhwb3J0IGNsYXNzIEFjY29yZGlvbk1vZHVsZSB7IH1cbiJdfQ==