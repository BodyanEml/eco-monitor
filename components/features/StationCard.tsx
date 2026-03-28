import { Station } from "@/types/environmental";

export default function StationCard({ station }: { station: Station }) {
  const typeLabels: Record<string, string> = {
    urban: 'Міська', industrial: 'Промислова', rural: 'Приміська', traffic: 'Транспортна'
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-slate-800">{station.name}</h3>
        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded uppercase font-bold">
          {typeLabels[station.type]}
        </span>
      </div>
      <p className="text-sm text-slate-500 mb-4">{station.address}</p>
      <a 
        href={`/stations/${station.id}`} 
        className="block text-center text-sm font-semibold bg-emerald-50 text-emerald-700 py-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors"
      >
        Детальніше
      </a>
    </div>
  );
}