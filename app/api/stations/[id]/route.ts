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

    // 2. Спроба отримати дані станції
    const station = await getStationById(id);

    // Перевірка на існування (Частина 3.1: Обробка 404 на сервері)
    if (!station) {
      // Рівень WARN: Станція не знайдена (не критично, але важливо знати)
      
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


    // Повертаємо об'єднані дані
    return NextResponse.json({
      station,
      measurements,
      status: "success",
      requestId
    });

  } catch (error) {
    // Рівень ERROR: Критична помилка (Частина 3.2: Логування контексту помилки)

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