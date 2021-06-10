var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const TRISTATECHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TriStateCheckbox),
    multi: true
};
let TriStateCheckbox = class TriStateCheckbox {
    constructor(cd) {
        this.cd = cd;
        this.onChange = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    onClick(event, input) {
        if (!this.disabled && !this.readonly) {
            this.toggle(event);
            this.focus = true;
            input.focus();
        }
    }
    onKeydown(event) {
        if (event.keyCode == 32) {
            event.preventDefault();
        }
    }
    onKeyup(event) {
        if (event.keyCode == 32 && !this.readonly) {
            this.toggle(event);
            event.preventDefault();
        }
    }
    toggle(event) {
        if (this.value == null || this.value == undefined)
            this.value = true;
        else if (this.value == true)
            this.value = false;
        else if (this.value == false)
            this.value = null;
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    onFocus() {
        this.focus = true;
    }
    onBlur() {
        this.focus = false;
        this.onModelTouched();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    writeValue(value) {
        this.value = value;
        this.cd.markForCheck();
    }
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
};
TriStateCheckbox.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], TriStateCheckbox.prototype, "disabled", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "name", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "ariaLabelledBy", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "tabindex", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "inputId", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "style", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "styleClass", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "label", void 0);
__decorate([
    Input()
], TriStateCheckbox.prototype, "readonly", void 0);
__decorate([
    Output()
], TriStateCheckbox.prototype, "onChange", void 0);
TriStateCheckbox = __decorate([
    Component({
        selector: 'p-triStateCheckbox',
        template: `
        <div [ngStyle]="style" [ngClass]="{'ui-chkbox ui-tristatechkbox ui-widget': true,'ui-chkbox-readonly': readonly}" [class]="styleClass">
            <div class="ui-helper-hidden-accessible">
                <input #input type="text" [attr.id]="inputId" [name]="name" [attr.tabindex]="tabindex" [readonly]="readonly" [disabled]="disabled" (keyup)="onKeyup($event)" (keydown)="onKeydown($event)" (focus)="onFocus()" (blur)="onBlur()" [attr.aria-labelledby]="ariaLabelledBy">
            </div>
            <div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" (click)="onClick($event,input)"  role="checkbox" [attr.aria-checked]="value === true"
                [ngClass]="{'ui-state-active':value!=null,'ui-state-disabled':disabled,'ui-state-focus':focus}">
                <span class="ui-chkbox-icon pi ui-clickable" [ngClass]="{'pi-check':value==true,'pi-times':value==false}"></span>
            </div>
        </div>
        <label class="ui-chkbox-label" (click)="onClick($event,input)"
               [ngClass]="{'ui-label-active':value!=null, 'ui-label-disabled':disabled, 'ui-label-focus':focus}"
               *ngIf="label" [attr.for]="inputId">{{label}}</label>
    `,
        providers: [TRISTATECHECKBOX_VALUE_ACCESSOR]
    })
], TriStateCheckbox);
export { TriStateCheckbox };
let TriStateCheckboxModule = class TriStateCheckboxModule {
};
TriStateCheckboxModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [TriStateCheckbox],
        declarations: [TriStateCheckbox]
    })
], TriStateCheckboxModule);
export { TriStateCheckboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpc3RhdGVjaGVja2JveC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvdHJpc3RhdGVjaGVja2JveC8iLCJzb3VyY2VzIjpbInRyaXN0YXRlY2hlY2tib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hHLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsTUFBTSxDQUFDLE1BQU0sK0JBQStCLEdBQVE7SUFDbEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDO0lBQy9DLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQW9CRixJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUV6QixZQUFvQixFQUFxQjtRQUFyQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQW9CL0IsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTTNELGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBNUJRLENBQUM7SUE4QjdDLE9BQU8sQ0FBQyxLQUFZLEVBQUUsS0FBdUI7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1NB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RSxDQUFDLGdCQUFnQixDQUFDO0tBQ25DLENBQUM7R0FDVyxzQkFBc0IsQ0FBSTtTQUExQixzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLGZvcndhcmRSZWYsQ2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge05HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgVFJJU1RBVEVDSEVDS0JPWF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVHJpU3RhdGVDaGVja2JveCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdHJpU3RhdGVDaGVja2JveCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cInsndWktY2hrYm94IHVpLXRyaXN0YXRlY2hrYm94IHVpLXdpZGdldCc6IHRydWUsJ3VpLWNoa2JveC1yZWFkb25seSc6IHJlYWRvbmx5fVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNpbnB1dCB0eXBlPVwidGV4dFwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbbmFtZV09XCJuYW1lXCIgW2F0dHIudGFiaW5kZXhdPVwidGFiaW5kZXhcIiBbcmVhZG9ubHldPVwicmVhZG9ubHlcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoa2V5dXApPVwib25LZXl1cCgkZXZlbnQpXCIgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIiAoZm9jdXMpPVwib25Gb2N1cygpXCIgKGJsdXIpPVwib25CbHVyKClcIiBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkQnlcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktc3RhdGUtZGVmYXVsdFwiIChjbGljayk9XCJvbkNsaWNrKCRldmVudCxpbnB1dClcIiAgcm9sZT1cImNoZWNrYm94XCIgW2F0dHIuYXJpYS1jaGVja2VkXT1cInZhbHVlID09PSB0cnVlXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWFjdGl2ZSc6dmFsdWUhPW51bGwsJ3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZCwndWktc3RhdGUtZm9jdXMnOmZvY3VzfVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktY2hrYm94LWljb24gcGkgdWktY2xpY2thYmxlXCIgW25nQ2xhc3NdPVwieydwaS1jaGVjayc6dmFsdWU9PXRydWUsJ3BpLXRpbWVzJzp2YWx1ZT09ZmFsc2V9XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJ1aS1jaGtib3gtbGFiZWxcIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQsaW5wdXQpXCJcbiAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktbGFiZWwtYWN0aXZlJzp2YWx1ZSE9bnVsbCwgJ3VpLWxhYmVsLWRpc2FibGVkJzpkaXNhYmxlZCwgJ3VpLWxhYmVsLWZvY3VzJzpmb2N1c31cIlxuICAgICAgICAgICAgICAgKm5nSWY9XCJsYWJlbFwiIFthdHRyLmZvcl09XCJpbnB1dElkXCI+e3tsYWJlbH19PC9sYWJlbD5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW1RSSVNUQVRFQ0hFQ0tCT1hfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFRyaVN0YXRlQ2hlY2tib3ggaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciAge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSByZWFkb25seTogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoKSBvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBmb2N1czogYm9vbGVhbjtcblxuICAgIHZhbHVlOiBhbnk7XG5cbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuXG4gICAgb25Nb2RlbFRvdWNoZWQ6IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCwgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZShldmVudCk7XG4gICAgICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT0gMzIpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleXVwKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDMyICYmICF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZShldmVudCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PSBudWxsIHx8IHRoaXMudmFsdWUgPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRydWU7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudmFsdWUgPT0gdHJ1ZSlcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBmYWxzZTtcbiAgICAgICAgZWxzZSBpZiAodGhpcy52YWx1ZSA9PSBmYWxzZSlcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuXG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICB0aGlzLmZvY3VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkJsdXIoKSB7XG4gICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbk1vZGVsVG91Y2hlZCgpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSA6IHZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShkaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtUcmlTdGF0ZUNoZWNrYm94XSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUcmlTdGF0ZUNoZWNrYm94XVxufSlcbmV4cG9ydCBjbGFzcyBUcmlTdGF0ZUNoZWNrYm94TW9kdWxlIHsgfVxuIl19