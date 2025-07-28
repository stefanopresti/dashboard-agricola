# Dashboard Agricola - Monitoraggio Prestazioni Aziendali

Un'applicazione web moderna per il monitoraggio delle prestazioni aziendali nel settore primario. L'app genera dati realistici per 90 giorni (ottobre-dicembre 2024) e fornisce grafici interattivi per l'analisi di tutti i parametri agricoli.

## 🚀 Caratteristiche

### 📊 Metriche Monitorate
- **Temperatura**: Range 8-25°C con variazioni stagionali
- **Umidità Aria**: 40-85% con fluttuazioni realistiche
- **Umidità Terreno**: 25-45% per monitoraggio irrigazione
- **Raccolto**: Quantità in kg/ha con progressione temporale
- **Qualità**: Punteggio 1-10 con classificazione automatica
- **pH Terreno**: 5.5-7.5 per analisi suolo
- **Nutrienti**: Azoto, Fosforo, Potassio (mg/kg)
- **Meteo**: Ore di sole e precipitazioni

### 📈 Grafici Interattivi
- **Panoramica**: Grafico multi-linea per confronto metriche
- **Raccolto**: Area chart con statistiche cumulative
- **Qualità**: Line chart con livelli di riferimento
- **Terreno**: Multi-linea per parametri chimici
- **Meteo**: Composed chart (linee + barre)

### 🎛️ Funzionalità Avanzate
- **Filtri Temporali**: Selezione range date personalizzato
- **Filtri Metriche**: Attivazione/disattivazione parametri
- **Statistiche in Tempo Reale**: Calcoli automatici
- **Dati Realistici**: Generazione con variazioni stagionali
- **UI Responsive**: Ottimizzata per tutti i dispositivi

## 🛠️ Tecnologie Utilizzate

- **React 19**: Framework frontend
- **Redux Toolkit**: Gestione stato applicazione
- **Recharts**: Libreria grafici interattivi
- **Tailwind CSS**: Styling moderno e responsive
- **date-fns**: Gestione date e localizzazione
- **Vite**: Build tool veloce

## 📦 Installazione

```bash
# Clona il repository
git clone <repository-url>
cd mammarancia-dashboard

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

## 🎯 Utilizzo

### Navigazione Dashboard
1. **Panoramica**: Visualizza tutte le metriche principali
2. **Raccolto**: Analisi produzione e statistiche
3. **Qualità**: Monitoraggio qualità con classificazione
4. **Terreno**: Parametri chimici del suolo
5. **Meteo**: Condizioni meteorologiche

### Filtri e Controlli
- **Range Date**: Seleziona periodo di analisi
- **Metriche**: Attiva/disattiva parametri specifici
- **Rigenera Dati**: Genera nuovo dataset realistico

### Statistiche Principali
- Temperatura media e attuale
- Umidità aria e terreno
- Raccolto totale e giornaliero
- Qualità media del prodotto

## 📊 Struttura Dati

I dati vengono generati automaticamente con:
- **90 giorni** di dati (ottobre-dicembre 2024)
- **Variazioni stagionali** realistiche
- **Correlazioni** tra parametri
- **Randomizzazione** per variabilità naturale

### Parametri Generati
```javascript
{
  date: "2024-10-01",
  temperature: 16.5,      // °C
  humidity: 65.2,         // %
  soilHumidity: 38.1,     // %
  harvest: 0,             // kg/ha
  quality: 7.8,           // 1-10
  ph: 6.5,                // pH terreno
  nitrogen: 28.3,         // mg/kg
  phosphorus: 22.1,       // mg/kg
  potassium: 195.6,       // mg/kg
  sunHours: 8.2,          // ore
  rainfall: 0             // mm
}
```

## 🎨 Design e UX

- **Interfaccia Moderna**: Design pulito e professionale
- **Colori Semantici**: Codifica colore per tipologia dati
- **Responsive Design**: Ottimizzato per mobile e desktop
- **Animazioni Fluide**: Transizioni e hover effects
- **Accessibilità**: Contrasti e focus states ottimizzati

## 🔧 Sviluppo

### Struttura Progetto
```
src/
├── components/
│   └── dashboard/
│       ├── Dashboard.jsx      # Componente principale
│       ├── MetricsChart.jsx   # Grafico metriche
│       ├── HarvestChart.jsx   # Grafico raccolto
│       ├── QualityChart.jsx   # Grafico qualità
│       ├── SoilChart.jsx      # Grafico terreno
│       ├── WeatherChart.jsx   # Grafico meteo
│       ├── FiltersPanel.jsx   # Pannello filtri
│       └── SummaryCards.jsx   # Card riepilogo
├── redux/
│   ├── agriculturalSlice.js   # Slice dati agricoli
│   └── store.js              # Configurazione Redux
└── App.jsx                   # Componente root
```

### Comandi Disponibili
```bash
npm run dev      # Server sviluppo
npm run build    # Build produzione
npm run preview  # Preview build
npm run lint     # Linting
```

## 📈 Roadmap

- [ ] Export dati in CSV/Excel
- [ ] Notifiche per soglie critiche
- [ ] Integrazione API reali
- [ ] Dashboard multi-azienda
- [ ] Modelli predittivi ML
- [ ] App mobile nativa

## 🤝 Contributi

Le pull request sono benvenute! Per modifiche importanti, apri prima una issue per discutere cosa vorresti cambiare.

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

---

**Dashboard Agricola** - Monitoraggio intelligente per l'agricoltura moderna 🌱
