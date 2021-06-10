(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('primeng/api', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.api = {}), global.ng.core, global.rxjs, global.ng.common));
}(this, (function (exports, core, rxjs, common) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var ConfirmationService = /** @class */ (function () {
        function ConfirmationService() {
            this.requireConfirmationSource = new rxjs.Subject();
            this.acceptConfirmationSource = new rxjs.Subject();
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
            core.Injectable()
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
            this.messageSource = new rxjs.Subject();
            this.clearSource = new rxjs.Subject();
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
            core.Injectable()
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
            core.Component({
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
            core.Component({
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
            { type: core.TemplateRef }
        ]; };
        __decorate$2([
            core.Input()
        ], PrimeTemplate.prototype, "type", void 0);
        __decorate$2([
            core.Input('pTemplate')
        ], PrimeTemplate.prototype, "name", void 0);
        PrimeTemplate = __decorate$2([
            core.Directive({
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
            core.NgModule({
                imports: [common.CommonModule],
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
            this.dragStartSource = new rxjs.Subject();
            this.dragStopSource = new rxjs.Subject();
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
            core.Injectable()
        ], TreeDragDropService);
        return TreeDragDropService;
    }());

    exports.ConfirmationService = ConfirmationService;
    exports.Footer = Footer;
    exports.Header = Header;
    exports.MessageService = MessageService;
    exports.PrimeTemplate = PrimeTemplate;
    exports.SharedModule = SharedModule;
    exports.TreeDragDropService = TreeDragDropService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-api.umd.js.map
