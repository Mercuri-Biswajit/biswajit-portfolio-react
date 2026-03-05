// ===========================
// SKILLS DATA MODEL
// Central repository for skills data
// ===========================

/**
 * Skills array
 * @typedef {Object} Skill
 * @property {string} icon - Emoji icon
 * @property {string} name - Skill name
 * @property {string[]} items - List of specific tools / knowledge in this skill
 */

export const skills = [
  {
    icon: "📐",
    name: "AutoCAD 2D Drafting",
    items: [
      "Floor plans & elevations",
      "Section & detail drawings",
      "Site layout & plot plans",
      "Annotation & dimensioning",
      "Layer management & blocks",
    ],
  },
  {
    icon: "🏗️",
    name: "Structural Design",
    items: [
      "RCC beam, column & slab design",
      "IS 456:2000 code compliance",
      "Footing & foundation design",
      "Staircase & retaining wall design",
      "Load calculation & analysis",
    ],
  },
  {
    icon: "🔬",
    name: "Materials & Site Work",
    items: [
      "Concrete mix design (M20–M40)",
      "Steel reinforcement detailing",
      "Soil testing & bearing capacity",
      "Quality control & site inspection",
      "IS code material specifications",
    ],
  },
  {
    icon: "⚙️",
    name: "Cost Estimation & BOQ",
    items: [
      "WB PWD schedule of rates",
      "Quantity surveying & take-off",
      "Abstract estimate preparation",
      "Material & labour rate analysis",
      "Detailed project cost reports",
    ],
  },
];