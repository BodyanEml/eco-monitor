import { getStations, getGlobalStats } from "@/services/stationService";
import StationCard from "@/components/features/StationCard";

export default async function HomePage() {
  const stations = await getStations();
  const stats = await getGlobalStats();

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          📊 Загальна статистика якості повітря
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
            <div key={item.label} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
              <p className="text-xs text-slate-400 font-bold uppercase">{item.label}</p>
              <p className="text-xl font-black text-emerald-600">{item.value}</p>
              <p className="text-[10px] text-slate-400">{item.unit}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold italic text-slate-700 underline decoration-emerald-500 decoration-4 underline-offset-8">📍 Станції моніторингу</h2>
          <span className="text-sm text-slate-400 font-mono">Total units: {stations.length}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map(station => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </section>
    </div>
  );
}