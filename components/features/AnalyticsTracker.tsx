"use client";
import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker({ eventName, payload }: { eventName?: string, payload?: any }) {
  const pathname = usePathname();

  useEffect(() => {
    // Перевіряємо, чи ми на сторінці конкретної станції
    const isStationRoute = pathname.includes('/stations/') && pathname !== '/stations/';

    // Визначаємо групу контенту на основі URL
    const contentGroup = isStationRoute ? 'Station Details' :
                         pathname.includes('/guide') ? 'User Guide' :
                         pathname.includes('/about') ? 'About Project' : 'Dashboard';

    // Відправляємо базовий page_view з групою контенту
    sendGAEvent({ 
      event: 'page_view_custom', 
      page_path: pathname, 
      content_group: contentGroup 
    });

    // ТРЕКІНГ: Перегляд деталей моніторингової станції
    if (isStationRoute) {
      // Дістаємо ID станції з кінця URL (наприклад, "2" з "/stations/2")
      const stationId = pathname.split('/').pop();
      sendGAEvent({ 
        event: 'view_station_details', 
        station_id: stationId 
      });
    }

    // Якщо передано кастомну подію (наприклад, з інших компонентів)
    if (eventName) {
      sendGAEvent({ event: eventName, ...payload });
    }
  }, [pathname, eventName, payload]);

  return null;
}