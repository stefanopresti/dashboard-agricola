/**
 * Componente HarvestChart
 * 
 * Grafico ad area che visualizza l'andamento del raccolto nel tempo.
 * Include statistiche aggregate come totale, massimo, media e giorni di raccolto.
 */

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * HarvestChart Component
 * 
 * @param {Array} data - Array di dati giornalieri contenenti harvest (kg/ha)
 * 
 * Caratteristiche:
 * - Grafico ad area per visualizzare volumi di raccolto
 * - Tooltip personalizzato con dettagli giornalieri
 * - Card statistiche con totale, massimo, media e giorni attivi
 * - Formattazione numeri con separatori delle migliaia
 */
const HarvestChart = ({ data }) => {
  /**
   * Tooltip personalizzato che mostra i dettagli del raccolto per ogni giorno
   */
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-lg">
          <p className="font-bold text-gray-900 mb-1">{label}</p>
          <p className="text-sm font-semibold text-amber-600">
            Raccolto: {payload[0].value} kg/ha
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* Header con titolo e totale raccolto */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-3xl font-bold text-gray-900">
          Andamento Raccolto
        </h3>
        <div className="text-base font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
          Totale: {data.reduce((sum, item) => sum + item.harvest, 0).toLocaleString()} kg/ha
        </div>
      </div>
      
      {/* Grafico ad area del raccolto */}
      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            {/* Griglia di sfondo */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            
            {/* Asse X - Date */}
            <XAxis 
              dataKey="dateFormatted" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              interval="preserveStartEnd"
            />
            
            {/* Asse Y - kg/ha */}
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              label={{ value: 'kg/ha', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
            />
            
            {/* Tooltip personalizzato */}
            <Tooltip content={<CustomTooltip />} />
            
            {/* Area riempita per il raccolto */}
            <Area
              type="monotone"
              dataKey="harvest"
              stroke="#f59e0b"
              fill="#fef3c7"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      {/* Grid con statistiche del raccolto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Raccolto Massimo */}
        <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl p-6 border-2 border-amber-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
          <div className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-3">
            Raccolto Massimo
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {Math.max(...data.map(item => item.harvest)).toLocaleString()} <span className="text-xl text-gray-600">kg/ha</span>
          </div>
        </div>
        
        {/* Card Raccolto Medio */}
        <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-6 border-2 border-emerald-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
          <div className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-3">
            Raccolto Medio
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {Math.round(data.reduce((sum, item) => sum + item.harvest, 0) / data.length).toLocaleString()} <span className="text-xl text-gray-600">kg/ha</span>
          </div>
        </div>
        
        {/* Card Giorni di Raccolto */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
          <div className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-3">
            Giorni di Raccolto
          </div>
          <div className="text-4xl font-bold text-gray-900">
            {data.filter(item => item.harvest > 0).length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarvestChart; 