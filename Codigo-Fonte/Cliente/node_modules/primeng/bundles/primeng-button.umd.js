(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('primeng/dom'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/button', ['exports', '@angular/core', 'primeng/dom', '@angular/common'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.button = {}), global.ng.core, global.primeng.dom, global.ng.common));
}(this, (function (exports, core, dom, common) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var ButtonDirective = /** @class */ (function () {
        function ButtonDirective(el) {
            this.el = el;
            this.iconPos = 'left';
            this.cornerStyleClass = 'ui-corner-all';
        }
        ButtonDirective.prototype.ngAfterViewInit = function () {
            dom.DomHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
            if (this.icon) {
                var iconElement = document.createElement("span");
                iconElement.setAttribute("aria-hidden", "true");
                var iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
                iconElement.className = iconPosClass + ' ui-clickable ' + this.icon;
                this.el.nativeElement.appendChild(iconElement);
            }
            var labelElement = document.createElement("span");
            labelElement.className = 'ui-button-text ui-clickable';
            labelElement.appendChild(document.createTextNode(this.label || 'ui-btn'));
            this.el.nativeElement.appendChild(labelElement);
            this.initialized = true;
        };
        ButtonDirective.prototype.getStyleClass = function () {
            var styleClass = 'ui-button ui-widget ui-state-default ' + this.cornerStyleClass;
            if (this.icon) {
                if (this.label != null && this.label != undefined) {
                    if (this.iconPos == 'left')
                        styleClass = styleClass + ' ui-button-text-icon-left';
                    else
                        styleClass = styleClass + ' ui-button-text-icon-right';
                }
                else {
                    styleClass = styleClass + ' ui-button-icon-only';
                }
            }
            else {
                if (this.label) {
                    styleClass = styleClass + ' ui-button-text-only';
                }
                else {
                    styleClass = styleClass + ' ui-button-text-empty';
                }
            }
            return styleClass;
        };
        Object.defineProperty(ButtonDirective.prototype, "label", {
            get: function () {
                return this._label;
            },
            set: function (val) {
                this._label = val;
                if (this.initialized) {
                    dom.DomHandler.findSingle(this.el.nativeElement, '.ui-button-text').textContent = this._label;
                    if (!this.icon) {
                        if (this._label) {
                            dom.DomHandler.removeClass(this.el.nativeElement, 'ui-button-text-empty');
                            dom.DomHandler.addClass(this.el.nativeElement, 'ui-button-text-only');
                        }
                        else {
                            dom.DomHandler.addClass(this.el.nativeElement, 'ui-button-text-empty');
                            dom.DomHandler.removeClass(this.el.nativeElement, 'ui-button-text-only');
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ButtonDirective.prototype, "icon", {
            get: function () {
                return this._icon;
            },
            set: function (val) {
                this._icon = val;
                if (this.initialized) {
                    var iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
                    dom.DomHandler.findSingle(this.el.nativeElement, '.ui-clickable').className =
                        iconPosClass + ' ui-clickable ' + this.icon;
                }
            },
            enumerable: true,
            configurable: true
        });
        ButtonDirective.prototype.ngOnDestroy = function () {
            while (this.el.nativeElement.hasChildNodes()) {
                this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
            }
            this.initialized = false;
        };
        ButtonDirective.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], ButtonDirective.prototype, "iconPos", void 0);
        __decorate([
            core.Input()
        ], ButtonDirective.prototype, "cornerStyleClass", void 0);
        __decorate([
            core.Input()
        ], ButtonDirective.prototype, "label", null);
        __decorate([
            core.Input()
        ], ButtonDirective.prototype, "icon", null);
        ButtonDirective = __decorate([
            core.Directive({
                selector: '[pButton]'
            })
        ], ButtonDirective);
        return ButtonDirective;
    }());
    var Button = /** @class */ (function () {
        function Button() {
            this.iconPos = 'left';
            this.onClick = new core.EventEmitter();
            this.onFocus = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
        }
        __decorate([
            core.Input()
        ], Button.prototype, "type", void 0);
        __decorate([
            core.Input()
        ], Button.prototype, "iconPos", void 0);
        __decorate([
            core.Input()
        ], Button.prototype, "icon", void 0);
        __decorate([
            core.Input()
        ], Button.prototype, "label", void 0);
        __decorate([
            core.Input()
        ], Button.prototype, "disabled", void 0);
        __decorate([
            core.Input()
        ], Button.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], Button.prototype, "styleClass", void 0);
        __decorate([
            core.Output()
        ], Button.prototype, "onClick", void 0);
        __decorate([
            core.Output()
        ], Button.prototype, "onFocus", void 0);
        __decorate([
            core.Output()
        ], Button.prototype, "onBlur", void 0);
        Button = __decorate([
            core.Component({
                selector: 'p-button',
                template: "\n        <button [attr.type]=\"type\" [class]=\"styleClass\" [ngStyle]=\"style\" [disabled]=\"disabled\"\n            [ngClass]=\"{'ui-button ui-widget ui-state-default ui-corner-all':true,\n                        'ui-button-icon-only': (icon && !label),\n                        'ui-button-text-icon-left': (icon && label && iconPos === 'left'),\n                        'ui-button-text-icon-right': (icon && label && iconPos === 'right'),\n                        'ui-button-text-only': (!icon && label),\n                        'ui-button-text-empty': (!icon && !label),\n                        'ui-state-disabled': disabled}\"\n                        (click)=\"onClick.emit($event)\" (focus)=\"onFocus.emit($event)\" (blur)=\"onBlur.emit($event)\">\n            <ng-content></ng-content>\n            <span [ngClass]=\"{'ui-clickable': true,\n                        'ui-button-icon-left': (iconPos === 'left'), \n                        'ui-button-icon-right': (iconPos === 'right')}\"\n                        [class]=\"icon\" *ngIf=\"icon\"></span>\n            <span class=\"ui-button-text ui-clickable\">{{label||'ui-btn'}}</span>\n        </button>\n    "
            })
        ], Button);
        return Button;
    }());
    var ButtonModule = /** @class */ (function () {
        function ButtonModule() {
        }
        ButtonModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [ButtonDirective, Button],
                declarations: [ButtonDirective, Button]
            })
        ], ButtonModule);
        return ButtonModule;
    }());

    exports.Button = Button;
    exports.ButtonDirective = ButtonDirective;
    exports.ButtonModule = ButtonModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-button.umd.js.map
