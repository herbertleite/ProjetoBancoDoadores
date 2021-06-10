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
import { ObjectUtils } from './objectutils';
var FilterUtils = /** @class */ (function () {
    function FilterUtils() {
    }
    FilterUtils.filter = function (value, fields, filterValue, filterMatchMode) {
        var e_1, _a, e_2, _b;
        var filteredItems = [];
        var filterText = ObjectUtils.removeAccents(filterValue).toLowerCase();
        if (value) {
            try {
                for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                    var item = value_1_1.value;
                    try {
                        for (var fields_1 = (e_2 = void 0, __values(fields)), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                            var field = fields_1_1.value;
                            var fieldValue = ObjectUtils.removeAccents(String(ObjectUtils.resolveFieldData(item, field))).toLowerCase();
                            if (FilterUtils[filterMatchMode](fieldValue, filterText)) {
                                filteredItems.push(item);
                                break;
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (fields_1_1 && !fields_1_1.done && (_b = fields_1.return)) _b.call(fields_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (value_1_1 && !value_1_1.done && (_a = value_1.return)) _a.call(value_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return filteredItems;
    };
    FilterUtils.startsWith = function (value, filter) {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        var filterValue = ObjectUtils.removeAccents(filter.toString()).toLowerCase();
        var stringValue = ObjectUtils.removeAccents(value.toString()).toLowerCase();
        return stringValue.slice(0, filterValue.length) === filterValue;
    };
    FilterUtils.contains = function (value, filter) {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        var filterValue = ObjectUtils.removeAccents(filter.toString()).toLowerCase();
        var stringValue = ObjectUtils.removeAccents(value.toString()).toLowerCase();
        return stringValue.indexOf(filterValue) !== -1;
    };
    FilterUtils.endsWith = function (value, filter) {
        if (filter === undefined || filter === null || filter.trim() === '') {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        var filterValue = ObjectUtils.removeAccents(filter.toString()).toLowerCase();
        var stringValue = ObjectUtils.removeAccents(value.toString()).toLowerCase();
        return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    };
    FilterUtils.equals = function (value, filter) {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        if (value.getTime && filter.getTime)
            return value.getTime() === filter.getTime();
        else
            return ObjectUtils.removeAccents(value.toString()).toLowerCase() == ObjectUtils.removeAccents(filter.toString()).toLowerCase();
    };
    FilterUtils.notEquals = function (value, filter) {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return false;
        }
        if (value === undefined || value === null) {
            return true;
        }
        if (value.getTime && filter.getTime)
            return value.getTime() !== filter.getTime();
        else
            return ObjectUtils.removeAccents(value.toString()).toLowerCase() != ObjectUtils.removeAccents(filter.toString()).toLowerCase();
    };
    FilterUtils.in = function (value, filter) {
        if (filter === undefined || filter === null || filter.length === 0) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        for (var i = 0; i < filter.length; i++) {
            if (filter[i] === value || (value.getTime && filter[i].getTime && value.getTime() === filter[i].getTime())) {
                return true;
            }
        }
        return false;
    };
    FilterUtils.lt = function (value, filter) {
        if (filter === undefined || filter === null) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        if (value.getTime && filter.getTime)
            return value.getTime() < filter.getTime();
        else
            return value < filter;
    };
    FilterUtils.lte = function (value, filter) {
        if (filter === undefined || filter === null) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        if (value.getTime && filter.getTime)
            return value.getTime() <= filter.getTime();
        else
            return value <= filter;
    };
    FilterUtils.gt = function (value, filter) {
        if (filter === undefined || filter === null) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        if (value.getTime && filter.getTime)
            return value.getTime() > filter.getTime();
        else
            return value > filter;
    };
    FilterUtils.gte = function (value, filter) {
        if (filter === undefined || filter === null) {
            return true;
        }
        if (value === undefined || value === null) {
            return false;
        }
        if (value.getTime && filter.getTime)
            return value.getTime() >= filter.getTime();
        else
            return value >= filter;
    };
    return FilterUtils;
}());
export { FilterUtils };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVydXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3V0aWxzLyIsInNvdXJjZXMiOlsiZmlsdGVydXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVDO0lBQUE7SUE4S0EsQ0FBQztJQTVLaUIsa0JBQU0sR0FBcEIsVUFBcUIsS0FBWSxFQUFFLE1BQWEsRUFBRSxXQUFtQixFQUFFLGVBQXVCOztRQUMxRixJQUFJLGFBQWEsR0FBVSxFQUFFLENBQUM7UUFDOUIsSUFBSSxVQUFVLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUV0RSxJQUFJLEtBQUssRUFBRTs7Z0JBQ1AsS0FBaUIsSUFBQSxVQUFBLFNBQUEsS0FBSyxDQUFBLDRCQUFBLCtDQUFFO29CQUFuQixJQUFJLElBQUksa0JBQUE7O3dCQUNULEtBQWtCLElBQUEsMEJBQUEsU0FBQSxNQUFNLENBQUEsQ0FBQSw4QkFBQSxrREFBRTs0QkFBckIsSUFBSSxLQUFLLG1CQUFBOzRCQUNWLElBQUksVUFBVSxHQUFHLFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUU1RyxJQUFJLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxVQUFVLEVBQUMsVUFBVSxDQUFDLEVBQUU7Z0NBQ3JELGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3pCLE1BQU07NkJBQ1Q7eUJBQ0o7Ozs7Ozs7OztpQkFDSjs7Ozs7Ozs7O1NBQ0o7UUFFRCxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRWEsc0JBQVUsR0FBeEIsVUFBeUIsS0FBSyxFQUFFLE1BQU07UUFDbEMsSUFBSSxNQUFNLEtB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TztZQUMvQixPQUFPLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7O1lBRTNDLE9BQU8sS0FBSyxJQUFJLE1BQU0sQ0FBQztJQUMvQixDQUFDO0lBRWEsY0FBRSxHQUFoQixVQUFpQixLQUFLLEVBQUUsTUFBTTtRQUMxQixJQUFJLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUN6QyxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDdkMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU87WUFDL0IsT0FBTyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDOztZQUUxQyxPQUFPLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDOUIsQ0FBQztJQUVhLGVBQUcsR0FBakIsVUFBa0IsS0FBSyxFQUFFLE1BQU07UUFDM0IsSUFBSSxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDekMsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUVELElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ3ZDLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPO1lBQy9CLE9BQU8sS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7WUFFM0MsT0FBTyxLQUFLLElBQUksTUFBTSxDQUFDO0lBQy9CLENBQUM7SUFDTCxrQkFBQztBQUFELENBQUMsQUE5S0QsSUE4S0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJy4vb2JqZWN0dXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgRmlsdGVyVXRpbHMge1xuXG4gICAgcHVibGljIHN0YXRpYyBmaWx0ZXIodmFsdWU6IGFueVtdLCBmaWVsZHM6IGFueVtdLCBmaWx0ZXJWYWx1ZTogc3RyaW5nLCBmaWx0ZXJNYXRjaE1vZGU6IHN0cmluZykge1xuICAgICAgICBsZXQgZmlsdGVyZWRJdGVtczogYW55W10gPSBbXTtcbiAgICAgICAgbGV0IGZpbHRlclRleHQgPSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKGZpbHRlclZhbHVlKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGZpZWxkIG9mIGZpZWxkcykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZmllbGRWYWx1ZSA9IE9iamVjdFV0aWxzLnJlbW92ZUFjY2VudHMoU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoaXRlbSwgZmllbGQpKSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChGaWx0ZXJVdGlsc1tmaWx0ZXJNYXRjaE1vZGVdKGZpZWxkVmFsdWUsZmlsdGVyVGV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcmVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkSXRlbXM7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzdGFydHNXaXRoKHZhbHVlLCBmaWx0ZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCBmaWx0ZXIudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpbHRlclZhbHVlID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyhmaWx0ZXIudG9TdHJpbmcoKSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IHN0cmluZ1ZhbHVlID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyh2YWx1ZS50b1N0cmluZygpKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHJpbmdWYWx1ZS5zbGljZSgwLCBmaWx0ZXJWYWx1ZS5sZW5ndGgpID09PSBmaWx0ZXJWYWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNvbnRhaW5zKHZhbHVlLCBmaWx0ZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCAodHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZycgJiYgZmlsdGVyLnRyaW0oKSA9PT0gJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKGZpbHRlci50b1N0cmluZygpKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsZXQgc3RyaW5nVmFsdWUgPSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKHZhbHVlLnRvU3RyaW5nKCkpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIHN0cmluZ1ZhbHVlLmluZGV4T2YoZmlsdGVyVmFsdWUpICE9PSAtMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGVuZHNXaXRoKHZhbHVlLCBmaWx0ZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCBmaWx0ZXIudHJpbSgpID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZpbHRlclZhbHVlID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyhmaWx0ZXIudG9TdHJpbmcoKSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IHN0cmluZ1ZhbHVlID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyh2YWx1ZS50b1N0cmluZygpKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJldHVybiBzdHJpbmdWYWx1ZS5pbmRleE9mKGZpbHRlclZhbHVlLCBzdHJpbmdWYWx1ZS5sZW5ndGggLSBmaWx0ZXJWYWx1ZS5sZW5ndGgpICE9PSAtMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGVxdWFscyh2YWx1ZSwgZmlsdGVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChmaWx0ZXIgPT09IHVuZGVmaW5lZCB8fCBmaWx0ZXIgPT09IG51bGwgfHwgKHR5cGVvZiBmaWx0ZXIgPT09ICdzdHJpbmcnICYmIGZpbHRlci50cmltKCkgPT09ICcnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlLmdldFRpbWUgJiYgZmlsdGVyLmdldFRpbWUpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZ2V0VGltZSgpID09PSBmaWx0ZXIuZ2V0VGltZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyh2YWx1ZS50b1N0cmluZygpKS50b0xvd2VyQ2FzZSgpID09IE9iamVjdFV0aWxzLnJlbW92ZUFjY2VudHMoZmlsdGVyLnRvU3RyaW5nKCkpLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBub3RFcXVhbHModmFsdWUsIGZpbHRlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZmlsdGVyID09PSB1bmRlZmluZWQgfHwgZmlsdGVyID09PSBudWxsIHx8ICh0eXBlb2YgZmlsdGVyID09PSAnc3RyaW5nJyAmJiBmaWx0ZXIudHJpbSgpID09PSAnJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZS5nZXRUaW1lICYmIGZpbHRlci5nZXRUaW1lKVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmdldFRpbWUoKSAhPT0gZmlsdGVyLmdldFRpbWUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLnJlbW92ZUFjY2VudHModmFsdWUudG9TdHJpbmcoKSkudG9Mb3dlckNhc2UoKSAhPSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKGZpbHRlci50b1N0cmluZygpKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaW4odmFsdWUsIGZpbHRlcjogYW55W10pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCB8fCBmaWx0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbHRlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGZpbHRlcltpXSA9PT0gdmFsdWUgfHwgKHZhbHVlLmdldFRpbWUgJiYgZmlsdGVyW2ldLmdldFRpbWUgJiYgdmFsdWUuZ2V0VGltZSgpID09PSBmaWx0ZXJbaV0uZ2V0VGltZSgpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgbHQodmFsdWUsIGZpbHRlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZmlsdGVyID09PSB1bmRlZmluZWQgfHwgZmlsdGVyID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUuZ2V0VGltZSAmJiBmaWx0ZXIuZ2V0VGltZSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5nZXRUaW1lKCkgPCBmaWx0ZXIuZ2V0VGltZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPCBmaWx0ZXI7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgbHRlKHZhbHVlLCBmaWx0ZXIpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkIHx8IGZpbHRlciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlLmdldFRpbWUgJiYgZmlsdGVyLmdldFRpbWUpXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUuZ2V0VGltZSgpIDw9IGZpbHRlci5nZXRUaW1lKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA8PSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBndCh2YWx1ZSwgZmlsdGVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChmaWx0ZXIgPT09IHVuZGVmaW5lZCB8fCBmaWx0ZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZS5nZXRUaW1lICYmIGZpbHRlci5nZXRUaW1lKVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmdldFRpbWUoKSA+IGZpbHRlci5nZXRUaW1lKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSA+IGZpbHRlcjtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHN0YXRpYyBndGUodmFsdWUsIGZpbHRlcik6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZmlsdGVyID09PSB1bmRlZmluZWQgfHwgZmlsdGVyID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUuZ2V0VGltZSAmJiBmaWx0ZXIuZ2V0VGltZSlcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5nZXRUaW1lKCkgPj0gZmlsdGVyLmdldFRpbWUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlID49IGZpbHRlcjtcbiAgICB9XG59XG4iXX0=