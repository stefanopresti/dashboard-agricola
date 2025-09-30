import React from 'react';

const SummaryCards = ({ statistics }) => {
  const cards = [
    {
      title: 'Temperatura Attuale',
      value: `${statistics.currentTemp || 0}°C`,
      subtitle: `Media: ${statistics.avgTemp || 0}°C`,
      icon: '🌡️',
      color: 'brutal-red'
    },
    {
      title: 'Umidità Attuale',
      value: `${statistics.currentHumidity || 0}%`,
      subtitle: `Media: ${statistics.avgHumidity || 0}%`,
      icon: '💧',
      color: 'brutal-blue'
    },
    {
      title: 'Raccolto Totale',
      value: `${(statistics.totalHarvest || 0).toLocaleString()} kg/ha`,
      subtitle: `${statistics.dataPoints || 0} giorni analizzati`,
      icon: '🌾',
      color: 'brutal-orange'
    },
    {
      title: 'Qualità Media',
      value: `${statistics.avgQuality || 0}/10`,
      subtitle: 'Punteggio qualità',
      icon: '⭐',
      color: 'brutal-green'
    }
  ];

  return (
    <div className="brutal-grid overflow-x-auto" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={`brutal-summary-card ${card.color}`}
          style={{ padding: '2rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ 
                fontSize: '0.875rem', 
                fontWeight: '700', 
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
                color: 'var(--brutal-dark-gray)'
              }}>
                {card.title}
              </p>
              <p style={{ 
                fontSize: '2.5rem', 
                fontWeight: '900', 
                marginBottom: '0.5rem',
                color: 'var(--brutal-black)'
              }}>
                {card.value}
              </p>
              <p style={{ 
                fontSize: '0.875rem', 
                fontWeight: '600',
                color: 'var(--brutal-dark-gray)'
              }}>
                {card.subtitle}
              </p>
            </div>
            <div style={{ fontSize: '3rem', opacity: '0.8' }}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards; 