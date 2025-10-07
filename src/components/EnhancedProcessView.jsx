import React, { useState, useCallback, useEffect, useRef } from 'react';
import BpmnEditor from './BpmnEditor';

const EnhancedProcessView = ({ item, onUpdate, isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentXml, setCurrentXml] = useState(item.bpmnXml || null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (xml) => {
    const updatedItem = {
      ...item,
      bpmnXml: xml
    };
    onUpdate(updatedItem);
    setCurrentXml(xml);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <BpmnEditor
        initialXml={currentXml}
        onSave={handleSave}
        onCancel={handleCancel}
        isDarkMode={isDarkMode}
      />
    );
  }

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
                  className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleEdit}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          ⚙️ BPMN bearbeiten
        </button>
      </div>
      
      {/* BPMN Preview */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-600">
        {currentXml ? (
          <div>
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">BPMN Prozessdiagramm</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
              {item.description || 'Prozessdiagramm ist verfügbar. Klicken Sie auf "BPMN bearbeiten" um es zu öffnen.'}
            </p>
            <div className="text-sm text-green-600 dark:text-green-400 font-medium">
              ✓ BPMN-Diagramm verfügbar
            </div>
          </div>
        ) : (
          <div>
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Neues BPMN Prozessdiagramm</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              {item.description || 'Erstellen Sie ein neues BPMN-Diagramm für diesen Prozess.'}
            </p>
            
            <button
              onClick={handleEdit}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              ⚙️ BPMN-Editor öffnen
            </button>
          </div>
        )}
      </div>
      
      {/* Process Steps Preview */}
      <div className="mt-6 max-w-2xl mx-auto">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">Typischer Prozessablauf</h4>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">1</div>
            <span className="text-gray-700 dark:text-gray-300">Start</span>
          </div>
          <div className="w-8 h-px bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">2</div>
            <span className="text-gray-700 dark:text-gray-300">Bearbeitung</span>
          </div>
          <div className="w-8 h-px bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">3</div>
            <span className="text-gray-700 dark:text-gray-300">Abschluss</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProcessView;
