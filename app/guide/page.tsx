export default function GuidePage() {
  const pollutants = [
    { name: 'PM2.5', full: 'Дрібнодисперсний пил', desc: 'Частинки розміром менше 2.5 мікрон. Найнебезпечніші, оскільки потрапляють глибоко в легені та кров.', color: 'bg-red-500' },
    { name: 'PM10', full: 'Грубодисперсний пил', desc: 'Частинки пилу, сажі, диму. Можуть викликати подразнення дихальних шляхів.', color: 'bg-orange-500' },
    { name: 'NO₂', full: 'Діоксид азоту', desc: 'Газ, що утворюється при спалюванні палива. Основне джерело — автомобільний транспорт.', color: 'bg-emerald-500' },
    { name: 'O₃', full: 'Озон', desc: 'Приземний озон, який утворюється при реакції газів на сонці. Викликає задишку та кашель.', color: 'bg-blue-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-black text-slate-900 mb-8 italic">📚 Довідник забруднювачів</h1>
      
      <div className="grid gap-6">
        {pollutants.map((p) => (
          <div key={p.name} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-6 items-start">
            <div className={`${p.color} text-white font-black px-4 py-2 rounded-lg text-xl min-w-[100px] text-center`}>
              {p.name}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{p.full}</h2>
              <p className="text-slate-500 text-sm mt-1">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}