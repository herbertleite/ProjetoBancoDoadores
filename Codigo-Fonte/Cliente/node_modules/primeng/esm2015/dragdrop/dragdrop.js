var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, OnDestroy, AfterViewInit, ElementRef, HostListener, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
let Draggable = class Draggable {
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
        this.onDragStart = new EventEmitter();
        this.onDragEnd = new EventEmitter();
        this.onDrag = new EventEmitter();
    }
    get pDraggableDisabled() {
        return this._pDraggableDisabled;
    }
    set pDraggableDisabled(_pDraggableDisabled) {
        this._pDraggableDisabled = _pDraggableDisabled;
        if (this._pDraggableDisabled) {
            this.unbindMouseListeners();
        }
        else {
            this.el.nativeElement.draggable = true;
            this.bindMouseListeners();
        }
    }
    ngAfterViewInit() {
        if (!this.pDraggableDisabled) {
            this.el.nativeElement.draggable = true;
            this.bindMouseListeners();
        }
    }
    bindDragListener() {
        if (!this.dragListener) {
            this.zone.runOutsideAngular(() => {
                this.dragListener = this.drag.bind(this);
                this.el.nativeElement.addEventListener('drag', this.dragListener);
            });
        }
    }
    unbindDragListener() {
        if (this.dragListener) {
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('drag', this.dragListener);
                this.dragListener = null;
            });
        }
    }
    bindMouseListeners() {
        if (!this.mouseDownListener && !this.mouseUpListener) {
            this.zone.runOutsideAngular(() => {
                this.mouseDownListener = this.mousedown.bind(this);
                this.mouseUpListener = this.mouseup.bind(this);
                this.el.nativeElement.addEventListener('mousedown', this.mouseDownListener);
                this.el.nativeElement.addEventListener('mouseup', this.mouseUpListener);
            });
        }
    }
    unbindMouseListeners() {
        if (this.mouseDownListener && this.mouseUpListener) {
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('mousedown', this.mouseDownListener);
                this.el.nativeElement.removeEventListener('mouseup', this.mouseUpListener);
                this.mouseDownListener = null;
                this.mouseUpListener = null;
            });
        }
    }
    drag(event) {
        this.onDrag.emit(event);
    }
    dragStart(event) {
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
    }
    dragEnd(event) {
        this.onDragEnd.emit(event);
        this.unbindDragListener();
    }
    mousedown(event) {
        this.handle = event.target;
    }
    mouseup(event) {
        this.handle = null;
    }
    allowDrag() {
        if (this.dragHandle && this.handle)
            return DomHandler.matches(this.handle, this.dragHandle);
        else
            return true;
    }
    ngOnDestroy() {
        this.unbindDragListener();
        this.unbindMouseListeners();
    }
};
Draggable.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
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
export { Draggable };
let Droppable = class Droppable {
    constructor(el, zone) {
        this.el = el;
        this.zone = zone;
        this.onDragEnter = new EventEmitter();
        this.onDragLeave = new EventEmitter();
        this.onDrop = new EventEmitter();
    }
    ngAfterViewInit() {
        if (!this.pDroppableDisabled) {
            this.bindDragOverListener();
        }
    }
    bindDragOverListener() {
        if (!this.dragOverListener) {
            this.zone.runOutsideAngular(() => {
                this.dragOverListener = this.dragOver.bind(this);
                this.el.nativeElement.addEventListener('dragover', this.dragOverListener);
            });
        }
    }
    unbindDragOverListener() {
        if (this.dragOverListener) {
            this.zone.runOutsideAngular(() => {
                this.el.nativeElement.removeEventListener('dragover', this.dragOverListener);
                this.dragOverListener = null;
            });
        }
    }
    dragOver(event) {
        event.preventDefault();
    }
    drop(event) {
        if (this.allowDrop(event)) {
            event.preventDefault();
            this.onDrop.emit(event);
        }
    }
    dragEnter(event) {
        event.preventDefault();
        if (this.dropEffect) {
            event.dataTransfer.dropEffect = this.dropEffect;
        }
        this.onDragEnter.emit(event);
    }
    dragLeave(event) {
        event.preventDefault();
        this.onDragLeave.emit(event);
    }
    allowDrop(event) {
        let dragScope = event.dataTransfer.getData('text');
        if (typeof (this.scope) == "string" && dragScope == this.scope) {
            return true;
        }
        else if (this.scope instanceof Array) {
            for (let j = 0; j < this.scope.length; j++) {
                if (dragScope == this.scope[j]) {
                    return true;
                }
            }
        }
        return false;
    }
    ngOnDestroy() {
        this.unbindDragOverListener();
    }
};
Droppable.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
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
export { Droppable };
let DragDropModule = class DragDropModule {
};
DragDropModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Draggable, Droppable],
        declarations: [Draggable, Droppable]
    })
], DragDropModule);
export { DragDropModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2Ryb3AuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2RyYWdkcm9wLyIsInNvdXJjZXMiOlsiZHJhZ2Ryb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLGFBQWEsRUFBQyxVQUFVLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNsSSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUt2QyxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBd0JsQixZQUFtQixFQUFjLEVBQVMsSUFBWTtRQUFuQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQWhCNUMsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwRCxjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBWUEsQ0FBQztJQUVqRCxJQUFJLGtCQUFrQjtRQUMzQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxtQkFBMkI7UUFDOUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzFCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQy9CO2FBQ0k7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzdCO0lBQ0wsQ0FBQztJQUVELGVBQWU7UUFD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QWxCLGNBQWM7SUFMMUIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBQyxTQUFTLENBQUM7UUFDOUIsWUFBWSxFQUFFLENBQUMsU0FBUyxFQUFDLFNBQVMsQ0FBQztLQUN0QyxDQUFDO0dBQ1csY0FBYyxDQUFJO1NBQWxCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLERpcmVjdGl2ZSxPbkRlc3Ryb3ksQWZ0ZXJWaWV3SW5pdCxFbGVtZW50UmVmLEhvc3RMaXN0ZW5lcixJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twRHJhZ2dhYmxlXSdcbn0pXG5leHBvcnQgY2xhc3MgRHJhZ2dhYmxlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBcbiAgICBASW5wdXQoJ3BEcmFnZ2FibGUnKSBzY29wZTogc3RyaW5nO1xuICAgICAgICBcbiAgICBASW5wdXQoKSBkcmFnRWZmZWN0OiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgZHJhZ0hhbmRsZTogc3RyaW5nO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkRyYWdTdGFydDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRHJhZ0VuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRHJhZzogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgaGFuZGxlOiBhbnk7XG5cbiAgICBkcmFnTGlzdGVuZXI6IGFueTtcblxuICAgIG1vdXNlRG93bkxpc3RlbmVyOiBhbnk7XG5cbiAgICBtb3VzZVVwTGlzdGVuZXI6IGFueTtcblxuICAgIF9wRHJhZ2dhYmxlRGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkge31cblxuICAgIEBJbnB1dCgpIGdldCBwRHJhZ2dhYmxlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wRHJhZ2dhYmxlRGlzYWJsZWQ7XG4gICAgfVxuICAgIHNldCBwRHJhZ2dhYmxlRGlzYWJsZWQoX3BEcmFnZ2FibGVEaXNhYmxlZDpib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3BEcmFnZ2FibGVEaXNhYmxlZCA9IF9wRHJhZ2dhYmxlRGlzYWJsZWQ7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5fcERyYWdnYWJsZURpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnVuYmluZE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYmluZE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMucERyYWdnYWJsZURpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuYmluZE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRHJhZ0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZHJhZ0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVyID0gdGhpcy5kcmFnLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWcnLCB0aGlzLmRyYWdMaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERyYWdMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnJywgdGhpcy5kcmFnTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0xpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZE1vdXNlTGlzdGVuZXJzKCkge1xuICAgICAgICBpZiAoIXRoaXMubW91c2VEb3duTGlzdGVuZXIgJiYgIXRoaXMubW91c2VVcExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VEb3duTGlzdGVuZXIgPSB0aGlzLm1vdXNlZG93bi5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VVcExpc3RlbmVyID0gdGhpcy5tb3VzZXVwLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwTGlzdGVuZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRNb3VzZUxpc3RlbmVycygpIHtcbiAgICAgICAgaWYgKHRoaXMubW91c2VEb3duTGlzdGVuZXIgJiYgdGhpcy5tb3VzZVVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VEb3duTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VVcExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhZyhldmVudCkge1xuICAgICAgICB0aGlzLm9uRHJhZy5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkcmFnc3RhcnQnLCBbJyRldmVudCddKSBcbiAgICBkcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYWxsb3dEcmFnKCkgJiYgIXRoaXMucERyYWdnYWJsZURpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnRWZmZWN0KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmVmZmVjdEFsbG93ZWQgPSB0aGlzLmRyYWdFZmZlY3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsIHRoaXMuc2NvcGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLm9uRHJhZ1N0YXJ0LmVtaXQoZXZlbnQpO1xuXG4gICAgICAgICAgICB0aGlzLmJpbmREcmFnTGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkcmFnZW5kJywgWyckZXZlbnQnXSkgXG4gICAgZHJhZ0VuZChldmVudCkge1xuICAgICAgICB0aGlzLm9uRHJhZ0VuZC5lbWl0KGV2ZW50KTtcbiAgICAgICAgdGhpcy51bmJpbmREcmFnTGlzdGVuZXIoKTtcbiAgICB9XG4gICAgXG4gICAgbW91c2Vkb3duKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaGFuZGxlID0gZXZlbnQudGFyZ2V0O1xuICAgIH1cblxuICAgIG1vdXNldXAoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5oYW5kbGUgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICBhbGxvd0RyYWcoKSA6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy5kcmFnSGFuZGxlICYmIHRoaXMuaGFuZGxlKVxuICAgICAgICAgICAgcmV0dXJuIERvbUhhbmRsZXIubWF0Y2hlcyh0aGlzLmhhbmRsZSwgdGhpcy5kcmFnSGFuZGxlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kRHJhZ0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kTW91c2VMaXN0ZW5lcnMoKTtcbiAgICB9XG4gICAgXG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BEcm9wcGFibGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBEcm9wcGFibGUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIFxuICAgIEBJbnB1dCgncERyb3BwYWJsZScpIHNjb3BlOiBzdHJpbmd8c3RyaW5nW107XG5cbiAgICBASW5wdXQoKSBwRHJvcHBhYmxlRGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIGRyb3BFZmZlY3Q6IHN0cmluZztcbiAgICAgICAgXG4gICAgQE91dHB1dCgpIG9uRHJhZ0VudGVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25EcmFnTGVhdmU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvbkRyb3A6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkge31cblxuICAgIGRyYWdPdmVyTGlzdGVuZXI6IGFueTtcblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBEcm9wcGFibGVEaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRHJhZ092ZXJMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERyYWdPdmVyTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kcmFnT3Zlckxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lciA9IHRoaXMuZHJhZ092ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVyTGlzdGVuZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmREcmFnT3Zlckxpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kcmFnT3Zlckxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIHRoaXMuZHJhZ092ZXJMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgICAgICAgICBcbiAgICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgICBkcm9wKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmFsbG93RHJvcChldmVudCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm9uRHJvcC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBASG9zdExpc3RlbmVyKCdkcmFnZW50ZXInLCBbJyRldmVudCddKSBcbiAgICBkcmFnRW50ZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmRyb3BFZmZlY3QpIHtcbiAgICAgICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gdGhpcy5kcm9wRWZmZWN0O1xuICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIHRoaXMub25EcmFnRW50ZXIuZW1pdChldmVudCk7XG4gICAgfVxuICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pIFxuICAgIGRyYWdMZWF2ZShldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICB0aGlzLm9uRHJhZ0xlYXZlLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICAgICAgXG4gICAgYWxsb3dEcm9wKGV2ZW50KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBkcmFnU2NvcGUgPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dCcpO1xuICAgICAgICBpZiAodHlwZW9mICh0aGlzLnNjb3BlKSA9PSBcInN0cmluZ1wiICYmIGRyYWdTY29wZSA9PSB0aGlzLnNjb3BlKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnNjb3BlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLnNjb3BlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRyYWdTY29wZSA9PSB0aGlzLnNjb3BlW2pdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kRHJhZ092ZXJMaXN0ZW5lcigpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbRHJhZ2dhYmxlLERyb3BwYWJsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbRHJhZ2dhYmxlLERyb3BwYWJsZV1cbn0pXG5leHBvcnQgY2xhc3MgRHJhZ0Ryb3BNb2R1bGUgeyB9Il19