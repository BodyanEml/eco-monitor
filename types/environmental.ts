/** * 1. Дані про якість повітря (концентрації забруднювачів)
 * Значення зазвичай вимірюються в мкг/м³
 */
export interface AirQualityIndicators {
  pm25: number;   // Дрібнодисперсний пил (до 2.5 мкм)
  pm10: number;   // Пил (до 10 мкм)
  no2: number;    // Діоксид азоту
  o3: number;     // Озон
  so2: number;    // Діоксид сірки
  co: number;     // Оксид вуглецю
}

/**
 * 2. Інформація про моніторингову станцію
 */
export type StationType = 'urban' | 'industrial' | 'rural' | 'traffic';

export interface Station {
  id: string;               // Унікальний ідентифікатор
  name: string;             // Назва станції (напр. "Північна-1")
  address: string;          // Фізична адреса
  type: StationType;        // Тип станції (промислова, міська тощо)
  coordinates: {
    lat: number;            // Широта
    lng: number;            // Довгота
  };
}

/**
 * 3. Часові ряди вимірювань
 * Об'єднує мітку часу та самі показники
 */
export interface Measurement {
  id: string;               // ID конкретного вимірювання
  stationId: string;        // ID станції, до якої належить вимірювання
  timestamp: string;        // Дата і час у форматі ISO (напр. 2026-03-28T20:00:00Z)
  values: AirQualityIndicators;
}

/**
 * Додатковий інтерфейс для детальної сторінки станції
 * (де нам потрібна сама станція + історія її вимірювань)
 */
export interface StationDetail extends Station {
  lastUpdate: string;
  measurements: Measurement[];
}