// ===========================
// GLOBAL CONSTANTS
// Single source of truth for all
// configuration values & magic numbers
// ===========================

// ===========================
// SITE METADATA
// ===========================

export const SITE = {
  name: "Er. Biswajit Deb Barman",
  title: "Civil Engineer & Structural Designer",
  email: "biswajitdebbarman.civil@gmail.com",
  phone: "+91-7602120054",
  location: "Chanditala, Raiganj, Uttar Dinajpur",
  linkedin: "https://www.linkedin.com/in/biswajit-deb-barman/",
  facebook: "https://www.facebook.com/profile.php?id=61585030424249",
  instagram: "https://www.instagram.com/biswajit.deb.barman/",
  resumeFile: "../assets/files/Biswajit_Deb_Barman__CV.pdf",
};

// ===========================
// CALCULATOR — MATERIAL CONSTANTS
// Per sq.ft for RCC framed structures
// ===========================

export const MATERIAL_CONSTANTS = {
  cement: 0.4, // bags per sq.ft  (typical range 0.38–0.42)
  steel: 4.0, // kg per sq.ft    (typical range 3.5–4.5 residential)
  sand: 0.044, // m³ per sq.ft    (1.55 cft → m³)
  aggregate: 0.088, // m³ per sq.ft    (3.1  cft → m³)
};

// ===========================
// CALCULATOR — DEFAULT MATERIAL RATES
// Fallback values (₹) when user leaves fields blank
// ===========================

export const DEFAULT_MATERIAL_RATES = {
  cement: 420, // ₹ per bag
  steel: 65, // ₹ per kg
  sand: 1500, // ₹ per m³
  aggregate: 1400, // ₹ per m³
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

// ===========================
// ANIMATION
// ===========================

export const AOS_CONFIG = {
  duration: 800,
  easing: "ease-out-cubic",
  once: true,
  offset: 100,
  delay: 50,
};

// ===========================
// NAVBAR
// ===========================

export const NAVBAR = {
  scrollThreshold: 100, // px before navbar changes style
};
