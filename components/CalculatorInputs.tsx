import { useCalculator } from '../context/CalculatorContext';

export default function CalculatorInputs() {
  const { currentBG, setCurrentBG, carbs, setCarbs, unit } = useCalculator();

  const bgMin = unit === 'mg/dL' ? 40 : 2.0;
  const bgMax = unit === 'mg/dL' ? 400 : 22.0;
  const bgStep = unit === 'mg/dL' ? 1 : 0.1;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-700">Current Blood Sugar</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              step={bgStep}
              value={currentBG}
              onChange={(e) => setCurrentBG(parseFloat(e.target.value) || 0)}
              className="w-20 p-1 text-right font-mono text-sm font-bold bg-slate-50 border border-slate-200 rounded"
            />
            <span className="text-xs text-slate-400 w-12 font-bold">{unit}</span>
          </div>
        </div>
        <input
          type="range"
          min={bgMin}
          max={bgMax}
          step={bgStep}
          value={currentBG}
          onChange={(e) => setCurrentBG(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <div className="space-y-2 pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-700">Meal Carbohydrates</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={carbs}
              onChange={(e) => setCarbs(parseInt(e.target.value) || 0)}
              className="w-20 p-1 text-right font-mono text-sm font-bold bg-slate-50 border border-slate-200 rounded"
            />
            <span className="text-xs text-slate-400 w-12 font-bold">grams</span>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="150"
          value={carbs}
          onChange={(e) => setCarbs(parseInt(e.target.value))}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>
    </div>
  );
}