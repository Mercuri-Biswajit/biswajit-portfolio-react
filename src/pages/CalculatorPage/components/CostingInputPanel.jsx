import {
  BUILDING_TYPES,
  FINISH_GRADES,
  SOIL_CONDITIONS,
  REGIONS,
  MATERIAL_RATES,
} from "../config/calculatorConstants";

export function CostingInputPanel({
  inputs,
  updateField,
  onCalculate,
  onReset,
}) {
  return (
    <section className="calc-input-section">
      <div className="calc-section-header">
        <div className="calc-panel-label">
          <span className="label-icon">▣</span>
          BUILDING SPECIFICATIONS
        </div>
        <button className="calc-btn-reset" onClick={onReset}>
          ↺ Reset All
        </button>
      </div>

      {/* Basic Dimensions */}
      <div className="calc-card">
        <h3 className="calc-card-subtitle">Basic Dimensions</h3>
        <div className="calc-grid-3">
          <div className="calc-input-group">
            <label className="calc-label-primary">
              Length <span className="calc-label-unit">feet</span>
            </label>
            <input
              type="number"
              className="calc-input-primary"
              placeholder="e.g. 40"
              value={inputs.length}
              onChange={updateField("length")}
            />
          </div>
          <div className="calc-input-group">
            <label className="calc-label-primary">
              Breadth <span className="calc-label-unit">feet</span>
            </label>
            <input
              type="number"
              className="calc-input-primary"
              placeholder="e.g. 30"
              value={inputs.breadth}
              onChange={updateField("breadth")}
            />
          </div>
          <div className="calc-input-group">
            <label className="calc-label-primary">
              Floor Height <span className="calc-label-unit">feet</span>
            </label>
            <input
              type="number"
              className="calc-input-primary"
              placeholder="10"
              value={inputs.floorHeight}
              onChange={updateField("floorHeight")}
            />
          </div>
        </div>

        <div className="calc-input-group">
          <label className="calc-label-primary">Number of Floors</label>
          <div className="calc-floor-buttons">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`calc-floor-btn ${inputs.floors === num ? "active" : ""}`}
                onClick={() =>
                  updateField("floors")({ target: { value: num } })
                }
              >
                {num === 1 ? "G" : `G+${num - 1}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Building Type & Specifications */}
      <div className="calc-card">
        <h3 className="calc-card-subtitle">Building Type & Specifications</h3>
        <div className="calc-grid-2">
          <div className="calc-input-group">
            <label className="calc-label-primary">Building Type</label>
            <select
              className="calc-input-primary calc-select-input"
              value={inputs.buildingType}
              onChange={updateField("buildingType")}
            >
              {Object.entries(BUILDING_TYPES).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="calc-input-group">
            <label className="calc-label-primary">Finish Grade</label>
            <select
              className="calc-input-primary calc-select-input"
              value={inputs.finishGrade}
              onChange={updateField("finishGrade")}
            >
              {Object.entries(FINISH_GRADES).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="calc-input-group">
            <label className="calc-label-primary">Soil Condition</label>
            <select
              className="calc-input-primary calc-select-input"
              value={inputs.soilCondition}
              onChange={updateField("soilCondition")}
            >
              {Object.entries(SOIL_CONDITIONS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="calc-input-group">
            <label className="calc-label-primary">Region / Location</label>
            <select
              className="calc-input-primary calc-select-input"
              value={inputs.region}
              onChange={updateField("region")}
            >
              {Object.entries(REGIONS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="calc-card">
        <h3 className="calc-card-subtitle">Advanced Options</h3>
        <div className="calc-toggle-group">
          <label className="calc-toggle-label">
            <input
              type="checkbox"
              className="calc-checkbox"
              checked={inputs.includeBasement}
              onChange={updateField("includeBasement")}
            />
            <span>Include Basement</span>
          </label>
          <label className="calc-toggle-label">
            <input
              type="checkbox"
              className="calc-checkbox"
              checked={inputs.includeStaircase}
              onChange={updateField("includeStaircase")}
            />
            <span>Include Staircase Design</span>
          </label>
        </div>

        {inputs.includeBasement && (
          <div className="calc-grid-3" style={{ marginTop: "1rem" }}>
            <div className="calc-input-group">
              <label className="calc-label-primary">
                Basement Depth <span className="calc-label-unit">feet</span>
              </label>
              <input
                type="number"
                className="calc-input-primary"
                placeholder="8"
                value={inputs.basementDepth}
                onChange={updateField("basementDepth")}
              />
            </div>
          </div>
        )}
      </div>

      {/* Custom Material Rates */}
      <div className="calc-card">
        <h3 className="calc-card-subtitle">
          Custom Material Rates{" "}
          <span
            style={{
              fontSize: "0.8rem",
              color: "var(--color-text-dim)",
              fontWeight: 400,
            }}
          >
            (Optional - Leave blank for default rates)
          </span>
        </h3>
        <div className="calc-material-grid">
          {[
            {
              field: "customCementRate",
              label: "Cement",
              unit: "bag",
              key: "cement",
            },
            {
              field: "customSteelRate",
              label: "Steel",
              unit: "kg",
              key: "steel",
            },
            {
              field: "customSandRate",
              label: "Sand",
              unit: "cft",
              key: "sand",
            },
            {
              field: "customAggregateRate",
              label: "Aggregate",
              unit: "cft",
              key: "aggregate",
            },
          ].map(({ field, label, unit, key }) => (
            <div key={field} className="calc-input-group">
              <label className="calc-label-secondary">
                {label}{" "}
                <span className="calc-rate-hint">
                  ₹/{unit} (default: {MATERIAL_RATES[key].rate})
                </span>
              </label>
              <input
                type="number"
                className="calc-input-secondary"
                placeholder={MATERIAL_RATES[key].rate}
                value={inputs[field]}
                onChange={updateField(field)}
              />
            </div>
          ))}
        </div>
      </div>

      <button className="calc-btn-primary" onClick={onCalculate}>
        CALCULATE ESTIMATE →
      </button>
    </section>
  );
}
