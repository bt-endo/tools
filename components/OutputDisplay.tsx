import { useCalculator } from '../context/CalculatorContext';

export default function OutputDisplay() {
  const { currentBG, carbs, targetBG, isf, icr, unit } = useCalculator();

  const mealDose = icr > 0 ? carbs / icr : 0;
  const correctionDose = isf > 0 && currentBG > targetBG ? (currentBG - targetBG) / isf : 0;
  const totalDose = mealDose + correctionDose;
  const roundedDose = (Math.round(totalDose * 2) / 2).toFixed(1);

  const isLow = unit === 'mg/dL' ? currentBG < 70 : currentBG < 3.9;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-6 border border-slate-800">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block mb-1">Recommended Calculation</span>
        <div className="flex items-baseline space-x-2">
          <span className="text-5xl font-black">{roundedDose}</span>
          <span className="text-lg text-slate-400 font-bold">Units</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">Raw calculation: {totalDose.toFixed(2)} U (rounded to nearest 0.5)</p>
      </div>

      <div className="space-y-2 border-t border-b border-slate-800 py-4 text-xs text-slate-400">
        <div className="flex justify-between">
          <span>Meal Dose ({carbs}g)</span>
          <span className="font-mono text-slate-200">+{mealDose.toFixed(2)} U</span>
        </div>
        <div className="flex justify-between">
          <span>Correction portion</span>
          <span className="font-mono text-slate-200">+{correctionDose.toFixed(2)} U</span>
        </div>
      </div>

      {isLow && (
        <div className="p-3 bg-red-950/40 border border-red-900 rounded-xl text-xs text-red-300">
          <strong>Notice: Low Blood Sugar.</strong> Consider taking quick carbohydrates. Verify dosage guidelines with an executive health provider.
        </div>
      )}
    </div>
  );
}