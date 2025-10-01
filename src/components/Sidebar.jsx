// Enhanced Sidebar Component
const Sidebar = memo(({ 
  navigationData, 
  activeId, 
  onSelect, 
  onToggle, 
  onAction,
  onMove,
  isDarkMode,
  isCollapsed,
  onToggleCollapse
}) => {
  return (
    <aside className={`
      ${isCollapsed ? 'w-16' : 'w-72'} 
      bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
      overflow-y-auto transition-all duration-300 flex-shrink-0
    `}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Navigation</h2>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title={isCollapsed ? 'Navigation erweitern' : 'Navigation einklappen'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
      </div>

      {/* Navigation Tree */}
      <nav className={`p-4 ${isCollapsed ? 'px-2' : ''}`}>
        {navigationData.children.map(item => (
          <DraggableNavigationItem
            key={item.id}
            item={item}
            activeId={activeId}
            onSelect={onSelect}
            onToggle={onToggle}
            onAction={onAction}
            onMove={onMove}
            isDarkMode={isDarkMode}
          />
        ))}
      </nav>
    </aside>
  );
});
