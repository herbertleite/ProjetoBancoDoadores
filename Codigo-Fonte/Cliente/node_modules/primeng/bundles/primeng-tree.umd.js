(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('primeng/utils'), require('primeng/dom')) :
    typeof define === 'function' && define.amd ? define('primeng/tree', ['exports', '@angular/core', '@angular/common', 'primeng/api', 'primeng/utils', 'primeng/dom'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.tree = {}), global.ng.core, global.ng.common, global.primeng.api, global.primeng.utils, global.primeng.dom));
}(this, (function (exports, core, common, api, utils, dom) { 'use strict';

    var __assign = (this && this.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
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
    var UITreeNode = /** @class */ (function () {
        function UITreeNode(tree) {
            this.tree = tree;
        }
        UITreeNode_1 = UITreeNode;
        UITreeNode.prototype.ngOnInit = function () {
            this.node.parent = this.parentNode;
            if (this.parentNode) {
                this.tree.syncNodeOption(this.node, this.tree.value, 'parent', this.tree.getNodeWithKey(this.parentNode.key, this.tree.value));
            }
        };
        UITreeNode.prototype.getIcon = function () {
            var icon;
            if (this.node.icon)
                icon = this.node.icon;
            else
                icon = this.node.expanded && this.node.children && this.node.children.length ? this.node.expandedIcon : this.node.collapsedIcon;
            return UITreeNode_1.ICON_CLASS + ' ' + icon;
        };
        UITreeNode.prototype.isLeaf = function () {
            return this.tree.isNodeLeaf(this.node);
        };
        UITreeNode.prototype.toggle = function (event) {
            if (this.node.expanded)
                this.collapse(event);
            else
                this.expand(event);
        };
        UITreeNode.prototype.expand = function (event) {
            this.node.expanded = true;
            this.tree.onNodeExpand.emit({ originalEvent: event, node: this.node });
        };
        UITreeNode.prototype.collapse = function (event) {
            this.node.expanded = false;
            this.tree.onNodeCollapse.emit({ originalEvent: event, node: this.node });
        };
        UITreeNode.prototype.onNodeClick = function (event) {
            this.tree.onNodeClick(event, this.node);
        };
        UITreeNode.prototype.onNodeKeydown = function (event) {
            if (event.which === 13) {
                this.tree.onNodeClick(event, this.node);
            }
        };
        UITreeNode.prototype.onNodeTouchEnd = function () {
            this.tree.onNodeTouchEnd();
        };
        UITreeNode.prototype.onNodeRightClick = function (event) {
            this.tree.onNodeRightClick(event, this.node);
        };
        UITreeNode.prototype.isSelected = function () {
            return this.tree.isSelected(this.node);
        };
        UITreeNode.prototype.onDropPoint = function (event, position) {
            var _this = this;
            event.preventDefault();
            var dragNode = this.tree.dragNode;
            var dragNodeIndex = this.tree.dragNodeIndex;
            var dragNodeScope = this.tree.dragNodeScope;
            var isValidDropPointIndex = this.tree.dragNodeTree === this.tree ? (position === 1 || dragNodeIndex !== this.index - 1) : true;
            if (this.tree.allowDrop(dragNode, this.node, dragNodeScope) && isValidDropPointIndex) {
                if (this.tree.validateDrop) {
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: this.node,
                        dropIndex: this.index,
                        accept: function () {
                            _this.processPointDrop(dragNode, dragNodeIndex, position);
                        }
                    });
                }
                else {
                    this.processPointDrop(dragNode, dragNodeIndex, position);
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: this.node,
                        dropIndex: this.index
                    });
                }
            }
            this.draghoverPrev = false;
            this.draghoverNext = false;
        };
        UITreeNode.prototype.processPointDrop = function (dragNode, dragNodeIndex, position) {
            var newNodeList = this.node.parent ? this.node.parent.children : this.tree.value;
            this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);
            var dropIndex = this.index;
            if (position < 0) {
                dropIndex = (this.tree.dragNodeSubNodes === newNodeList) ? ((this.tree.dragNodeIndex > this.index) ? this.index : this.index - 1) : this.index;
                newNodeList.splice(dropIndex, 0, dragNode);
            }
            else {
                dropIndex = newNodeList.length;
                newNodeList.push(dragNode);
            }
            this.tree.dragDropService.stopDrag({
                node: dragNode,
                subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                index: dragNodeIndex
            });
        };
        UITreeNode.prototype.onDropPointDragOver = function (event) {
            event.dataTransfer.dropEffect = 'move';
            event.preventDefault();
        };
        UITreeNode.prototype.onDropPointDragEnter = function (event, position) {
            if (this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
                if (position < 0)
                    this.draghoverPrev = true;
                else
                    this.draghoverNext = true;
            }
        };
        UITreeNode.prototype.onDropPointDragLeave = function (event) {
            this.draghoverPrev = false;
            this.draghoverNext = false;
        };
        UITreeNode.prototype.onDragStart = function (event) {
            if (this.tree.draggableNodes && this.node.draggable !== false) {
                event.dataTransfer.setData("text", "data");
                this.tree.dragDropService.startDrag({
                    tree: this,
                    node: this.node,
                    subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                    index: this.index,
                    scope: this.tree.draggableScope
                });
            }
            else {
                event.preventDefault();
            }
        };
        UITreeNode.prototype.onDragStop = function (event) {
            this.tree.dragDropService.stopDrag({
                node: this.node,
                subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                index: this.index
            });
        };
        UITreeNode.prototype.onDropNodeDragOver = function (event) {
            event.dataTransfer.dropEffect = 'move';
            if (this.tree.droppableNodes) {
                event.preventDefault();
                event.stopPropagation();
            }
        };
        UITreeNode.prototype.onDropNode = function (event) {
            var _this = this;
            if (this.tree.droppableNodes && this.node.droppable !== false) {
                event.preventDefault();
                event.stopPropagation();
                var dragNode_1 = this.tree.dragNode;
                if (this.tree.allowDrop(dragNode_1, this.node, this.tree.dragNodeScope)) {
                    if (this.tree.validateDrop) {
                        this.tree.onNodeDrop.emit({
                            originalEvent: event,
                            dragNode: dragNode_1,
                            dropNode: this.node,
                            index: this.index,
                            accept: function () {
                                _this.processNodeDrop(dragNode_1);
                            }
                        });
                    }
                    else {
                        this.processNodeDrop(dragNode_1);
                        this.tree.onNodeDrop.emit({
                            originalEvent: event,
                            dragNode: dragNode_1,
                            dropNode: this.node,
                            index: this.index
                        });
                    }
                }
            }
            this.draghoverNode = false;
        };
        UITreeNode.prototype.processNodeDrop = function (dragNode) {
            var dragNodeIndex = this.tree.dragNodeIndex;
            this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);
            if (this.node.children)
                this.node.children.push(dragNode);
            else
                this.node.children = [dragNode];
            this.tree.dragDropService.stopDrag({
                node: dragNode,
                subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                index: this.tree.dragNodeIndex
            });
        };
        UITreeNode.prototype.onDropNodeDragEnter = function (event) {
            if (this.tree.droppableNodes && this.node.droppable !== false && this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
                this.draghoverNode = true;
            }
        };
        UITreeNode.prototype.onDropNodeDragLeave = function (event) {
            if (this.tree.droppableNodes) {
                var rect = event.currentTarget.getBoundingClientRect();
                if (event.x > rect.left + rect.width || event.x < rect.left || event.y >= Math.floor(rect.top + rect.height) || event.y < rect.top) {
                    this.draghoverNode = false;
                }
            }
        };
        UITreeNode.prototype.onKeyDown = function (event) {
            var nodeElement = event.target.parentElement.parentElement;
            if (nodeElement.nodeName !== 'P-TREENODE') {
                return;
            }
            switch (event.which) {
                //down arrow
                case 40:
                    var listElement = (this.tree.droppableNodes) ? nodeElement.children[1].children[1] : nodeElement.children[0].children[1];
                    if (listElement && listElement.children.length > 0) {
                        this.focusNode(listElement.children[0]);
                    }
                    else {
                        var nextNodeElement = nodeElement.nextElementSibling;
                        if (nextNodeElement) {
                            this.focusNode(nextNodeElement);
                        }
                        else {
                            var nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement);
                            if (nextSiblingAncestor) {
                                this.focusNode(nextSiblingAncestor);
                            }
                        }
                    }
                    event.preventDefault();
                    break;
                //up arrow
                case 38:
                    if (nodeElement.previousElementSibling) {
                        this.focusNode(this.findLastVisibleDescendant(nodeElement.previousElementSibling));
                    }
                    else {
                        var parentNodeElement = this.getParentNodeElement(nodeElement);
                        if (parentNodeElement) {
                            this.focusNode(parentNodeElement);
                        }
                    }
                    event.preventDefault();
                    break;
                //right arrow
                case 39:
                    if (!this.node.expanded) {
                        this.expand(event);
                    }
                    event.preventDefault();
                    break;
                //left arrow
                case 37:
                    if (this.node.expanded) {
                        this.collapse(event);
                    }
                    else {
                        var parentNodeElement = this.getParentNodeElement(nodeElement);
                        if (parentNodeElement) {
                            this.focusNode(parentNodeElement);
                        }
                    }
                    event.preventDefault();
                    break;
                //enter
                case 13:
                    this.tree.onNodeClick(event, this.node);
                    event.preventDefault();
                    break;
                default:
                    //no op
                    break;
            }
        };
        UITreeNode.prototype.findNextSiblingOfAncestor = function (nodeElement) {
            var parentNodeElement = this.getParentNodeElement(nodeElement);
            if (parentNodeElement) {
                if (parentNodeElement.nextElementSibling)
                    return parentNodeElement.nextElementSibling;
                else
                    return this.findNextSiblingOfAncestor(parentNodeElement);
            }
            else {
                return null;
            }
        };
        UITreeNode.prototype.findLastVisibleDescendant = function (nodeElement) {
            var childrenListElement = nodeElement.children[0].children[1];
            if (childrenListElement && childrenListElement.children.length > 0) {
                var lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];
                return this.findLastVisibleDescendant(lastChildElement);
            }
            else {
                return nodeElement;
            }
        };
        UITreeNode.prototype.getParentNodeElement = function (nodeElement) {
            var parentNodeElement = nodeElement.parentElement.parentElement.parentElement;
            return parentNodeElement.tagName === 'P-TREENODE' ? parentNodeElement : null;
        };
        UITreeNode.prototype.focusNode = function (element) {
            if (this.tree.droppableNodes)
                element.children[1].children[0].focus();
            else
                element.children[0].children[0].focus();
        };
        var UITreeNode_1;
        UITreeNode.ICON_CLASS = 'ui-treenode-icon ';
        UITreeNode.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [core.forwardRef(function () { return Tree; }),] }] }
        ]; };
        __decorate([
            core.Input()
        ], UITreeNode.prototype, "node", void 0);
        __decorate([
            core.Input()
        ], UITreeNode.prototype, "parentNode", void 0);
        __decorate([
            core.Input()
        ], UITreeNode.prototype, "root", void 0);
        __decorate([
            core.Input()
        ], UITreeNode.prototype, "index", void 0);
        __decorate([
            core.Input()
        ], UITreeNode.prototype, "firstChild", void 0);
        __decorate([
            core.Input()
        ], UITreeNode.prototype, "lastChild", void 0);
        UITreeNode = UITreeNode_1 = __decorate([
            core.Component({
                selector: 'p-treeNode',
                template: "\n        <ng-template [ngIf]=\"node\">\n            <li *ngIf=\"tree.droppableNodes\" class=\"ui-treenode-droppoint\" [ngClass]=\"{'ui-treenode-droppoint-active ui-state-highlight':draghoverPrev}\"\n            (drop)=\"onDropPoint($event,-1)\" (dragover)=\"onDropPointDragOver($event)\" (dragenter)=\"onDropPointDragEnter($event,-1)\" (dragleave)=\"onDropPointDragLeave($event)\"></li>\n            <li *ngIf=\"!tree.horizontal\" role=\"treeitem\" [ngClass]=\"['ui-treenode',node.styleClass||'', isLeaf() ? 'ui-treenode-leaf': '']\">\n                <div class=\"ui-treenode-content\" (click)=\"onNodeClick($event)\" (contextmenu)=\"onNodeRightClick($event)\" (touchend)=\"onNodeTouchEnd()\"\n                    (drop)=\"onDropNode($event)\" (dragover)=\"onDropNodeDragOver($event)\" (dragenter)=\"onDropNodeDragEnter($event)\" (dragleave)=\"onDropNodeDragLeave($event)\"\n                    [draggable]=\"tree.draggableNodes\" (dragstart)=\"onDragStart($event)\" (dragend)=\"onDragStop($event)\" tabIndex=\"0\"\n                    [ngClass]=\"{'ui-treenode-selectable':tree.selectionMode && node.selectable !== false,'ui-treenode-dragover':draghoverNode, 'ui-treenode-content-selected':isSelected()}\" \n                    (keydown)=\"onKeyDown($event)\" [attr.aria-posinset]=\"this.index + 1\" [attr.aria-expanded]=\"this.node.expanded\" [attr.aria-selected]=\"isSelected()\">\n                    <span class=\"ui-tree-toggler pi pi-fw ui-unselectable-text\" [ngClass]=\"{'pi-caret-right':!node.expanded,'pi-caret-down':node.expanded}\"\n                            (click)=\"toggle($event)\"></span\n                    ><div class=\"ui-chkbox\" *ngIf=\"tree.selectionMode == 'checkbox'\" [attr.aria-checked]=\"isSelected()\"><div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-disabled': node.selectable === false}\">\n                        <span class=\"ui-chkbox-icon ui-clickable pi\"\n                            [ngClass]=\"{'pi-check':isSelected(),'pi-minus':node.partialSelected}\"></span></div></div\n                    ><span [class]=\"getIcon()\" *ngIf=\"node.icon||node.expandedIcon||node.collapsedIcon\"></span\n                    ><span class=\"ui-treenode-label ui-corner-all\"\n                        [ngClass]=\"{'ui-state-highlight':isSelected()}\">\n                            <span *ngIf=\"!tree.getTemplateForNode(node)\">{{node.label}}</span>\n                            <span *ngIf=\"tree.getTemplateForNode(node)\">\n                                <ng-container *ngTemplateOutlet=\"tree.getTemplateForNode(node); context: {$implicit: node}\"></ng-container>\n                            </span>\n                    </span>\n                </div>\n                <ul class=\"ui-treenode-children\" style=\"display: none;\" *ngIf=\"node.children && node.expanded\" [style.display]=\"node.expanded ? 'block' : 'none'\" role=\"group\">\n                    <p-treeNode *ngFor=\"let childNode of node.children;let firstChild=first;let lastChild=last; let index=index; trackBy: tree.nodeTrackBy\" [node]=\"childNode\" [parentNode]=\"node\"\n                        [firstChild]=\"firstChild\" [lastChild]=\"lastChild\" [index]=\"index\"></p-treeNode>\n                </ul>\n            </li>\n            <li *ngIf=\"tree.droppableNodes&&lastChild\" class=\"ui-treenode-droppoint\" [ngClass]=\"{'ui-treenode-droppoint-active ui-state-highlight':draghoverNext}\"\n            (drop)=\"onDropPoint($event,1)\" (dragover)=\"onDropPointDragOver($event)\" (dragenter)=\"onDropPointDragEnter($event,1)\" (dragleave)=\"onDropPointDragLeave($event)\"></li>\n            <table *ngIf=\"tree.horizontal\" [class]=\"node.styleClass\">\n                <tbody>\n                    <tr>\n                        <td class=\"ui-treenode-connector\" *ngIf=\"!root\">\n                            <table class=\"ui-treenode-connector-table\">\n                                <tbody>\n                                    <tr>\n                                        <td [ngClass]=\"{'ui-treenode-connector-line':!firstChild}\"></td>\n                                    </tr>\n                                    <tr>\n                                        <td [ngClass]=\"{'ui-treenode-connector-line':!lastChild}\"></td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </td>\n                        <td class=\"ui-treenode\" [ngClass]=\"{'ui-treenode-collapsed':!node.expanded}\">\n                            <div class=\"ui-treenode-content ui-state-default ui-corner-all\" tabindex=\"0\"\n                                [ngClass]=\"{'ui-treenode-selectable':tree.selectionMode,'ui-state-highlight':isSelected()}\" (click)=\"onNodeClick($event)\" (contextmenu)=\"onNodeRightClick($event)\"\n                                (touchend)=\"onNodeTouchEnd()\" (keydown)=\"onNodeKeydown($event)\">\n                                <span class=\"ui-tree-toggler pi pi-fw ui-unselectable-text\" [ngClass]=\"{'pi-plus':!node.expanded,'pi-minus':node.expanded}\" *ngIf=\"!isLeaf()\"\n                                        (click)=\"toggle($event)\"></span\n                                ><span [class]=\"getIcon()\" *ngIf=\"node.icon||node.expandedIcon||node.collapsedIcon\"></span\n                                ><span class=\"ui-treenode-label ui-corner-all\">\n                                        <span *ngIf=\"!tree.getTemplateForNode(node)\">{{node.label}}</span>\n                                        <span *ngIf=\"tree.getTemplateForNode(node)\">\n                                        <ng-container *ngTemplateOutlet=\"tree.getTemplateForNode(node); context: {$implicit: node}\"></ng-container>\n                                        </span>\n                                </span>\n                            </div>\n                        </td>\n                        <td class=\"ui-treenode-children-container\" *ngIf=\"node.children && node.expanded\" [style.display]=\"node.expanded ? 'table-cell' : 'none'\">\n                            <div class=\"ui-treenode-children\">\n                                <p-treeNode *ngFor=\"let childNode of node.children;let firstChild=first;let lastChild=last; trackBy: tree.nodeTrackBy\" [node]=\"childNode\"\n                                        [firstChild]=\"firstChild\" [lastChild]=\"lastChild\"></p-treeNode>\n                            </div>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </ng-template>\n    "
            }),
            __param(0, core.Inject(core.forwardRef(function () { return Tree; })))
        ], UITreeNode);
        return UITreeNode;
    }());
    var Tree = /** @class */ (function () {
        function Tree(el, dragDropService) {
            this.el = el;
            this.dragDropService = dragDropService;
            this.selectionChange = new core.EventEmitter();
            this.onNodeSelect = new core.EventEmitter();
            this.onNodeUnselect = new core.EventEmitter();
            this.onNodeExpand = new core.EventEmitter();
            this.onNodeCollapse = new core.EventEmitter();
            this.onNodeContextMenuSelect = new core.EventEmitter();
            this.onNodeDrop = new core.EventEmitter();
            this.layout = 'vertical';
            this.metaKeySelection = true;
            this.propagateSelectionUp = true;
            this.propagateSelectionDown = true;
            this.loadingIcon = 'pi pi-spinner';
            this.emptyMessage = 'No records found';
            this.filterBy = 'label';
            this.filterMode = 'lenient';
            this.nodeTrackBy = function (index, item) { return item; };
        }
        Tree.prototype.ngOnInit = function () {
            var _this = this;
            if (this.droppableNodes) {
                this.dragStartSubscription = this.dragDropService.dragStart$.subscribe(function (event) {
                    _this.dragNodeTree = event.tree;
                    _this.dragNode = event.node;
                    _this.dragNodeSubNodes = event.subNodes;
                    _this.dragNodeIndex = event.index;
                    _this.dragNodeScope = event.scope;
                });
                this.dragStopSubscription = this.dragDropService.dragStop$.subscribe(function (event) {
                    _this.dragNodeTree = null;
                    _this.dragNode = null;
                    _this.dragNodeSubNodes = null;
                    _this.dragNodeIndex = null;
                    _this.dragNodeScope = null;
                    _this.dragHover = false;
                });
            }
        };
        Object.defineProperty(Tree.prototype, "horizontal", {
            get: function () {
                return this.layout == 'horizontal';
            },
            enumerable: true,
            configurable: true
        });
        Tree.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (this.templates.length) {
                this.templateMap = {};
            }
            this.templates.forEach(function (item) {
                _this.templateMap[item.name] = item.template;
            });
        };
        Tree.prototype.onNodeClick = function (event, node) {
            var eventTarget = event.target;
            if (dom.DomHandler.hasClass(eventTarget, 'ui-tree-toggler')) {
                return;
            }
            else if (this.selectionMode) {
                if (node.selectable === false) {
                    return;
                }
                if (this.hasFilteredNodes()) {
                    node = this.getNodeWithKey(node.key, this.value);
                    if (!node) {
                        return;
                    }
                }
                var index_1 = this.findIndexInSelection(node);
                var selected = (index_1 >= 0);
                if (this.isCheckboxSelectionMode()) {
                    if (selected) {
                        if (this.propagateSelectionDown)
                            this.propagateDown(node, false);
                        else
                            this.selection = this.selection.filter(function (val, i) { return i != index_1; });
                        if (this.propagateSelectionUp && node.parent) {
                            this.propagateUp(node.parent, false);
                        }
                        this.selectionChange.emit(this.selection);
                        this.onNodeUnselect.emit({ originalEvent: event, node: node });
                    }
                    else {
                        if (this.propagateSelectionDown)
                            this.propagateDown(node, true);
                        else
                            this.selection = __spread(this.selection || [], [node]);
                        if (this.propagateSelectionUp && node.parent) {
                            this.propagateUp(node.parent, true);
                        }
                        this.selectionChange.emit(this.selection);
                        this.onNodeSelect.emit({ originalEvent: event, node: node });
                    }
                }
                else {
                    var metaSelection = this.nodeTouched ? false : this.metaKeySelection;
                    if (metaSelection) {
                        var metaKey = (event.metaKey || event.ctrlKey);
                        if (selected && metaKey) {
                            if (this.isSingleSelectionMode()) {
                                this.selectionChange.emit(null);
                            }
                            else {
                                this.selection = this.selection.filter(function (val, i) { return i != index_1; });
                                this.selectionChange.emit(this.selection);
                            }
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        }
                        else {
                            if (this.isSingleSelectionMode()) {
                                this.selectionChange.emit(node);
                            }
                            else if (this.isMultipleSelectionMode()) {
                                this.selection = (!metaKey) ? [] : this.selection || [];
                                this.selection = __spread(this.selection, [node]);
                                this.selectionChange.emit(this.selection);
                            }
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
                        }
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            if (selected) {
                                this.selection = null;
                                this.onNodeUnselect.emit({ originalEvent: event, node: node });
                            }
                            else {
                                this.selection = node;
                                this.onNodeSelect.emit({ originalEvent: event, node: node });
                            }
                        }
                        else {
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
                }
            }
            this.nodeTouched = false;
        };
        Tree.prototype.onNodeTouchEnd = function () {
            this.nodeTouched = true;
        };
        Tree.prototype.onNodeRightClick = function (event, node) {
            if (this.contextMenu) {
                var eventTarget = event.target;
                if (eventTarget.className && eventTarget.className.indexOf('ui-tree-toggler') === 0) {
                    return;
                }
                else {
                    var index = this.findIndexInSelection(node);
                    var selected = (index >= 0);
                    if (!selected) {
                        if (this.isSingleSelectionMode())
                            this.selectionChange.emit(node);
                        else
                            this.selectionChange.emit([node]);
                    }
                    this.contextMenu.show(event);
                    this.onNodeContextMenuSelect.emit({ originalEvent: event, node: node });
                }
            }
        };
        Tree.prototype.findIndexInSelection = function (node) {
            var index = -1;
            if (this.selectionMode && this.selection) {
                if (this.isSingleSelectionMode()) {
                    var areNodesEqual = (this.selection.key && this.selection.key === node.key) || this.selection == node;
                    index = areNodesEqual ? 0 : -1;
                }
                else {
                    for (var i = 0; i < this.selection.length; i++) {
                        var selectedNode = this.selection[i];
                        var areNodesEqual = (selectedNode.key && selectedNode.key === node.key) || selectedNode == node;
                        if (areNodesEqual) {
                            index = i;
                            break;
                        }
                    }
                }
            }
            return index;
        };
        Tree.prototype.syncNodeOption = function (node, parentNodes, option, value) {
            // to synchronize the node option between the filtered nodes and the original nodes(this.value) 
            var _node = this.hasFilteredNodes() ? this.getNodeWithKey(node.key, parentNodes) : null;
            if (_node) {
                _node[option] = value || node[option];
            }
        };
        Tree.prototype.hasFilteredNodes = function () {
            return this.filter && this.filteredNodes && this.filteredNodes.length;
        };
        Tree.prototype.getNodeWithKey = function (key, nodes) {
            var e_1, _a;
            try {
                for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                    var node = nodes_1_1.value;
                    if (node.key === key) {
                        return node;
                    }
                    if (node.children) {
                        var matchedNode = this.getNodeWithKey(key, node.children);
                        if (matchedNode) {
                            return matchedNode;
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        Tree.prototype.propagateUp = function (node, select) {
            var e_2, _a;
            if (node.children && node.children.length) {
                var selectedCount = 0;
                var childPartialSelected = false;
                try {
                    for (var _b = __values(node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        if (this.isSelected(child)) {
                            selectedCount++;
                        }
                        else if (child.partialSelected) {
                            childPartialSelected = true;
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
                if (select && selectedCount == node.children.length) {
                    this.selection = __spread(this.selection || [], [node]);
                    node.partialSelected = false;
                }
                else {
                    if (!select) {
                        var index_2 = this.findIndexInSelection(node);
                        if (index_2 >= 0) {
                            this.selection = this.selection.filter(function (val, i) { return i != index_2; });
                        }
                    }
                    if (childPartialSelected || selectedCount > 0 && selectedCount != node.children.length)
                        node.partialSelected = true;
                    else
                        node.partialSelected = false;
                }
                this.syncNodeOption(node, this.filteredNodes, 'partialSelected');
            }
            var parent = node.parent;
            if (parent) {
                this.propagateUp(parent, select);
            }
        };
        Tree.prototype.propagateDown = function (node, select) {
            var e_3, _a;
            var index = this.findIndexInSelection(node);
            if (select && index == -1) {
                this.selection = __spread(this.selection || [], [node]);
            }
            else if (!select && index > -1) {
                this.selection = this.selection.filter(function (val, i) { return i != index; });
            }
            node.partialSelected = false;
            this.syncNodeOption(node, this.filteredNodes, 'partialSelected');
            if (node.children && node.children.length) {
                try {
                    for (var _b = __values(node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        this.propagateDown(child, select);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        };
        Tree.prototype.isSelected = function (node) {
            return this.findIndexInSelection(node) != -1;
        };
        Tree.prototype.isSingleSelectionMode = function () {
            return this.selectionMode && this.selectionMode == 'single';
        };
        Tree.prototype.isMultipleSelectionMode = function () {
            return this.selectionMode && this.selectionMode == 'multiple';
        };
        Tree.prototype.isCheckboxSelectionMode = function () {
            return this.selectionMode && this.selectionMode == 'checkbox';
        };
        Tree.prototype.isNodeLeaf = function (node) {
            return node.leaf == false ? false : !(node.children && node.children.length);
        };
        Tree.prototype.getRootNode = function () {
            return this.filteredNodes ? this.filteredNodes : this.value;
        };
        Tree.prototype.getTemplateForNode = function (node) {
            if (this.templateMap)
                return node.type ? this.templateMap[node.type] : this.templateMap['default'];
            else
                return null;
        };
        Tree.prototype.onDragOver = function (event) {
            if (this.droppableNodes && (!this.value || this.value.length === 0)) {
                event.dataTransfer.dropEffect = 'move';
                event.preventDefault();
            }
        };
        Tree.prototype.onDrop = function (event) {
            if (this.droppableNodes && (!this.value || this.value.length === 0)) {
                event.preventDefault();
                var dragNode = this.dragNode;
                if (this.allowDrop(dragNode, null, this.dragNodeScope)) {
                    var dragNodeIndex = this.dragNodeIndex;
                    this.dragNodeSubNodes.splice(dragNodeIndex, 1);
                    this.value = this.value || [];
                    this.value.push(dragNode);
                    this.dragDropService.stopDrag({
                        node: dragNode
                    });
                }
            }
        };
        Tree.prototype.onDragEnter = function (event) {
            if (this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope)) {
                this.dragHover = true;
            }
        };
        Tree.prototype.onDragLeave = function (event) {
            if (this.droppableNodes) {
                var rect = event.currentTarget.getBoundingClientRect();
                if (event.x > rect.left + rect.width || event.x < rect.left || event.y > rect.top + rect.height || event.y < rect.top) {
                    this.dragHover = false;
                }
            }
        };
        Tree.prototype.allowDrop = function (dragNode, dropNode, dragNodeScope) {
            if (!dragNode) {
                //prevent random html elements to be dragged
                return false;
            }
            else if (this.isValidDragScope(dragNodeScope)) {
                var allow = true;
                if (dropNode) {
                    if (dragNode === dropNode) {
                        allow = false;
                    }
                    else {
                        var parent_1 = dropNode.parent;
                        while (parent_1 != null) {
                            if (parent_1 === dragNode) {
                                allow = false;
                                break;
                            }
                            parent_1 = parent_1.parent;
                        }
                    }
                }
                return allow;
            }
            else {
                return false;
            }
        };
        Tree.prototype.isValidDragScope = function (dragScope) {
            var e_4, _a, e_5, _b;
            var dropScope = this.droppableScope;
            if (dropScope) {
                if (typeof dropScope === 'string') {
                    if (typeof dragScope === 'string')
                        return dropScope === dragScope;
                    else if (dragScope instanceof Array)
                        return dragScope.indexOf(dropScope) != -1;
                }
                else if (dropScope instanceof Array) {
                    if (typeof dragScope === 'string') {
                        return dropScope.indexOf(dragScope) != -1;
                    }
                    else if (dragScope instanceof Array) {
                        try {
                            for (var dropScope_1 = __values(dropScope), dropScope_1_1 = dropScope_1.next(); !dropScope_1_1.done; dropScope_1_1 = dropScope_1.next()) {
                                var s = dropScope_1_1.value;
                                try {
                                    for (var dragScope_1 = (e_5 = void 0, __values(dragScope)), dragScope_1_1 = dragScope_1.next(); !dragScope_1_1.done; dragScope_1_1 = dragScope_1.next()) {
                                        var ds = dragScope_1_1.value;
                                        if (s === ds) {
                                            return true;
                                        }
                                    }
                                }
                                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                finally {
                                    try {
                                        if (dragScope_1_1 && !dragScope_1_1.done && (_b = dragScope_1.return)) _b.call(dragScope_1);
                                    }
                                    finally { if (e_5) throw e_5.error; }
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (dropScope_1_1 && !dropScope_1_1.done && (_a = dropScope_1.return)) _a.call(dropScope_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
                return false;
            }
            else {
                return true;
            }
        };
        Tree.prototype.onFilter = function (event) {
            var e_6, _a;
            var filterValue = event.target.value;
            if (filterValue === '') {
                this.filteredNodes = null;
            }
            else {
                this.filteredNodes = [];
                var searchFields = this.filterBy.split(',');
                var filterText = utils.ObjectUtils.removeAccents(filterValue).toLowerCase();
                var isStrictMode = this.filterMode === 'strict';
                try {
                    for (var _b = __values(this.value), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var node = _c.value;
                        var copyNode = __assign({}, node);
                        var paramsWithoutNode = { searchFields: searchFields, filterText: filterText, isStrictMode: isStrictMode };
                        if ((isStrictMode && (this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode))) ||
                            (!isStrictMode && (this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode)))) {
                            this.filteredNodes.push(copyNode);
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        };
        Tree.prototype.findFilteredNodes = function (node, paramsWithoutNode) {
            var e_7, _a;
            if (node) {
                var matched = false;
                if (node.children) {
                    var childNodes = __spread(node.children);
                    node.children = [];
                    try {
                        for (var childNodes_1 = __values(childNodes), childNodes_1_1 = childNodes_1.next(); !childNodes_1_1.done; childNodes_1_1 = childNodes_1.next()) {
                            var childNode = childNodes_1_1.value;
                            var copyChildNode = __assign({}, childNode);
                            if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                                matched = true;
                                node.children.push(copyChildNode);
                            }
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (childNodes_1_1 && !childNodes_1_1.done && (_a = childNodes_1.return)) _a.call(childNodes_1);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                }
                if (matched) {
                    node.expanded = true;
                    return true;
                }
            }
        };
        Tree.prototype.isFilterMatched = function (node, _a) {
            var e_8, _b;
            var searchFields = _a.searchFields, filterText = _a.filterText, isStrictMode = _a.isStrictMode;
            var matched = false;
            try {
                for (var searchFields_1 = __values(searchFields), searchFields_1_1 = searchFields_1.next(); !searchFields_1_1.done; searchFields_1_1 = searchFields_1.next()) {
                    var field = searchFields_1_1.value;
                    var fieldValue = utils.ObjectUtils.removeAccents(String(utils.ObjectUtils.resolveFieldData(node, field))).toLowerCase();
                    if (fieldValue.indexOf(filterText) > -1) {
                        matched = true;
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (searchFields_1_1 && !searchFields_1_1.done && (_b = searchFields_1.return)) _b.call(searchFields_1);
                }
                finally { if (e_8) throw e_8.error; }
            }
            if (!matched || (isStrictMode && !this.isNodeLeaf(node))) {
                matched = this.findFilteredNodes(node, { searchFields: searchFields, filterText: filterText, isStrictMode: isStrictMode }) || matched;
            }
            return matched;
        };
        Tree.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        Tree.prototype.ngOnDestroy = function () {
            if (this.dragStartSubscription) {
                this.dragStartSubscription.unsubscribe();
            }
            if (this.dragStopSubscription) {
                this.dragStopSubscription.unsubscribe();
            }
        };
        Tree.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: api.TreeDragDropService, decorators: [{ type: core.Optional }] }
        ]; };
        __decorate([
            core.Input()
        ], Tree.prototype, "value", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "selectionMode", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "selection", void 0);
        __decorate([
            core.Output()
        ], Tree.prototype, "selectionChange", void 0);
        __decorate([
            core.Output()
        ], Tree.prototype, "onNodeSelect", void 0);
        __decorate([
            core.Output()
        ], Tree.prototype, "onNodeUnselect", void 0);
        __decorate([
            core.Output()
        ], Tree.prototype, "onNodeExpand", void 0);
        __decorate([
            core.Output()
        ], Tree.prototype, "onNodeCollapse", void 0);
        __decorate([
            core.Output()
        ], Tree.prototype, "onNodeContextMenuSelect", void 0);
        __decorate([
            core.Output()
        ], Tree.prototype, "onNodeDrop", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "style", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "styleClass", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "contextMenu", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "layout", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "draggableScope", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "droppableScope", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "draggableNodes", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "droppableNodes", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "metaKeySelection", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "propagateSelectionUp", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "propagateSelectionDown", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "loading", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "loadingIcon", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "emptyMessage", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "ariaLabel", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "ariaLabelledBy", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "validateDrop", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "filter", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "filterBy", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "filterMode", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "filterPlaceholder", void 0);
        __decorate([
            core.Input()
        ], Tree.prototype, "nodeTrackBy", void 0);
        __decorate([
            core.ContentChildren(api.PrimeTemplate)
        ], Tree.prototype, "templates", void 0);
        Tree = __decorate([
            core.Component({
                selector: 'p-tree',
                template: "\n        <div [ngClass]=\"{'ui-tree ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode,'ui-treenode-dragover':dragHover,'ui-tree-loading': loading}\" [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"!horizontal\"\n            (drop)=\"onDrop($event)\" (dragover)=\"onDragOver($event)\" (dragenter)=\"onDragEnter($event)\" (dragleave)=\"onDragLeave($event)\">\n            <div class=\"ui-tree-loading-mask ui-widget-overlay\" *ngIf=\"loading\"></div>\n            <div class=\"ui-tree-loading-content\" *ngIf=\"loading\">\n                <i [class]=\"'ui-tree-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div *ngIf=\"filter\" class=\"ui-tree-filter-container\">\n                <input #filter type=\"text\" autocomplete=\"off\" class=\"ui-tree-filter ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceholder\"\n                    (keydown.enter)=\"$event.preventDefault()\" (input)=\"onFilter($event)\">\n                    <span class=\"ui-tree-filter-icon pi pi-search\"></span>\n            </div>\n            <ul class=\"ui-tree-container\" *ngIf=\"getRootNode()\" role=\"tree\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\">\n                <p-treeNode *ngFor=\"let node of getRootNode(); let firstChild=first;let lastChild=last; let index=index; trackBy: nodeTrackBy\" [node]=\"node\"\n                [firstChild]=\"firstChild\" [lastChild]=\"lastChild\" [index]=\"index\"></p-treeNode>\n            </ul>\n            <div class=\"ui-tree-empty-message\" *ngIf=\"!loading && (value == null || value.length === 0)\">{{emptyMessage}}</div>\n        </div>\n        <div [ngClass]=\"{'ui-tree ui-tree-horizontal ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode}\"  [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"horizontal\">\n            <div class=\"ui-tree-loading ui-widget-overlay\" *ngIf=\"loading\"></div>\n            <div class=\"ui-tree-loading-content\" *ngIf=\"loading\">\n                <i [class]=\"'ui-tree-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <table *ngIf=\"value&&value[0]\">\n                <p-treeNode [node]=\"value[0]\" [root]=\"true\"></p-treeNode>\n            </table>\n            <div class=\"ui-tree-empty-message\" *ngIf=\"!loading && (value == null || value.length === 0)\">{{emptyMessage}}</div>\n        </div>\n    "
            }),
            __param(1, core.Optional())
        ], Tree);
        return Tree;
    }());
    var TreeModule = /** @class */ (function () {
        function TreeModule() {
        }
        TreeModule = __decorate([
            core.NgModule({
                imports: [common.CommonModule],
                exports: [Tree, api.SharedModule],
                declarations: [Tree, UITreeNode]
            })
        ], TreeModule);
        return TreeModule;
    }());

    exports.Tree = Tree;
    exports.TreeModule = TreeModule;
    exports.UITreeNode = UITreeNode;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-tree.umd.js.map
