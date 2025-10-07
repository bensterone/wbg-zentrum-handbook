// Keyboard shortcuts hook
const useKeyboardShortcuts = ({ 
  onSearch, 
  onSave, 
  onUndo, 
  onRedo, 
  onNewDocument,
  onToggleTheme,
  isEditing 
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isCtrl = e.ctrlKey || e.metaKey;
      
      if (isCtrl && !e.altKey) {
        switch (e.key.toLowerCase()) {
          case 'k':
            e.preventDefault();
            onSearch();
            break;
          case 's':
            if (isEditing) {
              e.preventDefault();
              onSave();
            }
            break;
          case 'z':
            if (e.shiftKey) {
              e.preventDefault();
              onRedo();
            } else {
              e.preventDefault();
              onUndo();
            }
            break;
          case 'n':
            e.preventDefault();
            onNewDocument();
            break;
          case 't':
            e.preventDefault();
            onToggleTheme();
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSearch, onSave, onUndo, onRedo, onNewDocument, onToggleTheme, isEditing]);
};
export { useKeyboardShortcuts };
