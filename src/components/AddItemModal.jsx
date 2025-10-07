import React, { useState, useCallback, useEffect } from 'react';
import CustomEmojiPicker from './EmojiPicker';

const AddItemModal = ({ isOpen, type, onClose, onAdd, isDarkMode }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(() => {
    const icons = { document: '📄', process: '⚙️', folder: '📁' };
    return icons[type] || '📄';
  });
  const [tags, setTags] = useState('');

  const typeLabels = { document: 'Dokument', process: 'Prozess', folder: 'Ordner' };

  useEffect(() => {
    if (isOpen) {
      setName('');
      setDescription('');
      setTags('');
      setIcon(type === 'document' ? '📄' : type === 'process' ? '⚙️' : '📁');
    }
  }, [isOpen, type]);

  const handleSubmit = () => {
    if (name.trim()) {
      onAdd({ 
        name: name.trim(), 
        description: description.trim(), 
        icon: icon.trim(), 
        type,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      });
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setIcon(emoji);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Neues {typeLabels[type]} erstellen
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              placeholder={`${typeLabels[type]}-Name eingeben...`}
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Beschreibung:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
              placeholder="Kurze Beschreibung (optional)"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Icon:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Emoji"
                />
                <CustomEmojiPicker 
                  onEmojiClick={handleEmojiSelect}
                  isDarkMode={isDarkMode}
                  trigger={
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      😀
                    </button>
                  }
                />
              </div>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tags:
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="tag1, tag2"
              />
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 justify-end pt-6 mt-6 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Erstellen (Strg+Enter)
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
