(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/button'), require('primeng/api'), require('primeng/dom'), require('primeng/utils')) :
    typeof define === 'function' && define.amd ? define('primeng/orderlist', ['exports', '@angular/core', '@angular/common', 'primeng/button', 'primeng/api', 'primeng/dom', 'primeng/utils'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.orderlist = {}), global.ng.core, global.ng.common, global.primeng.button, global.primeng.api, global.primeng.dom, global.primeng.utils));
}(this, (function (exports, core, common, button, api, dom, utils) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __read = (this && this.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (this && this.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    var OrderList = /** @class */ (function () {
        function OrderList(el) {
            this.el = el;
            this.metaKeySelection = true;
            this.controlsPosition = 'left';
            this.filterMatchMode = "contains";
            this.selectionChange = new core.EventEmitter();
            this.trackBy = function (index, item) { return item; };
            this.onReorder = new core.EventEmitter();
            this.onSelectionChange = new core.EventEmitter();
            this.onFilterEvent = new core.EventEmitter();
        }
        Object.defineProperty(OrderList.prototype, "selection", {
            get: function () {
                return this._selection;
            },
            set: function (val) {
                this._selection = val;
            },
            enumerable: true,
            configurable: true
        });
        OrderList.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        OrderList.prototype.ngAfterViewChecked = function () {
            if (this.movedUp || this.movedDown) {
                var listItems = dom.DomHandler.find(this.listViewChild.nativeElement, 'li.ui-state-highlight');
                var listItem = void 0;
                if (listItems.length > 0) {
                    if (this.movedUp)
                        listItem = listItems[0];
                    else
                        listItem = listItems[listItems.length - 1];
                    dom.DomHandler.scrollInView(this.listViewChild.nativeElement, listItem);
                }
                this.movedUp = false;
                this.movedDown = false;
            }
        };
        Object.defineProperty(OrderList.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
                this._value = val;
                if (this.filterValue) {
                    this.filter();
                }
            },
            enumerable: true,
            configurable: true
        });
        OrderList.prototype.onItemClick = function (event, item, index) {
            this.itemTouched = false;
            var selectedIndex = utils.ObjectUtils.findIndexInList(item, this.selection);
            var selected = (selectedIndex != -1);
            var metaSelection = this.itemTouched ? false : this.metaKeySelection;
            if (metaSelection) {
                var metaKey = (event.metaKey || event.ctrlKey || event.shiftKey);
                if (selected && metaKey) {
                    this._selection = this._selection.filter(function (val, index) { return index !== selectedIndex; });
                }
                else {
                    this._selection = (metaKey) ? this._selection ? __spread(this._selection) : [] : [];
                    utils.ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);
                }
            }
            else {
                if (selected) {
                    this._selection = this._selection.filter(function (val, index) { return index !== selectedIndex; });
                }
                else {
                    this._selection = this._selection ? __spread(this._selection) : [];
                    utils.ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);
                }
            }
            //binding
            this.selectionChange.emit(this._selection);
            //event
            this.onSelectionChange.emit({ originalEvent: event, value: this._selection });
        };
        OrderList.prototype.onFilterKeyup = function (event) {
            this.filterValue = event.target.value.trim().toLowerCase();
            this.filter();
            this.onFilterEvent.emit({
                originalEvent: event,
                value: this.visibleOptions
            });
        };
        OrderList.prototype.filter = function () {
            var searchFields = this.filterBy.split(',');
            this.visibleOptions = utils.FilterUtils.filter(this.value, searchFields, this.filterValue, this.filterMatchMode);
        };
        OrderList.prototype.isItemVisible = function (item) {
            if (this.filterValue && this.filterValue.trim().length) {
                for (var i = 0; i < this.visibleOptions.length; i++) {
                    if (item == this.visibleOptions[i]) {
                        return true;
                    }
                }
            }
            else {
                return true;
            }
        };
        OrderList.prototype.onItemTouchEnd = function (event) {
            this.itemTouched = true;
        };
        OrderList.prototype.isSelected = function (item) {
            return utils.ObjectUtils.findIndexInList(item, this.selection) != -1;
        };
        OrderList.prototype.moveUp = function (event) {
            if (this.selection) {
                for (var i = 0; i < this.selection.length; i++) {
                    var selectedItem = this.selection[i];
                    var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, this.value);
                    if (selectedItemIndex != 0) {
                        var movedItem = this.value[selectedItemIndex];
                        var temp = this.value[selectedItemIndex - 1];
                        this.value[selectedItemIndex - 1] = movedItem;
                        this.value[selectedItemIndex] = temp;
                    }
                    else {
                        break;
                    }
                }
                this.movedUp = true;
                this.onReorder.emit(event);
            }
        };
        OrderList.prototype.moveTop = function (event) {
            if (this.selection) {
                for (var i = this.selection.length - 1; i >= 0; i--) {
                    var selectedItem = this.selection[i];
                    var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, this.value);
                    if (selectedItemIndex != 0) {
                        var movedItem = this.value.splice(selectedItemIndex, 1)[0];
                        this.value.unshift(movedItem);
                    }
                    else {
                        break;
                    }
                }
                this.onReorder.emit(event);
                this.listViewChild.nativeElement.scrollTop = 0;
            }
        };
        OrderList.prototype.moveDown = function (event) {
            if (this.selection) {
                for (var i = this.selection.length - 1; i >= 0; i--) {
                    var selectedItem = this.selection[i];
                    var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, this.value);
                    if (selectedItemIndex != (this.value.length - 1)) {
                        var movedItem = this.value[selectedItemIndex];
                        var temp = this.value[selectedItemIndex + 1];
                        this.value[selectedItemIndex + 1] = movedItem;
                        this.value[selectedItemIndex] = temp;
                    }
                    else {
                        break;
                    }
                }
                this.movedDown = true;
                this.onReorder.emit(event);
            }
        };
        OrderList.prototype.moveBottom = function (event) {
            if (this.selection) {
                for (var i = 0; i < this.selection.length; i++) {
                    var selectedItem = this.selection[i];
                    var selectedItemIndex = utils.ObjectUtils.findIndexInList(selectedItem, this.value);
                    if (selectedItemIndex != (this.value.length - 1)) {
                        var movedItem = this.value.splice(selectedItemIndex, 1)[0];
                        this.value.push(movedItem);
                    }
                    else {
                        break;
                    }
                }
                this.onReorder.emit(event);
                this.listViewChild.nativeElement.scrollTop = this.listViewChild.nativeElement.scrollHeight;
            }
        };
        OrderList.prototype.onDragStart = function (event, index) {
            event.dataTransfer.setData('text', 'b'); // For firefox
            event.target.blur();
            this.dragging = true;
            this.draggedItemIndex = index;
        };
        OrderList.prototype.onDragOver = function (event, index) {
            if (this.dragging && this.draggedItemIndex !== index && this.draggedItemIndex + 1 !== index) {
                this.dragOverItemIndex = index;
                event.preventDefault();
            }
        };
        OrderList.prototype.onDragLeave = function (event) {
            this.dragOverItemIndex = null;
        };
        OrderList.prototype.onDrop = function (event, index) {
            var dropIndex = (this.draggedItemIndex > index) ? index : (index === 0) ? 0 : index - 1;
            utils.ObjectUtils.reorderArray(this.value, this.draggedItemIndex, dropIndex);
            this.dragOverItemIndex = null;
            this.onReorder.emit(event);
            event.preventDefault();
        };
        OrderList.prototype.onDragEnd = function (event) {
            this.dragging = false;
        };
        OrderList.prototype.onListMouseMove = function (event) {
            if (this.dragging) {
                var offsetY = this.listViewChild.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
                var bottomDiff = (offsetY + this.listViewChild.nativeElement.clientHeight) - event.pageY;
                var topDiff = (event.pageY - offsetY);
                if (bottomDiff < 25 && bottomDiff > 0)
                    this.listViewChild.nativeElement.scrollTop += 15;
                else if (topDiff < 25 && topDiff > 0)
                    this.listViewChild.nativeElement.scrollTop -= 15;
            }
        };
        OrderList.prototype.onItemKeydown = function (event, item, index) {
            var listItem = event.currentTarget;
            switch (event.which) {
                //down
                case 40:
                    var nextItem = this.findNextItem(listItem);
                    if (nextItem) {
                        nextItem.focus();
                    }
                    event.preventDefault();
                    break;
                //up
                case 38:
                    var prevItem = this.findPrevItem(listItem);
                    if (prevItem) {
                        prevItem.focus();
                    }
                    event.preventDefault();
                    break;
                //enter
                case 13:
                    this.onItemClick(event, item, index);
                    event.preventDefault();
                    break;
            }
        };
        OrderList.prototype.findNextItem = function (item) {
            var nextItem = item.nextElementSibling;
            if (nextItem)
                return !dom.DomHandler.hasClass(nextItem, 'ui-orderlist-item') || dom.DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
            else
                return null;
        };
        OrderList.prototype.findPrevItem = function (item) {
            var prevItem = item.previousElementSibling;
            if (prevItem)
                return !dom.DomHandler.hasClass(prevItem, 'ui-orderlist-item') || dom.DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
            else
                return null;
        };
        OrderList.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], OrderList.prototype, "header", void 0);
        __decorate([
            core.Input()
        ], OrderList.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], OrderList.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], OrderList.prototype, "listStyle", void 0);
        __decorate([
            core.Input()
        ], OrderList.prototype, "responsive", void 0);
        __decorate([
            core.Input()
        ], OrderList.prototype, "filterBy", void 0);
        __decorate([
            core.Input()
        ], OrderList.prototype, "filterPlaceholder", void 0);
        __decorate([
            core.Input()
        ], OrderList.prototype, "metaKeySelection", void 0);
        __decorate([
            core.Input()
        ], OrderList.prototype, "dragdrop", void 0);
        __decorate([
            core.Input()
        ], OrderList.prototype, "controlsPosition", void 0);
        __decorate([
            core.Input()
        ], OrderList.prototype, "ariaFilterLabel", void 0);
        __decorate([
            core.Input()
        ], OrderList.prototype, "filterMatchMode", void 0);
        __decorate([
            core.Output()
        ], OrderList.prototype, "selectionChange", void 0);
        __decorate([
            core.Input()
        ], OrderList.prototype, "trackBy", void 0);
        __decorate([
            core.Output()
        ], OrderList.prototype, "onReorder", void 0);
        __decorate([
            core.Output()
        ], OrderList.prototype, "onSelectionChange", void 0);
        __decorate([
            core.Output()
        ], OrderList.prototype, "onFilterEvent", void 0);
        __decorate([
            core.ViewChild('listelement', { static: true })
        ], OrderList.prototype, "listViewChild", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], OrderList.prototype, "templates", void 0);
        __decorate([
            core.Input()
        ], OrderList.prototype, "selection", null);
        __decorate([
            core.Input()
        ], OrderList.prototype, "value", null);
        OrderList = __decorate([
            core.Component({
                selector: 'p-orderList',
                template: "\n        <div [ngClass]=\"{'ui-orderlist ui-widget': true, 'ui-orderlist-controls-left': controlsPosition === 'left',\n                    'ui-orderlist-controls-right': controlsPosition === 'right'}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-orderlist-controls\">\n                <button type=\"button\" pButton icon=\"pi pi-angle-up\" (click)=\"moveUp($event)\"></button>\n                <button type=\"button\" pButton icon=\"pi pi-angle-double-up\" (click)=\"moveTop($event)\"></button>\n                <button type=\"button\" pButton icon=\"pi pi-angle-down\" (click)=\"moveDown($event)\"></button>\n                <button type=\"button\" pButton icon=\"pi pi-angle-double-down\" (click)=\"moveBottom($event)\"></button>\n            </div>\n            <div class=\"ui-orderlist-list-container\">\n                <div class=\"ui-orderlist-caption ui-widget-header ui-corner-top\" *ngIf=\"header\">{{header}}</div>\n                <div class=\"ui-orderlist-filter-container ui-widget-content\" *ngIf=\"filterBy\">\n                    <input type=\"text\" role=\"textbox\" (keyup)=\"onFilterKeyup($event)\" class=\"ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceholder\" [attr.aria-label]=\"ariaFilterLabel\">\n                    <span class=\"ui-orderlist-filter-icon pi pi-search\"></span>\n                </div>\n                <ul #listelement class=\"ui-widget-content ui-orderlist-list ui-corner-bottom\" [ngStyle]=\"listStyle\" (dragover)=\"onListMouseMove($event)\">\n                    <ng-template ngFor [ngForTrackBy]=\"trackBy\" let-item [ngForOf]=\"value\" let-i=\"index\" let-l=\"last\">\n                        <li class=\"ui-orderlist-droppoint\" *ngIf=\"dragdrop && isItemVisible(item)\" (dragover)=\"onDragOver($event, i)\" (drop)=\"onDrop($event, i)\" (dragleave)=\"onDragLeave($event)\" \n                            [ngClass]=\"{'ui-orderlist-droppoint-highlight': (i === dragOverItemIndex)}\"></li>\n                        <li class=\"ui-orderlist-item\" tabindex=\"0\"\n                            [ngClass]=\"{'ui-state-highlight':isSelected(item)}\" \n                            (click)=\"onItemClick($event,item,i)\" (touchend)=\"onItemTouchEnd($event)\" (keydown)=\"onItemKeydown($event,item,i)\"\n                            [style.display]=\"isItemVisible(item) ? 'block' : 'none'\" role=\"option\" [attr.aria-selected]=\"isSelected(item)\"\n                            [draggable]=\"dragdrop\" (dragstart)=\"onDragStart($event, i)\" (dragend)=\"onDragEnd($event)\">\n                            <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item, index: i}\"></ng-container>\n                        </li>\n                        <li class=\"ui-orderlist-droppoint\" *ngIf=\"dragdrop && l\" (dragover)=\"onDragOver($event, i + 1)\" (drop)=\"onDrop($event, i + 1)\" (dragleave)=\"onDragLeave($event)\" \n                            [ngClass]=\"{'ui-orderlist-droppoint-highlight': (i + 1 === dragOverItemIndex)}\"></li>\n                    </ng-template>\n                </ul>\n            </div>\n        </div>\n    "
            })
        ], OrderList);
        return OrderList;
    }());
    var OrderListModule = /** @class */ (function () {
        function OrderListModule() {
        }
        OrderListModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, button.ButtonModule, api.SharedModule],
                exports: [OrderList, api.SharedModule],
                declarations: [OrderList]
            })
        ], OrderListModule);
        return OrderListModule;
    }());

    exports.OrderList = OrderList;
    exports.OrderListModule = OrderListModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-orderlist.umd.js.map
