"use client";

import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import { sendGAEvent } from '@next/third-parties/google';
import { Station } from "@/types/environmental";

// Відстеження подій мапи (Zoom та Move)
function MapAnalytics() {
  useMapEvents({
    zoomend: (e) => {
      sendGAEvent({ event: 'map_zoom', value: e.target.getZoom() });
    },
    moveend: (e) => {
      const center = e.target.getCenter();
      sendGAEvent({ event: 'map_move', label: `${center.lat.toFixed(4)},${center.lng.toFixed(4)}` });
    }
  });
  return null;
}

function RecenterMap({ coords }: { coords: { lat: number; lng: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (coords) map.setView([coords.lat, coords.lng], 12, { animate: true });
  }, [coords, map]);
  return null;
}

interface MapProps {
  stations: Station[];
  onStationSelect?: (id: string) => void;
  selectedId?: string | null;
}

export default function Map({ stations, onStationSelect, selectedId }: MapProps) {
  const ukraineCenter: [number, number] = [48.3794, 31.1656];

  const createCustomIcon = (station: Station) => {
    const isActive = station.id === selectedId;
    let color = station.id === "2" ? "#f59e0b" : station.id === "3" ? "#ef4444" : "#10b981";
    const size = isActive ? 42 : 30;

    const svgHtml = `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21C15.5 17.4 19 14.1765 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1765 8.5 17.4 12 21Z" 
              fill="${color}" stroke="${isActive ? '#000' : '#fff'}" stroke-width="${isActive ? '3' : '1.5'}"/>
        <circle cx="12" cy="10" r="3" fill="white"/>
      </svg>`;

    return L.divIcon({ html: svgHtml, className: "custom-marker", iconSize: [size, size], iconAnchor: [size / 2, size] });
  };

  const selectedCoords = stations.find(s => s.id === selectedId)?.coordinates || null;

  return (
    <div className="h-[500px] w-full rounded-3xl overflow-hidden relative z-0 border-4 border-white shadow-inner">
      <MapContainer center={ukraineCenter} zoom={6} zoomControl={false} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapAnalytics />
        <RecenterMap coords={selectedCoords} />

        {stations.map((station) => (
          <Marker 
            key={station.id} 
            position={[station.coordinates.lat, station.coordinates.lng]}
            icon={createCustomIcon(station)}
            eventHandlers={{
              click: () => {
                // ТРЕКІНГ: Клік на маркер
                sendGAEvent({ 
                  event: 'map_marker_click', 
                  station_id: station.id, 
                  station_name: station.name 
                });
                onStationSelect?.(station.id);
              },
            }}
          >
            <Popup>
              <div className="p-2 min-w-[150px]">
                <h3 className="font-bold text-slate-900 text-xs uppercase">{station.name}</h3>
                <button 
                  onClick={() => window.location.href = `/stations/${station.id}`}
                  className="w-full mt-3 bg-slate-900 text-white text-[10px] py-2 rounded font-bold hover:bg-emerald-600 transition-colors"
                >
                  Аналітика →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
}