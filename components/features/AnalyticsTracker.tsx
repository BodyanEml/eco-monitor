"use client";
import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker({ eventName, payload }: { eventName?: string, payload?: any }) {
  const pathname = usePathname();

  useEffect(() => {
    // Визначаємо групу контенту на основі URL
    const contentGroup = pathname.includes('/stations/') ? 'Station Details' :
                         pathname.includes('/guide') ? 'User Guide' :
                         pathname.includes('/about') ? 'About Project' : 'Dashboard';

    // Відправляємо базовий page_view з групою контенту
    sendGAEvent({ 
      event: 'page_view_custom', 
      page_path: pathname, 
      content_group: contentGroup 
    });

    // Якщо передано кастомну подію (наприклад, перегляд деталей)
    if (eventName) {
      sendGAEvent({ event: eventName, ...payload });
    }
  }, [pathname, eventName, payload]);

  return null;
}