import { Injectable, Component, TemplateRef, Input, Directive, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ConfirmationService = /** @class */ (function () {
    function ConfirmationService() {
        this.requireConfirmationSource = new Subject();
        this.acceptConfirmationSource = new Subject();
        this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
        this.accept = this.acceptConfirmationSource.asObservable();
    }
    ConfirmationService.prototype.confirm = function (confirmation) {
        this.requireConfirmationSource.next(confirmation);
        return this;
    };
    ConfirmationService.prototype.onAccept = function () {
        this.acceptConfirmationSource.next();
    };
    ConfirmationService = __decorate([
        Injectable()
    ], ConfirmationService);
    return ConfirmationService;
}());

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MessageService = /** @class */ (function () {
    function MessageService() {
        this.messageSource = new Subject();
        this.clearSource = new Subject();
        this.messageObserver = this.messageSource.asObservable();
        this.clearObserver = this.clearSource.asObservable();
    }
    MessageService.prototype.add = function (message) {
        if (message) {
            this.messageSource.next(message);
        }
    };
    MessageService.prototype.addAll = function (messages) {
        if (messages && messages.length) {
            this.messageSource.next(messages);
        }
    };
    MessageService.prototype.clear = function (key) {
        this.clearSource.next(key || null);
    };
    MessageService = __decorate$1([
        Injectable()
    ], MessageService);
    return MessageService;
}());

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Header = /** @class */ (function () {
    function Header() {
    }
    Header = __decorate$2([
        Component({
            selector: 'p-header',
            template: '<ng-content></ng-content>'
        })
    ], Header);
    return Header;
}());
var Footer = /** @class */ (function () {
    function Footer() {
    }
    Footer = __decorate$2([
        Component({
            selector: 'p-footer',
            template: '<ng-content></ng-content>'
        })
    ], Footer);
    return Footer;
}());
var PrimeTemplate = /** @class */ (function () {
    function PrimeTemplate(template) {
        this.template = template;
    }
    PrimeTemplate.prototype.getType = function () {
        return this.name;
    };
    PrimeTemplate.ctorParameters = function () { return [
        { type: TemplateRef }
    ]; };
    __decorate$2([
        Input()
    ], PrimeTemplate.prototype, "type", void 0);
    __decorate$2([
        Input('pTemplate')
    ], PrimeTemplate.prototype, "name", void 0);
    PrimeTemplate = __decorate$2([
        Directive({
            selector: '[pTemplate]',
            host: {}
        })
    ], PrimeTemplate);
    return PrimeTemplate;
}());
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate$2([
        NgModule({
            imports: [CommonModule],
            exports: [Header, Footer, PrimeTemplate],
            declarations: [Header, Footer, PrimeTemplate]
        })
    ], SharedModule);
    return SharedModule;
}());

var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TreeDragDropService = /** @class */ (function () {
    function TreeDragDropService() {
        this.dragStartSource = new Subject();
        this.dragStopSource = new Subject();
        this.dragStart$ = this.dragStartSource.asObservable();
        this.dragStop$ = this.dragStopSource.asObservable();
    }
    TreeDragDropService.prototype.startDrag = function (event) {
        this.dragStartSource.next(event);
    };
    TreeDragDropService.prototype.stopDrag = function (event) {
        this.dragStopSource.next(event);
    };
    TreeDragDropService = __decorate$3([
        Injectable()
    ], TreeDragDropService);
    return TreeDragDropService;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { ConfirmationService, Footer, Header, MessageService, PrimeTemplate, SharedModule, TreeDragDropService };
//# sourceMappingURL=primeng-api.js.map
