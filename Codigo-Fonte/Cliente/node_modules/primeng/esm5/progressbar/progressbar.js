var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
var ProgressBar = /** @class */ (function () {
    function ProgressBar() {
        this.showValue = true;
        this.unit = '%';
        this.mode = 'determinate';
    }
    __decorate([
        Input()
    ], ProgressBar.prototype, "value", void 0);
    __decorate([
        Input()
    ], ProgressBar.prototype, "showValue", void 0);
    __decorate([
        Input()
    ], ProgressBar.prototype, "style", void 0);
    __decorate([
        Input()
    ], ProgressBar.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], ProgressBar.prototype, "unit", void 0);
    __decorate([
        Input()
    ], ProgressBar.prototype, "mode", void 0);
    ProgressBar = __decorate([
        Component({
            selector: 'p-progressBar',
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" role=\"progressbar\" aria-valuemin=\"0\" [attr.aria-valuenow]=\"value\" aria-valuemax=\"100\"\n            [ngClass]=\"{'ui-progressbar ui-widget ui-widget-content ui-corner-all': true, 'ui-progressbar-determinate': (mode === 'determinate'), 'ui-progressbar-indeterminate': (mode === 'indeterminate')}\">\n            <div class=\"ui-progressbar-value ui-progressbar-value-animate ui-widget-header ui-corner-all\" [style.width]=\"value + '%'\" style=\"display:block\"></div>\n            <div class=\"ui-progressbar-label\" [style.display]=\"value != null ? 'block' : 'none'\" *ngIf=\"showValue\">{{value}}{{unit}}</div>\n        </div>\n    "
        })
    ], ProgressBar);
    return ProgressBar;
}());
export { ProgressBar };
var ProgressBarModule = /** @class */ (function () {
    function ProgressBarModule() {
    }
    ProgressBarModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [ProgressBar],
            declarations: [ProgressBar]
        })
    ], ProgressBarModule);
    return ProgressBarModule;
}());
export { ProgressBarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3Byb2dyZXNzYmFyLyIsInNvdXJjZXMiOlsicHJvZ3Jlc3NiYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQVk3QztJQUFBO1FBSWEsY0FBUyxHQUFZLElBQUksQ0FBQztRQU0xQixTQUFJLEdBQVcsR0FBRyxDQUFDO1FBRW5CLFNBQUksR0FBVyxhQUFhLENBQUM7SUFFMUMsQ0FBQztJQVpZO1FBQVIsS0FBSyxFQUFFOzhDQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7a0RBQTJCO0lBRTFCO1FBQVIsS0FBSyxFQUFFOzhDQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7bURBQW9CO0lBRW5CO1FBQVIsS0FBSyxFQUFFOzZDQUFvQjtJQUVuQjtRQUFSLEtBQUssRUFBRTs2Q0FBOEI7SUFaN0IsV0FBVztRQVZ2QixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZUFBZTtZQUN6QixRQUFRLEVBQUUsOHJCQU1UO1NBQ0osQ0FBQztPQUNXLFdBQVcsQ0FjdkI7SUFBRCxrQkFBQztDQUFBLEFBZEQsSUFjQztTQWRZLFdBQVc7QUFxQnhCO0lBQUE7SUFBaUMsQ0FBQztJQUFyQixpQkFBaUI7UUFMN0IsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUN0QixZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUM7U0FDOUIsQ0FBQztPQUNXLGlCQUFpQixDQUFJO0lBQUQsd0JBQUM7Q0FBQSxBQUFsQyxJQUFrQztTQUFyQixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXByb2dyZXNzQmFyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW25nU3R5bGVdPVwic3R5bGVcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBhcmlhLXZhbHVlbWluPVwiMFwiIFthdHRyLmFyaWEtdmFsdWVub3ddPVwidmFsdWVcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktcHJvZ3Jlc3NiYXIgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOiB0cnVlLCAndWktcHJvZ3Jlc3NiYXItZGV0ZXJtaW5hdGUnOiAobW9kZSA9PT0gJ2RldGVybWluYXRlJyksICd1aS1wcm9ncmVzc2Jhci1pbmRldGVybWluYXRlJzogKG1vZGUgPT09ICdpbmRldGVybWluYXRlJyl9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcHJvZ3Jlc3NiYXItdmFsdWUgdWktcHJvZ3Jlc3NiYXItdmFsdWUtYW5pbWF0ZSB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci1hbGxcIiBbc3R5bGUud2lkdGhdPVwidmFsdWUgKyAnJSdcIiBzdHlsZT1cImRpc3BsYXk6YmxvY2tcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wcm9ncmVzc2Jhci1sYWJlbFwiIFtzdHlsZS5kaXNwbGF5XT1cInZhbHVlICE9IG51bGwgPyAnYmxvY2snIDogJ25vbmUnXCIgKm5nSWY9XCJzaG93VmFsdWVcIj57e3ZhbHVlfX17e3VuaXR9fTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIHtcblxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgc2hvd1ZhbHVlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHVuaXQ6IHN0cmluZyA9ICclJztcbiAgICBcbiAgICBASW5wdXQoKSBtb2RlOiBzdHJpbmcgPSAnZGV0ZXJtaW5hdGUnO1xuICAgIFxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtQcm9ncmVzc0Jhcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbUHJvZ3Jlc3NCYXJdXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyTW9kdWxlIHsgfSJdfQ==