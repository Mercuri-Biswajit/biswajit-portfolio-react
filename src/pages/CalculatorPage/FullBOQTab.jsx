// ═══════════════════════════════════════════════════════════════════════════
// FULL BOQ TAB COMPONENT
// Sub-tabs: 📋 Standard BOQ | 💎 Premium BOQ | 🏢 Floor-wise Breakdown
// ═══════════════════════════════════════════════════════════════════════════

import { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────
// FORMAT HELPERS
// ─────────────────────────────────────────────────────────────────────────
function fmtINR(n) {
  if (n == null || isNaN(n)) return '₹0';
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString('en-IN')}`;
}
const fmtN = (n, d = 2) => (n == null || isNaN(n) ? '—' : Number(n).toFixed(d));
const fmtI = (n) => (n == null || isNaN(n) ? '—' : Math.round(n).toLocaleString('en-IN'));

// ─────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────
const C = {
  std:  { bg: '#003366', accent: '#ff8c00', light: '#e8f0f7', border: '#b3cbe0' },
  pre:  { bg: '#5b21b6', accent: '#f59e0b', light: '#f3eeff', border: '#c4b5fd' },
  row0: '#fafafa',
  row1: '#ffffff',
};

// ─────────────────────────────────────────────────────────────────────────
// BOQ TABLE
// ─────────────────────────────────────────────────────────────────────────
function BOQTable({ items }) {
  if (!items?.length) return (
    <p style={{ color: '#64748b', padding: '1rem 0', fontStyle: 'italic' }}>No items to display.</p>
  );
  return (
    <div className="calc-table-container">
      <table className="calc-table">
        <thead>
          <tr>
            <th style={{ width: 44, textAlign: 'center' }}>Sr.</th>
            <th>Description of Work</th>
            <th style={{ width: 65, textAlign: 'center' }}>Unit</th>
            <th style={{ width: 88, textAlign: 'right' }}>Qty</th>
            <th style={{ width: 105, textAlign: 'right' }}>Rate (₹)</th>
            <th style={{ width: 120, textAlign: 'right' }}>Amount (₹)</th>
            <th style={{ width: 80, textAlign: 'right' }}>Labour Days</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx} style={{ background: idx % 2 === 0 ? C.row0 : C.row1 }}>
              <td style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem' }}>{item.srNo}</td>
              <td style={{ fontSize: '0.875rem', lineHeight: 1.4 }}>{item.description}</td>
              <td style={{ textAlign: 'center', color: '#64748b', fontSize: '0.78rem' }}>{item.unit}</td>
              <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '0.875rem' }}>{fmtN(item.quantity)}</td>
              <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '0.875rem' }}>{fmtI(item.rate)}</td>
              <td style={{ textAlign: 'right', fontWeight: 700, fontFamily: 'monospace' }}>{fmtI(item.amount)}</td>
              <td style={{ textAlign: 'right', color: '#64748b', fontSize: '0.8rem', fontFamily: 'monospace' }}>{fmtN(item.labourDays, 1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// TOTALS ROW
// ─────────────────────────────────────────────────────────────────────────
function TotalsRow({ summary, colour }) {
  return (
    <div style={{
      marginTop: '0.5rem',
      padding: '0.85rem 1.25rem',
      background: '#f8fafc',
      border: `1px solid ${colour?.border ?? '#e2e8f0'}`,
      borderRadius: 8,
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '2.5rem',
      flexWrap: 'wrap',
      fontSize: '0.875rem',
    }}>
      <span>Subtotal: <strong>₹{fmtI(summary.subtotal)}</strong></span>
      <span>GST @18%: <strong>₹{fmtI(summary.gst)}</strong></span>
      <span style={{ fontSize: '1rem', fontWeight: 800, color: colour?.bg ?? '#003366' }}>
        Grand Total: {fmtINR(summary.grandTotal)}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// MATERIAL SUMMARY STRIP
// ─────────────────────────────────────────────────────────────────────────
function MaterialStrip({ matQty, labour, colour }) {
  const specs = [
    { key: 'cement',    label: 'Cement',    unit: 'bags', icon: '🧱' },
    { key: 'steel',     label: 'Steel',     unit: 'kg',   icon: '⚙️' },
    { key: 'sand',      label: 'Sand',      unit: 'cft',  icon: '🏖️' },
    { key: 'aggregate', label: 'Aggregate', unit: 'cft',  icon: '🪨' },
    { key: 'bricks',    label: 'Bricks',    unit: 'nos',  icon: '🧱' },
    { key: 'tiles',     label: 'Tiles',     unit: 'sqft', icon: '🟦' },
    { key: 'paint',     label: 'Paint',     unit: 'ltrs', icon: '🎨' },
  ];
  return (
    <div style={{
      background: colour?.light ?? '#f0f4f8',
      border: `1px solid ${colour?.border ?? '#e2e8f0'}`,
      borderRadius: 10,
      padding: '1rem 1.25rem',
      marginTop: '1rem',
      marginBottom: '1rem',
    }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: colour?.bg ?? '#003366', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
        📦 Material Quantities (Total Requirement)
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        {specs.filter(s => matQty?.[s.key] > 0).map(s => (
          <div key={s.key} style={{
            background: '#fff',
            border: `1px solid ${colour?.border ?? '#e2e8f0'}`,
            borderRadius: 8,
            padding: '0.5rem 0.9rem',
            minWidth: 100,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.1rem' }}>{s.icon}</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: colour?.bg ?? '#1e293b', fontFamily: 'monospace' }}>
              {Math.round(matQty[s.key]).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{s.label} ({s.unit})</div>
          </div>
        ))}
        {labour > 0 && (
          <div style={{
            background: '#fff',
            border: `1px solid ${colour?.border ?? '#e2e8f0'}`,
            borderRadius: 8,
            padding: '0.5rem 0.9rem',
            minWidth: 100,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.1rem' }}>👷</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: colour?.bg ?? '#1e293b', fontFamily: 'monospace' }}>
              {Math.round(labour).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Labour (days)</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// SUMMARY BANNER
// ─────────────────────────────────────────────────────────────────────────
function SummaryBanner({ boq, colour }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${colour.bg} 0%, ${colour.bg}dd 100%)`,
      borderRadius: 12,
      padding: '1.5rem 2rem',
      marginBottom: '1.5rem',
      boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
    }}>
      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
        Grand Total (incl. 18% GST) — {boq.gradeLabel} Specification
      </div>
      <div style={{ color: colour.accent, fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>
        {fmtINR(boq.summary.grandTotal)}
      </div>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.84rem', color: 'rgba(255,255,255,0.65)' }}>
        <span>Subtotal: <strong style={{ color: 'rgba(255,255,255,0.9)' }}>{fmtINR(boq.summary.subtotal)}</strong></span>
        <span>GST (18%): <strong style={{ color: 'rgba(255,255,255,0.9)' }}>{fmtINR(boq.summary.gst)}</strong></span>
        <span>Items: <strong style={{ color: 'rgba(255,255,255,0.9)' }}>{boq.summary.totalItems}</strong></span>
        {boq.totalLabour > 0 && (
          <span>Total Labour: <strong style={{ color: 'rgba(255,255,255,0.9)' }}>{Math.round(boq.totalLabour)} days</strong></span>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// NOTES BOX
// ─────────────────────────────────────────────────────────────────────────
function NotesBox({ notes }) {
  if (!notes?.length) return null;
  return (
    <div className="calc-note" style={{ marginTop: '1.5rem' }}>
      <strong>📌 WB PWD SOR 2023-24 — Notes:</strong>
      <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', lineHeight: 1.75 }}>
        {notes.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// STANDARD SHEET
// ─────────────────────────────────────────────────────────────────────────
function StandardSheet({ boq }) {
  if (!boq) return (
    <div className="calc-alert calc-alert-info">Run the Estimate to generate the Standard BOQ.</div>
  );
  const col = C.std;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: '1.25rem' }}>
        <h3 className="calc-breakdown-header" style={{ margin: 0 }}>📋 Bill of Quantities — Standard</h3>
        <span style={{ background: col.bg, color: '#fff', borderRadius: 20, padding: '3px 12px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em' }}>
          WB PWD SOR 2023-24
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: '#64748b' }}>
          M20 · OPC 43 · Fe415 · Ceramic tiles · Nerolac · Aluminium windows
        </span>
      </div>
      <SummaryBanner boq={boq} colour={col} />
      <MaterialStrip matQty={boq.materialQty} labour={boq.totalLabour} colour={col} />
      <BOQTable items={boq.items} />
      <TotalsRow summary={boq.summary} colour={col} />
      <NotesBox notes={boq.notes} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// PREMIUM SHEET
// ─────────────────────────────────────────────────────────────────────────
function PremiumSheet({ boq }) {
  if (!boq) return (
    <div className="calc-alert calc-alert-info">Run the Estimate to generate the Premium BOQ.</div>
  );
  const col = C.pre;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: '1.25rem' }}>
        <h3 className="calc-breakdown-header" style={{ margin: 0 }}>💎 Bill of Quantities — Premium</h3>
        <span style={{ background: col.bg, color: '#fff', borderRadius: 20, padding: '3px 12px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.05em' }}>
          WB PWD SOR 2023-24
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: '#64748b' }}>
          M25 · OPC 53 · Fe500D · Vitrified tiles · Asian Royale · UPVC windows · Jaquar
        </span>
      </div>
      <SummaryBanner boq={boq} colour={col} />
      <MaterialStrip matQty={boq.materialQty} labour={boq.totalLabour} colour={col} />
      <BOQTable items={boq.items} />
      <TotalsRow summary={boq.summary} colour={col} />
      <NotesBox notes={boq.notes} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// FLOOR-WISE SHEET
// ─────────────────────────────────────────────────────────────────────────
function FloorWiseSheet({ boq }) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!boq?.sheets?.length) return (
    <div className="calc-alert calc-alert-info">Run the Estimate to generate the Floor-wise BOQ.</div>
  );

  const col     = boq.grade === 'premium' ? C.pre : C.std;
  const current = boq.sheets[activeIdx];
  const grand   = boq.grandSummary;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: '1.25rem' }}>
        <h3 className="calc-breakdown-header" style={{ margin: 0 }}>🏢 Floor-wise BOQ Breakdown</h3>
        <span style={{ background: col.bg, color: '#fff', borderRadius: 20, padding: '3px 12px', fontSize: '0.72rem', fontWeight: 700 }}>
          {boq.gradeLabel} · WB PWD SOR 2023-24
        </span>
      </div>

      {/* Grand summary banner */}
      <div style={{
        background: `linear-gradient(135deg, ${col.bg} 0%, ${col.bg}cc 100%)`,
        borderRadius: 12,
        padding: '1.4rem 2rem',
        marginBottom: '1.5rem',
        boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
      }}>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>
          Building Grand Total (all floors + GST)
        </div>
        <div style={{ color: col.accent, fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
          {fmtINR(grand.grandTotal)}
        </div>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.84rem', color: 'rgba(255,255,255,0.65)' }}>
          <span>Subtotal: <strong style={{ color: '#fff' }}>{fmtINR(grand.subtotal)}</strong></span>
          <span>GST (18%): <strong style={{ color: '#fff' }}>{fmtINR(grand.gst)}</strong></span>
          <span>Floors: <strong style={{ color: '#fff' }}>{boq.sheets.length}</strong></span>
        </div>
      </div>

      {/* Floor selector cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
        gap: '0.7rem',
        marginBottom: '1.5rem',
      }}>
        {boq.sheets.map((sheet, idx) => {
          const isActive = idx === activeIdx;
          const pct = grand.subtotal > 0
            ? ((sheet.summary.subtotal / grand.subtotal) * 100).toFixed(1)
            : '0';
          const floorIcon = sheet.floorIndex === -1 ? '🏗️'
            : sheet.floorIndex === 0 ? '🏠' : '🏢';

          return (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              style={{
                background: isActive ? col.bg : '#f8fafc',
                border: `2px solid ${isActive ? col.bg : '#e2e8f0'}`,
                borderRadius: 10,
                padding: '0.85rem 1rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? `0 4px 14px ${col.bg}44` : 'none',
              }}
            >
              <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: isActive ? 'rgba(255,255,255,0.55)' : '#64748b', marginBottom: 4 }}>
                {floorIcon} {sheet.floorIndex === -1 ? 'Foundation' : sheet.floorIndex === 0 ? 'Ground' : `G+${sheet.floorIndex}`}
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: isActive ? col.accent : col.bg, fontFamily: 'monospace', marginBottom: 2 }}>
                {fmtINR(sheet.summary.subtotal)}
              </div>
              <div style={{ fontSize: '0.7rem', color: isActive ? 'rgba(255,255,255,0.45)' : '#94a3b8' }}>
                {pct}% · {sheet.items.length} items
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected floor detail card */}
      <div style={{ background: '#fff', border: `1px solid ${col.border}`, borderRadius: 12, padding: '1.5rem' }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: `2px solid ${col.border}` }}>
          <h4 style={{ margin: 0, color: col.bg, fontSize: '1rem', fontWeight: 700 }}>
            📄 {current.floorLabel}
          </h4>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.84rem', flexWrap: 'wrap', color: '#475569' }}>
            <span>Subtotal: <strong>{fmtINR(current.summary.subtotal)}</strong></span>
            <span>GST: <strong>{fmtINR(current.summary.gst)}</strong></span>
            <span style={{ color: col.bg, fontWeight: 800, fontSize: '0.95rem' }}>
              Floor Total: {fmtINR(current.summary.grandTotal)}
            </span>
          </div>
        </div>

        {/* Material quantities for this floor */}
        <MaterialStrip matQty={current.materialQty} labour={current.totalLabour} colour={{ bg: col.bg, light: col.light, border: col.border }} />

        {/* Work items table */}
        <div style={{ marginTop: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: col.bg, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
            🔧 Work Items
          </div>
          <BOQTable items={current.items} />
        </div>

        {/* Floor totals */}
        <div style={{
          marginTop: '0.75rem',
          padding: '0.8rem 1.25rem',
          background: col.light,
          border: `1px solid ${col.border}`,
          borderRadius: 8,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '2rem',
          flexWrap: 'wrap',
          fontSize: '0.875rem',
        }}>
          <span>Subtotal: <strong>₹{fmtI(current.summary.subtotal)}</strong></span>
          <span>GST @18%: <strong>₹{fmtI(current.summary.gst)}</strong></span>
          <span style={{ fontWeight: 800, fontSize: '1rem', color: col.bg }}>
            Floor Total: {fmtINR(current.summary.grandTotal)}
          </span>
        </div>
      </div>

      <NotesBox notes={boq.notes} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// Props: standardBOQ | premiumBOQ | floorWiseBOQ
// ─────────────────────────────────────────────────────────────────────────
export function FullBOQ({ standardBOQ, premiumBOQ, floorWiseBOQ }) {
  const [subTab, setSubTab] = useState('standard');

  const tabs = [
    {
      key: 'standard',
      label: '📋 Standard BOQ',
      sub: 'M20 · Ceramic · OPC 43 · Fe415',
      col: C.std,
    },
    {
      key: 'premium',
      label: '💎 Premium BOQ',
      sub: 'M25 · Vitrified · OPC 53 · Fe500D',
      col: C.pre,
    },
    {
      key: 'floorwise',
      label: '🏢 Floor-wise Breakdown',
      sub: 'Qty + Cost + Items per floor',
      col: C.std,
    },
  ];

  return (
    <div className="calc-result-card">
      {/* Sub-tab bar */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '1.75rem',
        flexWrap: 'wrap',
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: '1rem',
      }}>
        {tabs.map((tab) => {
          const active = subTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSubTab(tab.key)}
              style={{
                background: active ? tab.col.bg : 'rgba(0,51,102,0.04)',
                border: `2px solid ${active ? tab.col.bg : '#e2e8f0'}`,
                borderRadius: 10,
                padding: '0.6rem 1.2rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                boxShadow: active ? `0 3px 10px ${tab.col.bg}33` : 'none',
              }}
            >
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: active ? '#fff' : tab.col.bg }}>
                {tab.label}
              </div>
              <div style={{ fontSize: '0.7rem', marginTop: 2, color: active ? 'rgba(255,255,255,0.6)' : '#64748b' }}>
                {tab.sub}
              </div>
            </button>
          );
        })}
      </div>

      {subTab === 'standard'  && <StandardSheet  boq={standardBOQ}  />}
      {subTab === 'premium'   && <PremiumSheet   boq={premiumBOQ}   />}
      {subTab === 'floorwise' && <FloorWiseSheet boq={floorWiseBOQ} />}
    </div>
  );
}

export default FullBOQ;