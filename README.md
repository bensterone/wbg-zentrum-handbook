WBG Zentrum Handbook

WBG Zentrum Handbook ist eine moderne, webbasierte Handbuch- und Dokumentations-App für Organisationen wie die Wohnungsbaugenossenschaft Zentrum.
Funktionen umfassen strukturierte Ordner- und Dokumentnavigation, einen Rich Text Editor, Geschäftsprozesse (BPMN), Tags, Undo/Redo, Dark Mode und vieles mehr.
Features

    ✅ Verschachtelte Sidebar: Intuitive Navigation für Dokumente, Ordner und Prozesse

    ✅ Rich Text Editor: Bearbeitung von Inhalten direkt im Browser

    ✅ BPMN-Integration: Visuelle Verwaltung von Geschäftsprozessen

    ✅ Mehrbenutzerfähig: Änderungen und Struktur im Local Storage

    ✅ Tags & Metadaten: Strukturierte Verschlagwortung

    ✅ Undo/Redo: Rückgängig und Wiederherstellen von Aktionen

    ✅ Dark Mode: Umschaltbar mit einem Klick

    ✅ Suchen: Schneller Volltext- und Tag-Suche

    ✅ Hinzufügen / Duplizieren / Löschen von Dokumenten, Prozessen & Ordnern

    ✅ Drag & Drop: Verschieben in der Navigation

    ✅ Export: Dokumente als JSON herunterladen

    ✅ Barrierefreies Kontextmenü: Drei-Punkte-Option mit Headless UI

    ✅ Responsives Design: Mobil und Desktop nutzbar

Quick Start

bash
git clone https://github.com/deinusername/wbg-zentrum-handbook.git
cd wbg-zentrum-handbook
npm install
npm run dev
# ... oder npm run build && npm start für Produktion

Live Demo:
https://wbg-zentrum-handbook.vercel.app/
Struktur

src/
  components/      // UI-Bausteine (Sidebar, Editor, Modale etc.)
  context/         // AppContext für globale Werte
  hooks/           // Custom React Hooks (Undo/Redo, Theme, etc.)
  data/            // Initialdaten (initialData.js)
  utils/           // Helper und Hilfsfunktionen
  App.jsx          // Haupt-Komponente
  index.jsx        // App Einstiegspunkt
public/
  bpmn-fonts/      // BPMN-Schriftarten (wenn benötigt)
README.md
package.json


Konfiguration

    Für Initialdaten:
    Passe src/data/initialData.js nach deinen Bedürfnissen an

    Für BPMN-Fonts:
    Liegen in public/bpmn-fonts oder werden von der BPMN-Library geladen

Wichtige Umgebungsvariablen

Keine speziellen Umgebungsvariablen erforderlich.
Entwicklungstipps

    Daten-Reset:
    Zum Zurücksetzen auf die Standarddaten, lösche im Browser Local Storage (wbg-navigation-data)

    Editor:
    Strg+Enter zum Speichern, Esc oder Button zum Abbrechen

    Sidebar:
    Über die drei Punkte Menüs neue Dokumente/Ordner/Prozesse hinzufügen, verschieben per Drag-and-Drop

    Dark Mode:
    Umschaltbar oben rechts

Deployment

Die App läuft out-of-the-box mit Vercel und jedem anderen modernen Hosting für React/Vite.

bash
npm run build
# Dann das /dist Verzeichnis deployen

Lizenz

MIT License – freie Nutzung & Anpassung
Autoren

    Benjamin Sturm

    Community Contributors willkommen!

Support & Beiträge

Issues, Feature-Requests und Pull-Requests sind willkommen – gerne via GitHub!

Viel Spaß mit WBG Zentrum Handbook!
