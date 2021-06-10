var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, ElementRef, AfterViewInit, OnDestroy, TemplateRef, EmbeddedViewRef, ViewContainerRef, Renderer2, EventEmitter, Output, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
let DeferredLoader = class DeferredLoader {
    constructor(el, renderer, viewContainer) {
        this.el = el;
        this.renderer = renderer;
        this.viewContainer = viewContainer;
        this.onLoad = new EventEmitter();
    }
    ngAfterViewInit() {
        if (this.shouldLoad()) {
            this.load();
        }
        if (!this.isLoaded()) {
            this.documentScrollListener = this.renderer.listen('window', 'scroll', () => {
                if (this.shouldLoad()) {
                    this.load();
                    this.documentScrollListener();
                    this.documentScrollListener = null;
                }
            });
        }
    }
    shouldLoad() {
        if (this.isLoaded()) {
            return false;
        }
        else {
            let rect = this.el.nativeElement.getBoundingClientRect();
            let docElement = document.documentElement;
            let winHeight = docElement.clientHeight;
            return (winHeight >= rect.top);
        }
    }
    load() {
        this.view = this.viewContainer.createEmbeddedView(this.template);
        this.onLoad.emit();
    }
    isLoaded() {
        return this.view != null;
    }
    ngOnDestroy() {
        this.view = null;
        if (this.documentScrollListener) {
            this.documentScrollListener();
        }
    }
};
DeferredLoader.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ViewContainerRef }
];
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
export { DeferredLoader };
let DeferModule = class DeferModule {
};
DeferModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [DeferredLoader],
        declarations: [DeferredLoader]
    })
], DeferModule);
export { DeferModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2RlZmVyLyIsInNvdXJjZXMiOlsiZGVmZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLGVBQWUsRUFDakYsZ0JBQWdCLEVBQUMsU0FBUyxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUs3QyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBVXZCLFlBQW1CLEVBQWMsRUFBUyxRQUFtQixFQUFTLGFBQStCO1FBQWxGLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVMsa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBUjNGLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVErQyxDQUFDO0lBRXpHLGVBQWU7UUFDWCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUN4RSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNaLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO29CQUM5QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO2lCQUN0QztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ2pCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO2FBQ0k7WUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3pELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7WUFDMUMsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQztZQUV4QyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztJQUM3QixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFO1lBQzdCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztDQUNKLENBQUE7O1lBL0MwQixVQUFVO1lBQW1CLFNBQVM7WUFBd0IsZ0JBQWdCOztBQVIzRjtJQUFULE1BQU0sRUFBRTs4Q0FBZ0Q7QUFFWjtJQUE1QyxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO2dEQUE0QjtBQUovRCxjQUFjO0lBSDFCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO0tBQ3ZCLENBQUM7R0FDVyxjQUFjLENBeUQxQjtTQXpEWSxjQUFjO0FBZ0UzQixJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0NBQUksQ0FBQTtBQUFmLFdBQVc7SUFMdkIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQztRQUN6QixZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUM7S0FDakMsQ0FBQztHQUNXLFdBQVcsQ0FBSTtTQUFmLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLERpcmVjdGl2ZSxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsT25EZXN0cm95LFRlbXBsYXRlUmVmLEVtYmVkZGVkVmlld1JlZixcbiAgICAgICAgVmlld0NvbnRhaW5lclJlZixSZW5kZXJlcjIsRXZlbnRFbWl0dGVyLE91dHB1dCxDb250ZW50Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BEZWZlcl0nXG59KVxuZXhwb3J0IGNsYXNzIERlZmVycmVkTG9hZGVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3kge1xuICAgICAgICBcbiAgICBAT3V0cHV0KCkgb25Mb2FkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAQ29udGVudENoaWxkKFRlbXBsYXRlUmVmLCB7IHN0YXRpYzogdHJ1ZSB9KSB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgICAgICAgXG4gICAgZG9jdW1lbnRTY3JvbGxMaXN0ZW5lcjogRnVuY3Rpb247XG4gICAgXG4gICAgdmlldzogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gICAgICAgICAgICBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge31cbiAgICBcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZExvYWQoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghdGhpcy5pc0xvYWRlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50U2Nyb2xsTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbignd2luZG93JywgJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG91bGRMb2FkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRTY3JvbGxMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvY3VtZW50U2Nyb2xsTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHNob3VsZExvYWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmlzTG9hZGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCByZWN0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgbGV0IGRvY0VsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgICAgICBsZXQgd2luSGVpZ2h0ID0gZG9jRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiAod2luSGVpZ2h0ID49IHJlY3QudG9wKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBsb2FkKCk6IHZvaWQgeyBcbiAgICAgICAgdGhpcy52aWV3ID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUVtYmVkZGVkVmlldyh0aGlzLnRlbXBsYXRlKTtcbiAgICAgICAgdGhpcy5vbkxvYWQuZW1pdCgpO1xuICAgIH1cbiAgICBcbiAgICBpc0xvYWRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmlldyAhPSBudWxsO1xuICAgIH1cbiAgICAgICAgICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnZpZXcgPSBudWxsO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRTY3JvbGxMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0RlZmVycmVkTG9hZGVyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtEZWZlcnJlZExvYWRlcl1cbn0pXG5leHBvcnQgY2xhc3MgRGVmZXJNb2R1bGUgeyB9Il19