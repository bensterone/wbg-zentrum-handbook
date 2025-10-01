const App = () => {
  // State management
  const [navigationData, setNavigationData] = useLocalStorage('wbg-navigation-data', INITIAL_DATA);
  const [activeId, setActiveId] = useState('organigramm');
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [editingData, setEditingData] = useState(null);
  
  // Theme
  const { theme, toggleTheme, isDark } = useTheme();
  
  // Undo/Redo
  const { 
    currentState: undoState, 
    pushState, 
    undo, 
    redo, 
    canUndo, 
    canRedo 
  } = useUndoRedo(navigationData);
  
  // Context menu state
  const [contextMenu, setContextMenu] = useState({ 
    isOpen: false, 
    position: { x: 0, y: 0 }, 
    itemId: null 
  });
  
  // Add item modal state
  const [addItemModal, setAddItemModal] = useState({ 
    isOpen: false, 
    type: 'document', 
    parentId: null 
  });

  // Get current item
  const currentItem = findItemById(activeId, navigationData);
  const wordCount = currentItem?.content ? getWordCount(currentItem.content.blocks) : 0;

  // Auto-save navigation data
  useAutoSave(navigationData, (data) => {
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 500);
  }, 1000);

  // Sync undo state with navigation data
  useEffect(() => {
    if (JSON.stringify(undoState) !== JSON.stringify(navigationData)) {
      setNavigationData(undoState);
    }
  }, [undoState, navigationData, setNavigationData]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onSearch: () => window.focusSearch?.(),
    onSave: async () => {
      if (isEditing && editingData) {
        await handleSaveDocument(editingData);
      }
    },
    onUndo: undo,
    onRedo: redo,
    onNewDocument: () => {
      const parentId = currentItem?.type === 'folder' ? currentItem.id : 'unternehmen';
      setAddItemModal({ isOpen: true, type: 'document', parentId });
    },
    onToggleTheme: toggleTheme,
    isEditing
  });

  // Toggle navigation item
  const toggleNavItem = useCallback((itemId) => {
    const newData = JSON.parse(JSON.stringify(navigationData));
    const item = findItemById(itemId, newData);
    if (item) {
      item.expanded = !item.expanded;
      setNavigationData(newData);
      pushState(newData);
    }
  }, [navigationData, setNavigationData, pushState]);

  // Handle item move (drag & drop)
  const handleItemMove = useCallback((draggedId, targetId) => {
    const newData = JSON.parse(JSON.stringify(navigationData));
    
    // Find and remove dragged item
    let draggedItem = null;
    const removeFromParent = (node) => {
      if (node.children) {
        const index = node.children.findIndex(child => child.id === draggedId);
        if (index !== -1) {
          draggedItem = node.children.splice(index, 1)[0];
          return true;
        }
        for (let child of node.children) {
          if (removeFromParent(child)) return true;
        }
      }
      return false;
    };
    
    removeFromParent(newData);
    
    // Add to target
    if (draggedItem) {
      const targetItem = findItemById(targetId, newData);
      if (targetItem && (targetItem.type === 'folder' || targetItem.type === 'root')) {
        if (!targetItem.children) targetItem.children = [];
        targetItem.children.push(draggedItem);
        targetItem.expanded = true;
        
        setNavigationData(newData);
        pushState(newData);
      }
    }
  }, [navigationData, setNavigationData, pushState]);

  // Handle context menu actions
  const handleContextAction = useCallback((action, itemId) => {
    switch (action) {
      case 'add-document':
        setAddItemModal({ isOpen: true, type: 'document', parentId: itemId });
        break;
      case 'add-process':
        setAddItemModal({ isOpen: true, type: 'process', parentId: itemId });
        break;
      case 'add-folder':
        setAddItemModal({ isOpen: true, type: 'folder', parentId: itemId });
        break;
      case 'edit':
        setActiveId(itemId);
        setTimeout(() => {
          const item = findItemById(itemId, navigationData);
          if (item?.type === 'document') {
            setIsEditing(true);
            setEditingData(item.content);
          }
        }, 100);
        break;
      case 'duplicate':
        const itemToDuplicate = findItemById(itemId, navigationData);
        if (itemToDuplicate) {
          const newItem = {
            ...JSON.parse(JSON.stringify(itemToDuplicate)),
            id: generateId(),
            label: `${itemToDuplicate.label} (Kopie)`
          };
          
          // Find parent and add duplicate
          const newData = JSON.parse(JSON.stringify(navigationData));
          const addToParent = (node) => {
            if (node.children) {
              const index = node.children.findIndex(child => child.id === itemId);
              if (index !== -1) {
                node.children.splice(index + 1, 0, newItem);
                return true;
              }
              for (let child of node.children) {
                if (addToParent(child)) return true;
              }
            }
            return false;
          };
          
          addToParent(newData);
          setNavigationData(newData);
          pushState(newData);
        }
        break;
      case 'export':
        const exportItem = findItemById(itemId, navigationData);
        if (exportItem) {
          const dataStr = JSON.stringify(exportItem, null, 2);
          const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
          const exportFileDefaultName = `${exportItem.label}.json`;
          
          const linkElement = document.createElement('a');
          linkElement.setAttribute('href', dataUri);
          linkElement.setAttribute('download', exportFileDefaultName);
          linkElement.click();
        }
        break;
      case 'delete':
        if (confirm('Sind Sie sicher, dass Sie dieses Element löschen möchten?')) {
          const newData = JSON.parse(JSON.stringify(navigationData));
          const removeFromParent = (node) => {
            if (node.children) {
              const index = node.children.findIndex(child => child.id === itemId);
              if (index !== -1) {
                node.children.splice(index, 1);
                return true;
              }
              for (let child of node.children) {
                if (removeFromParent(child)) return true;
              }
            }
            return false;
          };
          
          removeFromParent(newData);
          setNavigationData(newData);
          pushState(newData);
          
          if (activeId === itemId) {
            setActiveId('organigramm');
          }
        }
        break;
    }
  }, [activeId, navigationData, setNavigationData, pushState]);

  // Add new item
  const handleAddItem = useCallback(({ name, description, icon, type, tags }) => {
    const newData = JSON.parse(JSON.stringify(navigationData));
    const parent = findItemById(addItemModal.parentId, newData);
    
    if (parent) {
      if (!parent.children) parent.children = [];
      
      const newItem = {
        id: generateId(),
        label: name,
        icon: icon,
        type: type,
        expanded: false,
        description: description || undefined,
        tags: tags && tags.length > 0 ? tags : undefined
      };
      
      if (type === 'document') {
        newItem.content = {
          blocks: [
            { type: 'header', data: { text: name, level: 1 } },
            { type: 'paragraph', data: { text: description || 'Hier können Sie Ihren Inhalt eingeben...' } }
          ]
        };
      } else if (type === 'folder') {
        newItem.children = [];
      } else if (type === 'process') {
        // Process-specific initialization
      }
      
      parent.children.push(newItem);
      parent.expanded = true;
      
      setNavigationData(newData);
      pushState(newData);
      
      // Navigate to new item
      setActiveId(newItem.id);
    }
  }, [addItemModal.parentId, navigationData, setNavigationData, pushState]);

  // Save document
  const handleSaveDocument = useCallback((content) => {
    const newData = JSON.parse(JSON.stringify(navigationData));
    const item = findItemById(activeId, newData);
    if (item) {
      item.content = content;
      setNavigationData(newData);
      pushState(newData);
    }
    setIsEditing(false);
    setEditingData(null);
  }, [activeId, navigationData, setNavigationData, pushState]);

  // Handle context menu position
  const handleContextMenu = useCallback((itemId, event) => {
    const rect = event?.target?.getBoundingClientRect();
    setContextMenu({ 
      isOpen: true, 
      position: { 
        x: rect?.right || event?.clientX || 0, 
        y: rect?.top || event?.clientY || 0 
      }, 
      itemId 
    });
  }, []);

  return (
    <ErrorBoundary>
      <div className={`h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
        <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 h-16 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3 text-xl font-semibold text-blue-600 dark:text-blue-400">
              <span>🏢</span>
              <span>WBG Zentrum</span>
              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full font-normal">
                v2.0
              </span>
            </div>
            
            <EnhancedSearch 
              data={navigationData} 
              onSelect={setActiveId} 
            />
            
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title={`${isDark ? 'Hell' : 'Dunkel'}modus (Strg+T)`}
              >
                {isDark ? '🌞' : '🌙'}
              </button>
              
              <StatusBar
                saveStatus={saveStatus}
                canUndo={canUndo}
                canRedo={canRedo}
                onUndo={undo}
                onRedo={redo}
                currentItem={currentItem}
                wordCount={wordCount}
                isDarkMode={isDark}
              />
            </div>
          </header>

          {/* Main Layout */}
          <div className="flex flex-1 overflow-hidden">
            <Sidebar
              navigationData={navigationData}
              activeId={activeId}
              onSelect={setActiveId}
              onToggle={toggleNavItem}
              onAction={handleContextMenu}
              onMove={handleItemMove}
              isDarkMode={isDark}
              isCollapsed={isCollapsed}
              onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-hidden flex flex-col">
              {/* Breadcrumb */}
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {buildBreadcrumb(activeId, navigationData)}
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-6">
                {currentItem && (
                  <>
                    {isEditing && currentItem.type === 'document' ? (
                      <RichTextEditor
                        data={editingData || currentItem.content}
                        onChange={setEditingData}
                        onSave={handleSaveDocument}
                        onCancel={() => {
                          setIsEditing(false);
                          setEditingData(null);
                        }}
                        isDarkMode={isDark}
                      />
                    ) : currentItem.type === 'document' ? (
                      <DocumentView
                        item={currentItem}
                        onEdit={() => {
                          setIsEditing(true);
                          setEditingData(currentItem.content);
                        }}
                        isDarkMode={isDark}
                      />
                    ) : currentItem.type === 'process' ? (
                      <ProcessView 
                        item={currentItem} 
                        isDarkMode={isDark}
                      />
                    ) : (currentItem.type === 'folder' || currentItem.type === 'root') ? (
                      <FolderView 
                        item={currentItem}
                        onSelect={setActiveId}
                        isDarkMode={isDark}
                      />
                    ) : null}
                  </>
                )}
              </div>
            </main>
          </div>

          {/* Context Menu */}
          <ContextMenu
            isOpen={contextMenu.isOpen}
            position={contextMenu.position}
            onClose={() => setContextMenu({ ...contextMenu, isOpen: false })}
            onAction={(action) => handleContextAction(action, contextMenu.itemId)}
            isDarkMode={isDark}
          />

          {/* Add Item Modal */}
          <AddItemModal
            isOpen={addItemModal.isOpen}
            type={addItemModal.type}
            onClose={() => setAddItemModal({ ...addItemModal, isOpen: false })}
            onAdd={handleAddItem}
            isDarkMode={isDark}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};

// App Provider Component
const App = () => {
  return (
    <AppProvider>
      <MainComponent />
    </AppProvider>
  );
};

// Export wrapped app
const WrappedApp = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default WrappedApp;
