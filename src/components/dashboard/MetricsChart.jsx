import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilters } from '../../redux/agriculturalSlice';

const MetricsChart = ({ data }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.agricultural);

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

  // Filtra le metriche basandosi sui filtri attivi
  const activeMetrics = Object.entries(metricConfigs).filter(([key, config]) => 
    filters[config.filterKey]
  );

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
              {entry.name}: {entry.value} {metricConfigs[entry.dataKey]?.unit}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
          Metriche Principali
        </h3>
        <div style={{ 
          fontWeight: '700',
          fontSize: '0.875rem',
          color: 'var(--brutal-dark-gray)'
        }}>
          {activeMetrics.length} metriche attive
        </div>
      </div>

      {/* Filtri delle metriche */}
      <div className="brutal-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h4 style={{ 
          fontSize: '1rem', 
          fontWeight: '700', 
          textTransform: 'uppercase',
          marginBottom: '1rem',
          color: 'var(--brutal-black)'
        }}>
          Seleziona Metriche
        </h4>
        <div className="brutal-grid overflow-x-auto" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
          {Object.entries(metricConfigs).map(([key, config]) => (
            <label key={key} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}>
              <input
                type="checkbox"
                checked={filters[config.filterKey]}
                onChange={() => handleFilterToggle(config.filterKey)}
                className="brutal-checkbox"
              />
              <span>{config.name}</span>
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
            {activeMetrics.map(([metricKey, config]) => (
              <Line
                key={metricKey}
                type="monotone"
                dataKey={metricKey}
                stroke={config.color}
                strokeWidth={3}
                dot={{ r: 4, fill: config.color }}
                activeDot={{ r: 8, fill: config.color }}
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