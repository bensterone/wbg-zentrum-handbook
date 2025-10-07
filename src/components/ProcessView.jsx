import React from 'react';

const ProcessView = ({ item, isDarkMode }) => {
  return (
    <div>
      <h2>Prozess Ansicht</h2>
      <pre>{JSON.stringify(item, null, 2)}</pre>
      {/* Hier kannst du später die echte Prozess-Anzeige implementieren */}
    </div>
  );
};

export default ProcessView;

