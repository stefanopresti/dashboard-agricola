import { createSlice } from '@reduxjs/toolkit';
import { format, addDays, differenceInDays } from 'date-fns';
import { it } from 'date-fns/locale';

// Funzione per generare dati realistici per l'agricoltura
const generateAgriculturalData = (startDate, endDate) => {
  const data = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = differenceInDays(end, start) + 1;
  
  for (let i = 0; i < totalDays; i++) {
    const currentDate = addDays(start, i);
    const dayOfYear = i;
    
    // Variazioni stagionali realistiche basate sulla data
    const month = currentDate.getMonth(); // 0-11
    const seasonalFactor = Math.sin((month / 11) * Math.PI) * 0.3 + 0.7;
    const temperatureVariation = Math.sin((dayOfYear / totalDays) * Math.PI * 2) * 5;
    
    // Umidità aria (40-85%) - varia con la stagione
    const baseHumidity = 60 + Math.sin((month / 11) * Math.PI) * 15;
    const humidity = Math.max(40, Math.min(85, baseHumidity + (Math.random() - 0.5) * 20));
    
    // Umidità terreno (25-45%) - più stabile
    const baseSoilHumidity = 35 + Math.sin((month / 11) * Math.PI) * 8;
    const soilHumidity = Math.max(25, Math.min(45, baseSoilHumidity + (Math.random() - 0.5) * 10));
    
    // Temperatura (varia molto con la stagione)
    let baseTemperature;
    if (month >= 2 && month <= 4) { // Primavera
      baseTemperature = 15 + Math.sin((dayOfYear / totalDays) * Math.PI) * 8;
    } else if (month >= 5 && month <= 7) { // Estate
      baseTemperature = 25 + Math.sin((dayOfYear / totalDays) * Math.PI) * 5;
    } else if (month >= 8 && month <= 10) { // Autunno
      baseTemperature = 18 + Math.sin((dayOfYear / totalDays) * Math.PI) * 7;
    } else { // Inverno
      baseTemperature = 8 + Math.sin((dayOfYear / totalDays) * Math.PI) * 6;
    }
    const temperature = Math.max(-5, Math.min(35, baseTemperature + temperatureVariation + (Math.random() - 0.5) * 6));
    
    // Quantità raccolto (kg/ha) - dipende dalla stagione
    let harvest = 0;
    if (month >= 8 && month <= 11) { // Autunno - periodo di raccolta
      // Calcola il progresso del raccolto in modo più realistico
      // Inizia con raccolto basso e aumenta gradualmente
      const harvestStart = totalDays * 0.1; // Inizia al 10% del periodo
      const harvestPeak = totalDays * 0.6; // Picco al 60% del periodo
      const harvestEnd = totalDays * 0.9; // Finisce al 90% del periodo
      
      let harvestProgress = 0;
      if (dayOfYear >= harvestStart && dayOfYear <= harvestPeak) {
        // Fase di crescita: da 0 a 1
        harvestProgress = (dayOfYear - harvestStart) / (harvestPeak - harvestStart);
      } else if (dayOfYear > harvestPeak && dayOfYear <= harvestEnd) {
        // Fase di raccolta: rimane alto con variazioni
        harvestProgress = 0.8 + (Math.random() - 0.5) * 0.4;
      }
      
      const baseHarvest = harvestProgress * 8000;
      harvest = Math.max(0, baseHarvest + (Math.random() - 0.5) * 500);
    }
    
    // Qualità raccolto (1-10) - migliore in autunno
    const baseQuality = 7 + seasonalFactor * 2;
    const quality = Math.max(1, Math.min(10, baseQuality + (Math.random() - 0.5) * 2));
    
    // pH terreno (5.5-7.5) - relativamente stabile
    const basePH = 6.5 + (Math.random() - 0.5) * 0.5;
    const ph = Math.max(5.5, Math.min(7.5, basePH + (Math.random() - 0.5) * 0.3));
    
    // Azoto terreno (mg/kg) - varia con la stagione
    const baseNitrogen = 25 + seasonalFactor * 10;
    const nitrogen = Math.max(15, Math.min(40, baseNitrogen + (Math.random() - 0.5) * 8));
    
    // Fosforo terreno (mg/kg) - varia con la stagione
    const basePhosphorus = 20 + seasonalFactor * 8;
    const phosphorus = Math.max(12, Math.min(35, basePhosphorus + (Math.random() - 0.5) * 6));
    
    // Potassio terreno (mg/kg) - varia con la stagione
    const basePotassium = 180 + seasonalFactor * 40;
    const potassium = Math.max(150, Math.min(250, basePotassium + (Math.random() - 0.5) * 30));
    
    // Ore di sole (0-12) - varia molto con la stagione
    let baseSunHours;
    if (month >= 5 && month <= 7) { // Estate
      baseSunHours = 10 + Math.sin((dayOfYear / totalDays) * Math.PI) * 2;
    } else if (month >= 11 || month <= 1) { // Inverno
      baseSunHours = 4 + Math.sin((dayOfYear / totalDays) * Math.PI) * 2;
    } else { // Primavera/Autunno
      baseSunHours = 7 + Math.sin((dayOfYear / totalDays) * Math.PI) * 3;
    }
    const sunHours = Math.max(0, Math.min(12, baseSunHours + (Math.random() - 0.5) * 3));
    
    // Precipitazioni (mm) - più frequenti in autunno/primavera
    let baseRainfall;
    if (month >= 9 && month <= 11) { // Autunno
      baseRainfall = Math.random() < 0.4 ? (Math.random() * 20) : 0;
    } else if (month >= 3 && month <= 5) { // Primavera
      baseRainfall = Math.random() < 0.35 ? (Math.random() * 15) : 0;
    } else {
      baseRainfall = Math.random() < 0.25 ? (Math.random() * 10) : 0;
    }
    const rainfall = Math.max(0, baseRainfall + (Math.random() - 0.5) * 5);
    
    data.push({
      date: format(currentDate, 'yyyy-MM-dd'),
      dateFormatted: format(currentDate, 'dd MMM yyyy', { locale: it }),
      humidity: Math.round(humidity * 10) / 10,
      soilHumidity: Math.round(soilHumidity * 10) / 10,
      temperature: Math.round(temperature * 10) / 10,
      harvest: Math.round(harvest),
      quality: Math.round(quality * 10) / 10,
      ph: Math.round(ph * 10) / 10,
      nitrogen: Math.round(nitrogen * 10) / 10,
      phosphorus: Math.round(phosphorus * 10) / 10,
      potassium: Math.round(potassium * 10) / 10,
      sunHours: Math.round(sunHours * 10) / 10,
      rainfall: Math.round(rainfall * 10) / 10
    });
  }
  
  return data;
};

const initialState = {
  data: generateAgriculturalData('2024-10-01', '2024-12-31'),
  dateRange: {
    start: '2024-10-01',
    end: '2024-12-31'
  },
  filters: {
    showTemperature: true,
    showHumidity: true,
    showSoilHumidity: true,
    showHarvest: true,
    showQuality: true,
    showPH: true,
    showNitrogen: true,
    showPhosphorus: true,
    showPotassium: true,
    showSunHours: true,
    showRainfall: true
  }
};

const agriculturalSlice = createSlice({
  name: 'agricultural',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
      // Genera automaticamente i dati quando cambiano le date
      state.data = generateAgriculturalData(state.dateRange.start, state.dateRange.end);
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    generateData: (state) => {
      state.data = generateAgriculturalData(state.dateRange.start, state.dateRange.end);
    }
  }
});

export const { setDateRange, updateFilters, generateData } = agriculturalSlice.actions;
export default agriculturalSlice.reducer; 