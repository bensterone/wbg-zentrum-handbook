const INITIAL_DATA = {
  id: 'root',
  label: 'WBG Zentrum',
  icon: '🏢',
  type: 'root',
  children: [
    {
      id: 'organigramm',
      label: 'Organigramm',
      icon: '📊',
      type: 'document',
      description: 'Organisationsstruktur und Verantwortlichkeiten',
      tags: ['organisation', 'struktur'],
      content: {
        blocks: [
          {
            type: 'header',
            data: { text: 'Organisationsstruktur WBG Zentrum', level: 1 }
          },
          {
            type: 'paragraph',
            data: { text: 'Unsere Wohnungsbaugenossenschaft ist klar strukturiert und auf die Bedürfnisse unserer Mitglieder ausgerichtet.' }
          },
          {
            type: 'header',
            data: { text: 'Führungsebene', level: 2 }
          },
          {
            type: 'list',
            data: { 
              style: 'unordered',
              items: [
                'Geschäftsführung - Strategische Leitung',
                'Vorstand - Mitgliedervertretung',
                'Aufsichtsrat - Kontrollorgan'
              ]
            }
          }
        ]
      }
    },
    {
      id: 'unternehmen',
      label: 'Unternehmen',
      icon: '🏬',
      type: 'folder',
      expanded: true,
      description: 'Grundlegende Informationen über die WBG',
      children: [
        {
          id: 'vision',
          label: 'Vision und Leitbild',
          icon: '👁️',
          type: 'document',
          description: 'Unsere Werte und strategische Ausrichtung',
          tags: ['vision', 'werte', 'strategie'],
          content: {
            blocks: [
              { 
                type: 'header', 
                data: { text: 'Vision und Leitbild der WBG Zentrum', level: 1 } 
              },
              { 
                type: 'quote', 
                data: { 
                  text: 'Wir schaffen bezahlbaren Wohnraum und fördern das Gemeinschaftsleben in Prenzlauer Berg.',
                  caption: 'Unsere Vision' 
                } 
              },
              { 
                type: 'header', 
                data: { text: 'Unsere Werte', level: 2 } 
              },
              { 
                type: 'list', 
                data: { 
                  style: 'unordered', 
                  items: [
                    '🤝 Gemeinschaft und Solidarität',
                    '🌱 Nachhaltigkeit und Umweltschutz',
                    '🔍 Transparenz und Vertrauen',
                    '⭐ Qualität und Service',
                    '💡 Innovation und Fortschritt'
                  ] 
                } 
              },
              {
                type: 'delimiter',
                data: {}
              },
              {
                type: 'header',
                data: { text: 'Unser Auftrag', level: 2 }
              },
              {
                type: 'paragraph',
                data: { text: 'Als Genossenschaft stehen wir für demokratische Mitbestimmung und gemeinsame Verantwortung. Wir entwickeln Prenzlauer Berg als lebendigen Stadtteil weiter.' }
              }
            ]
          }
        },
        {
          id: 'ziele',
          label: 'Unternehmensziele',
          icon: '🎯',
          type: 'document',
          description: 'Strategische Ziele für 2024-2026',
          tags: ['ziele', 'strategie', '2024', '2025', '2026'],
          content: {
            blocks: [
              { 
                type: 'header', 
                data: { text: 'Strategische Unternehmensziele 2024-2026', level: 1 } 
              },
              {
                type: 'paragraph',
                data: { text: 'Unsere strategische Planung fokussiert sich auf nachhaltige Entwicklung und Mitgliederzufriedenheit.' }
              },
              { 
                type: 'checklist', 
                data: { 
                  items: [
                    { text: 'Modernisierung von 80% des Wohnungsbestandes', checked: false },
                    { text: 'Implementierung digitaler Verwaltungsprozesse', checked: true },
                    { text: 'Reduzierung der CO2-Emissionen um 25%', checked: false },
                    { text: 'Verbesserung der Mitgliederzufriedenheit auf 90%+', checked: false },
                    { text: 'Aufbau einer digitalen Mitglieder-App', checked: false },
                    { text: 'Erweiterung der Gemeinschaftsangebote', checked: true }
                  ] 
                } 
              },
              {
                type: 'header',
                data: { text: 'Erfolgsmessung', level: 2 }
              },
              {
                type: 'paragraph',
                data: { text: 'Quartalsweise Überprüfung der Ziele durch den Vorstand mit transparenter Kommunikation an alle Mitglieder.' }
              }
            ]
          }
        },
        {
          id: 'zahlen',
          label: 'WBG in Zahlen',
          icon: '📈',
          type: 'document',
          description: 'Aktuelle Kennzahlen und Statistiken',
          tags: ['zahlen', 'statistik', 'kennzahlen'],
          content: {
            blocks: [
              {
                type: 'header',
                data: { text: 'Die WBG Zentrum in Zahlen', level: 1 }
              },
              {
                type: 'paragraph',
                data: { text: 'Unsere Genossenschaft im Überblick - Stand Oktober 2024:' }
              },
              {
                type: 'list',
                data: {
                  style: 'unordered',
                  items: [
                    '🏠 <strong>1.247</strong> Wohnungen im Bestand',
                    '👥 <strong>2.156</strong> Mitglieder',
                    '📊 <strong>Ø 65 Jahre</strong> Durchschnittsalter der Mitglieder',
                    '💼 <strong>42</strong> Mitarbeiter',
                    '📍 Schwerpunkt: <strong>Prenzlauer Berg</strong>',
                    '⚡ <strong>65%</strong> energetisch sanierte Gebäude',
                    '💰 <strong>7,8 €/m²</strong> durchschnittliche Miete'
                  ]
                }
              },
              {
                type: 'header',
                data: { text: 'Entwicklung der letzten 5 Jahre', level: 2 }
              },
              {
                type: 'paragraph',
                data: { text: 'Kontinuierliches Wachstum bei gleichzeitiger Fokussierung auf Qualität und Nachhaltigkeit.' }
              }
            ]
          }
        },
        {
          id: 'geschichte',
          label: 'Geschichte',
          icon: '📜',
          type: 'document',
          description: 'Historie und Entwicklung der WBG Zentrum',
          tags: ['geschichte', 'historie', 'entwicklung'],
          content: {
            blocks: [
              {
                type: 'header',
                data: { text: 'Geschichte der WBG Zentrum', level: 1 }
              },
              {
                type: 'paragraph',
                data: { text: 'Gegründet 1954 als Reaktion auf den Wohnungsmangel in Ost-Berlin, hat sich die WBG Zentrum zu einer modernen Genossenschaft entwickelt.' }
              },
              {
                type: 'list',
                data: {
                  style: 'ordered',
                  items: [
                    '<strong>1954:</strong> Gründung der Genossenschaft',
                    '<strong>1960er:</strong> Erste große Bauvorhaben',
                    '<strong>1989:</strong> Wende und Neuausrichtung',
                    '<strong>2000er:</strong> Modernisierung und Sanierung',
                    '<strong>2020+:</strong> Digitalisierung und Nachhaltigkeit'
                  ]
                }
              }
            ]
          }
        }
      ]
    },
    {
      id: 'regelungen',
      label: 'Regelungen',
      icon: '📋',
      type: 'folder',
      expanded: false,
      description: 'Betriebliche Regelungen und Vorschriften',
      children: [
        {
          id: 'arbeitszeit',
          label: 'Arbeitszeit',
          icon: '⏰',
          type: 'document',
          description: 'Arbeitszeit- und Öffnungszeitenregelung',
          tags: ['arbeitszeit', 'öffnungszeiten', 'bürozeiten'],
          content: {
            blocks: [
              { 
                type: 'header', 
                data: { text: 'Arbeitszeiten und Öffnungszeiten', level: 1 } 
              },
              { 
                type: 'header', 
                data: { text: 'Bürozeiten für Mitarbeiter', level: 2 } 
              },
              { 
                type: 'list', 
                data: { 
                  style: 'unordered', 
                  items: [
                    '🕐 Montag - Donnerstag: 8:00 - 16:00 Uhr',
                    '🕐 Freitag: 8:00 - 14:00 Uhr',
                    '☕ Mittagspause: 12:00 - 13:00 Uhr'
                  ] 
                } 
              },
              {
                type: 'header',
                data: { text: 'Sprechzeiten für Mitglieder', level: 2 }
              },
              {
                type: 'list',
                data: {
                  style: 'unordered',
                  items: [
                    '🗣️ Dienstag: 9:00 - 12:00 und 14:00 - 18:00 Uhr',
                    '🗣️ Donnerstag: 9:00 - 12:00 und 14:00 - 16:00 Uhr',
                    '📞 Telefonische Termine nach Vereinbarung'
                  ]
                }
              },
              {
                type: 'header',
                data: { text: 'Homeoffice-Regelung', level: 2 }
              },
              {
                type: 'paragraph',
                data: { text: 'Flexible Arbeitszeiten und Homeoffice nach Absprache mit der Führungskraft möglich.' }
              }
            ]
          }
        },
        {
          id: 'arbeitsanweisungen',
          label: 'Arbeitsanweisungen',
          icon: '📝',
          type: 'document',
          description: 'Allgemeine und spezielle Arbeitsanweisungen',
          tags: ['anweisungen', 'richtlinien', 'verfahren'],
          content: {
            blocks: [
              {
                type: 'header',
                data: { text: 'Allgemeine Arbeitsanweisungen', level: 1 }
              },
              {
                type: 'paragraph',
                data: { text: 'Diese Arbeitsanweisungen gelten für alle Mitarbeiter der WBG Zentrum.' }
              }
            ]
          }
        },
        {
          id: 'betriebsvereinbarungen',
          label: 'Betriebsvereinbarungen',
          icon: '📄',
          type: 'document',
          description: 'Gültige Betriebsvereinbarungen',
          tags: ['betriebsvereinbarungen', 'vereinbarungen'],
          content: {
            blocks: [
              {
                type: 'header',
                data: { text: 'Betriebsvereinbarungen', level: 1 }
              },
              {
                type: 'paragraph',
                data: { text: 'Übersicht aller gültigen Betriebsvereinbarungen der WBG Zentrum.' }
              }
            ]
          }
        },
        {
          id: 'datenschutz',
          label: 'Datenschutz',
          icon: '🔒',
          type: 'document',
          description: 'Datenschutzrichtlinien und DSGVO-Compliance',
          tags: ['datenschutz', 'dsgvo', 'privacy'],
          content: {
            blocks: [
              {
                type: 'header',
                data: { text: 'Datenschutz und DSGVO', level: 1 }
              },
              {
                type: 'paragraph',
                data: { text: 'Richtlinien zum Umgang mit personenbezogenen Daten gemäß DSGVO.' }
              },
              {
                type: 'checklist',
                data: {
                  items: [
                    { text: 'Datenschutzerklärung aktualisiert', checked: true },
                    { text: 'Mitarbeiterschulung durchgeführt', checked: true },
                    { text: 'Technische Maßnahmen implementiert', checked: false },
                    { text: 'Verarbeitungsverzeichnis erstellt', checked: true }
                  ]
                }
              }
            ]
          }
        }
      ]
    },
    {
      id: 'prozesse',
      label: 'Prozesse',
      icon: '⚙️',
      type: 'folder',
      expanded: false,
      description: 'Dokumentierte Geschäftsprozesse',
      children: [
        {
          id: 'prozesse-wohnungswirtschaft',
          label: 'Wohnungswirtschaft',
          icon: '🏠',
          type: 'folder',
          description: 'Prozesse rund um Vermietung und Verwaltung',
          children: [
            {
              id: 'mieterwechsel',
              label: 'Mieterwechsel',
              icon: '🔄',
              type: 'process',
              description: 'Kompletter Prozess für Mieterwechsel von Kündigung bis Neuvermietung',
              tags: ['mieterwechsel', 'kündigung', 'vermietung'],
              bpmnXml: '<?xml version="1.0" encoding="UTF-8"?><definitions>...</definitions>'
            },
            {
              id: 'instandhaltung',
              label: 'Instandhaltung',
              icon: '🔧',
              type: 'process',
              description: 'Wartungs- und Reparaturprozesse',
              tags: ['instandhaltung', 'wartung', 'reparatur']
            }
          ]
        },
        {
          id: 'prozesse-verwaltung',
          label: 'Verwaltung',
          icon: '💼',
          type: 'folder',
          description: 'Administrative Prozesse',
          children: [
            {
              id: 'mitgliederaufnahme',
              label: 'Mitgliederaufnahme',
              icon: '👥',
              type: 'process',
              description: 'Prozess der Mitgliederaufnahme',
              tags: ['mitglieder', 'aufnahme', 'beitritt']
            }
          ]
        },
        {
          id: 'prozesse-technik',
          label: 'Technik',
          icon: '🔧',
          type: 'folder',
          description: 'Technische Prozesse',
          children: []
        },
        {
          id: 'prozesse-rechnungswesen',
          label: 'Rechnungswesen',
          icon: '💰',
          type: 'folder',
          description: 'Finanzprozesse und Buchhaltung',
          children: []
        },
        {
          id: 'prozesse-personal',
          label: 'Personal',
          icon: '👥',
          type: 'folder',
          description: 'Personalprozesse',
          children: []
        },
        {
          id: 'prozesse-it',
          label: 'IT',
          icon: '💻',
          type: 'folder',
          description: 'IT-Prozesse und Digitalisierung',
          children: []
        }
      ]
    },
    {
      id: 'mitglieder',
      label: 'Mitgliederbereich',
      icon: '👥',
      type: 'folder',
      expanded: false,
      description: 'Informationen für und über Mitglieder',
      children: [
        {
          id: 'mitgliederversammlung',
          label: 'Mitgliederversammlung',
          icon: '🗳️',
          type: 'document',
          description: 'Informationen zur jährlichen Mitgliederversammlung',
          tags: ['versammlung', 'demokratie', 'beschlüsse'],
          content: {
            blocks: [
              {
                type: 'header',
                data: { text: 'Mitgliederversammlung 2024', level: 1 }
              },
              {
                type: 'paragraph',
                data: { text: 'Die jährliche Mitgliederversammlung ist das höchste Organ unserer Genossenschaft.' }
              }
            ]
          }
        }
      ]
    }
  ]
};
export { INITIAL_DATA };
