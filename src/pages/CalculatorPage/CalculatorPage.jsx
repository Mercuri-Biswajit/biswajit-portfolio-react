/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

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
  calcStandardBOQ,
  calcPremiumBOQ,
  calcFloorWiseBOQ,
} from "../../utils/calculator/advanced";
import { formatCurrency } from "../../utils/helpers";

// Import tab components
import {
  CostBreakdown,
  StructureDesign,
  StaircaseDesign,
  FoundationDesign,
  CompleteBBS,
} from "./TabComponents";

import { FullBOQ } from "./FullBOQTab";

import { designBeam } from "../../utils/calculator/beamDesign";
import { designColumn } from "../../utils/calculator/columnDesign";
import { BeamDesignTab } from "./BeamDesignTab";
import { ColumnDesignTab } from "./ColumnDesignTab";

import "./CalculatorPage.css";
import "./design-calculator-styles.css";

function CalculatorsPage() {
  // ── Main Tab State ─────────────────────────────────────────────────────
  const [mainTab, setMainTab] = useState("costing"); // 'costing', 'beam', 'column'

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
  const [costingSubTab, setCostingSubTab] = useState("cost");

  // Beam Design State
  const [beamInputs, setBeamInputs] = useState({
    Mu: "",
    Vu: "",
    b: "",
    D: "",
    span: "",
    fck: "25",
    fy: "500",
    cover: "30",
  });
  const [beamResults, setBeamResults] = useState(null);

  // Column Design State
  const [columnInputs, setColumnInputs] = useState({
    Pu: "",
    Mux: "",
    Muy: "",
    b: "",
    D: "",
    L: "",
    fck: "25",
    fy: "500",
    cover: "40",
    restraintX: "both-hinged",
    restraintY: "both-hinged",
  });
  const [columnResults, setColumnResults] = useState(null);

  // Auto-populate beam/column inputs from structure design when results change
  useEffect(() => {
    if (results?.structureDesign && mainTab === "beam" && !beamInputs.b) {
      populateBeamFromStructure();
    }
  }, [mainTab, results]);

  useEffect(() => {
    if (results?.structureDesign && mainTab === "column" && !columnInputs.b) {
      populateColumnFromStructure();
    }
  }, [mainTab, results]);

  // Beam Design Handler
  const handleBeamCalculate = () => {
    try {
      // Validate required inputs
      if (!beamInputs.Mu || !beamInputs.Vu || !beamInputs.b || !beamInputs.D) {
        setBeamResults({
          error:
            "Please fill in all required fields: Mu, Vu, b (width), and D (depth)",
        });
        return;
      }

      const numericInputs = {
        ...beamInputs,
        Mu: parseFloat(beamInputs.Mu),
        Vu: parseFloat(beamInputs.Vu),
        b: parseFloat(beamInputs.b),
        D: parseFloat(beamInputs.D),
        span: beamInputs.span ? parseFloat(beamInputs.span) : null,
        fck: parseFloat(beamInputs.fck),
        fy: parseFloat(beamInputs.fy),
        cover: parseFloat(beamInputs.cover),
      };

      // Validate numeric values
      if (
        Object.values(numericInputs).some((val) => val !== null && isNaN(val))
      ) {
        setBeamResults({
          error: "Please enter valid numeric values for all fields",
        });
        return;
      }

      const results = designBeam(numericInputs);

      // Ensure results object has expected structure
      if (!results || typeof results !== "object") {
        setBeamResults({
          error: "Beam design calculation returned invalid results",
        });
        return;
      }

      setBeamResults(results);
    } catch (error) {
      console.error("Beam calculation error:", error);
      setBeamResults({
        error:
          error.message || "An error occurred during beam design calculation",
      });
    }
  };

  // Column Design Handler
  const handleColumnCalculate = () => {
    try {
      // Validate required inputs
      if (
        !columnInputs.Pu ||
        !columnInputs.b ||
        !columnInputs.D ||
        !columnInputs.L
      ) {
        setColumnResults({
          error:
            "Please fill in all required fields: Pu, b (width), D (depth), and L (length)",
        });
        return;
      }

      const numericInputs = {
        ...columnInputs,
        Pu: parseFloat(columnInputs.Pu),
        Mux: columnInputs.Mux ? parseFloat(columnInputs.Mux) : 0,
        Muy: columnInputs.Muy ? parseFloat(columnInputs.Muy) : 0,
        b: parseFloat(columnInputs.b),
        D: parseFloat(columnInputs.D),
        L: parseFloat(columnInputs.L),
        fck: parseFloat(columnInputs.fck),
        fy: parseFloat(columnInputs.fy),
        cover: parseFloat(columnInputs.cover),
      };

      // Validate only the numeric fields (exclude restraintX and restraintY)
      const numericFields = [
        "Pu",
        "Mux",
        "Muy",
        "b",
        "D",
        "L",
        "fck",
        "fy",
        "cover",
      ];
      const hasInvalidNumbers = numericFields.some((field) =>
        isNaN(numericInputs[field]),
      );

      if (hasInvalidNumbers) {
        setColumnResults({
          error: "Please enter valid numeric values for all fields",
        });
        return;
      }

      const results = designColumn(numericInputs);

      // Ensure results object has expected structure
      if (!results || typeof results !== "object") {
        setColumnResults({
          error: "Column design calculation returned invalid results",
        });
        return;
      }

      setColumnResults(results);
    } catch (error) {
      console.error("Column calculation error:", error);
      setColumnResults({
        error:
          error.message || "An error occurred during column design calculation",
      });
    }
  };

  // Auto-populate beam inputs from structure design
  const populateBeamFromStructure = () => {
    if (!results?.structureDesign) return;

    const beamSize = results.structureDesign.beams.size; // e.g., "9" × 12""
    const sizeParts = beamSize.replace(/"/g, "").split("×");
    if (sizeParts.length === 2) {
      const width = parseFloat(sizeParts[0].trim()) * 25.4; // Convert inches to mm
      const depth = parseFloat(sizeParts[1].trim()) * 25.4;

      setBeamInputs((prev) => ({
        ...prev,
        b: Math.round(width).toString(),
        D: Math.round(depth).toString(),
        fck: "20", // M20 from structure design
        fy: "500", // Fe500 standard
      }));
    }
  };

  const populateColumnFromStructure = () => {
    if (!results?.structureDesign) return;

    const columnSize = results.structureDesign.columns.size; // e.g., "9" × 12""
    const sizeParts = columnSize.replace(/"/g, "").split("×");
    if (sizeParts.length === 2) {
      const width = parseFloat(sizeParts[0].trim()) * 25.4; // Convert inches to mm
      const depth = parseFloat(sizeParts[1].trim()) * 25.4;
      const floorHeight = parseFloat(inputs.floorHeight) * 304.8; // Convert feet to mm

      setColumnInputs((prev) => ({
        ...prev,
        b: Math.round(width).toString(),
        D: Math.round(depth).toString(),
        L: Math.round(floorHeight).toString(),
        fck: "20", // M20 from structure design
        fy: "500", // Fe500 standard
      }));
    }
  };

  // ── Input Handlers ─────────────────────────────────────────────────────
  const updateField = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  // ── Calculate ──────────────────────────────────────────────────────────
  const handleCalculate = () => {
    const { length, breadth, floors, floorHeight } = inputs;

    // Validate inputs
    if (
      !length ||
      !breadth ||
      parseFloat(length) <= 0 ||
      parseFloat(breadth) <= 0
    ) {
      alert(
        "Please enter valid building dimensions (length and breadth must be greater than 0).",
      );
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
        cement: inputs.customCementRate
          ? parseFloat(inputs.customCementRate)
          : null,
        steel: inputs.customSteelRate
          ? parseFloat(inputs.customSteelRate)
          : null,
        sand: inputs.customSandRate ? parseFloat(inputs.customSandRate) : null,
        aggregate: inputs.customAggregateRate
          ? parseFloat(inputs.customAggregateRate)
          : null,
      },
    };

    // Calculate all results
    const buildingCost = calcBuildingCost(calcInputs);
    const stairDesign = calcInputs.includeStaircase
      ? calcStairDesign(
          calcInputs.length,
          calcInputs.breadth,
          calcInputs.floorHeight,
          calcInputs.floors,
          calcInputs.buildingType,
        )
      : null;
    const footing = calcFooting(calcInputs);
    const barBending = calcBarBending(calcInputs);
    const timeline = calcProjectTimeline(calcInputs);
    const structureDesign = calcStructureDesign(calcInputs);
    const completeBBS = calcCompleteBBS(calcInputs);
    const standardBOQ = calcStandardBOQ(calcInputs);
    const premiumBOQ = calcPremiumBOQ(calcInputs);
    const floorWiseBOQ = calcFloorWiseBOQ({
      ...calcInputs,
      finishGrade: calcInputs.finishGrade,
    });

    setResults({
      buildingCost,
      stairDesign,
      footing,
      barBending,
      timeline,
      structureDesign,
      completeBBS,
      standardBOQ,
      premiumBOQ,
      floorWiseBOQ,
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
    setCostingSubTab("cost");
  };

  return (
    <div className="calc-page">
      {/* Hero Section with Main Tabs */}
      <section className="calc-hero-section">
        <div className="container">
          <div className="calc-hero-content">
            <div className="calc-hero-text">
              <span className="calc-hero-label">PROFESSIONAL TOOLS</span>
              <h1 className="calc-hero-title">Construction Calculator Suite</h1>
              <p className="calc-hero-description">
                IS 456:2000 compliant tools for cost estimation, beam design,
                and column design
              </p>
            </div>

            {/* Main Tabs in Hero */}
            <div className="calc-main-tabs-hero">
              <button
                className={`calc-main-tab-hero ${mainTab === "costing" ? "active" : ""}`}
                onClick={() => setMainTab("costing")}
              >
                <div className="calc-tab-icon-hero">💰</div>
                <div className="calc-tab-content-hero">
                  <div className="calc-tab-label-hero">ESTIMATE COSTING</div>
                  <div className="calc-tab-desc-hero">
                    Complete building cost estimation
                  </div>
                </div>
              </button>

              <button
                className={`calc-main-tab-hero ${mainTab === "beam" ? "active" : ""}`}
                onClick={() => {
                  setMainTab("beam");
                  if (results?.structureDesign && !beamInputs.b) {
                    populateBeamFromStructure();
                  }
                }}
              >
                <div className="calc-tab-icon-hero">🏗️</div>
                <div className="calc-tab-content-hero">
                  <div className="calc-tab-label-hero">BEAM DESIGN</div>
                  <div className="calc-tab-desc-hero">
                    RCC beam structural analysis
                  </div>
                </div>
              </button>

              <button
                className={`calc-main-tab-hero ${mainTab === "column" ? "active" : ""}`}
                onClick={() => {
                  setMainTab("column");
                  if (results?.structureDesign && !columnInputs.b) {
                    populateColumnFromStructure();
                  }
                }}
              >
                <div className="calc-tab-icon-hero">🏛️</div>
                <div className="calc-tab-content-hero">
                  <div className="calc-tab-label-hero">COLUMN DESIGN</div>
                  <div className="calc-tab-desc-hero">
                    Column load capacity design
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="calc-main">
        {/* Input Section - Only shown for Costing tab */}
        {mainTab === "costing" && (
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
                      onClick={() =>
                        setInputs((prev) => ({ ...prev, floors: num }))
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
              <h3 className="calc-card-subtitle">
                Building Type & Specifications
              </h3>
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
                  <label className="calc-label-primary">
                    Region / Location
                  </label>
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
                      Basement Depth{" "}
                      <span className="calc-label-unit">feet</span>
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
                <div className="calc-input-group">
                  <label className="calc-label-secondary">
                    Cement{" "}
                    <span className="calc-rate-hint">
                      ₹/bag (default: {MATERIAL_RATES.cement.rate})
                    </span>
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
                    Steel{" "}
                    <span className="calc-rate-hint">
                      ₹/kg (default: {MATERIAL_RATES.steel.rate})
                    </span>
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
                    Sand{" "}
                    <span className="calc-rate-hint">
                      ₹/cft (default: {MATERIAL_RATES.sand.rate})
                    </span>
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
                    Aggregate{" "}
                    <span className="calc-rate-hint">
                      ₹/cft (default: {MATERIAL_RATES.aggregate.rate})
                    </span>
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
        )}

        {/* Main Tabs Navigation */}
        {/* REMOVED - Now in hero section */}

        {/* Tab Content */}
        {mainTab === "costing" && results && (
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
                    Rate:{" "}
                    <strong>
                      ₹
                      {Math.round(
                        results.buildingCost.costPerSqft,
                      ).toLocaleString("en-IN")}
                      /sq.ft
                    </strong>
                  </span>
                  <span>
                    Area:{" "}
                    <strong>
                      {results.buildingCost.totalArea.toLocaleString("en-IN")}{" "}
                      sq.ft
                    </strong>
                  </span>
                  <span>
                    Floors: <strong>{inputs.floors}</strong>
                  </span>
                  <span>
                    Duration:{" "}
                    <strong>
                      {results.timeline.totalDays} days (~
                      {results.timeline.totalMonths} months)
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Sub Tabs */}
            <div className="calc-tabs">
              <button
                className={`calc-tab ${costingSubTab === "cost" ? "active" : ""}`}
                onClick={() => setCostingSubTab("cost")}
              >
                💰 Cost Breakdown
              </button>
              <button
                className={`calc-tab ${costingSubTab === "structure" ? "active" : ""}`}
                onClick={() => setCostingSubTab("structure")}
              >
                🏛️ Structure Design
              </button>
              {results.stairDesign && (
                <button
                  className={`calc-tab ${costingSubTab === "stair" ? "active" : ""}`}
                  onClick={() => setCostingSubTab("stair")}
                >
                  🪜 Staircase Design
                </button>
              )}
              <button
                className={`calc-tab ${costingSubTab === "footing" ? "active" : ""}`}
                onClick={() => setCostingSubTab("footing")}
              >
                🏗️ Foundation Design
              </button>
              <button
                className={`calc-tab ${costingSubTab === "bbs" ? "active" : ""}`}
                onClick={() => setCostingSubTab("bbs")}
              >
                📋 Bar Bending Schedule
              </button>
              <button
                className={`calc-tab ${costingSubTab === "boq" ? "active" : ""}`}
                onClick={() => setCostingSubTab("boq")}
              >
                📄 Bill of Quantities
              </button>
            </div>

            {/* Sub Tab Content */}
            <div className="calc-tab-content">
              {costingSubTab === "cost" && (
                <CostBreakdown results={results.buildingCost} />
              )}
              {costingSubTab === "structure" && (
                <StructureDesign design={results.structureDesign} />
              )}
              {costingSubTab === "stair" && results.stairDesign && (
                <StaircaseDesign design={results.stairDesign} />
              )}
              {costingSubTab === "footing" && (
                <FoundationDesign footing={results.footing} />
              )}
              {costingSubTab === "bbs" && (
                <CompleteBBS
                  barBending={results.barBending}
                  completeBBS={results.completeBBS}
                />
              )}
              {costingSubTab === "boq" && (
                <FullBOQ
                  standardBOQ={results.standardBOQ}
                  premiumBOQ={results.premiumBOQ}
                  floorWiseBOQ={results.floorWiseBOQ}
                />
              )}
            </div>

            <div style={{ textAlign: "center", paddingTop: "2rem" }}>
              <button onClick={handleReset} className="calc-btn-secondary">
                ← New Estimate
              </button>
            </div>
          </section>
        )}

        {mainTab === "beam" && (
          <section className="calc-results-section">
            {results?.structureDesign && (
              <div
                className="calc-alert calc-alert-info"
                style={{ marginBottom: "1.5rem" }}
              >
                <strong>ℹ️ Auto-populated from Structure Design:</strong> Beam
                dimensions and material grades have been filled based on your
                building estimate. You can modify them as needed.
              </div>
            )}
            <BeamDesignTab
              inputs={beamInputs}
              onInputChange={(e) =>
                setBeamInputs({
                  ...beamInputs,
                  [e.target.name]: e.target.value,
                })
              }
              onCalculate={handleBeamCalculate}
              results={beamResults}
            />
          </section>
        )}

        {mainTab === "column" && (
          <section className="calc-results-section">
            {results?.structureDesign && (
              <div
                className="calc-alert calc-alert-info"
                style={{ marginBottom: "1.5rem" }}
              >
                <strong>ℹ️ Auto-populated from Structure Design:</strong> Column
                dimensions and material grades have been filled based on your
                building estimate. You can modify them as needed.
              </div>
            )}
            <ColumnDesignTab
              inputs={columnInputs}
              onInputChange={(e) =>
                setColumnInputs({
                  ...columnInputs,
                  [e.target.name]: e.target.value,
                })
              }
              onCalculate={handleColumnCalculate}
              results={columnResults}
            />
          </section>
        )}
      </main>
    </div>
  );
}

export default CalculatorsPage;
