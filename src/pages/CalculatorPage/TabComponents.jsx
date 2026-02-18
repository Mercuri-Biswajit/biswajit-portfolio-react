/* eslint-disable no-unused-vars */
// ═══════════════════════════════════════════════════════════════════════════
// CALCULATOR TAB COMPONENTS - PROFESSIONAL VERSION
// All calculator result tabs in one organized file
// ═══════════════════════════════════════════════════════════════════════════
import { useState } from "react";
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

// export function FullBOQ({ boq }) {
//   const [activeFloor, setActiveFloor] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Group items by floor if boq has floor data, otherwise treat as single list
//   const groundItems = boq.items.filter(
//     (i) => !i.floor || i.floor === "Ground Floor" || i.srNo <= 34
//   );
//   const firstItems = boq.items.filter(
//     (i) => i.floor === "First Floor" || i.srNo > 34
//   );
//   const hasFloors = firstItems.length > 0;

//   const filterItems = (items) =>
//     items.filter((item) =>
//       searchQuery
//         ? item.description?.toLowerCase().includes(searchQuery.toLowerCase())
//         : true
//     );

//   const displayItems =
//     activeFloor === "ground"
//       ? filterItems(groundItems)
//       : activeFloor === "first"
//       ? filterItems(firstItems)
//       : filterItems(boq.items);

//   const grandTotal = boq.summary.grandTotal;
//   const subtotal = boq.summary.subtotal;
//   const gst = boq.summary.gst;

//   return (
//     <div className="boq-wrapper">
//       {/* ── TOP HEADER STRIP ─────────────────────────────────────────── */}
//       <div className="boq-masthead">
//         <div className="boq-masthead-left">
//           <div className="boq-masthead-tag">BILL OF QUANTITIES</div>
//           <h2 className="boq-masthead-title">
//             Proposed G+1 Floor Building
//           </h2>
//           <p className="boq-masthead-sub">
//             As per IS&nbsp;456:2000 &nbsp;|&nbsp; PWD Schedule of Rates
//           </p>
//         </div>
//         <div className="boq-masthead-right">
//           <div className="boq-grand-pill">
//             <span className="boq-grand-label">Grand Total</span>
//             <span className="boq-grand-amount">{formatCurrency(grandTotal)}</span>
//             <span className="boq-grand-approx">
//               ≈ {Math.round(grandTotal / 100000)} Lakh
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ── COST SUMMARY CARDS ──────────────────────────────────────── */}
//       <div className="boq-summary-row">
//         <div className="boq-sum-card boq-sum-blue">
//           <div className="boq-sum-icon">🏗️</div>
//           <div className="boq-sum-body">
//             <div className="boq-sum-label">Ground Floor</div>
//             <div className="boq-sum-value">
//               {formatCurrency(
//                 groundItems.reduce((s, i) => s + (i.amount || 0), 0) ||
//                   subtotal * 0.76
//               )}
//             </div>
//             <div className="boq-sum-meta">{groundItems.length || boq.summary.totalItems} line items</div>
//           </div>
//         </div>

//         {hasFloors && (
//           <div className="boq-sum-card boq-sum-teal">
//             <div className="boq-sum-icon">🏢</div>
//             <div className="boq-sum-body">
//               <div className="boq-sum-label">First Floor</div>
//               <div className="boq-sum-value">
//                 {formatCurrency(
//                   firstItems.reduce((s, i) => s + (i.amount || 0), 0)
//                 )}
//               </div>
//               <div className="boq-sum-meta">{firstItems.length} line items</div>
//             </div>
//           </div>
//         )}

//         <div className="boq-sum-card boq-sum-neutral">
//           <div className="boq-sum-icon">🧾</div>
//           <div className="boq-sum-body">
//             <div className="boq-sum-label">Sub-Total</div>
//             <div className="boq-sum-value">{formatCurrency(subtotal)}</div>
//             <div className="boq-sum-meta">Before GST</div>
//           </div>
//         </div>

//         <div className="boq-sum-card boq-sum-amber">
//           <div className="boq-sum-icon">📋</div>
//           <div className="boq-sum-body">
//             <div className="boq-sum-label">GST @ 18%</div>
//             <div className="boq-sum-value">{formatCurrency(gst)}</div>
//             <div className="boq-sum-meta">Applicable taxes</div>
//           </div>
//         </div>

//         <div className="boq-sum-card boq-sum-green">
//           <div className="boq-sum-icon">✅</div>
//           <div className="boq-sum-body">
//             <div className="boq-sum-label">Grand Total</div>
//             <div className="boq-sum-value boq-sum-value--big">
//               {formatCurrency(grandTotal)}
//             </div>
//             <div className="boq-sum-meta">Inc. all taxes</div>
//           </div>
//         </div>
//       </div>

//       {/* ── MATERIAL SUMMARY ─────────────────────────────────────────── */}
//       {boq.materialSummary && (
//         <div className="boq-materials-strip">
//           <div className="boq-materials-title">Key Material Requirements</div>
//           <div className="boq-materials-grid">
//             {Object.entries(boq.materialSummary).map(([mat, data]) => (
//               <div key={mat} className="boq-mat-chip">
//                 <span className="boq-mat-icon">
//                   {mat === "cement" ? "🏗️" : mat === "steel" ? "⚙️" : mat === "sand" ? "🏖️" : mat === "aggregate" ? "🪨" : "🧱"}
//                 </span>
//                 <div className="boq-mat-info">
//                   <span className="boq-mat-name">
//                     {mat.charAt(0).toUpperCase() + mat.slice(1)}
//                   </span>
//                   <span className="boq-mat-qty">
//                     {data.quantity} {data.unit}
//                   </span>
//                   <span className="boq-mat-cost">
//                     @ ₹{data.rate}/{data.unit}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ── FILTER BAR ───────────────────────────────────────────────── */}
//       <div className="boq-controls">
//         <div className="boq-floor-tabs">
//           {[
//             { key: "all", label: "All Items", count: boq.items.length },
//             { key: "ground", label: "Ground Floor", count: groundItems.length },
//             ...(hasFloors
//               ? [{ key: "first", label: "First Floor", count: firstItems.length }]
//               : []),
//           ].map(({ key, label, count }) => (
//             <button
//               key={key}
//               className={`boq-floor-tab ${activeFloor === key ? "active" : ""}`}
//               onClick={() => setActiveFloor(key)}
//             >
//               {label}
//               <span className="boq-floor-tab-count">{count}</span>
//             </button>
//           ))}
//         </div>

//         <div className="boq-search-wrap">
//           <span className="boq-search-icon">🔍</span>
//           <input
//             className="boq-search"
//             type="text"
//             placeholder="Search items…"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           {searchQuery && (
//             <button className="boq-search-clear" onClick={() => setSearchQuery("")}>
//               ✕
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ── DETAILED TABLE ───────────────────────────────────────────── */}
//       <div className="boq-table-card">
//         <div className="boq-table-scroll">
//           <table className="boq-table">
//             <thead>
//               <tr>
//                 <th className="boq-th boq-th-sl">Sl.</th>
//                 <th className="boq-th boq-th-desc">Description of Work</th>
//                 <th className="boq-th boq-th-num">Quantity</th>
//                 <th className="boq-th boq-th-sm">Unit</th>
//                 <th className="boq-th boq-th-num">Rate (₹)</th>
//                 <th className="boq-th boq-th-amt">Amount (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {displayItems.map((item, idx) => (
//                 <tr key={item.srNo ?? idx} className={`boq-tr ${idx % 2 === 0 ? "boq-tr-alt" : ""}`}>
//                   <td className="boq-td boq-td-sl">{item.srNo ?? idx + 1}</td>
//                   <td className="boq-td boq-td-desc">{item.description}</td>
//                   <td className="boq-td boq-td-num">
//                     {typeof item.quantity === "number"
//                       ? item.quantity.toLocaleString("en-IN", { maximumFractionDigits: 3 })
//                       : item.quantity}
//                   </td>
//                   <td className="boq-td boq-td-sm">{item.unit}</td>
//                   <td className="boq-td boq-td-num">
//                     {typeof item.rate === "number"
//                       ? item.rate.toLocaleString("en-IN", { maximumFractionDigits: 2 })
//                       : item.rate}
//                   </td>
//                   <td className="boq-td boq-td-amt">
//                     <span className="boq-amount-pill">
//                       {typeof item.amount === "number"
//                         ? "₹" + item.amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })
//                         : item.amount}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Table footer totals */}
//         <div className="boq-table-footer">
//           <div className="boq-footer-row">
//             <span className="boq-footer-label">Sub-Total</span>
//             <span className="boq-footer-value">{formatCurrency(subtotal)}</span>
//           </div>
//           <div className="boq-footer-row">
//             <span className="boq-footer-label">GST @ 18%</span>
//             <span className="boq-footer-value">{formatCurrency(gst)}</span>
//           </div>
//           <div className="boq-footer-row boq-footer-grand">
//             <span className="boq-footer-label">GRAND TOTAL</span>
//             <span className="boq-footer-value">{formatCurrency(grandTotal)}</span>
//           </div>
//         </div>
//       </div>

//       {/* ── NOTES ────────────────────────────────────────────────────── */}
//       <div className="boq-notes-card">
//         <div className="boq-notes-header">
//           <span>📋</span> Notes &amp; Conditions
//         </div>
//         <ol className="boq-notes-list">
//           {(
//             boq.notes ?? [
//               "Rates are as per current PWD Schedule of Rates and prevailing market rates.",
//               "All RCC work to be carried out as per IS 456:2000 using M-20 grade concrete.",
//               "Steel reinforcement: Tor Steel / TMT Fe500 grade as per IS 1786.",
//               "This estimate is subject to revision based on actual site conditions and final drawings.",
//               "Contractor shall verify all measurements at site before commencement of work.",
//               "GST and other applicable taxes are not included in the base estimate.",
//               "Any item not covered in this BOQ shall be carried out as per Engineer-in-Charge's direction.",
//             ]
//           ).map((note, i) => (
//             <li key={i}>{note}</li>
//           ))}
//         </ol>
//       </div>

//       {/* ── SIGNATURE BLOCK ──────────────────────────────────────────── */}
//       <div className="boq-sig-row">
//         <div className="boq-sig-box">
//           <div className="boq-sig-line" />
//           <div className="boq-sig-name">Civil Engineer / Estimator</div>
//           <div className="boq-sig-role">Prepared By</div>
//         </div>
//         <div className="boq-sig-stamp">
//           <div className="boq-stamp-inner">
//             <div className="boq-stamp-text">ESTIMATE</div>
//             <div className="boq-stamp-sub">IS 456:2000</div>
//           </div>
//         </div>
//         <div className="boq-sig-box">
//           <div className="boq-sig-line" />
//           <div className="boq-sig-name">Owner / Client</div>
//           <div className="boq-sig-role">Approved By</div>
//         </div>
//       </div>
//     </div>
//   );
// }