(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('primeng/dom'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('primeng/terminal', ['exports', '@angular/core', '@angular/forms', '@angular/common', 'primeng/dom', 'rxjs'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.terminal = {}), global.ng.core, global.ng.forms, global.ng.common, global.primeng.dom, global.rxjs));
}(this, (function (exports, core, forms, common, dom, rxjs) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var TerminalService = /** @class */ (function () {
        function TerminalService() {
            this.commandSource = new rxjs.Subject();
            this.responseSource = new rxjs.Subject();
            this.commandHandler = this.commandSource.asObservable();
            this.responseHandler = this.responseSource.asObservable();
        }
        TerminalService.prototype.sendCommand = function (command) {
            if (command) {
                this.commandSource.next(command);
            }
        };
        TerminalService.prototype.sendResponse = function (response) {
            if (response) {
                this.responseSource.next(response);
            }
        };
        TerminalService = __decorate([
            core.Injectable()
        ], TerminalService);
        return TerminalService;
    }());

    var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Terminal = /** @class */ (function () {
        function Terminal(el, terminalService) {
            var _this = this;
            this.el = el;
            this.terminalService = terminalService;
            this.commands = [];
            this.subscription = terminalService.responseHandler.subscribe(function (response) {
                _this.commands[_this.commands.length - 1].response = response;
                _this.commandProcessed = true;
            });
        }
        Terminal.prototype.ngAfterViewInit = function () {
            this.container = dom.DomHandler.find(this.el.nativeElement, '.ui-terminal')[0];
        };
        Terminal.prototype.ngAfterViewChecked = function () {
            if (this.commandProcessed) {
                this.container.scrollTop = this.container.scrollHeight;
                this.commandProcessed = false;
            }
        };
        Object.defineProperty(Terminal.prototype, "response", {
            set: function (value) {
                if (value) {
                    this.commands[this.commands.length - 1].response = value;
                    this.commandProcessed = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Terminal.prototype.handleCommand = function (event) {
            if (event.keyCode == 13) {
                this.commands.push({ text: this.command });
                this.terminalService.sendCommand(this.command);
                this.command = '';
            }
        };
        Terminal.prototype.focus = function (element) {
            element.focus();
        };
        Terminal.prototype.ngOnDestroy = function () {
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
        };
        Terminal.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: TerminalService }
        ]; };
        __decorate$1([
            core.Input()
        ], Terminal.prototype, "welcomeMessage", void 0);
        __decorate$1([
            core.Input()
        ], Terminal.prototype, "prompt", void 0);
        __decorate$1([
            core.Input()
        ], Terminal.prototype, "style", void 0);
        __decorate$1([
            core.Input()
        ], Terminal.prototype, "styleClass", void 0);
        __decorate$1([
            core.Input()
        ], Terminal.prototype, "response", null);
        Terminal = __decorate$1([
            core.Component({
                selector: 'p-terminal',
                template: "\n        <div [ngClass]=\"'ui-terminal ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\" (click)=\"focus(in)\">\n            <div *ngIf=\"welcomeMessage\">{{welcomeMessage}}</div>\n            <div class=\"ui-terminal-content\">\n                <div *ngFor=\"let command of commands\">\n                    <span>{{prompt}}</span>\n                    <span class=\"ui-terminal-command\">{{command.text}}</span>\n                    <div>{{command.response}}</div>\n                </div>\n            </div>\n            <div>\n                <span class=\"ui-terminal-content-prompt\">{{prompt}}</span>\n                <input #in type=\"text\" [(ngModel)]=\"command\" class=\"ui-terminal-input\" autocomplete=\"off\" (keydown)=\"handleCommand($event)\" autofocus>\n            </div>\n        </div>\n    "
            })
        ], Terminal);
        return Terminal;
    }());
    var TerminalModule = /** @class */ (function () {
        function TerminalModule() {
        }
        TerminalModule = __decorate$1([
            core.NgModule({
                imports: [common.CommonModule, forms.FormsModule],
                exports: [Terminal],
                declarations: [Terminal]
            })
        ], TerminalModule);
        return TerminalModule;
    }());

    exports.Terminal = Terminal;
    exports.TerminalModule = TerminalModule;
    exports.TerminalService = TerminalService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-terminal.umd.js.map
