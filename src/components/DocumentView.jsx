import React from 'react';

export default function DocumentView({ item }) {
  if (!item) return <div>Select a document from the sidebar.</div>;

  return (
    <article>
      <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
      <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: item.content }} />
    </article>
  );
}
