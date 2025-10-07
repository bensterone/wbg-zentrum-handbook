import React, { useState, useEffect, useCallback } from 'react';

// Importiere deinen Context-Provider
import { AppProvider } from './context/AppContext';

// Importiere ggf. alle Hooks, Helfer und Komponenten, die du benutzt
// Beispiel (passe an, falls anders benannt oder noch nicht importiert):
import { useLocalStorage } from './hooks/useLocalStorage';
import { useUndoRedo } from './hooks/useUndoRedo';
import { useTheme } from './hooks/useTheme';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

import { findItemById, generateId, buildBreadcrumb, getWordCount, useAutoSave } from './utils/helpers';

import ErrorBoundary from './components/ErrorBoundary';
import EnhancedSearch from './components/EnhancedSearch';
import StatusBar from './components/StatusBar';
import Sidebar from './components/Sidebar';
import RichTextEditor from './components/RichTextEditor';
import DocumentView from './components/DocumentView';
import ProcessView from './components/ProcessView';
import FolderView from './components/FolderView';
import ContextMenu from './components/ContextMenu';
import AddItemModal from './components/AddItemModal';

import INITIAL_DATA from './data/initialData';

const InnerApp = () => {
  // State management wie von dir beschrieben
  const [navigationData, setNavigationData] = useLocalStorage('wbg-navigation-data', INITIAL_DATA);
  const [activeId, setActiveId] = useState('organigramm');
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // Theme etc.
  const { theme, toggleTheme, isDark } = useTheme();

  // Undo/Redo
  const { currentState: undoState, pushState, undo, redo, canUndo, canRedo } = useUndoRedo(navigationData);

  // Kontextmenü-State
  const [contextMenu, setContextMenu] = useState({ isOpen: false, position: { x: 0, y: 0 }, itemId: null });

  // Add Item Modal State
  const [addItemModal, setAddItemModal] = useState({ isOpen: false, type: 'document', parentId: null });

  const currentItem = findItemById(activeId, navigationData);
  const wordCount = currentItem?.content ? getWordCount(currentItem.content.blocks) : 0;

  // Auto-save und weitere Effekte wie von dir

  useAutoSave(navigationData, () => {
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 500);
  }, 1000);

  useEffect(() => {
    if (JSON.stringify(undoState) !== JSON.stringify(navigationData)) {
      setNavigationData(undoState);
    }
  }, [undoState, navigationData, setNavigationData]);

  // Keyboard Shortcuts usw. ...

  // Funktionen zum Toggle, Kontextmenü, ItemMove, HandleSave, HandleAddItem etc.
  // (füge hier deinen bisherigen gesamten Code für die Callbacks wieder ein)

  // ...
  // z.B. toggleNavItem, handleItemMove, handleContextAction, handleAddItem, handleSaveDocument...
  // den kompletten Codeblock aus deiner bisherigen Implementierung.

  return (
    <ErrorBoundary>
      <div className={`h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
        {/* Dein kompletter JSX-Tree aus dem bisherigen return.
            Also Header, Sidebar, Content, ContextMenu, AddItemModal etc. */}
        {/* Einfach deinen bisherigen JSX-Block hier einfügen */}
      </div>
    </ErrorBoundary>
  );
};

// Haupt-App-Komponente exportieren, die InnerApp in den Context packt
const App = () => (
  <AppProvider>
    <InnerApp />
  </AppProvider>
);

export default App;
