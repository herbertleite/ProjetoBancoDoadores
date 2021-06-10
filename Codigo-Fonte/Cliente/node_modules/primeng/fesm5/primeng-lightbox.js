import { ElementRef, Renderer2, ChangeDetectorRef, Input, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Lightbox = /** @class */ (function () {
    function Lightbox(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.type = 'image';
        this.effectDuration = '500ms';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.closeOnEscape = true;
    }
    Lightbox.prototype.onImageClick = function (event, image, i, content) {
        this.index = i;
        this.loading = true;
        content.style.width = 32 + 'px';
        content.style.height = 32 + 'px';
        this.preventDocumentClickListener = true;
        this.show();
        this.displayImage(image);
        event.preventDefault();
    };
    Lightbox.prototype.ngAfterViewInit = function () {
        this.panel = DomHandler.findSingle(this.el.nativeElement, '.ui-lightbox ');
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                DomHandler.appendChild(this.panel, this.appendTo);
        }
    };
    Lightbox.prototype.onLinkClick = function (event, content) {
        this.preventDocumentClickListener = true;
        this.show();
        event.preventDefault();
    };
    Lightbox.prototype.displayImage = function (image) {
        var _this = this;
        setTimeout(function () {
            _this.cd.markForCheck();
            _this.currentImage = image;
            _this.captionText = image.title;
            _this.center();
        }, 1000);
    };
    Lightbox.prototype.show = function () {
        this.mask = document.createElement('div');
        DomHandler.addMultipleClasses(this.mask, 'ui-widget-overlay ui-dialog-mask');
        document.body.appendChild(this.mask);
        if (this.autoZIndex) {
            this.zindex = this.baseZIndex + (++DomHandler.zindex);
        }
        this.mask.style.zIndex = this.zindex - 1;
        this.center();
        this.visible = true;
        this.bindGlobalListeners();
    };
    Lightbox.prototype.hide = function (event) {
        this.captionText = null;
        this.index = null;
        this.currentImage = null;
        this.visible = false;
        if (this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
        this.unbindGlobalListeners();
        event.preventDefault();
    };
    Lightbox.prototype.center = function () {
        var elementWidth = DomHandler.getOuterWidth(this.panel);
        var elementHeight = DomHandler.getOuterHeight(this.panel);
        if (elementWidth == 0 && elementHeight == 0) {
            this.panel.style.visibility = 'hidden';
            this.panel.style.display = 'block';
            elementWidth = DomHandler.getOuterWidth(this.panel);
            elementHeight = DomHandler.getOuterHeight(this.panel);
            this.panel.style.display = 'none';
            this.panel.style.visibility = 'visible';
        }
    };
    Lightbox.prototype.onImageLoad = function (event, content) {
        var _this = this;
        var image = event.target;
        image.style.visibility = 'hidden';
        image.style.display = 'block';
        var imageWidth = DomHandler.getOuterWidth(image);
        var imageHeight = DomHandler.getOuterHeight(image);
        image.style.display = 'none';
        image.style.visibility = 'visible';
        content.style.width = imageWidth + 'px';
        content.style.height = imageHeight + 'px';
        this.panel.style.left = parseInt(this.panel.style.left) + (DomHandler.getOuterWidth(this.panel) - imageWidth) / 2 + 'px';
        this.panel.style.top = parseInt(this.panel.style.top) + (DomHandler.getOuterHeight(this.panel) - imageHeight) / 2 + 'px';
        setTimeout(function () {
            _this.cd.markForCheck();
            DomHandler.fadeIn(image, 500);
            image.style.display = 'block';
            //this.captionText = this.currentImage.title;
            _this.loading = false;
        }, parseInt(this.effectDuration));
    };
    Lightbox.prototype.prev = function (placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index > 0) {
            this.displayImage(this.images[--this.index]);
        }
    };
    Lightbox.prototype.next = function (placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index <= (this.images.length - 1)) {
            this.displayImage(this.images[++this.index]);
        }
    };
    Lightbox.prototype.bindGlobalListeners = function () {
        var _this = this;
        this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
            if (!_this.preventDocumentClickListener && _this.visible) {
                _this.hide(event);
            }
            _this.preventDocumentClickListener = false;
            _this.cd.markForCheck();
        });
        if (this.closeOnEscape && !this.documentEscapeListener) {
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
                if (event.which == 27) {
                    if (parseInt(_this.panel.style.zIndex) === (DomHandler.zindex + _this.baseZIndex)) {
                        _this.hide(event);
                    }
                }
            });
        }
    };
    Lightbox.prototype.unbindGlobalListeners = function () {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    Object.defineProperty(Lightbox.prototype, "leftVisible", {
        get: function () {
            return this.images && this.images.length && this.index != 0 && !this.loading;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Lightbox.prototype, "rightVisible", {
        get: function () {
            return this.images && this.images.length && this.index < (this.images.length - 1) && !this.loading;
        },
        enumerable: true,
        configurable: true
    });
    Lightbox.prototype.ngOnDestroy = function () {
        this.unbindGlobalListeners();
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.panel);
        }
    };
    Lightbox.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], Lightbox.prototype, "images", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "type", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "style", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "appendTo", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "easing", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "effectDuration", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], Lightbox.prototype, "closeOnEscape", void 0);
    Lightbox = __decorate([
        Component({
            selector: 'p-lightbox',
            template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"(type == 'image')\">\n            <a *ngFor=\"let image of images; let i = index;\" [href]=\"image.source\" (click)=\"onImageClick($event,image,i,content)\">\n                <img [src]=\"image.thumbnail\" [title]=\"image.title\" [alt]=\"image.alt\">\n            </a>\n        </div>\n        <span [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"(type == 'content')\" (click)=\"onLinkClick($event,content)\">\n            <ng-content select=\"a\"></ng-content>\n        </span>\n        <div class=\"ui-lightbox ui-widget ui-corner-all ui-shadow\" [style.display]=\"visible ? 'block' : 'none'\" [style.zIndex]=\"zindex\"\n            [ngClass]=\"{'ui-lightbox-loading': loading}\"\n            [style.transitionProperty]=\"'all'\" [style.transitionDuration]=\"effectDuration\" [style.transitionTimingFunction]=\"easing\" (click)=\"preventDocumentClickListener=true\">\n           <div class=\"ui-lightbox-content-wrapper\">\n              <a class=\"ui-state-default ui-lightbox-nav-left ui-corner-right\" [style.zIndex]=\"zindex + 1\" (click)=\"prev(img)\"\n                [ngClass]=\"{'ui-helper-hidden':!leftVisible}\"><span class=\"ui-lightbox-nav-icon pi pi-chevron-left\"></span></a>\n              <div #content class=\"ui-lightbox-content ui-corner-all\" \n                [style.transitionProperty]=\"'width,height'\" [style.transitionDuration]=\"effectDuration\" [style.transitionTimingFunction]=\"easing\">\n                <img #img [src]=\"currentImage ? currentImage.source||'' : ''\" (load)=\"onImageLoad($event,content)\" style=\"display:none\">\n                <ng-content></ng-content>\n              </div>\n              <a class=\"ui-state-default ui-lightbox-nav-right ui-corner-left ui-helper-hidden\" [style.zIndex]=\"zindex + 1\" (click)=\"next(img)\"\n                [ngClass]=\"{'ui-helper-hidden':!rightVisible}\"><span class=\"ui-lightbox-nav-icon pi pi-chevron-right\"></span></a>\n           </div>\n           <div class=\"ui-lightbox-caption ui-widget-header\" [style.display]=\"captionText ? 'block' : 'none'\">\n              <span class=\"ui-lightbox-caption-text\">{{captionText}}</span><a class=\"ui-lightbox-close ui-corner-all\" tabindex=\"0\" (click)=\"hide($event)\" (keydown.enter)=\"hide($event)\"><span class=\"pi pi-times\"></span></a>\n              <div style=\"clear:both\"></div>\n           </div>\n        </div>\n    "
        })
    ], Lightbox);
    return Lightbox;
}());
var LightboxModule = /** @class */ (function () {
    function LightboxModule() {
    }
    LightboxModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Lightbox],
            declarations: [Lightbox]
        })
    ], LightboxModule);
    return LightboxModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Lightbox, LightboxModule };
//# sourceMappingURL=primeng-lightbox.js.map
