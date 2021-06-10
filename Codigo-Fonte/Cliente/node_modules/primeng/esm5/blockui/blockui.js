var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
var BlockUI = /** @class */ (function () {
    function BlockUI(el) {
        this.el = el;
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    Object.defineProperty(BlockUI.prototype, "blocked", {
        get: function () {
            return this._blocked;
        },
        set: function (val) {
            this._blocked = val;
            if (this.mask && this.mask.nativeElement) {
                if (this._blocked)
                    this.block();
                else
                    this.unblock();
            }
        },
        enumerable: true,
        configurable: true
    });
    BlockUI.prototype.ngAfterViewInit = function () {
        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    };
    BlockUI.prototype.block = function () {
        if (this.target) {
            this.target.getBlockableElement().appendChild(this.mask.nativeElement);
            var style = this.target.style || {};
            style.position = 'relative';
            this.target.style = style;
        }
        else {
            document.body.appendChild(this.mask.nativeElement);
        }
        if (this.autoZIndex) {
            this.mask.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    };
    BlockUI.prototype.unblock = function () {
        this.el.nativeElement.appendChild(this.mask.nativeElement);
    };
    BlockUI.prototype.ngOnDestroy = function () {
        this.unblock();
    };
    BlockUI.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
            template: "\n        <div #mask class=\"ui-blockui ui-widget-overlay\" [ngClass]=\"{'ui-blockui-document':!target}\" [ngStyle]=\"{display: blocked ? 'block' : 'none'}\">\n            <ng-content></ng-content>\n        </div>\n    "
        })
    ], BlockUI);
    return BlockUI;
}());
export { BlockUI };
var BlockUIModule = /** @class */ (function () {
    function BlockUIModule() {
    }
    BlockUIModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [BlockUI],
            declarations: [BlockUI]
        })
    ], BlockUIModule);
    return BlockUIModule;
}());
export { BlockUIModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2t1aS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvYmxvY2t1aS8iLCJzb3VyY2VzIjpbImJsb2NrdWkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQVV2QztJQVlJLGlCQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQVJ4QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7SUFNSSxDQUFDO0lBRTVCLHNCQUFJLDRCQUFPO2FBQVg7WUFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQVksR0FBWTtZQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUVwQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RDLElBQUksSUFBSSxDQUFDLFFBQVE7b0JBQ2IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOztvQkFFYixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdEI7UUFDTCxDQUFDOzs7T0FYQTtJQWFELGlDQUFlLEdBQWY7UUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFO1lBQ2pELE1BQU0sd0RBQXdELENBQUM7U0FDbEU7SUFDTCxDQUFDO0lBRUQsdUJBQUssR0FBTDtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN2RSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBRSxFQUFFLENBQUM7WUFDbEMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQzdCO2FBQ0k7WUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzFGO0lBQ0wsQ0FBQztJQUVELHlCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsNkJBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDOztnQkE3Q3NCLFVBQVU7O0lBVnhCO1FBQVIsS0FBSyxFQUFFOzJDQUFhO0lBRVo7UUFBUixLQUFLLEVBQUU7K0NBQTRCO0lBRTNCO1FBQVIsS0FBSyxFQUFFOytDQUF3QjtJQUVLO1FBQXBDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7eUNBQWtCO0lBTTdDO1FBQVIsS0FBSyxFQUFFOzBDQUVQO0lBaEJRLE9BQU87UUFSbkIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLDZOQUlUO1NBQ0osQ0FBQztPQUNXLE9BQU8sQ0EwRG5CO0lBQUQsY0FBQztDQUFBLEFBMURELElBMERDO1NBMURZLE9BQU87QUFpRXBCO0lBQUE7SUFBNkIsQ0FBQztJQUFqQixhQUFhO1FBTHpCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQzFCLENBQUM7T0FDVyxhQUFhLENBQUk7SUFBRCxvQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxBZnRlclZpZXdJbml0LE9uRGVzdHJveSxFbGVtZW50UmVmLFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtYmxvY2tVSScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiAjbWFzayBjbGFzcz1cInVpLWJsb2NrdWkgdWktd2lkZ2V0LW92ZXJsYXlcIiBbbmdDbGFzc109XCJ7J3VpLWJsb2NrdWktZG9jdW1lbnQnOiF0YXJnZXR9XCIgW25nU3R5bGVdPVwie2Rpc3BsYXk6IGJsb2NrZWQgPyAnYmxvY2snIDogJ25vbmUnfVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIEJsb2NrVUkgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSB0YXJnZXQ6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuICAgIFxuICAgIEBWaWV3Q2hpbGQoJ21hc2snLCB7IHN0YXRpYzogdHJ1ZSB9KSBtYXNrOiBFbGVtZW50UmVmO1xuICAgIFxuICAgIF9ibG9ja2VkOiBib29sZWFuO1xuICAgICAgICBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG4gICAgXG4gICAgQElucHV0KCkgZ2V0IGJsb2NrZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ibG9ja2VkO1xuICAgIH1cbiAgICBcbiAgICBzZXQgYmxvY2tlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fYmxvY2tlZCA9IHZhbDtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLm1hc2sgJiYgdGhpcy5tYXNrLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9ibG9ja2VkKVxuICAgICAgICAgICAgICAgIHRoaXMuYmxvY2soKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldCAmJiAhdGhpcy50YXJnZXQuZ2V0QmxvY2thYmxlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhyb3cgJ1RhcmdldCBvZiBCbG9ja1VJIG11c3QgaW1wbGVtZW50IEJsb2NrYWJsZVVJIGludGVyZmFjZSc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIGJsb2NrKCkge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmdldEJsb2NrYWJsZUVsZW1lbnQoKS5hcHBlbmRDaGlsZCh0aGlzLm1hc2submF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgc3R5bGUgPSB0aGlzLnRhcmdldC5zdHlsZXx8e307XG4gICAgICAgICAgICBzdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5zdHlsZSA9IHN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1hc2submF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmF1dG9aSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMubWFzay5uYXRpdmVFbGVtZW50LnN0eWxlLnpJbmRleCA9IFN0cmluZyh0aGlzLmJhc2VaSW5kZXggKyAoKytEb21IYW5kbGVyLnppbmRleCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVuYmxvY2soKSB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLm1hc2submF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmxvY2soKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0Jsb2NrVUldLFxuICAgIGRlY2xhcmF0aW9uczogW0Jsb2NrVUldXG59KVxuZXhwb3J0IGNsYXNzIEJsb2NrVUlNb2R1bGUgeyB9Il19