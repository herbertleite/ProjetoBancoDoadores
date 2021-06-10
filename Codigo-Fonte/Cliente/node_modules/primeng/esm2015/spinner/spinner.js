var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, AfterViewInit, Input, Output, EventEmitter, forwardRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const SPINNER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Spinner),
    multi: true
};
let Spinner = class Spinner {
    constructor(el, cd) {
        this.el = el;
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.step = 1;
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
        this.keyPattern = /[0-9\+\-]/;
        this.negativeSeparator = '-';
    }
    ngAfterViewInit() {
        if (this.value && this.value.toString().indexOf('.') > 0) {
            this.precision = this.value.toString().split(/[.]/)[1].length;
        }
        else if (this.step % 1 !== 0) {
            // If step is not an integer then extract the length of the decimal part
            this.precision = this.step.toString().split(/[,]|[.]/)[1].length;
        }
        if (this.formatInput) {
            this.localeDecimalSeparator = (1.1).toLocaleString().substring(1, 2);
            this.localeThousandSeparator = (1000).toLocaleString().substring(1, 2);
            this.thousandRegExp = new RegExp(`[${this.thousandSeparator || this.localeThousandSeparator}]`, 'gim');
            if (this.decimalSeparator && this.thousandSeparator && this.decimalSeparator === this.thousandSeparator) {
                console.warn("thousandSeparator and decimalSeparator cannot have the same value.");
            }
        }
    }
    repeat(event, interval, dir) {
        let i = interval || 500;
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(event, 40, dir);
        }, i);
        this.spin(event, dir);
    }
    spin(event, dir) {
        let step = this.step * dir;
        let currentValue;
        if (this.value)
            currentValue = (typeof this.value === 'string') ? this.parseValue(this.value) : this.value;
        else
            currentValue = 0;
        if (this.precision)
            this.value = parseFloat(this.toFixed(currentValue + step, this.precision));
        else
            this.value = currentValue + step;
        if (this.maxlength !== undefined && this.value.toString().length > this.maxlength) {
            this.value = currentValue;
        }
        if (this.min !== undefined && this.value < this.min) {
            this.value = this.min;
        }
        if (this.max !== undefined && this.value > this.max) {
            this.value = this.max;
        }
        this.formatValue();
        this.onModelChange(this.value);
        this.onChange.emit(event);
    }
    toFixed(value, precision) {
        let power = Math.pow(10, precision || 0);
        return String(Math.round(value * power) / power);
    }
    onUpButtonMousedown(event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, 1);
            this.updateFilledState();
            event.preventDefault();
        }
    }
    onUpButtonMouseup(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onUpButtonMouseleave(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onDownButtonMousedown(event) {
        if (!this.disabled) {
            this.inputfieldViewChild.nativeElement.focus();
            this.repeat(event, null, -1);
            this.updateFilledState();
            event.preventDefault();
        }
    }
    onDownButtonMouseup(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onDownButtonMouseleave(event) {
        if (!this.disabled) {
            this.clearTimer();
        }
    }
    onInputKeydown(event) {
        if (event.which == 38) {
            this.spin(event, 1);
            event.preventDefault();
        }
        else if (event.which == 40) {
            this.spin(event, -1);
            event.preventDefault();
        }
    }
    onInputChange(event) {
        this.onChange.emit(event);
    }
    onInput(event) {
        this.value = this.parseValue(event.target.value);
        this.onModelChange(this.value);
        this.updateFilledState();
    }
    onInputBlur(event) {
        this.focus = false;
        this.formatValue();
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit(event);
    }
    parseValue(val) {
        let value;
        if (val.trim() === '') {
            value = null;
        }
        else {
            if (this.formatInput) {
                val = val.replace(this.thousandRegExp, '');
            }
            if (this.precision) {
                val = this.formatInput ? val.replace(this.decimalSeparator || this.localeDecimalSeparator, '.') : val.replace(',', '.');
                value = parseFloat(val);
            }
            else {
                value = parseInt(val, 10);
            }
            if (!isNaN(value)) {
                if (this.max !== null && value > this.max) {
                    value = this.max;
                }
                if (this.min !== null && value < this.min) {
                    value = this.min;
                }
            }
            else {
                value = null;
            }
        }
        return value;
    }
    formatValue() {
        let value = this.value;
        if (value != null) {
            if (this.formatInput) {
                value = value.toLocaleString(undefined, { maximumFractionDigits: 20 });
                if (this.decimalSeparator && this.thousandSeparator) {
                    value = value.split(this.localeDecimalSeparator);
                    if (this.precision && value[1]) {
                        value[1] = (this.decimalSeparator || this.localeDecimalSeparator) + value[1];
                    }
                    if (this.thousandSeparator && value[0].length > 3) {
                        value[0] = value[0].replace(new RegExp(`[${this.localeThousandSeparator}]`, 'gim'), this.thousandSeparator);
                    }
                    value = value.join('');
                }
            }
            this.formattedValue = value.toString();
        }
        else {
            this.formattedValue = null;
        }
        if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
            this.inputfieldViewChild.nativeElement.value = this.formattedValue;
        }
    }
    clearTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    writeValue(value) {
        this.value = value;
        this.formatValue();
        this.updateFilledState();
        this.cd.markForCheck();
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
    updateFilledState() {
        this.filled = (this.value !== undefined && this.value != null);
    }
};
Spinner.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
__decorate([
    Output()
], Spinner.prototype, "onChange", void 0);
__decorate([
    Output()
], Spinner.prototype, "onFocus", void 0);
__decorate([
    Output()
], Spinner.prototype, "onBlur", void 0);
__decorate([
    Input()
], Spinner.prototype, "step", void 0);
__decorate([
    Input()
], Spinner.prototype, "min", void 0);
__decorate([
    Input()
], Spinner.prototype, "max", void 0);
__decorate([
    Input()
], Spinner.prototype, "maxlength", void 0);
__decorate([
    Input()
], Spinner.prototype, "size", void 0);
__decorate([
    Input()
], Spinner.prototype, "placeholder", void 0);
__decorate([
    Input()
], Spinner.prototype, "inputId", void 0);
__decorate([
    Input()
], Spinner.prototype, "disabled", void 0);
__decorate([
    Input()
], Spinner.prototype, "readonly", void 0);
__decorate([
    Input()
], Spinner.prototype, "tabindex", void 0);
__decorate([
    Input()
], Spinner.prototype, "required", void 0);
__decorate([
    Input()
], Spinner.prototype, "name", void 0);
__decorate([
    Input()
], Spinner.prototype, "ariaLabelledBy", void 0);
__decorate([
    Input()
], Spinner.prototype, "inputStyle", void 0);
__decorate([
    Input()
], Spinner.prototype, "inputStyleClass", void 0);
__decorate([
    Input()
], Spinner.prototype, "formatInput", void 0);
__decorate([
    Input()
], Spinner.prototype, "decimalSeparator", void 0);
__decorate([
    Input()
], Spinner.prototype, "thousandSeparator", void 0);
__decorate([
    ViewChild('inputfield', { static: true })
], Spinner.prototype, "inputfieldViewChild", void 0);
Spinner = __decorate([
    Component({
        selector: 'p-spinner',
        template: `
        <span class="ui-spinner ui-widget ui-corner-all">
            <input #inputfield type="text" [attr.id]="inputId" [value]="formattedValue||null" [attr.name]="name" [attr.aria-valumin]="min" [attr.aria-valuemax]="max" [attr.aria-valuenow]="value" [attr.aria-labelledby]="ariaLabelledBy"
            [attr.size]="size" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.placeholder]="placeholder" [disabled]="disabled" [readonly]="readonly" [attr.required]="required"
            (keydown)="onInputKeydown($event)" (blur)="onInputBlur($event)" (input)="onInput($event)" (change)="onInputChange($event)" (focus)="onInputFocus($event)"
            [ngStyle]="inputStyle" [class]="inputStyleClass" [ngClass]="'ui-spinner-input ui-inputtext ui-widget ui-state-default ui-corner-all'">
            <button type="button" [ngClass]="{'ui-spinner-button ui-spinner-up ui-corner-tr ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}" [disabled]="disabled||readonly" [attr.tabindex]="tabindex" [attr.readonly]="readonly"
                (mouseleave)="onUpButtonMouseleave($event)" (mousedown)="onUpButtonMousedown($event)" (mouseup)="onUpButtonMouseup($event)">
                <span class="ui-spinner-button-icon pi pi-caret-up ui-clickable"></span>
            </button>
            <button type="button" [ngClass]="{'ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default':true,'ui-state-disabled':disabled}" [disabled]="disabled||readonly" [attr.tabindex]="tabindex" [attr.readonly]="readonly"
                (mouseleave)="onDownButtonMouseleave($event)" (mousedown)="onDownButtonMousedown($event)" (mouseup)="onDownButtonMouseup($event)">
                <span class="ui-spinner-button-icon pi pi-caret-down ui-clickable"></span>
            </button>
        </span>
    `,
        host: {
            '[class.ui-inputwrapper-filled]': 'filled',
            '[class.ui-inputwrapper-focus]': 'focus'
        },
        providers: [SPINNER_VALUE_ACCESSOR]
    })
], Spinner);
export { Spinner };
let SpinnerModule = class SpinnerModule {
};
SpinnerModule = __decorate([
    NgModule({
        imports: [CommonModule, InputTextModule],
        exports: [Spinner],
        declarations: [Spinner]
    })
], SpinnerModule);
export { SpinnerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvc3Bpbm5lci8iLCJzb3VyY2VzIjpbInNwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFFLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVJLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFRO0lBQ3ZDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFDdEMsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBMEJGLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQU87SUF3RWhCLFlBQW1CLEVBQWMsRUFBUyxFQUFxQjtRQUE1QyxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUF0RXJELGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhELFNBQUksR0FBVyxDQUFDLENBQUM7UUF3QzFCLGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRXBDLGVBQVUsR0FBVyxXQUFXLENBQUM7UUFVMUIsc0JBQWlC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LEVBQUU7eUNBQWtCO0FBRWpCO0lBQVIsS0FBSyxFQUFFO3lDQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTtxQ0FBYztBQUViO0lBQVIsS0FBSyxFQUFFOytDQUF3QjtBQUV2QjtJQUFSLEtBQUssRUFBRTsyQ0FBaUI7QUFFaEI7SUFBUixLQUFLLEVBQUU7Z0RBQXlCO0FBRXhCO0lBQVIsS0FBSyxFQUFFOzRDQUFzQjtBQUVyQjtJQUFSLEtBQUssRUFBRTtpREFBMEI7QUFFekI7SUFBUixLQUFLLEVBQUU7a0RBQTJCO0FBNEJRO0lBQTFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7b0RBQWlDO0FBdEVsRSxPQUFPO0lBeEJuQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztLQWVUO1FBQ0QsSUFBSSxFQUFFO1lBQ0YsZ0NBQWdDLEVBQUUsUUFBUTtZQUMxQywrQkFBK0IsRUFBRSxPQUFPO1NBQzNDO1FBQ0QsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7S0FDdEMsQ0FBQztHQUNXLE9BQU8sQ0F5VG5CO1NBelRZLE9BQU87QUFpVXBCLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7Q0FBSSxDQUFBO0FBQWpCLGFBQWE7SUFMekIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLGVBQWUsQ0FBQztRQUN2QyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsWUFBWSxFQUFFLENBQUMsT0FBTyxDQUFDO0tBQzFCLENBQUM7R0FDVyxhQUFhLENBQUk7U0FBakIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsQWZ0ZXJWaWV3SW5pdCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLGZvcndhcmRSZWYsVmlld0NoaWxkLCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5wdXRUZXh0TW9kdWxlfSBmcm9tICdwcmltZW5nL2lucHV0dGV4dCc7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgU1BJTk5FUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNwaW5uZXIpLFxuICAgIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc3Bpbm5lcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zcGlubmVyIHVpLXdpZGdldCB1aS1jb3JuZXItYWxsXCI+XG4gICAgICAgICAgICA8aW5wdXQgI2lucHV0ZmllbGQgdHlwZT1cInRleHRcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW3ZhbHVlXT1cImZvcm1hdHRlZFZhbHVlfHxudWxsXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2F0dHIuYXJpYS12YWx1bWluXT1cIm1pblwiIFthdHRyLmFyaWEtdmFsdWVtYXhdPVwibWF4XCIgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJ2YWx1ZVwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiXG4gICAgICAgICAgICBbYXR0ci5zaXplXT1cInNpemVcIiBbYXR0ci5tYXhsZW5ndGhdPVwibWF4bGVuZ3RoXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFtyZWFkb25seV09XCJyZWFkb25seVwiIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgIChrZXlkb3duKT1cIm9uSW5wdXRLZXlkb3duKCRldmVudClcIiAoYmx1cik9XCJvbklucHV0Qmx1cigkZXZlbnQpXCIgKGlucHV0KT1cIm9uSW5wdXQoJGV2ZW50KVwiIChjaGFuZ2UpPVwib25JbnB1dENoYW5nZSgkZXZlbnQpXCIgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cImlucHV0U3R5bGVcIiBbY2xhc3NdPVwiaW5wdXRTdHlsZUNsYXNzXCIgW25nQ2xhc3NdPVwiJ3VpLXNwaW5uZXItaW5wdXQgdWktaW5wdXR0ZXh0IHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnXCI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBbbmdDbGFzc109XCJ7J3VpLXNwaW5uZXItYnV0dG9uIHVpLXNwaW5uZXItdXAgdWktY29ybmVyLXRyIHVpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCc6dHJ1ZSwndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkfVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZHx8cmVhZG9ubHlcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLnJlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJvblVwQnV0dG9uTW91c2VsZWF2ZSgkZXZlbnQpXCIgKG1vdXNlZG93bik9XCJvblVwQnV0dG9uTW91c2Vkb3duKCRldmVudClcIiAobW91c2V1cCk9XCJvblVwQnV0dG9uTW91c2V1cCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zcGlubmVyLWJ1dHRvbi1pY29uIHBpIHBpLWNhcmV0LXVwIHVpLWNsaWNrYWJsZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgW25nQ2xhc3NdPVwieyd1aS1zcGlubmVyLWJ1dHRvbiB1aS1zcGlubmVyLWRvd24gdWktY29ybmVyLWJyIHVpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCc6dHJ1ZSwndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkfVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZHx8cmVhZG9ubHlcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLnJlYWRvbmx5XT1cInJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJvbkRvd25CdXR0b25Nb3VzZWxlYXZlKCRldmVudClcIiAobW91c2Vkb3duKT1cIm9uRG93bkJ1dHRvbk1vdXNlZG93bigkZXZlbnQpXCIgKG1vdXNldXApPVwib25Eb3duQnV0dG9uTW91c2V1cCgkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zcGlubmVyLWJ1dHRvbi1pY29uIHBpIHBpLWNhcmV0LWRvd24gdWktY2xpY2thYmxlXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvc3Bhbj5cbiAgICBgLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZmlsbGVkXSc6ICdmaWxsZWQnLFxuICAgICAgICAnW2NsYXNzLnVpLWlucHV0d3JhcHBlci1mb2N1c10nOiAnZm9jdXMnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtTUElOTkVSX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBTcGlubmVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHN0ZXA6IG51bWJlciA9IDE7XG5cbiAgICBASW5wdXQoKSBtaW46IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIG1heDogbnVtYmVyO1xuICAgIFxuICAgIEBJbnB1dCgpIG1heGxlbmd0aDogbnVtYmVyO1xuICAgIFxuICAgIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXI7XG4gICAgICAgICAgICBcbiAgICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGZvcm1hdElucHV0OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZGVjaW1hbFNlcGFyYXRvcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgdGhvdXNhbmRTZXBhcmF0b3I6IHN0cmluZztcbiAgICBcbiAgICB2YWx1ZTogYW55O1xuXG4gICAgZm9ybWF0dGVkVmFsdWU6IHN0cmluZztcbiAgICAgICAgXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBrZXlQYXR0ZXJuOiBSZWdFeHAgPSAvWzAtOVxcK1xcLV0vO1xuICAgIFxuICAgIHB1YmxpYyBwcmVjaXNpb246IG51bWJlcjtcbiAgICBcbiAgICBwdWJsaWMgdGltZXI6IGFueTtcbiAgICBcbiAgICBwdWJsaWMgZm9jdXM6IGJvb2xlYW47XG4gICAgXG4gICAgcHVibGljIGZpbGxlZDogYm9vbGVhbjtcbiAgICBcbiAgICBwdWJsaWMgbmVnYXRpdmVTZXBhcmF0b3IgPSAnLSc7XG5cbiAgICBsb2NhbGVEZWNpbWFsU2VwYXJhdG9yOiBzdHJpbmc7XG5cbiAgICBsb2NhbGVUaG91c2FuZFNlcGFyYXRvcjogc3RyaW5nO1xuXG4gICAgdGhvdXNhbmRSZWdFeHA6IFJlZ0V4cDtcbiAgICBcbiAgICBAVmlld0NoaWxkKCdpbnB1dGZpZWxkJywgeyBzdGF0aWM6IHRydWUgfSkgaW5wdXRmaWVsZFZpZXdDaGlsZDogRWxlbWVudFJlZjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUudG9TdHJpbmcoKS5pbmRleE9mKCcuJykgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnByZWNpc2lvbiA9IHRoaXMudmFsdWUudG9TdHJpbmcoKS5zcGxpdCgvWy5dLylbMV0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RlcCAlIDEgIT09IDApIHtcbiAgICAgICAgICAgIC8vIElmIHN0ZXAgaXMgbm90IGFuIGludGVnZXIgdGhlbiBleHRyYWN0IHRoZSBsZW5ndGggb2YgdGhlIGRlY2ltYWwgcGFydFxuICAgICAgICAgICAgdGhpcy5wcmVjaXNpb24gPSB0aGlzLnN0ZXAudG9TdHJpbmcoKS5zcGxpdCgvWyxdfFsuXS8pWzFdLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmZvcm1hdElucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmxvY2FsZURlY2ltYWxTZXBhcmF0b3IgPSAoMS4xKS50b0xvY2FsZVN0cmluZygpLnN1YnN0cmluZygxLCAyKTtcbiAgICAgICAgICAgIHRoaXMubG9jYWxlVGhvdXNhbmRTZXBhcmF0b3IgPSAoMTAwMCkudG9Mb2NhbGVTdHJpbmcoKS5zdWJzdHJpbmcoMSwgMik7XG4gICAgICAgICAgICB0aGlzLnRob3VzYW5kUmVnRXhwID0gbmV3IFJlZ0V4cChgWyR7dGhpcy50aG91c2FuZFNlcGFyYXRvciB8fCB0aGlzLmxvY2FsZVRob3VzYW5kU2VwYXJhdG9yfV1gLCAnZ2ltJyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRlY2ltYWxTZXBhcmF0b3IgJiYgdGhpcy50aG91c2FuZFNlcGFyYXRvciAmJiB0aGlzLmRlY2ltYWxTZXBhcmF0b3IgPT09IHRoaXMudGhvdXNhbmRTZXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJ0aG91c2FuZFNlcGFyYXRvciBhbmQgZGVjaW1hbFNlcGFyYXRvciBjYW5ub3QgaGF2ZSB0aGUgc2FtZSB2YWx1ZS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXBlYXQoZXZlbnQ6IEV2ZW50LCBpbnRlcnZhbDogbnVtYmVyLCBkaXI6IG51bWJlcikge1xuICAgICAgICBsZXQgaSA9IGludGVydmFsfHw1MDA7XG5cbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCA0MCwgZGlyKTtcbiAgICAgICAgfSwgaSk7XG5cbiAgICAgICAgdGhpcy5zcGluKGV2ZW50LCBkaXIpO1xuICAgIH1cbiAgICBcbiAgICBzcGluKGV2ZW50OiBFdmVudCwgZGlyOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHN0ZXAgPSB0aGlzLnN0ZXAgKiBkaXI7XG4gICAgICAgIGxldCBjdXJyZW50VmFsdWU6IG51bWJlcjtcblxuICAgICAgICBpZiAodGhpcy52YWx1ZSlcbiAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9ICh0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ3N0cmluZycpID8gdGhpcy5wYXJzZVZhbHVlKHRoaXMudmFsdWUpIDogdGhpcy52YWx1ZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY3VycmVudFZhbHVlID0gMDtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnByZWNpc2lvbilcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMudG9GaXhlZChjdXJyZW50VmFsdWUgKyBzdGVwLCB0aGlzLnByZWNpc2lvbikpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY3VycmVudFZhbHVlICsgc3RlcDtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMubWF4bGVuZ3RoICE9PSB1bmRlZmluZWQgJiYgdGhpcy52YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+IHRoaXMubWF4bGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gY3VycmVudFZhbHVlO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIGlmICh0aGlzLm1pbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMudmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMubWluO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWF4ICE9PSB1bmRlZmluZWQgJiYgdGhpcy52YWx1ZSA+IHRoaXMubWF4KSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5tYXg7XG4gICAgICAgIH1cbiAgICAgICBcbiAgICAgICAgdGhpcy5mb3JtYXRWYWx1ZSgpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdChldmVudCk7XG4gICAgfVxuICAgIFxuICAgIHRvRml4ZWQodmFsdWU6IG51bWJlciwgcHJlY2lzaW9uOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IHBvd2VyID0gTWF0aC5wb3coMTAsIHByZWNpc2lvbnx8MCk7XG4gICAgICAgIHJldHVybiBTdHJpbmcoTWF0aC5yb3VuZCh2YWx1ZSAqIHBvd2VyKSAvIHBvd2VyKTtcbiAgICB9XG4gICAgXG4gICAgb25VcEJ1dHRvbk1vdXNlZG93bihldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgdGhpcy5yZXBlYXQoZXZlbnQsIG51bGwsIDEpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvblVwQnV0dG9uTW91c2V1cChldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvblVwQnV0dG9uTW91c2VsZWF2ZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbkRvd25CdXR0b25Nb3VzZWRvd24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIHRoaXMucmVwZWF0KGV2ZW50LCBudWxsLCAtMSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG9uRG93bkJ1dHRvbk1vdXNldXAoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25Eb3duQnV0dG9uTW91c2VsZWF2ZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbklucHV0S2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoZXZlbnQud2hpY2ggPT0gMzgpIHtcbiAgICAgICAgICAgIHRoaXMuc3BpbihldmVudCwgMSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2ZW50LndoaWNoID09IDQwKSB7XG4gICAgICAgICAgICB0aGlzLnNwaW4oZXZlbnQsIC0xKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbklucHV0Q2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIG9uSW5wdXQoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZSgoPEhUTUxJbnB1dEVsZW1lbnQ+IGV2ZW50LnRhcmdldCkudmFsdWUpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICB9XG4gICAgICAgIFxuICAgIG9uSW5wdXRCbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mb3JtYXRWYWx1ZSgpO1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgIHRoaXMub25CbHVyLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBcbiAgICBvbklucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgICB9XG4gICAgXG4gICAgcGFyc2VWYWx1ZSh2YWw6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIGxldCB2YWx1ZTogbnVtYmVyO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICBpZiAodmFsLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm1hdElucHV0KSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsLnJlcGxhY2UodGhpcy50aG91c2FuZFJlZ0V4cCwgJycpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5wcmVjaXNpb24pIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmZvcm1hdElucHV0ID8gdmFsLnJlcGxhY2UodGhpcy5kZWNpbWFsU2VwYXJhdG9yIHx8IHRoaXMubG9jYWxlRGVjaW1hbFNlcGFyYXRvciwgJy4nKSA6IHZhbC5yZXBsYWNlKCcsJywgJy4nKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2VJbnQodmFsLCAxMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWF4ICE9PSBudWxsICYmIHZhbHVlID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLm1heDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5taW4gIT09IG51bGwgJiYgdmFsdWUgPCB0aGlzLm1pbikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMubWluO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGZvcm1hdFZhbHVlKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtYXRJbnB1dCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9Mb2NhbGVTdHJpbmcodW5kZWZpbmVkLCB7bWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyMH0pO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlY2ltYWxTZXBhcmF0b3IgJiYgdGhpcy50aG91c2FuZFNlcGFyYXRvcikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KHRoaXMubG9jYWxlRGVjaW1hbFNlcGFyYXRvcik7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByZWNpc2lvbiAmJiB2YWx1ZVsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVbMV0gPSAodGhpcy5kZWNpbWFsU2VwYXJhdG9yIHx8IHRoaXMubG9jYWxlRGVjaW1hbFNlcGFyYXRvcikgKyB2YWx1ZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50aG91c2FuZFNlcGFyYXRvciAmJiB2YWx1ZVswXS5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVswXSA9IHZhbHVlWzBdLnJlcGxhY2UobmV3IFJlZ0V4cChgWyR7dGhpcy5sb2NhbGVUaG91c2FuZFNlcGFyYXRvcn1dYCwgJ2dpbScpLCB0aGlzLnRob3VzYW5kU2VwYXJhdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0dGVkVmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pbnB1dGZpZWxkVmlld0NoaWxkICYmIHRoaXMuaW5wdXRmaWVsZFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0ZmllbGRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuZm9ybWF0dGVkVmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgICAgICBcbiAgICBjbGVhclRpbWVyKCkge1xuICAgICAgICBpZiAodGhpcy50aW1lcikge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5mb3JtYXRWYWx1ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGxlZFN0YXRlKCk7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuICAgIFxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZUZpbGxlZFN0YXRlKCkge1xuICAgICAgICB0aGlzLmZpbGxlZCA9ICh0aGlzLnZhbHVlICE9PSB1bmRlZmluZWQgJiYgdGhpcy52YWx1ZSAhPSBudWxsKTtcbiAgICB9XG59XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLElucHV0VGV4dE1vZHVsZV0sXG4gICAgZXhwb3J0czogW1NwaW5uZXJdLFxuICAgIGRlY2xhcmF0aW9uczogW1NwaW5uZXJdXG59KVxuZXhwb3J0IGNsYXNzIFNwaW5uZXJNb2R1bGUgeyB9XG4iXX0=