import { getStationById, getMeasurements } from "@/services/stationService";
import { notFound } from "next/navigation";

// Next.js 15+ вимагає, щоб params були Promise
export default async function StationDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params; // Дочекалися отримання ID
  
  const station = await getStationById(id);
  const measurements = await getMeasurements(id);

  if (!station) {
    notFound(); 
  }

  const lastData = measurements[measurements.length - 1]?.values;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b pb-6">
        <a href="/" className="text-emerald-600 text-sm font-medium hover:underline">← Назад до списку</a>
        <h1 className="text-4xl font-black text-slate-900 mt-4">{station.name}</h1>
        <p className="text-slate-500">{station.address} • {station.type.toUpperCase()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold mb-6 italic text-slate-400 uppercase">Поточні показники</h2>
          <div className="space-y-6">
            {lastData && Object.entries(lastData).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between text-sm mb-1 uppercase font-bold text-slate-600">
                  <span>{key}</span>
                  <span>{value} µg/m³</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${Number(value) > 25 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(Number(value) * 2, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-lg font-bold mb-4 text-emerald-400 underline decoration-emerald-800 underline-offset-8">Геолокація</h2>
          <div className="space-y-4 opacity-90 text-sm">
            <p className="flex justify-between border-b border-slate-700 pb-2 font-mono">
              <span className="text-slate-400">Широта:</span> {station.coordinates.lat}
            </p>
            <p className="flex justify-between border-b border-slate-700 pb-2 font-mono">
              <span className="text-slate-400">Довгота:</span> {station.coordinates.lng}
            </p>
            <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
              <p className="italic text-slate-400 leading-relaxed text-xs">
                "Обладнання станції сертифіковане за стандартом ISO-14001. Дані передаються в зашифрованому вигляді кожні 30 хвилин."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}