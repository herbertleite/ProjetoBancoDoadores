(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/dom'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('primeng/slidemenu', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/dom', '@angular/router'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.slidemenu = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.dom, global.ng.router));
}(this, (function (exports, core, animations, common, dom, router) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var SlideMenuSub = /** @class */ (function () {
        function SlideMenuSub(slideMenu) {
            this.backLabel = 'Back';
            this.easing = 'ease-out';
            this.slideMenu = slideMenu;
        }
        SlideMenuSub.prototype.itemClick = function (event, item, listitem) {
            var _this = this;
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
            if (item.items && !this.slideMenu.animating) {
                this.slideMenu.left -= this.slideMenu.menuWidth;
                this.activeItem = listitem;
                this.slideMenu.animating = true;
                setTimeout(function () { return _this.slideMenu.animating = false; }, this.effectDuration);
            }
            if (!item.items && this.slideMenu.popup) {
                this.slideMenu.hide();
            }
        };
        SlideMenuSub.prototype.ngOnDestroy = function () {
            this.activeItem = null;
        };
        SlideMenuSub.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return SlideMenu; }),] }] }
        ]; };
        __decorate([
            core.Input()
        ], SlideMenuSub.prototype, "item", void 0);
        __decorate([
            core.Input()
        ], SlideMenuSub.prototype, "root", void 0);
        __decorate([
            core.Input()
        ], SlideMenuSub.prototype, "backLabel", void 0);
        __decorate([
            core.Input()
        ], SlideMenuSub.prototype, "menuWidth", void 0);
        __decorate([
            core.Input()
        ], SlideMenuSub.prototype, "effectDuration", void 0);
        __decorate([
            core.Input()
        ], SlideMenuSub.prototype, "easing", void 0);
        __decorate([
            core.Input()
        ], SlideMenuSub.prototype, "index", void 0);
        SlideMenuSub = __decorate([
            core.Component({
                selector: 'p-slideMenuSub',
                template: "\n        <ul [ngClass]=\"{'ui-slidemenu-rootlist':root, 'ui-submenu-list':!root, 'ui-active-submenu': (-slideMenu.left == (index * menuWidth))}\"\n            [style.width.px]=\"menuWidth\" [style.left.px]=\"root ? slideMenu.left : slideMenu.menuWidth\"\n            [style.transitionProperty]=\"root ? 'left' : 'none'\" [style.transitionDuration]=\"effectDuration + 'ms'\" [style.transitionTimingFunction]=\"easing\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #listitem [ngClass]=\"{'ui-menuitem ui-widget ui-corner-all':true,'ui-menuitem-active':listitem==activeItem,'ui-helper-hidden': child.visible === false}\"\n                    [class]=\"child.styleClass\" [ngStyle]=\"child.style\">\n                    <a *ngIf=\"!child.routerLink\" [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\"\n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" [attr.tabindex]=\"child.tabindex ? child.tabindex : '0'\" \n                        (click)=\"itemClick($event, child, listitem)\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-state-active'\" \n                        [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\" [href]=\"child.url||'#'\" class=\"ui-menuitem-link ui-corner-all\" \n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.tabindex ? child.tabindex : '0'\" \n                        [ngClass]=\"{'ui-state-disabled':child.disabled}\" \n                        (click)=\"itemClick($event, child, listitem)\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw pi-caret-right\" *ngIf=\"child.items\"></span>\n                    </a>\n                    <p-slideMenuSub class=\"ui-submenu\" [item]=\"child\" [index]=\"index + 1\" [menuWidth]=\"menuWidth\" *ngIf=\"child.items\"></p-slideMenuSub>\n                </li>\n            </ng-template>\n        </ul>\n    "
            }),
            __param(0, core.Inject(core.forwardRef(function () { return SlideMenu; })))
        ], SlideMenuSub);
        return SlideMenuSub;
    }());
    var SlideMenu = /** @class */ (function () {
        function SlideMenu(el, renderer) {
            this.el = el;
            this.renderer = renderer;
            this.menuWidth = 190;
            this.viewportHeight = 180;
            this.effectDuration = 250;
            this.easing = 'ease-out';
            this.backLabel = 'Back';
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.showTransitionOptions = '225ms ease-out';
            this.hideTransitionOptions = '195ms ease-in';
            this.onShow = new core.EventEmitter();
            this.onHide = new core.EventEmitter();
            this.left = 0;
            this.animating = false;
        }
        SlideMenu.prototype.ngAfterViewChecked = function () {
            if (!this.viewportUpdated && !this.popup && this.containerViewChild) {
                this.updateViewPort();
                this.viewportUpdated = true;
            }
        };
        Object.defineProperty(SlideMenu.prototype, "container", {
            set: function (element) {
                this.containerViewChild = element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SlideMenu.prototype, "backward", {
            set: function (element) {
                this.backwardViewChild = element;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SlideMenu.prototype, "slideMenuContent", {
            set: function (element) {
                this.slideMenuContentViewChild = element;
            },
            enumerable: true,
            configurable: true
        });
        SlideMenu.prototype.updateViewPort = function () {
            this.slideMenuContentViewChild.nativeElement.style.height = this.viewportHeight - dom.DomHandler.getHiddenElementOuterHeight(this.backwardViewChild.nativeElement) + 'px';
        };
        SlideMenu.prototype.toggle = function (event) {
            if (this.visible)
                this.hide();
            else
                this.show(event);
            this.preventDocumentDefault = true;
        };
        SlideMenu.prototype.show = function (event) {
            this.target = event.currentTarget;
            this.visible = true;
            this.preventDocumentDefault = true;
        };
        SlideMenu.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                    if (this.popup) {
                        this.updateViewPort();
                        this.moveOnTop();
                        this.onShow.emit({});
                        this.appendOverlay();
                        dom.DomHandler.absolutePosition(this.containerViewChild.nativeElement, this.target);
                        this.bindDocumentClickListener();
                        this.bindDocumentResizeListener();
                    }
                    break;
                case 'void':
                    this.onOverlayHide();
                    this.onHide.emit({});
                    break;
            }
        };
        SlideMenu.prototype.appendOverlay = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.containerViewChild.nativeElement);
                else
                    dom.DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
            }
        };
        SlideMenu.prototype.restoreOverlayAppend = function () {
            if (this.container && this.appendTo) {
                this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
            }
        };
        SlideMenu.prototype.moveOnTop = function () {
            if (this.autoZIndex) {
                this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
        };
        SlideMenu.prototype.hide = function () {
            this.visible = false;
        };
        SlideMenu.prototype.onWindowResize = function () {
            this.hide();
        };
        SlideMenu.prototype.onClick = function (event) {
            this.preventDocumentDefault = true;
        };
        SlideMenu.prototype.goBack = function () {
            this.left += this.menuWidth;
        };
        SlideMenu.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                this.documentClickListener = this.renderer.listen('document', 'click', function () {
                    if (!_this.preventDocumentDefault) {
                        _this.hide();
                    }
                    _this.preventDocumentDefault = false;
                });
            }
        };
        SlideMenu.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        SlideMenu.prototype.bindDocumentResizeListener = function () {
            this.documentResizeListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResizeListener);
        };
        SlideMenu.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        SlideMenu.prototype.onOverlayHide = function () {
            this.unbindDocumentClickListener();
            this.unbindDocumentResizeListener();
            this.preventDocumentDefault = false;
            this.target = null;
            this.left = 0;
        };
        SlideMenu.prototype.ngOnDestroy = function () {
            if (this.popup) {
                this.restoreOverlayAppend();
                this.onOverlayHide();
            }
        };
        SlideMenu.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 }
        ]; };
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "model", void 0);
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "popup", void 0);
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "menuWidth", void 0);
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "viewportHeight", void 0);
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "effectDuration", void 0);
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "easing", void 0);
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "backLabel", void 0);
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "appendTo", void 0);
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "autoZIndex", void 0);
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "baseZIndex", void 0);
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "showTransitionOptions", void 0);
        __decorate([
            core.Input()
        ], SlideMenu.prototype, "hideTransitionOptions", void 0);
        __decorate([
            core.Output()
        ], SlideMenu.prototype, "onShow", void 0);
        __decorate([
            core.Output()
        ], SlideMenu.prototype, "onHide", void 0);
        __decorate([
            core.ViewChild('container', { static: false })
        ], SlideMenu.prototype, "container", null);
        __decorate([
            core.ViewChild('backward', { static: false })
        ], SlideMenu.prototype, "backward", null);
        __decorate([
            core.ViewChild('slideMenuContent', { static: false })
        ], SlideMenu.prototype, "slideMenuContent", null);
        SlideMenu = __decorate([
            core.Component({
                selector: 'p-slideMenu',
                template: "\n        <div #container [ngClass]=\"{'ui-slidemenu ui-widget ui-widget-content ui-corner-all':true, 'ui-slidemenu-dynamic ui-shadow':popup}\" \n            [class]=\"styleClass\" [ngStyle]=\"style\" (click)=\"onClick($event)\"\n            [@overlayAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" [@.disabled]=\"popup !== true\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" *ngIf=\"!popup || visible\">\n            <div class=\"ui-slidemenu-wrapper\" [style.height]=\"left ? viewportHeight + 'px' : 'auto'\">\n                <div #slideMenuContent class=\"ui-slidemenu-content\">\n                    <p-slideMenuSub [item]=\"model\" root=\"root\" [index]=\"0\" [menuWidth]=\"menuWidth\" [effectDuration]=\"effectDuration\" [easing]=\"easing\"></p-slideMenuSub>\n                </div>\n                <div #backward class=\"ui-slidemenu-backward ui-widget-header ui-corner-all\" [style.display]=\"left ? 'block' : 'none'\" (click)=\"goBack()\">\n                    <span class=\"ui-slidemenu-backward-icon pi pi-fw pi-caret-left\"></span><span>{{backLabel}}</span>\n                </div>\n            </div>\n        </div>\n    ",
                animations: [
                    animations.trigger('overlayAnimation', [
                        animations.state('void', animations.style({
                            transform: 'translateY(5%)',
                            opacity: 0
                        })),
                        animations.state('visible', animations.style({
                            transform: 'translateY(0)',
                            opacity: 1
                        })),
                        animations.transition('void => visible', animations.animate('{{showTransitionParams}}')),
                        animations.transition('visible => void', animations.animate('{{hideTransitionParams}}'))
                    ])
                ]
            })
        ], SlideMenu);
        return SlideMenu;
    }());
    var SlideMenuModule = /** @class */ (function () {
        function SlideMenuModule() {
        }
        SlideMenuModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, router.RouterModule],
                exports: [SlideMenu, router.RouterModule],
                declarations: [SlideMenu, SlideMenuSub]
            })
        ], SlideMenuModule);
        return SlideMenuModule;
    }());

    exports.SlideMenu = SlideMenu;
    exports.SlideMenuModule = SlideMenuModule;
    exports.SlideMenuSub = SlideMenuSub;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-slidemenu.umd.js.map
