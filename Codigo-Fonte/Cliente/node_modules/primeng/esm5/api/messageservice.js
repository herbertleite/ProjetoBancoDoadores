var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var MessageService = /** @class */ (function () {
    function MessageService() {
        this.messageSource = new Subject();
        this.clearSource = new Subject();
        this.messageObserver = this.messageSource.asObservable();
        this.clearObserver = this.clearSource.asObservable();
    }
    MessageService.prototype.add = function (message) {
        if (message) {
            this.messageSource.next(message);
        }
    };
    MessageService.prototype.addAll = function (messages) {
        if (messages && messages.length) {
            this.messageSource.next(messages);
        }
    };
    MessageService.prototype.clear = function (key) {
        this.clearSource.next(key || null);
    };
    MessageService = __decorate([
        Injectable()
    ], MessageService);
    return MessageService;
}());
export { MessageService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2FwaS8iLCJzb3VyY2VzIjpbIm1lc3NhZ2VzZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUkvQjtJQUFBO1FBRVksa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBcUIsQ0FBQztRQUNqRCxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFFNUMsb0JBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BELGtCQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQWtCcEQsQ0FBQztJQWhCRyw0QkFBRyxHQUFILFVBQUksT0FBZ0I7UUFDaEIsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQU8sUUFBbUI7UUFDdEIsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyQztJQUNMLENBQUM7SUFFRCw4QkFBSyxHQUFMLFVBQU0sR0FBWTtRQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBdEJRLGNBQWM7UUFEMUIsVUFBVSxFQUFFO09BQ0EsY0FBYyxDQXdCMUI7SUFBRCxxQkFBQztDQUFBLEFBeEJELElBd0JDO1NBeEJZLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSAnLi9tZXNzYWdlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZXJ2aWNlIHtcbiAgICBcbiAgICBwcml2YXRlIG1lc3NhZ2VTb3VyY2UgPSBuZXcgU3ViamVjdDxNZXNzYWdlfE1lc3NhZ2VbXT4oKTtcbiAgICBwcml2YXRlIGNsZWFyU291cmNlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIFxuICAgIG1lc3NhZ2VPYnNlcnZlciA9IHRoaXMubWVzc2FnZVNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBjbGVhck9ic2VydmVyID0gdGhpcy5jbGVhclNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBcbiAgICBhZGQobWVzc2FnZTogTWVzc2FnZSkge1xuICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU291cmNlLm5leHQobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYWRkQWxsKG1lc3NhZ2VzOiBNZXNzYWdlW10pIHtcbiAgICAgICAgaWYgKG1lc3NhZ2VzICYmIG1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU291cmNlLm5leHQobWVzc2FnZXMpO1xuICAgICAgICB9IFxuICAgIH1cbiAgICBcbiAgICBjbGVhcihrZXk/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jbGVhclNvdXJjZS5uZXh0KGtleXx8bnVsbCk7XG4gICAgfVxuICAgIFxufSJdfQ==