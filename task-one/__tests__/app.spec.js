import { createFileTree } from '../src/app';

const getDataset = (file) => require(`../src/dataset/${file}`);

describe('fileTree', () => {
  function traverseTreeAndFindNode(inputNode, nodes) {
    if (!nodes) {
      return undefined;
    }

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      if (node.nodeId === inputNode.id) {
        return node;
      }

      const nodeFoundAtChildren = traverseTreeAndFindNode(
        inputNode,
        node.getChildren()
      );

      if (nodeFoundAtChildren) {
        return nodeFoundAtChildren;
      }
    }

    return undefined;
  }

  function testTreeNode(inputNode, foundNode) {
    it('tree node ' + inputNode.id + ' should have correct data', () => {
      expect(foundNode.nodeId).toEqual(inputNode.id);
      expect(foundNode.name).toEqual(inputNode.name);
      expect(foundNode.type).toEqual(inputNode.type);
    });

    it('tree node ' + inputNode.id + ' should have correct parent', () => {
      if (inputNode.parentId) {
        expect(foundNode.parentNode).not.toBeNull();
        expect(foundNode.parentNode.nodeId).toEqual(inputNode.parentId);
      } else {
        expect(foundNode.parentNode).toBeNull();
      }
    });
  }

  function testTreeContentsWithDataSet(dataSet) {
    describe('created from ' + dataSet + ' dataSet', () => {
      const inputData = getDataset(dataSet);
      const fileTree = createFileTree(inputData);

      for (let i = 0; i < inputData.length; i++) {
        const inputNode = inputData[i];
        const foundNode = traverseTreeAndFindNode(
          inputNode,
          fileTree.getRootNodes()
        );

        testTreeNode(inputNode, foundNode);
      }

      it('should contain all nodes from dataset', () => {
        for (let i = 0; i < inputData.length; i++) {
          expect(
            traverseTreeAndFindNode(inputData[i], fileTree.getRootNodes())
          ).toBeDefined();
        }
      });
    });
  }

  testTreeContentsWithDataSet('simple-data.json');
  testTreeContentsWithDataSet('data-for-bug.json');
});
