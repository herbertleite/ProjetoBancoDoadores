(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('primeng/accordion'), require('primeng/autocomplete'), require('primeng/blockui'), require('primeng/breadcrumb'), require('primeng/button'), require('primeng/calendar'), require('primeng/captcha'), require('primeng/card'), require('primeng/carousel'), require('primeng/chart'), require('primeng/checkbox'), require('primeng/chips'), require('primeng/codehighlighter'), require('primeng/colorpicker'), require('primeng/api'), require('primeng/confirmdialog'), require('primeng/contextmenu'), require('primeng/dataview'), require('primeng/defer'), require('primeng/dialog'), require('primeng/dragdrop'), require('primeng/dropdown'), require('primeng/dynamicdialog'), require('primeng/editor'), require('primeng/fieldset'), require('primeng/fileupload'), require('primeng/focustrap'), require('primeng/fullcalendar'), require('primeng/galleria'), require('primeng/gmap'), require('primeng/inplace'), require('primeng/inputmask'), require('primeng/inputswitch'), require('primeng/inputtext'), require('primeng/inputtextarea'), require('primeng/keyfilter'), require('primeng/lightbox'), require('primeng/listbox'), require('primeng/megamenu'), require('primeng/menu'), require('primeng/menubar'), require('primeng/message'), require('primeng/messages'), require('primeng/multiselect'), require('primeng/orderlist'), require('primeng/organizationchart'), require('primeng/overlaypanel'), require('primeng/paginator'), require('primeng/panel'), require('primeng/panelmenu'), require('primeng/password'), require('primeng/picklist'), require('primeng/progressbar'), require('primeng/progressspinner'), require('primeng/radiobutton'), require('primeng/rating'), require('primeng/scrollpanel'), require('primeng/selectbutton'), require('primeng/sidebar'), require('primeng/slidemenu'), require('primeng/slider'), require('primeng/spinner'), require('primeng/splitbutton'), require('primeng/steps'), require('primeng/table'), require('primeng/tabmenu'), require('primeng/tabview'), require('primeng/terminal'), require('primeng/tieredmenu'), require('primeng/toast'), require('primeng/togglebutton'), require('primeng/toolbar'), require('primeng/tooltip'), require('primeng/tree'), require('primeng/treetable'), require('primeng/tristatecheckbox'), require('primeng/virtualscroller')) :
	typeof define === 'function' && define.amd ? define('primeng', ['exports', 'primeng/accordion', 'primeng/autocomplete', 'primeng/blockui', 'primeng/breadcrumb', 'primeng/button', 'primeng/calendar', 'primeng/captcha', 'primeng/card', 'primeng/carousel', 'primeng/chart', 'primeng/checkbox', 'primeng/chips', 'primeng/codehighlighter', 'primeng/colorpicker', 'primeng/api', 'primeng/confirmdialog', 'primeng/contextmenu', 'primeng/dataview', 'primeng/defer', 'primeng/dialog', 'primeng/dragdrop', 'primeng/dropdown', 'primeng/dynamicdialog', 'primeng/editor', 'primeng/fieldset', 'primeng/fileupload', 'primeng/focustrap', 'primeng/fullcalendar', 'primeng/galleria', 'primeng/gmap', 'primeng/inplace', 'primeng/inputmask', 'primeng/inputswitch', 'primeng/inputtext', 'primeng/inputtextarea', 'primeng/keyfilter', 'primeng/lightbox', 'primeng/listbox', 'primeng/megamenu', 'primeng/menu', 'primeng/menubar', 'primeng/message', 'primeng/messages', 'primeng/multiselect', 'primeng/orderlist', 'primeng/organizationchart', 'primeng/overlaypanel', 'primeng/paginator', 'primeng/panel', 'primeng/panelmenu', 'primeng/password', 'primeng/picklist', 'primeng/progressbar', 'primeng/progressspinner', 'primeng/radiobutton', 'primeng/rating', 'primeng/scrollpanel', 'primeng/selectbutton', 'primeng/sidebar', 'primeng/slidemenu', 'primeng/slider', 'primeng/spinner', 'primeng/splitbutton', 'primeng/steps', 'primeng/table', 'primeng/tabmenu', 'primeng/tabview', 'primeng/terminal', 'primeng/tieredmenu', 'primeng/toast', 'primeng/togglebutton', 'primeng/toolbar', 'primeng/tooltip', 'primeng/tree', 'primeng/treetable', 'primeng/tristatecheckbox', 'primeng/virtualscroller'], factory) :
	(global = global || self, factory(global.primeng = {}, global.primeng.accordion, global.primeng.autocomplete, global.primeng.blockui, global.primeng.breadcrumb, global.primeng.button, global.primeng.calendar, global.primeng.captcha, global.primeng.card, global.primeng.carousel, global.primeng.chart, global.primeng.checkbox, global.primeng.chips, global.primeng.codehighlighter, global.primeng.colorpicker, global.primeng.api, global.primeng.confirmdialog, global.primeng.contextmenu, global.primeng.dataview, global.primeng.defer, global.primeng.dialog, global.primeng.dragdrop, global.primeng.dropdown, global.primeng.dynamicdialog, global.primeng.editor, global.primeng.fieldset, global.primeng.fileupload, global.primeng.focustrap, global.primeng.fullcalendar, global.primeng.galleria, global.primeng.gmap, global.primeng.inplace, global.primeng.inputmask, global.primeng.inputswitch, global.primeng.inputtext, global.primeng.inputtextarea, global.primeng.keyfilter, global.primeng.lightbox, global.primeng.listbox, global.primeng.megamenu, global.primeng.menu, global.primeng.menubar, global.primeng.message, global.primeng.messages, global.primeng.multiselect, global.primeng.orderlist, global.primeng.organizationchart, global.primeng.overlaypanel, global.primeng.paginator, global.primeng.panel, global.primeng.panelmenu, global.primeng.password, global.primeng.picklist, global.primeng.progressbar, global.primeng.progressspinner, global.primeng.radiobutton, global.primeng.rating, global.primeng.scrollpanel, global.primeng.selectbutton, global.primeng.sidebar, global.primeng.slidemenu, global.primeng.slider, global.primeng.spinner, global.primeng.splitbutton, global.primeng.steps, global.primeng.table, global.primeng.tabmenu, global.primeng.tabview, global.primeng.terminal, global.primeng.tieredmenu, global.primeng.toast, global.primeng.togglebutton, global.primeng.toolbar, global.primeng.tooltip, global.primeng.tree, global.primeng.treetable, global.primeng.tristatecheckbox, global.primeng.virtualscroller));
}(this, (function (exports, accordion, autocomplete, blockui, breadcrumb, button, calendar, captcha, card, carousel, chart, checkbox, chips, codehighlighter, colorpicker, api, confirmdialog, contextmenu, dataview, defer, dialog, dragdrop, dropdown, dynamicdialog, editor, fieldset, fileupload, focustrap, fullcalendar, galleria, gmap, inplace, inputmask, inputswitch, inputtext, inputtextarea, keyfilter, lightbox, listbox, megamenu, menu, menubar, message, messages, multiselect, orderlist, organizationchart, overlaypanel, paginator, panel, panelmenu, password, picklist, progressbar, progressspinner, radiobutton, rating, scrollpanel, selectbutton, sidebar, slidemenu, slider, spinner, splitbutton, steps, table, tabmenu, tabview, terminal, tieredmenu, toast, togglebutton, toolbar, tooltip, tree, treetable, tristatecheckbox, virtualscroller) { 'use strict';

	/**
	 * Generated bundle index. Do not edit.
	 */

	Object.keys(accordion).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return accordion[k];
			}
		});
	});
	Object.keys(autocomplete).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return autocomplete[k];
			}
		});
	});
	Object.keys(blockui).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return blockui[k];
			}
		});
	});
	Object.keys(breadcrumb).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return breadcrumb[k];
			}
		});
	});
	Object.keys(button).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return button[k];
			}
		});
	});
	Object.keys(calendar).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return calendar[k];
			}
		});
	});
	Object.keys(captcha).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return captcha[k];
			}
		});
	});
	Object.keys(card).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return card[k];
			}
		});
	});
	Object.keys(carousel).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return carousel[k];
			}
		});
	});
	Object.keys(chart).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return chart[k];
			}
		});
	});
	Object.keys(checkbox).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return checkbox[k];
			}
		});
	});
	Object.keys(chips).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return chips[k];
			}
		});
	});
	Object.keys(codehighlighter).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return codehighlighter[k];
			}
		});
	});
	Object.keys(colorpicker).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return colorpicker[k];
			}
		});
	});
	Object.keys(api).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return api[k];
			}
		});
	});
	Object.keys(confirmdialog).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return confirmdialog[k];
			}
		});
	});
	Object.keys(contextmenu).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return contextmenu[k];
			}
		});
	});
	Object.keys(dataview).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return dataview[k];
			}
		});
	});
	Object.keys(defer).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return defer[k];
			}
		});
	});
	Object.keys(dialog).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return dialog[k];
			}
		});
	});
	Object.keys(dragdrop).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return dragdrop[k];
			}
		});
	});
	Object.keys(dropdown).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return dropdown[k];
			}
		});
	});
	Object.keys(dynamicdialog).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return dynamicdialog[k];
			}
		});
	});
	Object.keys(editor).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return editor[k];
			}
		});
	});
	Object.keys(fieldset).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return fieldset[k];
			}
		});
	});
	Object.keys(fileupload).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return fileupload[k];
			}
		});
	});
	Object.keys(focustrap).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return focustrap[k];
			}
		});
	});
	Object.keys(fullcalendar).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return fullcalendar[k];
			}
		});
	});
	Object.keys(galleria).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return galleria[k];
			}
		});
	});
	Object.keys(gmap).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return gmap[k];
			}
		});
	});
	Object.keys(inplace).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return inplace[k];
			}
		});
	});
	Object.keys(inputmask).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return inputmask[k];
			}
		});
	});
	Object.keys(inputswitch).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return inputswitch[k];
			}
		});
	});
	Object.keys(inputtext).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return inputtext[k];
			}
		});
	});
	Object.keys(inputtextarea).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return inputtextarea[k];
			}
		});
	});
	Object.keys(keyfilter).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return keyfilter[k];
			}
		});
	});
	Object.keys(lightbox).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return lightbox[k];
			}
		});
	});
	Object.keys(listbox).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return listbox[k];
			}
		});
	});
	Object.keys(megamenu).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return megamenu[k];
			}
		});
	});
	Object.keys(menu).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return menu[k];
			}
		});
	});
	Object.keys(menubar).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return menubar[k];
			}
		});
	});
	Object.keys(message).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return message[k];
			}
		});
	});
	Object.keys(messages).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return messages[k];
			}
		});
	});
	Object.keys(multiselect).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return multiselect[k];
			}
		});
	});
	Object.keys(orderlist).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return orderlist[k];
			}
		});
	});
	Object.keys(organizationchart).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return organizationchart[k];
			}
		});
	});
	Object.keys(overlaypanel).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return overlaypanel[k];
			}
		});
	});
	Object.keys(paginator).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return paginator[k];
			}
		});
	});
	Object.keys(panel).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return panel[k];
			}
		});
	});
	Object.keys(panelmenu).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return panelmenu[k];
			}
		});
	});
	Object.keys(password).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return password[k];
			}
		});
	});
	Object.keys(picklist).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return picklist[k];
			}
		});
	});
	Object.keys(progressbar).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return progressbar[k];
			}
		});
	});
	Object.keys(progressspinner).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return progressspinner[k];
			}
		});
	});
	Object.keys(radiobutton).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return radiobutton[k];
			}
		});
	});
	Object.keys(rating).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return rating[k];
			}
		});
	});
	Object.keys(scrollpanel).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return scrollpanel[k];
			}
		});
	});
	Object.keys(selectbutton).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return selectbutton[k];
			}
		});
	});
	Object.keys(sidebar).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return sidebar[k];
			}
		});
	});
	Object.keys(slidemenu).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return slidemenu[k];
			}
		});
	});
	Object.keys(slider).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return slider[k];
			}
		});
	});
	Object.keys(spinner).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return spinner[k];
			}
		});
	});
	Object.keys(splitbutton).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return splitbutton[k];
			}
		});
	});
	Object.keys(steps).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return steps[k];
			}
		});
	});
	Object.keys(table).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return table[k];
			}
		});
	});
	Object.keys(tabmenu).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return tabmenu[k];
			}
		});
	});
	Object.keys(tabview).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return tabview[k];
			}
		});
	});
	Object.keys(terminal).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return terminal[k];
			}
		});
	});
	Object.keys(tieredmenu).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return tieredmenu[k];
			}
		});
	});
	Object.keys(toast).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return toast[k];
			}
		});
	});
	Object.keys(togglebutton).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return togglebutton[k];
			}
		});
	});
	Object.keys(toolbar).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return toolbar[k];
			}
		});
	});
	Object.keys(tooltip).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return tooltip[k];
			}
		});
	});
	Object.keys(tree).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return tree[k];
			}
		});
	});
	Object.keys(treetable).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return treetable[k];
			}
		});
	});
	Object.keys(tristatecheckbox).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return tristatecheckbox[k];
			}
		});
	});
	Object.keys(virtualscroller).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return virtualscroller[k];
			}
		});
	});

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng.umd.js.map
