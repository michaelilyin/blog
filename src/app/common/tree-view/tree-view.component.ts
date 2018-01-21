import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from "@angular/core";

export class TreeNode {

    constructor(
        public id: number,
        public name: string,
        public children: Array<TreeNode>,
        public isExpanded?: boolean
    ) {

    }

    get isLeaf(): boolean {
        return !this.children || this.children.length == 0;
    }
}

@Component({
    selector: "app-tree-view",
    templateUrl: './tree-view.component.html',
    styleUrls: ['./tree-view.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewComponent {

    @Input() nodes: Array<TreeNode>;
    @Input() selectedNode: TreeNode;
    @Input() root = true;

    @Output() onSelectedChanged: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();
    @Output() onRequestNodes: EventEmitter<TreeNode> = new EventEmitter<TreeNode>();

    constructor() { }

    onSelectNode(node: TreeNode) {
        this.onSelectedChanged.emit(node);
        this.selectedNode = node;
    }

    onExpand(node: TreeNode) {
        node.isExpanded = !node.isExpanded;

        if (node.isExpanded && (!node.children || node.children.length === 0)) {
            this.onRequestNodes.emit(node);
        }
    }

    onRequestLocal(node: TreeNode) {
        this.onRequestNodes.emit(node);
    }
}
