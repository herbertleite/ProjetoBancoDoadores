var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, OnInit, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendar } from '@fullcalendar/core';
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
export { FullCalendar };
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
export { FullCalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVsbGNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9mdWxsY2FsZW5kYXIvIiwic291cmNlcyI6WyJmdWxsY2FsZW5kYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFNNUM7SUFnQkksc0JBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO0lBQUcsQ0FBQztJQUVyQywrQkFBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNWLEtBQUssRUFBRSxJQUFJO1NBQ2QsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzFDO1NBQ0o7SUFDTCxDQUFDO0lBRUQseUNBQWtCLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsWUFBWSxFQUFFO1lBQ3pELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtJQUNMLENBQUM7SUFFUSxzQkFBSSxnQ0FBTTthQUFWO1lBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7YUFFRCxVQUFXLEtBQVU7WUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFFckIsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlDO1FBQ0wsQ0FBQzs7O09BVEE7SUFXUSxzQkFBSSxpQ0FBTzthQUFYO1lBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFFRCxVQUFZLEtBQVU7WUFDbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFFdEIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2hDLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDNUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUM7b0JBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztpQkFDOUM7YUFDSjtRQUNMLENBQUM7OztPQVpBO0lBY0QsaUNBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXhCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0M7SUFDTCxDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDOztnQkF0RXNCLFVBQVU7O0lBZHhCO1FBQVIsS0FBSyxFQUFFOytDQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7b0RBQW9CO0lBZ0NuQjtRQUFSLEtBQUssRUFBRTs4Q0FFUDtJQVdRO1FBQVIsS0FBSyxFQUFFOytDQUVQO0lBbkRRLFlBQVk7UUFKeEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsb0RBQW9EO1NBQ2pFLENBQUM7T0FDVyxZQUFZLENBdUZ4QjtJQUFELG1CQUFDO0NBQUEsQUF2RkQsSUF1RkM7U0F2RlksWUFBWTtBQThGekI7SUFBQTtJQUFrQyxDQUFDO0lBQXRCLGtCQUFrQjtRQUw5QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDdkIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLFlBQVksRUFBRSxDQUFDLFlBQVksQ0FBQztTQUMvQixDQUFDO09BQ1csa0JBQWtCLENBQUk7SUFBRCx5QkFBQztDQUFBLEFBQW5DLElBQW1DO1NBQXRCLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsT25EZXN0cm95LElucHV0LE9uSW5pdCxBZnRlclZpZXdDaGVja2VkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtDYWxlbmRhcn0gZnJvbSAnQGZ1bGxjYWxlbmRhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWZ1bGxDYWxlbmRhcicsXG4gICAgdGVtcGxhdGU6ICc8ZGl2IFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj48L2Rpdj4nXG59KVxuZXhwb3J0IGNsYXNzIEZ1bGxDYWxlbmRhciBpbXBsZW1lbnRzIE9uRGVzdHJveSxPbkluaXQsQWZ0ZXJWaWV3Q2hlY2tlZCB7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgICAgICAgICAgXG4gICAgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG4gICAgICAgICAgICBcbiAgICBjYWxlbmRhcjogYW55O1xuICAgIFxuICAgIGNvbmZpZzogYW55O1xuXG4gICAgX29wdGlvbnM6IGFueTtcblxuICAgIF9ldmVudHM6IGFueVtdO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuICAgIFxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgICAgICAgIHRoZW1lOiB0cnVlXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ1twcm9wXSA9IHRoaXMub3B0aW9uc1twcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCAmJiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBASW5wdXQoKSBnZXQgZXZlbnRzKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHM7XG4gICAgfVxuXG4gICAgc2V0IGV2ZW50cyh2YWx1ZTogYW55KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLl9ldmVudHMgJiYgdGhpcy5jYWxlbmRhcikge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5yZW1vdmVBbGxFdmVudFNvdXJjZXMoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuYWRkRXZlbnRTb3VyY2UodGhpcy5fZXZlbnRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBvcHRpb25zKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgIH1cblxuICAgIHNldCBvcHRpb25zKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLl9vcHRpb25zICYmIHRoaXMuY2FsZW5kYXIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gdGhpcy5fb3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGxldCBvcHRpb25WYWx1ZSA9IHRoaXMuX29wdGlvbnNbcHJvcF07XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWdbcHJvcF0gPSBvcHRpb25WYWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGVuZGFyLnNldE9wdGlvbihwcm9wLCBvcHRpb25WYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICB0aGlzLmNhbGVuZGFyID0gbmV3IENhbGVuZGFyKHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXSwgdGhpcy5jb25maWcpO1xuICAgICAgICB0aGlzLmNhbGVuZGFyLnJlbmRlcigpO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmV2ZW50cykge1xuICAgICAgICAgICAgdGhpcy5jYWxlbmRhci5yZW1vdmVBbGxFdmVudFNvdXJjZXMoKTtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIuYWRkRXZlbnRTb3VyY2UodGhpcy5ldmVudHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2FsZW5kYXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbGVuZGFyO1xuICAgIH1cbiAgICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLmNhbGVuZGFyKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2FsZW5kYXIgPSBudWxsO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0Z1bGxDYWxlbmRhcl0sXG4gICAgZGVjbGFyYXRpb25zOiBbRnVsbENhbGVuZGFyXVxufSlcbmV4cG9ydCBjbGFzcyBGdWxsQ2FsZW5kYXJNb2R1bGUgeyB9XG4iXX0=