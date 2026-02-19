// ═══════════════════════════════════════════════════════════════════════════
// BRICK MASONRY QUANTITY CALCULATOR TAB
// ═══════════════════════════════════════════════════════════════════════════

export function BrickMasonryTab({
  inputs,
  onInputChange,
  onCalculate,
  onReset,
  results,
}) {
  return (
    <div className="calc-result-card">
      <h3 className="calc-breakdown-header">
        <span>🧱</span> Brick Masonry Quantity Calculator
      </h3>

      {/* ── Inputs ────────────────────────────────────────────────── */}
      <div className="calc-card">
        <h4 className="calc-card-subtitle">Wall Dimensions</h4>

        <div className="calc-card-section">
          <h5 className="calc-section-label">Wall Size</h5>
          <div className="calc-grid-3">
            <InputField
              name="wallLength"
              label="Wall Length (ft) *"
              placeholder="40"
              value={inputs.wallLength}
              onChange={onInputChange}
              hint="Total length of wall"
            />
            <InputField
              name="wallHeight"
              label="Wall Height (ft) *"
              placeholder="10"
              value={inputs.wallHeight}
              onChange={onInputChange}
              hint="Floor-to-floor or actual height"
            />
            <div className="calc-input-group">
              <label className="calc-label-primary">Wall Thickness *</label>
              <select
                className="calc-input-primary calc-select-input"
                name="wallThickness"
                value={inputs.wallThickness}
                onChange={onInputChange}
              >
                <option value="4.5">4.5" — Half-brick / Partition wall</option>
                <option value="9">9" — One-brick / External wall</option>
                <option value="13.5">13.5" — One-and-half brick</option>
              </select>
              <small className="calc-input-hint">Standard IS sizes</small>
            </div>
          </div>
        </div>

        <div className="calc-card-section">
          <h5 className="calc-section-label">Openings (Deductions)</h5>
          <div className="calc-grid-3">
            <InputField
              name="numDoors"
              label="No. of Doors"
              placeholder="1"
              value={inputs.numDoors}
              onChange={onInputChange}
              hint="Number of door openings"
            />
            <InputField
              name="doorWidth"
              label="Door Width (ft)"
              placeholder="3.5"
              value={inputs.doorWidth}
              onChange={onInputChange}
              hint="Typical: 3–4 ft"
            />
            <InputField
              name="doorHeight"
              label="Door Height (ft)"
              placeholder="7"
              value={inputs.doorHeight}
              onChange={onInputChange}
              hint="Typical: 7 ft"
            />
            <InputField
              name="numWindows"
              label="No. of Windows"
              placeholder="2"
              value={inputs.numWindows}
              onChange={onInputChange}
              hint="Number of window openings"
            />
            <InputField
              name="windowWidth"
              label="Window Width (ft)"
              placeholder="4"
              value={inputs.windowWidth}
              onChange={onInputChange}
              hint="Typical: 3–5 ft"
            />
            <InputField
              name="windowHeight"
              label="Window Height (ft)"
              placeholder="4"
              value={inputs.windowHeight}
              onChange={onInputChange}
              hint="Typical: 3.5–4.5 ft"
            />
          </div>
        </div>

        <div className="calc-card-section">
          <h5 className="calc-section-label">Materials &amp; Mix</h5>
          <div className="calc-grid-3">
            <div className="calc-input-group">
              <label className="calc-label-primary">Brick Type</label>
              <select
                className="calc-input-primary calc-select-input"
                name="brickType"
                value={inputs.brickType}
                onChange={onInputChange}
              >
                <option value="standard">
                  Standard Clay Brick (230×115×75mm)
                </option>
                <option value="flyash">Fly-Ash Brick (230×110×90mm)</option>
                <option value="hollow">
                  Hollow Concrete Block (400×200×200mm)
                </option>
              </select>
              <small className="calc-input-hint">
                IS 1077 / IS 12894 specification
              </small>
            </div>
            <div className="calc-input-group">
              <label className="calc-label-primary">
                Mortar Mix (CM Ratio)
              </label>
              <select
                className="calc-input-primary calc-select-input"
                name="mortarRatio"
                value={inputs.mortarRatio}
                onChange={onInputChange}
              >
                <option value="1:3">1:3 — Rich mix (waterproofing)</option>
                <option value="1:4">1:4 — Strong structural</option>
                <option value="1:5">1:5 — General masonry</option>
                <option value="1:6">1:6 — Standard (IS 456)</option>
                <option value="1:8">1:8 — Economy / partition</option>
              </select>
              <small className="calc-input-hint">Cement : Sand ratio</small>
            </div>
            <div className="calc-input-group">
              <label className="calc-label-primary">
                Wastage Allowance (%)
              </label>
              <select
                className="calc-input-primary calc-select-input"
                name="wastagePercent"
                value={inputs.wastagePercent}
                onChange={onInputChange}
              >
                <option value="3">3% — Controlled site</option>
                <option value="5">5% — Standard (recommended)</option>
                <option value="7">7% — Mixed skill labour</option>
                <option value="10">10% — High breakage / remote</option>
              </select>
              <small className="calc-input-hint">
                Breakage &amp; cutting losses
              </small>
            </div>
          </div>
        </div>

        <div className="calc-action-row">
          <button
            className="calc-btn-primary"
            onClick={onCalculate}
            disabled={!inputs.wallLength || !inputs.wallHeight}
          >
            <span>🧮</span> CALCULATE QUANTITIES
          </button>
          <button className="calc-btn-secondary" onClick={onReset}>
            ↺ Reset
          </button>
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────────────── */}
      {results && !results.error && <BrickResults results={results} />}
      {results?.error && (
        <div className="calc-alert calc-alert-error">
          <strong>Error:</strong> {results.error}
        </div>
      )}
    </div>
  );
}

// ── Results ─────────────────────────────────────────────────────────────────

function BrickResults({ results: r }) {
  return (
    <>
      <div className="calc-struct-section">
        <h4 className="calc-struct-section-title">
          <span>📐</span> Area Breakdown
        </h4>
        <div className="calc-struct-grid">
          <StructCard
            icon="📏"
            title="Gross Wall Area"
            value={`${r.grossArea} sq.ft`}
            sub="Length × Height"
          />
          <StructCard
            icon="🚪"
            title="Openings Deducted"
            value={`${r.deductions} sq.ft`}
            sub="Doors + Windows"
          />
          <StructCard
            icon="✅"
            title="Net Wall Area"
            value={`${r.netArea} sq.ft`}
            sub={`${r.netAreaM2} sq.m`}
          />
          <StructCard
            icon="📦"
            title="Brickwork Volume"
            value={`${r.brickworkVolCum} cum`}
            sub={`Wall: ${r.wallThicknessLabel}`}
          />
        </div>
      </div>

      <div className="calc-card">
        <h4 className="calc-card-subtitle">
          <span>🧱</span> Material Requirements
        </h4>
        <div className="calc-highlight-grid">
          <HighlightCard
            label="Bricks Required (Net)"
            value={r.bricksNet.toLocaleString("en-IN")}
            unit="nos"
            modifier="primary"
          />
          <HighlightCard
            label="Bricks with Wastage"
            value={r.bricksWithWaste.toLocaleString("en-IN")}
            unit="nos"
            modifier="accent"
            note={`+${r.wastageCount} for wastage`}
          />
          <HighlightCard
            label="Cement (Mortar)"
            value={r.cementBags}
            unit="bags (50 kg)"
            modifier="purple"
          />
          <HighlightCard
            label="Sand (Mortar)"
            value={r.sandCft}
            unit="cft"
            modifier="green"
          />
        </div>
        <div className="calc-detail-grid">
          <DetailItem label="Brick Type" value={r.brickLabel} />
          <DetailItem label="Bricks per cum" value={`${r.bricksPerCum} nos`} />
          <DetailItem label="Mortar Volume" value={`${r.mortarVolCum} cum`} />
          <DetailItem label="Mortar Mix" value={`CM ${r.mortarRatio}`} />
        </div>
      </div>

      <div className="calc-card">
        <h4 className="calc-card-subtitle">
          <span>👷</span> Labour Estimate
        </h4>
        <div className="calc-detail-grid">
          <DetailItem label="Mason (Skilled)" value={`${r.masonDays} days`} />
          <DetailItem
            label="Helper (Unskilled)"
            value={`${r.helperDays} days`}
          />
          <DetailItem
            label="Total Man-Days"
            value={`${Math.round((r.masonDays + r.helperDays) * 10) / 10} days`}
          />
          <DetailItem label="Reference" value="IS 456:2000 / PWD norms" />
        </div>
      </div>

      <div className="calc-note">
        <strong>📌 Notes:</strong>
        <ul>
          <li>
            Mortar joint thickness assumed <strong>10mm</strong> as per IS 1905.
          </li>
          <li>
            Mortar volume fraction assumed <strong>30%</strong> of gross
            brickwork volume.
          </li>
          <li>Cement quantities include 20% bulking allowance for sand.</li>
          <li>
            Order bricks in multiples of 500; always add 5–10% safety margin.
          </li>
        </ul>
      </div>
    </>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function InputField({ name, label, hint, placeholder, value, onChange }) {
  return (
    <div className="calc-input-group">
      <label className="calc-label-primary">{label}</label>
      <input
        type="number"
        className="calc-input-primary"
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
      />
      {hint && <small className="calc-input-hint">{hint}</small>}
    </div>
  );
}

function StructCard({ icon, title, value, sub }) {
  return (
    <div className="calc-struct-card">
      <div className="calc-struct-icon">{icon}</div>
      <div className="calc-struct-title">{title}</div>
      <div className="calc-struct-value">{value}</div>
      <div className="calc-struct-sub">{sub}</div>
    </div>
  );
}

function HighlightCard({ label, value, unit, modifier, note }) {
  return (
    <div className={`calc-highlight-card calc-highlight-card--${modifier}`}>
      <div className="calc-highlight-label">{label}</div>
      <div className="calc-highlight-value">{value}</div>
      <div className="calc-highlight-unit">{unit}</div>
      {note && <div className="calc-highlight-note">{note}</div>}
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div className="calc-detail-item">
      <span className="calc-detail-label">{label}</span>
      <span className="calc-detail-value">{value}</span>
    </div>
  );
}

export default BrickMasonryTab;
