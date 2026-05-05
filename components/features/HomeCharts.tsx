"use client";

import { useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { sendGAEvent } from '@next/third-parties/google';
import { Station, AirQualityIndicators } from '@/types/environmental';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#64748b'];

export default function HomeCharts({ stations, globalStats }: { stations: Station[], globalStats: AirQualityIndicators }) {
  
  useEffect(() => {
    // ТРЕКІНГ: Перегляд загальних дашборд-графіків
    sendGAEvent({ 
      event: 'chart_viewed', 
      chart_type: 'overview_charts',
      chart_title: 'Global Station Comparison'
    });
  }, []);

  const barData = stations.map((s, index) => ({
    name: s.name,
    pm25: index === 0 ? 12 : index === 1 ? 25 : 42, 
  }));

  const pieData = [
    { name: 'PM2.5', value: globalStats.pm25 },
    { name: 'PM10', value: globalStats.pm10 },
    { name: 'NO2', value: globalStats.no2 },
    { name: 'O3', value: globalStats.o3 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Стовпчикова діаграма */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[400px]">
        <h3 className="text-lg font-bold mb-6 text-slate-800 italic">📊 Порівняння PM2.5 за станціями</h3>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip cursor={{fill: '#f8fafc'}} />
            <Bar dataKey="pm25" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Кругова діаграма */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-[400px]">
        <h3 className="text-lg font-bold mb-6 text-slate-800 italic">🍰 Структура забруднення (середня)</h3>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}