"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { Station, AirQualityIndicators, Measurement } from "@/types/environmental";
import MapWrapper from "./MapWrapper"; // ЗМІНЕНО: Використовуємо обгортку замість прямого імпорту Map
import { logger } from "@/lib/logger";
import { sendGAEvent } from "@next/third-parties/google";

// ДИНАМІЧНІ ІМПОРТИ ГРАФІКІВ (Lazy Loading)
const HomeCharts = dynamic(() => import("./HomeCharts"), {
  loading: () => <div className="h-[400px] w-full bg-slate-50 animate-pulse rounded-3xl border border-slate-100" />
});

const PollutantChart = dynamic(() => import("./PollutantChart"), {
  loading: () => <div className="h-[400px] w-full bg-slate-50 animate-pulse rounded-3xl border border-slate-100" />
});

interface DashboardProps {
  stations: Station[];
  globalStats: AirQualityIndicators;
  allMeasurements: Measurement[];
}

export default function MonitoringDashboard({ 
  stations, 
  globalStats, 
  allMeasurements 
}: DashboardProps) {
  // 1. Стан обраної станції
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);

  // 2. Безпечна перевірка вхідних даних
  useEffect(() => {
    if (!stations || stations.length === 0) {
    }
  }, [stations]);

  // 3. Мемоїзація даних
  const selectedStation = useMemo(() => 
    stations.find(s => s.id === selectedStationId), 
  [selectedStationId, stations]);

  const selectedMeasurements = useMemo(() => 
    allMeasurements.filter(m => m.stationId === selectedStationId),
  [selectedStationId, allMeasurements]);

  // 4. Обробник вибору станції (Діє як фільтр)
  const handleStationSelect = (id: string) => {
    if (id === selectedStationId) return;

    setSelectedStationId(id);
    
    
    // ТРЕКІНГ: Застосування фільтра (вибір станції)
    sendGAEvent({ 
      event: 'filter_applied', 
      filter_type: 'station_selection',
      station_id: id 
    });
  };

  // 5. Скидання вибору
  const handleReset = () => {
    setSelectedStationId(null);
    
    // ТРЕКІНГ: Скидання фільтра
    sendGAEvent({ 
      event: 'filter_cleared',
      filter_type: 'station_selection'
    });
  };

  if (!stations || stations.length === 0) {
    return (
      <div className="p-12 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
        <p className="text-slate-400 font-medium">Дані моніторингу тимчасово недоступні...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      
      {/* СЕКЦІЯ МАПИ */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              🗺️ Інтерактивна мапа
            </h2>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
              {selectedStation 
                ? `Фокус: ${selectedStation.name}` 
                : "Оберіть маркер для перегляду динаміки"}
            </p>
          </div>

          {selectedStationId && (
            <button 
              onClick={handleReset}
              className="group flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-100 transition-all active:scale-95 shadow-sm"
            >
              <span className="group-hover:rotate-90 transition-transform duration-300">✕</span>
              Скинути фільтр
            </button>
          )}
        </div>
        
        {/* ЗМІНЕНО: Використовуємо MapWrapper замість Map */}
        <div className="relative group">
           <MapWrapper 
             stations={stations} 
             onStationSelect={handleStationSelect} 
             selectedId={selectedStationId} 
           />
        </div>
      </section>

      {/* СЕКЦІЯ ГРАФІКІВ */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            {selectedStation ? "📈 Детальні тренди" : "📊 Огляд всієї мережі"}
          </h2>
          <div className="h-1 w-20 bg-emerald-500 rounded-full mt-2"></div>
        </div>

        {selectedStation ? (
          <div className="grid grid-cols-1 gap-8">
            <PollutantChart 
              data={selectedMeasurements} 
              pollutant="pm25" 
              title={`Концентрація PM2.5: ${selectedStation.name}`}
              color="#ef4444" 
            />
            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center gap-4">
              <div className="text-3xl">💡</div>
              <p className="text-sm text-emerald-800 leading-relaxed">
                Ви переглядаєте дані в реальному часі для об&apos;єкта <strong>{selectedStation.name}</strong>. 
                Графік відображає коливання дрібнодисперсного пилу за останній звітний період.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <HomeCharts stations={stations} globalStats={globalStats} />
          </div>
        )}
      </section>
      
    </div>
  );
}