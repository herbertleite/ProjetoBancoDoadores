import { Subject } from 'rxjs';
var DynamicDialogRef = /** @class */ (function () {
    function DynamicDialogRef() {
        this._onClose = new Subject();
        this.onClose = this._onClose.asObservable();
    }
    DynamicDialogRef.prototype.close = function (result) {
        this._onClose.next(result);
    };
    return DynamicDialogRef;
}());
export { DynamicDialogRef };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY2RpYWxvZy1yZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL2R5bmFtaWNkaWFsb2cvIiwic291cmNlcyI6WyJkeW5hbWljZGlhbG9nLXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDO0lBQ0M7UUFNaUIsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFDL0MsWUFBTyxHQUFvQixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBUHhDLENBQUM7SUFFakIsZ0NBQUssR0FBTCxVQUFNLE1BQVk7UUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUlGLHVCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgRHluYW1pY0RpYWxvZ1JlZiB7XHJcblx0Y29uc3RydWN0b3IoKSB7IH1cclxuXHJcblx0Y2xvc2UocmVzdWx0PzogYW55KSB7XHJcblx0XHR0aGlzLl9vbkNsb3NlLm5leHQocmVzdWx0KTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgcmVhZG9ubHkgX29uQ2xvc2UgPSBuZXcgU3ViamVjdDxhbnk+KCk7XHJcblx0b25DbG9zZTogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fb25DbG9zZS5hc09ic2VydmFibGUoKTtcclxufVxyXG4iXX0=