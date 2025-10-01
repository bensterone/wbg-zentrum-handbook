// Status Bar Component
const StatusBar = memo(({ 
  saveStatus, 
  canUndo, 
  canRedo, 
  onUndo, 
  onRedo,
  currentItem,
  wordCount,
  isDarkMode
}) => {
  const getStatusColor = () => {
    switch (saveStatus) {
      case 'saved': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
      case 'saving': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200';
      case 'error': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Undo/Redo buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-2 rounded transition-colors ${
            canUndo 
              ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700' 
              : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
          }`}
          title="Rückgängig (Strg+Z)"
        >
          <span className="text-sm">↶</span>
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-2 rounded transition-colors ${
            canRedo 
              ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700' 
              : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
          }`}
          title="Wiederholen (Strg+Shift+Z)"
        >
          <span className="text-sm">↷</span>
        </button>
      </div>

      {/* Word count for documents */}
      {currentItem?.type === 'document' && wordCount > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400 border-l border-gray-300 dark:border-gray-600 pl-4">
          {wordCount.toLocaleString()} Wörter
        </div>
      )}

      {/* Current item info */}
      {currentItem && (
        <div className="text-sm text-gray-600 dark:text-gray-400 border-l border-gray-300 dark:border-gray-600 pl-4 flex items-center gap-2">
          <span>{currentItem.icon}</span>
          <span className="max-w-32 truncate">{currentItem.label}</span>
        </div>
      )}

      {/* Save status */}
      <div className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor()} transition-colors`}>
        {saveStatus === 'saved' && '✓ Gespeichert'}
        {saveStatus === 'saving' && '⏳ Speichert...'}
        {saveStatus === 'error' && '⚠ Fehler'}
      </div>
    </div>
  );
});
