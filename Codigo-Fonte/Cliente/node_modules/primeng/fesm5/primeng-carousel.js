import { EventEmitter, ElementRef, NgZone, Input, Output, ViewChild, ContentChild, ContentChildren, Component, NgModule } from '@angular/core';
import { Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { UniqueComponentId } from 'primeng/utils';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var Carousel = /** @class */ (function () {
    function Carousel(el, zone) {
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
    Object.defineProperty(Carousel.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (val) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "numVisible", {
        get: function () {
            return this._numVisible;
        },
        set: function (val) {
            this._numVisible = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "numScroll", {
        get: function () {
            return this._numVisible;
        },
        set: function (val) {
            this._numScroll = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Carousel.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            this._value = val;
            if (this.circular && this._value) {
                this.setCloneItems();
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Carousel.prototype.ngAfterContentInit = function () {
        var _this = this;
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
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    Carousel.prototype.ngAfterContentChecked = function () {
        var isCircular = this.isCircular();
        var totalShiftedItems = this.totalShiftedItems;
        if (this.value && (this.prevState.numScroll !== this._numScroll || this.prevState.numVisible !== this._numVisible || this.prevState.value.length !== this.value.length)) {
            if (this.autoplayInterval) {
                this.stopAutoplay();
            }
            this.remainingItems = (this.value.length - this._numVisible) % this._numScroll;
            var page = this._page;
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
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? "translate3d(0, " + totalShiftedItems * (100 / this._numVisible) + "%, 0)" : "translate3d(" + totalShiftedItems * (100 / this._numVisible) + "%, 0, 0)";
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
    };
    Carousel.prototype.createStyle = function () {
        if (!this.carouselStyle) {
            this.carouselStyle = document.createElement('style');
            this.carouselStyle.type = 'text/css';
            document.body.appendChild(this.carouselStyle);
        }
        var innerHTML = "\n            #" + this.id + " .ui-carousel-item {\n\t\t\t\tflex: 1 0 " + (100 / this.numVisible) + "%\n\t\t\t}\n        ";
        if (this.responsiveOptions) {
            this.responsiveOptions.sort(function (data1, data2) {
                var value1 = data1.breakpoint;
                var value2 = data2.breakpoint;
                var result = null;
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
            for (var i = 0; i < this.responsiveOptions.length; i++) {
                var res = this.responsiveOptions[i];
                innerHTML += "\n                    @media screen and (max-width: " + res.breakpoint + ") {\n                        #" + this.id + " .ui-carousel-item {\n                            flex: 1 0 " + (100 / res.numVisible) + "%\n                        }\n                    }\n                ";
            }
        }
        this.carouselStyle.innerHTML = innerHTML;
    };
    Carousel.prototype.calculatePosition = function () {
        if (this.itemsContainer && this.responsiveOptions) {
            var windowWidth = window.innerWidth;
            var matchedResponsiveData = {
                numVisible: this.defaultNumVisible,
                numScroll: this.defaultNumScroll
            };
            for (var i = 0; i < this.responsiveOptions.length; i++) {
                var res = this.responsiveOptions[i];
                if (parseInt(res.breakpoint, 10) >= windowWidth) {
                    matchedResponsiveData = res;
                }
            }
            if (this._numScroll !== matchedResponsiveData.numScroll) {
                var page = this._page;
                page = Math.floor((page * this._numScroll) / matchedResponsiveData.numScroll);
                var totalShiftedItems = (matchedResponsiveData.numScroll * this.page) * -1;
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
    };
    Carousel.prototype.setCloneItems = function () {
        var _a, _b;
        this.clonedItemsForStarting = [];
        this.clonedItemsForFinishing = [];
        if (this.isCircular()) {
            (_a = this.clonedItemsForStarting).push.apply(_a, __spread(this.value.slice(-1 * this._numVisible)));
            (_b = this.clonedItemsForFinishing).push.apply(_b, __spread(this.value.slice(0, this._numVisible)));
        }
    };
    Carousel.prototype.firstIndex = function () {
        return this.isCircular() ? (-1 * (this.totalShiftedItems + this.numVisible)) : (this.totalShiftedItems * -1);
    };
    Carousel.prototype.lastIndex = function () {
        return this.firstIndex() + this.numVisible - 1;
    };
    Carousel.prototype.totalDots = function () {
        return this.value ? Math.ceil((this.value.length - this._numVisible) / this._numScroll) + 1 : 0;
    };
    Carousel.prototype.totalDotsArray = function () {
        var totalDots = this.totalDots();
        return totalDots <= 0 ? [] : Array(totalDots).fill(0);
    };
    Carousel.prototype.containerClass = function () {
        return {
            'ui-carousel ui-widget': true,
            'ui-carousel-vertical': this.isVertical(),
            'ui-carousel-horizontal': !this.isVertical()
        };
    };
    Carousel.prototype.contentClasses = function () {
        return 'ui-carousel-content ' + this.contentClass;
    };
    Carousel.prototype.dotsContentClasses = function () {
        return 'ui-carousel-dots-container ui-helper-reset ' + this.dotsContainerClass;
    };
    Carousel.prototype.isVertical = function () {
        return this.orientation === 'vertical';
    };
    Carousel.prototype.isCircular = function () {
        return this.circular && this.value && this.value.length >= this.numVisible;
    };
    Carousel.prototype.isAutoplay = function () {
        return this.autoplayInterval && this.allowAutoplay;
    };
    Carousel.prototype.isForwardNavDisabled = function () {
        return this.isEmpty() || (this._page >= (this.totalDots() - 1) && !this.isCircular());
    };
    Carousel.prototype.isBackwardNavDisabled = function () {
        return this.isEmpty() || (this._page <= 0 && !this.isCircular());
    };
    Carousel.prototype.isEmpty = function () {
        return !this.value || this.value.length === 0;
    };
    Carousel.prototype.navForward = function (e, index) {
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
    };
    Carousel.prototype.navBackward = function (e, index) {
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
    };
    Carousel.prototype.onDotClick = function (e, index) {
        var page = this._page;
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
    };
    Carousel.prototype.step = function (dir, page) {
        var totalShiftedItems = this.totalShiftedItems;
        var isCircular = this.isCircular();
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
            var originalShiftedItems = isCircular ? (totalShiftedItems + this._numVisible) : totalShiftedItems;
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
            this.itemsContainer.nativeElement.style.transform = this.isVertical() ? "translate3d(0, " + totalShiftedItems * (100 / this._numVisible) + "%, 0)" : "translate3d(" + totalShiftedItems * (100 / this._numVisible) + "%, 0, 0)";
            this.itemsContainer.nativeElement.style.transition = 'transform 500ms ease 0s';
        }
        this.totalShiftedItems = totalShiftedItems;
        this._page = page;
        this.onPage.emit({
            page: this.page
        });
    };
    Carousel.prototype.startAutoplay = function () {
        var _this = this;
        this.interval = setInterval(function () {
            if (_this.totalDots() > 0) {
                if (_this.page === (_this.totalDots() - 1)) {
                    _this.step(-1, 0);
                }
                else {
                    _this.step(-1, _this.page + 1);
                }
            }
        }, this.autoplayInterval);
    };
    Carousel.prototype.stopAutoplay = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    Carousel.prototype.onTransitionEnd = function () {
        if (this.itemsContainer) {
            this.itemsContainer.nativeElement.style.transition = '';
            if ((this.page === 0 || this.page === (this.totalDots() - 1)) && this.isCircular()) {
                this.itemsContainer.nativeElement.style.transform = this.isVertical() ? "translate3d(0, " + this.totalShiftedItems * (100 / this._numVisible) + "%, 0)" : "translate3d(" + this.totalShiftedItems * (100 / this._numVisible) + "%, 0, 0)";
            }
        }
    };
    Carousel.prototype.onTouchStart = function (e) {
        var touchobj = e.changedTouches[0];
        this.startPos = {
            x: touchobj.pageX,
            y: touchobj.pageY
        };
    };
    Carousel.prototype.onTouchMove = function (e) {
        if (e.cancelable) {
            e.preventDefault();
        }
    };
    Carousel.prototype.onTouchEnd = function (e) {
        var touchobj = e.changedTouches[0];
        if (this.isVertical()) {
            this.changePageOnTouch(e, (touchobj.pageY - this.startPos.y));
        }
        else {
            this.changePageOnTouch(e, (touchobj.pageX - this.startPos.x));
        }
    };
    Carousel.prototype.changePageOnTouch = function (e, diff) {
        if (diff < 0) {
            this.navForward(e);
        }
        else {
            this.navBackward(e);
        }
    };
    Carousel.prototype.bindDocumentListeners = function () {
        var _this = this;
        if (!this.documentResizeListener) {
            this.documentResizeListener = function (e) {
                _this.calculatePosition();
            };
            window.addEventListener('resize', this.documentResizeListener);
        }
    };
    Carousel.prototype.unbindDocumentListeners = function () {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    };
    Carousel.prototype.ngOnDestroy = function () {
        if (this.responsiveOptions) {
            this.unbindDocumentListeners();
        }
        if (this.autoplayInterval) {
            this.stopAutoplay();
        }
    };
    Carousel.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
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
            template: "\n\t\t<div [attr.id]=\"id\" [ngClass]=\"containerClass()\" [ngStyle]=\"style\" [class]=\"styleClass\">\n\t\t\t<div class=\"ui-carousel-header\" *ngIf=\"headerFacet\">\n\t\t\t\t<ng-content select=\"p-header\"></ng-content>\n\t\t\t</div>\n\t\t\t<div [class]=\"contentClasses()\">\n\t\t\t\t<div class=\"ui-carousel-container\">\n\t\t\t\t\t<button [ngClass]=\"{'ui-carousel-prev ui-button ui-widget ui-state-default ui-corner-all':true, 'ui-state-disabled': isBackwardNavDisabled()}\" [disabled]=\"isBackwardNavDisabled()\" (click)=\"navBackward($event)\">\n\t\t\t\t\t\t<span [ngClass]=\"{'ui-carousel-prev-icon pi': true, 'pi-chevron-left': !isVertical(), 'pi-chevron-up': isVertical()}\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t\t<div class=\"ui-carousel-items-content\" [ngStyle]=\"{'height': isVertical() ? verticalViewPortHeight : 'auto'}\">\n\t\t\t\t\t\t<div #itemsContainer class=\"ui-carousel-items-container\" (transitionend)=\"onTransitionEnd()\" (touchend)=\"onTouchEnd($event)\" (touchstart)=\"onTouchStart($event)\" (touchmove)=\"onTouchMove($event)\">\n\t\t\t\t\t\t\t<div *ngFor=\"let item of clonedItemsForStarting; let index = index\" [ngClass]= \"{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': (totalShiftedItems * -1) === (value.length),\n\t\t\t\t\t\t\t'ui-carousel-item-start': 0 === index,\n\t\t\t\t\t\t\t'ui-carousel-item-end': (clonedItemsForStarting.length - 1) === index}\">\n\t\t\t\t\t\t\t\t<ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div *ngFor=\"let item of value; let index = index\" [ngClass]= \"{'ui-carousel-item': true,'ui-carousel-item-active': (firstIndex() <= index && lastIndex() >= index),\n\t\t\t\t\t\t\t'ui-carousel-item-start': firstIndex() === index,\n\t\t\t\t\t\t\t'ui-carousel-item-end': lastIndex() === index}\">\n\t\t\t\t\t\t\t\t<ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div *ngFor=\"let item of clonedItemsForFinishing; let index = index\" [ngClass]= \"{'ui-carousel-item ui-carousel-item-cloned': true,'ui-carousel-item-active': ((totalShiftedItems *-1) === numVisible),\n\t\t\t\t\t\t\t'ui-carousel-item-start': 0 === index,\n\t\t\t\t\t\t\t'ui-carousel-item-end': (clonedItemsForFinishing.length - 1) === index}\">\n\t\t\t\t\t\t\t\t<ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<button [ngClass]=\"{'ui-carousel-next ui-button ui-widget ui-state-default ui-corner-all': true, 'ui-state-disabled': isForwardNavDisabled()}\" [disabled]=\"isForwardNavDisabled()\" (click)=\"navForward($event)\">\n\t\t\t\t\t\t<span [ngClass]=\"{'ui-carousel-next-icon pi': true, 'pi-chevron-right': !isVertical(), 'pi-chevron-down': isVertical()}\"></span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<ul [class]=\"dotsContentClasses()\">\n\t\t\t\t\t<li *ngFor=\"let totalDot of totalDotsArray(); let i = index\" [ngClass]=\"{'ui-carousel-dot-item':true,'ui-state-highlight': _page === i}\">\n\t\t\t\t\t\t<button class=\"ui-button ui-widget ui-state-default ui-corner-all\" (click)=\"onDotClick($event, i)\">\n\t\t\t\t\t\t\t<span [ngClass]=\"{'ui-carousel-dot-icon pi':true, 'pi-circle-on': _page === i, 'pi-circle-off': !(_page === i)}\"></span>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t\t<div class=\"ui-carousel-footer\" *ngIf=\"footerFacet\">\n\t\t\t\t<ng-content select=\"p-footer\"></ng-content>\n\t\t\t</div>\n\t\t</div>\n\t"
        })
    ], Carousel);
    return Carousel;
}());
var CarouselModule = /** @class */ (function () {
    function CarouselModule() {
    }
    CarouselModule = __decorate([
        NgModule({
            imports: [CommonModule, SharedModule],
            exports: [CommonModule, Carousel, SharedModule],
            declarations: [Carousel]
        })
    ], CarouselModule);
    return CarouselModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Carousel, CarouselModule };
//# sourceMappingURL=primeng-carousel.js.map
