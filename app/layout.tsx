import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "EcoMonitor | Система екологічного моніторингу",
  description: "Лабораторна робота з веб-орієнтованої розробки",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        
        {/* Шапка (Header) */}
        <header className="bg-emerald-800 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌿</span>
              <div>
                <h1 className="text-xl font-bold leading-none tracking-tight">EcoMonitor</h1>
                <p className="text-[10px] uppercase tracking-widest opacity-70 italic">Ukraine Online</p>
              </div>
            </div>

            {/* Оновлена Навігація */}
            <nav>
              <ul className="flex gap-6 sm:gap-8 text-sm font-medium">
                <li>
                  <a href="/" className="hover:text-emerald-300 transition-colors py-2">Головна</a>
                </li>
                <li>
                  <a href="/guide" className="hover:text-emerald-300 transition-colors py-2">Довідник</a>
                </li>
                <li>
                  <a href="/about" className="hover:text-emerald-300 transition-colors py-2">Про проєкт</a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Основний контент (Main) */}
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        {/* Підвал (Footer) */}
        <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="text-slate-200 font-semibold mb-2">Система екологічного моніторингу</div>
                <p className="text-xs italic max-w-sm">
                  Розробка веб-орієнтованих систем моніторингу якості повітря та навколишнього середовища.
                </p>
              </div>
              <div className="text-center md:text-right">
                <div className="flex flex-col gap-1">
                  <p className="text-xs opacity-50">Дисципліна: Веб-орієнтована розробка</p>
                  <p className="text-xs opacity-50 uppercase tracking-tighter">Лабораторна робота №1</p>
                  <p className="text-emerald-500 font-mono text-xs mt-2 font-bold tracking-widest">
                    © 2026 ECOMONITOR FRAMEWORK
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}