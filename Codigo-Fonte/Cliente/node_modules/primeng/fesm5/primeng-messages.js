import { EventEmitter, Optional, Input, Output, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var Messages = /** @class */ (function () {
    function Messages(messageService) {
        this.messageService = messageService;
        this.closable = true;
        this.enableService = true;
        this.escape = true;
        this.showTransitionOptions = '300ms ease-out';
        this.hideTransitionOptions = '250ms ease-in';
        this.valueChange = new EventEmitter();
    }
    Messages.prototype.ngOnInit = function () {
        var _this = this;
        if (this.messageService && this.enableService) {
            this.messageSubscription = this.messageService.messageObserver.subscribe(function (messages) {
                if (messages) {
                    if (messages instanceof Array) {
                        var filteredMessages = messages.filter(function (m) { return _this.key === m.key; });
                        _this.value = _this.value ? __spread(_this.value, filteredMessages) : __spread(filteredMessages);
                    }
                    else if (_this.key === messages.key) {
                        _this.value = _this.value ? __spread(_this.value, [messages]) : [messages];
                    }
                }
            });
            this.clearSubscription = this.messageService.clearObserver.subscribe(function (key) {
                if (key) {
                    if (_this.key === key) {
                        _this.value = null;
                    }
                }
                else {
                    _this.value = null;
                }
            });
        }
    };
    Messages.prototype.hasMessages = function () {
        return this.value && this.value.length > 0;
    };
    Messages.prototype.getSeverityClass = function () {
        return this.value[0].severity;
    };
    Messages.prototype.clear = function (event) {
        this.value = [];
        this.valueChange.emit(this.value);
        event.preventDefault();
    };
    Object.defineProperty(Messages.prototype, "icon", {
        get: function () {
            var icon = null;
            if (this.hasMessages()) {
                var msg = this.value[0];
                switch (msg.severity) {
                    case 'success':
                        icon = 'pi-check';
                        break;
                    case 'info':
                        icon = 'pi-info-circle';
                        break;
                    case 'error':
                        icon = 'pi-times';
                        break;
                    case 'warn':
                        icon = 'pi-exclamation-triangle';
                        break;
                    default:
                        icon = 'pi-info-circle';
                        break;
                }
            }
            return icon;
        },
        enumerable: true,
        configurable: true
    });
    Messages.prototype.ngOnDestroy = function () {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
    };
    Messages.ctorParameters = function () { return [
        { type: MessageService, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        Input()
    ], Messages.prototype, "value", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "closable", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "style", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "enableService", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "key", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "escape", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "showTransitionOptions", void 0);
    __decorate([
        Input()
    ], Messages.prototype, "hideTransitionOptions", void 0);
    __decorate([
        Output()
    ], Messages.prototype, "valueChange", void 0);
    Messages = __decorate([
        Component({
            selector: 'p-messages',
            template: "\n        <div *ngIf=\"hasMessages()\" class=\"ui-messages ui-widget ui-corner-all\"\n                    [ngClass]=\"{'ui-messages-info':(value[0].severity === 'info'),\n                    'ui-messages-warn':(value[0].severity === 'warn'),\n                    'ui-messages-error':(value[0].severity === 'error'),\n                    'ui-messages-success':(value[0].severity === 'success')}\" role=\"alert\"\n                    [ngStyle]=\"style\" [class]=\"styleClass\" [@messageAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\">\n            <a tabindex=\"0\" class=\"ui-messages-close\" (click)=\"clear($event)\" (keydown.enter)=\"clear($event)\" *ngIf=\"closable\">\n                <i class=\"pi pi-times\"></i>\n            </a>\n            <span class=\"ui-messages-icon pi\" [ngClass]=\"icon\"></span>\n            <ul>\n                <li *ngFor=\"let msg of value\">\n                    <div *ngIf=\"!escape; else escapeOut\">\n                        <span *ngIf=\"msg.summary\" class=\"ui-messages-summary\" [innerHTML]=\"msg.summary\"></span>\n                        <span *ngIf=\"msg.detail\" class=\"ui-messages-detail\" [innerHTML]=\"msg.detail\"></span>\n                    </div>\n                    <ng-template #escapeOut> \n                        <span *ngIf=\"msg.summary\" class=\"ui-messages-summary\">{{msg.summary}}</span>\n                        <span *ngIf=\"msg.detail\" class=\"ui-messages-detail\">{{msg.detail}}</span>\n                    </ng-template>\n                </li>\n            </ul>\n        </div>\n    ",
            animations: [
                trigger('messageAnimation', [
                    state('visible', style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    transition('void => *', [
                        style({ transform: 'translateY(-25%)', opacity: 0 }),
                        animate('{{showTransitionParams}}')
                    ]),
                    transition('* => void', [
                        animate(('{{hideTransitionParams}}'), style({
                            opacity: 0,
                            transform: 'translateY(-25%)'
                        }))
                    ])
                ])
            ]
        }),
        __param(0, Optional())
    ], Messages);
    return Messages;
}());
var MessagesModule = /** @class */ (function () {
    function MessagesModule() {
    }
    MessagesModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Messages],
            declarations: [Messages]
        })
    ], MessagesModule);
    return MessagesModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Messages, MessagesModule };
//# sourceMappingURL=primeng-messages.js.map
