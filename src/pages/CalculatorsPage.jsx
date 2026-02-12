import { useCalculator } from "../hooks/useCalculator";
import { DEFAULT_MATERIAL_RATES } from "../config/constants";
import { formatCurrency, formatNumber } from "../utils/helpers";

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS - UI Configuration
// ═══════════════════════════════════════════════════════════════════════════

const MATERIAL_FIELDS = [
  {
    field: "cementRate",
    label: "Cement",
    unit: "per bag",
    placeholder: String(DEFAULT_MATERIAL_RATES.cement),
  },
  {
    field: "steelRate",
    label: "Steel",
    unit: "per kg",
    placeholder: String(DEFAULT_MATERIAL_RATES.steel),
  },
  {
    field: "sandRate",
    label: "Sand",
    unit: "per m³",
    placeholder: String(DEFAULT_MATERIAL_RATES.sand),
  },
  {
    field: "aggregateRate",
    label: "Aggregate",
    unit: "per m³",
    placeholder: String(DEFAULT_MATERIAL_RATES.aggregate),
  },
];

const BREAKDOWN_ROWS = [
  { label: "Material Cost", key: "materialCost" },
  { label: "Labor Cost", key: "laborCost" },
  { label: "Finishing Cost", key: "finishingCost" },
  { label: "Contingency", key: "contingencyCost" },
];

const MATERIAL_RESULT_ROWS = [
  { icon: "🔨", label: "Cement", key: "cement", unit: "bags", decimals: 0 },
  { icon: "🗝️", label: "Steel", key: "steel", unit: "kg", decimals: 0 },
  { icon: "⛰️", label: "Sand", key: "sand", unit: "m³", decimals: 2 },
  { icon: "🪨", label: "Aggregate", key: "aggregate", unit: "m³", decimals: 2 },
];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT: CalculatorPage
// ═══════════════════════════════════════════════════════════════════════════

function CalculatorPage() {
  // ─────────────────────────────────────────────────────────────────────────
  // HOOKS - Using the custom useCalculator hook
  // ─────────────────────────────────────────────────────────────────────────

  const {
    inputs,
    buildingResults,
    slabResults,
    updateField,
    calculateBuilding,
    calculateSlab,
    reset,
  } = useCalculator();

  // ─────────────────────────────────────────────────────────────────────────
  // EVENT HANDLERS
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Handle Enter key press on building inputs
   */
  const onEnterBuildingCalc = (e) => {
    if (e.key === "Enter") calculateBuilding();
  };

  /**
   * Handle Enter key press on slab inputs
   */
  const onEnterSlabCalc = (e) => {
    if (e.key === "Enter") calculateSlab();
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="calc-page">
      <main className="calc-main">
        <div className="calc-grid">
          {/* ══════════════════════════════════════════════════════════════ */}
          {/* LEFT PANEL: INPUT SECTION                                      */}
          {/* ══════════════════════════════════════════════════════════════ */}

          <section className="calc-input-section">
            {/* Header with Reset Button */}
            <div className="calc-section-header">
              <h2>Project Parameters</h2>
              <button className="calc-btn-reset" onClick={reset}>
                ↺ Reset
              </button>
            </div>

            {/* ────────────────────────────────────────────────────────── */}
            {/* Primary Building Inputs                                    */}
            {/* ────────────────────────────────────────────────────────── */}

            <div className="calc-input-group">
              <label className="calc-label-primary">
                <span>Built-up Area</span>
                <span className="calc-label-unit">sq.ft</span>
              </label>
              <input
                type="number"
                className="calc-input-primary"
                placeholder="1300"
                value={inputs.area}
                onChange={updateField("area")}
                onKeyDown={onEnterBuildingCalc}
              />
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">
                <span>Rate per sq.ft</span>
                <span className="calc-label-unit">₹</span>
              </label>
              <input
                type="number"
                className="calc-input-primary"
                placeholder="1800"
                value={inputs.rate}
                onChange={updateField("rate")}
                onKeyDown={onEnterBuildingCalc}
              />
            </div>

            <div className="calc-divider" />
            <h3 className="calc-section-subtitle">Cost Breakdown</h3>

            {/* ────────────────────────────────────────────────────────── */}
            {/* Labor Cost Input                                           */}
            {/* ────────────────────────────────────────────────────────── */}

            <div className="calc-input-group">
              <label className="calc-label-secondary">
                Labor Cost
                <span className="calc-toggle-switch">
                  <input
                    type="checkbox"
                    checked={inputs.laborAuto}
                    onChange={updateField("laborAuto")}
                  />
                  <span className="calc-toggle-label">Auto %</span>
                </span>
              </label>
              {inputs.laborAuto ? (
                <input
                  type="number"
                  className="calc-input-secondary"
                  placeholder="40"
                  value={inputs.laborPercent}
                  onChange={updateField("laborPercent")}
                />
              ) : (
                <input
                  type="number"
                  className="calc-input-secondary"
                  placeholder="Manual amount"
                  value={inputs.laborManual}
                  onChange={updateField("laborManual")}
                />
              )}
            </div>

            {/* ────────────────────────────────────────────────────────── */}
            {/* Finishing Quality Selection                                */}
            {/* ────────────────────────────────────────────────────────── */}

            <div className="calc-input-group">
              <label className="calc-label-secondary">Finishing Quality</label>
              <select
                className="calc-input-secondary calc-select-input"
                value={inputs.finishingQuality}
                onChange={updateField("finishingQuality")}
              >
                <option value="basic">Basic — ₹450/sq.ft</option>
                <option value="standard">Standard — ₹750/sq.ft</option>
                <option value="premium">Premium — ₹1200/sq.ft</option>
              </select>
            </div>

            {/* ────────────────────────────────────────────────────────── */}
            {/* Contingency Percentage                                     */}
            {/* ────────────────────────────────────────────────────────── */}

            <div className="calc-input-group">
              <label className="calc-label-secondary">Contingency %</label>
              <input
                type="number"
                className="calc-input-secondary"
                placeholder="7"
                value={inputs.contingency}
                onChange={updateField("contingency")}
              />
            </div>

            <div className="calc-divider" />
            <h3 className="calc-section-subtitle">Material Rates</h3>

            {/* ────────────────────────────────────────────────────────── */}
            {/* Material Rates Grid                                        */}
            {/* ────────────────────────────────────────────────────────── */}

            <div className="calc-material-grid">
              {MATERIAL_FIELDS.map(({ field, label, unit, placeholder }) => (
                <div className="calc-input-group" key={field}>
                  <label className="calc-label-secondary">
                    {label}{" "}
                    <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                      {unit}
                    </span>
                  </label>
                  <input
                    type="number"
                    className="calc-input-secondary"
                    placeholder={placeholder}
                    value={inputs[field]}
                    onChange={updateField(field)}
                  />
                </div>
              ))}
            </div>

            {/* ────────────────────────────────────────────────────────── */}
            {/* Calculate Building Button                                  */}
            {/* ────────────────────────────────────────────────────────── */}

            <button className="calc-btn-primary" onClick={calculateBuilding}>
              <span>Calculate Estimate</span> →
            </button>

            {/* ────────────────────────────────────────────────────────── */}
            {/* RCC Slab Section                                           */}
            {/* ────────────────────────────────────────────────────────── */}

            <div className="calc-divider" />
            <h3 className="calc-section-subtitle">RCC Slab</h3>

            <div className="calc-input-group">
              <label className="calc-label-secondary">
                Slab Area{" "}
                <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                  sq.ft
                </span>
              </label>
              <input
                type="number"
                className="calc-input-secondary"
                placeholder="1300"
                value={inputs.slabArea}
                onChange={updateField("slabArea")}
                onKeyDown={onEnterSlabCalc}
              />
            </div>

            <div className="calc-input-group">
              <label className="calc-label-secondary">
                Thickness{" "}
                <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>ft</span>
              </label>
              <input
                type="number"
                className="calc-input-secondary"
                placeholder="0.41"
                value={inputs.slabThickness}
                onChange={updateField("slabThickness")}
                onKeyDown={onEnterSlabCalc}
              />
            </div>

            <button className="calc-btn-secondary" onClick={calculateSlab}>
              Calculate Slab
            </button>
          </section>

          {/* ══════════════════════════════════════════════════════════════ */}
          {/* RIGHT PANEL: RESULTS SECTION                                   */}
          {/* ══════════════════════════════════════════════════════════════ */}

          <section className="calc-results-section">
            {/* ────────────────────────────────────────────────────────── */}
            {/* Building Estimate Results                                  */}
            {/* ────────────────────────────────────────────────────────── */}

            <div className="calc-result-card">
              <div className="calc-result-header">
                <h3>Building Estimate</h3>
                <div
                  className={`calc-status-badge ${buildingResults ? "calculated" : ""}`}
                >
                  {buildingResults ? "Calculated" : "Pending"}
                </div>
              </div>

              {/* Total Cost */}
              <div className="calc-result-total">
                <span className="calc-total-label">Total Project Cost</span>
                <span className="calc-total-amount">
                  {buildingResults
                    ? formatCurrency(buildingResults.totalCost)
                    : "₹ --"}
                </span>
              </div>

              {/* Cost Breakdown */}
              <div className="calc-cost-breakdown">
                {BREAKDOWN_ROWS.map(({ label, key }) => (
                  <div className="calc-breakdown-item" key={key}>
                    <span className="calc-breakdown-label">{label}</span>
                    <span className="calc-breakdown-value">
                      {buildingResults
                        ? formatCurrency(buildingResults[key])
                        : "₹ --"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Material Quantities */}
              <div className="calc-divider-thin" />
              <h4 className="calc-subsection-title">Material Quantities</h4>
              <div className="calc-result-grid">
                {MATERIAL_RESULT_ROWS.map(
                  ({ icon, label, key, unit, decimals }) => (
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
                  ),
                )}
              </div>
            </div>

            {/* ────────────────────────────────────────────────────────── */}
            {/* RCC Slab Results                                           */}
            {/* ────────────────────────────────────────────────────────── */}

            <div className="calc-result-card">
              <div className="calc-result-header">
                <h3>RCC Slab Estimate</h3>
                <div
                  className={`calc-status-badge ${slabResults ? "calculated" : ""}`}
                >
                  {slabResults ? "Calculated" : "Pending"}
                </div>
              </div>

              <div className="calc-slab-grid">
                <div className="calc-slab-item">
                  <span className="calc-slab-label">Concrete Volume</span>
                  <span className="calc-slab-value">
                    {slabResults
                      ? `${formatNumber(slabResults.concreteVolume, 2)} m³`
                      : "-- m³"}
                  </span>
                </div>
                <div className="calc-slab-item">
                  <span className="calc-slab-label">Cement Required</span>
                  <span className="calc-slab-value">
                    {slabResults
                      ? `${formatNumber(slabResults.cementRequired, 0)} bags`
                      : "-- bags"}
                  </span>
                </div>
                <div className="calc-slab-item">
                  <span className="calc-slab-label">Steel Required</span>
                  <span className="calc-slab-value">
                    {slabResults
                      ? `${formatNumber(slabResults.steelRequired, 0)} kg`
                      : "-- kg"}
                  </span>
                </div>
              </div>

              <div className="calc-slab-note">
                <span>ℹ️ Based on M20 grade concrete specifications</span>
              </div>
            </div>

            {/* ────────────────────────────────────────────────────────── */}
            {/* Methodology Information                                    */}
            {/* ────────────────────────────────────────────────────────── */}

            <div className="calc-info-card">
              <h4>Calculation Methodology</h4>
              <ul>
                <li>
                  <strong>Materials:</strong> Cement (0.4 bags/sq.ft), Steel
                  (4.0 kg/sq.ft), Sand (0.044 m³/sq.ft), Aggregate (0.088
                  m³/sq.ft)
                </li>
                <li>
                  <strong>Labor:</strong> Auto-calculated at 40% of material
                  cost or manual input
                </li>
                <li>
                  <strong>Finishing:</strong> Basic (₹450/sq.ft), Standard
                  (₹750/sq.ft), Premium (₹1200/sq.ft)
                </li>
                <li>
                  <strong>Contingency:</strong> Recommended 5–10% of subtotal
                </li>
                <li>
                  <strong>RCC Slab:</strong> M20 grade concrete, 8 bags
                  cement/m³, 1% steel by volume
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default CalculatorPage;
