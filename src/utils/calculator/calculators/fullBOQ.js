// ═══════════════════════════════════════════════════════════════════════════
// FULL BOQ CALCULATOR — WB PWD RATES
// Exports: calcStandardBOQ | calcPremiumBOQ | calcFloorWiseBOQ
// ═══════════════════════════════════════════════════════════════════════════

import * as STD from "../../../pages/CalculatorPage/config/wbPwdRatesStandard";
import * as PRE from "../../../pages/CalculatorPage/config/wbPwdRatesPremium";

// ─────────────────────────────────────────────────────────────────────────
// UNIT HELPERS
// ─────────────────────────────────────────────────────────────────────────
const toSqm = (sqft) => Math.round(sqft * 0.0929 * 100) / 100;
const toCum = (cft) => Math.round(cft * 0.02832 * 100) / 100;
const r2 = (n) => Math.round(n * 100) / 100;

function floorName(idx) {
  if (idx === -1) return "Foundation & Substructure";
  if (idx === 0) return "Ground Floor (G)";
  return `Floor ${idx} (G+${idx})`;
}

function getEscalation(RATES, floorIndex) {
  const keys = Object.keys(RATES.FLOOR_ESCALATION)
    .map(Number)
    .sort((a, b) => a - b);
  const clampedIdx = Math.min(floorIndex, keys[keys.length - 1]);
  return RATES.FLOOR_ESCALATION[clampedIdx] ?? 1.12;
}

// ─────────────────────────────────────────────────────────────────────────
// CORE: build foundation BOQ items (once for whole building)
// Returns { items, materialQty }
// ─────────────────────────────────────────────────────────────────────────
function buildFoundation(plotArea, RATES) {
  const items = [];
  const matQty = {
    cement: 0,
    steel: 0,
    sand: 0,
    aggregate: 0,
    bricks: 0,
    tiles: 0,
    paint: 0,
  };

  const addItem = (key, qty, unit) => {
    const ir = RATES.ITEM_RATES[key];
    if (!ir) return;
    const amt = Math.round(qty * ir.rate);
    items.push({
      description: ir.description,
      unit: ir.unit ?? unit,
      quantity: r2(qty),
      rate: ir.rate,
      amount: amt,
      labourDays: r2((ir.labourDaysPerUnit ?? 0) * qty),
    });
    // accumulate material quantities
    if (ir.cementBagsPerUnit) matQty.cement += ir.cementBagsPerUnit * qty;
    if (ir.steelKgPerUnit) matQty.steel += ir.steelKgPerUnit * qty;
    if (ir.sandCftPerUnit) matQty.sand += ir.sandCftPerUnit * qty;
    if (ir.aggCftPerUnit) matQty.aggregate += ir.aggCftPerUnit * qty;
    if (ir.bricksPerUnit) matQty.bricks += ir.bricksPerUnit * qty;
  };

  // excavation  (3 ft deep)
  const excCum = toCum(plotArea * 3);
  addItem("excavation", excCum, "cum");

  // PCC bed
  const pccCum = toCum(plotArea * 0.5);
  addItem("pcc148", pccCum, "cum");

  // RCC footing  (1.5 cft per sqft plot)
  const footKey =
    RATES.GRADE_KEY === "premium" ? "rccM25Footing" : "rccM20Footing";
  const footCum = toCum(plotArea * 1.5);
  addItem(footKey, footCum, "cum");

  return { items, matQty };
}

// ─────────────────────────────────────────────────────────────────────────
// CORE: build per-floor BOQ items
// Returns { items, materialQty }
// ─────────────────────────────────────────────────────────────────────────
function buildFloorItems(floorArea, plotArea, RATES, floorIndex, isTopFloor) {
  const esc = getEscalation(RATES, floorIndex);
  const items = [];
  const matQty = {
    cement: 0,
    steel: 0,
    sand: 0,
    aggregate: 0,
    bricks: 0,
    tiles: 0,
    paint: 0,
  };

  const addItem = (key, qty) => {
    const ir = RATES.ITEM_RATES[key];
    if (!ir || qty <= 0) return;
    const rate = Math.round(ir.rate * esc);
    const amt = Math.round(qty * rate);
    items.push({
      description: ir.description,
      unit: ir.unit,
      quantity: r2(qty),
      rate,
      amount: amt,
      labourDays: r2((ir.labourDaysPerUnit ?? 0) * qty),
    });
    if (ir.cementBagsPerUnit) matQty.cement += ir.cementBagsPerUnit * qty;
    if (ir.steelKgPerUnit) matQty.steel += ir.steelKgPerUnit * qty;
    if (ir.sandCftPerUnit) matQty.sand += ir.sandCftPerUnit * qty;
    if (ir.aggCftPerUnit) matQty.aggregate += ir.aggCftPerUnit * qty;
    if (ir.bricksPerUnit) matQty.bricks += ir.bricksPerUnit * qty;
    if (ir.tilesPerUnit) matQty.tiles += ir.tilesPerUnit * qty;
    if (ir.paintLitresPerUnit) matQty.paint += ir.paintLitresPerUnit * qty;
  };

  const isPremium = RATES.GRADE_KEY === "premium";

  // ── RCC Frame ────────────────────────────────────────────────────────
  const colKey = isPremium ? "rccM25Column" : "rccM20Column";
  const beamKey = isPremium ? "rccM25Beam" : "rccM20Beam";
  const slabKey = isPremium ? "rccM25Slab" : "rccM20Slab";

  addItem(colKey, toCum(floorArea * 0.04));
  addItem(beamKey, toCum(floorArea * 0.055));
  addItem(slabKey, toCum(floorArea * (isPremium ? 0.44 : 0.42)));

  // ── Masonry ──────────────────────────────────────────────────────────
  // 230 mm external walls ≈ 60 %, 115 mm partitions ≈ 40 %
  addItem("brickwork230", toCum(floorArea * 3.5 * 0.75 * 0.6));
  addItem("brickwork115", toCum(floorArea * 3.5 * 0.75 * 0.4));

  // ── Plastering ────────────────────────────────────────────────────────
  const plasterSqm = toSqm(floorArea * 3.5 * 2); // both faces
  addItem("plasterInternal", plasterSqm);
  if (floorIndex === 0) {
    addItem("plasterExternal", toSqm(floorArea * 0.6));
  }

  // ── Flooring ──────────────────────────────────────────────────────────
  const floorSqm = toSqm(floorArea);
  addItem(isPremium ? "flooringVitrified" : "flooringCeramic", floorSqm);

  // ── Dado (wet areas ≈ 12 % of floor, height 2.5 m) ──────────────────
  addItem(
    isPremium ? "dadoLargeFormat" : "dadoCeramic",
    toSqm(floorArea * 0.12 * 2.5),
  );

  // ── Painting ──────────────────────────────────────────────────────────
  addItem("paintInternal", plasterSqm);
  if (floorIndex === 0) {
    addItem("paintExternal", toSqm(floorArea * 0.6));
  }

  // ── Doors & Windows ───────────────────────────────────────────────────
  const numDoors = Math.max(2, Math.round(floorArea / 250));
  const numWindows = Math.max(2, Math.round(floorArea / 120));

  // Main entrance on ground floor
  if (floorIndex === 0) {
    addItem("doorMain", 1);
    addItem(isPremium ? "windowUPVC" : "windowAluminium", numWindows);
    addItem("doorFlush", numDoors - 1);
  } else {
    addItem("doorFlush", numDoors);
    addItem(isPremium ? "windowUPVC" : "windowAluminium", numWindows);
  }

  // Grills
  addItem(isPremium ? "grillDecorative" : "grillMS", toSqm(numWindows * 1.0));

  // ── Electrical & Plumbing ─────────────────────────────────────────────
  addItem("electrical", floorArea);
  addItem("plumbing", floorArea);

  // ── Wet-area waterproofing ────────────────────────────────────────────
  addItem("wpWetArea", toSqm(floorArea * 0.12));

  // ── Terrace waterproofing (top floor only) ────────────────────────────
  if (isTopFloor) {
    addItem("wpTerrace", toSqm(plotArea));
  }

  // ── Stair railing (ground floor — one run per floor transition) ───────
  addItem("stairRailing", 4.5);

  return { items, matQty };
}

// ─────────────────────────────────────────────────────────────────────────
// COMBINE matQty objects
// ─────────────────────────────────────────────────────────────────────────
function mergeMatQty(a, b) {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];
  const out = {};
  keys.forEach((k) => {
    out[k] = (a[k] ?? 0) + (b[k] ?? 0);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────────────────
// SUMMARISE
// ─────────────────────────────────────────────────────────────────────────
function summarise(items, GST_RATE) {
  const subtotal = items.reduce((s, i) => s + i.amount, 0);
  const gst = Math.round(subtotal * GST_RATE);
  return {
    subtotal,
    gst,
    grandTotal: subtotal + gst,
    totalItems: items.length,
  };
}

function totalLabourDays(items) {
  return r2(items.reduce((s, i) => s + (i.labourDays ?? 0), 0));
}

function notes(RATES) {
  const base = [
    `Rates: WB PWD SOR 2023-24 — ${RATES.GRADE_LABEL} specification.`,
    "GST @ 18% on construction services (GST Act).",
    "Quantities computed from standard thumb rules for RCC framed structure.",
    "Floor cost escalation applied: +3–3.5% per floor above ground.",
    "Rates subject to ±5% variation for site access and market fluctuation.",
  ];
  if (RATES.GRADE_KEY === "premium") {
    base.push(
      "Concrete: M25 (OPC 53, UltraTech/Ambuja). Steel: Fe 500D (SAIL/TATA/JSW).",
      "Tiles: Vitrified 600×600 (Kajaria). Paint: Asian Royale / Dulux Velvet Touch.",
      "Windows: UPVC double-sliding, 5 mm toughened. Plumbing: CPVC + Jaquar fittings.",
    );
  } else {
    base.push(
      "Concrete: M20 (OPC 43, Ambuja/ACC). Steel: Fe 415 TMT.",
      "Tiles: Ceramic 300×300. Paint: Nerolac Impressions / Apex WeatherCoat.",
      "Windows: Aluminium sliding, 4 mm plain glass. Plumbing: GI/CPVC + Cera fittings.",
    );
  }
  return base;
}

// ─────────────────────────────────────────────────────────────────────────
// PUBLIC: calcStandardBOQ
// ─────────────────────────────────────────────────────────────────────────
export function calcStandardBOQ(inputs) {
  const { length, breadth, floors, includeBasement } = inputs;
  const plotArea = length * breadth;
  const totalFloors = floors + (includeBasement ? 1 : 0);

  const allItems = [];
  let totalMat = {
    cement: 0,
    steel: 0,
    sand: 0,
    aggregate: 0,
    bricks: 0,
    tiles: 0,
    paint: 0,
  };

  const { items: fItems, matQty: fMat } = buildFoundation(plotArea, STD);
  allItems.push(...fItems);
  totalMat = mergeMatQty(totalMat, fMat);

  for (let i = 0; i < totalFloors; i++) {
    const { items, matQty } = buildFloorItems(
      plotArea,
      plotArea,
      STD,
      i,
      i === totalFloors - 1,
    );
    allItems.push(...items);
    totalMat = mergeMatQty(totalMat, matQty);
  }

  allItems.forEach((item, idx) => {
    item.srNo = idx + 1;
  });

  return {
    grade: STD.GRADE_KEY,
    gradeLabel: STD.GRADE_LABEL,
    items: allItems,
    summary: summarise(allItems, STD.GST_RATE),
    materialQty: {
      ...Object.fromEntries(
        Object.entries(totalMat).map(([k, v]) => [k, r2(v)]),
      ),
    },
    totalLabour: totalLabourDays(allItems),
    notes: notes(STD),
  };
}

// ─────────────────────────────────────────────────────────────────────────
// PUBLIC: calcPremiumBOQ
// ─────────────────────────────────────────────────────────────────────────
export function calcPremiumBOQ(inputs) {
  const { length, breadth, floors, includeBasement } = inputs;
  const plotArea = length * breadth;
  const totalFloors = floors + (includeBasement ? 1 : 0);

  const allItems = [];
  let totalMat = {
    cement: 0,
    steel: 0,
    sand: 0,
    aggregate: 0,
    bricks: 0,
    tiles: 0,
    paint: 0,
  };

  const { items: fItems, matQty: fMat } = buildFoundation(plotArea, PRE);
  allItems.push(...fItems);
  totalMat = mergeMatQty(totalMat, fMat);

  for (let i = 0; i < totalFloors; i++) {
    const { items, matQty } = buildFloorItems(
      plotArea,
      plotArea,
      PRE,
      i,
      i === totalFloors - 1,
    );
    allItems.push(...items);
    totalMat = mergeMatQty(totalMat, matQty);
  }

  allItems.forEach((item, idx) => {
    item.srNo = idx + 1;
  });

  return {
    grade: PRE.GRADE_KEY,
    gradeLabel: PRE.GRADE_LABEL,
    items: allItems,
    summary: summarise(allItems, PRE.GST_RATE),
    materialQty: {
      ...Object.fromEntries(
        Object.entries(totalMat).map(([k, v]) => [k, r2(v)]),
      ),
    },
    totalLabour: totalLabourDays(allItems),
    notes: notes(PRE),
  };
}

// ─────────────────────────────────────────────────────────────────────────
// PUBLIC: calcFloorWiseBOQ
// Returns array of per-floor sheets + grand summary
// ─────────────────────────────────────────────────────────────────────────
export function calcFloorWiseBOQ(inputs) {
  const {
    length,
    breadth,
    floors,
    includeBasement,
    finishGrade = "standard",
  } = inputs;
  const RATES = finishGrade === "premium" ? PRE : STD;
  const plotArea = length * breadth;
  const totalFloors = floors + (includeBasement ? 1 : 0);

  const sheets = [];

  // Foundation sheet
  const { items: fItems, matQty: fMat } = buildFoundation(plotArea, RATES);
  fItems.forEach((item, idx) => {
    item.srNo = idx + 1;
  });
  sheets.push({
    floorLabel: floorName(-1),
    floorIndex: -1,
    items: fItems,
    summary: summarise(fItems, RATES.GST_RATE),
    materialQty: {
      ...Object.fromEntries(Object.entries(fMat).map(([k, v]) => [k, r2(v)])),
    },
    totalLabour: totalLabourDays(fItems),
  });

  // Per-floor sheets
  for (let i = 0; i < totalFloors; i++) {
    const { items, matQty } = buildFloorItems(
      plotArea,
      plotArea,
      RATES,
      i,
      i === totalFloors - 1,
    );
    items.forEach((item, idx) => {
      item.srNo = idx + 1;
    });
    sheets.push({
      floorLabel: floorName(i),
      floorIndex: i,
      items,
      summary: summarise(items, RATES.GST_RATE),
      materialQty: {
        ...Object.fromEntries(
          Object.entries(matQty).map(([k, v]) => [k, r2(v)]),
        ),
      },
      totalLabour: totalLabourDays(items),
    });
  }

  const grandSubtotal = sheets.reduce((s, sh) => s + sh.summary.subtotal, 0);
  const grandGst = Math.round(grandSubtotal * RATES.GST_RATE);

  return {
    grade: RATES.GRADE_KEY,
    gradeLabel: RATES.GRADE_LABEL,
    sheets,
    grandSummary: {
      subtotal: grandSubtotal,
      gst: grandGst,
      grandTotal: grandSubtotal + grandGst,
    },
    notes: notes(RATES),
  };
}
