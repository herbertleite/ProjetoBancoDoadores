var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let TreeDragDropService = class TreeDragDropService {
    constructor() {
        this.dragStartSource = new Subject();
        this.dragStopSource = new Subject();
        this.dragStart$ = this.dragStartSource.asObservable();
        this.dragStop$ = this.dragStopSource.asObservable();
    }
    startDrag(event) {
        this.dragStartSource.next(event);
    }
    stopDrag(event) {
        this.dragStopSource.next(event);
    }
};
TreeDragDropService = __decorate([
    Injectable()
], TreeDragDropService);
export { TreeDragDropService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZWRyYWdkcm9wc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvYXBpLyIsInNvdXJjZXMiOlsidHJlZWRyYWdkcm9wc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFJL0IsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFBaEM7UUFFWSxvQkFBZSxHQUFHLElBQUksT0FBTyxFQUFxQixDQUFDO1FBQ25ELG1CQUFjLEdBQUcsSUFBSSxPQUFPLEVBQXFCLENBQUM7UUFFMUQsZUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakQsY0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7SUFTbkQsQ0FBQztJQVBHLFNBQVMsQ0FBQyxLQUF3QjtRQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQXdCO1FBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDSixDQUFBO0FBZlksbUJBQW1CO0lBRC9CLFVBQVUsRUFBRTtHQUNBLG1CQUFtQixDQWUvQjtTQWZZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRyZWVOb2RlRHJhZ0V2ZW50IH0gZnJvbSAnLi90cmVlbm9kZWRyYWdldmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUcmVlRHJhZ0Ryb3BTZXJ2aWNlIHtcbiAgICBcbiAgICBwcml2YXRlIGRyYWdTdGFydFNvdXJjZSA9IG5ldyBTdWJqZWN0PFRyZWVOb2RlRHJhZ0V2ZW50PigpO1xuICAgIHByaXZhdGUgZHJhZ1N0b3BTb3VyY2UgPSBuZXcgU3ViamVjdDxUcmVlTm9kZURyYWdFdmVudD4oKTtcbiAgICBcbiAgICBkcmFnU3RhcnQkID0gdGhpcy5kcmFnU3RhcnRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgZHJhZ1N0b3AkID0gdGhpcy5kcmFnU3RvcFNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICBcbiAgICBzdGFydERyYWcoZXZlbnQ6IFRyZWVOb2RlRHJhZ0V2ZW50KSB7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0U291cmNlLm5leHQoZXZlbnQpO1xuICAgIH1cbiAgICBcbiAgICBzdG9wRHJhZyhldmVudDogVHJlZU5vZGVEcmFnRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kcmFnU3RvcFNvdXJjZS5uZXh0KGV2ZW50KTtcbiAgICB9XG59Il19