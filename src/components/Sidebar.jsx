import React from 'react';

export default function Sidebar({ items = [], activeId, onSelect }) {
  return (
    <nav className="bg-white dark:bg-gray-800 rounded-lg shadow p-3">
      <h2 className="text-lg font-semibold mb-3">Handbook</h2>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item.id}>
            <button
              onClick={() => onSelect(item.id)}
              className={
                "w-full text-left p-2 rounded " +
                (item.id === activeId ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700')
              }
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
