import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import { WebVitals } from "@/components/features/WebVitals";
import AnalyticsTracker from "@/components/features/AnalyticsTracker";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "EcoMonitor | Система екологічного моніторингу",
  description: "Веб-платформа для аналізу якості повітря та екологічного стану",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        
        {/* 1. АНАЛІТИЧНІ ТРЕКЕРИ (Невидимі компоненти) */}
        <WebVitals /> 
        <AnalyticsTracker />

        {/* 2. ШАПКА (Header) */}
        <header className="bg-emerald-800 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-pulse">🌿</span>
              <div>
                <h1 className="text-xl font-bold leading-none tracking-tight">EcoMonitor</h1>
                <p className="text-[10px] uppercase tracking-widest opacity-70 italic">Ukraine Online</p>
              </div>
            </div>

            <nav>
              <ul className="flex gap-6 sm:gap-8 text-sm font-medium">
                <li>
                  <a href="/" className="hover:text-emerald-300 transition-colors py-2 border-b-2 border-transparent hover:border-emerald-300">
                    Головна
                  </a>
                </li>
                <li>
                  <a href="/guide" className="hover:text-emerald-300 transition-colors py-2 border-b-2 border-transparent hover:border-emerald-300">
                    Довідник
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-emerald-300 transition-colors py-2 border-b-2 border-transparent hover:border-emerald-300">
                    Про проєкт
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* 3. ОСНОВНИЙ КОНТЕНТ (Main) */}
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        {/* 4. ПІДВАЛ (Footer) */}
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <div className="text-slate-200 font-bold text-lg mb-2 tracking-tight">
                  Система екологічного моніторингу
                </div>
                <p className="text-xs italic max-w-sm leading-relaxed opacity-60">
                  Розробка веб-орієнтованих систем збору та візуалізації даних якості повітря в реальному часі.
                </p>
              </div>
              
              <div className="text-center md:text-right space-y-2">
                <div className="inline-block px-4 py-1 rounded-full border border-slate-700 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Лабораторна робота №3
                </div>
                <p className="text-[11px] opacity-40">Дисципліна: Веб-орієнтована розробка</p>
                <p className="text-emerald-500 font-mono text-xs font-bold tracking-widest pt-2">
                  © 2026 ECOMONITOR FRAMEWORK
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* 5. GOOGLE ANALYTICS SCRIPT - прибрано зайвий пробіл в gaId */}
        <GoogleAnalytics gaId="G-8QSXEDTT6S" />

      </body>
    </html>
  );
}