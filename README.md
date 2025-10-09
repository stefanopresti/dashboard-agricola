# Dashboard Agricola - Simulatore di Dati Ambientali e Monitoraggio Prestazioni

**Project Work - Università Pegaso**  
**Corso di Laurea in Informatica per Aziende Digitali L-31**
**Stefano Presti**

Un'applicazione web moderna che implementa un **simulatore di dati ambientali e di produzione** con dashboard interattivo per il monitoraggio delle prestazioni aziendali nel settore primario. Il sistema genera dati realistici utilizzando distribuzioni statistiche per riflettere variazioni stagionali e fornisce grafici interattivi per l'analisi di tutti i parametri agricoli.

## 🎯 Obiettivi del Project Work

### Requisiti della Traccia
Il progetto soddisfa i seguenti requisiti specifici del project work:

1. **Simulatore di dati ambientali e di produzione**:
   - Generazione di input di dati randomizzati realistici che simulano diverse condizioni ambientali
   - Simulazione di dati di produzione
   - Motore di simulazione che utilizza distribuzioni statistiche per riflettere variazioni realistiche
   - Fornitura di dati dinamici per l'analisi del dashboard

2. **Dashboard interattivo**:
   - Visualizzazione delle informazioni in modo interattivo
   - Permette agli utenti di esplorare varie metriche (efficienza del raccolto, uso delle risorse, performance)
   - Interfaccia utente con grafici interattivi e indicatori di performance
   - Aggiornamento in tempo reale in risposta ai cambiamenti nei dati simulati

## 🚀 Caratteristiche Implementate

### 📊 Simulatore di Dati Ambientali
- **Generazione Realistica**: Algoritmo basato su distribuzioni statistiche e variazioni stagionali
- **Parametri Ambientali**: Temperatura, umidità aria/terreno, precipitazioni, ore di sole
- **Parametri di Produzione**: Quantità raccolto, qualità prodotto, tempi di crescita
- **Variazioni Stagionali**: Modelli matematici per primavera, estate, autunno, inverno
- **Correlazioni Realistiche**: Interdipendenze tra parametri ambientali e produttivi

### 📈 Dashboard Interattivo
- **Grafici Multi-dimensionali**: Panoramica, raccolto, qualità, terreno, meteo
- **Filtri Dinamici**: Selezione range date e attivazione/disattivazione metriche
- **Statistiche Real-time**: Calcoli automatici su dati filtrati
- **UI Responsive**: Ottimizzata per desktop e mobile
- **Aggiornamento Automatico**: Rigenerazione dati con nuove variazioni

### 🎛️ Funzionalità Avanzate
- **Filtri Temporali**: Selezione range date personalizzato (ottobre-dicembre 2024)
- **Filtri Metriche**: Controllo visibilità parametri specifici
- **Rigenera Dati**: Generazione nuovo dataset con variazioni realistiche
- **Statistiche in Tempo Reale**: Calcoli automatici su dati filtrati

## 🛠️ Tecnologie Utilizzate

- **React 19**: Framework frontend moderno
- **Redux Toolkit**: Gestione stato applicazione centralizzata
- **Recharts**: Libreria grafici interattivi avanzati
- **Tailwind CSS**: Styling moderno e responsive
- **date-fns**: Gestione date e localizzazione italiana
- **Vite**: Build tool veloce per sviluppo

## 📦 Installazione e Avvio

```bash
# Clona il repository
git clone <repository-url>
cd dashboard-agricola

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

L'applicazione sarà disponibile su `https://agricoladash.netlify.app`

## 🎯 Utilizzo del Dashboard

### Navigazione per Tab
1. **📊 Panoramica**: Visualizza tutte le metriche principali in un grafico multi-linea
2. **🌾 Raccolto**: Analisi produzione con area chart e statistiche cumulative
3. **⭐ Qualità**: Monitoraggio qualità con line chart e livelli di riferimento
4. **🌱 Terreno**: Parametri chimici del suolo (pH, azoto, fosforo, potassio)
5. **🌤️ Meteo**: Condizioni meteorologiche con composed chart (linee + barre)

### Controlli Interattivi
- **Range Date**: Seleziona periodo di analisi (ottobre-dicembre 2024)
- **Filtri Metriche**: Attiva/disattiva parametri specifici per ogni grafico

### Statistiche Principali
- **Temperatura**: Media e attuale con variazioni stagionali
- **Umidità**: Aria e terreno con fluttuazioni realistiche
- **Raccolto**: Totale e giornaliero con progressione temporale
- **Qualità**: Media del prodotto con classificazione automatica

## 📊 Struttura Dati Simulati

### Algoritmo di Generazione
Il simulatore utilizza un motore di simulazione avanzato che:

- **Genera 90 giorni** di dati (ottobre-dicembre 2024)
- **Applica variazioni stagionali** basate su modelli matematici
- **Utilizza distribuzioni statistiche** per randomizzazione realistica
- **Implementa correlazioni** tra parametri ambientali e produttivi
- **Simula progressione temporale** per raccolto e crescita colture

### Parametri Generati
```javascript
{
  date: "2024-10-01",
  temperature: 16.5,      // °C (varia con stagione)
  humidity: 65.2,         // % (40-85%)
  soilHumidity: 38.1,     // % (25-45%)
  harvest: 0,             // kg/ha (progressione temporale)
  quality: 7.8,           // 1-10 (migliore in autunno)
  ph: 6.5,                // pH terreno (5.5-7.5)
  nitrogen: 28.3,         // mg/kg (varia stagionalmente)
  phosphorus: 22.1,       // mg/kg (varia stagionalmente)
  potassium: 195.6,       // mg/kg (varia stagionalmente)
  sunHours: 8.2,          // ore (0-12, stagionale)
  rainfall: 0             // mm (più frequente autunno/primavera)
}
```

### Modelli Stagionali Implementati
- **Primavera** (marzo-maggio): Temperature moderate, umidità variabile
- **Estate** (giugno-agosto): Temperature elevate, ore di sole massime
- **Autunno** (settembre-novembre): Periodo raccolto, precipitazioni frequenti
- **Inverno** (dicembre-febbraio): Temperature basse, ore di sole minime

## 🎨 Design e UX

### Stile Clean Moderno
- **Interfaccia Moderna**: Design pulito e professionale
- **Colori Semantici**: Codifica colore per tipologia dati
- **Responsive Design**: Ottimizzato per mobile e desktop
- **Animazioni Fluide**: Transizioni e hover effects
- **Accessibilità**: Contrasti e focus states ottimizzati

### Componenti UI
- **Card di Riepilogo**: Statistiche principali in tempo reale
- **Tabs Interattivi**: Navigazione tra diverse visualizzazioni
- **Filtri Dinamici**: Controlli per personalizzazione vista
- **Grafici Interattivi**: Tooltip, zoom, pan su tutti i grafici

## 🔧 Architettura del Progetto

### Struttura File
```
src/
├── components/
│   └── dashboard/
│       ├── Dashboard.jsx          # Componente principale
│       ├── MetricsChart.jsx       # Grafico metriche generali
│       ├── HarvestChart.jsx       # Grafico raccolto
│       ├── QualityChart.jsx       # Grafico qualità
│       ├── SoilChart.jsx          # Grafico parametri terreno
│       ├── WeatherChart.jsx       # Grafico meteo
│       ├── DateRangeFilter.jsx    # Filtro range date
│       └── SummaryCards.jsx       # Card riepilogo statistiche
├── redux/
│   ├── agriculturalSlice.js       # Slice dati agricoli e simulatore
│   └── store.js                   # Configurazione Redux
└── App.jsx                        # Componente root
```

### Flusso Dati
1. **Simulatore** (`agriculturalSlice.js`): Genera dati realistici
2. **Redux Store**: Gestisce stato applicazione
3. **Componenti**: Consumano dati e renderizzano grafici
4. **Filtri**: Modificano visualizzazione in tempo reale

### Comandi Disponibili
```bash
npm run dev      # Server sviluppo
npm run build    # Build produzione
npm run preview  # Preview build
npm run lint     # Linting
```

## 📈 Implementazione Project Work

### Simulatore di Dati Ambientali ✅
- **✅ Generazione randomizzata**: Algoritmo basato su distribuzioni statistiche
- **✅ Condizioni ambientali**: Temperatura, umidità, precipitazioni, ore sole
- **✅ Dati di produzione**: Quantità raccolto, qualità, tempi crescita
- **✅ Variazioni realistiche**: Modelli stagionali e correlazioni
- **✅ Motore di simulazione**: Distribuzioni statistiche per variabilità naturale

### Dashboard Interattivo ✅
- **✅ Visualizzazione interattiva**: Grafici multi-dimensionali
- **✅ Esplorazione metriche**: Efficienza raccolto, uso risorse, performance
- **✅ Grafici interattivi**: Tooltip, zoom, filtri dinamici
- **✅ Indicatori performance**: Statistiche real-time
- **✅ Aggiornamento tempo reale**: Risposta ai cambiamenti dati simulati

## 🎓 Contesto Universitario

**Università**: Università Pegaso  
**Corso**: Informatica per Aziende Digitali L-31  
**Tipo**: Project Work  
**Anno**: 2024/2025  

Il progetto dimostra competenze in:
- Sviluppo frontend con React
- Gestione stato applicazione (Redux)
- Visualizzazione dati (Recharts)
- Simulazione e modellazione dati
- Design UI/UX moderno
- Programmazione JavaScript/JSX

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.