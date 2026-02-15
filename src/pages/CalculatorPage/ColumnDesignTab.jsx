// ═══════════════════════════════════════════════════════════════════════════
// COLUMN DESIGN TAB COMPONENT
// Complete UI for Column Design Calculator with Results Display
// ═══════════════════════════════════════════════════════════════════════════

import React from "react";

export function ColumnDesignTab({
  inputs,
  onInputChange,
  onCalculate,
  results,
}) {
  // Safe number formatting helper to prevent toFixed errors
  const safeFormat = (value, decimals = 2) => {
    if (value === null || value === undefined || isNaN(value)) {
      return "N/A";
    }
    return Number(value).toFixed(decimals);
  };

  // Safe property access helper
  const safeGet = (obj, path, fallback = "N/A") => {
    try {
      const value = path.split('.').reduce((acc, part) => acc?.[part], obj);
      return value !== undefined && value !== null ? value : fallback;
    } catch {
      return fallback;
    }
  };

  return (
    <div className="calc-result-card">
      <h3 className="calc-breakdown-header">
        <span>🏛️</span> Column Design Calculator (IS 456:2000)
      </h3>

      {/* Input Section */}
      <div className="calc-card">
        <h4 className="calc-card-subtitle">Input Parameters</h4>

        {/* Load Inputs */}
        <div className="calc-card-section">
          <h5 className="calc-section-label">Loading Conditions</h5>
          <div className="calc-grid-3">
            <div className="calc-input-group">
              <label className="calc-label-primary">
                Factored Axial Load, Pu (kN) *
              </label>
              <input
                type="number"
                className="calc-input-primary"
                name="Pu"
                value={inputs.Pu || ""}
                onChange={onInputChange}
                placeholder="1500"
                step="1"
              />
              <small className="calc-input-hint">
                Compressive load including self-weight
              </small>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">Moment Mux (kNm)</label>
              <input
                type="number"
                className="calc-input-primary"
                name="Mux"
                value={inputs.Mux || ""}
                onChange={onInputChange}
                placeholder="80"
                step="0.1"
              />
              <small className="calc-input-hint">
                Moment about major axis (optional)
              </small>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">Moment Muy (kNm)</label>
              <input
                type="number"
                className="calc-input-primary"
                name="Muy"
                value={inputs.Muy || ""}
                onChange={onInputChange}
                placeholder="0"
                step="0.1"
              />
              <small className="calc-input-hint">
                Moment about minor axis (optional)
              </small>
            </div>
          </div>
        </div>

        {/* Dimension Inputs */}
        <div className="calc-card-section">
          <h5 className="calc-section-label">Column Dimensions</h5>
          <div className="calc-grid-3">
            <div className="calc-input-group">
              <label className="calc-label-primary">Width, b (mm) *</label>
              <input
                type="number"
                className="calc-input-primary"
                name="b"
                value={inputs.b || ""}
                onChange={onInputChange}
                placeholder="300"
              />
              <small className="calc-input-hint">
                Typical: 230, 300, 350, 450 mm
              </small>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">Depth, D (mm) *</label>
              <input
                type="number"
                className="calc-input-primary"
                name="D"
                value={inputs.D || ""}
                onChange={onInputChange}
                placeholder="450"
              />
              <small className="calc-input-hint">Larger dimension</small>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">
                Unsupported Length, L (mm) *
              </label>
              <input
                type="number"
                className="calc-input-primary"
                name="L"
                value={inputs.L || ""}
                onChange={onInputChange}
                placeholder="3500"
              />
              <small className="calc-input-hint">
                Clear height between restraints
              </small>
            </div>
          </div>
        </div>

        {/* Boundary Conditions */}
        <div className="calc-card-section">
          <h5 className="calc-section-label">Restraint Conditions</h5>
          <div className="calc-grid-2">
            <div className="calc-input-group">
              <label className="calc-label-primary">Major Axis Restraint</label>
              <select
                className="calc-input-primary"
                name="restraintX"
                value={inputs.restraintX || "both-hinged"}
                onChange={onInputChange}
              >
                <option value="both-fixed">Both Ends Fixed</option>
                <option value="one-fixed-one-hinged">
                  One Fixed, One Hinged
                </option>
                <option value="both-hinged">Both Ends Hinged</option>
                <option value="one-fixed-one-free">One Fixed, One Free</option>
              </select>
              <small className="calc-input-hint">
                Effective length factor: IS 456 Table 28
              </small>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">Minor Axis Restraint</label>
              <select
                className="calc-input-primary"
                name="restraintY"
                value={inputs.restraintY || "both-hinged"}
                onChange={onInputChange}
              >
                <option value="both-fixed">Both Ends Fixed</option>
                <option value="one-fixed-one-hinged">
                  One Fixed, One Hinged
                </option>
                <option value="both-hinged">Both Ends Hinged</option>
                <option value="one-fixed-one-free">One Fixed, One Free</option>
              </select>
              <small className="calc-input-hint">
                Effective length factor: IS 456 Table 28
              </small>
            </div>
          </div>
        </div>

        {/* Material Inputs */}
        <div className="calc-card-section">
          <h5 className="calc-section-label">Material Properties</h5>
          <div className="calc-grid-3">
            <div className="calc-input-group">
              <label className="calc-label-primary">Concrete Grade *</label>
              <select
                className="calc-input-primary"
                name="fck"
                value={inputs.fck || "25"}
                onChange={onInputChange}
              >
                <option value="15">M15 (fck = 15 MPa)</option>
                <option value="20">M20 (fck = 20 MPa)</option>
                <option value="25">M25 (fck = 25 MPa)</option>
                <option value="30">M30 (fck = 30 MPa)</option>
                <option value="35">M35 (fck = 35 MPa)</option>
                <option value="40">M40 (fck = 40 MPa)</option>
              </select>
              <small className="calc-input-hint">
                Characteristic compressive strength
              </small>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">Steel Grade *</label>
              <select
                className="calc-input-primary"
                name="fy"
                value={inputs.fy || "500"}
                onChange={onInputChange}
              >
                <option value="415">Fe415 (fy = 415 MPa)</option>
                <option value="500">Fe500 (fy = 500 MPa)</option>
                <option value="550">Fe550 (fy = 550 MPa)</option>
              </select>
              <small className="calc-input-hint">
                Characteristic yield strength
              </small>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">Clear Cover (mm) *</label>
              <input
                type="number"
                className="calc-input-primary"
                name="cover"
                value={inputs.cover || "40"}
                onChange={onInputChange}
              />
              <small className="calc-input-hint">
                Minimum: 40mm for columns
              </small>
            </div>
          </div>
        </div>

        <button
          className="calc-btn-primary"
          onClick={onCalculate}
          disabled={
            !inputs.Pu ||
            !inputs.b ||
            !inputs.D ||
            !inputs.L ||
            !inputs.fck ||
            !inputs.fy
          }
        >
          <span>🎯</span> DESIGN COLUMN
        </button>
      </div>

      {/* Results Section */}
      {results && !results.error && (
        <>
          {/* Design Summary */}
          {results.slenderness && results.summary && (
            <div className="calc-struct-section">
              <h4 className="calc-struct-section-title">
                <span>📊</span> Design Summary
              </h4>
              <div className="calc-struct-grid">
                <div
                  className="calc-struct-card"
                  style={{
                    borderColor: results.slenderness.isShort
                      ? "#3B82F6"
                      : "#F59E0B",
                  }}
                >
                  <div className="calc-struct-icon">📏</div>
                  <div className="calc-struct-title">Classification</div>
                  <div className="calc-struct-value">
                    {safeGet(results, 'summary.classification', 'N/A')}
                  </div>
                  <div className="calc-struct-sub">
                    λx = {safeFormat(results.slenderness.slenderness_x, 1)}, λy ={" "}
                    {safeFormat(results.slenderness.slenderness_y, 1)}
                  </div>
                </div>

                <div className="calc-struct-card">
                  <div className="calc-struct-icon">🎯</div>
                  <div className="calc-struct-title">Design Type</div>
                  <div
                    className="calc-struct-value"
                    style={{ fontSize: "0.9em" }}
                  >
                    {(safeGet(results, 'summary.designType', 'N/A')).replace("-", " ").toUpperCase()}
                  </div>
                  <div className="calc-struct-sub">Load condition</div>
                </div>

                <div className="calc-struct-card">
                  <div className="calc-struct-icon">⚙️</div>
                  <div className="calc-struct-title">Longitudinal Steel</div>
                  <div className="calc-struct-value">
                    {safeGet(results, 'summary.longitudinalSteel', 'N/A')}
                  </div>
                  <div className="calc-struct-sub">
                    p = {safeGet(results, 'summary.reinforcementRatio', 'N/A')}
                  </div>
                </div>

                <div className="calc-struct-card">
                  <div className="calc-struct-icon">🔗</div>
                  <div className="calc-struct-title">Lateral Ties</div>
                  <div className="calc-struct-value">
                    {safeGet(results, 'summary.lateralTies', 'N/A')}
                  </div>
                  <div className="calc-struct-sub">Confinement reinforcement</div>
                </div>

                <div className="calc-struct-card">
                  <div className="calc-struct-icon">💪</div>
                  <div className="calc-struct-title">Load Capacity</div>
                  <div className="calc-struct-value" style={{ color: "#10B981" }}>
                    {safeGet(results, 'summary.loadCapacity', 'N/A')}
                  </div>
                  <div className="calc-struct-sub">
                    Factor: {safeGet(results, 'summary.loadFactor', 'N/A')}
                  </div>
                </div>

                <div
                  className="calc-struct-card"
                  style={{
                    borderColor:
                      safeGet(results, 'summary.status') === "OK" ? "#10B981" : "#EF4444",
                    backgroundColor:
                      safeGet(results, 'summary.status') === "OK" ? "#F0FDF4" : "#FEF2F2",
                  }}
                >
                  <div
                    className="calc-struct-icon"
                    style={{
                      color:
                        safeGet(results, 'summary.status') === "OK" ? "#10B981" : "#EF4444",
                    }}
                  >
                    {safeGet(results, 'summary.status') === "OK" ? "✓" : "✗"}
                  </div>
                  <div className="calc-struct-title">Design Status</div>
                  <div
                    className="calc-struct-value"
                    style={{
                      color:
                        safeGet(results, 'summary.status') === "OK" ? "#10B981" : "#EF4444",
                    }}
                  >
                    {safeGet(results, 'summary.status', 'UNKNOWN')}
                  </div>
                  <div className="calc-struct-sub">Overall compliance</div>
                </div>
              </div>
            </div>
          )}

          {/* Effective Lengths & Slenderness */}
          {results.effectiveLengths && results.slenderness && (
            <div className="calc-card">
              <h4 className="calc-card-subtitle">
                <span>📐</span> Slenderness Analysis
              </h4>

              <div className="calc-detail-grid">
                <div className="calc-detail-item">
                  <span className="calc-detail-label">
                    Unsupported Length (L)
                  </span>
                  <span className="calc-detail-value">{inputs.L || 'N/A'} mm</span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">
                    Effective Length (lex)
                  </span>
                  <span className="calc-detail-value">
                    {safeGet(results, 'effectiveLengths.lex', 'N/A')} mm
                  </span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">
                    Effective Length (ley)
                  </span>
                  <span className="calc-detail-value">
                    {safeGet(results, 'effectiveLengths.ley', 'N/A')} mm
                  </span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Classification</span>
                  <span
                    className="calc-detail-value"
                    style={{
                      color: results.slenderness.isShort ? "#10B981" : "#F59E0B",
                      fontWeight: "bold",
                    }}
                  >
                    {safeGet(results, 'slenderness.classification', 'N/A')}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: "15px" }}>
                <div className="calc-detail-grid">
                  <div className="calc-detail-item">
                    <span className="calc-detail-label">
                      Slenderness Ratio (lex/D)
                    </span>
                    <span className="calc-detail-value">
                      {safeFormat(results.slenderness.slenderness_x, 2)}
                      {results.slenderness.isShort_x && (
                        <span style={{ color: "#10B981", marginLeft: "5px" }}>
                          ✓ Short
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="calc-detail-item">
                    <span className="calc-detail-label">
                      Slenderness Ratio (ley/b)
                    </span>
                    <span className="calc-detail-value">
                      {safeFormat(results.slenderness.slenderness_y, 2)}
                      {results.slenderness.isShort_y && (
                        <span style={{ color: "#10B981", marginLeft: "5px" }}>
                          ✓ Short
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="calc-detail-item">
                    <span className="calc-detail-label">
                      Limit (Short Column)
                    </span>
                    <span className="calc-detail-value">12.0</span>
                  </div>
                  <div className="calc-detail-item">
                    <span className="calc-detail-label">Reference</span>
                    <span
                      className="calc-detail-value"
                      style={{ fontSize: "0.9em" }}
                    >
                      IS 456 Cl. 25.1.2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Eccentricity Details */}
          {results.eccentricity && (
            <div className="calc-card">
              <h4 className="calc-card-subtitle">
                <span>🎯</span> Eccentricity Analysis
              </h4>

              <div className="calc-detail-grid">
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Min. Eccentricity ex</span>
                  <span className="calc-detail-value">
                    {safeFormat(results.eccentricity.ex_min, 1)} mm
                  </span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Min. Eccentricity ey</span>
                  <span className="calc-detail-value">
                    {safeFormat(results.eccentricity.ey_min, 1)} mm
                  </span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Actual ex</span>
                  <span
                    className="calc-detail-value"
                    style={{ color: "#F59E0B", fontWeight: "bold" }}
                  >
                    {safeFormat(results.eccentricity.ex_actual, 1)} mm
                  </span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Actual ey</span>
                  <span
                    className="calc-detail-value"
                    style={{ color: "#F59E0B", fontWeight: "bold" }}
                  >
                    {safeFormat(results.eccentricity.ey_actual, 1)} mm
                  </span>
                </div>
              </div>

              <div style={{ marginTop: "15px" }}>
                <div className="calc-detail-grid">
                  <div className="calc-detail-item">
                    <span className="calc-detail-label">Design Moment Mux</span>
                    <span className="calc-detail-value">
                      {safeFormat(inputs.Mux_design, 2)} kNm
                    </span>
                  </div>
                  <div className="calc-detail-item">
                    <span className="calc-detail-label">Design Moment Muy</span>
                    <span className="calc-detail-value">
                      {safeFormat(inputs.Muy_design, 2)} kNm
                    </span>
                  </div>
                  <div className="calc-detail-item">
                    <span className="calc-detail-label">Reference</span>
                    <span
                      className="calc-detail-value"
                      style={{ fontSize: "0.9em" }}
                    >
                      IS 456 Cl. 25.4
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Design Details */}
          {results.design && (
            <div className="calc-card">
              <h4 className="calc-card-subtitle">
                <span>💪</span> Reinforcement Design
              </h4>

              {results.design.status === "FAIL" ? (
                <div className="calc-alert calc-alert-error">
                  <strong>⚠️ Design Failed:</strong> {safeGet(results, 'design.message', 'Check input parameters')}
                </div>
              ) : (
                <>
                  <div className="calc-detail-grid">
                    <div className="calc-detail-item">
                      <span className="calc-detail-label">Required Steel %</span>
                      <span className="calc-detail-value">
                        {safeFormat(results.design.p_required, 2)}%
                      </span>
                    </div>
                    <div className="calc-detail-item">
                      <span className="calc-detail-label">
                        Required Area (Asc)
                      </span>
                      <span className="calc-detail-value">
                        {safeFormat(results.design.Asc_required, 0)} mm²
                      </span>
                    </div>
                    <div className="calc-detail-item">
                      <span className="calc-detail-label">
                        Axial Capacity (Pu)
                      </span>
                      <span
                        className="calc-detail-value"
                        style={{ color: "#10B981" }}
                      >
                        {safeFormat(results.design.Pu_capacity, 2)} kN
                      </span>
                    </div>
                    {results.design.Mu_capacity && (
                      <div className="calc-detail-item">
                        <span className="calc-detail-label">
                          Moment Capacity (Mu)
                        </span>
                        <span
                          className="calc-detail-value"
                          style={{ color: "#10B981" }}
                        >
                          {safeFormat(results.design.Mu_capacity, 2)} kNm
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Utilization Ratios */}
                  {results.design.utilization && (
                    <div style={{ marginTop: "20px" }}>
                      <h5 className="calc-section-label">Interaction Check</h5>
                      <div className="calc-detail-grid">
                        <div className="calc-detail-item">
                          <span className="calc-detail-label">
                            Axial Utilization
                          </span>
                          <span className="calc-detail-value">
                            {safeFormat(results.design.utilization.axial * 100, 1)}%
                          </span>
                        </div>
                        <div className="calc-detail-item">
                          <span className="calc-detail-label">
                            Moment Utilization
                          </span>
                          <span className="calc-detail-value">
                            {safeFormat(results.design.utilization.moment * 100, 1)}%
                          </span>
                        </div>
                        <div className="calc-detail-item">
                          <span className="calc-detail-label">
                            Total Interaction
                          </span>
                          <span
                            className="calc-detail-value"
                            style={{
                              color:
                                results.design.utilization.total <= 1.0
                                  ? "#10B981"
                                  : "#EF4444",
                              fontWeight: "bold",
                            }}
                          >
                            {safeFormat(results.design.utilization.total * 100, 1)}%
                            {results.design.utilization.total <= 1.0
                              ? " ✓"
                              : " ✗"}
                          </span>
                        </div>
                        <div className="calc-detail-item">
                          <span className="calc-detail-label">Limit</span>
                          <span className="calc-detail-value">100%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bar Options */}
                  {results.design.barOptions && (
                    <div style={{ marginTop: "20px" }}>
                      <h5 className="calc-section-label">
                        Reinforcement Options
                      </h5>
                      <div className="calc-table-container">
                        <table className="calc-table">
                          <thead>
                            <tr>
                              <th>Option</th>
                              <th>Bar Size</th>
                              <th>Number of Bars</th>
                              <th>Area Provided</th>
                              <th>Steel %</th>
                              <th>Spacing</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.design.barOptions.map((option, idx) => (
                              <tr
                                key={idx}
                                style={{
                                  backgroundColor:
                                    idx === 0 ? "#F0F9FF" : "transparent",
                                  fontWeight: idx === 0 ? "bold" : "normal",
                                }}
                              >
                                <td>
                                  {idx === 0
                                    ? "⭐ Recommended"
                                    : `Option ${idx + 1}`}
                                </td>
                                <td>{option.diameter || 'N/A'} mm φ</td>
                                <td>{option.numBars || 'N/A'}</td>
                                <td>{safeFormat(option.actualAsc, 0)} mm²</td>
                                <td>{safeFormat(option.p_provided, 2)}%</td>
                                <td>{safeFormat(option.spacing, 0)} mm</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Biaxial Note */}
                  {results.design.biaxialNote && (
                    <div
                      className="calc-alert calc-alert-info"
                      style={{ marginTop: "20px" }}
                    >
                      <strong>ℹ️ Note:</strong> {results.design.biaxialNote}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Lateral Ties */}
          {results.ties && (
            <div className="calc-card">
              <h4 className="calc-card-subtitle">
                <span>🔗</span> Lateral Reinforcement
              </h4>

              <div className="calc-detail-grid">
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Tie Diameter</span>
                  <span className="calc-detail-value">
                    {safeGet(results, 'ties.diameter', 'N/A')} mm φ
                  </span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Spacing</span>
                  <span className="calc-detail-value">
                    {safeGet(results, 'ties.spacing', 'N/A')} mm c/c
                  </span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Type</span>
                  <span className="calc-detail-value">{safeGet(results, 'ties.type', 'N/A')}</span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Description</span>
                  <span
                    className="calc-detail-value"
                    style={{ fontWeight: "bold", color: "#F59E0B" }}
                  >
                    {safeGet(results, 'ties.description', 'N/A')}
                  </span>
                </div>
              </div>

              <div
                className="calc-alert calc-alert-info"
                style={{ marginTop: "15px" }}
              >
                <strong>ℹ️ Spacing Criteria (IS 456 Cl. 26.5.3.2):</strong>
                <ul
                  style={{
                    paddingLeft: "20px",
                    marginTop: "8px",
                    marginBottom: "0",
                  }}
                >
                  <li>
                    ≤ Least lateral dimension ({Math.min(inputs.b || 0, inputs.D || 0)} mm)
                  </li>
                  <li>≤ 16 × longitudinal bar diameter</li>
                  <li>≤ 300 mm</li>
                </ul>
              </div>
            </div>
          )}

          {/* Design Notes */}
          <div
            className="calc-card"
            style={{ backgroundColor: "#FFF7ED", border: "2px solid #F59E0B" }}
          >
            <h4 className="calc-card-subtitle" style={{ color: "#F59E0B" }}>
              <span>📝</span> Design Notes & Recommendations
            </h4>

            <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
              <li>
                <strong>Design Standard:</strong> IS 456:2000 (Code of Practice
                for Plain and Reinforced Concrete)
              </li>
              <li>
                <strong>Load Factor:</strong> Ensure loads are factored as per
                IS 456 Cl. 36
              </li>
              <li>
                <strong>Reinforcement Limits:</strong> Min 0.8%, Max 4% (up to
                6% at laps)
              </li>
              <li>
                <strong>Minimum Bars:</strong> 4 bars for rectangular columns, 6
                for circular
              </li>
              <li>
                <strong>Concrete Cover:</strong> Minimum 40mm for columns
                (verify exposure condition)
              </li>
              <li>
                <strong>Bar Spacing:</strong> Clear distance ≥ bar diameter or ≥
                aggregate size + 5mm
              </li>
              <li>
                <strong>Lap Splices:</strong> Stagger laps and provide
                additional ties
              </li>
              <li>
                <strong>Detailing:</strong> Follow IS 456 Cl. 26.5.3 for column
                detailing
              </li>
              {results.slenderness && !results.slenderness.isShort && (
                <li>
                  <strong>Slender Column:</strong> Consider additional moments
                  due to slenderness effects
                </li>
              )}
              {results.design?.type === "biaxial" && (
                <li>
                  <strong>Biaxial Bending:</strong> Verify design using
                  interaction curves or detailed analysis
                </li>
              )}
            </ul>
          </div>
        </>
      )}

      {results && results.error && (
        <div className="calc-alert calc-alert-error">
          <strong>Error:</strong> {results.error}
        </div>
      )}
    </div>
  );
}

export default ColumnDesignTab;