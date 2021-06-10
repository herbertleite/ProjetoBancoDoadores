import { forwardRef, EventEmitter, ElementRef, Output, ContentChild, Input, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Quill from 'quill';

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Editor; }),
    multi: true
};
var Editor = /** @class */ (function () {
    function Editor(el) {
        this.el = el;
        this.onTextChange = new EventEmitter();
        this.onSelectionChange = new EventEmitter();
        this.onInit = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Editor.prototype.ngAfterViewInit = function () {
        var _this = this;
        var editorElement = DomHandler.findSingle(this.el.nativeElement, 'div.ui-editor-content');
        var toolbarElement = DomHandler.findSingle(this.el.nativeElement, 'div.ui-editor-toolbar');
        var defaultModule = { toolbar: toolbarElement };
        var modules = this.modules ? __assign(__assign({}, defaultModule), this.modules) : defaultModule;
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
        this.quill.on('text-change', function (delta, oldContents, source) {
            if (source === 'user') {
                var html = editorElement.children[0].innerHTML;
                var text = _this.quill.getText().trim();
                if (html === '<p><br></p>') {
                    html = null;
                }
                _this.onTextChange.emit({
                    htmlValue: html,
                    textValue: text,
                    delta: delta,
                    source: source
                });
                _this.onModelChange(html);
                _this.onModelTouched();
            }
        });
        this.quill.on('selection-change', function (range, oldRange, source) {
            _this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
        });
        this.onInit.emit({
            editor: this.quill
        });
    };
    Editor.prototype.writeValue = function (value) {
        this.value = value;
        if (this.quill) {
            if (value)
                this.quill.pasteHTML(value);
            else
                this.quill.setText('');
        }
    };
    Editor.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Editor.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Editor.prototype.getQuill = function () {
        return this.quill;
    };
    Object.defineProperty(Editor.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (val) {
            this._readonly = val;
            if (this.quill) {
                if (this._readonly)
                    this.quill.disable();
                else
                    this.quill.enable();
            }
        },
        enumerable: true,
        configurable: true
    });
    Editor.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
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
            template: "\n        <div [ngClass]=\"'ui-widget ui-editor-container ui-corner-all'\" [class]=\"styleClass\">\n            <div class=\"ui-editor-toolbar ui-widget-header ui-corner-top\" *ngIf=\"toolbar\">\n                <ng-content select=\"p-header\"></ng-content>\n            </div>\n            <div class=\"ui-editor-toolbar ui-widget-header ui-corner-top\" *ngIf=\"!toolbar\">\n                <span class=\"ql-formats\">\n                    <select class=\"ql-header\">\n                      <option value=\"1\">Heading</option>\n                      <option value=\"2\">Subheading</option>\n                      <option selected>Normal</option>\n                    </select>\n                    <select class=\"ql-font\">\n                      <option selected>Sans Serif</option>\n                      <option value=\"serif\">Serif</option>\n                      <option value=\"monospace\">Monospace</option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-bold\" aria-label=\"Bold\"></button>\n                    <button class=\"ql-italic\" aria-label=\"Italic\"></button>\n                    <button class=\"ql-underline\" aria-label=\"Underline\"></button>\n                </span>\n                <span class=\"ql-formats\">\n                    <select class=\"ql-color\"></select>\n                    <select class=\"ql-background\"></select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-list\" value=\"ordered\" aria-label=\"Ordered List\"></button>\n                    <button class=\"ql-list\" value=\"bullet\" aria-label=\"Unordered List\"></button>\n                    <select class=\"ql-align\">\n                        <option selected></option>\n                        <option value=\"center\"></option>\n                        <option value=\"right\"></option>\n                        <option value=\"justify\"></option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-link\" aria-label=\"Insert Link\"></button>\n                    <button class=\"ql-image\" aria-label=\"Insert Image\"></button>\n                    <button class=\"ql-code-block\" aria-label=\"Insert Code Block\"></button>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-clean\" aria-label=\"Remove Styles\"></button>\n                </span>\n            </div>\n            <div class=\"ui-editor-content\" [ngStyle]=\"style\"></div>\n        </div>\n    ",
            providers: [EDITOR_VALUE_ACCESSOR]
        })
    ], Editor);
    return Editor;
}());
var EditorModule = /** @class */ (function () {
    function EditorModule() {
    }
    EditorModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Editor, SharedModule],
            declarations: [Editor]
        })
    ], EditorModule);
    return EditorModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { EDITOR_VALUE_ACCESSOR, Editor, EditorModule };
//# sourceMappingURL=primeng-editor.js.map
