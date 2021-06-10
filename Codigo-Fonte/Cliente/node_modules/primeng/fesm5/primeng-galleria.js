import { EventEmitter, ElementRef, Input, Output, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Galleria = /** @class */ (function () {
    function Galleria(el) {
        this.el = el;
        this.panelWidth = 600;
        this.panelHeight = 400;
        this.frameWidth = 60;
        this.frameHeight = 40;
        this.activeIndex = 0;
        this.showFilmstrip = true;
        this.autoPlay = true;
        this.transitionInterval = 4000;
        this.showCaption = true;
        this.effectDuration = 500;
        this.onImageClicked = new EventEmitter();
        this.onImageChange = new EventEmitter();
        this.stripLeft = 0;
    }
    Galleria.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (this.imagesChanged) {
            this.stopSlideshow();
            Promise.resolve(null).then(function () {
                _this.render();
                _this.imagesChanged = false;
            });
        }
    };
    Object.defineProperty(Galleria.prototype, "images", {
        get: function () {
            return this._images;
        },
        set: function (value) {
            this._images = value;
            this.imagesChanged = true;
            if (this.initialized) {
                this.activeIndex = 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Galleria.prototype.ngAfterViewInit = function () {
        this.container = this.el.nativeElement.children[0];
        this.panelWrapper = DomHandler.findSingle(this.el.nativeElement, 'ul.ui-galleria-panel-wrapper');
        this.initialized = true;
        if (this.showFilmstrip) {
            this.stripWrapper = DomHandler.findSingle(this.container, 'div.ui-galleria-filmstrip-wrapper');
            this.strip = DomHandler.findSingle(this.stripWrapper, 'ul.ui-galleria-filmstrip');
        }
        if (this.images && this.images.length) {
            this.render();
        }
    };
    Galleria.prototype.render = function () {
        this.panels = DomHandler.find(this.panelWrapper, 'li.ui-galleria-panel');
        if (this.showFilmstrip) {
            this.frames = DomHandler.find(this.strip, 'li.ui-galleria-frame');
            this.stripWrapper.style.width = DomHandler.width(this.panelWrapper) - 50 + 'px';
            this.stripWrapper.style.height = this.frameHeight + 'px';
        }
        if (this.showCaption) {
            this.caption = DomHandler.findSingle(this.container, 'div.ui-galleria-caption');
            this.caption.style.bottom = this.showFilmstrip ? DomHandler.getOuterHeight(this.stripWrapper, true) + 'px' : 0 + 'px';
            this.caption.style.width = DomHandler.width(this.panelWrapper) + 'px';
        }
        if (this.autoPlay) {
            this.startSlideshow();
        }
        this.container.style.visibility = 'visible';
    };
    Galleria.prototype.startSlideshow = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.next();
        }, this.transitionInterval);
        this.slideshowActive = true;
    };
    Galleria.prototype.stopSlideshow = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.slideshowActive = false;
    };
    Galleria.prototype.clickNavRight = function () {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.next();
    };
    Galleria.prototype.clickNavLeft = function () {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.prev();
    };
    Galleria.prototype.frameClick = function (frame) {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.select(DomHandler.index(frame), false);
    };
    Galleria.prototype.prev = function () {
        if (this.activeIndex !== 0) {
            this.select(this.activeIndex - 1, true);
        }
    };
    Galleria.prototype.next = function () {
        if (this.activeIndex !== (this.panels.length - 1)) {
            this.select(this.activeIndex + 1, true);
        }
        else {
            this.select(0, false);
            this.stripLeft = 0;
        }
    };
    Galleria.prototype.select = function (index, reposition) {
        if (index !== this.activeIndex) {
            var oldPanel = this.panels[this.activeIndex], newPanel = this.panels[index];
            DomHandler.fadeIn(newPanel, this.effectDuration);
            if (this.showFilmstrip) {
                var oldFrame = this.frames[this.activeIndex], newFrame = this.frames[index];
                if (reposition === undefined || reposition === true) {
                    var frameLeft = newFrame.offsetLeft, stepFactor = this.frameWidth + parseInt(getComputedStyle(newFrame)['margin-right'], 10), stripLeft = this.strip.offsetLeft, frameViewportLeft = frameLeft + stripLeft, frameViewportRight = frameViewportLeft + this.frameWidth;
                    if (frameViewportRight > DomHandler.width(this.stripWrapper))
                        this.stripLeft -= stepFactor;
                    else if (frameViewportLeft < 0)
                        this.stripLeft += stepFactor;
                }
            }
            this.activeIndex = index;
            this.onImageChange.emit({ index: index });
        }
    };
    Galleria.prototype.clickImage = function (event, image, i) {
        this.onImageClicked.emit({ originalEvent: event, image: image, index: i });
    };
    Galleria.prototype.ngOnDestroy = function () {
        this.stopSlideshow();
    };
    Galleria.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], Galleria.prototype, "style", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "panelWidth", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "panelHeight", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "frameWidth", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "frameHeight", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "activeIndex", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "showFilmstrip", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "autoPlay", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "transitionInterval", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "showCaption", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "effectDuration", void 0);
    __decorate([
        Output()
    ], Galleria.prototype, "onImageClicked", void 0);
    __decorate([
        Output()
    ], Galleria.prototype, "onImageChange", void 0);
    __decorate([
        Input()
    ], Galleria.prototype, "images", null);
    Galleria = __decorate([
        Component({
            selector: 'p-galleria',
            template: "\n        <div [ngClass]=\"{'ui-galleria ui-widget ui-widget-content ui-corner-all':true}\" [ngStyle]=\"style\" [class]=\"styleClass\" [style.width.px]=\"panelWidth\">\n            <ul class=\"ui-galleria-panel-wrapper\" [style.width.px]=\"panelWidth\" [style.height.px]=\"panelHeight\">\n                <li *ngFor=\"let image of images;let i=index\" class=\"ui-galleria-panel\" [ngClass]=\"{'ui-helper-hidden':i!=activeIndex}\"\n                    [style.width.px]=\"panelWidth\" [style.height.px]=\"panelHeight\" (click)=\"clickImage($event,image,i)\">\n                    <img class=\"ui-panel-images\" [src]=\"image.source\" [alt]=\"image.alt\" [title]=\"image.title\"/>\n                </li>\n            </ul>\n            <div [ngClass]=\"{'ui-galleria-filmstrip-wrapper':true}\" *ngIf=\"showFilmstrip\">\n                <ul class=\"ui-galleria-filmstrip\" style=\"transition:left 1s\" [style.left.px]=\"stripLeft\">\n                    <li #frame *ngFor=\"let image of images;let i=index\" [ngClass]=\"{'ui-galleria-frame-active':i==activeIndex}\" class=\"ui-galleria-frame\" (click)=\"frameClick(frame)\"\n                        [style.width.px]=\"frameWidth\" [style.height.px]=\"frameHeight\" [style.transition]=\"'opacity 0.75s ease'\">\n                        <div class=\"ui-galleria-frame-content\">\n                            <img [src]=\"image.source\" [alt]=\"image.alt\" [title]=\"image.title\" class=\"ui-galleria-frame-image\"\n                                [style.width.px]=\"frameWidth\" [style.height.px]=\"frameHeight\">\n                        </div>\n                    </li>\n                </ul>\n            </div>\n            <div class=\"ui-galleria-nav-prev pi pi-fw pi-chevron-left\" (click)=\"clickNavLeft()\" [style.bottom.px]=\"frameHeight/2\" *ngIf=\"activeIndex !== 0\"></div>\n            <div class=\"ui-galleria-nav-next pi pi-fw pi-chevron-right\" (click)=\"clickNavRight()\" [style.bottom.px]=\"frameHeight/2\"></div>\n            <div class=\"ui-galleria-caption\" *ngIf=\"showCaption&&images\" style=\"display:block\">\n                <h4>{{images[activeIndex]?.title}}</h4><p>{{images[activeIndex]?.alt}}</p>\n            </div>\n        </div>\n    "
        })
    ], Galleria);
    return Galleria;
}());
var GalleriaModule = /** @class */ (function () {
    function GalleriaModule() {
    }
    GalleriaModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Galleria],
            declarations: [Galleria]
        })
    ], GalleriaModule);
    return GalleriaModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Galleria, GalleriaModule };
//# sourceMappingURL=primeng-galleria.js.map
