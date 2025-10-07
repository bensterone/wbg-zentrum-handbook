import React from 'react';
import EnhancedProcessView from './EnhancedProcessView';
import RichTextEditor from './RichTextEditor';

export default function DocumentView({ item, onUpdate }) {
  if (!item) return <div>Select a document from the sidebar.</div>;

  if (item.type === 'process') {
    return <EnhancedProcessView item={item} onUpdate={onUpdate} />;
  }

  const handleContentChange = (newData) => {
    onUpdate({ ...item, editorData: newData });
  };

  return (
    <article>
      <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
      <RichTextEditor data={item.editorData} onChange={handleContentChange} />
    </article>
  );
}

