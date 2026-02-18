// ═══════════════════════════════════════════════════════════════════════════
// WEST BENGAL PWD — PREMIUM SCHEDULE OF RATES
// Reference: WB PWD SOR 2023-24 (Premium Specification)
// ─────────────────────────────────────────────────────────────────────────
// ✏  HOW TO EDIT:
//    • All monetary values are in ₹ (Indian Rupees)
//    • Change any number here — all Premium BOQ sheets update automatically
//    • Do NOT edit the Standard file (wbPwdRatesStandard.js) from here
// ─────────────────────────────────────────────────────────────────────────
// SPEC PROFILE — PREMIUM
//   Concrete  : M25 (OPC 53 Grade cement, UltraTech / Ambuja)
//   Steel     : Fe 500D TMT (SAIL / TATA / JSW)
//   Flooring  : Vitrified tiles 600×600 mm (Kajaria / Johnson)
//   Wall tiles: Large-format ceramic 300×450 mm (designer range)
//   Paint     : Asian Royale / Dulux Velvet Touch (interior)
//               Asian WeatherShield / Dulux Weathershield (exterior)
//   Doors     : Engineered wood / teak veneer with SS ironmongery
//   Windows   : UPVC sliding with 5 mm toughened glass
//   Plumbing  : CPVC pipes, Jaquar / Grohe sanitary fittings
//   Electrical: GI conduit, Legrand / Schneider switches, 6 sqmm wiring
// ═══════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────
// SECTION A — MATERIAL UNIT RATES
// ─────────────────────────────────────────────────────────────────────────
export const MATERIAL_RATES = {
  cement:     { rate: 420,  unit: 'bag (50 kg)', spec: 'OPC 53 Grade (UltraTech / Ambuja)' },
  steel:      { rate: 75,   unit: 'kg',          spec: 'Fe 500D TMT (SAIL / TATA / JSW)' },
  sand:       { rate: 52,   unit: 'cft',         spec: 'Washed M-sand' },
  aggregate:  { rate: 45,   unit: 'cft',         spec: 'Graded crushed stone 20 mm' },
  bricks:     { rate: 11,   unit: 'nos',         spec: 'Fly-ash bricks (high-strength)' },
  tiles:      { rate: 140,  unit: 'sqft',        spec: 'Vitrified 600×600 mm (Kajaria / Johnson)' },
  wallTiles:  { rate: 120,  unit: 'sqft',        spec: 'Large-format ceramic 300×450 mm (designer)' },
  paint:      { rate: 320,  unit: 'litre',       spec: 'Asian Royale / Dulux Velvet Touch' },
  paintExt:   { rate: 380,  unit: 'litre',       spec: 'Asian WeatherShield / Dulux Weathershield' },
  glass:      { rate: 180,  unit: 'sqft',        spec: '5 mm toughened glass' },
  wpCompound: { rate: 55,   unit: 'kg',          spec: 'Fosroc / BASF crystalline system' },
  sand_fine:  { rate: 50,   unit: 'cft',         spec: 'Washed fine sand for plaster' },
};

// ─────────────────────────────────────────────────────────────────────────
// SECTION B — LABOUR RATES  (per day — certified/skilled tradespeople)
// ─────────────────────────────────────────────────────────────────────────
export const LABOUR_RATES = {
  mason:       { rate: 800,  unit: 'per day', spec: 'Certified tile / marble mason' },
  helper:      { rate: 500,  unit: 'per day', spec: 'Unskilled helper' },
  carpenter:   { rate: 900,  unit: 'per day', spec: 'Furniture-grade carpenter' },
  electrician: { rate: 900,  unit: 'per day', spec: 'Licensed electrician (IEI certified)' },
  plumber:     { rate: 850,  unit: 'per day', spec: 'Plumber with CPVC certification' },
  painter:     { rate: 750,  unit: 'per day', spec: 'Skilled painter (Asian/Dulux trained)' },
  steelFixer:  { rate: 780,  unit: 'per day', spec: 'Bar bender / steel fixer (Fe500D)' },
  // Composite = weighted average used inside BOQ item rates
  composite:   { rate: 700,  unit: 'per day', spec: 'Composite (certified mason + helper)' },
};

// ─────────────────────────────────────────────────────────────────────────
// SECTION C — ITEM-LEVEL BOQ RATES  (material + labour already included)
//             Rate is per unit shown. Change here to update all BOQ lines.
//             NOTE: quantities per unit also differ from Standard spec
// ─────────────────────────────────────────────────────────────────────────
export const ITEM_RATES = {

  // ── EARTHWORK ───────────────────────────────────────────────────────────
  excavation: {
    rate: 135,  unit: 'cum',
    description: 'Earthwork in Excavation for Foundation & Levelling',
    labourDaysPerUnit: 1.2,
  },

  // ── CONCRETE (M25 for premium) ───────────────────────────────────────────
  pcc148: {
    rate: 5200,  unit: 'cum',
    description: 'Plain Cement Concrete 1:4:8 (150 mm thick) including compaction',
    labourDaysPerUnit: 4.5,
    cementBagsPerUnit: 3.2,
    sandCftPerUnit: 12.0,
    aggCftPerUnit:  24.0,
  },
  rccM25Footing: {
    rate: 10200,  unit: 'cum',
    description: 'RCC M25 in Footing including reinforcement (50 kg/cum) & formwork',
    labourDaysPerUnit: 7.0,
    cementBagsPerUnit: 9.0,
    steelKgPerUnit:    50.0,
    sandCftPerUnit: 14.0,
    aggCftPerUnit:  28.0,
  },
  rccM25Column: {
    rate: 13500,  unit: 'cum',
    description: 'RCC M25 in Columns including reinforcement (130 kg/cum) & formwork',
    labourDaysPerUnit: 9.0,
    cementBagsPerUnit: 9.0,
    steelKgPerUnit: 130.0,
    sandCftPerUnit: 14.0,
    aggCftPerUnit:  28.0,
  },
  rccM25Beam: {
    rate: 12500,  unit: 'cum',
    description: 'RCC M25 in Beams including reinforcement (120 kg/cum) & formwork',
    labourDaysPerUnit: 8.0,
    cementBagsPerUnit: 9.0,
    steelKgPerUnit: 120.0,
    sandCftPerUnit: 14.0,
    aggCftPerUnit:  28.0,
  },
  rccM25Slab: {
    rate: 11500,  unit: 'cum',
    description: 'RCC M25 in Slab (130 mm thick) including reinforcement (90 kg/cum)',
    labourDaysPerUnit: 6.0,
    cementBagsPerUnit: 9.0,
    steelKgPerUnit: 90.0,
    sandCftPerUnit: 14.0,
    aggCftPerUnit:  28.0,
  },

  // ── MASONRY (fly-ash bricks) ─────────────────────────────────────────────
  brickwork230: {
    rate: 6000,  unit: 'cum',
    description: 'Fly-Ash Brick Masonry in CM 1:5 (230 mm thick) in superstructure',
    labourDaysPerUnit: 4.0,
    cementBagsPerUnit: 1.6,
    sandCftPerUnit:   10.0,
    bricksPerUnit:   500,
  },
  brickwork115: {
    rate: 5500,  unit: 'cum',
    description: 'Fly-Ash Brick Masonry in CM 1:5 (115 mm thick) partition walls',
    labourDaysPerUnit: 3.5,
    cementBagsPerUnit: 1.4,
    sandCftPerUnit:    8.0,
    bricksPerUnit:   480,
  },

  // ── PLASTERING ──────────────────────────────────────────────────────────
  plasterInternal: {
    rate: 310,  unit: 'sqm',
    description: 'Cement Plaster 1:4 (12 mm thick) — Internal surfaces (washed sand)',
    labourDaysPerUnit: 0.18,
    cementBagsPerUnit: 0.024,
    sandCftPerUnit: 0.28,
  },
  plasterExternal: {
    rate: 380,  unit: 'sqm',
    description: 'Cement Plaster 1:3 (15 mm thick) — External surfaces (washed sand)',
    labourDaysPerUnit: 0.22,
    cementBagsPerUnit: 0.030,
    sandCftPerUnit: 0.32,
  },

  // ── FLOORING (vitrified) ─────────────────────────────────────────────────
  flooringVitrified: {
    rate: 1800,  unit: 'sqm',
    description: 'Vitrified Tile Flooring 600×600 mm incl. cement bed & grouting (Kajaria)',
    labourDaysPerUnit: 0.35,
    tilesPerUnit: 11.5,   // sqft tiles per sqm (incl. 5% wastage)
    cementBagsPerUnit: 0.10,
  },
  dadoLargeFormat: {
    rate: 1600,  unit: 'sqm',
    description: 'Large-Format Ceramic Dado (300×450 mm) on walls incl. adhesive',
    labourDaysPerUnit: 0.38,
    tilesPerUnit: 11.0,
    cementBagsPerUnit: 0.08,
  },

  // ── PAINTING (premium brands) ────────────────────────────────────────────
  paintInternal: {
    rate: 380,  unit: 'sqm',
    description: 'Interior Premium Paint — 3 coats (Asian Royale / Dulux Velvet Touch)',
    labourDaysPerUnit: 0.10,
    paintLitresPerUnit: 0.28,
  },
  paintExternal: {
    rate: 420,  unit: 'sqm',
    description: 'Exterior Premium Paint — 2 coats (Asian WeatherShield / Dulux Weathershield)',
    labourDaysPerUnit: 0.12,
    paintLitresPerUnit: 0.30,
  },

  // ── DOORS (engineered wood / teak veneer) ────────────────────────────────
  doorFlush: {
    rate: 22000,  unit: 'nos',
    description: 'Engineered Wood Door (900×2100 mm) teak veneer, SS ironmongery',
    labourDaysPerUnit: 2.0,
    spec: 'HDF core, teak veneer, Dorset / SS hardware',
  },
  doorMain: {
    rate: 45000,  unit: 'nos',
    description: 'Main Entrance Door (1050×2100 mm) — Designer / Teak solid with multilock',
    labourDaysPerUnit: 2.5,
    spec: 'Solid teak or metal designer door, multipoint lock',
  },

  // ── WINDOWS (UPVC) ───────────────────────────────────────────────────────
  windowUPVC: {
    rate: 16000,  unit: 'nos',
    description: 'UPVC Sliding Window (1200×1200 mm) with 5 mm toughened glass',
    labourDaysPerUnit: 1.0,
    spec: 'Fenesta / Encraft UPVC, toughened glass',
  },

  // ── WINDOW GRILLS (SS / decorative) ─────────────────────────────────────
  grillDecorative: {
    rate: 2200,  unit: 'sqm',
    description: 'Decorative SS / Powder-coated MS Grill (designer pattern)',
    labourDaysPerUnit: 0.5,
    spec: 'SS 304 or powder-coated MS ornamental grill',
  },

  // ── ELECTRICAL (GI conduit, Legrand) ────────────────────────────────────
  electrical: {
    rate: 280,  unit: 'sqft',
    description: 'Electrical Wiring (GI conduit), Legrand/Schneider switches, 6 sqmm wiring',
    labourDaysPerUnit: 0.15,
    spec: 'Legrand / Schneider modular switches, Polycab 6 sqmm wiring',
  },

  // ── PLUMBING (CPVC + Jaquar) ─────────────────────────────────────────────
  plumbing: {
    rate: 220,  unit: 'sqft',
    description: 'Plumbing (CPVC), Jaquar / Grohe sanitary fittings (complete system)',
    labourDaysPerUnit: 0.14,
    spec: 'Astral / Prince CPVC pipes, Jaquar sanitary ware',
  },

  // ── WATERPROOFING ────────────────────────────────────────────────────────
  wpTerrace: {
    rate: 750,  unit: 'sqm',
    description: 'Terrace Waterproofing — Crystalline / Fosroc system with protection screed',
    labourDaysPerUnit: 0.25,
    spec: 'Fosroc Proofex / BASF MasterSeal crystalline',
  },
  wpWetArea: {
    rate: 620,  unit: 'sqm',
    description: 'Wet Area Waterproofing — Flexible polymer 2-coat system (Fosroc)',
    labourDaysPerUnit: 0.20,
    spec: 'Fosroc Nitoproof 600 / BASF Thoroshield',
  },

  // ── MISCELLANEOUS ────────────────────────────────────────────────────────
  stairRailing: {
    rate: 4500,  unit: 'rmt',
    description: 'SS / Powder-coated Staircase Railing (designer balusters)',
    labourDaysPerUnit: 0.6,
    spec: 'SS 316 tubular handrail with ornamental balusters',
  },
};

// ─────────────────────────────────────────────────────────────────────────
// SECTION D — MATERIAL THUMB RULES  (per sq.ft built-up area)
//             Premium uses more cement (M25) and heavier steel (Fe500D)
// ─────────────────────────────────────────────────────────────────────────
export const THUMB_RULES = {
  cementBagsPerSqft:   0.44,   // OPC 53 (slightly higher than standard)
  steelKgPerSqft:      4.50,   // Fe 500D (higher reinforcement ratio)
  sandCftPerSqft:      1.50,
  aggCftPerSqft:       3.00,
  bricksPerSqft:       8.00,
  paintLitresPerSqft:  0.12,   // 3 coats premium paint
  tilesSqftPerSqft:    1.15,
  labourDaysPerSqft:   0.55,   // Slightly more for premium finishes
};

// ─────────────────────────────────────────────────────────────────────────
// SECTION E — FLOOR COST ESCALATION
//             Premium escalation slightly higher due to heavier equipment
// ─────────────────────────────────────────────────────────────────────────
export const FLOOR_ESCALATION = {
  0: 1.000,   // Ground floor
  1: 1.035,   // G+1  (+3.5%)
  2: 1.070,   // G+2  (+7%)
  3: 1.105,   // G+3  (+10.5%)
  4: 1.140,   // G+4  (+14%)
};

// ─────────────────────────────────────────────────────────────────────────
// SECTION F — TAX
// ─────────────────────────────────────────────────────────────────────────
export const GST_RATE = 0.18;

// ─────────────────────────────────────────────────────────────────────────
// SECTION G — GRADE LABEL (do not change — used in UI display)
// ─────────────────────────────────────────────────────────────────────────
export const GRADE_LABEL = 'Premium';
export const GRADE_KEY   = 'premium';