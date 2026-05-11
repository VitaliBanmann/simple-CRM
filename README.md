# 📊 Simple CRM - Customer Relationship Management

> Ein schlankes CRM-System mit Angular. Verwalte Kundenbeziehungen, tracke Kontakte und behalte den Überblick über deine Verkaufs-Pipeline.

## 🎯 Features

- ✅ **Kundenverwaltung** - Zentrale Kundendatenbank
- ✅ **Kontakt-Tracking** - Kommunikationsverlauf pro Kunde
- ✅ **Verkaufs-Pipeline** - Deals und Status-Verwaltung
- ✅ **Task-Management** - Aufgaben & Erinnerungen
- ✅ **Dashboard** - Übersicht & Statistiken
- ✅ **Benutzer-Rollen** - Unterschiedliche Zugriffsebenen
- ✅ **Responsive Design** - Mobil & Desktop optimiert
- ✅ **Export-Funktion** - Daten exportieren

## 🔧 Tech Stack

- **Frontend:** Angular 17+
- **Language:** TypeScript
- **Backend:** Firebase/Firestore
- **Authentifizierung:** Firebase Auth
- **Styling:** SCSS/CSS3
- **Charts:** Angular Charts

## 🚀 Quick Start

```bash
# Dependencies installieren
npm install

# Development-Server starten
npm start

# Im Browser öffnen
# http://localhost:4200
```

## 📖 Verwendung

### 1. Anmeldung
- Account erstellen oder einloggen
- Zur Dashboard-Übersicht navigieren

### 2. Kunden verwalten
- Neue Kunden über "+ Hinzufügen" erfassen
- Kontaktdaten, Notizen und Status pflegen
- Kommunikationsverlauf eintragen

### 3. Verkaufs-Pipeline
- Deals in verschiedene Phasen einteilen:
  - 🔵 Lead
  - 🟡 Qualifiziert
  - 🟠 Angebot gesendet
  - ✅ Gewonnen / ❌ Verloren
- Wahrscheinlichkeit und Wert erfassen

### 4. Aufgaben
- Tasks Kunden oder Deals zuordnen
- Fälligkeitsdaten & Prioritäten setzen
- Erledigte Tasks abhaken

## 🔨 Verfügbare Befehle

```bash
npm start              # Dev-Server (http://localhost:4200)
npm run build         # Production Build
npm test              # Unit Tests
npm run lint          # Linting
```

## 📁 Projektstruktur

```
src/app/
├── components/
│   ├── dashboard/       # Übersichts-Dashboard
│   ├── customers/       # Kundenverwaltung
│   ├── deals/          # Deal-Management
│   ├── tasks/          # Task-Übersicht
│   └── reports/        # Reporting
├── services/
│   ├── customer.service.ts
│   ├── deal.service.ts
│   └── firebase.service.ts
├── models/
│   ├── customer.model.ts
│   └── deal.model.ts
└── shared/
    ├── components/
    └── guards/
```

## 🔐 Firebase Konfiguration

Firestore Collections:
```
customers/   → Kundendaten
deals/       → Verkaufs-Opportunities
tasks/       → Aufgaben
contacts/    → Kommunikationsverlauf
```

1. Firebase Projekt in der [Firebase Console](https://console.firebase.google.com) erstellen
2. Firestore Database aktivieren
3. Authentication (Email/Password) aktivieren
4. Config in `src/environments/environment.ts` eintragen

## 🚢 Deployment

```bash
# Production Build
npm run build

# Deploy mit Firebase Hosting
firebase deploy
```

## 📞 Support

Bei Fragen oder Issues: [GitHub Issues](https://github.com/VitaliBanmann/simple-CRM/issues)

---

_Ein schlankes Angular-CRM für effizientes Kundenmanagement._