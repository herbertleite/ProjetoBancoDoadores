var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UITreeNode_1;
import { NgModule, Component, Input, AfterContentInit, OnDestroy, Output, EventEmitter, OnInit, ContentChildren, QueryList, TemplateRef, Inject, ElementRef, forwardRef } from '@angular/core';
import { Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { PrimeTemplate } from 'primeng/api';
import { TreeDragDropService } from 'primeng/api';
import { ObjectUtils } from 'primeng/utils';
import { DomHandler } from 'primeng/dom';
let UITreeNode = UITreeNode_1 = class UITreeNode {
    constructor(tree) {
        this.tree = tree;
    }
    ngOnInit() {
        this.node.parent = this.parentNode;
        if (this.parentNode) {
            this.tree.syncNodeOption(this.node, this.tree.value, 'parent', this.tree.getNodeWithKey(this.parentNode.key, this.tree.value));
        }
    }
    getIcon() {
        let icon;
        if (this.node.icon)
            icon = this.node.icon;
        else
            icon = this.node.expanded && this.node.children && this.node.children.length ? this.node.expandedIcon : this.node.collapsedIcon;
        return UITreeNode_1.ICON_CLASS + ' ' + icon;
    }
    isLeaf() {
        return this.tree.isNodeLeaf(this.node);
    }
    toggle(event) {
        if (this.node.expanded)
            this.collapse(event);
        else
            this.expand(event);
    }
    expand(event) {
        this.node.expanded = true;
        this.tree.onNodeExpand.emit({ originalEvent: event, node: this.node });
    }
    collapse(event) {
        this.node.expanded = false;
        this.tree.onNodeCollapse.emit({ originalEvent: event, node: this.node });
    }
    onNodeClick(event) {
        this.tree.onNodeClick(event, this.node);
    }
    onNodeKeydown(event) {
        if (event.which === 13) {
            this.tree.onNodeClick(event, this.node);
        }
    }
    onNodeTouchEnd() {
        this.tree.onNodeTouchEnd();
    }
    onNodeRightClick(event) {
        this.tree.onNodeRightClick(event, this.node);
    }
    isSelected() {
        return this.tree.isSelected(this.node);
    }
    onDropPoint(event, position) {
        event.preventDefault();
        let dragNode = this.tree.dragNode;
        let dragNodeIndex = this.tree.dragNodeIndex;
        let dragNodeScope = this.tree.dragNodeScope;
        let isValidDropPointIndex = this.tree.dragNodeTree === this.tree ? (position === 1 || dragNodeIndex !== this.index - 1) : true;
        if (this.tree.allowDrop(dragNode, this.node, dragNodeScope) && isValidDropPointIndex) {
            if (this.tree.validateDrop) {
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode,
                    dropNode: this.node,
                    dropIndex: this.index,
                    accept: () => {
                        this.processPointDrop(dragNode, dragNodeIndex, position);
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
    }
    processPointDrop(dragNode, dragNodeIndex, position) {
        let newNodeList = this.node.parent ? this.node.parent.children : this.tree.value;
        this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);
        let dropIndex = this.index;
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
    }
    onDropPointDragOver(event) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
    }
    onDropPointDragEnter(event, position) {
        if (this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            if (position < 0)
                this.draghoverPrev = true;
            else
                this.draghoverNext = true;
        }
    }
    onDropPointDragLeave(event) {
        this.draghoverPrev = false;
        this.draghoverNext = false;
    }
    onDragStart(event) {
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
    }
    onDragStop(event) {
        this.tree.dragDropService.stopDrag({
            node: this.node,
            subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
            index: this.index
        });
    }
    onDropNodeDragOver(event) {
        event.dataTransfer.dropEffect = 'move';
        if (this.tree.droppableNodes) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    onDropNode(event) {
        if (this.tree.droppableNodes && this.node.droppable !== false) {
            event.preventDefault();
            event.stopPropagation();
            let dragNode = this.tree.dragNode;
            if (this.tree.allowDrop(dragNode, this.node, this.tree.dragNodeScope)) {
                if (this.tree.validateDrop) {
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: this.node,
                        index: this.index,
                        accept: () => {
                            this.processNodeDrop(dragNode);
                        }
                    });
                }
                else {
                    this.processNodeDrop(dragNode);
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode,
                        dropNode: this.node,
                        index: this.index
                    });
                }
            }
        }
        this.draghoverNode = false;
    }
    processNodeDrop(dragNode) {
        let dragNodeIndex = this.tree.dragNodeIndex;
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
    }
    onDropNodeDragEnter(event) {
        if (this.tree.droppableNodes && this.node.droppable !== false && this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            this.draghoverNode = true;
        }
    }
    onDropNodeDragLeave(event) {
        if (this.tree.droppableNodes) {
            let rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y >= Math.floor(rect.top + rect.height) || event.y < rect.top) {
                this.draghoverNode = false;
            }
        }
    }
    onKeyDown(event) {
        const nodeElement = event.target.parentElement.parentElement;
        if (nodeElement.nodeName !== 'P-TREENODE') {
            return;
        }
        switch (event.which) {
            //down arrow
            case 40:
                const listElement = (this.tree.droppableNodes) ? nodeElement.children[1].children[1] : nodeElement.children[0].children[1];
                if (listElement && listElement.children.length > 0) {
                    this.focusNode(listElement.children[0]);
                }
                else {
                    const nextNodeElement = nodeElement.nextElementSibling;
                    if (nextNodeElement) {
                        this.focusNode(nextNodeElement);
                    }
                    else {
                        let nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement);
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
                    let parentNodeElement = this.getParentNodeElement(nodeElement);
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
                    let parentNodeElement = this.getParentNodeElement(nodeElement);
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
    }
    findNextSiblingOfAncestor(nodeElement) {
        let parentNodeElement = this.getParentNodeElement(nodeElement);
        if (parentNodeElement) {
            if (parentNodeElement.nextElementSibling)
                return parentNodeElement.nextElementSibling;
            else
                return this.findNextSiblingOfAncestor(parentNodeElement);
        }
        else {
            return null;
        }
    }
    findLastVisibleDescendant(nodeElement) {
        const childrenListElement = nodeElement.children[0].children[1];
        if (childrenListElement && childrenListElement.children.length > 0) {
            const lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];
            return this.findLastVisibleDescendant(lastChildElement);
        }
        else {
            return nodeElement;
        }
    }
    getParentNodeElement(nodeElement) {
        const parentNodeElement = nodeElement.parentElement.parentElement.parentElement;
        return parentNodeElement.tagName === 'P-TREENODE' ? parentNodeElement : null;
    }
    focusNode(element) {
        if (this.tree.droppableNodes)
            element.children[1].children[0].focus();
        else
            element.children[0].children[0].focus();
    }
};
UITreeNode.ICON_CLASS = 'ui-treenode-icon ';
UITreeNode.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [forwardRef(() => Tree),] }] }
];
__decorate([
    Input()
], UITreeNode.prototype, "node", void 0);
__decorate([
    Input()
], UITreeNode.prototype, "parentNode", void 0);
__decorate([
    Input()
], UITreeNode.prototype, "root", void 0);
__decorate([
    Input()
], UITreeNode.prototype, "index", void 0);
__decorate([
    Input()
], UITreeNode.prototype, "firstChild", void 0);
__decorate([
    Input()
], UITreeNode.prototype, "lastChild", void 0);
UITreeNode = UITreeNode_1 = __decorate([
    Component({
        selector: 'p-treeNode',
        template: `
        <ng-template [ngIf]="node">
            <li *ngIf="tree.droppableNodes" class="ui-treenode-droppoint" [ngClass]="{'ui-treenode-droppoint-active ui-state-highlight':draghoverPrev}"
            (drop)="onDropPoint($event,-1)" (dragover)="onDropPointDragOver($event)" (dragenter)="onDropPointDragEnter($event,-1)" (dragleave)="onDropPointDragLeave($event)"></li>
            <li *ngIf="!tree.horizontal" role="treeitem" [ngClass]="['ui-treenode',node.styleClass||'', isLeaf() ? 'ui-treenode-leaf': '']">
                <div class="ui-treenode-content" (click)="onNodeClick($event)" (contextmenu)="onNodeRightClick($event)" (touchend)="onNodeTouchEnd()"
                    (drop)="onDropNode($event)" (dragover)="onDropNodeDragOver($event)" (dragenter)="onDropNodeDragEnter($event)" (dragleave)="onDropNodeDragLeave($event)"
                    [draggable]="tree.draggableNodes" (dragstart)="onDragStart($event)" (dragend)="onDragStop($event)" tabIndex="0"
                    [ngClass]="{'ui-treenode-selectable':tree.selectionMode && node.selectable !== false,'ui-treenode-dragover':draghoverNode, 'ui-treenode-content-selected':isSelected()}" 
                    (keydown)="onKeyDown($event)" [attr.aria-posinset]="this.index + 1" [attr.aria-expanded]="this.node.expanded" [attr.aria-selected]="isSelected()">
                    <span class="ui-tree-toggler pi pi-fw ui-unselectable-text" [ngClass]="{'pi-caret-right':!node.expanded,'pi-caret-down':node.expanded}"
                            (click)="toggle($event)"></span
                    ><div class="ui-chkbox" *ngIf="tree.selectionMode == 'checkbox'" [attr.aria-checked]="isSelected()"><div class="ui-chkbox-box ui-widget ui-corner-all ui-state-default" [ngClass]="{'ui-state-disabled': node.selectable === false}">
                        <span class="ui-chkbox-icon ui-clickable pi"
                            [ngClass]="{'pi-check':isSelected(),'pi-minus':node.partialSelected}"></span></div></div
                    ><span [class]="getIcon()" *ngIf="node.icon||node.expandedIcon||node.collapsedIcon"></span
                    ><span class="ui-treenode-label ui-corner-all"
                        [ngClass]="{'ui-state-highlight':isSelected()}">
                            <span *ngIf="!tree.getTemplateForNode(node)">{{node.label}}</span>
                            <span *ngIf="tree.getTemplateForNode(node)">
                                <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: {$implicit: node}"></ng-container>
                            </span>
                    </span>
                </div>
                <ul class="ui-treenode-children" style="display: none;" *ngIf="node.children && node.expanded" [style.display]="node.expanded ? 'block' : 'none'" role="group">
                    <p-treeNode *ngFor="let childNode of node.children;let firstChild=first;let lastChild=last; let index=index; trackBy: tree.nodeTrackBy" [node]="childNode" [parentNode]="node"
                        [firstChild]="firstChild" [lastChild]="lastChild" [index]="index"></p-treeNode>
                </ul>
            </li>
            <li *ngIf="tree.droppableNodes&&lastChild" class="ui-treenode-droppoint" [ngClass]="{'ui-treenode-droppoint-active ui-state-highlight':draghoverNext}"
            (drop)="onDropPoint($event,1)" (dragover)="onDropPointDragOver($event)" (dragenter)="onDropPointDragEnter($event,1)" (dragleave)="onDropPointDragLeave($event)"></li>
            <table *ngIf="tree.horizontal" [class]="node.styleClass">
                <tbody>
                    <tr>
                        <td class="ui-treenode-connector" *ngIf="!root">
                            <table class="ui-treenode-connector-table">
                                <tbody>
                                    <tr>
                                        <td [ngClass]="{'ui-treenode-connector-line':!firstChild}"></td>
                                    </tr>
                                    <tr>
                                        <td [ngClass]="{'ui-treenode-connector-line':!lastChild}"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td class="ui-treenode" [ngClass]="{'ui-treenode-collapsed':!node.expanded}">
                            <div class="ui-treenode-content ui-state-default ui-corner-all" tabindex="0"
                                [ngClass]="{'ui-treenode-selectable':tree.selectionMode,'ui-state-highlight':isSelected()}" (click)="onNodeClick($event)" (contextmenu)="onNodeRightClick($event)"
                                (touchend)="onNodeTouchEnd()" (keydown)="onNodeKeydown($event)">
                                <span class="ui-tree-toggler pi pi-fw ui-unselectable-text" [ngClass]="{'pi-plus':!node.expanded,'pi-minus':node.expanded}" *ngIf="!isLeaf()"
                                        (click)="toggle($event)"></span
                                ><span [class]="getIcon()" *ngIf="node.icon||node.expandedIcon||node.collapsedIcon"></span
                                ><span class="ui-treenode-label ui-corner-all">
                                        <span *ngIf="!tree.getTemplateForNode(node)">{{node.label}}</span>
                                        <span *ngIf="tree.getTemplateForNode(node)">
                                        <ng-container *ngTemplateOutlet="tree.getTemplateForNode(node); context: {$implicit: node}"></ng-container>
                                        </span>
                                </span>
                            </div>
                        </td>
                        <td class="ui-treenode-children-container" *ngIf="node.children && node.expanded" [style.display]="node.expanded ? 'table-cell' : 'none'">
                            <div class="ui-treenode-children">
                                <p-treeNode *ngFor="let childNode of node.children;let firstChild=first;let lastChild=last; trackBy: tree.nodeTrackBy" [node]="childNode"
                                        [firstChild]="firstChild" [lastChild]="lastChild"></p-treeNode>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </ng-template>
    `
    }),
    __param(0, Inject(forwardRef(() => Tree)))
], UITreeNode);
export { UITreeNode };
let Tree = class Tree {
    constructor(el, dragDropService) {
        this.el = el;
        this.dragDropService = dragDropService;
        this.selectionChange = new EventEmitter();
        this.onNodeSelect = new EventEmitter();
        this.onNodeUnselect = new EventEmitter();
        this.onNodeExpand = new EventEmitter();
        this.onNodeCollapse = new EventEmitter();
        this.onNodeContextMenuSelect = new EventEmitter();
        this.onNodeDrop = new EventEmitter();
        this.layout = 'vertical';
        this.metaKeySelection = true;
        this.propagateSelectionUp = true;
        this.propagateSelectionDown = true;
        this.loadingIcon = 'pi pi-spinner';
        this.emptyMessage = 'No records found';
        this.filterBy = 'label';
        this.filterMode = 'lenient';
        this.nodeTrackBy = (index, item) => item;
    }
    ngOnInit() {
        if (this.droppableNodes) {
            this.dragStartSubscription = this.dragDropService.dragStart$.subscribe(event => {
                this.dragNodeTree = event.tree;
                this.dragNode = event.node;
                this.dragNodeSubNodes = event.subNodes;
                this.dragNodeIndex = event.index;
                this.dragNodeScope = event.scope;
            });
            this.dragStopSubscription = this.dragDropService.dragStop$.subscribe(event => {
                this.dragNodeTree = null;
                this.dragNode = null;
                this.dragNodeSubNodes = null;
                this.dragNodeIndex = null;
                this.dragNodeScope = null;
                this.dragHover = false;
            });
        }
    }
    get horizontal() {
        return this.layout == 'horizontal';
    }
    ngAfterContentInit() {
        if (this.templates.length) {
            this.templateMap = {};
        }
        this.templates.forEach((item) => {
            this.templateMap[item.name] = item.template;
        });
    }
    onNodeClick(event, node) {
        let eventTarget = event.target;
        if (DomHandler.hasClass(eventTarget, 'ui-tree-toggler')) {
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
            let index = this.findIndexInSelection(node);
            let selected = (index >= 0);
            if (this.isCheckboxSelectionMode()) {
                if (selected) {
                    if (this.propagateSelectionDown)
                        this.propagateDown(node, false);
                    else
                        this.selection = this.selection.filter((val, i) => i != index);
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
                        this.selection = [...this.selection || [], node];
                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, true);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            else {
                let metaSelection = this.nodeTouched ? false : this.metaKeySelection;
                if (metaSelection) {
                    let metaKey = (event.metaKey || event.ctrlKey);
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(null);
                        }
                        else {
                            this.selection = this.selection.filter((val, i) => i != index);
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
                            this.selection = [...this.selection, node];
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
                            this.selection = this.selection.filter((val, i) => i != index);
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        }
                        else {
                            this.selection = [...this.selection || [], node];
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
                        }
                    }
                    this.selectionChange.emit(this.selection);
                }
            }
        }
        this.nodeTouched = false;
    }
    onNodeTouchEnd() {
        this.nodeTouched = true;
    }
    onNodeRightClick(event, node) {
        if (this.contextMenu) {
            let eventTarget = event.target;
            if (eventTarget.className && eventTarget.className.indexOf('ui-tree-toggler') === 0) {
                return;
            }
            else {
                let index = this.findIndexInSelection(node);
                let selected = (index >= 0);
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
    }
    findIndexInSelection(node) {
        let index = -1;
        if (this.selectionMode && this.selection) {
            if (this.isSingleSelectionMode()) {
                let areNodesEqual = (this.selection.key && this.selection.key === node.key) || this.selection == node;
                index = areNodesEqual ? 0 : -1;
            }
            else {
                for (let i = 0; i < this.selection.length; i++) {
                    let selectedNode = this.selection[i];
                    let areNodesEqual = (selectedNode.key && selectedNode.key === node.key) || selectedNode == node;
                    if (areNodesEqual) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    }
    syncNodeOption(node, parentNodes, option, value) {
        // to synchronize the node option between the filtered nodes and the original nodes(this.value) 
        const _node = this.hasFilteredNodes() ? this.getNodeWithKey(node.key, parentNodes) : null;
        if (_node) {
            _node[option] = value || node[option];
        }
    }
    hasFilteredNodes() {
        return this.filter && this.filteredNodes && this.filteredNodes.length;
    }
    getNodeWithKey(key, nodes) {
        for (let node of nodes) {
            if (node.key === key) {
                return node;
            }
            if (node.children) {
                let matchedNode = this.getNodeWithKey(key, node.children);
                if (matchedNode) {
                    return matchedNode;
                }
            }
        }
    }
    propagateUp(node, select) {
        if (node.children && node.children.length) {
            let selectedCount = 0;
            let childPartialSelected = false;
            for (let child of node.children) {
                if (this.isSelected(child)) {
                    selectedCount++;
                }
                else if (child.partialSelected) {
                    childPartialSelected = true;
                }
            }
            if (select && selectedCount == node.children.length) {
                this.selection = [...this.selection || [], node];
                node.partialSelected = false;
            }
            else {
                if (!select) {
                    let index = this.findIndexInSelection(node);
                    if (index >= 0) {
                        this.selection = this.selection.filter((val, i) => i != index);
                    }
                }
                if (childPartialSelected || selectedCount > 0 && selectedCount != node.children.length)
                    node.partialSelected = true;
                else
                    node.partialSelected = false;
            }
            this.syncNodeOption(node, this.filteredNodes, 'partialSelected');
        }
        let parent = node.parent;
        if (parent) {
            this.propagateUp(parent, select);
        }
    }
    propagateDown(node, select) {
        let index = this.findIndexInSelection(node);
        if (select && index == -1) {
            this.selection = [...this.selection || [], node];
        }
        else if (!select && index > -1) {
            this.selection = this.selection.filter((val, i) => i != index);
        }
        node.partialSelected = false;
        this.syncNodeOption(node, this.filteredNodes, 'partialSelected');
        if (node.children && node.children.length) {
            for (let child of node.children) {
                this.propagateDown(child, select);
            }
        }
    }
    isSelected(node) {
        return this.findIndexInSelection(node) != -1;
    }
    isSingleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'single';
    }
    isMultipleSelectionMode() {
        return this.selectionMode && this.selectionMode == 'multiple';
    }
    isCheckboxSelectionMode() {
        return this.selectionMode && this.selectionMode == 'checkbox';
    }
    isNodeLeaf(node) {
        return node.leaf == false ? false : !(node.children && node.children.length);
    }
    getRootNode() {
        return this.filteredNodes ? this.filteredNodes : this.value;
    }
    getTemplateForNode(node) {
        if (this.templateMap)
            return node.type ? this.templateMap[node.type] : this.templateMap['default'];
        else
            return null;
    }
    onDragOver(event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.dataTransfer.dropEffect = 'move';
            event.preventDefault();
        }
    }
    onDrop(event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.preventDefault();
            let dragNode = this.dragNode;
            if (this.allowDrop(dragNode, null, this.dragNodeScope)) {
                let dragNodeIndex = this.dragNodeIndex;
                this.dragNodeSubNodes.splice(dragNodeIndex, 1);
                this.value = this.value || [];
                this.value.push(dragNode);
                this.dragDropService.stopDrag({
                    node: dragNode
                });
            }
        }
    }
    onDragEnter(event) {
        if (this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope)) {
            this.dragHover = true;
        }
    }
    onDragLeave(event) {
        if (this.droppableNodes) {
            let rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y > rect.top + rect.height || event.y < rect.top) {
                this.dragHover = false;
            }
        }
    }
    allowDrop(dragNode, dropNode, dragNodeScope) {
        if (!dragNode) {
            //prevent random html elements to be dragged
            return false;
        }
        else if (this.isValidDragScope(dragNodeScope)) {
            let allow = true;
            if (dropNode) {
                if (dragNode === dropNode) {
                    allow = false;
                }
                else {
                    let parent = dropNode.parent;
                    while (parent != null) {
                        if (parent === dragNode) {
                            allow = false;
                            break;
                        }
                        parent = parent.parent;
                    }
                }
            }
            return allow;
        }
        else {
            return false;
        }
    }
    isValidDragScope(dragScope) {
        let dropScope = this.droppableScope;
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
                    for (let s of dropScope) {
                        for (let ds of dragScope) {
                            if (s === ds) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }
        else {
            return true;
        }
    }
    onFilter(event) {
        let filterValue = event.target.value;
        if (filterValue === '') {
            this.filteredNodes = null;
        }
        else {
            this.filteredNodes = [];
            const searchFields = this.filterBy.split(',');
            const filterText = ObjectUtils.removeAccents(filterValue).toLowerCase();
            const isStrictMode = this.filterMode === 'strict';
            for (let node of this.value) {
                let copyNode = Object.assign({}, node);
                let paramsWithoutNode = { searchFields, filterText, isStrictMode };
                if ((isStrictMode && (this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode))) ||
                    (!isStrictMode && (this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode)))) {
                    this.filteredNodes.push(copyNode);
                }
            }
        }
    }
    findFilteredNodes(node, paramsWithoutNode) {
        if (node) {
            let matched = false;
            if (node.children) {
                let childNodes = [...node.children];
                node.children = [];
                for (let childNode of childNodes) {
                    let copyChildNode = Object.assign({}, childNode);
                    if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                        matched = true;
                        node.children.push(copyChildNode);
                    }
                }
            }
            if (matched) {
                node.expanded = true;
                return true;
            }
        }
    }
    isFilterMatched(node, { searchFields, filterText, isStrictMode }) {
        let matched = false;
        for (let field of searchFields) {
            let fieldValue = ObjectUtils.removeAccents(String(ObjectUtils.resolveFieldData(node, field))).toLowerCase();
            if (fieldValue.indexOf(filterText) > -1) {
                matched = true;
            }
        }
        if (!matched || (isStrictMode && !this.isNodeLeaf(node))) {
            matched = this.findFilteredNodes(node, { searchFields, filterText, isStrictMode }) || matched;
        }
        return matched;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    ngOnDestroy() {
        if (this.dragStartSubscription) {
            this.dragStartSubscription.unsubscribe();
        }
        if (this.dragStopSubscription) {
            this.dragStopSubscription.unsubscribe();
        }
    }
};
Tree.ctorParameters = () => [
    { type: ElementRef },
    { type: TreeDragDropService, decorators: [{ type: Optional }] }
];
__decorate([
    Input()
], Tree.prototype, "value", void 0);
__decorate([
    Input()
], Tree.prototype, "selectionMode", void 0);
__decorate([
    Input()
], Tree.prototype, "selection", void 0);
__decorate([
    Output()
], Tree.prototype, "selectionChange", void 0);
__decorate([
    Output()
], Tree.prototype, "onNodeSelect", void 0);
__decorate([
    Output()
], Tree.prototype, "onNodeUnselect", void 0);
__decorate([
    Output()
], Tree.prototype, "onNodeExpand", void 0);
__decorate([
    Output()
], Tree.prototype, "onNodeCollapse", void 0);
__decorate([
    Output()
], Tree.prototype, "onNodeContextMenuSelect", void 0);
__decorate([
    Output()
], Tree.prototype, "onNodeDrop", void 0);
__decorate([
    Input()
], Tree.prototype, "style", void 0);
__decorate([
    Input()
], Tree.prototype, "styleClass", void 0);
__decorate([
    Input()
], Tree.prototype, "contextMenu", void 0);
__decorate([
    Input()
], Tree.prototype, "layout", void 0);
__decorate([
    Input()
], Tree.prototype, "draggableScope", void 0);
__decorate([
    Input()
], Tree.prototype, "droppableScope", void 0);
__decorate([
    Input()
], Tree.prototype, "draggableNodes", void 0);
__decorate([
    Input()
], Tree.prototype, "droppableNodes", void 0);
__decorate([
    Input()
], Tree.prototype, "metaKeySelection", void 0);
__decorate([
    Input()
], Tree.prototype, "propagateSelectionUp", void 0);
__decorate([
    Input()
], Tree.prototype, "propagateSelectionDown", void 0);
__decorate([
    Input()
], Tree.prototype, "loading", void 0);
__decorate([
    Input()
], Tree.prototype, "loadingIcon", void 0);
__decorate([
    Input()
], Tree.prototype, "emptyMessage", void 0);
__decorate([
    Input()
], Tree.prototype, "ariaLabel", void 0);
__decorate([
    Input()
], Tree.prototype, "ariaLabelledBy", void 0);
__decorate([
    Input()
], Tree.prototype, "validateDrop", void 0);
__decorate([
    Input()
], Tree.prototype, "filter", void 0);
__decorate([
    Input()
], Tree.prototype, "filterBy", void 0);
__decorate([
    Input()
], Tree.prototype, "filterMode", void 0);
__decorate([
    Input()
], Tree.prototype, "filterPlaceholder", void 0);
__decorate([
    Input()
], Tree.prototype, "nodeTrackBy", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], Tree.prototype, "templates", void 0);
Tree = __decorate([
    Component({
        selector: 'p-tree',
        template: `
        <div [ngClass]="{'ui-tree ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode,'ui-treenode-dragover':dragHover,'ui-tree-loading': loading}" [ngStyle]="style" [class]="styleClass" *ngIf="!horizontal"
            (drop)="onDrop($event)" (dragover)="onDragOver($event)" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)">
            <div class="ui-tree-loading-mask ui-widget-overlay" *ngIf="loading"></div>
            <div class="ui-tree-loading-content" *ngIf="loading">
                <i [class]="'ui-tree-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <div *ngIf="filter" class="ui-tree-filter-container">
                <input #filter type="text" autocomplete="off" class="ui-tree-filter ui-inputtext ui-widget ui-state-default ui-corner-all" [attr.placeholder]="filterPlaceholder"
                    (keydown.enter)="$event.preventDefault()" (input)="onFilter($event)">
                    <span class="ui-tree-filter-icon pi pi-search"></span>
            </div>
            <ul class="ui-tree-container" *ngIf="getRootNode()" role="tree" [attr.aria-label]="ariaLabel" [attr.aria-labelledby]="ariaLabelledBy">
                <p-treeNode *ngFor="let node of getRootNode(); let firstChild=first;let lastChild=last; let index=index; trackBy: nodeTrackBy" [node]="node"
                [firstChild]="firstChild" [lastChild]="lastChild" [index]="index"></p-treeNode>
            </ul>
            <div class="ui-tree-empty-message" *ngIf="!loading && (value == null || value.length === 0)">{{emptyMessage}}</div>
        </div>
        <div [ngClass]="{'ui-tree ui-tree-horizontal ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode}"  [ngStyle]="style" [class]="styleClass" *ngIf="horizontal">
            <div class="ui-tree-loading ui-widget-overlay" *ngIf="loading"></div>
            <div class="ui-tree-loading-content" *ngIf="loading">
                <i [class]="'ui-tree-loading-icon pi-spin ' + loadingIcon"></i>
            </div>
            <table *ngIf="value&&value[0]">
                <p-treeNode [node]="value[0]" [root]="true"></p-treeNode>
            </table>
            <div class="ui-tree-empty-message" *ngIf="!loading && (value == null || value.length === 0)">{{emptyMessage}}</div>
        </div>
    `
    }),
    __param(1, Optional())
], Tree);
export { Tree };
let TreeModule = class TreeModule {
};
TreeModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Tree, SharedModule],
        declarations: [Tree, UITreeNode]
    })
], TreeModule);
export { TreeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvdHJlZS8iLCJzb3VyY2VzIjpbInRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxnQkFBZ0IsRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQ2xGLGVBQWUsRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUMxQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFHaEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBNkV2QyxJQUFhLFVBQVUsa0JBQXZCLE1BQWEsVUFBVTtJQWtCbkIsWUFBNEMsSUFBSTtRQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQVksQ0FBQztJQUM3QixDQUFDO0lBUUQsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFbkMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNsSTtJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxJQUFZLENBQUM7UUFFakIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUk7WUFDZCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O1lBRXRCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUVwSSxPQUFPLFlBQVUsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztJQUM5QyxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBWTtRQUNmLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7O1lBRXJCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFZO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBWTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFpQjtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBb0I7UUFDOUIsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUVELGNBQWM7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFpQjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQVksRUFBRSxRQUFnQjtRQUN0QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDbEMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLElBQUksYUFBYSxLQUFLLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUUvSCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJLHFCQUFxQixFQUFFO1lBQ2xGLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztvQkFDdEIsYUFBYSxFQUFFLEtBQUs7b0JBQ3BCLFFBQVEsRUFBRSxRQUFRO29CQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDckIsTUFBTSxFQUFFLEdBQUcsRUFBRTt3QkFDVCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDN0QsQ0FBQztpQkFDSixDQUFDLENBQUM7YUFDTjtpQkFDSTtnQkFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO29CQUN0QixhQUFhLEVBQUUsS0FBSztvQkFDcEIsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLO2lCQUN4QixDQUFDLENBQUM7YUFDTjtTQUNKO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVELGdCQUFnQixDQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUTtRQUM5QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNqRixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUUzQixJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7WUFDZCxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQy9JLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM5QzthQUNJO1lBQ0QsU0FBUyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDL0IsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztZQUMvQixJQUFJLEVBQUUsUUFBUTtZQUNkLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFDeEUsS0FBSyxFQUFFLGFBQWE7U0FDdkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1CQUFtQixDQUFDLEtBQUs7UUFDckIsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsb0JBQW9CLENBQUMsS0FBWSxFQUFFLFFBQWdCO1FBQy9DLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzdFLElBQUksUUFBUSxHQUFHLENBQUM7Z0JBQ1osSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7O2dCQUUxQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztTQUNqQztJQUNMLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxLQUFZO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNiLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssS0FBSyxFQUFFO1lBQzNELEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUUzQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hDLElBQUksRUFBRSxJQUFJO2dCQUNWLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUN4RSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWM7YUFDbEMsQ0FBQyxDQUFDO1NBQ047YUFDSTtZQUNELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBSztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztZQUMvQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ3hFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNwQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsS0FBSztRQUNwQixLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDdkMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMxQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFLO1FBQ1osSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLEVBQUU7WUFDM0QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNsQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQ25FLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQzt3QkFDdEIsYUFBYSxFQUFFLEtBQUs7d0JBQ3BCLFFBQVEsRUFBRSxRQUFRO3dCQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7d0JBQ25CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzt3QkFDakIsTUFBTSxFQUFFLEdBQUcsRUFBRTs0QkFDVCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNuQyxDQUFDO3FCQUNKLENBQUMsQ0FBQztpQkFDTjtxQkFDSTtvQkFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7d0JBQ3RCLGFBQWEsRUFBRSxLQUFLO3dCQUNwQixRQUFRLEVBQUUsUUFBUTt3QkFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJO3dCQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7cUJBQ3BCLENBQUMsQ0FBQztpQkFDTjthQUNKO1NBQ0o7UUFFRCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBRUQsZUFBZSxDQUFDLFFBQVE7UUFDcEIsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXBELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7WUFFbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7WUFDL0IsSUFBSSxFQUFFLFFBQVE7WUFDZCxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ3hFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7U0FDakMsQ0FBQyxDQUFDO0lBR1AsQ0FBQztJQUVELG1CQUFtQixDQUFDLEtBQUs7UUFDckIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzFJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzdCO0lBQ0wsQ0FBQztJQUVELG1CQUFtQixDQUFDLEtBQUs7UUFDckIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMxQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDdkQsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDakksSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7YUFDN0I7U0FDSjtJQUNMLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBb0I7UUFDMUIsTUFBTSxXQUFXLEdBQXFCLEtBQUssQ0FBQyxNQUFPLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztRQUVoRixJQUFJLFdBQVcsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFO1lBQ3ZDLE9BQU87U0FDVjtRQUVELFFBQVEsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNqQixZQUFZO1lBQ1osS0FBSyxFQUFFO2dCQUNILE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzSCxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMzQztxQkFDSTtvQkFDRCxNQUFNLGVBQWUsR0FBRyxXQUFXLENBQUMsa0JBQWtCLENBQUM7b0JBQ3ZELElBQUksZUFBZSxFQUFFO3dCQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO3FCQUNuQzt5QkFDSTt3QkFDRCxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDdEUsSUFBSSxtQkFBbUIsRUFBRTs0QkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO3lCQUN2QztxQkFDSjtpQkFDSjtnQkFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzNCLE1BQU07WUFFTixVQUFVO1lBQ1YsS0FBSyxFQUFFO2dCQUNILElBQUksV0FBVyxDQUFDLHNCQUFzQixFQUFFO29CQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO2lCQUN0RjtxQkFDSTtvQkFDRCxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxpQkFBaUIsRUFBRTt3QkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3FCQUNyQztpQkFDSjtnQkFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzNCLE1BQU07WUFFTixhQUFhO1lBQ2IsS0FBSyxFQUFFO2dCQUNILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdEI7Z0JBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUMzQixNQUFNO1lBRU4sWUFBWTtZQUNaLEtBQUssRUFBRTtnQkFDSCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN4QjtxQkFDSTtvQkFDRCxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxpQkFBaUIsRUFBRTt3QkFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO3FCQUNyQztpQkFDSjtnQkFFRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzNCLE1BQU07WUFFTixPQUFPO1lBQ1AsS0FBSyxFQUFFO2dCQUNILElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDM0IsTUFBTTtZQUVOO2dCQUNJLE9BQU87Z0JBQ1gsTUFBTTtTQUNUO0lBQ0wsQ0FBQztJQUVELHlCQUF5QixDQUFDLFdBQVc7UUFDakMsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0QsSUFBSSxpQkFBaUIsRUFBRTtZQUNuQixJQUFJLGlCQUFpQixDQUFDLGtCQUFrQjtnQkFDcEMsT0FBTyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FBQzs7Z0JBRTVDLE9BQU8sSUFBSSxDQUFDLHlCQUF5QixDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDaEU7YUFDSTtZQUNELE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRUQseUJBQXlCLENBQUMsV0FBVztRQUNqQyxNQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hFLElBQUksbUJBQW1CLElBQUksbUJBQW1CLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDaEUsTUFBTSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUUvRixPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzNEO2FBQ0k7WUFDRCxPQUFPLFdBQVcsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxXQUFXO1FBQzVCLE1BQU0saUJBQWlCLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1FBRWhGLE9BQU8saUJBQWlCLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNqRixDQUFDO0lBRUQsU0FBUyxDQUFDLE9BQU87UUFDYixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYztZQUN4QixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7WUFFeEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDaEQsQ0FBQztDQUNKLENBQUE7QUExWFUscUJBQVUsR0FBVyxtQkFBbUIsQ0FBQzs7NENBZ0JuQyxNQUFNLFNBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQzs7QUFkakM7SUFBUixLQUFLLEVBQUU7d0NBQWdCO0FBRWY7SUFBUixLQUFLLEVBQUU7OENBQXNCO0FBRXJCO0lBQVIsS0FBSyxFQUFFO3dDQUFlO0FBRWQ7SUFBUixLQUFLLEVBQUU7eUNBQWU7QUFFZDtJQUFSLEtBQUssRUFBRTs4Q0FBcUI7QUFFcEI7SUFBUixLQUFLLEVBQUU7NkNBQW9CO0FBZG5CLFVBQVU7SUEzRXRCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F1RVQ7S0FDSixDQUFDO0lBbUJlLFdBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0dBbEJsQyxVQUFVLENBNFh0QjtTQTVYWSxVQUFVO0FBOFp2QixJQUFhLElBQUksR0FBakIsTUFBYSxJQUFJO0lBMEZiLFlBQW1CLEVBQWMsRUFBcUIsZUFBb0M7UUFBdkUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFxQixvQkFBZSxHQUFmLGVBQWUsQ0FBcUI7UUFsRmhGLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFeEQsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVyRCxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXZELGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFckQsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV2RCw0QkFBdUIsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoRSxlQUFVLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFRcEQsV0FBTSxHQUFXLFVBQVUsQ0FBQztRQVU1QixxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFFakMseUJBQW9CLEdBQVksSUFBSSxDQUFDO1FBRXJDLDJCQUFzQixHQUFZLElBQUksQ0FBQztRQUl2QyxnQkFBVyxHQUFXLGVBQWUsQ0FBQztRQUV0QyxpQkFBWSxHQUFXLGtCQUFrQixDQUFDO1FBVTFDLGFBQVEsR0FBVyxPQUFPLENBQUM7UUFFM0IsZUFBVSxHQUFXLFNBQVMsQ0FBQztRQUkvQixnQkFBVyxHQUFhLENBQUMsS0FBYSxFQUFFLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBMEJ5QixDQUFDO0lBRTlGLFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDckIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FDcEUsS0FBSyxDQUFDLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQ2xFLEtBQUssQ0FBQyxFQUFFO2dCQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDckIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQUVELElBQUksVUFBVTtRQUNWLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUM7SUFDdkMsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7U0FDekI7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFjO1FBQzdCLElBQUksV0FBVyxHQUFjLEtBQUssQ0FBQyxNQUFPLENBQUM7UUFFM0MsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFO1lBQ3JELE9BQU87U0FDVjthQUNJLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN6QixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO2dCQUMzQixPQUFPO2FBQ1Y7WUFFRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO2dCQUN6QixJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFakQsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDUCxPQUFPO2lCQUNWO2FBQ0o7WUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFNUIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsRUFBRTtnQkFDaEMsSUFBSSxRQUFRLEVBQUU7b0JBQ1YsSUFBSSxJQUFJLENBQUMsc0JBQXNCO3dCQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzs7d0JBRWhDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUUsS0FBSyxDQUFDLENBQUM7b0JBRWhFLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztxQkFDeEM7b0JBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQ2hFO3FCQUNJO29CQUNELElBQUksSUFBSSxDQUFDLHNCQUFzQjt3QkFDM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7O3dCQUUvQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFFLEVBQUUsRUFBQyxJQUFJLENBQUMsQ0FBQztvQkFFbEQsSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTt3QkFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUN2QztvQkFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztpQkFDOUQ7YUFDSjtpQkFDSTtnQkFDRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztnQkFFckUsSUFBSSxhQUFhLEVBQUU7b0JBQ2YsSUFBSSxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFN0MsSUFBSSxRQUFRLElBQUksT0FBTyxFQUFFO3dCQUNyQixJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFOzRCQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDbkM7NkJBQ0k7NEJBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBRSxLQUFLLENBQUMsQ0FBQzs0QkFDNUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUM3Qzt3QkFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7cUJBQ2hFO3lCQUNJO3dCQUNELElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQUU7NEJBQzlCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNuQzs2QkFDSSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUFFOzRCQUNyQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFFLEVBQUUsQ0FBQzs0QkFDdEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDMUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUM3Qzt3QkFFRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7cUJBQzlEO2lCQUNKO3FCQUNJO29CQUNELElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQUU7d0JBQzlCLElBQUksUUFBUSxFQUFFOzRCQUNWLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7eUJBQ2hFOzZCQUNJOzRCQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOzRCQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7eUJBQzlEO3FCQUNKO3lCQUNJO3dCQUNELElBQUksUUFBUSxFQUFFOzRCQUNWLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUUsS0FBSyxDQUFDLENBQUM7NEJBQzVELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzt5QkFDaEU7NkJBQ0k7NEJBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxFQUFFLEVBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzt5QkFDOUQ7cUJBQ0o7b0JBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUM3QzthQUNKO1NBQ0o7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRUQsY0FBYztRQUNWLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFpQixFQUFFLElBQWM7UUFDOUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksV0FBVyxHQUFjLEtBQUssQ0FBQyxNQUFPLENBQUM7WUFFM0MsSUFBSSxXQUFXLENBQUMsU0FBUyxJQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqRixPQUFPO2FBQ1Y7aUJBQ0k7Z0JBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLFFBQVEsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFFNUIsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDWCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTt3QkFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O3dCQUVoQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ3pDO2dCQUVELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzthQUN6RTtTQUNKO0lBQ0wsQ0FBQztJQUVELG9CQUFvQixDQUFDLElBQWM7UUFDL0IsSUFBSSxLQUFLLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFdkIsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdEMsSUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBRTtnQkFDOUIsSUFBSSxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUM7Z0JBQ3RHLEtBQUssR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUM7YUFDbkM7aUJBQ0k7Z0JBQ0QsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUM1QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQyxJQUFJLGFBQWEsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksWUFBWSxJQUFJLElBQUksQ0FBQztvQkFDaEcsSUFBSSxhQUFhLEVBQUU7d0JBQ2YsS0FBSyxHQUFHLENBQUMsQ0FBQzt3QkFDVixNQUFNO3FCQUNUO2lCQUNKO2FBQ0o7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxjQUFjLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsS0FBVztRQUNqRCxnR0FBZ0c7UUFDaEcsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzFGLElBQUksS0FBSyxFQUFFO1lBQ1AsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssSUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFDMUUsQ0FBQztJQUVELGNBQWMsQ0FBQyxHQUFXLEVBQUUsS0FBaUI7UUFDekMsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEVBQUU7WUFDcEIsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRTtnQkFDbEIsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzFELElBQUksV0FBVyxFQUFFO29CQUNiLE9BQU8sV0FBVyxDQUFDO2lCQUN0QjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQWMsRUFBRSxNQUFlO1FBQ3ZDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN2QyxJQUFJLGFBQWEsR0FBVyxDQUFDLENBQUM7WUFDOUIsSUFBSSxvQkFBb0IsR0FBWSxLQUFLLENBQUM7WUFDMUMsS0FBSSxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUM1QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3hCLGFBQWEsRUFBRSxDQUFDO2lCQUNuQjtxQkFDSSxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7b0JBQzVCLG9CQUFvQixHQUFHLElBQUksQ0FBQztpQkFDL0I7YUFDSjtZQUVELElBQUksTUFBTSxJQUFJLGFBQWEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxFQUFFLEVBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO2FBQ2hDO2lCQUNJO2dCQUNELElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1QyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7d0JBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBRSxLQUFLLENBQUMsQ0FBQztxQkFDL0Q7aUJBQ0o7Z0JBRUQsSUFBSSxvQkFBb0IsSUFBSSxhQUFhLEdBQUcsQ0FBQyxJQUFJLGFBQWEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07b0JBQ2xGLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDOztvQkFFNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7YUFDcEM7WUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQUM7U0FDcEU7UUFFRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksTUFBTSxFQUFFO1lBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRUQsYUFBYSxDQUFDLElBQWMsRUFBRSxNQUFlO1FBQ3pDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU1QyxJQUFJLE1BQU0sSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxFQUFFLEVBQUMsSUFBSSxDQUFDLENBQUM7U0FDakQ7YUFDSSxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFFLEtBQUssQ0FBQyxDQUFDO1NBQy9EO1FBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFFN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRWpFLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN2QyxLQUFJLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQ3JDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQWM7UUFDckIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELHFCQUFxQjtRQUNqQixPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxRQUFRLENBQUM7SUFDaEUsQ0FBQztJQUVELHVCQUF1QjtRQUNuQixPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxVQUFVLENBQUM7SUFDbEUsQ0FBQztJQUVELHVCQUF1QjtRQUNuQixPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxVQUFVLENBQUM7SUFDbEUsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFJO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRCxXQUFXO1FBQ1AsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxJQUFjO1FBQzdCLElBQUksSUFBSSxDQUFDLFdBQVc7WUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7WUFFN0UsT0FBTyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFLO1FBQ1osSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2pFLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztZQUN2QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUs7UUFDUixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDakUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDN0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNwRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFFLEVBQUUsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRTFCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO29CQUMxQixJQUFJLEVBQUUsUUFBUTtpQkFDakIsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNiLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUNoRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN6QjtJQUNMLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBSztRQUNiLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDdkQsSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNwSCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzthQUN6QjtTQUNKO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxRQUFrQixFQUFFLFFBQWtCLEVBQUUsYUFBa0I7UUFDaEUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLDRDQUE0QztZQUM1QyxPQUFPLEtBQUssQ0FBQztTQUNoQjthQUNJLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzNDLElBQUksS0FBSyxHQUFZLElBQUksQ0FBQztZQUMxQixJQUFJLFFBQVEsRUFBRTtnQkFDVixJQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUU7b0JBQ3ZCLEtBQUssR0FBRyxLQUFLLENBQUM7aUJBQ2pCO3FCQUNJO29CQUNELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7b0JBQzdCLE9BQU0sTUFBTSxJQUFJLElBQUksRUFBRTt3QkFDbEIsSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFOzRCQUNyQixLQUFLLEdBQUcsS0FBSyxDQUFDOzRCQUNkLE1BQU07eUJBQ1Q7d0JBQ0QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7cUJBQzFCO2lCQUNKO2FBQ0o7WUFFRCxPQUFPLEtBQUssQ0FBQztTQUNoQjthQUNJO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsU0FBYztRQUMzQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBRXBDLElBQUksU0FBUyxFQUFFO1lBQ1gsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQUU7Z0JBQy9CLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUTtvQkFDN0IsT0FBTyxTQUFTLEtBQUssU0FBUyxDQUFDO3FCQUM5QixJQUFJLFNBQVMsWUFBWSxLQUFLO29CQUMvQixPQUFvQixTQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQy9EO2lCQUNJLElBQUksU0FBUyxZQUFZLEtBQUssRUFBRTtnQkFDakMsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQUU7b0JBQy9CLE9BQW9CLFNBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQzNEO3FCQUNJLElBQUksU0FBUyxZQUFZLEtBQUssRUFBRTtvQkFDakMsS0FBSSxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUU7d0JBQ3BCLEtBQUksSUFBSSxFQUFFLElBQUksU0FBUyxFQUFFOzRCQUNyQixJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0NBQ1YsT0FBTyxJQUFJLENBQUM7NkJBQ2Y7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2hCO2FBQ0k7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFLO1FBQ1YsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxXQUFXLEtBQUssRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzdCO2FBQ0k7WUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztZQUN4QixNQUFNLFlBQVksR0FBYSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4RCxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3hFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDO1lBQ2xELEtBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDeEIsSUFBSSxRQUFRLHFCQUFPLElBQUksQ0FBQyxDQUFDO2dCQUN6QixJQUFJLGlCQUFpQixHQUFHLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUMsQ0FBQztnQkFDakUsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7b0JBQzVILENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQy9ILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUNyQzthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsSUFBSSxFQUFFLGlCQUFpQjtRQUNyQyxJQUFJLElBQUksRUFBRTtZQUNOLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ25CLEtBQUssSUFBSSxTQUFTLElBQUksVUFBVSxFQUFFO29CQUM5QixJQUFJLGFBQWEscUJBQU8sU0FBUyxDQUFDLENBQUM7b0JBQ25DLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsRUFBRTt3QkFDeEQsT0FBTyxHQUFHLElBQUksQ0FBQzt3QkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztxQkFDckM7aUJBQ0o7YUFDSjtZQUVELElBQUksT0FBTyxFQUFFO2dCQUNULElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7SUFDTCxDQUFDO0lBRUQsZUFBZSxDQUFDLElBQUksRUFBRSxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFDO1FBQzFELElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixLQUFJLElBQUksS0FBSyxJQUFJLFlBQVksRUFBRTtZQUMzQixJQUFJLFVBQVUsR0FBRyxXQUFXLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM1RyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JDLE9BQU8sR0FBRyxJQUFJLENBQUM7YUFDbEI7U0FDSjtRQUVELElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDdEQsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBQyxDQUFDLElBQUksT0FBTyxDQUFDO1NBQy9GO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQzVCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM1QztRQUVELElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzNCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMzQztJQUNMLENBQUM7Q0FDSixDQUFBOztZQTNlMEIsVUFBVTtZQUFzQyxtQkFBbUIsdUJBQXRELFFBQVE7O0FBeEZuQztJQUFSLEtBQUssRUFBRTttQ0FBbUI7QUFFbEI7SUFBUixLQUFLLEVBQUU7MkNBQXVCO0FBRXRCO0lBQVIsS0FBSyxFQUFFO3VDQUFnQjtBQUVkO0lBQVQsTUFBTSxFQUFFOzZDQUF5RDtBQUV4RDtJQUFULE1BQU0sRUFBRTswQ0FBc0Q7QUFFckQ7SUFBVCxNQUFNLEVBQUU7NENBQXdEO0FBRXZEO0lBQVQsTUFBTSxFQUFFOzBDQUFzRDtBQUVyRDtJQUFULE1BQU0sRUFBRTs0Q0FBd0Q7QUFFdkQ7SUFBVCxNQUFNLEVBQUU7cURBQWlFO0FBRWhFO0lBQVQsTUFBTSxFQUFFO3dDQUFvRDtBQUVwRDtJQUFSLEtBQUssRUFBRTttQ0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFO3dDQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTt5Q0FBa0I7QUFFakI7SUFBUixLQUFLLEVBQUU7b0NBQTZCO0FBRTVCO0lBQVIsS0FBSyxFQUFFOzRDQUFxQjtBQUVwQjtJQUFSLEtBQUssRUFBRTs0Q0FBcUI7QUFFcEI7SUFBUixLQUFLLEVBQUU7NENBQXlCO0FBRXhCO0lBQVIsS0FBSyxFQUFFOzRDQUF5QjtBQUV4QjtJQUFSLEtBQUssRUFBRTs4Q0FBa0M7QUFFakM7SUFBUixLQUFLLEVBQUU7a0RBQXNDO0FBRXJDO0lBQVIsS0FBSyxFQUFFO29EQUF3QztBQUV2QztJQUFSLEtBQUssRUFBRTtxQ0FBa0I7QUFFakI7SUFBUixLQUFLLEVBQUU7eUNBQXVDO0FBRXRDO0lBQVIsS0FBSyxFQUFFOzBDQUEyQztBQUUxQztJQUFSLEtBQUssRUFBRTt1Q0FBbUI7QUFFbEI7SUFBUixLQUFLLEVBQUU7NENBQXdCO0FBRXZCO0lBQVIsS0FBSyxFQUFFOzBDQUF1QjtBQUV0QjtJQUFSLEtBQUssRUFBRTtvQ0FBaUI7QUFFaEI7SUFBUixLQUFLLEVBQUU7c0NBQTRCO0FBRTNCO0lBQVIsS0FBSyxFQUFFO3dDQUFnQztBQUUvQjtJQUFSLEtBQUssRUFBRTsrQ0FBMkI7QUFFMUI7SUFBUixLQUFLLEVBQUU7eUNBQTREO0FBRXBDO0lBQS9CLGVBQWUsQ0FBQyxhQUFhLENBQUM7dUNBQTJCO0FBbEVqRCxJQUFJO0lBaENoQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsUUFBUTtRQUNsQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0E0QlQ7S0FDSixDQUFDO0lBMkZzQyxXQUFBLFFBQVEsRUFBRSxDQUFBO0dBMUZyQyxJQUFJLENBcWtCaEI7U0Fya0JZLElBQUk7QUEya0JqQixJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0NBQUksQ0FBQTtBQUFkLFVBQVU7SUFMdEIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBQyxZQUFZLENBQUM7UUFDNUIsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFDLFVBQVUsQ0FBQztLQUNsQyxDQUFDO0dBQ1csVUFBVSxDQUFJO1NBQWQsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LEFmdGVyQ29udGVudEluaXQsT25EZXN0cm95LE91dHB1dCxFdmVudEVtaXR0ZXIsT25Jbml0LFxuICAgIENvbnRlbnRDaGlsZHJlbixRdWVyeUxpc3QsVGVtcGxhdGVSZWYsSW5qZWN0LEVsZW1lbnRSZWYsZm9yd2FyZFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtUcmVlTm9kZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtTaGFyZWRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7UHJpbWVUZW1wbGF0ZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtUcmVlRHJhZ0Ryb3BTZXJ2aWNlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0Jsb2NrYWJsZVVJfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge09iamVjdFV0aWxzfSBmcm9tICdwcmltZW5nL3V0aWxzJztcbmltcG9ydCB7RG9tSGFuZGxlcn0gZnJvbSAncHJpbWVuZy9kb20nO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdHJlZU5vZGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJub2RlXCI+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCJ0cmVlLmRyb3BwYWJsZU5vZGVzXCIgY2xhc3M9XCJ1aS10cmVlbm9kZS1kcm9wcG9pbnRcIiBbbmdDbGFzc109XCJ7J3VpLXRyZWVub2RlLWRyb3Bwb2ludC1hY3RpdmUgdWktc3RhdGUtaGlnaGxpZ2h0JzpkcmFnaG92ZXJQcmV2fVwiXG4gICAgICAgICAgICAoZHJvcCk9XCJvbkRyb3BQb2ludCgkZXZlbnQsLTEpXCIgKGRyYWdvdmVyKT1cIm9uRHJvcFBvaW50RHJhZ092ZXIoJGV2ZW50KVwiIChkcmFnZW50ZXIpPVwib25Ecm9wUG9pbnREcmFnRW50ZXIoJGV2ZW50LC0xKVwiIChkcmFnbGVhdmUpPVwib25Ecm9wUG9pbnREcmFnTGVhdmUoJGV2ZW50KVwiPjwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCIhdHJlZS5ob3Jpem9udGFsXCIgcm9sZT1cInRyZWVpdGVtXCIgW25nQ2xhc3NdPVwiWyd1aS10cmVlbm9kZScsbm9kZS5zdHlsZUNsYXNzfHwnJywgaXNMZWFmKCkgPyAndWktdHJlZW5vZGUtbGVhZic6ICcnXVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10cmVlbm9kZS1jb250ZW50XCIgKGNsaWNrKT1cIm9uTm9kZUNsaWNrKCRldmVudClcIiAoY29udGV4dG1lbnUpPVwib25Ob2RlUmlnaHRDbGljaygkZXZlbnQpXCIgKHRvdWNoZW5kKT1cIm9uTm9kZVRvdWNoRW5kKClcIlxuICAgICAgICAgICAgICAgICAgICAoZHJvcCk9XCJvbkRyb3BOb2RlKCRldmVudClcIiAoZHJhZ292ZXIpPVwib25Ecm9wTm9kZURyYWdPdmVyKCRldmVudClcIiAoZHJhZ2VudGVyKT1cIm9uRHJvcE5vZGVEcmFnRW50ZXIoJGV2ZW50KVwiIChkcmFnbGVhdmUpPVwib25Ecm9wTm9kZURyYWdMZWF2ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgW2RyYWdnYWJsZV09XCJ0cmVlLmRyYWdnYWJsZU5vZGVzXCIgKGRyYWdzdGFydCk9XCJvbkRyYWdTdGFydCgkZXZlbnQpXCIgKGRyYWdlbmQpPVwib25EcmFnU3RvcCgkZXZlbnQpXCIgdGFiSW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS10cmVlbm9kZS1zZWxlY3RhYmxlJzp0cmVlLnNlbGVjdGlvbk1vZGUgJiYgbm9kZS5zZWxlY3RhYmxlICE9PSBmYWxzZSwndWktdHJlZW5vZGUtZHJhZ292ZXInOmRyYWdob3Zlck5vZGUsICd1aS10cmVlbm9kZS1jb250ZW50LXNlbGVjdGVkJzppc1NlbGVjdGVkKCl9XCIgXG4gICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCIgW2F0dHIuYXJpYS1wb3NpbnNldF09XCJ0aGlzLmluZGV4ICsgMVwiIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwidGhpcy5ub2RlLmV4cGFuZGVkXCIgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJpc1NlbGVjdGVkKClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS10cmVlLXRvZ2dsZXIgcGkgcGktZncgdWktdW5zZWxlY3RhYmxlLXRleHRcIiBbbmdDbGFzc109XCJ7J3BpLWNhcmV0LXJpZ2h0Jzohbm9kZS5leHBhbmRlZCwncGktY2FyZXQtZG93bic6bm9kZS5leHBhbmRlZH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiPjwvc3BhblxuICAgICAgICAgICAgICAgICAgICA+PGRpdiBjbGFzcz1cInVpLWNoa2JveFwiICpuZ0lmPVwidHJlZS5zZWxlY3Rpb25Nb2RlID09ICdjaGVja2JveCdcIiBbYXR0ci5hcmlhLWNoZWNrZWRdPVwiaXNTZWxlY3RlZCgpXCI+PGRpdiBjbGFzcz1cInVpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktc3RhdGUtZGVmYXVsdFwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOiBub2RlLnNlbGVjdGFibGUgPT09IGZhbHNlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jaGtib3gtaWNvbiB1aS1jbGlja2FibGUgcGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncGktY2hlY2snOmlzU2VsZWN0ZWQoKSwncGktbWludXMnOm5vZGUucGFydGlhbFNlbGVjdGVkfVwiPjwvc3Bhbj48L2Rpdj48L2RpdlxuICAgICAgICAgICAgICAgICAgICA+PHNwYW4gW2NsYXNzXT1cImdldEljb24oKVwiICpuZ0lmPVwibm9kZS5pY29ufHxub2RlLmV4cGFuZGVkSWNvbnx8bm9kZS5jb2xsYXBzZWRJY29uXCI+PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgID48c3BhbiBjbGFzcz1cInVpLXRyZWVub2RlLWxhYmVsIHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1oaWdobGlnaHQnOmlzU2VsZWN0ZWQoKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiF0cmVlLmdldFRlbXBsYXRlRm9yTm9kZShub2RlKVwiPnt7bm9kZS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidHJlZS5nZXRUZW1wbGF0ZUZvck5vZGUobm9kZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRyZWUuZ2V0VGVtcGxhdGVGb3JOb2RlKG5vZGUpOyBjb250ZXh0OiB7JGltcGxpY2l0OiBub2RlfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLXRyZWVub2RlLWNoaWxkcmVuXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiICpuZ0lmPVwibm9kZS5jaGlsZHJlbiAmJiBub2RlLmV4cGFuZGVkXCIgW3N0eWxlLmRpc3BsYXldPVwibm9kZS5leHBhbmRlZCA/ICdibG9jaycgOiAnbm9uZSdcIiByb2xlPVwiZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAtdHJlZU5vZGUgKm5nRm9yPVwibGV0IGNoaWxkTm9kZSBvZiBub2RlLmNoaWxkcmVuO2xldCBmaXJzdENoaWxkPWZpcnN0O2xldCBsYXN0Q2hpbGQ9bGFzdDsgbGV0IGluZGV4PWluZGV4OyB0cmFja0J5OiB0cmVlLm5vZGVUcmFja0J5XCIgW25vZGVdPVwiY2hpbGROb2RlXCIgW3BhcmVudE5vZGVdPVwibm9kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZmlyc3RDaGlsZF09XCJmaXJzdENoaWxkXCIgW2xhc3RDaGlsZF09XCJsYXN0Q2hpbGRcIiBbaW5kZXhdPVwiaW5kZXhcIj48L3AtdHJlZU5vZGU+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCJ0cmVlLmRyb3BwYWJsZU5vZGVzJiZsYXN0Q2hpbGRcIiBjbGFzcz1cInVpLXRyZWVub2RlLWRyb3Bwb2ludFwiIFtuZ0NsYXNzXT1cInsndWktdHJlZW5vZGUtZHJvcHBvaW50LWFjdGl2ZSB1aS1zdGF0ZS1oaWdobGlnaHQnOmRyYWdob3Zlck5leHR9XCJcbiAgICAgICAgICAgIChkcm9wKT1cIm9uRHJvcFBvaW50KCRldmVudCwxKVwiIChkcmFnb3Zlcik9XCJvbkRyb3BQb2ludERyYWdPdmVyKCRldmVudClcIiAoZHJhZ2VudGVyKT1cIm9uRHJvcFBvaW50RHJhZ0VudGVyKCRldmVudCwxKVwiIChkcmFnbGVhdmUpPVwib25Ecm9wUG9pbnREcmFnTGVhdmUoJGV2ZW50KVwiPjwvbGk+XG4gICAgICAgICAgICA8dGFibGUgKm5nSWY9XCJ0cmVlLmhvcml6b250YWxcIiBbY2xhc3NdPVwibm9kZS5zdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ1aS10cmVlbm9kZS1jb25uZWN0b3JcIiAqbmdJZj1cIiFyb290XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidWktdHJlZW5vZGUtY29ubmVjdG9yLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgW25nQ2xhc3NdPVwieyd1aS10cmVlbm9kZS1jb25uZWN0b3ItbGluZSc6IWZpcnN0Q2hpbGR9XCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIFtuZ0NsYXNzXT1cInsndWktdHJlZW5vZGUtY29ubmVjdG9yLWxpbmUnOiFsYXN0Q2hpbGR9XCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ1aS10cmVlbm9kZVwiIFtuZ0NsYXNzXT1cInsndWktdHJlZW5vZGUtY29sbGFwc2VkJzohbm9kZS5leHBhbmRlZH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZW5vZGUtY29udGVudCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIiB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXRyZWVub2RlLXNlbGVjdGFibGUnOnRyZWUuc2VsZWN0aW9uTW9kZSwndWktc3RhdGUtaGlnaGxpZ2h0Jzppc1NlbGVjdGVkKCl9XCIgKGNsaWNrKT1cIm9uTm9kZUNsaWNrKCRldmVudClcIiAoY29udGV4dG1lbnUpPVwib25Ob2RlUmlnaHRDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRvdWNoZW5kKT1cIm9uTm9kZVRvdWNoRW5kKClcIiAoa2V5ZG93bik9XCJvbk5vZGVLZXlkb3duKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS10cmVlLXRvZ2dsZXIgcGkgcGktZncgdWktdW5zZWxlY3RhYmxlLXRleHRcIiBbbmdDbGFzc109XCJ7J3BpLXBsdXMnOiFub2RlLmV4cGFuZGVkLCdwaS1taW51cyc6bm9kZS5leHBhbmRlZH1cIiAqbmdJZj1cIiFpc0xlYWYoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCI+PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48c3BhbiBbY2xhc3NdPVwiZ2V0SWNvbigpXCIgKm5nSWY9XCJub2RlLmljb258fG5vZGUuZXhwYW5kZWRJY29ufHxub2RlLmNvbGxhcHNlZEljb25cIj48L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjxzcGFuIGNsYXNzPVwidWktdHJlZW5vZGUtbGFiZWwgdWktY29ybmVyLWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXRyZWUuZ2V0VGVtcGxhdGVGb3JOb2RlKG5vZGUpXCI+e3tub2RlLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0cmVlLmdldFRlbXBsYXRlRm9yTm9kZShub2RlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0cmVlLmdldFRlbXBsYXRlRm9yTm9kZShub2RlKTsgY29udGV4dDogeyRpbXBsaWNpdDogbm9kZX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ1aS10cmVlbm9kZS1jaGlsZHJlbi1jb250YWluZXJcIiAqbmdJZj1cIm5vZGUuY2hpbGRyZW4gJiYgbm9kZS5leHBhbmRlZFwiIFtzdHlsZS5kaXNwbGF5XT1cIm5vZGUuZXhwYW5kZWQgPyAndGFibGUtY2VsbCcgOiAnbm9uZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZW5vZGUtY2hpbGRyZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtdHJlZU5vZGUgKm5nRm9yPVwibGV0IGNoaWxkTm9kZSBvZiBub2RlLmNoaWxkcmVuO2xldCBmaXJzdENoaWxkPWZpcnN0O2xldCBsYXN0Q2hpbGQ9bGFzdDsgdHJhY2tCeTogdHJlZS5ub2RlVHJhY2tCeVwiIFtub2RlXT1cImNoaWxkTm9kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZpcnN0Q2hpbGRdPVwiZmlyc3RDaGlsZFwiIFtsYXN0Q2hpbGRdPVwibGFzdENoaWxkXCI+PC9wLXRyZWVOb2RlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFVJVHJlZU5vZGUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgc3RhdGljIElDT05fQ0xBU1M6IHN0cmluZyA9ICd1aS10cmVlbm9kZS1pY29uICc7XG5cbiAgICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcblxuICAgIEBJbnB1dCgpIHBhcmVudE5vZGU6IFRyZWVOb2RlO1xuXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBmaXJzdENoaWxkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbGFzdENoaWxkOiBib29sZWFuO1xuXG4gICAgdHJlZTogVHJlZTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBUcmVlKSkgdHJlZSkge1xuICAgICAgICB0aGlzLnRyZWUgPSB0cmVlIGFzIFRyZWU7XG4gICAgfVxuXG4gICAgZHJhZ2hvdmVyUHJldjogYm9vbGVhbjtcblxuICAgIGRyYWdob3Zlck5leHQ6IGJvb2xlYW47XG5cbiAgICBkcmFnaG92ZXJOb2RlOiBib29sZWFuXG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcblxuICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUuc3luY05vZGVPcHRpb24odGhpcy5ub2RlLCB0aGlzLnRyZWUudmFsdWUsICdwYXJlbnQnLCB0aGlzLnRyZWUuZ2V0Tm9kZVdpdGhLZXkodGhpcy5wYXJlbnROb2RlLmtleSwgdGhpcy50cmVlLnZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRJY29uKCkge1xuICAgICAgICBsZXQgaWNvbjogc3RyaW5nO1xuXG4gICAgICAgIGlmICh0aGlzLm5vZGUuaWNvbilcbiAgICAgICAgICAgIGljb24gPSB0aGlzLm5vZGUuaWNvbjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWNvbiA9IHRoaXMubm9kZS5leHBhbmRlZCAmJiB0aGlzLm5vZGUuY2hpbGRyZW4gJiYgdGhpcy5ub2RlLmNoaWxkcmVuLmxlbmd0aCA/IHRoaXMubm9kZS5leHBhbmRlZEljb24gOiB0aGlzLm5vZGUuY29sbGFwc2VkSWNvbjtcblxuICAgICAgICByZXR1cm4gVUlUcmVlTm9kZS5JQ09OX0NMQVNTICsgJyAnICsgaWNvbjtcbiAgICB9XG5cbiAgICBpc0xlYWYoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUuaXNOb2RlTGVhZih0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIHRvZ2dsZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMubm9kZS5leHBhbmRlZClcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoZXZlbnQpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmV4cGFuZChldmVudCk7XG4gICAgfVxuXG4gICAgZXhwYW5kKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLm5vZGUuZXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnRyZWUub25Ob2RlRXhwYW5kLmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiB0aGlzLm5vZGV9KTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5ub2RlLmV4cGFuZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudHJlZS5vbk5vZGVDb2xsYXBzZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogdGhpcy5ub2RlfSk7XG4gICAgfVxuXG4gICAgb25Ob2RlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy50cmVlLm9uTm9kZUNsaWNrKGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIG9uTm9kZUtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICAgICAgdGhpcy50cmVlLm9uTm9kZUNsaWNrKGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgICAgICB9XG4gICAgfSBcblxuICAgIG9uTm9kZVRvdWNoRW5kKCkge1xuICAgICAgICB0aGlzLnRyZWUub25Ob2RlVG91Y2hFbmQoKTtcbiAgICB9XG5cbiAgICBvbk5vZGVSaWdodENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMudHJlZS5vbk5vZGVSaWdodENsaWNrKGV2ZW50LCB0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyZWUuaXNTZWxlY3RlZCh0aGlzLm5vZGUpO1xuICAgIH1cblxuICAgIG9uRHJvcFBvaW50KGV2ZW50OiBFdmVudCwgcG9zaXRpb246IG51bWJlcikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgZHJhZ05vZGUgPSB0aGlzLnRyZWUuZHJhZ05vZGU7XG4gICAgICAgIGxldCBkcmFnTm9kZUluZGV4ID0gdGhpcy50cmVlLmRyYWdOb2RlSW5kZXg7XG4gICAgICAgIGxldCBkcmFnTm9kZVNjb3BlID0gdGhpcy50cmVlLmRyYWdOb2RlU2NvcGU7XG4gICAgICAgIGxldCBpc1ZhbGlkRHJvcFBvaW50SW5kZXggPSB0aGlzLnRyZWUuZHJhZ05vZGVUcmVlID09PSB0aGlzLnRyZWUgPyAocG9zaXRpb24gPT09IDEgfHwgZHJhZ05vZGVJbmRleCAhPT0gdGhpcy5pbmRleCAtIDEpIDogdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy50cmVlLmFsbG93RHJvcChkcmFnTm9kZSwgdGhpcy5ub2RlLCBkcmFnTm9kZVNjb3BlKSAmJiBpc1ZhbGlkRHJvcFBvaW50SW5kZXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyZWUudmFsaWRhdGVEcm9wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlLm9uTm9kZURyb3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBkcmFnTm9kZTogZHJhZ05vZGUsXG4gICAgICAgICAgICAgICAgICAgIGRyb3BOb2RlOiB0aGlzLm5vZGUsXG4gICAgICAgICAgICAgICAgICAgIGRyb3BJbmRleDogdGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NQb2ludERyb3AoZHJhZ05vZGUsIGRyYWdOb2RlSW5kZXgsIHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzUG9pbnREcm9wKGRyYWdOb2RlLCBkcmFnTm9kZUluZGV4LCBwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlLm9uTm9kZURyb3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBkcmFnTm9kZTogZHJhZ05vZGUsXG4gICAgICAgICAgICAgICAgICAgIGRyb3BOb2RlOiB0aGlzLm5vZGUsXG4gICAgICAgICAgICAgICAgICAgIGRyb3BJbmRleDogdGhpcy5pbmRleFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmFnaG92ZXJQcmV2ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ2hvdmVyTmV4dCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByb2Nlc3NQb2ludERyb3AoZHJhZ05vZGUsIGRyYWdOb2RlSW5kZXgsIHBvc2l0aW9uKSB7XG4gICAgICAgIGxldCBuZXdOb2RlTGlzdCA9IHRoaXMubm9kZS5wYXJlbnQgPyB0aGlzLm5vZGUucGFyZW50LmNoaWxkcmVuIDogdGhpcy50cmVlLnZhbHVlO1xuICAgICAgICB0aGlzLnRyZWUuZHJhZ05vZGVTdWJOb2Rlcy5zcGxpY2UoZHJhZ05vZGVJbmRleCwgMSk7XG4gICAgICAgIGxldCBkcm9wSW5kZXggPSB0aGlzLmluZGV4O1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApIHtcbiAgICAgICAgICAgIGRyb3BJbmRleCA9ICh0aGlzLnRyZWUuZHJhZ05vZGVTdWJOb2RlcyA9PT0gbmV3Tm9kZUxpc3QpID8gKCh0aGlzLnRyZWUuZHJhZ05vZGVJbmRleCA+IHRoaXMuaW5kZXgpID8gdGhpcy5pbmRleCA6IHRoaXMuaW5kZXggLSAxKSA6IHRoaXMuaW5kZXg7XG4gICAgICAgICAgICBuZXdOb2RlTGlzdC5zcGxpY2UoZHJvcEluZGV4LCAwLCBkcmFnTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkcm9wSW5kZXggPSBuZXdOb2RlTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBuZXdOb2RlTGlzdC5wdXNoKGRyYWdOb2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJlZS5kcmFnRHJvcFNlcnZpY2Uuc3RvcERyYWcoe1xuICAgICAgICAgICAgbm9kZTogZHJhZ05vZGUsXG4gICAgICAgICAgICBzdWJOb2RlczogdGhpcy5ub2RlLnBhcmVudCA/IHRoaXMubm9kZS5wYXJlbnQuY2hpbGRyZW4gOiB0aGlzLnRyZWUudmFsdWUsXG4gICAgICAgICAgICBpbmRleDogZHJhZ05vZGVJbmRleFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkRyb3BQb2ludERyYWdPdmVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRHJvcFBvaW50RHJhZ0VudGVyKGV2ZW50OiBFdmVudCwgcG9zaXRpb246IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy50cmVlLmFsbG93RHJvcCh0aGlzLnRyZWUuZHJhZ05vZGUsIHRoaXMubm9kZSwgdGhpcy50cmVlLmRyYWdOb2RlU2NvcGUpKSB7XG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2hvdmVyUHJldiA9IHRydWU7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnaG92ZXJOZXh0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJvcFBvaW50RHJhZ0xlYXZlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmRyYWdob3ZlclByZXYgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnaG92ZXJOZXh0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMudHJlZS5kcmFnZ2FibGVOb2RlcyAmJiB0aGlzLm5vZGUuZHJhZ2dhYmxlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIFwiZGF0YVwiKTtcblxuICAgICAgICAgICAgdGhpcy50cmVlLmRyYWdEcm9wU2VydmljZS5zdGFydERyYWcoe1xuICAgICAgICAgICAgICAgIHRyZWU6IHRoaXMsXG4gICAgICAgICAgICAgICAgbm9kZTogdGhpcy5ub2RlLFxuICAgICAgICAgICAgICAgIHN1Yk5vZGVzOiB0aGlzLm5vZGUucGFyZW50ID8gdGhpcy5ub2RlLnBhcmVudC5jaGlsZHJlbiA6IHRoaXMudHJlZS52YWx1ZSxcbiAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICBzY29wZTogdGhpcy50cmVlLmRyYWdnYWJsZVNjb3BlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyYWdTdG9wKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudHJlZS5kcmFnRHJvcFNlcnZpY2Uuc3RvcERyYWcoe1xuICAgICAgICAgICAgbm9kZTogdGhpcy5ub2RlLFxuICAgICAgICAgICAgc3ViTm9kZXM6IHRoaXMubm9kZS5wYXJlbnQgPyB0aGlzLm5vZGUucGFyZW50LmNoaWxkcmVuIDogdGhpcy50cmVlLnZhbHVlLFxuICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Ecm9wTm9kZURyYWdPdmVyKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ21vdmUnO1xuICAgICAgICBpZiAodGhpcy50cmVlLmRyb3BwYWJsZU5vZGVzKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyb3BOb2RlKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnRyZWUuZHJvcHBhYmxlTm9kZXMgJiYgdGhpcy5ub2RlLmRyb3BwYWJsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGxldCBkcmFnTm9kZSA9IHRoaXMudHJlZS5kcmFnTm9kZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyZWUuYWxsb3dEcm9wKGRyYWdOb2RlLCB0aGlzLm5vZGUsIHRoaXMudHJlZS5kcmFnTm9kZVNjb3BlKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyZWUudmFsaWRhdGVEcm9wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZS5vbk5vZGVEcm9wLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnTm9kZTogZHJhZ05vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wTm9kZTogdGhpcy5ub2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NOb2RlRHJvcChkcmFnTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gICBcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTm9kZURyb3AoZHJhZ05vZGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUub25Ob2RlRHJvcC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ05vZGU6IGRyYWdOb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE5vZGU6IHRoaXMubm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRyYWdob3Zlck5vZGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcm9jZXNzTm9kZURyb3AoZHJhZ05vZGUpIHtcbiAgICAgICAgbGV0IGRyYWdOb2RlSW5kZXggPSB0aGlzLnRyZWUuZHJhZ05vZGVJbmRleDtcbiAgICAgICAgdGhpcy50cmVlLmRyYWdOb2RlU3ViTm9kZXMuc3BsaWNlKGRyYWdOb2RlSW5kZXgsIDEpO1xuXG4gICAgICAgIGlmICh0aGlzLm5vZGUuY2hpbGRyZW4pXG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW4ucHVzaChkcmFnTm9kZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbiA9IFtkcmFnTm9kZV07XG5cbiAgICAgICAgdGhpcy50cmVlLmRyYWdEcm9wU2VydmljZS5zdG9wRHJhZyh7XG4gICAgICAgICAgICBub2RlOiBkcmFnTm9kZSxcbiAgICAgICAgICAgIHN1Yk5vZGVzOiB0aGlzLm5vZGUucGFyZW50ID8gdGhpcy5ub2RlLnBhcmVudC5jaGlsZHJlbiA6IHRoaXMudHJlZS52YWx1ZSxcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLnRyZWUuZHJhZ05vZGVJbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICBcbiAgICB9XG5cbiAgICBvbkRyb3BOb2RlRHJhZ0VudGVyKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnRyZWUuZHJvcHBhYmxlTm9kZXMgJiYgdGhpcy5ub2RlLmRyb3BwYWJsZSAhPT0gZmFsc2UgJiYgdGhpcy50cmVlLmFsbG93RHJvcCh0aGlzLnRyZWUuZHJhZ05vZGUsIHRoaXMubm9kZSwgdGhpcy50cmVlLmRyYWdOb2RlU2NvcGUpKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdob3Zlck5vZGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ecm9wTm9kZURyYWdMZWF2ZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy50cmVlLmRyb3BwYWJsZU5vZGVzKSB7XG4gICAgICAgICAgICBsZXQgcmVjdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQueCA+IHJlY3QubGVmdCArIHJlY3Qud2lkdGggfHwgZXZlbnQueCA8IHJlY3QubGVmdCB8fCBldmVudC55ID49IE1hdGguZmxvb3IocmVjdC50b3AgKyByZWN0LmhlaWdodCkgfHwgZXZlbnQueSA8IHJlY3QudG9wKSB7XG4gICAgICAgICAgICAgICB0aGlzLmRyYWdob3Zlck5vZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBub2RlRWxlbWVudCA9ICg8SFRNTERpdkVsZW1lbnQ+IGV2ZW50LnRhcmdldCkucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIGlmIChub2RlRWxlbWVudC5ub2RlTmFtZSAhPT0gJ1AtVFJFRU5PREUnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAvL2Rvd24gYXJyb3dcbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdEVsZW1lbnQgPSAodGhpcy50cmVlLmRyb3BwYWJsZU5vZGVzKSA/IG5vZGVFbGVtZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdIDogbm9kZUVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV07XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RFbGVtZW50ICYmIGxpc3RFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c05vZGUobGlzdEVsZW1lbnQuY2hpbGRyZW5bMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dE5vZGVFbGVtZW50ID0gbm9kZUVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dE5vZGVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzTm9kZShuZXh0Tm9kZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRTaWJsaW5nQW5jZXN0b3IgPSB0aGlzLmZpbmROZXh0U2libGluZ09mQW5jZXN0b3Iobm9kZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTaWJsaW5nQW5jZXN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzTm9kZShuZXh0U2libGluZ0FuY2VzdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy91cCBhcnJvd1xuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICBpZiAobm9kZUVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzTm9kZSh0aGlzLmZpbmRMYXN0VmlzaWJsZURlc2NlbmRhbnQobm9kZUVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmVudE5vZGVFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnROb2RlRWxlbWVudChub2RlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c05vZGUocGFyZW50Tm9kZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL3JpZ2h0IGFycm93XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5ub2RlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vbGVmdCBhcnJvd1xuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmVudE5vZGVFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnROb2RlRWxlbWVudChub2RlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c05vZGUocGFyZW50Tm9kZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgIHRoaXMudHJlZS5vbk5vZGVDbGljayhldmVudCwgdGhpcy5ub2RlKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy9ubyBvcFxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dFNpYmxpbmdPZkFuY2VzdG9yKG5vZGVFbGVtZW50KSB7XG4gICAgICAgIGxldCBwYXJlbnROb2RlRWxlbWVudCA9IHRoaXMuZ2V0UGFyZW50Tm9kZUVsZW1lbnQobm9kZUVsZW1lbnQpO1xuICAgICAgICBpZiAocGFyZW50Tm9kZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudE5vZGVFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kTmV4dFNpYmxpbmdPZkFuY2VzdG9yKHBhcmVudE5vZGVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZExhc3RWaXNpYmxlRGVzY2VuZGFudChub2RlRWxlbWVudCkge1xuICAgICAgICBjb25zdCBjaGlsZHJlbkxpc3RFbGVtZW50ID0gbm9kZUVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV07XG4gICAgICAgIGlmIChjaGlsZHJlbkxpc3RFbGVtZW50ICYmIGNoaWxkcmVuTGlzdEVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbGFzdENoaWxkRWxlbWVudCA9IGNoaWxkcmVuTGlzdEVsZW1lbnQuY2hpbGRyZW5bY2hpbGRyZW5MaXN0RWxlbWVudC5jaGlsZHJlbi5sZW5ndGggLSAxXTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZExhc3RWaXNpYmxlRGVzY2VuZGFudChsYXN0Q2hpbGRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlRWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBhcmVudE5vZGVFbGVtZW50KG5vZGVFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGVFbGVtZW50ID0gbm9kZUVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgcmV0dXJuIHBhcmVudE5vZGVFbGVtZW50LnRhZ05hbWUgPT09ICdQLVRSRUVOT0RFJyA/IHBhcmVudE5vZGVFbGVtZW50IDogbnVsbDtcbiAgICB9XG5cbiAgICBmb2N1c05vZGUoZWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy50cmVlLmRyb3BwYWJsZU5vZGVzKVxuICAgICAgICAgICAgZWxlbWVudC5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBlbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdHJlZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLXRyZWUgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXRyZWUtc2VsZWN0YWJsZSc6c2VsZWN0aW9uTW9kZSwndWktdHJlZW5vZGUtZHJhZ292ZXInOmRyYWdIb3ZlciwndWktdHJlZS1sb2FkaW5nJzogbG9hZGluZ31cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKm5nSWY9XCIhaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAoZHJvcCk9XCJvbkRyb3AoJGV2ZW50KVwiIChkcmFnb3Zlcik9XCJvbkRyYWdPdmVyKCRldmVudClcIiAoZHJhZ2VudGVyKT1cIm9uRHJhZ0VudGVyKCRldmVudClcIiAoZHJhZ2xlYXZlKT1cIm9uRHJhZ0xlYXZlKCRldmVudClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10cmVlLWxvYWRpbmctbWFzayB1aS13aWRnZXQtb3ZlcmxheVwiICpuZ0lmPVwibG9hZGluZ1wiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRyZWUtbG9hZGluZy1jb250ZW50XCIgKm5nSWY9XCJsb2FkaW5nXCI+XG4gICAgICAgICAgICAgICAgPGkgW2NsYXNzXT1cIid1aS10cmVlLWxvYWRpbmctaWNvbiBwaS1zcGluICcgKyBsb2FkaW5nSWNvblwiPjwvaT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImZpbHRlclwiIGNsYXNzPVwidWktdHJlZS1maWx0ZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNmaWx0ZXIgdHlwZT1cInRleHRcIiBhdXRvY29tcGxldGU9XCJvZmZcIiBjbGFzcz1cInVpLXRyZWUtZmlsdGVyIHVpLWlucHV0dGV4dCB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwiZmlsdGVyUGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCIkZXZlbnQucHJldmVudERlZmF1bHQoKVwiIChpbnB1dCk9XCJvbkZpbHRlcigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktdHJlZS1maWx0ZXItaWNvbiBwaSBwaS1zZWFyY2hcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLXRyZWUtY29udGFpbmVyXCIgKm5nSWY9XCJnZXRSb290Tm9kZSgpXCIgcm9sZT1cInRyZWVcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiPlxuICAgICAgICAgICAgICAgIDxwLXRyZWVOb2RlICpuZ0Zvcj1cImxldCBub2RlIG9mIGdldFJvb3ROb2RlKCk7IGxldCBmaXJzdENoaWxkPWZpcnN0O2xldCBsYXN0Q2hpbGQ9bGFzdDsgbGV0IGluZGV4PWluZGV4OyB0cmFja0J5OiBub2RlVHJhY2tCeVwiIFtub2RlXT1cIm5vZGVcIlxuICAgICAgICAgICAgICAgIFtmaXJzdENoaWxkXT1cImZpcnN0Q2hpbGRcIiBbbGFzdENoaWxkXT1cImxhc3RDaGlsZFwiIFtpbmRleF09XCJpbmRleFwiPjwvcC10cmVlTm9kZT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZS1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCIhbG9hZGluZyAmJiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDApXCI+e3tlbXB0eU1lc3NhZ2V9fTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLXRyZWUgdWktdHJlZS1ob3Jpem9udGFsIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS10cmVlLXNlbGVjdGFibGUnOnNlbGVjdGlvbk1vZGV9XCIgIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cImhvcml6b250YWxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10cmVlLWxvYWRpbmcgdWktd2lkZ2V0LW92ZXJsYXlcIiAqbmdJZj1cImxvYWRpbmdcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10cmVlLWxvYWRpbmctY29udGVudFwiICpuZ0lmPVwibG9hZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxpIFtjbGFzc109XCIndWktdHJlZS1sb2FkaW5nLWljb24gcGktc3BpbiAnICsgbG9hZGluZ0ljb25cIj48L2k+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDx0YWJsZSAqbmdJZj1cInZhbHVlJiZ2YWx1ZVswXVwiPlxuICAgICAgICAgICAgICAgIDxwLXRyZWVOb2RlIFtub2RlXT1cInZhbHVlWzBdXCIgW3Jvb3RdPVwidHJ1ZVwiPjwvcC10cmVlTm9kZT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZS1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCIhbG9hZGluZyAmJiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDApXCI+e3tlbXB0eU1lc3NhZ2V9fTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWUgaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJDb250ZW50SW5pdCxPbkRlc3Ryb3ksQmxvY2thYmxlVUkge1xuXG4gICAgQElucHV0KCkgdmFsdWU6IFRyZWVOb2RlW107XG5cbiAgICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzZWxlY3Rpb246IGFueTtcblxuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTm9kZVNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Ob2RlVW5zZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTm9kZUV4cGFuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Ob2RlQ29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTm9kZUNvbnRleHRNZW51U2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbk5vZGVEcm9wOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBjb250ZXh0TWVudTogYW55O1xuXG4gICAgQElucHV0KCkgbGF5b3V0OiBzdHJpbmcgPSAndmVydGljYWwnO1xuXG4gICAgQElucHV0KCkgZHJhZ2dhYmxlU2NvcGU6IGFueTtcblxuICAgIEBJbnB1dCgpIGRyb3BwYWJsZVNjb3BlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBkcmFnZ2FibGVOb2RlczogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGRyb3BwYWJsZU5vZGVzOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbWV0YUtleVNlbGVjdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBwcm9wYWdhdGVTZWxlY3Rpb25VcDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBwcm9wYWdhdGVTZWxlY3Rpb25Eb3duOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGxvYWRpbmc6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBsb2FkaW5nSWNvbjogc3RyaW5nID0gJ3BpIHBpLXNwaW5uZXInO1xuXG4gICAgQElucHV0KCkgZW1wdHlNZXNzYWdlOiBzdHJpbmcgPSAnTm8gcmVjb3JkcyBmb3VuZCc7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB2YWxpZGF0ZURyb3A6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBmaWx0ZXI6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJCeTogc3RyaW5nID0gJ2xhYmVsJztcblxuICAgIEBJbnB1dCgpIGZpbHRlck1vZGU6IHN0cmluZyA9ICdsZW5pZW50JztcblxuICAgIEBJbnB1dCgpIGZpbHRlclBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBub2RlVHJhY2tCeTogRnVuY3Rpb24gPSAoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSA9PiBpdGVtO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgcHVibGljIHRlbXBsYXRlTWFwOiBhbnk7XG5cbiAgICBwdWJsaWMgbm9kZVRvdWNoZWQ6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgZHJhZ05vZGVUcmVlOiBUcmVlO1xuXG4gICAgcHVibGljIGRyYWdOb2RlOiBUcmVlTm9kZTtcblxuICAgIHB1YmxpYyBkcmFnTm9kZVN1Yk5vZGVzOiBUcmVlTm9kZVtdO1xuXG4gICAgcHVibGljIGRyYWdOb2RlSW5kZXg6IG51bWJlcjtcblxuICAgIHB1YmxpYyBkcmFnTm9kZVNjb3BlOiBhbnk7XG5cbiAgICBwdWJsaWMgZHJhZ0hvdmVyOiBib29sZWFuO1xuXG4gICAgcHVibGljIGRyYWdTdGFydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgcHVibGljIGRyYWdTdG9wU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBwdWJsaWMgZmlsdGVyZWROb2RlczogVHJlZU5vZGVbXTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgQE9wdGlvbmFsKCkgcHVibGljIGRyYWdEcm9wU2VydmljZTogVHJlZURyYWdEcm9wU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5kcm9wcGFibGVOb2Rlcykge1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRTdWJzY3JpcHRpb24gPSB0aGlzLmRyYWdEcm9wU2VydmljZS5kcmFnU3RhcnQkLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGVUcmVlID0gZXZlbnQudHJlZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlID0gZXZlbnQubm9kZTtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlU3ViTm9kZXMgPSBldmVudC5zdWJOb2RlcztcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlSW5kZXggPSBldmVudC5pbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlU2NvcGUgPSBldmVudC5zY29wZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdTdG9wU3Vic2NyaXB0aW9uID0gdGhpcy5kcmFnRHJvcFNlcnZpY2UuZHJhZ1N0b3AkLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGVUcmVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlU3ViTm9kZXMgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGVJbmRleCA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZVNjb3BlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdIb3ZlciA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgaG9yaXpvbnRhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5b3V0ID09ICdob3Jpem9udGFsJztcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnRlbXBsYXRlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVNYXAgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGVtcGxhdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGVNYXBbaXRlbS5uYW1lXSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uTm9kZUNsaWNrKGV2ZW50LCBub2RlOiBUcmVlTm9kZSkge1xuICAgICAgICBsZXQgZXZlbnRUYXJnZXQgPSAoPEVsZW1lbnQ+IGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnRUYXJnZXQsICd1aS10cmVlLXRvZ2dsZXInKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUuc2VsZWN0YWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0ZpbHRlcmVkTm9kZXMoKSkge1xuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLmdldE5vZGVXaXRoS2V5KG5vZGUua2V5LCB0aGlzLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gKGluZGV4ID49IDApO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5pc0NoZWNrYm94U2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BhZ2F0ZVNlbGVjdGlvbkRvd24pXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZURvd24obm9kZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsLGkpID0+IGkhPWluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wYWdhdGVTZWxlY3Rpb25VcCAmJiBub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVVcChub2RlLnBhcmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlVW5zZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BhZ2F0ZVNlbGVjdGlvbkRvd24pXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZURvd24obm9kZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gWy4uLnRoaXMuc2VsZWN0aW9ufHxbXSxub2RlXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wYWdhdGVTZWxlY3Rpb25VcCAmJiBub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVVcChub2RlLnBhcmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbWV0YVNlbGVjdGlvbiA9IHRoaXMubm9kZVRvdWNoZWQgPyBmYWxzZSA6IHRoaXMubWV0YUtleVNlbGVjdGlvbjtcblxuICAgICAgICAgICAgICAgIGlmIChtZXRhU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKGV2ZW50Lm1ldGFLZXl8fGV2ZW50LmN0cmxLZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZCAmJiBtZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsLGkpID0+IGkhPWluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogbm9kZX0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSAoIW1ldGFLZXkpID8gW10gOiB0aGlzLnNlbGVjdGlvbnx8W107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbLi4udGhpcy5zZWxlY3Rpb24sbm9kZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlU2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogbm9kZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlU2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsLGkpID0+IGkhPWluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVVuc2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFsuLi50aGlzLnNlbGVjdGlvbnx8W10sbm9kZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubm9kZVRvdWNoZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvbk5vZGVUb3VjaEVuZCgpIHtcbiAgICAgICAgdGhpcy5ub2RlVG91Y2hlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25Ob2RlUmlnaHRDbGljayhldmVudDogTW91c2VFdmVudCwgbm9kZTogVHJlZU5vZGUpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dE1lbnUpIHtcbiAgICAgICAgICAgIGxldCBldmVudFRhcmdldCA9ICg8RWxlbWVudD4gZXZlbnQudGFyZ2V0KTtcblxuICAgICAgICAgICAgaWYgKGV2ZW50VGFyZ2V0LmNsYXNzTmFtZSAmJiBldmVudFRhcmdldC5jbGFzc05hbWUuaW5kZXhPZigndWktdHJlZS10b2dnbGVyJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IChpbmRleCA+PSAwKTtcblxuICAgICAgICAgICAgICAgIGlmICghc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KFtub2RlXSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5zaG93KGV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZUNvbnRleHRNZW51U2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kSW5kZXhJblNlbGVjdGlvbihub2RlOiBUcmVlTm9kZSkge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IC0xO1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUgJiYgdGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFyZU5vZGVzRXF1YWwgPSAodGhpcy5zZWxlY3Rpb24ua2V5ICYmIHRoaXMuc2VsZWN0aW9uLmtleSA9PT0gbm9kZS5rZXkpIHx8IHRoaXMuc2VsZWN0aW9uID09IG5vZGU7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBhcmVOb2Rlc0VxdWFsID8gMCA6IC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgIDwgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkTm9kZSA9IHRoaXMuc2VsZWN0aW9uW2ldO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXJlTm9kZXNFcXVhbCA9IChzZWxlY3RlZE5vZGUua2V5ICYmIHNlbGVjdGVkTm9kZS5rZXkgPT09IG5vZGUua2V5KSB8fCBzZWxlY3RlZE5vZGUgPT0gbm9kZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFyZU5vZGVzRXF1YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuICAgIHN5bmNOb2RlT3B0aW9uKG5vZGUsIHBhcmVudE5vZGVzLCBvcHRpb24sIHZhbHVlPzogYW55KSB7XG4gICAgICAgIC8vIHRvIHN5bmNocm9uaXplIHRoZSBub2RlIG9wdGlvbiBiZXR3ZWVuIHRoZSBmaWx0ZXJlZCBub2RlcyBhbmQgdGhlIG9yaWdpbmFsIG5vZGVzKHRoaXMudmFsdWUpIFxuICAgICAgICBjb25zdCBfbm9kZSA9IHRoaXMuaGFzRmlsdGVyZWROb2RlcygpID8gdGhpcy5nZXROb2RlV2l0aEtleShub2RlLmtleSwgcGFyZW50Tm9kZXMpIDogbnVsbDtcbiAgICAgICAgaWYgKF9ub2RlKSB7XG4gICAgICAgICAgICBfbm9kZVtvcHRpb25dID0gdmFsdWV8fG5vZGVbb3B0aW9uXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc0ZpbHRlcmVkTm9kZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlcmVkTm9kZXMgJiYgdGhpcy5maWx0ZXJlZE5vZGVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXROb2RlV2l0aEtleShrZXk6IHN0cmluZywgbm9kZXM6IFRyZWVOb2RlW10pIHtcbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgICAgICAgaWYgKG5vZGUua2V5ID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgbWF0Y2hlZE5vZGUgPSB0aGlzLmdldE5vZGVXaXRoS2V5KGtleSwgbm9kZS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoZWROb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaGVkTm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9wYWdhdGVVcChub2RlOiBUcmVlTm9kZSwgc2VsZWN0OiBib29sZWFuKSB7XG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRDb3VudDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGxldCBjaGlsZFBhcnRpYWxTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yKGxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZChjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDb3VudCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjaGlsZC5wYXJ0aWFsU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRQYXJ0aWFsU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHNlbGVjdCAmJiBzZWxlY3RlZENvdW50ID09IG5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbLi4udGhpcy5zZWxlY3Rpb258fFtdLG5vZGVdO1xuICAgICAgICAgICAgICAgIG5vZGUucGFydGlhbFNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbCxpKSA9PiBpIT1pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGRQYXJ0aWFsU2VsZWN0ZWQgfHwgc2VsZWN0ZWRDb3VudCA+IDAgJiYgc2VsZWN0ZWRDb3VudCAhPSBub2RlLmNoaWxkcmVuLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJ0aWFsU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJ0aWFsU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zeW5jTm9kZU9wdGlvbihub2RlLCB0aGlzLmZpbHRlcmVkTm9kZXMsICdwYXJ0aWFsU2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnQgPSBub2RlLnBhcmVudDtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVVcChwYXJlbnQsIHNlbGVjdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9wYWdhdGVEb3duKG5vZGU6IFRyZWVOb2RlLCBzZWxlY3Q6IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihub2RlKTtcblxuICAgICAgICBpZiAoc2VsZWN0ICYmIGluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFsuLi50aGlzLnNlbGVjdGlvbnx8W10sbm9kZV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXNlbGVjdCAmJiBpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsLGkpID0+IGkhPWluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUucGFydGlhbFNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zeW5jTm9kZU9wdGlvbihub2RlLCB0aGlzLmZpbHRlcmVkTm9kZXMsICdwYXJ0aWFsU2VsZWN0ZWQnKTtcblxuICAgICAgICBpZiAobm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yKGxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVEb3duKGNoaWxkLCBzZWxlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZChub2RlOiBUcmVlTm9kZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihub2RlKSAhPSAtMTtcbiAgICB9XG5cbiAgICBpc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09ICdzaW5nbGUnO1xuICAgIH1cblxuICAgIGlzTXVsdGlwbGVTZWxlY3Rpb25Nb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PSAnbXVsdGlwbGUnO1xuICAgIH1cblxuICAgIGlzQ2hlY2tib3hTZWxlY3Rpb25Nb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25Nb2RlICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PSAnY2hlY2tib3gnO1xuICAgIH1cblxuICAgIGlzTm9kZUxlYWYobm9kZSkge1xuICAgICAgICByZXR1cm4gbm9kZS5sZWFmID09IGZhbHNlID8gZmFsc2UgOiAhKG5vZGUuY2hpbGRyZW4gJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGgpO1xuICAgIH1cblxuICAgIGdldFJvb3ROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJlZE5vZGVzID8gdGhpcy5maWx0ZXJlZE5vZGVzIDogdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgXG4gICAgZ2V0VGVtcGxhdGVGb3JOb2RlKG5vZGU6IFRyZWVOb2RlKTogVGVtcGxhdGVSZWY8YW55PiB7XG4gICAgICAgIGlmICh0aGlzLnRlbXBsYXRlTWFwKVxuICAgICAgICAgICAgcmV0dXJuIG5vZGUudHlwZSA/IHRoaXMudGVtcGxhdGVNYXBbbm9kZS50eXBlXSA6IHRoaXMudGVtcGxhdGVNYXBbJ2RlZmF1bHQnXTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSAgICBcblxuICAgIG9uRHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJvcHBhYmxlTm9kZXMgJiYgKCF0aGlzLnZhbHVlIHx8IHRoaXMudmFsdWUubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ecm9wKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU5vZGVzICYmICghdGhpcy52YWx1ZSB8fCB0aGlzLnZhbHVlLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgZHJhZ05vZGUgPSB0aGlzLmRyYWdOb2RlO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWxsb3dEcm9wKGRyYWdOb2RlLCBudWxsLCB0aGlzLmRyYWdOb2RlU2NvcGUpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRyYWdOb2RlSW5kZXggPSB0aGlzLmRyYWdOb2RlSW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZVN1Yk5vZGVzLnNwbGljZShkcmFnTm9kZUluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZXx8W107XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZS5wdXNoKGRyYWdOb2RlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0Ryb3BTZXJ2aWNlLnN0b3BEcmFnKHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZTogZHJhZ05vZGVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhZ0VudGVyKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU5vZGVzICYmIHRoaXMuYWxsb3dEcm9wKHRoaXMuZHJhZ05vZGUsIG51bGwsIHRoaXMuZHJhZ05vZGVTY29wZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0hvdmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmRyb3BwYWJsZU5vZGVzKSB7XG4gICAgICAgICAgICBsZXQgcmVjdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoZXZlbnQueCA+IHJlY3QubGVmdCArIHJlY3Qud2lkdGggfHwgZXZlbnQueCA8IHJlY3QubGVmdCB8fCBldmVudC55ID4gcmVjdC50b3AgKyByZWN0LmhlaWdodCB8fCBldmVudC55IDwgcmVjdC50b3ApIHtcbiAgICAgICAgICAgICAgIHRoaXMuZHJhZ0hvdmVyID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhbGxvd0Ryb3AoZHJhZ05vZGU6IFRyZWVOb2RlLCBkcm9wTm9kZTogVHJlZU5vZGUsIGRyYWdOb2RlU2NvcGU6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoIWRyYWdOb2RlKSB7XG4gICAgICAgICAgICAvL3ByZXZlbnQgcmFuZG9tIGh0bWwgZWxlbWVudHMgdG8gYmUgZHJhZ2dlZFxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuaXNWYWxpZERyYWdTY29wZShkcmFnTm9kZVNjb3BlKSkge1xuICAgICAgICAgICAgbGV0IGFsbG93OiBib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChkcm9wTm9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChkcmFnTm9kZSA9PT0gZHJvcE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsb3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJlbnQgPSBkcm9wTm9kZS5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKHBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50ID09PSBkcmFnTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbG93ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYWxsb3c7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1ZhbGlkRHJhZ1Njb3BlKGRyYWdTY29wZTogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBkcm9wU2NvcGUgPSB0aGlzLmRyb3BwYWJsZVNjb3BlO1xuXG4gICAgICAgIGlmIChkcm9wU2NvcGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZHJvcFNjb3BlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZHJhZ1Njb3BlID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRyb3BTY29wZSA9PT0gZHJhZ1Njb3BlO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRyYWdTY29wZSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxBcnJheTxhbnk+PmRyYWdTY29wZSkuaW5kZXhPZihkcm9wU2NvcGUpICE9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZHJvcFNjb3BlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRyYWdTY29wZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8QXJyYXk8YW55Pj5kcm9wU2NvcGUpLmluZGV4T2YoZHJhZ1Njb3BlKSAhPSAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZHJhZ1Njb3BlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBzIG9mIGRyb3BTY29wZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBkcyBvZiBkcmFnU2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocyA9PT0gZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZpbHRlcihldmVudCkge1xuICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGlmIChmaWx0ZXJWYWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWROb2RlcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkTm9kZXMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaEZpZWxkczogc3RyaW5nW10gPSB0aGlzLmZpbHRlckJ5LnNwbGl0KCcsJyk7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJUZXh0ID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyhmaWx0ZXJWYWx1ZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGlzU3RyaWN0TW9kZSA9IHRoaXMuZmlsdGVyTW9kZSA9PT0gJ3N0cmljdCc7XG4gICAgICAgICAgICBmb3IobGV0IG5vZGUgb2YgdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxldCBjb3B5Tm9kZSA9IHsuLi5ub2RlfTtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zV2l0aG91dE5vZGUgPSB7c2VhcmNoRmllbGRzLCBmaWx0ZXJUZXh0LCBpc1N0cmljdE1vZGV9O1xuICAgICAgICAgICAgICAgIGlmICgoaXNTdHJpY3RNb2RlICYmICh0aGlzLmZpbmRGaWx0ZXJlZE5vZGVzKGNvcHlOb2RlLCBwYXJhbXNXaXRob3V0Tm9kZSkgfHwgdGhpcy5pc0ZpbHRlck1hdGNoZWQoY29weU5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSkpIHx8XG4gICAgICAgICAgICAgICAgICAgICghaXNTdHJpY3RNb2RlICYmICh0aGlzLmlzRmlsdGVyTWF0Y2hlZChjb3B5Tm9kZSwgcGFyYW1zV2l0aG91dE5vZGUpIHx8IHRoaXMuZmluZEZpbHRlcmVkTm9kZXMoY29weU5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWROb2Rlcy5wdXNoKGNvcHlOb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gIFxuICAgIH1cblxuICAgIGZpbmRGaWx0ZXJlZE5vZGVzKG5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSB7XG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBsZXQgbWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGROb2RlcyA9IFsuLi5ub2RlLmNoaWxkcmVuXTtcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGROb2RlIG9mIGNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcHlDaGlsZE5vZGUgPSB7Li4uY2hpbGROb2RlfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNGaWx0ZXJNYXRjaGVkKGNvcHlDaGlsZE5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuLnB1c2goY29weUNoaWxkTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5leHBhbmRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0ZpbHRlck1hdGNoZWQobm9kZSwge3NlYXJjaEZpZWxkcywgZmlsdGVyVGV4dCwgaXNTdHJpY3RNb2RlfSkge1xuICAgICAgICBsZXQgbWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICBmb3IobGV0IGZpZWxkIG9mIHNlYXJjaEZpZWxkcykge1xuICAgICAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG5vZGUsIGZpZWxkKSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoZmllbGRWYWx1ZS5pbmRleE9mKGZpbHRlclRleHQpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbWF0Y2hlZCB8fCAoaXNTdHJpY3RNb2RlICYmICF0aGlzLmlzTm9kZUxlYWYobm9kZSkpKSB7XG4gICAgICAgICAgICBtYXRjaGVkID0gdGhpcy5maW5kRmlsdGVyZWROb2Rlcyhub2RlLCB7c2VhcmNoRmllbGRzLCBmaWx0ZXJUZXh0LCBpc1N0cmljdE1vZGV9KSB8fCBtYXRjaGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoZWQ7XG4gICAgfVxuXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudMKge1xuICAgICAgcmV0dXJuIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jaGlsZHJlblswXTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0U3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdTdGFydFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ1N0b3BTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1N0b3BTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1RyZWUsU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUcmVlLFVJVHJlZU5vZGVdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVNb2R1bGUgeyB9XG4iXX0=