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
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-sm">
            Qualità: <span className="font-semibold">{quality}/10</span>
          </p>
          <p className={`text-sm ${color}`}>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Qualità del Raccolto</h3>
        <div className="text-sm text-gray-600">
          Media: {Math.round(avgQuality * 10) / 10}/10
        </div>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="dateFormatted" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              domain={[0, 10]}
              label={{ value: 'Qualità (1-10)', angle: -90, position: 'insideLeft' }}
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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-green-800 font-semibold">Eccellente (≥8)</div>
          <div className="text-2xl font-bold text-green-600">{excellentDays} giorni</div>
          <div className="text-sm text-green-700">
            {Math.round((excellentDays / data.length) * 100)}% del periodo
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-blue-800 font-semibold">Buona (6-8)</div>
          <div className="text-2xl font-bold text-blue-600">{goodDays} giorni</div>
          <div className="text-sm text-blue-700">
            {Math.round((goodDays / data.length) * 100)}% del periodo
          </div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-yellow-800 font-semibold">Discreta (4-6)</div>
          <div className="text-2xl font-bold text-yellow-600">
            {data.filter(item => item.quality >= 4 && item.quality < 6).length} giorni
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-red-800 font-semibold">Scarsa (&lt;4)</div>
          <div className="text-2xl font-bold text-red-600">{poorDays} giorni</div>
          <div className="text-sm text-red-700">
            {Math.round((poorDays / data.length) * 100)}% del periodo
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityChart; 