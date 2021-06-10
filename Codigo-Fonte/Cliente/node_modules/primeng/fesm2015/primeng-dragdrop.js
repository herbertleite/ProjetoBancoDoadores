import { EventEmitter, ElementRef, NgZone, Input, Output, HostListener, Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let DragDropModule = class DragDropModule {
};
DragDropModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Draggable, Droppable],
        declarations: [Draggable, Droppable]
    })
], DragDropModule);

/**
 * Generated bundle index. Do not edit.
 */

export { DragDropModule, Draggable, Droppable };
//# sourceMappingURL=primeng-dragdrop.js.map
