import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';
import debounce from 'lodash.debounce';

const RichTextEditor = ({ data, onChange }) => {
  const ejInstance = useRef(null);
  const holderId = useRef(`editorjs-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!ejInstance.current) {
      ejInstance.current = new EditorJS({
        holder: holderId.current,
        autofocus: true,
        tools: {
          header: Header,
          list: List,
          embed: Embed,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: '/uploadFile', // replace with your API endpoint
                byUrl: '/fetchUrl',    // replace with your API endpoint
              },
            },
          },
        },
        data: data || { blocks: [] },
        onChange: debounce(async () => {
          if (onChange && ejInstance.current) {
            try {
              const content = await ejInstance.current.save();
              onChange(content);
            } catch (e) {
              console.error('Editor.js save error:', e);
            }
          }
        }, 500),
      });
    }

    return () => {
      if (ejInstance.current?.destroy) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  return <div id={holderId.current} className="prose dark:prose-invert max-w-none" />;
};

export default RichTextEditor;
