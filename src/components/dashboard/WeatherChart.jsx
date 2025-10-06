/**
 * Componente WeatherChart
 * 
 * Grafico combinato (linee + barre) per visualizzare i dati meteorologici.
 * Mostra temperatura, ore di sole e precipitazioni su due assi Y distinti.
 */

import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilters } from '../../redux/agriculturalSlice';

/**
 * WeatherChart Component
 * 
 * @param {Array} data - Array di dati giornalieri con parametri meteo
 * 
 * Visualizza 3 parametri meteorologici:
 * - Temperatura (°C): Linea su asse Y sinistro
 * - Ore di sole: Barra su asse Y destro
 * - Precipitazioni (mm): Barra su asse Y destro
 * 
 * Caratteristiche:
 * - Grafico combinato con linee e barre
 * - Due assi Y per scale diverse
 * - Filtri checkbox per mostrare/nascondere parametri
 * - Statistiche aggregate (media temperatura, ore sole totali, giorni piovosi)
 * - Tooltip personalizzato
 */
const WeatherChart = ({ data }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.agricultural);

  /**
   * Configurazione dei parametri meteorologici
   * Specifica tipo di grafico (line/bar), colore e filtro per ogni metrica
   */
  const weatherMetrics = [
    {
      key: 'temperature',
      name: 'Temperatura (°C)',
      type: 'line',
      color: '#ef4444',
      filterKey: 'showTemperature'
    },
    {
      key: 'sunHours',
      name: 'Ore di sole',
      type: 'bar',
      color: '#f59e0b',
      filterKey: 'showSunHours'
    },
    {
      key: 'rainfall',
      name: 'Precipitazioni (mm)',
      type: 'bar',
      color: '#3b82f6',
      filterKey: 'showRainfall'
    }
  ];

  /**
   * Filtra i parametri basandosi sui filtri attivi
   */
  const activeMetrics = weatherMetrics.filter(metric => filters[metric.filterKey]);

  /**
   * Gestisce il toggle dei filtri per mostrare/nascondere parametri
   */
  const handleFilterToggle = (filterKey) => {
    dispatch(updateFilters({
      [filterKey]: !filters[filterKey]
    }));
  };

  /**
   * Tooltip personalizzato che mostra i dettagli meteo con unità di misura corrette
   */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-lg">
          <p className="font-bold text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: {entry.value} {entry.dataKey === 'sunHours' ? 'ore' : entry.dataKey === 'rainfall' ? 'mm' : '°C'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Calcolo statistiche meteorologiche
  const avgTemperature = data.reduce((sum, item) => sum + item.temperature, 0) / data.length;
  const avgSunHours = data.reduce((sum, item) => sum + item.sunHours, 0) / data.length;
  const totalRainfall = data.reduce((sum, item) => sum + item.rainfall, 0);
  const rainyDays = data.filter(item => item.rainfall > 0).length;

  return (
    <div className="space-y-8">
      {/* Header con titolo e contatore parametri attivi */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-3xl font-bold text-gray-900">
          Condizioni Meteorologiche
        </h3>
        <div className="text-base font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
          {activeMetrics.length} parametri attivi
        </div>
      </div>

      {/* Pannello filtri per selezionare i parametri da visualizzare */}
      <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
        <h4 className="text-base font-bold text-gray-900 mb-4">
          Seleziona Parametri Meteo
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {weatherMetrics.map((metric) => (
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
      
      {/* Grafico combinato con linee e barre */}
      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {/* Griglia di sfondo */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            
            {/* Asse X - Date */}
            <XAxis 
              dataKey="dateFormatted" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              interval="preserveStartEnd"
            />
            
            {/* Asse Y sinistro - Temperatura */}
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
            />
            
            {/* Asse Y destro - Ore di sole / Precipitazioni */}
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              label={{ value: 'Ore di sole / Precipitazioni', angle: 90, position: 'insideRight', style: { fill: '#6b7280' } }}
            />
            
            {/* Tooltip personalizzato */}
            <Tooltip content={<CustomTooltip />} />
            
            {/* Legenda */}
            <Legend />
            
            {/* Renderizza linee o barre in base al tipo di metrica */}
            {activeMetrics.map(metric => {
              if (metric.type === 'line') {
                return (
                  <Line
                    key={metric.key}
                    yAxisId="left"
                    type="monotone"
                    dataKey={metric.key}
                    stroke={metric.color}
                    strokeWidth={2}
                    dot={{ r: 3, fill: metric.color }}
                    activeDot={{ r: 6, fill: metric.color }}
                    name={metric.name}
                  />
                );
              } else {
                return (
                  <Bar
                    key={metric.key}
                    yAxisId="right"
                    dataKey={metric.key}
                    fill={metric.color}
                    name={metric.name}
                  />
                );
              }
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      {/* Grid con statistiche meteorologiche */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card Temperatura */}
        {filters.showTemperature && (
          <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 border-2 border-red-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="text-sm font-bold text-red-700 uppercase tracking-wide mb-3">
              Temperatura
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {Math.round(avgTemperature * 10) / 10}°C
            </div>
            <div className="text-xs text-gray-600">
              Range: {Math.min(...data.map(item => item.temperature)).toFixed(1)}°C - {Math.max(...data.map(item => item.temperature)).toFixed(1)}°C
            </div>
          </div>
        )}
        
        {/* Card Ore di Sole */}
        {filters.showSunHours && (
          <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border-2 border-amber-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-3">
              Ore di Sole
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {Math.round(avgSunHours * 10) / 10} <span className="text-lg text-gray-600">ore/giorno</span>
            </div>
            <div className="text-xs text-gray-600">
              Totale: {Math.round(data.reduce((sum, item) => sum + item.sunHours, 0))} ore
            </div>
          </div>
        )}
        
        {/* Card Precipitazioni Totali */}
        {filters.showRainfall && (
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-3">
              Precipitazioni
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {Math.round(totalRainfall * 10) / 10} <span className="text-lg text-gray-600">mm</span>
            </div>
            <div className="text-xs text-gray-600">
              {rainyDays} giorni di pioggia
            </div>
          </div>
        )}
        
        {/* Card Giorni Piovosi */}
        {filters.showRainfall && (
          <div className="bg-gradient-to-br from-cyan-50 to-white rounded-xl p-6 border-2 border-cyan-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
            <div className="text-sm font-bold text-cyan-700 uppercase tracking-wide mb-3">
              Giorni Piovosi
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {rainyDays}
            </div>
            <div className="text-xs text-gray-600">
              {Math.round((rainyDays / data.length) * 100)}% del periodo
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherChart; 