import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import MetricsChart from './MetricsChart';
import HarvestChart from './HarvestChart';
import QualityChart from './QualityChart';
import SoilChart from './SoilChart';
import WeatherChart from './WeatherChart';
import DateRangeFilter from './DateRangeFilter';
import SummaryCards from './SummaryCards';

const Dashboard = () => {
  const { data, dateRange } = useSelector(state => state.agricultural);
  const [activeTab, setActiveTab] = useState('overview');

  // Filtra i dati in base al range di date
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const itemDate = new Date(item.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }, [data, dateRange]);

  // Calcola statistiche per le card di riepilogo
  const statistics = useMemo(() => {
    if (filteredData.length === 0) return {};

    const latest = filteredData[filteredData.length - 1];
    const avgTemp = filteredData.reduce((sum, item) => sum + item.temperature, 0) / filteredData.length;
    const avgHumidity = filteredData.reduce((sum, item) => sum + item.humidity, 0) / filteredData.length;
    const totalHarvest = filteredData.reduce((sum, item) => sum + item.harvest, 0);
    const avgQuality = filteredData.reduce((sum, item) => sum + item.quality, 0) / filteredData.length;

    return {
      currentTemp: latest.temperature,
      currentHumidity: latest.humidity,
      avgTemp: Math.round(avgTemp * 10) / 10,
      avgHumidity: Math.round(avgHumidity * 10) / 10,
      totalHarvest: Math.round(totalHarvest),
      avgQuality: Math.round(avgQuality * 10) / 10,
      dataPoints: filteredData.length
    };
  }, [filteredData]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--brutal-gray)' }}>
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtro Date Range */}
        <DateRangeFilter />

        {/* Card di riepilogo */}
        <SummaryCards statistics={statistics} />

        {/* Tabs per i grafici */}
        <div className="brutal-card brutal-section">
          <div className="brutal-tabs p-2">
            <nav className="flex gap-2">
              {[
                { id: 'overview', name: 'Panoramica', icon: '📊' },
                { id: 'harvest', name: 'Raccolto', icon: '🌾' },
                { id: 'quality', name: 'Qualità', icon: '⭐' },
                { id: 'soil', name: 'Terreno', icon: '🌱' },
                { id: 'weather', name: 'Meteo', icon: '🌤️' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`brutal-tab ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <span style={{ marginRight: '0.5rem' }}>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="brutal-padding">
            {activeTab === 'overview' && (
              <div className="brutal-fade-in">
                <MetricsChart data={filteredData} />
              </div>
            )}
            
            {activeTab === 'harvest' && (
              <div className="brutal-fade-in">
                <HarvestChart data={filteredData} />
              </div>
            )}
            
            {activeTab === 'quality' && (
              <div className="brutal-fade-in">
                <QualityChart data={filteredData} />
              </div>
            )}
            
            {activeTab === 'soil' && (
              <div className="brutal-fade-in">
                <SoilChart data={filteredData} />
              </div>
            )}
            
            {activeTab === 'weather' && (
              <div className="brutal-fade-in">
                <WeatherChart data={filteredData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 