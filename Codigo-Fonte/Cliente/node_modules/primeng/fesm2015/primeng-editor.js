import { forwardRef, EventEmitter, ElementRef, Output, ContentChild, Input, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Quill from 'quill';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const EDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Editor),
    multi: true
};
let Editor = class Editor {
    constructor(el) {
        this.el = el;
        this.onTextChange = new EventEmitter();
        this.onSelectionChange = new EventEmitter();
        this.onInit = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    ngAfterViewInit() {
        let editorElement = DomHandler.findSingle(this.el.nativeElement, 'div.ui-editor-content');
        let toolbarElement = DomHandler.findSingle(this.el.nativeElement, 'div.ui-editor-toolbar');
        let defaultModule = { toolbar: toolbarElement };
        let modules = this.modules ? Object.assign(Object.assign({}, defaultModule), this.modules) : defaultModule;
        this.quill = new Quill(editorElement, {
            modules: modules,
            placeholder: this.placeholder,
            readOnly: this.readonly,
            theme: 'snow',
            formats: this.formats,
            bounds: this.bounds,
            debug: this.debug,
            scrollingContainer: this.scrollingContainer
        });
        if (this.value) {
            this.quill.pasteHTML(this.value);
        }
        this.quill.on('text-change', (delta, oldContents, source) => {
            if (source === 'user') {
                let html = editorElement.children[0].innerHTML;
                let text = this.quill.getText().trim();
                if (html === '<p><br></p>') {
                    html = null;
                }
                this.onTextChange.emit({
                    htmlValue: html,
                    textValue: text,
                    delta: delta,
                    source: source
                });
                this.onModelChange(html);
                this.onModelTouched();
            }
        });
        this.quill.on('selection-change', (range, oldRange, source) => {
            this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
        });
        this.onInit.emit({
            editor: this.quill
        });
    }
    writeValue(value) {
        this.value = value;
        if (this.quill) {
            if (value)
                this.quill.pasteHTML(value);
            else
                this.quill.setText('');
        }
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    getQuill() {
        return this.quill;
    }
    get readonly() {
        return this._readonly;
    }
    set readonly(val) {
        this._readonly = val;
        if (this.quill) {
            if (this._readonly)
                this.quill.disable();
            else
                this.quill.enable();
        }
    }
};
Editor.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Output()
], Editor.prototype, "onTextChange", void 0);
__decorate([
    Output()
], Editor.prototype, "onSelectionChange", void 0);
__decorate([
    ContentChild(Header, { static: true })
], Editor.prototype, "toolbar", void 0);
__decorate([
    Input()
], Editor.prototype, "style", void 0);
__decorate([
    Input()
], Editor.prototype, "styleClass", void 0);
__decorate([
    Input()
], Editor.prototype, "placeholder", void 0);
__decorate([
    Input()
], Editor.prototype, "formats", void 0);
__decorate([
    Input()
], Editor.prototype, "modules", void 0);
__decorate([
    Input()
], Editor.prototype, "bounds", void 0);
__decorate([
    Input()
], Editor.prototype, "scrollingContainer", void 0);
__decorate([
    Input()
], Editor.prototype, "debug", void 0);
__decorate([
    Output()
], Editor.prototype, "onInit", void 0);
__decorate([
    Input()
], Editor.prototype, "readonly", null);
Editor = __decorate([
    Component({
        selector: 'p-editor',
        template: `
        <div [ngClass]="'ui-widget ui-editor-container ui-corner-all'" [class]="styleClass">
            <div class="ui-editor-toolbar ui-widget-header ui-corner-top" *ngIf="toolbar">
                <ng-content select="p-header"></ng-content>
            </div>
            <div class="ui-editor-toolbar ui-widget-header ui-corner-top" *ngIf="!toolbar">
                <span class="ql-formats">
                    <select class="ql-header">
                      <option value="1">Heading</option>
                      <option value="2">Subheading</option>
                      <option selected>Normal</option>
                    </select>
                    <select class="ql-font">
                      <option selected>Sans Serif</option>
                      <option value="serif">Serif</option>
                      <option value="monospace">Monospace</option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-bold" aria-label="Bold"></button>
                    <button class="ql-italic" aria-label="Italic"></button>
                    <button class="ql-underline" aria-label="Underline"></button>
                </span>
                <span class="ql-formats">
                    <select class="ql-color"></select>
                    <select class="ql-background"></select>
                </span>
                <span class="ql-formats">
                    <button class="ql-list" value="ordered" aria-label="Ordered List"></button>
                    <button class="ql-list" value="bullet" aria-label="Unordered List"></button>
                    <select class="ql-align">
                        <option selected></option>
                        <option value="center"></option>
                        <option value="right"></option>
                        <option value="justify"></option>
                    </select>
                </span>
                <span class="ql-formats">
                    <button class="ql-link" aria-label="Insert Link"></button>
                    <button class="ql-image" aria-label="Insert Image"></button>
                    <button class="ql-code-block" aria-label="Insert Code Block"></button>
                </span>
                <span class="ql-formats">
                    <button class="ql-clean" aria-label="Remove Styles"></button>
                </span>
            </div>
            <div class="ui-editor-content" [ngStyle]="style"></div>
        </div>
    `,
        providers: [EDITOR_VALUE_ACCESSOR]
    })
], Editor);
let EditorModule = class EditorModule {
};
EditorModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Editor, SharedModule],
        declarations: [Editor]
    })
], EditorModule);

/**
 * Generated bundle index. Do not edit.
 */

export { EDITOR_VALUE_ACCESSOR, Editor, EditorModule };
//# sourceMappingURL=primeng-editor.js.map
