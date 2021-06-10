var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, NgModule, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, Renderer2, NgZone, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DynamicDialogContent } from './dynamicdialogcontent';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { DynamicDialogRef } from './dynamicdialog-ref';
let DynamicDialogComponent = class DynamicDialogComponent {
    constructor(componentFactoryResolver, cd, renderer, config, dialogRef, zone) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.cd = cd;
        this.renderer = renderer;
        this.config = config;
        this.dialogRef = dialogRef;
        this.zone = zone;
        this.visible = true;
    }
    ngAfterViewInit() {
        this.loadChildComponent(this.childComponentType);
        this.cd.detectChanges();
    }
    onOverlayClicked(evt) {
        this.dialogRef.close();
    }
    onDialogClicked(evt) {
        evt.stopPropagation();
    }
    loadChildComponent(componentType) {
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
        let viewContainerRef = this.insertionPoint.viewContainerRef;
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
    }
    moveOnTop() {
        if (this.config.autoZIndex !== false) {
            const zIndex = this.config.baseZIndex || 0 + (++DomHandler.zindex);
            this.container.style.zIndex = String(zIndex);
            this.maskViewChild.nativeElement.style.zIndex = String(zIndex - 1);
        }
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.moveOnTop();
                this.bindGlobalListeners();
                DomHandler.addClass(document.body, 'ui-overflow-hidden');
                break;
            case 'void':
                this.onContainerDestroy();
                break;
        }
    }
    onAnimationEnd(event) {
        if (event.toState === 'void') {
            this.dialogRef.close();
        }
    }
    onContainerDestroy() {
        DomHandler.removeClass(document.body, 'ui-overflow-hidden');
        this.unbindGlobalListeners();
        this.container = null;
    }
    close() {
        this.visible = false;
    }
    onMaskClick() {
        if (this.config.dismissableMask) {
            this.close();
        }
    }
    bindGlobalListeners() {
        if (this.config.closeOnEscape !== false && this.config.closable !== false) {
            this.bindDocumentEscapeListener();
        }
    }
    unbindGlobalListeners() {
        this.unbindDocumentEscapeListener();
    }
    bindDocumentEscapeListener() {
        this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.container.style.zIndex) == DomHandler.zindex) {
                    this.close();
                }
            }
        });
    }
    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }
    ngOnDestroy() {
        this.onContainerDestroy();
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }
};
DynamicDialogComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: DynamicDialogConfig },
    { type: DynamicDialogRef },
    { type: NgZone }
];
__decorate([
    ViewChild(DynamicDialogContent, { static: false })
], DynamicDialogComponent.prototype, "insertionPoint", void 0);
__decorate([
    ViewChild('mask', { static: false })
], DynamicDialogComponent.prototype, "maskViewChild", void 0);
DynamicDialogComponent = __decorate([
    Component({
        selector: 'p-dynamicDialog',
        template: `
		<div #mask class="ui-widget-overlay ui-dialog-mask ui-dialog-mask-scrollblocker" *ngIf="visible" (click)="onMaskClick()"></div>
		<div [ngClass]="{'ui-dialog ui-dynamicdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true, 'ui-dialog-rtl': config.rtl}" [ngStyle]="config.style" [class]="config.styleClass"
			[@animation]="{value: 'visible', params: {transitionParams: config.transitionOptions || '150ms cubic-bezier(0, 0, 0.2, 1)'}}" 
			(@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" role="dialog" *ngIf="visible"
			[style.width]="config.width" [style.height]="config.height">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top" *ngIf="config.showHeader === false ? false: true">
                <span class="ui-dialog-title">{{config.header}}</span>
                <a [ngClass]="'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all'" tabindex="0" role="button" (click)="close()" (keydown.enter)="close()" *ngIf="config.closable === false ? false : true">
                    <span class="pi pi-times"></span>
                </a>
            </div>
            <div class="ui-dialog-content ui-widget-content" [ngStyle]="config.contentStyle">
				<ng-template pDynamicDialogContent></ng-template>
			</div>
			<div class="ui-dialog-footer ui-widget-content" *ngIf="config.footer">
				{{config.footer}}
            </div>
		</div>
	`,
        animations: [
            trigger('animation', [
                state('void', style({
                    transform: 'translateX(-50%) translateY(-50%) scale(0.7)',
                    opacity: 0
                })),
                state('visible', style({
                    transform: 'translateX(-50%) translateY(-50%) scale(1)',
                    opacity: 1
                })),
                transition('* => *', animate('{{transitionParams}}'))
            ])
        ]
    })
], DynamicDialogComponent);
export { DynamicDialogComponent };
let DynamicDialogModule = class DynamicDialogModule {
};
DynamicDialogModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [DynamicDialogComponent, DynamicDialogContent],
        entryComponents: [DynamicDialogComponent]
    })
], DynamicDialogModule);
export { DynamicDialogModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY2RpYWxvZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvZHluYW1pY2RpYWxvZy8iLCJzb3VyY2VzIjpbImR5bmFtaWNkaWFsb2cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLHdCQUF3QixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6TCxPQUFPLEVBQUUsT0FBTyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBaUIsTUFBTSxxQkFBcUIsQ0FBQztBQUM1RixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQXNDdkQsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFrQmxDLFlBQW9CLHdCQUFrRCxFQUFVLEVBQXFCLEVBQVMsUUFBbUIsRUFDeEgsTUFBMkIsRUFBVSxTQUEyQixFQUFTLElBQVk7UUFEMUUsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUFVLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUN4SCxXQUFNLEdBQU4sTUFBTSxDQUFxQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQWpCOUYsWUFBTyxHQUFZLElBQUksQ0FBQztJ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Ozs7Ozs7O0VBbUJUO1FBQ0QsVUFBVSxFQUFFO1lBQ0wsT0FBTyxDQUFDLFdBQVcsRUFBRTtnQkFDakIsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7b0JBQ2hCLFNBQVMsRUFBRSw4Q0FBOEM7b0JBQ3pELE9BQU8sRUFBRSxDQUFDO2lCQUNiLENBQUMsQ0FBQztnQkFDSCxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztvQkFDbkIsU0FBUyxFQUFFLDRDQUE0QztvQkFDdkQsT0FBTyxFQUFFLENBQUM7aUJBQ2IsQ0FBQyxDQUFDO2dCQUNILFVBQVUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDeEQsQ0FBQztTQUNSO0tBQ0QsQ0FBQztHQUNXLHNCQUFzQixDQTBIbEM7U0ExSFksc0JBQXNCO0FBaUluQyxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtDQUFJLENBQUE7QUFBdkIsbUJBQW1CO0lBTC9CLFFBQVEsQ0FBQztRQUNULE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxvQkFBb0IsQ0FBQztRQUM1RCxlQUFlLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztLQUN6QyxDQUFDO0dBQ1csbUJBQW1CLENBQUk7U0FBdkIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBOZ01vZHVsZSwgVHlwZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBWaWV3Q2hpbGQsIE9uRGVzdHJveSwgQ29tcG9uZW50UmVmLCBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgUmVuZGVyZXIyLCBOZ1pvbmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsc3RhdGUsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlLEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBEeW5hbWljRGlhbG9nQ29udGVudCB9IGZyb20gJy4vZHluYW1pY2RpYWxvZ2NvbnRlbnQnO1xuaW1wb3J0IHsgRHluYW1pY0RpYWxvZ0NvbmZpZyB9IGZyb20gJy4vZHluYW1pY2RpYWxvZy1jb25maWcnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBEeW5hbWljRGlhbG9nUmVmIH0gZnJvbSAnLi9keW5hbWljZGlhbG9nLXJlZic7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3AtZHluYW1pY0RpYWxvZycsXG5cdHRlbXBsYXRlOiBgXG5cdFx0PGRpdiAjbWFzayBjbGFzcz1cInVpLXdpZGdldC1vdmVybGF5IHVpLWRpYWxvZy1tYXNrIHVpLWRpYWxvZy1tYXNrLXNjcm9sbGJsb2NrZXJcIiAqbmdJZj1cInZpc2libGVcIiAoY2xpY2spPVwib25NYXNrQ2xpY2soKVwiPjwvZGl2PlxuXHRcdDxkaXYgW25nQ2xhc3NdPVwieyd1aS1kaWFsb2cgdWktZHluYW1pY2RpYWxvZyB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1zaGFkb3cnOnRydWUsICd1aS1kaWFsb2ctcnRsJzogY29uZmlnLnJ0bH1cIiBbbmdTdHlsZV09XCJjb25maWcuc3R5bGVcIiBbY2xhc3NdPVwiY29uZmlnLnN0eWxlQ2xhc3NcIlxuXHRcdFx0W0BhbmltYXRpb25dPVwie3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3RyYW5zaXRpb25QYXJhbXM6IGNvbmZpZy50cmFuc2l0aW9uT3B0aW9ucyB8fCAnMTUwbXMgY3ViaWMtYmV6aWVyKDAsIDAsIDAuMiwgMSknfX1cIiBcblx0XHRcdChAYW5pbWF0aW9uLnN0YXJ0KT1cIm9uQW5pbWF0aW9uU3RhcnQoJGV2ZW50KVwiIChAYW5pbWF0aW9uLmRvbmUpPVwib25BbmltYXRpb25FbmQoJGV2ZW50KVwiIHJvbGU9XCJkaWFsb2dcIiAqbmdJZj1cInZpc2libGVcIlxuXHRcdFx0W3N0eWxlLndpZHRoXT1cImNvbmZpZy53aWR0aFwiIFtzdHlsZS5oZWlnaHRdPVwiY29uZmlnLmhlaWdodFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWRpYWxvZy10aXRsZWJhciB1aS13aWRnZXQtaGVhZGVyIHVpLWhlbHBlci1jbGVhcmZpeCB1aS1jb3JuZXItdG9wXCIgKm5nSWY9XCJjb25maWcuc2hvd0hlYWRlciA9PT0gZmFsc2UgPyBmYWxzZTogdHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktZGlhbG9nLXRpdGxlXCI+e3tjb25maWcuaGVhZGVyfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGEgW25nQ2xhc3NdPVwiJ3VpLWRpYWxvZy10aXRsZWJhci1pY29uIHVpLWRpYWxvZy10aXRsZWJhci1jbG9zZSB1aS1jb3JuZXItYWxsJ1wiIHRhYmluZGV4PVwiMFwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwiY2xvc2UoKVwiIChrZXlkb3duLmVudGVyKT1cImNsb3NlKClcIiAqbmdJZj1cImNvbmZpZy5jbG9zYWJsZSA9PT0gZmFsc2UgPyBmYWxzZSA6IHRydWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwaSBwaS10aW1lc1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kaWFsb2ctY29udGVudCB1aS13aWRnZXQtY29udGVudFwiIFtuZ1N0eWxlXT1cImNvbmZpZy5jb250ZW50U3R5bGVcIj5cblx0XHRcdFx0PG5nLXRlbXBsYXRlIHBEeW5hbWljRGlhbG9nQ29udGVudD48L25nLXRlbXBsYXRlPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwidWktZGlhbG9nLWZvb3RlciB1aS13aWRnZXQtY29udGVudFwiICpuZ0lmPVwiY29uZmlnLmZvb3RlclwiPlxuXHRcdFx0XHR7e2NvbmZpZy5mb290ZXJ9fVxuICAgICAgICAgICAgPC9kaXY+XG5cdFx0PC9kaXY+XG5cdGAsXG5cdGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignYW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpIHNjYWxlKDAuNyknLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKSBzY2FsZSgxKScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignKiA9PiAqJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSlcbiAgICAgICAgXSlcblx0XVxufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRGlhbG9nQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuXHR2aXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuXHRjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuXG5cdG1hc2s6IEhUTUxEaXZFbGVtZW50O1xuXG5cdEBWaWV3Q2hpbGQoRHluYW1pY0RpYWxvZ0NvbnRlbnQsIHsgc3RhdGljOiBmYWxzZSB9KSBpbnNlcnRpb25Qb2ludDogRHluYW1pY0RpYWxvZ0NvbnRlbnQ7XG5cdFxuXHRAVmlld0NoaWxkKCdtYXNrJywgeyBzdGF0aWM6IGZhbHNlIH0pIG1hc2tWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cblx0Y2hpbGRDb21wb25lbnRUeXBlOiBUeXBlPGFueT47XG5cblx0Y29udGFpbmVyOiBIVE1MRGl2RWxlbWVudDtcblxuXHRkb2N1bWVudEVzY2FwZUxpc3RlbmVyOiBGdW5jdGlvbjtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG5cdFx0XHRwdWJsaWMgY29uZmlnOiBEeW5hbWljRGlhbG9nQ29uZmlnLCBwcml2YXRlIGRpYWxvZ1JlZjogRHluYW1pY0RpYWxvZ1JlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkgeyB9XG5cblx0bmdBZnRlclZpZXdJbml0KCkge1xuXHRcdHRoaXMubG9hZENoaWxkQ29tcG9uZW50KHRoaXMuY2hpbGRDb21wb25lbnRUeXBlKTtcblx0XHR0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcblx0fVxuXG5cdG9uT3ZlcmxheUNsaWNrZWQoZXZ0OiBNb3VzZUV2ZW50KSB7XG5cdFx0dGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcblx0fVxuXG5cdG9uRGlhbG9nQ2xpY2tlZChldnQ6IE1vdXNlRXZlbnQpIHtcblx0XHRldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH1cblxuXHRsb2FkQ2hpbGRDb21wb25lbnQoY29tcG9uZW50VHlwZTogVHlwZTxhbnk+KSB7XG5cdFx0bGV0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnRUeXBlKTtcblxuXHRcdGxldCB2aWV3Q29udGFpbmVyUmVmID0gdGhpcy5pbnNlcnRpb25Qb2ludC52aWV3Q29udGFpbmVyUmVmO1xuXHRcdHZpZXdDb250YWluZXJSZWYuY2xlYXIoKTtcblxuXHRcdHRoaXMuY29tcG9uZW50UmVmID0gdmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cdH1cblx0XG5cdG1vdmVPblRvcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmF1dG9aSW5kZXggIT09IGZhbHNlKSB7XG5cdFx0XHRjb25zdCB6SW5kZXggPSB0aGlzLmNvbmZpZy5iYXNlWkluZGV4fHwwICsgKCsrRG9tSGFuZGxlci56aW5kZXgpO1xuXHRcdFx0dGhpcy5jb250YWluZXIuc3R5bGUuekluZGV4ID0gU3RyaW5nKHpJbmRleCk7XG5cdFx0XHR0aGlzLm1hc2tWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS56SW5kZXggPSBTdHJpbmcoekluZGV4IC0gMSk7XG5cdFx0fVxuICAgIH1cblxuXHRvbkFuaW1hdGlvblN0YXJ0KGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuXHRcdHN3aXRjaChldmVudC50b1N0YXRlKSB7XG5cdFx0XHRjYXNlICd2aXNpYmxlJzpcblx0XHRcdFx0dGhpcy5jb250YWluZXIgPSBldmVudC5lbGVtZW50O1xuXHRcdFx0XHR0aGlzLm1vdmVPblRvcCgpO1xuXHRcdFx0XHR0aGlzLmJpbmRHbG9iYWxMaXN0ZW5lcnMoKTtcblx0XHRcdFx0RG9tSGFuZGxlci5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAndWktb3ZlcmZsb3ctaGlkZGVuJyk7XG5cdFx0XHRicmVhaztcblxuXHRcdFx0Y2FzZSAndm9pZCc6XG5cdFx0XHRcdHRoaXMub25Db250YWluZXJEZXN0cm95KCk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0XG5cdG9uQW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuXHRcdGlmIChldmVudC50b1N0YXRlID09PSAndm9pZCcpIHtcblx0XHRcdHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG5cdFx0fVxuXHR9XG5cblx0b25Db250YWluZXJEZXN0cm95KCkge1xuXHRcdERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3VpLW92ZXJmbG93LWhpZGRlbicpO1xuXHRcdHRoaXMudW5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XG5cdFx0dGhpcy5jb250YWluZXIgPSBudWxsO1xuXHR9XG5cdCAgICBcblx0Y2xvc2UoKSB7XG5cdFx0dGhpcy52aXNpYmxlID0gZmFsc2U7XG5cdH1cblxuXHRvbk1hc2tDbGljaygpIHtcblx0XHRpZiAodGhpcy5jb25maWcuZGlzbWlzc2FibGVNYXNrKSB7XG5cdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0fVxuXHR9XG5cblx0YmluZEdsb2JhbExpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmNsb3NlT25Fc2NhcGUgIT09IGZhbHNlICYmIHRoaXMuY29uZmlnLmNsb3NhYmxlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVuYmluZEdsb2JhbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudEVzY2FwZUxpc3RlbmVyKCk7XG5cdH1cblx0XG5cdGJpbmREb2N1bWVudEVzY2FwZUxpc3RlbmVyKCkge1xuICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LndoaWNoID09IDI3KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHRoaXMuY29udGFpbmVyLnN0eWxlLnpJbmRleCkgPT0gRG9tSGFuZGxlci56aW5kZXgpIHtcblx0XHRcdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0XHRcdH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHVuYmluZERvY3VtZW50RXNjYXBlTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuXHRuZ09uRGVzdHJveSgpIHtcblx0XHR0aGlzLm9uQ29udGFpbmVyRGVzdHJveSgpO1xuXG5cdFx0aWYgKHRoaXMuY29tcG9uZW50UmVmKSB7XG5cdFx0XHR0aGlzLmNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG5cdFx0fVxuXHR9XG59XG5cbkBOZ01vZHVsZSh7XG5cdGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuXHRkZWNsYXJhdGlvbnM6IFtEeW5hbWljRGlhbG9nQ29tcG9uZW50LCBEeW5hbWljRGlhbG9nQ29udGVudF0sXG5cdGVudHJ5Q29tcG9uZW50czogW0R5bmFtaWNEaWFsb2dDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNEaWFsb2dNb2R1bGUgeyB9Il19