import { useState } from "react";

import {
  MATERIAL_CONSTANTS,
  DEFAULT_MATERIAL_RATES,
  SLAB_CONSTANTS,
  CONVERSIONS,
  CALCULATOR_DEFAULTS,
} from "../../config/constants";
import { formatCurrency, formatNumber, safeFloat } from "../../utils/helpers";

import "./calculatorpage.css";

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const FLOOR_OPTIONS = [
  { label: "G",   value: 1 },
  { label: "G+1", value: 2 },
  { label: "G+2", value: 3 },
  { label: "G+3", value: 4 },
];

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

function calcEstimate({
  plotArea, floors, ratePerSqft, locationFactor,
  cementRate, steelRate, sandRate, aggregateRate,
  laborPercent, contingency,
}) {
  const area     = safeFloat(plotArea, 0) * floors;
  const userRate = safeFloat(ratePerSqft, 1650);
  const locMult  = safeFloat(locationFactor, 1.0);

  const cRate  = safeFloat(cementRate,    DEFAULT_MATERIAL_RATES.cement);
  const sRate  = safeFloat(steelRate,     DEFAULT_MATERIAL_RATES.steel);
  const sdRate = safeFloat(sandRate,      DEFAULT_MATERIAL_RATES.sand);
  const agRate = safeFloat(aggregateRate, DEFAULT_MATERIAL_RATES.aggregate);

  const cementQty    = area * MATERIAL_CONSTANTS.cement;
  const steelQty     = area * MATERIAL_CONSTANTS.steel;
  const sandQty      = area * MATERIAL_CONSTANTS.sand;
  const aggregateQty = area * MATERIAL_CONSTANTS.aggregate;

  const cementCost    = cementQty    * cRate;
  const steelCost     = steelQty     * sRate;
  const sandCost      = sandQty      * sdRate;
  const aggregateCost = aggregateQty * agRate;
  const materialCost  = cementCost + steelCost + sandCost + aggregateCost;

  const labourCost    = materialCost * (safeFloat(laborPercent, CALCULATOR_DEFAULTS.laborPercent) / 100);
  const finishingCost = area * userRate;
  const otherCost     = materialCost * 0.08;

  const subtotal        = materialCost + labourCost + finishingCost + otherCost;
  const contingencyCost = subtotal * (safeFloat(contingency, CALCULATOR_DEFAULTS.contingency) / 100);
  const totalCost       = subtotal * locMult + contingencyCost;

  const items = [
    { key: "steel",     label: "Steel",     cost: steelCost,     qty: `${formatNumber(steelQty,     0)} kg`,   barClass: "calc-bar-steel"     },
    { key: "labour",    label: "Labour",    cost: labourCost,    qty: null,                                     barClass: "calc-bar-labour"    },
    { key: "cement",    label: "Cement",    cost: cementCost,    qty: `${formatNumber(cementQty,    0)} bags`,  barClass: "calc-bar-cement"    },
    { key: "sand",      label: "Sand",      cost: sandCost,      qty: `${formatNumber(sandQty,      2)} m³`,    barClass: "calc-bar-sand"      },
    { key: "aggregate", label: "Aggregate", cost: aggregateCost, qty: `${formatNumber(aggregateQty, 2)} m³`,    barClass: "calc-bar-aggregate" },
    { key: "other",     label: "Other",     cost: otherCost,     qty: null,                                     barClass: "calc-bar-other"     },
  ];

  return {
    totalCost,
    area,
    baseRate: Math.round(userRate * locMult),
    items,
    cementQty, steelQty, sandQty, aggregateQty,
  };
}

function calcSlab(slabArea, slabThickness) {
  const areaM2      = safeFloat(slabArea, 0)      * CONVERSIONS.sqftToSqm;
  const thicknessM  = safeFloat(slabThickness, 0) * CONVERSIONS.ftToM;
  const concreteVol = areaM2 * thicknessM;
  const cementBags  = concreteVol * SLAB_CONSTANTS.cementPerCubicMeter;
  const steelKg     = concreteVol * SLAB_CONSTANTS.steelPercent * SLAB_CONSTANTS.steelDensity;
  return { concreteVol, cementBags, steelKg };
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function CalculatorsPage() {
  const [plotArea,       setPlotArea]       = useState("");
  const [floors,         setFloors]         = useState(1);
  const [ratePerSqft,    setRatePerSqft]    = useState("");
  const [locationFactor, setLocationFactor] = useState("1.0");
  const [cementRate,     setCementRate]     = useState("");
  const [steelRate,      setSteelRate]      = useState("");
  const [sandRate,       setSandRate]       = useState("");
  const [aggregateRate,  setAggregateRate]  = useState("");
  const [laborPercent,   setLaborPercent]   = useState(String(CALCULATOR_DEFAULTS.laborPercent));
  const [contingency,    setContingency]    = useState(String(CALCULATOR_DEFAULTS.contingency));
  const [slabArea,       setSlabArea]       = useState("");
  const [slabThickness,  setSlabThickness]  = useState(String(CALCULATOR_DEFAULTS.slabThickness));
  const [results,        setResults]        = useState(null);
  const [slabResults,    setSlabResults]    = useState(null);

  const handleCalculate = () => {
    if (!safeFloat(plotArea, 0)) { alert("Please enter a valid plot area."); return; }
    if (!safeFloat(ratePerSqft, 0)) { alert("Please enter a valid construction rate per sq.ft."); return; }
    setResults(calcEstimate({ plotArea, floors, ratePerSqft, locationFactor, cementRate, steelRate, sandRate, aggregateRate, laborPercent, contingency }));
  };

  const handleCalcSlab = () => {
    if (!safeFloat(slabArea, 0)) { alert("Please enter a valid slab area."); return; }
    if (!safeFloat(slabThickness, 0)) { alert("Please enter a valid slab thickness."); return; }
    setSlabResults(calcSlab(slabArea, slabThickness));
  };

  const handleReset = () => {
    setPlotArea(""); setFloors(1); setRatePerSqft(""); setLocationFactor("1.0");
    setCementRate(""); setSteelRate(""); setSandRate(""); setAggregateRate("");
    setLaborPercent(String(CALCULATOR_DEFAULTS.laborPercent));
    setContingency(String(CALCULATOR_DEFAULTS.contingency));
    setSlabArea(""); setSlabThickness(String(CALCULATOR_DEFAULTS.slabThickness));
    setResults(null); setSlabResults(null);
  };

  const maxCost = results ? Math.max(...results.items.map((i) => i.cost)) : 1;

  const EMPTY_ITEMS = [
    { key: "steel",     label: "Steel",     cost: 0, qty: null, barClass: "calc-bar-steel"     },
    { key: "labour",    label: "Labour",    cost: 0, qty: null, barClass: "calc-bar-labour"    },
    { key: "cement",    label: "Cement",    cost: 0, qty: null, barClass: "calc-bar-cement"    },
    { key: "sand",      label: "Sand",      cost: 0, qty: null, barClass: "calc-bar-sand"      },
    { key: "aggregate", label: "Aggregate", cost: 0, qty: null, barClass: "calc-bar-aggregate" },
    { key: "other",     label: "Other",     cost: 0, qty: null, barClass: "calc-bar-other"     },
  ];

  return (
    <div className="calc-page">
      <main className="calc-main">
        <div className="calc-grid">

          {/* ══════════ LEFT: INPUTS ══════════ */}
          <section className="calc-input-section">

            <div className="calc-section-header">
              <div className="calc-panel-label">
                <span className="label-icon">▣</span>
                ENTER YOUR AREA (SQ.FT.)
              </div>
              <button className="calc-btn-reset" onClick={handleReset}>↺ Reset</button>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">
                Plot Area <span className="calc-label-unit">sq.ft</span>
              </label>
              <input type="number" className="calc-input-primary"
                placeholder="e.g. 1000" value={plotArea}
                onChange={(e) => setPlotArea(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCalculate()} />
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">
                Construction Rate <span className="calc-label-unit">₹ / sq.ft</span>
              </label>
              <input type="number" className="calc-input-primary"
                placeholder="e.g. 1650" value={ratePerSqft}
                onChange={(e) => setRatePerSqft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCalculate()} />
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">Number of Floors</label>
              <div className="calc-floor-buttons">
                {FLOOR_OPTIONS.map((opt) => (
                  <button key={opt.value}
                    className={`calc-floor-btn ${floors === opt.value ? "active" : ""}`}
                    onClick={() => setFloors(opt.value)}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">
                Location Factor <span className="calc-label-unit">{locationFactor}x</span>
              </label>
              <select className="calc-input-primary calc-select-input"
                value={locationFactor} onChange={(e) => setLocationFactor(e.target.value)}>
                <option value="0.8">Rural (0.8x)</option>
                <option value="1.0">Semi-Urban (1.0x)</option>
                <option value="1.2">Urban (1.2x)</option>
                <option value="1.5">Metro (1.5x)</option>
              </select>
            </div>

            <div className="calc-divider" />
            <div className="calc-section-subtitle">Material Rates (optional)</div>

            <div className="calc-material-grid">
              <div className="calc-input-group">
                <label className="calc-label-secondary">Cement <span className="calc-rate-hint">per bag</span></label>
                <input type="number" className="calc-input-secondary"
                  placeholder={String(DEFAULT_MATERIAL_RATES.cement)}
                  value={cementRate} onChange={(e) => setCementRate(e.target.value)} />
              </div>
              <div className="calc-input-group">
                <label className="calc-label-secondary">Steel <span className="calc-rate-hint">per kg</span></label>
                <input type="number" className="calc-input-secondary"
                  placeholder={String(DEFAULT_MATERIAL_RATES.steel)}
                  value={steelRate} onChange={(e) => setSteelRate(e.target.value)} />
              </div>
              <div className="calc-input-group">
                <label className="calc-label-secondary">Sand <span className="calc-rate-hint">per m³</span></label>
                <input type="number" className="calc-input-secondary"
                  placeholder={String(DEFAULT_MATERIAL_RATES.sand)}
                  value={sandRate} onChange={(e) => setSandRate(e.target.value)} />
              </div>
              <div className="calc-input-group">
                <label className="calc-label-secondary">Aggregate <span className="calc-rate-hint">per m³</span></label>
                <input type="number" className="calc-input-secondary"
                  placeholder={String(DEFAULT_MATERIAL_RATES.aggregate)}
                  value={aggregateRate} onChange={(e) => setAggregateRate(e.target.value)} />
              </div>
            </div>

            <div className="calc-divider" />
            <div className="calc-section-subtitle">Labor & Contingency</div>

            <div className="calc-material-grid">
              <div className="calc-input-group">
                <label className="calc-label-secondary">Labor <span className="calc-rate-hint">% of material</span></label>
                <input type="number" className="calc-input-secondary"
                  placeholder="40" value={laborPercent}
                  onChange={(e) => setLaborPercent(e.target.value)} />
              </div>
              <div className="calc-input-group">
                <label className="calc-label-secondary">Contingency <span className="calc-rate-hint">%</span></label>
                <input type="number" className="calc-input-secondary"
                  placeholder="7" value={contingency}
                  onChange={(e) => setContingency(e.target.value)} />
              </div>
            </div>

            <button className="calc-btn-primary" onClick={handleCalculate}>
              CALCULATE ESTIMATE →
            </button>

            <div className="calc-divider" />
            <div className="calc-section-subtitle">RCC Slab Calculator</div>

            <div className="calc-input-group">
              <label className="calc-label-secondary">Slab Area <span className="calc-rate-hint">sq.ft</span></label>
              <input type="number" className="calc-input-secondary"
                placeholder="e.g. 1300" value={slabArea}
                onChange={(e) => setSlabArea(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCalcSlab()} />
            </div>
            <div className="calc-input-group">
              <label className="calc-label-secondary">Thickness <span className="calc-rate-hint">ft</span></label>
              <input type="number" className="calc-input-secondary"
                placeholder="0.41" value={slabThickness}
                onChange={(e) => setSlabThickness(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCalcSlab()} />
            </div>
            <button className="calc-btn-secondary" onClick={handleCalcSlab}>
              CALCULATE SLAB
            </button>
          </section>

          {/* ══════════ RIGHT: RESULTS ══════════ */}
          <section className="calc-results-section">

            {/* Cost Estimate */}
            <div className="calc-result-card">
              <div className="calc-result-header">
                <h3><span className="header-icon">₹</span> COST ESTIMATE</h3>
                <div className={`calc-status-badge ${results ? "calculated" : ""}`}>
                  {results ? "Calculated" : "Pending"}
                </div>
              </div>

              <div className="calc-estimate-box">
                <div className="calc-estimate-label">Estimated Total Cost</div>
                <div className="calc-estimate-amount">
                  {results ? formatCurrency(results.totalCost) : "₹ --"}
                </div>
                {results && (
                  <div className="calc-estimate-meta">
                    <span>Rate: <strong>₹{results.baseRate.toLocaleString("en-IN")}/sq.ft</strong></span>
                    <span>Area: <strong>{results.area.toLocaleString("en-IN")} sq.ft</strong></span>
                    <span>Floors: <strong>{floors}</strong></span>
                  </div>
                )}
              </div>

              <div className="calc-breakdown-header"><span>▣</span> MATERIAL BREAKDOWN</div>
              <div className="calc-breakdown-list">
                {(results ? results.items : EMPTY_ITEMS).map((item) => {
                  const pct    = results ? Math.round((item.cost / results.totalCost) * 100) : 0;
                  const barPct = results ? Math.round((item.cost / maxCost) * 100) : 0;
                  return (
                    <div className="calc-breakdown-row" key={item.key}>
                      <span className="calc-breakdown-name">
                        {item.label}{results ? ` (${pct}%)` : ""}
                      </span>
                      <div className="calc-breakdown-bar-wrap">
                        <div className={`calc-breakdown-bar ${item.barClass}`}
                          style={{ width: `${barPct}%` }} />
                      </div>
                      <div className="calc-breakdown-right">
                        <span className="calc-breakdown-cost">
                          {results ? formatCurrency(item.cost) : "₹ --"}
                        </span>
                        {item.qty && <span className="calc-breakdown-qty">{item.qty}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RCC Slab */}
            <div className="calc-result-card">
              <div className="calc-result-header">
                <h3>RCC SLAB ESTIMATE</h3>
                <div className={`calc-status-badge ${slabResults ? "calculated" : ""}`}>
                  {slabResults ? "Calculated" : "Pending"}
                </div>
              </div>
              <div className="calc-slab-grid">
                <div className="calc-slab-item">
                  <span className="calc-slab-label">Concrete Volume</span>
                  <span className="calc-slab-value">
                    {slabResults ? `${formatNumber(slabResults.concreteVol, 2)} m³` : "-- m³"}
                  </span>
                </div>
                <div className="calc-slab-item">
                  <span className="calc-slab-label">Cement Required</span>
                  <span className="calc-slab-value">
                    {slabResults ? `${formatNumber(slabResults.cementBags, 0)} bags` : "-- bags"}
                  </span>
                </div>
                <div className="calc-slab-item">
                  <span className="calc-slab-label">Steel Required</span>
                  <span className="calc-slab-value">
                    {slabResults ? `${formatNumber(slabResults.steelKg, 0)} kg` : "-- kg"}
                  </span>
                </div>
              </div>
              <div className="calc-slab-note">
                ℹ️ Based on M20 grade concrete — 1% steel by volume, 8 bags cement/m³
              </div>
            </div>

            {/* Methodology */}
            <div className="calc-info-card">
              <h4>Calculation Methodology</h4>
              <ul>
                <li><strong>Materials:</strong> Cement 0.4 bags/sq.ft · Steel 4.0 kg/sq.ft · Sand 0.044 m³/sq.ft · Aggregate 0.088 m³/sq.ft</li>
                <li><strong>Rate:</strong> User-entered construction rate per sq.ft, multiplied by location factor</li>
                <li><strong>Total Area:</strong> Plot area × number of floors</li>
                <li><strong>Labor:</strong> Calculated as % of material cost (default 40%)</li>
                <li><strong>Location:</strong> Rural 0.8× · Semi-Urban 1.0× · Urban 1.2× · Metro 1.5×</li>
                <li><strong>Contingency:</strong> Applied on subtotal (recommended 5–10%)</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default CalculatorsPage;