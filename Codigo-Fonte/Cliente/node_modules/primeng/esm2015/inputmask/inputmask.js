var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*
    Port of jQuery MaskedInput by DigitalBush as a Native Angular2 Component in Typescript without jQuery
    https://github.com/digitalBush/jquery.maskedinput/

    Copyright (c) 2007-2014 Josh Bush (digitalbush.com)

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
*/
import { NgModule, Component, ElementRef, OnInit, OnDestroy, Input, forwardRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const INPUTMASK_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputMask),
    multi: true
};
let InputMask = class InputMask {
    constructor(el) {
        this.el = el;
        this.type = 'text';
        this.slotChar = '_';
        this.autoClear = true;
        this.characterPattern = '[A-Za-z]';
        this.onComplete = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onInput = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngOnInit() {
        let ua = DomHandler.getUserAgent();
        this.androidChrome = /chrome/i.test(ua) && /android/i.test(ua);
        this.initMask();
    }
    get mask() {
        return this._mask;
    }
    set mask(val) {
        this._mask = val;
        this.initMask();
        this.writeValue('');
        this.onModelChange(this.value);
    }
    initMask() {
        this.tests = [];
        this.partialPosition = this.mask.length;
        this.len = this.mask.length;
        this.firstNonMaskPos = null;
        this.defs = {
            '9': '[0-9]',
            'a': this.characterPattern,
            '*': `${this.characterPattern}|[0-9]`
        };
        let maskTokens = this.mask.split('');
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c == '?') {
                this.len--;
                this.partialPosition = i;
            }
            else if (this.defs[c]) {
                this.tests.push(new RegExp(this.defs[c]));
                if (this.firstNonMaskPos === null) {
                    this.firstNonMaskPos = this.tests.length - 1;
                }
                if (i < this.partialPosition) {
                    this.lastRequiredNonMaskPos = this.tests.length - 1;
                }
            }
            else {
                this.tests.push(null);
            }
        }
        this.buffer = [];
        for (let i = 0; i < maskTokens.length; i++) {
            let c = maskTokens[i];
            if (c != '?') {
                if (this.defs[c])
                    this.buffer.push(this.getPlaceholder(i));
                else
                    this.buffer.push(c);
            }
        }
        this.defaultBuffer = this.buffer.join('');
    }
    writeValue(value) {
        this.value = value;
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.value == undefined || this.value == null)
                this.inputViewChild.nativeElement.value = '';
            else
                this.inputViewChild.nativeElement.value = this.value;
            this.checkVal();
            this.focusText = this.inputViewChild.nativeElement.value;
            this.updateFilledState();
        }
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
    caret(first, last) {
        let range, begin, end;
        if (!this.inputViewChild.nativeElement.offsetParent || this.inputViewChild.nativeElement !== document.activeElement) {
            return;
        }
        if (typeof first == 'number') {
            begin = first;
            end = (typeof last === 'number') ? last : begin;
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                this.inputViewChild.nativeElement.setSelectionRange(begin, end);
            }
            else if (this.inputViewChild.nativeElement['createTextRange']) {
                range = this.inputViewChild.nativeElement['createTextRange']();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', begin);
                range.select();
            }
        }
        else {
            if (this.inputViewChild.nativeElement.setSelectionRange) {
                begin = this.inputViewChild.nativeElement.selectionStart;
                end = this.inputViewChild.nativeElement.selectionEnd;
            }
            else if (document['selection'] && document['selection'].createRange) {
                range = document['selection'].createRange();
                begin = 0 - range.duplicate().moveStart('character', -100000);
                end = begin + range.text.length;
            }
            return { begin: begin, end: end };
        }
    }
    isCompleted() {
        let completed;
        for (let i = this.firstNonMaskPos; i <= this.lastRequiredNonMaskPos; i++) {
            if (this.tests[i] && this.buffer[i] === this.getPlaceholder(i)) {
                return false;
            }
        }
        return true;
    }
    getPlaceholder(i) {
        if (i < this.slotChar.length) {
            return this.slotChar.charAt(i);
        }
        return this.slotChar.charAt(0);
    }
    seekNext(pos) {
        while (++pos < this.len && !this.tests[pos])
            ;
        return pos;
    }
    seekPrev(pos) {
        while (--pos >= 0 && !this.tests[pos])
            ;
        return pos;
    }
    shiftL(begin, end) {
        let i, j;
        if (begin < 0) {
            return;
        }
        for (i = begin, j = this.seekNext(end); i < this.len; i++) {
            if (this.tests[i]) {
                if (j < this.len && this.tests[i].test(this.buffer[j])) {
                    this.buffer[i] = this.buffer[j];
                    this.buffer[j] = this.getPlaceholder(j);
                }
                else {
                    break;
                }
                j = this.seekNext(j);
            }
        }
        this.writeBuffer();
        this.caret(Math.max(this.firstNonMaskPos, begin));
    }
    shiftR(pos) {
        let i, c, j, t;
        for (i = pos, c = this.getPlaceholder(pos); i < this.len; i++) {
            if (this.tests[i]) {
                j = this.seekNext(i);
                t = this.buffer[i];
                this.buffer[i] = c;
                if (j < this.len && this.tests[j].test(t)) {
                    c = t;
                }
                else {
                    break;
                }
            }
        }
    }
    handleAndroidInput(e) {
        var curVal = this.inputViewChild.nativeElement.value;
        var pos = this.caret();
        if (this.oldVal && this.oldVal.length && this.oldVal.length > curVal.length) {
            // a deletion or backspace happened
            this.checkVal(true);
            while (pos.begin > 0 && !this.tests[pos.begin - 1])
                pos.begin--;
            if (pos.begin === 0) {
                while (pos.begin < this.firstNonMaskPos && !this.tests[pos.begin])
                    pos.begin++;
            }
            setTimeout(() => {
                this.caret(pos.begin, pos.begin);
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        }
        else {
            this.checkVal(true);
            while (pos.begin < this.len && !this.tests[pos.begin])
                pos.begin++;
            setTimeout(() => {
                this.caret(pos.begin, pos.begin);
                this.updateModel(e);
                if (this.isCompleted()) {
                    this.onComplete.emit();
                }
            }, 0);
        }
    }
    onInputBlur(e) {
        this.focused = false;
        this.onModelTouched();
        this.checkVal();
        this.updateFilledState();
        this.onBlur.emit(e);
        if (this.inputViewChild.nativeElement.value != this.focusText || this.inputViewChild.nativeElement.value != this.value) {
            this.updateModel(e);
            let event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
            this.inputViewChild.nativeElement.dispatchEvent(event);
        }
    }
    onKeyDown(e) {
        if (this.readonly) {
            return;
        }
        let k = e.which || e.keyCode, pos, begin, end;
        let iPhone = /iphone/i.test(DomHandler.getUserAgent());
        this.oldVal = this.inputViewChild.nativeElement.value;
        //backspace, delete, and escape get special treatment
        if (k === 8 || k === 46 || (iPhone && k === 127)) {
            pos = this.caret();
            begin = pos.begin;
            end = pos.end;
            if (end - begin === 0) {
                begin = k !== 46 ? this.seekPrev(begin) : (end = this.seekNext(begin - 1));
                end = k === 46 ? this.seekNext(end) : end;
            }
            this.clearBuffer(begin, end);
            this.shiftL(begin, end - 1);
            this.updateModel(e);
            e.preventDefault();
        }
        else if (k === 13) { // enter
            this.onInputBlur(e);
            this.updateModel(e);
        }
        else if (k === 27) { // escape
            this.inputViewChild.nativeElement.value = this.focusText;
            this.caret(0, this.checkVal());
            this.updateModel(e);
            e.preventDefault();
        }
    }
    onKeyPress(e) {
        if (this.readonly) {
            return;
        }
        var k = e.which || e.keyCode, pos = this.caret(), p, c, next, completed;
        if (e.ctrlKey || e.altKey || e.metaKey || k < 32 || (k > 34 && k < 41)) { //Ignore
            return;
        }
        else if (k && k !== 13) {
            if (pos.end - pos.begin !== 0) {
                this.clearBuffer(pos.begin, pos.end);
                this.shiftL(pos.begin, pos.end - 1);
            }
            p = this.seekNext(pos.begin - 1);
            if (p < this.len) {
                c = String.fromCharCode(k);
                if (this.tests[p].test(c)) {
                    this.shiftR(p);
                    this.buffer[p] = c;
                    this.writeBuffer();
                    next = this.seekNext(p);
                    if (/android/i.test(DomHandler.getUserAgent())) {
                        //Path for CSP Violation on FireFox OS 1.1
                        let proxy = () => {
                            this.caret(next);
                        };
                        setTimeout(proxy, 0);
                    }
                    else {
                        this.caret(next);
                    }
                    if (pos.begin <= this.lastRequiredNonMaskPos) {
                        completed = this.isCompleted();
                    }
                }
            }
            e.preventDefault();
        }
        this.updateModel(e);
        this.updateFilledState();
        if (completed) {
            this.onComplete.emit();
        }
    }
    clearBuffer(start, end) {
        let i;
        for (i = start; i < end && i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
            }
        }
    }
    writeBuffer() {
        this.inputViewChild.nativeElement.value = this.buffer.join('');
    }
    checkVal(allow) {
        //try to place characters where they belong
        let test = this.inputViewChild.nativeElement.value, lastMatch = -1, i, c, pos;
        for (i = 0, pos = 0; i < this.len; i++) {
            if (this.tests[i]) {
                this.buffer[i] = this.getPlaceholder(i);
                while (pos++ < test.length) {
                    c = test.charAt(pos - 1);
                    if (this.tests[i].test(c)) {
                        this.buffer[i] = c;
                        lastMatch = i;
                        break;
                    }
                }
                if (pos > test.length) {
                    this.clearBuffer(i + 1, this.len);
                    break;
                }
            }
            else {
                if (this.buffer[i] === test.charAt(pos)) {
                    pos++;
                }
                if (i < this.partialPosition) {
                    lastMatch = i;
                }
            }
        }
        if (allow) {
            this.writeBuffer();
        }
        else if (lastMatch + 1 < this.partialPosition) {
            if (this.autoClear || this.buffer.join('') === this.defaultBuffer) {
                // Invalid value. Remove it and replace it with the
                // mask, which is the default behavior.
                if (this.inputViewChild.nativeElement.value)
                    this.inputViewChild.nativeElement.value = '';
                this.clearBuffer(0, this.len);
            }
            else {
                // Invalid value, but we opt to show the value to the
                // user and allow them to correct their mistake.
                this.writeBuffer();
            }
        }
        else {
            this.writeBuffer();
            this.inputViewChild.nativeElement.value = this.inputViewChild.nativeElement.value.substring(0, lastMatch + 1);
        }
        return (this.partialPosition ? i : this.firstNonMaskPos);
    }
    onInputFocus(event) {
        if (this.readonly) {
            return;
        }
        this.focused = true;
        clearTimeout(this.caretTimeoutId);
        let pos;
        this.focusText = this.inputViewChild.nativeElement.value;
        pos = this.checkVal();
        this.caretTimeoutId = setTimeout(() => {
            if (this.inputViewChild.nativeElement !== document.activeElement) {
                return;
            }
            this.writeBuffer();
            if (pos == this.mask.replace("?", "").length) {
                this.caret(0, pos);
            }
            else {
                this.caret(pos);
            }
        }, 10);
        this.onFocus.emit(event);
    }
    onInputChange(event) {
        if (this.androidChrome)
            this.handleAndroidInput(event);
        else
            this.handleInputChange(event);
        this.onInput.emit(event);
    }
    handleInputChange(event) {
        if (this.readonly) {
            return;
        }
        setTimeout(() => {
            var pos = this.checkVal(true);
            this.caret(pos);
            this.updateModel(event);
            if (this.isCompleted()) {
                this.onComplete.emit();
            }
        }, 0);
    }
    getUnmaskedValue() {
        let unmaskedBuffer = [];
        for (let i = 0; i < this.buffer.length; i++) {
            let c = this.buffer[i];
            if (this.tests[i] && c != this.getPlaceholder(i)) {
                unmaskedBuffer.push(c);
            }
        }
        return unmaskedBuffer.join('');
    }
    updateModel(e) {
        const updatedValue = this.unmask ? this.getUnmaskedValue() : e.target.value;
        if (updatedValue !== null || updatedValue !== undefined) {
            this.value = updatedValue;
            this.onModelChange(this.value);
        }
    }
    updateFilledState() {
        this.filled = this.inputViewChild.nativeElement && this.inputViewChild.nativeElement.value != '';
    }
    focus() {
        this.inputViewChild.nativeElement.focus();
    }
    ngOnDestroy() {
    }
};
InputMask.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], InputMask.prototype, "type", void 0);
__decorate([
    Input()
], InputMask.prototype, "slotChar", void 0);
__decorate([
    Input()
], InputMask.prototype, "autoClear", void 0);
__decorate([
    Input()
], InputMask.prototype, "style", void 0);
__decorate([
    Input()
], InputMask.prototype, "inputId", void 0);
__decorate([
    Input()
], InputMask.prototype, "styleClass", void 0);
__decorate([
    Input()
], InputMask.prototype, "placeholder", void 0);
__decorate([
    Input()
], InputMask.prototype, "size", void 0);
__decorate([
    Input()
], InputMask.prototype, "maxlength", void 0);
__decorate([
    Input()
], InputMask.prototype, "tabindex", void 0);
__decorate([
    Input()
], InputMask.prototype, "title", void 0);
__decorate([
    Input()
], InputMask.prototype, "ariaLabel", void 0);
__decorate([
    Input()
], InputMask.prototype, "ariaRequired", void 0);
__decorate([
    Input()
], InputMask.prototype, "disabled", void 0);
__decorate([
    Input()
], InputMask.prototype, "readonly", void 0);
__decorate([
    Input()
], InputMask.prototype, "unmask", void 0);
__decorate([
    Input()
], InputMask.prototype, "name", void 0);
__decorate([
    Input()
], InputMask.prototype, "required", void 0);
__decorate([
    Input()
], InputMask.prototype, "characterPattern", void 0);
__decorate([
    Input()
], InputMask.prototype, "autoFocus", void 0);
__decorate([
    Input()
], InputMask.prototype, "autocomplete", void 0);
__decorate([
    ViewChild('input', { static: true })
], InputMask.prototype, "inputViewChild", void 0);
__decorate([
    Output()
], InputMask.prototype, "onComplete", void 0);
__decorate([
    Output()
], InputMask.prototype, "onFocus", void 0);
__decorate([
    Output()
], InputMask.prototype, "onBlur", void 0);
__decorate([
    Output()
], InputMask.prototype, "onInput", void 0);
__decorate([
    Input()
], InputMask.prototype, "mask", null);
InputMask = __decorate([
    Component({
        selector: 'p-inputMask',
        template: `<input #input pInputText [attr.id]="inputId" [attr.type]="type" [attr.name]="name" [ngStyle]="style" [ngClass]="styleClass" [attr.placeholder]="placeholder" [attr.title]="title"
        [attr.size]="size" [attr.autocomplete]="autocomplete" [attr.maxlength]="maxlength" [attr.tabindex]="tabindex" [attr.aria-label]="ariaLabel" [attr.aria-required]="ariaRequired" [disabled]="disabled" [readonly]="readonly" [attr.required]="required"
        (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" (keydown)="onKeyDown($event)" (keypress)="onKeyPress($event)" [attr.autofocus]="autoFocus"
        (input)="onInputChange($event)" (paste)="handleInputChange($event)">`,
        host: {
            '[class.ui-inputwrapper-filled]': 'filled',
            '[class.ui-inputwrapper-focus]': 'focused'
        },
        providers: [INPUTMASK_VALUE_ACCESSOR]
    })
], InputMask);
export { InputMask };
let InputMaskModule = class InputMaskModule {
};
InputMaskModule = __decorate([
    NgModule({
        imports: [CommonModule, InputTextModule],
        exports: [InputMask],
        declarations: [InputMask]
    })
], InputMaskModule);
export { InputMaskModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRtYXNrLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9pbnB1dG1hc2svIiwic291cmNlcyI6WyJpbnB1dG1hc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMEJFO0FBQ0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUM1SCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbEQsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFRO0lBQzNDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7SUFDeEMsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBY0YsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQTRGbEIsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUExRnhCLFNBQUksR0FBVyxNQUFNLENBQUM7UUFFdEIsYUFBUSxHQUFXLEdBQUcsQ0FBQztRQUV2QixjQUFTLEdBQVksSUFBSSxDQUFDO1FBZ0MxQixxQkFBZ0IsR0FBVyxVQUFVLENBQUM7UUFRckMsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRCxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7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Q0FBQztRQUNQLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFFBQVEsRUFBRTs7OzZFQUcrRDtRQUN6RSxJQUFJLEVBQUU7WUFDRixnQ0FBZ0MsRUFBRSxRQUFRO1lBQzFDLCtCQUErQixFQUFFLFNBQVM7U0FDN0M7UUFDRCxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztLQUN4QyxDQUFDO0dBQ1csU0FBUyxDQTBrQnJCO1NBMWtCWSxTQUFTO0FBaWxCdEIsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtDQUFJLENBQUE7QUFBbkIsZUFBZTtJQUwzQixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsZUFBZSxDQUFDO1FBQ3ZDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNwQixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7S0FDNUIsQ0FBQztHQUNXLGVBQWUsQ0FBSTtTQUFuQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgICBQb3J0IG9mIGpRdWVyeSBNYXNrZWRJbnB1dCBieSBEaWdpdGFsQnVzaCBhcyBhIE5hdGl2ZSBBbmd1bGFyMiBDb21wb25lbnQgaW4gVHlwZXNjcmlwdCB3aXRob3V0IGpRdWVyeVxuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9kaWdpdGFsQnVzaC9qcXVlcnkubWFza2VkaW5wdXQvXG5cbiAgICBDb3B5cmlnaHQgKGMpIDIwMDctMjAxNCBKb3NoIEJ1c2ggKGRpZ2l0YWxidXNoLmNvbSlcblxuICAgIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uXG4gICAgb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAgICBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXRcbiAgICByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSxcbiAgICBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICAgIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZVxuICAgIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nXG4gICAgY29uZGl0aW9uczpcblxuICAgIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gICAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiAgICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuICAgIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xuICAgIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG4gICAgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFRcbiAgICBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcbiAgICBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAgICBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SXG4gICAgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cbmltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsT25Jbml0LE9uRGVzdHJveSxJbnB1dCxmb3J3YXJkUmVmLE91dHB1dCxFdmVudEVtaXR0ZXIsVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQge0lucHV0VGV4dE1vZHVsZX0gZnJvbSAncHJpbWVuZy9pbnB1dHRleHQnO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IElOUFVUTUFTS19WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSW5wdXRNYXNrKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1pbnB1dE1hc2snLFxuICAgIHRlbXBsYXRlOiBgPGlucHV0ICNpbnB1dCBwSW5wdXRUZXh0IFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci50eXBlXT1cInR5cGVcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCJwbGFjZWhvbGRlclwiIFthdHRyLnRpdGxlXT1cInRpdGxlXCJcbiAgICAgICAgW2F0dHIuc2l6ZV09XCJzaXplXCIgW2F0dHIuYXV0b2NvbXBsZXRlXT1cImF1dG9jb21wbGV0ZVwiIFthdHRyLm1heGxlbmd0aF09XCJtYXhsZW5ndGhcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsXCIgW2F0dHIuYXJpYS1yZXF1aXJlZF09XCJhcmlhUmVxdWlyZWRcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiBbcmVhZG9ubHldPVwicmVhZG9ubHlcIiBbYXR0ci5yZXF1aXJlZF09XCJyZXF1aXJlZFwiXG4gICAgICAgIChmb2N1cyk9XCJvbklucHV0Rm9jdXMoJGV2ZW50KVwiIChibHVyKT1cIm9uSW5wdXRCbHVyKCRldmVudClcIiAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiIChrZXlwcmVzcyk9XCJvbktleVByZXNzKCRldmVudClcIiBbYXR0ci5hdXRvZm9jdXNdPVwiYXV0b0ZvY3VzXCJcbiAgICAgICAgKGlucHV0KT1cIm9uSW5wdXRDaGFuZ2UoJGV2ZW50KVwiIChwYXN0ZSk9XCJoYW5kbGVJbnB1dENoYW5nZSgkZXZlbnQpXCI+YCxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MudWktaW5wdXR3cmFwcGVyLWZpbGxlZF0nOiAnZmlsbGVkJyxcbiAgICAgICAgJ1tjbGFzcy51aS1pbnB1dHdyYXBwZXItZm9jdXNdJzogJ2ZvY3VzZWQnXG4gICAgfSxcbiAgICBwcm92aWRlcnM6IFtJTlBVVE1BU0tfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIElucHV0TWFzayBpbXBsZW1lbnRzIE9uSW5pdCxPbkRlc3Ryb3ksQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nID0gJ3RleHQnO1xuXG4gICAgQElucHV0KCkgc2xvdENoYXI6IHN0cmluZyA9ICdfJztcblxuICAgIEBJbnB1dCgpIGF1dG9DbGVhcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNpemU6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIG1heGxlbmd0aDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFSZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgcmVhZG9ubHk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSB1bm1hc2s6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSByZXF1aXJlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGNoYXJhY3RlclBhdHRlcm46IHN0cmluZyA9ICdbQS1aYS16XSc7XG5cbiAgICBASW5wdXQoKSBhdXRvRm9jdXM6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBhdXRvY29tcGxldGU6IHN0cmluZztcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JywgeyBzdGF0aWM6IHRydWUgfSkgaW5wdXRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG5cbiAgICBAT3V0cHV0KCkgb25Db21wbGV0ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25CbHVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbklucHV0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIHZhbHVlOiBhbnk7XG5cbiAgICBfbWFzazogc3RyaW5nO1xuXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcblxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBmaWxsZWQ6IGJvb2xlYW47XG5cbiAgICBkZWZzOiBhbnk7XG5cbiAgICB0ZXN0czogYW55W107XG5cbiAgICBwYXJ0aWFsUG9zaXRpb246IGFueTtcblxuICAgIGZpcnN0Tm9uTWFza1BvczogbnVtYmVyO1xuXG4gICAgbGFzdFJlcXVpcmVkTm9uTWFza1BvczogYW55O1xuXG4gICAgbGVuOiBudW1iZXI7XG5cbiAgICBvbGRWYWw6IHN0cmluZztcblxuICAgIGJ1ZmZlcjogYW55O1xuXG4gICAgZGVmYXVsdEJ1ZmZlcjogc3RyaW5nO1xuXG4gICAgZm9jdXNUZXh0OiBzdHJpbmc7XG5cbiAgICBjYXJldFRpbWVvdXRJZDogYW55O1xuXG4gICAgYW5kcm9pZENocm9tZTogYm9vbGVhbjtcblxuICAgIGZvY3VzZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IHVhID0gRG9tSGFuZGxlci5nZXRVc2VyQWdlbnQoKTtcbiAgICAgICAgdGhpcy5hbmRyb2lkQ2hyb21lID0gL2Nocm9tZS9pLnRlc3QodWEpICYmIC9hbmRyb2lkL2kudGVzdCh1YSk7XG5cbiAgICAgICAgdGhpcy5pbml0TWFzaygpO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBtYXNrKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXNrO1xuICAgIH1cblxuICAgIHNldCBtYXNrKHZhbDpzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbWFzayA9IHZhbDtcblxuICAgICAgICB0aGlzLmluaXRNYXNrKCk7XG4gICAgICAgIHRoaXMud3JpdGVWYWx1ZSgnJyk7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBpbml0TWFzaygpIHtcbiAgICAgICAgdGhpcy50ZXN0cyA9IFtdO1xuICAgICAgICB0aGlzLnBhcnRpYWxQb3NpdGlvbiA9IHRoaXMubWFzay5sZW5ndGg7XG4gICAgICAgIHRoaXMubGVuID0gdGhpcy5tYXNrLmxlbmd0aDtcbiAgICAgICAgdGhpcy5maXJzdE5vbk1hc2tQb3MgPSBudWxsO1xuICAgICAgICB0aGlzLmRlZnMgPSB7XG4gICAgICAgICAgICAnOSc6ICdbMC05XScsXG4gICAgICAgICAgICAnYSc6IHRoaXMuY2hhcmFjdGVyUGF0dGVybixcbiAgICAgICAgICAgICcqJzogYCR7dGhpcy5jaGFyYWN0ZXJQYXR0ZXJufXxbMC05XWBcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgbWFza1Rva2VucyA9IHRoaXMubWFzay5zcGxpdCgnJyk7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtYXNrVG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgYyA9IG1hc2tUb2tlbnNbaV07XG4gICAgICAgICAgICBpZiAoYyA9PSAnPycpIHtcblx0XHRcdFx0dGhpcy5sZW4tLTtcblx0XHRcdFx0dGhpcy5wYXJ0aWFsUG9zaXRpb24gPSBpO1xuXHRcdFx0fVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5kZWZzW2NdKSB7XG5cdFx0XHRcdHRoaXMudGVzdHMucHVzaChuZXcgUmVnRXhwKHRoaXMuZGVmc1tjXSkpO1xuXHRcdFx0XHRpZiAodGhpcy5maXJzdE5vbk1hc2tQb3MgPT09IG51bGwpIHtcblx0ICAgICAgICAgICAgICAgIHRoaXMuZmlyc3ROb25NYXNrUG9zID0gdGhpcy50ZXN0cy5sZW5ndGggLSAxO1xuXHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgaWYgKGkgPCB0aGlzLnBhcnRpYWxQb3NpdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFJlcXVpcmVkTm9uTWFza1BvcyA9IHRoaXMudGVzdHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICB9XG5cdFx0XHR9XG4gICAgICAgICAgICBlbHNlIHtcblx0XHRcdFx0dGhpcy50ZXN0cy5wdXNoKG51bGwpO1xuXHRcdFx0fVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG1hc2tUb2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjID0gbWFza1Rva2Vuc1tpXTtcbiAgICAgICAgICAgIGlmIChjICE9ICc/Jykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRlZnNbY10pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyLnB1c2godGhpcy5nZXRQbGFjZWhvbGRlcihpKSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVmYXVsdEJ1ZmZlciA9IHRoaXMuYnVmZmVyLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgPT0gdW5kZWZpbmVkIHx8IHRoaXMudmFsdWUgPT0gbnVsbClcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSB0aGlzLnZhbHVlO1xuXG4gICAgICAgICAgICB0aGlzLmNoZWNrVmFsKCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzVGV4dCA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICB9XG5cbiAgICBjYXJldChmaXJzdD86IG51bWJlciwgbGFzdD86IG51bWJlcikge1xuICAgICAgICBsZXQgcmFuZ2UsIGJlZ2luLCBlbmQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0UGFyZW50fHx0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgZmlyc3QgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGJlZ2luID0gZmlyc3Q7XG4gICAgICAgICAgICBlbmQgPSAodHlwZW9mIGxhc3QgPT09ICdudW1iZXInKSA/IGxhc3QgOiBiZWdpbjtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoYmVnaW4sIGVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnRbJ2NyZWF0ZVRleHRSYW5nZSddKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnRbJ2NyZWF0ZVRleHRSYW5nZSddKCk7XG4gICAgICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgZW5kKTtcbiAgICAgICAgICAgICAgICByYW5nZS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIGJlZ2luKTtcbiAgICAgICAgICAgICAgICByYW5nZS5zZWxlY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcbiAgICBcdFx0XHRiZWdpbiA9IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcbiAgICBcdFx0XHRlbmQgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xuICAgIFx0XHR9XG4gICAgICAgICAgICBlbHNlIGlmIChkb2N1bWVudFsnc2VsZWN0aW9uJ10gJiYgZG9jdW1lbnRbJ3NlbGVjdGlvbiddLmNyZWF0ZVJhbmdlKSB7XG4gICAgXHRcdFx0cmFuZ2UgPSBkb2N1bWVudFsnc2VsZWN0aW9uJ10uY3JlYXRlUmFuZ2UoKTtcbiAgICBcdFx0XHRiZWdpbiA9IDAgLSByYW5nZS5kdXBsaWNhdGUoKS5tb3ZlU3RhcnQoJ2NoYXJhY3RlcicsIC0xMDAwMDApO1xuICAgIFx0XHRcdGVuZCA9IGJlZ2luICsgcmFuZ2UudGV4dC5sZW5ndGg7XG4gICAgXHRcdH1cblxuICAgIFx0XHRyZXR1cm4ge2JlZ2luOiBiZWdpbiwgZW5kOiBlbmR9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNDb21wbGV0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBjb21wbGV0ZWQ6IGJvb2xlYW47XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLmZpcnN0Tm9uTWFza1BvczsgaSA8PSB0aGlzLmxhc3RSZXF1aXJlZE5vbk1hc2tQb3M7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0gJiYgdGhpcy5idWZmZXJbaV0gPT09IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRQbGFjZWhvbGRlcihpOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKGkgPCB0aGlzLnNsb3RDaGFyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2xvdENoYXIuY2hhckF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNsb3RDaGFyLmNoYXJBdCgwKTtcbiAgICB9XG5cbiAgICBzZWVrTmV4dChwb3MpIHtcbiAgICAgICAgd2hpbGUgKCsrcG9zIDwgdGhpcy5sZW4gJiYgIXRoaXMudGVzdHNbcG9zXSk7XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG4gICAgc2Vla1ByZXYocG9zKSB7XG4gICAgICAgIHdoaWxlICgtLXBvcyA+PSAwICYmICF0aGlzLnRlc3RzW3Bvc10pO1xuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cblxuICAgIHNoaWZ0TChiZWdpbjpudW1iZXIsZW5kOm51bWJlcikge1xuICAgICAgICBsZXQgaSwgajtcblxuICAgICAgICBpZiAoYmVnaW48MCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gYmVnaW4sIGogPSB0aGlzLnNlZWtOZXh0KGVuZCk7IGkgPCB0aGlzLmxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSkge1xuICAgICAgICAgICAgICAgIGlmIChqIDwgdGhpcy5sZW4gJiYgdGhpcy50ZXN0c1tpXS50ZXN0KHRoaXMuYnVmZmVyW2pdKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltpXSA9IHRoaXMuYnVmZmVyW2pdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltqXSA9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaiA9IHRoaXMuc2Vla05leHQoaik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICB0aGlzLmNhcmV0KE1hdGgubWF4KHRoaXMuZmlyc3ROb25NYXNrUG9zLCBiZWdpbikpO1xuICAgIH1cblxuICAgIHNoaWZ0Uihwb3MpIHtcbiAgICAgICAgbGV0IGksIGMsIGosIHQ7XG5cbiAgICAgICAgZm9yIChpID0gcG9zLCBjID0gdGhpcy5nZXRQbGFjZWhvbGRlcihwb3MpOyBpIDwgdGhpcy5sZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0pIHtcbiAgICAgICAgICAgICAgICBqID0gdGhpcy5zZWVrTmV4dChpKTtcbiAgICAgICAgICAgICAgICB0ID0gdGhpcy5idWZmZXJbaV07XG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJbaV0gPSBjO1xuICAgICAgICAgICAgICAgIGlmIChqIDwgdGhpcy5sZW4gJiYgdGhpcy50ZXN0c1tqXS50ZXN0KHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSB0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhbmRsZUFuZHJvaWRJbnB1dChlKSB7XG4gICAgICAgIHZhciBjdXJWYWwgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLmNhcmV0KCk7XG4gICAgICAgIGlmICh0aGlzLm9sZFZhbCAmJiB0aGlzLm9sZFZhbC5sZW5ndGggJiYgdGhpcy5vbGRWYWwubGVuZ3RoID4gY3VyVmFsLmxlbmd0aCApIHtcbiAgICAgICAgICAgIC8vIGEgZGVsZXRpb24gb3IgYmFja3NwYWNlIGhhcHBlbmVkXG4gICAgICAgICAgICB0aGlzLmNoZWNrVmFsKHRydWUpO1xuICAgICAgICAgICAgd2hpbGUgKHBvcy5iZWdpbiA+IDAgJiYgIXRoaXMudGVzdHNbcG9zLmJlZ2luLTFdKVxuICAgICAgICAgICAgICAgICAgcG9zLmJlZ2luLS07XG4gICAgICAgICAgICBpZiAocG9zLmJlZ2luID09PSAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgd2hpbGUgKHBvcy5iZWdpbiA8IHRoaXMuZmlyc3ROb25NYXNrUG9zICYmICF0aGlzLnRlc3RzW3Bvcy5iZWdpbl0pXG4gICAgICAgICAgICAgICAgICBwb3MuYmVnaW4rKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJldChwb3MuYmVnaW4sIHBvcy5iZWdpbik7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0NvbXBsZXRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrVmFsKHRydWUpO1xuICAgICAgICAgICAgd2hpbGUgKHBvcy5iZWdpbiA8IHRoaXMubGVuICYmICF0aGlzLnRlc3RzW3Bvcy5iZWdpbl0pXG4gICAgICAgICAgICAgICAgcG9zLmJlZ2luKys7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FyZXQocG9zLmJlZ2luLCBwb3MuYmVnaW4pO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNDb21wbGV0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ29tcGxldGUuZW1pdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25JbnB1dEJsdXIoZSkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgICAgICB0aGlzLmNoZWNrVmFsKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRmlsbGVkU3RhdGUoKTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChlKTtcblxuICAgICAgICBpZiAodGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlICE9IHRoaXMuZm9jdXNUZXh0IHx8IHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSAhPSB0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGVsKGUpO1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgICAgICAgICAgIGV2ZW50LmluaXRFdmVudCgnY2hhbmdlJywgdHJ1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlEb3duKGUpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBrID0gZS53aGljaHx8ZS5rZXlDb2RlLFxuICAgICAgICAgICAgcG9zLFxuICAgICAgICAgICAgYmVnaW4sXG4gICAgICAgICAgICBlbmQ7XG4gICAgICAgIGxldCBpUGhvbmUgPSAvaXBob25lL2kudGVzdChEb21IYW5kbGVyLmdldFVzZXJBZ2VudCgpKTtcbiAgICAgICAgdGhpcy5vbGRWYWwgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG5cbiAgICAgICAgLy9iYWNrc3BhY2UsIGRlbGV0ZSwgYW5kIGVzY2FwZSBnZXQgc3BlY2lhbCB0cmVhdG1lbnRcbiAgICAgICAgaWYgKGsgPT09IDggfHwgayA9PT0gNDYgfHwgKGlQaG9uZSAmJiBrID09PSAxMjcpKSB7XG4gICAgICAgICAgICBwb3MgPSB0aGlzLmNhcmV0KCk7XG4gICAgICAgICAgICBiZWdpbiA9IHBvcy5iZWdpbjtcbiAgICAgICAgICAgIGVuZCA9IHBvcy5lbmQ7XG5cbiAgICAgICAgICAgIGlmIChlbmQgLSBiZWdpbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJlZ2luPWshPT00Nj90aGlzLnNlZWtQcmV2KGJlZ2luKTooZW5kPXRoaXMuc2Vla05leHQoYmVnaW4tMSkpO1xuICAgICAgICAgICAgICAgIGVuZD1rPT09NDY/dGhpcy5zZWVrTmV4dChlbmQpOmVuZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcihiZWdpbiwgZW5kKTtcblx0XHRcdHRoaXMuc2hpZnRMKGJlZ2luLCBlbmQgLSAxKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSBlbHNlIGlmICggayA9PT0gMTMgKSB7IC8vIGVudGVyXG4gICAgICAgICAgICB0aGlzLm9uSW5wdXRCbHVyKGUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChlKTtcbiAgICAgICAgfSBlbHNlIGlmIChrID09PSAyNykgeyAvLyBlc2NhcGVcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9IHRoaXMuZm9jdXNUZXh0O1xuICAgICAgICAgICAgdGhpcy5jYXJldCgwLCB0aGlzLmNoZWNrVmFsKCkpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RlbChlKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5UHJlc3MoZSkge1xuICAgICAgICBpZiAodGhpcy5yZWFkb25seSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgayA9IGUud2hpY2ggfHwgZS5rZXlDb2RlLFxuICAgICAgICAgICAgcG9zID0gdGhpcy5jYXJldCgpLFxuICAgICAgICAgICAgcCxcbiAgICAgICAgICAgIGMsXG4gICAgICAgICAgICBuZXh0LFxuICAgICAgICAgICAgY29tcGxldGVkO1xuXG4gICAgICAgIGlmIChlLmN0cmxLZXkgfHwgZS5hbHRLZXkgfHwgZS5tZXRhS2V5IHx8IGsgPCAzMiAgfHwgKGsgPiAzNCAmJiBrIDwgNDEpKSB7Ly9JZ25vcmVcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICggayAmJiBrICE9PSAxMyApIHtcbiAgICAgICAgICAgIGlmIChwb3MuZW5kIC0gcG9zLmJlZ2luICE9PSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQnVmZmVyKHBvcy5iZWdpbiwgcG9zLmVuZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlmdEwocG9zLmJlZ2luLCBwb3MuZW5kLTEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwID0gdGhpcy5zZWVrTmV4dChwb3MuYmVnaW4gLSAxKTtcbiAgICAgICAgICAgIGlmIChwIDwgdGhpcy5sZW4pIHtcbiAgICAgICAgICAgICAgICBjID0gU3RyaW5nLmZyb21DaGFyQ29kZShrKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50ZXN0c1twXS50ZXN0KGMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRSKHApO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW3BdID0gYztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0ID0gdGhpcy5zZWVrTmV4dChwKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoL2FuZHJvaWQvaS50ZXN0KERvbUhhbmRsZXIuZ2V0VXNlckFnZW50KCkpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vUGF0aCBmb3IgQ1NQIFZpb2xhdGlvbiBvbiBGaXJlRm94IE9TIDEuMVxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3h5ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZXQobmV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KHByb3h5LDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJldChuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zLmJlZ2luIDw9IHRoaXMubGFzdFJlcXVpcmVkTm9uTWFza1Bvcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVkID0gdGhpcy5pc0NvbXBsZXRlZCgpO1xuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVGaWxsZWRTdGF0ZSgpO1xuXG4gICAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckJ1ZmZlcihzdGFydCwgZW5kKSB7XG4gICAgICAgIGxldCBpO1xuICAgICAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZCAmJiBpIDwgdGhpcy5sZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVzdHNbaV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlcltpXSA9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3cml0ZUJ1ZmZlcigpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5idWZmZXIuam9pbignJyk7XG4gICAgfVxuXG4gICAgY2hlY2tWYWwoYWxsb3c/OiBib29sZWFuKSB7XG4gICAgICAgIC8vdHJ5IHRvIHBsYWNlIGNoYXJhY3RlcnMgd2hlcmUgdGhleSBiZWxvbmdcbiAgICAgICAgbGV0IHRlc3QgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUsXG4gICAgICAgICAgICBsYXN0TWF0Y2ggPSAtMSxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBjLFxuICAgICAgICAgICAgcG9zO1xuXG4gICAgICAgIGZvciAoaSA9IDAsIHBvcyA9IDA7IGkgPCB0aGlzLmxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW2ldID0gdGhpcy5nZXRQbGFjZWhvbGRlcihpKTtcbiAgICAgICAgICAgICAgICB3aGlsZSAocG9zKysgPCB0ZXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjID0gdGVzdC5jaGFyQXQocG9zIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRlc3RzW2ldLnRlc3QoYykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyW2ldID0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RNYXRjaCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocG9zID4gdGVzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcihpICsgMSwgdGhpcy5sZW4pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJ1ZmZlcltpXSA9PT0gdGVzdC5jaGFyQXQocG9zKSkge1xuICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCBpIDwgdGhpcy5wYXJ0aWFsUG9zaXRpb24pe1xuICAgICAgICAgICAgICAgICAgICBsYXN0TWF0Y2ggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYWxsb3cpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcbiAgICAgICAgfSBlbHNlIGlmIChsYXN0TWF0Y2ggKyAxIDwgdGhpcy5wYXJ0aWFsUG9zaXRpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9DbGVhciB8fCB0aGlzLmJ1ZmZlci5qb2luKCcnKSA9PT0gdGhpcy5kZWZhdWx0QnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgLy8gSW52YWxpZCB2YWx1ZS4gUmVtb3ZlIGl0IGFuZCByZXBsYWNlIGl0IHdpdGggdGhlXG4gICAgICAgICAgICAgICAgLy8gbWFzaywgd2hpY2ggaXMgdGhlIGRlZmF1bHQgYmVoYXZpb3IuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSkgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckJ1ZmZlcigwLCB0aGlzLmxlbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEludmFsaWQgdmFsdWUsIGJ1dCB3ZSBvcHQgdG8gc2hvdyB0aGUgdmFsdWUgdG8gdGhlXG4gICAgICAgICAgICAgICAgLy8gdXNlciBhbmQgYWxsb3cgdGhlbSB0byBjb3JyZWN0IHRoZWlyIG1pc3Rha2UuXG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlcigpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlLnN1YnN0cmluZygwLCBsYXN0TWF0Y2ggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHRoaXMucGFydGlhbFBvc2l0aW9uID8gaSA6IHRoaXMuZmlyc3ROb25NYXNrUG9zKTtcbiAgICB9XG5cbiAgICBvbklucHV0Rm9jdXMoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcblxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5jYXJldFRpbWVvdXRJZCk7XG4gICAgICAgIGxldCBwb3M7XG5cbiAgICAgICAgdGhpcy5mb2N1c1RleHQgPSB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG5cbiAgICAgICAgcG9zID0gdGhpcy5jaGVja1ZhbCgpO1xuXG4gICAgICAgIHRoaXMuY2FyZXRUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIoKTtcbiAgICAgICAgICAgIGlmIChwb3MgPT0gdGhpcy5tYXNrLnJlcGxhY2UoXCI/XCIsXCJcIikubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJldCgwLCBwb3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmV0KHBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcblxuICAgICAgICB0aGlzLm9uRm9jdXMuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgb25JbnB1dENoYW5nZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5hbmRyb2lkQ2hyb21lKVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBbmRyb2lkSW5wdXQoZXZlbnQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUlucHV0Q2hhbmdlKGV2ZW50KTtcblxuICAgICAgICB0aGlzLm9uSW5wdXQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgaGFuZGxlSW5wdXRDaGFuZ2UoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZG9ubHkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB2YXIgcG9zID0gdGhpcy5jaGVja1ZhbCh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuY2FyZXQocG9zKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kZWwoZXZlbnQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNDb21wbGV0ZWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZS5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgIH1cblxuICAgIGdldFVubWFza2VkVmFsdWUoKSB7XG4gICAgICAgIGxldCB1bm1hc2tlZEJ1ZmZlciA9IFtdO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5idWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjID0gdGhpcy5idWZmZXJbaV07XG4gICAgICAgICAgICBpZiAodGhpcy50ZXN0c1tpXSAmJiBjICE9IHRoaXMuZ2V0UGxhY2Vob2xkZXIoaSkpIHtcbiAgICAgICAgICAgICAgICB1bm1hc2tlZEJ1ZmZlci5wdXNoKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHVubWFza2VkQnVmZmVyLmpvaW4oJycpO1xuICAgIH1cblxuICAgIHVwZGF0ZU1vZGVsKGUpIHtcbiAgICAgICAgY29uc3QgdXBkYXRlZFZhbHVlID0gdGhpcy51bm1hc2sgPyB0aGlzLmdldFVubWFza2VkVmFsdWUoKSA6IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICBpZiAodXBkYXRlZFZhbHVlICE9PSBudWxsIHx8IHVwZGF0ZWRWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdXBkYXRlZFZhbHVlO1xuICAgICAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRmlsbGVkU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuZmlsbGVkID0gdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50ICYmIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSAhPSAnJztcbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG5cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxJbnB1dFRleHRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtJbnB1dE1hc2tdLFxuICAgIGRlY2xhcmF0aW9uczogW0lucHV0TWFza11cbn0pXG5leHBvcnQgY2xhc3MgSW5wdXRNYXNrTW9kdWxlIHsgfVxuIl19