var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, ElementRef, HostListener, Input, OnDestroy, DoCheck, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
var Password = /** @class */ (function () {
    function Password(el, zone) {
        this.el = el;
        this.zone = zone;
        this.promptLabel = 'Enter a password';
        this.weakLabel = 'Weak';
        this.mediumLabel = 'Medium';
        this.strongLabel = 'Strong';
        this.feedback = true;
    }
    Object.defineProperty(Password.prototype, "showPassword", {
        set: function (show) {
            this.el.nativeElement.type = show ? 'text' : 'password';
        },
        enumerable: true,
        configurable: true
    });
    Password.prototype.ngDoCheck = function () {
        this.updateFilledState();
    };
    //To trigger change detection to manage ui-state-filled for material labels when there is no value binding
    Password.prototype.onInput = function (e) {
        this.updateFilledState();
    };
    Password.prototype.updateFilledState = function () {
        this.filled = this.el.nativeElement.value && this.el.nativeElement.value.length;
    };
    Password.prototype.createPanel = function () {
        this.panel = document.createElement('div');
        this.panel.className = 'ui-password-panel ui-widget ui-state-highlight ui-corner-all';
        this.meter = document.createElement('div');
        this.meter.className = 'ui-password-meter';
        this.info = document.createElement('div');
        this.info.className = 'ui-password-info';
        this.info.textContent = this.promptLabel;
        this.panel.appendChild(this.meter);
        this.panel.appendChild(this.info);
        this.panel.style.minWidth = DomHandler.getOuterWidth(this.el.nativeElement) + 'px';
        document.body.appendChild(this.panel);
    };
    Password.prototype.onFocus = function (e) {
        var _this = this;
        if (this.feedback) {
            if (!this.panel) {
                this.createPanel();
            }
            this.panel.style.zIndex = String(++DomHandler.zindex);
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    DomHandler.addClass(_this.panel, 'ui-password-panel-visible');
                    DomHandler.removeClass(_this.panel, 'ui-password-panel-hidden');
                }, 1);
                DomHandler.absolutePosition(_this.panel, _this.el.nativeElement);
            });
        }
    };
    Password.prototype.onBlur = function (e) {
        var _this = this;
        if (this.feedback) {
            DomHandler.addClass(this.panel, 'ui-password-panel-hidden');
            DomHandler.removeClass(this.panel, 'ui-password-panel-visible');
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.ngOnDestroy();
                }, 150);
            });
        }
    };
    Password.prototype.onKeyup = function (e) {
        if (this.feedback) {
            var value = e.target.value, label = null, meterPos = null;
            if (value.length === 0) {
                label = this.promptLabel;
                meterPos = '0px 0px';
            }
            else {
                var score = this.testStrength(value);
                if (score < 30) {
                    label = this.weakLabel;
                    meterPos = '0px -10px';
                }
                else if (score >= 30 && score < 80) {
                    label = this.mediumLabel;
                    meterPos = '0px -20px';
                }
                else if (score >= 80) {
                    label = this.strongLabel;
                    meterPos = '0px -30px';
                }
            }
            this.meter.style.backgroundPosition = meterPos;
            this.info.textContent = label;
        }
    };
    Password.prototype.testStrength = function (str) {
        var grade = 0;
        var val;
        val = str.match('[0-9]');
        grade += this.normalize(val ? val.length : 1 / 4, 1) * 25;
        val = str.match('[a-zA-Z]');
        grade += this.normalize(val ? val.length : 1 / 2, 3) * 10;
        val = str.match('[!@#$%^&*?_~.,;=]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 35;
        val = str.match('[A-Z]');
        grade += this.normalize(val ? val.length : 1 / 6, 1) * 30;
        grade *= str.length / 8;
        return grade > 100 ? 100 : grade;
    };
    Password.prototype.normalize = function (x, y) {
        var diff = x - y;
        if (diff <= 0)
            return x / y;
        else
            return 1 + 0.5 * (x / (x + y / 4));
    };
    Object.defineProperty(Password.prototype, "disabled", {
        get: function () {
            return this.el.nativeElement.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Password.prototype.ngOnDestroy = function () {
        if (this.panel) {
            document.body.removeChild(this.panel);
            this.panel = null;
            this.meter = null;
            this.info = null;
        }
    };
    Password.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], Password.prototype, "promptLabel", void 0);
    __decorate([
        Input()
    ], Password.prototype, "weakLabel", void 0);
    __decorate([
        Input()
    ], Password.prototype, "mediumLabel", void 0);
    __decorate([
        Input()
    ], Password.prototype, "strongLabel", void 0);
    __decorate([
        Input()
    ], Password.prototype, "feedback", void 0);
    __decorate([
        Input()
    ], Password.prototype, "showPassword", null);
    __decorate([
        HostListener('input', ['$event'])
    ], Password.prototype, "onInput", null);
    __decorate([
        HostListener('focus', ['$event'])
    ], Password.prototype, "onFocus", null);
    __decorate([
        HostListener('blur', ['$event'])
    ], Password.prototype, "onBlur", null);
    __decorate([
        HostListener('keyup', ['$event'])
    ], Password.prototype, "onKeyup", null);
    Password = __decorate([
        Directive({
            selector: '[pPassword]',
            host: {
                '[class.ui-inputtext]': 'true',
                '[class.ui-corner-all]': 'true',
                '[class.ui-state-default]': 'true',
                '[class.ui-widget]': 'true',
                '[class.ui-state-filled]': 'filled'
            }
        })
    ], Password);
    return Password;
}());
export { Password };
var PasswordModule = /** @class */ (function () {
    function PasswordModule() {
    }
    PasswordModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Password],
            declarations: [Password]
        })
    ], PasswordModule);
    return PasswordModule;
}());
export { PasswordModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3Bhc3N3b3JkLyIsInNvdXJjZXMiOlsicGFzc3dvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFZdkM7SUF3Qkksa0JBQW1CLEVBQWMsRUFBUyxJQUFZO1FBQW5DLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBdEI3QyxnQkFBVyxHQUFXLGtCQUFrQixDQUFDO1FBRXpDLGNBQVMsR0FBVyxNQUFNLENBQUM7UUFFM0IsZ0JBQVcsR0FBVyxRQUFRLENBQUM7UUFFL0IsZ0JBQVcsR0FBVyxRQUFRLENBQUM7UUFFL0IsYUFBUSxHQUFZLElBQUksQ0FBQztJQWN1QixDQUFDO0lBWmpELHNCQUFJLGtDQUFZO2FBQWhCLFVBQWlCLElBQWE7WUFDbkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDNUQsQ0FBQzs7O09BQUE7SUFZRCw0QkFBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELDBHQUEwRztJQUUxRywwQkFBTyxHQUFQLFVBQVEsQ0FBQztRQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxvQ0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFF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QixFQUFFLE1BQU07Z0JBQ2xDLG1CQUFtQixFQUFFLE1BQU07Z0JBQzNCLHlCQUF5QixFQUFFLFFBQVE7YUFDdEM7U0FDSixDQUFDO09BQ1csUUFBUSxDQWlLcEI7SUFBRCxlQUFDO0NBQUEsQUFqS0QsSUFpS0M7U0FqS1ksUUFBUTtBQXdLckI7SUFBQTtJQUE4QixDQUFDO0lBQWxCLGNBQWM7UUFMMUIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztZQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7U0FDM0IsQ0FBQztPQUNXLGNBQWMsQ0FBSTtJQUFELHFCQUFDO0NBQUEsQUFBL0IsSUFBK0I7U0FBbEIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsRGlyZWN0aXZlLEVsZW1lbnRSZWYsSG9zdExpc3RlbmVyLElucHV0LE9uRGVzdHJveSxEb0NoZWNrLE5nWm9uZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twUGFzc3dvcmRdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MudWktaW5wdXR0ZXh0XSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS1jb3JuZXItYWxsXSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS1zdGF0ZS1kZWZhdWx0XSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS13aWRnZXRdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLXN0YXRlLWZpbGxlZF0nOiAnZmlsbGVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUGFzc3dvcmQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksRG9DaGVjayB7XG5cbiAgICBASW5wdXQoKSBwcm9tcHRMYWJlbDogc3RyaW5nID0gJ0VudGVyIGEgcGFzc3dvcmQnO1xuXG4gICAgQElucHV0KCkgd2Vha0xhYmVsOiBzdHJpbmcgPSAnV2Vhayc7XG5cbiAgICBASW5wdXQoKSBtZWRpdW1MYWJlbDogc3RyaW5nID0gJ01lZGl1bSc7XG5cbiAgICBASW5wdXQoKSBzdHJvbmdMYWJlbDogc3RyaW5nID0gJ1N0cm9uZyc7XG4gICAgXG4gICAgQElucHV0KCkgZmVlZGJhY2s6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkgc2V0IHNob3dQYXNzd29yZChzaG93OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC50eXBlID0gc2hvdyA/ICd0ZXh0JyA6ICdwYXNzd29yZCc7XG4gICAgfVxuICAgIFxuICAgIHBhbmVsOiBIVE1MRGl2RWxlbWVudDtcbiAgICBcbiAgICBtZXRlcjogYW55O1xuICAgIFxuICAgIGluZm86IGFueTtcbiAgICBcbiAgICBmaWxsZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7fVxuICAgIFxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgIH1cbiAgICBcbiAgICAvL1RvIHRyaWdnZXIgY2hhbmdlIGRldGVjdGlvbiB0byBtYW5hZ2UgdWktc3RhdGUtZmlsbGVkIGZvciBtYXRlcmlhbCBsYWJlbHMgd2hlbiB0aGVyZSBpcyBubyB2YWx1ZSBiaW5kaW5nXG4gICAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudCddKSBcbiAgICBvbklucHV0KGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVGaWxsZWRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5maWxsZWQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgJiYgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlLmxlbmd0aDtcbiAgICB9XG5cbiAgICBjcmVhdGVQYW5lbCgpIHtcbiAgICAgICAgdGhpcy5wYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLnBhbmVsLmNsYXNzTmFtZSA9ICd1aS1wYXNzd29yZC1wYW5lbCB1aS13aWRnZXQgdWktc3RhdGUtaGlnaGxpZ2h0IHVpLWNvcm5lci1hbGwnO1xuICAgICAgICB0aGlzLm1ldGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMubWV0ZXIuY2xhc3NOYW1lID0gJ3VpLXBhc3N3b3JkLW1ldGVyJztcbiAgICAgICAgdGhpcy5pbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuaW5mby5jbGFzc05hbWUgPSAndWktcGFzc3dvcmQtaW5mbyc7XG4gICAgICAgIHRoaXMuaW5mby50ZXh0Q29udGVudCA9IHRoaXMucHJvbXB0TGFiZWw7XG4gICAgICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5tZXRlcik7XG4gICAgICAgIHRoaXMucGFuZWwuYXBwZW5kQ2hpbGQodGhpcy5pbmZvKTtcbiAgICAgICAgdGhpcy5wYW5lbC5zdHlsZS5taW5XaWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpICsgJ3B4JztcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnBhbmVsKTtcbiAgICB9XG4gICAgICAgIFxuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJywgWyckZXZlbnQnXSkgXG4gICAgb25Gb2N1cyhlKSB7XG4gICAgICAgIGlmICh0aGlzLmZlZWRiYWNrKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVBhbmVsKCk7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB0aGlzLnBhbmVsLnN0eWxlLnpJbmRleCA9IFN0cmluZygrK0RvbUhhbmRsZXIuemluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5wYW5lbCwgJ3VpLXBhc3N3b3JkLXBhbmVsLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnBhbmVsLCAndWktcGFzc3dvcmQtcGFuZWwtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgfSwgMSk7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMucGFuZWwsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBASG9zdExpc3RlbmVyKCdibHVyJywgWyckZXZlbnQnXSkgXG4gICAgb25CbHVyKGUpIHsgICBcbiAgICAgICAgaWYgKHRoaXMuZmVlZGJhY2spIHtcbiAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5wYW5lbCwgJ3VpLXBhc3N3b3JkLXBhbmVsLWhpZGRlbicpO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLnBhbmVsLCAndWktcGFzc3dvcmQtcGFuZWwtdmlzaWJsZScpO1xuXG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSwgMTUwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ICAgICBcbiAgICB9XG4gICAgXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKVxuICAgIG9uS2V5dXAoZSkge1xuICAgICAgICBpZiAodGhpcy5mZWVkYmFjaykge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gZS50YXJnZXQudmFsdWUsXG4gICAgICAgICAgICBsYWJlbCA9IG51bGwsXG4gICAgICAgICAgICBtZXRlclBvcyA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IHRoaXMucHJvbXB0TGFiZWw7XG4gICAgICAgICAgICAgICAgbWV0ZXJQb3MgPSAnMHB4IDBweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgc2NvcmUgPSB0aGlzLnRlc3RTdHJlbmd0aCh2YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUgPCAzMCkge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IHRoaXMud2Vha0xhYmVsO1xuICAgICAgICAgICAgICAgICAgICBtZXRlclBvcyA9ICcwcHggLTEwcHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzY29yZSA+PSAzMCAmJiBzY29yZSA8IDgwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy5tZWRpdW1MYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgbWV0ZXJQb3MgPSAnMHB4IC0yMHB4JztcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNjb3JlID49IDgwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhYmVsID0gdGhpcy5zdHJvbmdMYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgbWV0ZXJQb3MgPSAnMHB4IC0zMHB4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMubWV0ZXIuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gbWV0ZXJQb3M7XG4gICAgICAgICAgICB0aGlzLmluZm8udGV4dENvbnRlbnQgPSBsYWJlbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB0ZXN0U3RyZW5ndGgoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGdyYWRlOiBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgdmFsO1xuXG4gICAgICAgIHZhbCA9IHN0ci5tYXRjaCgnWzAtOV0nKTtcbiAgICAgICAgZ3JhZGUgKz0gdGhpcy5ub3JtYWxpemUodmFsID8gdmFsLmxlbmd0aCA6IDEvNCwgMSkgKiAyNTtcblxuICAgICAgICB2YWwgPSBzdHIubWF0Y2goJ1thLXpBLVpdJyk7XG4gICAgICAgIGdyYWRlICs9IHRoaXMubm9ybWFsaXplKHZhbCA/IHZhbC5sZW5ndGggOiAxLzIsIDMpICogMTA7XG5cbiAgICAgICAgdmFsID0gc3RyLm1hdGNoKCdbIUAjJCVeJio/X34uLDs9XScpO1xuICAgICAgICBncmFkZSArPSB0aGlzLm5vcm1hbGl6ZSh2YWwgPyB2YWwubGVuZ3RoIDogMS82LCAxKSAqIDM1O1xuXG4gICAgICAgIHZhbCA9IHN0ci5tYXRjaCgnW0EtWl0nKTtcbiAgICAgICAgZ3JhZGUgKz0gdGhpcy5ub3JtYWxpemUodmFsID8gdmFsLmxlbmd0aCA6IDEvNiwgMSkgKiAzMDtcblxuICAgICAgICBncmFkZSAqPSBzdHIubGVuZ3RoIC8gODtcblxuICAgICAgICByZXR1cm4gZ3JhZGUgPiAxMDAgPyAxMDAgOiBncmFkZTtcbiAgICB9XG4gICAgXG4gICAgbm9ybWFsaXplKHgsIHkpIHtcbiAgICAgICAgbGV0IGRpZmYgPSB4IC0geTtcblxuICAgICAgICBpZiAoZGlmZiA8PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHggLyB5O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gMSArIDAuNSAqICh4IC8gKHggKyB5LzQpKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRpc2FibGVkO1xuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5wYW5lbCk7XG4gICAgICAgICAgICB0aGlzLnBhbmVsID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMubWV0ZXIgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5pbmZvID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbUGFzc3dvcmRdLFxuICAgIGRlY2xhcmF0aW9uczogW1Bhc3N3b3JkXVxufSlcbmV4cG9ydCBjbGFzcyBQYXNzd29yZE1vZHVsZSB7IH1cbiJdfQ==