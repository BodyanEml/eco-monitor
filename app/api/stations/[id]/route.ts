import { NextResponse } from "next/server";
import { getStationById, getMeasurements } from "@/services/stationService";
import { logger } from "@/lib/logger";

/**
 * GET /api/stations/[id]
 * Отримання детальної інформації про конкретну станцію та її останні заміри
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Відповідно до стандартів Next.js 15+
) {
  // 1. Отримуємо ID з параметрів (через await, бо це Promise)
  const { id } = await params;
  
  // Генеруємо унікальний ID запиту для відстеження в логах (traceId)
  const requestId = Math.random().toString(36).substring(7);

  try {
    // Рівень DEBUG: Логуємо початок обробки запиту
    logger.debug({ requestId, stationId: id }, "API: Початок обробки запиту даних станції");

    // 2. Спроба отримати дані станції
    const station = await getStationById(id);

    // Перевірка на існування (Частина 3.1: Обробка 404 на сервері)
    if (!station) {
      // Рівень WARN: Станція не знайдена (не критично, але важливо знати)
      logger.warn({ requestId, stationId: id }, "API 404: Запитувану станцію не знайдено в базі");
      
      return NextResponse.json(
        { 
          error: "Not Found", 
          message: `Станцію з ідентифікатором ${id} не знайдено`,
          requestId 
        },
        { status: 404 }
      );
    }

    // 3. Спроба отримати заміри
    const measurements = await getMeasurements(id);

    logger.info(
      { requestId, stationId: id, measurementsCount: measurements.length }, 
      "API 200: Дані станції та заміри успішно сформовано"
    );

    // Повертаємо об'єднані дані
    return NextResponse.json({
      station,
      measurements,
      status: "success",
      requestId
    });

  } catch (error) {
    // Рівень ERROR: Критична помилка (Частина 3.2: Логування контексту помилки)
    logger.error({ 
      requestId,
      stationId: id,
      method: "GET",
      error: error instanceof Error ? error.message : "Unknown System Error",
      stack: error instanceof Error ? error.stack : undefined 
    }, "API 500: Критичний збій сервера при обробці запиту");

    return NextResponse.json(
      { 
        error: "Internal Server Error", 
        message: "Сталася внутрішня помилка сервера. Ми вже працюємо над її вирішенням.",
        requestId 
      },
      { status: 500 }
    );
  }
}