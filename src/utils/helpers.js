// Generiert eine eindeutige ID mit Zeitstempel und Zufallsstring
export const generateId = () => `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Sucht rekursiv nach Element mit bestimmter ID im Baum
export const findItemById = (id, node) => {
  if (node.id === id) return node;
  if (node.children) {
    for (let child of node.children) {
      const found = findItemById(id, child);
      if (found) return found;
    }
  }
  return null;
};

// Baut einen Breadcrumb-Pfad als String aus den Labels der Hierarchie
export const buildBreadcrumb = (itemId, navigationData) => {
  const path = [];
  const findPath = (id, node = navigationData, currentPath = []) => {
    currentPath.push(node.label);
    if (node.id === id) {
      path.push(...currentPath);
      return true;
    }
    if (node.children) {
      for (let child of node.children) {
        if (findPath(id, child, [...currentPath])) {
          return true;
        }
      }
    }
    return false;
  };
  findPath(itemId);
  return path.join(' › ');
};

// Berechnet die Gesamtanzahl Wörter aus EditorJS-Blöcken
export const getWordCount = (blocks) => {
  if (!Array.isArray(blocks)) return 0;
  return blocks.reduce((total, block) => {
    if (typeof block.data?.text === 'string') {
      return total + block.data.text.trim().split(/\s+/).length;
    }
    return total;
  }, 0);
};

// Hook zum automatischen Speichern von Daten mit Debounce (ein Beispiel)
import { useEffect, useRef } from 'react';

export const useAutoSave = (data, onSave, delay = 1000) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onSave(data);
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [data, onSave, delay]);
};
