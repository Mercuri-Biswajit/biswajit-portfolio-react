// ===========================
// HOMEPAGE — LOCAL CONSTANTS
// Only the calculator-specific constants used by
// the Quick Calculator section of HomePage.
// NOT a global file — do not import from elsewhere.
// ===========================

// ===========================
// CALCULATOR — MATERIAL CONSTANTS
// Per sq.ft for RCC framed structures
// ===========================

export const MATERIAL_CONSTANTS = {
  cement: 0.4,          // bags per sq.ft  (typical range 0.38–0.42)
  steel: 4.0,           // kg per sq.ft    (typical range 3.5–4.5 residential)
  sand: 0.044,          // m³ per sq.ft    (1.55 cft → m³)
  aggregate: 0.088,     // m³ per sq.ft    (3.1 cft → m³)
  bricks: 9,            // bricks per sq.ft (wall — 9" external & 4.5" internal)
  pcc: 0.0046,          // m³ per sq.ft    PCC bed ~50mm thick M10 grade
  footing: 0.0074,      // m³ per sq.ft    RCC isolated footing concrete (residential)
  foundationBricks: 13, // bricks per sq.ft stepped brick masonry footing/plinth
};

// ===========================
// CALCULATOR — DEFAULT MATERIAL RATES
// Fallback values (₹) when user leaves fields blank
// ===========================

export const DEFAULT_MATERIAL_RATES = {
  cement: 420,         // ₹ per bag
  steel: 65,           // ₹ per kg
  sand: 1500,          // ₹ per m³
  aggregate: 1400,     // ₹ per m³
  brick: 9,            // ₹ per brick (wall, standard)
  pcc: 4500,           // ₹ per m³ (M10 PCC labour + material)
  footing: 5500,       // ₹ per m³ (M20 RCC footing labour + material)
  foundationBrick: 12, // ₹ per brick (foundation masonry, premium)
};

// ===========================
// CALCULATOR — FINISHING RATES
// ₹ per sq.ft by quality tier
// ===========================

export const FINISHING_RATES = {
  basic: 450,
  standard: 750,
  premium: 1200,
};

// ===========================
// CALCULATOR — RCC SLAB (M20 grade)
// ===========================

export const SLAB_CONSTANTS = {
  cementPerCubicMeter: 8, // bags per m³
  steelPercent: 0.01, // 1% of volume
  steelDensity: 7850, // kg/m³
};

// ===========================
// CALCULATOR — UNIT CONVERSIONS
// ===========================

export const CONVERSIONS = {
  sqftToSqm: 0.092903, // 1 sq.ft → m²
  ftToM: 0.3048, // 1 ft    → m
};

// ===========================
// CALCULATOR — DEFAULTS
// Pre-filled input values
// ===========================

export const CALCULATOR_DEFAULTS = {
  laborPercent: 40,
  contingency: 7,
  slabThickness: 0.41,
  finishingQuality: "standard",
};