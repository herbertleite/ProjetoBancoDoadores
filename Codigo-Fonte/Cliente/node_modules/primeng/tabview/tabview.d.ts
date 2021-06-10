import { ElementRef, OnDestroy, EventEmitter, AfterContentInit, QueryList, TemplateRef, EmbeddedViewRef, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { BlockableUI } from 'primeng/api';
export declare class TabViewNav {
    tabs: TabPanel[];
    orientation: string;
    onTabClick: EventEmitter<any>;
    onTabCloseClick: EventEmitter<any>;
    getDefaultHeaderClass(tab: TabPanel): string;
    clickTab(event: any, tab: TabPanel): void;
    clickClose(event: any, tab: TabPanel): void;
}
export declare class TabPanel implements AfterContentInit, OnDestroy {
    viewContainer: ViewContainerRef;
    private cd;
    header: string;
    disabled: boolean;
    closable: boolean;
    headerStyle: any;
    headerStyleClass: string;
    leftIcon: string;
    rightIcon: string;
    cache: boolean;
    tooltip: any;
    tooltipPosition: string;
    tooltipPositionStyle: string;
    tooltipStyleClass: string;
    templates: QueryList<any>;
    constructor(viewContainer: ViewContainerRef, cd: ChangeDetectorRef);
    closed: boolean;
    view: EmbeddedViewRef<any>;
    _selected: boolean;
    loaded: boolean;
    id: string;
    contentTemplate: TemplateRef<any>;
    headerTemplate: TemplateRef<any>;
    ngAfterContentInit(): void;
    selected: boolean;
    ngOnDestroy(): void;
}
export declare class TabView implements AfterContentInit, BlockableUI {
    el: ElementRef;
    orientation: string;
    style: any;
    styleClass: string;
    controlClose: boolean;
    tabPanels: QueryList<TabPanel>;
    onChange: EventEmitter<any>;
    onClose: EventEmitter<any>;
    activeIndexChange: EventEmitter<number>;
    initialized: boolean;
    tabs: TabPanel[];
    _activeIndex: number;
    preventActiveIndexPropagation: boolean;
    constructor(el: ElementRef);
    ngAfterContentInit(): void;
    initTabs(): void;
    open(event: Event, tab: TabPanel): void;
    close(event: Event, tab: TabPanel): void;
    closeTab(tab: TabPanel): void;
    findSelectedTab(): TabPanel;
    findTabIndex(tab: TabPanel): number;
    getBlockableElement(): HTMLElement;
    activeIndex: number;
}
export declare class TabViewModule {
}
