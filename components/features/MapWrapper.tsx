"use client"; // Обов'язково!

import dynamic from "next/dynamic";
import { Station } from "@/types/environmental";

const Map = dynamic(() => import("./Map"), { 
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-slate-100 animate-pulse rounded-3xl flex items-center justify-center border border-slate-200">
      <div className="text-center">
        <div className="text-2xl mb-2">🌍</div>
        <div className="text-slate-400 font-medium">Завантаження інтерактивної карти...</div>
      </div>
    </div>
  )
});

export default function MapWrapper({ stations }: { stations: Station[] }) {
  return <Map stations={stations} />;
}