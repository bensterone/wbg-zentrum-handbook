import React, { memo } from 'react';
import React, { useState, useCallback, useEffect } from 'react';


// Content Renderer Component (Enhanced)
const ContentRenderer = memo(({ content }) => {
  if (!content || !content.blocks) {
    return <p className="text-gray-500 dark:text-gray-400">Kein Inhalt verfügbar.</p>;
  }

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      {content.blocks.map((block, index) => {
        switch (block.type) {
          case 'header':
            const HeadingTag = `h${block.data.level || 1}`;
            return (
              <HeadingTag 
                key={index}
                className={`
                  font-bold text-gray-900 dark:text-gray-100
                  ${block.data.level === 1 ? 'text-3xl mb-6 mt-8 border-b border-gray-200 dark:border-gray-700 pb-2' : ''}
                  ${block.data.level === 2 ? 'text-2xl mb-4 mt-6' : ''}
                  ${block.data.level === 3 ? 'text-xl mb-3 mt-5' : ''}
                  ${block.data.level >= 4 ? 'text-lg mb-2 mt-4' : ''}
                `}
              >
                {block.data.text}
              </HeadingTag>
            );
          
          case 'paragraph':
            return (
              <p 
                key={index}
                className="mb-4 leading-7 text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: block.data.text }} 
              />
            );
          
          case 'list':
            const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag 
                key={index}
                className={`mb-4 ml-6 ${
                  block.data.style === 'ordered' 
                    ? 'list-decimal' 
                    : 'list-disc'
                }`}
              >
                {block.data.items.map((item, i) => (
                  <li 
                    key={i} 
                    className="mb-1 leading-7 text-gray-700 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: item }} 
                  />
                ))}
              </ListTag>
            );
          
          case 'quote':
            return (
              <blockquote 
                key={index} 
                className="border-l-4 border-blue-500 dark:border-blue-400 pl-6 py-4 my-6 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg"
              >
                <p className="text-lg italic text-gray-800 dark:text-gray-200 mb-2">
                  "{block.data.text}"
                </p>
                {block.data.caption && (
                  <footer className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    — {block.data.caption}
                  </footer>
                )}
              </blockquote>
            );
          
          case 'checklist':
            return (
              <div key={index} className="my-6 space-y-3">
                {block.data.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <input 
                      type="checkbox" 
                      checked={item.checked} 
                      readOnly 
                      className={`
                        w-5 h-5 mt-0.5 rounded border-2 focus:ring-0
                        ${item.checked 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 dark:border-gray-600'
                        }
                      `}
                    />
                    <span className={`
                      text-gray-700 dark:text-gray-300 leading-6
                      ${item.checked ? 'line-through opacity-75' : ''}
                    `}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            );
          
          case 'delimiter':
            return (
              <hr 
                key={index} 
                className="my-8 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" 
              />
            );
          
          default:
            return null;
        }
      })}
    </div>
  );
});
export default ContentRenderer;
