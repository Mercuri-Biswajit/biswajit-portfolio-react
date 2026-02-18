// ═══════════════════════════════════════════════════════════════════════════
// WEST BENGAL PWD — STANDARD SCHEDULE OF RATES
// Reference: WB PWD SOR 2023-24 (Standard Specification)
// ─────────────────────────────────────────────────────────────────────────
// ✏  HOW TO EDIT:
//    • All monetary values are in ₹ (Indian Rupees)
//    • Change any number here — all Standard BOQ sheets update automatically
//    • Do NOT edit the Premium file (wbPwdRatesPremium.js) from here
// ─────────────────────────────────────────────────────────────────────────
// SPEC PROFILE — STANDARD
//   Concrete  : M20 (OPC 43 Grade cement)
//   Steel     : Fe 415 TMT
//   Flooring  : Ceramic tiles 300×300 mm
//   Wall tiles: Ceramic dado 200×300 mm
//   Paint     : Nerolac Impressions (interior) / Apex WeatherCoat (exterior)
//   Doors     : Flush doors with sal-wood frame
//   Windows   : Aluminium sliding with 4 mm plain glass
//   Plumbing  : GI/CPVC pipes, standard sanitary fittings
//   Electrical: PVC conduit, standard modular switches (Anchor/Legrand)
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────
// SECTION A — MATERIAL UNIT RATES
// ─────────────────────────────────────────────────────────────────────────
export const MATERIAL_RATES = {
  cement:     { rate: 380,  unit: 'bag (50 kg)', spec: 'OPC 43 Grade' },
  steel:      { rate: 68,   unit: 'kg',          spec: 'Fe 415 TMT' },
  sand:       { rate: 42,   unit: 'cft',         spec: 'River sand (local)' },
  aggregate:  { rate: 38,   unit: 'cft',         spec: 'Crushed stone 20 mm' },
  bricks:     { rate: 8,    unit: 'nos',         spec: 'First-class kiln-burnt' },
  tiles:      { rate: 55,   unit: 'sqft',        spec: 'Ceramic 300×300 mm' },
  wallTiles:  { rate: 48,   unit: 'sqft',        spec: 'Ceramic dado 200×300 mm' },
  paint:      { rate: 180,  unit: 'litre',       spec: 'Nerolac Impressions emulsion' },
  paintExt:   { rate: 210,  unit: 'litre',       spec: 'Apex WeatherCoat' },
  glass:      { rate: 85,   unit: 'sqft',        spec: '4 mm plain float glass' },
  wpCompound: { rate: 28,   unit: 'kg',          spec: 'Dr. Fixit LW / STP' },
  sand_fine:  { rate: 40,   unit: 'cft',         spec: 'Fine sand for plaster' },
};

// ─────────────────────────────────────────────────────────────────────────
// SECTION B — LABOUR RATES  (per day, WB State PWD norms)
// ─────────────────────────────────────────────────────────────────────────
export const LABOUR_RATES = {
  mason:       { rate: 650, unit: 'per day', spec: 'Skilled mason' },
  helper:      { rate: 450, unit: 'per day', spec: 'Unskilled helper' },
  carpenter:   { rate: 700, unit: 'per day', spec: 'Shuttering / centering' },
  electrician: { rate: 700, unit: 'per day', spec: 'Wireman / electrician' },
  plumber:     { rate: 650, unit: 'per day', spec: 'Plumber' },
  painter:     { rate: 600, unit: 'per day', spec: 'Painter' },
  steelFixer:  { rate: 680, unit: 'per day', spec: 'Bar bender / steel fixer' },
  // Composite = weighted average used inside BOQ item rates
  composite:   { rate: 580, unit: 'per day', spec: 'Composite (mason + helper)' },
};

// ─────────────────────────────────────────────────────────────────────────
// SECTION C — ITEM-LEVEL BOQ RATES  (material + labour already included)
//             Rate is per unit shown. Change here to update all BOQ lines.
// ─────────────────────────────────────────────────────────────────────────
export const ITEM_RATES = {

  // ── EARTHWORK ───────────────────────────────────────────────────────────
  excavation: {
    rate: 135,  unit: 'cum',
    description: 'Earthwork in Excavation for Foundation & Levelling',
    labourDaysPerUnit: 1.2,
  },

  // ── CONCRETE ────────────────────────────────────────────────────────────
  pcc148: {
    rate: 4800,  unit: 'cum',
    description: 'Plain Cement Concrete 1:4:8 (150 mm thick) including compaction',
    labourDaysPerUnit: 4.0,
    cementBagsPerUnit: 3.0,
    sandCftPerUnit: 12.0,
    aggCftPerUnit:  24.0,
  },
  rccM20Footing: {
    rate: 9200,  unit: 'cum',
    description: 'RCC M20 in Footing including reinforcement (40 kg/cum) & formwork',
    labourDaysPerUnit: 6.0,
    cementBagsPerUnit: 8.0,
    steelKgPerUnit:    40.0,
    sandCftPerUnit: 15.0,
    aggCftPerUnit:  30.0,
  },
  rccM20Column: {
    rate: 11500,  unit: 'cum',
    description: 'RCC M20 in Columns including reinforcement (120 kg/cum) & formwork',
    labourDaysPerUnit: 8.0,
    cementBagsPerUnit: 8.0,
    steelKgPerUnit: 120.0,
    sandCftPerUnit: 15.0,
    aggCftPerUnit:  30.0,
  },
  rccM20Beam: {
    rate: 10800,  unit: 'cum',
    description: 'RCC M20 in Beams including reinforcement (110 kg/cum) & formwork',
    labourDaysPerUnit: 7.0,
    cementBagsPerUnit: 8.0,
    steelKgPerUnit: 110.0,
    sandCftPerUnit: 15.0,
    aggCftPerUnit:  30.0,
  },
  rccM20Slab: {
    rate: 9800,  unit: 'cum',
    description: 'RCC M20 in Slab (125 mm thick) including reinforcement (80 kg/cum)',
    labourDaysPerUnit: 5.0,
    cementBagsPerUnit: 8.0,
    steelKgPerUnit: 80.0,
    sandCftPerUnit: 15.0,
    aggCftPerUnit:  30.0,
  },

  // ── MASONRY ─────────────────────────────────────────────────────────────
  brickwork230: {
    rate: 5200,  unit: 'cum',
    description: 'Brick Masonry in CM 1:6 (230 mm thick) in superstructure',
    labourDaysPerUnit: 3.5,
    cementBagsPerUnit: 1.4,
    sandCftPerUnit:   10.0,
    bricksPerUnit:   500,
  },
  brickwork115: {
    rate: 4800,  unit: 'cum',
    description: 'Brick Masonry in CM 1:6 (115 mm thick) partition walls',
    labourDaysPerUnit: 3.0,
    cementBagsPerUnit: 1.2,
    sandCftPerUnit:    8.0,
    bricksPerUnit:   480,
  },

  // ── PLASTERING ──────────────────────────────────────────────────────────
  plasterInternal: {
    rate: 260,  unit: 'sqm',
    description: 'Cement Plaster 1:4 (12 mm thick) — Internal surfaces',
    labourDaysPerUnit: 0.15,
    cementBagsPerUnit: 0.022,
    sandCftPerUnit: 0.28,
  },
  plasterExternal: {
    rate: 310,  unit: 'sqm',
    description: 'Cement Plaster 1:3 (15 mm thick) — External surfaces',
    labourDaysPerUnit: 0.18,
    cementBagsPerUnit: 0.028,
    sandCftPerUnit: 0.32,
  },

  // ── FLOORING ────────────────────────────────────────────────────────────
  flooringCeramic: {
    rate: 680,  unit: 'sqm',
    description: 'Ceramic Tile Flooring 300×300 mm including cement bed & grouting',
    labourDaysPerUnit: 0.25,
    tilesPerUnit: 11.5,   // sqft tiles per sqm (incl. 5% wastage)
    cementBagsPerUnit: 0.08,
  },
  dadoCeramic: {
    rate: 650,  unit: 'sqm',
    description: 'Ceramic Tile Dado (200×300 mm) on walls incl. adhesive & grouting',
    labourDaysPerUnit: 0.28,
    tilesPerUnit: 11.0,
    cementBagsPerUnit: 0.06,
  },

  // ── PAINTING ────────────────────────────────────────────────────────────
  paintInternal: {
    rate: 185,  unit: 'sqm',
    description: 'Interior Emulsion Paint — 2 coats on plastered surface (Nerolac)',
    labourDaysPerUnit: 0.08,
    paintLitresPerUnit: 0.22,
  },
  paintExternal: {
    rate: 220,  unit: 'sqm',
    description: 'Exterior Weatherproof Paint — 2 coats (Apex WeatherCoat)',
    labourDaysPerUnit: 0.10,
    paintLitresPerUnit: 0.25,
  },

  // ── DOORS ───────────────────────────────────────────────────────────────
  doorFlush: {
    rate: 12000,  unit: 'nos',
    description: 'Flush Door (900×2100 mm) with Sal-wood frame, hardware & painting',
    labourDaysPerUnit: 1.5,
    spec: 'Pre-laminated flush door, standard ironmongery',
  },
  doorMain: {
    rate: 18000,  unit: 'nos',
    description: 'Main Entrance Door (1050×2100 mm) with frame, hardware & painting',
    labourDaysPerUnit: 2.0,
    spec: 'Solid-core flush / teak veneer',
  },

  // ── WINDOWS ─────────────────────────────────────────────────────────────
  windowAluminium: {
    rate: 8500,  unit: 'nos',
    description: 'Aluminium Sliding Window (1200×1200 mm) with 4 mm glass & fittings',
    labourDaysPerUnit: 0.75,
    spec: 'Aluminium section, plain glass, standard latch',
  },

  // ── WINDOW GRILLS ───────────────────────────────────────────────────────
  grillMS: {
    rate: 1200,  unit: 'sqm',
    description: 'MS Window Grill (fabricated, 2 coats paint)',
    labourDaysPerUnit: 0.4,
    spec: '12 mm MS bar @ 150 mm both ways',
  },

  // ── ELECTRICAL ──────────────────────────────────────────────────────────
  electrical: {
    rate: 155,  unit: 'sqft',
    description: 'Electrical Wiring (PVC conduit), switches, sockets & light points',
    labourDaysPerUnit: 0.12,
    spec: 'Anchor / standard modular switches, Finolex wire',
  },

  // ── PLUMBING & SANITARY ─────────────────────────────────────────────────
  plumbing: {
    rate: 130,  unit: 'sqft',
    description: 'Plumbing (GI/CPVC), sanitary fixtures & fittings (complete system)',
    labourDaysPerUnit: 0.10,
    spec: 'Cera / Parryware sanitary ware, GI supply pipes',
  },

  // ── WATERPROOFING ───────────────────────────────────────────────────────
  wpTerrace: {
    rate: 480,  unit: 'sqm',
    description: 'Terrace Waterproofing — polymer membrane with protection screed',
    labourDaysPerUnit: 0.20,
    spec: 'Dr. Fixit Raincoat / STP Pidiproof LW+',
  },
  wpWetArea: {
    rate: 380,  unit: 'sqm',
    description: 'Wet Area Waterproofing (bathrooms & kitchen) — cementitious coating',
    labourDaysPerUnit: 0.15,
    spec: 'Dr. Fixit 2-coat system',
  },

  // ── MISCELLANEOUS ───────────────────────────────────────────────────────
  stairRailing: {
    rate: 1800,  unit: 'rmt',
    description: 'MS Staircase Railing (fabricated, 2 coats paint)',
    labourDaysPerUnit: 0.5,
    spec: '40 mm MS pipe handrail with 12 mm bar balusters',
  },
};

// ─────────────────────────────────────────────────────────────────────────
// SECTION D — MATERIAL THUMB RULES  (quantities per sq.ft built-up area)
//             Adjust if your local conditions differ
// ─────────────────────────────────────────────────────────────────────────
export const THUMB_RULES = {
  cementBagsPerSqft:   0.40,
  steelKgPerSqft:      4.00,   // Fe 415
  sandCftPerSqft:      1.50,
  aggCftPerSqft:       3.00,
  bricksPerSqft:       8.00,
  paintLitresPerSqft:  0.10,
  tilesSqftPerSqft:    1.15,   // incl. 5% wastage
  labourDaysPerSqft:   0.50,
};

// ─────────────────────────────────────────────────────────────────────────
// SECTION E — FLOOR COST ESCALATION
//             Each floor above ground adds a small % to account for
//             shuttering, crane, extra scaffolding etc.
// ─────────────────────────────────────────────────────────────────────────
export const FLOOR_ESCALATION = {
  0: 1.000,   // Ground floor
  1: 1.030,   // G+1  (+3%)
  2: 1.060,   // G+2  (+6%)
  3: 1.090,   // G+3  (+9%)
  4: 1.120,   // G+4  (+12%)
};

// ─────────────────────────────────────────────────────────────────────────
// SECTION F — TAX
// ─────────────────────────────────────────────────────────────────────────
export const GST_RATE = 0.18;   // 18% GST on construction services

// ─────────────────────────────────────────────────────────────────────────
// SECTION G — GRADE LABEL (do not change — used in UI display)
// ─────────────────────────────────────────────────────────────────────────
export const GRADE_LABEL = 'Standard';
export const GRADE_KEY   = 'standard';