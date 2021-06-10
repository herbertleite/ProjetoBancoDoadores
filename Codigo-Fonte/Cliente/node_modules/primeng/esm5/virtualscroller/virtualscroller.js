var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { NgModule, Component, ElementRef, AfterContentInit, Input, Output, ViewChild, EventEmitter, ContentChild, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { ScrollingModule } from '@angular/cdk/scrolling';
var VirtualScroller = /** @class */ (function () {
    function VirtualScroller(el) {
        this.el = el;
        this.cache = true;
        this.first = 0;
        this.trackBy = function (index, item) { return item; };
        this.onLazyLoad = new EventEmitter();
        this._totalRecords = 0;
        this.lazyValue = [];
        this.page = 0;
    }
    Object.defineProperty(VirtualScroller.prototype, "totalRecords", {
        get: function () {
            return this._totalRecords;
        },
        set: function (val) {
            this._totalRecords = val;
            this.lazyValue = Array.from({ length: this._totalRecords });
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
            this.first = 0;
            this.scrollTo(0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScroller.prototype, "value", {
        get: function () {
            return this.lazy ? this.lazyValue : this._value;
        },
        set: function (val) {
            if (this.lazy) {
                if (val) {
                    var arr = this.cache ? __spread(this.lazyValue) : Array.from({ length: this._totalRecords });
                    for (var i = this.first, j = 0; i < (this.first + this.rows); i++, j++) {
                        arr[i] = val[j];
                    }
                    this.lazyValue = arr;
                }
            }
            else {
                this._value = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    VirtualScroller.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'item':
                    _this.itemTemplate = item.template;
                    break;
                case 'loadingItem':
                    _this.loadingItemTemplate = item.template;
                    break;
                default:
                    _this.itemTemplate = item.template;
                    break;
            }
        });
    };
    VirtualScroller.prototype.onScrollIndexChange = function (index) {
        var p = Math.floor(index / this.rows);
        if (p !== this.page) {
            this.page = p;
            this.first = this.page * this.rows;
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
    };
    VirtualScroller.prototype.createLazyLoadMetadata = function () {
        return {
            first: this.first,
            rows: this.rows
        };
    };
    VirtualScroller.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    VirtualScroller.prototype.scrollTo = function (index) {
        if (this.viewPortViewChild && this.viewPortViewChild['elementRef'] && this.viewPortViewChild['elementRef'].nativeElement) {
            this.viewPortViewChild['elementRef'].nativeElement.scrollTop = index * this.itemSize;
        }
    };
    VirtualScroller.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], VirtualScroller.prototype, "itemSize", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "style", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "scrollHeight", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "lazy", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "cache", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "rows", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "first", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "trackBy", void 0);
    __decorate([
        ContentChild(Header, { static: true })
    ], VirtualScroller.prototype, "header", void 0);
    __decorate([
        ContentChild(Footer, { static: true })
    ], VirtualScroller.prototype, "footer", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], VirtualScroller.prototype, "templates", void 0);
    __decorate([
        ViewChild('viewport', { static: true })
    ], VirtualScroller.prototype, "viewPortViewChild", void 0);
    __decorate([
        Output()
    ], VirtualScroller.prototype, "onLazyLoad", void 0);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "totalRecords", null);
    __decorate([
        Input()
    ], VirtualScroller.prototype, "value", null);
    VirtualScroller = __decorate([
        Component({
            selector: 'p-virtualScroller',
            template: "\n        <div [ngClass]=\"'ui-virtualscroller ui-widget'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-virtualscroller-header ui-widget-header ui-corner-top\" *ngIf=\"header\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <div #content class=\"ui-virtualscroller-content ui-widget-content\">\n                <ul class=\"ui-virtualscroller-list\">\n                    <cdk-virtual-scroll-viewport #viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" (scrolledIndexChange)=\"onScrollIndexChange($event)\">\n                        <ng-container *cdkVirtualFor=\"let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd; \">\n                            <li [ngStyle]=\"{'height': itemSize + 'px'}\">\n                                <ng-container *ngTemplateOutlet=\"item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}\"></ng-container>\n                            </li>\n                        </ng-container>\n                    </cdk-virtual-scroll-viewport>\n                </ul>\n            </div>\n            <div class=\"ui-virtualscroller-footer ui-widget-header ui-corner-bottom\" *ngIf=\"footer\">\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </div>\n    "
        })
    ], VirtualScroller);
    return VirtualScroller;
}());
export { VirtualScroller };
var VirtualScrollerModule = /** @class */ (function () {
    function VirtualScrollerModule() {
    }
    VirtualScrollerModule = __decorate([
        NgModule({
            imports: [CommonModule, ScrollingModule],
            exports: [VirtualScroller, SharedModule, ScrollingModule],
            declarations: [VirtualScroller]
        })
    ], VirtualScrollerModule);
    return VirtualScrollerModule;
}());
export { VirtualScrollerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbHNjcm9sbGVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy92aXJ0dWFsc2Nyb2xsZXIvIiwic291cmNlcyI6WyJ2aXJ0dWFsc2Nyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsZ0JBQWdCLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxlQUFlLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNwSyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUEyQnZEO0lBMENJLHlCQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQTlCeEIsVUFBSyxHQUFZLElBQUksQ0FBQztRQUl0QixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBRWxCLFlBQU8sR0FBYSxVQUFDLEtBQWEsRUFBRSxJQUFTLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO1FBVXRELGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU03RCxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUkxQixjQUFTLEdBQVUsRUFBRSxDQUFDO1FBRXRCLFNBQUksR0FBVyxDQUFDLENBQUM7SUFFbUIsQ0FBQztJQUU1QixzQkFBSSx5Q0FBWTthQUFoQjtZQUNMLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDO2FBQ0QsVUFBaUIsR0FBVztZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztZQUN6QixJQUFJ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QzdCLFFBQVEsRUFBQyxvN0NBb0JSO1NBQ0osQ0FBQztPQUNXLGVBQWUsQ0FxSDNCO0lBQUQsc0JBQUM7Q0FBQSxBQXJIRCxJQXFIQztTQXJIWSxlQUFlO0FBNEg1QjtJQUFBO0lBQXFDLENBQUM7SUFBekIscUJBQXFCO1FBTGpDLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxlQUFlLENBQUM7WUFDdkMsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFDLFlBQVksRUFBQyxlQUFlLENBQUM7WUFDdkQsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO1NBQ2xDLENBQUM7T0FDVyxxQkFBcUIsQ0FBSTtJQUFELDRCQUFDO0NBQUEsQUFBdEMsSUFBc0M7U0FBekIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsRWxlbWVudFJlZixBZnRlckNvbnRlbnRJbml0LElucHV0LE91dHB1dCxWaWV3Q2hpbGQsRXZlbnRFbWl0dGVyLENvbnRlbnRDaGlsZCxDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFRlbXBsYXRlUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtIZWFkZXIsRm9vdGVyLFByaW1lVGVtcGxhdGUsU2hhcmVkTW9kdWxlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1Njcm9sbGluZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQge0Jsb2NrYWJsZVVJfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC12aXJ0dWFsU2Nyb2xsZXInLFxuICAgIHRlbXBsYXRlOmBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktdmlydHVhbHNjcm9sbGVyIHVpLXdpZGdldCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdmlydHVhbHNjcm9sbGVyLWhlYWRlciB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci10b3BcIiAqbmdJZj1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICNjb250ZW50IGNsYXNzPVwidWktdmlydHVhbHNjcm9sbGVyLWNvbnRlbnQgdWktd2lkZ2V0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJ1aS12aXJ0dWFsc2Nyb2xsZXItbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICA8Y2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0ICN2aWV3cG9ydCBbbmdTdHlsZV09XCJ7J2hlaWdodCc6IHNjcm9sbEhlaWdodH1cIiBbaXRlbVNpemVdPVwiaXRlbVNpemVcIiAoc2Nyb2xsZWRJbmRleENoYW5nZSk9XCJvblNjcm9sbEluZGV4Q2hhbmdlKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKmNka1ZpcnR1YWxGb3I9XCJsZXQgaXRlbSBvZiB2YWx1ZTsgdHJhY2tCeTogdHJhY2tCeTsgbGV0IGkgPSBpbmRleDsgbGV0IGMgPSBjb3VudDsgbGV0IGYgPSBmaXJzdDsgbGV0IGwgPSBsYXN0OyBsZXQgZSA9IGV2ZW47IGxldCBvID0gb2RkOyBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgW25nU3R5bGVdPVwieydoZWlnaHQnOiBpdGVtU2l6ZSArICdweCd9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtID8gaXRlbVRlbXBsYXRlIDogbG9hZGluZ0l0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogaXRlbSwgaW5kZXg6IGksIGNvdW50OiBjLCBmaXJzdDogZiwgbGFzdDogbCwgZXZlbjogZSwgb2RkOiBvfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQ+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXZpcnR1YWxzY3JvbGxlci1mb290ZXIgdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItYm90dG9tXCIgKm5nSWY9XCJmb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWZvb3RlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFZpcnR1YWxTY3JvbGxlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsQmxvY2thYmxlVUkge1xuXG4gICAgQElucHV0KCkgaXRlbVNpemU6IG51bWJlcjsgXG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHNjcm9sbEhlaWdodDogYW55O1xuXG4gICAgQElucHV0KCkgbGF6eTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGNhY2hlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHJvd3M6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGZpcnN0OiBudW1iZXIgPSAwO1xuICAgIFxuICAgIEBJbnB1dCgpIHRyYWNrQnk6IEZ1bmN0aW9uID0gKGluZGV4OiBudW1iZXIsIGl0ZW06IGFueSkgPT4gaXRlbTtcbiAgICAgICAgICAgICAgICBcbiAgICBAQ29udGVudENoaWxkKEhlYWRlciwgeyBzdGF0aWM6IHRydWUgfSkgaGVhZGVyO1xuXG4gICAgQENvbnRlbnRDaGlsZChGb290ZXIsIHsgc3RhdGljOiB0cnVlfSkgZm9vdGVyO1xuICAgIFxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcblxuICAgIEBWaWV3Q2hpbGQoJ3ZpZXdwb3J0JywgeyBzdGF0aWM6IHRydWUgfSkgdmlld1BvcnRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAT3V0cHV0KCkgb25MYXp5TG9hZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICBsb2FkaW5nSXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgX3RvdGFsUmVjb3JkczogbnVtYmVyID0gMDtcblxuICAgIF92YWx1ZTogYW55W107XG5cbiAgICBsYXp5VmFsdWU6IGFueVtdID0gW107XG5cbiAgICBwYWdlOiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgQElucHV0KCkgZ2V0IHRvdGFsUmVjb3JkcygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG90YWxSZWNvcmRzO1xuICAgIH1cbiAgICBzZXQgdG90YWxSZWNvcmRzKHZhbDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3RvdGFsUmVjb3JkcyA9IHZhbDtcbiAgICAgICAgdGhpcy5sYXp5VmFsdWUgPSBBcnJheS5mcm9tKHtsZW5ndGg6IHRoaXMuX3RvdGFsUmVjb3Jkc30pO1xuICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgIHRoaXMuZmlyc3QgPSAwO1xuICAgICAgICB0aGlzLnNjcm9sbFRvKDApO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCB2YWx1ZSgpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhenkgPyB0aGlzLmxhenlWYWx1ZSA6IHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsOiBhbnlbXSkge1xuICAgICAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMuY2FjaGUgPyBbLi4udGhpcy5sYXp5VmFsdWVdIDogQXJyYXkuZnJvbSh7bGVuZ3RoOiB0aGlzLl90b3RhbFJlY29yZHN9KTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5maXJzdCwgaiA9IDA7IGkgPCAodGhpcy5maXJzdCArIHRoaXMucm93cyk7IGkrKywgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycltpXSA9IHZhbFtqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sYXp5VmFsdWUgPSBhcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xvYWRpbmdJdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nSXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uU2Nyb2xsSW5kZXhDaGFuZ2UoaW5kZXg6IG51bWJlcikge1xuICAgICAgICBsZXQgcCA9IE1hdGguZmxvb3IoaW5kZXggLyB0aGlzLnJvd3MpO1xuICAgICAgICBpZiAocCAhPT0gdGhpcy5wYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2UgPSBwO1xuICAgICAgICAgICAgdGhpcy5maXJzdCA9IHRoaXMucGFnZSAqIHRoaXMucm93cztcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudMKge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIHNjcm9sbFRvKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudmlld1BvcnRWaWV3Q2hpbGQgJiYgdGhpcy52aWV3UG9ydFZpZXdDaGlsZFsnZWxlbWVudFJlZiddICYmIHRoaXMudmlld1BvcnRWaWV3Q2hpbGRbJ2VsZW1lbnRSZWYnXS5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdQb3J0Vmlld0NoaWxkWydlbGVtZW50UmVmJ10ubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBpbmRleCAqIHRoaXMuaXRlbVNpemU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxTY3JvbGxpbmdNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtWaXJ0dWFsU2Nyb2xsZXIsU2hhcmVkTW9kdWxlLFNjcm9sbGluZ01vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbVmlydHVhbFNjcm9sbGVyXVxufSlcbmV4cG9ydCBjbGFzcyBWaXJ0dWFsU2Nyb2xsZXJNb2R1bGUgeyB9XG5cbiJdfQ==