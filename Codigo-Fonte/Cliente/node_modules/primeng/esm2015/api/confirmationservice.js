var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let ConfirmationService = class ConfirmationService {
    constructor() {
        this.requireConfirmationSource = new Subject();
        this.acceptConfirmationSource = new Subject();
        this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
        this.accept = this.acceptConfirmationSource.asObservable();
    }
    confirm(confirmation) {
        this.requireConfirmationSource.next(confirmation);
        return this;
    }
    onAccept() {
        this.acceptConfirmationSource.next();
    }
};
ConfirmationService = __decorate([
    Injectable()
], ConfirmationService);
export { ConfirmationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybWF0aW9uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvYXBpLyIsInNvdXJjZXMiOlsiY29uZmlybWF0aW9uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJL0IsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFBaEM7UUFFWSw4QkFBeUIsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUN4RCw2QkFBd0IsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUUvRCx5QkFBb0IsR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckUsV0FBTSxHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQVUxRCxDQUFDO0lBUkcsT0FBTyxDQUFDLFlBQTBCO1FBQzlCLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekMsQ0FBQztDQUNKLENBQUE7QUFoQlksbUJBQW1CO0lBRC9CLFVBQVUsRUFBRTtHQUNBLG1CQUFtQixDQWdCL0I7U0FoQlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29uZmlybWF0aW9uIH0gZnJvbSAnLi9jb25maXJtYXRpb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlybWF0aW9uU2VydmljZSB7XG5cbiAgICBwcml2YXRlIHJlcXVpcmVDb25maXJtYXRpb25Tb3VyY2UgPSBuZXcgU3ViamVjdDxDb25maXJtYXRpb24+KCk7XG4gICAgcHJpdmF0ZSBhY2NlcHRDb25maXJtYXRpb25Tb3VyY2UgPSBuZXcgU3ViamVjdDxDb25maXJtYXRpb24+KCk7XG5cbiAgICByZXF1aXJlQ29uZmlybWF0aW9uJCA9IHRoaXMucmVxdWlyZUNvbmZpcm1hdGlvblNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBhY2NlcHQgPSB0aGlzLmFjY2VwdENvbmZpcm1hdGlvblNvdXJjZS5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbmZpcm0oY29uZmlybWF0aW9uOiBDb25maXJtYXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXF1aXJlQ29uZmlybWF0aW9uU291cmNlLm5leHQoY29uZmlybWF0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgb25BY2NlcHQoKSB7XG4gICAgICAgIHRoaXMuYWNjZXB0Q29uZmlybWF0aW9uU291cmNlLm5leHQoKTtcbiAgICB9XG59Il19