var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Output, OnDestroy, EventEmitter, forwardRef, Renderer2, ViewChild, ChangeDetectorRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const COLORPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ColorPicker),
    multi: true
};
let ColorPicker = class ColorPicker {
    constructor(el, renderer, cd) {
        this.el = el;
        this.renderer = renderer;
        this.cd = cd;
        this.format = 'hex';
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
        this.onChange = new EventEmitter();
        this.defaultColor = 'ff0000';
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    set colorSelector(element) {
        this.colorSelectorViewChild = element;
    }
    set colorHandle(element) {
        this.colorHandleViewChild = element;
    }
    set hue(element) {
        this.hueViewChild = element;
    }
    set hueHandle(element) {
        this.hueHandleViewChild = element;
    }
    onHueMousedown(event) {
        if (this.disabled) {
            return;
        }
        this.bindDocumentMousemoveListener();
        this.bindDocumentMouseupListener();
        this.hueDragging = true;
        this.pickHue(event);
    }
    pickHue(event) {
        let top = this.hueViewChild.nativeElement.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        this.value = this.validateHSB({
            h: Math.floor(360 * (150 - Math.max(0, Math.min(150, (event.pageY - top)))) / 150),
            s: this.value.s,
            b: this.value.b
        });
        this.updateColorSelector();
        this.updateUI();
        this.updateModel();
        this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
    }
    onColorMousedown(event) {
        if (this.disabled) {
            return;
        }
        this.bindDocumentMousemoveListener();
        this.bindDocumentMouseupListener();
        this.colorDragging = true;
        this.pickColor(event);
    }
    pickColor(event) {
        let rect = this.colorSelectorViewChild.nativeElement.getBoundingClientRect();
        let top = rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        let left = rect.left + document.body.scrollLeft;
        let saturation = Math.floor(100 * (Math.max(0, Math.min(150, (event.pageX - left)))) / 150);
        let brightness = Math.floor(100 * (150 - Math.max(0, Math.min(150, (event.pageY - top)))) / 150);
        this.value = this.validateHSB({
            h: this.value.h,
            s: saturation,
            b: brightness
        });
        this.updateUI();
        this.updateModel();
        this.onChange.emit({ originalEvent: event, value: this.getValueToUpdate() });
    }
    getValueToUpdate() {
        let val;
        switch (this.format) {
            case 'hex':
                val = '#' + this.HSBtoHEX(this.value);
                break;
            case 'rgb':
                val = this.HSBtoRGB(this.value);
                break;
            case 'hsb':
                val = this.value;
                break;
        }
        return val;
    }
    updateModel() {
        this.onModelChange(this.getValueToUpdate());
    }
    writeValue(value) {
        if (value) {
            switch (this.format) {
                case 'hex':
                    this.value = this.HEXtoHSB(value);
                    break;
                case 'rgb':
                    this.value = this.RGBtoHSB(value);
                    break;
                case 'hsb':
                    this.value = value;
                    break;
            }
        }
        else {
            this.value = this.HEXtoHSB(this.defaultColor);
        }
        this.updateColorSelector();
        this.updateUI();
    }
    updateColorSelector() {
        if (this.colorSelectorViewChild) {
            const hsb = {};
            hsb.s = 100;
            hsb.b = 100;
            hsb.h = this.value.h;
            this.colorSelectorViewChild.nativeElement.style.backgroundColor = '#' + this.HSBtoHEX(hsb);
        }
    }
    updateUI() {
        if (this.colorHandleViewChild && this.hueHandleViewChild.nativeElement) {
            this.colorHandleViewChild.nativeElement.style.left = Math.floor(150 * this.value.s / 100) + 'px';
            this.colorHandleViewChild.nativeElement.style.top = Math.floor(150 * (100 - this.value.b) / 100) + 'px';
            this.hueHandleViewChild.nativeElement.style.top = Math.floor(150 - (150 * this.value.h / 360)) + 'px';
        }
        this.inputBgColor = '#' + this.HSBtoHEX(this.value);
    }
    onInputFocus() {
        this.onModelTouched();
    }
    show() {
        this.overlayVisible = true;
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                if (!this.inline) {
                    this.overlay = event.element;
                    this.appendOverlay();
                    if (this.autoZIndex) {
                        this.overlay.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                    }
                    this.alignOverlay();
                    this.bindDocumentClickListener();
                    this.updateColorSelector();
                    this.updateUI();
                }
                break;
            case 'void':
                this.onOverlayHide();
                break;
        }
    }
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.overlay);
            else
                DomHandler.appendChild(this.overlay, this.appendTo);
        }
    }
    restoreOverlayAppend() {
        if (this.overlay && this.appendTo) {
            this.el.nativeElement.appendChild(this.overlay);
        }
    }
    alignOverlay() {
        if (this.appendTo)
            DomHandler.absolutePosition(this.overlay, this.inputViewChild.nativeElement);
        else
            DomHandler.relativePosition(this.overlay, this.inputViewChild.nativeElement);
    }
    hide() {
        this.overlayVisible = false;
    }
    onInputClick() {
        this.selfClick = true;
        this.togglePanel();
    }
    togglePanel() {
        if (!this.overlayVisible)
            this.show();
        else
            this.hide();
    }
    onInputKeydown(event) {
        switch (event.which) {
            //space
            case 32:
                this.togglePanel();
                event.preventDefault();
                break;
            //escape and tab
            case 27:
            case 9:
                this.hide();
                break;
        }
    }
    onPanelClick() {
        this.selfClick = true;
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.selfClick) {
                    this.overlayVisible = false;
                    this.unbindDocumentClickListener();
                }
                this.selfClick = false;
                this.cd.markForCheck();
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    bindDocumentMousemoveListener() {
        if (!this.documentMousemoveListener) {
            this.documentMousemoveListener = this.renderer.listen('document', 'mousemove', (event) => {
                if (this.colorDragging) {
                    this.pickColor(event);
                }
                if (this.hueDragging) {
                    this.pickHue(event);
                }
            });
        }
    }
    unbindDocumentMousemoveListener() {
        if (this.documentMousemoveListener) {
            this.documentMousemoveListener();
            this.documentMousemoveListener = null;
        }
    }
    bindDocumentMouseupListener() {
        if (!this.documentMouseupListener) {
            this.documentMouseupListener = this.renderer.listen('document', 'mouseup', () => {
                this.colorDragging = false;
                this.hueDragging = false;
                this.unbindDocumentMousemoveListener();
                this.unbindDocumentMouseupListener();
            });
        }
    }
    unbindDocumentMouseupListener() {
        if (this.documentMouseupListener) {
            this.documentMouseupListener();
            this.documentMouseupListener = null;
        }
    }
    validateHSB(hsb) {
        return {
            h: Math.min(360, Math.max(0, hsb.h)),
            s: Math.min(100, Math.max(0, hsb.s)),
            b: Math.min(100, Math.max(0, hsb.b))
        };
    }
    validateRGB(rgb) {
        return {
            r: Math.min(255, Math.max(0, rgb.r)),
            g: Math.min(255, Math.max(0, rgb.g)),
            b: Math.min(255, Math.max(0, rgb.b))
        };
    }
    validateHEX(hex) {
        var len = 6 - hex.length;
        if (len > 0) {
            var o = [];
            for (var i = 0; i < len; i++) {
                o.push('0');
            }
            o.push(hex);
            hex = o.join('');
        }
        return hex;
    }
    HEXtoRGB(hex) {
        let hexValue = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
        return { r: hexValue >> 16, g: (hexValue & 0x00FF00) >> 8, b: (hexValue & 0x0000FF) };
    }
    HEXtoHSB(hex) {
        return this.RGBtoHSB(this.HEXtoRGB(hex));
    }
    RGBtoHSB(rgb) {
        var hsb = {
            h: 0,
            s: 0,
            b: 0
        };
        var min = Math.min(rgb.r, rgb.g, rgb.b);
        var max = Math.max(rgb.r, rgb.g, rgb.b);
        var delta = max - min;
        hsb.b = max;
        hsb.s = max != 0 ? 255 * delta / max : 0;
        if (hsb.s != 0) {
            if (rgb.r == max) {
                hsb.h = (rgb.g - rgb.b) / delta;
            }
            else if (rgb.g == max) {
                hsb.h = 2 + (rgb.b - rgb.r) / delta;
            }
            else {
                hsb.h = 4 + (rgb.r - rgb.g) / delta;
            }
        }
        else {
            hsb.h = -1;
        }
        hsb.h *= 60;
        if (hsb.h < 0) {
            hsb.h += 360;
        }
        hsb.s *= 100 / 255;
        hsb.b *= 100 / 255;
        return hsb;
    }
    HSBtoRGB(hsb) {
        var rgb = {
            r: null, g: null, b: null
        };
        let h = hsb.h;
        let s = hsb.s * 255 / 100;
        let v = hsb.b * 255 / 100;
        if (s == 0) {
            rgb = {
                r: v,
                g: v,
                b: v
            };
        }
        else {
            let t1 = v;
            let t2 = (255 - s) * v / 255;
            let t3 = (t1 - t2) * (h % 60) / 60;
            if (h == 360)
                h = 0;
            if (h < 60) {
                rgb.r = t1;
                rgb.b = t2;
                rgb.g = t2 + t3;
            }
            else if (h < 120) {
                rgb.g = t1;
                rgb.b = t2;
                rgb.r = t1 - t3;
            }
            else if (h < 180) {
                rgb.g = t1;
                rgb.r = t2;
                rgb.b = t2 + t3;
            }
            else if (h < 240) {
                rgb.b = t1;
                rgb.r = t2;
                rgb.g = t1 - t3;
            }
            else if (h < 300) {
                rgb.b = t1;
                rgb.g = t2;
                rgb.r = t2 + t3;
            }
            else if (h < 360) {
                rgb.r = t1;
                rgb.g = t2;
                rgb.b = t1 - t3;
            }
            else {
                rgb.r = 0;
                rgb.g = 0;
                rgb.b = 0;
            }
        }
        return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
    }
    RGBtoHEX(rgb) {
        var hex = [
            rgb.r.toString(16),
            rgb.g.toString(16),
            rgb.b.toString(16)
        ];
        for (var key in hex) {
            if (hex[key].length == 1) {
                hex[key] = '0' + hex[key];
            }
        }
        return hex.join('');
    }
    HSBtoHEX(hsb) {
        return this.RGBtoHEX(this.HSBtoRGB(hsb));
    }
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.overlay = null;
    }
    ngOnDestroy() {
        this.restoreOverlayAppend();
        this.onOverlayHide();
    }
};
ColorPicker.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], ColorPicker.prototype, "style", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "styleClass", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "inline", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "format", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "appendTo", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "disabled", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "tabindex", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "inputId", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "showTransitionOptions", void 0);
__decorate([
    Input()
], ColorPicker.prototype, "hideTransitionOptions", void 0);
__decorate([
    Output()
], ColorPicker.prototype, "onChange", void 0);
__decorate([
    ViewChild('input', { static: false })
], ColorPicker.prototype, "inputViewChild", void 0);
__decorate([
    ViewChild('colorSelector', { static: false })
], ColorPicker.prototype, "colorSelector", null);
__decorate([
    ViewChild('colorHandle', { static: false })
], ColorPicker.prototype, "colorHandle", null);
__decorate([
    ViewChild('hue', { static: false })
], ColorPicker.prototype, "hue", null);
__decorate([
    ViewChild('hueHandle', { static: false })
], ColorPicker.prototype, "hueHandle", null);
ColorPicker = __decorate([
    Component({
        selector: 'p-colorPicker',
        template: `
        <div [ngStyle]="style" [class]="styleClass" [ngClass]="{'ui-colorpicker ui-widget':true,'ui-colorpicker-overlay':!inline,'ui-colorpicker-dragging':colorDragging||hueDragging}">
            <input #input type="text" *ngIf="!inline" class="ui-colorpicker-preview ui-inputtext ui-state-default ui-corner-all" readonly="readonly" [ngClass]="{'ui-state-disabled': disabled}"
                (focus)="onInputFocus()" (click)="onInputClick()" (keydown)="onInputKeydown($event)" [attr.id]="inputId" [attr.tabindex]="tabindex" [disabled]="disabled"
                [style.backgroundColor]="inputBgColor">
            <div *ngIf="inline || overlayVisible" [ngClass]="{'ui-colorpicker-panel ui-corner-all': true, 'ui-colorpicker-overlay-panel ui-shadow':!inline, 'ui-state-disabled': disabled}" (click)="onPanelClick()"
                [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="inline === true" (@overlayAnimation.start)="onOverlayAnimationStart($event)">
                <div class="ui-colorpicker-content">
                    <div #colorSelector class="ui-colorpicker-color-selector" (mousedown)="onColorMousedown($event)">
                        <div class="ui-colorpicker-color">
                            <div #colorHandle class="ui-colorpicker-color-handle"></div>
                        </div>
                    </div>
                    <div #hue class="ui-colorpicker-hue" (mousedown)="onHueMousedown($event)">
                        <div #hueHandle class="ui-colorpicker-hue-handle"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
        animations: [
            trigger('overlayAnimation', [
                state('void', style({
                    transform: 'translateY(5%)',
                    opacity: 0
                })),
                state('visible', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                transition('void => visible', animate('{{showTransitionParams}}')),
                transition('visible => void', animate('{{hideTransitionParams}}'))
            ])
        ],
        providers: [COLORPICKER_VALUE_ACCESSOR]
    })
], ColorPicker);
export { ColorPicker };
let ColorPickerModule = class ColorPickerModule {
};
ColorPickerModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [ColorPicker],
        declarations: [ColorPicker]
    })
], ColorPickerModule);
export { ColorPickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JwaWNrZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2NvbG9ycGlja2VyLyIsInNvdXJjZXMiOlsiY29sb3JwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3SixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBa0IsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQXdCLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQVE7SUFDN0MsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztJQUMxQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUF3Q0YsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQW9FcEIsWUFBbUIsRUFBYyxFQUFTLFFBQW1CLEVBQVMsRUFBcUI7UUFBeEUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQTVEbEYsV0FBTSxHQUFXLEtBQUssQ0FBQztRQVV2QixlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsMEJBQXFCLEdBQVcsZ0JBQWdCLENBQUM7UUFFakQsMEJBQXFC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O2lCQUM1QyxJQUFJLENBQUMsR0FBQyxHQUFHLEVBQUU7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFBO2FBQUM7aUJBQzVDLElBQUksQ0FBQyxHQUFDLEdBQUcsRUFBRTtnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztnQkFBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUE7YUFBQztpQkFDNUMsSUFBSSxDQUFDLEdBQUMsR0FBRyxFQUFFO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQTthQUFDO2lCQUM1QyxJQUFJLENBQUMsR0FBQyxHQUFHLEVBQUU7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUM7Z0JBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFBO2FBQUM7aUJBQzVDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO2FBQUM7U0FDbkM7UUFDRCxPQUFPLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FB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LENBQUMsQ0FBQztnQkFDSCxVQUFVLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQ2xFLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQzthQUNyRSxDQUFDO1NBQ0w7UUFDRCxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztLQUMxQyxDQUFDO0dBQ1csV0FBVyxDQW1mdkI7U0FuZlksV0FBVztBQTBmeEIsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7Q0FBSSxDQUFBO0FBQXJCLGlCQUFpQjtJQUw3QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3RCLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztLQUM5QixDQUFDO0dBQ1csaUJBQWlCLENBQUk7U0FBckIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIFJlbmRlcmVyMiwgVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCBhbmltYXRlLCBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERvbUhhbmRsZXIgfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBDT0xPUlBJQ0tFUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ29sb3JQaWNrZXIpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWNvbG9yUGlja2VyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdDbGFzc109XCJ7J3VpLWNvbG9ycGlja2VyIHVpLXdpZGdldCc6dHJ1ZSwndWktY29sb3JwaWNrZXItb3ZlcmxheSc6IWlubGluZSwndWktY29sb3JwaWNrZXItZHJhZ2dpbmcnOmNvbG9yRHJhZ2dpbmd8fGh1ZURyYWdnaW5nfVwiPlxuICAgICAgICAgICAgPGlucHV0ICNpbnB1dCB0eXBlPVwidGV4dFwiICpuZ0lmPVwiIWlubGluZVwiIGNsYXNzPVwidWktY29sb3JwaWNrZXItcHJldmlldyB1aS1pbnB1dHRleHQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgcmVhZG9ubHk9XCJyZWFkb25seVwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIlxuICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoKVwiIChjbGljayk9XCJvbklucHV0Q2xpY2soKVwiIChrZXlkb3duKT1cIm9uSW5wdXRLZXlkb3duKCRldmVudClcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiaW5wdXRCZ0NvbG9yXCI+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaW5saW5lIHx8IG92ZXJsYXlWaXNpYmxlXCIgW25nQ2xhc3NdPVwieyd1aS1jb2xvcnBpY2tlci1wYW5lbCB1aS1jb3JuZXItYWxsJzogdHJ1ZSwgJ3VpLWNvbG9ycGlja2VyLW92ZXJsYXktcGFuZWwgdWktc2hhZG93JzohaW5saW5lLCAndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIiAoY2xpY2spPVwib25QYW5lbENsaWNrKClcIlxuICAgICAgICAgICAgICAgIFtAb3ZlcmxheUFuaW1hdGlvbl09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCIgW0AuZGlzYWJsZWRdPVwiaW5saW5lID09PSB0cnVlXCIgKEBvdmVybGF5QW5pbWF0aW9uLnN0YXJ0KT1cIm9uT3ZlcmxheUFuaW1hdGlvblN0YXJ0KCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktY29sb3JwaWNrZXItY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICNjb2xvclNlbGVjdG9yIGNsYXNzPVwidWktY29sb3JwaWNrZXItY29sb3Itc2VsZWN0b3JcIiAobW91c2Vkb3duKT1cIm9uQ29sb3JNb3VzZWRvd24oJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNvbG9ycGlja2VyLWNvbG9yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAjY29sb3JIYW5kbGUgY2xhc3M9XCJ1aS1jb2xvcnBpY2tlci1jb2xvci1oYW5kbGVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAjaHVlIGNsYXNzPVwidWktY29sb3JwaWNrZXItaHVlXCIgKG1vdXNlZG93bik9XCJvbkh1ZU1vdXNlZG93bigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2ICNodWVIYW5kbGUgY2xhc3M9XCJ1aS1jb2xvcnBpY2tlci1odWUtaGFuZGxlXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSg1JSknLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoe1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdmlzaWJsZScsIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPT4gdm9pZCcsIGFuaW1hdGUoJ3t7aGlkZVRyYW5zaXRpb25QYXJhbXN9fScpKVxuICAgICAgICBdKVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbQ09MT1JQSUNLRVJfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIENvbG9yUGlja2VyIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGlubGluZTogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBmb3JtYXQ6IHN0cmluZyA9ICdoZXgnO1xuICAgIFxuICAgIEBJbnB1dCgpIGFwcGVuZFRvOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhdXRvWkluZGV4OiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgc2hvd1RyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMjI1bXMgZWFzZS1vdXQnO1xuXG4gICAgQElucHV0KCkgaGlkZVRyYW5zaXRpb25PcHRpb25zOiBzdHJpbmcgPSAnMTk1bXMgZWFzZS1pbic7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAVmlld0NoaWxkKCdpbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KSBpbnB1dFZpZXdDaGlsZDogRWxlbWVudFJlZjtcbiAgICBcbiAgICB2YWx1ZTogYW55O1xuICAgIFxuICAgIGlucHV0QmdDb2xvcjogc3RyaW5nO1xuICAgIFxuICAgIHNob3duOiBib29sZWFuO1xuICAgIFxuICAgIG92ZXJsYXlWaXNpYmxlOiBib29sZWFuO1xuICAgIFxuICAgIGRlZmF1bHRDb2xvcjogc3RyaW5nID0gJ2ZmMDAwMCc7XG4gICAgXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBkb2N1bWVudENsaWNrTGlzdGVuZXI6IEZ1bmN0aW9uO1xuICAgIFxuICAgIGRvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXI6IEZ1bmN0aW9uO1xuICAgIFxuICAgIGRvY3VtZW50TW91c2V1cExpc3RlbmVyOiBGdW5jdGlvbjtcbiAgICBcbiAgICBkb2N1bWVudEh1ZU1vdmVMaXN0ZW5lcjogRnVuY3Rpb247XG4gICAgICAgICAgICAgICAgXG4gICAgc2VsZkNsaWNrOiBib29sZWFuO1xuICAgIFxuICAgIGNvbG9yRHJhZ2dpbmc6IGJvb2xlYW47XG4gICAgXG4gICAgaHVlRHJhZ2dpbmc6IGJvb2xlYW47XG5cbiAgICBvdmVybGF5OiBIVE1MRGl2RWxlbWVudDtcblxuICAgIGNvbG9yU2VsZWN0b3JWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG4gICAgXG4gICAgY29sb3JIYW5kbGVWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG4gICAgXG4gICAgaHVlVmlld0NoaWxkOiBFbGVtZW50UmVmO1xuICAgIFxuICAgIGh1ZUhhbmRsZVZpZXdDaGlsZDogRWxlbWVudFJlZjtcbiAgICAgICAgICAgICAgICBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuICAgICAgICBcbiAgICBAVmlld0NoaWxkKCdjb2xvclNlbGVjdG9yJywgeyBzdGF0aWM6IGZhbHNlIH0pIHNldCBjb2xvclNlbGVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5jb2xvclNlbGVjdG9yVmlld0NoaWxkID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKCdjb2xvckhhbmRsZScsIHsgc3RhdGljOiBmYWxzZSB9KSBzZXQgY29sb3JIYW5kbGUoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmNvbG9ySGFuZGxlVmlld0NoaWxkID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKCdodWUnLCB7IHN0YXRpYzogZmFsc2UgfSkgc2V0IGh1ZShlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuaHVlVmlld0NoaWxkID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICBAVmlld0NoaWxkKCdodWVIYW5kbGUnLCB7IHN0YXRpYzogZmFsc2UgfSkgc2V0IGh1ZUhhbmRsZShlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuaHVlSGFuZGxlVmlld0NoaWxkID0gZWxlbWVudDtcbiAgICB9XG5cbiAgICBvbkh1ZU1vdXNlZG93bihldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmJpbmREb2N1bWVudE1vdXNlbW92ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYmluZERvY3VtZW50TW91c2V1cExpc3RlbmVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmh1ZURyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5waWNrSHVlKGV2ZW50KTtcbiAgICB9XG4gICAgXG4gICAgcGlja0h1ZShldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBsZXQgdG9wOiBudW1iZXIgPSB0aGlzLmh1ZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArICh3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsaWRhdGVIU0Ioe1xuICAgICAgICAgICAgaDogTWF0aC5mbG9vcigzNjAgKiAoMTUwIC0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTUwLCAoZXZlbnQucGFnZVkgLSB0b3ApKSkpIC8gMTUwKSxcbiAgICAgICAgICAgIHM6IHRoaXMudmFsdWUucyxcbiAgICAgICAgICAgIGI6IHRoaXMudmFsdWUuYlxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudXBkYXRlQ29sb3JTZWxlY3RvcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgdmFsdWU6IHRoaXMuZ2V0VmFsdWVUb1VwZGF0ZSgpfSk7XG4gICAgfVxuICAgIFxuICAgIG9uQ29sb3JNb3VzZWRvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmJpbmREb2N1bWVudE1vdXNldXBMaXN0ZW5lcigpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jb2xvckRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5waWNrQ29sb3IoZXZlbnQpO1xuICAgIH1cbiAgICBcbiAgICBwaWNrQ29sb3IoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgbGV0IHJlY3QgPSB0aGlzLmNvbG9yU2VsZWN0b3JWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IHRvcCA9IHJlY3QudG9wICsgKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDApO1xuICAgICAgICBsZXQgbGVmdCA9IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdDtcbiAgICAgICAgbGV0IHNhdHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMCAqIChNYXRoLm1heCgwLCBNYXRoLm1pbigxNTAsIChldmVudC5wYWdlWCAtIGxlZnQpKSkpIC8gMTUwKTtcbiAgICAgICAgbGV0IGJyaWdodG5lc3MgPSBNYXRoLmZsb29yKDEwMCAqICgxNTAgLSBNYXRoLm1heCgwLCBNYXRoLm1pbigxNTAsIChldmVudC5wYWdlWSAtIHRvcCkpKSkgLyAxNTApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWxpZGF0ZUhTQih7XG4gICAgICAgICAgICBoOiB0aGlzLnZhbHVlLmgsXG4gICAgICAgICAgICBzOiBzYXR1cmF0aW9uLFxuICAgICAgICAgICAgYjogYnJpZ2h0bmVzc1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMudXBkYXRlVUkoKTtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RlbCgpO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCB2YWx1ZTogdGhpcy5nZXRWYWx1ZVRvVXBkYXRlKCl9KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0VmFsdWVUb1VwZGF0ZSgpIHtcbiAgICAgICAgbGV0IHZhbDogYW55O1xuICAgICAgICBzd2l0Y2godGhpcy5mb3JtYXQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgICAgICAgICAgdmFsID0gJyMnICsgdGhpcy5IU0J0b0hFWCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjYXNlICdyZ2InOlxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuSFNCdG9SR0IodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2FzZSAnaHNiJzpcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZU1vZGVsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5nZXRWYWx1ZVRvVXBkYXRlKCkpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLmZvcm1hdCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLkhFWHRvSFNCKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjYXNlICdyZ2InOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5SR0J0b0hTQih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY2FzZSAnaHNiJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuSEVYdG9IU0IodGhpcy5kZWZhdWx0Q29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnVwZGF0ZUNvbG9yU2VsZWN0b3IoKTtcbiAgICAgICAgdGhpcy51cGRhdGVVSSgpO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVDb2xvclNlbGVjdG9yKCkge1xuICAgICAgICBpZiAodGhpcy5jb2xvclNlbGVjdG9yVmlld0NoaWxkKSB7XG4gICAgICAgICAgICBjb25zdCBoc2I6IGFueSA9IHt9O1xuICAgICAgICAgICAgaHNiLnMgPSAxMDA7XG4gICAgICAgICAgICBoc2IuYiA9IDEwMDtcbiAgICAgICAgICAgIGhzYi5oID0gdGhpcy52YWx1ZS5oO1xuXG4gICAgICAgICAgICB0aGlzLmNvbG9yU2VsZWN0b3JWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIycgKyB0aGlzLkhTQnRvSEVYKGhzYik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIHVwZGF0ZVVJKCkge1xuICAgICAgICBpZiAodGhpcy5jb2xvckhhbmRsZVZpZXdDaGlsZCAmJiB0aGlzLmh1ZUhhbmRsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9ySGFuZGxlVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9ICBNYXRoLmZsb29yKDE1MCAqIHRoaXMudmFsdWUucyAvIDEwMCkgKyAncHgnO1xuICAgICAgICAgICAgdGhpcy5jb2xvckhhbmRsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9ICBNYXRoLmZsb29yKDE1MCAqICgxMDAgLSB0aGlzLnZhbHVlLmIpIC8gMTAwKSArICdweCc7XG4gICAgICAgICAgICB0aGlzLmh1ZUhhbmRsZVZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IE1hdGguZmxvb3IoMTUwIC0gKDE1MCAqIHRoaXMudmFsdWUuaCAvIDM2MCkpICsgJ3B4JztcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnB1dEJnQ29sb3IgPSAnIycgKyB0aGlzLkhTQnRvSEVYKHRoaXMudmFsdWUpO1xuICAgIH1cbiAgICBcbiAgICBvbklucHV0Rm9jdXMoKSB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICB9XG4gICAgXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaChldmVudC50b1N0YXRlKSB7XG4gICAgICAgICAgICBjYXNlICd2aXNpYmxlJzpcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaW5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheSA9IGV2ZW50LmVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kT3ZlcmxheSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5hdXRvWkluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuekluZGV4ID0gU3RyaW5nKHRoaXMuYmFzZVpJbmRleCArICgrK0RvbUhhbmRsZXIuemluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGlnbk92ZXJsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDb2xvclNlbGVjdG9yKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVUkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwcGVuZE92ZXJsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hcHBlbmRUbyA9PT0gJ2JvZHknKVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheSwgdGhpcy5hcHBlbmRUbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN0b3JlT3ZlcmxheUFwcGVuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSAmJiB0aGlzLmFwcGVuZFRvKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBhbGlnbk92ZXJsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmFwcGVuZFRvKVxuICAgICAgICAgICAgRG9tSGFuZGxlci5hYnNvbHV0ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgRG9tSGFuZGxlci5yZWxhdGl2ZVBvc2l0aW9uKHRoaXMub3ZlcmxheSwgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG4gICAgXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5VmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICAgICAgIFxuICAgIG9uSW5wdXRDbGljaygpIHtcbiAgICAgICAgdGhpcy5zZWxmQ2xpY2sgPSB0cnVlO1xuICAgICAgICB0aGlzLnRvZ2dsZVBhbmVsKCk7XG4gICAgfVxuICAgIFxuICAgIHRvZ2dsZVBhbmVsKCkge1xuICAgICAgICBpZiAoIXRoaXMub3ZlcmxheVZpc2libGUpXG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICAgIFxuICAgIG9uSW5wdXRLZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHN3aXRjaChldmVudC53aGljaCkge1xuICAgICAgICAgICAgLy9zcGFjZVxuICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVBhbmVsKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2VzY2FwZSBhbmQgdGFiXG4gICAgICAgICAgICBjYXNlIDI3OlxuICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIG9uUGFuZWxDbGljaygpIHtcbiAgICAgICAgdGhpcy5zZWxmQ2xpY2sgPSB0cnVlO1xuICAgIH1cbiAgICBcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UgPSBmbjtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCA9IGZuO1xuICAgIH1cbiAgICBcbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gdmFsO1xuICAgIH1cbiAgICBcbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2VsZkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxmQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gICAgXG4gICAgfVxuICAgIFxuICAgIHVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGJpbmREb2N1bWVudE1vdXNlbW92ZUxpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlbW92ZUxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ21vdXNlbW92ZScsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbG9yRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5waWNrQ29sb3IoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5odWVEcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBpY2tIdWUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHVuYmluZERvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZW1vdmVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlbW92ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBiaW5kRG9jdW1lbnRNb3VzZXVwTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudE1vdXNldXBMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNldXBMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuaHVlRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50TW91c2Vtb3ZlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50TW91c2V1cExpc3RlbmVyKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1bmJpbmREb2N1bWVudE1vdXNldXBMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRNb3VzZXVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZXVwTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZXVwTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVIU0IoaHNiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoOiBNYXRoLm1pbigzNjAsIE1hdGgubWF4KDAsIGhzYi5oKSksXG4gICAgICAgICAgICBzOiBNYXRoLm1pbigxMDAsIE1hdGgubWF4KDAsIGhzYi5zKSksXG4gICAgICAgICAgICBiOiBNYXRoLm1pbigxMDAsIE1hdGgubWF4KDAsIGhzYi5iKSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgdmFsaWRhdGVSR0IocmdiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByOiBNYXRoLm1pbigyNTUsIE1hdGgubWF4KDAsIHJnYi5yKSksXG4gICAgICAgICAgICBnOiBNYXRoLm1pbigyNTUsIE1hdGgubWF4KDAsIHJnYi5nKSksXG4gICAgICAgICAgICBiOiBNYXRoLm1pbigyNTUsIE1hdGgubWF4KDAsIHJnYi5iKSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgdmFsaWRhdGVIRVgoaGV4KSB7XG4gICAgICAgIHZhciBsZW4gPSA2IC0gaGV4Lmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgICAgIHZhciBvID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvLnB1c2goJzAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG8ucHVzaChoZXgpO1xuICAgICAgICAgICAgaGV4ID0gby5qb2luKCcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGV4O1xuICAgIH1cbiAgICBcbiAgICBIRVh0b1JHQihoZXgpIHtcbiAgICAgICAgbGV0IGhleFZhbHVlID0gcGFyc2VJbnQoKChoZXguaW5kZXhPZignIycpID4gLTEpID8gaGV4LnN1YnN0cmluZygxKSA6IGhleCksIDE2KTtcbiAgICAgICAgcmV0dXJuIHtyOiBoZXhWYWx1ZSA+PiAxNiwgZzogKGhleFZhbHVlICYgMHgwMEZGMDApID4+IDgsIGI6IChoZXhWYWx1ZSAmIDB4MDAwMEZGKX07XG4gICAgfVxuICAgIFxuICAgIEhFWHRvSFNCKGhleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5SR0J0b0hTQih0aGlzLkhFWHRvUkdCKGhleCkpO1xuICAgIH1cbiAgICBcbiAgICBSR0J0b0hTQihyZ2IpIHtcbiAgICAgICAgdmFyIGhzYiA9IHtcbiAgICAgICAgICAgIGg6IDAsXG4gICAgICAgICAgICBzOiAwLFxuICAgICAgICAgICAgYjogMFxuICAgICAgICB9O1xuICAgICAgICB2YXIgbWluID0gTWF0aC5taW4ocmdiLnIsIHJnYi5nLCByZ2IuYik7XG4gICAgICAgIHZhciBtYXggPSBNYXRoLm1heChyZ2IuciwgcmdiLmcsIHJnYi5iKTtcbiAgICAgICAgdmFyIGRlbHRhID0gbWF4IC0gbWluO1xuICAgICAgICBoc2IuYiA9IG1heDtcbiAgICAgICAgaHNiLnMgPSBtYXggIT0gMCA/IDI1NSAqIGRlbHRhIC8gbWF4IDogMDtcbiAgICAgICAgaWYgKGhzYi5zICE9IDApIHtcbiAgICAgICAgICAgIGlmIChyZ2IuciA9PSBtYXgpIHtcbiAgICAgICAgICAgICAgICBoc2IuaCA9IChyZ2IuZyAtIHJnYi5iKSAvIGRlbHRhO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZ2IuZyA9PSBtYXgpIHtcbiAgICAgICAgICAgICAgICBoc2IuaCA9IDIgKyAocmdiLmIgLSByZ2IucikgLyBkZWx0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaHNiLmggPSA0ICsgKHJnYi5yIC0gcmdiLmcpIC8gZGVsdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoc2IuaCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGhzYi5oICo9IDYwO1xuICAgICAgICBpZiAoaHNiLmggPCAwKSB7XG4gICAgICAgICAgICBoc2IuaCArPSAzNjA7XG4gICAgICAgIH1cbiAgICAgICAgaHNiLnMgKj0gMTAwLzI1NTtcbiAgICAgICAgaHNiLmIgKj0gMTAwLzI1NTtcbiAgICAgICAgcmV0dXJuIGhzYjtcbiAgICB9XG4gICAgXG4gICAgSFNCdG9SR0IoaHNiKSB7XG4gICAgICAgIHZhciByZ2IgPSB7XG4gICAgICAgICAgICByOiBudWxsLCBnOiBudWxsLCBiOiBudWxsXG4gICAgICAgIH07XG4gICAgICAgIGxldCBoOiBudW1iZXIgPSBoc2IuaDtcbiAgICAgICAgbGV0IHM6IG51bWJlciA9IGhzYi5zKjI1NS8xMDA7XG4gICAgICAgIGxldCB2OiBudW1iZXIgPSBoc2IuYioyNTUvMTAwO1xuICAgICAgICBpZiAocyA9PSAwKSB7XG4gICAgICAgICAgICByZ2IgPSB7XG4gICAgICAgICAgICAgICAgcjogdixcbiAgICAgICAgICAgICAgICBnOiB2LFxuICAgICAgICAgICAgICAgIGI6IHZcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgdDE6IG51bWJlciA9IHY7XG4gICAgICAgICAgICBsZXQgdDI6IG51bWJlciA9ICgyNTUtcykqdi8yNTU7XG4gICAgICAgICAgICBsZXQgdDM6IG51bWJlciA9ICh0MS10MikqKGglNjApLzYwO1xuICAgICAgICAgICAgaWYgKGg9PTM2MCkgaCA9IDA7XG4gICAgICAgICAgICBpZiAoaDw2MCkge3JnYi5yPXQxO1x0cmdiLmI9dDI7IHJnYi5nPXQyK3QzfVxuICAgICAgICAgICAgZWxzZSBpZiAoaDwxMjApIHtyZ2IuZz10MTsgcmdiLmI9dDI7XHRyZ2Iucj10MS10M31cbiAgICAgICAgICAgIGVsc2UgaWYgKGg8MTgwKSB7cmdiLmc9dDE7IHJnYi5yPXQyO1x0cmdiLmI9dDIrdDN9XG4gICAgICAgICAgICBlbHNlIGlmIChoPDI0MCkge3JnYi5iPXQxOyByZ2Iucj10MjtcdHJnYi5nPXQxLXQzfVxuICAgICAgICAgICAgZWxzZSBpZiAoaDwzMDApIHtyZ2IuYj10MTsgcmdiLmc9dDI7XHRyZ2Iucj10Mit0M31cbiAgICAgICAgICAgIGVsc2UgaWYgKGg8MzYwKSB7cmdiLnI9dDE7IHJnYi5nPXQyO1x0cmdiLmI9dDEtdDN9XG4gICAgICAgICAgICBlbHNlIHtyZ2Iucj0wOyByZ2IuZz0wO1x0cmdiLmI9MH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3I6TWF0aC5yb3VuZChyZ2IuciksIGc6TWF0aC5yb3VuZChyZ2IuZyksIGI6TWF0aC5yb3VuZChyZ2IuYil9O1xuICAgIH1cbiAgICBcbiAgICBSR0J0b0hFWChyZ2IpIHtcbiAgICAgICAgdmFyIGhleCA9IFtcbiAgICAgICAgICAgIHJnYi5yLnRvU3RyaW5nKDE2KSxcbiAgICAgICAgICAgIHJnYi5nLnRvU3RyaW5nKDE2KSxcbiAgICAgICAgICAgIHJnYi5iLnRvU3RyaW5nKDE2KVxuICAgICAgICBdO1xuICAgICAgICBcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gaGV4KSB7XG4gICAgICAgICAgICBpZiAoaGV4W2tleV0ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICBoZXhba2V5XSA9ICcwJyArIGhleFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ICAgICAgICBcblxuICAgICAgICByZXR1cm4gaGV4LmpvaW4oJycpO1xuICAgIH1cbiAgICBcbiAgICBIU0J0b0hFWChoc2IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuUkdCdG9IRVgodGhpcy5IU0J0b1JHQihoc2IpKTtcbiAgICB9XG5cbiAgICBvbk92ZXJsYXlIaWRlKCkge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLm92ZXJsYXkgPSBudWxsO1xuICAgIH1cbiAgICBcbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5yZXN0b3JlT3ZlcmxheUFwcGVuZCgpO1xuICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0NvbG9yUGlja2VyXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtDb2xvclBpY2tlcl1cbn0pXG5leHBvcnQgY2xhc3MgQ29sb3JQaWNrZXJNb2R1bGUgeyB9XG4iXX0=