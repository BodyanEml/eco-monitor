"use client";

import { sendGAEvent } from '@next/third-parties/google';

export default function ExportButton({ stationId, stationName }: { stationId: string, stationName: string }) {
  const handleExport = () => {
    sendGAEvent({ 
      event: 'data_export', 
      station_id: stationId, 
      station_name: stationName,
      format: 'csv' 
    });
    
    alert(`Експорт даних для ${stationName} розпочато...`);
  };

  return (
    <button 
      onClick={handleExport}
      className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
    >
      📥 Експорт CSV
    </button>
  );
}