import { Station, AirQualityIndicators, Measurement } from "../types/environmental";

// 1. Наші "фейкові" дані (Data Mock)
const MOCK_STATIONS: Station[] = [
  { id: '1', name: 'Центральна-01', address: 'вул. Хрещатик, 1', type: 'urban', coordinates: { lat: 50.45, lng: 30.52 } },
  { id: '2', name: 'ПромЗона-Північ', address: 'пр-т Бандери, 20', type: 'industrial', coordinates: { lat: 50.49, lng: 30.49 } },
  { id: '3', name: 'Паркова-Еко', address: 'Голосіївський парк', type: 'rural', coordinates: { lat: 50.38, lng: 30.51 } },
];

const MOCK_MEASUREMENTS: Measurement[] = [
  { id: 'm1', stationId: '1', timestamp: '2026-03-28T10:00:00Z', values: { pm25: 12, pm10: 22, no2: 15, o3: 30, so2: 4, co: 0.5 } },
  { id: 'm2', stationId: '1', timestamp: '2026-03-28T12:00:00Z', values: { pm25: 18, pm10: 35, no2: 25, o3: 28, so2: 6, co: 0.9 } },
  { id: 'm3', stationId: '1', timestamp: '2026-03-28T14:00:00Z', values: { pm25: 14, pm10: 28, no2: 18, o3: 35, so2: 5, co: 0.7 } },
];

// 2. Функції для головної сторінки (Page.tsx)
export async function getStations(): Promise<Station[]> {
  await new Promise(resolve => setTimeout(resolve, 100)); // імітація мережі
  return MOCK_STATIONS;
}

export async function getGlobalStats(): Promise<AirQualityIndicators> {
  return { pm25: 14.2, pm10: 28.5, no2: 18.1, o3: 35.0, so2: 5.2, co: 0.8 };
}

// 3. Функції для сторінки деталізації ([id]/page.tsx)
export async function getStationById(id: string): Promise<Station | undefined> {
  // Тепер getStations() існує, тому помилка зникне
  const stations = await getStations();
  return stations.find(s => s.id === id);
}

export async function getMeasurements(stationId: string): Promise<Measurement[]> {
  return MOCK_MEASUREMENTS.filter(m => m.stationId === stationId);
}