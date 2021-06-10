(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/scrollpanel', ['exports', '@angular/core', '@angular/common', 'primeng/dom'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.scrollpanel = {}), global.ng.core, global.ng.common, global.primeng.dom));
}(this, (function (exports, core, common, dom) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var ScrollPanel = /** @class */ (function () {
        function ScrollPanel(el, zone) {
            this.el = el;
            this.zone = zone;
            this.timeoutFrame = function (fn) { return setTimeout(fn, 0); };
        }
        ScrollPanel.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.zone.runOutsideAngular(function () {
                _this.moveBar();
                _this.moveBar = _this.moveBar.bind(_this);
                _this.onXBarMouseDown = _this.onXBarMouseDown.bind(_this);
                _this.onYBarMouseDown = _this.onYBarMouseDown.bind(_this);
                _this.onDocumentMouseMove = _this.onDocumentMouseMove.bind(_this);
                _this.onDocumentMouseUp = _this.onDocumentMouseUp.bind(_this);
                window.addEventListener('resize', _this.moveBar);
                _this.contentViewChild.nativeElement.addEventListener('scroll', _this.moveBar);
                _this.contentViewChild.nativeElement.addEventListener('mouseenter', _this.moveBar);
                _this.xBarViewChild.nativeElement.addEventListener('mousedown', _this.onXBarMouseDown);
                _this.yBarViewChild.nativeElement.addEventListener('mousedown', _this.onYBarMouseDown);
                _this.calculateContainerHeight();
                _this.initialized = true;
            });
        };
        ScrollPanel.prototype.calculateContainerHeight = function () {
            var container = this.containerViewChild.nativeElement;
            var content = this.contentViewChild.nativeElement;
            var xBar = this.xBarViewChild.nativeElement;
            var containerStyles = getComputedStyle(container), xBarStyles = getComputedStyle(xBar), pureContainerHeight = dom.DomHandler.getHeight(container) - parseInt(xBarStyles['height'], 10);
            if (containerStyles['max-height'] != "none" && pureContainerHeight == 0) {
                if (content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                    container.style.height = containerStyles['max-height'];
                }
                else {
                    container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + "px";
                }
            }
        };
        ScrollPanel.prototype.moveBar = function () {
            var _this = this;
            var container = this.containerViewChild.nativeElement;
            var content = this.contentViewChild.nativeElement;
            /* horizontal scroll */
            var xBar = this.xBarViewChild.nativeElement;
            var totalWidth = content.scrollWidth;
            var ownWidth = content.clientWidth;
            var bottom = (container.clientHeight - xBar.clientHeight) * -1;
            this.scrollXRatio = ownWidth / totalWidth;
            /* vertical scroll */
            var yBar = this.yBarViewChild.nativeElement;
            var totalHeight = content.scrollHeight;
            var ownHeight = content.clientHeight;
            var right = (container.clientWidth - yBar.clientWidth) * -1;
            this.scrollYRatio = ownHeight / totalHeight;
            this.requestAnimationFrame(function () {
                if (_this.scrollXRatio >= 1) {
                    dom.DomHandler.addClass(xBar, 'ui-scrollpanel-hidden');
                }
                else {
                    dom.DomHandler.removeClass(xBar, 'ui-scrollpanel-hidden');
                    xBar.style.cssText = 'width:' + Math.max(_this.scrollXRatio * 100, 10) + '%; left:' + (content.scrollLeft / totalWidth) * 100 + '%;bottom:' + bottom + 'px;';
                }
                if (_this.scrollYRatio >= 1) {
                    dom.DomHandler.addClass(yBar, 'ui-scrollpanel-hidden');
                }
                else {
                    dom.DomHandler.removeClass(yBar, 'ui-scrollpanel-hidden');
                    yBar.style.cssText = 'height:' + Math.max(_this.scrollYRatio * 100, 10) + '%; top: calc(' + (content.scrollTop / totalHeight) * 100 + '% - ' + xBar.clientHeight + 'px);right:' + right + 'px;';
                }
            });
        };
        ScrollPanel.prototype.onYBarMouseDown = function (e) {
            this.isYBarClicked = true;
            this.lastPageY = e.pageY;
            dom.DomHandler.addClass(this.yBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
            dom.DomHandler.addClass(document.body, 'ui-scrollpanel-grabbed');
            document.addEventListener('mousemove', this.onDocumentMouseMove);
            document.addEventListener('mouseup', this.onDocumentMouseUp);
            e.preventDefault();
        };
        ScrollPanel.prototype.onXBarMouseDown = function (e) {
            this.isXBarClicked = true;
            this.lastPageX = e.pageX;
            dom.DomHandler.addClass(this.xBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
            dom.DomHandler.addClass(document.body, 'ui-scrollpanel-grabbed');
            document.addEventListener('mousemove', this.onDocumentMouseMove);
            document.addEventListener('mouseup', this.onDocumentMouseUp);
            e.preventDefault();
        };
        ScrollPanel.prototype.onDocumentMouseMove = function (e) {
            if (this.isXBarClicked) {
                this.onMouseMoveForXBar(e);
            }
            else if (this.isYBarClicked) {
                this.onMouseMoveForYBar(e);
            }
            else {
                this.onMouseMoveForXBar(e);
                this.onMouseMoveForYBar(e);
            }
        };
        ScrollPanel.prototype.onMouseMoveForXBar = function (e) {
            var _this = this;
            var deltaX = e.pageX - this.lastPageX;
            this.lastPageX = e.pageX;
            this.requestAnimationFrame(function () {
                _this.contentViewChild.nativeElement.scrollLeft += deltaX / _this.scrollXRatio;
            });
        };
        ScrollPanel.prototype.onMouseMoveForYBar = function (e) {
            var _this = this;
            var deltaY = e.pageY - this.lastPageY;
            this.lastPageY = e.pageY;
            this.requestAnimationFrame(function () {
                _this.contentViewChild.nativeElement.scrollTop += deltaY / _this.scrollYRatio;
            });
        };
        ScrollPanel.prototype.scrollTop = function (scrollTop) {
            var scrollableHeight = this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight;
            scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
            this.contentViewChild.nativeElement.scrollTop = scrollTop;
        };
        ScrollPanel.prototype.onDocumentMouseUp = function (e) {
            dom.DomHandler.removeClass(this.yBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
            dom.DomHandler.removeClass(this.xBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
            dom.DomHandler.removeClass(document.body, 'ui-scrollpanel-grabbed');
            document.removeEventListener('mousemove', this.onDocumentMouseMove);
            document.removeEventListener('mouseup', this.onDocumentMouseUp);
            this.isXBarClicked = false;
            this.isYBarClicked = false;
        };
        ScrollPanel.prototype.requestAnimationFrame = function (f) {
            var frame = window.requestAnimationFrame || this.timeoutFrame;
            frame(f);
        };
        ScrollPanel.prototype.ngOnDestroy = function () {
            if (this.initialized) {
                window.removeEventListener('resize', this.moveBar);
                this.contentViewChild.nativeElement.removeEventListener('scroll', this.moveBar);
                this.contentViewChild.nativeElement.removeEventListener('mouseenter', this.moveBar);
                this.xBarViewChild.nativeElement.removeEventListener('mousedown', this.onXBarMouseDown);
                this.yBarViewChild.nativeElement.removeEventListener('mousedown', this.onYBarMouseDown);
            }
        };
        ScrollPanel.prototype.refresh = function () {
            this.moveBar();
        };
        ScrollPanel.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        __decorate([
            core.Input()
        ], ScrollPanel.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], ScrollPanel.prototype, "styleClass", void 0);
        __decorate([
            core.ViewChild('container', { static: true })
        ], ScrollPanel.prototype, "containerViewChild", void 0);
        __decorate([
            core.ViewChild('content', { static: true })
        ], ScrollPanel.prototype, "contentViewChild", void 0);
        __decorate([
            core.ViewChild('xBar', { static: true })
        ], ScrollPanel.prototype, "xBarViewChild", void 0);
        __decorate([
            core.ViewChild('yBar', { static: true })
        ], ScrollPanel.prototype, "yBarViewChild", void 0);
        ScrollPanel = __decorate([
            core.Component({
                selector: 'p-scrollPanel',
                template: "\n        <div #container [ngClass]=\"'ui-scrollpanel ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-scrollpanel-wrapper\">\n                <div #content class=\"ui-scrollpanel-content\">\n                    <ng-content></ng-content>\n                </div>\n            </div>\n            <div #xBar class=\"ui-scrollpanel-bar ui-scrollpanel-bar-x\"></div>\n            <div #yBar class=\"ui-scrollpanel-bar ui-scrollpanel-bar-y\"></div>   \n        </div>\n    "
            })
        ], ScrollPanel);
        return ScrollPanel;
    }());
    var ScrollPanelModule = /** @class */ (function () {
        function ScrollPanelModule() {
        }
        ScrollPanelModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [ScrollPanel],
                declarations: [ScrollPanel]
            })
        ], ScrollPanelModule);
        return ScrollPanelModule;
    }());

    exports.ScrollPanel = ScrollPanel;
    exports.ScrollPanelModule = ScrollPanelModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-scrollpanel.umd.js.map
