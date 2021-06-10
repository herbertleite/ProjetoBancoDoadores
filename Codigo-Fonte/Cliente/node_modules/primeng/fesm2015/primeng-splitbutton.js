import { EventEmitter, ElementRef, Renderer2, ChangeDetectorRef, Input, Output, ViewChild, Component, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { UniqueComponentId } from 'primeng/utils';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let SplitButton = class SplitButton {
    constructor(el, renderer, router, cd) {
        this.el = el;
        this.renderer = renderer;
        this.router = router;
        this.cd = cd;
        this.iconPos = 'left';
        this.onClick = new EventEmitter();
        this.onDropdownClick = new EventEmitter();
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.overlayVisible = false;
        this.ariaId = UniqueComponentId() + '_list';
    }
    onDefaultButtonClick(event) {
        this.onClick.emit(event);
    }
    itemClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        this.overlayVisible = false;
    }
    show() {
        this.overlayVisible = !this.overlayVisible;
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.appendOverlay();
                this.overlay.style.zIndex = String(++DomHandler.zindex);
                this.alignOverlay();
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    }
    onDropdownButtonClick(event) {
        this.onDropdownClick.emit(event);
        this.dropdownClick = true;
        this.show();
    }
    alignOverlay() {
        if (this.appendTo)
            DomHandler.absolutePosition(this.overlay, this.containerViewChild.nativeElement);
        else
            DomHandler.relativePosition(this.overlay, this.containerViewChild.nativeElement);
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
            this.overlay.style.minWidth = DomHandler.getWidth(this.el.nativeElement.children[0]) + 'px';
        }
    }
    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (this.dropdownClick) {
                    this.dropdownClick = false;
                }
                else {
                    this.overlayVisible = false;
                    this.unbindDocumentClickListener();
                    this.cd.markForCheck();
                }
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
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
    onWindowResize() {
        this.overlayVisible = false;
    }
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.overlay = null;
    }
    ngOnDestroy() {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
};
SplitButton.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: Router },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], SplitButton.prototype, "model", void 0);
__decorate([
    Input()
], SplitButton.prototype, "icon", void 0);
__decorate([
    Input()
], SplitButton.prototype, "iconPos", void 0);
__decorate([
    Input()
], SplitButton.prototype, "label", void 0);
__decorate([
    Output()
], SplitButton.prototype, "onClick", void 0);
__decorate([
    Output()
], SplitButton.prototype, "onDropdownClick", void 0);
__decorate([
    Input()
], SplitButton.prototype, "style", void 0);
__decorate([
    Input()
], SplitButton.prototype, "styleClass", void 0);
__decorate([
    Input()
], SplitButton.prototype, "menuStyle", void 0);
__decorate([
    Input()
], SplitButton.prototype, "menuStyleClass", void 0);
__decorate([
    Input()
], SplitButton.prototype, "disabled", void 0);
__decorate([
    Input()
], SplitButton.prototype, "tabindex", void 0);
__decorate([
    Input()
], SplitButton.prototype, "appendTo", void 0);
__decorate([
    Input()
], SplitButton.prototype, "dir", void 0);
__decorate([
    Input()
], SplitButton.prototype, "showTransitionOptions", void 0);
__decorate([
    Input()
], SplitButton.prototype, "hideTransitionOptions", void 0);
__decorate([
    ViewChild('container', { static: true })
], SplitButton.prototype, "containerViewChild", void 0);
__decorate([
    ViewChild('defaultbtn', { static: true })
], SplitButton.prototype, "buttonViewChild", void 0);
SplitButton = __decorate([
    Component({
        selector: 'p-splitButton',
        template: `
        <div #container [ngClass]="{'ui-splitbutton ui-buttonset ui-widget':true,'ui-state-disabled':disabled}" [ngStyle]="style" [class]="styleClass">
            <button #defaultbtn type="button" pButton [icon]="icon" [iconPos]="iconPos" [label]="label" [cornerStyleClass]="dir === 'rtl' ? 'ui-corner-right': 'ui-corner-left'" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex">
            </button><button type="button" pButton class="ui-splitbutton-menubutton" icon="pi pi-chevron-down" [cornerStyleClass]="dir === 'rtl' ? 'ui-corner-left': 'ui-corner-right'" (click)="onDropdownButtonClick($event)" [disabled]="disabled"></button>
            <div [attr.id]="ariaId + '_overlay'" #overlay [ngClass]="'ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow'" *ngIf="overlayVisible"
                    [ngStyle]="menuStyle" [class]="menuStyleClass"
                    [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@overlayAnimation.start)="onOverlayAnimationStart($event)">
                <ul class="ui-menu-list ui-helper-reset" role="menu">
                    <ng-template ngFor let-item [ngForOf]="model">
                        <li *ngIf="item.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': item.visible === false}" role="separator">
                        <li class="ui-menuitem ui-widget ui-corner-all" role="menuitem" *ngIf="item.visible !== false && !item.separator" role="none">
                            <a *ngIf="!item.routerLink" [attr.href]="item.url" class="ui-menuitem-link ui-corner-all" [attr.target]="item.target" role="menuitem"
                                [ngClass]="{'ui-state-disabled':item.disabled}" (click)="itemClick($event, item)">
                                <span [ngClass]="'ui-menuitem-icon'" [class]="item.icon" *ngIf="item.icon"></span>
                                <span class="ui-menuitem-text">{{item.label}}</span>
                            </a>
                            <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams"
                                class="ui-menuitem-link ui-corner-all" [attr.target]="item.target" [ngClass]="{'ui-state-disabled':item.disabled}" (click)="itemClick($event, item)">
                                <span [ngClass]="'ui-menuitem-icon'" [class]="item.icon" *ngIf="item.icon"></span>
                                <span class="ui-menuitem-text">{{item.label}}</span>
                            </a>
                        </li>
                    </ng-template>
                </ul>
            </div>
        </div>
    `,
        animations: [
            trigger('overlayAnimation', [
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
], SplitButton);
let SplitButtonModule = class SplitButtonModule {
};
SplitButtonModule = __decorate([
    NgModule({
        imports: [CommonModule, ButtonModule, RouterModule],
        exports: [SplitButton, ButtonModule, RouterModule],
        declarations: [SplitButton]
    })
], SplitButtonModule);

/**
 * Generated bundle index. Do not edit.
 */

export { SplitButton, SplitButtonModule };
//# sourceMappingURL=primeng-splitbutton.js.map
