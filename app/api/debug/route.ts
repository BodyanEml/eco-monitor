import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function GET() {
  const context = { requestId: "test-123", userRole: "student" };

  // 1. Debug - деталі, які зазвичай приховані в продакшені
  logger.debug(context, "DEBUG: Перевірка конфігурації підключення до сенсорів");

  // 2. Info - стандартна подія
  logger.info(context, "INFO: Користувач ініціював перевірку систем логування");

  // 3. Warn - потенційна проблема (наприклад, високе навантаження)
  logger.warn({ ...context, cpuUsage: "85%" }, "WARN: Виявлено підвищене навантаження на сервер обробки даних");

  // 4. Error - критична помилка
  try {
    throw new Error("Симуляція збою датчика PM2.5");
  } catch (err) {
    logger.error({ ...context, error: err instanceof Error ? err.message : err }, "ERROR: Критичний збій при читанні даних зі станції #3");
  }

  return NextResponse.json({ message: "Логи згенеровано. Перевірте консоль сервера!" });
}