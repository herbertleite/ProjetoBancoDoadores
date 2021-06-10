var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, AfterViewChecked, AfterViewInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
let Galleria = class Galleria {
    constructor(el) {
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
    ngAfterViewChecked() {
        if (this.imagesChanged) {
            this.stopSlideshow();
            Promise.resolve(null).then(() => {
                this.render();
                this.imagesChanged = false;
            });
        }
    }
    get images() {
        return this._images;
    }
    set images(value) {
        this._images = value;
        this.imagesChanged = true;
        if (this.initialized) {
            this.activeIndex = 0;
        }
    }
    ngAfterViewInit() {
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
    }
    render() {
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
    }
    startSlideshow() {
        this.interval = setInterval(() => {
            this.next();
        }, this.transitionInterval);
        this.slideshowActive = true;
    }
    stopSlideshow() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.slideshowActive = false;
    }
    clickNavRight() {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.next();
    }
    clickNavLeft() {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.prev();
    }
    frameClick(frame) {
        if (this.slideshowActive) {
            this.stopSlideshow();
        }
        this.select(DomHandler.index(frame), false);
    }
    prev() {
        if (this.activeIndex !== 0) {
            this.select(this.activeIndex - 1, true);
        }
    }
    next() {
        if (this.activeIndex !== (this.panels.length - 1)) {
            this.select(this.activeIndex + 1, true);
        }
        else {
            this.select(0, false);
            this.stripLeft = 0;
        }
    }
    select(index, reposition) {
        if (index !== this.activeIndex) {
            let oldPanel = this.panels[this.activeIndex], newPanel = this.panels[index];
            DomHandler.fadeIn(newPanel, this.effectDuration);
            if (this.showFilmstrip) {
                let oldFrame = this.frames[this.activeIndex], newFrame = this.frames[index];
                if (reposition === undefined || reposition === true) {
                    let frameLeft = newFrame.offsetLeft, stepFactor = this.frameWidth + parseInt(getComputedStyle(newFrame)['margin-right'], 10), stripLeft = this.strip.offsetLeft, frameViewportLeft = frameLeft + stripLeft, frameViewportRight = frameViewportLeft + this.frameWidth;
                    if (frameViewportRight > DomHandler.width(this.stripWrapper))
                        this.stripLeft -= stepFactor;
                    else if (frameViewportLeft < 0)
                        this.stripLeft += stepFactor;
                }
            }
            this.activeIndex = index;
            this.onImageChange.emit({ index: index });
        }
    }
    clickImage(event, image, i) {
        this.onImageClicked.emit({ originalEvent: event, image: image, index: i });
    }
    ngOnDestroy() {
        this.stopSlideshow();
    }
};
Galleria.ctorParameters = () => [
    { type: ElementRef }
];
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
        template: `
        <div [ngClass]="{'ui-galleria ui-widget ui-widget-content ui-corner-all':true}" [ngStyle]="style" [class]="styleClass" [style.width.px]="panelWidth">
            <ul class="ui-galleria-panel-wrapper" [style.width.px]="panelWidth" [style.height.px]="panelHeight">
                <li *ngFor="let image of images;let i=index" class="ui-galleria-panel" [ngClass]="{'ui-helper-hidden':i!=activeIndex}"
                    [style.width.px]="panelWidth" [style.height.px]="panelHeight" (click)="clickImage($event,image,i)">
                    <img class="ui-panel-images" [src]="image.source" [alt]="image.alt" [title]="image.title"/>
                </li>
            </ul>
            <div [ngClass]="{'ui-galleria-filmstrip-wrapper':true}" *ngIf="showFilmstrip">
                <ul class="ui-galleria-filmstrip" style="transition:left 1s" [style.left.px]="stripLeft">
                    <li #frame *ngFor="let image of images;let i=index" [ngClass]="{'ui-galleria-frame-active':i==activeIndex}" class="ui-galleria-frame" (click)="frameClick(frame)"
                        [style.width.px]="frameWidth" [style.height.px]="frameHeight" [style.transition]="'opacity 0.75s ease'">
                        <div class="ui-galleria-frame-content">
                            <img [src]="image.source" [alt]="image.alt" [title]="image.title" class="ui-galleria-frame-image"
                                [style.width.px]="frameWidth" [style.height.px]="frameHeight">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="ui-galleria-nav-prev pi pi-fw pi-chevron-left" (click)="clickNavLeft()" [style.bottom.px]="frameHeight/2" *ngIf="activeIndex !== 0"></div>
            <div class="ui-galleria-nav-next pi pi-fw pi-chevron-right" (click)="clickNavRight()" [style.bottom.px]="frameHeight/2"></div>
            <div class="ui-galleria-caption" *ngIf="showCaption&&images" style="display:block">
                <h4>{{images[activeIndex]?.title}}</h4><p>{{images[activeIndex]?.alt}}</p>
            </div>
        </div>
    `
    })
], Galleria);
export { Galleria };
let GalleriaModule = class GalleriaModule {
};
GalleriaModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Galleria],
        declarations: [Galleria]
    })
], GalleriaModule);
export { GalleriaModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyaWEuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2dhbGxlcmlhLyIsInNvdXJjZXMiOlsiZ2FsbGVyaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGdCQUFnQixFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0gsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUErQnZDLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUF3RGpCLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBbER4QixlQUFVLEdBQVcsR0FBRyxDQUFDO1FBRXpCLGdCQUFXLEdBQVcsR0FBRyxDQUFDO1FBRTFCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFeEIsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFFekIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFFeEIsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFFOUIsYUFBUSxHQUFZLElBQUksQ0FBQztRQUV6Qix1QkFBa0IsR0FBVyxJQUFJLENBQUM7UUFFbEMsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsbUJBQWMsR0FBVyxHQUFHLENBQUM7UUFFNUIsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXBDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQXNCdEMsY0FBUyxHQUFXLENBQUMsQ0FBQztJQU1PLENBQUM7SUFFckMsa0JBQWtCO1FBQ2QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxD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QUssRUFBRTtnREFBOEI7QUFFNUI7SUFBVCxNQUFNLEVBQUU7Z0RBQXFDO0FBRXBDO0lBQVQsTUFBTSxFQUFFOytDQUFvQztBQXdDcEM7SUFBUixLQUFLLEVBQUU7c0NBRVA7QUF0RVEsUUFBUTtJQTdCcEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBeUJUO0tBQ0osQ0FBQztHQUNXLFFBQVEsQ0FrTnBCO1NBbE5ZLFFBQVE7QUF5TnJCLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7Q0FBSSxDQUFBO0FBQWxCLGNBQWM7SUFMMUIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7S0FDM0IsQ0FBQztHQUNXLGNBQWMsQ0FBSTtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixBZnRlclZpZXdDaGVja2VkLEFmdGVyVmlld0luaXQsT25EZXN0cm95LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWdhbGxlcmlhJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktZ2FsbGVyaWEgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOnRydWV9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtzdHlsZS53aWR0aC5weF09XCJwYW5lbFdpZHRoXCI+XG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJ1aS1nYWxsZXJpYS1wYW5lbC13cmFwcGVyXCIgW3N0eWxlLndpZHRoLnB4XT1cInBhbmVsV2lkdGhcIiBbc3R5bGUuaGVpZ2h0LnB4XT1cInBhbmVsSGVpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpbWFnZSBvZiBpbWFnZXM7bGV0IGk9aW5kZXhcIiBjbGFzcz1cInVpLWdhbGxlcmlhLXBhbmVsXCIgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzppIT1hY3RpdmVJbmRleH1cIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGUud2lkdGgucHhdPVwicGFuZWxXaWR0aFwiIFtzdHlsZS5oZWlnaHQucHhdPVwicGFuZWxIZWlnaHRcIiAoY2xpY2spPVwiY2xpY2tJbWFnZSgkZXZlbnQsaW1hZ2UsaSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cInVpLXBhbmVsLWltYWdlc1wiIFtzcmNdPVwiaW1hZ2Uuc291cmNlXCIgW2FsdF09XCJpbWFnZS5hbHRcIiBbdGl0bGVdPVwiaW1hZ2UudGl0bGVcIi8+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsndWktZ2FsbGVyaWEtZmlsbXN0cmlwLXdyYXBwZXInOnRydWV9XCIgKm5nSWY9XCJzaG93RmlsbXN0cmlwXCI+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwidWktZ2FsbGVyaWEtZmlsbXN0cmlwXCIgc3R5bGU9XCJ0cmFuc2l0aW9uOmxlZnQgMXNcIiBbc3R5bGUubGVmdC5weF09XCJzdHJpcExlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpICNmcmFtZSAqbmdGb3I9XCJsZXQgaW1hZ2Ugb2YgaW1hZ2VzO2xldCBpPWluZGV4XCIgW25nQ2xhc3NdPVwieyd1aS1nYWxsZXJpYS1mcmFtZS1hY3RpdmUnOmk9PWFjdGl2ZUluZGV4fVwiIGNsYXNzPVwidWktZ2FsbGVyaWEtZnJhbWVcIiAoY2xpY2spPVwiZnJhbWVDbGljayhmcmFtZSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3N0eWxlLndpZHRoLnB4XT1cImZyYW1lV2lkdGhcIiBbc3R5bGUuaGVpZ2h0LnB4XT1cImZyYW1lSGVpZ2h0XCIgW3N0eWxlLnRyYW5zaXRpb25dPVwiJ29wYWNpdHkgMC43NXMgZWFzZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nYWxsZXJpYS1mcmFtZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBbc3JjXT1cImltYWdlLnNvdXJjZVwiIFthbHRdPVwiaW1hZ2UuYWx0XCIgW3RpdGxlXT1cImltYWdlLnRpdGxlXCIgY2xhc3M9XCJ1aS1nYWxsZXJpYS1mcmFtZS1pbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJmcmFtZVdpZHRoXCIgW3N0eWxlLmhlaWdodC5weF09XCJmcmFtZUhlaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWdhbGxlcmlhLW5hdi1wcmV2IHBpIHBpLWZ3IHBpLWNoZXZyb24tbGVmdFwiIChjbGljayk9XCJjbGlja05hdkxlZnQoKVwiIFtzdHlsZS5ib3R0b20ucHhdPVwiZnJhbWVIZWlnaHQvMlwiICpuZ0lmPVwiYWN0aXZlSW5kZXggIT09IDBcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1nYWxsZXJpYS1uYXYtbmV4dCBwaSBwaS1mdyBwaS1jaGV2cm9uLXJpZ2h0XCIgKGNsaWNrKT1cImNsaWNrTmF2UmlnaHQoKVwiIFtzdHlsZS5ib3R0b20ucHhdPVwiZnJhbWVIZWlnaHQvMlwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWdhbGxlcmlhLWNhcHRpb25cIiAqbmdJZj1cInNob3dDYXB0aW9uJiZpbWFnZXNcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIj5cbiAgICAgICAgICAgICAgICA8aDQ+e3tpbWFnZXNbYWN0aXZlSW5kZXhdPy50aXRsZX19PC9oND48cD57e2ltYWdlc1thY3RpdmVJbmRleF0/LmFsdH19PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyaWEgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLEFmdGVyVmlld0luaXQsT25EZXN0cm95IHtcbiAgICAgICAgXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHBhbmVsV2lkdGg6IG51bWJlciA9IDYwMDtcblxuICAgIEBJbnB1dCgpIHBhbmVsSGVpZ2h0OiBudW1iZXIgPSA0MDA7XG5cbiAgICBASW5wdXQoKSBmcmFtZVdpZHRoOiBudW1iZXIgPSA2MDtcbiAgICBcbiAgICBASW5wdXQoKSBmcmFtZUhlaWdodDogbnVtYmVyID0gNDA7XG5cbiAgICBASW5wdXQoKSBhY3RpdmVJbmRleDogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIHNob3dGaWxtc3RyaXA6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgYXV0b1BsYXk6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbkludGVydmFsOiBudW1iZXIgPSA0MDAwO1xuXG4gICAgQElucHV0KCkgc2hvd0NhcHRpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgZWZmZWN0RHVyYXRpb246IG51bWJlciA9IDUwMDtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25JbWFnZUNsaWNrZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25JbWFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBfaW1hZ2VzOiBhbnlbXTtcbiAgICBcbiAgICBzbGlkZXNob3dBY3RpdmU6IGJvb2xlYW47XG4gICAgXG4gICAgcHVibGljIGNvbnRhaW5lcjogYW55O1xuICAgIFxuICAgIHB1YmxpYyBwYW5lbFdyYXBwZXI6IGFueTtcbiAgICBcbiAgICBwdWJsaWMgcGFuZWxzOiBhbnk7XG4gICAgXG4gICAgcHVibGljIGNhcHRpb246IGFueTtcbiAgICBcbiAgICBwdWJsaWMgc3RyaXBXcmFwcGVyOiBhbnk7XG4gICAgXG4gICAgcHVibGljIHN0cmlwOiBhbnk7XG4gICAgXG4gICAgcHVibGljIGZyYW1lczogYW55O1xuICAgIFxuICAgIHB1YmxpYyBpbnRlcnZhbDogYW55O1xuICAgIFxuICAgIHB1YmxpYyBzdHJpcExlZnQ6IG51bWJlciA9IDA7XG4gICAgXG4gICAgcHVibGljIGltYWdlc0NoYW5nZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgcHVibGljIGluaXRpYWxpemVkOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2VzQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5zdG9wU2xpZGVzaG93KCk7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmltYWdlc0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGltYWdlcygpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbWFnZXM7XG4gICAgfVxuICAgIHNldCBpbWFnZXModmFsdWU6YW55W10pIHtcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gdmFsdWU7XG4gICAgICAgIHRoaXMuaW1hZ2VzQ2hhbmdlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgICAgICBcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgICAgICB0aGlzLnBhbmVsV3JhcHBlciA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd1bC51aS1nYWxsZXJpYS1wYW5lbC13cmFwcGVyJyk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc2hvd0ZpbG1zdHJpcCkge1xuICAgICAgICAgICAgdGhpcy5zdHJpcFdyYXBwZXIgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXIsJ2Rpdi51aS1nYWxsZXJpYS1maWxtc3RyaXAtd3JhcHBlcicpO1xuICAgICAgICAgICAgdGhpcy5zdHJpcCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLnN0cmlwV3JhcHBlciwndWwudWktZ2FsbGVyaWEtZmlsbXN0cmlwJyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmltYWdlcyAmJiB0aGlzLmltYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0gXG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5wYW5lbHMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5wYW5lbFdyYXBwZXIsICdsaS51aS1nYWxsZXJpYS1wYW5lbCcpOyBcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnNob3dGaWxtc3RyaXApIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuc3RyaXAsJ2xpLnVpLWdhbGxlcmlhLWZyYW1lJyk7XG4gICAgICAgICAgICB0aGlzLnN0cmlwV3JhcHBlci5zdHlsZS53aWR0aCA9IERvbUhhbmRsZXIud2lkdGgodGhpcy5wYW5lbFdyYXBwZXIpIC0gNTAgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5zdHJpcFdyYXBwZXIuc3R5bGUuaGVpZ2h0ID0gdGhpcy5mcmFtZUhlaWdodCArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnNob3dDYXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNhcHRpb24gPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5jb250YWluZXIsJ2Rpdi51aS1nYWxsZXJpYS1jYXB0aW9uJyk7XG4gICAgICAgICAgICB0aGlzLmNhcHRpb24uc3R5bGUuYm90dG9tID0gdGhpcy5zaG93RmlsbXN0cmlwID8gRG9tSGFuZGxlci5nZXRPdXRlckhlaWdodCh0aGlzLnN0cmlwV3JhcHBlcix0cnVlKSArICdweCcgOiAwICsgJ3B4JztcbiAgICAgICAgICAgIHRoaXMuY2FwdGlvbi5zdHlsZS53aWR0aCA9IERvbUhhbmRsZXIud2lkdGgodGhpcy5wYW5lbFdyYXBwZXIpICsgJ3B4JztcbiAgICAgICAgfVxuICAgXG4gICAgICAgIGlmICh0aGlzLmF1dG9QbGF5KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0U2xpZGVzaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgfVxuICAgIFxuICAgIHN0YXJ0U2xpZGVzaG93KCkge1xuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICAgIH0sIHRoaXMudHJhbnNpdGlvbkludGVydmFsKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2xpZGVzaG93QWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgICAgIFxuICAgIHN0b3BTbGlkZXNob3coKSB7XG4gICAgICAgIGlmICh0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNsaWRlc2hvd0FjdGl2ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBcbiAgICBjbGlja05hdlJpZ2h0KCkge1xuICAgICAgICBpZiAodGhpcy5zbGlkZXNob3dBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcFNsaWRlc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgIH0gXG4gICAgXG4gICAgY2xpY2tOYXZMZWZ0KCkge1xuICAgICAgICBpZiAodGhpcy5zbGlkZXNob3dBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcFNsaWRlc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJldigpO1xuICAgIH1cbiAgICBcbiAgICBmcmFtZUNsaWNrKGZyYW1lKSB7XG4gICAgICAgIGlmICh0aGlzLnNsaWRlc2hvd0FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9wU2xpZGVzaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2VsZWN0KERvbUhhbmRsZXIuaW5kZXgoZnJhbWUpLCBmYWxzZSk7XG4gICAgfVxuICAgIFxuICAgIHByZXYoKSB7XG4gICAgICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdCh0aGlzLmFjdGl2ZUluZGV4IC0gMSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmV4dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlSW5kZXggIT09ICh0aGlzLnBhbmVscy5sZW5ndGgtMSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KHRoaXMuYWN0aXZlSW5kZXggKyAxLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0KDAsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuc3RyaXBMZWZ0ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgXG4gICAgc2VsZWN0KGluZGV4LCByZXBvc2l0aW9uKSB7XG4gICAgICAgIGlmIChpbmRleCAhPT0gdGhpcy5hY3RpdmVJbmRleCkgeyAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IG9sZFBhbmVsID0gdGhpcy5wYW5lbHNbdGhpcy5hY3RpdmVJbmRleF0sXG4gICAgICAgICAgICBuZXdQYW5lbCA9IHRoaXMucGFuZWxzW2luZGV4XTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgRG9tSGFuZGxlci5mYWRlSW4obmV3UGFuZWwsIHRoaXMuZWZmZWN0RHVyYXRpb24pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5zaG93RmlsbXN0cmlwKSB7XG4gICAgICAgICAgICAgICAgbGV0IG9sZEZyYW1lID0gdGhpcy5mcmFtZXNbdGhpcy5hY3RpdmVJbmRleF0sXG4gICAgICAgICAgICAgICAgbmV3RnJhbWUgPSB0aGlzLmZyYW1lc1tpbmRleF07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHJlcG9zaXRpb24gPT09IHVuZGVmaW5lZCB8fCByZXBvc2l0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmcmFtZUxlZnQgPSBuZXdGcmFtZS5vZmZzZXRMZWZ0LFxuICAgICAgICAgICAgICAgICAgICBzdGVwRmFjdG9yID0gdGhpcy5mcmFtZVdpZHRoICsgcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShuZXdGcmFtZSlbJ21hcmdpbi1yaWdodCddLCAxMCksXG4gICAgICAgICAgICAgICAgICAgIHN0cmlwTGVmdCA9IHRoaXMuc3RyaXAub2Zmc2V0TGVmdCxcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVWaWV3cG9ydExlZnQgPSBmcmFtZUxlZnQgKyBzdHJpcExlZnQsXG4gICAgICAgICAgICAgICAgICAgIGZyYW1lVmlld3BvcnRSaWdodCA9IGZyYW1lVmlld3BvcnRMZWZ0ICsgdGhpcy5mcmFtZVdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyYW1lVmlld3BvcnRSaWdodCA+IERvbUhhbmRsZXIud2lkdGgodGhpcy5zdHJpcFdyYXBwZXIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHJpcExlZnQgLT0gc3RlcEZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZnJhbWVWaWV3cG9ydExlZnQgPCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHJpcExlZnQgKz0gc3RlcEZhY3RvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSW5kZXggPSBpbmRleDtcblxuICAgICAgICAgICAgdGhpcy5vbkltYWdlQ2hhbmdlLmVtaXQoe2luZGV4OiBpbmRleH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNsaWNrSW1hZ2UoZXZlbnQsIGltYWdlLCBpKSB7XG4gICAgICAgIHRoaXMub25JbWFnZUNsaWNrZWQuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIGltYWdlOiBpbWFnZSwgaW5kZXg6IGl9KVxuICAgIH1cbiAgICAgICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc3RvcFNsaWRlc2hvdygpO1xuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtHYWxsZXJpYV0sXG4gICAgZGVjbGFyYXRpb25zOiBbR2FsbGVyaWFdXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcmlhTW9kdWxlIHsgfSJdfQ==