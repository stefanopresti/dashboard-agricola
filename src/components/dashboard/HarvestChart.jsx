import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HarvestChart = ({ data }) => {
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
          <p style={{ color: '#f59e0b', fontSize: '0.875rem', fontWeight: '700' }}>
            Raccolto: {payload[0].value} kg/ha
          </p>
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
          Andamento Raccolto
        </h3>
        <div style={{ 
          fontWeight: '700',
          fontSize: '0.875rem',
          color: 'var(--brutal-dark-gray)'
        }}>
          Totale: {data.reduce((sum, item) => sum + item.harvest, 0).toLocaleString()} kg/ha
        </div>
      </div>
      
      <div style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="dateFormatted" 
              tick={{ fontSize: 12, fontWeight: '600' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 12, fontWeight: '600' }}
              label={{ value: 'kg/ha', angle: -90, position: 'insideLeft', style: { fontWeight: '700' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="harvest"
              stroke="#f59e0b"
              fill="#fef3c7"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="brutal-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
        <div className="brutal-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--brutal-dark-gray)' }}>
            Raccolto Massimo
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--brutal-black)' }}>
            {Math.max(...data.map(item => item.harvest)).toLocaleString()} kg/ha
          </div>
        </div>
        <div className="brutal-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--brutal-dark-gray)' }}>
            Raccolto Medio
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--brutal-black)' }}>
            {Math.round(data.reduce((sum, item) => sum + item.harvest, 0) / data.length).toLocaleString()} kg/ha
          </div>
        </div>
        <div className="brutal-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontWeight: '700', fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--brutal-dark-gray)' }}>
            Giorni di Raccolto
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--brutal-black)' }}>
            {data.filter(item => item.harvest > 0).length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HarvestChart; 