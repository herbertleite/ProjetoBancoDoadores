var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
var ConfirmationService = /** @class */ (function () {
    function ConfirmationService() {
        this.requireConfirmationSource = new Subject();
        this.acceptConfirmationSource = new Subject();
        this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
        this.accept = this.acceptConfirmationSource.asObservable();
    }
    ConfirmationService.prototype.confirm = function (confirmation) {
        this.requireConfirmationSource.next(confirmation);
        return this;
    };
    ConfirmationService.prototype.onAccept = function () {
        this.acceptConfirmationSource.next();
    };
    ConfirmationService = __decorate([
        Injectable()
    ], ConfirmationService);
    return ConfirmationService;
}());
export { ConfirmationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvYXBpLyIsInNvdXJjZXMiOlsiY29uZmlybWF0aW9uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJL0I7SUFBQTtRQUVZLDhCQUF5QixHQUFHLElBQUksT0FBTyxFQUFnQixDQUFDO1FBQ3hELDZCQUF3QixHQUFHLElBQUksT0FBTyxFQUFnQixDQUFDO1FBRS9ELHlCQUFvQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNyRSxXQUFNLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFlBQVksRUFBRSxDQUFDO0lBVTFELENBQUM7SUFSRyxxQ0FBTyxHQUFQLFVBQVEsWUFBMEI7UUFDOUIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBZlEsbUJBQW1CO1FBRC9CLFVBQVUsRUFBRTtPQUNBLG1CQUFtQixDQWdCL0I7SUFBRCwwQkFBQztDQUFBLEFBaEJELElBZ0JDO1NBaEJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbmZpcm1hdGlvbiB9IGZyb20gJy4vY29uZmlybWF0aW9uJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbmZpcm1hdGlvblNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSByZXF1aXJlQ29uZmlybWF0aW9uU291cmNlID0gbmV3IFN1YmplY3Q8Q29uZmlybWF0aW9uPigpO1xuICAgIHByaXZhdGUgYWNjZXB0Q29uZmlybWF0aW9uU291cmNlID0gbmV3IFN1YmplY3Q8Q29uZmlybWF0aW9uPigpO1xuXG4gICAgcmVxdWlyZUNvbmZpcm1hdGlvbiQgPSB0aGlzLnJlcXVpcmVDb25maXJtYXRpb25Tb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgYWNjZXB0ID0gdGhpcy5hY2NlcHRDb25maXJtYXRpb25Tb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBjb25maXJtKGNvbmZpcm1hdGlvbjogQ29uZmlybWF0aW9uKSB7XG4gICAgICAgIHRoaXMucmVxdWlyZUNvbmZpcm1hdGlvblNvdXJjZS5uZXh0KGNvbmZpcm1hdGlvbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG9uQWNjZXB0KCkge1xuICAgICAgICB0aGlzLmFjY2VwdENvbmZpcm1hdGlvblNvdXJjZS5uZXh0KCk7XG4gICAgfVxufSJdfQ==