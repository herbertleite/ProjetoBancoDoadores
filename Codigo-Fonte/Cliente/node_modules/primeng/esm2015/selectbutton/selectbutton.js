var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ChangeDetectorRef, ContentChild, TemplateRef, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectUtils } from 'primeng/utils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export const SELECTBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectButton),
    multi: true
};
let SelectButton = class SelectButton {
    constructor(cd) {
        this.cd = cd;
        this.tabindex = 0;
        this.onOptionClick = new EventEmitter();
        this.onChange = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    get options() {
        return this._options;
    }
    set options(val) {
        //NoOp
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.options) {
            this._options = this.optionLabel ? ObjectUtils.generateSelectItems(simpleChange.options.currentValue, this.optionLabel) : simpleChange.options.currentValue;
        }
    }
    writeValue(value) {
        this.value = value;
        this.cd.markForCheck();
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
    onItemClick(event, option, index) {
        if (this.disabled || option.disabled) {
            return;
        }
        if (this.multiple) {
            let itemIndex = this.findItemIndex(option);
            if (itemIndex != -1)
                this.value = this.value.filter((val, i) => i != itemIndex);
            else
                this.value = [...this.value || [], option.value];
        }
        else {
            this.value = option.value;
        }
        this.onOptionClick.emit({
            originalEvent: event,
            option: option,
            index: index
        });
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    onFocus(event) {
        this.focusedItem = event.target;
    }
    onBlur(event) {
        this.focusedItem = null;
        this.onModelTouched();
    }
    isSelected(option) {
        if (this.multiple)
            return this.findItemIndex(option) != -1;
        else
            return ObjectUtils.equals(option.value, this.value, this.dataKey);
    }
    findItemIndex(option) {
        let index = -1;
        if (this.value) {
            for (let i = 0; i < this.value.length; i++) {
                if (this.value[i] == option.value) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
};
SelectButton.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], SelectButton.prototype, "tabindex", void 0);
__decorate([
    Input()
], SelectButton.prototype, "multiple", void 0);
__decorate([
    Input()
], SelectButton.prototype, "style", void 0);
__decorate([
    Input()
], SelectButton.prototype, "styleClass", void 0);
__decorate([
    Input()
], SelectButton.prototype, "ariaLabelledBy", void 0);
__decorate([
    Input()
], SelectButton.prototype, "disabled", void 0);
__decorate([
    Input()
], SelectButton.prototype, "dataKey", void 0);
__decorate([
    Input()
], SelectButton.prototype, "optionLabel", void 0);
__decorate([
    Output()
], SelectButton.prototype, "onOptionClick", void 0);
__decorate([
    Output()
], SelectButton.prototype, "onChange", void 0);
__decorate([
    ContentChild(TemplateRef, { static: true })
], SelectButton.prototype, "itemTemplate", void 0);
__decorate([
    Input()
], SelectButton.prototype, "options", null);
SelectButton = __decorate([
    Component({
        selector: 'p-selectButton',
        template: `
        <div [ngClass]="'ui-selectbutton ui-buttonset ui-widget ui-corner-all ui-buttonset-' + (options ? options.length : 0)" [ngStyle]="style" [class]="styleClass"  role="group">
            <div *ngFor="let option of options; let i = index" #btn class="ui-button ui-widget ui-state-default ui-button-text-only {{option.styleClass}}"  role="button" [attr.aria-pressed]="isSelected(option)"
                [ngClass]="{'ui-state-active':isSelected(option), 'ui-state-disabled': disabled || option.disabled, 'ui-state-focus': btn == focusedItem, 
                'ui-button-text-icon-left': (option.icon != null), 'ui-button-icon-only': (option.icon && !option.label)}" (click)="onItemClick($event,option,i)" (keydown.enter)="onItemClick($event,option,i)"
                [attr.title]="option.title" [attr.aria-label]="option.label" (focus)="onFocus($event)" (blur)="onBlur($event)" [attr.tabindex]="tabindex" [attr.aria-labelledby]="ariaLabelledBy">
                <ng-container *ngIf="!itemTemplate else customcontent">
                    <span [ngClass]="['ui-clickable', 'ui-button-icon-left']" [class]="option.icon" *ngIf="option.icon"></span>
                    <span class="ui-button-text ui-clickable">{{option.label||'ui-btn'}}</span>
                </ng-container>
                <ng-template #customcontent>
                    <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: option, index: i}"></ng-container>
                </ng-template>
            </div>
        </div>
    `,
        providers: [SELECTBUTTON_VALUE_ACCESSOR]
    })
], SelectButton);
export { SelectButton };
let SelectButtonModule = class SelectButtonModule {
};
SelectButtonModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [SelectButton],
        declarations: [SelectButton]
    })
], SelectButtonModule);
export { SelectButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0YnV0dG9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9zZWxlY3RidXR0b24vIiwic291cmNlcyI6WyJzZWxlY3RidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLGlCQUFpQixFQUFDLFlBQVksRUFBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzSixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUMsaUJBQWlCLEVBQXVCLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkUsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQVE7SUFDOUMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQztJQUMzQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFzQkYsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQWtDckIsWUFBb0IsRUFBcUI7UUFBckIsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFoQ2hDLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFnQnBCLGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFdEQsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBVTNELGtCQUFhLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRW5DLG1CQUFjLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBRVEsQ0FBQztJQUVwQyxJQUFJLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxHQUFVO1FBQ2xCLE1BQU07SUFDVixDQUFDO0lBRUQsV0FBVyxDQUFDLFlBQTJCO1FBQ25DLElBQUksWUFBWSxDQUFDLE9BQU8sRUFBRTtZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1NBQy9KO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFVO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQVk7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQVk7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGdCQUFnQixDQUFDLEdBQVk7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDeEIsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFLLEVBQUUsTUFBa0IsRUFBRSxLQUFhO1FBQ2hELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ2xDLE9BQU87U0FDVjtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0MsSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDO2dCQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUUsU0FBUyxDQUFDLENBQUM7O2dCQUV4RCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEQ7YUFDSTtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUM3QjtRQUVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3BCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUNmLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQVk7UUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBb0IsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNyRCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDUixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFrQjtRQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRO1lBQ2IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztZQUV4QyxPQUFPLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQWtCO1FBQzVCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtvQkFDL0IsS0FBSyxHQUFHLENBQUMsQ0FBQztvQkFDVixNQUFNO2lCQUNUO2FBQ0o7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7Q0FDSixDQUFBOztZQTNGMkIsaUJBQWlCOztBQWhDaEM7SUFBUixLQUFLLEVBQUU7OENBQXNCO0FBRXJCO0lBQVIsS0FBSyxFQUFFOzhDQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTsyQ0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFO2dEQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTtvREFBd0I7QUFFdkI7SUFBUixLQUFLLEVBQUU7OENBQW1CO0FBRWxCO0lBQVIsS0FBSyxFQUFFOzZDQUFnQjtBQUVmO0lBQVIsS0FBSyxFQUFFO2lEQUFxQjtBQUVuQjtJQUFULE1BQU0sRUFBRTttREFBdUQ7QUFFdEQ7SUFBVCxNQUFNLEVBQUU7OENBQWtEO0FBRWQ7SUFBNUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztrREFBYztBQWNqRDtJQUFSLEtBQUssRUFBRTsyQ0FFUDtBQXRDUSxZQUFZO0lBcEJ4QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0tBZVQ7UUFDRCxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztLQUMzQyxDQUFDO0dBQ1csWUFBWSxDQTZIeEI7U0E3SFksWUFBWTtBQW9JekIsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7Q0FBSSxDQUFBO0FBQXRCLGtCQUFrQjtJQUw5QixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLFlBQVksRUFBRSxDQUFDLFlBQVksQ0FBQztLQUMvQixDQUFDO0dBQ1csa0JBQWtCLENBQUk7U0FBdEIsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcixmb3J3YXJkUmVmLENoYW5nZURldGVjdG9yUmVmLENvbnRlbnRDaGlsZCxUZW1wbGF0ZVJlZiwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtTZWxlY3RJdGVtfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge09iamVjdFV0aWxzfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7TkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmV4cG9ydCBjb25zdCBTRUxFQ1RCVVRUT05fVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFNlbGVjdEJ1dHRvbiksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2VsZWN0QnV0dG9uJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIid1aS1zZWxlY3RidXR0b24gdWktYnV0dG9uc2V0IHVpLXdpZGdldCB1aS1jb3JuZXItYWxsIHVpLWJ1dHRvbnNldC0nICsgKG9wdGlvbnMgPyBvcHRpb25zLmxlbmd0aCA6IDApXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiICByb2xlPVwiZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBvcHRpb25zOyBsZXQgaSA9IGluZGV4XCIgI2J0biBjbGFzcz1cInVpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1idXR0b24tdGV4dC1vbmx5IHt7b3B0aW9uLnN0eWxlQ2xhc3N9fVwiICByb2xlPVwiYnV0dG9uXCIgW2F0dHIuYXJpYS1wcmVzc2VkXT1cImlzU2VsZWN0ZWQob3B0aW9uKVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1hY3RpdmUnOmlzU2VsZWN0ZWQob3B0aW9uKSwgJ3VpLXN0YXRlLWRpc2FibGVkJzogZGlzYWJsZWQgfHwgb3B0aW9uLmRpc2FibGVkLCAndWktc3RhdGUtZm9jdXMnOiBidG4gPT0gZm9jdXNlZEl0ZW0sIFxuICAgICAgICAgICAgICAgICd1aS1idXR0b24tdGV4dC1pY29uLWxlZnQnOiAob3B0aW9uLmljb24gIT0gbnVsbCksICd1aS1idXR0b24taWNvbi1vbmx5JzogKG9wdGlvbi5pY29uICYmICFvcHRpb24ubGFiZWwpfVwiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsb3B0aW9uLGkpXCIgKGtleWRvd24uZW50ZXIpPVwib25JdGVtQ2xpY2soJGV2ZW50LG9wdGlvbixpKVwiXG4gICAgICAgICAgICAgICAgW2F0dHIudGl0bGVdPVwib3B0aW9uLnRpdGxlXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJvcHRpb24ubGFiZWxcIiAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCIgKGJsdXIpPVwib25CbHVyKCRldmVudClcIiBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXRlbVRlbXBsYXRlIGVsc2UgY3VzdG9tY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBbbmdDbGFzc109XCJbJ3VpLWNsaWNrYWJsZScsICd1aS1idXR0b24taWNvbi1sZWZ0J11cIiBbY2xhc3NdPVwib3B0aW9uLmljb25cIiAqbmdJZj1cIm9wdGlvbi5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWJ1dHRvbi10ZXh0IHVpLWNsaWNrYWJsZVwiPnt7b3B0aW9uLmxhYmVsfHwndWktYnRuJ319PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjY3VzdG9tY29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIml0ZW1UZW1wbGF0ZTsgY29udGV4dDogeyRpbXBsaWNpdDogb3B0aW9uLCBpbmRleDogaX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbU0VMRUNUQlVUVE9OX1ZBTFVFX0FDQ0VTU09SXVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RCdXR0b24gaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIHRhYmluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgbXVsdGlwbGU6IGJvb2xlYW47XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcbiAgICAgICAgXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsbGVkQnk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgZGF0YUtleTogc3RyaW5nXG4gICAgXG4gICAgQElucHV0KCkgb3B0aW9uTGFiZWw6IHN0cmluZztcbiAgICBcbiAgICBAT3V0cHV0KCkgb25PcHRpb25DbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQENvbnRlbnRDaGlsZChUZW1wbGF0ZVJlZiwgeyBzdGF0aWM6IHRydWUgfSkgaXRlbVRlbXBsYXRlO1xuICAgIFxuICAgIHZhbHVlOiBhbnk7XG4gICAgXG4gICAgZm9jdXNlZEl0ZW06IEhUTUxEaXZFbGVtZW50O1xuICAgIFxuICAgIF9vcHRpb25zOiBhbnlbXTtcbiAgICBcbiAgICBvbk1vZGVsQ2hhbmdlOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIG9uTW9kZWxUb3VjaGVkOiBGdW5jdGlvbiA9ICgpID0+IHt9O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuICAgIFxuICAgIEBJbnB1dCgpIGdldCBvcHRpb25zKCk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgfVxuXG4gICAgc2V0IG9wdGlvbnModmFsOiBhbnlbXSkge1xuICAgICAgICAvL05vT3BcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhzaW1wbGVDaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5vcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gdGhpcy5vcHRpb25MYWJlbCA/IE9iamVjdFV0aWxzLmdlbmVyYXRlU2VsZWN0SXRlbXMoc2ltcGxlQ2hhbmdlLm9wdGlvbnMuY3VycmVudFZhbHVlLCB0aGlzLm9wdGlvbkxhYmVsKSA6IHNpbXBsZUNoYW5nZS5vcHRpb25zLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIDogdm9pZCB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlID0gZm47XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQgPSBmbjtcbiAgICB9XG4gICAgXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWw6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IHZhbDtcbiAgICB9XG4gICAgXG4gICAgb25JdGVtQ2xpY2soZXZlbnQsIG9wdGlvbjogU2VsZWN0SXRlbSwgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCBvcHRpb24uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICBpZiAodGhpcy5tdWx0aXBsZSkge1xuICAgICAgICAgICAgbGV0IGl0ZW1JbmRleCA9IHRoaXMuZmluZEl0ZW1JbmRleChvcHRpb24pO1xuICAgICAgICAgICAgaWYgKGl0ZW1JbmRleCAhPSAtMSlcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5maWx0ZXIoKHZhbCxpKSA9PiBpIT1pdGVtSW5kZXgpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBbLi4udGhpcy52YWx1ZXx8W10sIG9wdGlvbi52YWx1ZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gb3B0aW9uLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLm9uT3B0aW9uQ2xpY2suZW1pdCh7XG4gICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgIG9wdGlvbjogb3B0aW9uLFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5vbk1vZGVsQ2hhbmdlKHRoaXMudmFsdWUpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIG9uRm9jdXMoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSA8SFRNTERpdkVsZW1lbnQ+IGV2ZW50LnRhcmdldDtcbiAgICB9XG4gICAgXG4gICAgb25CbHVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZEl0ZW0gPSBudWxsO1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgfVxuICAgIFxuICAgIGlzU2VsZWN0ZWQob3B0aW9uOiBTZWxlY3RJdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLm11bHRpcGxlKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZEl0ZW1JbmRleChvcHRpb24pICE9IC0xO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMuZXF1YWxzKG9wdGlvbi52YWx1ZSwgdGhpcy52YWx1ZSwgdGhpcy5kYXRhS2V5KTtcbiAgICB9XG4gICAgXG4gICAgZmluZEl0ZW1JbmRleChvcHRpb246IFNlbGVjdEl0ZW0pIHtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy52YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlW2ldID09IG9wdGlvbi52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtTZWxlY3RCdXR0b25dLFxuICAgIGRlY2xhcmF0aW9uczogW1NlbGVjdEJ1dHRvbl1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0QnV0dG9uTW9kdWxlIHsgfVxuIl19