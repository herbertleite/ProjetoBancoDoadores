(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('primeng/api'), require('primeng/button')) :
    typeof define === 'function' && define.amd ? define('primeng/confirmdialog', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', 'primeng/api', 'primeng/button'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.confirmdialog = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.primeng.api, global.primeng.button));
}(this, (function (exports, core, animations, common, dom, api, button) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var showAnimation = animations.animation([
        animations.style({ transform: '{{transform}}', opacity: 0 }),
        animations.animate('{{transition}}', animations.style({ transform: 'none', opacity: 1 }))
    ]);
    var hideAnimation = animations.animation([
        animations.animate('{{transition}}', animations.style({ transform: '{{transform}}', opacity: 0 }))
    ]);
    var ConfirmDialog = /** @class */ (function () {
        function ConfirmDialog(el, renderer, confirmationService, zone, cd) {
            var _this = this;
            this.el = el;
            this.renderer = renderer;
            this.confirmationService = confirmationService;
            this.zone = zone;
            this.cd = cd;
            this.acceptIcon = 'pi pi-check';
            this.acceptLabel = 'Yes';
            this.acceptVisible = true;
            this.rejectIcon = 'pi pi-times';
            this.rejectLabel = 'No';
            this.rejectVisible = true;
            this.closeOnEscape = true;
            this.blockScroll = true;
            this.closable = true;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
            this.focusTrap = true;
            this._position = "center";
            this.transformOptions = "scale(0.7)";
            this.subscription = this.confirmationService.requireConfirmation$.subscribe(function (confirmation) {
                if (confirmation.key === _this.key) {
                    _this.confirmation = confirmation;
                    _this.message = _this.confirmation.message || _this.message;
                    _this.icon = _this.confirmation.icon || _this.icon;
                    _this.header = _this.confirmation.header || _this.header;
                    _this.rejectVisible = _this.confirmation.rejectVisible == null ? _this.rejectVisible : _this.confirmation.rejectVisible;
                    _this.acceptVisible = _this.confirmation.acceptVisible == null ? _this.acceptVisible : _this.confirmation.acceptVisible;
                    _this.acceptLabel = _this.confirmation.acceptLabel || _this.acceptLabel;
                    _this.rejectLabel = _this.confirmation.rejectLabel || _this.rejectLabel;
                    if (_this.confirmation.accept) {
                        _this.confirmation.acceptEvent = new core.EventEmitter();
                        _this.confirmation.acceptEvent.subscribe(_this.confirmation.accept);
                    }
                    if (_this.confirmation.reject) {
                        _this.confirmation.rejectEvent = new core.EventEmitter();
                        _this.confirmation.rejectEvent.subscribe(_this.confirmation.reject);
                    }
                    if (_this.confirmation.blockScroll === false || _this.confirmation.blockScroll === true) {
                        _this.blockScroll = _this.confirmation.blockScroll;
                    }
                    _this.visible = true;
                }
            });
        }
        Object.defineProperty(ConfirmDialog.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            set: function (value) {
                this._visible = value;
                if (this._visible && !this.maskVisible) {
                    this.maskVisible = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfirmDialog.prototype, "position", {
            get: function () {
                return this._position;
            },
            set: function (value) {
                this._position = value;
                switch (value) {
                    case 'topleft':
                    case 'bottomleft':
                    case 'left':
                        this.transformOptions = "translate3d(-100%, 0px, 0px)";
                        break;
                    case 'topright':
                    case 'bottomright':
                    case 'right':
                        this.transformOptions = "translate3d(100%, 0px, 0px)";
                        break;
                    case 'bottom':
                        this.transformOptions = "translate3d(0px, 100%, 0px)";
                        break;
                    case 'top':
                        this.transformOptions = "translate3d(0px, -100%, 0px)";
                        break;
                    default:
                        this.transformOptions = "scale(0.7)";
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        ;
        ConfirmDialog.prototype.onAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    this.container = event.element;
                    this.wrapper = this.container.parentElement;
                    this.contentContainer = dom.DomHandler.findSingle(this.container, '.ui-dialog-content');
                    if (this.acceptVisible || this.rejectVisible) {
                        dom.DomHandler.findSingle(this.container, 'button').focus();
                    }
                    this.appendContainer();
                    this.moveOnTop();
                    this.bindGlobalListeners();
                    this.enableModality();
                    break;
            }
        };
        ConfirmDialog.prototype.onAnimationEnd = function (event) {
            switch (event.toState) {
                case 'void':
                    this.onOverlayHide();
                    break;
            }
        };
        ConfirmDialog.prototype.appendContainer = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.container);
                else
                    dom.DomHandler.appendChild(this.container, this.appendTo);
            }
        };
        ConfirmDialog.prototype.restoreAppend = function () {
            if (this.container && this.appendTo) {
                this.el.nativeElement.appendChild(this.container);
            }
        };
        ConfirmDialog.prototype.enableModality = function () {
            if (this.blockScroll) {
                dom.DomHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        };
        ConfirmDialog.prototype.disableModality = function () {
            this.maskVisible = false;
            if (this.blockScroll) {
                dom.DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            }
            this.cd.detectChanges();
        };
        ConfirmDialog.prototype.close = function (event) {
            if (this.confirmation.rejectEvent) {
                this.confirmation.rejectEvent.emit();
            }
            this.hide();
            event.preventDefault();
        };
        ConfirmDialog.prototype.hide = function () {
            this.visible = false;
        };
        ConfirmDialog.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                this.container.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                this.wrapper.style.zIndex = String(this.baseZIndex + (dom.DomHandler.zindex - 1));
            }
        };
        ConfirmDialog.prototype.getWrapperClass = function () {
            var wrapperClass = { 'ui-widget-overlay ui-dialog-mask': true, 'ui-dialog-mask-scrollblocker': this.blockScroll };
            wrapperClass[this.getPositionClass().toString()] = true;
            return wrapperClass;
        };
        ConfirmDialog.prototype.getPositionClass = function () {
            var _this = this;
            var positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
            var pos = positions.find(function (item) { return item === _this.position; });
            return pos ? "ui-dialog-" + pos : '';
        };
        ConfirmDialog.prototype.bindGlobalListeners = function () {
            var _this = this;
            if ((this.closeOnEscape && this.closable) || this.focusTrap && !this.documentEscapeListener) {
                this.documentEscapeListener = this.renderer.listen('document', 'keydown', function (event) {
                    if (event.which == 27 && (_this.closeOnEscape && _this.closable)) {
                        if (parseInt(_this.container.style.zIndex) === (dom.DomHandler.zindex + _this.baseZIndex) && _this.visible) {
                            _this.close(event);
                        }
                    }
                    if (event.which === 9 && _this.focusTrap) {
                        event.preventDefault();
                        var focusableElements = dom.DomHandler.getFocusableElements(_this.container);
                        if (focusableElements && focusableElements.length > 0) {
                            if (!document.activeElement) {
                                focusableElements[0].focus();
                            }
                            else {
                                var focusedIndex = focusableElements.indexOf(document.activeElement);
                                if (event.shiftKey) {
                                    if (focusedIndex == -1 || focusedIndex === 0)
                                        focusableElements[focusableElements.length - 1].focus();
                                    else
                                        focusableElements[focusedIndex - 1].focus();
                                }
                                else {
                                    if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                                        focusableElements[0].focus();
                                    else
                                        focusableElements[focusedIndex + 1].focus();
                                }
                            }
                        }
                    }
                });
            }
        };
        ConfirmDialog.prototype.unbindGlobalListeners = function () {
            if (this.documentEscapeListener) {
                this.documentEscapeListener();
                this.documentEscapeListener = null;
            }
        };
        ConfirmDialog.prototype.onOverlayHide = function () {
            this.disableModality();
            this.unbindGlobalListeners();
            this.container = null;
        };
        ConfirmDialog.prototype.ngOnDestroy = function () {
            this.restoreAppend();
            this.onOverlayHide();
            this.subscription.unsubscribe();
        };
        ConfirmDialog.prototype.accept = function () {
            if (this.confirmation.acceptEvent) {
                this.confirmation.acceptEvent.emit();
            }
            this.hide();
            this.confirmation = null;
        };
        ConfirmDialog.prototype.reject = function () {
            if (this.confirmation.rejectEvent) {
                this.confirmation.rejectEvent.emit();
            }
            this.hide();
            this.confirmation = null;
        };
        ConfirmDialog.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: api.ConfirmationService },
            { type: core.NgZone },
            { type: core.ChangeDetectorRef }
        ]; };
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "header", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "icon", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "message", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "acceptIcon", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "acceptLabel", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "acceptVisible", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "rejectIcon", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "rejectLabel", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "rejectVisible", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "acceptButtonStyleClass", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "rejectButtonStyleClass", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "closeOnEscape", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "blockScroll", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "rtl", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "closable", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "appendTo", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "key", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "autoZIndex", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "baseZIndex", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "transitionOptions", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "focusTrap", void 0);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "visible", null);
        __decorate([
            core.Input()
        ], ConfirmDialog.prototype, "position", null);
        __decorate([
            core.ContentChild(api.Footer, { static: true })
        ], ConfirmDialog.prototype, "footer", void 0);
        __decorate([
            core.ViewChild('content', { static: true })
        ], ConfirmDialog.prototype, "contentViewChild", void 0);
        ConfirmDialog = __decorate([
            core.Component({
                selector: 'p-confirmDialog',
                template: "\n        <div class=\"ui-dialog-wrapper\" [ngClass]=\"getWrapperClass()\" *ngIf=\"maskVisible\">\n            <div [ngClass]=\"{'ui-dialog ui-confirmdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true,'ui-dialog-rtl':rtl}\" [ngStyle]=\"style\" [class]=\"styleClass\" (mousedown)=\"moveOnTop()\"\n                [@animation]=\"{value: 'visible', params: {transform: transformOptions, transition: transitionOptions}}\" (@animation.start)=\"onAnimationStart($event)\" (@animation.done)=\"onAnimationEnd($event)\" *ngIf=\"visible\">\n                <div class=\"ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top\">\n                    <span class=\"ui-dialog-title\" *ngIf=\"header\">{{header}}</span>\n                    <div class=\"ui-dialog-titlebar-icons\">\n                        <a *ngIf=\"closable\" [ngClass]=\"{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}\" tabindex=\"0\" role=\"button\" (click)=\"close($event)\" (keydown.enter)=\"close($event)\">\n                            <span class=\"pi pi-times\"></span>\n                        </a>\n                    </div>\n                </div>\n                <div #content class=\"ui-dialog-content ui-widget-content\">\n                    <i [ngClass]=\"'ui-confirmdialog-icon'\" [class]=\"icon\" *ngIf=\"icon\"></i>\n                    <span class=\"ui-confirmdialog-message\" [innerHTML]=\"message\"></span>\n                </div>\n                <div class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"footer\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                </div>\n                <div class=\"ui-dialog-footer ui-widget-content\" *ngIf=\"!footer\">\n                    <button type=\"button\" pButton [icon]=\"acceptIcon\" [label]=\"acceptLabel\" (click)=\"accept()\" [class]=\"acceptButtonStyleClass\" *ngIf=\"acceptVisible\"></button>\n                    <button type=\"button\" pButton [icon]=\"rejectIcon\" [label]=\"rejectLabel\" (click)=\"reject()\" [class]=\"rejectButtonStyleClass\" *ngIf=\"rejectVisible\"></button>\n                </div>\n            </div>\n        </div>\n    ",
                animations: [
                    animations.trigger('animation', [
                        animations.transition('void => visible', [
                            animations.useAnimation(showAnimation)
                        ]),
                        animations.transition('visible => void', [
                            animations.useAnimation(hideAnimation)
                        ])
                    ])
                ]
            })
        ], ConfirmDialog);
        return ConfirmDialog;
    }());
    var ConfirmDialogModule = /** @class */ (function () {
        function ConfirmDialogModule() {
        }
        ConfirmDialogModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, button.ButtonModule],
                exports: [ConfirmDialog, button.ButtonModule, api.SharedModule],
                declarations: [ConfirmDialog]
            })
        ], ConfirmDialogModule);
        return ConfirmDialogModule;
    }());

    exports.ConfirmDialog = ConfirmDialog;
    exports.ConfirmDialogModule = ConfirmDialogModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-confirmdialog.umd.js.map
