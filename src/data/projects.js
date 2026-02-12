// ===========================
// PROJECTS DATA MODEL
// Central repository for projects data
// ===========================

/**
 * Projects array
 * @typedef {Object} Project
 * @property {number} id - Unique project ID
 * @property {string} category - Project category (RESIDENTIAL, COMMERCIAL, etc.)
 * @property {string} title - Project title
 * @property {string} description - Project description
 * @property {string[]} tags - Project tags
 * @property {string} image - Project image path
 * @property {string} plotArea - Plot area with unit
 * @property {string} estimatedCost - Estimated cost
 * @property {string} structure - Structure type
 * @property {string} foundation - Foundation type
 */

export const projects = [
  {
    id: 1,
    category: "RESIDENTIAL",
    title: "Residential Ground Floor",
    description:
      "Two-storey residential building with open parking at ground level. Designed for Zone III seismic loading.",
    tags: [
      "Residential Planning",
      "G-Floor Design",
      "RCC Structure",
      "Staircase Block",
      "Compact Housing",
    ],
    image: "../assets/images/projects/Ground_Floor_28_x_41_foot.png",
    plotArea: "1,148 sq.ft",
    estimatedCost: "₹19 Lakhs",
    structure: "RCC Frame",
    foundation: "Isolated Footing",
  },
  {
    id: 2,
    category: "COMMERCIAL",
    title: "Commercial Cum Residential (G+1)",
    description:
      "Premium duplex with cantilever balconies and staircase slab. IS 456 compliant design.",
    tags: [
      "Mixed-Use Building",
      "Warehouse Design",
      "G+1 Residential",
      "RCC Frame Structure",
      "Open Span Planning",
    ],
    image:
      "../assets/images/projects/Warehouse_cum_Residential_(G+1)_57_x_47_foot.png",
    plotArea: "5,586 sq.ft",
    estimatedCost: "₹79 Lakhs",
    structure: "RCC Frame + Shear Wall",
    foundation: "Combined Footing",
  },
  {
    id: 3,
    category: "RESIDENTIAL",
    title: "Commercial Cum Residential (G-Floor)",
    description:
      "Cost-optimized row housing project with 12 units. Standardized structural drawings for rapid construction.",
    tags: [
      "Mixed-Use Building",
      "Warehouse Design",
      "Residential Structure",
      "RCC Frame",
      "Staircase Block",
    ],
    image:
      "../assets/images/projects/Warehouse_cum_Residential_46_x_30_foot.png",
    plotArea: "1,380 sq.ft each",
    estimatedCost: "₹23 Lakhs",
    structure: "Load Bearing + RCC",
    foundation: "Strip Footing",
  },
  {
    id: 4,
    category: "COMMERCIAL",
    title: "Commercial Cum Residential (G+1-Floor)",
    description:
      "Mixed-use commercial building with showroom at ground and office at first floor. Heavy floor load design.",
    tags: [
      "Residential Planning",
      "Ground Floor Design",
      "RCC Frame Structure",
      "Staircase Block",
      "Compact Housing",
    ],
    image: "../assets/images/projects/Ground+1_Floor_42-6_x_32_foot.png",
    plotArea: "1,360 sq.ft",
    estimatedCost: "₹23 Lakhs",
    structure: "RCC Frame",
    foundation: "Raft Foundation",
  },
];