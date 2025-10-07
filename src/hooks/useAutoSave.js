import React, { useState, useCallback, useEffect } from 'react';
// Auto-save hook
const useAutoSave = (data, onSave, delay = 2000) => {
  const timeoutRef = useRef();
  
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      onSave(data);
    }, delay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, onSave, delay]);
};
export { useAutosave };
