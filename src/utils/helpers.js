export const generateId = () => `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const findItemById = (id, node) => {
  if (node.id === id) return node;
  if (node.children) {
    for (let child of node.children) {
      const found = findItemById(id, child);
      if (found) return found;
    }
  }
  return null;
};

export const buildBreadcrumb = (itemId, navigationData) => {
  const path = [];
  const findPath = (id, node = navigationData, currentPath = []) => {
    currentPath.push(node.label);
    if (node.id === id) {
      path.push(...currentPath);
      return true;
    }
    if (node.children) {
      for (let child of node.children) {
        if (findPath(id, child, [...currentPath])) {
          return true;
        }
      }
    }
    return false;
  };
  findPath(itemId);
  return path.join(' › ');
};

