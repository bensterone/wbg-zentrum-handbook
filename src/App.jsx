import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import DocumentView from './components/DocumentView';
import initialData from './data/initialData';

const InnerApp = () => {
  const [data, setData] = useState(initialData);
  const [activeId, setActiveId] = useState(data.items[0]?.id || null);

  const handleSelect = (id) => setActiveId(id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-12 gap-4">
        <aside className="col-span-3">
          <Sidebar items={data.items} activeId={activeId} onSelect={handleSelect} />
        </aside>
        <main className="col-span-9 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <DocumentView item={data.items.find(i => i.id === activeId)} />
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <InnerApp />
    </AppProvider>
  );
}
