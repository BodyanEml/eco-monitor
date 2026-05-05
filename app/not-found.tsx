export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-9xl font-black text-slate-200">404</h1>
      <div className="relative -mt-16">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">Станцію не знайдено</h2>
        <p className="text-slate-500 max-w-sm mx-auto mb-8">
          Здається, цей об'єкт моніторингу ще не встановлено або посилання застаріло.
        </p>
        <a 
          href="/" 
          className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
        >
          Повернутися до мапи
        </a>
      </div>
    </div>
  );
}