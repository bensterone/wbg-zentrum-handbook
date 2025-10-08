import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SidebarItem({ item, activeId, onSelect, onToggle, onAddItem, level = 0 }) {
  const isFolder = item.type === 'folder' || item.type === 'root';
  const isActive = item.id === activeId;

  return (
    <li>
      <div
        className={classNames(
          "flex items-center p-2 rounded cursor-pointer",
          isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100",
          isFolder && "font-semibold"
        )}
        style={{ paddingLeft: 8 + level * 16 }}
        onClick={() => onSelect(item.id)}
      >
        <span className="mr-2">{item.icon || '📁'}</span>
        <span className="truncate flex-1">{item.label}</span>

        {/* Headless UI Drei-Punkte Menü */}
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button
            onClick={e => e.stopPropagation()} // Wichtig! Verhindert onClick Propagation auf den Parent (Selektierung)
            className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
            aria-label="Optionen öffnen"
            type="button"
          >
            ⋯
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              static
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onAddItem(item.id, 'document')}
                      className={classNames(
                        active ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200',
                        'block w-full text-left px-4 py-2 text-sm'
                      )}
                    >
                      Neues Dokument
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onAddItem(item.id, 'folder')}
                      className={classNames(
                        active ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200',
                        'block w-full text-left px-4 py-2 text-sm'
                      )}
                    >
                      Neuer Ordner
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onAddItem(item.id, 'process')}
                      className={classNames(
                        active ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-200',
                        'block w-full text-left px-4 py-2 text-sm'
                      )}
                    >
                      Neuer Prozess
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Rekursive Darstellung der Kinder */}
      {isFolder && item.expanded && item.children && item.children.length > 0 && (
        <ul>
          {item.children.map((child) => (
            <SidebarItem
              key={child.id}
              item={child}
              activeId={activeId}
              onSelect={onSelect}
              onToggle={onToggle}
              onAddItem={onAddItem}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
