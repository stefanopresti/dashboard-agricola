import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const QualityChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const quality = payload[0].value;
      let qualityLevel = '';
      let color = '';
      
      if (quality >= 8) {
        qualityLevel = 'Eccellente';
        color = 'text-green-600';
      } else if (quality >= 6) {
        qualityLevel = 'Buona';
        color = 'text-blue-600';
      } else if (quality >= 4) {
        qualityLevel = 'Discreta';
        color = 'text-yellow-600';
      } else {
        qualityLevel = 'Scarsa';
        color = 'text-red-600';
      }
      
      return (
        <div className="bg-white p-4 border-2 border-gray-200 rounded-xl shadow-lg">
          <p className="font-bold text-gray-900 mb-2">{label}</p>
          <p className="text-sm font-medium text-gray-700">
            Qualità: <span className="font-bold">{quality}/10</span>
          </p>
          <p className={`text-sm font-bold ${color}`}>
            Livello: {qualityLevel}
          </p>
        </div>
      );
    }
    return null;
  };

  const avgQuality = data.reduce((sum, item) => sum + item.quality, 0) / data.length;
  const excellentDays = data.filter(item => item.quality >= 8).length;
  const goodDays = data.filter(item => item.quality >= 6 && item.quality < 8).length;
  const poorDays = data.filter(item => item.quality < 6).length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold text-gray-900">Qualità del Raccolto</h3>
        <div className="text-base font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
          Media: {Math.round(avgQuality * 10) / 10}/10
        </div>
      </div>
      
      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="dateFormatted" 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6b7280' }}
              domain={[0, 10]}
              label={{ value: 'Qualità (1-10)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={8} stroke="#10b981" strokeDasharray="3 3" />
            <ReferenceLine y={6} stroke="#3b82f6" strokeDasharray="3 3" />
            <ReferenceLine y={4} stroke="#f59e0b" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="quality"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ r: 4, fill: '#10b981' }}
              activeDot={{ r: 8, fill: '#10b981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border-2 border-green-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
          <div className="text-sm font-bold text-green-700 uppercase tracking-wide mb-3">Eccellente (≥8)</div>
          <div className="text-4xl font-bold text-green-600 mb-2">{excellentDays}</div>
          <div className="text-xs text-green-700">
            {Math.round((excellentDays / data.length) * 100)}% del periodo
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border-2 border-blue-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
          <div className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-3">Buona (6-8)</div>
          <div className="text-4xl font-bold text-blue-600 mb-2">{goodDays}</div>
          <div className="text-xs text-blue-700">
            {Math.round((goodDays / data.length) * 100)}% del periodo
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-6 border-2 border-yellow-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
          <div className="text-sm font-bold text-yellow-700 uppercase tracking-wide mb-3">Discreta (4-6)</div>
          <div className="text-4xl font-bold text-yellow-600 mb-2">
            {data.filter(item => item.quality >= 4 && item.quality < 6).length}
          </div>
          <div className="text-xs text-yellow-700">giorni</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-6 border-2 border-red-200 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
          <div className="text-sm font-bold text-red-700 uppercase tracking-wide mb-3">Scarsa (&lt;4)</div>
          <div className="text-4xl font-bold text-red-600 mb-2">{poorDays}</div>
          <div className="text-xs text-red-700">
            {Math.round((poorDays / data.length) * 100)}% del periodo
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityChart; 