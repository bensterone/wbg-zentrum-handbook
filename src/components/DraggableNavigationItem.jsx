// Draggable Navigation Item Component
const DraggableNavigationItem = memo(({ 
  item, 
  activeId, 
  onSelect, 
  onToggle, 
  onAction,
  onMove,
  level = 0,
  isDarkMode = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isDropTarget, setIsDropTarget] = useState(false);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('application/json', JSON.stringify({
      id: item.id,
      type: 'nav-item'
    }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (item.type === 'folder' || item.type === 'root') {
      setIsDropTarget(true);
    }
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropTarget(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDropTarget(false);
    
    try {
      const dragData = JSON.parse(e.dataTransfer.getData('application/json'));
      if (dragData.type === 'nav-item' && dragData.id !== item.id) {
        onMove(dragData.id, item.id);
      }
    } catch (error) {
      console.error('Error processing drop:', error);
    }
  };

  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = item.expanded || false;
  const isActive = item.id === activeId;

  return (
    <div className="mb-0.5">
      <div
        draggable={item.type !== 'root'}
        onDragStart={handleDragStart}
        onDragEnd={() => setIsDragging(false)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          flex items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-200 group relative
          ${isActive 
            ? 'bg-blue-600 text-white shadow-md' 
            : isDarkMode
            ? 'hover:bg-gray-700 text-gray-200'
            : 'hover:bg-gray-100 text-gray-700'
          }
          ${isDragging ? 'opacity-50 scale-95 rotate-2' : ''}
          ${isDropTarget ? 'ring-2 ring-blue-500 ring-opacity-50 bg-blue-50 dark:bg-blue-900/30' : ''}
        `}
        onClick={() => onSelect(item.id)}
        style={{ marginLeft: `${level * 12}px` }}
      >
        {/* Drag handle */}
        {item.type !== 'root' && (
          <div className={`
            flex items-center opacity-0 group-hover:opacity-100 transition-opacity mr-2 cursor-grab
            ${isDragging ? 'cursor-grabbing' : ''}
          `}>
            <span className="text-xs text-gray-400">⋮⋮</span>
          </div>
        )}

        {/* Expand/Collapse button */}
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(item.id);
            }}
            className="w-4 h-4 flex items-center justify-center text-xs mr-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          >
            <span className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
              ▶
            </span>
          </button>
        )}
        {!hasChildren && <span className="w-4 mr-2"></span>}
        
        {/* Icon and Label */}
        <span className="mr-3 text-lg flex-shrink-0">{item.icon}</span>
        <span className="flex-1 text-sm font-medium truncate">{item.label}</span>
        
        {/* Tags indicator */}
        {item.tags && item.tags.length > 0 && (
          <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded mr-2">
            {item.tags.length}
          </span>
        )}

        {/* Action button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAction(item.id);
          }}
          className={`
            opacity-0 group-hover:opacity-100 p-1.5 rounded transition-all duration-200
            ${isActive 
              ? 'text-white hover:bg-blue-700' 
              : isDarkMode
              ? 'text-gray-400 hover:bg-gray-600'
              : 'text-gray-600 hover:bg-gray-200'
            }
          `}
          title="Mehr Optionen"
        >
          ⋮
        </button>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="mt-0.5">
          {item.children.map(child => (
            <DraggableNavigationItem
              key={child.id}
              item={child}
              activeId={activeId}
              onSelect={onSelect}
              onToggle={onToggle}
              onAction={onAction}
              onMove={onMove}
              level={level + 1}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
});
export default DraggableNavigationItem;
