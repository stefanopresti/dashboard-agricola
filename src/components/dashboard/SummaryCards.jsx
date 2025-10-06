import React from 'react';

const SummaryCards = ({ statistics }) => {
  const cards = [
    {
      title: 'Temperatura Attuale',
      value: `${statistics.currentTemp || 0}°C`,
      subtitle: `Media: ${statistics.avgTemp || 0}°C`,
      icon: '🌡️',
      gradient: 'from-red-500 to-orange-500'
    },
    {
      title: 'Umidità Attuale',
      value: `${statistics.currentHumidity || 0}%`,
      subtitle: `Media: ${statistics.avgHumidity || 0}%`,
      icon: '💧',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Raccolto Totale',
      value: `${(statistics.totalHarvest || 0).toLocaleString()} kg/ha`,
      subtitle: `${statistics.dataPoints || 0} giorni analizzati`,
      icon: '🌾',
      gradient: 'from-amber-500 to-yellow-500'
    },
    {
      title: 'Qualità Media',
      value: `${statistics.avgQuality || 0}/10`,
      subtitle: 'Punteggio qualità',
      icon: '⭐',
      gradient: 'from-emerald-500 to-green-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-gray-300 group hover:-translate-y-2"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                {card.title}
              </p>
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {card.icon}
              </div>
            </div>
            <div>
              <p className="text-5xl font-bold text-gray-900 mb-4">
                {card.value}
              </p>
              <p className="text-base text-gray-600 font-semibold">
                {card.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards; 