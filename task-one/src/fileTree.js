class FileTreeNode {
  constructor(nodeId, name, type) {
    this.nodeId = nodeId;
    this.name = name;
    this.type = type;
    this.parentNode = null;
    this.children = [];
  }

  setParent(parentNode) {
    this.parentNode = parentNode;
  }

  addChild(node) {
    if (this.type !== 'DIRECTORY') {
      throw 'Cannot add child node to a non-directory node';
    }

    this.children.push(node);
    node.setParent(this);
  }

  getChildren() {
    return this.children;
  }
}

class FileTree {
  constructor() {
    this.nodes = [];
  }

  getRootNodes() {
    const result = [];
    for (let i = 0; i < this.nodes.length; i++) {
      if (!this.nodes[i].parentNode) {
        result.push(this.nodes[i]);
      }
    }

    return result;
  }

  findNodeById(nodeId) {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].nodeId === nodeId) {
        return this.nodes[i];
      }
    }

    return null;
  }

  createNode(nodeId, name, type, parentNode) {
    const node = new FileTreeNode(nodeId, name, type);

    if (parentNode) {
      parentNode.addChild(node);
    }

    this.nodes.push(node);
  }
}

export default FileTree;
