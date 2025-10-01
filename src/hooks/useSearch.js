// Enhanced search hook
const useSearch = (data, searchFields = ['label', 'description']) => {
  const [query, setQuery] = useState('');
  
  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchRecursive = (node, results = [], path = []) => {
      const currentPath = [...path, node.label];
      const matchesSearch = searchFields.some(field => 
        node[field]?.toLowerCase().includes(query.toLowerCase())
      );
      
      if (matchesSearch) {
        results.push({
          ...node,
          breadcrumb: currentPath.join(' › ')
        });
      }
      
      if (node.children) {
        node.children.forEach(child => searchRecursive(child, results, currentPath));
      }
      
      return results;
    };
    
    return data.children ? data.children.flatMap(child => searchRecursive(child)) : [];
  }, [data, query, searchFields]);
  
  return { query, setQuery, results, hasResults: results.length > 0 };
};
