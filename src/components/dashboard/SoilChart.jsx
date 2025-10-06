/**
 * Componente SoilChart
 * 
 * Grafico lineare multi-metrica per visualizzare i parametri del terreno.
 * Permette di monitorare pH, azoto (N), fosforo (P) e potassio (K) nel tempo.
 */

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilters } from '../../redux/agriculturalSlice';

/**
 * SoilChart Component
 * 
 * @param {Array} data - Array di dati giornalieri con parametri del terreno
 * 
 * Visualizza 4 parametri fondamentali del terreno:
 * - pH (5.5-7.5): Acidità/basicità del terreno
 * - Azoto/N (mg/kg): Nutriente primario per crescita vegetativa
 * - Fosforo/P (mg/kg): Nutriente per radici e fioritura
 * - Potassio/K (mg/kg): Nutriente per frutti e resistenza
 * 
 * Caratteristiche:
 * - Filtri checkbox per mostrare/nascondere singoli parametri
 * - Statistiche aggregate (media e range) per ogni parametro
 * - Tooltip personalizzato
 * - Colori distintivi per ogni nutriente
 */
const SoilChart = ({ data }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.agricultural);

  /**
   * Configurazione dei parametri del terreno
   * Ogni parametro ha chiave dati, nome, colore e filtro associato
   */
  const soilMetrics = [
    {
      key: 'ph',
      name: 'pH',
      color: '#8b5cf6',
      filterKey: 'showPH'
    },
    {
      key: 'nitrogen',
      name: 'Azoto (mg/kg)',
      color: '#3b82f6',
      filterKey: 'showNitrogen'
    },
    {
      key: 'phosphorus',
      name: 'Fosforo (mg/kg)',
      color: '#f59e0b',
      filterKey: 'showPhosphorus'
    },
    {
      key: 'potassium',
      name: 'Potassio (mg/kg)',
      color: '#10b981',
      filterKey: 'showPotassium'
    }
  ];

  /**
   * Filtra i parametri basandosi sui filtri attivi
   */
  const activeMetrics = soilMetrics.filter(metric => filters[metric.filterKey]);

  /**
   * Gestisce il toggle dei filtri per mostrare/nascondere parametri
   */
  const handleFilterToggle = (filterKey) => {
    dispatch(updateFilters({
      [filterKey]: !filters[filterKey]
    }));
  };

  /**
   * Tooltip personalizzato per mostrare i valori dei parametri
   */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-lg">
          <p className="font-bold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Calcola medie per ogni parametro
  const avgPH = data.reduce((sum, item) => sum + item.ph, 0) / data.length;
  const avgNitrogen = data.reduce((sum, item) => sum + item.nitrogen, 0) / data.length;
  const avgPhosphorus = data.reduce((sum, item) => sum + item.phosphorus, 0) / data.length;
  const avgPotassium = data.reduce((sum, item) => sum + item.potassium, 0) / data.length;

  return (
    <div className="space-y-8">
      {/* Header con titolo e contatore parametri attivi */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-3xl font-bold text-gray-900">
          Parametri del Terreno
        </h3>
        <div className="text-base font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
          {activeMetrics.length} parametri attivi
        </div>
      </div>

      {/* Pannello filtri per selezionare i parametri da visualizzare */}
      <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
        <h4 className="text-base font-bold text-gray-900 mb-4">
          Seleziona Parametri
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {soilMetrics.map((metric) => (
            <label key={metric.key} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters[metric.filterKey]}
                onChange={() => handleFilterToggle(metric.filterKey)}
                className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{metric.name}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Grafico lineare dei parametri del terreno */}
      <div className="h-[500px]">
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
            
            {/* Linee per ogni parametro attivo */}
            {activeMetrics.map(metric => (
              <Line
                key={metric.key}
                type="monotone"
                dataKey={metric.key}
                stroke={metric.color}
                strokeWidth={2}
                dot={{ r: 3, fill: metric.color }}
                activeDot={{ r: 6, fill: metric.color }}
                name={metric.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Grid con statistiche per ogni parametro attivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card pH Terreno */}
        {filters.showPH && (
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border-2 border-purple-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="text-sm font-bold text-purple-700 uppercase tracking-wide mb-3">
              pH Terreno
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {Math.round(avgPH * 10) / 10}
            </div>
            <div className="text-xs text-gray-600">
              Range: {Math.min(...data.map(item => item.ph)).toFixed(1)} - {Math.max(...data.map(item => item.ph)).toFixed(1)}
            </div>
          </div>
        )}
        
        {/* Card Azoto */}
        {filters.showNitrogen && (
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-3">
              Azoto
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {Math.round(avgNitrogen * 10) / 10} <span className="text-lg text-gray-600">mg/kg</span>
            </div>
            <div className="text-xs text-gray-600">
              Range: {Math.min(...data.map(item => item.nitrogen)).toFixed(1)} - {Math.max(...data.map(item => item.nitrogen)).toFixed(1)}
            </div>
          </div>
        )}
        
        {/* Card Fosforo */}
        {filters.showPhosphorus && (
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border-2 border-amber-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-3">
              Fosforo
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {Math.round(avgPhosphorus * 10) / 10} <span className="text-lg text-gray-600">mg/kg</span>
            </div>
            <div className="text-xs text-gray-600">
              Range: {Math.min(...data.map(item => item.phosphorus)).toFixed(1)} - {Math.max(...data.map(item => item.phosphorus)).toFixed(1)}
            </div>
          </div>
        )}
        
        {/* Card Potassio */}
        {filters.showPotassium && (
          <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-6 border-2 border-emerald-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-3">
              Potassio
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {Math.round(avgPotassium * 10) / 10} <span className="text-lg text-gray-600">mg/kg</span>
            </div>
            <div className="text-xs text-gray-600">
              Range: {Math.min(...data.map(item => item.potassium)).toFixed(1)} - {Math.max(...data.map(item => item.potassium)).toFixed(1)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilChart; 