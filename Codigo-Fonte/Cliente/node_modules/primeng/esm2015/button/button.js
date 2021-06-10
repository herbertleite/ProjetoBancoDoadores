var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Directive, Component, ElementRef, EventEmitter, AfterViewInit, Output, OnDestroy, Input } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { CommonModule } from '@angular/common';
let ButtonDirective = class ButtonDirective {
    constructor(el) {
        this.el = el;
        this.iconPos = 'left';
        this.cornerStyleClass = 'ui-corner-all';
    }
    ngAfterViewInit() {
        DomHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
        if (this.icon) {
            let iconElement = document.createElement("span");
            iconElement.setAttribute("aria-hidden", "true");
            let iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
            iconElement.className = iconPosClass + ' ui-clickable ' + this.icon;
            this.el.nativeElement.appendChild(iconElement);
        }
        let labelElement = document.createElement("span");
        labelElement.className = 'ui-button-text ui-clickable';
        labelElement.appendChild(document.createTextNode(this.label || 'ui-btn'));
        this.el.nativeElement.appendChild(labelElement);
        this.initialized = true;
    }
    getStyleClass() {
        let styleClass = 'ui-button ui-widget ui-state-default ' + this.cornerStyleClass;
        if (this.icon) {
            if (this.label != null && this.label != undefined) {
                if (this.iconPos == 'left')
                    styleClass = styleClass + ' ui-button-text-icon-left';
                else
                    styleClass = styleClass + ' ui-button-text-icon-right';
            }
            else {
                styleClass = styleClass + ' ui-button-icon-only';
            }
        }
        else {
            if (this.label) {
                styleClass = styleClass + ' ui-button-text-only';
            }
            else {
                styleClass = styleClass + ' ui-button-text-empty';
            }
        }
        return styleClass;
    }
    get label() {
        return this._label;
    }
    set label(val) {
        this._label = val;
        if (this.initialized) {
            DomHandler.findSingle(this.el.nativeElement, '.ui-button-text').textContent = this._label;
            if (!this.icon) {
                if (this._label) {
                    DomHandler.removeClass(this.el.nativeElement, 'ui-button-text-empty');
                    DomHandler.addClass(this.el.nativeElement, 'ui-button-text-only');
                }
                else {
                    DomHandler.addClass(this.el.nativeElement, 'ui-button-text-empty');
                    DomHandler.removeClass(this.el.nativeElement, 'ui-button-text-only');
                }
            }
        }
    }
    get icon() {
        return this._icon;
    }
    set icon(val) {
        this._icon = val;
        if (this.initialized) {
            let iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
            DomHandler.findSingle(this.el.nativeElement, '.ui-clickable').className =
                iconPosClass + ' ui-clickable ' + this.icon;
        }
    }
    ngOnDestroy() {
        while (this.el.nativeElement.hasChildNodes()) {
            this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
        }
        this.initialized = false;
    }
};
ButtonDirective.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], ButtonDirective.prototype, "iconPos", void 0);
__decorate([
    Input()
], ButtonDirective.prototype, "cornerStyleClass", void 0);
__decorate([
    Input()
], ButtonDirective.prototype, "label", null);
__decorate([
    Input()
], ButtonDirective.prototype, "icon", null);
ButtonDirective = __decorate([
    Directive({
        selector: '[pButton]'
    })
], ButtonDirective);
export { ButtonDirective };
let Button = class Button {
    constructor() {
        this.iconPos = 'left';
        this.onClick = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onBlur = new EventEmitter();
    }
};
__decorate([
    Input()
], Button.prototype, "type", void 0);
__decorate([
    Input()
], Button.prototype, "iconPos", void 0);
__decorate([
    Input()
], Button.prototype, "icon", void 0);
__decorate([
    Input()
], Button.prototype, "label", void 0);
__decorate([
    Input()
], Button.prototype, "disabled", void 0);
__decorate([
    Input()
], Button.prototype, "style", void 0);
__decorate([
    Input()
], Button.prototype, "styleClass", void 0);
__decorate([
    Output()
], Button.prototype, "onClick", void 0);
__decorate([
    Output()
], Button.prototype, "onFocus", void 0);
__decorate([
    Output()
], Button.prototype, "onBlur", void 0);
Button = __decorate([
    Component({
        selector: 'p-button',
        template: `
        <button [attr.type]="type" [class]="styleClass" [ngStyle]="style" [disabled]="disabled"
            [ngClass]="{'ui-button ui-widget ui-state-default ui-corner-all':true,
                        'ui-button-icon-only': (icon && !label),
                        'ui-button-text-icon-left': (icon && label && iconPos === 'left'),
                        'ui-button-text-icon-right': (icon && label && iconPos === 'right'),
                        'ui-button-text-only': (!icon && label),
                        'ui-button-text-empty': (!icon && !label),
                        'ui-state-disabled': disabled}"
                        (click)="onClick.emit($event)" (focus)="onFocus.emit($event)" (blur)="onBlur.emit($event)">
            <ng-content></ng-content>
            <span [ngClass]="{'ui-clickable': true,
                        'ui-button-icon-left': (iconPos === 'left'), 
                        'ui-button-icon-right': (iconPos === 'right')}"
                        [class]="icon" *ngIf="icon"></span>
            <span class="ui-button-text ui-clickable">{{label||'ui-btn'}}</span>
        </button>
    `
    })
], Button);
export { Button };
let ButtonModule = class ButtonModule {
};
ButtonModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [ButtonDirective, Button],
        declarations: [ButtonDirective, Button]
    })
], ButtonModule);
export { ButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9idXR0b24vIiwic291cmNlcyI6WyJidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3hILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBSzdDLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFZeEIsWUFBbUIsRUFBYztRQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFWeEIsWUFBTyxHQUFxQixNQUFNLENBQUM7UUFFbkMscUJBQWdCLEdBQVcsZUFBZSxDQUFDO0lBUWhCLENBQUM7SUFFckMsZUFBZTtRQUNYLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUMzRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELFdBQVcsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELElBQUksWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUEsQ0FBQyxDQUFDLHFCQUFxQixDQUFDO1lBQzdGLFdBQVcsQ0FBQyxTQUFTLEdBQUcsWUFBWSxHQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxh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QUFULE1BQU0sRUFBRTt1Q0FBaUQ7QUFFaEQ7SUFBVCxNQUFNLEVBQUU7dUNBQWlEO0FBRWhEO0lBQVQsTUFBTSxFQUFFO3NDQUFnRDtBQXBCaEQsTUFBTTtJQXJCbEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztLQWlCVDtLQUNKLENBQUM7R0FDVyxNQUFNLENBcUJsQjtTQXJCWSxNQUFNO0FBNEJuQixJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0NBQUksQ0FBQTtBQUFoQixZQUFZO0lBTHhCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUMsTUFBTSxDQUFDO1FBQ2pDLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBQyxNQUFNLENBQUM7S0FDekMsQ0FBQztHQUNXLFlBQVksQ0FBSTtTQUFoQixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxEaXJlY3RpdmUsQ29tcG9uZW50LEVsZW1lbnRSZWYsRXZlbnRFbWl0dGVyLEFmdGVyVmlld0luaXQsT3V0cHV0LE9uRGVzdHJveSxJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twQnV0dG9uXSdcbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGljb25Qb3M6ICdsZWZ0JyB8ICdyaWdodCcgPSAnbGVmdCc7XG4gICAgXG4gICAgQElucHV0KCkgY29ybmVyU3R5bGVDbGFzczogc3RyaW5nID0gJ3VpLWNvcm5lci1hbGwnO1xuICAgICAgICBcbiAgICBwdWJsaWMgX2xhYmVsOiBzdHJpbmc7XG4gICAgXG4gICAgcHVibGljIF9pY29uOiBzdHJpbmc7XG4gICAgICAgICAgICBcbiAgICBwdWJsaWMgaW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHt9XG4gICAgXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBEb21IYW5kbGVyLmFkZE11bHRpcGxlQ2xhc3Nlcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZ2V0U3R5bGVDbGFzcygpKTtcbiAgICAgICAgaWYgKHRoaXMuaWNvbikge1xuICAgICAgICAgICAgbGV0IGljb25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBpY29uRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XG4gICAgICAgICAgICBsZXQgaWNvblBvc0NsYXNzID0gKHRoaXMuaWNvblBvcyA9PSAncmlnaHQnKSA/ICd1aS1idXR0b24taWNvbi1yaWdodCc6ICd1aS1idXR0b24taWNvbi1sZWZ0JztcbiAgICAgICAgICAgIGljb25FbGVtZW50LmNsYXNzTmFtZSA9IGljb25Qb3NDbGFzcyAgKyAnIHVpLWNsaWNrYWJsZSAnICsgdGhpcy5pY29uO1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKGljb25FbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbGV0IGxhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBsYWJlbEVsZW1lbnQuY2xhc3NOYW1lID0gJ3VpLWJ1dHRvbi10ZXh0IHVpLWNsaWNrYWJsZSc7XG4gICAgICAgIGxhYmVsRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0aGlzLmxhYmVsfHwndWktYnRuJykpO1xuICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQobGFiZWxFbGVtZW50KTtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICAgICAgICBcbiAgICBnZXRTdHlsZUNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzdHlsZUNsYXNzID0gJ3VpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCAnICsgdGhpcy5jb3JuZXJTdHlsZUNsYXNzO1xuICAgICAgICBpZiAodGhpcy5pY29uKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5sYWJlbCAhPSBudWxsICYmIHRoaXMubGFiZWwgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaWNvblBvcyA9PSAnbGVmdCcpXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlQ2xhc3MgPSBzdHlsZUNsYXNzICsgJyB1aS1idXR0b24tdGV4dC1pY29uLWxlZnQnO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVDbGFzcyA9IHN0eWxlQ2xhc3MgKyAnIHVpLWJ1dHRvbi10ZXh0LWljb24tcmlnaHQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgc3R5bGVDbGFzcyA9IHN0eWxlQ2xhc3MgKyAnIHVpLWJ1dHRvbi1pY29uLW9ubHknO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBzdHlsZUNsYXNzID0gc3R5bGVDbGFzcyArICcgdWktYnV0dG9uLXRleHQtb25seSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHlsZUNsYXNzID0gc3R5bGVDbGFzcyArICcgdWktYnV0dG9uLXRleHQtZW1wdHknO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gc3R5bGVDbGFzcztcbiAgICB9XG4gICAgXG4gICAgQElucHV0KCkgZ2V0IGxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYWJlbDtcbiAgICB9XG5cbiAgICBzZXQgbGFiZWwodmFsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbGFiZWwgPSB2YWw7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy51aS1idXR0b24tdGV4dCcpLnRleHRDb250ZW50ID0gdGhpcy5fbGFiZWw7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pY29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2xhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWktYnV0dG9uLXRleHQtZW1wdHknKTtcbiAgICAgICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICd1aS1idXR0b24tdGV4dC1vbmx5Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3VpLWJ1dHRvbi10ZXh0LWVtcHR5Jyk7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCAndWktYnV0dG9uLXRleHQtb25seScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBASW5wdXQoKSBnZXQgaWNvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faWNvbjtcbiAgICB9XG5cbiAgICBzZXQgaWNvbih2YWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9pY29uID0gdmFsO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgIGxldCBpY29uUG9zQ2xhc3MgPSAodGhpcy5pY29uUG9zID09ICdyaWdodCcpID8gJ3VpLWJ1dHRvbi1pY29uLXJpZ2h0JzogJ3VpLWJ1dHRvbi1pY29uLWxlZnQnO1xuICAgICAgICAgICAgRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJy51aS1jbGlja2FibGUnKS5jbGFzc05hbWUgPVxuICAgICAgICAgICAgICAgIGljb25Qb3NDbGFzcyArICcgdWktY2xpY2thYmxlICcgKyB0aGlzLmljb247XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgIFxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB3aGlsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50Lmxhc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1idXR0b24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxidXR0b24gW2F0dHIudHlwZV09XCJ0eXBlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLWJ1dHRvbiB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsJzp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1pY29uLW9ubHknOiAoaWNvbiAmJiAhbGFiZWwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi10ZXh0LWljb24tbGVmdCc6IChpY29uICYmIGxhYmVsICYmIGljb25Qb3MgPT09ICdsZWZ0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLXRleHQtaWNvbi1yaWdodCc6IChpY29uICYmIGxhYmVsICYmIGljb25Qb3MgPT09ICdyaWdodCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi10ZXh0LW9ubHknOiAoIWljb24gJiYgbGFiZWwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi10ZXh0LWVtcHR5JzogKCFpY29uICYmICFsYWJlbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktc3RhdGUtZGlzYWJsZWQnOiBkaXNhYmxlZH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2suZW1pdCgkZXZlbnQpXCIgKGZvY3VzKT1cIm9uRm9jdXMuZW1pdCgkZXZlbnQpXCIgKGJsdXIpPVwib25CbHVyLmVtaXQoJGV2ZW50KVwiPlxuICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPHNwYW4gW25nQ2xhc3NdPVwieyd1aS1jbGlja2FibGUnOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi1pY29uLWxlZnQnOiAoaWNvblBvcyA9PT0gJ2xlZnQnKSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAndWktYnV0dG9uLWljb24tcmlnaHQnOiAoaWNvblBvcyA9PT0gJ3JpZ2h0Jyl9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjbGFzc109XCJpY29uXCIgKm5nSWY9XCJpY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1idXR0b24tdGV4dCB1aS1jbGlja2FibGVcIj57e2xhYmVsfHwndWktYnRuJ319PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbiB7XG5cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpY29uUG9zOiBzdHJpbmcgPSAnbGVmdCc7XG5cbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQE91dHB1dCgpIG9uQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uRm9jdXM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQmx1cjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0J1dHRvbkRpcmVjdGl2ZSxCdXR0b25dLFxuICAgIGRlY2xhcmF0aW9uczogW0J1dHRvbkRpcmVjdGl2ZSxCdXR0b25dXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbk1vZHVsZSB7IH1cbiJdfQ==