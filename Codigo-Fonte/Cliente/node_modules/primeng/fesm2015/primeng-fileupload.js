import { EventEmitter, ElementRef, NgZone, Input, Output, ContentChildren, ViewChild, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ProgressBarModule } from 'primeng/progressbar';
import { DomHandler } from 'primeng/dom';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { HttpEventType, HttpClient } from '@angular/common/http';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let FileUpload = class FileUpload {
    constructor(el, sanitizer, zone, http) {
        this.el = el;
        this.sanitizer = sanitizer;
        this.zone = zone;
        this.http = http;
        this.method = 'POST';
        this.invalidFileSizeMessageSummary = '{0}: Invalid file size, ';
        this.invalidFileSizeMessageDetail = 'maximum upload size is {0}.';
        this.invalidFileTypeMessageSummary = '{0}: Invalid file type, ';
        this.invalidFileTypeMessageDetail = 'allowed file types: {0}.';
        this.invalidFileLimitMessageDetail = 'limit is {0} at most.';
        this.invalidFileLimitMessageSummary = 'Maximum number of files exceeded, ';
        this.previewWidth = 50;
        this.chooseLabel = 'Choose';
        this.uploadLabel = 'Upload';
        this.cancelLabel = 'Cancel';
        this.showUploadButton = true;
        this.showCancelButton = true;
        this.mode = 'advanced';
        this.onBeforeUpload = new EventEmitter();
        this.onSend = new EventEmitter();
        this.onUpload = new EventEmitter();
        this.onError = new EventEmitter();
        this.onClear = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onProgress = new EventEmitter();
        this.uploadHandler = new EventEmitter();
        this._files = [];
        this.progress = 0;
        this.uploadedFileCount = 0;
    }
    set files(files) {
        this._files = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (this.validate(file)) {
                if (this.isImage(file)) {
                    file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                }
                this._files.push(files[i]);
            }
        }
    }
    get files() {
        return this._files;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'file':
                    this.fileTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'toolbar':
                    this.toolbarTemplate = item.template;
                    break;
                default:
                    this.fileTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (this.mode === 'advanced') {
            this.zone.runOutsideAngular(() => {
                if (this.content)
                    this.content.nativeElement.addEventListener('dragover', this.onDragOver.bind(this));
            });
        }
    }
    onFileSelect(event) {
        if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
            this.duplicateIEEvent = false;
            return;
        }
        this.msgs = [];
        if (!this.multiple) {
            this.files = [];
        }
        let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!this.isFileSelected(file)) {
                if (this.validate(file)) {
                    if (this.isImage(file)) {
                        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                    }
                    this.files.push(files[i]);
                }
            }
        }
        this.onSelect.emit({ originalEvent: event, files: files });
        if (this.fileLimit && this.mode == "advanced") {
            this.checkFileLimit();
        }
        if (this.hasFiles() && this.auto && (!(this.mode === "advanced") || !this.isFileLimitExceeded())) {
            this.upload();
        }
        if (event.type !== 'drop' && this.isIE11()) {
            this.clearIEInput();
        }
        else {
            this.clearInputElement();
        }
    }
    isFileSelected(file) {
        for (let sFile of this.files) {
            if ((sFile.name + sFile.type + sFile.size) === (file.name + file.type + file.size)) {
                return true;
            }
        }
        return false;
    }
    isIE11() {
        return !!window['MSInputMethodContext'] && !!document['documentMode'];
    }
    validate(file) {
        if (this.accept && !this.isFileTypeValid(file)) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileTypeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileTypeMessageDetail.replace('{0}', this.accept)
            });
            return false;
        }
        if (this.maxFileSize && file.size > this.maxFileSize) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
            });
            return false;
        }
        return true;
    }
    isFileTypeValid(file) {
        let acceptableTypes = this.accept.split(',').map(type => type.trim());
        for (let type of acceptableTypes) {
            let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type)
                : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();
            if (acceptable) {
                return true;
            }
        }
        return false;
    }
    getTypeClass(fileType) {
        return fileType.substring(0, fileType.indexOf('/'));
    }
    isWildcard(fileType) {
        return fileType.indexOf('*') !== -1;
    }
    getFileExtension(file) {
        return '.' + file.name.split('.').pop();
    }
    isImage(file) {
        return /^image\//.test(file.type);
    }
    onImageLoad(img) {
        window.URL.revokeObjectURL(img.src);
    }
    upload() {
        if (this.customUpload) {
            if (this.fileLimit) {
                this.uploadedFileCount += this.files.length;
            }
            this.uploadHandler.emit({
                files: this.files
            });
        }
        else {
            this.uploading = true;
            this.msgs = [];
            let formData = new FormData();
            this.onBeforeUpload.emit({
                'formData': formData
            });
            for (let i = 0; i < this.files.length; i++) {
                formData.append(this.name, this.files[i], this.files[i].name);
            }
            this.http.post(this.url, formData, {
                headers: this.headers, reportProgress: true, observe: 'events', withCredentials: this.withCredentials
            }).subscribe((event) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        this.onSend.emit({
                            originalEvent: event,
                            'formData': formData
                        });
                        break;
                    case HttpEventType.Response:
                        this.uploading = false;
                        this.progress = 0;
                        if (event['status'] >= 200 && event['status'] < 300) {
                            if (this.fileLimit) {
                                this.uploadedFileCount += this.files.length;
                            }
                            this.onUpload.emit({ originalEvent: event, files: this.files });
                        }
                        else {
                            this.onError.emit({ files: this.files });
                        }
                        this.clear();
                        break;
                    case HttpEventType.UploadProgress: {
                        if (event['loaded']) {
                            this.progress = Math.round((event['loaded'] * 100) / event['total']);
                        }
                        this.onProgress.emit({ originalEvent: event, progress: this.progress });
                        break;
                    }
                }
            }, error => {
                this.uploading = false;
                this.onError.emit({ files: this.files, error: error });
            });
        }
    }
    clear() {
        this.files = [];
        this.onClear.emit();
        this.clearInputElement();
    }
    remove(event, index) {
        this.clearInputElement();
        this.onRemove.emit({ originalEvent: event, file: this.files[index] });
        this.files.splice(index, 1);
    }
    isFileLimitExceeded() {
        if (this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount && this.focus) {
            this.focus = false;
        }
        return this.fileLimit && this.fileLimit < this.files.length + this.uploadedFileCount;
    }
    isChooseDisabled() {
        return this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
    }
    checkFileLimit() {
        if (this.isFileLimitExceeded()) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileLimitMessageSummary.replace('{0}', this.fileLimit.toString()),
                detail: this.invalidFileLimitMessageDetail.replace('{0}', this.fileLimit.toString())
            });
        }
    }
    clearInputElement() {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.advancedFileInput.nativeElement.value = '';
        }
        if (this.basicFileInput && this.basicFileInput.nativeElement) {
            this.basicFileInput.nativeElement.value = '';
        }
    }
    clearIEInput() {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.duplicateIEEvent = true; //IE11 fix to prevent onFileChange trigger again
            this.advancedFileInput.nativeElement.value = '';
        }
    }
    hasFiles() {
        return this.files && this.files.length > 0;
    }
    onDragEnter(e) {
        if (!this.disabled) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
    onDragOver(e) {
        if (!this.disabled) {
            DomHandler.addClass(this.content.nativeElement, 'ui-fileupload-highlight');
            this.dragHighlight = true;
            e.stopPropagation();
            e.preventDefault();
        }
    }
    onDragLeave(event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content.nativeElement, 'ui-fileupload-highlight');
        }
    }
    onDrop(event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content.nativeElement, 'ui-fileupload-highlight');
            event.stopPropagation();
            event.preventDefault();
            let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
            let allowDrop = this.multiple || (files && files.length === 1);
            if (allowDrop) {
                this.onFileSelect(event);
            }
        }
    }
    onFocus() {
        this.focus = true;
    }
    onBlur() {
        this.focus = false;
    }
    formatSize(bytes) {
        if (bytes == 0) {
            return '0 B';
        }
        let k = 1000, dm = 3, sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    onSimpleUploaderClick(event) {
        if (this.hasFiles()) {
            this.upload();
        }
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    ngOnDestroy() {
        if (this.content && this.content.nativeElement) {
            this.content.nativeElement.removeEventListener('dragover', this.onDragOver);
        }
    }
};
FileUpload.ctorParameters = () => [
    { type: ElementRef },
    { type: DomSanitizer },
    { type: NgZone },
    { type: HttpClient }
];
__decorate([
    Input()
], FileUpload.prototype, "name", void 0);
__decorate([
    Input()
], FileUpload.prototype, "url", void 0);
__decorate([
    Input()
], FileUpload.prototype, "method", void 0);
__decorate([
    Input()
], FileUpload.prototype, "multiple", void 0);
__decorate([
    Input()
], FileUpload.prototype, "accept", void 0);
__decorate([
    Input()
], FileUpload.prototype, "disabled", void 0);
__decorate([
    Input()
], FileUpload.prototype, "auto", void 0);
__decorate([
    Input()
], FileUpload.prototype, "withCredentials", void 0);
__decorate([
    Input()
], FileUpload.prototype, "maxFileSize", void 0);
__decorate([
    Input()
], FileUpload.prototype, "invalidFileSizeMessageSummary", void 0);
__decorate([
    Input()
], FileUpload.prototype, "invalidFileSizeMessageDetail", void 0);
__decorate([
    Input()
], FileUpload.prototype, "invalidFileTypeMessageSummary", void 0);
__decorate([
    Input()
], FileUpload.prototype, "invalidFileTypeMessageDetail", void 0);
__decorate([
    Input()
], FileUpload.prototype, "invalidFileLimitMessageDetail", void 0);
__decorate([
    Input()
], FileUpload.prototype, "invalidFileLimitMessageSummary", void 0);
__decorate([
    Input()
], FileUpload.prototype, "style", void 0);
__decorate([
    Input()
], FileUpload.prototype, "styleClass", void 0);
__decorate([
    Input()
], FileUpload.prototype, "previewWidth", void 0);
__decorate([
    Input()
], FileUpload.prototype, "chooseLabel", void 0);
__decorate([
    Input()
], FileUpload.prototype, "uploadLabel", void 0);
__decorate([
    Input()
], FileUpload.prototype, "cancelLabel", void 0);
__decorate([
    Input()
], FileUpload.prototype, "showUploadButton", void 0);
__decorate([
    Input()
], FileUpload.prototype, "showCancelButton", void 0);
__decorate([
    Input()
], FileUpload.prototype, "mode", void 0);
__decorate([
    Input()
], FileUpload.prototype, "headers", void 0);
__decorate([
    Input()
], FileUpload.prototype, "customUpload", void 0);
__decorate([
    Input()
], FileUpload.prototype, "fileLimit", void 0);
__decorate([
    Output()
], FileUpload.prototype, "onBeforeUpload", void 0);
__decorate([
    Output()
], FileUpload.prototype, "onSend", void 0);
__decorate([
    Output()
], FileUpload.prototype, "onUpload", void 0);
__decorate([
    Output()
], FileUpload.prototype, "onError", void 0);
__decorate([
    Output()
], FileUpload.prototype, "onClear", void 0);
__decorate([
    Output()
], FileUpload.prototype, "onRemove", void 0);
__decorate([
    Output()
], FileUpload.prototype, "onSelect", void 0);
__decorate([
    Output()
], FileUpload.prototype, "onProgress", void 0);
__decorate([
    Output()
], FileUpload.prototype, "uploadHandler", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], FileUpload.prototype, "templates", void 0);
__decorate([
    ViewChild('advancedfileinput', { static: false })
], FileUpload.prototype, "advancedFileInput", void 0);
__decorate([
    ViewChild('basicfileinput', { static: false })
], FileUpload.prototype, "basicFileInput", void 0);
__decorate([
    ViewChild('content', { static: false })
], FileUpload.prototype, "content", void 0);
__decorate([
    Input()
], FileUpload.prototype, "files", null);
FileUpload = __decorate([
    Component({
        selector: 'p-fileUpload',
        template: `
        <div [ngClass]="'ui-fileupload ui-widget'" [ngStyle]="style" [class]="styleClass" *ngIf="mode === 'advanced'">
            <div class="ui-fileupload-buttonbar ui-widget-header ui-corner-top">
                <span class="ui-fileupload-choose" [label]="chooseLabel" icon="pi pi-plus" pButton [ngClass]="{'ui-state-focus': focus, 'ui-state-disabled':disabled || isChooseDisabled()}"> 
                    <input #advancedfileinput type="file" (change)="onFileSelect($event)" [multiple]="multiple" [accept]="accept" [disabled]="disabled || isChooseDisabled()" (focus)="onFocus()" (blur)="onBlur()">
                </span>

                <p-button *ngIf="!auto&&showUploadButton" type="button" [label]="uploadLabel" icon="pi pi-upload" (onClick)="upload()" [disabled]="!hasFiles() || isFileLimitExceeded()"></p-button>
                <p-button *ngIf="!auto&&showCancelButton" type="button" [label]="cancelLabel" icon="pi pi-times" (onClick)="clear()" [disabled]="!hasFiles() || uploading"></p-button>

                <ng-container *ngTemplateOutlet="toolbarTemplate"></ng-container>
            </div>
            <div #content [ngClass]="{'ui-fileupload-content ui-widget-content ui-corner-bottom':true}"
                 (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)">
                <p-progressBar [value]="progress" [showValue]="false" *ngIf="hasFiles()"></p-progressBar>

                <p-messages [value]="msgs" [enableService]="false"></p-messages>

                <div class="ui-fileupload-files" *ngIf="hasFiles()">
                    <div *ngIf="!fileTemplate">
                        <div class="ui-fileupload-row" *ngFor="let file of files; let i = index;">
                            <div><img [src]="file.objectURL" *ngIf="isImage(file)" [width]="previewWidth" /></div>
                            <div>{{file.name}}</div>
                            <div>{{formatSize(file.size)}}</div>
                            <div>
                                <button type="button" icon="pi pi-times" pButton (click)="remove($event,i)" [disabled]="uploading"></button>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="fileTemplate">
                        <ng-template ngFor [ngForOf]="files" [ngForTemplate]="fileTemplate"></ng-template>
                    </div>
                </div>
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </div>
        </div>
        <span *ngIf="mode === 'basic'" [ngClass]="{'ui-button ui-fileupload-choose ui-widget ui-state-default ui-corner-all ui-button-text-icon-left': true, 
                'ui-fileupload-choose-selected': hasFiles(),'ui-state-focus': focus, 'ui-state-disabled':disabled}"
              [ngStyle]="style" [class]="styleClass" (mouseup)="onSimpleUploaderClick($event)">
            <span class="ui-button-icon-left pi" [ngClass]="{'pi-plus': !hasFiles()||auto, 'pi-upload': hasFiles()&&!auto}"></span>
            <span class="ui-button-text ui-clickable">{{auto ? chooseLabel : hasFiles() ? files[0].name : chooseLabel}}</span>
            <input #basicfileinput type="file" [accept]="accept" [multiple]="multiple" [disabled]="disabled"
                   (change)="onFileSelect($event)" *ngIf="!hasFiles()" (focus)="onFocus()" (blur)="onBlur()">
        </span>
    `
    })
], FileUpload);
let FileUploadModule = class FileUploadModule {
};
FileUploadModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule],
        exports: [FileUpload, SharedModule, ButtonModule, ProgressBarModule, MessagesModule],
        declarations: [FileUpload]
    })
], FileUploadModule);

/**
 * Generated bundle index. Do not edit.
 */

export { FileUpload, FileUploadModule };
//# sourceMappingURL=primeng-fileupload.js.map
