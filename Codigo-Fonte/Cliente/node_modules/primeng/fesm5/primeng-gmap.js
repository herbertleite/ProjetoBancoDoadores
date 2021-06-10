import { EventEmitter, ElementRef, IterableDiffers, ChangeDetectorRef, NgZone, Input, Output, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var GMap = /** @class */ (function () {
    function GMap(el, differs, cd, zone) {
        this.el = el;
        this.cd = cd;
        this.zone = zone;
        this.onMapClick = new EventEmitter();
        this.onOverlayClick = new EventEmitter();
        this.onOverlayDblClick = new EventEmitter();
        this.onOverlayDragStart = new EventEmitter();
        this.onOverlayDrag = new EventEmitter();
        this.onOverlayDragEnd = new EventEmitter();
        this.onMapReady = new EventEmitter();
        this.onMapDragEnd = new EventEmitter();
        this.onZoomChanged = new EventEmitter();
        this.differ = differs.find([]).create(null);
    }
    GMap.prototype.ngAfterViewChecked = function () {
        if (!this.map && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    };
    GMap.prototype.initialize = function () {
        var e_1, _a;
        var _this = this;
        this.map = new google.maps.Map(this.el.nativeElement.children[0], this.options);
        this.onMapReady.emit({
            map: this.map
        });
        if (this.overlays) {
            try {
                for (var _b = __values(this.overlays), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var overlay = _c.value;
                    overlay.setMap(this.map);
                    this.bindOverlayEvents(overlay);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        this.map.addListener('click', function (event) {
            _this.zone.run(function () {
                _this.onMapClick.emit(event);
            });
        });
        this.map.addListener('dragend', function (event) {
            _this.zone.run(function () {
                _this.onMapDragEnd.emit(event);
            });
        });
        this.map.addListener('zoom_changed', function (event) {
            _this.zone.run(function () {
                _this.onZoomChanged.emit(event);
            });
        });
    };
    GMap.prototype.bindOverlayEvents = function (overlay) {
        var _this = this;
        overlay.addListener('click', function (event) {
            _this.zone.run(function () {
                _this.onOverlayClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: _this.map
                });
            });
        });
        overlay.addListener('dblclick', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDblClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: _this.map
                });
            });
        });
        if (overlay.getDraggable()) {
            this.bindDragEvents(overlay);
        }
    };
    GMap.prototype.ngDoCheck = function () {
        var _this = this;
        var changes = this.differ.diff(this.overlays);
        if (changes && this.map) {
            changes.forEachRemovedItem(function (record) {
                google.maps.event.clearInstanceListeners(record.item);
                record.item.setMap(null);
            });
            changes.forEachAddedItem(function (record) {
                record.item.setMap(_this.map);
                record.item.addListener('click', function (event) {
                    _this.zone.run(function () {
                        _this.onOverlayClick.emit({
                            originalEvent: event,
                            overlay: record.item,
                            map: _this.map
                        });
                    });
                });
                if (record.item.getDraggable()) {
                    _this.bindDragEvents(record.item);
                }
            });
        }
    };
    GMap.prototype.bindDragEvents = function (overlay) {
        var _this = this;
        overlay.addListener('dragstart', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDragStart.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
        overlay.addListener('drag', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDrag.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
        overlay.addListener('dragend', function (event) {
            _this.zone.run(function () {
                _this.onOverlayDragEnd.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: _this.map
                });
            });
        });
    };
    GMap.prototype.getMap = function () {
        return this.map;
    };
    GMap.ctorParameters = function () { return [
        { type: ElementRef },
        { type: IterableDiffers },
        { type: ChangeDetectorRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], GMap.prototype, "style", void 0);
    __decorate([
        Input()
    ], GMap.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], GMap.prototype, "options", void 0);
    __decorate([
        Input()
    ], GMap.prototype, "overlays", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onMapClick", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayClick", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayDblClick", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayDragStart", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayDrag", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onOverlayDragEnd", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onMapReady", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onMapDragEnd", void 0);
    __decorate([
        Output()
    ], GMap.prototype, "onZoomChanged", void 0);
    GMap = __decorate([
        Component({
            selector: 'p-gmap',
            template: "<div [ngStyle]=\"style\" [class]=\"styleClass\"></div>"
        })
    ], GMap);
    return GMap;
}());
var GMapModule = /** @class */ (function () {
    function GMapModule() {
    }
    GMapModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [GMap],
            declarations: [GMap]
        })
    ], GMapModule);
    return GMapModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { GMap, GMapModule };
//# sourceMappingURL=primeng-gmap.js.map
