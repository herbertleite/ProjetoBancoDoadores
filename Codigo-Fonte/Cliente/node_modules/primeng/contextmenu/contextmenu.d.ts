import { ElementRef, AfterViewInit, OnDestroy, Renderer2, NgZone, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
export declare class ContextMenuSub {
    item: MenuItem;
    root: boolean;
    parentActive: boolean;
    contextMenu: ContextMenu;
    constructor(contextMenu: any);
    activeItem: any;
    containerOffset: any;
    hideTimeout: any;
    _parentActive: boolean;
    onItemMouseEnter(event: any, item: any, menuitem: any): void;
    itemClick(event: any, item: MenuItem): void;
    listClick(event: any): void;
    position(sublist: any, item: any): void;
}
export declare class ContextMenu implements AfterViewInit, OnDestroy {
    el: ElementRef;
    renderer: Renderer2;
    zone: NgZone;
    model: MenuItem[];
    global: boolean;
    target: any;
    style: any;
    styleClass: string;
    appendTo: any;
    autoZIndex: boolean;
    baseZIndex: number;
    triggerEvent: string;
    onShow: EventEmitter<any>;
    onHide: EventEmitter<any>;
    containerViewChild: ElementRef;
    parentActive: boolean;
    documentClickListener: any;
    windowResizeListener: any;
    triggerEventListener: any;
    constructor(el: ElementRef, renderer: Renderer2, zone: NgZone);
    ngAfterViewInit(): void;
    show(event?: MouseEvent): void;
    hide(): void;
    moveOnTop(): void;
    toggle(event?: MouseEvent): void;
    position(event?: MouseEvent): void;
    bindGlobalListeners(): void;
    unbindGlobalListeners(): void;
    onWindowResize(event: any): void;
    ngOnDestroy(): void;
}
export declare class ContextMenuModule {
}
