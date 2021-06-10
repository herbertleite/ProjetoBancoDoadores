import { EventEmitter, Input, Output, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Steps = /** @class */ (function () {
    function Steps() {
        this.activeIndex = 0;
        this.readonly = true;
        this.activeIndexChange = new EventEmitter();
    }
    Steps.prototype.itemClick = function (event, item, i) {
        if (this.readonly || item.disabled) {
            event.preventDefault();
            return;
        }
        this.activeIndexChange.emit(i);
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item,
                index: i
            });
        }
    };
    __decorate([
        Input()
    ], Steps.prototype, "activeIndex", void 0);
    __decorate([
        Input()
    ], Steps.prototype, "model", void 0);
    __decorate([
        Input()
    ], Steps.prototype, "readonly", void 0);
    __decorate([
        Input()
    ], Steps.prototype, "style", void 0);
    __decorate([
        Input()
    ], Steps.prototype, "styleClass", void 0);
    __decorate([
        Output()
    ], Steps.prototype, "activeIndexChange", void 0);
    Steps = __decorate([
        Component({
            selector: 'p-steps',
            template: "\n        <div [ngClass]=\"{'ui-steps ui-widget ui-helper-clearfix':true,'ui-steps-readonly':readonly}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ul role=\"tablist\">\n                <li *ngFor=\"let item of model; let i = index\" class=\"ui-steps-item\" #menuitem [ngStyle]=\"item.style\" [class]=\"item.styleClass\" role=\"tab\" [attr.aria-selected]=\"i === activeIndex\" [attr.aria-expanded]=\"i === activeIndex\"\n                    [ngClass]=\"{'ui-state-highlight ui-steps-current':(i === activeIndex),\n                        'ui-state-default':(i !== activeIndex),\n                        'ui-state-complete':(i < activeIndex),\n                        'ui-state-disabled ui-steps-incomplete':item.disabled||(i !== activeIndex && readonly)}\">\n                    <a *ngIf=\"!item.routerLink\" [attr.href]=\"item.url\" class=\"ui-menuitem-link\" role=\"presentation\" (click)=\"itemClick($event, item, i)\" (keydown.enter)=\"itemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\" \n                        [attr.tabindex]=\"item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')\">\n                        <span class=\"ui-steps-number\">{{i + 1}}</span>\n                        <span class=\"ui-steps-title\">{{item.label}}</span>\n                    </a>\n                    <a *ngIf=\"item.routerLink\" [routerLink]=\"item.routerLink\" [queryParams]=\"item.queryParams\" role=\"presentation\" [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"item.routerLinkActiveOptions||{exact:false}\" class=\"ui-menuitem-link\" \n                        (click)=\"itemClick($event, item, i)\" (keydown.enter)=\"itemClick($event, item, i)\" [attr.target]=\"item.target\" [attr.id]=\"item.id\" [attr.tabindex]=\"item.disabled||(i !== activeIndex && readonly) ? null : (item.tabindex ? item.tabindex : '0')\">\n                        <span class=\"ui-steps-number\">{{i + 1}}</span>\n                        <span class=\"ui-steps-title\">{{item.label}}</span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    "
        })
    ], Steps);
    return Steps;
}());
var StepsModule = /** @class */ (function () {
    function StepsModule() {
    }
    StepsModule = __decorate([
        NgModule({
            imports: [CommonModule, RouterModule],
            exports: [Steps, RouterModule],
            declarations: [Steps]
        })
    ], StepsModule);
    return StepsModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Steps, StepsModule };
//# sourceMappingURL=primeng-steps.js.map
