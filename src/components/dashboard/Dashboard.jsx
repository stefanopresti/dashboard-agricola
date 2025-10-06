import { useState, useMemo } from 'react';
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

  const tabs = [
    { id: 'overview', name: 'Panoramica', icon: '📊' },
    { id: 'harvest', name: 'Raccolto', icon: '🌾' },
    { id: 'quality', name: 'Qualità', icon: '⭐' },
    { id: 'soil', name: 'Terreno', icon: '🌱' },
    { id: 'weather', name: 'Meteo', icon: '🌤️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-16 space-y-16">
        {/* Filtro Date Range */}
        <DateRangeFilter />

        {/* Card di riepilogo */}
        <SummaryCards statistics={statistics} />

        {/* Tabs per i grafici */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
          <div className="border-b-2 border-gray-200 bg-gray-50">
            <nav className="flex overflow-x-auto p-8 gap-4">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white shadow-xl scale-110'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-emerald-300 hover:scale-105'
                  }`}
                >
                  <span className="text-2xl">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="fade-in">
                <MetricsChart data={filteredData} />
              </div>
            )}
            
            {activeTab === 'harvest' && (
              <div className="fade-in">
                <HarvestChart data={filteredData} />
              </div>
            )}
            
            {activeTab === 'quality' && (
              <div className="fade-in">
                <QualityChart data={filteredData} />
              </div>
            )}
            
            {activeTab === 'soil' && (
              <div className="fade-in">
                <SoilChart data={filteredData} />
              </div>
            )}
            
            {activeTab === 'weather' && (
              <div className="fade-in">
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