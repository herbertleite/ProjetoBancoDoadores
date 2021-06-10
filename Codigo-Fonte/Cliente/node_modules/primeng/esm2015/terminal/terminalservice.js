var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let TerminalService = class TerminalService {
    constructor() {
        this.commandSource = new Subject();
        this.responseSource = new Subject();
        this.commandHandler = this.commandSource.asObservable();
        this.responseHandler = this.responseSource.asObservable();
    }
    sendCommand(command) {
        if (command) {
            this.commandSource.next(command);
        }
    }
    sendResponse(response) {
        if (response) {
            this.responseSource.next(response);
        }
    }
};
TerminalService = __decorate([
    Injectable()
], TerminalService);
export { TerminalService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWxzZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy90ZXJtaW5hbC8iLCJzb3VyY2VzIjpbInRlcm1pbmFsc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHL0IsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtJQUE1QjtRQUVZLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUN0QyxtQkFBYyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFFL0MsbUJBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25ELG9CQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQWF6RCxDQUFDO0lBWEcsV0FBVyxDQUFDLE9BQWU7UUFDdkIsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsUUFBZ0I7UUFDekIsSUFBSSxRQUFRLEVBQUU7WUFDVixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QztJQUNMLENBQUM7Q0FDSixDQUFBO0FBbkJZLGVBQWU7SUFEM0IsVUFBVSxFQUFFO0dBQ0EsZUFBZSxDQW1CM0I7U0FuQlksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRlcm1pbmFsU2VydmljZSB7XG4gICAgXG4gICAgcHJpdmF0ZSBjb21tYW5kU291cmNlID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIHByaXZhdGUgcmVzcG9uc2VTb3VyY2UgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG4gICAgXG4gICAgY29tbWFuZEhhbmRsZXIgPSB0aGlzLmNvbW1hbmRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgcmVzcG9uc2VIYW5kbGVyID0gdGhpcy5yZXNwb25zZVNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBcbiAgICBzZW5kQ29tbWFuZChjb21tYW5kOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKGNvbW1hbmQpIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZFNvdXJjZS5uZXh0KGNvbW1hbmQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHNlbmRSZXNwb25zZShyZXNwb25zZTogc3RyaW5nKSB7XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgdGhpcy5yZXNwb25zZVNvdXJjZS5uZXh0KHJlc3BvbnNlKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=