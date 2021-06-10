import { forwardRef, EventEmitter, ChangeDetectorRef, Input, Output, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const TRISTATECHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TriStateCheckbox),
    multi: true
};
let TriStateCheckbox = class TriStateCheckbox {
    constructor(cd) {
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    onClick(event, input) {
        if (!this.disabled && !this.readonly) {
            this.toggle(event);
            this.focus = true;
            input.focus();
        }
    }
    onKeydown(event) {
        if (event.keyCode == 32) {
            event.preventDefault();
        }
    }
    onKeyup(event) {
        if (event.keyCode == 32 && !this.readonly) {
            this.toggle(event);
            event.preventDefault();
        }
    }
    toggle(event) {
        if (this.value == null || this.value == undefined)
            this.value = true;
        else if (this.value == true)
            this.value = false;
        else if (this.value == false)
            this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    onFocus() {
        this.focus = true;
    }
    onBlur() {
        this.focus = false;
        this.onModelTouched();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    writeValue(value) {
        this.value = value;
        this.cd.markForCheck();
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
};
TriStateCheckbox.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], TriStateCheckbox.prototype, "disabled", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "name", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "ariaLabelledBy", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "tabindex", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "inputId", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "style", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "styleClass", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "label", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "readonly", void 0);
__decorate([
    Output()
], TriStateCheckbox.prototype, "onChange", void 0);
TriStateCheckbox = __decorate([
    Component({
        selector: 'p-triStateCheckbox',
        template: `
        <div [ngStyle]="style" [ngClass]="{'ui-chkbox ui-tristatechkbox ui-widget': true,'ui-chkbox-readonly': readonly}" [class]="styleClass">
            <div class="ui-helper-hidden-accessible">
                <input #input type="text" [attr.id]="inputId" [name]="name" [attr.tabindex]="tabindex" [readonly]="readonly" [disabled]="disabled" (keyup)="onKeyup($event)" (keydown)="onKeydown($event)" (focus)="onFocus()" (blur)="onBlur()" [attr.aria-labelledby]="ariaLabelledBy">
            </div>
            <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" (click)="onClick($event,input)"  role="checkbox" [attr.aria-checked]="value === true"
                [ngClass]="{'ui-state-active':value!=null,'ui-state-disabled':disabled,'ui-state-focus':focus}">
                <span class="ui-chkbox-icon pi ui-clickable" [ngClass]="{'pi-check':value==true,'pi-times':value==false}"></span>
            </div>
        </div>
        <label class="ui-chkbox-label" (click)="onClick($event,input)"
               [ngClass]="{'ui-label-active':value!=null, 'ui-label-disabled':disabled, 'ui-label-focus':focus}"
               *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `,
        providers: [TRISTATECHECKBOX_VALUE_ACCESSOR]
    })
], TriStateCheckbox);
let TriStateCheckboxModule = class TriStateCheckboxModule {
};
TriStateCheckboxModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [TriStateCheckbox],
        declarations: [TriStateCheckbox]
    })
], TriStateCheckboxModule);

/**
 * Generated bundle index. Do not edit.
 */

export { TRISTATECHECKBOX_VALUE_ACCESSOR, TriStateCheckbox, TriStateCheckboxModule };
//# sourceMappingURL=primeng-tristatecheckbox.js.map
