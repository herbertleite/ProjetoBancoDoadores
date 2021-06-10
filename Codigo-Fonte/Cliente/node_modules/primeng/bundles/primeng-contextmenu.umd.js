(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/dom'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('primeng/contextmenu', ['exports', '@angular/core', '@angular/common', 'primeng/dom', '@angular/router'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.contextmenu = {}), global.ng.core, global.ng.common, global.primeng.dom, global.ng.router));
}(this, (function (exports, core, common, dom, router) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var ContextMenuSub = /** @class */ (function () {
        function ContextMenuSub(contextMenu) {
            this.contextMenu = contextMenu;
        }
        Object.defineProperty(ContextMenuSub.prototype, "parentActive", {
            get: function () {
                return this._parentActive;
            },
            set: function (value) {
                this._parentActive = value;
                if (!value) {
                    this.activeItem = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        ContextMenuSub.prototype.onItemMouseEnter = function (event, item, menuitem) {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
            this.activeItem = item;
            if (menuitem.disabled) {
                return;
            }
            var nextElement = item.children[0].nextElementSibling;
            if (nextElement) {
                var sublist = nextElement.children[0];
                sublist.style.zIndex = ++dom.DomHandler.zindex;
                this.position(sublist, item);
            }
        };
        ContextMenuSub.prototype.itemClick = function (event, item) {
            if (item.disabled) {
                event.preventDefault();
                return;
            }
            if (!item.url) {
                event.preventDefault();
            }
            if (item.command) {
                item.command({
                    originalEvent: event,
                    item: item
                });
            }
        };
        ContextMenuSub.prototype.listClick = function (event) {
            this.activeItem = null;
        };
        ContextMenuSub.prototype.position = function (sublist, item) {
            this.containerOffset = dom.DomHandler.getOffset(item.parentElement);
            var viewport = dom.DomHandler.getViewport();
            var sublistWidth = sublist.offsetParent ? sublist.offsetWidth : dom.DomHandler.getHiddenElementOuterWidth(sublist);
            var itemOuterWidth = dom.DomHandler.getOuterWidth(item.children[0]);
            var itemOuterHeight = dom.DomHandler.getOuterHeight(item.children[0]);
            var sublistHeight = sublist.offsetHeight ? sublist.offsetHeight : dom.DomHandler.getHiddenElementOuterHeight(sublist);
            if ((parseInt(this.containerOffset.top) + itemOuterHeight + sublistHeight) > (viewport.height - dom.DomHandler.calculateScrollbarHeight())) {
                sublist.style.bottom = '0px';
            }
            else {
                sublist.style.top = '0px';
            }
            if ((parseInt(this.containerOffset.left) + itemOuterWidth + sublistWidth) > (viewport.width - dom.DomHandler.calculateScrollbarWidth())) {
                sublist.style.left = -sublistWidth + 'px';
            }
            else {
                sublist.style.left = itemOuterWidth + 'px';
            }
        };
        ContextMenuSub.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return ContextMenu; }),] }] }
        ]; };
        __decorate([
            core.Input()
        ], ContextMenuSub.prototype, "item", void 0);
        __decorate([
            core.Input()
        ], ContextMenuSub.prototype, "root", void 0);
        __decorate([
            core.Input()
        ], ContextMenuSub.prototype, "parentActive", null);
        ContextMenuSub = __decorate([
            core.Component({
                selector: 'p-contextMenuSub',
                template: "\n        <ul [ngClass]=\"{'ui-widget-content ui-corner-all ui-submenu-list ui-shadow':!root}\" class=\"ui-menu-list\" (click)=\"listClick($event)\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': child.visible === false}\" role=\"separator\">\n                <li *ngIf=\"!child.separator\" #item [ngClass]=\"{'ui-menuitem ui-corner-all':true,'ui-menuitem-active':item==activeItem,'ui-helper-hidden': child.visible === false}\"\n                    (mouseenter)=\"onItemMouseEnter($event,item,child)\" role=\"none\">\n                    <a *ngIf=\"!child.routerLink\" [href]=\"child.url||'#'\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.tabindex ? child.tabindex : '0'\" (click)=\"itemClick($event, child)\"\n                        [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\"\n                        [attr.aria-haspopup]=\"item.items != null\" [attr.aria-expanded]=\"item === activeItem\">\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-state-active'\" role=\"menuitem\"\n                        [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.tabindex ? child.tabindex : '0'\"\n                        (click)=\"itemClick($event, child)\" [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}\"\n                        [ngStyle]=\"child.style\" [class]=\"child.styleClass\">\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                    </a>\n                    <p-contextMenuSub class=\"ui-submenu\" [parentActive]=\"item==activeItem\" [item]=\"child\" *ngIf=\"child.items\"></p-contextMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    "
            }),
            __param(0, core.Inject(core.forwardRef(function () { return ContextMenu; })))
        ], ContextMenuSub);
        return ContextMenuSub;
    }());
    var ContextMenu = /** @class */ (function () {
        function ContextMenu(el, renderer, zone) {
            this.el = el;
            this.renderer = renderer;
            this.zone = zone;
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.triggerEvent = 'contextmenu';
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
        }
        ContextMenu.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (this.global) {
                this.triggerEventListener = this.renderer.listen('document', this.triggerEvent, function (event) {
                    _this.show(event);
                    event.preventDefault();
                });
            }
            else if (this.target) {
                this.triggerEventListener = this.renderer.listen(this.target, this.triggerEvent, function (event) {
                    _this.show(event);
                    event.preventDefault();
                    event.stopPropagation();
                });
            }
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.containerViewChild.nativeElement);
                else
                    dom.DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
            }
        };
        ContextMenu.prototype.show = function (event) {
            this.position(event);
            this.moveOnTop();
            this.containerViewChild.nativeElement.style.display = 'block';
            this.parentActive = true;
            dom.DomHandler.fadeIn(this.containerViewChild.nativeElement, 250);
            this.bindGlobalListeners();
            if (event) {
                event.preventDefault();
            }
            this.onShow.emit();
        };
        ContextMenu.prototype.hide = function () {
            this.containerViewChild.nativeElement.style.display = 'none';
            this.parentActive = false;
            this.unbindGlobalListeners();
            this.onHide.emit();
        };
        ContextMenu.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
        };
        ContextMenu.prototype.toggle = function (event) {
            if (this.containerViewChild.nativeElement.offsetParent)
                this.hide();
            else
                this.show(event);
        };
        ContextMenu.prototype.position = function (event) {
            if (event) {
                var left = event.pageX + 1;
                var top_1 = event.pageY + 1;
                var width = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetWidth : dom.DomHandler.getHiddenElementOuterWidth(this.containerViewChild.nativeElement);
                var height = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetHeight : dom.DomHandler.getHiddenElementOuterHeight(this.containerViewChild.nativeElement);
                var viewport = dom.DomHandler.getViewport();
                //flip
                if (left + width - document.body.scrollLeft > viewport.width) {
                    left -= width;
                }
                //flip
                if (top_1 + height - document.body.scrollTop > viewport.height) {
                    top_1 -= height;
                }
                //fit
                if (left < document.body.scrollLeft) {
                    left = document.body.scrollLeft;
                }
                //fit
                if (top_1 < document.body.scrollTop) {
                    top_1 = document.body.scrollTop;
                }
                this.containerViewChild.nativeElement.style.left = left + 'px';
                this.containerViewChild.nativeElement.style.top = top_1 + 'px';
            }
        };
        ContextMenu.prototype.bindGlobalListeners = function () {
            var _this = this;
            if (!this.documentClickListener) {
                this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
                    if (_this.containerViewChild.nativeElement.offsetParent && event.button !== 2) {
                        _this.hide();
                    }
                });
            }
            this.zone.runOutsideAngular(function () {
                if (!_this.windowResizeListener) {
                    _this.windowResizeListener = _this.onWindowResize.bind(_this);
                    window.addEventListener('resize', _this.windowResizeListener);
                }
            });
        };
        ContextMenu.prototype.unbindGlobalListeners = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
            if (this.windowResizeListener) {
                window.removeEventListener('resize', this.windowResizeListener);
                this.windowResizeListener = null;
            }
        };
        ContextMenu.prototype.onWindowResize = function (event) {
            if (this.containerViewChild.nativeElement.offsetParent) {
                this.hide();
            }
        };
        ContextMenu.prototype.ngOnDestroy = function () {
            this.unbindGlobalListeners();
            if (this.triggerEventListener) {
                this.triggerEventListener();
            }
            if (this.appendTo) {
                this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
            }
        };
        ContextMenu.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.NgZone }
        ]; };
        __decorate([
            core.Input()
        ], ContextMenu.prototype, "model", void 0);
        __decorate([
            core.Input()
        ], ContextMenu.prototype, "global", void 0);
        __decorate([
            core.Input()
        ], ContextMenu.prototype, "target", void 0);
        __decorate([
            core.Input()
        ], ContextMenu.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], ContextMenu.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], ContextMenu.prototype, "appendTo", void 0);
        __decorate([
            core.Input()
        ], ContextMenu.prototype, "autoZIndex", void 0);
        __decorate([
            core.Input()
        ], ContextMenu.prototype, "baseZIndex", void 0);
        __decorate([
            core.Input()
        ], ContextMenu.prototype, "triggerEvent", void 0);
        __decorate([
            core.Output()
        ], ContextMenu.prototype, "onShow", void 0);
        __decorate([
            core.Output()
        ], ContextMenu.prototype, "onHide", void 0);
        __decorate([
            core.ViewChild('container', { static: true })
        ], ContextMenu.prototype, "containerViewChild", void 0);
        ContextMenu = __decorate([
            core.Component({
                selector: 'p-contextMenu',
                template: "\n        <div #container [ngClass]=\"'ui-contextmenu ui-widget ui-widget-content ui-corner-all ui-shadow'\"\n            [class]=\"styleClass\" [ngStyle]=\"style\">\n            <p-contextMenuSub [item]=\"model\" [parentActive]=\"parentActive\" root=\"root\"></p-contextMenuSub>\n        </div>\n    "
            })
        ], ContextMenu);
        return ContextMenu;
    }());
    var ContextMenuModule = /** @class */ (function () {
        function ContextMenuModule() {
        }
        ContextMenuModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, router.RouterModule],
                exports: [ContextMenu, router.RouterModule],
                declarations: [ContextMenu, ContextMenuSub]
            })
        ], ContextMenuModule);
        return ContextMenuModule;
    }());

    exports.ContextMenu = ContextMenu;
    exports.ContextMenuModule = ContextMenuModule;
    exports.ContextMenuSub = ContextMenuSub;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-contextmenu.umd.js.map
