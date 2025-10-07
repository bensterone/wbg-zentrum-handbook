import React, { useEffect, useRef } from 'react';

const ContextMenu = ({
  isOpen,
  position = { x: 0, y: 0 },
  onClose,
  onAction,
  isDarkMode = false,
  // Optional: Menüpunkte als Array von { id, label }
  items = [
    { id: 'add-document', label: 'Neues Dokument anlegen' },
    { id: 'add-folder', label: 'Neuen Ordner anlegen' },
    { id: 'edit', label: 'Bearbeiten' },
    { id: 'duplicate', label: 'Duplizieren' },
    { id: 'export', label: 'Exportieren' },
    { id: 'delete', label: 'Löschen' }
  ]
}) => {
  const menuRef = useRef(null);

  // Klick außerhalb schließt Menü
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ul
      ref={menuRef}
      className={`absolute z-50 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
        ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}
      style={{
        top: position.y,
        left: position.x,
        userSelect: 'none',
      }}
      role="menu"
      aria-orientation="vertical"
      tabIndex={-1}
    >
      {items.map(({ id, label }) => (
        <li key={id} className="group relative" role="none">
          <button
            onClick={() => {
              onAction(id);
              onClose();
            }}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-600 hover:text-white
              ${isDarkMode ? 'hover:bg-blue-500' : ''}`}
            role="menuitem"
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
