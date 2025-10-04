import React, { createContext } from 'react';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const value = {
    // put global shared state here if needed later
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
