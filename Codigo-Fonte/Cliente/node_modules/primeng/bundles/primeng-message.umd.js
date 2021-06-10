(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/message', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.message = {}), global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var UIMessage = /** @class */ (function () {
        function UIMessage() {
            this.escape = true;
        }
        Object.defineProperty(UIMessage.prototype, "icon", {
            get: function () {
                var icon = null;
                if (this.severity) {
                    switch (this.severity) {
                        case 'success':
                            icon = 'pi pi-check';
                            break;
                        case 'info':
                            icon = 'pi pi-info-circle';
                            break;
                        case 'error':
                            icon = 'pi pi-times';
                            break;
                        case 'warn':
                            icon = 'pi pi-exclamation-triangle';
                            break;
                        default:
                            icon = 'pi pi-info-circle';
                            break;
                    }
                }
                return icon;
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            core.Input()
        ], UIMessage.prototype, "severity", void 0);
        __decorate([
            core.Input()
        ], UIMessage.prototype, "text", void 0);
        __decorate([
            core.Input()
        ], UIMessage.prototype, "escape", void 0);
        UIMessage = __decorate([
            core.Component({
                selector: 'p-message',
                template: "\n        <div aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all\" *ngIf=\"severity\"\n        [ngClass]=\"{'ui-message-info': (severity === 'info'),\n                'ui-message-warn': (severity === 'warn'),\n                'ui-message-error': (severity === 'error'),\n                'ui-message-success': (severity === 'success')}\">\n            <span class=\"ui-message-icon\" [ngClass]=\"icon\"></span>\n            <div *ngIf=\"!escape; else escapeOut\">\n                <span *ngIf=\"!escape\" class=\"ui-message-text\" [innerHTML]=\"text\"></span>\n            </div>\n            <ng-template #escapeOut>\n                <span *ngIf=\"escape\" class=\"ui-message-text\">{{text}}</span>\n            </ng-template>\n        </div>\n    "
            })
        ], UIMessage);
        return UIMessage;
    }());
    var MessageModule = /** @class */ (function () {
        function MessageModule() {
        }
        MessageModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [UIMessage],
                declarations: [UIMessage]
            })
        ], MessageModule);
        return MessageModule;
    }());

    exports.MessageModule = MessageModule;
    exports.UIMessage = UIMessage;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-message.umd.js.map
