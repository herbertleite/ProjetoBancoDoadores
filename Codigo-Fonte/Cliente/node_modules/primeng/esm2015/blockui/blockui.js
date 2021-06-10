var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
let BlockUI = class BlockUI {
    constructor(el) {
        this.el = el;
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    get blocked() {
        return this._blocked;
    }
    set blocked(val) {
        this._blocked = val;
        if (this.mask && this.mask.nativeElement) {
            if (this._blocked)
                this.block();
            else
                this.unblock();
        }
    }
    ngAfterViewInit() {
        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    }
    block() {
        if (this.target) {
            this.target.getBlockableElement().appendChild(this.mask.nativeElement);
            let style = this.target.style || {};
            style.position = 'relative';
            this.target.style = style;
        }
        else {
            document.body.appendChild(this.mask.nativeElement);
        }
        if (this.autoZIndex) {
            this.mask.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }
    unblock() {
        this.el.nativeElement.appendChild(this.mask.nativeElement);
    }
    ngOnDestroy() {
        this.unblock();
    }
};
BlockUI.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], BlockUI.prototype, "target", void 0);
__decorate([
    Input()
], BlockUI.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], BlockUI.prototype, "baseZIndex", void 0);
__decorate([
    ViewChild('mask', { static: true })
], BlockUI.prototype, "mask", void 0);
__decorate([
    Input()
], BlockUI.prototype, "blocked", null);
BlockUI = __decorate([
    Component({
        selector: 'p-blockUI',
        template: `
        <div #mask class="ui-blockui ui-widget-overlay" [ngClass]="{'ui-blockui-document':!target}" [ngStyle]="{display: blocked ? 'block' : 'none'}">
            <ng-content></ng-content>
        </div>
    `
    })
], BlockUI);
export { BlockUI };
let BlockUIModule = class BlockUIModule {
};
BlockUIModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [BlockUI],
        declarations: [BlockUI]
    })
], BlockUIModule);
export { BlockUIModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2t1aS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvYmxvY2t1aS8iLCJzb3VyY2VzIjpbImJsb2NrdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQVV2QyxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBWWhCLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBUnhCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztJQU1JLENBQUM7SUFFNUIsSUFBSSxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsR0FBWTtRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUVwQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEMsSUFBSSxJQUFJLENBQUMsUUFBUTtnQkFDYixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7O2dCQUViLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRTtZQUNqRCxNQUFNLHdEQUF3RCxDQUFDO1NBQ2xFO0lBQ0wsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUUsRUFBRSxDQUFDO1lBQ2xDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUM3QjthQUNJO1lBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUMxRjtJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztDQUNKLENBQUE7O1lBOUMwQixVQUFVOztBQVZ4QjtJQUFSLEtBQUssRUFBRTt1Q0FBYTtBQUVaO0lBQVIsS0FBSyxFQUFFOzJDQUE0QjtBQUUzQjtJQUFSLEtBQUssRUFBRTsyQ0FBd0I7QUFFSztJQUFwQyxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO3FDQUFrQjtBQU03QztJQUFSLEtBQUssRUFBRTtzQ0FFUDtBQWhCUSxPQUFPO0lBUm5CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRTs7OztLQUlUO0tBQ0osQ0FBQztHQUNXLE9BQU8sQ0EwRG5CO1NBMURZLE9BQU87QUFpRXBCLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7Q0FBSSxDQUFBO0FBQWpCLGFBQWE7SUFMekIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztRQUNsQixZQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUM7S0FDMUIsQ0FBQztHQUNXLGFBQWEsQ0FBSTtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3ksRWxlbWVudFJlZixWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWJsb2NrVUknLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI21hc2sgY2xhc3M9XCJ1aS1ibG9ja3VpIHVpLXdpZGdldC1vdmVybGF5XCIgW25nQ2xhc3NdPVwieyd1aS1ibG9ja3VpLWRvY3VtZW50JzohdGFyZ2V0fVwiIFtuZ1N0eWxlXT1cIntkaXNwbGF5OiBibG9ja2VkID8gJ2Jsb2NrJyA6ICdub25lJ31cIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBCbG9ja1VJIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgdGFyZ2V0OiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG4gICAgXG4gICAgQElucHV0KCkgYmFzZVpJbmRleDogbnVtYmVyID0gMDtcbiAgICBcbiAgICBAVmlld0NoaWxkKCdtYXNrJywgeyBzdGF0aWM6IHRydWUgfSkgbWFzazogRWxlbWVudFJlZjtcbiAgICBcbiAgICBfYmxvY2tlZDogYm9vbGVhbjtcbiAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuICAgIFxuICAgIEBJbnB1dCgpIGdldCBibG9ja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYmxvY2tlZDtcbiAgICB9XG4gICAgXG4gICAgc2V0IGJsb2NrZWQodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Jsb2NrZWQgPSB2YWw7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5tYXNrICYmIHRoaXMubWFzay5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fYmxvY2tlZClcbiAgICAgICAgICAgICAgICB0aGlzLmJsb2NrKCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQgJiYgIXRoaXMudGFyZ2V0LmdldEJsb2NrYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRocm93ICdUYXJnZXQgb2YgQmxvY2tVSSBtdXN0IGltcGxlbWVudCBCbG9ja2FibGVVSSBpbnRlcmZhY2UnO1xuICAgICAgICB9XG4gICAgfVxuICAgICAgICBcbiAgICBibG9jaygpIHtcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5nZXRCbG9ja2FibGVFbGVtZW50KCkuYXBwZW5kQ2hpbGQodGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgbGV0IHN0eWxlID0gdGhpcy50YXJnZXQuc3R5bGV8fHt9O1xuICAgICAgICAgICAgc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLm1hc2submF0aXZlRWxlbWVudC5zdHlsZS56SW5kZXggPSBTdHJpbmcodGhpcy5iYXNlWkluZGV4ICsgKCsrRG9tSGFuZGxlci56aW5kZXgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1bmJsb2NrKCkge1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJsb2NrKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtCbG9ja1VJXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtCbG9ja1VJXVxufSlcbmV4cG9ydCBjbGFzcyBCbG9ja1VJTW9kdWxlIHsgfSJdfQ==