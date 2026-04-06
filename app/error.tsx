"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 1. Автоматичний запис критичної помилки з контекстом
    logger.error({
      msg: "CRITICAL_UI_ERROR",
      errorMessage: error.message,
      stack: error.stack,
      digest: error.digest, // Унікальний ID помилки в Next.js
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    }, "Критична помилка інтерфейсу зафіксована");
  }, [error]);

  // 2. Формування зрозумілого повідомлення для користувача
  const getFriendlyMessage = () => {
    if (error.message.includes("fetch")) return "Не вдалося з'єднатися з сервером. Перевірте інтернет.";
    if (error.message.includes("undefined")) return "Виникла проблема з відображенням даних. Ми вже лагодимо це.";
    return "Стався непередбачуваний збій у роботі системи.";
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          ⚠️
        </div>
        
        <h2 className="text-2xl font-black text-slate-900 mb-3">
          Упс! Щось пішло не так
        </h2>
        
        <p className="text-slate-500 mb-8 leading-relaxed">
          {getFriendlyMessage()}
          <br />
          <span className="text-[10px] font-mono opacity-50 block mt-2">
            ID помилки: {error.digest || "N/A"}
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all active:scale-95"
          >
            Спробувати знову
          </button>
          <a 
            href="/"
            className="bg-slate-100 text-slate-600 px-8 py-3 rounded-2xl font-bold hover:bg-slate-200 transition-all"
          >
            На головну
          </a>
        </div>
      </div>
    </div>
  );
}