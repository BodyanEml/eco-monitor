export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-black text-slate-900 mb-6 border-l-4 border-emerald-500 pl-4">
          Про проєкт EcoMonitor
        </h1>
        
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-900">EcoMonitor</strong> — це сучасна веб-орієнтована система 
            екологічного моніторингу, розроблена для відстеження якості повітря в містах України.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-4 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-slate-900 mb-2 underline decoration-emerald-300">Мета проєкту</h3>
              <p className="text-sm">Забезпечення громадян актуальною інформацією про рівень забруднення та популяризація екологічної свідомості.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <h3 className="font-bold text-slate-900 mb-2 underline decoration-emerald-300">Технології</h3>
              <p className="text-sm">Побудовано на Next.js 15, TypeScript та Tailwind CSS з використанням серверного рендерингу (SSR).</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 italic pt-6 border-t">
            Дані на цьому ресурсі є демонстраційними та використовуються в рамках навчальної лабораторної роботи.
          </p>
        </div>
      </div>
    </div>
  );
}