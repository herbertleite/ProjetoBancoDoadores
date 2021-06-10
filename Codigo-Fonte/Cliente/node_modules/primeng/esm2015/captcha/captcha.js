var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, AfterViewInit, Component, EventEmitter, Input, NgZone, OnDestroy, Output, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export { Captcha };
let CaptchaModule = class CaptchaModule {
};
CaptchaModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Captcha],
        declarations: [Captcha]
    })
], CaptchaModule);
export { CaptchaModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdGNoYS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvY2FwdGNoYS8iLCJzb3VyY2VzIjpbImNhcHRjaGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxhQUFhLEVBQUMsU0FBUyxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQU03QyxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBc0JoQixZQUFtQixFQUFjLEVBQVMsS0FBYTtRQUFwQyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQXBCOUMsWUFBTyxHQUFXLElBQUksQ0FBQztRQUV2QixVQUFLLEdBQUcsT0FBTyxDQUFDO1FBRWhCLFNBQUksR0FBRyxPQUFPLENBQUM7UUFFZixTQUFJLEdBQUcsUUFBUSxDQUFDO1FBRWhCLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFFYixhQUFRLEdBQVcsSUFBSSxDQUFDO1FBRXhCLGlCQUFZLEdBQUcsZUFBZSxDQUFDO1FBRTlCLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVuRCxhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkQsY0FBUyxHQUFRLElBQUksQ0FBQztJQUU0QixDQUFDO0lBRTNELGVBQWU7UUFDWCxJQUFVLE1BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDMUIsSUFBSSxDQUFPLE1BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDO2dCQUNqQyxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ1Q7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLElBQUks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QUFFLENBQUMsT0FBTyxDQUFDO1FBQ2xCLFlBQVksRUFBRSxDQUFDLE9BQU8sQ0FBQztLQUMxQixDQUFDO0dBQ1csYUFBYSxDQUFJO1NBQWpCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLEFmdGVyVmlld0luaXQsQ29tcG9uZW50LEV2ZW50RW1pdHRlcixJbnB1dCxOZ1pvbmUsT25EZXN0cm95LE91dHB1dCxFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY2FwdGNoYScsXG4gICAgdGVtcGxhdGU6IGA8ZGl2PjwvZGl2PmBcbn0pXG5leHBvcnQgY2xhc3MgQ2FwdGNoYSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHNpdGVLZXk6IHN0cmluZyA9IG51bGw7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIHRoZW1lID0gJ2xpZ2h0JztcbiAgICBcbiAgICBASW5wdXQoKSB0eXBlID0gJ2ltYWdlJztcbiAgICBcbiAgICBASW5wdXQoKSBzaXplID0gJ25vcm1hbCc7XG4gICAgXG4gICAgQElucHV0KCkgdGFiaW5kZXggPSAwO1xuICAgIFxuICAgIEBJbnB1dCgpIGxhbmd1YWdlOiBzdHJpbmcgPSBudWxsO1xuICAgICBcbiAgICBASW5wdXQoKSBpbml0Q2FsbGJhY2sgPSBcImluaXRSZWNhcHRjaGFcIjtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25SZXNwb25zZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uRXhwaXJlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBwcml2YXRlIF9pbnN0YW5jZTogYW55ID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIF96b25lOiBOZ1pvbmUpIHt9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoKDxhbnk+d2luZG93KS5ncmVjYXB0Y2hhKSB7XG4gICAgICAgICAgICBpZiAoISg8YW55PndpbmRvdykuZ3JlY2FwdGNoYS5yZW5kZXIpe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgICAgICAgIH0sMTAwKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAoPGFueT53aW5kb3cpW3RoaXMuaW5pdENhbGxiYWNrXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgfVxuICAgIFxuICAgIGluaXQoKcKge1xuICAgICAgICB0aGlzLl9pbnN0YW5jZSA9ICg8YW55PndpbmRvdykuZ3JlY2FwdGNoYS5yZW5kZXIodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdLCB7XG4gICAgICAgICAgICAnc2l0ZWtleSc6IHRoaXMuc2l0ZUtleSxcbiAgICAgICAgICAgICd0aGVtZSc6IHRoaXMudGhlbWUsXG4gICAgICAgICAgICAndHlwZSc6IHRoaXMudHlwZSxcbiAgICAgICAgICAgICdzaXplJzogdGhpcy5zaXplLFxuICAgICAgICAgICAgJ3RhYmluZGV4JzogdGhpcy50YWJpbmRleCxcbiAgICAgICAgICAgICdobCc6IHRoaXMubGFuZ3VhZ2UsXG4gICAgICAgICAgICAnY2FsbGJhY2snOiAocmVzcG9uc2U6IHN0cmluZykgPT4ge3RoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMucmVjYXB0Y2hhQ2FsbGJhY2socmVzcG9uc2UpKX0sXG4gICAgICAgICAgICAnZXhwaXJlZC1jYWxsYmFjayc6ICgpID0+IHt0aGlzLl96b25lLnJ1bigoKSA9PiB0aGlzLnJlY2FwdGNoYUV4cGlyZWRDYWxsYmFjaygpKX1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJlc2V0KCkge1xuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAoPGFueT53aW5kb3cpLmdyZWNhcHRjaGEucmVzZXQodGhpcy5faW5zdGFuY2UpO1xuICAgIH1cbiAgICBcbiAgICBnZXRSZXNwb25zZSgpOiBTdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAoPGFueT53aW5kb3cpLmdyZWNhcHRjaGEuZ2V0UmVzcG9uc2UodGhpcy5faW5zdGFuY2UpO1xuICAgIH1cbiAgICBcbiAgICByZWNhcHRjaGFDYWxsYmFjayhyZXNwb25zZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub25SZXNwb25zZS5lbWl0KHtcbiAgICAgICAgICAgIHJlc3BvbnNlOiByZXNwb25zZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWNhcHRjaGFFeHBpcmVkQ2FsbGJhY2soKSB7XG4gICAgICAgIHRoaXMub25FeHBpcmUuZW1pdCgpO1xuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICAoPGFueT53aW5kb3cpLmdyZWNhcHRjaGEucmVzZXQodGhpcy5faW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtDYXB0Y2hhXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtDYXB0Y2hhXVxufSlcbmV4cG9ydCBjbGFzcyBDYXB0Y2hhTW9kdWxlIHsgfVxuIl19