// Rich Text Editor Component (Enhanced)
const RichTextEditor = memo(({ data, onChange, onSave, onCancel, isDarkMode }) => {
  const [title, setTitle] = useState(data?.blocks?.[0]?.data?.text || '');
  const [isReady, setIsReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef();
  const editorInstance = useRef();
  
  const debouncedOnChange = useCallback(
    debounce((data) => onChange && onChange(data), 1000),
    [onChange]
  );

  const initializeEditor = useCallback(async () => {
    if (typeof window !== 'undefined' && window.EditorJS && editorRef.current) {
      try {
        const tools = {};
        
        // Load available Editor.js tools
        if (window.Header) tools.header = { 
          class: window.Header,
          config: { placeholder: 'Überschrift eingeben...', levels: [1, 2, 3, 4] }
        };
        if (window.List) tools.list = { class: window.List };
        if (window.Quote) tools.quote = { 
          class: window.Quote,
          config: { quotePlaceholder: 'Zitat eingeben', captionPlaceholder: 'Autor' }
        };
        if (window.Marker) tools.marker = { class: window.Marker };
        if (window.Checklist) tools.checklist = { class: window.Checklist };
        if (window.Delimiter) tools.delimiter = window.Delimiter;
        if (window.LinkTool) tools.linkTool = { class: window.LinkTool };

        // Filter out the title block for the editor
        const editorBlocks = data?.blocks ? data.blocks.slice(1) : [];

        editorInstance.current = new window.EditorJS({
          holder: editorRef.current,
          data: { blocks: editorBlocks },
          tools,
          onChange: async () => {
            if (editorInstance.current) {
              try {
                const savedData = await editorInstance.current.save();
                const fullData = {
                  blocks: [
                    { type: 'header', data: { text: title, level: 1 } },
                    ...savedData.blocks
                  ]
                };
                debouncedOnChange(fullData);
              } catch (error) {
                console.error('Error saving editor data:', error);
              }
            }
          },
          placeholder: 'Hier schreiben oder "/" für Optionen...'
        });

        await editorInstance.current.isReady;
        setIsReady(true);
      } catch (error) {
        console.error('Error initializing editor:', error);
      }
    }
  }, [data, title, debouncedOnChange]);

  useEffect(() => {
    const loadEditorJS = () => {
      if (window.EditorJS) {
        initializeEditor();
      } else {
        setTimeout(loadEditorJS, 100);
      }
    };
    
    loadEditorJS();
    
    return () => {
      if (editorInstance.current && typeof editorInstance.current.destroy === 'function') {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [initializeEditor]);

  const handleSave = async () => {
    if (!editorInstance.current || !isReady) return;
    
    setIsSaving(true);
    try {
      const savedData = await editorInstance.current.save();
      const fullData = {
        blocks: [
          { type: 'header', data: { text: title, level: 1 } },
          ...savedData.blocks
        ]
      };
      onSave(fullData);
    } catch (error) {
      console.error('Error saving document:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    const fullData = {
      blocks: [
        { type: 'header', data: { text: e.target.value, level: 1 } },
        ...(data?.blocks?.slice(1) || [])
      ]
    };
    debouncedOnChange(fullData);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="text-2xl font-semibold w-full border-none focus:outline-none focus:ring-0 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Titel eingeben..."
        />
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {isReady ? '✓ Editor bereit' : '⏳ Lade Editor...'}
          </div>
        </div>
      </div>
      
      <div 
        ref={editorRef} 
        className={`
          min-h-[400px] prose prose-gray dark:prose-invert max-w-none
          ${!isReady ? 'opacity-50' : ''}
        `} 
      />

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Tipp: Verwenden Sie "/" um Block-Optionen zu öffnen
        </div>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            disabled={!isReady || isSaving}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? '💾 Speichert...' : '💾 Speichern & Schließen'}
          </button>
        </div>
      </div>
    </div>
  );
});

