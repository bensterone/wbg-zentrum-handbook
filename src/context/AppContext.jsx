import React, { createContext, useContext, useState } from 'react';

// 1. Context erstellen
export const AppContext = createContext(null);

// 2. Custom Hook für einfachen und sicheren Zugriff auf den Context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext muss innerhalb von AppProvider genutzt werden');
  }
  return context;
};

// 3. Provider Komponente mit Zustandsverwaltung
export const AppProvider = ({ children }) => {
  // Beispiel-Shared-State (kann nach Bedarf erweitert werden)
  const [sharedState, setSharedState] = useState({
    // Hier kannst du zentrale States ablegen, z.B. User, Theme oder andere globale Infos
  });

  const value = {
    sharedState,
    setSharedState,
    // Du kannst hier weitere Funktionen oder States hinzufügen und weitergeben
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
