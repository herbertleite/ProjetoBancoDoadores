import { ElementRef, NgZone, Input, Directive, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Tooltip = /** @class */ (function () {
    function Tooltip(el, zone) {
        this.el = el;
        this.zone = zone;
        this.tooltipPosition = 'right';
        this.tooltipEvent = 'hover';
        this.appendTo = 'body';
        this.tooltipZIndex = 'auto';
        this.escape = true;
    }
    Tooltip.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            if (_this.tooltipEvent === 'hover') {
                _this.mouseEnterListener = _this.onMouseEnter.bind(_this);
                _this.mouseLeaveListener = _this.onMouseLeave.bind(_this);
                _this.clickListener = _this.onClick.bind(_this);
                _this.el.nativeElement.addEventListener('mouseenter', _this.mouseEnterListener);
                _this.el.nativeElement.addEventListener('mouseleave', _this.mouseLeaveListener);
                _this.el.nativeElement.addEventListener('click', _this.clickListener);
            }
            else if (_this.tooltipEvent === 'focus') {
                _this.focusListener = _this.onFocus.bind(_this);
                _this.blurListener = _this.onBlur.bind(_this);
                _this.el.nativeElement.addEventListener('focus', _this.focusListener);
                _this.el.nativeElement.addEventListener('blur', _this.blurListener);
            }
        });
    };
    Tooltip.prototype.onMouseEnter = function (e) {
        if (!this.container && !this.showTimeout) {
            this.activate();
        }
    };
    Tooltip.prototype.onMouseLeave = function (e) {
        this.deactivate();
    };
    Tooltip.prototype.onFocus = function (e) {
        this.activate();
    };
    Tooltip.prototype.onBlur = function (e) {
        this.deactivate();
    };
    Tooltip.prototype.onClick = function (e) {
        this.deactivate();
    };
    Tooltip.prototype.activate = function () {
        var _this = this;
        this.active = true;
        this.clearHideTimeout();
        if (this.showDelay)
            this.showTimeout = setTimeout(function () { _this.show(); }, this.showDelay);
        else
            this.show();
        if (this.life) {
            var duration = this.showDelay ? this.life + this.showDelay : this.life;
            this.hideTimeout = setTimeout(function () { _this.hide(); }, duration);
        }
    };
    Tooltip.prototype.deactivate = function () {
        var _this = this;
        this.active = false;
        this.clearShowTimeout();
        if (this.hideDelay) {
            this.clearHideTimeout(); //life timeout
            this.hideTimeout = setTimeout(function () { _this.hide(); }, this.hideDelay);
        }
        else {
            this.hide();
        }
    };
    Object.defineProperty(Tooltip.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this._text = text;
            if (this.active) {
                if (this._text) {
                    if (this.container && this.container.offsetParent) {
                        this.updateText();
                        this.align();
                    }
                    else {
                        this.show();
                    }
                }
                else {
                    this.hide();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Tooltip.prototype.create = function () {
        this.container = document.createElement('div');
        var tooltipArrow = document.createElement('div');
        tooltipArrow.className = 'ui-tooltip-arrow';
        this.container.appendChild(tooltipArrow);
        this.tooltipText = document.createElement('div');
        this.tooltipText.className = 'ui-tooltip-text ui-shadow ui-corner-all';
        this.updateText();
        if (this.positionStyle) {
            this.container.style.position = this.positionStyle;
        }
        this.container.appendChild(this.tooltipText);
        if (this.appendTo === 'body')
            document.body.appendChild(this.container);
        else if (this.appendTo === 'target')
            DomHandler.appendChild(this.container, this.el.nativeElement);
        else
            DomHandler.appendChild(this.container, this.appendTo);
        this.container.style.display = 'inline-block';
    };
    Tooltip.prototype.show = function () {
        if (!this.text || this.disabled) {
            return;
        }
        this.create();
        this.align();
        DomHandler.fadeIn(this.container, 250);
        if (this.tooltipZIndex === 'auto')
            this.container.style.zIndex = ++DomHandler.zindex;
        else
            this.container.style.zIndex = this.tooltipZIndex;
        this.bindDocumentResizeListener();
    };
    Tooltip.prototype.hide = function () {
        this.remove();
    };
    Tooltip.prototype.updateText = function () {
        if (this.escape) {
            this.tooltipText.innerHTML = '';
            this.tooltipText.appendChild(document.createTextNode(this._text));
        }
        else {
            this.tooltipText.innerHTML = this._text;
        }
    };
    Tooltip.prototype.align = function () {
        var position = this.tooltipPosition;
        switch (position) {
            case 'top':
                this.alignTop();
                if (this.isOutOfBounds()) {
                    this.alignBottom();
                    if (this.isOutOfBounds()) {
                        this.alignRight();
                        if (this.isOutOfBounds()) {
                            this.alignLeft();
                        }
                    }
                }
                break;
            case 'bottom':
                this.alignBottom();
                if (this.isOutOfBounds()) {
                    this.alignTop();
                    if (this.isOutOfBounds()) {
                        this.alignRight();
                        if (this.isOutOfBounds()) {
                            this.alignLeft();
                        }
                    }
                }
                break;
            case 'left':
                this.alignLeft();
                if (this.isOutOfBounds()) {
                    this.alignRight();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
            case 'right':
                this.alignRight();
                if (this.isOutOfBounds()) {
                    this.alignLeft();
                    if (this.isOutOfBounds()) {
                        this.alignTop();
                        if (this.isOutOfBounds()) {
                            this.alignBottom();
                        }
                    }
                }
                break;
        }
    };
    Tooltip.prototype.getHostOffset = function () {
        if (this.appendTo === 'body' || this.appendTo === 'target') {
            var offset = this.el.nativeElement.getBoundingClientRect();
            var targetLeft = offset.left + DomHandler.getWindowScrollLeft();
            var targetTop = offset.top + DomHandler.getWindowScrollTop();
            return { left: targetLeft, top: targetTop };
        }
        else {
            return { left: 0, top: 0 };
        }
    };
    Tooltip.prototype.alignRight = function () {
        this.preAlign('right');
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + DomHandler.getOuterWidth(this.el.nativeElement);
        var top = hostOffset.top + (DomHandler.getOuterHeight(this.el.nativeElement) - DomHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    Tooltip.prototype.alignLeft = function () {
        this.preAlign('left');
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left - DomHandler.getOuterWidth(this.container);
        var top = hostOffset.top + (DomHandler.getOuterHeight(this.el.nativeElement) - DomHandler.getOuterHeight(this.container)) / 2;
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    Tooltip.prototype.alignTop = function () {
        this.preAlign('top');
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
        var top = hostOffset.top - DomHandler.getOuterHeight(this.container);
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    Tooltip.prototype.alignBottom = function () {
        this.preAlign('bottom');
        var hostOffset = this.getHostOffset();
        var left = hostOffset.left + (DomHandler.getOuterWidth(this.el.nativeElement) - DomHandler.getOuterWidth(this.container)) / 2;
        var top = hostOffset.top + DomHandler.getOuterHeight(this.el.nativeElement);
        this.container.style.left = left + 'px';
        this.container.style.top = top + 'px';
    };
    Tooltip.prototype.preAlign = function (position) {
        this.container.style.left = -999 + 'px';
        this.container.style.top = -999 + 'px';
        var defaultClassName = 'ui-tooltip ui-widget ui-tooltip-' + position;
        this.container.className = this.tooltipStyleClass ? defaultClassName + ' ' + this.tooltipStyleClass : defaultClassName;
    };
    Tooltip.prototype.isOutOfBounds = function () {
        var offset = this.container.getBoundingClientRect();
        var targetTop = offset.top;
        var targetLeft = offset.left;
        var width = DomHandler.getOuterWidth(this.container);
        var height = DomHandler.getOuterHeight(this.container);
        var viewport = DomHandler.getViewport();
        return (targetLeft + width > viewport.width) || (targetLeft < 0) || (targetTop < 0) || (targetTop + height > viewport.height);
    };
    Tooltip.prototype.onWindowResize = function (e) {
        this.hide();
    };
    Tooltip.prototype.bindDocumentResizeListener = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            _this.resizeListener = _this.onWindowResize.bind(_this);
            window.addEventListener('resize', _this.resizeListener);
        });
    };
    Tooltip.prototype.unbindDocumentResizeListener = function () {
        if (this.resizeListener) {
            window.removeEventListener('resize', this.resizeListener);
            this.resizeListener = null;
        }
    };
    Tooltip.prototype.unbindEvents = function () {
        if (this.tooltipEvent === 'hover') {
            this.el.nativeElement.removeEventListener('mouseenter', this.mouseEnterListener);
            this.el.nativeElement.removeEventListener('mouseleave', this.mouseLeaveListener);
            this.el.nativeElement.removeEventListener('click', this.clickListener);
        }
        else if (this.tooltipEvent === 'focus') {
            this.el.nativeElement.removeEventListener('focus', this.focusListener);
            this.el.nativeElement.removeEventListener('blur', this.blurListener);
        }
        this.unbindDocumentResizeListener();
    };
    Tooltip.prototype.remove = function () {
        if (this.container && this.container.parentElement) {
            if (this.appendTo === 'body')
                document.body.removeChild(this.container);
            else if (this.appendTo === 'target')
                this.el.nativeElement.removeChild(this.container);
            else
                DomHandler.removeChild(this.container, this.appendTo);
        }
        this.unbindDocumentResizeListener();
        this.clearTimeouts();
        this.container = null;
    };
    Tooltip.prototype.clearShowTimeout = function () {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        }
    };
    Tooltip.prototype.clearHideTimeout = function () {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }
    };
    Tooltip.prototype.clearTimeouts = function () {
        this.clearShowTimeout();
        this.clearHideTimeout();
    };
    Tooltip.prototype.ngOnDestroy = function () {
        this.unbindEvents();
        this.remove();
    };
    Tooltip.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    __decorate([
        Input()
    ], Tooltip.prototype, "tooltipPosition", void 0);
    __decorate([
        Input()
    ], Tooltip.prototype, "tooltipEvent", void 0);
    __decorate([
        Input()
    ], Tooltip.prototype, "appendTo", void 0);
    __decorate([
        Input()
    ], Tooltip.prototype, "positionStyle", void 0);
    __decorate([
        Input()
    ], Tooltip.prototype, "tooltipStyleClass", void 0);
    __decorate([
        Input()
    ], Tooltip.prototype, "tooltipZIndex", void 0);
    __decorate([
        Input("tooltipDisabled")
    ], Tooltip.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Tooltip.prototype, "escape", void 0);
    __decorate([
        Input()
    ], Tooltip.prototype, "showDelay", void 0);
    __decorate([
        Input()
    ], Tooltip.prototype, "hideDelay", void 0);
    __decorate([
        Input()
    ], Tooltip.prototype, "life", void 0);
    __decorate([
        Input('pTooltip')
    ], Tooltip.prototype, "text", null);
    Tooltip = __decorate([
        Directive({
            selector: '[pTooltip]'
        })
    ], Tooltip);
    return Tooltip;
}());
var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Tooltip],
            declarations: [Tooltip]
        })
    ], TooltipModule);
    return TooltipModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { Tooltip, TooltipModule };
//# sourceMappingURL=primeng-tooltip.js.map
