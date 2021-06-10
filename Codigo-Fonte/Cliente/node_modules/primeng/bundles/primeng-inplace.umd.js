(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/button')) :
    typeof define === 'function' && define.amd ? define('primeng/inplace', ['exports', '@angular/core', '@angular/common', 'primeng/button'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.inplace = {}), global.ng.core, global.ng.common, global.primeng.button));
}(this, (function (exports, core, common, button) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var InplaceDisplay = /** @class */ (function () {
        function InplaceDisplay() {
        }
        InplaceDisplay = __decorate([
            core.Component({
                selector: 'p-inplaceDisplay',
                template: '<ng-content></ng-content>'
            })
        ], InplaceDisplay);
        return InplaceDisplay;
    }());
    var InplaceContent = /** @class */ (function () {
        function InplaceContent() {
        }
        InplaceContent = __decorate([
            core.Component({
                selector: 'p-inplaceContent',
                template: '<ng-content></ng-content>'
            })
        ], InplaceContent);
        return InplaceContent;
    }());
    var Inplace = /** @class */ (function () {
        function Inplace() {
            this.onActivate = new core.EventEmitter();
            this.onDeactivate = new core.EventEmitter();
        }
        Inplace.prototype.activate = function (event) {
            if (!this.disabled) {
                this.active = true;
                this.onActivate.emit(event);
            }
        };
        Inplace.prototype.deactivate = function (event) {
            if (!this.disabled) {
                this.active = false;
                this.hover = false;
                this.onDeactivate.emit(event);
            }
        };
        Inplace.prototype.onKeydown = function (event) {
            if (event.which === 13) {
                this.activate(event);
                event.preventDefault();
            }
        };
        __decorate([
            core.Input()
        ], Inplace.prototype, "active", void 0);
        __decorate([
            core.Input()
        ], Inplace.prototype, "closable", void 0);
        __decorate([
            core.Input()
        ], Inplace.prototype, "disabled", void 0);
        __decorate([
            core.Input()
        ], Inplace.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], Inplace.prototype, "styleClass", void 0);
        __decorate([
            core.Output()
        ], Inplace.prototype, "onActivate", void 0);
        __decorate([
            core.Output()
        ], Inplace.prototype, "onDeactivate", void 0);
        Inplace = __decorate([
            core.Component({
                selector: 'p-inplace',
                template: "\n        <div [ngClass]=\"{'ui-inplace ui-widget': true, 'ui-inplace-closable': closable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-inplace-display\" (click)=\"activate($event)\" tabindex=\"0\" (keydown)=\"onKeydown($event)\"   \n                [ngClass]=\"{'ui-state-disabled':disabled}\" *ngIf=\"!active\">\n                <ng-content select=\"[pInplaceDisplay]\"></ng-content>\n            </div>\n            <div class=\"ui-inplace-content\" *ngIf=\"active\">\n                <ng-content select=\"[pInplaceContent]\"></ng-content>\n                <button type=\"button\" icon=\"pi pi-times\" pButton (click)=\"deactivate($event)\" *ngIf=\"closable\"></button>\n            </div>\n        </div>\n    "
            })
        ], Inplace);
        return Inplace;
    }());
    var InplaceModule = /** @class */ (function () {
        function InplaceModule() {
        }
        InplaceModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, button.ButtonModule],
                exports: [Inplace, InplaceDisplay, InplaceContent, button.ButtonModule],
                declarations: [Inplace, InplaceDisplay, InplaceContent]
            })
        ], InplaceModule);
        return InplaceModule;
    }());

    exports.Inplace = Inplace;
    exports.InplaceContent = InplaceContent;
    exports.InplaceDisplay = InplaceDisplay;
    exports.InplaceModule = InplaceModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-inplace.umd.js.map
