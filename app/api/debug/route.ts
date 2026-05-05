import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function GET() {
  const context = { requestId: "test-123", userRole: "student" };

  // 4. Error - критична помилка
  try {
    throw new Error("Симуляція збою датчика PM2.5");
  } catch (err) {
  }

  return NextResponse.json({ message: "Логи згенеровано. Перевірте консоль сервера!" });
}