var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { DynamicDialogComponent } from './dynamicdialog';
import { DynamicDialogInjector } from './dynamicdialog-injector';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
var DialogService = /** @class */ (function () {
    function DialogService(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    DialogService.prototype.open = function (componentType, config) {
        var dialogRef = this.appendDialogComponentToBody(config);
        this.dialogComponentRef.instance.childComponentType = componentType;
        return dialogRef;
    };
    DialogService.prototype.appendDialogComponentToBody = function (config) {
        var _this = this;
        var map = new WeakMap();
        map.set(DynamicDialogConfig, config);
        var dialogRef = new DynamicDialogRef();
        map.set(DynamicDialogRef, dialogRef);
        var sub = dialogRef.onClose.subscribe(function () {
            _this.removeDialogComponentFromBody();
            sub.unsubscribe();
        });
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
        var componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));
        this.appRef.attachView(componentRef.hostView);
        var domElem = componentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
        this.dialogComponentRef = componentRef;
        return dialogRef;
    };
    DialogService.prototype.removeDialogComponentFromBody = function () {
        this.appRef.detachView(this.dialogComponentRef.hostView);
        this.dialogComponentRef.destroy();
    };
    DialogService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: Injector }
    ]; };
    DialogService = __decorate([
        Injectable()
    ], DialogService);
    return DialogService;
}());
export { DialogService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvZHluYW1pY2RpYWxvZy8iLCJzb3VyY2VzIjpbImRpYWxvZ3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3ZEO0lBSUksdUJBQW9CLHdCQUFrRCxFQUFVLE1BQXNCLEVBQVUsUUFBa0I7UUFBOUcsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtJQUFJLENBQUM7SUFFaEksNEJBQUksR0FBWCxVQUFZLGFBQXdCLEVBQUUsTUFBMkI7UUFDN0QsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEdBQUcsYUFBYSxDQUFDO1FBRXBFLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFTyxtREFBMkIsR0FBbkMsVUFBb0MsTUFBMkI7UUFBL0QsaUJBdUJDO1FBdEJHLElBQU0sR0FBRyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVyQyxJQUFNLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVyQyxJQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUNwQyxLQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztZQUNyQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3ZHLElBQU0sWUFBWSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUU1RixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUMsSUFBTSxPQUFPLEdBQUksWUFBWSxDQUFDLFFBQWlDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUM1RixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBWSxDQUFDO1FBRXZDLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFTyxxREFBNkIsR0FBckM7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RDLENBQUM7O2dCQXRDNkMsd0JBQXdCO2dCQUFrQixjQUFjO2dCQUFvQixRQUFROztJQUp6SCxhQUFhO1FBRHpCLFVBQVUsRUFBRTtPQUNBLGFBQWEsQ0EyQ3pCO0lBQUQsb0JBQUM7Q0FBQSxBQTNDRCxJQTJDQztTQTNDWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBBcHBsaWNhdGlvblJlZiwgSW5qZWN0b3IsIFR5cGUsIEVtYmVkZGVkVmlld1JlZiwgQ29tcG9uZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEeW5hbWljRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9keW5hbWljZGlhbG9nJztcbmltcG9ydCB7IER5bmFtaWNEaWFsb2dJbmplY3RvciB9IGZyb20gJy4vZHluYW1pY2RpYWxvZy1pbmplY3Rvcic7XG5pbXBvcnQgeyBEeW5hbWljRGlhbG9nQ29uZmlnIH0gZnJvbSAnLi9keW5hbWljZGlhbG9nLWNvbmZpZyc7XG5pbXBvcnQgeyBEeW5hbWljRGlhbG9nUmVmIH0gZnJvbSAnLi9keW5hbWljZGlhbG9nLXJlZic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBEaWFsb2dTZXJ2aWNlIHtcbiAgICBcbiAgICBkaWFsb2dDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxEeW5hbWljRGlhbG9nQ29tcG9uZW50PjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHsgfVxuXG4gICAgcHVibGljIG9wZW4oY29tcG9uZW50VHlwZTogVHlwZTxhbnk+LCBjb25maWc6IER5bmFtaWNEaWFsb2dDb25maWcpIHtcbiAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5hcHBlbmREaWFsb2dDb21wb25lbnRUb0JvZHkoY29uZmlnKTtcblxuICAgICAgICB0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZi5pbnN0YW5jZS5jaGlsZENvbXBvbmVudFR5cGUgPSBjb21wb25lbnRUeXBlO1xuXG4gICAgICAgIHJldHVybiBkaWFsb2dSZWY7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBlbmREaWFsb2dDb21wb25lbnRUb0JvZHkoY29uZmlnOiBEeW5hbWljRGlhbG9nQ29uZmlnKSB7XG4gICAgICAgIGNvbnN0IG1hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIG1hcC5zZXQoRHluYW1pY0RpYWxvZ0NvbmZpZywgY29uZmlnKTtcblxuICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSBuZXcgRHluYW1pY0RpYWxvZ1JlZigpO1xuICAgICAgICBtYXAuc2V0KER5bmFtaWNEaWFsb2dSZWYsIGRpYWxvZ1JlZik7XG5cbiAgICAgICAgY29uc3Qgc3ViID0gZGlhbG9nUmVmLm9uQ2xvc2Uuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRGlhbG9nQ29tcG9uZW50RnJvbUJvZHkoKTtcbiAgICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoRHluYW1pY0RpYWxvZ0NvbXBvbmVudCk7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKG5ldyBEeW5hbWljRGlhbG9nSW5qZWN0b3IodGhpcy5pbmplY3RvciwgbWFwKSk7XG5cbiAgICAgICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuXG4gICAgICAgIGNvbnN0IGRvbUVsZW0gPSAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9tRWxlbSk7XG5cbiAgICAgICAgdGhpcy5kaWFsb2dDb21wb25lbnRSZWYgPSBjb21wb25lbnRSZWY7XG5cbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZURpYWxvZ0NvbXBvbmVudEZyb21Cb2R5KCkge1xuICAgICAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHRoaXMuZGlhbG9nQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcbiAgICAgICAgdGhpcy5kaWFsb2dDb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgIH1cbn1cbiJdfQ==