(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/rating', ['exports', '@angular/core', '@angular/common', '@angular/forms'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.rating = {}), global.ng.core, global.ng.common, global.ng.forms));
}(this, (function (exports, core, common, forms) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var RATING_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return Rating; }),
        multi: true
    };
    var Rating = /** @class */ (function () {
        function Rating(cd) {
            this.cd = cd;
            this.stars = 5;
            this.cancel = true;
            this.iconOnClass = 'pi pi-star';
            this.iconOffClass = 'pi pi-star-o';
            this.iconCancelClass = 'pi pi-ban';
            this.onRate = new core.EventEmitter();
            this.onCancel = new core.EventEmitter();
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
        }
        Rating.prototype.ngOnInit = function () {
            this.starsArray = [];
            for (var i = 0; i < this.stars; i++) {
                this.starsArray[i] = i;
            }
        };
        Rating.prototype.rate = function (event, i) {
            if (!this.readonly && !this.disabled) {
                this.value = (i + 1);
                this.onModelChange(this.value);
                this.onModelTouched();
                this.onRate.emit({
                    originalEvent: event,
                    value: (i + 1)
                });
            }
            event.preventDefault();
        };
        Rating.prototype.clear = function (event) {
            if (!this.readonly && !this.disabled) {
                this.value = null;
                this.onModelChange(this.value);
                this.onModelTouched();
                this.onCancel.emit(event);
            }
            event.preventDefault();
        };
        Rating.prototype.writeValue = function (value) {
            this.value = value;
            this.cd.detectChanges();
        };
        Rating.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        Rating.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        Rating.prototype.setDisabledState = function (val) {
            this.disabled = val;
        };
        Rating.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], Rating.prototype, "disabled", void 0);
        __decorate([
            core.Input()
        ], Rating.prototype, "readonly", void 0);
        __decorate([
            core.Input()
        ], Rating.prototype, "stars", void 0);
        __decorate([
            core.Input()
        ], Rating.prototype, "cancel", void 0);
        __decorate([
            core.Input()
        ], Rating.prototype, "iconOnClass", void 0);
        __decorate([
            core.Input()
        ], Rating.prototype, "iconOnStyle", void 0);
        __decorate([
            core.Input()
        ], Rating.prototype, "iconOffClass", void 0);
        __decorate([
            core.Input()
        ], Rating.prototype, "iconOffStyle", void 0);
        __decorate([
            core.Input()
        ], Rating.prototype, "iconCancelClass", void 0);
        __decorate([
            core.Input()
        ], Rating.prototype, "iconCancelStyle", void 0);
        __decorate([
            core.Output()
        ], Rating.prototype, "onRate", void 0);
        __decorate([
            core.Output()
        ], Rating.prototype, "onCancel", void 0);
        Rating = __decorate([
            core.Component({
                selector: 'p-rating',
                template: "\n        <div class=\"ui-rating\" [ngClass]=\"{'ui-state-disabled': disabled}\">\n            <a [attr.tabindex]=\"disabled ? null : '0'\" *ngIf=\"cancel\" (click)=\"clear($event)\" (keydown.enter)=\"clear($event)\"  class=\"ui-rating-cancel\">\n                <span class=\"ui-rating-icon\" [ngClass]=\"iconCancelClass\" [ngStyle]=\"iconCancelStyle\"></span>\n            </a>\n            <a [attr.tabindex]=\"disabled ? null : '0'\" *ngFor=\"let star of starsArray;let i=index\" (click)=\"rate($event,i)\" (keydown.enter)=\"rate($event,i)\">\n                <span class=\"ui-rating-icon\" \n                    [ngClass]=\"(!value || i >= value) ? iconOffClass : iconOnClass\"\n                    [ngStyle]=\"(!value || i >= value) ? iconOffStyle : iconOnStyle\"\n                ></span>\n            </a>\n        </div>\n    ",
                providers: [RATING_VALUE_ACCESSOR]
            })
        ], Rating);
        return Rating;
    }());
    var RatingModule = /** @class */ (function () {
        function RatingModule() {
        }
        RatingModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [Rating],
                declarations: [Rating]
            })
        ], RatingModule);
        return RatingModule;
    }());

    exports.RATING_VALUE_ACCESSOR = RATING_VALUE_ACCESSOR;
    exports.Rating = Rating;
    exports.RatingModule = RatingModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-rating.umd.js.map
