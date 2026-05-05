import { Station, Measurement, AirQualityIndicators } from '@/types/environmental';
import { logger } from '@/lib/logger';

// 1. Статичні дані для демонстрації (Mock Data)
const MOCK_STATIONS: Station[] = [
  { 
    id: '1', 
    name: 'Центральна станція', 
    type: 'CITY', 
    address: 'вул. Хрещатик, 1', 
    coordinates: { lat: 50.4501, lng: 30.5234 } 
  },
  { 
    id: '2', 
    name: 'Промзона Схід', 
    type: 'INDUSTRIAL', 
    address: 'вул. Промислова, 42', 
    coordinates: { lat: 50.4300, lng: 30.6000 } 
  },
  { 
    id: '3', 
    name: 'Паркова зона (Тест помилок)', 
    type: 'PARK', 
    address: 'Парк Шевченка', 
    coordinates: { lat: 50.4418, lng: 30.5126 } 
  },
];

/**
 * Отримання списку всіх станцій
 */
export async function getStations(): Promise<Station[]> {
  // Рівень DEBUG: деталі виклику функції
  logger.debug('Виклик getStations: початок отримання списку');

  try {
    // Рівень INFO: успішна бізнес-подія
    logger.info({ count: MOCK_STATIONS.length }, 'Список станцій успішно завантажено');
    return MOCK_STATIONS;
  } catch (error) {
    // Рівень ERROR: критична проблема
    logger.error({ error: error instanceof Error ? error.message : error }, 'Критична помилка при отриманні списку станцій');
    return [];
  }
}

/**
 * Отримання станції за її ID
 */
export async function getStationById(id: string): Promise<Station | undefined> {
  const station = MOCK_STATIONS.find(s => s.id === id);

  if (!station) {
    // Рівень WARN: потенційна проблема (запит неіснуючого ресурсу)
    logger.warn({ stationId: id }, 'Попередження: Станцію з таким ID не знайдено в базі');
    return undefined;
  }

  logger.info({ stationId: id, name: station.name }, 'Дані станції успішно знайдено');
  return station;
}

/**
 * Отримання замірів для конкретної станції
 */
export async function getMeasurements(stationId: string): Promise<Measurement[]> {
  logger.debug({ stationId }, 'Ініціалізація генерації замірів для станції');

  // Симуляція перевірки прав або стану станції
  if (stationId === '3') {
    logger.warn({ stationId }, 'Увага: Станція працює в тестовому режимі з обмеженими даними');
  }

  // Створюємо масив замірів (імітація реальних даних за останні кілька годин)
  const measurements: Measurement[] = Array.from({ length: 12 }).map((_, i) => ({
    id: `m-${stationId}-${i}`,
    stationId,
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    values: {
      pm25: Number((Math.random() * 40 + 5).toFixed(1)),
      pm10: Number((Math.random() * 60 + 10).toFixed(1)),
      no2: Number((Math.random() * 30 + 5).toFixed(1)),
      o3: Number((Math.random() * 50 + 20).toFixed(1)),
      so2: Number((Math.random() * 10 + 2).toFixed(1)),
      co: Number((Math.random() * 2 + 0.1).toFixed(1)),
    }
  })).reverse();

  logger.info({ stationId, recordCount: measurements.length }, 'Пакет замірів успішно сформовано');
  
  return measurements;
}

/**
 * Отримання глобальної статистики
 */
export async function getGlobalStats(): Promise<AirQualityIndicators> {
  logger.debug('Розрахунок глобальної статистики мережі');
  
  // Рівень INFO: важливий агрегований звіт
  const stats = { 
    pm25: 18.2, 
    pm10: 34.5, 
    no2: 21.0, 
    o3: 45.3, 
    so2: 8.4, 
    co: 0.6 
  };

  logger.info(stats, 'Глобальну статистику по регіону оновлено');
  return stats;
}