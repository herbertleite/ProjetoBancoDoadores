import { EventEmitter, ElementRef, NgZone, Input, Output, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Captcha = /** @class */ (function () {
    function Captcha(el, _zone) {
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
    Captcha.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (window.grecaptcha) {
            if (!window.grecaptcha.render) {
                setTimeout(function () {
                    _this.init();
                }, 100);
            }
            else {
                this.init();
            }
        }
        else {
            window[this.initCallback] = function () {
                _this.init();
            };
        }
    };
    Captcha.prototype.init = function () {
        var _this = this;
        this._instance = window.grecaptcha.render(this.el.nativeElement.children[0], {
            'sitekey': this.siteKey,
            'theme': this.theme,
            'type': this.type,
            'size': this.size,
            'tabindex': this.tabindex,
            'hl': this.language,
            'callback': function (response) { _this._zone.run(function () { return _this.recaptchaCallback(response); }); },
            'expired-callback': function () { _this._zone.run(function () { return _this.recaptchaExpiredCallback(); }); }
        });
    };
    Captcha.prototype.reset = function () {
        if (this._instance === null)
            return;
        window.grecaptcha.reset(this._instance);
    };
    Captcha.prototype.getResponse = function () {
        if (this._instance === null)
            return null;
        return window.grecaptcha.getResponse(this._instance);
    };
    Captcha.prototype.recaptchaCallback = function (response) {
        this.onResponse.emit({
            response: response
        });
    };
    Captcha.prototype.recaptchaExpiredCallback = function () {
        this.onExpire.emit();
    };
    Captcha.prototype.ngOnDestroy = function () {
        if (this._instance != null) {
            window.grecaptcha.reset(this._instance);
        }
    };
    Captcha.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
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
            template: "<div></div>"
        })
    ], Captcha);
    return Captcha;
}());
var CaptchaModule = /** @class */ (function () {
    function CaptchaModule() {
    }
    CaptchaModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Captcha],
            declarations: [Captcha]
        })
    ], CaptchaModule);
    return CaptchaModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Captcha, CaptchaModule };
//# sourceMappingURL=primeng-captcha.js.map
