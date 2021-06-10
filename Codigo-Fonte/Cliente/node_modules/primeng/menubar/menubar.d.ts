import { ElementRef, Renderer2, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
export declare class MenubarSub implements OnDestroy {
    renderer: Renderer2;
    private cd;
    item: MenuItem;
    root: boolean;
    autoDisplay: boolean;
    autoZIndex: boolean;
    baseZIndex: number;
    parentActive: boolean;
    _parentActive: boolean;
    documentClickListener: any;
    menuClick: boolean;
    menuHoverActive: boolean;
    activeItem: any;
    activeMenu: any;
    constructor(renderer: Renderer2, cd: ChangeDetectorRef);
    onItemMenuClick(event: Event, item: HTMLLIElement, menuitem: MenuItem): void;
    bindEventListener(): void;
    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem): void;
    itemClick(event: any, item: MenuItem): void;
    listClick(event: any): void;
    ngOnDestroy(): void;
}
export declare class Menubar {
    el: ElementRef;
    renderer: Renderer2;
    model: MenuItem[];
    style: any;
    styleClass: string;
    autoZIndex: boolean;
    baseZIndex: number;
    private _autoDisplay;
    readonly autoDisplay: boolean;
    utc: boolean;
    constructor(el: ElementRef, renderer: Renderer2);
}
export declare class MenubarModule {
}
