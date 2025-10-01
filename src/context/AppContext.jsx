import React, { createContext, useContext } from 'react';

// Context erstellen und exportieren
export const AppContext = createContext();

// Custom Hook zum einfachen Zugriff auf den Context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Provider-Komponente
export const AppProvider = ({ children }) => {
  // Du kannst hier z.B. useState oder andere States verwalten und im Kontext bereitstellen
  const value = {}; // z.B. { user: ..., theme: ... }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
