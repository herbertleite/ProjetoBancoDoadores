var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, ElementRef, AfterViewInit, OnDestroy, TemplateRef, EmbeddedViewRef, ViewContainerRef, Renderer2, EventEmitter, Output, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export { DeferredLoader };
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
export { DeferModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2RlZmVyLyIsInNvdXJjZXMiOlsiZGVmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLGVBQWUsRUFDakYsZ0JBQWdCLEVBQUMsU0FBUyxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUs3QztJQVVJLHdCQUFtQixFQUFjLEVBQVMsUUFBbUIsRUFBUyxhQUErQjtRQUFsRixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLGtCQUFhLEdBQWIsYUFBYSxDQUFrQjtRQVIzRixXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUFRK0MsQ0FBQztJQUV6Ryx3Q0FBZSxHQUFmO1FBQUEsaUJBY0M7UUFiRyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUU7Z0JBQ25FLElBQUksS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFFO29CQUNuQixLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ1osS0FBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7b0JBQzlCLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7aUJBQ3RDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFFRCxtQ0FBVSxHQUFWO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDakIsT0FBTyxLQUFLLENBQUM7U0FDaEI7YUFDSTtZQUNELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDekQsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztZQUMxQyxJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDO1lBRXhDLE9BQU8sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xDO0lBQ0wsQ0FBQztJQUVELDZCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRCxvQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEVBQUU7WUFDN0IsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDakM7SUFDTCxDQUFDOztnQkE5Q3NCLFVBQVU7Z0JBQW1CLFNBQVM7Z0JBQXdCLGdCQUFnQjs7SUFSM0Y7UUFBVCxNQUFNLEVBQUU7a0RBQWdEO0lBRVo7UUFBNUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztvREFBNEI7SUFKL0QsY0FBYztRQUgxQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtTQUN2QixDQUFDO09BQ1csY0FBYyxDQXlEMUI7SUFBRCxxQkFBQztDQUFBLEFBekRELElBeURDO1NBekRZLGNBQWM7QUFnRTNCO0lBQUE7SUFBMkIsQ0FBQztJQUFmLFdBQVc7UUFMdkIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztZQUN6QixZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUM7U0FDakMsQ0FBQztPQUNXLFdBQVcsQ0FBSTtJQUFELGtCQUFDO0NBQUEsQUFBNUIsSUFBNEI7U0FBZixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxEaXJlY3RpdmUsRWxlbWVudFJlZixBZnRlclZpZXdJbml0LE9uRGVzdHJveSxUZW1wbGF0ZVJlZixFbWJlZGRlZFZpZXdSZWYsXG4gICAgICAgIFZpZXdDb250YWluZXJSZWYsUmVuZGVyZXIyLEV2ZW50RW1pdHRlcixPdXRwdXQsQ29udGVudENoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twRGVmZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWZlcnJlZExvYWRlciBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsT25EZXN0cm95IHtcbiAgICAgICAgXG4gICAgQE91dHB1dCgpIG9uTG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZiwgeyBzdGF0aWM6IHRydWUgfSkgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgICAgIFxuICAgIGRvY3VtZW50U2Nyb2xsTGlzdGVuZXI6IEZ1bmN0aW9uO1xuICAgIFxuICAgIHZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICAgICAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYpIHt9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5zaG91bGRMb2FkKCkpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRoaXMuaXNMb2FkZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFNjcm9sbExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ3dpbmRvdycsICdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvdWxkTG9hZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50U2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb2N1bWVudFNjcm9sbExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzaG91bGRMb2FkKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5pc0xvYWRlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgcmVjdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGxldCBkb2NFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICAgICAgbGV0IHdpbkhlaWdodCA9IGRvY0VsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gKHdpbkhlaWdodCA+PSByZWN0LnRvcCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbG9hZCgpOiB2b2lkIHsgXG4gICAgICAgIHRoaXMudmlldyA9IHRoaXMudmlld0NvbnRhaW5lci5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy50ZW1wbGF0ZSk7XG4gICAgICAgIHRoaXMub25Mb2FkLmVtaXQoKTtcbiAgICB9XG4gICAgXG4gICAgaXNMb2FkZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXcgIT0gbnVsbDtcbiAgICB9XG4gICAgICAgICAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy52aWV3ID0gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50U2Nyb2xsTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtEZWZlcnJlZExvYWRlcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbRGVmZXJyZWRMb2FkZXJdXG59KVxuZXhwb3J0IGNsYXNzIERlZmVyTW9kdWxlIHsgfSJdfQ==