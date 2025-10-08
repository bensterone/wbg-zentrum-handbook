import React from 'react';

function SidebarItem({ item, activeId, onSelect, onToggle, level = 0 }) {
  const isFolder = item.type === 'folder' || item.type === 'root';
  const isActive = item.id === activeId;

  // Zeige den Expand/Collapse-Button nur für Folders/Root mit Children
  const showCaret = isFolder && item.children && item.children.length > 0;

  return (
    <li>
      <div
        className={
          "flex items-center p-2 rounded cursor-pointer group " +
          (isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100") +
          (isFolder ? " font-semibold" : "")
        }
        style={{ paddingLeft: 8 + level * 16 }}
        onClick={() => onSelect(item.id)}
      >
        {showCaret && (
          <button
            onClick={e => {
              e.stopPropagation();
              onToggle(item.id);
            }}
            className="mr-2 text-gray-400 hover:text-blue-500"
            title={item.expanded ? 'Einklappen' : 'Ausklappen'}
            tabIndex={-1}
            aria-label={item.expanded ? 'Einklappen' : 'Ausklappen'}
            type="button"
          >
            <span style={{ display:"inline-block", transform: item.expanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▶</span>
          </button>
        )}
        <span className="mr-2">{item.icon || '📁'}</span>
        <span className="truncate">{item.label}</span>
      </div>
      {/* Children rekursiv rendern, nur wenn Folder expanded ist */}
      {showCaret && item.expanded && (
        <ul className="ml-1">
          {item.children.map(child => (
            <SidebarItem
              key={child.id}
              item={child}
              activeId={activeId}
              onSelect={onSelect}
              onToggle={onToggle}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({
  navigationData,
  activeId,
  onSelect,
  onToggle
}) {
  // navigationData entspricht deinem "root"-Objekt, z. B. INITIAL_DATA
  return (
    <nav className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 w-64 min-w-[220px] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-3">{navigationData.label || 'Handbook'}</h2>
      <ul>
        {navigationData.children && navigationData.children.map(item => (
          <SidebarItem
            key={item.id}
            item={item}
            activeId={activeId}
            onSelect={onSelect}
            onToggle={onToggle}
            level={0}
          />
        ))}
      </ul>
    </nav>
  );
}
