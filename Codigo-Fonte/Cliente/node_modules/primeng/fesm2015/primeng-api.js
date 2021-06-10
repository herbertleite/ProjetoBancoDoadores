import { Injectable, Component, TemplateRef, Input, Directive, NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let ConfirmationService = class ConfirmationService {
    constructor() {
        this.requireConfirmationSource = new Subject();
        this.acceptConfirmationSource = new Subject();
        this.requireConfirmation$ = this.requireConfirmationSource.asObservable();
        this.accept = this.acceptConfirmationSource.asObservable();
    }
    confirm(confirmation) {
        this.requireConfirmationSource.next(confirmation);
        return this;
    }
    onAccept() {
        this.acceptConfirmationSource.next();
    }
};
ConfirmationService = __decorate([
    Injectable()
], ConfirmationService);

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let MessageService = class MessageService {
    constructor() {
        this.messageSource = new Subject();
        this.clearSource = new Subject();
        this.messageObserver = this.messageSource.asObservable();
        this.clearObserver = this.clearSource.asObservable();
    }
    add(message) {
        if (message) {
            this.messageSource.next(message);
        }
    }
    addAll(messages) {
        if (messages && messages.length) {
            this.messageSource.next(messages);
        }
    }
    clear(key) {
        this.clearSource.next(key || null);
    }
};
MessageService = __decorate$1([
    Injectable()
], MessageService);

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Header = class Header {
};
Header = __decorate$2([
    Component({
        selector: 'p-header',
        template: '<ng-content></ng-content>'
    })
], Header);
let Footer = class Footer {
};
Footer = __decorate$2([
    Component({
        selector: 'p-footer',
        template: '<ng-content></ng-content>'
    })
], Footer);
let PrimeTemplate = class PrimeTemplate {
    constructor(template) {
        this.template = template;
    }
    getType() {
        return this.name;
    }
};
PrimeTemplate.ctorParameters = () => [
    { type: TemplateRef }
];
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
let SharedModule = class SharedModule {
};
SharedModule = __decorate$2([
    NgModule({
        imports: [CommonModule],
        exports: [Header, Footer, PrimeTemplate],
        declarations: [Header, Footer, PrimeTemplate]
    })
], SharedModule);

var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
TreeDragDropService = __decorate$3([
    Injectable()
], TreeDragDropService);

/**
 * Generated bundle index. Do not edit.
 */

export { ConfirmationService, Footer, Header, MessageService, PrimeTemplate, SharedModule, TreeDragDropService };
//# sourceMappingURL=primeng-api.js.map
