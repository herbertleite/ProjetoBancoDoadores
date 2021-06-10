(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@fullcalendar/core')) :
    typeof define === 'function' && define.amd ? define('primeng/fullcalendar', ['exports', '@angular/core', '@angular/common', '@fullcalendar/core'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.fullcalendar = {}), global.ng.core, global.ng.common, global.core$1));
}(this, (function (exports, core, common, core$1) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var FullCalendar = /** @class */ (function () {
        function FullCalendar(el) {
            this.el = el;
        }
        FullCalendar.prototype.ngOnInit = function () {
            this.config = {
                theme: true
            };
            if (this.options) {
                for (var prop in this.options) {
                    this.config[prop] = this.options[prop];
                }
            }
        };
        FullCalendar.prototype.ngAfterViewChecked = function () {
            if (!this.initialized && this.el.nativeElement.offsetParent) {
                this.initialize();
            }
        };
        Object.defineProperty(FullCalendar.prototype, "events", {
            get: function () {
                return this._events;
            },
            set: function (value) {
                this._events = value;
                if (this._events && this.calendar) {
                    this.calendar.removeAllEventSources();
                    this.calendar.addEventSource(this._events);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FullCalendar.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (value) {
                this._options = value;
                if (this._options && this.calendar) {
                    for (var prop in this._options) {
                        var optionValue = this._options[prop];
                        this.config[prop] = optionValue;
                        this.calendar.setOption(prop, optionValue);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        FullCalendar.prototype.initialize = function () {
            this.calendar = new core$1.Calendar(this.el.nativeElement.children[0], this.config);
            this.calendar.render();
            this.initialized = true;
            if (this.events) {
                this.calendar.removeAllEventSources();
                this.calendar.addEventSource(this.events);
            }
        };
        FullCalendar.prototype.getCalendar = function () {
            return this.calendar;
        };
        FullCalendar.prototype.ngOnDestroy = function () {
            if (this.calendar) {
                this.calendar.destroy();
                this.initialized = false;
                this.calendar = null;
            }
        };
        FullCalendar.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], FullCalendar.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], FullCalendar.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], FullCalendar.prototype, "events", null);
        __decorate([
            core.Input()
        ], FullCalendar.prototype, "options", null);
        FullCalendar = __decorate([
            core.Component({
                selector: 'p-fullCalendar',
                template: '<div [ngStyle]="style" [class]="styleClass"></div>'
            })
        ], FullCalendar);
        return FullCalendar;
    }());
    var FullCalendarModule = /** @class */ (function () {
        function FullCalendarModule() {
        }
        FullCalendarModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [FullCalendar],
                declarations: [FullCalendar]
            })
        ], FullCalendarModule);
        return FullCalendarModule;
    }());

    exports.FullCalendar = FullCalendar;
    exports.FullCalendarModule = FullCalendarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-fullcalendar.umd.js.map
