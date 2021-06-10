var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Renderer2, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
let Lightbox = class Lightbox {
    constructor(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.type = 'image';
        this.effectDuration = '500ms';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.closeOnEscape = true;
    }
    onImageClick(event, image, i, content) {
        this.index = i;
        this.loading = true;
        content.style.width = 32 + 'px';
        content.style.height = 32 + 'px';
        this.preventDocumentClickListener = true;
        this.show();
        this.displayImage(image);
        event.preventDefault();
    }
    ngAfterViewInit() {
        this.panel = DomHandler.findSingle(this.el.nativeElement, '.ui-lightbox ');
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.panel);
            else
                DomHandler.appendChild(this.panel, this.appendTo);
        }
    }
    onLinkClick(event, content) {
        this.preventDocumentClickListener = true;
        this.show();
        event.preventDefault();
    }
    displayImage(image) {
        setTimeout(() => {
            this.cd.markForCheck();
            this.currentImage = image;
            this.captionText = image.title;
            this.center();
        }, 1000);
    }
    show() {
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
    }
    hide(event) {
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
    }
    center() {
        let elementWidth = DomHandler.getOuterWidth(this.panel);
        let elementHeight = DomHandler.getOuterHeight(this.panel);
        if (elementWidth == 0 && elementHeight == 0) {
            this.panel.style.visibility = 'hidden';
            this.panel.style.display = 'block';
            elementWidth = DomHandler.getOuterWidth(this.panel);
            elementHeight = DomHandler.getOuterHeight(this.panel);
            this.panel.style.display = 'none';
            this.panel.style.visibility = 'visible';
        }
    }
    onImageLoad(event, content) {
        let image = event.target;
        image.style.visibility = 'hidden';
        image.style.display = 'block';
        let imageWidth = DomHandler.getOuterWidth(image);
        let imageHeight = DomHandler.getOuterHeight(image);
        image.style.display = 'none';
        image.style.visibility = 'visible';
        content.style.width = imageWidth + 'px';
        content.style.height = imageHeight + 'px';
        this.panel.style.left = parseInt(this.panel.style.left) + (DomHandler.getOuterWidth(this.panel) - imageWidth) / 2 + 'px';
        this.panel.style.top = parseInt(this.panel.style.top) + (DomHandler.getOuterHeight(this.panel) - imageHeight) / 2 + 'px';
        setTimeout(() => {
            this.cd.markForCheck();
            DomHandler.fadeIn(image, 500);
            image.style.display = 'block';
            //this.captionText = this.currentImage.title;
            this.loading = false;
        }, parseInt(this.effectDuration));
    }
    prev(placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index > 0) {
            this.displayImage(this.images[--this.index]);
        }
    }
    next(placeholder) {
        this.captionText = null;
        this.loading = true;
        placeholder.style.display = 'none';
        if (this.index <= (this.images.length - 1)) {
            this.displayImage(this.images[++this.index]);
        }
    }
    bindGlobalListeners() {
        this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
            if (!this.preventDocumentClickListener && this.visible) {
                this.hide(event);
            }
            this.preventDocumentClickListener = false;
            this.cd.markForCheck();
        });
        if (this.closeOnEscape && !this.documentEscapeListener) {
            this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) => {
                if (event.which == 27) {
                    if (parseInt(this.panel.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
                        this.hide(event);
                    }
                }
            });
        }
    }
    unbindGlobalListeners() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    get leftVisible() {
        return this.images && this.images.length && this.index != 0 && !this.loading;
    }
    get rightVisible() {
        return this.images && this.images.length && this.index < (this.images.length - 1) && !this.loading;
    }
    ngOnDestroy() {
        this.unbindGlobalListeners();
        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.panel);
        }
    }
};
Lightbox.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
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
        template: `
        <div [ngStyle]="style" [class]="styleClass" *ngIf="(type == 'image')">
            <a *ngFor="let image of images; let i = index;" [href]="image.source" (click)="onImageClick($event,image,i,content)">
                <img [src]="image.thumbnail" [title]="image.title" [alt]="image.alt">
            </a>
        </div>
        <span [ngStyle]="style" [class]="styleClass" *ngIf="(type == 'content')" (click)="onLinkClick($event,content)">
            <ng-content select="a"></ng-content>
        </span>
        <div class="ui-lightbox ui-widget ui-corner-all ui-shadow" [style.display]="visible ? 'block' : 'none'" [style.zIndex]="zindex"
            [ngClass]="{'ui-lightbox-loading': loading}"
            [style.transitionProperty]="'all'" [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing" (click)="preventDocumentClickListener=true">
           <div class="ui-lightbox-content-wrapper">
              <a class="ui-state-default ui-lightbox-nav-left ui-corner-right" [style.zIndex]="zindex + 1" (click)="prev(img)"
                [ngClass]="{'ui-helper-hidden':!leftVisible}"><span class="ui-lightbox-nav-icon pi pi-chevron-left"></span></a>
              <div #content class="ui-lightbox-content ui-corner-all" 
                [style.transitionProperty]="'width,height'" [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing">
                <img #img [src]="currentImage ? currentImage.source||'' : ''" (load)="onImageLoad($event,content)" style="display:none">
                <ng-content></ng-content>
              </div>
              <a class="ui-state-default ui-lightbox-nav-right ui-corner-left ui-helper-hidden" [style.zIndex]="zindex + 1" (click)="next(img)"
                [ngClass]="{'ui-helper-hidden':!rightVisible}"><span class="ui-lightbox-nav-icon pi pi-chevron-right"></span></a>
           </div>
           <div class="ui-lightbox-caption ui-widget-header" [style.display]="captionText ? 'block' : 'none'">
              <span class="ui-lightbox-caption-text">{{captionText}}</span><a class="ui-lightbox-close ui-corner-all" tabindex="0" (click)="hide($event)" (keydown.enter)="hide($event)"><span class="pi pi-times"></span></a>
              <div style="clear:both"></div>
           </div>
        </div>
    `
    })
], Lightbox);
export { Lightbox };
let LightboxModule = class LightboxModule {
};
LightboxModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Lightbox],
        declarations: [Lightbox]
    })
], LightboxModule);
export { LightboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2xpZ2h0Ym94LyIsInNvdXJjZXMiOlsibGlnaHRib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsYUFBYSxFQUFDLFNBQVMsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2SCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQWtDdkMsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQTRDakIsWUFBbUIsRUFBYyxFQUFTLFFBQW1CLEVBQVMsRUFBcUI7UUFBeEUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQXhDbEYsU0FBSSxHQUFXLE9BQU8sQ0FBQztRQVV2QixtQkFBYyxHQUFRLE9BQU8sQ0FBQztRQUU5QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsa0JBQWEsR0FBWSxJQUFJLENBQUM7SUF3QnVELENBQUM7SUFFL0YsWUFBWSxDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLE9BQU87UUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQztRQUN6QyxJQUFJ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SzBCLFVBQVU7WUFBbUIsU0FBUztZQUFhLGlCQUFpQjs7QUExQ2xGO0lBQVIsS0FBSyxFQUFFO3dDQUFlO0FBRWQ7SUFBUixLQUFLLEVBQUU7c0NBQXdCO0FBRXZCO0lBQVIsS0FBSyxFQUFFO3VDQUFZO0FBRVg7SUFBUixLQUFLLEVBQUU7NENBQW9CO0FBRW5CO0lBQVIsS0FBSyxFQUFFOzBDQUFlO0FBRWQ7SUFBUixLQUFLLEVBQUU7d0NBQW9CO0FBRW5CO0lBQVIsS0FBSyxFQUFFO2dEQUErQjtBQUU5QjtJQUFSLEtBQUssRUFBRTs0Q0FBNEI7QUFFM0I7SUFBUixLQUFLLEVBQUU7NENBQXdCO0FBRXZCO0lBQVIsS0FBSyxFQUFFOytDQUErQjtBQXBCOUIsUUFBUTtJQWhDcEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNEJUO0tBQ0osQ0FBQztHQUNXLFFBQVEsQ0FxTnBCO1NBck5ZLFFBQVE7QUE0TnJCLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7Q0FBSSxDQUFBO0FBQWxCLGNBQWM7SUFMMUIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7S0FDM0IsQ0FBQztHQUNXLGNBQWMsQ0FBSTtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixJbnB1dCxSZW5kZXJlcjIsQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3ksIENoYW5nZURldGVjdG9yUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1saWdodGJveCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKm5nSWY9XCIodHlwZSA9PSAnaW1hZ2UnKVwiPlxuICAgICAgICAgICAgPGEgKm5nRm9yPVwibGV0IGltYWdlIG9mIGltYWdlczsgbGV0IGkgPSBpbmRleDtcIiBbaHJlZl09XCJpbWFnZS5zb3VyY2VcIiAoY2xpY2spPVwib25JbWFnZUNsaWNrKCRldmVudCxpbWFnZSxpLGNvbnRlbnQpXCI+XG4gICAgICAgICAgICAgICAgPGltZyBbc3JjXT1cImltYWdlLnRodW1ibmFpbFwiIFt0aXRsZV09XCJpbWFnZS50aXRsZVwiIFthbHRdPVwiaW1hZ2UuYWx0XCI+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3BhbiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKm5nSWY9XCIodHlwZSA9PSAnY29udGVudCcpXCIgKGNsaWNrKT1cIm9uTGlua0NsaWNrKCRldmVudCxjb250ZW50KVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiYVwiPjwvbmctY29udGVudD5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidWktbGlnaHRib3ggdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktc2hhZG93XCIgW3N0eWxlLmRpc3BsYXldPVwidmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcIiBbc3R5bGUuekluZGV4XT1cInppbmRleFwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWxpZ2h0Ym94LWxvYWRpbmcnOiBsb2FkaW5nfVwiXG4gICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvblByb3BlcnR5XT1cIidhbGwnXCIgW3N0eWxlLnRyYW5zaXRpb25EdXJhdGlvbl09XCJlZmZlY3REdXJhdGlvblwiIFtzdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb25dPVwiZWFzaW5nXCIgKGNsaWNrKT1cInByZXZlbnREb2N1bWVudENsaWNrTGlzdGVuZXI9dHJ1ZVwiPlxuICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktbGlnaHRib3gtY29udGVudC13cmFwcGVyXCI+XG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwidWktc3RhdGUtZGVmYXVsdCB1aS1saWdodGJveC1uYXYtbGVmdCB1aS1jb3JuZXItcmlnaHRcIiBbc3R5bGUuekluZGV4XT1cInppbmRleCArIDFcIiAoY2xpY2spPVwicHJldihpbWcpXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWhlbHBlci1oaWRkZW4nOiFsZWZ0VmlzaWJsZX1cIj48c3BhbiBjbGFzcz1cInVpLWxpZ2h0Ym94LW5hdi1pY29uIHBpIHBpLWNoZXZyb24tbGVmdFwiPjwvc3Bhbj48L2E+XG4gICAgICAgICAgICAgIDxkaXYgI2NvbnRlbnQgY2xhc3M9XCJ1aS1saWdodGJveC1jb250ZW50IHVpLWNvcm5lci1hbGxcIiBcbiAgICAgICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvblByb3BlcnR5XT1cIid3aWR0aCxoZWlnaHQnXCIgW3N0eWxlLnRyYW5zaXRpb25EdXJhdGlvbl09XCJlZmZlY3REdXJhdGlvblwiIFtzdHlsZS50cmFuc2l0aW9uVGltaW5nRnVuY3Rpb25dPVwiZWFzaW5nXCI+XG4gICAgICAgICAgICAgICAgPGltZyAjaW1nIFtzcmNdPVwiY3VycmVudEltYWdlID8gY3VycmVudEltYWdlLnNvdXJjZXx8JycgOiAnJ1wiIChsb2FkKT1cIm9uSW1hZ2VMb2FkKCRldmVudCxjb250ZW50KVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJ1aS1zdGF0ZS1kZWZhdWx0IHVpLWxpZ2h0Ym94LW5hdi1yaWdodCB1aS1jb3JuZXItbGVmdCB1aS1oZWxwZXItaGlkZGVuXCIgW3N0eWxlLnpJbmRleF09XCJ6aW5kZXggKyAxXCIgKGNsaWNrKT1cIm5leHQoaW1nKVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1oZWxwZXItaGlkZGVuJzohcmlnaHRWaXNpYmxlfVwiPjxzcGFuIGNsYXNzPVwidWktbGlnaHRib3gtbmF2LWljb24gcGkgcGktY2hldnJvbi1yaWdodFwiPjwvc3Bhbj48L2E+XG4gICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktbGlnaHRib3gtY2FwdGlvbiB1aS13aWRnZXQtaGVhZGVyXCIgW3N0eWxlLmRpc3BsYXldPVwiY2FwdGlvblRleHQgPyAnYmxvY2snIDogJ25vbmUnXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbGlnaHRib3gtY2FwdGlvbi10ZXh0XCI+e3tjYXB0aW9uVGV4dH19PC9zcGFuPjxhIGNsYXNzPVwidWktbGlnaHRib3gtY2xvc2UgdWktY29ybmVyLWFsbFwiIHRhYmluZGV4PVwiMFwiIChjbGljayk9XCJoaWRlKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJoaWRlKCRldmVudClcIj48c3BhbiBjbGFzcz1cInBpIHBpLXRpbWVzXCI+PC9zcGFuPjwvYT5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImNsZWFyOmJvdGhcIj48L2Rpdj5cbiAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgTGlnaHRib3ggaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBpbWFnZXM6IGFueVtdO1xuICAgIFxuICAgIEBJbnB1dCgpIHR5cGU6IHN0cmluZyA9ICdpbWFnZSc7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgICAgICBcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgYXBwZW5kVG86IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBlYXNpbmc6ICdlYXNlLW91dCc7XG4gICAgXG4gICAgQElucHV0KCkgZWZmZWN0RHVyYXRpb246IGFueSA9ICc1MDBtcyc7XG5cbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuICAgICAgICAgICAgICAgIFxuICAgIEBJbnB1dCgpIGNsb3NlT25Fc2NhcGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgcHVibGljIHZpc2libGU6IGJvb2xlYW47XG4gICAgXG4gICAgcHVibGljIGxvYWRpbmc6IGJvb2xlYW47XG4gICAgICAgIFxuICAgIHB1YmxpYyBjdXJyZW50SW1hZ2U6IGFueTtcbiAgICBcbiAgICBwdWJsaWMgY2FwdGlvblRleHQ6IHN0cmluZztcbiAgICBcbiAgICBwdWJsaWMgemluZGV4OiBhbnk7XG4gICAgXG4gICAgcHVibGljIHBhbmVsOiBhbnk7XG4gICAgXG4gICAgcHVibGljIGluZGV4OiBudW1iZXI7XG4gICAgXG4gICAgcHVibGljIG1hc2s6IGFueTtcbiAgICBcbiAgICBwdWJsaWMgcHJldmVudERvY3VtZW50Q2xpY2tMaXN0ZW5lcjogYm9vbGVhbjtcbiAgICBcbiAgICBwdWJsaWMgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG5cbiAgICBwdWJsaWMgZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyMixwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cbiAgICAgICAgICAgICAgICBcbiAgICBvbkltYWdlQ2xpY2soZXZlbnQsaW1hZ2UsaSxjb250ZW50KSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICBjb250ZW50LnN0eWxlLndpZHRoID0gMzIgKyAncHgnO1xuICAgICAgICBjb250ZW50LnN0eWxlLmhlaWdodCA9IDMyICsgJ3B4JztcbiAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgIHRoaXMuZGlzcGxheUltYWdlKGltYWdlKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLnBhbmVsID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy51aS1saWdodGJveCAnKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5wYW5lbCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hcHBlbmRDaGlsZCh0aGlzLnBhbmVsLCB0aGlzLmFwcGVuZFRvKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbkxpbmtDbGljayhldmVudCxjb250ZW50KSB7XG4gICAgICAgIHRoaXMucHJldmVudERvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRydWU7XG4gICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBcbiAgICBkaXNwbGF5SW1hZ2UoaW1hZ2UpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgICAgIHRoaXMuY2FwdGlvblRleHQgPSBpbWFnZS50aXRsZTtcbiAgICAgICAgICAgIHRoaXMuY2VudGVyKCk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgICBcbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLm1hc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgXG4gICAgICAgIERvbUhhbmRsZXIuYWRkTXVsdGlwbGVDbGFzc2VzKHRoaXMubWFzaywgJ3VpLXdpZGdldC1vdmVybGF5IHVpLWRpYWxvZy1tYXNrJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tYXNrKTtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgdGhpcy56aW5kZXggPSB0aGlzLmJhc2VaSW5kZXggKyAoKytEb21IYW5kbGVyLnppbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXNrLnN0eWxlLnpJbmRleCA9IHRoaXMuemluZGV4IC0gMTtcbiAgICAgICAgdGhpcy5jZW50ZXIoKTtcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIFxuICAgIGhpZGUoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jYXB0aW9uVGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMuaW5kZXggPSBudWxsO1xuICAgICAgICB0aGlzLmN1cnJlbnRJbWFnZSA9IG51bGw7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMubWFzaykge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLm1hc2spO1xuICAgICAgICAgICAgdGhpcy5tYXNrID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy51bmJpbmRHbG9iYWxMaXN0ZW5lcnMoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgY2VudGVyKCkge1xuICAgICAgICBsZXQgZWxlbWVudFdpZHRoID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHRoaXMucGFuZWwpO1xuICAgICAgICBsZXQgZWxlbWVudEhlaWdodCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5wYW5lbCk7XG4gICAgICAgIGlmIChlbGVtZW50V2lkdGggPT0gMCAmJiBlbGVtZW50SGVpZ2h0ID09IDApIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIGVsZW1lbnRXaWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLnBhbmVsKTtcbiAgICAgICAgICAgIGVsZW1lbnRIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KHRoaXMucGFuZWwpO1xuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgfVxuICAgICAgICBcbiAgICBvbkltYWdlTG9hZChldmVudCxjb250ZW50KSB7XG4gICAgICAgIGxldCBpbWFnZSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaW1hZ2Uuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICBpbWFnZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgbGV0IGltYWdlV2lkdGggPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgoaW1hZ2UpO1xuICAgICAgICBsZXQgaW1hZ2VIZWlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KGltYWdlKTtcbiAgICAgICAgaW1hZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgaW1hZ2Uuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcblxuICAgICAgICBjb250ZW50LnN0eWxlLndpZHRoID0gaW1hZ2VXaWR0aCArICdweCc7XG4gICAgICAgIGNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gaW1hZ2VIZWlnaHQgKyAncHgnO1xuICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLmxlZnQgPSBwYXJzZUludCh0aGlzLnBhbmVsLnN0eWxlLmxlZnQpICsgKERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLnBhbmVsKSAtIGltYWdlV2lkdGgpIC8gMiArICdweCc7XG4gICAgICAgIHRoaXMucGFuZWwuc3R5bGUudG9wID0gcGFyc2VJbnQodGhpcy5wYW5lbC5zdHlsZS50b3ApICsgKERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5wYW5lbCkgLSBpbWFnZUhlaWdodCkgLyAyICsgJ3B4JztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmZhZGVJbihpbWFnZSwgNTAwKTtcbiAgICAgICAgICAgIGltYWdlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgLy90aGlzLmNhcHRpb25UZXh0ID0gdGhpcy5jdXJyZW50SW1hZ2UudGl0bGU7XG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSwgcGFyc2VJbnQodGhpcy5lZmZlY3REdXJhdGlvbikpO1xuICAgIH1cbiAgICBcbiAgICBwcmV2KHBsYWNlaG9sZGVyOiBhbnkpIHtcbiAgICAgICAgdGhpcy5jYXB0aW9uVGV4dCA9IG51bGw7XG4gICAgICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgICAgIHBsYWNlaG9sZGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5SW1hZ2UodGhpcy5pbWFnZXNbLS10aGlzLmluZGV4XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmV4dChwbGFjZWhvbGRlcjogYW55KSB7XG4gICAgICAgIHRoaXMuY2FwdGlvblRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlO1xuICAgICAgICBwbGFjZWhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBpZiAodGhpcy5pbmRleCA8PSAodGhpcy5pbWFnZXMubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUltYWdlKHRoaXMuaW1hZ2VzWysrdGhpcy5pbmRleF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZEdsb2JhbExpc3RlbmVycygpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wcmV2ZW50RG9jdW1lbnRDbGlja0xpc3RlbmVyJiZ0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcmV2ZW50RG9jdW1lbnRDbGlja0xpc3RlbmVyID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMuY2xvc2VPbkVzY2FwZSAmJiAhdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RXNjYXBlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMjcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KHRoaXMucGFuZWwuc3R5bGUuekluZGV4KSA9PT0gKERvbUhhbmRsZXIuemluZGV4ICsgdGhpcy5iYXNlWkluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kR2xvYmFsTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyKXtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRFc2NhcGVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudEVzY2FwZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAgICAgXG4gICAgZ2V0IGxlZnRWaXNpYmxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlcyAmJiB0aGlzLmltYWdlcy5sZW5ndGggJiYgdGhpcy5pbmRleCAhPSAwICYmICF0aGlzLmxvYWRpbmc7IFxuICAgIH1cbiAgICBcbiAgICBnZXQgcmlnaHRWaXNpYmxlKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmltYWdlcyAmJiB0aGlzLmltYWdlcy5sZW5ndGggJiYgdGhpcy5pbmRleCA8ICh0aGlzLmltYWdlcy5sZW5ndGggLSAxKSAmJiAhdGhpcy5sb2FkaW5nOyBcbiAgICB9XG4gICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kR2xvYmFsTGlzdGVuZXJzKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5hcHBlbmRUbykge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucGFuZWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgICAgICBcbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbTGlnaHRib3hdLFxuICAgIGRlY2xhcmF0aW9uczogW0xpZ2h0Ym94XVxufSlcbmV4cG9ydCBjbGFzcyBMaWdodGJveE1vZHVsZSB7IH1cbiJdfQ==