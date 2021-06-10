import { EventEmitter, ElementRef, NgZone, Input, Output, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Captcha = class Captcha {
    constructor(el, _zone) {
        this.el = el;
        this._zone = _zone;
        this.siteKey = null;
        this.theme = 'light';
        this.type = 'image';
        this.size = 'normal';
        this.tabindex = 0;
        this.language = null;
        this.initCallback = "initRecaptcha";
        this.onResponse = new EventEmitter();
        this.onExpire = new EventEmitter();
        this._instance = null;
    }
    ngAfterViewInit() {
        if (window.grecaptcha) {
            if (!window.grecaptcha.render) {
                setTimeout(() => {
                    this.init();
                }, 100);
            }
            else {
                this.init();
            }
        }
        else {
            window[this.initCallback] = () => {
                this.init();
            };
        }
    }
    init() {
        this._instance = window.grecaptcha.render(this.el.nativeElement.children[0], {
            'sitekey': this.siteKey,
            'theme': this.theme,
            'type': this.type,
            'size': this.size,
            'tabindex': this.tabindex,
            'hl': this.language,
            'callback': (response) => { this._zone.run(() => this.recaptchaCallback(response)); },
            'expired-callback': () => { this._zone.run(() => this.recaptchaExpiredCallback()); }
        });
    }
    reset() {
        if (this._instance === null)
            return;
        window.grecaptcha.reset(this._instance);
    }
    getResponse() {
        if (this._instance === null)
            return null;
        return window.grecaptcha.getResponse(this._instance);
    }
    recaptchaCallback(response) {
        this.onResponse.emit({
            response: response
        });
    }
    recaptchaExpiredCallback() {
        this.onExpire.emit();
    }
    ngOnDestroy() {
        if (this._instance != null) {
            window.grecaptcha.reset(this._instance);
        }
    }
};
Captcha.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
__decorate([
    Input()
], Captcha.prototype, "siteKey", void 0);
__decorate([
    Input()
], Captcha.prototype, "theme", void 0);
__decorate([
    Input()
], Captcha.prototype, "type", void 0);
__decorate([
    Input()
], Captcha.prototype, "size", void 0);
__decorate([
    Input()
], Captcha.prototype, "tabindex", void 0);
__decorate([
    Input()
], Captcha.prototype, "language", void 0);
__decorate([
    Input()
], Captcha.prototype, "initCallback", void 0);
__decorate([
    Output()
], Captcha.prototype, "onResponse", void 0);
__decorate([
    Output()
], Captcha.prototype, "onExpire", void 0);
Captcha = __decorate([
    Component({
        selector: 'p-captcha',
        template: `<div></div>`
    })
], Captcha);
let CaptchaModule = class CaptchaModule {
};
CaptchaModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Captcha],
        declarations: [Captcha]
    })
], CaptchaModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Captcha, CaptchaModule };
//# sourceMappingURL=primeng-captcha.js.map
