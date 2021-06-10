var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, OnInit, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const RATING_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Rating),
    multi: true
};
let Rating = class Rating {
    constructor(cd) {
        this.cd = cd;
        this.stars = 5;
        this.cancel = true;
        this.iconOnClass = 'pi pi-star';
        this.iconOffClass = 'pi pi-star-o';
        this.iconCancelClass = 'pi pi-ban';
        this.onRate = new EventEmitter();
        this.onCancel = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        this.starsArray = [];
        for (let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }
    rate(event, i) {
        if (!this.readonly && !this.disabled) {
            this.value = (i + 1);
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onRate.emit({
                originalEvent: event,
                value: (i + 1)
            });
        }
        event.preventDefault();
    }
    clear(event) {
        if (!this.readonly && !this.disabled) {
            this.value = null;
            this.onModelChange(this.value);
            this.onModelTouched();
            this.onCancel.emit(event);
        }
        event.preventDefault();
    }
    writeValue(value) {
        this.value = value;
        this.cd.detectChanges();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
    }
};
Rating.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], Rating.prototype, "disabled", void 0);
__decorate([
    Input()
], Rating.prototype, "readonly", void 0);
__decorate([
    Input()
], Rating.prototype, "stars", void 0);
__decorate([
    Input()
], Rating.prototype, "cancel", void 0);
__decorate([
    Input()
], Rating.prototype, "iconOnClass", void 0);
__decorate([
    Input()
], Rating.prototype, "iconOnStyle", void 0);
__decorate([
    Input()
], Rating.prototype, "iconOffClass", void 0);
__decorate([
    Input()
], Rating.prototype, "iconOffStyle", void 0);
__decorate([
    Input()
], Rating.prototype, "iconCancelClass", void 0);
__decorate([
    Input()
], Rating.prototype, "iconCancelStyle", void 0);
__decorate([
    Output()
], Rating.prototype, "onRate", void 0);
__decorate([
    Output()
], Rating.prototype, "onCancel", void 0);
Rating = __decorate([
    Component({
        selector: 'p-rating',
        template: `
        <div class="ui-rating" [ngClass]="{'ui-state-disabled': disabled}">
            <a [attr.tabindex]="disabled ? null : '0'" *ngIf="cancel" (click)="clear($event)" (keydown.enter)="clear($event)"  class="ui-rating-cancel">
                <span class="ui-rating-icon" [ngClass]="iconCancelClass" [ngStyle]="iconCancelStyle"></span>
            </a>
            <a [attr.tabindex]="disabled ? null : '0'" *ngFor="let star of starsArray;let i=index" (click)="rate($event,i)" (keydown.enter)="rate($event,i)">
                <span class="ui-rating-icon" 
                    [ngClass]="(!value || i >= value) ? iconOffClass : iconOnClass"
                    [ngStyle]="(!value || i >= value) ? iconOffStyle : iconOnStyle"
                ></span>
            </a>
        </div>
    `,
        providers: [RATING_VALUE_ACCESSOR]
    })
], Rating);
export { Rating };
let RatingModule = class RatingModule {
};
RatingModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Rating],
        declarations: [Rating]
    })
], RatingModule);
export { RatingModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9yYXRpbmcvIiwic291cmNlcyI6WyJyYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFVBQVUsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMvRyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUFRO0lBQ3hDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDckMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBbUJGLElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU07SUEwQmYsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFwQmhDLFVBQUssR0FBVyxDQUFDLENBQUM7UUFFbEIsV0FBTSxHQUFZLElBQUksQ0FBQztRQUV2QixnQkFBVyxHQUFXLFlBQVksQ0FBQztRQUluQyxpQkFBWSxHQUFXLGNBQWMsQ0FBQztRQUl0QyxvQkFBZSxHQUFXLFdBQVcsQ0FBQztRQUlyQyxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0MsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTTNELGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBTlEsQ0FBQztJQVU3QyxRQUFRO1FBQ0osSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFTO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDYixhQUFhLEVBQUUsS0FBSztnQkFDcEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQzthQUNmLENBQUMsQ0FBQztTQUNOO1FBQ0QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBSztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0I7UUFDRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQVk7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQVk7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGdCQUFnQixDQUFDLEdBQVk7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDeEIsQ0FBQztDQUNKLENBQUE7O1lBeEQyQixpQkFBaUI7O0FBeEJoQztJQUFSLEtBQUssRUFBRTt3Q0FBbUI7QUFFbEI7SUFBUixLQUFLLEVBQUU7d0NBQW1CO0FBRWxCO0lBQVIsS0FBSyxFQUFFO3FDQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTtzQ0FBd0I7QUFFdkI7SUFBUixLQUFLLEVBQUU7MkNBQW9DO0FBRW5DO0lBQVIsS0FBSyxFQUFFOzJDQUFrQjtBQUVqQjtJQUFSLEtBQUssRUFBRTs0Q0FBdUM7QUFFdEM7SUFBUixLQUFLLEVBQUU7NENBQW1CO0FBRWxCO0lBQVIsS0FBSyxFQUFFOytDQUF1QztBQUV0QztJQUFSLEtBQUssRUFBRTsrQ0FBc0I7QUFFcEI7SUFBVCxNQUFNLEVBQUU7c0NBQWdEO0FBRS9DO0lBQVQsTUFBTSxFQUFFO3dDQUFrRDtBQXhCbEQsTUFBTTtJQWpCbEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7S0FZVDtRQUNELFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO0tBQ3JDLENBQUM7R0FDVyxNQUFNLENBa0ZsQjtTQWxGWSxNQUFNO0FBeUZuQixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBQUksQ0FBQTtBQUFoQixZQUFZO0lBTHhCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDakIsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDO0tBQ3pCLENBQUM7R0FDVyxZQUFZLENBQUk7U0FBaEIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LE9uSW5pdCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLGZvcndhcmRSZWYsQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgUkFUSU5HX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBSYXRpbmcpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXJhdGluZycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInVpLXJhdGluZ1wiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIj5cbiAgICAgICAgICAgIDxhIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gbnVsbCA6ICcwJ1wiICpuZ0lmPVwiY2FuY2VsXCIgKGNsaWNrKT1cImNsZWFyKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJjbGVhcigkZXZlbnQpXCIgIGNsYXNzPVwidWktcmF0aW5nLWNhbmNlbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktcmF0aW5nLWljb25cIiBbbmdDbGFzc109XCJpY29uQ2FuY2VsQ2xhc3NcIiBbbmdTdHlsZV09XCJpY29uQ2FuY2VsU3R5bGVcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YSBbYXR0ci50YWJpbmRleF09XCJkaXNhYmxlZCA/IG51bGwgOiAnMCdcIiAqbmdGb3I9XCJsZXQgc3RhciBvZiBzdGFyc0FycmF5O2xldCBpPWluZGV4XCIgKGNsaWNrKT1cInJhdGUoJGV2ZW50LGkpXCIgKGtleWRvd24uZW50ZXIpPVwicmF0ZSgkZXZlbnQsaSlcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXJhdGluZy1pY29uXCIgXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIighdmFsdWUgfHwgaSA+PSB2YWx1ZSkgPyBpY29uT2ZmQ2xhc3MgOiBpY29uT25DbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cIighdmFsdWUgfHwgaSA+PSB2YWx1ZSkgPyBpY29uT2ZmU3R5bGUgOiBpY29uT25TdHlsZVwiXG4gICAgICAgICAgICAgICAgPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBwcm92aWRlcnM6IFtSQVRJTkdfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFJhdGluZyBpbXBsZW1lbnRzIE9uSW5pdCxDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHJlYWRvbmx5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc3RhcnM6IG51bWJlciA9IDU7XG5cbiAgICBASW5wdXQoKSBjYW5jZWw6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgaWNvbk9uQ2xhc3M6IHN0cmluZyA9ICdwaSBwaS1zdGFyJztcblxuICAgIEBJbnB1dCgpIGljb25PblN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpY29uT2ZmQ2xhc3M6IHN0cmluZyA9ICdwaSBwaS1zdGFyLW8nO1xuXG4gICAgQElucHV0KCkgaWNvbk9mZlN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpY29uQ2FuY2VsQ2xhc3M6IHN0cmluZyA9ICdwaSBwaS1iYW4nO1xuXG4gICAgQElucHV0KCkgaWNvbkNhbmNlbFN0eWxlOiBhbnk7XG5cbiAgICBAT3V0cHV0KCkgb25SYXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkNhbmNlbDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge30gXG4gICAgXG4gICAgdmFsdWU6IG51bWJlcjtcbiAgICBcbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIHB1YmxpYyBzdGFyc0FycmF5OiBudW1iZXJbXTtcbiAgICBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdGFyc0FycmF5ID0gW107XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXJzOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnNBcnJheVtpXSA9IGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmF0ZShldmVudCwgaTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5yZWFkb25seSYmIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSAoaSArIDEpO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5vblJhdGUuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgdmFsdWU6IChpKzEpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGNsZWFyKGV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5yZWFkb25seSYmIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgICAgICAgdGhpcy5vbkNhbmNlbC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuICAgIFxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtSYXRpbmddLFxuICAgIGRlY2xhcmF0aW9uczogW1JhdGluZ11cbn0pXG5leHBvcnQgY2xhc3MgUmF0aW5nTW9kdWxlIHsgfSJdfQ==