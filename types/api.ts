import { Station, Measurement } from "./environmental";

/**
 * 1. Опис можливих помилок
 */
export interface ApiError {
  message: string;      // Зрозуміле повідомлення для користувача
  code: string;         // Технічний код помилки (напр. 'NOT_FOUND', 'UNAUTHORIZED')
  details?: string[];   // Додаткові деталі (напр. список невалідних полів)
}

/**
 * 2. Формат відповідей від API (Generic Wrapper)
 */
export interface ApiResponse<T> {
  data: T | null;       // Самі дані (або null, якщо помилка)
  error: ApiError | null; // Об'єкт помилки (або null, якщо все ок)
  meta?: {              // Мета-дані (напр. для пагінації)
    total: number;
    page: number;
    limit: number;
  };
}

/**
 * 3. Структура запитів до сервера (Query Parameters)
 * Використовується для фільтрації, сортування та пагінації
 */
export interface ApiQueryParams {
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'timestamp' | 'value';
  order?: 'asc' | 'desc';
  stationId?: string;
  dateFrom?: string;    // ISO дата
  dateTo?: string;      // ISO дата
  pollutantType?: string; // напр. 'pm25'
}

/**
 * Приклади конкретних типів відповідей для зручності:
 */
export type StationListResponse = ApiResponse<Station[]>;
export type SingleStationResponse = ApiResponse<Station>;
export type MeasurementResponse = ApiResponse<Measurement[]>;