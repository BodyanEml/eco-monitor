"use client";

import dynamic from "next/dynamic";
import { Station } from "@/types/environmental";

// Відкладене завантаження карти з вимкненим SSR
const Map = dynamic(() => import("./Map"), { 
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-slate-100 animate-pulse rounded-3xl flex items-center justify-center border border-slate-200 shadow-inner">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-bounce">🌍</div>
        <div className="text-slate-500 font-medium tracking-wide">Завантаження інтерактивної карти...</div>
      </div>
    </div>
  )
});

interface MapWrapperProps {
  stations: Station[];
  onStationSelect?: (id: string) => void;
  selectedId?: string | null;
}

export default function MapWrapper({ stations, onStationSelect, selectedId }: MapWrapperProps) {
  return <Map stations={stations} onStationSelect={onStationSelect} selectedId={selectedId} />;
}