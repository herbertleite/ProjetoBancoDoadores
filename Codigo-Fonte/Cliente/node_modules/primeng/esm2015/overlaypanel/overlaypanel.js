var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, OnDestroy, EventEmitter, Renderer2, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { trigger, state, style, transition, animate } from '@angular/animations';
let OverlayPanel = class OverlayPanel {
    constructor(el, renderer, cd, zone) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.zone = zone;
        this.dismissable = true;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.visible = false;
        this.isContainerClicked = true;
    }
    onContainerClick() {
        this.isContainerClicked = true;
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener && this.dismissable) {
            this.zone.runOutsideAngular(() => {
                let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
                this.documentClickListener = this.renderer.listen('document', documentEvent, (event) => {
                    if (!this.container.contains(event.target) && this.target !== event.target && !this.target.contains(event.target) && !this.isContainerClicked) {
                        this.zone.run(() => {
                            this.hide();
                        });
                    }
                    this.isContainerClicked = false;
                    this.cd.markForCheck();
                });
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    toggle(event, target) {
        if (this.visible) {
            this.visible = false;
            if (this.hasTargetChanged(event, target)) {
                this.target = target || event.currentTarget || event.target;
                setTimeout(() => {
                    this.visible = true;
                }, 200);
            }
        }
        else {
            this.show(event, target);
        }
    }
    show(event, target) {
        this.target = target || event.currentTarget || event.target;
        this.visible = true;
    }
    hasTargetChanged(event, target) {
        return this.target != null && this.target !== (target || event.currentTarget || event.target);
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }
    restoreAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.onShow.emit(null);
                this.appendContainer();
                if (this.autoZIndex) {
                    this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                DomHandler.absolutePosition(this.container, this.target);
                if (DomHandler.getOffset(this.container).top < DomHandler.getOffset(this.target).top) {
                    DomHandler.addClass(this.container, 'ui-overlaypanel-flipped');
                }
                if (Math.floor(DomHandler.getOffset(this.container).left) < Math.floor(DomHandler.getOffset(this.target).left) &&
                    DomHandler.getOffset(this.container).left > 0) {
                    DomHandler.addClass(this.container, 'ui-overlaypanel-shifted');
                }
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                break;
            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
                break;
        }
    }
    hide() {
        this.visible = false;
    }
    onCloseClick(event) {
        this.hide();
        event.preventDefault();
    }
    onWindowResize(event) {
        this.hide();
    }
    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    onContainerDestroy() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
    }
    ngOnDestroy() {
        this.target = null;
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
    }
};
OverlayPanel.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: NgZone }
];
__decorate([
    Input()
], OverlayPanel.prototype, "dismissable", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "showCloseIcon", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "style", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "styleClass", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "appendTo", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "ariaCloseLabel", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "showTransitionOptions", void 0);
__decorate([
    Input()
], OverlayPanel.prototype, "hideTransitionOptions", void 0);
__decorate([
    Output()
], OverlayPanel.prototype, "onShow", void 0);
__decorate([
    Output()
], OverlayPanel.prototype, "onHide", void 0);
OverlayPanel = __decorate([
    Component({
        selector: 'p-overlayPanel',
        template: `
        <div [ngClass]="'ui-overlaypanel ui-widget ui-widget-content ui-corner-all ui-shadow'" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick()"
            [@animation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@animation.start)="onAnimationStart($event)" *ngIf="visible">
            <div class="ui-overlaypanel-content">
                <ng-content></ng-content>
            </div>
            <a tabindex="0" *ngIf="showCloseIcon" class="ui-overlaypanel-close ui-state-default" (click)="onCloseClick($event)" (keydown.enter)="hide()" [attr.aria-label]="ariaCloseLabel">
                <span class="ui-overlaypanel-close-icon pi pi-times"></span>
            </a>
        </div>
    `,
        animations: [
            trigger('animation', [
                state('void', style({
                    transform: 'translateY(5%)',
                    opacity: 0
                })),
                state('visible', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                transition('void => visible', animate('{{showTransitionParams}}')),
                transition('visible => void', animate('{{hideTransitionParams}}'))
            ])
        ]
    })
], OverlayPanel);
export { OverlayPanel };
let OverlayPanelModule = class OverlayPanelModule {
};
OverlayPanelModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [OverlayPanel],
        declarations: [OverlayPanel]
    })
], OverlayPanelModule);
export { OverlayPanelModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheXBhbmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9vdmVybGF5cGFuZWwvIiwic291cmNlcyI6WyJvdmVybGF5cGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ25JLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBOEIxRixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBd0NyQixZQUFtQixFQUFjLEVBQVMsUUFBbUIsRUFBVSxFQUFxQixFQUFVLElBQVk7UUFBL0YsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQVE7UUF0Q3pHLGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBVTVCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFJM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUV2QiwwQkFBcUIsR0FBVyxnQkFBZ0IsQ0FBQztRQUVqRCwwQkFBcUIsR0FBVyxlQUFlLENBQUM7UUFFL0MsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRS9DLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUl6RCxZQUFPLEdBQVksS0FBSyxDQUFDO1FBRXpCLHVCQUFrQixHQUFZLElBQUksQ0FBQztJQVVrRixDQUFD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b0JBQ2hCLFNBQVMsRUFBRSxnQkFBZ0I7b0JBQzNCLE9BQU8sRUFBRSxDQUFDO2lCQUNiLENBQUMsQ0FBQztnQkFDSCxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztvQkFDbkIsU0FBUyxFQUFFLGVBQWU7b0JBQzFCLE9BQU8sRUFBRSxDQUFDO2lCQUNiLENBQUMsQ0FBQztnQkFDSCxVQUFVLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQ2xFLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQzthQUNyRSxDQUFDO1NBQ0w7S0FDSixDQUFDO0dBQ1csWUFBWSxDQWlMeEI7U0FqTFksWUFBWTtBQXdMekIsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7Q0FBSSxDQUFBO0FBQXRCLGtCQUFrQjtJQUw5QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLFlBQVksRUFBRSxDQUFDLFlBQVksQ0FBQztLQUMvQixDQUFDO0dBQ1csa0JBQWtCLENBQUk7U0FBdEIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsT3V0cHV0LE9uRGVzdHJveSxFdmVudEVtaXR0ZXIsUmVuZGVyZXIyLEVsZW1lbnRSZWYsQ2hhbmdlRGV0ZWN0b3JSZWYsTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQge3RyaWdnZXIsc3RhdGUsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlLEFuaW1hdGlvbkV2ZW50fSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW92ZXJsYXlQYW5lbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktb3ZlcmxheXBhbmVsIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsIHVpLXNoYWRvdydcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKGNsaWNrKT1cIm9uQ29udGFpbmVyQ2xpY2soKVwiXG4gICAgICAgICAgICBbQGFuaW1hdGlvbl09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCIgKEBhbmltYXRpb24uc3RhcnQpPVwib25BbmltYXRpb25TdGFydCgkZXZlbnQpXCIgKm5nSWY9XCJ2aXNpYmxlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktb3ZlcmxheXBhbmVsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxhIHRhYmluZGV4PVwiMFwiICpuZ0lmPVwic2hvd0Nsb3NlSWNvblwiIGNsYXNzPVwidWktb3ZlcmxheXBhbmVsLWNsb3NlIHVpLXN0YXRlLWRlZmF1bHRcIiAoY2xpY2spPVwib25DbG9zZUNsaWNrKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJoaWRlKClcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFDbG9zZUxhYmVsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1vdmVybGF5cGFuZWwtY2xvc2UtaWNvbiBwaSBwaS10aW1lc1wiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ2FuaW1hdGlvbicsIFtcbiAgICAgICAgICAgIHN0YXRlKCd2b2lkJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNSUpJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHZpc2libGUnLCBhbmltYXRlKCd7e3Nob3dUcmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IHZvaWQnLCBhbmltYXRlKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nKSlcbiAgICAgICAgXSlcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE92ZXJsYXlQYW5lbCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBkaXNtaXNzYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzaG93Q2xvc2VJY29uOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBhcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBhcmlhQ2xvc2VMYWJlbDogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGJhc2VaSW5kZXg6IG51bWJlciA9IDA7XG4gICAgXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMjI1bXMgZWFzZS1vdXQnO1xuXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMTk1bXMgZWFzZS1pbic7XG5cbiAgICBAT3V0cHV0KCkgb25TaG93OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkhpZGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIGNvbnRhaW5lcjogSFRNTERpdkVsZW1lbnQ7XG5cbiAgICB2aXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBpc0NvbnRhaW5lckNsaWNrZWQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG4gICAgICAgICAgICBcbiAgICB0YXJnZXQ6IGFueTtcbiAgICBcbiAgICB3aWxsSGlkZTogYm9vbGVhbjtcbiAgICAgICAgXG4gICAgZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogYW55O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIHpvbmU6IE5nWm9uZSkge31cbiAgICAgICAgXG4gICAgb25Db250YWluZXJDbGljaygpIHtcbiAgICAgICAgdGhpcy5pc0NvbnRhaW5lckNsaWNrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgJiYgdGhpcy5kaXNtaXNzYWJsZSkge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZG9jdW1lbnRFdmVudCA9IERvbUhhbmRsZXIuaXNJT1MoKSA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljayc7XG4gICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCBkb2N1bWVudEV2ZW50LCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lci5jb250YWlucyhldmVudC50YXJnZXQpICYmIHRoaXMudGFyZ2V0ICE9PSBldmVudC50YXJnZXQgJibCoCF0aGlzLnRhcmdldC5jb250YWlucyhldmVudC50YXJnZXQpICYmICF0aGlzLmlzQ29udGFpbmVyQ2xpY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNDb250YWluZXJDbGlja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB0b2dnbGUoZXZlbnQsIHRhcmdldD8pIHtcbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1RhcmdldENoYW5nZWQoZXZlbnQsIHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldHx8ZXZlbnQuY3VycmVudFRhcmdldHx8ZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdyhldmVudCwgdGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3coZXZlbnQsIHRhcmdldD8pIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXR8fGV2ZW50LmN1cnJlbnRUYXJnZXR8fGV2ZW50LnRhcmdldDtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBoYXNUYXJnZXRDaGFuZ2VkKGV2ZW50LCB0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0ICE9IG51bGwgJiYgdGhpcy50YXJnZXQgIT09ICh0YXJnZXR8fGV2ZW50LmN1cnJlbnRUYXJnZXR8fGV2ZW50LnRhcmdldCk7XG4gICAgfVxuXG4gICAgYXBwZW5kQ29udGFpbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgaWYgKHRoaXMuYXBwZW5kVG8gPT09ICdib2R5JylcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyLCB0aGlzLmFwcGVuZFRvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVBcHBlbmQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25BbmltYXRpb25TdGFydChldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZXZlbnQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU2hvdy5lbWl0KG51bGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ29udGFpbmVyKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMuY29udGFpbmVyLCB0aGlzLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMuY29udGFpbmVyKS50b3AgPCBEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLnRhcmdldCkudG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXIsICd1aS1vdmVybGF5cGFuZWwtZmxpcHBlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5mbG9vcihEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLmNvbnRhaW5lcikubGVmdCkgPCBNYXRoLmZsb29yKERvbUhhbmRsZXIuZ2V0T2Zmc2V0KHRoaXMudGFyZ2V0KS5sZWZ0KSAmJlxuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLmNvbnRhaW5lcikubGVmdCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmNvbnRhaW5lciwgJ3VpLW92ZXJsYXlwYW5lbC1zaGlmdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ29udGFpbmVyRGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHRoaXMub25IaWRlLmVtaXQoe30pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbkNsb3NlQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25XaW5kb3dSZXNpemUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lciA9IHRoaXMub25XaW5kb3dSZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG4gICAgfVxuICAgIFxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29udGFpbmVyRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnJlc3RvcmVBcHBlbmQoKTtcbiAgICAgICAgICAgIHRoaXMub25Db250YWluZXJEZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW092ZXJsYXlQYW5lbF0sXG4gICAgZGVjbGFyYXRpb25zOiBbT3ZlcmxheVBhbmVsXVxufSlcbmV4cG9ydCBjbGFzcyBPdmVybGF5UGFuZWxNb2R1bGUgeyB9XG4iXX0=