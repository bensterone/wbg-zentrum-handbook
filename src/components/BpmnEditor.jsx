import React, { useEffect, useRef, useState, useCallback } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import '../bpmn.css';

const EMPTY_DIAGRAM = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" 
                  xmlns:di="http://www.omg.org/spec/DD/20100524/DI" 
                  id="Definitions_1" 
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="179" y="99" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

const BpmnEditor = ({ initialXml = EMPTY_DIAGRAM, onSave, onCancel, isDarkMode }) => {
  const containerRef = useRef();
  const modelerRef = useRef();
  const [isReady, setIsReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const modeler = new BpmnModeler({
      container: containerRef.current,
      keyboard: {
        bindTo: document
      }
    });

    modelerRef.current = modeler;

    const loadDiagram = async () => {
      try {
        await modeler.importXML(initialXml);
        const canvas = modeler.get('canvas');
        canvas.zoom('fit-viewport');
        setIsReady(true);
      } catch (err) {
        console.error('Error loading BPMN diagram:', err);
      }
    };

    loadDiagram();

    return () => {
      modeler.destroy();
    };
  }, [initialXml]);

  const handleSave = useCallback(async () => {
    if (!modelerRef.current || !onSave) return;
    
    setIsSaving(true);
    try {
      const { xml } = await modelerRef.current.saveXML({ format: true });
      onSave(xml);
    } catch (err) {
      console.error('Error saving BPMN diagram:', err);
    } finally {
      setIsSaving(false);
    }
  }, [onSave]);

  const handleUndo = () => {
    if (modelerRef.current) {
      const commandStack = modelerRef.current.get('commandStack');
      commandStack.undo();
    }
  };

  const handleRedo = () => {
    if (modelerRef.current) {
      const commandStack = modelerRef.current.get('commandStack');
      commandStack.redo();
    }
  };

  const handleZoomFit = () => {
    if (modelerRef.current) {
      const canvas = modelerRef.current.get('canvas');
      canvas.zoom('fit-viewport');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* BPMN Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚙️</span>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">BPMN Prozess-Editor</h3>
          {!isReady && <span className="text-sm text-gray-500">Lade Editor...</span>}
        </div>
        
        <div className="flex items-center gap-2">
          {/* BPMN Editor Controls */}
          <button
            onClick={handleUndo}
            disabled={!isReady}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            title="Rückgängig"
          >
            ↶
          </button>
          <button
            onClick={handleRedo}
            disabled={!isReady}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            title="Wiederholen"
          >
            ↷
          </button>
          <button
            onClick={handleZoomFit}
            disabled={!isReady}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            title="Alles anzeigen"
          >
            🔍
          </button>
          
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
          
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            disabled={!isReady || isSaving}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? '💾 Speichert...' : '💾 Speichern'}
          </button>
        </div>
      </div>

      {/* BPMN Canvas */}
      <div 
        ref={containerRef}
        className={`h-96 ${isDarkMode ? 'dark' : ''}`}
        style={{ minHeight: '500px' }}
      />
    </div>
  );
};

export default BpmnEditor;
