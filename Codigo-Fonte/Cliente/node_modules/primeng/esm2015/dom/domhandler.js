/**
 * @dynamic is for runtime initializing DomHandler.browser
 *
 * If delete below comment, we can see this error message:
 *  Metadata collected contains an error that will be reported at runtime:
 *  Only initialized variables and constants can be referenced
 *  because the value of this variable is needed by the template compiler.
 */
// @dynamic
export class DomHandler {
    static addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }
    static addMultipleClasses(element, className) {
        if (element.classList) {
            let styles = className.split(' ');
            for (let i = 0; i < styles.length; i++) {
                element.classList.add(styles[i]);
            }
        }
        else {
            let styles = className.split(' ');
            for (let i = 0; i < styles.length; i++) {
                element.className += ' ' + styles[i];
            }
        }
    }
    static removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
    static hasClass(element, className) {
        if (element.classList)
            return element.classList.contains(className);
        else
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
    static siblings(element) {
        return Array.prototype.filter.call(element.parentNode.children, function (child) {
            return child !== element;
        });
    }
    static find(element, selector) {
        return Array.from(element.querySelectorAll(selector));
    }
    static findSingle(element, selector) {
        if (element) {
            return element.querySelector(selector);
        }
        return null;
    }
    static index(element) {
        let children = element.parentNode.childNodes;
        let num = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i] == element)
                return num;
            if (children[i].nodeType == 1)
                num++;
        }
        return -1;
    }
    static indexWithinGroup(element, attributeName) {
        let children = element.parentNode ? element.parentNode.childNodes : [];
        let num = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i] == element)
                return num;
            if (children[i].attributes && children[i].attributes[attributeName] && children[i].nodeType == 1)
                num++;
        }
        return -1;
    }
    static relativePosition(element, target) {
        let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
        const targetHeight = target.offsetHeight;
        const targetOffset = target.getBoundingClientRect();
        const viewport = this.getViewport();
        let top, left;
        if ((targetOffset.top + targetHeight + elementDimensions.height) > viewport.height) {
            top = -1 * (elementDimensions.height);
            if (targetOffset.top + top < 0) {
                top = -1 * targetOffset.top;
            }
        }
        else {
            top = targetHeight;
        }
        if (elementDimensions.width > viewport.width) {
            // element wider then viewport and cannot fit on screen (align at left side of viewport)
            left = targetOffset.left * -1;
        }
        else if ((targetOffset.left + elementDimensions.width) > viewport.width) {
            // element wider then viewport but can be fit on screen (align at right side of viewport)
            left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
        }
        else {
            // element fits on screen (align with target)
            left = 0;
        }
        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }
    static absolutePosition(element, target) {
        let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
        let elementOuterHeight = elementDimensions.height;
        let elementOuterWidth = elementDimensions.width;
        let targetOuterHeight = target.offsetHeight;
        let targetOuterWidth = target.offsetWidth;
        let targetOffset = target.getBoundingClientRect();
        let windowScrollTop = this.getWindowScrollTop();
        let windowScrollLeft = this.getWindowScrollLeft();
        let viewport = this.getViewport();
        let top, left;
        if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
            top = targetOffset.top + windowScrollTop - elementOuterHeight;
            if (top < 0) {
                top = windowScrollTop;
            }
        }
        else {
            top = targetOuterHeight + targetOffset.top + windowScrollTop;
        }
        if (targetOffset.left + elementOuterWidth > viewport.width)
            left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
        else
            left = targetOffset.left + windowScrollLeft;
        element.style.top = top + 'px';
        element.style.left = left + 'px';
    }
    static getHiddenElementOuterHeight(element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        let elementHeight = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return elementHeight;
    }
    static getHiddenElementOuterWidth(element) {
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        let elementWidth = element.offsetWidth;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return elementWidth;
    }
    static getHiddenElementDimensions(element) {
        let dimensions = {};
        element.style.visibility = 'hidden';
        element.style.display = 'block';
        dimensions.width = element.offsetWidth;
        dimensions.height = element.offsetHeight;
        element.style.display = 'none';
        element.style.visibility = 'visible';
        return dimensions;
    }
    static scrollInView(container, item) {
        let borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth');
        let borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
        let paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop');
        let paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
        let containerRect = container.getBoundingClientRect();
        let itemRect = item.getBoundingClientRect();
        let offset = (itemRect.top + document.body.scrollTop) - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
        let scroll = container.scrollTop;
        let elementHeight = container.clientHeight;
        let itemHeight = this.getOuterHeight(item);
        if (offset < 0) {
            container.scrollTop = scroll + offset;
        }
        else if ((offset + itemHeight) > elementHeight) {
            container.scrollTop = scroll + offset - elementHeight + itemHeight;
        }
    }
    static fadeIn(element, duration) {
        element.style.opacity = 0;
        let last = +new Date();
        let opacity = 0;
        let tick = function () {
            opacity = +element.style.opacity.replace(",", ".") + (new Date().getTime() - last) / duration;
            element.style.opacity = opacity;
            last = +new Date();
            if (+opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };
        tick();
    }
    static fadeOut(element, ms) {
        var opacity = 1, interval = 50, duration = ms, gap = interval / duration;
        let fading = setInterval(() => {
            opacity = opacity - gap;
            if (opacity <= 0) {
                opacity = 0;
                clearInterval(fading);
            }
            element.style.opacity = opacity;
        }, interval);
    }
    static getWindowScrollTop() {
        let doc = document.documentElement;
        return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    }
    static getWindowScrollLeft() {
        let doc = document.documentElement;
        return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    }
    static matches(element, selector) {
        var p = Element.prototype;
        var f = p['matches'] || p.webkitMatchesSelector || p['mozMatchesSelector'] || p['msMatchesSelector'] || function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
        return f.call(element, selector);
    }
    static getOuterWidth(el, margin) {
        let width = el.offsetWidth;
        if (margin) {
            let style = getComputedStyle(el);
            width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        }
        return width;
    }
    static getHorizontalPadding(el) {
        let style = getComputedStyle(el);
        return parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    }
    static getHorizontalMargin(el) {
        let style = getComputedStyle(el);
        return parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }
    static innerWidth(el) {
        let width = el.offsetWidth;
        let style = getComputedStyle(el);
        width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
    }
    static width(el) {
        let width = el.offsetWidth;
        let style = getComputedStyle(el);
        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        return width;
    }
    static getInnerHeight(el) {
        let height = el.offsetHeight;
        let style = getComputedStyle(el);
        height += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        return height;
    }
    static getOuterHeight(el, margin) {
        let height = el.offsetHeight;
        if (margin) {
            let style = getComputedStyle(el);
            height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
        }
        return height;
    }
    static getHeight(el) {
        let height = el.offsetHeight;
        let style = getComputedStyle(el);
        height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        return height;
    }
    static getWidth(el) {
        let width = el.offsetWidth;
        let style = getComputedStyle(el);
        width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        return width;
    }
    static getViewport() {
        let win = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h = win.innerHeight || e.clientHeight || g.clientHeight;
        return { width: w, height: h };
    }
    static getOffset(el) {
        let rect = el.getBoundingClientRect();
        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    }
    static replaceElementWith(element, replacementElement) {
        let parentNode = element.parentNode;
        if (!parentNode)
            throw `Can't replace element`;
        return parentNode.replaceChild(replacementElement, element);
    }
    static getUserAgent() {
        return navigator.userAgent;
    }
    static isIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return true;
        }
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return true;
        }
        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return true;
        }
        // other browser
        return false;
    }
    static isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
    }
    static isAndroid() {
        return /(android)/i.test(navigator.userAgent);
    }
    static appendChild(element, target) {
        if (this.isElement(target))
            target.appendChild(element);
        else if (target.el && target.el.nativeElement)
            target.el.nativeElement.appendChild(element);
        else
            throw 'Cannot append ' + target + ' to ' + element;
    }
    static removeChild(element, target) {
        if (this.isElement(target))
            target.removeChild(element);
        else if (target.el && target.el.nativeElement)
            target.el.nativeElement.removeChild(element);
        else
            throw 'Cannot remove ' + element + ' from ' + target;
    }
    static isElement(obj) {
        return (typeof HTMLElement === "object" ? obj instanceof HTMLElement :
            obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string");
    }
    static calculateScrollbarWidth(el) {
        if (el) {
            let style = getComputedStyle(el);
            return (el.offsetWidth - el.clientWidth - parseFloat(style.borderLeftWidth) - parseFloat(style.borderRightWidth));
        }
        else {
            if (this.calculatedScrollbarWidth !== null)
                return this.calculatedScrollbarWidth;
            let scrollDiv = document.createElement("div");
            scrollDiv.className = "ui-scrollbar-measure";
            document.body.appendChild(scrollDiv);
            let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
            this.calculatedScrollbarWidth = scrollbarWidth;
            return scrollbarWidth;
        }
    }
    static calculateScrollbarHeight() {
        if (this.calculatedScrollbarHeight !== null)
            return this.calculatedScrollbarHeight;
        let scrollDiv = document.createElement("div");
        scrollDiv.className = "ui-scrollbar-measure";
        document.body.appendChild(scrollDiv);
        let scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;
        document.body.removeChild(scrollDiv);
        this.calculatedScrollbarWidth = scrollbarHeight;
        return scrollbarHeight;
    }
    static invokeElementMethod(element, methodName, args) {
        element[methodName].apply(element, args);
    }
    static clearSelection() {
        if (window.getSelection) {
            if (window.getSelection().empty) {
                window.getSelection().empty();
            }
            else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
                window.getSelection().removeAllRanges();
            }
        }
        else if (document['selection'] && document['selection'].empty) {
            try {
                document['selection'].empty();
            }
            catch (error) {
                //ignore IE bug
            }
        }
    }
    static getBrowser() {
        if (!this.browser) {
            let matched = this.resolveUserAgent();
            this.browser = {};
            if (matched.browser) {
                this.browser[matched.browser] = true;
                this.browser['version'] = matched.version;
            }
            if (this.browser['chrome']) {
                this.browser['webkit'] = true;
            }
            else if (this.browser['webkit']) {
                this.browser['safari'] = true;
            }
        }
        return this.browser;
    }
    static resolveUserAgent() {
        let ua = navigator.userAgent.toLowerCase();
        let match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];
        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    }
    static isInteger(value) {
        if (Number.isInteger) {
            return Number.isInteger(value);
        }
        else {
            return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
        }
    }
    static isHidden(element) {
        return element.offsetParent === null;
    }
    static getFocusableElements(element) {
        let focusableElements = DomHandler.find(element, `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), 
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), 
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), 
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden]), 
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])`);
        let visibleFocusableElements = [];
        for (let focusableElement of focusableElements) {
            if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden")
                visibleFocusableElements.push(focusableElement);
        }
        return visibleFocusableElements;
    }
}
DomHandler.zindex = 1000;
DomHandler.calculatedScrollbarWidth = null;
DomHandler.calculatedScrollbarHeight = null;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9taGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvZG9tLyIsInNvdXJjZXMiOlsiZG9taGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztHQU9HO0FBQ0gsV0FBVztBQUNYLE1BQU0sT0FBTyxVQUFVO0lBVVosTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFZLEVBQUUsU0FBaUI7UUFDbEQsSUFBSSxPQUFPLENBQUMsU0FBUztZQUNqQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7WUFFakMsT0FBTyxDQUFDLFNBQVMsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDO0lBQzdDLENBQUM7SUFFTSxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBWSxFQUFFLFNBQWlCO1FBQzVELElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLE1BQU0sR0FBYSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwQztTQUVKO2FBQ0k7WUFDRCxJQUFJLE1BQU0sR0FBYSxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxPQUFPLENBQUMsU0FBUyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEM7U0FDSjtJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQVksRUFBRSxTQUFpQjtRQUNyRCxJQUFJLE9BQU8sQ0FBQyxTQUFTO1lBQ2pCLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztZQUVwQyxPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckksQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBWSxFQUFFLFNBQWlCO1FBQ2xELElBQUksT0FBTyxDQUFDLFNBQVM7WUFDakIsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7WUFFN0MsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxHQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQVk7UUFDL0IsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsVUFBVSxLQUFLO1lBQzNFLE9BQU8sS0FBSyxLQUFLLE9BQU8sQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQVksRUFBRSxRQUFnQjtRQUM3QyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBWSxFQUFFLFFBQWdCO1FBQ25ELElBQUksT0FBTyxFQUFFO1lBQ1QsT0FBTyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBWTtRQUM1QixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUM3QyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPO2dCQUFFLE9BQU8sR0FBRyxDQUFDO1lBQ3ZDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDO2dCQUFFLEdBQUcsRUFBRSxDQUFDO1NBQ3hDO1FBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNkLENBQUM7SUFFTSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBWSxFQUFFLGFBQXFCO1FBQzlELElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdkUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTztnQkFBRSxPQUFPLEdBQUcsQ0FBQztZQUN2QyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUM7Z0JBQUUsR0FBRyxFQUFFLENBQUM7U0FDM0c7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2QsQ0FBQztJQUVNLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFZLEVBQUUsTUFBVztRQUNwRCxJQUFJLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZKLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDekMsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDcEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLElBQUksR0FBVyxFQUFFLElBQVksQ0FBQztRQUU5QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxZQUFZLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNoRixHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QyxJQUFJLFlBQVksQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRTtnQkFDNUIsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUM7YUFDL0I7U0FDSjthQUNJO1lBQ0QsR0FBRyxHQUFHLFlBQVksQ0FBQztTQUN0QjtRQUVELElBQUksaUJBQWlCLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDMUMsd0ZBQXdGO1lBQ3hGLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO2FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRTtZQUNyRSx5RkFBeUY7WUFDekYsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzlFO2FBQ0k7WUFDRCw2Q0FBNkM7WUFDN0MsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUNaO1FBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztRQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBWSxFQUFFLE1BQVc7UUFDcEQsSUFBSSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2SixJQUFJLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztRQUNsRCxJQUFJLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQztRQUNoRCxJQUFJLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDNUMsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQzFDLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2xELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQ2hELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDbEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLElBQUksR0FBRyxFQUFFLElBQUksQ0FBQztRQUVkLElBQUksWUFBWSxDQUFDLEdBQUcsR0FBRyxpQkFBaUIsR0FBRyxrQkFBa0IsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFO1lBQzdFLEdBQUcsR0FBRyxZQUFZLENBQUMsR0FBRyxHQUFHLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQztZQUM5RCxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7Z0JBQ1QsR0FBRyxHQUFHLGVBQWUsQ0FBQzthQUN6QjtTQUNKO2FBQ0k7WUFDRCxHQUFHLEdBQUcsaUJBQWlCLEdBQUcsWUFBWSxDQUFDLEdBQUcsR0FBRyxlQUFlLENBQUM7U0FDaEU7UUFFRCxJQUFJLFlBQVksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLEtBQUs7WUFDdEQsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLEdBQUcsZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUMsQ0FBQzs7WUFFaEcsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLEdBQUcsZ0JBQWdCLENBQUM7UUFFaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztRQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxNQUFNLENBQUMsMkJBQTJCLENBQUMsT0FBWTtRQUNsRCxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ2hDLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUVyQyxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRU0sTUFBTSxDQUFDLDBCQUEwQixDQUFDLE9BQVk7UUFDakQsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNoQyxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFFckMsT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUVNLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxPQUFZO1FBQ2pELElBQUksVUFBVSxHQUFRLEVBQUUsQ0FBQztRQUN6QixPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ2hDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUN2QyxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUVyQyxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRU0sTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSTtRQUN0QyxJQUFJLGNBQWMsR0FBVyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzVGLElBQUksU0FBUyxHQUFXLGNBQWMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEUsSUFBSSxlQUFlLEdBQVcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekYsSUFBSSxVQUFVLEdBQVcsZUFBZSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUN0RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM1QyxJQUFJLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQy9ILElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDakMsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztRQUMzQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNDLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNaLFNBQVMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN6QzthQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsYUFBYSxFQUFFO1lBQzVDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxhQUFhLEdBQUcsVUFBVSxDQUFDO1NBQ3RFO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQWdCO1FBQzFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUUxQixJQUFJLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksSUFBSSxHQUFHO1lBQ1AsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQzlGLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUNoQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1lBRW5CLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFO2dCQUNkLENBQUMsTUFBTSxDQUFDLHFCQUFxQixJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQzthQUN6RjtRQUNMLENBQUMsQ0FBQztRQUVGLElBQUksRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDN0IsSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUNYLFFBQVEsR0FBRyxFQUFFLEVBQ2IsUUFBUSxHQUFHLEVBQUUsRUFDYixHQUFHLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUU5QixJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQzFCLE9BQU8sR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBRXhCLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRTtnQkFDZCxPQUFPLEdBQUcsQ0FBQyxDQUFDO2dCQUNaLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN6QjtZQUVELE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUNwQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxrQkFBa0I7UUFDNUIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztRQUNuQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxNQUFNLENBQUMsbUJBQW1CO1FBQzdCLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7UUFDbkMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBZ0I7UUFDM0MsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLHFCQUFxQixJQUFJLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLFVBQVUsQ0FBQztZQUMvRyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN0RSxDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxNQUFPO1FBQ25DLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFFM0IsSUFBSSxNQUFNLEVBQUU7WUFDUixJQUFJLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqQyxLQUFLLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3pFO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1FBQ2pDLElBQUksS0FBSyxHQUFHLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFTSxNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBRTtRQUNoQyxJQUFJLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRU0sTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3ZCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDM0IsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFakMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2xCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDM0IsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFakMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzNCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDN0IsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFakMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN6RSxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsTUFBTztRQUNwQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBRTdCLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMxRTtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDdEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUM3QixJQUFJLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVqQyxNQUFNLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRWxKLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFTSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDckIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUMzQixJQUFJLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVqQyxLQUFLLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWpKLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVztRQUNyQixJQUFJLEdBQUcsR0FBRyxNQUFNLEVBQ1osQ0FBQyxHQUFHLFFBQVEsRUFDWixDQUFDLEdBQUcsQ0FBQyxDQUFDLGVBQWUsRUFDckIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDckMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUNwRCxDQUFDLEdBQUcsR0FBRyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUM7UUFFNUQsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFTSxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDdEIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFdEMsT0FBTztZQUNILEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUztZQUN2QyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVU7U0FDN0MsQ0FBQztJQUNOLENBQUM7SUFFTSxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBWSxFQUFFLGtCQUF1QjtRQUNsRSxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVO1lBQ1gsTUFBTSx1QkFBdUIsQ0FBQztRQUNsQyxPQUFPLFVBQVUsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVNLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRU0sTUFBTSxDQUFFLElBQUk7UUFDZixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUVwQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLElBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtZQUNWLDBDQUEwQztZQUMxQyxPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUU7WUFDYixpQ0FBaUM7WUFDakMsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixPQUFPLElBQUksQ0FBQztTQUNmO1FBRUQsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7WUFDWCx5Q0FBeUM7WUFDekMsT0FBTyxJQUFJLENBQUM7U0FDZDtRQUVELGdCQUFnQjtRQUNoQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUs7UUFDZixPQUFPLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFTO1FBQ25CLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBWSxFQUFFLE1BQVc7UUFDL0MsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUN0QixNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNCLElBQUksTUFBTSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLGFBQWE7WUFDekMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztZQUU3QyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDO0lBQzNELENBQUM7SUFFTSxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQVksRUFBRSxNQUFXO1FBQy9DLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDdEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMzQixJQUFJLE1BQU0sQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhO1lBQ3pDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7WUFFN0MsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQztJQUM3RCxDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFRO1FBQzVCLE9BQU8sQ0FBQyxPQUFPLFdBQVcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsWUFBWSxXQUFXLENBQUMsQ0FBQztZQUNsRSxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxDQUFDLElBQUksT0FBTyxHQUFHLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FDM0csQ0FBQztJQUNOLENBQUM7SUFFTSxNQUFNLENBQUMsdUJBQXVCLENBQUMsRUFBZ0I7UUFDbEQsSUFBSSxFQUFFLEVBQUU7WUFDSixJQUFJLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7U0FDckg7YUFDSTtZQUNELElBQUksSUFBSSxDQUFDLHdCQUF3QixLQUFLLElBQUk7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDO1lBRXpDLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDOUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQztZQUM3QyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVyQyxJQUFJLGNBQWMsR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUM7WUFDbkUsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFckMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLGNBQWMsQ0FBQztZQUUvQyxPQUFPLGNBQWMsQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsd0JBQXdCO1FBQ2xDLElBQUksSUFBSSxDQUFDLHlCQUF5QixLQUFLLElBQUk7WUFDdkMsT0FBTyxJQUFJLENBQUMseUJBQXlCLENBQUM7UUFFMUMsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxTQUFTLENBQUMsU0FBUyxHQUFHLHNCQUFzQixDQUFDO1FBQzdDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXJDLElBQUksZUFBZSxHQUFHLFNBQVMsQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztRQUN0RSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsZUFBZSxDQUFDO1FBRWhELE9BQU8sZUFBZSxDQUFDO0lBQzNCLENBQUM7SUFFTSxNQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBWSxFQUFFLFVBQWtCLEVBQUUsSUFBWTtRQUMzRSxPQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sTUFBTSxDQUFDLGNBQWM7UUFDeEIsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRTtnQkFDN0IsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2pDO2lCQUFNLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLGVBQWUsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3pKLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUMzQztTQUNKO2FBQ0ksSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUMzRCxJQUFJO2dCQUNBLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNqQztZQUFDLE9BQU0sS0FBSyxFQUFFO2dCQUNYLGVBQWU7YUFDbEI7U0FDSjtJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsVUFBVTtRQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBRWxCLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7YUFDN0M7WUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ2pDO2lCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDakM7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRU0sTUFBTSxDQUFDLGdCQUFnQjtRQUMxQixJQUFJLEVBQUUsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNDLElBQUksS0FBSyxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDeEMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNoQyxvQ0FBb0MsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQzdDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDMUIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksK0JBQStCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN4RSxFQUFFLENBQUM7UUFFUCxPQUFPO1lBQ0gsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQ3ZCLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRztTQUMzQixDQUFDO0lBQ04sQ0FBQztJQUVNLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSztRQUN6QixJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDbEIsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO2FBQ0k7WUFDRCxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLENBQUM7U0FDdkY7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFvQjtRQUN2QyxPQUFPLE9BQU8sQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDO0lBQ3pDLENBQUM7SUFFTSxNQUFNLENBQUMsb0JBQW9CLENBQUMsT0FBbUI7UUFDbEQsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBQzs7OztvSEFJNEQsQ0FDdkcsQ0FBQztRQUVGLElBQUksd0JBQXdCLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLEtBQUksSUFBSSxnQkFBZ0IsSUFBSSxpQkFBaUIsRUFBRTtZQUMzQyxJQUFJLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxJQUFJLE1BQU0sSUFBSSxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFVBQVUsSUFBSSxRQUFRO2dCQUNqSCx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN2RDtRQUNMLE9BQU8sd0JBQXdCLENBQUM7SUFDcEMsQ0FBQzs7QUF6aEJhLGlCQUFNLEdBQVcsSUFBSSxDQUFDO0FBRXJCLG1DQUF3QixHQUFXLElBQUksQ0FBQztBQUV4QyxvQ0FBeUIsR0FBVyxJQUFJLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBkeW5hbWljIGlzIGZvciBydW50aW1lIGluaXRpYWxpemluZyBEb21IYW5kbGVyLmJyb3dzZXJcbiAqXG4gKiBJZiBkZWxldGUgYmVsb3cgY29tbWVudCwgd2UgY2FuIHNlZSB0aGlzIGVycm9yIG1lc3NhZ2U6XG4gKiAgTWV0YWRhdGEgY29sbGVjdGVkIGNvbnRhaW5zIGFuIGVycm9yIHRoYXQgd2lsbCBiZSByZXBvcnRlZCBhdCBydW50aW1lOlxuICogIE9ubHkgaW5pdGlhbGl6ZWQgdmFyaWFibGVzIGFuZCBjb25zdGFudHMgY2FuIGJlIHJlZmVyZW5jZWRcbiAqICBiZWNhdXNlIHRoZSB2YWx1ZSBvZiB0aGlzIHZhcmlhYmxlIGlzIG5lZWRlZCBieSB0aGUgdGVtcGxhdGUgY29tcGlsZXIuXG4gKi9cbi8vIEBkeW5hbWljXG5leHBvcnQgY2xhc3MgRG9tSGFuZGxlciB7XG5cbiAgICBwdWJsaWMgc3RhdGljIHppbmRleDogbnVtYmVyID0gMTAwMDtcblxuICAgIHByaXZhdGUgc3RhdGljIGNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aDogbnVtYmVyID0gbnVsbDtcblxuICAgIHByaXZhdGUgc3RhdGljIGNhbGN1bGF0ZWRTY3JvbGxiYXJIZWlnaHQ6IG51bWJlciA9IG51bGw7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBicm93c2VyOiBhbnk7XG5cbiAgICBwdWJsaWMgc3RhdGljIGFkZENsYXNzKGVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KVxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGFkZE11bHRpcGxlQ2xhc3NlcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgICAgICAgICAgbGV0IHN0eWxlczogc3RyaW5nW10gPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHN0eWxlc1tpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzdHlsZXM6IHN0cmluZ1tdID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lICs9ICcgJyArIHN0eWxlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlQ2xhc3MoZWxlbWVudDogYW55LCBjbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBjbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBoYXNDbGFzcyhlbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdClcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgY2xhc3NOYW1lICsgJyggfCQpJywgJ2dpJykudGVzdChlbGVtZW50LmNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBzaWJsaW5ncyhlbGVtZW50OiBhbnkpOiBhbnkge1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGVsZW1lbnQucGFyZW50Tm9kZS5jaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hpbGQgIT09IGVsZW1lbnQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZmluZChlbGVtZW50OiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZmluZFNpbmdsZShlbGVtZW50OiBhbnksIHNlbGVjdG9yOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpbmRleChlbGVtZW50OiBhbnkpOiBudW1iZXIge1xuICAgICAgICBsZXQgY2hpbGRyZW4gPSBlbGVtZW50LnBhcmVudE5vZGUuY2hpbGROb2RlcztcbiAgICAgICAgbGV0IG51bSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbltpXSA9PSBlbGVtZW50KSByZXR1cm4gbnVtO1xuICAgICAgICAgICAgaWYgKGNoaWxkcmVuW2ldLm5vZGVUeXBlID09IDEpIG51bSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHN0YXRpYyBpbmRleFdpdGhpbkdyb3VwKGVsZW1lbnQ6IGFueSwgYXR0cmlidXRlTmFtZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gZWxlbWVudC5wYXJlbnROb2RlID8gZWxlbWVudC5wYXJlbnROb2RlLmNoaWxkTm9kZXMgOiBbXTtcbiAgICAgICAgbGV0IG51bSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjaGlsZHJlbltpXSA9PSBlbGVtZW50KSByZXR1cm4gbnVtO1xuICAgICAgICAgICAgaWYgKGNoaWxkcmVuW2ldLmF0dHJpYnV0ZXMgJiYgY2hpbGRyZW5baV0uYXR0cmlidXRlc1thdHRyaWJ1dGVOYW1lXSAmJiBjaGlsZHJlbltpXS5ub2RlVHlwZSA9PSAxKSBudW0rKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZWxhdGl2ZVBvc2l0aW9uKGVsZW1lbnQ6IGFueSwgdGFyZ2V0OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgbGV0IGVsZW1lbnREaW1lbnNpb25zID0gZWxlbWVudC5vZmZzZXRQYXJlbnQgPyB7IHdpZHRoOiBlbGVtZW50Lm9mZnNldFdpZHRoLCBoZWlnaHQ6IGVsZW1lbnQub2Zmc2V0SGVpZ2h0IH0gOiB0aGlzLmdldEhpZGRlbkVsZW1lbnREaW1lbnNpb25zKGVsZW1lbnQpO1xuICAgICAgICBjb25zdCB0YXJnZXRIZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBjb25zdCB0YXJnZXRPZmZzZXQgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5nZXRWaWV3cG9ydCgpO1xuICAgICAgICBsZXQgdG9wOiBudW1iZXIsIGxlZnQ6IG51bWJlcjtcblxuICAgICAgICBpZiAoKHRhcmdldE9mZnNldC50b3AgKyB0YXJnZXRIZWlnaHQgKyBlbGVtZW50RGltZW5zaW9ucy5oZWlnaHQpID4gdmlld3BvcnQuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0b3AgPSAtMSAqIChlbGVtZW50RGltZW5zaW9ucy5oZWlnaHQpO1xuICAgICAgICAgICAgaWYgKHRhcmdldE9mZnNldC50b3AgKyB0b3AgPCAwKSB7XG4gICAgICAgICAgICAgICAgdG9wID0gLTEgKiB0YXJnZXRPZmZzZXQudG9wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG9wID0gdGFyZ2V0SGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVsZW1lbnREaW1lbnNpb25zLndpZHRoID4gdmlld3BvcnQud2lkdGgpIHtcbiAgICAgICAgICAgIC8vIGVsZW1lbnQgd2lkZXIgdGhlbiB2aWV3cG9ydCBhbmQgY2Fubm90IGZpdCBvbiBzY3JlZW4gKGFsaWduIGF0IGxlZnQgc2lkZSBvZiB2aWV3cG9ydClcbiAgICAgICAgICAgIGxlZnQgPSB0YXJnZXRPZmZzZXQubGVmdCAqIC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCh0YXJnZXRPZmZzZXQubGVmdCArIGVsZW1lbnREaW1lbnNpb25zLndpZHRoKSA+IHZpZXdwb3J0LndpZHRoKSB7XG4gICAgICAgICAgICAvLyBlbGVtZW50IHdpZGVyIHRoZW4gdmlld3BvcnQgYnV0IGNhbiBiZSBmaXQgb24gc2NyZWVuIChhbGlnbiBhdCByaWdodCBzaWRlIG9mIHZpZXdwb3J0KVxuICAgICAgICAgICAgbGVmdCA9ICh0YXJnZXRPZmZzZXQubGVmdCArIGVsZW1lbnREaW1lbnNpb25zLndpZHRoIC0gdmlld3BvcnQud2lkdGgpICogLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBlbGVtZW50IGZpdHMgb24gc2NyZWVuIChhbGlnbiB3aXRoIHRhcmdldClcbiAgICAgICAgICAgIGxlZnQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGFic29sdXRlUG9zaXRpb24oZWxlbWVudDogYW55LCB0YXJnZXQ6IGFueSk6IHZvaWQge1xuICAgICAgICBsZXQgZWxlbWVudERpbWVuc2lvbnMgPSBlbGVtZW50Lm9mZnNldFBhcmVudCA/IHsgd2lkdGg6IGVsZW1lbnQub2Zmc2V0V2lkdGgsIGhlaWdodDogZWxlbWVudC5vZmZzZXRIZWlnaHQgfSA6IHRoaXMuZ2V0SGlkZGVuRWxlbWVudERpbWVuc2lvbnMoZWxlbWVudCk7XG4gICAgICAgIGxldCBlbGVtZW50T3V0ZXJIZWlnaHQgPSBlbGVtZW50RGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgIGxldCBlbGVtZW50T3V0ZXJXaWR0aCA9IGVsZW1lbnREaW1lbnNpb25zLndpZHRoO1xuICAgICAgICBsZXQgdGFyZ2V0T3V0ZXJIZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBsZXQgdGFyZ2V0T3V0ZXJXaWR0aCA9IHRhcmdldC5vZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IHRhcmdldE9mZnNldCA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgbGV0IHdpbmRvd1Njcm9sbFRvcCA9IHRoaXMuZ2V0V2luZG93U2Nyb2xsVG9wKCk7XG4gICAgICAgIGxldCB3aW5kb3dTY3JvbGxMZWZ0ID0gdGhpcy5nZXRXaW5kb3dTY3JvbGxMZWZ0KCk7XG4gICAgICAgIGxldCB2aWV3cG9ydCA9IHRoaXMuZ2V0Vmlld3BvcnQoKTtcbiAgICAgICAgbGV0IHRvcCwgbGVmdDtcblxuICAgICAgICBpZiAodGFyZ2V0T2Zmc2V0LnRvcCArIHRhcmdldE91dGVySGVpZ2h0ICsgZWxlbWVudE91dGVySGVpZ2h0ID4gdmlld3BvcnQuaGVpZ2h0KSB7XG4gICAgICAgICAgICB0b3AgPSB0YXJnZXRPZmZzZXQudG9wICsgd2luZG93U2Nyb2xsVG9wIC0gZWxlbWVudE91dGVySGVpZ2h0O1xuICAgICAgICAgICAgaWYgKHRvcCA8IDApIHtcbiAgICAgICAgICAgICAgICB0b3AgPSB3aW5kb3dTY3JvbGxUb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdG9wID0gdGFyZ2V0T3V0ZXJIZWlnaHQgKyB0YXJnZXRPZmZzZXQudG9wICsgd2luZG93U2Nyb2xsVG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldE9mZnNldC5sZWZ0ICsgZWxlbWVudE91dGVyV2lkdGggPiB2aWV3cG9ydC53aWR0aClcbiAgICAgICAgICAgIGxlZnQgPSBNYXRoLm1heCgwLCB0YXJnZXRPZmZzZXQubGVmdCArIHdpbmRvd1Njcm9sbExlZnQgKyB0YXJnZXRPdXRlcldpZHRoIC0gZWxlbWVudE91dGVyV2lkdGgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBsZWZ0ID0gdGFyZ2V0T2Zmc2V0LmxlZnQgKyB3aW5kb3dTY3JvbGxMZWZ0O1xuXG4gICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRIaWRkZW5FbGVtZW50T3V0ZXJIZWlnaHQoZWxlbWVudDogYW55KTogbnVtYmVyIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGxldCBlbGVtZW50SGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50SGVpZ2h0O1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SGlkZGVuRWxlbWVudE91dGVyV2lkdGgoZWxlbWVudDogYW55KTogbnVtYmVyIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIGxldCBlbGVtZW50V2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcblxuICAgICAgICByZXR1cm4gZWxlbWVudFdpZHRoO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SGlkZGVuRWxlbWVudERpbWVuc2lvbnMoZWxlbWVudDogYW55KTogYW55IHtcbiAgICAgICAgbGV0IGRpbWVuc2lvbnM6IGFueSA9IHt9O1xuICAgICAgICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgZGltZW5zaW9ucy53aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgICAgIGRpbWVuc2lvbnMuaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuXG4gICAgICAgIHJldHVybiBkaW1lbnNpb25zO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgc2Nyb2xsSW5WaWV3KGNvbnRhaW5lciwgaXRlbSkge1xuICAgICAgICBsZXQgYm9yZGVyVG9wVmFsdWU6IHN0cmluZyA9IGdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyKS5nZXRQcm9wZXJ0eVZhbHVlKCdib3JkZXJUb3BXaWR0aCcpO1xuICAgICAgICBsZXQgYm9yZGVyVG9wOiBudW1iZXIgPSBib3JkZXJUb3BWYWx1ZSA/IHBhcnNlRmxvYXQoYm9yZGVyVG9wVmFsdWUpIDogMDtcbiAgICAgICAgbGV0IHBhZGRpbmdUb3BWYWx1ZTogc3RyaW5nID0gZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmdUb3AnKTtcbiAgICAgICAgbGV0IHBhZGRpbmdUb3A6IG51bWJlciA9IHBhZGRpbmdUb3BWYWx1ZSA/IHBhcnNlRmxvYXQocGFkZGluZ1RvcFZhbHVlKSA6IDA7XG4gICAgICAgIGxldCBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgaXRlbVJlY3QgPSBpdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gKGl0ZW1SZWN0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wKSAtIChjb250YWluZXJSZWN0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wKSAtIGJvcmRlclRvcCAtIHBhZGRpbmdUb3A7XG4gICAgICAgIGxldCBzY3JvbGwgPSBjb250YWluZXIuc2Nyb2xsVG9wO1xuICAgICAgICBsZXQgZWxlbWVudEhlaWdodCA9IGNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGxldCBpdGVtSGVpZ2h0ID0gdGhpcy5nZXRPdXRlckhlaWdodChpdGVtKTtcblxuICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xuICAgICAgICAgICAgY29udGFpbmVyLnNjcm9sbFRvcCA9IHNjcm9sbCArIG9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgob2Zmc2V0ICsgaXRlbUhlaWdodCkgPiBlbGVtZW50SGVpZ2h0KSB7XG4gICAgICAgICAgICBjb250YWluZXIuc2Nyb2xsVG9wID0gc2Nyb2xsICsgb2Zmc2V0IC0gZWxlbWVudEhlaWdodCArIGl0ZW1IZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGZhZGVJbihlbGVtZW50LCBkdXJhdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG5cbiAgICAgICAgbGV0IGxhc3QgPSArbmV3IERhdGUoKTtcbiAgICAgICAgbGV0IG9wYWNpdHkgPSAwO1xuICAgICAgICBsZXQgdGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIG9wYWNpdHkgPSArZWxlbWVudC5zdHlsZS5vcGFjaXR5LnJlcGxhY2UoXCIsXCIsIFwiLlwiKSArIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGxhc3QpIC8gZHVyYXRpb247XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5O1xuICAgICAgICAgICAgbGFzdCA9ICtuZXcgRGF0ZSgpO1xuXG4gICAgICAgICAgICBpZiAoK29wYWNpdHkgPCAxKSB7XG4gICAgICAgICAgICAgICAgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiYgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spKSB8fCBzZXRUaW1lb3V0KHRpY2ssIDE2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aWNrKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBmYWRlT3V0KGVsZW1lbnQsIG1zKSB7XG4gICAgICAgIHZhciBvcGFjaXR5ID0gMSxcbiAgICAgICAgICAgIGludGVydmFsID0gNTAsXG4gICAgICAgICAgICBkdXJhdGlvbiA9IG1zLFxuICAgICAgICAgICAgZ2FwID0gaW50ZXJ2YWwgLyBkdXJhdGlvbjtcblxuICAgICAgICBsZXQgZmFkaW5nID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgb3BhY2l0eSA9IG9wYWNpdHkgLSBnYXA7XG5cbiAgICAgICAgICAgIGlmIChvcGFjaXR5IDw9IDApIHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5ID0gMDtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGZhZGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IG9wYWNpdHk7XG4gICAgICAgIH0sIGludGVydmFsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFdpbmRvd1Njcm9sbFRvcCgpOiBudW1iZXIge1xuICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZXR1cm4gKHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0V2luZG93U2Nyb2xsTGVmdCgpOiBudW1iZXIge1xuICAgICAgICBsZXQgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZXR1cm4gKHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2Muc2Nyb2xsTGVmdCkgLSAoZG9jLmNsaWVudExlZnQgfHwgMCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBtYXRjaGVzKGVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgdmFyIHAgPSBFbGVtZW50LnByb3RvdHlwZTtcbiAgICAgICAgdmFyIGYgPSBwWydtYXRjaGVzJ10gfHwgcC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgcFsnbW96TWF0Y2hlc1NlbGVjdG9yJ10gfHwgcFsnbXNNYXRjaGVzU2VsZWN0b3InXSB8fCBmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgcmV0dXJuIFtdLmluZGV4T2YuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHMpLCB0aGlzKSAhPT0gLTE7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmLmNhbGwoZWxlbWVudCwgc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0T3V0ZXJXaWR0aChlbCwgbWFyZ2luPykge1xuICAgICAgICBsZXQgd2lkdGggPSBlbC5vZmZzZXRXaWR0aDtcblxuICAgICAgICBpZiAobWFyZ2luKSB7XG4gICAgICAgICAgICBsZXQgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKTtcbiAgICAgICAgICAgIHdpZHRoICs9IHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luTGVmdCkgKyBwYXJzZUZsb2F0KHN0eWxlLm1hcmdpblJpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3aWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEhvcml6b250YWxQYWRkaW5nKGVsKSB7XG4gICAgICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nTGVmdCkgKyBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdSaWdodCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRIb3Jpem9udGFsTWFyZ2luKGVsKSB7XG4gICAgICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZS5tYXJnaW5MZWZ0KSArIHBhcnNlRmxvYXQoc3R5bGUubWFyZ2luUmlnaHQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgaW5uZXJXaWR0aChlbCkge1xuICAgICAgICBsZXQgd2lkdGggPSBlbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgbGV0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG5cbiAgICAgICAgd2lkdGggKz0gcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nTGVmdCkgKyBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdSaWdodCk7XG4gICAgICAgIHJldHVybiB3aWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHdpZHRoKGVsKSB7XG4gICAgICAgIGxldCB3aWR0aCA9IGVsLm9mZnNldFdpZHRoO1xuICAgICAgICBsZXQgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKTtcblxuICAgICAgICB3aWR0aCAtPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdMZWZ0KSArIHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ1JpZ2h0KTtcbiAgICAgICAgcmV0dXJuIHdpZHRoO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgc3RhdGljIGdldElubmVySGVpZ2h0KGVsKSB7XG4gICAgICAgIGxldCBoZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xuXG4gICAgICAgIGhlaWdodCArPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdUb3ApICsgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nQm90dG9tKTtcbiAgICAgICAgcmV0dXJuIGhlaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldE91dGVySGVpZ2h0KGVsLCBtYXJnaW4/KSB7XG4gICAgICAgIGxldCBoZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgaWYgKG1hcmdpbikge1xuICAgICAgICAgICAgbGV0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgICAgICAgICBoZWlnaHQgKz0gcGFyc2VGbG9hdChzdHlsZS5tYXJnaW5Ub3ApICsgcGFyc2VGbG9hdChzdHlsZS5tYXJnaW5Cb3R0b20pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGhlaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEhlaWdodChlbCk6IG51bWJlciB7XG4gICAgICAgIGxldCBoZWlnaHQgPSBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xuXG4gICAgICAgIGhlaWdodCAtPSBwYXJzZUZsb2F0KHN0eWxlLnBhZGRpbmdUb3ApICsgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nQm90dG9tKSArIHBhcnNlRmxvYXQoc3R5bGUuYm9yZGVyVG9wV2lkdGgpICsgcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJCb3R0b21XaWR0aCk7XG5cbiAgICAgICAgcmV0dXJuIGhlaWdodDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldFdpZHRoKGVsKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHdpZHRoID0gZWwub2Zmc2V0V2lkdGg7XG4gICAgICAgIGxldCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xuXG4gICAgICAgIHdpZHRoIC09IHBhcnNlRmxvYXQoc3R5bGUucGFkZGluZ0xlZnQpICsgcGFyc2VGbG9hdChzdHlsZS5wYWRkaW5nUmlnaHQpICsgcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJMZWZ0V2lkdGgpICsgcGFyc2VGbG9hdChzdHlsZS5ib3JkZXJSaWdodFdpZHRoKTtcblxuICAgICAgICByZXR1cm4gd2lkdGg7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRWaWV3cG9ydCgpOiBhbnkge1xuICAgICAgICBsZXQgd2luID0gd2luZG93LFxuICAgICAgICAgICAgZCA9IGRvY3VtZW50LFxuICAgICAgICAgICAgZSA9IGQuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICAgICAgZyA9IGQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXSxcbiAgICAgICAgICAgIHcgPSB3aW4uaW5uZXJXaWR0aCB8fCBlLmNsaWVudFdpZHRoIHx8IGcuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBoID0gd2luLmlubmVySGVpZ2h0IHx8IGUuY2xpZW50SGVpZ2h0IHx8IGcuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgIHJldHVybiB7IHdpZHRoOiB3LCBoZWlnaHQ6IGggfTtcbiAgICB9XG4gICAgXG4gICAgcHVibGljIHN0YXRpYyBnZXRPZmZzZXQoZWwpIHtcbiAgICAgICAgbGV0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlcGxhY2VFbGVtZW50V2l0aChlbGVtZW50OiBhbnksIHJlcGxhY2VtZW50RWxlbWVudDogYW55KTogYW55IHtcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIGlmICghcGFyZW50Tm9kZSkgXG4gICAgICAgICAgICB0aHJvdyBgQ2FuJ3QgcmVwbGFjZSBlbGVtZW50YDtcbiAgICAgICAgcmV0dXJuIHBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHJlcGxhY2VtZW50RWxlbWVudCwgZWxlbWVudCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRVc2VyQWdlbnQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyAgaXNJRSgpIHtcbiAgICAgICAgdmFyIHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbiAgICAgICAgdmFyIG1zaWUgPSB1YS5pbmRleE9mKCdNU0lFICcpO1xuICAgICAgICBpZiAobXNpZSA+IDApIHtcbiAgICAgICAgICAgIC8vIElFIDEwIG9yIG9sZGVyID0+IHJldHVybiB2ZXJzaW9uIG51bWJlclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdHJpZGVudCA9IHVhLmluZGV4T2YoJ1RyaWRlbnQvJyk7XG4gICAgICAgIGlmICh0cmlkZW50ID4gMCkge1xuICAgICAgICAgICAgLy8gSUUgMTEgPT4gcmV0dXJuIHZlcnNpb24gbnVtYmVyXG4gICAgICAgICAgICB2YXIgcnYgPSB1YS5pbmRleE9mKCdydjonKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVkZ2UgPSB1YS5pbmRleE9mKCdFZGdlLycpO1xuICAgICAgICBpZiAoZWRnZSA+IDApIHtcbiAgICAgICAgICAgLy8gRWRnZSAoSUUgMTIrKSA9PiByZXR1cm4gdmVyc2lvbiBudW1iZXJcbiAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvdGhlciBicm93c2VyXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzSU9TKCkge1xuICAgICAgICByZXR1cm4gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIXdpbmRvd1snTVNTdHJlYW0nXTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzQW5kcm9pZCgpIHtcbiAgICAgICAgcmV0dXJuIC8oYW5kcm9pZCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIH1cbiAgICAgXG4gICAgcHVibGljIHN0YXRpYyBhcHBlbmRDaGlsZChlbGVtZW50OiBhbnksIHRhcmdldDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRWxlbWVudCh0YXJnZXQpKVxuICAgICAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgICAgICBlbHNlIGlmICh0YXJnZXQuZWwgJiYgdGFyZ2V0LmVsLm5hdGl2ZUVsZW1lbnQpXG4gICAgICAgICAgICB0YXJnZXQuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhyb3cgJ0Nhbm5vdCBhcHBlbmQgJyArIHRhcmdldCArICcgdG8gJyArIGVsZW1lbnQ7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgcmVtb3ZlQ2hpbGQoZWxlbWVudDogYW55LCB0YXJnZXQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5pc0VsZW1lbnQodGFyZ2V0KSlcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0LmVsICYmIHRhcmdldC5lbC5uYXRpdmVFbGVtZW50KVxuICAgICAgICAgICAgdGFyZ2V0LmVsLm5hdGl2ZUVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRocm93ICdDYW5ub3QgcmVtb3ZlICcgKyBlbGVtZW50ICsgJyBmcm9tICcgKyB0YXJnZXQ7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgaXNFbGVtZW50KG9iajogYW55KSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSBcIm9iamVjdFwiID8gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgOlxuICAgICAgICAgICAgb2JqICYmIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgb2JqICE9PSBudWxsICYmIG9iai5ub2RlVHlwZSA9PT0gMSAmJiB0eXBlb2Ygb2JqLm5vZGVOYW1lID09PSBcInN0cmluZ1wiXG4gICAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzdGF0aWMgY2FsY3VsYXRlU2Nyb2xsYmFyV2lkdGgoZWw/OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgICAgIGlmIChlbCkge1xuICAgICAgICAgICAgbGV0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgICAgICAgICByZXR1cm4gKGVsLm9mZnNldFdpZHRoIC0gZWwuY2xpZW50V2lkdGggLSBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlckxlZnRXaWR0aCkgLSBwYXJzZUZsb2F0KHN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aCAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGg7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgc2Nyb2xsRGl2LmNsYXNzTmFtZSA9IFwidWktc2Nyb2xsYmFyLW1lYXN1cmVcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KTtcblxuICAgICAgICAgICAgbGV0IHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xuXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZWRTY3JvbGxiYXJXaWR0aCA9IHNjcm9sbGJhcldpZHRoO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGNhbGN1bGF0ZVNjcm9sbGJhckhlaWdodCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFySGVpZ2h0ICE9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRlZFNjcm9sbGJhckhlaWdodDtcbiAgICAgICAgXG4gICAgICAgIGxldCBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzY3JvbGxEaXYuY2xhc3NOYW1lID0gXCJ1aS1zY3JvbGxiYXItbWVhc3VyZVwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbERpdik7XG5cbiAgICAgICAgbGV0IHNjcm9sbGJhckhlaWdodCA9IHNjcm9sbERpdi5vZmZzZXRIZWlnaHQgLSBzY3JvbGxEaXYuY2xpZW50SGVpZ2h0O1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdik7XG5cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVkU2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxiYXJIZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gc2Nyb2xsYmFySGVpZ2h0O1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgc3RhdGljIGludm9rZUVsZW1lbnRNZXRob2QoZWxlbWVudDogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsIGFyZ3M/OiBhbnlbXSk6IHZvaWQge1xuICAgICAgICAoZWxlbWVudCBhcyBhbnkpW21ldGhvZE5hbWVdLmFwcGx5KGVsZW1lbnQsIGFyZ3MpO1xuICAgIH1cbiAgICBcbiAgICBwdWJsaWMgc3RhdGljIGNsZWFyU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5lbXB0eSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5lbXB0eSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzICYmIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yYW5nZUNvdW50ID4gMCAmJiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCgwKS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnRbJ3NlbGVjdGlvbiddICYmIGRvY3VtZW50WydzZWxlY3Rpb24nXS5lbXB0eSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudFsnc2VsZWN0aW9uJ10uZW1wdHkoKTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAvL2lnbm9yZSBJRSBidWdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QnJvd3NlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmJyb3dzZXIpIHtcbiAgICAgICAgICAgIGxldCBtYXRjaGVkID0gdGhpcy5yZXNvbHZlVXNlckFnZW50KCk7XG4gICAgICAgICAgICB0aGlzLmJyb3dzZXIgPSB7fTtcblxuICAgICAgICAgICAgaWYgKG1hdGNoZWQuYnJvd3Nlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuYnJvd3NlclttYXRjaGVkLmJyb3dzZXJdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmJyb3dzZXJbJ3ZlcnNpb24nXSA9IG1hdGNoZWQudmVyc2lvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuYnJvd3NlclsnY2hyb21lJ10pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJyb3dzZXJbJ3dlYmtpdCddID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5icm93c2VyWyd3ZWJraXQnXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnJvd3Nlclsnc2FmYXJpJ10gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYnJvd3NlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHJlc29sdmVVc2VyQWdlbnQoKSB7XG4gICAgICAgIGxldCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IG1hdGNoID0gLyhjaHJvbWUpWyBcXC9dKFtcXHcuXSspLy5leGVjKHVhKSB8fFxuICAgICAgICAgICAgLyh3ZWJraXQpWyBcXC9dKFtcXHcuXSspLy5leGVjKHVhKSB8fFxuICAgICAgICAgICAgLyhvcGVyYSkoPzouKnZlcnNpb258KVsgXFwvXShbXFx3Ll0rKS8uZXhlYyh1YSkgfHxcbiAgICAgICAgICAgIC8obXNpZSkgKFtcXHcuXSspLy5leGVjKHVhKSB8fFxuICAgICAgICAgICAgdWEuaW5kZXhPZihcImNvbXBhdGlibGVcIikgPCAwICYmIC8obW96aWxsYSkoPzouKj8gcnY6KFtcXHcuXSspfCkvLmV4ZWModWEpIHx8XG4gICAgICAgICAgICBbXTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnJvd3NlcjogbWF0Y2hbMV0gfHwgXCJcIixcbiAgICAgICAgICAgIHZlcnNpb246IG1hdGNoWzJdIHx8IFwiMFwiXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBpc0ludGVnZXIodmFsdWUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgaXNGaW5pdGUodmFsdWUpICYmICBNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGlzSGlkZGVuKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBlbGVtZW50Lm9mZnNldFBhcmVudCA9PT0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIGdldEZvY3VzYWJsZUVsZW1lbnRzKGVsZW1lbnQ6SFRNTEVsZW1lbnQpIHtcbiAgICAgICAgbGV0IGZvY3VzYWJsZUVsZW1lbnRzID0gRG9tSGFuZGxlci5maW5kKGVsZW1lbnQsYGJ1dHRvbjpub3QoW3RhYmluZGV4ID0gXCItMVwiXSk6bm90KFtkaXNhYmxlZF0pOm5vdChbc3R5bGUqPVwiZGlzcGxheTpub25lXCJdKTpub3QoW2hpZGRlbl0pLCBcbiAgICAgICAgICAgICAgICBbaHJlZl1bY2xpZW50SGVpZ2h0XVtjbGllbnRXaWR0aF06bm90KFt0YWJpbmRleCA9IFwiLTFcIl0pOm5vdChbZGlzYWJsZWRdKTpub3QoW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXSk6bm90KFtoaWRkZW5dKSwgXG4gICAgICAgICAgICAgICAgaW5wdXQ6bm90KFt0YWJpbmRleCA9IFwiLTFcIl0pOm5vdChbZGlzYWJsZWRdKTpub3QoW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXSk6bm90KFtoaWRkZW5dKSwgc2VsZWN0Om5vdChbdGFiaW5kZXggPSBcIi0xXCJdKTpub3QoW2Rpc2FibGVkXSk6bm90KFtzdHlsZSo9XCJkaXNwbGF5Om5vbmVcIl0pOm5vdChbaGlkZGVuXSksIFxuICAgICAgICAgICAgICAgIHRleHRhcmVhOm5vdChbdGFiaW5kZXggPSBcIi0xXCJdKTpub3QoW2Rpc2FibGVkXSk6bm90KFtzdHlsZSo9XCJkaXNwbGF5Om5vbmVcIl0pOm5vdChbaGlkZGVuXSksIFt0YWJJbmRleF06bm90KFt0YWJJbmRleCA9IFwiLTFcIl0pOm5vdChbZGlzYWJsZWRdKTpub3QoW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXSk6bm90KFtoaWRkZW5dKSwgXG4gICAgICAgICAgICAgICAgW2NvbnRlbnRlZGl0YWJsZV06bm90KFt0YWJJbmRleCA9IFwiLTFcIl0pOm5vdChbZGlzYWJsZWRdKTpub3QoW3N0eWxlKj1cImRpc3BsYXk6bm9uZVwiXSk6bm90KFtoaWRkZW5dKWBcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxldCB2aXNpYmxlRm9jdXNhYmxlRWxlbWVudHMgPSBbXTtcbiAgICAgICAgICAgIGZvcihsZXQgZm9jdXNhYmxlRWxlbWVudCBvZiBmb2N1c2FibGVFbGVtZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKGZvY3VzYWJsZUVsZW1lbnQpLmRpc3BsYXkgIT0gXCJub25lXCIgJiYgZ2V0Q29tcHV0ZWRTdHlsZShmb2N1c2FibGVFbGVtZW50KS52aXNpYmlsaXR5ICE9IFwiaGlkZGVuXCIpXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVGb2N1c2FibGVFbGVtZW50cy5wdXNoKGZvY3VzYWJsZUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmlzaWJsZUZvY3VzYWJsZUVsZW1lbnRzO1xuICAgIH1cbn1cbiJdfQ==