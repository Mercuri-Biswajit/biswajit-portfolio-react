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
} from "../../utils/calculator/advanced";
import { formatCurrency } from "../../utils/helpers";

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
  const [activeTab, setActiveTab] = useState("cost"); // cost, stair, footing, bbs, timeline

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

    setResults({
      buildingCost,
      stairDesign,
      footing,
      barBending,
      timeline,
      structureDesign,
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
              structural design parameters, and project timeline.
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
            {/* Cost Banner */}
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
                📊 Bar Bending Schedule
              </button>
              <button
                className={`calc-tab ${activeTab === "timeline" ? "active" : ""}`}
                onClick={() => setActiveTab("timeline")}
              >
                📅 Project Timeline
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
                <BarBendingSchedule bbs={results.barBending} />
              )}
              {activeTab === "timeline" && (
                <ProjectTimeline timeline={results.timeline} />
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

// ── Sub-Components ─────────────────────────────────────────────────────────

function StructureDesign({ design }) {
  return (
    <div className="calc-result-card">
      <h3 className="calc-breakdown-header">
        <span>🏛️</span> Structural Design Specifications
      </h3>
      
      {/* Columns */}
      <div className="calc-struct-section">
        <h4 className="calc-struct-section-title">Column Design</h4>
        <div className="calc-struct-grid">
          <div className="calc-struct-card">
            <div className="calc-struct-icon">📐</div>
            <div className="calc-struct-title">Column Size</div>
            <div className="calc-struct-value">{design.columns.size}</div>
            <div className="calc-struct-sub">RCC Frame</div>
          </div>

          <div className="calc-struct-card">
            <div className="calc-struct-icon">🔢</div>
            <div className="calc-struct-title">Total Columns</div>
            <div className="calc-struct-value">{design.columns.count}</div>
            <div className="calc-struct-sub">{design.columns.spacing}</div>
          </div>

          <div className="calc-struct-card">
            <div className="calc-struct-icon">⚙️</div>
            <div className="calc-struct-title">Main Bars</div>
            <div className="calc-struct-value">{design.columns.mainBars}</div>
            <div className="calc-struct-sub">TMT Fe500</div>
          </div>

          <div className="calc-struct-card">
            <div className="calc-struct-icon">🔗</div>
            <div className="calc-struct-title">Stirrups</div>
            <div className="calc-struct-value">{design.columns.stirrup}</div>
            <div className="calc-struct-sub">Lateral ties</div>
          </div>
        </div>
      </div>

      {/* Beams */}
      <div className="calc-struct-section">
        <h4 className="calc-struct-section-title">Beam Design</h4>
        <div className="calc-struct-grid">
          <div className="calc-struct-card">
            <div className="calc-struct-icon">📏</div>
            <div className="calc-struct-title">Beam Size</div>
            <div className="calc-struct-value">{design.beams.size}</div>
            <div className="calc-struct-sub">Main beam</div>
          </div>

          <div className="calc-struct-card">
            <div className="calc-struct-icon">⬆️</div>
            <div className="calc-struct-title">Top Bars</div>
            <div className="calc-struct-value">{design.beams.topBars}</div>
            <div className="calc-struct-sub">Negative moment</div>
          </div>

          <div className="calc-struct-card">
            <div className="calc-struct-icon">⬇️</div>
            <div className="calc-struct-title">Bottom Bars</div>
            <div className="calc-struct-value">{design.beams.bottomBars}</div>
            <div className="calc-struct-sub">Positive moment</div>
          </div>

          <div className="calc-struct-card">
            <div className="calc-struct-icon">🔗</div>
            <div className="calc-struct-title">Stirrups</div>
            <div className="calc-struct-value">{design.beams.stirrup}</div>
            <div className="calc-struct-sub">Shear reinforcement</div>
          </div>
        </div>
      </div>

      {/* Slab */}
      <div className="calc-struct-section">
        <h4 className="calc-struct-section-title">Slab Design</h4>
        <div className="calc-struct-grid">
          <div className="calc-struct-card">
            <div className="calc-struct-icon">📊</div>
            <div className="calc-struct-title">Slab Thickness</div>
            <div className="calc-struct-value">{design.slab.thickness}</div>
            <div className="calc-struct-sub">{design.slab.type}</div>
          </div>

          <div className="calc-struct-card">
            <div className="calc-struct-icon">⚙️</div>
            <div className="calc-struct-title">Main Bars</div>
            <div className="calc-struct-value">{design.slab.mainBars}</div>
            <div className="calc-struct-sub">Main steel</div>
          </div>

          <div className="calc-struct-card">
            <div className="calc-struct-icon">🔗</div>
            <div className="calc-struct-title">Distribution Bars</div>
            <div className="calc-struct-value">{design.slab.distributionBars}</div>
            <div className="calc-struct-sub">Secondary steel</div>
          </div>

          <div className="calc-struct-card">
            <div className="calc-struct-icon">🧱</div>
            <div className="calc-struct-title">Concrete Grade</div>
            <div className="calc-struct-value">{design.concrete.grade}</div>
            <div className="calc-struct-sub">{design.concrete.mix}</div>
          </div>
        </div>
      </div>

      {/* Plinth Beam & Walls */}
      <div className="calc-struct-section">
        <h4 className="calc-struct-section-title">Other Elements</h4>
        <div className="calc-struct-grid">
          <div className="calc-struct-card">
            <div className="calc-struct-icon">🔲</div>
            <div className="calc-struct-title">Plinth Beam</div>
            <div className="calc-struct-value">{design.plinthBeam.size}</div>
            <div className="calc-struct-sub">{design.plinthBeam.bars}</div>
          </div>

          <div className="calc-struct-card">
            <div className="calc-struct-icon">🧱</div>
            <div className="calc-struct-title">External Wall</div>
            <div className="calc-struct-value">{design.walls.external}</div>
            <div className="calc-struct-sub">Outer walls</div>
          </div>

          <div className="calc-struct-card">
            <div className="calc-struct-icon">🧱</div>
            <div className="calc-struct-title">Internal Wall</div>
            <div className="calc-struct-value">{design.walls.internal}</div>
            <div className="calc-struct-sub">Partition walls</div>
          </div>

          <div className="calc-struct-card">
            <div className="calc-struct-icon">📐</div>
            <div className="calc-struct-title">Built-up Area</div>
            <div className="calc-struct-value">{design.totalBuiltArea.toLocaleString("en-IN")} sq.ft</div>
            <div className="calc-struct-sub">Total area</div>
          </div>
        </div>
      </div>

      <div className="calc-note">
        <strong>📋 Design Note:</strong> All structural elements designed as per IS 456:2000. 
        Use {design.concrete.cement} for all concrete work. Ensure minimum concrete cover: 
        Columns 40mm, Beams 25mm, Slabs 20mm.
      </div>
    </div>
  );
}

function CostBreakdown({ results }) {
  const maxCost = Math.max(...Object.values(results.breakdown));

  return (
    <div className="calc-result-card">
      <h3 className="calc-breakdown-header">
        <span>💰</span> Detailed Cost Breakdown
      </h3>
      
      <div className="calc-breakdown-list">
        {Object.entries(results.breakdown).map(([key, cost]) => {
          const percentage = Math.round((cost / results.totalCost) * 100);
          const barWidth = Math.round((cost / maxCost) * 100);
          
          return (
            <div key={key} className="calc-breakdown-row">
              <span className="calc-breakdown-name">
                {key.replace(/([A-Z])/g, ' $1').trim()} ({percentage}%)
              </span>
              <div className="calc-breakdown-bar-wrap">
                <div
                  className="calc-breakdown-bar calc-bar-primary"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <div className="calc-breakdown-right">
                <span className="calc-breakdown-cost">{formatCurrency(cost)}</span>
                {results.quantities && results.quantities[key] && (
                  <span className="calc-breakdown-qty">{results.quantities[key]}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="calc-note">
        <strong>📌 Note:</strong> Costs are estimated based on current market rates and standard specifications. 
        Actual costs may vary based on site conditions, material quality, and local factors.
      </div>
    </div>
  );
}

function StaircaseDesign({ design }) {
  return (
    <div className="calc-result-card">
      <h3 className="calc-breakdown-header">
        <span>🪜</span> Staircase Design Specifications
      </h3>
      
      <div className="calc-struct-grid">
        <div className="calc-struct-card">
          <div className="calc-struct-icon">📏</div>
          <div className="calc-struct-title">Riser Height</div>
          <div className="calc-struct-value">{design.riser}mm</div>
          <div className="calc-struct-sub">NBC 2016 Compliant</div>
        </div>

        <div className="calc-struct-card">
          <div className="calc-struct-icon">📐</div>
          <div className="calc-struct-title">Tread Width</div>
          <div className="calc-struct-value">{design.tread}mm</div>
          <div className="calc-struct-sub">{design.checkPass}</div>
        </div>

        <div className="calc-struct-card">
          <div className="calc-struct-icon">🔢</div>
          <div className="calc-struct-title">Steps Per Flight</div>
          <div className="calc-struct-value">{design.risersPerFlight}</div>
          <div className="calc-struct-sub">{design.totalFlights} total flights</div>
        </div>

        <div className="calc-struct-card">
          <div className="calc-struct-icon">⚡</div>
          <div className="calc-struct-title">Waist Slab</div>
          <div className="calc-struct-value">{design.waistSlab}mm</div>
          <div className="calc-struct-sub">Structural thickness</div>
        </div>

        <div className="calc-struct-card">
          <div className="calc-struct-icon">📊</div>
          <div className="calc-struct-title">Stair Width</div>
          <div className="calc-struct-value">{design.stairWidth}mm</div>
          <div className="calc-struct-sub">Clear width</div>
        </div>

        <div className="calc-struct-card">
          <div className="calc-struct-icon">📏</div>
          <div className="calc-struct-title">Headroom</div>
          <div className="calc-struct-value">{design.headroom}</div>
          <div className="calc-struct-sub">Vertical clearance</div>
        </div>
      </div>

      <div className="calc-note">
        <strong>🔧 Reinforcement:</strong> Main bars {design.mainBarDia}mm @ {design.mainBarSpacing}mm c/c, 
        Distribution bars {design.distBarDia}mm @ {design.distBarSpacing}mm c/c
      </div>
    </div>
  );
}

function FoundationDesign({ footing }) {
  return (
    <div className="calc-result-card">
      <h3 className="calc-breakdown-header">
        <span>🏗️</span> Foundation Design Details
      </h3>
      
      <div className="calc-struct-grid">
        <div className="calc-struct-card">
          <div className="calc-struct-icon">📐</div>
          <div className="calc-struct-title">Footing Size</div>
          <div className="calc-struct-value">{footing.size}</div>
          <div className="calc-struct-sub">Isolated footing</div>
        </div>

        <div className="calc-struct-card">
          <div className="calc-struct-icon">📏</div>
          <div className="calc-struct-title">Footing Depth</div>
          <div className="calc-struct-value">{footing.depth}mm</div>
          <div className="calc-struct-sub">Structural depth</div>
        </div>

        <div className="calc-struct-card">
          <div className="calc-struct-icon">⚖️</div>
          <div className="calc-struct-title">Column Load</div>
          <div className="calc-struct-value">{footing.columnLoad.toFixed(1)}kN</div>
          <div className="calc-struct-sub">Factored load</div>
        </div>

        <div className="calc-struct-card">
          <div className="calc-struct-icon">🌍</div>
          <div className="calc-struct-title">SBC</div>
          <div className="calc-struct-value">{footing.sbc}kN/m²</div>
          <div className="calc-struct-sub">Safe bearing capacity</div>
        </div>
      </div>

      <div className="calc-note">
        <strong>💡 Design Note:</strong> Foundation designed as per IS 1904 and IS 456:2000. 
        Use M20 grade concrete with {footing.reinforcement || "12mm bars @ 150mm c/c both ways"}.
      </div>
    </div>
  );
}

function BarBendingSchedule({ bbs }) {
  return (
    <div className="calc-result-card">
      <h3 className="calc-breakdown-header">
        <span>📊</span> Bar Bending Schedule Summary
      </h3>
      
      <div className="calc-bbs-summary">
        <div className="calc-bbs-total">
          <div className="calc-bbs-total-label">Total Steel Weight</div>
          <div className="calc-bbs-total-value">{bbs.totalWeight.toFixed(0)} kg</div>
        </div>

        <div className="calc-bbs-grid">
          {Object.entries(bbs.breakdown).map(([dia, weight]) => (
            <div key={dia} className="calc-bbs-card">
              <div className="calc-bbs-weight">{weight.toFixed(0)} kg</div>
              <div className="calc-bbs-label">{dia}</div>
              <div className="calc-bbs-pct">
                {((weight / bbs.totalWeight) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="calc-note">
        <strong>📦 Ordering:</strong> Add 5-7% wastage for cutting and lapping. 
        Use Fe500 grade TMT bars for all reinforcement.
      </div>
    </div>
  );
}

function ProjectTimeline({ timeline }) {
  return (
    <div className="calc-result-card">
      <h3 className="calc-breakdown-header">
        <span>📅</span> Project Timeline & Milestones
      </h3>
      
      <div className="calc-timeline-summary">
        <div className="calc-timeline-total">
          Total Duration: <strong>{timeline.totalDays} days</strong> (~{timeline.totalMonths} months)
        </div>
      </div>

      <div className="calc-timeline-table">
        <table className="calc-table">
          <thead>
            <tr>
              <th>Phase</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {timeline.phases.map((phase, idx) => (
              <tr key={idx}>
                <td>{phase.name}</td>
                <td>{phase.duration} days</td>
                <td>Day {phase.startDay}</td>
                <td className="calc-status-pending">Pending</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="calc-note">
        <strong>⏱️ Note:</strong> Timeline is indicative and assumes good weather conditions, 
        material availability, and adequate workforce. Actual duration may vary ±20%.
      </div>
    </div>
  );
}

export default CalculatorsPage;