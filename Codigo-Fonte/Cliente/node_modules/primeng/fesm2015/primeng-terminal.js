import { Injectable, ElementRef, Input, Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Subject } from 'rxjs';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let TerminalService = class TerminalService {
    constructor() {
        this.commandSource = new Subject();
        this.responseSource = new Subject();
        this.commandHandler = this.commandSource.asObservable();
        this.responseHandler = this.responseSource.asObservable();
    }
    sendCommand(command) {
        if (command) {
            this.commandSource.next(command);
        }
    }
    sendResponse(response) {
        if (response) {
            this.responseSource.next(response);
        }
    }
};
TerminalService = __decorate([
    Injectable()
], TerminalService);

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Terminal = class Terminal {
    constructor(el, terminalService) {
        this.el = el;
        this.terminalService = terminalService;
        this.commands = [];
        this.subscription = terminalService.responseHandler.subscribe(response => {
            this.commands[this.commands.length - 1].response = response;
            this.commandProcessed = true;
        });
    }
    ngAfterViewInit() {
        this.container = DomHandler.find(this.el.nativeElement, '.ui-terminal')[0];
    }
    ngAfterViewChecked() {
        if (this.commandProcessed) {
            this.container.scrollTop = this.container.scrollHeight;
            this.commandProcessed = false;
        }
    }
    set response(value) {
        if (value) {
            this.commands[this.commands.length - 1].response = value;
            this.commandProcessed = true;
        }
    }
    handleCommand(event) {
        if (event.keyCode == 13) {
            this.commands.push({ text: this.command });
            this.terminalService.sendCommand(this.command);
            this.command = '';
        }
    }
    focus(element) {
        element.focus();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
};
Terminal.ctorParameters = () => [
    { type: ElementRef },
    { type: TerminalService }
];
__decorate$1([
    Input()
], Terminal.prototype, "welcomeMessage", void 0);
__decorate$1([
    Input()
], Terminal.prototype, "prompt", void 0);
__decorate$1([
    Input()
], Terminal.prototype, "style", void 0);
__decorate$1([
    Input()
], Terminal.prototype, "styleClass", void 0);
__decorate$1([
    Input()
], Terminal.prototype, "response", null);
Terminal = __decorate$1([
    Component({
        selector: 'p-terminal',
        template: `
        <div [ngClass]="'ui-terminal ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass" (click)="focus(in)">
            <div *ngIf="welcomeMessage">{{welcomeMessage}}</div>
            <div class="ui-terminal-content">
                <div *ngFor="let command of commands">
                    <span>{{prompt}}</span>
                    <span class="ui-terminal-command">{{command.text}}</span>
                    <div>{{command.response}}</div>
                </div>
            </div>
            <div>
                <span class="ui-terminal-content-prompt">{{prompt}}</span>
                <input #in type="text" [(ngModel)]="command" class="ui-terminal-input" autocomplete="off" (keydown)="handleCommand($event)" autofocus>
            </div>
        </div>
    `
    })
], Terminal);
let TerminalModule = class TerminalModule {
};
TerminalModule = __decorate$1([
    NgModule({
        imports: [CommonModule, FormsModule],
        exports: [Terminal],
        declarations: [Terminal]
    })
], TerminalModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Terminal, TerminalModule, TerminalService };
//# sourceMappingURL=primeng-terminal.js.map
