import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilters } from '../../redux/agriculturalSlice';

const WeatherChart = ({ data }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.agricultural);

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

  // Filtra le metriche basandosi sui filtri attivi
  const activeMetrics = weatherMetrics.filter(metric => filters[metric.filterKey]);

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
              {entry.name}: {entry.value} {entry.dataKey === 'sunHours' ? 'ore' : entry.dataKey === 'rainfall' ? 'mm' : '°C'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const avgTemperature = data.reduce((sum, item) => sum + item.temperature, 0) / data.length;
  const avgSunHours = data.reduce((sum, item) => sum + item.sunHours, 0) / data.length;
  const totalRainfall = data.reduce((sum, item) => sum + item.rainfall, 0);
  const rainyDays = data.filter(item => item.rainfall > 0).length;

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
          Condizioni Meteorologiche
        </h3>
        <div style={{ 
          fontWeight: '700',
          fontSize: '0.875rem',
          color: 'var(--brutal-dark-gray)'
        }}>
          {activeMetrics.length} parametri attivi
        </div>
      </div>

      {/* Filtri delle condizioni meteorologiche */}
      <div className="brutal-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h4 style={{ 
          fontSize: '1rem', 
          fontWeight: '700', 
          textTransform: 'uppercase',
          marginBottom: '1rem',
          color: 'var(--brutal-black)'
        }}>
          Seleziona Parametri Meteo
        </h4>
        <div className="brutal-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {weatherMetrics.map((metric) => (
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
          <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="dateFormatted" 
              tick={{ fontSize: 12, fontWeight: '600' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 12, fontWeight: '600' }}
              label={{ value: 'Temperatura (°C)', angle: -90, position: 'insideLeft', style: { fontWeight: '700' } }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12, fontWeight: '600' }}
              label={{ value: 'Ore di sole / Precipitazioni', angle: 90, position: 'insideRight', style: { fontWeight: '700' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {activeMetrics.map(metric => {
              if (metric.type === 'line') {
                return (
                  <Line
                    key={metric.key}
                    yAxisId="left"
                    type="monotone"
                    dataKey={metric.key}
                    stroke={metric.color}
                    strokeWidth={3}
                    dot={{ r: 4, fill: metric.color }}
                    activeDot={{ r: 8, fill: metric.color }}
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
      
      <div className="brutal-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '2rem' }}>
        {filters.showTemperature && (
          <div className="brutal-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--brutal-dark-gray)' }}>
              Temperatura
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--brutal-black)' }}>
              {Math.round(avgTemperature * 10) / 10}°C
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brutal-dark-gray)' }}>
              Range: {Math.min(...data.map(item => item.temperature)).toFixed(1)}°C - {Math.max(...data.map(item => item.temperature)).toFixed(1)}°C
            </div>
          </div>
        )}
        {filters.showSunHours && (
          <div className="brutal-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--brutal-dark-gray)' }}>
              Ore di Sole
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--brutal-black)' }}>
              {Math.round(avgSunHours * 10) / 10} ore/giorno
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brutal-dark-gray)' }}>
              Totale: {Math.round(data.reduce((sum, item) => sum + item.sunHours, 0))} ore
            </div>
          </div>
        )}
        {filters.showRainfall && (
          <div className="brutal-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--brutal-dark-gray)' }}>
              Precipitazioni
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--brutal-black)' }}>
              {Math.round(totalRainfall * 10) / 10} mm
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brutal-dark-gray)' }}>
              {rainyDays} giorni di pioggia
            </div>
          </div>
        )}
        {filters.showRainfall && (
          <div className="brutal-card" style={{ padding: '1.5rem' }}>
            <div style={{ fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--brutal-dark-gray)' }}>
              Giorni Piovosi
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--brutal-black)' }}>
              {rainyDays}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--brutal-dark-gray)' }}>
              {Math.round((rainyDays / data.length) * 100)}% del periodo
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherChart; 