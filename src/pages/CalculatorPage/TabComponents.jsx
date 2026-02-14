// ═══════════════════════════════════════════════════════════════════════════
// CALCULATOR TAB COMPONENTS - PROFESSIONAL VERSION
// All calculator result tabs in one organized file
// ═══════════════════════════════════════════════════════════════════════════

import { formatCurrency } from "../../utils/helpers";

/**
 * Cost Breakdown Tab
 */
export function CostBreakdown({ results }) {
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

/**
 * Structure Design Tab
 */
export function StructureDesign({ design }) {
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

/**
 * Staircase Design Tab
 */
export function StaircaseDesign({ design }) {
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

/**
 * Foundation Design Tab
 */
export function FoundationDesign({ footing }) {
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

/**
 * Complete Bar Bending Schedule Tab (Merged with summary)
 */
export function CompleteBBS({ barBending, completeBBS }) {
  return (
    <div className="calc-result-card">
      <h3 className="calc-breakdown-header">
        <span>📋</span> Complete Bar Bending Schedule
      </h3>
      
      {/* Summary Section */}
      <div className="calc-bbs-summary">
        <div className="calc-bbs-total">
          <div className="calc-bbs-total-label">Total Steel Requirement</div>
          <div className="calc-bbs-total-value">{completeBBS.totalWeight.toFixed(0)} kg</div>
        </div>

        <div className="calc-struct-grid" style={{ marginBottom: "2rem" }}>
          <div className="calc-struct-card">
            <div className="calc-struct-icon">📊</div>
            <div className="calc-struct-title">Base Quantity</div>
            <div className="calc-struct-value">{completeBBS.totalWeight.toFixed(0)} kg</div>
            <div className="calc-struct-sub">Calculated requirement</div>
          </div>

          <div className="calc-struct-card">
            <div className="calc-struct-icon">⚖️</div>
            <div className="calc-struct-title">Wastage Allowance</div>
            <div className="calc-struct-value">{completeBBS.wastageAllowance} kg</div>
            <div className="calc-struct-sub">7% wastage factor</div>
          </div>

          <div className="calc-struct-card" style={{ borderColor: "var(--color-accent)" }}>
            <div className="calc-struct-icon">📦</div>
            <div className="calc-struct-title">Final Order Quantity</div>
            <div className="calc-struct-value" style={{ color: "var(--color-accent)" }}>
              {completeBBS.finalOrderQuantity} kg
            </div>
            <div className="calc-struct-sub">Including wastage</div>
          </div>
        </div>

        {/* Bar Diameter Distribution */}
        <h4 className="calc-struct-section-title">Steel Distribution by Diameter</h4>
        <div className="calc-bbs-grid">
          {Object.entries(barBending.breakdown).map(([dia, weight]) => (
            <div key={dia} className="calc-bbs-card">
              <div className="calc-bbs-weight">{weight.toFixed(0)} kg</div>
              <div className="calc-bbs-label">{dia}</div>
              <div className="calc-bbs-pct">
                {((weight / barBending.totalWeight) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed BBS Table */}
      <h4 className="calc-struct-section-title" style={{ marginTop: "2rem" }}>
        Detailed Cutting & Bending Schedule
      </h4>
      <div className="calc-timeline-table">
        <table className="calc-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Bar Dia</th>
              <th>Quantity</th>
              <th>Length (mm)</th>
              <th>Shape</th>
              <th>Total Weight (kg)</th>
              <th>Bending Details</th>
            </tr>
          </thead>
          <tbody>
            {completeBBS.items.map((item, idx) => (
              <tr key={idx}>
                <td><strong>{item.member}</strong></td>
                <td>{item.barDia}</td>
                <td>{item.quantity}</td>
                <td>{item.length}</td>
                <td>{item.shape}</td>
                <td><strong>{item.totalWeight}</strong></td>
                <td style={{ fontSize: "0.8rem", color: "var(--color-text-dim)" }}>
                  {item.bendingDetails}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="calc-note">
        <strong>📌 Fabricator Instructions:</strong>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li>All bars to be Fe500 grade TMT steel</li>
          <li>Hooks: 135° bends with extension of 10d minimum</li>
          <li>Lap length: As specified, typically 40-50 times bar diameter</li>
          <li>Cutting tolerance: ±10mm for lengths above 3m</li>
          <li>Store bars off ground on wooden battens to prevent rusting</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Full Bill of Quantities Tab
 */
export function FullBOQ({ boq }) {
  return (
    <div className="calc-result-card">
      <h3 className="calc-breakdown-header">
        <span>📄</span> Complete Bill of Quantities (BOQ)
      </h3>
      
      {/* BOQ Summary Banner */}
      <div className="calc-cost-banner" style={{ marginBottom: "2rem" }}>
        <div className="calc-estimate-label">Grand Total (Including GST)</div>
        <div className="calc-estimate-amount">
          {formatCurrency(boq.summary.grandTotal)}
        </div>
        <div className="calc-estimate-meta">
          <span>
            Subtotal: <strong>{formatCurrency(boq.summary.subtotal)}</strong>
          </span>
          <span>
            GST (18%): <strong>{formatCurrency(boq.summary.gst)}</strong>
          </span>
          <span>
            Total Items: <strong>{boq.summary.totalItems}</strong>
          </span>
        </div>
      </div>

      {/* Detailed BOQ Table */}
      <div className="calc-timeline-table">
        <table className="calc-table">
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Description of Work</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Rate (₹)</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {boq.items.map((item) => (
              <tr key={item.srNo}>
                <td><strong>{item.srNo}</strong></td>
                <td>{item.description}</td>
                <td>{item.unit}</td>
                <td>{item.quantity}</td>
                <td>{item.rate.toLocaleString("en-IN")}</td>
                <td><strong>{item.amount.toLocaleString("en-IN")}</strong></td>
              </tr>
            ))}
            <tr style={{ backgroundColor: "var(--color-bg-dark)", fontWeight: "bold" }}>
              <td colSpan="5" style={{ textAlign: "right", paddingRight: "2rem" }}>
                SUBTOTAL
              </td>
              <td>{boq.summary.subtotal.toLocaleString("en-IN")}</td>
            </tr>
            <tr>
              <td colSpan="5" style={{ textAlign: "right", paddingRight: "2rem" }}>
                GST @ 18%
              </td>
              <td>{boq.summary.gst.toLocaleString("en-IN")}</td>
            </tr>
            <tr style={{ backgroundColor: "var(--color-primary)", color: "white", fontWeight: "bold", fontSize: "1.1rem" }}>
              <td colSpan="5" style={{ textAlign: "right", paddingRight: "2rem" }}>
                GRAND TOTAL
              </td>
              <td>{boq.summary.grandTotal.toLocaleString("en-IN")}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Material Summary */}
      <div className="calc-struct-section">
        <h4 className="calc-struct-section-title">Key Material Summary</h4>
        <div className="calc-struct-grid">
          {Object.entries(boq.materialSummary).map(([material, data]) => (
            <div key={material} className="calc-struct-card">
              <div className="calc-struct-icon">
                {material === 'cement' ? '🏗️' : 
                 material === 'steel' ? '⚙️' : 
                 material === 'sand' ? '🏖️' : 
                 material === 'aggregate' ? '🪨' : '🧱'}
              </div>
              <div className="calc-struct-title">{material.charAt(0).toUpperCase() + material.slice(1)}</div>
              <div className="calc-struct-value">
                {data.quantity} {data.unit}
              </div>
              <div className="calc-struct-sub">
                @ ₹{data.rate}/{data.unit} = ₹{data.amount.toLocaleString("en-IN")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="calc-note">
        <strong>📋 Important Notes:</strong>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          {boq.notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}