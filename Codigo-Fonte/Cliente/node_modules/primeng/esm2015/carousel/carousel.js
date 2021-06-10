var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Input, ElementRef, ViewChild, AfterContentInit, TemplateRef, ContentChildren, QueryList, NgModule, NgZone, EventEmitter, Output, ContentChild } from '@angular/core';
import { PrimeTemplate, SharedModule, Header, Footer } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { UniqueComponentId } from 'primeng/utils';
let Carousel = class Carousel {
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
        this.orientation = "horizontal";
        this.verticalViewPortHeight = "300px";
        this.contentClass = "";
        this.dotsContainerClass = "";
        this.circular = false;
        this.autoplayInterval = 0;
        this.onPage = new EventEmitter();
        this._numVisible = 1;
        this._numScroll = 1;
        this._oldNumScroll = 0;
        this.prevState = {
            numScroll: 0,
            numVisible: 0,
            value: []
        };
        this.defaultNumScroll = 1;
        this.defaultNumVisible = 1;
        this._page = 0;
        this.isRemainingItemsAdded = false;
        this.remainingItems = 0;
        this.totalShiftedItems = this.page * this.numScroll * -1;
    }
    get page() {
        return this._page;
    }
    set page(val) {
        if (this.isCreated && val !== this._page) {
            if (this.autoplayInterval) {
                this.stopAutoplay();
                this.allowAutoplay = false;
            }
            if (val > this._page && val < (this.totalDots() - 1)) {
                this.step(-1, val);
            }
            else if (val < this._page && val !== 0) {
                this.step(1, val);
            }
        }
        this._page = val;
    }
    get numVisible() {
        return this._numVisible;
    }
    set numVisible(val) {
        this._numVisible = val;
    }
    get numScroll() {
        return this._numVisible;
    }
    set numScroll(val) {
        this._numScroll = val;
    }
    get value() {
        return this._value;
    }
    ;
    set value(val) {
        this._value = val;
        if (this.circular && this._value) {
            this.setCloneItems();
        }
    }
    ngAfterContentInit() {
        this.id = UniqueComponentId();
        this.allowAutoplay = !!this.autoplayInterval;
        if (this.circular) {
            this.setCloneItems();
        }
        if (this.responsiveOptions) {
            this.defaultNumScroll = this._numScroll;
            this.defaultNumVisible = this._numVisible;
        }
        this.createStyle();
        this.calculatePosition();
        if (this.responsiveOptions) {
            this.bindDocumentListeners();
        }
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterContentChecked() {
        const isCircular = this.isCircular();
        let totalShiftedItems = this.totalShiftedItems;
        if (this.value && (this.prevState.numScroll !== this._numScroll || this.prevState.numVisible !== this._numVisible || this.prevState.value.length !== this.value.length)) {
            if (this.autoplayInterval) {
                this.stopAutoplay();
            }
            this.remainingItems = (this.value.length - this._numVisible) % this._numScroll;
            let page = this._page;
            if (this.totalDots() !== 0 && page >= this.totalDots()) {
                page = this.totalDots() - 1;
                this._page = page;
                this.onPage.emit({
                    page: this.page
                });
            }
            totalShiftedItems = (page * this._numScroll) * -1;
            if (isCircular) {
                totalShiftedItems -= this._numVisible;
            }
            if (page === (this.totalDots() - 1) && this.remainingItems > 0) {
                totalShiftedItems += (-1 * this.remainingItems) + this._numScroll;
                this.isRemainingItemsAdded = true;
            }
            else {
                this.isRemainingItemsAdded = false;
            }
            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }
            this._oldNumScroll = this._numScroll;
            this.prevState.numScroll = this._numScroll;
            this.prevState.numVisible = this._numVisible;
            this.prevState.value = this._value;
            if (this.totalDots() > 0) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            }
            this.isCreated = true;
            if (this.autoplayInterval && this.isAutoplay()) {
                this.startAutoplay();
            }
        }
        if (isCircular) {
            if (this.page === 0) {
                totalShiftedItems = -1 * this._numVisible;
            }
            else if (totalShiftedItems === 0) {
                totalShiftedItems = -1 * this.value.length;
                if (this.remainingItems > 0) {
                    this.isRemainingItemsAdded = true;
                }
            }
            if (totalShiftedItems !== this.totalShiftedItems) {
                this.totalShiftedItems = totalShiftedItems;
            }
        }
    }
    createStyle() {
        if (!this.carouselStyle) {
            this.carouselStyle = document.createElement('style');
            this.carouselStyle.type = 'text/css';
            document.body.appendChild(this.carouselStyle);
        }
        let innerHTML = `
            #${this.id} .ui-carousel-item {
				flex: 1 0 ${(100 / this.numVisible)}%
			}
        `;
        if (this.responsiveOptions) {
            this.responsiveOptions.sort((data1, data2) => {
                const value1 = data1.breakpoint;
                const value2 = data2.breakpoint;
                let result = null;
                if (value1 == null && value2 != null)
                    result = -1;
                else if (value1 != null && value2 == null)
                    result = 1;
                else if (value1 == null && value2 == null)
                    result = 0;
                else if (typeof value1 === 'string' && typeof value2 === 'string')
                    result = value1.localeCompare(value2, undefined, { numeric: true });
                else
                    result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
                return -1 * result;
            });
            for (let i = 0; i < this.responsiveOptions.length; i++) {
                let res = this.responsiveOptions[i];
                innerHTML += `
                    @media screen and (max-width: ${res.breakpoint}) {
                        #${this.id} .ui-carousel-item {
                            flex: 1 0 ${(100 / res.numVisible)}%
                        }
                    }
                `;
            }
        }
        this.carouselStyle.innerHTML = innerHTML;
    }
    calculatePosition() {
        if (this.itemsContainer && this.responsiveOptions) {
            let windowWidth = window.innerWidth;
            let matchedResponsiveData = {
                numVisible: this.defaultNumVisible,
                numScroll: this.defaultNumScroll
            };
            for (let i = 0; i < this.responsiveOptions.length; i++) {
                let res = this.responsiveOptions[i];
                if (parseInt(res.breakpoint, 10) >= windowWidth) {
                    matchedResponsiveData = res;
                }
            }
            if (this._numScroll !== matchedResponsiveData.numScroll) {
                let page = this._page;
                page = Math.floor((page * this._numScroll) / matchedResponsiveData.numScroll);
                let totalShiftedItems = (matchedResponsiveData.numScroll * this.page) * -1;
                if (this.isCircular()) {
                    totalShiftedItems -= matchedResponsiveData.numVisible;
                }
                this.totalShiftedItems = totalShiftedItems;
                this._numScroll = matchedResponsiveData.numScroll;
                this._page = page;
                this.onPage.emit({
                    page: this.page
                });
            }
            if (this._numVisible !== matchedResponsiveData.numVisible) {
                this._numVisible = matchedResponsiveData.numVisible;
                this.setCloneItems();
            }
        }
    }
    setCloneItems() {
        this.clonedItemsForStarting = [];
        this.clonedItemsForFinishing = [];
        if (this.isCircular()) {
            this.clonedItemsForStarting.push(...this.value.slice(-1 * this._numVisible));
            this.clonedItemsForFinishing.push(...this.value.slice(0, this._numVisible));
        }
    }
    firstIndex() {
        return this.isCircular() ? (-1 * (this.totalShiftedItems + this.numVisible)) : (this.totalShiftedItems * -1);
    }
    lastIndex() {
        return this.firstIndex() + this.numVisible - 1;
    }
    totalDots() {
        return this.value ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0;
    }
    totalDotsArray() {
        const totalDots = this.totalDots();
        return totalDots <= 0 ? [] : Array(totalDots).fill(0);
    }
    containerClass() {
        return {
            'ui-carousel ui-widget': true,
            'ui-carousel-vertical': this.isVertical(),
            'ui-carousel-horizontal': !this.isVertical()
        };
    }
    contentClasses() {
        return 'ui-carousel-content ' + this.contentClass;
    }
    dotsContentClasses() {
        return 'ui-carousel-dots-container ui-helper-reset ' + this.dotsContainerClass;
    }
    isVertical() {
        return this.orientation === 'vertical';
    }
    isCircular() {
        return this.circular && this.value && this.value.length >= this.numVisible;
    }
    isAutoplay() {
        return this.autoplayInterval && this.allowAutoplay;
    }
    isForwardNavDisabled() {
        return this.isEmpty() || (this._page >= (this.totalDots() - 1) && !this.isCircular());
    }
    isBackwardNavDisabled() {
        return this.isEmpty() || (this._page <= 0 && !this.isCircular());
    }
    isEmpty() {
        return !this.value || this.value.length === 0;
    }
    navForward(e, index) {
        if (this.isCircular() || this._page < (this.totalDots() - 1)) {
            this.step(-1, index);
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
            this.allowAutoplay = false;
        }
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    navBackward(e, index) {
        if (this.isCircular() || this._page !== 0) {
            this.step(1, index);
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
            this.allowAutoplay = false;
        }
        if (e && e.cancelable) {
            e.preventDefault();
        }
    }
    onDotClick(e, index) {
        let page = this._page;
        if (this.autoplayInterval) {
            this.stopAutoplay();
            this.allowAutoplay = false;
        }
        if (index > page) {
            this.navForward(e, index);
        }
        else if (index < page) {
            this.navBackward(e, index);
        }
    }
    step(dir, page) {
        let totalShiftedItems = this.totalShiftedItems;
        const isCircular = this.isCircular();
        if (page != null) {
            totalShiftedItems = (this._numScroll * page) * -1;
            if (isCircular) {
                totalShiftedItems -= this._numVisible;
            }
            this.isRemainingItemsAdded = false;
        }
        else {
            totalShiftedItems += (this._numScroll * dir);
            if (this.isRemainingItemsAdded) {
                totalShiftedItems += this.remainingItems - (this._numScroll * dir);
                this.isRemainingItemsAdded = false;
            }
            let originalShiftedItems = isCircular ? (totalShiftedItems + this._numVisible) : totalShiftedItems;
            page = Math.abs(Math.floor((originalShiftedItems / this._numScroll)));
        }
        if (isCircular && this.page === (this.totalDots() - 1) && dir === -1) {
            totalShiftedItems = -1 * (this.value.length + this._numVisible);
            page = 0;
        }
        else if (isCircular && this.page === 0 && dir === 1) {
            totalShiftedItems = 0;
            page = (this.totalDots() - 1);
        }
        else if (page === (this.totalDots() - 1) && this.remainingItems > 0) {
            totalShiftedItems += ((this.remainingItems * -1) - (this._numScroll * dir));
            this.isRemainingItemsAdded = true;
        }
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }
        this.totalShiftedItems = totalShiftedItems;
        this._page = page;
        this.onPage.emit({
            page: this.page
        });
    }
    startAutoplay() {
        this.interval = setInterval(() => {
            if (this.totalDots() > 0) {
                if (this.page === (this.totalDots() - 1)) {
                    this.step(-1, 0);
                }
                else {
                    this.step(-1, this.page + 1);
                }
            }
        }, this.autoplayInterval);
    }
    stopAutoplay() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    onTransitionEnd() {
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transition = '';
            if ((this.page === 0 || this.page === (this.totalDots() - 1)) && this.isCircular()) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? `translate3d(0, ${this.totalShiftedItems * (100 / this._numVisible)}%, 0)` : `translate3d(${this.totalShiftedItems * (100 / this._numVisible)}%, 0, 0)`;
            }
        }
    }
    onTouchStart(e) {
        let touchobj = e.changedTouches[0];
        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    }
    onTouchMove(e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    }
    onTouchEnd(e) {
        let touchobj = e.changedTouches[0];
        if (this.isVertical()) {
            this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
        }
        else {
            this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
        }
    }
    changePageOnTouch(e, diff) {
        if (diff < 0) {
            this.navForward(e);
        }
        else {
            this.navBackward(e);
        }
    }
    bindDocumentListeners() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = (e) => {
                this.calculatePosition();
            };
            window.addEventListener('resize', this.documentResizeListener);
        }
    }
    unbindDocumentListeners() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }
    ngOnDestroy() {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
    }
};
Carousel.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
__decorate([
    Input()
], Carousel.prototype, "page", null);
__decorate([
    Input()
], Carousel.prototype, "numVisible", null);
__decorate([
    Input()
], Carousel.prototype, "numScroll", null);
__decorate([
    Input()
], Carousel.prototype, "responsiveOptions", void 0);
__decorate([
    Input()
], Carousel.prototype, "orientation", void 0);
__decorate([
    Input()
], Carousel.prototype, "verticalViewPortHeight", void 0);
__decorate([
    Input()
], Carousel.prototype, "contentClass", void 0);
__decorate([
    Input()
], Carousel.prototype, "dotsContainerClass", void 0);
__decorate([
    Input()
], Carousel.prototype, "value", null);
__decorate([
    Input()
], Carousel.prototype, "circular", void 0);
__decorate([
    Input()
], Carousel.prototype, "autoplayInterval", void 0);
__decorate([
    Input()
], Carousel.prototype, "style", void 0);
__decorate([
    Input()
], Carousel.prototype, "styleClass", void 0);
__decorate([
    Output()
], Carousel.prototype, "onPage", void 0);
__decorate([
    ViewChild('itemsContainer', { static: true })
], Carousel.prototype, "itemsContainer", void 0);
__decorate([
    ContentChild(Header, { static: true })
], Carousel.prototype, "headerFacet", void 0);
__decorate([
    ContentChild(Footer, { static: true })
], Carousel.prototype, "footerFacet", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], Carousel.prototype, "templates", void 0);
Carousel = __decorate([
    Component({
        selector: 'p-carousel',
        template: `
		<div [attr.id]="id" [ngClass]="containerClass()" [ngStyle]="style" [class]="styleClass">
			<div class="ui-carousel-header" *ngIf="headerFacet">
				<ng-content select="p-header"></ng-content>
			</div>
			<div [class]="contentClasses()">
				<div class="ui-carousel-container">
					<button [ngClass]="{'ui-carousel-prev ui-button ui-widget ui-state-default ui-corner-all':true, 'ui-state-disabled': isBackwardNavDisabled()}" [disabled]="isBackwardNavDisabled()" (click)="navBackward($event)">
						<span [ngClass]="{'ui-carousel-prev-icon pi': true, 'pi-chevron-left': !isVertical(), 'pi-chevron-up': isVertical()}"></span>
					</button>
					<div class="ui-carousel-items-content" [ngStyle]="{'height': isVertical() ? verticalViewPortHeight : 'auto'}">
						<div #itemsContainer class="ui-carousel-items-container" (transitionend)="onTransitionEnd()" (touchend)="onTouchEnd($event)" (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)">
							<div *ngFor="let item of clonedItemsForStarting; let index = index" [ngClass]= "{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': (totalShiftedItems * -1) === (value.length),
							'ui-carousel-item-start': 0 === index,
							'ui-carousel-item-end': (clonedItemsForStarting.length - 1) === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
							<div *ngFor="let item of value; let index = index" [ngClass]= "{'ui-carousel-item': true,'ui-carousel-item-active': (firstIndex() <= index && lastIndex() >= index),
							'ui-carousel-item-start': firstIndex() === index,
							'ui-carousel-item-end': lastIndex() === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
							<div *ngFor="let item of clonedItemsForFinishing; let index = index" [ngClass]= "{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': ((totalShiftedItems *-1) === numVisible),
							'ui-carousel-item-start': 0 === index,
							'ui-carousel-item-end': (clonedItemsForFinishing.length - 1) === index}">
								<ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
							</div>
						</div>
					</div>
					<button [ngClass]="{'ui-carousel-next ui-button ui-widget ui-state-default ui-corner-all': true, 'ui-state-disabled': isForwardNavDisabled()}" [disabled]="isForwardNavDisabled()" (click)="navForward($event)">
						<span [ngClass]="{'ui-carousel-next-icon pi': true, 'pi-chevron-right': !isVertical(), 'pi-chevron-down': isVertical()}"></span>
					</button>
				</div>
				<ul [class]="dotsContentClasses()">
					<li *ngFor="let totalDot of totalDotsArray(); let i = index" [ngClass]="{'ui-carousel-dot-item':true,'ui-state-highlight': _page === i}">
						<button class="ui-button ui-widget ui-state-default ui-corner-all" (click)="onDotClick($event, i)">
							<span [ngClass]="{'ui-carousel-dot-icon pi':true, 'pi-circle-on': _page === i, 'pi-circle-off': !(_page === i)}"></span>
						</button>
					</li>
				</ul>
			</div>
			<div class="ui-carousel-footer" *ngIf="footerFacet">
				<ng-content select="p-footer"></ng-content>
			</div>
		</div>
	`
    })
], Carousel);
export { Carousel };
let CarouselModule = class CarouselModule {
};
CarouselModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule],
        exports: [CommonModule, Carousel, SharedModule],
        declarations: [Carousel]
    })
], CarouselModule);
export { CarouselModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2Nhcm91c2VsLyIsInNvdXJjZXMiOlsiY2Fyb3VzZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pMLE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQW1EbEQsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQStIcEIsWUFBbUIsRUFBYyxFQUFTLElBQVk7UUFBbkMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUF4RjdDLGdCQUFXLEdBQUcsWUFBWSxDQUFDO1FBRTNCLDJCQUFzQixHQUFHLE9BQU8sQ0FBQztRQUVqQyxpQkFBWSxHQUFXLEVBQUUsQ0FBQztRQUUxQix1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFZaEMsYUFBUSxHQUFXLEtBQUssQ0FBQztRQUV6QixxQkFBZ0IsR0FBVSxDQUFDLENBQUM7UUFNeEIsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBVTVELGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBRXhCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFFMUIsY0FBUyxHQUFRO1lBQ2hCLFNBQVMsRUFBQyxDQUFDO1lBQ1gsVUFBVSxFQUFDLENBQUM7WUFD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QUUsWUFBWSxDQUFDO1FBQy9DLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQztLQUN4QixDQUFDO0dBQ1csY0FBYyxDQUFJO1NBQWxCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIEFmdGVyQ29udGVudEluaXQsIFRlbXBsYXRlUmVmLCBDb250ZW50Q2hpbGRyZW4sIFF1ZXJ5TGlzdCwgTmdNb2R1bGUsIE5nWm9uZSwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIENvbnRlbnRDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlLCBIZWFkZXIsIEZvb3RlciB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBVbmlxdWVDb21wb25lbnRJZCB9IGZyb20gJ3ByaW1lbmcvdXRpbHMnO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdwLWNhcm91c2VsJyxcblx0dGVtcGxhdGU6IGBcblx0XHQ8ZGl2IFthdHRyLmlkXT1cImlkXCIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3MoKVwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJ1aS1jYXJvdXNlbC1oZWFkZXJcIiAqbmdJZj1cImhlYWRlckZhY2V0XCI+XG5cdFx0XHRcdDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8ZGl2IFtjbGFzc109XCJjb250ZW50Q2xhc3NlcygpXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJ1aS1jYXJvdXNlbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHQ8YnV0dG9uIFtuZ0NsYXNzXT1cInsndWktY2Fyb3VzZWwtcHJldiB1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbCc6dHJ1ZSwgJ3VpLXN0YXRlLWRpc2FibGVkJzogaXNCYWNrd2FyZE5hdkRpc2FibGVkKCl9XCIgW2Rpc2FibGVkXT1cImlzQmFja3dhcmROYXZEaXNhYmxlZCgpXCIgKGNsaWNrKT1cIm5hdkJhY2t3YXJkKCRldmVudClcIj5cblx0XHRcdFx0XHRcdDxzcGFuIFtuZ0NsYXNzXT1cInsndWktY2Fyb3VzZWwtcHJldi1pY29uIHBpJzogdHJ1ZSwgJ3BpLWNoZXZyb24tbGVmdCc6ICFpc1ZlcnRpY2FsKCksICdwaS1jaGV2cm9uLXVwJzogaXNWZXJ0aWNhbCgpfVwiPjwvc3Bhbj5cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwidWktY2Fyb3VzZWwtaXRlbXMtY29udGVudFwiIFtuZ1N0eWxlXT1cInsnaGVpZ2h0JzogaXNWZXJ0aWNhbCgpID8gdmVydGljYWxWaWV3UG9ydEhlaWdodCA6ICdhdXRvJ31cIj5cblx0XHRcdFx0XHRcdDxkaXYgI2l0ZW1zQ29udGFpbmVyIGNsYXNzPVwidWktY2Fyb3VzZWwtaXRlbXMtY29udGFpbmVyXCIgKHRyYW5zaXRpb25lbmQpPVwib25UcmFuc2l0aW9uRW5kKClcIiAodG91Y2hlbmQpPVwib25Ub3VjaEVuZCgkZXZlbnQpXCIgKHRvdWNoc3RhcnQpPVwib25Ub3VjaFN0YXJ0KCRldmVudClcIiAodG91Y2htb3ZlKT1cIm9uVG91Y2hNb3ZlKCRldmVudClcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjbG9uZWRJdGVtc0ZvclN0YXJ0aW5nOyBsZXQgaW5kZXggPSBpbmRleFwiIFtuZ0NsYXNzXT0gXCJ7J3VpLWNhcm91c2VsLWl0ZW0gdWktY2Fyb3VzZWwtaXRlbS1jbG9uZWQnOiB0cnVlLCd1aS1jYXJvdXNlbC1pdGVtLWFjdGl2ZSc6ICh0b3RhbFNoaWZ0ZWRJdGVtcyAqIC0xKSA9PT0gKHZhbHVlLmxlbmd0aCksXG5cdFx0XHRcdFx0XHRcdCd1aS1jYXJvdXNlbC1pdGVtLXN0YXJ0JzogMCA9PT0gaW5kZXgsXG5cdFx0XHRcdFx0XHRcdCd1aS1jYXJvdXNlbC1pdGVtLWVuZCc6IChjbG9uZWRJdGVtc0ZvclN0YXJ0aW5nLmxlbmd0aCAtIDEpID09PSBpbmRleH1cIj5cblx0XHRcdFx0XHRcdFx0XHQ8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiAqbmdGb3I9XCJsZXQgaXRlbSBvZiB2YWx1ZTsgbGV0IGluZGV4ID0gaW5kZXhcIiBbbmdDbGFzc109IFwieyd1aS1jYXJvdXNlbC1pdGVtJzogdHJ1ZSwndWktY2Fyb3VzZWwtaXRlbS1hY3RpdmUnOiAoZmlyc3RJbmRleCgpIDw9IGluZGV4ICYmIGxhc3RJbmRleCgpID49IGluZGV4KSxcblx0XHRcdFx0XHRcdFx0J3VpLWNhcm91c2VsLWl0ZW0tc3RhcnQnOiBmaXJzdEluZGV4KCkgPT09IGluZGV4LFxuXHRcdFx0XHRcdFx0XHQndWktY2Fyb3VzZWwtaXRlbS1lbmQnOiBsYXN0SW5kZXgoKSA9PT0gaW5kZXh9XCI+XG5cdFx0XHRcdFx0XHRcdFx0PG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbX1cIj48L25nLWNvbnRhaW5lcj5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgY2xvbmVkSXRlbXNGb3JGaW5pc2hpbmc7IGxldCBpbmRleCA9IGluZGV4XCIgW25nQ2xhc3NdPSBcInsndWktY2Fyb3VzZWwtaXRlbSB1aS1jYXJvdXNlbC1pdGVtLWNsb25lZCc6IHRydWUsJ3VpLWNhcm91c2VsLWl0ZW0tYWN0aXZlJzogKCh0b3RhbFNoaWZ0ZWRJdGVtcyAqLTEpID09PSBudW1WaXNpYmxlKSxcblx0XHRcdFx0XHRcdFx0J3VpLWNhcm91c2VsLWl0ZW0tc3RhcnQnOiAwID09PSBpbmRleCxcblx0XHRcdFx0XHRcdFx0J3VpLWNhcm91c2VsLWl0ZW0tZW5kJzogKGNsb25lZEl0ZW1zRm9yRmluaXNoaW5nLmxlbmd0aCAtIDEpID09PSBpbmRleH1cIj5cblx0XHRcdFx0XHRcdFx0XHQ8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaXRlbVRlbXBsYXRlOyBjb250ZXh0OiB7JGltcGxpY2l0OiBpdGVtfVwiPjwvbmctY29udGFpbmVyPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxidXR0b24gW25nQ2xhc3NdPVwieyd1aS1jYXJvdXNlbC1uZXh0IHVpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsJzogdHJ1ZSwgJ3VpLXN0YXRlLWRpc2FibGVkJzogaXNGb3J3YXJkTmF2RGlzYWJsZWQoKX1cIiBbZGlzYWJsZWRdPVwiaXNGb3J3YXJkTmF2RGlzYWJsZWQoKVwiIChjbGljayk9XCJuYXZGb3J3YXJkKCRldmVudClcIj5cblx0XHRcdFx0XHRcdDxzcGFuIFtuZ0NsYXNzXT1cInsndWktY2Fyb3VzZWwtbmV4dC1pY29uIHBpJzogdHJ1ZSwgJ3BpLWNoZXZyb24tcmlnaHQnOiAhaXNWZXJ0aWNhbCgpLCAncGktY2hldnJvbi1kb3duJzogaXNWZXJ0aWNhbCgpfVwiPjwvc3Bhbj5cblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDx1bCBbY2xhc3NdPVwiZG90c0NvbnRlbnRDbGFzc2VzKClcIj5cblx0XHRcdFx0XHQ8bGkgKm5nRm9yPVwibGV0IHRvdGFsRG90IG9mIHRvdGFsRG90c0FycmF5KCk7IGxldCBpID0gaW5kZXhcIiBbbmdDbGFzc109XCJ7J3VpLWNhcm91c2VsLWRvdC1pdGVtJzp0cnVlLCd1aS1zdGF0ZS1oaWdobGlnaHQnOiBfcGFnZSA9PT0gaX1cIj5cblx0XHRcdFx0XHRcdDxidXR0b24gY2xhc3M9XCJ1aS1idXR0b24gdWktd2lkZ2V0IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiIChjbGljayk9XCJvbkRvdENsaWNrKCRldmVudCwgaSlcIj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gW25nQ2xhc3NdPVwieyd1aS1jYXJvdXNlbC1kb3QtaWNvbiBwaSc6dHJ1ZSwgJ3BpLWNpcmNsZS1vbic6IF9wYWdlID09PSBpLCAncGktY2lyY2xlLW9mZic6ICEoX3BhZ2UgPT09IGkpfVwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3M9XCJ1aS1jYXJvdXNlbC1mb290ZXJcIiAqbmdJZj1cImZvb3RlckZhY2V0XCI+XG5cdFx0XHRcdDxuZy1jb250ZW50IHNlbGVjdD1cInAtZm9vdGVyXCI+PC9uZy1jb250ZW50PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdGBcbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuXHRASW5wdXQoKSBnZXQgcGFnZSgpOm51bWJlciB7XG5cdFx0cmV0dXJuIHRoaXMuX3BhZ2U7XG5cdH1cblx0c2V0IHBhZ2UodmFsOm51bWJlcikge1xuXHRcdGlmICh0aGlzLmlzQ3JlYXRlZCAmJiB2YWwgIT09IHRoaXMuX3BhZ2UpIHtcblx0XHRcdGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpIHtcblx0XHRcdFx0dGhpcy5zdG9wQXV0b3BsYXkoKTtcblx0XHRcdFx0dGhpcy5hbGxvd0F1dG9wbGF5ID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh2YWwgPiB0aGlzLl9wYWdlICYmIHZhbCA8ICh0aGlzLnRvdGFsRG90cygpIC0gMSkpIHtcblx0XHRcdFx0dGhpcy5zdGVwKC0xLCB2YWwpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAodmFsIDwgdGhpcy5fcGFnZSAmJiB2YWwgIT09IDApIHtcblx0XHRcdFx0dGhpcy5zdGVwKDEsIHZhbCk7XG5cdFx0XHR9XG5cdFx0fSBcblxuXHRcdHRoaXMuX3BhZ2UgPSB2YWw7XG5cdH1cblx0XHRcblx0QElucHV0KCkgZ2V0IG51bVZpc2libGUoKTpudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl9udW1WaXNpYmxlO1xuXHR9XG5cdHNldCBudW1WaXNpYmxlKHZhbDpudW1iZXIpIHtcblx0XHR0aGlzLl9udW1WaXNpYmxlID0gdmFsO1xuXHR9XG5cdFx0XG5cdEBJbnB1dCgpIGdldCBudW1TY3JvbGwoKTpudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLl9udW1WaXNpYmxlO1xuXHR9XG5cdHNldCBudW1TY3JvbGwodmFsOm51bWJlcikge1xuXHRcdHRoaXMuX251bVNjcm9sbCA9IHZhbDtcblx0fVxuXHRcblx0QElucHV0KCkgcmVzcG9uc2l2ZU9wdGlvbnM6IGFueVtdO1xuXHRcblx0QElucHV0KCkgb3JpZW50YXRpb24gPSBcImhvcml6b250YWxcIjtcblx0XG5cdEBJbnB1dCgpIHZlcnRpY2FsVmlld1BvcnRIZWlnaHQgPSBcIjMwMHB4XCI7XG5cdFxuXHRASW5wdXQoKSBjb250ZW50Q2xhc3M6IFN0cmluZyA9IFwiXCI7XG5cblx0QElucHV0KCkgZG90c0NvbnRhaW5lckNsYXNzOiBTdHJpbmcgPSBcIlwiO1xuXG5cdEBJbnB1dCgpIGdldCB2YWx1ZSgpIDphbnlbXSB7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbHVlO1xuXHR9O1xuXHRzZXQgdmFsdWUodmFsKSB7XG5cdFx0dGhpcy5fdmFsdWUgPSB2YWw7XG5cdFx0aWYgKHRoaXMuY2lyY3VsYXIgJiYgdGhpcy5fdmFsdWUpIHtcblx0XHRcdHRoaXMuc2V0Q2xvbmVJdGVtcygpO1xuXHRcdH1cblx0fVxuXHRcblx0QElucHV0KCkgY2lyY3VsYXI6Ym9vbGVhbiA9IGZhbHNlO1xuXG5cdEBJbnB1dCgpIGF1dG9wbGF5SW50ZXJ2YWw6bnVtYmVyID0gMDtcblxuXHRASW5wdXQoKSBzdHlsZTogYW55O1xuXG5cdEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblx0XG4gICAgQE91dHB1dCgpIG9uUGFnZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cblx0QFZpZXdDaGlsZCgnaXRlbXNDb250YWluZXInLCB7IHN0YXRpYzogdHJ1ZSB9KSBpdGVtc0NvbnRhaW5lcjogRWxlbWVudFJlZjtcblxuXHRAQ29udGVudENoaWxkKEhlYWRlciwgeyBzdGF0aWM6IHRydWUgfSkgaGVhZGVyRmFjZXQ7XG5cbiAgICBAQ29udGVudENoaWxkKEZvb3RlciwgeyBzdGF0aWM6IHRydWUgfSkgZm9vdGVyRmFjZXQ7XG5cblx0QENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG5cdF9udW1WaXNpYmxlOiBudW1iZXIgPSAxO1xuXG5cdF9udW1TY3JvbGw6IG51bWJlciA9IDE7XG5cblx0X29sZE51bVNjcm9sbDogbnVtYmVyID0gMDtcblxuXHRwcmV2U3RhdGU6IGFueSA9IHtcblx0XHRudW1TY3JvbGw6MCxcblx0XHRudW1WaXNpYmxlOjAsXG5cdFx0dmFsdWU6IFtdXG5cdH07XG5cblx0ZGVmYXVsdE51bVNjcm9sbDpudW1iZXIgPSAxO1xuXG5cdGRlZmF1bHROdW1WaXNpYmxlOm51bWJlciA9IDE7XG5cblx0X3BhZ2U6IG51bWJlciA9IDA7XG5cblx0X3ZhbHVlOiBhbnlbXTtcblxuXHRjYXJvdXNlbFN0eWxlOmFueTtcblxuXHRpZDpzdHJpbmc7XG5cblx0dG90YWxTaGlmdGVkSXRlbXM7XG5cblx0aXNSZW1haW5pbmdJdGVtc0FkZGVkOmJvb2xlYW4gPSBmYWxzZTtcblxuXHRhbmltYXRpb25UaW1lb3V0OmFueTtcblxuXHR0cmFuc2xhdGVUaW1lb3V0OmFueTtcblxuXHRyZW1haW5pbmdJdGVtczogbnVtYmVyID0gMDtcblxuXHRfaXRlbXM6IGFueVtdO1xuXG5cdHN0YXJ0UG9zOiBhbnk7XG5cblx0ZG9jdW1lbnRSZXNpemVMaXN0ZW5lcjogYW55O1xuXG5cdGNsb25lZEl0ZW1zRm9yU3RhcnRpbmc6IGFueVtdO1xuXG5cdGNsb25lZEl0ZW1zRm9yRmluaXNoaW5nOiBhbnlbXTtcblxuXHRhbGxvd0F1dG9wbGF5OiBib29sZWFuO1xuXG5cdGludGVydmFsOiBhbnk7XG5cblx0aXNDcmVhdGVkOiBib29sZWFuO1xuXG5cdHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cblx0Y29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7IFxuXHRcdHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLnBhZ2UgKiB0aGlzLm51bVNjcm9sbCAqIC0xOyBcblx0fVxuXG5cdG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcblx0XHR0aGlzLmlkID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcblx0XHR0aGlzLmFsbG93QXV0b3BsYXkgPSAhIXRoaXMuYXV0b3BsYXlJbnRlcnZhbDtcblxuXHRcdGlmICh0aGlzLmNpcmN1bGFyKSB7XG5cdFx0XHR0aGlzLnNldENsb25lSXRlbXMoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuXHRcdFx0dGhpcy5kZWZhdWx0TnVtU2Nyb2xsID0gdGhpcy5fbnVtU2Nyb2xsO1xuXHRcdFx0dGhpcy5kZWZhdWx0TnVtVmlzaWJsZSA9IHRoaXMuX251bVZpc2libGU7XG5cdFx0fVxuXG5cdFx0dGhpcy5jcmVhdGVTdHlsZSgpO1xuXHRcdHRoaXMuY2FsY3VsYXRlUG9zaXRpb24oKTtcblxuXHRcdGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG5cdFx0XHR0aGlzLmJpbmREb2N1bWVudExpc3RlbmVycygpO1xuXHRcdH1cblxuXHRcdHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcblx0XHRcdHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcblx0XHRcdFx0Y2FzZSAnaXRlbSc6XG5cdFx0XHRcdFx0dGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dGhpcy5pdGVtVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0bmdBZnRlckNvbnRlbnRDaGVja2VkKCkge1xuXHRcdGNvbnN0IGlzQ2lyY3VsYXIgPSB0aGlzLmlzQ2lyY3VsYXIoKTtcblx0XHRsZXQgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zO1xuXHRcdFxuXHRcdGlmICh0aGlzLnZhbHVlICYmICh0aGlzLnByZXZTdGF0ZS5udW1TY3JvbGwgIT09IHRoaXMuX251bVNjcm9sbCB8fCB0aGlzLnByZXZTdGF0ZS5udW1WaXNpYmxlICE9PSB0aGlzLl9udW1WaXNpYmxlIHx8IHRoaXMucHJldlN0YXRlLnZhbHVlLmxlbmd0aCAhPT0gdGhpcy52YWx1ZS5sZW5ndGgpKSB7XG5cdFx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG5cdFx0XHRcdHRoaXMuc3RvcEF1dG9wbGF5KCk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdHRoaXMucmVtYWluaW5nSXRlbXMgPSAodGhpcy52YWx1ZS5sZW5ndGggLSB0aGlzLl9udW1WaXNpYmxlKSAlIHRoaXMuX251bVNjcm9sbDtcblxuXHRcdFx0bGV0IHBhZ2UgPSB0aGlzLl9wYWdlO1xuXHRcdFx0aWYgKHRoaXMudG90YWxEb3RzKCkgIT09IDAgJiYgcGFnZSA+PSB0aGlzLnRvdGFsRG90cygpKSB7XG4gICAgICAgICAgICAgICAgcGFnZSA9IHRoaXMudG90YWxEb3RzKCkgLSAxO1xuXHRcdFx0XHR0aGlzLl9wYWdlID0gcGFnZTtcblx0XHRcdFx0dGhpcy5vblBhZ2UuZW1pdCh7XG5cdFx0XHRcdFx0cGFnZTogdGhpcy5wYWdlXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHR0b3RhbFNoaWZ0ZWRJdGVtcyA9IChwYWdlICogdGhpcy5fbnVtU2Nyb2xsKSAqIC0xO1xuICAgICAgICAgICAgaWYgKGlzQ2lyY3VsYXIpIHtcbiAgICAgICAgICAgICAgICB0b3RhbFNoaWZ0ZWRJdGVtcyAtPSB0aGlzLl9udW1WaXNpYmxlO1xuICAgICAgICAgICAgfVxuXG5cdFx0XHRpZiAocGFnZSA9PT0gKHRoaXMudG90YWxEb3RzKCkgLSAxKSAmJiB0aGlzLnJlbWFpbmluZ0l0ZW1zID4gMCkge1xuXHRcdFx0XHR0b3RhbFNoaWZ0ZWRJdGVtcyArPSAoLTEgKiB0aGlzLnJlbWFpbmluZ0l0ZW1zKSArIHRoaXMuX251bVNjcm9sbDtcblx0XHRcdFx0dGhpcy5pc1JlbWFpbmluZ0l0ZW1zQWRkZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0b3RhbFNoaWZ0ZWRJdGVtcyAhPT0gdGhpcy50b3RhbFNoaWZ0ZWRJdGVtcykge1xuICAgICAgICAgICAgICAgIHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPSB0b3RhbFNoaWZ0ZWRJdGVtcztcbiAgICAgICAgICAgIH1cblxuXHRcdFx0dGhpcy5fb2xkTnVtU2Nyb2xsID0gdGhpcy5fbnVtU2Nyb2xsO1xuXHRcdFx0dGhpcy5wcmV2U3RhdGUubnVtU2Nyb2xsID0gdGhpcy5fbnVtU2Nyb2xsO1xuXHRcdFx0dGhpcy5wcmV2U3RhdGUubnVtVmlzaWJsZSA9IHRoaXMuX251bVZpc2libGU7XG5cdFx0XHR0aGlzLnByZXZTdGF0ZS52YWx1ZSA9IHRoaXMuX3ZhbHVlO1xuXG5cdFx0XHRpZiAodGhpcy50b3RhbERvdHMoKSA+IDApIHtcblx0XHRcdFx0dGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuaXNWZXJ0aWNhbCgpID8gYHRyYW5zbGF0ZTNkKDAsICR7dG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDAsIDApYDtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0dGhpcy5pc0NyZWF0ZWQgPSB0cnVlO1xuXG5cdFx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsICYmIHRoaXMuaXNBdXRvcGxheSgpKSB7XG5cdFx0XHRcdHRoaXMuc3RhcnRBdXRvcGxheSgpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChpc0NpcmN1bGFyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdG90YWxTaGlmdGVkSXRlbXMgPSAtMSAqIHRoaXMuX251bVZpc2libGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0b3RhbFNoaWZ0ZWRJdGVtcyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRvdGFsU2hpZnRlZEl0ZW1zID0gLTEgKiB0aGlzLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZW1haW5pbmdJdGVtcyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc1JlbWFpbmluZ0l0ZW1zQWRkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRvdGFsU2hpZnRlZEl0ZW1zICE9PSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zKSB7XG5cdFx0XHRcdHRoaXMudG90YWxTaGlmdGVkSXRlbXMgPSB0b3RhbFNoaWZ0ZWRJdGVtcztcbiAgICAgICAgICAgIH1cblx0XHR9XG5cdH1cblxuXHRjcmVhdGVTdHlsZSgpIHtcblx0XHRcdGlmICghdGhpcy5jYXJvdXNlbFN0eWxlKSB7XG5cdFx0XHRcdHRoaXMuY2Fyb3VzZWxTdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cdFx0XHRcdHRoaXMuY2Fyb3VzZWxTdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNhcm91c2VsU3R5bGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgIyR7dGhpcy5pZH0gLnVpLWNhcm91c2VsLWl0ZW0ge1xuXHRcdFx0XHRmbGV4OiAxIDAgJHsgKDEwMC8gdGhpcy5udW1WaXNpYmxlKSB9JVxuXHRcdFx0fVxuICAgICAgICBgO1xuXG5cdFx0XHRpZiAodGhpcy5yZXNwb25zaXZlT3B0aW9ucykge1xuXHRcdFx0XHR0aGlzLnJlc3BvbnNpdmVPcHRpb25zLnNvcnQoKGRhdGExLCBkYXRhMikgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHZhbHVlMSA9IGRhdGExLmJyZWFrcG9pbnQ7XG5cdFx0XHRcdFx0Y29uc3QgdmFsdWUyID0gZGF0YTIuYnJlYWtwb2ludDtcblx0XHRcdFx0XHRsZXQgcmVzdWx0ID0gbnVsbDtcblxuXHRcdFx0XHRcdGlmICh2YWx1ZTEgPT0gbnVsbCAmJiB2YWx1ZTIgIT0gbnVsbClcblx0XHRcdFx0XHRcdHJlc3VsdCA9IC0xO1xuXHRcdFx0XHRcdGVsc2UgaWYgKHZhbHVlMSAhPSBudWxsICYmIHZhbHVlMiA9PSBudWxsKVxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gMTtcblx0XHRcdFx0XHRlbHNlIGlmICh2YWx1ZTEgPT0gbnVsbCAmJiB2YWx1ZTIgPT0gbnVsbClcblx0XHRcdFx0XHRcdHJlc3VsdCA9IDA7XG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIHZhbHVlMSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlMiA9PT0gJ3N0cmluZycpXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSB2YWx1ZTEubG9jYWxlQ29tcGFyZSh2YWx1ZTIsIHVuZGVmaW5lZCwgeyBudW1lcmljOiB0cnVlIH0pO1xuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHJlc3VsdCA9ICh2YWx1ZTEgPCB2YWx1ZTIpID8gLTEgOiAodmFsdWUxID4gdmFsdWUyKSA/IDEgOiAwO1xuXG5cdFx0XHRcdFx0cmV0dXJuIC0xICogcmVzdWx0O1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRsZXQgcmVzID0gdGhpcy5yZXNwb25zaXZlT3B0aW9uc1tpXTtcblxuXHRcdFx0XHRcdGlubmVySFRNTCArPSBgXG4gICAgICAgICAgICAgICAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7cmVzLmJyZWFrcG9pbnR9KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAjJHt0aGlzLmlkfSAudWktY2Fyb3VzZWwtaXRlbSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogMSAwICR7ICgxMDAvIHJlcy5udW1WaXNpYmxlKSB9JVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuY2Fyb3VzZWxTdHlsZS5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG5cdFx0fVxuXG5cdGNhbGN1bGF0ZVBvc2l0aW9uKCkge1xuXHRcdGlmICh0aGlzLml0ZW1zQ29udGFpbmVyICYmIHRoaXMucmVzcG9uc2l2ZU9wdGlvbnMpIHtcblx0XHRcdGxldCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdFx0bGV0IG1hdGNoZWRSZXNwb25zaXZlRGF0YSA9IHtcblx0XHRcdFx0bnVtVmlzaWJsZTogdGhpcy5kZWZhdWx0TnVtVmlzaWJsZSxcblx0XHRcdFx0bnVtU2Nyb2xsOiB0aGlzLmRlZmF1bHROdW1TY3JvbGxcblx0XHRcdH07XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yZXNwb25zaXZlT3B0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgcmVzID0gdGhpcy5yZXNwb25zaXZlT3B0aW9uc1tpXTtcblxuXHRcdFx0XHRpZiAocGFyc2VJbnQocmVzLmJyZWFrcG9pbnQsIDEwKSA+PSB3aW5kb3dXaWR0aCkge1xuXHRcdFx0XHRcdG1hdGNoZWRSZXNwb25zaXZlRGF0YSA9IHJlcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5fbnVtU2Nyb2xsICE9PSBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtU2Nyb2xsKSB7XG5cdFx0XHRcdGxldCBwYWdlID0gdGhpcy5fcGFnZTtcblx0XHRcdFx0cGFnZSA9IE1hdGguZmxvb3IoKHBhZ2UgKiB0aGlzLl9udW1TY3JvbGwpIC8gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVNjcm9sbCk7XG5cblx0XHRcdFx0bGV0IHRvdGFsU2hpZnRlZEl0ZW1zID0gKG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1TY3JvbGwgKiB0aGlzLnBhZ2UpICogLTE7XG5cblx0XHRcdFx0aWYgKHRoaXMuaXNDaXJjdWxhcigpKSB7XG5cdFx0XHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgLT0gbWF0Y2hlZFJlc3BvbnNpdmVEYXRhLm51bVZpc2libGU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XG5cdFx0XHRcdHRoaXMuX251bVNjcm9sbCA9IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1TY3JvbGw7XG5cblx0XHRcdFx0dGhpcy5fcGFnZSA9IHBhZ2U7XG5cdFx0XHRcdHRoaXMub25QYWdlLmVtaXQoe1xuXHRcdFx0XHRcdHBhZ2U6IHRoaXMucGFnZVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHRoaXMuX251bVZpc2libGUgIT09IG1hdGNoZWRSZXNwb25zaXZlRGF0YS5udW1WaXNpYmxlKSB7XG5cdFx0XHRcdHRoaXMuX251bVZpc2libGUgPSBtYXRjaGVkUmVzcG9uc2l2ZURhdGEubnVtVmlzaWJsZTtcblx0XHRcdFx0dGhpcy5zZXRDbG9uZUl0ZW1zKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdFxuXHRzZXRDbG9uZUl0ZW1zKCkge1xuXHRcdHRoaXMuY2xvbmVkSXRlbXNGb3JTdGFydGluZyA9IFtdO1xuXHRcdHRoaXMuY2xvbmVkSXRlbXNGb3JGaW5pc2hpbmcgPSBbXTtcblx0XHRpZiAodGhpcy5pc0NpcmN1bGFyKCkpIHtcblx0XHRcdHRoaXMuY2xvbmVkSXRlbXNGb3JTdGFydGluZy5wdXNoKC4uLnRoaXMudmFsdWUuc2xpY2UoLTEgKiB0aGlzLl9udW1WaXNpYmxlKSk7XG5cdFx0XHR0aGlzLmNsb25lZEl0ZW1zRm9yRmluaXNoaW5nLnB1c2goLi4udGhpcy52YWx1ZS5zbGljZSgwLCB0aGlzLl9udW1WaXNpYmxlKSk7XG5cdFx0fVxuXHR9XG5cblx0Zmlyc3RJbmRleCgpIHtcblx0XHRyZXR1cm4gdGhpcy5pc0NpcmN1bGFyKCkgPyAoLTEgKiAodGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyArIHRoaXMubnVtVmlzaWJsZSkpIDogKHRoaXMudG90YWxTaGlmdGVkSXRlbXMgKiAtMSk7XG5cdH1cblxuXHRsYXN0SW5kZXgoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZmlyc3RJbmRleCgpICsgdGhpcy5udW1WaXNpYmxlIC0gMTtcblx0fVxuXG5cdHRvdGFsRG90cygpIHtcblx0XHRyZXR1cm4gdGhpcy52YWx1ZSA/IE1hdGguY2VpbCgodGhpcy52YWx1ZS5sZW5ndGggLSB0aGlzLl9udW1WaXNpYmxlKSAvIHRoaXMuX251bVNjcm9sbCkgKyAxIDogMDtcblx0fVxuXG5cdHRvdGFsRG90c0FycmF5KCkge1xuXHRcdGNvbnN0IHRvdGFsRG90cyA9IHRoaXMudG90YWxEb3RzKCk7XG5cdFx0cmV0dXJuIHRvdGFsRG90cyA8PSAwID8gW10gOiBBcnJheSh0b3RhbERvdHMpLmZpbGwoMCk7XG5cdH1cblxuXHRjb250YWluZXJDbGFzcygpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0J3VpLWNhcm91c2VsIHVpLXdpZGdldCc6dHJ1ZSwgXG5cdFx0XHQndWktY2Fyb3VzZWwtdmVydGljYWwnOiB0aGlzLmlzVmVydGljYWwoKSxcblx0XHRcdCd1aS1jYXJvdXNlbC1ob3Jpem9udGFsJzogIXRoaXMuaXNWZXJ0aWNhbCgpXG5cdFx0fTtcblx0fVxuXG5cdGNvbnRlbnRDbGFzc2VzKCkge1xuXHRcdHJldHVybiAndWktY2Fyb3VzZWwtY29udGVudCAnKyB0aGlzLmNvbnRlbnRDbGFzcztcblx0fVxuXG5cdGRvdHNDb250ZW50Q2xhc3NlcygpIHtcblx0XHRyZXR1cm4gJ3VpLWNhcm91c2VsLWRvdHMtY29udGFpbmVyIHVpLWhlbHBlci1yZXNldCAnICsgdGhpcy5kb3RzQ29udGFpbmVyQ2xhc3M7XG5cdH1cblxuXHRpc1ZlcnRpY2FsKCkge1xuXHRcdHJldHVybiB0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnO1xuXHR9XG5cblx0aXNDaXJjdWxhcigpIHtcblx0XHRyZXR1cm4gdGhpcy5jaXJjdWxhciAmJiB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoID49IHRoaXMubnVtVmlzaWJsZTtcblx0fVxuXG5cdGlzQXV0b3BsYXkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXV0b3BsYXlJbnRlcnZhbCAmJiB0aGlzLmFsbG93QXV0b3BsYXk7XG5cdH1cblxuXHRpc0ZvcndhcmROYXZEaXNhYmxlZCgpIHtcblx0XHRyZXR1cm4gdGhpcy5pc0VtcHR5KCkgfHwgKHRoaXMuX3BhZ2UgPj0gKHRoaXMudG90YWxEb3RzKCkgLSAxKSAmJiAhdGhpcy5pc0NpcmN1bGFyKCkpO1xuXHR9XG5cblx0aXNCYWNrd2FyZE5hdkRpc2FibGVkKCkge1xuXHRcdHJldHVybiB0aGlzLmlzRW1wdHkoKSB8fCAodGhpcy5fcGFnZSA8PSAwICAmJiAhdGhpcy5pc0NpcmN1bGFyKCkpO1xuXHR9XG5cblx0aXNFbXB0eSgpIHtcblx0XHRyZXR1cm4gIXRoaXMudmFsdWUgfHwgdGhpcy52YWx1ZS5sZW5ndGggPT09IDA7XG5cdH1cblxuXHRuYXZGb3J3YXJkKGUsaW5kZXg/KSB7XG5cdFx0aWYgKHRoaXMuaXNDaXJjdWxhcigpIHx8IHRoaXMuX3BhZ2UgPCAodGhpcy50b3RhbERvdHMoKSAtIDEpKSB7XG5cdFx0XHR0aGlzLnN0ZXAoLTEsIGluZGV4KTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG5cdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xuXHRcdFx0dGhpcy5hbGxvd0F1dG9wbGF5ID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKGUgJiYgZS5jYW5jZWxhYmxlKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXHR9XG5cblx0bmF2QmFja3dhcmQoZSxpbmRleD8pIHtcblx0XHRpZiAodGhpcy5pc0NpcmN1bGFyKCkgfHwgdGhpcy5fcGFnZSAhPT0gMCkge1xuXHRcdFx0dGhpcy5zdGVwKDEsIGluZGV4KTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG5cdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xuXHRcdFx0dGhpcy5hbGxvd0F1dG9wbGF5ID0gZmFsc2U7XG5cdFx0fVxuXHRcdFxuXHRcdGlmIChlICYmIGUuY2FuY2VsYWJsZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fVxuXG5cdG9uRG90Q2xpY2soZSwgaW5kZXgpIHtcblx0XHRsZXQgcGFnZSA9IHRoaXMuX3BhZ2U7XG5cblx0XHRpZiAodGhpcy5hdXRvcGxheUludGVydmFsKSB7XG5cdFx0XHR0aGlzLnN0b3BBdXRvcGxheSgpO1xuXHRcdFx0dGhpcy5hbGxvd0F1dG9wbGF5ID0gZmFsc2U7XG5cdFx0fVxuXHRcdFxuXHRcdGlmIChpbmRleCA+IHBhZ2UpIHtcblx0XHRcdHRoaXMubmF2Rm9yd2FyZChlLCBpbmRleCk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGluZGV4IDwgcGFnZSkge1xuXHRcdFx0dGhpcy5uYXZCYWNrd2FyZChlLCBpbmRleCk7XG5cdFx0fVxuXHR9XG5cblx0c3RlcChkaXIsIHBhZ2UpIHtcblx0XHRsZXQgdG90YWxTaGlmdGVkSXRlbXMgPSB0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zO1xuXHRcdGNvbnN0IGlzQ2lyY3VsYXIgPSB0aGlzLmlzQ2lyY3VsYXIoKTtcblxuXHRcdGlmIChwYWdlICE9IG51bGwpIHtcblx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zID0gKHRoaXMuX251bVNjcm9sbCAqIHBhZ2UpICogLTE7XG5cblx0XHRcdGlmIChpc0NpcmN1bGFyKSB7XG5cdFx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zIC09IHRoaXMuX251bVZpc2libGU7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gZmFsc2U7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgKz0gKHRoaXMuX251bVNjcm9sbCAqIGRpcik7XG5cdFx0XHRpZiAodGhpcy5pc1JlbWFpbmluZ0l0ZW1zQWRkZWQpIHtcblx0XHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgKz0gdGhpcy5yZW1haW5pbmdJdGVtcyAtICh0aGlzLl9udW1TY3JvbGwgKiBkaXIpO1xuXHRcdFx0XHR0aGlzLmlzUmVtYWluaW5nSXRlbXNBZGRlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgb3JpZ2luYWxTaGlmdGVkSXRlbXMgPSBpc0NpcmN1bGFyID8gKHRvdGFsU2hpZnRlZEl0ZW1zICsgdGhpcy5fbnVtVmlzaWJsZSkgOiB0b3RhbFNoaWZ0ZWRJdGVtcztcblx0XHRcdHBhZ2UgPSBNYXRoLmFicyhNYXRoLmZsb29yKChvcmlnaW5hbFNoaWZ0ZWRJdGVtcyAvIHRoaXMuX251bVNjcm9sbCkpKTtcblx0XHR9XG5cblx0XHRpZiAoaXNDaXJjdWxhciAmJiB0aGlzLnBhZ2UgPT09ICh0aGlzLnRvdGFsRG90cygpIC0gMSkgJiYgZGlyID09PSAtMSkge1xuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgPSAtMSAqICh0aGlzLnZhbHVlLmxlbmd0aCArIHRoaXMuX251bVZpc2libGUpO1xuXHRcdFx0cGFnZSA9IDA7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKGlzQ2lyY3VsYXIgJiYgdGhpcy5wYWdlID09PSAwICYmIGRpciA9PT0gMSkge1xuXHRcdFx0dG90YWxTaGlmdGVkSXRlbXMgPSAwO1xuXHRcdFx0cGFnZSA9ICh0aGlzLnRvdGFsRG90cygpIC0gMSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHBhZ2UgPT09ICh0aGlzLnRvdGFsRG90cygpIC0gMSkgJiYgdGhpcy5yZW1haW5pbmdJdGVtcyA+IDApIHtcblx0XHRcdHRvdGFsU2hpZnRlZEl0ZW1zICs9ICgodGhpcy5yZW1haW5pbmdJdGVtcyAqIC0xKSAtICh0aGlzLl9udW1TY3JvbGwgKiBkaXIpKTtcblx0XHRcdHRoaXMuaXNSZW1haW5pbmdJdGVtc0FkZGVkID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5pdGVtc0NvbnRhaW5lcikge1xuXHRcdFx0dGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuaXNWZXJ0aWNhbCgpID8gYHRyYW5zbGF0ZTNkKDAsICR7dG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwKWAgOiBgdHJhbnNsYXRlM2QoJHt0b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDAsIDApYDtcblx0XHRcdHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSA1MDBtcyBlYXNlIDBzJztcblx0XHR9XG5cblx0XHR0aGlzLnRvdGFsU2hpZnRlZEl0ZW1zID0gdG90YWxTaGlmdGVkSXRlbXM7XG5cdFx0dGhpcy5fcGFnZSA9IHBhZ2U7XG5cdFx0dGhpcy5vblBhZ2UuZW1pdCh7XG5cdFx0XHRwYWdlOiB0aGlzLnBhZ2Vcblx0XHR9KTtcblx0fVxuXG5cdHN0YXJ0QXV0b3BsYXkoKSB7XG5cdFx0dGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLnRvdGFsRG90cygpID4gMCkge1xuXHRcdFx0XHRpZiAodGhpcy5wYWdlID09PSAodGhpcy50b3RhbERvdHMoKSAtIDEpKSB7XG5cdFx0XHRcdFx0dGhpcy5zdGVwKC0xLCAwKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0aGlzLnN0ZXAoLTEsIHRoaXMucGFnZSArIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSwgXG5cdFx0dGhpcy5hdXRvcGxheUludGVydmFsKTtcblx0fVxuXG5cdHN0b3BBdXRvcGxheSgpIHtcblx0XHRpZiAodGhpcy5pbnRlcnZhbCkge1xuXHRcdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcblx0XHR9XG5cdH1cblxuXHRvblRyYW5zaXRpb25FbmQoKSB7XG5cdFx0aWYgKHRoaXMuaXRlbXNDb250YWluZXIpIHtcblx0XHRcdHRoaXMuaXRlbXNDb250YWluZXIubmF0aXZlRWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJyc7XG5cblx0XHRcdGlmICgodGhpcy5wYWdlID09PSAwIHx8IHRoaXMucGFnZSA9PT0gKHRoaXMudG90YWxEb3RzKCkgLSAxKSkgJiYgdGhpcy5pc0NpcmN1bGFyKCkpIHtcblx0XHRcdFx0dGhpcy5pdGVtc0NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuaXNWZXJ0aWNhbCgpID8gYHRyYW5zbGF0ZTNkKDAsICR7dGhpcy50b3RhbFNoaWZ0ZWRJdGVtcyAqICgxMDAvIHRoaXMuX251bVZpc2libGUpfSUsIDApYCA6IGB0cmFuc2xhdGUzZCgke3RoaXMudG90YWxTaGlmdGVkSXRlbXMgKiAoMTAwLyB0aGlzLl9udW1WaXNpYmxlKX0lLCAwLCAwKWA7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0b25Ub3VjaFN0YXJ0KGUpIHtcblx0XHRsZXQgdG91Y2hvYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdO1xuXG5cdFx0dGhpcy5zdGFydFBvcyA9IHtcblx0XHRcdHg6IHRvdWNob2JqLnBhZ2VYLFxuXHRcdFx0eTogdG91Y2hvYmoucGFnZVlcblx0XHR9O1xuXHR9XG5cblx0b25Ub3VjaE1vdmUoZSkge1xuXHRcdGlmIChlLmNhbmNlbGFibGUpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cdH1cblx0b25Ub3VjaEVuZChlKSB7XG5cdFx0bGV0IHRvdWNob2JqID0gZS5jaGFuZ2VkVG91Y2hlc1swXTtcblxuXHRcdGlmICh0aGlzLmlzVmVydGljYWwoKSkge1xuXHRcdFx0dGhpcy5jaGFuZ2VQYWdlT25Ub3VjaChlLCAodG91Y2hvYmoucGFnZVkgLSB0aGlzLnN0YXJ0UG9zLnkpKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLmNoYW5nZVBhZ2VPblRvdWNoKGUsICh0b3VjaG9iai5wYWdlWCAtIHRoaXMuc3RhcnRQb3MueCkpO1xuXHRcdH1cblx0fVxuXG5cdGNoYW5nZVBhZ2VPblRvdWNoKGUsIGRpZmYpIHtcblx0XHRpZiAoZGlmZiA8IDApIHtcblx0XHRcdHRoaXMubmF2Rm9yd2FyZChlKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLm5hdkJhY2t3YXJkKGUpO1xuXHRcdH1cblx0fVxuXG5cdGJpbmREb2N1bWVudExpc3RlbmVycygpIHtcblx0XHRpZiAoIXRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xuXHRcdFx0dGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gKGUpID0+IHtcblx0XHRcdFx0dGhpcy5jYWxjdWxhdGVQb3NpdGlvbigpO1xuXHRcdFx0fTtcblxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG5cdFx0fVxuXHR9XG5cblx0dW5iaW5kRG9jdW1lbnRMaXN0ZW5lcnMoKSB7XG5cdFx0aWYgKHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcikge1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcik7XG5cdFx0XHR0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdG5nT25EZXN0cm95KCkge1xuXHRcdGlmICh0aGlzLnJlc3BvbnNpdmVPcHRpb25zKSB7XG5cdFx0XHR0aGlzLnVuYmluZERvY3VtZW50TGlzdGVuZXJzKCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmF1dG9wbGF5SW50ZXJ2YWwpIHtcblx0XHRcdHRoaXMuc3RvcEF1dG9wbGF5KCk7XG5cdFx0fVxuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBTaGFyZWRNb2R1bGVdLFxuXHRleHBvcnRzOiBbQ29tbW9uTW9kdWxlLCBDYXJvdXNlbCwgU2hhcmVkTW9kdWxlXSxcblx0ZGVjbGFyYXRpb25zOiBbQ2Fyb3VzZWxdXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsTW9kdWxlIHsgfVxuIl19