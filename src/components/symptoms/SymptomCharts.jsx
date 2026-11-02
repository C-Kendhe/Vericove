import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

export const SymptomCharts = ({ symptoms = [] }) => {
  // Sort chronological for timeline chart
  const timelineData = [...symptoms]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(s => ({
      date: s.date.slice(5), // 'MM-DD'
      fullDate: s.date,
      name: s.name,
      severity: s.severity || 5,
      bodyArea: s.bodyArea
    }));

  // Group by body area
  const areaCounts = symptoms.reduce((acc, curr) => {
    const area = curr.bodyArea || 'Other';
    acc[area] = (acc[area] || 0) + 1;
    return acc;
  }, {});

  const areaData = Object.entries(areaCounts).map(([name, count]) => ({
    name: name.replace(' & Neurological', '').replace(' / Energy', ''),
    count
  }));

  const COLORS = ['#8147E5', '#DA6D9C', '#6E45D4', '#B899FC', '#C44C7E', '#9B6DF7'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
      
      {/* 1. Severity Progression Over Time */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-charcoal-900 text-sm sm:text-base">Symptom Severity Timeline</h3>
            <p className="text-xs text-charcoal-500">1–10 pain scale tracked across dates</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 font-semibold border border-brand-200">
            Pain Trend
          </span>
        </div>

        <div className="h-64 w-full">
          {timelineData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="severityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8147E5" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8147E5" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EEFF" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={11} />
                <YAxis domain={[0, 10]} stroke="#9CA3AF" fontSize={11} ticks={[0, 2, 4, 6, 8, 10]} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 rounded-xl border border-lavender-200 shadow-elevated text-xs">
                          <p className="font-bold text-charcoal-900">{data.name}</p>
                          <p className="text-charcoal-500">{data.fullDate} • {data.bodyArea}</p>
                          <p className="mt-1 font-semibold text-brand-700">Severity: {data.severity} / 10</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="severity" 
                  stroke="#8147E5" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#severityGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-charcoal-400">
              Not enough data points to plot timeline.
            </div>
          )}
        </div>
      </div>

      {/* 2. Frequency by Body Area */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-charcoal-900 text-sm sm:text-base">Distribution by Body Area</h3>
            <p className="text-xs text-charcoal-500">Frequency of reported discomfort</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-rosebud-50 text-rosebud-800 font-semibold border border-rosebud-200">
            Anatomical Distribution
          </span>
        </div>

        <div className="h-64 w-full">
          {areaData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EEFF" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} />
                <YAxis allowDecimals={false} stroke="#9CA3AF" fontSize={11} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2.5 rounded-xl border border-lavender-200 shadow-elevated text-xs">
                          <p className="font-bold text-charcoal-900">{data.name}</p>
                          <p className="font-semibold text-brand-700">{data.count} episodes logged</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {areaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-charcoal-400">
              No distribution data available.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default SymptomCharts;
