"use client";

import { useState, useMemo } from "react";
import { Station, AirQualityIndicators, Measurement } from "@/types/environmental";
import Map from "./Map";
import HomeCharts from "./HomeCharts";
import PollutantChart from "./PollutantChart";

interface DashboardProps {
  stations: Station[];
  globalStats: AirQualityIndicators;
  allMeasurements: Measurement[]; // Для простоти передамо всі заміри
}

export default function MonitoringDashboard({ stations, globalStats, allMeasurements }: DashboardProps) {
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);

  // Отримуємо дані обраної станції
  const selectedStation = useMemo(() => 
    stations.find(s => s.id === selectedStationId), 
  [selectedStationId, stations]);

  // Фільтруємо заміри для обраної станції
  const selectedMeasurements = useMemo(() => 
    allMeasurements.filter(m => m.stationId === selectedStationId),
  [selectedStationId, allMeasurements]);

  return (
    <div className="space-y-8">
      {/* КАРТА */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">🗺️ Карта та вибір об'єкта</h2>
          {selectedStationId && (
            <button 
              onClick={() => setSelectedStationId(null)}
              className="text-xs bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold hover:bg-red-100 transition-all"
            >
              ✕ Скинути вибір
            </button>
          )}
        </div>
        
        <div className="relative z-0 shadow-2xl rounded-3xl overflow-hidden border-8 border-white">
           <Map 
             stations={stations} 
             onStationSelect={setSelectedStationId} 
             selectedId={selectedStationId} 
           />
        </div>
      </section>

      {/* ДИНАМІЧНА АНАЛІТИКА */}
      <section className="animate-in fade-in duration-700">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          {selectedStation 
            ? `📊 Аналітика: ${selectedStation.name}` 
            : "📉 Загальна аналітика мережі"}
        </h2>

        {selectedStation ? (
          <div className="grid grid-cols-1 gap-6">
            <PollutantChart 
              data={selectedMeasurements} 
              pollutant="pm25" 
              title={`Тренди PM2.5 для ${selectedStation.name}`}
              color="#ef4444" 
            />
          </div>
        ) : (
          <HomeCharts stations={stations} globalStats={globalStats} />
        )}
      </section>
    </div>
  );
}