import { useState } from 'react';
import { CalculatorProvider } from '../context/CalculatorContext';
import CalculatorInputs from '../components/CalculatorInputs';
import OutputDisplay from '../components/OutputDisplay';
import CalculatorSettings from '../components/CalculatorSettings';
import SlidingScaleGenerator from '../components/SlidingScaleGenerator';
import PregnancySteroidCalculator from '../components/PregnancySteroidCalculator';

export default function HomeDashboard() {
  const [activeTab, setActiveTab] = useState<'bolus' | 'scale' | 'steroids'>('bolus');

  return (
    <CalculatorProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans flex flex-col">
        <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm print:hidden">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs">B</div>
              <span className="font-bold text-base tracking-tight text-slate-900">bolus<span className="text-blue-600">.guide</span></span>
            </div>

            <nav className="bg-slate-100 p-1 rounded-xl flex border border-slate-200 w-full sm:w-auto text-xs">
              <button onClick={() => setActiveTab('bolus')} className={`flex-1 sm:flex-initial px-4 py-1.5 font-semibold rounded-lg transition-all ${activeTab === 'bolus' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}>Dosing Calculator</button>
              <button onClick={() => setActiveTab('scale')} className={`flex-1 sm:flex-initial px-4 py-1.5 font-semibold rounded-lg transition-all ${activeTab === 'scale' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}>Sliding Scale</button>
              <button onClick={() => setActiveTab('steroids')} className={`flex-1 sm:flex-initial px-4 py-1.5 font-semibold rounded-lg transition-all ${activeTab === 'steroids' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}`}>Pregnancy Steroids</button>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl w-full mx-auto px-4 py-8 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 print:hidden">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-1">Configuration Profiles</h3>
                <p className="text-[11px] text-slate-400 mb-4">Baseline values sync down across all calculations.</p>
                <CalculatorSettings />
              </div>
            </div>

            <div className="lg:col-span-8 w-full">
              {activeTab === 'bolus' && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start print:hidden">
                  <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"><CalculatorInputs /></div>
                  <div className="md:col-span-5"><OutputDisplay /></div>
                </div>
              )}

              {activeTab === 'scale' && (
                <div className="w-full max-w-xl mx-auto space-y-4">
                  <div className="flex justify-between items-center print:hidden bg-slate-100 p-3 rounded-xl border border-slate-200">
                    <span className="text-xs text-slate-500 font-medium">Export this lookup layout sheet to reference at home.</span>
                    <button onClick={() => window.print()} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow transition-colors">Print Sheet</button>
                  </div>
                  <SlidingScaleGenerator />
                </div>
              )}

              {activeTab === 'steroids' && (
                <div className="w-full max-w-2xl mx-auto"><PregnancySteroidCalculator /></div>
              )}
            </div>
          </div>
        </main>
      </div>
    </CalculatorProvider>
  );
}