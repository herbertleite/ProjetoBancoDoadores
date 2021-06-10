(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/button'), require('primeng/dom'), require('primeng/api'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('primeng/calendar', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/button', 'primeng/dom', 'primeng/api', '@angular/forms'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.calendar = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.button, global.primeng.dom, global.primeng.api, global.ng.forms));
}(this, (function (exports, core, animations, common, button, dom, api, forms) { 'use strict';

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
    var __values = (this && this.__values) || function(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var CALENDAR_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return Calendar; }),
        multi: true
    };
    var Calendar = /** @class */ (function () {
        function Calendar(el, renderer, cd, zone) {
            this.el = el;
            this.renderer = renderer;
            this.cd = cd;
            this.zone = zone;
            this.dateFormat = 'mm/dd/yy';
            this.multipleSeparator = ',';
            this.rangeSeparator = '-';
            this.inline = false;
            this.showOtherMonths = true;
            this.icon = 'pi pi-calendar';
            this.shortYearCutoff = '+10';
            this.hourFormat = '24';
            this.stepHour = 1;
            this.stepMinute = 1;
            this.stepSecond = 1;
            this.showSeconds = false;
            this.showOnFocus = true;
            this.showWeek = false;
            this.dataType = 'date';
            this.selectionMode = 'single';
            this.todayButtonStyleClass = 'ui-button-secondary';
            this.clearButtonStyleClass = 'ui-button-secondary';
            this.autoZIndex = true;
            this.baseZIndex = 0;
            this.keepInvalid = false;
            this.hideOnDateTimeSelect = false;
            this.numberOfMonths = 1;
            this.view = 'date';
            this.timeSeparator = ":";
            this.showTransitionOptions = '225ms ease-out';
            this.hideTransitionOptions = '195ms ease-in';
            this.onFocus = new core.EventEmitter();
            this.onBlur = new core.EventEmitter();
            this.onClose = new core.EventEmitter();
            this.onSelect = new core.EventEmitter();
            this.onInput = new core.EventEmitter();
            this.onTodayClick = new core.EventEmitter();
            this.onClearClick = new core.EventEmitter();
            this.onMonthChange = new core.EventEmitter();
            this.onYearChange = new core.EventEmitter();
            this.onClickOutside = new core.EventEmitter();
            this.onShow = new core.EventEmitter();
            this._locale = {
                firstDayOfWeek: 0,
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                today: 'Today',
                clear: 'Clear',
                dateFormat: 'mm/dd/yy',
                weekHeader: 'Wk'
            };
            this.onModelChange = function () { };
            this.onModelTouched = function () { };
            this.inputFieldValue = null;
            this.navigationState = null;
        }
        Object.defineProperty(Calendar.prototype, "content", {
            set: function (content) {
                var _this = this;
                this.contentViewChild = content;
                if (this.contentViewChild) {
                    if (this.isMonthNavigate) {
                        Promise.resolve(null).then(function () { return _this.updateFocus(); });
                        this.isMonthNavigate = false;
                    }
                    else {
                        this.initFocusableCell();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Calendar.prototype, "minDate", {
            get: function () {
                return this._minDate;
            },
            set: function (date) {
                this._minDate = date;
                if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                    this.createMonths(this.currentMonth, this.currentYear);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "maxDate", {
            get: function () {
                return this._maxDate;
            },
            set: function (date) {
                this._maxDate = date;
                if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                    this.createMonths(this.currentMonth, this.currentYear);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "disabledDates", {
            get: function () {
                return this._disabledDates;
            },
            set: function (disabledDates) {
                this._disabledDates = disabledDates;
                if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                    this.createMonths(this.currentMonth, this.currentYear);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "disabledDays", {
            get: function () {
                return this._disabledDays;
            },
            set: function (disabledDays) {
                this._disabledDays = disabledDays;
                if (this.currentMonth != undefined && this.currentMonth != null && this.currentYear) {
                    this.createMonths(this.currentMonth, this.currentYear);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "yearRange", {
            get: function () {
                return this._yearRange;
            },
            set: function (yearRange) {
                this._yearRange = yearRange;
                if (yearRange) {
                    var years = yearRange.split(':');
                    var yearStart = parseInt(years[0]);
                    var yearEnd = parseInt(years[1]);
                    this.populateYearOptions(yearStart, yearEnd);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "showTime", {
            get: function () {
                return this._showTime;
            },
            set: function (showTime) {
                this._showTime = showTime;
                if (this.currentHour === undefined) {
                    this.initTime(this.value || new Date());
                }
                this.updateInputfield();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Calendar.prototype, "locale", {
            get: function () {
                return this._locale;
            },
            set: function (newLocale) {
                this._locale = newLocale;
                if (this.view === 'date') {
                    this.createWeekDays();
                    this.createMonths(this.currentMonth, this.currentYear);
                }
                else if (this.view === 'month') {
                    this.createMonthPickerValues();
                }
            },
            enumerable: true,
            configurable: true
        });
        Calendar.prototype.ngOnInit = function () {
            var date = this.defaultDate || new Date();
            this.currentMonth = date.getMonth();
            this.currentYear = date.getFullYear();
            if (this.view === 'date') {
                this.createWeekDays();
                this.initTime(date);
                this.createMonths(this.currentMonth, this.currentYear);
                this.ticksTo1970 = (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000);
            }
            else if (this.view === 'month') {
                this.createMonthPickerValues();
            }
        };
        Calendar.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'date':
                        _this.dateTemplate = item.template;
                        break;
                    default:
                        _this.dateTemplate = item.template;
                        break;
                }
            });
        };
        Calendar.prototype.populateYearOptions = function (start, end) {
            this.yearOptions = [];
            for (var i = start; i <= end; i++) {
                this.yearOptions.push(i);
            }
        };
        Calendar.prototype.createWeekDays = function () {
            this.weekDays = [];
            var dayIndex = this.locale.firstDayOfWeek;
            for (var i = 0; i < 7; i++) {
                this.weekDays.push(this.locale.dayNamesMin[dayIndex]);
                dayIndex = (dayIndex == 6) ? 0 : ++dayIndex;
            }
        };
        Calendar.prototype.createMonthPickerValues = function () {
            this.monthPickerValues = [];
            for (var i = 0; i <= 11; i++) {
                this.monthPickerValues.push(this.locale.monthNamesShort[i]);
            }
        };
        Calendar.prototype.createMonths = function (month, year) {
            this.months = this.months = [];
            for (var i = 0; i < this.numberOfMonths; i++) {
                var m = month + i;
                var y = year;
                if (m > 11) {
                    m = m % 11 - 1;
                    y = year + 1;
                }
                this.months.push(this.createMonth(m, y));
            }
        };
        Calendar.prototype.getWeekNumber = function (date) {
            var checkDate = new Date(date.getTime());
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            checkDate.setMonth(0);
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
        };
        Calendar.prototype.createMonth = function (month, year) {
            var dates = [];
            var firstDay = this.getFirstDayOfMonthIndex(month, year);
            var daysLength = this.getDaysCountInMonth(month, year);
            var prevMonthDaysLength = this.getDaysCountInPrevMonth(month, year);
            var dayNo = 1;
            var today = new Date();
            var weekNumbers = [];
            var monthRows = Math.ceil((daysLength + firstDay) / 7);
            for (var i = 0; i < monthRows; i++) {
                var week = [];
                if (i == 0) {
                    for (var j = (prevMonthDaysLength - firstDay + 1); j <= prevMonthDaysLength; j++) {
                        var prev = this.getPreviousMonthAndYear(month, year);
                        week.push({ day: j, month: prev.month, year: prev.year, otherMonth: true,
                            today: this.isToday(today, j, prev.month, prev.year), selectable: this.isSelectable(j, prev.month, prev.year, true) });
                    }
                    var remainingDaysLength = 7 - week.length;
                    for (var j = 0; j < remainingDaysLength; j++) {
                        week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                            selectable: this.isSelectable(dayNo, month, year, false) });
                        dayNo++;
                    }
                }
                else {
                    for (var j = 0; j < 7; j++) {
                        if (dayNo > daysLength) {
                            var next = this.getNextMonthAndYear(month, year);
                            week.push({ day: dayNo - daysLength, month: next.month, year: next.year, otherMonth: true,
                                today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                                selectable: this.isSelectable((dayNo - daysLength), next.month, next.year, true) });
                        }
                        else {
                            week.push({ day: dayNo, month: month, year: year, today: this.isToday(today, dayNo, month, year),
                                selectable: this.isSelectable(dayNo, month, year, false) });
                        }
                        dayNo++;
                    }
                }
                if (this.showWeek) {
                    weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
                }
                dates.push(week);
            }
            return {
                month: month,
                year: year,
                dates: dates,
                weekNumbers: weekNumbers
            };
        };
        Calendar.prototype.initTime = function (date) {
            this.pm = date.getHours() > 11;
            if (this.showTime) {
                this.currentMinute = date.getMinutes();
                this.currentSecond = date.getSeconds();
                if (this.hourFormat == '12')
                    this.currentHour = date.getHours() == 0 ? 12 : date.getHours() % 12;
                else
                    this.currentHour = date.getHours();
            }
            else if (this.timeOnly) {
                this.currentMinute = 0;
                this.currentHour = 0;
                this.currentSecond = 0;
            }
        };
        Calendar.prototype.navBackward = function (event) {
            var _this = this;
            event.stopPropagation();
            if (this.disabled) {
                event.preventDefault();
                return;
            }
            this.isMonthNavigate = true;
            if (this.view === 'month') {
                this.decrementYear();
                setTimeout(function () {
                    _this.updateFocus();
                }, 1);
            }
            else {
                if (this.currentMonth === 0) {
                    this.currentMonth = 11;
                    this.decrementYear();
                }
                else {
                    this.currentMonth--;
                }
                this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
                this.createMonths(this.currentMonth, this.currentYear);
            }
        };
        Calendar.prototype.navForward = function (event) {
            var _this = this;
            event.stopPropagation();
            if (this.disabled) {
                event.preventDefault();
                return;
            }
            this.isMonthNavigate = true;
            if (this.view === 'month') {
                this.incrementYear();
                setTimeout(function () {
                    _this.updateFocus();
                }, 1);
            }
            else {
                if (this.currentMonth === 11) {
                    this.currentMonth = 0;
                    this.incrementYear();
                }
                else {
                    this.currentMonth++;
                }
                this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
                this.createMonths(this.currentMonth, this.currentYear);
            }
        };
        Calendar.prototype.decrementYear = function () {
            this.currentYear--;
            if (this.yearNavigator && this.currentYear < this.yearOptions[0]) {
                var difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
                this.populateYearOptions(this.yearOptions[0] - difference, this.yearOptions[this.yearOptions.length - 1] - difference);
            }
        };
        Calendar.prototype.incrementYear = function () {
            this.currentYear++;
            if (this.yearNavigator && this.currentYear > this.yearOptions[this.yearOptions.length - 1]) {
                var difference = this.yearOptions[this.yearOptions.length - 1] - this.yearOptions[0];
                this.populateYearOptions(this.yearOptions[0] + difference, this.yearOptions[this.yearOptions.length - 1] + difference);
            }
        };
        Calendar.prototype.onDateSelect = function (event, dateMeta) {
            var _this = this;
            if (this.disabled || !dateMeta.selectable) {
                event.preventDefault();
                return;
            }
            if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
                this.value = this.value.filter(function (date, i) {
                    return !_this.isDateEquals(date, dateMeta);
                });
                this.updateModel(this.value);
            }
            else {
                if (this.shouldSelectDate(dateMeta)) {
                    if (dateMeta.otherMonth) {
                        this.currentMonth = dateMeta.month;
                        this.currentYear = dateMeta.year;
                        this.createMonths(this.currentMonth, this.currentYear);
                        this.selectDate(dateMeta);
                    }
                    else {
                        this.selectDate(dateMeta);
                    }
                }
            }
            if (this.isSingleSelection() && (!this.showTime || this.hideOnDateTimeSelect)) {
                setTimeout(function () {
                    event.preventDefault();
                    _this.hideOverlay();
                    if (_this.mask) {
                        _this.disableModality();
                    }
                    _this.cd.markForCheck();
                }, 150);
            }
            this.updateInputfield();
            event.preventDefault();
        };
        Calendar.prototype.shouldSelectDate = function (dateMeta) {
            if (this.isMultipleSelection())
                return this.maxDateCount != null ? this.maxDateCount > (this.value ? this.value.length : 0) : true;
            else
                return true;
        };
        Calendar.prototype.onMonthSelect = function (event, index) {
            if (!dom.DomHandler.hasClass(event.target, 'ui-state-disabled')) {
                this.onDateSelect(event, { year: this.currentYear, month: index, day: 1, selectable: true });
            }
        };
        Calendar.prototype.updateInputfield = function () {
            var formattedValue = '';
            if (this.value) {
                if (this.isSingleSelection()) {
                    formattedValue = this.formatDateTime(this.value);
                }
                else if (this.isMultipleSelection()) {
                    for (var i = 0; i < this.value.length; i++) {
                        var dateAsString = this.formatDateTime(this.value[i]);
                        formattedValue += dateAsString;
                        if (i !== (this.value.length - 1)) {
                            formattedValue += this.multipleSeparator + ' ';
                        }
                    }
                }
                else if (this.isRangeSelection()) {
                    if (this.value && this.value.length) {
                        var startDate = this.value[0];
                        var endDate = this.value[1];
                        formattedValue = this.formatDateTime(startDate);
                        if (endDate) {
                            formattedValue += ' ' + this.rangeSeparator + ' ' + this.formatDateTime(endDate);
                        }
                    }
                }
            }
            this.inputFieldValue = formattedValue;
            this.updateFilledState();
            if (this.inputfieldViewChild && this.inputfieldViewChild.nativeElement) {
                this.inputfieldViewChild.nativeElement.value = this.inputFieldValue;
            }
        };
        Calendar.prototype.formatDateTime = function (date) {
            var formattedValue = null;
            if (date) {
                if (this.timeOnly) {
                    formattedValue = this.formatTime(date);
                }
                else {
                    formattedValue = this.formatDate(date, this.getDateFormat());
                    if (this.showTime) {
                        formattedValue += ' ' + this.formatTime(date);
                    }
                }
            }
            return formattedValue;
        };
        Calendar.prototype.selectDate = function (dateMeta) {
            var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
            if (this.showTime) {
                if (this.hourFormat == '12') {
                    if (this.currentHour === 12)
                        date.setHours(this.pm ? 12 : 0);
                    else
                        date.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
                }
                else {
                    date.setHours(this.currentHour);
                }
                date.setMinutes(this.currentMinute);
                date.setSeconds(this.currentSecond);
            }
            if (this.minDate && this.minDate > date) {
                date = this.minDate;
                this.currentHour = date.getHours();
                this.currentMinute = date.getMinutes();
                this.currentSecond = date.getSeconds();
            }
            if (this.maxDate && this.maxDate < date) {
                date = this.maxDate;
                this.currentHour = date.getHours();
                this.currentMinute = date.getMinutes();
                this.currentSecond = date.getSeconds();
            }
            if (this.isSingleSelection()) {
                this.updateModel(date);
            }
            else if (this.isMultipleSelection()) {
                this.updateModel(this.value ? __spread(this.value, [date]) : [date]);
            }
            else if (this.isRangeSelection()) {
                if (this.value && this.value.length) {
                    var startDate = this.value[0];
                    var endDate = this.value[1];
                    if (!endDate && date.getTime() >= startDate.getTime()) {
                        endDate = date;
                    }
                    else {
                        startDate = date;
                        endDate = null;
                    }
                    this.updateModel([startDate, endDate]);
                }
                else {
                    this.updateModel([date, null]);
                }
            }
            this.onSelect.emit(date);
        };
        Calendar.prototype.updateModel = function (value) {
            var _this = this;
            this.value = value;
            if (this.dataType == 'date') {
                this.onModelChange(this.value);
            }
            else if (this.dataType == 'string') {
                if (this.isSingleSelection()) {
                    this.onModelChange(this.formatDateTime(this.value));
                }
                else {
                    var stringArrValue = null;
                    if (this.value) {
                        stringArrValue = this.value.map(function (date) { return _this.formatDateTime(date); });
                    }
                    this.onModelChange(stringArrValue);
                }
            }
        };
        Calendar.prototype.getFirstDayOfMonthIndex = function (month, year) {
            var day = new Date();
            day.setDate(1);
            day.setMonth(month);
            day.setFullYear(year);
            var dayIndex = day.getDay() + this.getSundayIndex();
            return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
        };
        Calendar.prototype.getDaysCountInMonth = function (month, year) {
            return 32 - this.daylightSavingAdjust(new Date(year, month, 32)).getDate();
        };
        Calendar.prototype.getDaysCountInPrevMonth = function (month, year) {
            var prev = this.getPreviousMonthAndYear(month, year);
            return this.getDaysCountInMonth(prev.month, prev.year);
        };
        Calendar.prototype.getPreviousMonthAndYear = function (month, year) {
            var m, y;
            if (month === 0) {
                m = 11;
                y = year - 1;
            }
            else {
                m = month - 1;
                y = year;
            }
            return { 'month': m, 'year': y };
        };
        Calendar.prototype.getNextMonthAndYear = function (month, year) {
            var m, y;
            if (month === 11) {
                m = 0;
                y = year + 1;
            }
            else {
                m = month + 1;
                y = year;
            }
            return { 'month': m, 'year': y };
        };
        Calendar.prototype.getSundayIndex = function () {
            return this.locale.firstDayOfWeek > 0 ? 7 - this.locale.firstDayOfWeek : 0;
        };
        Calendar.prototype.isSelected = function (dateMeta) {
            var e_1, _a;
            if (this.value) {
                if (this.isSingleSelection()) {
                    return this.isDateEquals(this.value, dateMeta);
                }
                else if (this.isMultipleSelection()) {
                    var selected = false;
                    try {
                        for (var _b = __values(this.value), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var date = _c.value;
                            selected = this.isDateEquals(date, dateMeta);
                            if (selected) {
                                break;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return selected;
                }
                else if (this.isRangeSelection()) {
                    if (this.value[1])
                        return this.isDateEquals(this.value[0], dateMeta) || this.isDateEquals(this.value[1], dateMeta) || this.isDateBetween(this.value[0], this.value[1], dateMeta);
                    else
                        return this.isDateEquals(this.value[0], dateMeta);
                }
            }
            else {
                return false;
            }
        };
        Calendar.prototype.isMonthSelected = function (month) {
            var day = this.value ? (Array.isArray(this.value) ? this.value[0].getDate() : this.value.getDate()) : 1;
            return this.isSelected({ year: this.currentYear, month: month, day: day, selectable: true });
        };
        Calendar.prototype.isDateEquals = function (value, dateMeta) {
            if (value)
                return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
            else
                return false;
        };
        Calendar.prototype.isDateBetween = function (start, end, dateMeta) {
            var between = false;
            if (start && end) {
                var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
                return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
            }
            return between;
        };
        Calendar.prototype.isSingleSelection = function () {
            return this.selectionMode === 'single';
        };
        Calendar.prototype.isRangeSelection = function () {
            return this.selectionMode === 'range';
        };
        Calendar.prototype.isMultipleSelection = function () {
            return this.selectionMode === 'multiple';
        };
        Calendar.prototype.isToday = function (today, day, month, year) {
            return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
        };
        Calendar.prototype.isSelectable = function (day, month, year, otherMonth) {
            var validMin = true;
            var validMax = true;
            var validDate = true;
            var validDay = true;
            if (otherMonth && !this.selectOtherMonths) {
                return false;
            }
            if (this.minDate) {
                if (this.minDate.getFullYear() > year) {
                    validMin = false;
                }
                else if (this.minDate.getFullYear() === year) {
                    if (this.minDate.getMonth() > month) {
                        validMin = false;
                    }
                    else if (this.minDate.getMonth() === month) {
                        if (this.minDate.getDate() > day) {
                            validMin = false;
                        }
                    }
                }
            }
            if (this.maxDate) {
                if (this.maxDate.getFullYear() < year) {
                    validMax = false;
                }
                else if (this.maxDate.getFullYear() === year) {
                    if (this.maxDate.getMonth() < month) {
                        validMax = false;
                    }
                    else if (this.maxDate.getMonth() === month) {
                        if (this.maxDate.getDate() < day) {
                            validMax = false;
                        }
                    }
                }
            }
            if (this.disabledDates) {
                validDate = !this.isDateDisabled(day, month, year);
            }
            if (this.disabledDays) {
                validDay = !this.isDayDisabled(day, month, year);
            }
            return validMin && validMax && validDate && validDay;
        };
        Calendar.prototype.isDateDisabled = function (day, month, year) {
            var e_2, _a;
            if (this.disabledDates) {
                try {
                    for (var _b = __values(this.disabledDates), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var disabledDate = _c.value;
                        if (disabledDate.getFullYear() === year && disabledDate.getMonth() === month && disabledDate.getDate() === day) {
                            return true;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            return false;
        };
        Calendar.prototype.isDayDisabled = function (day, month, year) {
            if (this.disabledDays) {
                var weekday = new Date(year, month, day);
                var weekdayNumber = weekday.getDay();
                return this.disabledDays.indexOf(weekdayNumber) !== -1;
            }
            return false;
        };
        Calendar.prototype.onInputFocus = function (event) {
            this.focus = true;
            if (this.showOnFocus) {
                this.showOverlay();
            }
            this.onFocus.emit(event);
        };
        Calendar.prototype.onInputClick = function (event) {
            if (this.overlay && this.autoZIndex) {
                this.overlay.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
            }
            if (this.showOnFocus && !this.overlayVisible) {
                this.showOverlay();
            }
        };
        Calendar.prototype.onInputBlur = function (event) {
            this.focus = false;
            this.onBlur.emit(event);
            if (!this.keepInvalid) {
                this.updateInputfield();
            }
            this.onModelTouched();
        };
        Calendar.prototype.onButtonClick = function (event, inputfield) {
            if (!this.overlayVisible) {
                inputfield.focus();
                this.showOverlay();
            }
            else {
                this.hideOverlay();
            }
        };
        Calendar.prototype.onPrevButtonClick = function (event) {
            this.navigationState = { backward: true, button: true };
            this.navBackward(event);
        };
        Calendar.prototype.onNextButtonClick = function (event) {
            this.navigationState = { backward: false, button: true };
            this.navForward(event);
        };
        Calendar.prototype.onContainerButtonKeydown = function (event) {
            switch (event.which) {
                //tab
                case 9:
                    if (!this.inline) {
                        this.trapFocus(event);
                    }
                    break;
                //escape
                case 27:
                    this.overlayVisible = false;
                    event.preventDefault();
                    break;
                default:
                    //Noop
                    break;
            }
        };
        Calendar.prototype.onInputKeydown = function (event) {
            this.isKeydown = true;
            if (event.keyCode === 9 && this.contentViewChild) {
                this.trapFocus(event);
            }
            else if (event.keyCode === 27) {
                if (this.overlayVisible) {
                    this.overlayVisible = false;
                    event.preventDefault();
                }
            }
        };
        Calendar.prototype.onDateCellKeydown = function (event, date, groupIndex) {
            var cellContent = event.currentTarget;
            var cell = cellContent.parentElement;
            switch (event.which) {
                //down arrow
                case 40: {
                    cellContent.tabIndex = '-1';
                    var cellIndex = dom.DomHandler.index(cell);
                    var nextRow = cell.parentElement.nextElementSibling;
                    if (nextRow) {
                        var focusCell = nextRow.children[cellIndex].children[0];
                        if (dom.DomHandler.hasClass(focusCell, 'ui-state-disabled')) {
                            this.navigationState = { backward: false };
                            this.navForward(event);
                        }
                        else {
                            nextRow.children[cellIndex].children[0].tabIndex = '0';
                            nextRow.children[cellIndex].children[0].focus();
                        }
                    }
                    else {
                        this.navigationState = { backward: false };
                        this.navForward(event);
                    }
                    event.preventDefault();
                    break;
                }
                //up arrow
                case 38: {
                    cellContent.tabIndex = '-1';
                    var cellIndex = dom.DomHandler.index(cell);
                    var prevRow = cell.parentElement.previousElementSibling;
                    if (prevRow) {
                        var focusCell = prevRow.children[cellIndex].children[0];
                        if (dom.DomHandler.hasClass(focusCell, 'ui-state-disabled')) {
                            this.navigationState = { backward: true };
                            this.navBackward(event);
                        }
                        else {
                            focusCell.tabIndex = '0';
                            focusCell.focus();
                        }
                    }
                    else {
                        this.navigationState = { backward: true };
                        this.navBackward(event);
                    }
                    event.preventDefault();
                    break;
                }
                //left arrow
                case 37: {
                    cellContent.tabIndex = '-1';
                    var prevCell = cell.previousElementSibling;
                    if (prevCell) {
                        var focusCell = prevCell.children[0];
                        if (dom.DomHandler.hasClass(focusCell, 'ui-state-disabled') || dom.DomHandler.hasClass(focusCell.parentElement, 'ui-datepicker-weeknumber')) {
                            this.navigateToMonth(true, groupIndex);
                        }
                        else {
                            focusCell.tabIndex = '0';
                            focusCell.focus();
                        }
                    }
                    else {
                        this.navigateToMonth(true, groupIndex);
                    }
                    event.preventDefault();
                    break;
                }
                //right arrow
                case 39: {
                    cellContent.tabIndex = '-1';
                    var nextCell = cell.nextElementSibling;
                    if (nextCell) {
                        var focusCell = nextCell.children[0];
                        if (dom.DomHandler.hasClass(focusCell, 'ui-state-disabled')) {
                            this.navigateToMonth(false, groupIndex);
                        }
                        else {
                            focusCell.tabIndex = '0';
                            focusCell.focus();
                        }
                    }
                    else {
                        this.navigateToMonth(false, groupIndex);
                    }
                    event.preventDefault();
                    break;
                }
                //enter
                case 13: {
                    this.onDateSelect(event, date);
                    event.preventDefault();
                    break;
                }
                //escape
                case 27: {
                    this.overlayVisible = false;
                    event.preventDefault();
                    break;
                }
                //tab
                case 9: {
                    if (!this.inline) {
                        this.trapFocus(event);
                    }
                    break;
                }
                default:
                    //no op
                    break;
            }
        };
        Calendar.prototype.onMonthCellKeydown = function (event, index) {
            var cell = event.currentTarget;
            switch (event.which) {
                //arrows
                case 38:
                case 40: {
                    cell.tabIndex = '-1';
                    var cells = cell.parentElement.children;
                    var cellIndex = dom.DomHandler.index(cell);
                    var nextCell = cells[event.which === 40 ? cellIndex + 3 : cellIndex - 3];
                    if (nextCell) {
                        nextCell.tabIndex = '0';
                        nextCell.focus();
                    }
                    event.preventDefault();
                    break;
                }
                //left arrow
                case 37: {
                    cell.tabIndex = '-1';
                    var prevCell = cell.previousElementSibling;
                    if (prevCell) {
                        prevCell.tabIndex = '0';
                        prevCell.focus();
                    }
                    event.preventDefault();
                    break;
                }
                //right arrow
                case 39: {
                    cell.tabIndex = '-1';
                    var nextCell = cell.nextElementSibling;
                    if (nextCell) {
                        nextCell.tabIndex = '0';
                        nextCell.focus();
                    }
                    event.preventDefault();
                    break;
                }
                //enter
                case 13: {
                    this.onMonthSelect(event, index);
                    event.preventDefault();
                    break;
                }
                //escape
                case 27: {
                    this.overlayVisible = false;
                    event.preventDefault();
                    break;
                }
                //tab
                case 9: {
                    if (!this.inline) {
                        this.trapFocus(event);
                    }
                    break;
                }
                default:
                    //no op
                    break;
            }
        };
        Calendar.prototype.navigateToMonth = function (prev, groupIndex) {
            if (prev) {
                if (this.numberOfMonths === 1 || (groupIndex === 0)) {
                    this.navigationState = { backward: true };
                    this.navBackward(event);
                }
                else {
                    var prevMonthContainer = this.contentViewChild.nativeElement.children[groupIndex - 1];
                    var cells = dom.DomHandler.find(prevMonthContainer, '.ui-datepicker-calendar td a');
                    var focusCell = cells[cells.length - 1];
                    focusCell.tabIndex = '0';
                    focusCell.focus();
                }
            }
            else {
                if (this.numberOfMonths === 1 || (groupIndex === this.numberOfMonths - 1)) {
                    this.navigationState = { backward: false };
                    this.navForward(event);
                }
                else {
                    var nextMonthContainer = this.contentViewChild.nativeElement.children[groupIndex + 1];
                    var focusCell = dom.DomHandler.findSingle(nextMonthContainer, '.ui-datepicker-calendar td a');
                    focusCell.tabIndex = '0';
                    focusCell.focus();
                }
            }
        };
        Calendar.prototype.updateFocus = function () {
            var cell;
            if (this.navigationState) {
                if (this.navigationState.button) {
                    this.initFocusableCell();
                    if (this.navigationState.backward)
                        dom.DomHandler.findSingle(this.contentViewChild.nativeElement, '.ui-datepicker-prev').focus();
                    else
                        dom.DomHandler.findSingle(this.contentViewChild.nativeElement, '.ui-datepicker-next').focus();
                }
                else {
                    if (this.navigationState.backward) {
                        var cells = dom.DomHandler.find(this.contentViewChild.nativeElement, '.ui-datepicker-calendar td a');
                        cell = cells[cells.length - 1];
                    }
                    else {
                        cell = dom.DomHandler.findSingle(this.contentViewChild.nativeElement, '.ui-datepicker-calendar td a');
                    }
                    if (cell) {
                        cell.tabIndex = '0';
                        cell.focus();
                    }
                }
                this.navigationState = null;
            }
            else {
                this.initFocusableCell();
            }
        };
        Calendar.prototype.initFocusableCell = function () {
            var cell;
            if (this.view === 'month') {
                var cells = dom.DomHandler.find(this.contentViewChild.nativeElement, '.ui-monthpicker .ui-monthpicker-month:not(.ui-state-disabled)');
                var selectedCell = dom.DomHandler.findSingle(this.contentViewChild.nativeElement, '.ui-monthpicker .ui-monthpicker-month.ui-state-highlight');
                cells.forEach(function (cell) { return cell.tabIndex = -1; });
                cell = selectedCell || cells[0];
                if (cells.length === 0) {
                    var disabledCells = dom.DomHandler.find(this.contentViewChild.nativeElement, '.ui-monthpicker .ui-monthpicker-month.ui-state-disabled[tabindex = "0"]');
                    disabledCells.forEach(function (cell) { return cell.tabIndex = -1; });
                }
            }
            else {
                cell = dom.DomHandler.findSingle(this.contentViewChild.nativeElement, 'a.ui-state-active');
                if (!cell) {
                    var todayCell = dom.DomHandler.findSingle(this.contentViewChild.nativeElement, 'td.ui-datepicker-today a:not(.ui-state-disabled)');
                    if (todayCell)
                        cell = todayCell;
                    else
                        cell = dom.DomHandler.findSingle(this.contentViewChild.nativeElement, '.ui-datepicker-calendar td a');
                }
            }
            if (cell) {
                cell.tabIndex = '0';
            }
        };
        Calendar.prototype.trapFocus = function (event) {
            event.preventDefault();
            var focusableElements = dom.DomHandler.getFocusableElements(this.contentViewChild.nativeElement);
            if (focusableElements && focusableElements.length > 0) {
                if (!document.activeElement) {
                    focusableElements[0].focus();
                }
                else {
                    var focusedIndex = focusableElements.indexOf(document.activeElement);
                    if (event.shiftKey) {
                        if (focusedIndex == -1 || focusedIndex === 0)
                            focusableElements[focusableElements.length - 1].focus();
                        else
                            focusableElements[focusedIndex - 1].focus();
                    }
                    else {
                        if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                            focusableElements[0].focus();
                        else
                            focusableElements[focusedIndex + 1].focus();
                    }
                }
            }
        };
        Calendar.prototype.onMonthDropdownChange = function (m) {
            this.currentMonth = parseInt(m);
            this.onMonthChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        };
        Calendar.prototype.onYearDropdownChange = function (y) {
            this.currentYear = parseInt(y);
            this.onYearChange.emit({ month: this.currentMonth + 1, year: this.currentYear });
            this.createMonths(this.currentMonth, this.currentYear);
        };
        Calendar.prototype.incrementHour = function (event) {
            var prevHour = this.currentHour;
            var newHour = this.currentHour + this.stepHour;
            if (this.validateHour(newHour)) {
                if (this.hourFormat == '24')
                    this.currentHour = (newHour >= 24) ? (newHour - 24) : newHour;
                else if (this.hourFormat == '12') {
                    // Before the AM/PM break, now after
                    if (prevHour < 12 && newHour > 11) {
                        this.pm = !this.pm;
                    }
                    this.currentHour = (newHour >= 13) ? (newHour - 12) : newHour;
                }
            }
            event.preventDefault();
        };
        Calendar.prototype.onTimePickerElementMouseDown = function (event, type, direction) {
            if (!this.disabled) {
                this.repeat(event, null, type, direction);
                event.preventDefault();
            }
        };
        Calendar.prototype.onTimePickerElementMouseUp = function (event) {
            if (!this.disabled) {
                this.clearTimePickerTimer();
                this.updateTime();
            }
        };
        Calendar.prototype.onTimePickerElementMouseOut = function (event) {
            if (!this.disabled) {
                this.clearTimePickerTimer();
                this.updateTime();
            }
        };
        Calendar.prototype.repeat = function (event, interval, type, direction) {
            var _this = this;
            var i = interval || 500;
            this.clearTimePickerTimer();
            this.timePickerTimer = setTimeout(function () {
                _this.repeat(event, 100, type, direction);
            }, i);
            switch (type) {
                case 0:
                    if (direction === 1)
                        this.incrementHour(event);
                    else
                        this.decrementHour(event);
                    break;
                case 1:
                    if (direction === 1)
                        this.incrementMinute(event);
                    else
                        this.decrementMinute(event);
                    break;
                case 2:
                    if (direction === 1)
                        this.incrementSecond(event);
                    else
                        this.decrementSecond(event);
                    break;
            }
            this.updateInputfield();
        };
        Calendar.prototype.clearTimePickerTimer = function () {
            if (this.timePickerTimer) {
                clearInterval(this.timePickerTimer);
            }
        };
        Calendar.prototype.decrementHour = function (event) {
            var newHour = this.currentHour - this.stepHour;
            if (this.validateHour(newHour)) {
                if (this.hourFormat == '24')
                    this.currentHour = (newHour < 0) ? (24 + newHour) : newHour;
                else if (this.hourFormat == '12') {
                    // If we were at noon/midnight, then switch
                    if (this.currentHour === 12) {
                        this.pm = !this.pm;
                    }
                    this.currentHour = (newHour <= 0) ? (12 + newHour) : newHour;
                }
            }
            event.preventDefault();
        };
        Calendar.prototype.validateHour = function (hour) {
            var valid = true;
            var value = this.value;
            if (this.isRangeSelection()) {
                value = this.value[1] || this.value[0];
            }
            if (this.isMultipleSelection()) {
                value = this.value[this.value.length - 1];
            }
            var valueDateString = value ? value.toDateString() : null;
            if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
                if (this.minDate.getHours() > hour) {
                    valid = false;
                }
            }
            if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
                if (this.maxDate.getHours() < hour) {
                    valid = false;
                }
            }
            return valid;
        };
        Calendar.prototype.incrementMinute = function (event) {
            var newMinute = this.currentMinute + this.stepMinute;
            if (this.validateMinute(newMinute)) {
                this.currentMinute = (newMinute > 59) ? newMinute - 60 : newMinute;
            }
            event.preventDefault();
        };
        Calendar.prototype.decrementMinute = function (event) {
            var newMinute = this.currentMinute - this.stepMinute;
            newMinute = (newMinute < 0) ? 60 + newMinute : newMinute;
            if (this.validateMinute(newMinute)) {
                this.currentMinute = newMinute;
            }
            event.preventDefault();
        };
        Calendar.prototype.validateMinute = function (minute) {
            var valid = true;
            var value = this.value;
            if (this.isRangeSelection()) {
                value = this.value[1] || this.value[0];
            }
            if (this.isMultipleSelection()) {
                value = this.value[this.value.length - 1];
            }
            var valueDateString = value ? value.toDateString() : null;
            if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
                if (value.getHours() == this.minDate.getHours()) {
                    if (this.minDate.getMinutes() > minute) {
                        valid = false;
                    }
                }
            }
            if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
                if (value.getHours() == this.maxDate.getHours()) {
                    if (this.maxDate.getMinutes() < minute) {
                        valid = false;
                    }
                }
            }
            return valid;
        };
        Calendar.prototype.incrementSecond = function (event) {
            var newSecond = this.currentSecond + this.stepSecond;
            if (this.validateSecond(newSecond)) {
                this.currentSecond = (newSecond > 59) ? newSecond - 60 : newSecond;
            }
            event.preventDefault();
        };
        Calendar.prototype.decrementSecond = function (event) {
            var newSecond = this.currentSecond - this.stepSecond;
            newSecond = (newSecond < 0) ? 60 + newSecond : newSecond;
            if (this.validateSecond(newSecond)) {
                this.currentSecond = newSecond;
            }
            event.preventDefault();
        };
        Calendar.prototype.validateSecond = function (second) {
            var valid = true;
            var value = this.value;
            if (this.isRangeSelection()) {
                value = this.value[1] || this.value[0];
            }
            if (this.isMultipleSelection()) {
                value = this.value[this.value.length - 1];
            }
            var valueDateString = value ? value.toDateString() : null;
            if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
                if (this.minDate.getSeconds() > second) {
                    valid = false;
                }
            }
            if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
                if (this.maxDate.getSeconds() < second) {
                    valid = false;
                }
            }
            return valid;
        };
        Calendar.prototype.updateTime = function () {
            var value = this.value;
            if (this.isRangeSelection()) {
                value = this.value[1] || this.value[0];
            }
            if (this.isMultipleSelection()) {
                value = this.value[this.value.length - 1];
            }
            value = value ? new Date(value.getTime()) : new Date();
            if (this.hourFormat == '12') {
                if (this.currentHour === 12)
                    value.setHours(this.pm ? 12 : 0);
                else
                    value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
            }
            else {
                value.setHours(this.currentHour);
            }
            value.setMinutes(this.currentMinute);
            value.setSeconds(this.currentSecond);
            if (this.isRangeSelection()) {
                if (this.value[1])
                    value = [this.value[0], value];
                else
                    value = [value, null];
            }
            if (this.isMultipleSelection()) {
                value = __spread(this.value.slice(0, -1), [value]);
            }
            this.updateModel(value);
            this.onSelect.emit(value);
            this.updateInputfield();
        };
        Calendar.prototype.toggleAMPM = function (event) {
            this.pm = !this.pm;
            this.updateTime();
            event.preventDefault();
        };
        Calendar.prototype.onUserInput = function (event) {
            // IE 11 Workaround for input placeholder : https://github.com/primefaces/primeng/issues/2026
            if (!this.isKeydown) {
                return;
            }
            this.isKeydown = false;
            var val = event.target.value;
            try {
                var value = this.parseValueFromString(val);
                if (this.isValidSelection(value)) {
                    this.updateModel(value);
                    this.updateUI();
                }
            }
            catch (err) {
                //invalid date
                this.updateModel(null);
            }
            this.filled = val != null && val.length;
            this.onInput.emit(event);
        };
        Calendar.prototype.isValidSelection = function (value) {
            var _this = this;
            var isValid = true;
            if (this.isSingleSelection()) {
                if (!this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
                    isValid = false;
                }
            }
            else if (value.every(function (v) { return _this.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false); })) {
                if (this.isRangeSelection()) {
                    isValid = value.length > 1 && value[1] > value[0] ? true : false;
                }
            }
            return isValid;
        };
        Calendar.prototype.parseValueFromString = function (text) {
            var e_3, _a;
            if (!text || text.trim().length === 0) {
                return null;
            }
            var value;
            if (this.isSingleSelection()) {
                value = this.parseDateTime(text);
            }
            else if (this.isMultipleSelection()) {
                var tokens = text.split(this.multipleSeparator);
                value = [];
                try {
                    for (var tokens_1 = __values(tokens), tokens_1_1 = tokens_1.next(); !tokens_1_1.done; tokens_1_1 = tokens_1.next()) {
                        var token = tokens_1_1.value;
                        value.push(this.parseDateTime(token.trim()));
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (tokens_1_1 && !tokens_1_1.done && (_a = tokens_1.return)) _a.call(tokens_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            else if (this.isRangeSelection()) {
                var tokens = text.split(' ' + this.rangeSeparator + ' ');
                value = [];
                for (var i = 0; i < tokens.length; i++) {
                    value[i] = this.parseDateTime(tokens[i].trim());
                }
            }
            return value;
        };
        Calendar.prototype.parseDateTime = function (text) {
            var date;
            var parts = text.split(' ');
            if (this.timeOnly) {
                date = new Date();
                this.populateTime(date, parts[0], parts[1]);
            }
            else {
                var dateFormat = this.getDateFormat();
                if (this.showTime) {
                    var ampm = this.hourFormat == '12' ? parts.pop() : null;
                    var timeString = parts.pop();
                    date = this.parseDate(parts.join(' '), dateFormat);
                    this.populateTime(date, timeString, ampm);
                }
                else {
                    date = this.parseDate(text, dateFormat);
                }
            }
            return date;
        };
        Calendar.prototype.populateTime = function (value, timeString, ampm) {
            if (this.hourFormat == '12' && !ampm) {
                throw 'Invalid Time';
            }
            this.pm = (ampm === 'PM' || ampm === 'pm');
            var time = this.parseTime(timeString);
            value.setHours(time.hour);
            value.setMinutes(time.minute);
            value.setSeconds(time.second);
        };
        Calendar.prototype.updateUI = function () {
            var val = this.value || this.defaultDate || new Date();
            if (Array.isArray(val)) {
                val = val[0];
            }
            this.currentMonth = val.getMonth();
            this.currentYear = val.getFullYear();
            this.createMonths(this.currentMonth, this.currentYear);
            if (this.showTime || this.timeOnly) {
                var hours = val.getHours();
                if (this.hourFormat == '12') {
                    this.pm = hours > 11;
                    if (hours >= 12) {
                        this.currentHour = (hours == 12) ? 12 : hours - 12;
                    }
                    else {
                        this.currentHour = (hours == 0) ? 12 : hours;
                    }
                }
                else {
                    this.currentHour = val.getHours();
                }
                this.currentMinute = val.getMinutes();
                this.currentSecond = val.getSeconds();
            }
        };
        Calendar.prototype.showOverlay = function () {
            if (!this.overlayVisible) {
                this.updateUI();
                this.overlayVisible = true;
            }
        };
        Calendar.prototype.hideOverlay = function () {
            this.overlayVisible = false;
            this.clearTimePickerTimer();
            if (this.touchUI) {
                this.disableModality();
            }
        };
        Calendar.prototype.toggle = function () {
            if (!this.inline) {
                if (!this.overlayVisible) {
                    this.showOverlay();
                    this.inputfieldViewChild.nativeElement.focus();
                }
                else {
                    this.hideOverlay();
                }
            }
        };
        Calendar.prototype.onOverlayAnimationStart = function (event) {
            switch (event.toState) {
                case 'visible':
                case 'visibleTouchUI':
                    if (!this.inline) {
                        this.overlay = event.element;
                        this.appendOverlay();
                        if (this.autoZIndex) {
                            this.overlay.style.zIndex = String(this.baseZIndex + (++dom.DomHandler.zindex));
                        }
                        this.alignOverlay();
                        this.onShow.emit(event);
                    }
                    break;
                case 'void':
                    this.onOverlayHide();
                    this.onClose.emit(event);
                    break;
            }
        };
        Calendar.prototype.onOverlayAnimationDone = function (event) {
            switch (event.toState) {
                case 'visible':
                case 'visibleTouchUI':
                    if (!this.inline) {
                        this.bindDocumentClickListener();
                        this.bindDocumentResizeListener();
                    }
                    break;
            }
        };
        Calendar.prototype.appendOverlay = function () {
            if (this.appendTo) {
                if (this.appendTo === 'body')
                    document.body.appendChild(this.overlay);
                else
                    dom.DomHandler.appendChild(this.overlay, this.appendTo);
            }
        };
        Calendar.prototype.restoreOverlayAppend = function () {
            if (this.overlay && this.appendTo) {
                this.el.nativeElement.appendChild(this.overlay);
            }
        };
        Calendar.prototype.alignOverlay = function () {
            if (this.touchUI) {
                this.enableModality(this.overlay);
            }
            else {
                if (this.appendTo)
                    dom.DomHandler.absolutePosition(this.overlay, this.inputfieldViewChild.nativeElement);
                else
                    dom.DomHandler.relativePosition(this.overlay, this.inputfieldViewChild.nativeElement);
            }
        };
        Calendar.prototype.enableModality = function (element) {
            var _this = this;
            if (!this.mask) {
                this.mask = document.createElement('div');
                this.mask.style.zIndex = String(parseInt(element.style.zIndex) - 1);
                var maskStyleClass = 'ui-widget-overlay ui-datepicker-mask ui-datepicker-mask-scrollblocker';
                dom.DomHandler.addMultipleClasses(this.mask, maskStyleClass);
                this.maskClickListener = this.renderer.listen(this.mask, 'click', function (event) {
                    _this.disableModality();
                });
                document.body.appendChild(this.mask);
                dom.DomHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        };
        Calendar.prototype.disableModality = function () {
            if (this.mask) {
                document.body.removeChild(this.mask);
                var bodyChildren = document.body.children;
                var hasBlockerMasks = void 0;
                for (var i = 0; i < bodyChildren.length; i++) {
                    var bodyChild = bodyChildren[i];
                    if (dom.DomHandler.hasClass(bodyChild, 'ui-datepicker-mask-scrollblocker')) {
                        hasBlockerMasks = true;
                        break;
                    }
                }
                if (!hasBlockerMasks) {
                    dom.DomHandler.removeClass(document.body, 'ui-overflow-hidden');
                }
                this.unbindMaskClickListener();
                this.mask = null;
            }
        };
        Calendar.prototype.unbindMaskClickListener = function () {
            if (this.maskClickListener) {
                this.maskClickListener();
                this.maskClickListener = null;
            }
        };
        Calendar.prototype.writeValue = function (value) {
            this.value = value;
            if (this.value && typeof this.value === 'string') {
                this.value = this.parseValueFromString(this.value);
            }
            this.updateInputfield();
            this.updateUI();
        };
        Calendar.prototype.registerOnChange = function (fn) {
            this.onModelChange = fn;
        };
        Calendar.prototype.registerOnTouched = function (fn) {
            this.onModelTouched = fn;
        };
        Calendar.prototype.setDisabledState = function (val) {
            this.disabled = val;
        };
        Calendar.prototype.getDateFormat = function () {
            return this.dateFormat || this.locale.dateFormat;
        };
        // Ported from jquery-ui datepicker formatDate
        Calendar.prototype.formatDate = function (date, format) {
            if (!date) {
                return '';
            }
            var iFormat;
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
                if (matches) {
                    iFormat++;
                }
                return matches;
            }, formatNumber = function (match, value, len) {
                var num = '' + value;
                if (lookAhead(match)) {
                    while (num.length < len) {
                        num = '0' + num;
                    }
                }
                return num;
            }, formatName = function (match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value]);
            };
            var output = '';
            var literal = false;
            if (date) {
                for (iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal) {
                        if (format.charAt(iFormat) === '\'' && !lookAhead('\'')) {
                            literal = false;
                        }
                        else {
                            output += format.charAt(iFormat);
                        }
                    }
                    else {
                        switch (format.charAt(iFormat)) {
                            case 'd':
                                output += formatNumber('d', date.getDate(), 2);
                                break;
                            case 'D':
                                output += formatName('D', date.getDay(), this.locale.dayNamesShort, this.locale.dayNames);
                                break;
                            case 'o':
                                output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() -
                                    new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                                break;
                            case 'm':
                                output += formatNumber('m', date.getMonth() + 1, 2);
                                break;
                            case 'M':
                                output += formatName('M', date.getMonth(), this.locale.monthNamesShort, this.locale.monthNames);
                                break;
                            case 'y':
                                output += lookAhead('y') ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100);
                                break;
                            case '@':
                                output += date.getTime();
                                break;
                            case '!':
                                output += date.getTime() * 10000 + this.ticksTo1970;
                                break;
                            case '\'':
                                if (lookAhead('\'')) {
                                    output += '\'';
                                }
                                else {
                                    literal = true;
                                }
                                break;
                            default:
                                output += format.charAt(iFormat);
                        }
                    }
                }
            }
            return output;
        };
        Calendar.prototype.formatTime = function (date) {
            if (!date) {
                return '';
            }
            var output = '';
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            if (this.hourFormat == '12' && hours > 11 && hours != 12) {
                hours -= 12;
            }
            if (this.hourFormat == '12') {
                output += hours === 0 ? 12 : (hours < 10) ? '0' + hours : hours;
            }
            else {
                output += (hours < 10) ? '0' + hours : hours;
            }
            output += ':';
            output += (minutes < 10) ? '0' + minutes : minutes;
            if (this.showSeconds) {
                output += ':';
                output += (seconds < 10) ? '0' + seconds : seconds;
            }
            if (this.hourFormat == '12') {
                output += date.getHours() > 11 ? ' PM' : ' AM';
            }
            return output;
        };
        Calendar.prototype.parseTime = function (value) {
            var tokens = value.split(':');
            var validTokenLength = this.showSeconds ? 3 : 2;
            if (tokens.length !== validTokenLength) {
                throw "Invalid time";
            }
            var h = parseInt(tokens[0]);
            var m = parseInt(tokens[1]);
            var s = this.showSeconds ? parseInt(tokens[2]) : null;
            if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || (this.hourFormat == '12' && h > 12) || (this.showSeconds && (isNaN(s) || s > 59))) {
                throw "Invalid time";
            }
            else {
                if (this.hourFormat == '12') {
                    if (h !== 12 && this.pm) {
                        h += 12;
                    }
                    else if (!this.pm && h === 12) {
                        h -= 12;
                    }
                }
                return { hour: h, minute: m, second: s };
            }
        };
        // Ported from jquery-ui datepicker parseDate
        Calendar.prototype.parseDate = function (value, format) {
            if (format == null || value == null) {
                throw "Invalid arguments";
            }
            value = (typeof value === "object" ? value.toString() : value + "");
            if (value === "") {
                return null;
            }
            var iFormat, dim, extra, iValue = 0, shortYearCutoff = (typeof this.shortYearCutoff !== "string" ? this.shortYearCutoff : new Date().getFullYear() % 100 + parseInt(this.shortYearCutoff, 10)), year = -1, month = -1, day = -1, doy = -1, literal = false, date, lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
                if (matches) {
                    iFormat++;
                }
                return matches;
            }, getNumber = function (match) {
                var isDoubled = lookAhead(match), size = (match === "@" ? 14 : (match === "!" ? 20 :
                    (match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))), minSize = (match === "y" ? size : 1), digits = new RegExp("^\\d{" + minSize + "," + size + "}"), num = value.substring(iValue).match(digits);
                if (!num) {
                    throw "Missing number at position " + iValue;
                }
                iValue += num[0].length;
                return parseInt(num[0], 10);
            }, getName = function (match, shortNames, longNames) {
                var index = -1;
                var arr = lookAhead(match) ? longNames : shortNames;
                var names = [];
                for (var i = 0; i < arr.length; i++) {
                    names.push([i, arr[i]]);
                }
                names.sort(function (a, b) {
                    return -(a[1].length - b[1].length);
                });
                for (var i = 0; i < names.length; i++) {
                    var name_1 = names[i][1];
                    if (value.substr(iValue, name_1.length).toLowerCase() === name_1.toLowerCase()) {
                        index = names[i][0];
                        iValue += name_1.length;
                        break;
                    }
                }
                if (index !== -1) {
                    return index + 1;
                }
                else {
                    throw "Unknown name at position " + iValue;
                }
            }, checkLiteral = function () {
                if (value.charAt(iValue) !== format.charAt(iFormat)) {
                    throw "Unexpected literal at position " + iValue;
                }
                iValue++;
            };
            if (this.view === 'month') {
                day = 1;
            }
            for (iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal) {
                    if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
                        literal = false;
                    }
                    else {
                        checkLiteral();
                    }
                }
                else {
                    switch (format.charAt(iFormat)) {
                        case "d":
                            day = getNumber("d");
                            break;
                        case "D":
                            getName("D", this.locale.dayNamesShort, this.locale.dayNames);
                            break;
                        case "o":
                            doy = getNumber("o");
                            break;
                        case "m":
                            month = getNumber("m");
                            break;
                        case "M":
                            month = getName("M", this.locale.monthNamesShort, this.locale.monthNames);
                            break;
                        case "y":
                            year = getNumber("y");
                            break;
                        case "@":
                            date = new Date(getNumber("@"));
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "!":
                            date = new Date((getNumber("!") - this.ticksTo1970) / 10000);
                            year = date.getFullYear();
                            month = date.getMonth() + 1;
                            day = date.getDate();
                            break;
                        case "'":
                            if (lookAhead("'")) {
                                checkLiteral();
                            }
                            else {
                                literal = true;
                            }
                            break;
                        default:
                            checkLiteral();
                    }
                }
            }
            if (iValue < value.length) {
                extra = value.substr(iValue);
                if (!/^\s+/.test(extra)) {
                    throw "Extra/unparsed characters found in date: " + extra;
                }
            }
            if (year === -1) {
                year = new Date().getFullYear();
            }
            else if (year < 100) {
                year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                    (year <= shortYearCutoff ? 0 : -100);
            }
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    dim = this.getDaysCountInMonth(year, month - 1);
                    if (day <= dim) {
                        break;
                    }
                    month++;
                    day -= dim;
                } while (true);
            }
            date = this.daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
                throw "Invalid date"; // E.g. 31/02/00
            }
            return date;
        };
        Calendar.prototype.daylightSavingAdjust = function (date) {
            if (!date) {
                return null;
            }
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date;
        };
        Calendar.prototype.updateFilledState = function () {
            this.filled = this.inputFieldValue && this.inputFieldValue != '';
        };
        Calendar.prototype.onTodayButtonClick = function (event) {
            var date = new Date();
            var dateMeta = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear(), otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear, today: true, selectable: true };
            this.onDateSelect(event, dateMeta);
            this.onTodayClick.emit(event);
        };
        Calendar.prototype.onClearButtonClick = function (event) {
            this.updateModel(null);
            this.updateInputfield();
            this.hideOverlay();
            this.onClearClick.emit(event);
        };
        Calendar.prototype.bindDocumentClickListener = function () {
            var _this = this;
            if (!this.documentClickListener) {
                this.zone.runOutsideAngular(function () {
                    _this.documentClickListener = _this.renderer.listen('document', 'click', function (event) {
                        if (_this.isOutsideClicked(event) && _this.overlayVisible) {
                            _this.zone.run(function () {
                                _this.hideOverlay();
                                _this.onClickOutside.emit(event);
                                _this.cd.markForCheck();
                            });
                        }
                    });
                });
            }
        };
        Calendar.prototype.unbindDocumentClickListener = function () {
            if (this.documentClickListener) {
                this.documentClickListener();
                this.documentClickListener = null;
            }
        };
        Calendar.prototype.bindDocumentResizeListener = function () {
            if (!this.documentResizeListener && !this.touchUI) {
                this.documentResizeListener = this.onWindowResize.bind(this);
                window.addEventListener('resize', this.documentResizeListener);
            }
        };
        Calendar.prototype.unbindDocumentResizeListener = function () {
            if (this.documentResizeListener) {
                window.removeEventListener('resize', this.documentResizeListener);
                this.documentResizeListener = null;
            }
        };
        Calendar.prototype.isOutsideClicked = function (event) {
            return !(this.el.nativeElement.isSameNode(event.target) || this.isNavIconClicked(event) ||
                this.el.nativeElement.contains(event.target) || (this.overlay && this.overlay.contains(event.target)));
        };
        Calendar.prototype.isNavIconClicked = function (event) {
            return (dom.DomHandler.hasClass(event.target, 'ui-datepicker-prev') || dom.DomHandler.hasClass(event.target, 'ui-datepicker-prev-icon')
                || dom.DomHandler.hasClass(event.target, 'ui-datepicker-next') || dom.DomHandler.hasClass(event.target, 'ui-datepicker-next-icon'));
        };
        Calendar.prototype.onWindowResize = function () {
            if (this.overlayVisible && !dom.DomHandler.isAndroid()) {
                this.hideOverlay();
            }
        };
        Calendar.prototype.onOverlayHide = function () {
            this.unbindDocumentClickListener();
            this.unbindMaskClickListener();
            this.unbindDocumentResizeListener();
            this.overlay = null;
            this.disableModality();
        };
        Calendar.prototype.ngOnDestroy = function () {
            this.clearTimePickerTimer();
            this.restoreOverlayAppend();
            this.onOverlayHide();
        };
        Calendar.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.Renderer2 },
            { type: core.ChangeDetectorRef },
            { type: core.NgZone }
        ]; };
        __decorate([
            core.Input()
        ], Calendar.prototype, "defaultDate", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "inputStyle", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "inputId", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "name", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "inputStyleClass", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "placeholder", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "ariaLabelledBy", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "disabled", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "dateFormat", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "multipleSeparator", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "rangeSeparator", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "inline", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "showOtherMonths", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "selectOtherMonths", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "showIcon", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "icon", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "appendTo", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "readonlyInput", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "shortYearCutoff", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "monthNavigator", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "yearNavigator", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "hourFormat", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "timeOnly", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "stepHour", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "stepMinute", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "stepSecond", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "showSeconds", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "required", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "showOnFocus", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "showWeek", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "dataType", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "selectionMode", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "maxDateCount", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "showButtonBar", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "todayButtonStyleClass", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "clearButtonStyleClass", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "autoZIndex", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "baseZIndex", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "panelStyleClass", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "panelStyle", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "keepInvalid", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "hideOnDateTimeSelect", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "numberOfMonths", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "view", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "touchUI", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "timeSeparator", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "showTransitionOptions", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "hideTransitionOptions", void 0);
        __decorate([
            core.Output()
        ], Calendar.prototype, "onFocus", void 0);
        __decorate([
            core.Output()
        ], Calendar.prototype, "onBlur", void 0);
        __decorate([
            core.Output()
        ], Calendar.prototype, "onClose", void 0);
        __decorate([
            core.Output()
        ], Calendar.prototype, "onSelect", void 0);
        __decorate([
            core.Output()
        ], Calendar.prototype, "onInput", void 0);
        __decorate([
            core.Output()
        ], Calendar.prototype, "onTodayClick", void 0);
        __decorate([
            core.Output()
        ], Calendar.prototype, "onClearClick", void 0);
        __decorate([
            core.Output()
        ], Calendar.prototype, "onMonthChange", void 0);
        __decorate([
            core.Output()
        ], Calendar.prototype, "onYearChange", void 0);
        __decorate([
            core.Output()
        ], Calendar.prototype, "onClickOutside", void 0);
        __decorate([
            core.Output()
        ], Calendar.prototype, "onShow", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], Calendar.prototype, "templates", void 0);
        __decorate([
            core.Input()
        ], Calendar.prototype, "tabindex", void 0);
        __decorate([
            core.ViewChild('inputfield', { static: false })
        ], Calendar.prototype, "inputfieldViewChild", void 0);
        __decorate([
            core.ViewChild('contentWrapper', { static: false })
        ], Calendar.prototype, "content", null);
        __decorate([
            core.Input()
        ], Calendar.prototype, "minDate", null);
        __decorate([
            core.Input()
        ], Calendar.prototype, "maxDate", null);
        __decorate([
            core.Input()
        ], Calendar.prototype, "disabledDates", null);
        __decorate([
            core.Input()
        ], Calendar.prototype, "disabledDays", null);
        __decorate([
            core.Input()
        ], Calendar.prototype, "yearRange", null);
        __decorate([
            core.Input()
        ], Calendar.prototype, "showTime", null);
        __decorate([
            core.Input()
        ], Calendar.prototype, "locale", null);
        Calendar = __decorate([
            core.Component({
                selector: 'p-calendar',
                template: "\n        <span [ngClass]=\"{'ui-calendar':true, 'ui-calendar-w-btn': showIcon, 'ui-calendar-timeonly': timeOnly}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <ng-template [ngIf]=\"!inline\">\n                <input #inputfield type=\"text\" [attr.id]=\"inputId\" [attr.name]=\"name\" [attr.required]=\"required\" [attr.aria-required]=\"required\" [value]=\"inputFieldValue\" (focus)=\"onInputFocus($event)\" (keydown)=\"onInputKeydown($event)\" (click)=\"onInputClick($event)\" (blur)=\"onInputBlur($event)\"\n                    [readonly]=\"readonlyInput\" (input)=\"onUserInput($event)\" [ngStyle]=\"inputStyle\" [class]=\"inputStyleClass\" [placeholder]=\"placeholder||''\" [disabled]=\"disabled\" [attr.tabindex]=\"tabindex\"\n                    [ngClass]=\"'ui-inputtext ui-widget ui-state-default ui-corner-all'\" autocomplete=\"off\" [attr.aria-labelledby]=\"ariaLabelledBy\"\n                    ><button type=\"button\" [icon]=\"icon\" pButton *ngIf=\"showIcon\" (click)=\"onButtonClick($event,inputfield)\" class=\"ui-datepicker-trigger ui-calendar-button\"\n                    [ngClass]=\"{'ui-state-disabled':disabled}\" [disabled]=\"disabled\" tabindex=\"0\"></button>\n            </ng-template>\n            <div #contentWrapper [class]=\"panelStyleClass\" [ngStyle]=\"panelStyle\" [ngClass]=\"{'ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all': true, 'ui-datepicker-inline':inline,'ui-shadow':!inline,\n                'ui-state-disabled':disabled,'ui-datepicker-timeonly':timeOnly,'ui-datepicker-multiple-month': this.numberOfMonths > 1, 'ui-datepicker-monthpicker': (view === 'month'), 'ui-datepicker-touch-ui': touchUI}\"\n                [@overlayAnimation]=\"touchUI ? {value: 'visibleTouchUI', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}: \n                                            {value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\" \n                                            [@.disabled]=\"inline === true\" (@overlayAnimation.start)=\"onOverlayAnimationStart($event)\" (@overlayAnimation.done)=\"onOverlayAnimationDone($event)\" *ngIf=\"inline || overlayVisible\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngIf=\"!timeOnly\">\n                    <div class=\"ui-datepicker-group ui-widget-content\" *ngFor=\"let month of months; let i = index;\">\n                        <div class=\"ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all\">\n                            <a class=\"ui-datepicker-prev ui-corner-all\" (click)=\"onPrevButtonClick($event)\" (keydown.enter)=\"onPrevButtonClick($event)\" *ngIf=\"i === 0\" tabindex=\"0\" (keydown)=\"onInputKeydown($event)\">\n                                <span class=\"ui-datepicker-prev-icon pi pi-chevron-left\"></span>\n                            </a>\n                            <div class=\"ui-datepicker-title\">\n                                <span class=\"ui-datepicker-month\" *ngIf=\"!monthNavigator && (view !== 'month')\">{{locale.monthNames[month.month]}}</span>\n                                <select tabindex=\"0\" class=\"ui-datepicker-month\" *ngIf=\"monthNavigator && (view !== 'month') && numberOfMonths === 1\" (change)=\"onMonthDropdownChange($event.target.value)\">\n                                    <option [value]=\"i\" *ngFor=\"let monthName of locale.monthNames;let i = index\" [selected]=\"i === month.month\">{{monthName}}</option>\n                                </select>\n                                <select tabindex=\"0\" class=\"ui-datepicker-year\" *ngIf=\"yearNavigator && numberOfMonths === 1\" (change)=\"onYearDropdownChange($event.target.value)\">\n                                    <option [value]=\"year\" *ngFor=\"let year of yearOptions\" [selected]=\"year === currentYear\">{{year}}</option>\n                                </select>\n                                <span class=\"ui-datepicker-year\" *ngIf=\"!yearNavigator\">{{view === 'month' ? currentYear : month.year}}</span>\n                            </div>\n                            <a class=\"ui-datepicker-next ui-corner-all\" (click)=\"onNextButtonClick($event)\" (keydown.enter)=\"onNextButtonClick($event)\" *ngIf=\"numberOfMonths === 1 ? true : (i === numberOfMonths -1)\" tabindex=\"0\" (keydown)=\"onInputKeydown($event)\">\n                                <span class=\"ui-datepicker-next-icon pi pi-chevron-right\"></span>\n                            </a>\n                        </div>\n                        <div class=\"ui-datepicker-calendar-container\" *ngIf=\"view ==='date'\">\n                            <table class=\"ui-datepicker-calendar\">\n                                <thead>\n                                    <tr>\n                                        <th *ngIf=\"showWeek\" class=\"ui-datepicker-weekheader\">\n                                            <span>{{locale['weekHeader']}}</span>\n                                        </th>\n                                        <th scope=\"col\" *ngFor=\"let weekDay of weekDays;let begin = first; let end = last\">\n                                            <span>{{weekDay}}</span>\n                                        </th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <tr *ngFor=\"let week of month.dates; let j = index;\">\n                                        <td *ngIf=\"showWeek\" class=\"ui-datepicker-weeknumber ui-state-disabled\">\n                                            <span>\n                                                {{month.weekNumbers[j]}}\n                                            </span>\n                                        </td>\n                                        <td *ngFor=\"let date of week\" [ngClass]=\"{'ui-datepicker-other-month': date.otherMonth,\n                                            'ui-datepicker-current-day':isSelected(date),'ui-datepicker-today':date.today}\">\n                                            <ng-container *ngIf=\"date.otherMonth ? showOtherMonths : true\">\n                                                <a class=\"ui-state-default\" *ngIf=\"date.selectable\" [ngClass]=\"{'ui-state-active':isSelected(date), 'ui-state-highlight':date.today}\"\n                                                    (click)=\"onDateSelect($event,date)\" draggable=\"false\" (keydown)=\"onDateCellKeydown($event,date,i)\">\n                                                    <ng-container *ngIf=\"!dateTemplate\">{{date.day}}</ng-container>\n                                                    <ng-container *ngTemplateOutlet=\"dateTemplate; context: {$implicit: date}\"></ng-container>\n                                                </a>\n                                                <span class=\"ui-state-default ui-state-disabled\" [ngClass]=\"{'ui-state-active':isSelected(date), 'ui-state-highlight':date.today}\" *ngIf=\"!date.selectable\">\n                                                    {{date.day}}\n                                                </span>\n                                            </ng-container>\n                                        </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                    </div>\n                    <div class=\"ui-monthpicker\" *ngIf=\"view === 'month'\">\n                        <a  *ngFor=\"let m of monthPickerValues; let i = index\" (click)=\"onMonthSelect($event, i)\" (keydown)=\"onMonthCellKeydown($event,i)\" class=\"ui-monthpicker-month\" [ngClass]=\"{'ui-state-active': isMonthSelected(i), 'ui-state-disabled':!isSelectable(1, i, this.currentYear, false)}\">\n                            {{m}}\n                        </a>\n                    </div>\n                </ng-container>\n                <div class=\"ui-timepicker ui-widget-header ui-corner-all\" *ngIf=\"showTime||timeOnly\">\n                    <div class=\"ui-hour-picker\">\n                        <a tabindex=\"0\" (keydown)=\"onContainerButtonKeydown($event)\" (keydown.enter)=\"incrementHour($event)\" (mousedown)=\"onTimePickerElementMouseDown($event, 0, 1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseout)=\"onTimePickerElementMouseOut($event)\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span [ngStyle]=\"{'display': currentHour < 10 ? 'inline': 'none'}\">0</span><span>{{currentHour}}</span>\n                        <a tabindex=\"0\" (keydown)=\"onContainerButtonKeydown($event)\" (keydown.enter)=\"decrementHour($event)\" (mousedown)=\"onTimePickerElementMouseDown($event, 0, -1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseout)=\"onTimePickerElementMouseOut($event)\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-separator\">\n                        <a>\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span>{{timeSeparator}}</span>\n                        <a>\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-minute-picker\">\n                        <a tabindex=\"0\" (keydown)=\"onContainerButtonKeydown($event)\" (keydown.enter)=\"incrementMinute($event)\" (mousedown)=\"onTimePickerElementMouseDown($event, 1, 1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseout)=\"onTimePickerElementMouseOut($event)\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span [ngStyle]=\"{'display': currentMinute < 10 ? 'inline': 'none'}\">0</span><span>{{currentMinute}}</span>\n                        <a tabindex=\"0\" (keydown)=\"onContainerButtonKeydown($event)\" (keydown.enter)=\"decrementMinute($event)\" (mousedown)=\"onTimePickerElementMouseDown($event, 1, -1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseout)=\"onTimePickerElementMouseOut($event)\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-separator\" *ngIf=\"showSeconds\">\n                        <a>\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span>{{timeSeparator}}</span>\n                        <a>\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-second-picker\" *ngIf=\"showSeconds\">\n                        <a tabindex=\"0\" (keydown)=\"onContainerButtonKeydown($event)\" (keydown.enter)=\"incrementSecond($event)\" (mousedown)=\"onTimePickerElementMouseDown($event, 2, 1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseout)=\"onTimePickerElementMouseOut($event)\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span [ngStyle]=\"{'display': currentSecond < 10 ? 'inline': 'none'}\">0</span><span>{{currentSecond}}</span>\n                        <a tabindex=\"0\" (keydown)=\"onContainerButtonKeydown($event)\" (keydown.enter)=\"decrementSecond($event)\" (mousedown)=\"onTimePickerElementMouseDown($event, 2, -1)\" (mouseup)=\"onTimePickerElementMouseUp($event)\" (mouseout)=\"onTimePickerElementMouseOut($event)\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                    <div class=\"ui-ampm-picker\" *ngIf=\"hourFormat=='12'\">\n                        <a tabindex=\"0\" (keydown)=\"onContainerButtonKeydown($event)\" (click)=\"toggleAMPM($event)\" (keydown.enter)=\"toggleAMPM($event)\">\n                            <span class=\"pi pi-chevron-up\"></span>\n                        </a>\n                        <span>{{pm ? 'PM' : 'AM'}}</span>\n                        <a tabindex=\"0\" (keydown)=\"onContainerButtonKeydown($event)\" (click)=\"toggleAMPM($event)\" (keydown.enter)=\"toggleAMPM($event)\">\n                            <span class=\"pi pi-chevron-down\"></span>\n                        </a>\n                    </div>\n                </div>\n                <div class=\"ui-datepicker-buttonbar ui-widget-header\" *ngIf=\"showButtonBar\">\n                    <div class=\"ui-g\">\n                        <div class=\"ui-g-6\">\n                            <button type=\"button\" tabindex=\"0\" [label]=\"_locale.today\" (keydown)=\"onContainerButtonKeydown($event)\" (click)=\"onTodayButtonClick($event)\" pButton [ngClass]=\"[todayButtonStyleClass]\"></button>\n                        </div>\n                        <div class=\"ui-g-6\">\n                            <button type=\"button\" tabindex=\"0\" [label]=\"_locale.clear\" (keydown)=\"onContainerButtonKeydown($event)\" (click)=\"onClearButtonClick($event)\" pButton [ngClass]=\"[clearButtonStyleClass]\"></button>\n                        </div>\n                    </div>\n                </div>\n                <ng-content select=\"p-footer\"></ng-content>\n            </div>\n        </span>\n    ",
                animations: [
                    animations.trigger('overlayAnimation', [
                        animations.state('visible', animations.style({
                            transform: 'translateY(0)',
                            opacity: 1
                        })),
                        animations.state('visibleTouchUI', animations.style({
                            transform: 'translate(-50%,-50%)',
                            opacity: 1
                        })),
                        animations.transition('void => visible', [
                            animations.style({ transform: 'translateY(5%)', opacity: 0 }),
                            animations.animate('{{showTransitionParams}}')
                        ]),
                        animations.transition('visible => void', [
                            animations.animate(('{{hideTransitionParams}}'), animations.style({
                                opacity: 0,
                                transform: 'translateY(5%)'
                            }))
                        ]),
                        animations.transition('void => visibleTouchUI', [
                            animations.style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }),
                            animations.animate('{{showTransitionParams}}')
                        ]),
                        animations.transition('visibleTouchUI => void', [
                            animations.animate(('{{hideTransitionParams}}'), animations.style({
                                opacity: 0,
                                transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
                            }))
                        ])
                    ])
                ],
                host: {
                    '[class.ui-inputwrapper-filled]': 'filled',
                    '[class.ui-inputwrapper-focus]': 'focus'
                },
                providers: [CALENDAR_VALUE_ACCESSOR]
            })
        ], Calendar);
        return Calendar;
    }());
    var CalendarModule = /** @class */ (function () {
        function CalendarModule() {
        }
        CalendarModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule, button.ButtonModule, api.SharedModule],
                exports: [Calendar, button.ButtonModule, api.SharedModule],
                declarations: [Calendar]
            })
        ], CalendarModule);
        return CalendarModule;
    }());

    exports.CALENDAR_VALUE_ACCESSOR = CALENDAR_VALUE_ACCESSOR;
    exports.Calendar = Calendar;
    exports.CalendarModule = CalendarModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-calendar.umd.js.map
