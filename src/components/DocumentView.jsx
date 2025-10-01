// Enhanced Document View Component
const DocumentView = memo(({ item, onEdit, isDarkMode }) => {
  const wordCount = getWordCount(item.content?.blocks);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{item.icon}</span>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{item.label}</h1>
          </div>
          {item.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {item.tags.map(tag => (
                <span 
                  key={tag}
                  className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 ml-4">
          {wordCount > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {wordCount} Wörter
            </span>
          )}
          <button
            onClick={onEdit}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            ✏️ Bearbeiten
          </button>
        </div>
      </div>
      <ContentRenderer content={item.content} />
    </div>
  );
});

