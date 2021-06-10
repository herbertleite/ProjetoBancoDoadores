(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/animations'), require('@angular/common'), require('primeng/api')) :
    typeof define === 'function' && define.amd ? define('primeng/organizationchart', ['exports', '@angular/core', '@angular/animations', '@angular/common', 'primeng/api'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.organizationchart = {}), global.ng.core, global.ng.animations, global.ng.common, global.primeng.api));
}(this, (function (exports, core, animations, common, api) { 'use strict';

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
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
    var OrganizationChartNode = /** @class */ (function () {
        function OrganizationChartNode(chart) {
            this.chart = chart;
        }
        Object.defineProperty(OrganizationChartNode.prototype, "leaf", {
            get: function () {
                return this.node.leaf == false ? false : !(this.node.children && this.node.children.length);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OrganizationChartNode.prototype, "colspan", {
            get: function () {
                return (this.node.children && this.node.children.length) ? this.node.children.length * 2 : null;
            },
            enumerable: true,
            configurable: true
        });
        OrganizationChartNode.prototype.onNodeClick = function (event, node) {
            this.chart.onNodeClick(event, node);
        };
        OrganizationChartNode.prototype.toggleNode = function (event, node) {
            node.expanded = !node.expanded;
            if (node.expanded)
                this.chart.onNodeExpand.emit({ originalEvent: event, node: this.node });
            else
                this.chart.onNodeCollapse.emit({ originalEvent: event, node: this.node });
            event.preventDefault();
        };
        OrganizationChartNode.prototype.isSelected = function () {
            return this.chart.isSelected(this.node);
        };
        OrganizationChartNode.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return OrganizationChart; }),] }] }
        ]; };
        __decorate([
            core.Input()
        ], OrganizationChartNode.prototype, "node", void 0);
        __decorate([
            core.Input()
        ], OrganizationChartNode.prototype, "root", void 0);
        __decorate([
            core.Input()
        ], OrganizationChartNode.prototype, "first", void 0);
        __decorate([
            core.Input()
        ], OrganizationChartNode.prototype, "last", void 0);
        OrganizationChartNode = __decorate([
            core.Component({
                selector: '[pOrganizationChartNode]',
                template: "\n        <tr *ngIf=\"node\">\n            <td [attr.colspan]=\"colspan\">\n                <div class=\"ui-organizationchart-node-content ui-widget-content ui-corner-all {{node.styleClass}}\" \n                    [ngClass]=\"{'ui-organizationchart-selectable-node': chart.selectionMode && node.selectable !== false,'ui-state-highlight':isSelected()}\"\n                    (click)=\"onNodeClick($event,node)\">\n                    <div *ngIf=\"!chart.getTemplateForNode(node)\">{{node.label}}</div>\n                    <div *ngIf=\"chart.getTemplateForNode(node)\">\n                        <ng-container *ngTemplateOutlet=\"chart.getTemplateForNode(node); context: {$implicit: node}\"></ng-container>\n                    </div>\n                    <a *ngIf=\"!leaf\" tabindex=\"0\" class=\"ui-node-toggler\" (click)=\"toggleNode($event, node)\" (keydown.enter)=\"toggleNode($event, node)\">\n                        <i class=\"ui-node-toggler-icon pi\" [ngClass]=\"{'pi-chevron-down': node.expanded, 'pi-chevron-up': !node.expanded}\"></i>\n                    </a>\n                </div>\n            </td>\n        </tr>\n        <tr [style.visibility]=\"!leaf&&node.expanded ? 'inherit' : 'hidden'\" class=\"ui-organizationchart-lines\" [@childState]=\"'in'\">\n            <td [attr.colspan]=\"colspan\">\n                <div class=\"ui-organizationchart-line-down\"></div>\n            </td>\n        </tr>\n        <tr [style.visibility]=\"!leaf&&node.expanded ? 'inherit' : 'hidden'\" class=\"ui-organizationchart-lines\" [@childState]=\"'in'\">\n            <ng-container *ngIf=\"node.children && node.children.length === 1\">\n                <td [attr.colspan]=\"colspan\">\n                    <div class=\"ui-organizationchart-line-down\"></div>\n                </td>\n            </ng-container>\n            <ng-container *ngIf=\"node.children && node.children.length > 1\">\n                <ng-template ngFor let-child [ngForOf]=\"node.children\" let-first=\"first\" let-last=\"last\">\n                    <td class=\"ui-organizationchart-line-left\" [ngClass]=\"{'ui-organizationchart-line-top':!first}\">&nbsp;</td>\n                    <td class=\"ui-organizationchart-line-right\" [ngClass]=\"{'ui-organizationchart-line-top':!last}\">&nbsp;</td>\n                </ng-template>\n            </ng-container>\n        </tr>\n        <tr [style.visibility]=\"!leaf&&node.expanded ? 'inherit' : 'hidden'\" class=\"ui-organizationchart-nodes\" [@childState]=\"'in'\">\n            <td *ngFor=\"let child of node.children\" colspan=\"2\">\n                <table class=\"ui-organizationchart-table\" pOrganizationChartNode [node]=\"child\"></table>\n            </td>\n        </tr>\n    ",
                animations: [
                    animations.trigger('childState', [
                        animations.state('in', animations.style({ opacity: 1 })),
                        animations.transition('void => *', [
                            animations.style({ opacity: 0 }),
                            animations.animate(150)
                        ]),
                        animations.transition('* => void', [
                            animations.animate(150, animations.style({ opacity: 0 }))
                        ])
                    ])
                ]
            }),
            __param(0, core.Inject(core.forwardRef(function () { return OrganizationChart; })))
        ], OrganizationChartNode);
        return OrganizationChartNode;
    }());
    var OrganizationChart = /** @class */ (function () {
        function OrganizationChart(el) {
            this.el = el;
            this.selectionChange = new core.EventEmitter();
            this.onNodeSelect = new core.EventEmitter();
            this.onNodeUnselect = new core.EventEmitter();
            this.onNodeExpand = new core.EventEmitter();
            this.onNodeCollapse = new core.EventEmitter();
        }
        Object.defineProperty(OrganizationChart.prototype, "root", {
            get: function () {
                return this.value && this.value.length ? this.value[0] : null;
            },
            enumerable: true,
            configurable: true
        });
        OrganizationChart.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (this.templates.length) {
                this.templateMap = {};
            }
            this.templates.forEach(function (item) {
                _this.templateMap[item.getType()] = item.template;
            });
        };
        OrganizationChart.prototype.getTemplateForNode = function (node) {
            if (this.templateMap)
                return node.type ? this.templateMap[node.type] : this.templateMap['default'];
            else
                return null;
        };
        OrganizationChart.prototype.onNodeClick = function (event, node) {
            var eventTarget = event.target;
            if (eventTarget.className && (eventTarget.className.indexOf('ui-node-toggler') !== -1 || eventTarget.className.indexOf('ui-node-toggler-icon') !== -1)) {
                return;
            }
            else if (this.selectionMode) {
                if (node.selectable === false) {
                    return;
                }
                var index_1 = this.findIndexInSelection(node);
                var selected = (index_1 >= 0);
                if (this.selectionMode === 'single') {
                    if (selected) {
                        this.selection = null;
                        this.onNodeUnselect.emit({ originalEvent: event, node: node });
                    }
                    else {
                        this.selection = node;
                        this.onNodeSelect.emit({ originalEvent: event, node: node });
                    }
                }
                else if (this.selectionMode === 'multiple') {
                    if (selected) {
                        this.selection = this.selection.filter(function (val, i) { return i != index_1; });
                        this.onNodeUnselect.emit({ originalEvent: event, node: node });
                    }
                    else {
                        this.selection = __spread(this.selection || [], [node]);
                        this.onNodeSelect.emit({ originalEvent: event, node: node });
                    }
                }
                this.selectionChange.emit(this.selection);
            }
        };
        OrganizationChart.prototype.findIndexInSelection = function (node) {
            var index = -1;
            if (this.selectionMode && this.selection) {
                if (this.selectionMode === 'single') {
                    index = (this.selection == node) ? 0 : -1;
                }
                else if (this.selectionMode === 'multiple') {
                    for (var i = 0; i < this.selection.length; i++) {
                        if (this.selection[i] == node) {
                            index = i;
                            break;
                        }
                    }
                }
            }
            return index;
        };
        OrganizationChart.prototype.isSelected = function (node) {
            return this.findIndexInSelection(node) != -1;
        };
        OrganizationChart.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        __decorate([
            core.Input()
        ], OrganizationChart.prototype, "value", void 0);
        __decorate([
            core.Input()
        ], OrganizationChart.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], OrganizationChart.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], OrganizationChart.prototype, "selectionMode", void 0);
        __decorate([
            core.Input()
        ], OrganizationChart.prototype, "selection", void 0);
        __decorate([
            core.Output()
        ], OrganizationChart.prototype, "selectionChange", void 0);
        __decorate([
            core.Output()
        ], OrganizationChart.prototype, "onNodeSelect", void 0);
        __decorate([
            core.Output()
        ], OrganizationChart.prototype, "onNodeUnselect", void 0);
        __decorate([
            core.Output()
        ], OrganizationChart.prototype, "onNodeExpand", void 0);
        __decorate([
            core.Output()
        ], OrganizationChart.prototype, "onNodeCollapse", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], OrganizationChart.prototype, "templates", void 0);
        OrganizationChart = __decorate([
            core.Component({
                selector: 'p-organizationChart',
                template: "\n        <div [ngStyle]=\"style\" [class]=\"styleClass\" [ngClass]=\"'ui-organizationchart ui-widget'\">\n            <table class=\"ui-organizationchart-table\" pOrganizationChartNode [node]=\"root\" *ngIf=\"root\"></table>\n        </div>\n    "
            })
        ], OrganizationChart);
        return OrganizationChart;
    }());
    var OrganizationChartModule = /** @class */ (function () {
        function OrganizationChartModule() {
        }
        OrganizationChartModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [OrganizationChart, api.SharedModule],
                declarations: [OrganizationChart, OrganizationChartNode]
            })
        ], OrganizationChartModule);
        return OrganizationChartModule;
    }());

    exports.OrganizationChart = OrganizationChart;
    exports.OrganizationChartModule = OrganizationChartModule;
    exports.OrganizationChartNode = OrganizationChartNode;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-organizationchart.umd.js.map
