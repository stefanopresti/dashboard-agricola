import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilters } from '../../redux/agriculturalSlice';

const SoilChart = ({ data }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.agricultural);

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

  // Filtra le metriche basandosi sui filtri attivi
  const activeMetrics = soilMetrics.filter(metric => filters[metric.filterKey]);

  const handleFilterToggle = (filterKey) => {
    dispatch(updateFilters({
      [filterKey]: !filters[filterKey]
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'var(--brutal-white)',
          padding: '1rem',
          border: '3px solid var(--brutal-black)',
          boxShadow: '4px 4px 0 var(--brutal-black)',
          fontWeight: '600'
        }}>
          <p style={{ fontWeight: '900', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, fontSize: '0.875rem' }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const avgPH = data.reduce((sum, item) => sum + item.ph, 0) / data.length;
  const avgNitrogen = data.reduce((sum, item) => sum + item.nitrogen, 0) / data.length;
  const avgPhosphorus = data.reduce((sum, item) => sum + item.phosphorus, 0) / data.length;
  const avgPotassium = data.reduce((sum, item) => sum + item.potassium, 0) / data.length;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '2rem'
      }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '900', 
          textTransform: 'uppercase',
          color: 'var(--brutal-black)'
        }}>
          Parametri del Terreno
        </h3>
        <div style={{ 
          fontWeight: '700',
          fontSize: '0.875rem',
          color: 'var(--brutal-dark-gray)'
        }}>
          {activeMetrics.length} parametri attivi
        </div>
      </div>

      {/* Filtri dei parametri del terreno */}
      <div className="brutal-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h4 style={{ 
          fontSize: '1rem', 
          fontWeight: '700', 
          textTransform: 'uppercase',
          marginBottom: '1rem',
          color: 'var(--brutal-black)'
        }}>
          Seleziona Parametri
        </h4>
        <div className="brutal-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {soilMetrics.map((metric) => (
            <label key={metric.key} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}>
              <input
                type="checkbox"
                checked={filters[metric.filterKey]}
                onChange={() => handleFilterToggle(metric.filterKey)}
                className="brutal-checkbox"
              />
              <span>{metric.name}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="dateFormatted" 
              tick={{ fontSize: 12, fontWeight: '600' }}
              interval="preserveStartEnd"
            />
            <YAxis tick={{ fontSize: 12, fontWeight: '600' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {activeMetrics.map(metric => (
              <Line
                key={metric.key}
                type="monotone"
                dataKey={metric.key}
                stroke={metric.color}
                strokeWidth={3}
                dot={{ r: 4, fill: metric.color }}
                activeDot={{ r: 8, fill: metric.color }}
                name={metric.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="brutal-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '2rem' }}>
        {filters.showPH && (
          <div className="brutal-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--brutal-dark-gray)' }}>
              pH Terreno
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--brutal-black)' }}>
              {Math.round(avgPH * 10) / 10}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brutal-dark-gray)' }}>
              Range: {Math.min(...data.map(item => item.ph)).toFixed(1)} - {Math.max(...data.map(item => item.ph)).toFixed(1)}
            </div>
          </div>
        )}
        {filters.showNitrogen && (
          <div className="brutal-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--brutal-dark-gray)' }}>
              Azoto
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--brutal-black)' }}>
              {Math.round(avgNitrogen * 10) / 10} mg/kg
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brutal-dark-gray)' }}>
              Range: {Math.min(...data.map(item => item.nitrogen)).toFixed(1)} - {Math.max(...data.map(item => item.nitrogen)).toFixed(1)}
            </div>
          </div>
        )}
        {filters.showPhosphorus && (
          <div className="brutal-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--brutal-dark-gray)' }}>
              Fosforo
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--brutal-black)' }}>
              {Math.round(avgPhosphorus * 10) / 10} mg/kg
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brutal-dark-gray)' }}>
              Range: {Math.min(...data.map(item => item.phosphorus)).toFixed(1)} - {Math.max(...data.map(item => item.phosphorus)).toFixed(1)}
            </div>
          </div>
        )}
        {filters.showPotassium && (
          <div className="brutal-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--brutal-dark-gray)' }}>
              Potassio
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--brutal-black)' }}>
              {Math.round(avgPotassium * 10) / 10} mg/kg
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brutal-dark-gray)' }}>
              Range: {Math.min(...data.map(item => item.potassium)).toFixed(1)} - {Math.max(...data.map(item => item.potassium)).toFixed(1)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoilChart; 