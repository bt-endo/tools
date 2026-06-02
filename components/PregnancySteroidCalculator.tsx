import { useState } from 'react';

export default function PregnancySteroidCalculator() {
  const [baselineMeal, setBaselineMeal] = useState<number>(10);
  const [baselineBasal, setBaselineBasal] = useState<number>(24);

  const protocolDays = [
    { day: 1, name: "Day 1 (Initial Dose)", meal: 1.10, basal: 1.25, msg: "Initial resistance shift develops within 4 hours." },
    { day: 2, name: "Day 2 (Peak Range)", meal: 1.40, basal: 1.40, msg: "Substantial tissue block effect. Track metrics closely." },
    { day: 3, name: "Day 3 (Peak Range)", meal: 1.40, basal: 1.40, msg: "Resistance stays high despite secondary clearance path." },
    { day: 4, name: "Day 4 (Taper Step)", meal: 1.20, basal: 1.20, msg: "System clearance matches dropping steroid balance parameters." },
    { day: 5, name: "Day 5 (Stabilization)", meal: 1.10, basal: 1.10, msg: "Final stabilization window before base normalization." },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase">Base Meal Intake Dosing</label>
          <input type="range" min="4" max="30" value={baselineMeal} onChange={(e) => setBaselineMeal(parseInt(e.target.value) || 0)} className="w-full accent-blue-600 mt-2" />
          <p className="text-right font-mono text-xs font-bold text-slate-700 mt-1">{baselineMeal} Units</p>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase">Base Basal Insulin Delivery</label>
          <input type="range" min="10" max="60" value={baselineBasal} onChange={(e) => setBaselineBasal(parseInt(e.target.value) || 0)} className="w-full accent-blue-600 mt-2" />
          <p className="text-right font-mono text-xs font-bold text-slate-700 mt-1">{baselineBasal} Units</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
        <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">Antenatal Resistance Adjustment Ledger</h3>
        {protocolDays.map((d) => (
          <div key={d.day} className="flex flex-col sm:flex-row justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-xl gap-2 text-xs">
            <div>
              <span className="font-bold text-blue-600 block">{d.name}</span>
              <p className="text-slate-400 mt-0.5">{d.msg}</p>
            </div>
            <div className="flex gap-4 items-center font-mono">
              <div className="bg-white p-2 rounded border border-slate-200 min-w-[90px] text-center">
                <span className="text-[9px] text-slate-400 block font-sans">Meal Bolus</span>
                <strong className="text-slate-800 text-sm">{(baselineMeal * d.meal).toFixed(0)}U</strong>
              </div>
              <div className="bg-white p-2 rounded border border-slate-200 min-w-[90px] text-center">
                <span className="text-[9px] text-slate-400 block font-sans">Basal Delivery</span>
                <strong className="text-slate-800 text-sm">{(baselineBasal * d.basal).toFixed(0)}U</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}