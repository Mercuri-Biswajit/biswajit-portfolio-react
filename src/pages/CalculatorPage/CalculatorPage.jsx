import { useState } from "react";

import {
  BUILDING_TYPES,
  FINISH_GRADES,
  SOIL_CONDITIONS,
  REGIONS,
  MATERIAL_RATES,
} from "../../config/calculatorConstants";
import {
  calcBuildingCost,
  calcStairDesign,
  calcFooting,
  calcBarBending,
  calcProjectTimeline,
  calcStructureDesign,
  calcCompleteBBS,
  calcFullBOQ,
} from "../../utils/calculator/advanced";
import { formatCurrency } from "../../utils/helpers";

// Import all tab components
import {
  CostBreakdown,
  StructureDesign,
  StaircaseDesign,
  FoundationDesign,
  CompleteBBS,
  FullBOQ,
} from "./TabComponents";

import "./CalculatorPage.css";

function CalculatorsPage() {
  // ── Input State ────────────────────────────────────────────────────────
  const [inputs, setInputs] = useState({
    // Basic Dimensions
    length: "",
    breadth: "",
    floors: 1,
    floorHeight: "10",
    
    // Building Characteristics
    buildingType: "residential",
    finishGrade: "standard",
    soilCondition: "normal",
    region: "tier3",
    
    // Advanced Options
    includeBasement: false,
    basementDepth: "8",
    includeStaircase: true,
    columnSize: "9x12",
    avgColumnSpan: "12",
    
    // Custom Material Rates (optional)
    customCementRate: "",
    customSteelRate: "",
    customSandRate: "",
    customAggregateRate: "",
  });

  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState("cost");

  // ── Input Handlers ─────────────────────────────────────────────────────
  const updateField = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // ── Calculate ──────────────────────────────────────────────────────────
  const handleCalculate = () => {
    const { length, breadth, floors, floorHeight } = inputs;
    
    // Validate inputs
    if (!length || !breadth || parseFloat(length) <= 0 || parseFloat(breadth) <= 0) {
      alert("Please enter valid building dimensions (length and breadth must be greater than 0).");
      return;
    }

    // Prepare calculation inputs
    const calcInputs = {
      ...inputs,
      length: parseFloat(length),
      breadth: parseFloat(breadth),
      floors: parseInt(floors),
      floorHeight: parseFloat(floorHeight),
      basementDepth: parseFloat(inputs.basementDepth),
      avgColumnSpan: parseFloat(inputs.avgColumnSpan),
      customRates: {
        cement: inputs.customCementRate ? parseFloat(inputs.customCementRate) : null,
        steel: inputs.customSteelRate ? parseFloat(inputs.customSteelRate) : null,
        sand: inputs.customSandRate ? parseFloat(inputs.customSandRate) : null,
        aggregate: inputs.customAggregateRate ? parseFloat(inputs.customAggregateRate) : null,
      },
    };

    // Calculate all results
    const buildingCost = calcBuildingCost(calcInputs);
    const stairDesign = calcInputs.includeStaircase
      ? calcStairDesign(calcInputs.length, calcInputs.breadth, calcInputs.floorHeight, calcInputs.floors, calcInputs.buildingType)
      : null;
    const footing = calcFooting(calcInputs);
    const barBending = calcBarBending(calcInputs);
    const timeline = calcProjectTimeline(calcInputs);
    const structureDesign = calcStructureDesign(calcInputs);
    const completeBBS = calcCompleteBBS(calcInputs);
    const fullBOQ = calcFullBOQ(calcInputs);

    setResults({
      buildingCost,
      stairDesign,
      footing,
      barBending,
      timeline,
      structureDesign,
      completeBBS,
      fullBOQ,
    });
  };

  // ── Reset ──────────────────────────────────────────────────────────────
  const handleReset = () => {
    setInputs({
      length: "",
      breadth: "",
      floors: 1,
      floorHeight: "10",
      buildingType: "residential",
      finishGrade: "standard",
      soilCondition: "normal",
      region: "tier3",
      includeBasement: false,
      basementDepth: "8",
      includeStaircase: true,
      columnSize: "9x12",
      avgColumnSpan: "12",
      customCementRate: "",
      customSteelRate: "",
      customSandRate: "",
      customAggregateRate: "",
    });
    setResults(null);
    setActiveTab("cost");
  };

  return (
    <div className="calc-page">
      <main className="calc-main">
        <div className="calc-header">
          <div className="calc-header-content">
            <div className="calc-header-left">
              <span className="calc-step">STEP 1</span>
              <h1 className="calc-title">Construction Cost Calculator</h1>
            </div>
            <span className="calc-badge">Pro Version</span>
          </div>
          <div className="calc-intro">
            <span className="calc-intro-icon">ℹ️</span>
            <p>
              Professional construction estimation tool based on IS 456:2000, NBC 2016, and current market rates. 
              Enter your building dimensions and specifications to get a detailed cost breakdown with material quantities, 
              structural design parameters, and complete bill of quantities.
            </p>
          </div>
        </div>

        {/* Input Section */}
        <section className="calc-input-section">
          <div className="calc-section-header">
            <div className="calc-panel-label">
              <span className="label-icon">▣</span>
              BUILDING SPECIFICATIONS
            </div>
            <button className="calc-btn-reset" onClick={handleReset}>
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
                    onClick={() => setInputs((prev) => ({ ...prev, floors: num }))}
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

          {/* Custom Material Rates (Optional) */}
          <div className="calc-card">
            <h3 className="calc-card-subtitle">
              Custom Material Rates <span style={{ fontSize: "0.8rem", color: "var(--color-text-dim)", fontWeight: 400 }}>(Optional - Leave blank for default rates)</span>
            </h3>
            <div className="calc-material-grid">
              <div className="calc-input-group">
                <label className="calc-label-secondary">
                  Cement <span className="calc-rate-hint">₹/bag (default: {MATERIAL_RATES.cement.rate})</span>
                </label>
                <input
                  type="number"
                  className="calc-input-secondary"
                  placeholder={MATERIAL_RATES.cement.rate}
                  value={inputs.customCementRate}
                  onChange={updateField("customCementRate")}
                />
              </div>

              <div className="calc-input-group">
                <label className="calc-label-secondary">
                  Steel <span className="calc-rate-hint">₹/kg (default: {MATERIAL_RATES.steel.rate})</span>
                </label>
                <input
                  type="number"
                  className="calc-input-secondary"
                  placeholder={MATERIAL_RATES.steel.rate}
                  value={inputs.customSteelRate}
                  onChange={updateField("customSteelRate")}
                />
              </div>

              <div className="calc-input-group">
                <label className="calc-label-secondary">
                  Sand <span className="calc-rate-hint">₹/cft (default: {MATERIAL_RATES.sand.rate})</span>
                </label>
                <input
                  type="number"
                  className="calc-input-secondary"
                  placeholder={MATERIAL_RATES.sand.rate}
                  value={inputs.customSandRate}
                  onChange={updateField("customSandRate")}
                />
              </div>

              <div className="calc-input-group">
                <label className="calc-label-secondary">
                  Aggregate <span className="calc-rate-hint">₹/cft (default: {MATERIAL_RATES.aggregate.rate})</span>
                </label>
                <input
                  type="number"
                  className="calc-input-secondary"
                  placeholder={MATERIAL_RATES.aggregate.rate}
                  value={inputs.customAggregateRate}
                  onChange={updateField("customAggregateRate")}
                />
              </div>
            </div>
          </div>

          <button className="calc-btn-primary" onClick={handleCalculate}>
            CALCULATE ESTIMATE →
          </button>
        </section>

        {/* Results Section */}
        {results && (
          <section className="calc-results-section">
            {/* Cost Banner with Timeline */}
            <div className="calc-cost-banner">
              <div className="calc-banner-left">
                <div className="calc-estimate-label">Total Estimated Cost</div>
                <div className="calc-estimate-amount">
                  {formatCurrency(results.buildingCost.totalCost)}
                </div>
                <div className="calc-estimate-meta">
                  <span>
                    Rate: <strong>₹{Math.round(results.buildingCost.costPerSqft).toLocaleString("en-IN")}/sq.ft</strong>
                  </span>
                  <span>
                    Area: <strong>{results.buildingCost.totalArea.toLocaleString("en-IN")} sq.ft</strong>
                  </span>
                  <span>
                    Floors: <strong>{inputs.floors}</strong>
                  </span>
                  <span>
                    Duration: <strong>{results.timeline.totalDays} days (~{results.timeline.totalMonths} months)</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="calc-tabs">
              <button
                className={`calc-tab ${activeTab === "cost" ? "active" : ""}`}
                onClick={() => setActiveTab("cost")}
              >
                💰 Cost Breakdown
              </button>
              <button
                className={`calc-tab ${activeTab === "structure" ? "active" : ""}`}
                onClick={() => setActiveTab("structure")}
              >
                🏛️ Structure Design
              </button>
              {results.stairDesign && (
                <button
                  className={`calc-tab ${activeTab === "stair" ? "active" : ""}`}
                  onClick={() => setActiveTab("stair")}
                >
                  🪜 Staircase Design
                </button>
              )}
              <button
                className={`calc-tab ${activeTab === "footing" ? "active" : ""}`}
                onClick={() => setActiveTab("footing")}
              >
                🏗️ Foundation Design
              </button>
              <button
                className={`calc-tab ${activeTab === "bbs" ? "active" : ""}`}
                onClick={() => setActiveTab("bbs")}
              >
                📋 Bar Bending Schedule
              </button>
              <button
                className={`calc-tab ${activeTab === "boq" ? "active" : ""}`}
                onClick={() => setActiveTab("boq")}
              >
                📄 Bill of Quantities
              </button>
            </div>

            {/* Tab Content */}
            <div className="calc-tab-content">
              {activeTab === "cost" && (
                <CostBreakdown results={results.buildingCost} />
              )}
              {activeTab === "structure" && (
                <StructureDesign design={results.structureDesign} />
              )}
              {activeTab === "stair" && results.stairDesign && (
                <StaircaseDesign design={results.stairDesign} />
              )}
              {activeTab === "footing" && (
                <FoundationDesign footing={results.footing} />
              )}
              {activeTab === "bbs" && (
                <CompleteBBS 
                  barBending={results.barBending} 
                  completeBBS={results.completeBBS} 
                />
              )}
              {activeTab === "boq" && (
                <FullBOQ boq={results.fullBOQ} />
              )}
            </div>

            <div style={{ textAlign: "center", paddingTop: "2rem" }}>
              <button onClick={handleReset} className="calc-btn-secondary">
                ← New Estimate
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default CalculatorsPage;