// ===========================
// SERVICES DATA MODEL
// Central repository for services data
// ===========================

/**
 * Services array
 * @typedef {Object} Service
 * @property {string} name - Service name
 * @property {string} price - Service price
 * @property {string} description - Service description
 * @property {string[]} features - Service features list
 * @property {string} icon - Emoji icon
 * @property {boolean} popular - Is this service popular/recommended?
 */

export const services = [
  {
    name: "Architectural Plan",
    price: "Custom Quote",
    description: "Complete architectural design and planning services",
    features: [
      "Site analysis and planning",
      "Floor plans and elevations",
      "Interior space planning",
      "Up to 3 design revisions",
      "CAD drawings delivery",
    ],
    icon: "📐",
    popular: false,
  },
  {
    name: "Structural Plan",
    price: "Custom Quote",
    description: "Comprehensive structural engineering and design",
    features: [
      "Structural analysis",
      "Foundation design",
      "Load calculations",
      "Reinforcement detailing",
      "Up to 3 design revisions",
    ],
    icon: "🏗️",
    popular: false,
  },
  {
    name: "Cost Estimate",
    price: "Custom Quote",
    description: "Detailed project cost estimation and BOQ",
    features: [
      "Material quantity takeoff",
      "Bill of Quantities (BOQ)",
      "Cost breakdown analysis",
      "Up to 3 revisions",
      "Market rate comparison",
    ],
    icon: "💰",
    popular: false,
  },
];