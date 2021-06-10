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
let DialogService = class DialogService {
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    open(componentType, config) {
        const dialogRef = this.appendDialogComponentToBody(config);
        this.dialogComponentRef.instance.childComponentType = componentType;
        return dialogRef;
    }
    appendDialogComponentToBody(config) {
        const map = new WeakMap();
        map.set(DynamicDialogConfig, config);
        const dialogRef = new DynamicDialogRef();
        map.set(DynamicDialogRef, dialogRef);
        const sub = dialogRef.onClose.subscribe(() => {
            this.removeDialogComponentFromBody();
            sub.unsubscribe();
        });
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
        const componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));
        this.appRef.attachView(componentRef.hostView);
        const domElem = componentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
        this.dialogComponentRef = componentRef;
        return dialogRef;
    }
    removeDialogComponentFromBody() {
        this.appRef.detachView(this.dialogComponentRef.hostView);
        this.dialogComponentRef.destroy();
    }
};
DialogService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector }
];
DialogService = __decorate([
    Injectable()
], DialogService);
export { DialogService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvZHluYW1pY2RpYWxvZy8iLCJzb3VyY2VzIjpbImRpYWxvZ3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BJLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBR3ZELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFJdEIsWUFBb0Isd0JBQWtELEVBQVUsTUFBc0IsRUFBVSxRQUFrQjtRQUE5Ryw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUksQ0FBQztJQUVoSSxJQUFJLENBQUMsYUFBd0IsRUFBRSxNQUEyQjtRQUM3RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsMkJBQTJCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxhQUFhLENBQUM7UUFFcEUsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVPLDJCQUEyQixDQUFDLE1BQTJCO1FBQzNELE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVyQyxNQUFNLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVyQyxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekMsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUM7WUFDckMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN2RyxNQUFNLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFNUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTlDLE1BQU0sT0FBTyxHQUFJLFlBQVksQ0FBQyxRQUFpQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQWdCLENBQUM7UUFDNUYsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQztRQUV2QyxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU8sNkJBQTZCO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsQ0FBQztDQUNKLENBQUE7O1lBdkNpRCx3QkFBd0I7WUFBa0IsY0FBYztZQUFvQixRQUFROztBQUp6SCxhQUFhO0lBRHpCLFVBQVUsRUFBRTtHQUNBLGFBQWEsQ0EyQ3pCO1NBM0NZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEFwcGxpY2F0aW9uUmVmLCBJbmplY3RvciwgVHlwZSwgRW1iZWRkZWRWaWV3UmVmLCBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IER5bmFtaWNEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2R5bmFtaWNkaWFsb2cnO1xuaW1wb3J0IHsgRHluYW1pY0RpYWxvZ0luamVjdG9yIH0gZnJvbSAnLi9keW5hbWljZGlhbG9nLWluamVjdG9yJztcbmltcG9ydCB7IER5bmFtaWNEaWFsb2dDb25maWcgfSBmcm9tICcuL2R5bmFtaWNkaWFsb2ctY29uZmlnJztcbmltcG9ydCB7IER5bmFtaWNEaWFsb2dSZWYgfSBmcm9tICcuL2R5bmFtaWNkaWFsb2ctcmVmJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERpYWxvZ1NlcnZpY2Uge1xuICAgIFxuICAgIGRpYWxvZ0NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPER5bmFtaWNEaWFsb2dDb21wb25lbnQ+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLCBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcikgeyB9XG5cbiAgICBwdWJsaWMgb3Blbihjb21wb25lbnRUeXBlOiBUeXBlPGFueT4sIGNvbmZpZzogRHluYW1pY0RpYWxvZ0NvbmZpZykge1xuICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmFwcGVuZERpYWxvZ0NvbXBvbmVudFRvQm9keShjb25maWcpO1xuXG4gICAgICAgIHRoaXMuZGlhbG9nQ29tcG9uZW50UmVmLmluc3RhbmNlLmNoaWxkQ29tcG9uZW50VHlwZSA9IGNvbXBvbmVudFR5cGU7XG5cbiAgICAgICAgcmV0dXJuIGRpYWxvZ1JlZjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFwcGVuZERpYWxvZ0NvbXBvbmVudFRvQm9keShjb25maWc6IER5bmFtaWNEaWFsb2dDb25maWcpIHtcbiAgICAgICAgY29uc3QgbWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgbWFwLnNldChEeW5hbWljRGlhbG9nQ29uZmlnLCBjb25maWcpO1xuXG4gICAgICAgIGNvbnN0IGRpYWxvZ1JlZiA9IG5ldyBEeW5hbWljRGlhbG9nUmVmKCk7XG4gICAgICAgIG1hcC5zZXQoRHluYW1pY0RpYWxvZ1JlZiwgZGlhbG9nUmVmKTtcblxuICAgICAgICBjb25zdCBzdWIgPSBkaWFsb2dSZWYub25DbG9zZS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVEaWFsb2dDb21wb25lbnRGcm9tQm9keSgpO1xuICAgICAgICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShEeW5hbWljRGlhbG9nQ29tcG9uZW50KTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gY29tcG9uZW50RmFjdG9yeS5jcmVhdGUobmV3IER5bmFtaWNEaWFsb2dJbmplY3Rvcih0aGlzLmluamVjdG9yLCBtYXApKTtcblxuICAgICAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cbiAgICAgICAgY29uc3QgZG9tRWxlbSA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb21FbGVtKTtcblxuICAgICAgICB0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZiA9IGNvbXBvbmVudFJlZjtcblxuICAgICAgICByZXR1cm4gZGlhbG9nUmVmO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRGlhbG9nQ29tcG9uZW50RnJvbUJvZHkoKSB7XG4gICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5kaWFsb2dDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgICB0aGlzLmRpYWxvZ0NvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgfVxufVxuIl19