import { ViewContainerRef, Directive, ComponentFactoryResolver, ChangeDetectorRef, Renderer2, NgZone, ViewChild, Component, NgModule, ApplicationRef, Injector, Injectable } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Subject } from 'rxjs';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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

class DynamicDialogConfig {
}

class DynamicDialogRef {
    constructor() {
        this._onClose = new Subject();
        this.onClose = this._onClose.asObservable();
    }
    close(result) {
        this._onClose.next(result);
    }
}

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
__decorate$1([
    ViewChild(DynamicDialogContent, { static: false })
], DynamicDialogComponent.prototype, "insertionPoint", void 0);
__decorate$1([
    ViewChild('mask', { static: false })
], DynamicDialogComponent.prototype, "maskViewChild", void 0);
DynamicDialogComponent = __decorate$1([
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
let DynamicDialogModule = class DynamicDialogModule {
};
DynamicDialogModule = __decorate$1([
    NgModule({
        imports: [CommonModule],
        declarations: [DynamicDialogComponent, DynamicDialogContent],
        entryComponents: [DynamicDialogComponent]
    })
], DynamicDialogModule);

class DynamicDialogInjector {
    constructor(_parentInjector, _additionalTokens) {
        this._parentInjector = _parentInjector;
        this._additionalTokens = _additionalTokens;
    }
    get(token, notFoundValue, flags) {
        const value = this._additionalTokens.get(token);
        if (value)
            return value;
        return this._parentInjector.get(token, notFoundValue);
    }
}

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let DialogService = class DialogService {
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    open(componentType, config) {
        const dialogRef = this.appendDialogComponentToBody(config);
        this.dialogComponentRef.instance.childComponentType = componentType;
        return dialogRef;
    }
    appendDialogComponentToBody(config) {
        const map = new WeakMap();
        map.set(DynamicDialogConfig, config);
        const dialogRef = new DynamicDialogRef();
        map.set(DynamicDialogRef, dialogRef);
        const sub = dialogRef.onClose.subscribe(() => {
            this.removeDialogComponentFromBody();
            sub.unsubscribe();
        });
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
        const componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));
        this.appRef.attachView(componentRef.hostView);
        const domElem = componentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
        this.dialogComponentRef = componentRef;
        return dialogRef;
    }
    removeDialogComponentFromBody() {
        this.appRef.detachView(this.dialogComponentRef.hostView);
        this.dialogComponentRef.destroy();
    }
};
DialogService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector }
];
DialogService = __decorate$2([
    Injectable()
], DialogService);

/**
 * Generated bundle index. Do not edit.
 */

export { DialogService, DynamicDialogComponent, DynamicDialogConfig, DynamicDialogInjector, DynamicDialogModule, DynamicDialogRef, DynamicDialogContent as ɵa };
//# sourceMappingURL=primeng-dynamicdialog.js.map
