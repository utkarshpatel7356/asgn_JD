import React from 'react';

const InsightsPanel = ({ data }) => {
  if (!data) return null;

  const { healthScore, insights } = data;
  const scoreColor = healthScore > 98 ? 'text-green-400' : (healthScore > 96 ? 'text-yellow-400' : 'text-red-500');

  return (
    <div className="absolute top-24 right-5 w-80 bg-slate-900/90 border-l-4 border-cyan-500 p-6 backdrop-blur-md shadow-2xl z-[1000]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-bold tracking-widest uppercase text-sm">AI Analysis</h2>
        <div className="animate-pulse w-2 h-2 bg-green-500 rounded-full"></div>
      </div>

      {/* Main Metric */}
      <div className="mb-6">
        <p className="text-gray-400 text-xs mb-1">PLANT HEALTH SCORE</p>
        <div className={`text-4xl font-mono font-bold ${scoreColor}`}>
          {healthScore.toFixed(1)}%
        </div>
      </div>

      {/* Dynamic Insights List */}
      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <div key={idx} className={`text-sm border-l-2 pl-3 py-1 ${getBorderColor(insight.type)}`}>
            <p className="text-gray-300 leading-tight">{insight.text}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

// Helper for dynamic borders
const getBorderColor = (type) => {
    switch(type) {
        case 'critical': return 'border-red-500';
        case 'negative': return 'border-orange-500';
        case 'positive': return 'border-green-500';
        case 'warning': return 'border-yellow-500';
        default: return 'border-gray-500';
    }
};

export default InsightsPanel;