var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Output, EventEmitter, AfterContentInit, ContentChildren, QueryList, TemplateRef, forwardRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const CHIPS_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Chips),
    multi: true
};
let Chips = class Chips {
    constructor(el) {
        this.el = el;
        this.allowDuplicate = true;
        this.onAdd = new EventEmitter();
        this.onRemove = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onChipClick = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
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
    onClick(event) {
        this.inputViewChild.nativeElement.focus();
    }
    onItemClick(event, item) {
        this.onChipClick.emit({
            originalEvent: event,
            value: item
        });
    }
    writeValue(value) {
        this.value = value;
        this.updateMaxedOut();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
    }
    resolveFieldData(data, field) {
        if (data && field) {
            if (field.indexOf('.') == -1) {
                return data[field];
            }
            else {
                let fields = field.split('.');
                let value = data;
                for (var i = 0, len = fields.length; i < len; ++i) {
                    value = value[fields[i]];
                }
                return value;
            }
        }
        else {
            return null;
        }
    }
    onInputFocus(event) {
        this.focus = true;
        this.onFocus.emit(event);
    }
    onInputBlur(event) {
        this.focus = false;
        if (this.addOnBlur && this.inputViewChild.nativeElement.value) {
            this.addItem(event, this.inputViewChild.nativeElement.value);
            this.inputViewChild.nativeElement.value = '';
        }
        this.onModelTouched();
        this.onBlur.emit(event);
    }
    removeItem(event, index) {
        if (this.disabled) {
            return;
        }
        let removedItem = this.value[index];
        this.value = this.value.filter((val, i) => i != index);
        this.onModelChange(this.value);
        this.onRemove.emit({
            originalEvent: event,
            value: removedItem
        });
        this.updateMaxedOut();
    }
    addItem(event, item) {
        this.value = this.value || [];
        if (item && item.trim().length) {
            if (this.allowDuplicate || this.value.indexOf(item) === -1) {
                this.value = [...this.value, item];
                this.onModelChange(this.value);
                this.onAdd.emit({
                    originalEvent: event,
                    value: item
                });
            }
        }
        this.updateMaxedOut();
    }
    onKeydown(event) {
        switch (event.which) {
            //backspace
            case 8:
                if (this.inputViewChild.nativeElement.value.length === 0 && this.value && this.value.length > 0) {
                    this.value = [...this.value];
                    let removedItem = this.value.pop();
                    this.onModelChange(this.value);
                    this.onRemove.emit({
                        originalEvent: event,
                        value: removedItem
                    });
                }
                break;
            //enter
            case 13:
                this.addItem(event, this.inputViewChild.nativeElement.value);
                this.inputViewChild.nativeElement.value = '';
                event.preventDefault();
                break;
            case 9:
                if (this.addOnTab && this.inputViewChild.nativeElement.value !== '') {
                    this.addItem(event, this.inputViewChild.nativeElement.value);
                    this.inputViewChild.nativeElement.value = '';
                    event.preventDefault();
                }
                break;
            default:
                if (this.max && this.value && this.max === this.value.length) {
                    event.preventDefault();
                }
                break;
        }
    }
    updateMaxedOut() {
        if (this.inputViewChild && this.inputViewChild.nativeElement) {
            if (this.max && this.value && this.max === this.value.length)
                this.inputViewChild.nativeElement.disabled = true;
            else
                this.inputViewChild.nativeElement.disabled = this.disabled || false;
        }
    }
};
Chips.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], Chips.prototype, "style", void 0);
__decorate([
    Input()
], Chips.prototype, "styleClass", void 0);
__decorate([
    Input()
], Chips.prototype, "disabled", void 0);
__decorate([
    Input()
], Chips.prototype, "field", void 0);
__decorate([
    Input()
], Chips.prototype, "placeholder", void 0);
__decorate([
    Input()
], Chips.prototype, "max", void 0);
__decorate([
    Input()
], Chips.prototype, "ariaLabelledBy", void 0);
__decorate([
    Input()
], Chips.prototype, "tabindex", void 0);
__decorate([
    Input()
], Chips.prototype, "inputId", void 0);
__decorate([
    Input()
], Chips.prototype, "allowDuplicate", void 0);
__decorate([
    Input()
], Chips.prototype, "inputStyle", void 0);
__decorate([
    Input()
], Chips.prototype, "inputStyleClass", void 0);
__decorate([
    Input()
], Chips.prototype, "addOnTab", void 0);
__decorate([
    Input()
], Chips.prototype, "addOnBlur", void 0);
__decorate([
    Output()
], Chips.prototype, "onAdd", void 0);
__decorate([
    Output()
], Chips.prototype, "onRemove", void 0);
__decorate([
    Output()
], Chips.prototype, "onFocus", void 0);
__decorate([
    Output()
], Chips.prototype, "onBlur", void 0);
__decorate([
    Output()
], Chips.prototype, "onChipClick", void 0);
__decorate([
    ViewChild('inputtext', { static: true })
], Chips.prototype, "inputViewChild", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], Chips.prototype, "templates", void 0);
Chips = __decorate([
    Component({
        selector: 'p-chips',
        template: `
        <div [ngClass]="'ui-chips ui-widget'" [ngStyle]="style" [class]="styleClass" (click)="onClick($event)">
            <ul [ngClass]="{'ui-inputtext ui-state-default ui-corner-all':true,'ui-state-focus':focus,'ui-state-disabled':disabled}">
                <li #token *ngFor="let item of value; let i = index;" class="ui-chips-token ui-state-highlight ui-corner-all" (click)="onItemClick($event, item)">
                    <span *ngIf="!disabled" class="ui-chips-token-icon pi pi-fw pi-times" (click)="removeItem($event,i)"></span>
                    <span *ngIf="!itemTemplate" class="ui-chips-token-label">{{field ? resolveFieldData(item,field) : item}}</span>
                    <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item}"></ng-container>
                </li>
                <li class="ui-chips-input-token">
                    <input #inputtext type="text" [attr.id]="inputId" [attr.placeholder]="(value && value.length ? null : placeholder)" [attr.tabindex]="tabindex" (keydown)="onKeydown($event)" 
                    [attr.aria-labelledby]="ariaLabelledBy" (focus)="onInputFocus($event)" (blur)="onInputBlur($event)" [disabled]="disabled" [ngStyle]="inputStyle" [class]="inputStyleClass">
                </li>
            </ul>
        </div>
    `,
        providers: [CHIPS_VALUE_ACCESSOR]
    })
], Chips);
export { Chips };
let ChipsModule = class ChipsModule {
};
ChipsModule = __decorate([
    NgModule({
        imports: [CommonModule, InputTextModule, SharedModule],
        exports: [Chips, InputTextModule, SharedModule],
        declarations: [Chips]
    })
], ChipsModule);
export { ChipsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2NoaXBzLyIsInNvdXJjZXMiOlsiY2hpcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLGdCQUFnQixFQUFDLGVBQWUsRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEssT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQVE7SUFDdkMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztJQUNwQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFxQkYsSUFBYSxLQUFLLEdBQWxCLE1BQWEsS0FBSztJQXdEZCxZQUFtQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQXBDeEIsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFVOUIsVUFBSyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlDLGFBQVEsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVqRCxZQUFPLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRS9DLGdCQUFXLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFVOUQsa0JBQWEsR0FBYSxHQUFH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a0I7QUFFakI7SUFBUixLQUFLLEVBQUU7c0NBQWlCO0FBRWhCO0lBQVIsS0FBSyxFQUFFOzZDQUFnQztBQUUvQjtJQUFSLEtBQUssRUFBRTt5Q0FBaUI7QUFFaEI7SUFBUixLQUFLLEVBQUU7OENBQXNCO0FBRXJCO0lBQVIsS0FBSyxFQUFFO3VDQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTt3Q0FBb0I7QUFFbEI7SUFBVCxNQUFNLEVBQUU7b0NBQStDO0FBRTlDO0lBQVQsTUFBTSxFQUFFO3VDQUFrRDtBQUVqRDtJQUFULE1BQU0sRUFBRTtzQ0FBaUQ7QUFFaEQ7SUFBVCxNQUFNLEVBQUU7cUNBQWdEO0FBRS9DO0lBQVQsTUFBTSxFQUFFOzBDQUFxRDtBQUVwQjtJQUF6QyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOzZDQUE0QjtBQUVyQztJQUEvQixlQUFlLENBQUMsYUFBYSxDQUFDO3dDQUEyQjtBQTFDakQsS0FBSztJQW5CakIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFNBQVM7UUFDbkIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7OztLQWNUO1FBQ0QsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUM7S0FDcEMsQ0FBQztHQUNXLEtBQUssQ0FvTmpCO1NBcE5ZLEtBQUs7QUEyTmxCLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7Q0FBSSxDQUFBO0FBQWYsV0FBVztJQUx2QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsZUFBZSxFQUFDLFlBQVksQ0FBQztRQUNwRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUMsZUFBZSxFQUFDLFlBQVksQ0FBQztRQUM3QyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUM7S0FDeEIsQ0FBQztHQUNXLFdBQVcsQ0FBSTtTQUFmLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxFbGVtZW50UmVmLElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsQWZ0ZXJDb250ZW50SW5pdCxDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFRlbXBsYXRlUmVmLGZvcndhcmRSZWYsVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtTaGFyZWRNb2R1bGUsUHJpbWVUZW1wbGF0ZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtJbnB1dFRleHRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0JztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBDSElQU19WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ2hpcHMpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWNoaXBzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIid1aS1jaGlwcyB1aS13aWRnZXQnXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIChjbGljayk9XCJvbkNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgIDx1bCBbbmdDbGFzc109XCJ7J3VpLWlucHV0dGV4dCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXN0YXRlLWZvY3VzJzpmb2N1cywndWktc3RhdGUtZGlzYWJsZWQnOmRpc2FibGVkfVwiPlxuICAgICAgICAgICAgICAgIDxsaSAjdG9rZW4gKm5nRm9yPVwibGV0IGl0ZW0gb2YgdmFsdWU7IGxldCBpID0gaW5kZXg7XCIgY2xhc3M9XCJ1aS1jaGlwcy10b2tlbiB1aS1zdGF0ZS1oaWdobGlnaHQgdWktY29ybmVyLWFsbFwiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsIGl0ZW0pXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWRpc2FibGVkXCIgY2xhc3M9XCJ1aS1jaGlwcy10b2tlbi1pY29uIHBpIHBpLWZ3IHBpLXRpbWVzXCIgKGNsaWNrKT1cInJlbW92ZUl0ZW0oJGV2ZW50LGkpXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFpdGVtVGVtcGxhdGVcIiBjbGFzcz1cInVpLWNoaXBzLXRva2VuLWxhYmVsXCI+e3tmaWVsZCA/IHJlc29sdmVGaWVsZERhdGEoaXRlbSxmaWVsZCkgOiBpdGVtfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJpdGVtVGVtcGxhdGU7IGNvbnRleHQ6IHskaW1wbGljaXQ6IGl0ZW19XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJ1aS1jaGlwcy1pbnB1dC10b2tlblwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgI2lucHV0dGV4dCB0eXBlPVwidGV4dFwiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci5wbGFjZWhvbGRlcl09XCIodmFsdWUgJiYgdmFsdWUubGVuZ3RoID8gbnVsbCA6IHBsYWNlaG9sZGVyKVwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCIgKGtleWRvd24pPVwib25LZXlkb3duKCRldmVudClcIiBcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImFyaWFMYWJlbGxlZEJ5XCIgKGZvY3VzKT1cIm9uSW5wdXRGb2N1cygkZXZlbnQpXCIgKGJsdXIpPVwib25JbnB1dEJsdXIoJGV2ZW50KVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFtuZ1N0eWxlXT1cImlucHV0U3R5bGVcIiBbY2xhc3NdPVwiaW5wdXRTdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbQ0hJUFNfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIENoaXBzIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCxDb250cm9sVmFsdWVBY2Nlc3NvciB7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICAgIFxuICAgIEBJbnB1dCgpIGZpZWxkOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBtYXg6IG51bWJlcjtcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGFsbG93RHVwbGljYXRlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSBpbnB1dFN0eWxlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgaW5wdXRTdHlsZUNsYXNzOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgYWRkT25UYWI6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBhZGRPbkJsdXI6IGJvb2xlYW47XG5cbiAgICBAT3V0cHV0KCkgb25BZGQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvblJlbW92ZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Gb2N1czogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25DaGlwQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQFZpZXdDaGlsZCgnaW5wdXR0ZXh0JywgeyBzdGF0aWM6IHRydWUgfSkgaW5wdXRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWY7XG4gICAgXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuICAgIFxuICAgIHB1YmxpYyBpdGVtVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgICAgIFxuICAgIHZhbHVlOiBhbnk7XG4gICAgXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICAgICAgXG4gICAgdmFsdWVDaGFuZ2VkOiBib29sZWFuO1xuICAgIFxuICAgIGZvY3VzOiBib29sZWFuO1xuICAgICAgICAgICAgXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuICAgIFxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaXRlbSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIG9uSXRlbUNsaWNrKGV2ZW50OiBFdmVudCwgaXRlbTogYW55KSB7XG4gICAgICAgIHRoaXMub25DaGlwQ2xpY2suZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHZhbHVlOiBpdGVtXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnVwZGF0ZU1heGVkT3V0KCk7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuICAgIFxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgfVxuICAgIFxuICAgIHJlc29sdmVGaWVsZERhdGEoZGF0YTogYW55LCBmaWVsZDogc3RyaW5nKTogYW55IHtcbiAgICAgICAgaWYgKGRhdGEgJiYgZmllbGQpIHtcbiAgICAgICAgICAgIGlmIChmaWVsZC5pbmRleE9mKCcuJykgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YVtmaWVsZF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZmllbGRzOiBzdHJpbmdbXSA9IGZpZWxkLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZGF0YTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwLCBsZW4gPSBmaWVsZHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtmaWVsZHNbaV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvbklucHV0Rm9jdXMoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XG4gICAgICAgIHRoaXMub25Gb2N1cy5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBvbklucHV0Qmx1cihldmVudDogRm9jdXNFdmVudCkge1xuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmFkZE9uQmx1ciAmJiB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkSXRlbShldmVudCwgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgdGhpcy5vbkJsdXIuZW1pdChldmVudCk7XG4gICAgfVxuICAgIFxuICAgIHJlbW92ZUl0ZW0oZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCByZW1vdmVkSXRlbSA9IHRoaXMudmFsdWVbaW5kZXhdO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5maWx0ZXIoKHZhbCwgaSkgPT4gaSE9aW5kZXgpO1xuICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMub25SZW1vdmUuZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIHZhbHVlOiByZW1vdmVkSXRlbVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXhlZE91dCgpO1xuICAgIH1cbiAgICBcbiAgICBhZGRJdGVtKGV2ZW50OiBFdmVudCwgaXRlbTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlfHxbXTtcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS50cmltKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hbGxvd0R1cGxpY2F0ZSB8fCB0aGlzLnZhbHVlLmluZGV4T2YoaXRlbSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFsuLi50aGlzLnZhbHVlLCBpdGVtXTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFkZC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVNYXhlZE91dCgpO1xuICAgIH1cbiAgICBcbiAgICBvbktleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAvL2JhY2tzcGFjZVxuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUubGVuZ3RoID09PSAwICYmIHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBbLi4udGhpcy52YWx1ZV07XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1vdmVkSXRlbSA9IHRoaXMudmFsdWUucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJlbW92ZS5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHJlbW92ZWRJdGVtXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbShldmVudCwgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hZGRPblRhYiAmJiB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQudmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbShldmVudCwgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tYXggJiYgdGhpcy52YWx1ZSAmJiB0aGlzLm1heCA9PT0gdGhpcy52YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB1cGRhdGVNYXhlZE91dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5wdXRWaWV3Q2hpbGQgJiYgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tYXggJiYgdGhpcy52YWx1ZSAmJiB0aGlzLm1heCA9PT0gdGhpcy52YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuZGlzYWJsZWQgPSB0aGlzLmRpc2FibGVkIHx8IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsSW5wdXRUZXh0TW9kdWxlLFNoYXJlZE1vZHVsZV0sXG4gICAgZXhwb3J0czogW0NoaXBzLElucHV0VGV4dE1vZHVsZSxTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW0NoaXBzXVxufSlcbmV4cG9ydCBjbGFzcyBDaGlwc01vZHVsZSB7IH1cbiJdfQ==