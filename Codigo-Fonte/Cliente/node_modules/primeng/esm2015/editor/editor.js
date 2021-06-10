var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, AfterViewInit, Input, Output, EventEmitter, ContentChild, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Header } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Quill from "quill";
export const EDITOR_VALUE_ACCESSOR = {
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
export { Editor };
let EditorModule = class EditorModule {
};
EditorModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Editor, SharedModule],
        declarations: [Editor]
    })
], EditorModule);
export { EditorModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9lZGl0b3IvIiwic291cmNlcyI6WyJlZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFBQyxNQUFNLGFBQWEsQ0FBQTtBQUMvQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxpQkFBaUIsRUFBdUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUvQixNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBUTtJQUN4QyxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO0lBQ3JDLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQXVERixJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0lBb0NmLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBbEN2QixpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXJELHNCQUFpQixHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBb0IxRCxXQUFNLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFNekQsa0JBQWEsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFFbkMsbUJBQWMsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFJQSxDQUFDO0lBRXJDLGVBQWU7UUFDWCxJQUFJ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QUFNO0lBckRsQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWdEVDtRQUNELFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO0tBQ3JDLENBQUM7R0FDVyxNQUFNLENBaUlsQjtTQWpJWSxNQUFNO0FBd0luQixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBQUksQ0FBQTtBQUFoQixZQUFZO0lBTHhCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUMsWUFBWSxDQUFDO1FBQzlCLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQztLQUN6QixDQUFDO0dBQ1csWUFBWSxDQUFJO1NBQWhCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLEFmdGVyVmlld0luaXQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixDb250ZW50Q2hpbGQsZm9yd2FyZFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlLEhlYWRlcn0gZnJvbSAncHJpbWVuZy9hcGknXG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgKiBhcyBRdWlsbCBmcm9tIFwicXVpbGxcIjtcblxuZXhwb3J0IGNvbnN0IEVESVRPUl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gRWRpdG9yKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1lZGl0b3InLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwiJ3VpLXdpZGdldCB1aS1lZGl0b3ItY29udGFpbmVyIHVpLWNvcm5lci1hbGwnXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1lZGl0b3ItdG9vbGJhciB1aS13aWRnZXQtaGVhZGVyIHVpLWNvcm5lci10b3BcIiAqbmdJZj1cInRvb2xiYXJcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJwLWhlYWRlclwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWVkaXRvci10b29sYmFyIHVpLXdpZGdldC1oZWFkZXIgdWktY29ybmVyLXRvcFwiICpuZ0lmPVwiIXRvb2xiYXJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxXCI+SGVhZGluZzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIyXCI+U3ViaGVhZGluZzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gc2VsZWN0ZWQ+Tm9ybWFsPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwicWwtZm9udFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gc2VsZWN0ZWQ+U2FucyBTZXJpZjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzZXJpZlwiPlNlcmlmPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1vbm9zcGFjZVwiPk1vbm9zcGFjZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxbC1mb3JtYXRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1ib2xkXCIgYXJpYS1sYWJlbD1cIkJvbGRcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWl0YWxpY1wiIGFyaWEtbGFiZWw9XCJJdGFsaWNcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLXVuZGVybGluZVwiIGFyaWEtbGFiZWw9XCJVbmRlcmxpbmVcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxbC1mb3JtYXRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJxbC1jb2xvclwiPjwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwicWwtYmFja2dyb3VuZFwiPjwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInFsLWZvcm1hdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWxpc3RcIiB2YWx1ZT1cIm9yZGVyZWRcIiBhcmlhLWxhYmVsPVwiT3JkZXJlZCBMaXN0XCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1saXN0XCIgdmFsdWU9XCJidWxsZXRcIiBhcmlhLWxhYmVsPVwiVW5vcmRlcmVkIExpc3RcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInFsLWFsaWduXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHNlbGVjdGVkPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImNlbnRlclwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJpZ2h0XCI+PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwianVzdGlmeVwiPjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxbC1mb3JtYXRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1saW5rXCIgYXJpYS1sYWJlbD1cIkluc2VydCBMaW5rXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1pbWFnZVwiIGFyaWEtbGFiZWw9XCJJbnNlcnQgSW1hZ2VcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInFsLWNvZGUtYmxvY2tcIiBhcmlhLWxhYmVsPVwiSW5zZXJ0IENvZGUgQmxvY2tcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJxbC1mb3JtYXRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJxbC1jbGVhblwiIGFyaWEtbGFiZWw9XCJSZW1vdmUgU3R5bGVzXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktZWRpdG9yLWNvbnRlbnRcIiBbbmdTdHlsZV09XCJzdHlsZVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW0VESVRPUl9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgRWRpdG9yIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gICAgICAgIFxuICAgIEBPdXRwdXQoKSBvblRleHRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvblNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQENvbnRlbnRDaGlsZChIZWFkZXIsIHsgc3RhdGljOiB0cnVlIH0pIHRvb2xiYXI7XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcbiAgICAgICAgXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgZm9ybWF0czogc3RyaW5nW107XG5cbiAgICBASW5wdXQoKSBtb2R1bGVzOiBhbnk7XG5cbiAgICBASW5wdXQoKSBib3VuZHM6IGFueTtcblxuICAgIEBJbnB1dCgpIHNjcm9sbGluZ0NvbnRhaW5lcjogYW55O1xuXG4gICAgQElucHV0KCkgZGVidWc6IHN0cmluZztcbiAgICBcbiAgICBAT3V0cHV0KCkgb25Jbml0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICB2YWx1ZTogc3RyaW5nO1xuICAgIFxuICAgIF9yZWFkb25seTogYm9vbGVhbjtcbiAgICBcbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIHF1aWxsOiBhbnk7XG4gICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBsZXQgZWRpdG9yRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgLCdkaXYudWktZWRpdG9yLWNvbnRlbnQnKTsgXG4gICAgICAgIGxldCB0b29sYmFyRWxlbWVudCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgLCdkaXYudWktZWRpdG9yLXRvb2xiYXInKTsgXG4gICAgICAgIGxldCBkZWZhdWx0TW9kdWxlICA9IHt0b29sYmFyOiB0b29sYmFyRWxlbWVudH07XG4gICAgICAgIGxldCBtb2R1bGVzID0gdGhpcy5tb2R1bGVzID8gey4uLmRlZmF1bHRNb2R1bGUsIC4uLnRoaXMubW9kdWxlc30gOiBkZWZhdWx0TW9kdWxlO1xuXG4gICAgICAgIHRoaXMucXVpbGwgPSBuZXcgUXVpbGwoZWRpdG9yRWxlbWVudCwge1xuICAgICAgICAgIG1vZHVsZXM6IG1vZHVsZXMsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMucGxhY2Vob2xkZXIsXG4gICAgICAgICAgcmVhZE9ubHk6IHRoaXMucmVhZG9ubHksXG4gICAgICAgICAgdGhlbWU6ICdzbm93JyxcbiAgICAgICAgICBmb3JtYXRzOiB0aGlzLmZvcm1hdHMsXG4gICAgICAgICAgYm91bmRzOiB0aGlzLmJvdW5kcyxcbiAgICAgICAgICBkZWJ1ZzogdGhpcy5kZWJ1ZyxcbiAgICAgICAgICBzY3JvbGxpbmdDb250YWluZXI6IHRoaXMuc2Nyb2xsaW5nQ29udGFpbmVyXG4gICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5xdWlsbC5wYXN0ZUhUTUwodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMucXVpbGwub24oJ3RleHQtY2hhbmdlJywgKGRlbHRhLCBvbGRDb250ZW50cywgc291cmNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoc291cmNlID09PSAndXNlcicpIHtcbiAgICAgICAgICAgICAgICBsZXQgaHRtbCA9IGVkaXRvckVsZW1lbnQuY2hpbGRyZW5bMF0uaW5uZXJIVE1MO1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gdGhpcy5xdWlsbC5nZXRUZXh0KCkudHJpbSgpO1xuICAgICAgICAgICAgICAgIGlmIChodG1sID09PSAnPHA+PGJyPjwvcD4nKSB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWwgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMub25UZXh0Q2hhbmdlLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBodG1sVmFsdWU6IGh0bWwsXG4gICAgICAgICAgICAgICAgICAgIHRleHRWYWx1ZTogdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgZGVsdGE6IGRlbHRhLFxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZShodG1sKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5xdWlsbC5vbignc2VsZWN0aW9uLWNoYW5nZScsIChyYW5nZSwgb2xkUmFuZ2UsIHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgICAgICByYW5nZTogcmFuZ2UsXG4gICAgICAgICAgICAgICAgb2xkUmFuZ2U6IG9sZFJhbmdlLFxuICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLm9uSW5pdC5lbWl0KHtcbiAgICAgICAgICAgIGVkaXRvcjogdGhpcy5xdWlsbFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgICAgIFxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICBpZiAodGhpcy5xdWlsbCkge1xuICAgICAgICAgICAgaWYgKHZhbHVlKVxuICAgICAgICAgICAgICAgIHRoaXMucXVpbGwucGFzdGVIVE1MKHZhbHVlKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnF1aWxsLnNldFRleHQoJycpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuICAgIFxuICAgIGdldFF1aWxsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWlsbDtcbiAgICB9XG4gICAgXG4gICAgQElucHV0KCkgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVhZG9ubHk7XG4gICAgfVxuXG4gICAgc2V0IHJlYWRvbmx5KHZhbDpib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3JlYWRvbmx5ID0gdmFsO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMucXVpbGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9yZWFkb25seSlcbiAgICAgICAgICAgICAgICB0aGlzLnF1aWxsLmRpc2FibGUoKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnF1aWxsLmVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtFZGl0b3IsU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtFZGl0b3JdXG59KVxuZXhwb3J0IGNsYXNzIEVkaXRvck1vZHVsZSB7IH1cbiJdfQ==