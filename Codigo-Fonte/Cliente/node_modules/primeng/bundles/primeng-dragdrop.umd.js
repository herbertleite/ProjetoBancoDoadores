(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/dragdrop', ['exports', '@angular/core', '@angular/common', 'primeng/dom'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.dragdrop = {}), global.ng.core, global.ng.common, global.primeng.dom));
}(this, (function (exports, core, common, dom) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Draggable = /** @class */ (function () {
        function Draggable(el, zone) {
            this.el = el;
            this.zone = zone;
            this.onDragStart = new core.EventEmitter();
            this.onDragEnd = new core.EventEmitter();
            this.onDrag = new core.EventEmitter();
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
                return dom.DomHandler.matches(this.handle, this.dragHandle);
            else
                return true;
        };
        Draggable.prototype.ngOnDestroy = function () {
            this.unbindDragListener();
            this.unbindMouseListeners();
        };
        Draggable.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        __decorate([
            core.Input('pDraggable')
        ], Draggable.prototype, "scope", void 0);
        __decorate([
            core.Input()
        ], Draggable.prototype, "dragEffect", void 0);
        __decorate([
            core.Input()
        ], Draggable.prototype, "dragHandle", void 0);
        __decorate([
            core.Output()
        ], Draggable.prototype, "onDragStart", void 0);
        __decorate([
            core.Output()
        ], Draggable.prototype, "onDragEnd", void 0);
        __decorate([
            core.Output()
        ], Draggable.prototype, "onDrag", void 0);
        __decorate([
            core.Input()
        ], Draggable.prototype, "pDraggableDisabled", null);
        __decorate([
            core.HostListener('dragstart', ['$event'])
        ], Draggable.prototype, "dragStart", null);
        __decorate([
            core.HostListener('dragend', ['$event'])
        ], Draggable.prototype, "dragEnd", null);
        Draggable = __decorate([
            core.Directive({
                selector: '[pDraggable]'
            })
        ], Draggable);
        return Draggable;
    }());
    var Droppable = /** @class */ (function () {
        function Droppable(el, zone) {
            this.el = el;
            this.zone = zone;
            this.onDragEnter = new core.EventEmitter();
            this.onDragLeave = new core.EventEmitter();
            this.onDrop = new core.EventEmitter();
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
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        __decorate([
            core.Input('pDroppable')
        ], Droppable.prototype, "scope", void 0);
        __decorate([
            core.Input()
        ], Droppable.prototype, "pDroppableDisabled", void 0);
        __decorate([
            core.Input()
        ], Droppable.prototype, "dropEffect", void 0);
        __decorate([
            core.Output()
        ], Droppable.prototype, "onDragEnter", void 0);
        __decorate([
            core.Output()
        ], Droppable.prototype, "onDragLeave", void 0);
        __decorate([
            core.Output()
        ], Droppable.prototype, "onDrop", void 0);
        __decorate([
            core.HostListener('drop', ['$event'])
        ], Droppable.prototype, "drop", null);
        __decorate([
            core.HostListener('dragenter', ['$event'])
        ], Droppable.prototype, "dragEnter", null);
        __decorate([
            core.HostListener('dragleave', ['$event'])
        ], Droppable.prototype, "dragLeave", null);
        Droppable = __decorate([
            core.Directive({
                selector: '[pDroppable]'
            })
        ], Droppable);
        return Droppable;
    }());
    var DragDropModule = /** @class */ (function () {
        function DragDropModule() {
        }
        DragDropModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [Draggable, Droppable],
                declarations: [Draggable, Droppable]
            })
        ], DragDropModule);
        return DragDropModule;
    }());

    exports.DragDropModule = DragDropModule;
    exports.Draggable = Draggable;
    exports.Droppable = Droppable;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-dragdrop.umd.js.map
