import { useCalculator } from '../context/CalculatorContext';

export default function SlidingScaleGenerator() {
  const { targetBG, isf, unit } = useCalculator();

  const scaleRows = Array.from({ length: 6 }, (_, index) => {
    const additionalUnits = index + 1;
    const stepBuffer = unit === 'mmol/L' ? 0.1 : 1;
    const minRange = targetBG + (additionalUnits - 1) * isf + stepBuffer;
    const maxRange = targetBG + additionalUnits * isf;

    return {
      units: additionalUnits,
      min: minRange.toFixed(unit === 'mmol/L' ? 1 : 0),
      max: maxRange.toFixed(unit === 'mmol/L' ? 1 : 0),
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="border-b border-slate-100 pb-4 mb-4">
        <h3 className="text-lg font-bold text-slate-900">Supplemental Sliding Scale Blueprint</h3>
        <p className="text-xs text-slate-400">Baseline Target: {targetBG}{unit} | Correction Factor: {isf}{unit} per unit.</p>
      </div>

      <div className="space-y-2">
        {scaleRows.map((row) => (
          <div key={row.units} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-sm text-slate-700">
              If Blood Glucose reads <strong className="font-mono bg-slate-200/60 px-1.5 py-0.5 rounded text-slate-900">{row.min} - {row.max}</strong> {unit}
            </span>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg">
              Administer +{row.units} {row.units === 1 ? 'Unit' : 'Units'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}