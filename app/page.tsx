import MapWrapper from "@/components/features/MapWrapper";
import { getStations, getGlobalStats } from "@/services/stationService";
import StationCard from "@/components/features/StationCard";
import HomeCharts from "@/components/features/HomeCharts"; // Новий імпорт

export default async function HomePage() {
  const stations = await getStations();
  const stats = await getGlobalStats();

  return (
    <div className="space-y-12">
      {/* 1. Секція статистики */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800">
          <span className="bg-emerald-100 p-2 rounded-lg text-xl text-emerald-600">📊</span>
          Загальна статистика якості повітря
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'PM2.5', value: stats.pm25, unit: 'µg/m³' },
            { label: 'PM10', value: stats.pm10, unit: 'µg/m³' },
            { label: 'NO₂', value: stats.no2, unit: 'µg/m³' },
            { label: 'O₃', value: stats.o3, unit: 'µg/m³' },
            { label: 'SO₂', value: stats.so2, unit: 'µg/m³' },
            { label: 'CO', value: stats.co, unit: 'mg/m³' },
          ].map((item) => (
            <div key={item.label} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-2xl font-black text-emerald-600">{item.value}</p>
              <p className="text-[10px] text-slate-400 font-medium">{item.unit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Карта */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">🗺️ Географічний моніторинг</h2>
        <div className="relative z-0 shadow-2xl rounded-3xl overflow-hidden border-8 border-white">
           <MapWrapper stations={stations} />
        </div>
      </section>

      {/* 3. НОВИЙ БЛОК: Діаграми (Частина 2 лаби) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">📉 Аналітичні діаграми</h2>
        <HomeCharts stations={stations} globalStats={stats} />
      </section>

      {/* 4. Список станцій */}
      <section>
        <h2 className="text-2xl font-bold italic text-slate-700 mb-8 underline decoration-emerald-500 decoration-4 underline-offset-8">
          📍 Активні станції
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map(station => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </section>
    </div>
  );
}