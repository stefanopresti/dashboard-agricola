/**
 * Componente MetricsChart
 * 
 * Grafico lineare multi-metrica che visualizza diverse metriche agricole
 * nello stesso grafico. Permette di attivare/disattivare singole metriche
 * tramite checkboxes.
 */

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilters } from '../../redux/agriculturalSlice';

/**
 * MetricsChart Component
 * 
 * @param {Array} data - Array di dati giornalieri da visualizzare
 * 
 * Visualizza simultaneamente fino a 5 metriche diverse:
 * - Temperatura (°C)
 * - Umidità aria (%)
 * - Umidità terreno (%)
 * - Raccolto (kg/ha)
 * - Qualità (1-10)
 * 
 * Include:
 * - Sistema di filtri per mostrare/nascondere singole metriche
 * - Tooltip personalizzato con dettagli al passaggio del mouse
 * - Legenda interattiva
 * - Design responsive
 */
const MetricsChart = ({ data }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.agricultural);

  /**
   * Configurazione delle metriche disponibili
   * Ogni metrica ha nome, colore, unità di misura e chiave del filtro
   */
  const metricConfigs = {
    temperature: {
      name: 'Temperatura (°C)',
      color: '#ef4444',
      unit: '°C',
      filterKey: 'showTemperature'
    },
    humidity: {
      name: 'Umidità Aria (%)',
      color: '#3b82f6',
      unit: '%',
      filterKey: 'showHumidity'
    },
    soilHumidity: {
      name: 'Umidità Terreno (%)',
      color: '#8b5cf6',
      unit: '%',
      filterKey: 'showSoilHumidity'
    },
    harvest: {
      name: 'Raccolto (kg/ha)',
      color: '#f59e0b',
      unit: 'kg/ha',
      filterKey: 'showHarvest'
    },
    quality: {
      name: 'Qualità (1-10)',
      color: '#10b981',
      unit: '',
      filterKey: 'showQuality'
    }
  };

  /**
   * Filtra le metriche basandosi sui filtri attivi nello store Redux
   */
  const activeMetrics = Object.entries(metricConfigs).filter(([key, config]) => 
    filters[config.filterKey]
  );

  /**
   * Gestisce il toggle di una metrica (mostra/nascondi)
   * @param {string} filterKey - Chiave del filtro da modificare
   */
  const handleFilterToggle = (filterKey) => {
    dispatch(updateFilters({
      [filterKey]: !filters[filterKey]
    }));
  };

  /**
   * Tooltip personalizzato per visualizzare i dettagli al passaggio del mouse
   */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-lg">
          <p className="font-bold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: {entry.value} {metricConfigs[entry.dataKey]?.unit}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-12">
      {/* Header con titolo e contatore metriche attive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <h3 className="text-4xl font-bold text-gray-900">
          📊 Metriche Principali
        </h3>
        <div className="text-xl font-bold text-emerald-600 bg-emerald-50 px-6 py-3 rounded-2xl border-2 border-emerald-200 shadow-md">
          {activeMetrics.length} metriche attive
        </div>
      </div>

      {/* Pannello filtri per selezionare le metriche da visualizzare */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 border-2 border-gray-200 shadow-lg">
        <h4 className="text-2xl font-bold text-gray-900 mb-8">
          🎯 Seleziona Metriche
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {Object.entries(metricConfigs).map(([key, config]) => (
            <label key={key} className="flex items-center gap-4 cursor-pointer group p-4 rounded-xl hover:bg-gray-100 transition-all duration-200">
              <input
                type="checkbox"
                checked={filters[config.filterKey]}
                onChange={() => handleFilterToggle(config.filterKey)}
                className="w-6 h-6 text-emerald-600 border-gray-300 rounded-lg focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-lg font-semibold text-gray-700 group-hover:text-gray-900">{config.name}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Container del grafico */}
      <div className="h-[600px] bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-lg">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {/* Griglia di sfondo */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            
            {/* Asse X - Date */}
            <XAxis 
              dataKey="dateFormatted" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              interval="preserveStartEnd"
            />
            
            {/* Asse Y - Valori */}
            <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
            
            {/* Tooltip personalizzato */}
            <Tooltip content={<CustomTooltip />} />
            
            {/* Legenda */}
            <Legend />
            
            {/* Linee per ogni metrica attiva */}
            {activeMetrics.map(([metricKey, config]) => (
              <Line
                key={metricKey}
                type="monotone"
                dataKey={metricKey}
                stroke={config.color}
                strokeWidth={2}
                dot={{ r: 3, fill: config.color }}
                activeDot={{ r: 6, fill: config.color }}
                name={config.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricsChart; 