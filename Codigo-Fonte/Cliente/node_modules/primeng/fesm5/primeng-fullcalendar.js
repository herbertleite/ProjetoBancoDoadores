import { ElementRef, Input, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendar } from '@fullcalendar/core';

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
        this.calendar = new Calendar(this.el.nativeElement.children[0], this.config);
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
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], FullCalendar.prototype, "style", void 0);
    __decorate([
        Input()
    ], FullCalendar.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], FullCalendar.prototype, "events", null);
    __decorate([
        Input()
    ], FullCalendar.prototype, "options", null);
    FullCalendar = __decorate([
        Component({
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
        NgModule({
            imports: [CommonModule],
            exports: [FullCalendar],
            declarations: [FullCalendar]
        })
    ], FullCalendarModule);
    return FullCalendarModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { FullCalendar, FullCalendarModule };
//# sourceMappingURL=primeng-fullcalendar.js.map
