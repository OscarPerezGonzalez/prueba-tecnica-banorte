import isEmpty from 'lodash.isempty';


export const findInTree = (employeeNumber: string, tree: any) => {
  if (tree.employeeNumber === employeeNumber) {
    let path = [{name: tree.name, position: tree.position}];
    return { result: tree, path };
  } else {
    for (let child of tree.children) {
      let tmp: any = findInTree(employeeNumber, child);
      if (!isEmpty(tmp)) {
        tmp.path.unshift({name: tree.name, position: tree.position});
        return tmp;
      }
    }
    return {};
  }
};