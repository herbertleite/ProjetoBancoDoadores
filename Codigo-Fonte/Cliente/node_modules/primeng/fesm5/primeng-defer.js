import { EventEmitter, ElementRef, Renderer2, ViewContainerRef, Output, ContentChild, TemplateRef, Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DeferredLoader = /** @class */ (function () {
    function DeferredLoader(el, renderer, viewContainer) {
        this.el = el;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.onLoad = new EventEmitter();
    }
    DeferredLoader.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.shouldLoad()) {
            this.load();
        }
        if (!this.isLoaded()) {
            this.documentScrollListener = this.renderer.listen('window', 'scroll', function () {
                if (_this.shouldLoad()) {
                    _this.load();
                    _this.documentScrollListener();
                    _this.documentScrollListener = null;
                }
            });
        }
    };
    DeferredLoader.prototype.shouldLoad = function () {
        if (this.isLoaded()) {
            return false;
        }
        else {
            var rect = this.el.nativeElement.getBoundingClientRect();
            var docElement = document.documentElement;
            var winHeight = docElement.clientHeight;
            return (winHeight >= rect.top);
        }
    };
    DeferredLoader.prototype.load = function () {
        this.view = this.viewContainer.createEmbeddedView(this.template);
        this.onLoad.emit();
    };
    DeferredLoader.prototype.isLoaded = function () {
        return this.view != null;
    };
    DeferredLoader.prototype.ngOnDestroy = function () {
        this.view = null;
        if (this.documentScrollListener) {
            this.documentScrollListener();
        }
    };
    DeferredLoader.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ViewContainerRef }
    ]; };
    __decorate([
        Output()
    ], DeferredLoader.prototype, "onLoad", void 0);
    __decorate([
        ContentChild(TemplateRef, { static: true })
    ], DeferredLoader.prototype, "template", void 0);
    DeferredLoader = __decorate([
        Directive({
            selector: '[pDefer]'
        })
    ], DeferredLoader);
    return DeferredLoader;
}());
var DeferModule = /** @class */ (function () {
    function DeferModule() {
    }
    DeferModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [DeferredLoader],
            declarations: [DeferredLoader]
        })
    ], DeferModule);
    return DeferModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { DeferModule, DeferredLoader };
//# sourceMappingURL=primeng-defer.js.map
