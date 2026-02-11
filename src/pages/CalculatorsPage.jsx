import { useState } from 'react';

import { calcBuilding, calcSlab }       from '../utils/calculator/core';
import { CALCULATOR_DEFAULTS, DEFAULT_MATERIAL_RATES } from '../config/constants';
import { formatCurrency, formatNumber, safeFloat }     from '../utils/helpers';

// ── Initial form state ──────────────────────────────────────────────────────

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

// ── Helpers ─────────────────────────────────────────────────────────────────

const MATERIAL_FIELDS = [
  { field: 'cementRate',    label: 'Cement',    unit: 'per bag', placeholder: String(DEFAULT_MATERIAL_RATES.cement) },
  { field: 'steelRate',     label: 'Steel',     unit: 'per kg',  placeholder: String(DEFAULT_MATERIAL_RATES.steel) },
  { field: 'sandRate',      label: 'Sand',      unit: 'per m³',  placeholder: String(DEFAULT_MATERIAL_RATES.sand) },
  { field: 'aggregateRate', label: 'Aggregate', unit: 'per m³',  placeholder: String(DEFAULT_MATERIAL_RATES.aggregate) },
];

const BREAKDOWN_ROWS = [
  { label: 'Material Cost',  key: 'materialCost' },
  { label: 'Labor Cost',     key: 'laborCost' },
  { label: 'Finishing Cost', key: 'finishingCost' },
  { label: 'Contingency',    key: 'contingencyCost' },
];

const MATERIAL_RESULT_ROWS = [
  { icon: '🔨', label: 'Cement',    key: 'cement',    unit: 'bags', decimals: 0 },
  { icon: '🗝️', label: 'Steel',     key: 'steel',     unit: 'kg',   decimals: 0 },
  { icon: '⛰️', label: 'Sand',      key: 'sand',      unit: 'm³',   decimals: 2 },
  { icon: '🪨', label: 'Aggregate', key: 'aggregate', unit: 'm³',   decimals: 2 },
];

// ── Component ────────────────────────────────────────────────────────────────

function CalculatorPage() {
  const [inputs,          setInputs]          = useState(INITIAL_INPUTS);
  const [buildingResults, setBuildingResults] = useState(null);
  const [slabResults,     setSlabResults]     = useState(null);

  // Generic field updater — handles checkboxes and regular inputs
  const updateField = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleCalculateBuilding = () => {
    const area = safeFloat(inputs.area, 0);
    const rate = safeFloat(inputs.rate, 0);
    if (area <= 0) return alert('Please enter a valid built-up area.');
    if (rate <= 0) return alert('Please enter a valid rate per sq.ft.');

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

  const handleCalculateSlab = () => {
    const slabArea      = safeFloat(inputs.slabArea, 0);
    const slabThickness = safeFloat(inputs.slabThickness, 0);
    if (slabArea      <= 0) return alert('Please enter a valid slab area.');
    if (slabThickness <= 0) return alert('Please enter a valid slab thickness.');
    setSlabResults(calcSlab(slabArea, slabThickness));
  };

  const handleReset = () => {
    setInputs(INITIAL_INPUTS);
    setBuildingResults(null);
    setSlabResults(null);
  };

  const onEnterBuildingCalc = (e) => {
    if (e.key === 'Enter') handleCalculateBuilding();
  };

  return (
    <div className="calc-page">
      <main className="calc-main">
        <div className="calc-grid">

          {/* ── Left Panel: Inputs ──────────────────── */}
          <section className="calc-input-section">
            <div className="calc-section-header">
              <h2>Project Parameters</h2>
              <button className="calc-btn-reset" onClick={handleReset}>↺ Reset</button>
            </div>

            {/* Primary Inputs */}
            <div className="calc-input-group">
              <label className="calc-label-primary">
                <span>Built-up Area</span>
                <span className="calc-label-unit">sq.ft</span>
              </label>
              <input
                type="number" className="calc-input-primary" placeholder="1300"
                value={inputs.area} onChange={updateField('area')} onKeyDown={onEnterBuildingCalc}
              />
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">
                <span>Rate per sq.ft</span>
                <span className="calc-label-unit">₹</span>
              </label>
              <input
                type="number" className="calc-input-primary" placeholder="1800"
                value={inputs.rate} onChange={updateField('rate')} onKeyDown={onEnterBuildingCalc}
              />
            </div>

            <div className="calc-divider" />
            <h3 className="calc-section-subtitle">Cost Breakdown</h3>

            {/* Labor */}
            <div className="calc-input-group">
              <label className="calc-label-secondary">
                Labor Cost
                <span className="calc-toggle-switch">
                  <input type="checkbox" checked={inputs.laborAuto} onChange={updateField('laborAuto')} />
                  <span className="calc-toggle-label">Auto %</span>
                </span>
              </label>
              {inputs.laborAuto
                ? <input type="number" className="calc-input-secondary" value={inputs.laborPercent} onChange={updateField('laborPercent')} />
                : <input type="number" className="calc-input-secondary" placeholder="Manual amount" value={inputs.laborManual} onChange={updateField('laborManual')} />
              }
            </div>

            {/* Finishing Quality */}
            <div className="calc-input-group">
              <label className="calc-label-secondary">Finishing Quality</label>
              <select
                className="calc-input-secondary calc-select-input"
                value={inputs.finishingQuality}
                onChange={updateField('finishingQuality')}
              >
                <option value="basic">Basic — ₹450/sq.ft</option>
                <option value="standard">Standard — ₹750/sq.ft</option>
                <option value="premium">Premium — ₹1200/sq.ft</option>
              </select>
            </div>

            {/* Contingency */}
            <div className="calc-input-group">
              <label className="calc-label-secondary">Contingency %</label>
              <input type="number" className="calc-input-secondary" value={inputs.contingency} onChange={updateField('contingency')} />
            </div>

            <div className="calc-divider" />
            <h3 className="calc-section-subtitle">Material Rates</h3>
            <div className="calc-material-grid">
              {MATERIAL_FIELDS.map(({ field, label, unit, placeholder }) => (
                <div className="calc-input-group" key={field}>
                  <label className="calc-label-secondary">
                    {label} <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{unit}</span>
                  </label>
                  <input
                    type="number" className="calc-input-secondary" placeholder={placeholder}
                    value={inputs[field]} onChange={updateField(field)}
                  />
                </div>
              ))}
            </div>

            <button className="calc-btn-primary" onClick={handleCalculateBuilding}>
              <span>Calculate Estimate</span> →
            </button>

            {/* ── RCC Slab ──────────────────────────── */}
            <div className="calc-divider" />
            <h3 className="calc-section-subtitle">RCC Slab</h3>

            <div className="calc-input-group">
              <label className="calc-label-secondary">
                Slab Area <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>sq.ft</span>
              </label>
              <input
                type="number" className="calc-input-secondary" placeholder="1300"
                value={inputs.slabArea} onChange={updateField('slabArea')}
              />
            </div>

            <div className="calc-input-group">
              <label className="calc-label-secondary">
                Thickness <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>ft</span>
              </label>
              <input
                type="number" className="calc-input-secondary"
                value={inputs.slabThickness} onChange={updateField('slabThickness')}
              />
            </div>

            <button className="calc-btn-secondary" onClick={handleCalculateSlab}>
              Calculate Slab
            </button>
          </section>

          {/* ── Right Panel: Results ────────────────── */}
          <section className="calc-results-section">

            {/* Building Results */}
            <div className="calc-result-card">
              <div className="calc-result-header">
                <h3>Building Estimate</h3>
                <div className={`calc-status-badge ${buildingResults ? 'calculated' : ''}`}>
                  {buildingResults ? 'Calculated' : 'Pending'}
                </div>
              </div>

              <div className="calc-result-total">
                <span className="calc-total-label">Total Project Cost</span>
                <span className="calc-total-amount">
                  {buildingResults ? formatCurrency(buildingResults.totalCost) : '₹ --'}
                </span>
              </div>

              <div className="calc-cost-breakdown">
                {BREAKDOWN_ROWS.map(({ label, key }) => (
                  <div className="calc-breakdown-item" key={key}>
                    <span className="calc-breakdown-label">{label}</span>
                    <span className="calc-breakdown-value">
                      {buildingResults ? formatCurrency(buildingResults[key]) : '₹ --'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="calc-divider-thin" />
              <h4 className="calc-subsection-title">Material Quantities</h4>
              <div className="calc-result-grid">
                {MATERIAL_RESULT_ROWS.map(({ icon, label, key, unit, decimals }) => (
                  <div className="calc-result-item" key={key}>
                    <div className="calc-item-icon">{icon}</div>
                    <div className="calc-item-details">
                      <span className="calc-item-label">{label}</span>
                      <span className="calc-item-value">
                        {buildingResults
                          ? `${formatNumber(buildingResults.materials[key], decimals)} ${unit}`
                          : `-- ${unit}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slab Results */}
            <div className="calc-result-card">
              <div className="calc-result-header">
                <h3>RCC Slab Estimate</h3>
                <div className={`calc-status-badge ${slabResults ? 'calculated' : ''}`}>
                  {slabResults ? 'Calculated' : 'Pending'}
                </div>
              </div>
              <div className="calc-slab-grid">
                <div className="calc-slab-item">
                  <span className="calc-slab-label">Concrete Volume</span>
                  <span className="calc-slab-value">
                    {slabResults ? `${formatNumber(slabResults.concreteVolume, 2)} m³` : '-- m³'}
                  </span>
                </div>
                <div className="calc-slab-item">
                  <span className="calc-slab-label">Cement Required</span>
                  <span className="calc-slab-value">
                    {slabResults ? `${formatNumber(slabResults.cementRequired, 0)} bags` : '-- bags'}
                  </span>
                </div>
                <div className="calc-slab-item">
                  <span className="calc-slab-label">Steel Required</span>
                  <span className="calc-slab-value">
                    {slabResults ? `${formatNumber(slabResults.steelRequired, 0)} kg` : '-- kg'}
                  </span>
                </div>
              </div>
              <div className="calc-slab-note">
                <span>ℹ️ Based on M20 grade concrete specifications</span>
              </div>
            </div>

            {/* Methodology Info */}
            <div className="calc-info-card">
              <h4>Calculation Methodology</h4>
              <ul>
                <li><strong>Materials:</strong> Cement (0.4 bags/sq.ft), Steel (4.0 kg/sq.ft), Sand (0.044 m³/sq.ft), Aggregate (0.088 m³/sq.ft)</li>
                <li><strong>Labor:</strong> Auto-calculated at 40% of material cost or manual input</li>
                <li><strong>Finishing:</strong> Basic (₹450/sq.ft), Standard (₹750/sq.ft), Premium (₹1200/sq.ft)</li>
                <li><strong>Contingency:</strong> Recommended 5–10% of subtotal</li>
                <li><strong>RCC Slab:</strong> M20 grade concrete, 8 bags cement/m³, 1% steel by volume</li>
              </ul>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}

export default CalculatorPage;