"use client";

import { useState, useMemo, useEffect } from "react";
import { Station, AirQualityIndicators, Measurement } from "@/types/environmental";
import Map from "./Map";
import HomeCharts from "./HomeCharts";
import PollutantChart from "./PollutantChart";
import { logger } from "@/lib/logger";
import { sendGAEvent } from "@next/third-parties/google";

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

  // 2. Безпечна перевірка вхідних даних (Частина 3: Обробка помилок)
  useEffect(() => {
    if (!stations || stations.length === 0) {
      logger.warn({ component: "MonitoringDashboard" }, "Компонент отримав порожній список станцій");
    }
  }, [stations]);

  // 3. Мемоїзація даних для оптимізації та уникнення зайвих рендерів
  const selectedStation = useMemo(() => 
    stations.find(s => s.id === selectedStationId), 
  [selectedStationId, stations]);

  const selectedMeasurements = useMemo(() => 
    allMeasurements.filter(m => m.stationId === selectedStationId),
  [selectedStationId, allMeasurements]);

  // 4. Обробник вибору станції з логуванням (Частина 2: Рівні логування)
  const handleStationSelect = (id: string) => {
    if (id === selectedStationId) return;

    setSelectedStationId(id);
    
    // Логування для розробника (Debug/Info)
    logger.info({ stationId: id }, `Користувач обрав станцію для детального аналізу`);
    
    // Відстеження в Google Analytics (Частина 1: Кастомні події)
    sendGAEvent({ 
      event: 'station_selected_on_dashboard', 
      station_id: id 
    });
  };

  // 5. Скидання вибору
  const handleReset = () => {
    setSelectedStationId(null);
    logger.debug("Скидання вибору станції на дашборді");
    sendGAEvent({ event: 'dashboard_selection_reset' });
  };

  // Fallback UI якщо дані критично відсутні
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
        
        {/* Компонент Мапи з інтегрованим вибором */}
        <div className="relative group">
           <Map 
             stations={stations} 
             onStationSelect={handleStationSelect} 
             selectedId={selectedStationId} 
           />
        </div>
      </section>

      {/* СЕКЦІЯ ГРАФІКІВ (Контекстна заміна) */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            {selectedStation ? "📈 Детальні тренди" : "📊 Огляд всієї мережі"}
          </h2>
          <div className="h-1 w-20 bg-emerald-500 rounded-full mt-2"></div>
        </div>

        {selectedStation ? (
          /* Відображаємо лінійний графік при виборі конкретної станції */
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
          /* Відображаємо порівняльні діаграми, якщо нічого не обрано */
          <div className="space-y-8">
            <HomeCharts stations={stations} globalStats={globalStats} />
          </div>
        )}
      </section>
      
    </div>
  );
}