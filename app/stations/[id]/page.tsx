import { getStationById, getMeasurements } from "@/services/stationService";
import { notFound } from "next/navigation";
import PollutantChart from "@/components/features/PollutantChart";
import ExportButton from "@/components/features/ExportButton";
import AnalyticsTracker from "@/components/features/AnalyticsTracker";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const station = await getStationById(id);
  const measurements = await getMeasurements(id);

  if (!station) notFound();

  const lastData = measurements[measurements.length - 1]?.values;

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* ТРЕКІНГ: Перегляд деталей станції */}
      <AnalyticsTracker 
        eventName="view_station_details" 
        payload={{ station_id: id, station_name: station.name }} 
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-8 gap-4">
        <div>
          <a href="/" className="text-emerald-600 text-sm font-bold hover:underline mb-4 block">← До списку</a>
          <h1 className="text-4xl font-black text-slate-900">{station.name}</h1>
          <p className="text-slate-500">{station.address}</p>
        </div>
        
        {/* Кнопка з трекінгом експорту */}
        <ExportButton stationId={id} stationName={station.name} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold mb-8">Поточні рівні</h2>
          <div className="grid grid-cols-2 gap-8">
            {lastData && Object.entries(lastData).map(([key, value]) => (
              <div key={key}>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{key}</p>
                <p className="text-xl font-mono font-bold text-slate-700">{value} µg/m³</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{width: `${Math.min(Number(value)*2, 100)}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
           <h3 className="text-emerald-400 font-bold mb-4">Координати</h3>
           <p className="font-mono text-sm opacity-70">Lat: {station.coordinates.lat}</p>
           <p className="font-mono text-sm opacity-70">Lng: {station.coordinates.lng}</p>
        </div>
      </div>

      {/* Графік з вбудованим трекінгом перегляду */}
      <PollutantChart 
        data={measurements} 
        pollutant="pm25" 
        title="Динаміка PM2.5 (GA4 Tracked)" 
        color="#10b981" 
      />
    </div>
  );
}