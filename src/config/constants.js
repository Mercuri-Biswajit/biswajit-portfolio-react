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
  title: "Civil Engineer & Structural Designer – Raiganj, West Bengal",
  tagline: "Serving Raiganj, Uttar Dinajpur & North Bengal",
  email: "biswajitdebbarman.civil@gmail.com",
  phone: "+91-7602120054",
  location: "Chanditala, Raiganj, Uttar Dinajpur, West Bengal – 733134",
  linkedin: "https://www.linkedin.com/in/biswajit-deb-barman/",
  instagram: "https://www.instagram.com/biswajit.deb.barman/",
  url: "https://engineer-biswajit.netlify.app/",

  // Areas served — used in Footer and About
  serviceAreas: [
    "Raiganj",
    "Dalkhola",
    "Islampur",
    "Itahar",
    "Chopra",
    "Kaliaganj",
    "Hemtabad",
  ],

  // Per-page SEO — used with <Helmet> in each page
  seo: {
    home: {
      title: "Civil Engineer in Raiganj | Er. Biswajit Deb Barman",
      description:
        "Top civil engineer in Raiganj, Uttar Dinajpur, WB. Expert in structural design, BOQ, cost estimation & building planning services.",
      canonical: "https://engineer-biswajit.netlify.app/",
    },
    projects: {
      title: "Projects | Civil Engineering Works in Raiganj & North Bengal",
      description:
        "Portfolio of residential and commercial engineering projects by Er. Biswajit Deb Barman, Raiganj, Uttar Dinajpur, West Bengal.",
      canonical: "https://engineer-biswajit.netlify.app/projects",
    },
    about: {
      title: "About Er. Biswajit Deb Barman | Civil Engineer – Raiganj",
      description:
        "Civil engineer from Raiganj specializing in IS 456:2000 structural design, WB PWD cost estimation, and building planning.",
      canonical: "https://engineer-biswajit.netlify.app/about",
    },
    calculators: {
      title:
        "Free Construction Calculator – Raiganj | RCC, BOQ, Cost Estimator",
      description:
        "Free online construction cost calculator based on WB PWD SOR 2023–24. RCC slab, beam, column design, BOQ, paint estimator. Built by Er. Biswajit, Raiganj.",
      canonical: "https://engineer-biswajit.netlify.app/calculators",
    },
    vastu: {
      title: "Vastu Shastra Room Planner | Er. Biswajit Deb Barman – Raiganj",
      description:
        "Free Vastu room planner and Vastu study by civil engineer in Raiganj, West Bengal. Plan your home layout according to Vastu principles.",
      canonical: "https://engineer-biswajit.netlify.app/vastu",
    },
  },
};

// ===========================
// CALCULATOR — MATERIAL CONSTANTS
// Per sq.ft for RCC framed structures
// ===========================

export const MATERIAL_CONSTANTS = {
  cement: 0.4, // bags per sq.ft  (typical range 0.38–0.42)
  steel: 4.0, // kg per sq.ft    (typical range 3.5–4.5 residential)
  sand: 0.044, // m³ per sq.ft    (1.55 cft → m³)
  aggregate: 0.088, // m³ per sq.ft    (3.1 cft → m³)
  bricks: 9, // bricks per sq.ft (typical range 7–9 for single brick wall)
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
