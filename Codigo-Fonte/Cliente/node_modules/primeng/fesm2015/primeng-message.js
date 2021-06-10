import { Input, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let UIMessage = class UIMessage {
    constructor() {
        this.escape = true;
    }
    get icon() {
        let icon = null;
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
    }
};
__decorate([
    Input()
], UIMessage.prototype, "severity", void 0);
__decorate([
    Input()
], UIMessage.prototype, "text", void 0);
__decorate([
    Input()
], UIMessage.prototype, "escape", void 0);
UIMessage = __decorate([
    Component({
        selector: 'p-message',
        template: `
        <div aria-live="polite" class="ui-message ui-widget ui-corner-all" *ngIf="severity"
        [ngClass]="{'ui-message-info': (severity === 'info'),
                'ui-message-warn': (severity === 'warn'),
                'ui-message-error': (severity === 'error'),
                'ui-message-success': (severity === 'success')}">
            <span class="ui-message-icon" [ngClass]="icon"></span>
            <div *ngIf="!escape; else escapeOut">
                <span *ngIf="!escape" class="ui-message-text" [innerHTML]="text"></span>
            </div>
            <ng-template #escapeOut>
                <span *ngIf="escape" class="ui-message-text">{{text}}</span>
            </ng-template>
        </div>
    `
    })
], UIMessage);
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [UIMessage],
        declarations: [UIMessage]
    })
], MessageModule);

/**
 * Generated bundle index. Do not edit.
 */

export { MessageModule, UIMessage };
//# sourceMappingURL=primeng-message.js.map
