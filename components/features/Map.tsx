"use client";

import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { Station } from "@/types/environmental";

// Допоміжний компонент для фокусування карти на обраній станції
function RecenterMap({ coords }: { coords: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView([coords.lat, coords.lng], 12, { animate: true });
    }
  }, [coords, map]);
  return null;
}

interface MapProps {
  stations: Station[];
  onStationSelect?: (id: string) => void; // Зроблено необов'язковим (?)
  selectedId?: string | null;
}

export default function Map({ stations, onStationSelect, selectedId }: MapProps) {
  const ukraineCenter: [number, number] = [48.3794, 31.1656];

  // Функція створення кастомної SVG-іконки
  const createCustomIcon = (station: Station) => {
    const isActive = station.id === selectedId;
    
    // Кольорове кодування (можна розширити логіку)
    let color = "#10b981"; // Зелений
    if (station.id === "2") color = "#f59e0b"; // Помаранчевий
    if (station.id === "3") color = "#ef4444"; // Червоний

    const size = isActive ? 42 : 30;

    const svgHtml = `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 6px rgb(0 0 0 / 0.3))">
        <path d="M12 21C15.5 17.4 19 14.1765 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1765 8.5 17.4 12 21Z" 
              fill="${color}" 
              stroke="${isActive ? '#000' : '#fff'}" 
              stroke-width="${isActive ? '3' : '1.5'}"/>
        <circle cx="12" cy="10" r="3" fill="white"/>
      </svg>
    `;

    return L.divIcon({
      html: svgHtml,
      className: "custom-map-marker",
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
      popupAnchor: [0, -size],
    });
  };

  const selectedCoords = stations.find(s => s.id === selectedId)?.coordinates || null;

  return (
    <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-inner relative z-0 border-4 border-white">
      <MapContainer 
        center={ukraineCenter} 
        zoom={6} 
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Плавне переміщення до обраної станції */}
        <RecenterMap coords={selectedCoords} />

        {stations.map((station) => (
          <Marker 
            key={station.id} 
            position={[station.coordinates.lat, station.coordinates.lng]}
            icon={createCustomIcon(station)}
            eventHandlers={{
              // Безпечний виклик через ?. щоб не було Runtime Error
              click: () => onStationSelect?.(station.id),
            }}
          >
            <Popup>
              <div className="p-1 min-w-[180px]">
                <h3 className="font-black text-slate-900 m-0 text-sm uppercase tracking-tight">
                  {station.name}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold mb-3">
                  {station.address}
                </p>
                <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 italic">Статус:</span>
                  <span className={`text-[10px] font-black ${station.id === '3' ? 'text-red-500' : 'text-emerald-600'}`}>
                    {station.id === '3' ? 'УВАГА' : 'НОРМА'}
                  </span>
                </div>
                <button 
                  onClick={() => window.location.href = `/stations/${station.id}`}
                  className="w-full mt-3 bg-slate-900 text-white text-[10px] font-black py-2 rounded uppercase tracking-widest hover:bg-emerald-600 transition-colors"
                >
                  Відкрити аналітику →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        <ZoomControl position="bottomright" />
      </MapContainer>

      {/* Індикатор стану в кутку карти */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
        {selectedId ? "📍 Об'єкт зафіксовано" : "🔍 Оберіть маркер на мапі"}
      </div>
    </div>
  );
}