import React, { createContext, useContext, useState, useEffect } from 'react';

interface CalculatorContextType {
  unit: 'mg/dL' | 'mmol/L';
  targetBG: number;
  isf: number;
  icr: number;
  setUnit: (unit: 'mg/dL' | 'mmol/L') => void;
  setTargetBG: (val: number) => void;
  setIsf: (val: number) => void;
  setIcr: (val: number) => void;
  currentBG: number;
  carbs: number;
  setCurrentBG: (val: number) => void;
  setCarbs: (val: number) => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [unit, setUnit] = useState<'mg/dL' | 'mmol/L'>('mg/dL');
  const [targetBG, setTargetBG] = useState<number>(100);
  const [isf, setIsf] = useState<number>(50);
  const [icr, setIcr] = useState<number>(10);
  const [currentBG, setCurrentBG] = useState<number>(120);
  const [carbs, setCarbs] = useState<number>(30);

  useEffect(() => {
    const saved = localStorage.getItem('bolus_guide_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUnit(parsed.unit || 'mg/dL');
        setTargetBG(parsed.targetBG || 100);
        setIsf(parsed.isf || 50);
        setIcr(parsed.icr || 10);
        setCurrentBG(parsed.unit === 'mmol/L' ? 7.0 : 120);
      } catch (e) {
        console.error("Failed to parse configurations", e);
      }
    }
  }, []);

  useEffect(() => {
    const settings = { unit, targetBG, isf, icr };
    localStorage.setItem('bolus_guide_settings', JSON.stringify(settings));
  }, [unit, targetBG, isf, icr]);

  return (
    <CalculatorContext.Provider value={{
      unit, targetBG, isf, icr, setUnit, setTargetBG, setIsf, setIcr,
      currentBG, carbs, setCurrentBG, setCarbs
    }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) throw new Error('useCalculator must be used within a CalculatorProvider');
  return context;
}