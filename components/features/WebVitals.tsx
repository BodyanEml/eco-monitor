"use client";

import { useReportWebVitals } from 'next/web-vitals';
import { sendGAEvent } from '@next/third-parties/google';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Відправляємо метрики швидкості в GA4
    // LCP - завантаження найбільшого елемента
    // FID - затримка першого введення
    // CLS - стабільність верстки
    sendGAEvent({
      event: 'web_vitals',
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true, // Метрика не впливає на показник відмов
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value);
    }
  });

  return null;
}