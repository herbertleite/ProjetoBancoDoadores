var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, OnDestroy, AfterViewInit, ElementRef, HostListener, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
var Draggable = /** @class */ (function () {
    function Draggable(el, zone) {
        this.el = el;
        this.zone = zone;
        this.onDragStart = new EventEmitter();
        this.onDragEnd = new EventEmitter();
        this.onDrag = new EventEmitter();
    }
    Object.defineProperty(Draggable.prototype, "pDraggableDisabled", {
        get: function () {
            return this._pDraggableDisabled;
        },
        set: function (_pDraggableDisabled) {
            this._pDraggableDisabled = _pDraggableDisabled;
            if (this._pDraggableDisabled) {
                this.unbindMouseListeners();
            }
            else {
                this.el.nativeElement.draggable = true;
                this.bindMouseListeners();
            }
        },
        enumerable: true,
        configurable: true
    });
    Draggable.prototype.ngAfterViewInit = function () {
        if (!this.pDraggableDisabled) {
            this.el.nativeElement.draggable = true;
            this.bindMouseListeners();
        }
    };
    Draggable.prototype.bindDragListener = function () {
        var _this = this;
        if (!this.dragListener) {
            this.zone.runOutsideAngular(function () {
                _this.dragListener = _this.drag.bind(_this);
                _this.el.nativeElement.addEventListener('drag', _this.dragListener);
            });
        }
    };
    Draggable.prototype.unbindDragListener = function () {
        var _this = this;
        if (this.dragListener) {
            this.zone.runOutsideAngular(function () {
                _this.el.nativeElement.removeEventListener('drag', _this.dragListener);
                _this.dragListener = null;
            });
        }
    };
    Draggable.prototype.bindMouseListeners = function () {
        var _this = this;
        if (!this.mouseDownListener && !this.mouseUpListener) {
            this.zone.runOutsideAngular(function () {
                _this.mouseDownListener = _this.mousedown.bind(_this);
                _this.mouseUpListener = _this.mouseup.bind(_this);
                _this.el.nativeElement.addEventListener('mousedown', _this.mouseDownListener);
                _this.el.nativeElement.addEventListener('mouseup', _this.mouseUpListener);
            });
        }
    };
    Draggable.prototype.unbindMouseListeners = function () {
        var _this = this;
        if (this.mouseDownListener && this.mouseUpListener) {
            this.zone.runOutsideAngular(function () {
                _this.el.nativeElement.removeEventListener('mousedown', _this.mouseDownListener);
                _this.el.nativeElement.removeEventListener('mouseup', _this.mouseUpListener);
                _this.mouseDownListener = null;
                _this.mouseUpListener = null;
            });
        }
    };
    Draggable.prototype.drag = function (event) {
        this.onDrag.emit(event);
    };
    Draggable.prototype.dragStart = function (event) {
        if (this.allowDrag() && !this.pDraggableDisabled) {
            if (this.dragEffect) {
                event.dataTransfer.effectAllowed = this.dragEffect;
            }
            event.dataTransfer.setData('text', this.scope);
            this.onDragStart.emit(event);
            this.bindDragListener();
        }
        else {
            event.preventDefault();
        }
    };
    Draggable.prototype.dragEnd = function (event) {
        this.onDragEnd.emit(event);
        this.unbindDragListener();
    };
    Draggable.prototype.mousedown = function (event) {
        this.handle = event.target;
    };
    Draggable.prototype.mouseup = function (event) {
        this.handle = null;
    };
    Draggable.prototype.allowDrag = function () {
        if (this.dragHandle && this.handle)
            return DomHandler.matches(this.handle, this.dragHandle);
        else
            return true;
    };
    Draggable.prototype.ngOnDestroy = function () {
        this.unbindDragListener();
        this.unbindMouseListeners();
    };
    Draggable.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input('pDraggable')
    ], Draggable.prototype, "scope", void 0);
    __decorate([
        Input()
    ], Draggable.prototype, "dragEffect", void 0);
    __decorate([
        Input()
    ], Draggable.prototype, "dragHandle", void 0);
    __decorate([
        Output()
    ], Draggable.prototype, "onDragStart", void 0);
    __decorate([
        Output()
    ], Draggable.prototype, "onDragEnd", void 0);
    __decorate([
        Output()
    ], Draggable.prototype, "onDrag", void 0);
    __decorate([
        Input()
    ], Draggable.prototype, "pDraggableDisabled", null);
    __decorate([
        HostListener('dragstart', ['$event'])
    ], Draggable.prototype, "dragStart", null);
    __decorate([
        HostListener('dragend', ['$event'])
    ], Draggable.prototype, "dragEnd", null);
    Draggable = __decorate([
        Directive({
            selector: '[pDraggable]'
        })
    ], Draggable);
    return Draggable;
}());
export { Draggable };
var Droppable = /** @class */ (function () {
    function Droppable(el, zone) {
        this.el = el;
        this.zone = zone;
        this.onDragEnter = new EventEmitter();
        this.onDragLeave = new EventEmitter();
        this.onDrop = new EventEmitter();
    }
    Droppable.prototype.ngAfterViewInit = function () {
        if (!this.pDroppableDisabled) {
            this.bindDragOverListener();
        }
    };
    Droppable.prototype.bindDragOverListener = function () {
        var _this = this;
        if (!this.dragOverListener) {
            this.zone.runOutsideAngular(function () {
                _this.dragOverListener = _this.dragOver.bind(_this);
                _this.el.nativeElement.addEventListener('dragover', _this.dragOverListener);
            });
        }
    };
    Droppable.prototype.unbindDragOverListener = function () {
        var _this = this;
        if (this.dragOverListener) {
            this.zone.runOutsideAngular(function () {
                _this.el.nativeElement.removeEventListener('dragover', _this.dragOverListener);
                _this.dragOverListener = null;
            });
        }
    };
    Droppable.prototype.dragOver = function (event) {
        event.preventDefault();
    };
    Droppable.prototype.drop = function (event) {
        if (this.allowDrop(event)) {
            event.preventDefault();
            this.onDrop.emit(event);
        }
    };
    Droppable.prototype.dragEnter = function (event) {
        event.preventDefault();
        if (this.dropEffect) {
            event.dataTransfer.dropEffect = this.dropEffect;
        }
        this.onDragEnter.emit(event);
    };
    Droppable.prototype.dragLeave = function (event) {
        event.preventDefault();
        this.onDragLeave.emit(event);
    };
    Droppable.prototype.allowDrop = function (event) {
        var dragScope = event.dataTransfer.getData('text');
        if (typeof (this.scope) == "string" && dragScope == this.scope) {
            return true;
        }
        else if (this.scope instanceof Array) {
            for (var j = 0; j < this.scope.length; j++) {
                if (dragScope == this.scope[j]) {
                    return true;
                }
            }
        }
        return false;
    };
    Droppable.prototype.ngOnDestroy = function () {
        this.unbindDragOverListener();
    };
    Droppable.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input('pDroppable')
    ], Droppable.prototype, "scope", void 0);
    __decorate([
        Input()
    ], Droppable.prototype, "pDroppableDisabled", void 0);
    __decorate([
        Input()
    ], Droppable.prototype, "dropEffect", void 0);
    __decorate([
        Output()
    ], Droppable.prototype, "onDragEnter", void 0);
    __decorate([
        Output()
    ], Droppable.prototype, "onDragLeave", void 0);
    __decorate([
        Output()
    ], Droppable.prototype, "onDrop", void 0);
    __decorate([
        HostListener('drop', ['$event'])
    ], Droppable.prototype, "drop", null);
    __decorate([
        HostListener('dragenter', ['$event'])
    ], Droppable.prototype, "dragEnter", null);
    __decorate([
        HostListener('dragleave', ['$event'])
    ], Droppable.prototype, "dragLeave", null);
    Droppable = __decorate([
        Directive({
            selector: '[pDroppable]'
        })
    ], Droppable);
    return Droppable;
}());
export { Droppable };
var DragDropModule = /** @class */ (function () {
    function DragDropModule() {
    }
    DragDropModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Draggable, Droppable],
            declarations: [Draggable, Droppable]
        })
    ], DragDropModule);
    return DragDropModule;
}());
export { DragDropModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2Ryb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2RyYWdkcm9wLyIsInNvdXJjZXMiOlsiZHJhZ2Ryb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsSSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUt2QztJQXdCSSxtQkFBbUIsRUFBYyxFQUFTLElBQVk7UUFBbkMsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQVE7UUFoQjVDLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFcEQsY0FBUyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVlBLENBQUM7SUFFakQsc0JBQUkseUNBQWtCO2FBQXRCO1lBQ0wsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFDcEMsQ0FBQzthQUNELFVBQXVCLG1CQUEyQjtZQUM5QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7WUFFL0MsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQy9CO2lCQUNJO2dCQUNELElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQzdCO1FBQ0wsQ0FBQzs7O09BWEE7SUFhRCxtQ0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLElB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LEVBQUUsY0FBYztTQUMzQixDQUFDO09BQ1csU0FBUyxDQTBGckI7SUFBRCxnQkFBQztDQUFBLEFBMUZELElBMEZDO1NBMUZZLFNBQVM7QUFpR3RCO0lBQUE7SUFBOEIsQ0FBQztJQUFsQixjQUFjO1FBTDFCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUMsU0FBUyxDQUFDO1lBQzlCLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBQyxTQUFTLENBQUM7U0FDdEMsQ0FBQztPQUNXLGNBQWMsQ0FBSTtJQUFELHFCQUFDO0NBQUEsQUFBL0IsSUFBK0I7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsRGlyZWN0aXZlLE9uRGVzdHJveSxBZnRlclZpZXdJbml0LEVsZW1lbnRSZWYsSG9zdExpc3RlbmVyLElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsTmdab25lfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BEcmFnZ2FibGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEcmFnZ2FibGUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIFxuICAgIEBJbnB1dCgncERyYWdnYWJsZScpIHNjb3BlOiBzdHJpbmc7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIGRyYWdFZmZlY3Q6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBkcmFnSGFuZGxlOiBzdHJpbmc7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRHJhZ1N0YXJ0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25EcmFnRW5kOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25EcmFnOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBoYW5kbGU6IGFueTtcblxuICAgIGRyYWdMaXN0ZW5lcjogYW55O1xuXG4gICAgbW91c2VEb3duTGlzdGVuZXI6IGFueTtcblxuICAgIG1vdXNlVXBMaXN0ZW5lcjogYW55O1xuXG4gICAgX3BEcmFnZ2FibGVEaXNhYmxlZDogYm9vbGVhbjtcbiAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7fVxuXG4gICAgQElucHV0KCkgZ2V0IHBEcmFnZ2FibGVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BEcmFnZ2FibGVEaXNhYmxlZDtcbiAgICB9XG4gICAgc2V0IHBEcmFnZ2FibGVEaXNhYmxlZChfcERyYWdnYWJsZURpc2FibGVkOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcERyYWdnYWJsZURpc2FibGVkID0gX3BEcmFnZ2FibGVEaXNhYmxlZDtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLl9wRHJhZ2dhYmxlRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudW5iaW5kTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5iaW5kTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICghdGhpcy5wRHJhZ2dhYmxlRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5iaW5kTW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREcmFnTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXIgPSB0aGlzLmRyYWcuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZycsIHRoaXMuZHJhZ0xpc3RlbmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRHJhZ0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kcmFnTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWcnLCB0aGlzLmRyYWdMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kTW91c2VMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICghdGhpcy5tb3VzZURvd25MaXN0ZW5lciAmJiAhdGhpcy5tb3VzZVVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZURvd25MaXN0ZW5lciA9IHRoaXMubW91c2Vkb3duLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZVVwTGlzdGVuZXIgPSB0aGlzLm1vdXNldXAuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25MaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXBMaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAodGhpcy5tb3VzZURvd25MaXN0ZW5lciAmJiB0aGlzLm1vdXNlVXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd25MaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm1vdXNlVXBMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZURvd25MaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZVVwTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmFnKGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25EcmFnLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdzdGFydCcsIFsnJGV2ZW50J10pIFxuICAgIGRyYWdTdGFydChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5hbGxvd0RyYWcoKSAmJiAhdGhpcy5wRHJhZ2dhYmxlRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRyYWdFZmZlY3QpIHtcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZWZmZWN0QWxsb3dlZCA9IHRoaXMuZHJhZ0VmZmVjdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgdGhpcy5zY29wZSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMub25EcmFnU3RhcnQuZW1pdChldmVudCk7XG5cbiAgICAgICAgICAgIHRoaXMuYmluZERyYWdMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnLCBbJyRldmVudCddKSBcbiAgICBkcmFnRW5kKGV2ZW50KSB7XG4gICAgICAgIHRoaXMub25EcmFnRW5kLmVtaXQoZXZlbnQpO1xuICAgICAgICB0aGlzLnVuYmluZERyYWdMaXN0ZW5lcigpO1xuICAgIH1cbiAgICBcbiAgICBtb3VzZWRvd24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGUgPSBldmVudC50YXJnZXQ7XG4gICAgfVxuXG4gICAgbW91c2V1cChldmVudCkge1xuICAgICAgICB0aGlzLmhhbmRsZSA9IG51bGw7XG4gICAgfVxuICAgIFxuICAgIGFsbG93RHJhZygpIDogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdIYW5kbGUgJiYgdGhpcy5oYW5kbGUpXG4gICAgICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5tYXRjaGVzKHRoaXMuaGFuZGxlLCB0aGlzLmRyYWdIYW5kbGUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmREcmFnTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmRNb3VzZUxpc3RlbmVycygpO1xuICAgIH1cbiAgICBcbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcERyb3BwYWJsZV0nXG59KVxuZXhwb3J0IGNsYXNzIERyb3BwYWJsZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gICAgXG4gICAgQElucHV0KCdwRHJvcHBhYmxlJykgc2NvcGU6IHN0cmluZ3xzdHJpbmdbXTtcblxuICAgIEBJbnB1dCgpIHBEcm9wcGFibGVEaXNhYmxlZDogYm9vbGVhbjtcbiAgICAgICAgXG4gICAgQElucHV0KCkgZHJvcEVmZmVjdDogc3RyaW5nO1xuICAgICAgICBcbiAgICBAT3V0cHV0KCkgb25EcmFnRW50ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkRyYWdMZWF2ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRHJvcDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7fVxuXG4gICAgZHJhZ092ZXJMaXN0ZW5lcjogYW55O1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMucERyb3BwYWJsZURpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmREcmFnT3Zlckxpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRHJhZ092ZXJMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyYWdPdmVyTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyID0gdGhpcy5kcmFnT3Zlci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJMaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERyYWdPdmVyTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdPdmVyTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3Zlckxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdPdmVyTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmFnT3ZlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICAgICAgICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICAgIGRyb3AoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dEcm9wKGV2ZW50KSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMub25Ecm9wLmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbnRlcicsIFsnJGV2ZW50J10pIFxuICAgIGRyYWdFbnRlcihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuZHJvcEVmZmVjdCkge1xuICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSB0aGlzLmRyb3BFZmZlY3Q7XG4gICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgdGhpcy5vbkRyYWdFbnRlci5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgXG4gICAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSkgXG4gICAgZHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIHRoaXMub25EcmFnTGVhdmUuZW1pdChldmVudCk7XG4gICAgfVxuICAgICAgICBcbiAgICBhbGxvd0Ryb3AoZXZlbnQpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGRyYWdTY29wZSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0Jyk7XG4gICAgICAgIGlmICh0eXBlb2YgKHRoaXMuc2NvcGUpID09IFwic3RyaW5nXCIgJiYgZHJhZ1Njb3BlID09IHRoaXMuc2NvcGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc2NvcGUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuc2NvcGUubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZHJhZ1Njb3BlID09IHRoaXMuc2NvcGVbal0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmREcmFnT3Zlckxpc3RlbmVyKCk7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtEcmFnZ2FibGUsRHJvcHBhYmxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtEcmFnZ2FibGUsRHJvcHBhYmxlXVxufSlcbmV4cG9ydCBjbGFzcyBEcmFnRHJvcE1vZHVsZSB7IH0iXX0=