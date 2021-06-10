import { ElementRef, Input, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendar } from '@fullcalendar/core';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let FullCalendar = class FullCalendar {
    constructor(el) {
        this.el = el;
    }
    ngOnInit() {
        this.config = {
            theme: true
        };
        if (this.options) {
            for (let prop in this.options) {
                this.config[prop] = this.options[prop];
            }
        }
    }
    ngAfterViewChecked() {
        if (!this.initialized && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    }
    get events() {
        return this._events;
    }
    set events(value) {
        this._events = value;
        if (this._events && this.calendar) {
            this.calendar.removeAllEventSources();
            this.calendar.addEventSource(this._events);
        }
    }
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = value;
        if (this._options && this.calendar) {
            for (let prop in this._options) {
                let optionValue = this._options[prop];
                this.config[prop] = optionValue;
                this.calendar.setOption(prop, optionValue);
            }
        }
    }
    initialize() {
        this.calendar = new Calendar(this.el.nativeElement.children[0], this.config);
        this.calendar.render();
        this.initialized = true;
        if (this.events) {
            this.calendar.removeAllEventSources();
            this.calendar.addEventSource(this.events);
        }
    }
    getCalendar() {
        return this.calendar;
    }
    ngOnDestroy() {
        if (this.calendar) {
            this.calendar.destroy();
            this.initialized = false;
            this.calendar = null;
        }
    }
};
FullCalendar.ctorParameters = () => [
    { type: ElementRef }
];
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
let FullCalendarModule = class FullCalendarModule {
};
FullCalendarModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [FullCalendar],
        declarations: [FullCalendar]
    })
], FullCalendarModule);

/**
 * Generated bundle index. Do not edit.
 */

export { FullCalendar, FullCalendarModule };
//# sourceMappingURL=primeng-fullcalendar.js.map
