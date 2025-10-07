import React, { memo, useState, useCallback, useEffect } from 'react';

// Enhanced Folder View Component
const FolderView = memo(({ item, onSelect, isDarkMode }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{item.icon}</span>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{item.label}</h1>
        </div>
        {item.description && (
          <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
        )}
      </div>
      
      <div>
        <h2 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
          Bereich: {item.label}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Wählen Sie aus der Navigation einen Unterpunkt aus, um den Inhalt anzuzeigen.
        </p>

        {item.children && item.children.length > 0 ? (
          <>
            <h3 className="text-md font-medium mb-4 text-gray-900 dark:text-gray-100">
              Verfügbare Inhalte:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {item.children.map(child => (
                <button
                  key={child.id}
                  onClick={() => onSelect(child.id)}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl group-hover:scale-110 transition-transform">{child.icon}</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{child.label}</span>
                  </div>
                  {child.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                      {child.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {child.type === 'document' ? 'Dokument' : 
                       child.type === 'process' ? 'Prozess' : 'Ordner'}
                    </span>
                    {child.tags && child.tags.length > 0 && (
                      <span className="text-xs text-blue-600 dark:text-blue-400">
                        {child.tags.length} Tags
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4 opacity-50">📁</div>
            <p className="text-gray-500 dark:text-gray-400 italic">Noch keine Inhalte vorhanden.</p>
          </div>
        )}
      </div>
    </div>
  );
});
export default Folderview;
