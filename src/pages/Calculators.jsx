import { useState } from 'react';
import { calcBuilding, calcSlab } from '../utils/calculator/core';
import { CALCULATOR_DEFAULTS, DEFAULT_MATERIAL_RATES } from '../config/constants';
import { formatCurrency, formatNumber, safeFloat } from '../utils/helpers';

function Calculator() {
  const [inputs, setInputs] = useState({
    area: '', rate: '',
    laborAuto: true, laborPercent: CALCULATOR_DEFAULTS.laborPercent, laborManual: '',
    finishingQuality: CALCULATOR_DEFAULTS.finishingQuality,
    contingency: CALCULATOR_DEFAULTS.contingency,
    cementRate: '', steelRate: '', sandRate: '', aggregateRate: '',
    slabArea: '', slabThickness: CALCULATOR_DEFAULTS.slabThickness,
  });

  const [buildingResults, setBuildingResults] = useState(null);
  const [slabResults, setSlabResults]         = useState(null);

  const update = (field) => (e) =>
    setInputs(prev => ({ ...prev, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const runBuilding = () => {
    const area = safeFloat(inputs.area, 0);
    const rate = safeFloat(inputs.rate, 0);
    if (area <= 0) return alert('Please enter a valid built-up area.');
    if (rate <= 0) return alert('Please enter a valid rate per sq.ft.');
    setBuildingResults(calcBuilding({
      area, rate,
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

  const runSlab = () => {
    const slabArea      = safeFloat(inputs.slabArea, 0);
    const slabThickness = safeFloat(inputs.slabThickness, 0);
    if (slabArea <= 0)      return alert('Please enter a valid slab area.');
    if (slabThickness <= 0) return alert('Please enter a valid slab thickness.');
    setSlabResults(calcSlab(slabArea, slabThickness));
  };

  const reset = () => {
    setInputs({
      area: '', rate: '',
      laborAuto: true, laborPercent: CALCULATOR_DEFAULTS.laborPercent, laborManual: '',
      finishingQuality: CALCULATOR_DEFAULTS.finishingQuality,
      contingency: CALCULATOR_DEFAULTS.contingency,
      cementRate: '', steelRate: '', sandRate: '', aggregateRate: '',
      slabArea: '', slabThickness: CALCULATOR_DEFAULTS.slabThickness,
    });
    setBuildingResults(null);
    setSlabResults(null);
  };

  return (
    <div className="calc-page">
      <main className="calc-main">
        <div className="calc-grid">

          {/* Input Section */}
          <section className="calc-input-section">
            <div className="calc-section-header">
              <h2>Project Parameters</h2>
              <button className="calc-btn-reset" onClick={reset}>↺ Reset</button>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">
                <span>Built-up Area</span><span className="calc-label-unit">sq.ft</span>
              </label>
              <input type="number" className="calc-input-primary" placeholder="1300"
                value={inputs.area} onChange={update('area')}
                onKeyDown={(e) => e.key === 'Enter' && runBuilding()} />
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">
                <span>Rate per sq.ft</span><span className="calc-label-unit">₹</span>
              </label>
              <input type="number" className="calc-input-primary" placeholder="1800"
                value={inputs.rate} onChange={update('rate')}
                onKeyDown={(e) => e.key === 'Enter' && runBuilding()} />
            </div>

            <div className="calc-divider"></div>
            <h3 className="calc-section-subtitle">Cost Breakdown</h3>

            <div className="calc-input-group">
              <label className="calc-label-secondary">
                Labor Cost
                <span className="calc-toggle-switch">
                  <input type="checkbox" checked={inputs.laborAuto} onChange={update('laborAuto')} />
                  <span className="calc-toggle-label">Auto %</span>
                </span>
              </label>
              {inputs.laborAuto
                ? <input type="number" className="calc-input-secondary" value={inputs.laborPercent} onChange={update('laborPercent')} />
                : <input type="number" className="calc-input-secondary" placeholder="Manual amount" value={inputs.laborManual} onChange={update('laborManual')} />
              }
            </div>

            <div className="calc-input-group">
              <label className="calc-label-secondary">Finishing Quality</label>
              <select className="calc-input-secondary calc-select-input" value={inputs.finishingQuality} onChange={update('finishingQuality')}>
                <option value="basic">Basic — ₹450/sq.ft</option>
                <option value="standard">Standard — ₹750/sq.ft</option>
                <option value="premium">Premium — ₹1200/sq.ft</option>
              </select>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-secondary">Contingency %</label>
              <input type="number" className="calc-input-secondary" value={inputs.contingency} onChange={update('contingency')} />
            </div>

            <div className="calc-divider"></div>
            <h3 className="calc-section-subtitle">Material Rates</h3>
            <div className="calc-material-grid">
              {[
                { field: 'cementRate',    label: 'Cement',    unit: 'per bag', placeholder: String(DEFAULT_MATERIAL_RATES.cement) },
                { field: 'steelRate',     label: 'Steel',     unit: 'per kg',  placeholder: String(DEFAULT_MATERIAL_RATES.steel) },
                { field: 'sandRate',      label: 'Sand',      unit: 'per m³',  placeholder: String(DEFAULT_MATERIAL_RATES.sand) },
                { field: 'aggregateRate', label: 'Aggregate', unit: 'per m³',  placeholder: String(DEFAULT_MATERIAL_RATES.aggregate) },
              ].map(({ field, label, unit, placeholder }) => (
                <div className="calc-input-group" key={field}>
                  <label className="calc-label-secondary">{label} <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{unit}</span></label>
                  <input type="number" className="calc-input-secondary" placeholder={placeholder}
                    value={inputs[field]} onChange={update(field)} />
                </div>
              ))}
            </div>

            <button className="calc-btn-primary" onClick={runBuilding}>
              <span>Calculate Estimate</span> →
            </button>

            <div className="calc-divider"></div>
            <h3 className="calc-section-subtitle">RCC Slab</h3>

            <div className="calc-input-group">
              <label className="calc-label-secondary">Slab Area <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>sq.ft</span></label>
              <input type="number" className="calc-input-secondary" placeholder="1300"
                value={inputs.slabArea} onChange={update('slabArea')} />
            </div>
            <div className="calc-input-group">
              <label className="calc-label-secondary">Thickness <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>ft</span></label>
              <input type="number" className="calc-input-secondary"
                value={inputs.slabThickness} onChange={update('slabThickness')} />
            </div>
            <button className="calc-btn-secondary" onClick={runSlab}>Calculate Slab</button>
          </section>

          {/* Results Section */}
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
                {[
                  { label: 'Material Cost', key: 'materialCost' },
                  { label: 'Labor Cost',    key: 'laborCost' },
                  { label: 'Finishing Cost',key: 'finishingCost' },
                  { label: 'Contingency',   key: 'contingencyCost' },
                ].map(({ label, key }) => (
                  <div className="calc-breakdown-item" key={key}>
                    <span className="calc-breakdown-label">{label}</span>
                    <span className="calc-breakdown-value">
                      {buildingResults ? formatCurrency(buildingResults[key]) : '₹ --'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="calc-divider-thin"></div>
              <h4 className="calc-subsection-title">Material Quantities</h4>
              <div className="calc-result-grid">
                {[
                  { icon: '🔨', label: 'Cement',    key: 'cement',    unit: 'bags' },
                  { icon: '🗝️', label: 'Steel',     key: 'steel',     unit: 'kg' },
                  { icon: '⛰️', label: 'Sand',      key: 'sand',      unit: 'm³' },
                  { icon: '🪨', label: 'Aggregate',  key: 'aggregate', unit: 'm³' },
                ].map(({ icon, label, key, unit }) => (
                  <div className="calc-result-item" key={key}>
                    <div className="calc-item-icon">{icon}</div>
                    <div className="calc-item-details">
                      <span className="calc-item-label">{label}</span>
                      <span className="calc-item-value">
                        {buildingResults
                          ? `${formatNumber(buildingResults.materials[key], key === 'cement' || key === 'steel' ? 0 : 2)} ${unit}`
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
                  <span className="calc-slab-value">{slabResults ? `${formatNumber(slabResults.concreteVolume, 2)} m³` : '-- m³'}</span>
                </div>
                <div className="calc-slab-item">
                  <span className="calc-slab-label">Cement Required</span>
                  <span className="calc-slab-value">{slabResults ? `${formatNumber(slabResults.cementRequired, 0)} bags` : '-- bags'}</span>
                </div>
                <div className="calc-slab-item">
                  <span className="calc-slab-label">Steel Required</span>
                  <span className="calc-slab-value">{slabResults ? `${formatNumber(slabResults.steelRequired, 0)} kg` : '-- kg'}</span>
                </div>
              </div>
              <div className="calc-slab-note">
                <span>ℹ️ Based on M20 grade concrete specifications</span>
              </div>
            </div>

            {/* Info Card */}
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

export default Calculator;