import FileTree from './fileTree';

export function createFileTree(input) {
    const fileTree = new FileTree();

    const newFile = [...input]
    const noParent = newFile.find(item => !item.parentId)
    const arrOfObj = []
    let baseId = noParent.id;
    arrOfObj.push(noParent);

    for (let index = 1; index < newFile.length; index++) {
        const nextElement = newFile.find(item => item.parentId == baseId);
        arrOfObj.push(nextElement);
        baseId = nextElement.id
    }


    for (const inputNode of arrOfObj) {
        const parentNode = inputNode.parentId ?
            fileTree.findNodeById(inputNode.parentId) :
            null;

        fileTree.createNode(
            inputNode.id,
            inputNode.name,
            inputNode.type,
            parentNode
        );
    }

    return fileTree;
}