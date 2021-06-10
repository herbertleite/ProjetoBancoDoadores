var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, OnInit, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendar } from '@fullcalendar/core';
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
export { FullCalendar };
let FullCalendarModule = class FullCalendarModule {
};
FullCalendarModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [FullCalendar],
        declarations: [FullCalendar]
    })
], FullCalendarModule);
export { FullCalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbGNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9mdWxsY2FsZW5kYXIvIiwic291cmNlcyI6WyJmdWxsY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFNNUMsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQWdCckIsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7SUFBRyxDQUFDO0lBRXJDLFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsS0FBSyxFQUFFLElBQUk7U0FDZCxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2QsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUM7U0FDSjtJQUNMLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUU7WUFDekQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUVRLElBQUksTUFBTTtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsSUFBSSxNQUFNLENBQUMsS0FBVTtRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUVyQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlDO0lBQ0wsQ0FBQztJQUVRLElBQUksT0FBTztRQUNoQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksT0FBTyxDQUFDLEtBQVU7UUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDaEMsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUM1QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQzlDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDO0NBQ0osQ0FBQTs7WUF2RTBCLFVBQVU7O0FBZHhCO0lBQVIsS0FBSyxFQUFFOzJDQUFZO0FBRVg7SUFBUixLQUFLLEVBQUU7Z0RBQW9CO0FBZ0NuQjtJQUFSLEtBQUssRUFBRTswQ0FFUDtBQVdRO0lBQVIsS0FBSyxFQUFFOzJDQUVQO0FBbkRRLFlBQVk7SUFKeEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixRQUFRLEVBQUUsb0RBQW9EO0tBQ2pFLENBQUM7R0FDVyxZQUFZLENBdUZ4QjtTQXZGWSxZQUFZO0FBOEZ6QixJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtDQUFJLENBQUE7QUFBdEIsa0JBQWtCO0lBTDlCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsWUFBWSxFQUFFLENBQUMsWUFBWSxDQUFDO0tBQy9CLENBQUM7R0FDVyxrQkFBa0IsQ0FBSTtTQUF0QixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLE9uRGVzdHJveSxJbnB1dCxPbkluaXQsQWZ0ZXJWaWV3Q2hlY2tlZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Q2FsZW5kYXJ9IGZyb20gJ0BmdWxsY2FsZW5kYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1mdWxsQ2FsZW5kYXInLFxuICAgIHRlbXBsYXRlOiAnPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+PC9kaXY+J1xufSlcbmV4cG9ydCBjbGFzcyBGdWxsQ2FsZW5kYXIgaW1wbGVtZW50cyBPbkRlc3Ryb3ksT25Jbml0LEFmdGVyVmlld0NoZWNrZWQge1xuICAgICAgICBcbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgICAgICAgICAgIFxuICAgIGluaXRpYWxpemVkOiBib29sZWFuO1xuICAgICAgICAgICAgXG4gICAgY2FsZW5kYXI6IGFueTtcbiAgICBcbiAgICBjb25maWc6IGFueTtcblxuICAgIF9vcHRpb25zOiBhbnk7XG5cbiAgICBfZXZlbnRzOiBhbnlbXTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cbiAgICBcbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSB7XG4gICAgICAgICAgICB0aGVtZTogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gdGhpcy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWdbcHJvcF0gPSB0aGlzLm9wdGlvbnNbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5pdGlhbGl6ZWQgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgQElucHV0KCkgZ2V0IGV2ZW50cygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzO1xuICAgIH1cblxuICAgIHNldCBldmVudHModmFsdWU6IGFueSkge1xuICAgICAgICB0aGlzLl9ldmVudHMgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5fZXZlbnRzICYmIHRoaXMuY2FsZW5kYXIpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIucmVtb3ZlQWxsRXZlbnRTb3VyY2VzKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmFkZEV2ZW50U291cmNlKHRoaXMuX2V2ZW50cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBnZXQgb3B0aW9ucygpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICB9XG5cbiAgICBzZXQgb3B0aW9ucyh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB2YWx1ZTtcblxuICAgICAgICBpZiAodGhpcy5fb3B0aW9ucyAmJiB0aGlzLmNhbGVuZGFyKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIHRoaXMuX29wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uVmFsdWUgPSB0aGlzLl9vcHRpb25zW3Byb3BdO1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnW3Byb3BdID0gb3B0aW9uVmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5zZXRPcHRpb24ocHJvcCwgb3B0aW9uVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhciA9IG5ldyBDYWxlbmRhcih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF0sIHRoaXMuY29uZmlnKTtcbiAgICAgICAgdGhpcy5jYWxlbmRhci5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5ldmVudHMpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIucmVtb3ZlQWxsRXZlbnRTb3VyY2VzKCk7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmFkZEV2ZW50U291cmNlKHRoaXMuZXZlbnRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENhbGVuZGFyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jYWxlbmRhcjtcbiAgICB9XG4gICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5jYWxlbmRhcikge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyID0gbnVsbDtcbiAgICAgICAgfSAgICAgICAgXG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtGdWxsQ2FsZW5kYXJdLFxuICAgIGRlY2xhcmF0aW9uczogW0Z1bGxDYWxlbmRhcl1cbn0pXG5leHBvcnQgY2xhc3MgRnVsbENhbGVuZGFyTW9kdWxlIHsgfVxuIl19