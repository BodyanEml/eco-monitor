"use client";

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { Measurement } from '@/types/environmental';
import { useEffect, useState } from 'react';

export default function PollutantChart({ data, pollutant, title, color = "#10b981" }: any) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  if (!isClient) return <div className="h-[400px] bg-slate-50 animate-pulse rounded-3xl" />;

  const chartData = data.map((m: Measurement) => ({
    time: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: m.values[pollutant as keyof typeof m.values],
  }));

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">
        <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
        {title}
      </h3>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPoly" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={3} fill="url(#colorPoly)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}