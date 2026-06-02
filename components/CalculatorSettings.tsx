import { useCalculator } from '../context/CalculatorContext';

export default function CalculatorSettings() {
  const { unit, setUnit, targetBG, setTargetBG, isf, setIsf, icr, setIcr } = useCalculator();

  const handleUnitChange = (newUnit: 'mg/dL' | 'mmol/L') => {
    if (newUnit === unit) return;
    if (newUnit === 'mmol/L') {
      setTargetBG(parseFloat((targetBG / 18.016).toFixed(1)));
      setIsf(parseFloat((isf / 18.016).toFixed(1)));
    } else {
      setTargetBG(Math.round(targetBG * 18.016));
      setIsf(Math.round(isf * 18.016));
    }
    setUnit(newUnit);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
        <span className="text-sm font-medium text-slate-500">Measuring System</span>
        <div className="bg-slate-100 p-1 rounded-lg inline-flex">
          <button 
            type="button"
            onClick={() => handleUnitChange('mg/dL')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${unit === 'mg/dL' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >mg/dL</button>
          <button 
            type="button"
            onClick={() => handleUnitChange('mmol/L')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${unit === 'mmol/L' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >mmol/L</button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Target Level</label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            type="number"
            step={unit === 'mg/dL' ? '1' : '0.1'}
            value={targetBG}
            onChange={(e) => setTargetBG(parseFloat(e.target.value) || 0)}
            className="block w-full rounded-lg border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 text-xs font-mono">{unit}</div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Sensitivity Factor (ISF)</label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            type="number"
            step={unit === 'mg/dL' ? '1' : '0.1'}
            value={isf}
            onChange={(e) => setIsf(parseFloat(e.target.value) || 0)}
            className="block w-full rounded-lg border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 text-xs font-mono">{unit}/U</div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">Carbohydrate Ratio (ICR)</label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            type="number"
            value={icr}
            onChange={(e) => setIcr(parseFloat(e.target.value) || 0)}
            className="block w-full rounded-lg border-slate-200 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 text-xs font-mono">g/Unit</div>
        </div>
      </div>
    </div>
  );
}