import React, { useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

// Theme hook
const useTheme = () => {
  const [theme, setTheme] = useLocalStorage('wbg-theme', 'light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, [setTheme]);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  return { theme, toggleTheme, isDark: theme === 'dark' };
};
export { useTheme };
