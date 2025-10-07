import React, { useState, useCallback, useEffect } from 'react';
// Undo/Redo functionality hook
const useUndoRedo = (initialState, maxHistory = 50) => {
  const [states, setStates] = useState([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const currentState = states[currentIndex];
  
  const pushState = useCallback((newState) => {
    const newStates = states.slice(0, currentIndex + 1);
    newStates.push(newState);
    const limitedStates = newStates.slice(-maxHistory);
    setStates(limitedStates);
    setCurrentIndex(limitedStates.length - 1);
  }, [states, currentIndex, maxHistory]);
  
  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);
  
  const redo = useCallback(() => {
    if (currentIndex < states.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, states.length]);
  
  return {
    currentState,
    pushState,
    undo,
    redo,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < states.length - 1
  };
};
export { useUndoRedo };
