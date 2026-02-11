import { useState } from 'react';

import { calcBuilding, calcSlab }       from '../utils/calculator/core';
import { CALCULATOR_DEFAULTS }          from '../config/constants';
import { safeFloat }                    from '../utils/helpers';

// ── Default state ─────────────────────────────────────────────────────────────

const INITIAL_INPUTS = {
  area:             '',
  rate:             '',
  laborAuto:        true,
  laborPercent:     CALCULATOR_DEFAULTS.laborPercent,
  laborManual:      '',
  finishingQuality: CALCULATOR_DEFAULTS.finishingQuality,
  contingency:      CALCULATOR_DEFAULTS.contingency,
  cementRate:       '',
  steelRate:        '',
  sandRate:         '',
  aggregateRate:    '',
  slabArea:         '',
  slabThickness:    CALCULATOR_DEFAULTS.slabThickness,
};

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * useCalculator — encapsulates all calculator state and logic.
 *
 * Returns inputs, results, and action handlers so the CalculatorPage
 * component stays purely presentational.
 */
export function useCalculator() {
  const [inputs,          setInputs]          = useState(INITIAL_INPUTS);
  const [buildingResults, setBuildingResults] = useState(null);
  const [slabResults,     setSlabResults]     = useState(null);

  /** Generic field updater — handles both checkboxes and text inputs */
  const updateField = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  /** Run the building cost estimation */
  const calculateBuilding = () => {
    const area = safeFloat(inputs.area, 0);
    const rate = safeFloat(inputs.rate, 0);
    if (area <= 0) { alert('Please enter a valid built-up area.'); return; }
    if (rate <= 0) { alert('Please enter a valid rate per sq.ft.'); return; }

    setBuildingResults(calcBuilding({
      area,
      rate,
      laborAuto:        inputs.laborAuto,
      laborPercent:     safeFloat(inputs.laborPercent, CALCULATOR_DEFAULTS.laborPercent),
      laborManual:      safeFloat(inputs.laborManual, 0),
      finishingQuality: inputs.finishingQuality,
      contingency:      safeFloat(inputs.contingency, CALCULATOR_DEFAULTS.contingency),
      materialRates: {
        cement:    inputs.cementRate,
        steel:     inputs.steelRate,
        sand:      inputs.sandRate,
        aggregate: inputs.aggregateRate,
      },
    }));
  };

  /** Run the RCC slab estimation */
  const calculateSlab = () => {
    const slabArea      = safeFloat(inputs.slabArea, 0);
    const slabThickness = safeFloat(inputs.slabThickness, 0);
    if (slabArea      <= 0) { alert('Please enter a valid slab area.'); return; }
    if (slabThickness <= 0) { alert('Please enter a valid slab thickness.'); return; }
    setSlabResults(calcSlab(slabArea, slabThickness));
  };

  /** Reset all inputs and results */
  const reset = () => {
    setInputs(INITIAL_INPUTS);
    setBuildingResults(null);
    setSlabResults(null);
  };

  return {
    inputs,
    buildingResults,
    slabResults,
    updateField,
    calculateBuilding,
    calculateSlab,
    reset,
  };
}