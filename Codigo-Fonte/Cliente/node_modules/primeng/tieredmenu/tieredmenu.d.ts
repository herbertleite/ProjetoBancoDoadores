import { ElementRef, OnDestroy, Renderer2, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { MenuItem } from 'primeng/api';
export declare class TieredMenuSub implements AfterViewInit, OnDestroy {
    private cf;
    renderer: Renderer2;
    item: MenuItem;
    root: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    parentActive: boolean;
    tieredMenu: TieredMenu;
    _parentActive: boolean;
    rootItemClick: boolean;
    documentClickListener: any;
    ngAfterViewInit(): void;
    constructor(tieredMenu: any, cf: ChangeDetectorRef, renderer: Renderer2);
    activeItem: HTMLLIElement;
    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem): void;
    itemClick(event: Event, item: HTMLLIElement, menuitem: MenuItem): boolean;
    listClick(event: Event): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    ngOnDestroy(): void;
}
export declare class TieredMenu implements OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    model: MenuItem[];
    popup: boolean;
    style: any;
    styleClass: string;
    appendTo: any;
    autoZIndex: boolean;
    baseZIndex: number;
    showTransitionOptions: string;
    hideTransitionOptions: string;
    parentActive: boolean;
    container: HTMLDivElement;
    documentClickListener: any;
    documentResizeListener: any;
    preventDocumentDefault: boolean;
    target: any;
    visible: boolean;
    constructor(el: ElementRef, renderer: Renderer2);
    toggle(event: any): void;
    show(event: any): void;
    onOverlayAnimationStart(event: AnimationEvent): void;
    appendOverlay(): void;
    restoreOverlayAppend(): void;
    moveOnTop(): void;
    hide(): void;
    onWindowResize(): void;
    bindDocumentClickListener(): void;
    unbindDocumentClickListener(): void;
    bindDocumentResizeListener(): void;
    unbindDocumentResizeListener(): void;
    onOverlayHide(): void;
    ngOnDestroy(): void;
}
export declare class TieredMenuModule {
}
