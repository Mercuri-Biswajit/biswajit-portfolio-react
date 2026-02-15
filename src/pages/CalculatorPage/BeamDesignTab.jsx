// ═══════════════════════════════════════════════════════════════════════════
// BEAM DESIGN TAB COMPONENT
// Complete UI for Beam Design Calculator with Results Display
// ═══════════════════════════════════════════════════════════════════════════

import React from "react";

export function BeamDesignTab({ inputs, onInputChange, onCalculate, results }) {
  return (
    <div className="calc-result-card">
      <h3 className="calc-breakdown-header">
        <span>🏗️</span> Beam Design Calculator (IS 456:2000)
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
                Factored Bending Moment, Mu (kNm) *
              </label>
              <input
                type="number"
                className="calc-input-primary"
                name="Mu"
                value={inputs.Mu || ""}
                onChange={onInputChange}
                placeholder="150"
                step="0.1"
              />
              <small className="calc-input-hint">
                Design moment at critical section
              </small>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">
                Factored Shear Force, Vu (kN) *
              </label>
              <input
                type="number"
                className="calc-input-primary"
                name="Vu"
                value={inputs.Vu || ""}
                onChange={onInputChange}
                placeholder="80"
                step="0.1"
              />
              <small className="calc-input-hint">Design shear at support</small>
            </div>
          </div>
        </div>

        {/* Dimension Inputs */}
        <div className="calc-card-section">
          <h5 className="calc-section-label">Beam Dimensions</h5>
          <div className="calc-grid-3">
            <div className="calc-input-group">
              <label className="calc-label-primary">Width, b (mm) *</label>
              <input
                type="number"
                className="calc-input-primary"
                name="b"
                value={inputs.b || ""}
                onChange={onInputChange}
                placeholder="230"
              />
              <small className="calc-input-hint">
                Typical: 230, 300, 350, 450 mm
              </small>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">
                Total Depth, D (mm) *
              </label>
              <input
                type="number"
                className="calc-input-primary"
                name="D"
                value={inputs.D || ""}
                onChange={onInputChange}
                placeholder="450"
              />
              <small className="calc-input-hint">Overall depth of beam</small>
            </div>

            <div className="calc-input-group">
              <label className="calc-label-primary">Span, L (mm)</label>
              <input
                type="number"
                className="calc-input-primary"
                name="span"
                value={inputs.span || ""}
                onChange={onInputChange}
                placeholder="6000"
              />
              <small className="calc-input-hint">
                For deflection check (optional)
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
                value={inputs.cover || "30"}
                onChange={onInputChange}
              />
              <small className="calc-input-hint">
                Mild: 25, Moderate: 30, Severe: 45
              </small>
            </div>
          </div>
        </div>

        <button
          className="calc-btn-primary"
          onClick={onCalculate}
          disabled={
            !inputs.Mu ||
            !inputs.Vu ||
            !inputs.b ||
            !inputs.D ||
            !inputs.fck ||
            !inputs.fy
          }
        >
          <span>🎯</span> DESIGN BEAM
        </button>
      </div>

      {/* Results Section */}
      {results && !results.error && (
        <>
          {/* Design Summary */}
          <div className="calc-struct-section">
            <h4 className="calc-struct-section-title">
              <span>📊</span> Design Summary
            </h4>
            <div className="calc-struct-grid">
              <div
                className="calc-struct-card"
                style={{
                  borderColor:
                    results.summary.designType === "singly"
                      ? "#3B82F6"
                      : "#F59E0B",
                }}
              >
                <div className="calc-struct-icon">📐</div>
                <div className="calc-struct-title">Design Type</div>
                <div className="calc-struct-value">
                  {results.summary.designType === "singly"
                    ? "Singly Reinforced"
                    : "Doubly Reinforced"}
                </div>
                <div className="calc-struct-sub">
                  Reinforcement configuration
                </div>
              </div>

              <div className="calc-struct-card">
                <div className="calc-struct-icon">⚙️</div>
                <div className="calc-struct-title">Tension Steel</div>
                <div className="calc-struct-value">
                  {results.summary.tension}
                </div>
                <div className="calc-struct-sub">
                  Main reinforcement (bottom)
                </div>
              </div>

              {results.summary.compression !== "Not required" && (
                <div className="calc-struct-card">
                  <div className="calc-struct-icon">🔧</div>
                  <div className="calc-struct-title">Compression Steel</div>
                  <div className="calc-struct-value">
                    {results.summary.compression}
                  </div>
                  <div className="calc-struct-sub">Top reinforcement</div>
                </div>
              )}

              <div className="calc-struct-card">
                <div className="calc-struct-icon">🔗</div>
                <div className="calc-struct-title">Stirrups</div>
                <div className="calc-struct-value">
                  {results.summary.stirrups}
                </div>
                <div className="calc-struct-sub">Shear reinforcement</div>
              </div>

              <div
                className="calc-struct-card"
                style={{
                  borderColor:
                    results.summary.status === "OK" ? "#10B981" : "#EF4444",
                  backgroundColor:
                    results.summary.status === "OK" ? "#F0FDF4" : "#FEF2F2",
                }}
              >
                <div
                  className="calc-struct-icon"
                  style={{
                    color:
                      results.summary.status === "OK" ? "#10B981" : "#EF4444",
                  }}
                >
                  {results.summary.status === "OK" ? "✓" : "✗"}
                </div>
                <div className="calc-struct-title">Design Status</div>
                <div
                  className="calc-struct-value"
                  style={{
                    color:
                      results.summary.status === "OK" ? "#10B981" : "#EF4444",
                  }}
                >
                  {results.summary.status}
                </div>
                <div className="calc-struct-sub">Overall compliance</div>
              </div>
            </div>
          </div>

          {/* Flexural Design Details */}
          <div className="calc-card">
            <h4 className="calc-card-subtitle">
              <span>💪</span> Flexural Design Details
            </h4>

            <div className="calc-detail-grid">
              <div className="calc-detail-item">
                <span className="calc-detail-label">Effective Depth (d)</span>
                <span className="calc-detail-value">
                  {results.inputs.d.toFixed(0)} mm
                </span>
              </div>
              <div className="calc-detail-item">
                <span className="calc-detail-label">Effective Cover (d')</span>
                <span className="calc-detail-value">
                  {results.inputs.d_prime.toFixed(0)} mm
                </span>
              </div>
              <div className="calc-detail-item">
                <span className="calc-detail-label">
                  Limiting Moment (Mu,lim)
                </span>
                <span className="calc-detail-value">
                  {results.limiting.Mu_lim.toFixed(2)} kNm
                </span>
              </div>
              <div className="calc-detail-item">
                <span className="calc-detail-label">xu,max / d</span>
                <span className="calc-detail-value">
                  {results.limiting.xu_max_by_d.toFixed(3)}
                </span>
              </div>
            </div>

            {/* Reinforcement Requirements */}
            <div style={{ marginTop: "20px" }}>
              <h5 className="calc-section-label">Steel Reinforcement</h5>
              <div className="calc-detail-grid">
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Ast Required</span>
                  <span className="calc-detail-value">
                    {results.flexuralDesign.Ast_required.toFixed(0)} mm²
                  </span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Ast Minimum</span>
                  <span className="calc-detail-value">
                    {results.flexuralDesign.Ast_min.toFixed(0)} mm²
                  </span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Ast Provided</span>
                  <span
                    className="calc-detail-value"
                    style={{ color: "#10B981", fontWeight: "bold" }}
                  >
                    {(
                      results.flexuralDesign.Ast_provided ||
                      results.flexuralDesign.barOptions[0].actualAst
                    ).toFixed(0)}{" "}
                    mm²
                  </span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Reinforcement %</span>
                  <span className="calc-detail-value">
                    {results.flexuralDesign.pt_provided.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Bar Options */}
            <div style={{ marginTop: "20px" }}>
              <h5 className="calc-section-label">Reinforcement Options</h5>
              <div className="calc-table-container">
                <table className="calc-table">
                  <thead>
                    <tr>
                      <th>Option</th>
                      <th>Bar Size</th>
                      <th>Number of Bars</th>
                      <th>Area Provided</th>
                      <th>Spacing</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(
                      results.flexuralDesign.barOptions ||
                      results.flexuralDesign.tensionBarOptions ||
                      []
                    ).map((option, idx) => (
                      <tr
                        key={idx}
                        style={{
                          backgroundColor:
                            idx === 0 ? "#F0F9FF" : "transparent",
                          fontWeight: idx === 0 ? "bold" : "normal",
                        }}
                      >
                        <td>
                          {idx === 0 ? "⭐ Recommended" : `Option ${idx + 1}`}
                        </td>
                        <td>{option.diameter} mm φ</td>
                        <td>{option.numBars}</td>
                        <td>{option.actualAst.toFixed(0)} mm²</td>
                        <td>{option.spacing.toFixed(0)} mm</td>
                        <td>
                          <span
                            style={{
                              color:
                                option.spacing >= 75 && option.spacing <= 300
                                  ? "#10B981"
                                  : "#F59E0B",
                              fontSize: "18px",
                            }}
                          >
                            {option.spacing >= 75 && option.spacing <= 300
                              ? "✓"
                              : "⚠️"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Compression Steel (if doubly reinforced) */}
            {results.flexuralDesign.designType === "doubly" &&
              results.flexuralDesign.compressionBarOptions && (
                <div style={{ marginTop: "20px" }}>
                  <h5 className="calc-section-label">
                    Compression Steel Options
                  </h5>
                  <div className="calc-detail-grid">
                    <div className="calc-detail-item">
                      <span className="calc-detail-label">Asc Required</span>
                      <span className="calc-detail-value">
                        {results.flexuralDesign.Asc_required.toFixed(0)} mm²
                      </span>
                    </div>
                    <div className="calc-detail-item">
                      <span className="calc-detail-label">
                        Additional Moment
                      </span>
                      <span className="calc-detail-value">
                        {results.flexuralDesign.Mu2.toFixed(2)} kNm
                      </span>
                    </div>
                  </div>
                  <div
                    className="calc-table-container"
                    style={{ marginTop: "10px" }}
                  >
                    <table className="calc-table">
                      <thead>
                        <tr>
                          <th>Option</th>
                          <th>Bar Size</th>
                          <th>Number of Bars</th>
                          <th>Area Provided</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.flexuralDesign.compressionBarOptions.map(
                          (option, idx) => (
                            <tr
                              key={idx}
                              style={{
                                backgroundColor:
                                  idx === 0 ? "#FFF7ED" : "transparent",
                                fontWeight: idx === 0 ? "bold" : "normal",
                              }}
                            >
                              <td>
                                {idx === 0
                                  ? "⭐ Recommended"
                                  : `Option ${idx + 1}`}
                              </td>
                              <td>{option.diameter} mm φ</td>
                              <td>{option.numBars}</td>
                              <td>{option.actualAsc.toFixed(0)} mm²</td>
                            </tr>
                          ),
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
          </div>

          {/* Shear Design Details */}
          <div className="calc-card">
            <h4 className="calc-card-subtitle">
              <span>🔗</span> Shear Design Details
            </h4>

            <div className="calc-detail-grid">
              <div className="calc-detail-item">
                <span className="calc-detail-label">
                  Nominal Shear Stress (τv)
                </span>
                <span className="calc-detail-value">
                  {results.shearDesign.tau_v.toFixed(3)} MPa
                </span>
              </div>
              <div className="calc-detail-item">
                <span className="calc-detail-label">
                  Design Shear Strength (τc)
                </span>
                <span className="calc-detail-value">
                  {results.shearDesign.tau_c.toFixed(3)} MPa
                </span>
              </div>
              <div className="calc-detail-item">
                <span className="calc-detail-label">
                  Max Shear Stress (τc,max)
                </span>
                <span className="calc-detail-value">
                  {results.shearDesign.tau_c_max.toFixed(2)} MPa
                </span>
              </div>
              <div className="calc-detail-item">
                <span className="calc-detail-label">Design Status</span>
                <span
                  className="calc-detail-value"
                  style={{
                    color:
                      results.shearDesign.status === "FAIL"
                        ? "#EF4444"
                        : "#10B981",
                  }}
                >
                  {results.shearDesign.status}
                </span>
              </div>
            </div>

            {results.shearDesign.status === "FAIL" && (
              <div className="calc-alert calc-alert-error">
                <strong>⚠️ Section Inadequate:</strong>{" "}
                {results.shearDesign.message}
              </div>
            )}

            {results.shearDesign.stirrupOptions && (
              <div style={{ marginTop: "20px" }}>
                <h5 className="calc-section-label">Stirrup Options</h5>
                <div className="calc-table-container">
                  <table className="calc-table">
                    <thead>
                      <tr>
                        <th>Option</th>
                        <th>Diameter</th>
                        <th>Legs</th>
                        <th>Spacing</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.shearDesign.stirrupOptions.map((option, idx) => (
                        <tr
                          key={idx}
                          style={{
                            backgroundColor:
                              idx === 0 ? "#F0FDF4" : "transparent",
                            fontWeight: idx === 0 ? "bold" : "normal",
                          }}
                        >
                          <td>
                            {idx === 0 ? "⭐ Recommended" : `Option ${idx + 1}`}
                          </td>
                          <td>{option.diameter} mm φ</td>
                          <td>{option.legs}-legged</td>
                          <td>{option.spacing} mm c/c</td>
                          <td>{option.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {results.shearDesign.stirrupDetails && (
              <div style={{ marginTop: "20px" }}>
                <h5 className="calc-section-label">
                  Minimum Stirrups (No Shear Stress)
                </h5>
                <div className="calc-table-container">
                  <table className="calc-table">
                    <thead>
                      <tr>
                        <th>Diameter</th>
                        <th>Legs</th>
                        <th>Spacing</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.shearDesign.stirrupDetails.map((option, idx) => (
                        <tr
                          key={idx}
                          style={{
                            backgroundColor:
                              idx === 0 ? "#F0FDF4" : "transparent",
                          }}
                        >
                          <td>{option.diameter} mm φ</td>
                          <td>{option.legs}-legged</td>
                          <td>{option.spacing} mm c/c</td>
                          <td>{option.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Deflection Check */}
          {results.deflectionCheck && (
            <div className="calc-card">
              <h4 className="calc-card-subtitle">
                <span>📏</span> Deflection Control
              </h4>

              <div className="calc-detail-grid">
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Actual L/d Ratio</span>
                  <span className="calc-detail-value">
                    {results.deflectionCheck.actual_ratio.toFixed(2)}
                  </span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Allowable L/d Ratio</span>
                  <span className="calc-detail-value">
                    {results.deflectionCheck.allowable_ratio.toFixed(2)}
                  </span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Status</span>
                  <span
                    className="calc-detail-value"
                    style={{
                      color:
                        results.deflectionCheck.status === "OK"
                          ? "#10B981"
                          : "#EF4444",
                    }}
                  >
                    {results.deflectionCheck.status}
                  </span>
                </div>
                <div className="calc-detail-item">
                  <span className="calc-detail-label">Message</span>
                  <span
                    className="calc-detail-value"
                    style={{ fontSize: "0.9em" }}
                  >
                    {results.deflectionCheck.message}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Development Length */}
          <div className="calc-card">
            <h4 className="calc-card-subtitle">
              <span>📐</span> Anchorage Details
            </h4>

            <div className="calc-detail-grid">
              <div className="calc-detail-item">
                <span className="calc-detail-label">
                  Development Length (Ld)
                </span>
                <span
                  className="calc-detail-value"
                  style={{ color: "#F59E0B", fontWeight: "bold" }}
                >
                  {results.developmentLength} mm
                </span>
              </div>
              <div className="calc-detail-item">
                <span className="calc-detail-label">Reference</span>
                <span
                  className="calc-detail-value"
                  style={{ fontSize: "0.9em" }}
                >
                  IS 456 Cl. 26.2.1
                </span>
              </div>
            </div>
          </div>

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
                <strong>Concrete Cover:</strong> Provided cover is{" "}
                {inputs.cover}mm. Verify with exposure condition requirements.
              </li>
              <li>
                <strong>Bar Spacing:</strong> Maintain minimum clear spacing ≥
                bar diameter or ≥ aggregate size + 5mm
              </li>
              <li>
                <strong>Curtailment:</strong> Ensure adequate development length
                at supports and bend points
              </li>
              <li>
                <strong>Detailing:</strong> Follow IS 456 Cl. 26 for detailing
                requirements
              </li>
              {results.flexuralDesign.designType === "doubly" && (
                <li>
                  <strong>Compression Steel:</strong> Provide lateral ties to
                  prevent buckling of compression bars
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

export default BeamDesignTab;
