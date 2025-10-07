import React, { memo } from 'react';

// Enhanced Search Results Component
const SearchResults = memo(({ results, onSelect, onClose, query }) => {
  const highlightText = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">$1</mark>');
  };

  if (results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg mt-1 z-50 max-h-80 overflow-y-auto">
      <div className="p-3 border-b border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-50 dark:bg-gray-700">
        {results.length} Ergebnis{results.length !== 1 ? 'se' : ''} für "{query}"
      </div>
      {results.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            onSelect(item.id);
            onClose();
          }}
          className="w-full flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-50 dark:border-gray-700 last:border-b-0"
        >
          <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
          <div className="flex-1 text-left min-w-0">
            <div 
              className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate"
              dangerouslySetInnerHTML={{ __html: highlightText(item.label, query) }}
            />
            {item.description && (
              <div 
                className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: highlightText(item.description, query) }}
              />
            )}
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {item.breadcrumb}
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
              {item.type === 'document' ? 'Dokument' : 
               item.type === 'process' ? 'Prozess' : 'Ordner'}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
});

// Enhanced Search Component
const EnhancedSearch = memo(({ data, onSelect }) => {
  const { query, setQuery, results } = useSearch(data, ['label', 'description', 'tags']);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsFocused(false);
        inputRef.current?.blur();
      }
    };
  
    // You likely need to return your JSX here for the EnhancedSearch component
    // Placeholder return, replace with your actual component JSX
    return null;
  });
export default EnhancedSearch;
