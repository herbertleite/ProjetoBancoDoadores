var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, AfterViewChecked, AfterContentInit, Input, Output, ContentChildren, QueryList, TemplateRef, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { FilterUtils } from 'primeng/utils';
let OrderList = class OrderList {
    constructor(el) {
        this.el = el;
        this.metaKeySelection = true;
        this.controlsPosition = 'left';
        this.filterMatchMode = "contains";
        this.selectionChange = new EventEmitter();
        this.trackBy = (index, item) => item;
        this.onReorder = new EventEmitter();
        this.onSelectionChange = new EventEmitter();
        this.onFilterEvent = new EventEmitter();
    }
    get selection() {
        return this._selection;
    }
    set selection(val) {
        this._selection = val;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewChecked() {
        if (this.movedUp || this.movedDown) {
            let listItems = DomHandler.find(this.listViewChild.nativeElement, 'li.ui-state-highlight');
            let listItem;
            if (listItems.length > 0) {
                if (this.movedUp)
                    listItem = listItems[0];
                else
                    listItem = listItems[listItems.length - 1];
                DomHandler.scrollInView(this.listViewChild.nativeElement, listItem);
            }
            this.movedUp = false;
            this.movedDown = false;
        }
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        if (this.filterValue) {
            this.filter();
        }
    }
    onItemClick(event, item, index) {
        this.itemTouched = false;
        let selectedIndex = ObjectUtils.findIndexInList(item, this.selection);
        let selected = (selectedIndex != -1);
        let metaSelection = this.itemTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey || event.shiftKey);
            if (selected && metaKey) {
                this._selection = this._selection.filter((val, index) => index !== selectedIndex);
            }
            else {
                this._selection = (metaKey) ? this._selection ? [...this._selection] : [] : [];
                ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);
            }
        }
        else {
            if (selected) {
                this._selection = this._selection.filter((val, index) => index !== selectedIndex);
            }
            else {
                this._selection = this._selection ? [...this._selection] : [];
                ObjectUtils.insertIntoOrderedArray(item, index, this._selection, this.value);
            }
        }
        //binding
        this.selectionChange.emit(this._selection);
        //event
        this.onSelectionChange.emit({ originalEvent: event, value: this._selection });
    }
    onFilterKeyup(event) {
        this.filterValue = event.target.value.trim().toLowerCase();
        this.filter();
        this.onFilterEvent.emit({
            originalEvent: event,
            value: this.visibleOptions
        });
    }
    filter() {
        let searchFields = this.filterBy.split(',');
        this.visibleOptions = FilterUtils.filter(this.value, searchFields, this.filterValue, this.filterMatchMode);
    }
    isItemVisible(item) {
        if (this.filterValue && this.filterValue.trim().length) {
            for (let i = 0; i < this.visibleOptions.length; i++) {
                if (item == this.visibleOptions[i]) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
    }
    onItemTouchEnd(event) {
        this.itemTouched = true;
    }
    isSelected(item) {
        return ObjectUtils.findIndexInList(item, this.selection) != -1;
    }
    moveUp(event) {
        if (this.selection) {
            for (let i = 0; i < this.selection.length; i++) {
                let selectedItem = this.selection[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != 0) {
                    let movedItem = this.value[selectedItemIndex];
                    let temp = this.value[selectedItemIndex - 1];
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
    }
    moveTop(event) {
        if (this.selection) {
            for (let i = this.selection.length - 1; i >= 0; i--) {
                let selectedItem = this.selection[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != 0) {
                    let movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.unshift(movedItem);
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
            this.listViewChild.nativeElement.scrollTop = 0;
        }
    }
    moveDown(event) {
        if (this.selection) {
            for (let i = this.selection.length - 1; i >= 0; i--) {
                let selectedItem = this.selection[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != (this.value.length - 1)) {
                    let movedItem = this.value[selectedItemIndex];
                    let temp = this.value[selectedItemIndex + 1];
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
    }
    moveBottom(event) {
        if (this.selection) {
            for (let i = 0; i < this.selection.length; i++) {
                let selectedItem = this.selection[i];
                let selectedItemIndex = ObjectUtils.findIndexInList(selectedItem, this.value);
                if (selectedItemIndex != (this.value.length - 1)) {
                    let movedItem = this.value.splice(selectedItemIndex, 1)[0];
                    this.value.push(movedItem);
                }
                else {
                    break;
                }
            }
            this.onReorder.emit(event);
            this.listViewChild.nativeElement.scrollTop = this.listViewChild.nativeElement.scrollHeight;
        }
    }
    onDragStart(event, index) {
        event.dataTransfer.setData('text', 'b'); // For firefox
        event.target.blur();
        this.dragging = true;
        this.draggedItemIndex = index;
    }
    onDragOver(event, index) {
        if (this.dragging && this.draggedItemIndex !== index && this.draggedItemIndex + 1 !== index) {
            this.dragOverItemIndex = index;
            event.preventDefault();
        }
    }
    onDragLeave(event) {
        this.dragOverItemIndex = null;
    }
    onDrop(event, index) {
        let dropIndex = (this.draggedItemIndex > index) ? index : (index === 0) ? 0 : index - 1;
        ObjectUtils.reorderArray(this.value, this.draggedItemIndex, dropIndex);
        this.dragOverItemIndex = null;
        this.onReorder.emit(event);
        event.preventDefault();
    }
    onDragEnd(event) {
        this.dragging = false;
    }
    onListMouseMove(event) {
        if (this.dragging) {
            let offsetY = this.listViewChild.nativeElement.getBoundingClientRect().top + document.body.scrollTop;
            let bottomDiff = (offsetY + this.listViewChild.nativeElement.clientHeight) - event.pageY;
            let topDiff = (event.pageY - offsetY);
            if (bottomDiff < 25 && bottomDiff > 0)
                this.listViewChild.nativeElement.scrollTop += 15;
            else if (topDiff < 25 && topDiff > 0)
                this.listViewChild.nativeElement.scrollTop -= 15;
        }
    }
    onItemKeydown(event, item, index) {
        let listItem = event.currentTarget;
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
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return !DomHandler.hasClass(nextItem, 'ui-orderlist-item') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return !DomHandler.hasClass(prevItem, 'ui-orderlist-item') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    }
};
OrderList.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], OrderList.prototype, "header", void 0);
__decorate([
    Input()
], OrderList.prototype, "style", void 0);
__decorate([
    Input()
], OrderList.prototype, "styleClass", void 0);
__decorate([
    Input()
], OrderList.prototype, "listStyle", void 0);
__decorate([
    Input()
], OrderList.prototype, "responsive", void 0);
__decorate([
    Input()
], OrderList.prototype, "filterBy", void 0);
__decorate([
    Input()
], OrderList.prototype, "filterPlaceholder", void 0);
__decorate([
    Input()
], OrderList.prototype, "metaKeySelection", void 0);
__decorate([
    Input()
], OrderList.prototype, "dragdrop", void 0);
__decorate([
    Input()
], OrderList.prototype, "controlsPosition", void 0);
__decorate([
    Input()
], OrderList.prototype, "ariaFilterLabel", void 0);
__decorate([
    Input()
], OrderList.prototype, "filterMatchMode", void 0);
__decorate([
    Output()
], OrderList.prototype, "selectionChange", void 0);
__decorate([
    Input()
], OrderList.prototype, "trackBy", void 0);
__decorate([
    Output()
], OrderList.prototype, "onReorder", void 0);
__decorate([
    Output()
], OrderList.prototype, "onSelectionChange", void 0);
__decorate([
    Output()
], OrderList.prototype, "onFilterEvent", void 0);
__decorate([
    ViewChild('listelement', { static: true })
], OrderList.prototype, "listViewChild", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], OrderList.prototype, "templates", void 0);
__decorate([
    Input()
], OrderList.prototype, "selection", null);
__decorate([
    Input()
], OrderList.prototype, "value", null);
OrderList = __decorate([
    Component({
        selector: 'p-orderList',
        template: `
        <div [ngClass]="{'ui-orderlist ui-widget': true, 'ui-orderlist-controls-left': controlsPosition === 'left',
                    'ui-orderlist-controls-right': controlsPosition === 'right'}" [ngStyle]="style" [class]="styleClass">
            <div class="ui-orderlist-controls">
                <button type="button" pButton icon="pi pi-angle-up" (click)="moveUp($event)"></button>
                <button type="button" pButton icon="pi pi-angle-double-up" (click)="moveTop($event)"></button>
                <button type="button" pButton icon="pi pi-angle-down" (click)="moveDown($event)"></button>
                <button type="button" pButton icon="pi pi-angle-double-down" (click)="moveBottom($event)"></button>
            </div>
            <div class="ui-orderlist-list-container">
                <div class="ui-orderlist-caption ui-widget-header ui-corner-top" *ngIf="header">{{header}}</div>
                <div class="ui-orderlist-filter-container ui-widget-content" *ngIf="filterBy">
                    <input type="text" role="textbox" (keyup)="onFilterKeyup($event)" class="ui-inputtext ui-widget ui-state-default ui-corner-all" [attr.placeholder]="filterPlaceholder" [attr.aria-label]="ariaFilterLabel">
                    <span class="ui-orderlist-filter-icon pi pi-search"></span>
                </div>
                <ul #listelement class="ui-widget-content ui-orderlist-list ui-corner-bottom" [ngStyle]="listStyle" (dragover)="onListMouseMove($event)">
                    <ng-template ngFor [ngForTrackBy]="trackBy" let-item [ngForOf]="value" let-i="index" let-l="last">
                        <li class="ui-orderlist-droppoint" *ngIf="dragdrop && isItemVisible(item)" (dragover)="onDragOver($event, i)" (drop)="onDrop($event, i)" (dragleave)="onDragLeave($event)" 
                            [ngClass]="{'ui-orderlist-droppoint-highlight': (i === dragOverItemIndex)}"></li>
                        <li class="ui-orderlist-item" tabindex="0"
                            [ngClass]="{'ui-state-highlight':isSelected(item)}" 
                            (click)="onItemClick($event,item,i)" (touchend)="onItemTouchEnd($event)" (keydown)="onItemKeydown($event,item,i)"
                            [style.display]="isItemVisible(item) ? 'block' : 'none'" role="option" [attr.aria-selected]="isSelected(item)"
                            [draggable]="dragdrop" (dragstart)="onDragStart($event, i)" (dragend)="onDragEnd($event)">
                            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                        </li>
                        <li class="ui-orderlist-droppoint" *ngIf="dragdrop && l" (dragover)="onDragOver($event, i + 1)" (drop)="onDrop($event, i + 1)" (dragleave)="onDragLeave($event)" 
                            [ngClass]="{'ui-orderlist-droppoint-highlight': (i + 1 === dragOverItemIndex)}"></li>
                    </ng-template>
                </ul>
            </div>
        </div>
    `
    })
], OrderList);
export { OrderList };
let OrderListModule = class OrderListModule {
};
OrderListModule = __decorate([
    NgModule({
        imports: [CommonModule, ButtonModule, SharedModule],
        exports: [OrderList, SharedModule],
        declarations: [OrderList]
    })
], OrderListModule);
export { OrderListModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJsaXN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9vcmRlcmxpc3QvIiwic291cmNlcyI6WyJvcmRlcmxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGdCQUFnQixFQUFDLGdCQUFnQixFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN4SyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBc0M1QyxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBOERsQixZQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQTlDeEIscUJBQWdCLEdBQVksSUFBSSxDQUFDO1FBSWpDLHFCQUFnQixHQUFXLE1BQU0sQ0FBQztRQUlsQyxvQkFBZSxHQUFXLFVBQVUsQ0FBQztRQUVwQyxvQkFBZSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXpELFlBQU8sR0FBYSxDQUFDLEtBQWEsRUFBRSxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQztRQUV0RCxjQUFTLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEQsc0JBQWlCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFMUQsa0JBQWEsR0FBc0IsSUFB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QUFDLFNBQVMsRUFBQyxZQUFZLENBQUM7UUFDakMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO0tBQzVCLENBQUM7R0FDVyxlQUFlLENBQUk7U0FBbkIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsQWZ0ZXJWaWV3Q2hlY2tlZCxBZnRlckNvbnRlbnRJbml0LElucHV0LE91dHB1dCxDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFRlbXBsYXRlUmVmLEV2ZW50RW1pdHRlcixWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0J1dHRvbk1vZHVsZX0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHtTaGFyZWRNb2R1bGUsUHJpbWVUZW1wbGF0ZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQge09iamVjdFV0aWxzfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7IEZpbHRlclV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1vcmRlckxpc3QnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1vcmRlcmxpc3QgdWktd2lkZ2V0JzogdHJ1ZSwgJ3VpLW9yZGVybGlzdC1jb250cm9scy1sZWZ0JzogY29udHJvbHNQb3NpdGlvbiA9PT0gJ2xlZnQnLFxuICAgICAgICAgICAgICAgICAgICAndWktb3JkZXJsaXN0LWNvbnRyb2xzLXJpZ2h0JzogY29udHJvbHNQb3NpdGlvbiA9PT0gJ3JpZ2h0J31cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktb3JkZXJsaXN0LWNvbnRyb2xzXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwicGkgcGktYW5nbGUtdXBcIiAoY2xpY2spPVwibW92ZVVwKCRldmVudClcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIGljb249XCJwaSBwaS1hbmdsZS1kb3VibGUtdXBcIiAoY2xpY2spPVwibW92ZVRvcCgkZXZlbnQpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwicGkgcGktYW5nbGUtZG93blwiIChjbGljayk9XCJtb3ZlRG93bigkZXZlbnQpXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBpY29uPVwicGkgcGktYW5nbGUtZG91YmxlLWRvd25cIiAoY2xpY2spPVwibW92ZUJvdHRvbSgkZXZlbnQpXCI+PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1vcmRlcmxpc3QtbGlzdC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktb3JkZXJsaXN0LWNhcHRpb24gdWktd2lkZ2V0LWhlYWRlciB1aS1jb3JuZXItdG9wXCIgKm5nSWY9XCJoZWFkZXJcIj57e2hlYWRlcn19PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLW9yZGVybGlzdC1maWx0ZXItY29udGFpbmVyIHVpLXdpZGdldC1jb250ZW50XCIgKm5nSWY9XCJmaWx0ZXJCeVwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiByb2xlPVwidGV4dGJveFwiIChrZXl1cCk9XCJvbkZpbHRlcktleXVwKCRldmVudClcIiBjbGFzcz1cInVpLWlucHV0dGV4dCB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwiZmlsdGVyUGxhY2Vob2xkZXJcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFGaWx0ZXJMYWJlbFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW9yZGVybGlzdC1maWx0ZXItaWNvbiBwaSBwaS1zZWFyY2hcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHVsICNsaXN0ZWxlbWVudCBjbGFzcz1cInVpLXdpZGdldC1jb250ZW50IHVpLW9yZGVybGlzdC1saXN0IHVpLWNvcm5lci1ib3R0b21cIiBbbmdTdHlsZV09XCJsaXN0U3R5bGVcIiAoZHJhZ292ZXIpPVwib25MaXN0TW91c2VNb3ZlKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIFtuZ0ZvclRyYWNrQnldPVwidHJhY2tCeVwiIGxldC1pdGVtIFtuZ0Zvck9mXT1cInZhbHVlXCIgbGV0LWk9XCJpbmRleFwiIGxldC1sPVwibGFzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwidWktb3JkZXJsaXN0LWRyb3Bwb2ludFwiICpuZ0lmPVwiZHJhZ2Ryb3AgJiYgaXNJdGVtVmlzaWJsZShpdGVtKVwiIChkcmFnb3Zlcik9XCJvbkRyYWdPdmVyKCRldmVudCwgaSlcIiAoZHJvcCk9XCJvbkRyb3AoJGV2ZW50LCBpKVwiIChkcmFnbGVhdmUpPVwib25EcmFnTGVhdmUoJGV2ZW50KVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktb3JkZXJsaXN0LWRyb3Bwb2ludC1oaWdobGlnaHQnOiAoaSA9PT0gZHJhZ092ZXJJdGVtSW5kZXgpfVwiPjwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1vcmRlcmxpc3QtaXRlbVwiIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1oaWdobGlnaHQnOmlzU2VsZWN0ZWQoaXRlbSl9XCIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCxpdGVtLGkpXCIgKHRvdWNoZW5kKT1cIm9uSXRlbVRvdWNoRW5kKCRldmVudClcIiAoa2V5ZG93bik9XCJvbkl0ZW1LZXlkb3duKCRldmVudCxpdGVtLGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGUuZGlzcGxheV09XCJpc0l0ZW1WaXNpYmxlKGl0ZW0pID8gJ2Jsb2NrJyA6ICdub25lJ1wiIHJvbGU9XCJvcHRpb25cIiBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cImlzU2VsZWN0ZWQoaXRlbSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtkcmFnZ2FibGVdPVwiZHJhZ2Ryb3BcIiAoZHJhZ3N0YXJ0KT1cIm9uRHJhZ1N0YXJ0KCRldmVudCwgaSlcIiAoZHJhZ2VuZCk9XCJvbkRyYWdFbmQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW0sIGluZGV4OiBpfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInVpLW9yZGVybGlzdC1kcm9wcG9pbnRcIiAqbmdJZj1cImRyYWdkcm9wICYmIGxcIiAoZHJhZ292ZXIpPVwib25EcmFnT3ZlcigkZXZlbnQsIGkgKyAxKVwiIChkcm9wKT1cIm9uRHJvcCgkZXZlbnQsIGkgKyAxKVwiIChkcmFnbGVhdmUpPVwib25EcmFnTGVhdmUoJGV2ZW50KVwiIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktb3JkZXJsaXN0LWRyb3Bwb2ludC1oaWdobGlnaHQnOiAoaSArIDEgPT09IGRyYWdPdmVySXRlbUluZGV4KX1cIj48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckxpc3QgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLEFmdGVyQ29udGVudEluaXQge1xuICAgIFxuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBsaXN0U3R5bGU6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSByZXNwb25zaXZlOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIGZpbHRlckJ5OiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgZmlsdGVyUGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBtZXRhS2V5U2VsZWN0aW9uOiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSBkcmFnZHJvcDogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBjb250cm9sc1Bvc2l0aW9uOiBzdHJpbmcgPSAnbGVmdCc7XG5cbiAgICBASW5wdXQoKSBhcmlhRmlsdGVyTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGZpbHRlck1hdGNoTW9kZTogc3RyaW5nID0gXCJjb250YWluc1wiO1xuXG4gICAgQE91dHB1dCgpIHNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBASW5wdXQoKSB0cmFja0J5OiBGdW5jdGlvbiA9IChpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IGl0ZW07XG4gICAgXG4gICAgQE91dHB1dCgpIG9uUmVvcmRlcjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uU2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAT3V0cHV0KCkgb25GaWx0ZXJFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQFZpZXdDaGlsZCgnbGlzdGVsZW1lbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBsaXN0Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuICAgIFxuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBRdWVyeUxpc3Q8YW55PjtcbiAgICBcbiAgICBwdWJsaWMgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgICAgICBcbiAgICBfc2VsZWN0aW9uOiBhbnlbXTtcbiAgICAgICAgXG4gICAgbW92ZWRVcDogYm9vbGVhbjtcbiAgICBcbiAgICBtb3ZlZERvd246IGJvb2xlYW47XG4gICAgICAgICAgICBcbiAgICBpdGVtVG91Y2hlZDogYm9vbGVhbjtcbiAgICBcbiAgICBkcmFnZ2VkSXRlbUluZGV4OiBudW1iZXI7XG4gICAgXG4gICAgZHJhZ092ZXJJdGVtSW5kZXg6IG51bWJlcjtcbiAgICBcbiAgICBkcmFnZ2luZzogYm9vbGVhbjtcbiAgICBcbiAgICBwdWJsaWMgZmlsdGVyVmFsdWU6IHN0cmluZztcbiAgICBcbiAgICBwdWJsaWMgdmlzaWJsZU9wdGlvbnM6IGFueVtdO1xuICAgIFxuICAgIHB1YmxpYyBfdmFsdWU6IGFueVtdO1xuICAgICAgICBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBnZXQgc2VsZWN0aW9uKCk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbjtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBzZXQgc2VsZWN0aW9uKHZhbDphbnlbXSkge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB2YWw7XG4gICAgfVxuICAgICAgICAgICAgIFxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAgICAgIFxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMubW92ZWRVcHx8dGhpcy5tb3ZlZERvd24pIHtcbiAgICAgICAgICAgIGxldCBsaXN0SXRlbXMgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5saXN0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICdsaS51aS1zdGF0ZS1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgIGxldCBsaXN0SXRlbTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGxpc3RJdGVtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubW92ZWRVcClcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0gPSBsaXN0SXRlbXNbMF07XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbSA9IGxpc3RJdGVtc1tsaXN0SXRlbXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5zY3JvbGxJblZpZXcodGhpcy5saXN0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsIGxpc3RJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubW92ZWRVcCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5tb3ZlZERvd24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBnZXQgdmFsdWUoKTogYW55W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KCkgc2V0IHZhbHVlKHZhbDphbnlbXSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbDtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgb25JdGVtQ2xpY2soZXZlbnQsIGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIHRoaXMuaXRlbVRvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IHNlbGVjdGVkSW5kZXggPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QoaXRlbSwgdGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSAoc2VsZWN0ZWRJbmRleCAhPSAtMSk7XG4gICAgICAgIGxldCBtZXRhU2VsZWN0aW9uID0gdGhpcy5pdGVtVG91Y2hlZCA/IGZhbHNlIDogdGhpcy5tZXRhS2V5U2VsZWN0aW9uO1xuICAgICAgICBcbiAgICAgICAgaWYgKG1ldGFTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKGV2ZW50Lm1ldGFLZXl8fGV2ZW50LmN0cmxLZXl8fGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkICYmIG1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLl9zZWxlY3Rpb24uZmlsdGVyKCh2YWwsIGluZGV4KSA9PiBpbmRleCAhPT0gc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSAobWV0YUtleSkgPyB0aGlzLl9zZWxlY3Rpb24gPyBbLi4udGhpcy5fc2VsZWN0aW9uXSA6IFtdIDogW107ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgT2JqZWN0VXRpbHMuaW5zZXJ0SW50b09yZGVyZWRBcnJheShpdGVtLCBpbmRleCwgdGhpcy5fc2VsZWN0aW9uLCB0aGlzLnZhbHVlKTsgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLl9zZWxlY3Rpb24uZmlsdGVyKCh2YWwsIGluZGV4KSA9PiBpbmRleCAhPT0gc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLl9zZWxlY3Rpb24gPyBbLi4udGhpcy5fc2VsZWN0aW9uXSA6IFtdO1xuICAgICAgICAgICAgICAgIE9iamVjdFV0aWxzLmluc2VydEludG9PcmRlcmVkQXJyYXkoaXRlbSwgaW5kZXgsIHRoaXMuX3NlbGVjdGlvbiwgdGhpcy52YWx1ZSk7ICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIC8vYmluZGluZ1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuX3NlbGVjdGlvbik7XG5cbiAgICAgICAgLy9ldmVudFxuICAgICAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlLmVtaXQoe29yaWdpbmFsRXZlbnQ6ZXZlbnQsIHZhbHVlOiB0aGlzLl9zZWxlY3Rpb259KTsgICBcbiAgICB9XG4gICAgICAgICAgICBcbiAgICBvbkZpbHRlcktleXVwKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZmlsdGVyVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHRoaXMuZmlsdGVyKCk7XG4gICAgXG4gICAgICAgIHRoaXMub25GaWx0ZXJFdmVudC5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmlzaWJsZU9wdGlvbnNcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGZpbHRlcigpIHtcbiAgICAgICAgbGV0IHNlYXJjaEZpZWxkczogc3RyaW5nW10gPSB0aGlzLmZpbHRlckJ5LnNwbGl0KCcsJyk7XG4gICAgICAgIHRoaXMudmlzaWJsZU9wdGlvbnMgPSBGaWx0ZXJVdGlscy5maWx0ZXIodGhpcy52YWx1ZSwgc2VhcmNoRmllbGRzLCB0aGlzLmZpbHRlclZhbHVlLCB0aGlzLmZpbHRlck1hdGNoTW9kZSk7XG4gICAgfVxuICAgIFxuICAgIGlzSXRlbVZpc2libGUoaXRlbTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmZpbHRlclZhbHVlICYmIHRoaXMuZmlsdGVyVmFsdWUudHJpbSgpLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZpc2libGVPcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gPT0gdGhpcy52aXNpYmxlT3B0aW9uc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbkl0ZW1Ub3VjaEVuZChldmVudCkge1xuICAgICAgICB0aGlzLml0ZW1Ub3VjaGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgaXNTZWxlY3RlZChpdGVtOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChpdGVtLCB0aGlzLnNlbGVjdGlvbikgIT0gLTE7XG4gICAgfVxuICAgICAgICBcbiAgICBtb3ZlVXAoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHRoaXMuc2VsZWN0aW9uW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleDogbnVtYmVyID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gdGhpcy52YWx1ZVtzZWxlY3RlZEl0ZW1JbmRleF07XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wID0gdGhpcy52YWx1ZVtzZWxlY3RlZEl0ZW1JbmRleC0xXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZVtzZWxlY3RlZEl0ZW1JbmRleC0xXSA9IG1vdmVkSXRlbTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZVtzZWxlY3RlZEl0ZW1JbmRleF0gPSB0ZW1wO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLm1vdmVkVXAgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vblJlb3JkZXIuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbW92ZVRvcChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnNlbGVjdGlvbi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW0gPSB0aGlzLnNlbGVjdGlvbltpXTtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtSW5kZXg6IG51bWJlciA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdChzZWxlY3RlZEl0ZW0sIHRoaXMudmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSXRlbUluZGV4ICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVkSXRlbSA9IHRoaXMudmFsdWUuc3BsaWNlKHNlbGVjdGVkSXRlbUluZGV4LDEpWzBdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlLnVuc2hpZnQobW92ZWRJdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5vblJlb3JkZXIuZW1pdChldmVudCk7XG4gICAgICAgICAgICB0aGlzLmxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIG1vdmVEb3duKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc2VsZWN0aW9uLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbSA9IHRoaXMuc2VsZWN0aW9uW2ldO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZEl0ZW1JbmRleDogbnVtYmVyID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHNlbGVjdGVkSXRlbSwgdGhpcy52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRJdGVtSW5kZXggIT0gKHRoaXMudmFsdWUubGVuZ3RoIC0gMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vdmVkSXRlbSA9IHRoaXMudmFsdWVbc2VsZWN0ZWRJdGVtSW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcCA9IHRoaXMudmFsdWVbc2VsZWN0ZWRJdGVtSW5kZXgrMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVbc2VsZWN0ZWRJdGVtSW5kZXgrMV0gPSBtb3ZlZEl0ZW07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVbc2VsZWN0ZWRJdGVtSW5kZXhdID0gdGVtcDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5tb3ZlZERvd24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vblJlb3JkZXIuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbW92ZUJvdHRvbShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWRJdGVtID0gdGhpcy5zZWxlY3Rpb25baV07XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkSXRlbUluZGV4OiBudW1iZXIgPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3Qoc2VsZWN0ZWRJdGVtLCB0aGlzLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEl0ZW1JbmRleCAhPSAodGhpcy52YWx1ZS5sZW5ndGggLSAxKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbW92ZWRJdGVtID0gdGhpcy52YWx1ZS5zcGxpY2Uoc2VsZWN0ZWRJdGVtSW5kZXgsMSlbMF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUucHVzaChtb3ZlZEl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLm9uUmVvcmRlci5lbWl0KGV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMubGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMubGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbkRyYWdTdGFydChldmVudDogRHJhZ0V2ZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0JywgJ2InKTsgICAgLy8gRm9yIGZpcmVmb3hcbiAgICAgICAgKDxIVE1MTElFbGVtZW50PiBldmVudC50YXJnZXQpLmJsdXIoKTtcbiAgICAgICAgdGhpcy5kcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZHJhZ2dlZEl0ZW1JbmRleCA9IGluZGV4OyBcbiAgICB9XG4gICAgXG4gICAgb25EcmFnT3ZlcihldmVudDogRHJhZ0V2ZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nICYmIHRoaXMuZHJhZ2dlZEl0ZW1JbmRleCAhPT0gaW5kZXggJiYgdGhpcy5kcmFnZ2VkSXRlbUluZGV4ICsgMSAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJJdGVtSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25EcmFnTGVhdmUoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgICAgICB0aGlzLmRyYWdPdmVySXRlbUluZGV4ID0gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgb25Ecm9wKGV2ZW50OiBEcmFnRXZlbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGRyb3BJbmRleCA9ICh0aGlzLmRyYWdnZWRJdGVtSW5kZXggPiBpbmRleCkgPyBpbmRleCA6IChpbmRleCA9PT0gMCkgPyAwIDogaW5kZXggLSAxO1xuICAgICAgICBPYmplY3RVdGlscy5yZW9yZGVyQXJyYXkodGhpcy52YWx1ZSwgdGhpcy5kcmFnZ2VkSXRlbUluZGV4LCBkcm9wSW5kZXgpO1xuICAgICAgICB0aGlzLmRyYWdPdmVySXRlbUluZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5vblJlb3JkZXIuZW1pdChldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIFxuICAgIG9uRHJhZ0VuZChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIHRoaXMuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgb25MaXN0TW91c2VNb3ZlKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0WSA9IHRoaXMubGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgbGV0IGJvdHRvbURpZmYgPSAob2Zmc2V0WSArIHRoaXMubGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCkgLSBldmVudC5wYWdlWTtcbiAgICAgICAgICAgIGxldCB0b3BEaWZmID0gKGV2ZW50LnBhZ2VZIC0gb2Zmc2V0WSk7XG4gICAgICAgICAgICBpZiAoYm90dG9tRGlmZiA8IDI1ICYmIGJvdHRvbURpZmYgPiAwKVxuICAgICAgICAgICAgICAgIHRoaXMubGlzdFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCArPSAxNTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRvcERpZmYgPCAyNSAmJiB0b3BEaWZmID4gMClcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgLT0gMTU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgb25JdGVtS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgaXRlbSwgaW5kZXg6IE51bWJlcikge1xuICAgICAgICBsZXQgbGlzdEl0ZW0gPSA8SFRNTExJRWxlbWVudD4gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgXG4gICAgICAgIHN3aXRjaChldmVudC53aGljaCkge1xuICAgICAgICAgICAgLy9kb3duXG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgIHZhciBuZXh0SXRlbSA9IHRoaXMuZmluZE5leHRJdGVtKGxpc3RJdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dEl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dEl0ZW0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL3VwXG4gICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIHZhciBwcmV2SXRlbSA9IHRoaXMuZmluZFByZXZJdGVtKGxpc3RJdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldkl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldkl0ZW0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgIHRoaXMub25JdGVtQ2xpY2soZXZlbnQsIGl0ZW0sIGluZGV4KTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZmluZE5leHRJdGVtKGl0ZW0pIHtcbiAgICAgICAgbGV0IG5leHRJdGVtID0gaXRlbS5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKG5leHRJdGVtKVxuICAgICAgICAgICAgcmV0dXJuICFEb21IYW5kbGVyLmhhc0NsYXNzKG5leHRJdGVtLCAndWktb3JkZXJsaXN0LWl0ZW0nKSB8fCBEb21IYW5kbGVyLmlzSGlkZGVuKG5leHRJdGVtKSA/IHRoaXMuZmluZE5leHRJdGVtKG5leHRJdGVtKSA6IG5leHRJdGVtO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBmaW5kUHJldkl0ZW0oaXRlbSkge1xuICAgICAgICBsZXQgcHJldkl0ZW0gPSBpdGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgIFxuICAgICAgICBpZiAocHJldkl0ZW0pXG4gICAgICAgICAgICByZXR1cm4gIURvbUhhbmRsZXIuaGFzQ2xhc3MocHJldkl0ZW0sICd1aS1vcmRlcmxpc3QtaXRlbScpIHx8IERvbUhhbmRsZXIuaXNIaWRkZW4ocHJldkl0ZW0pID8gdGhpcy5maW5kUHJldkl0ZW0ocHJldkl0ZW0pIDogcHJldkl0ZW07XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH0gXG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxCdXR0b25Nb2R1bGUsU2hhcmVkTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbT3JkZXJMaXN0LFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbT3JkZXJMaXN0XVxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckxpc3RNb2R1bGUgeyB9XG4iXX0=