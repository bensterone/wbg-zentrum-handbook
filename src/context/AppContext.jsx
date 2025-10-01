import React, { createContext, useContext, useState } from 'react';

// 1. Context erstellen
export const AppContext = createContext(null);

// 2. Hook für einfaches Nutzen des Contexts
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext muss innerhalb von AppProvider genutzt werden");
  }
  return context;
};

// 3. Provider-Komponente, die die Daten an deine App liefert
export const AppProvider = ({ children }) => {
  // Beispiel: Du kannst hier eigene States einfügen, z.B. für Theme o.ä.
  const [state, setState] = useState({});

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
