var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, AfterViewInit, AfterViewChecked, OnDestroy, Input, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { TerminalService } from './terminalservice';
let Terminal = class Terminal {
    constructor(el, terminalService) {
        this.el = el;
        this.terminalService = terminalService;
        this.commands = [];
        this.subscription = terminalService.responseHandler.subscribe(response => {
            this.commands[this.commands.length - 1].response = response;
            this.commandProcessed = true;
        });
    }
    ngAfterViewInit() {
        this.container = DomHandler.find(this.el.nativeElement, '.ui-terminal')[0];
    }
    ngAfterViewChecked() {
        if (this.commandProcessed) {
            this.container.scrollTop = this.container.scrollHeight;
            this.commandProcessed = false;
        }
    }
    set response(value) {
        if (value) {
            this.commands[this.commands.length - 1].response = value;
            this.commandProcessed = true;
        }
    }
    handleCommand(event) {
        if (event.keyCode == 13) {
            this.commands.push({ text: this.command });
            this.terminalService.sendCommand(this.command);
            this.command = '';
        }
    }
    focus(element) {
        element.focus();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
};
Terminal.ctorParameters = () => [
    { type: ElementRef },
    { type: TerminalService }
];
__decorate([
    Input()
], Terminal.prototype, "welcomeMessage", void 0);
__decorate([
    Input()
], Terminal.prototype, "prompt", void 0);
__decorate([
    Input()
], Terminal.prototype, "style", void 0);
__decorate([
    Input()
], Terminal.prototype, "styleClass", void 0);
__decorate([
    Input()
], Terminal.prototype, "response", null);
Terminal = __decorate([
    Component({
        selector: 'p-terminal',
        template: `
        <div [ngClass]="'ui-terminal ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass" (click)="focus(in)">
            <div *ngIf="welcomeMessage">{{welcomeMessage}}</div>
            <div class="ui-terminal-content">
                <div *ngFor="let command of commands">
                    <span>{{prompt}}</span>
                    <span class="ui-terminal-command">{{command.text}}</span>
                    <div>{{command.response}}</div>
                </div>
            </div>
            <div>
                <span class="ui-terminal-content-prompt">{{prompt}}</span>
                <input #in type="text" [(ngModel)]="command" class="ui-terminal-input" autocomplete="off" (keydown)="handleCommand($event)" autofocus>
            </div>
        </div>
    `
    })
], Terminal);
export { Terminal };
let TerminalModule = class TerminalModule {
};
TerminalModule = __decorate([
    NgModule({
        imports: [CommonModule, FormsModule],
        exports: [Terminal],
        declarations: [Terminal]
    })
], TerminalModule);
export { TerminalModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3Rlcm1pbmFsLyIsInNvdXJjZXMiOlsidGVybWluYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsYUFBYSxFQUFDLGdCQUFnQixFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFzQmxELElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUFvQmpCLFlBQW1CLEVBQWMsRUFBUyxlQUFnQztRQUF2RCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQVMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBVjFFLGFBQVEsR0FBVSxFQUFFLENBQUM7UUFXakIsSUFBSSxDQUFDLFlBQVksR0FBRyxlQUFlLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNyRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDNUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQztZQUN2RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUdELElBQUksUUFBUSxDQUFDLEtBQWE7UUFDdEIsSUFBSSxLQUFLLEVBQUU7WUFDUCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDekQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztTQUNoQztJQUNMLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBb0I7UUFDOUIsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUUsRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQW9CO1FBQ3RCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztDQUVKLENBQUE7O1lBNUMwQixVQUFVO1lBQTBCLGVBQWU7O0FBbEJqRTtJQUFSLEtBQUssRUFBRTtnREFBd0I7QUFFdkI7SUFBUixLQUFLLEVBQUU7d0NBQWdCO0FBRWY7SUFBUixLQUFLLEVBQUU7dUNBQVk7QUFFWDtJQUFSLEtBQUssRUFBRTs0Q0FBb0I7QUErQjVCO0lBREMsS0FBSyxFQUFFO3dDQU1QO0FBNUNRLFFBQVE7SUFuQnBCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0tBZVQ7S0FDSixDQUFDO0dBQ1csUUFBUSxDQWdFcEI7U0FoRVksUUFBUTtBQXVFckIsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztDQUFJLENBQUE7QUFBbEIsY0FBYztJQUwxQixRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsV0FBVyxDQUFDO1FBQ25DLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNuQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7S0FDM0IsQ0FBQztHQUNXLGNBQWMsQ0FBSTtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsQWZ0ZXJWaWV3SW5pdCxBZnRlclZpZXdDaGVja2VkLE9uRGVzdHJveSxJbnB1dCxFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtEb21IYW5kbGVyfSBmcm9tICdwcmltZW5nL2RvbSc7XG5pbXBvcnQge1Rlcm1pbmFsU2VydmljZX0gZnJvbSAnLi90ZXJtaW5hbHNlcnZpY2UnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259ICAgZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10ZXJtaW5hbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktdGVybWluYWwgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIChjbGljayk9XCJmb2N1cyhpbilcIj5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJ3ZWxjb21lTWVzc2FnZVwiPnt7d2VsY29tZU1lc3NhZ2V9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRlcm1pbmFsLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBjb21tYW5kIG9mIGNvbW1hbmRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7cHJvbXB0fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktdGVybWluYWwtY29tbWFuZFwiPnt7Y29tbWFuZC50ZXh0fX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e3tjb21tYW5kLnJlc3BvbnNlfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXRlcm1pbmFsLWNvbnRlbnQtcHJvbXB0XCI+e3twcm9tcHR9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI2luIHR5cGU9XCJ0ZXh0XCIgWyhuZ01vZGVsKV09XCJjb21tYW5kXCIgY2xhc3M9XCJ1aS10ZXJtaW5hbC1pbnB1dFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiIChrZXlkb3duKT1cImhhbmRsZUNvbW1hbmQoJGV2ZW50KVwiIGF1dG9mb2N1cz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRlcm1pbmFsIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCxBZnRlclZpZXdDaGVja2VkLE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSB3ZWxjb21lTWVzc2FnZTogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgcHJvbXB0OiBzdHJpbmc7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICAgICAgICAgIFxuICAgIGNvbW1hbmRzOiBhbnlbXSA9IFtdO1xuICAgIFxuICAgIGNvbW1hbmQ6IHN0cmluZztcbiAgICBcbiAgICBjb250YWluZXI6IEVsZW1lbnQ7XG4gICAgXG4gICAgY29tbWFuZFByb2Nlc3NlZDogYm9vbGVhbjtcbiAgICBcbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB0ZXJtaW5hbFNlcnZpY2U6IFRlcm1pbmFsU2VydmljZSkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRlcm1pbmFsU2VydmljZS5yZXNwb25zZUhhbmRsZXIuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZHNbdGhpcy5jb21tYW5kcy5sZW5ndGggLSAxXS5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kUHJvY2Vzc2VkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBEb21IYW5kbGVyLmZpbmQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnLnVpLXRlcm1pbmFsJylbMF07XG4gICAgfVxuICAgIFxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuY29tbWFuZFByb2Nlc3NlZCkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc2Nyb2xsVG9wID0gdGhpcy5jb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kUHJvY2Vzc2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgQElucHV0KClcbiAgICBzZXQgcmVzcG9uc2UodmFsdWU6IHN0cmluZykge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZHNbdGhpcy5jb21tYW5kcy5sZW5ndGggLSAxXS5yZXNwb25zZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kUHJvY2Vzc2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBoYW5kbGVDb21tYW5kKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRzLnB1c2goe3RleHQ6IHRoaXMuY29tbWFuZH0pO1xuICAgICAgICAgICAgdGhpcy50ZXJtaW5hbFNlcnZpY2Uuc2VuZENvbW1hbmQodGhpcy5jb21tYW5kKTtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZCA9ICcnO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZvY3VzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEZvcm1zTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbVGVybWluYWxdLFxuICAgIGRlY2xhcmF0aW9uczogW1Rlcm1pbmFsXVxufSlcbmV4cG9ydCBjbGFzcyBUZXJtaW5hbE1vZHVsZSB7IH0iXX0=