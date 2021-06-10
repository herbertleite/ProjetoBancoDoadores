import { EventEmitter, Input, Output, ViewChild, Component, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { MessageService, PrimeTemplate, SharedModule } from 'primeng/api';
import { trigger, state, style, transition, animate, query, animateChild } from '@angular/animations';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var ToastItem = /** @class */ (function () {
    function ToastItem() {
        this.onClose = new EventEmitter();
    }
    ToastItem.prototype.ngAfterViewInit = function () {
        this.initTimeout();
    };
    ToastItem.prototype.initTimeout = function () {
        var _this = this;
        if (!this.message.sticky) {
            this.timeout = setTimeout(function () {
                _this.onClose.emit({
                    index: _this.index,
                    message: _this.message
                });
            }, this.message.life || 3000);
        }
    };
    ToastItem.prototype.clearTimeout = function () {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    };
    ToastItem.prototype.onMouseEnter = function () {
        this.clearTimeout();
    };
    ToastItem.prototype.onMouseLeave = function () {
        this.initTimeout();
    };
    ToastItem.prototype.onCloseIconClick = function (event) {
        this.clearTimeout();
        this.onClose.emit({
            index: this.index,
            message: this.message
        });
        event.preventDefault();
    };
    ToastItem.prototype.ngOnDestroy = function () {
        this.clearTimeout();
    };
    __decorate([
        Input()
    ], ToastItem.prototype, "message", void 0);
    __decorate([
        Input()
    ], ToastItem.prototype, "index", void 0);
    __decorate([
        Input()
    ], ToastItem.prototype, "template", void 0);
    __decorate([
        Input()
    ], ToastItem.prototype, "showTransitionOptions", void 0);
    __decorate([
        Input()
    ], ToastItem.prototype, "hideTransitionOptions", void 0);
    __decorate([
        Output()
    ], ToastItem.prototype, "onClose", void 0);
    __decorate([
        ViewChild('container', { static: true })
    ], ToastItem.prototype, "containerViewChild", void 0);
    ToastItem = __decorate([
        Component({
            selector: 'p-toastItem',
            template: "\n        <div #container class=\"ui-toast-message ui-shadow\" [@messageState]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\"\n            [ngClass]=\"{'ui-toast-message-info': message.severity == 'info','ui-toast-message-warn': message.severity == 'warn',\n                'ui-toast-message-error': message.severity == 'error','ui-toast-message-success': message.severity == 'success'}\"\n                (mouseenter)=\"onMouseEnter()\" (mouseleave)=\"onMouseLeave()\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">\n            <div class=\"ui-toast-message-content\">\n                <a tabindex=\"0\" class=\"ui-toast-close-icon pi pi-times\" (click)=\"onCloseIconClick($event)\" (keydown.enter)=\"onCloseIconClick($event)\" *ngIf=\"message.closable !== false\"></a>\n                <ng-container *ngIf=\"!template\">\n                    <span class=\"ui-toast-icon pi\"\n                        [ngClass]=\"{'pi-info-circle': message.severity == 'info', 'pi-exclamation-triangle': message.severity == 'warn',\n                            'pi-times': message.severity == 'error', 'pi-check' :message.severity == 'success'}\"></span>\n                    <div class=\"ui-toast-message-text-content\">\n                        <div class=\"ui-toast-summary\">{{message.summary}}</div>\n                        <div class=\"ui-toast-detail\">{{message.detail}}</div>\n                    </div>\n                </ng-container>\n                <ng-container *ngTemplateOutlet=\"template; context: {$implicit: message}\"></ng-container>\n            </div>\n        </div>\n    ",
            animations: [
                trigger('messageState', [
                    state('visible', style({
                        transform: 'translateY(0)',
                        opacity: 1
                    })),
                    transition('void => *', [
                        style({ transform: 'translateY(100%)', opacity: 0 }),
                        animate('{{showTransitionParams}}')
                    ]),
                    transition('* => void', [
                        animate(('{{hideTransitionParams}}'), style({
                            height: 0,
                            opacity: 0,
                            transform: 'translateY(-100%)'
                        }))
                    ])
                ])
            ]
        })
    ], ToastItem);
    return ToastItem;
}());
var Toast = /** @class */ (function () {
    function Toast(messageService) {
        this.messageService = messageService;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.position = 'top-right';
        this.showTransitionOptions = '300ms ease-out';
        this.hideTransitionOptions = '250ms ease-in';
        this.onClose = new EventEmitter();
    }
    Toast.prototype.ngOnInit = function () {
        var _this = this;
        this.messageSubscription = this.messageService.messageObserver.subscribe(function (messages) {
            if (messages) {
                if (messages instanceof Array) {
                    var filteredMessages = messages.filter(function (m) { return _this.key === m.key; });
                    _this.messages = _this.messages ? __spread(_this.messages, filteredMessages) : __spread(filteredMessages);
                }
                else if (_this.key === messages.key) {
                    _this.messages = _this.messages ? __spread(_this.messages, [messages]) : [messages];
                }
                if (_this.modal && _this.messages && _this.messages.length) {
                    _this.enableModality();
                }
            }
        });
        this.clearSubscription = this.messageService.clearObserver.subscribe(function (key) {
            if (key) {
                if (_this.key === key) {
                    _this.messages = null;
                }
            }
            else {
                _this.messages = null;
            }
            if (_this.modal) {
                _this.disableModality();
            }
        });
    };
    Toast.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'message':
                    _this.template = item.template;
                    break;
                default:
                    _this.template = item.template;
                    break;
            }
        });
    };
    Toast.prototype.onMessageClose = function (event) {
        this.messages.splice(event.index, 1);
        if (this.messages.length === 0) {
            this.disableModality();
        }
        this.onClose.emit({
            message: event.message
        });
    };
    Toast.prototype.enableModality = function () {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.containerViewChild.nativeElement.style.zIndex) - 1);
            var maskStyleClass = 'ui-widget-overlay ui-dialog-mask';
            DomHandler.addMultipleClasses(this.mask, maskStyleClass);
            document.body.appendChild(this.mask);
        }
    };
    Toast.prototype.disableModality = function () {
        if (this.mask) {
            document.body.removeChild(this.mask);
            this.mask = null;
        }
    };
    Toast.prototype.onAnimationStart = function (event) {
        if (event.fromState === 'void' && this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    };
    Toast.prototype.ngOnDestroy = function () {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
        this.disableModality();
    };
    Toast.ctorParameters = function () { return [
        { type: MessageService }
    ]; };
    __decorate([
        Input()
    ], Toast.prototype, "key", void 0);
    __decorate([
        Input()
    ], Toast.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], Toast.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], Toast.prototype, "style", void 0);
    __decorate([
        Input()
    ], Toast.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Toast.prototype, "position", void 0);
    __decorate([
        Input()
    ], Toast.prototype, "modal", void 0);
    __decorate([
        Input()
    ], Toast.prototype, "showTransitionOptions", void 0);
    __decorate([
        Input()
    ], Toast.prototype, "hideTransitionOptions", void 0);
    __decorate([
        Output()
    ], Toast.prototype, "onClose", void 0);
    __decorate([
        ViewChild('container', { static: true })
    ], Toast.prototype, "containerViewChild", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], Toast.prototype, "templates", void 0);
    Toast = __decorate([
        Component({
            selector: 'p-toast',
            template: "\n        <div #container [ngClass]=\"{'ui-toast ui-widget': true, \n                'ui-toast-top-right': position === 'top-right',\n                'ui-toast-top-left': position === 'top-left',\n                'ui-toast-bottom-right': position === 'bottom-right',\n                'ui-toast-bottom-left': position === 'bottom-left',\n                'ui-toast-top-center': position === 'top-center',\n                'ui-toast-bottom-center': position === 'bottom-center',\n                'ui-toast-center': position === 'center'}\" \n                [ngStyle]=\"style\" [class]=\"styleClass\">\n            <p-toastItem *ngFor=\"let msg of messages; let i=index\" [message]=\"msg\" [index]=\"i\" (onClose)=\"onMessageClose($event)\"\n                    [template]=\"template\" @toastAnimation (@toastAnimation.start)=\"onAnimationStart($event)\" [showTransitionOptions]=\"showTransitionOptions\" [hideTransitionOptions]=\"hideTransitionOptions\"></p-toastItem>\n        </div>\n    ",
            animations: [
                trigger('toastAnimation', [
                    transition(':enter, :leave', [
                        query('@*', animateChild())
                    ])
                ])
            ]
        })
    ], Toast);
    return Toast;
}());
var ToastModule = /** @class */ (function () {
    function ToastModule() {
    }
    ToastModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Toast, SharedModule],
            declarations: [Toast, ToastItem]
        })
    ], ToastModule);
    return ToastModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Toast, ToastItem, ToastModule };
//# sourceMappingURL=primeng-toast.js.map
