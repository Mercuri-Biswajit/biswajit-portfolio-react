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
 */

export const projects = [
  {
    id: 1,
    category: "RESIDENTIAL",
    title: "G-Floor Residential Layout",
    description:
      "Architectural and structural layout planning for a G-floor residential unit measuring approximately 41 ft × 28 ft. The plan includes two bedrooms, a combined living and dining area, and an integrated staircase block for future vertical expansion. The design follows an RCC framed structure with clearly defined room zoning, efficient circulation, and adequate natural light and ventilation.",
    tags: [
      "Residential Planning",
      "G-Floor Design",
      "RCC Structure",
      "Staircase Block",
      "Compact Housing",
    ],
    image: "../assets/images/projects/G-Floor_Model_28_x_41__foot.png",
  },
  {
    id: 2,
    category: "COMMERCIAL",
    title: "Warehouse cum Residential Building (G+1)",
    description:
      "Planning and structural layout design for a G+1 mixed-use building measuring approximately 57 ft × 47 ft. The ground floor is designed as a large open-span warehouse with an RCC framed structure and integrated staircase block, allowing efficient storage and movement. The first floor accommodates a complete residential unit comprising multiple bedrooms, living and dining areas, kitchen, bathrooms, and verandas.",
    tags: [
      "Mixed-Use Building",
      "Warehouse Design",
      "G+1 Residential",
      "RCC Frame Structure",
      "Open Span Planning",
    ],
    image:
      "../assets/images/projects/Warehouse_cum_Residential_(G+1)_57_x_47_foot.png",
  },
  {
    id: 3,
    category: "COMMERCIAL",
    title: "Warehouse cum Residential Building",
    description:
      "Structural and space planning for a mixed-use building measuring approximately 46 ft × 30 ft, combining a large open-span warehouse area on the lower level with a dedicated residential access core. The layout includes an RCC framed structure with optimized column placement, a staircase block for vertical circulation, and clear segregation between storage and residential functions.",
    tags: [
      "Mixed-Use Building",
      "Warehouse Design",
      "Residential Structure",
      "RCC Frame",
      "Staircase Block",
    ],
    image:
      "../assets/images/projects/Warehouse_cum_Residential_46_x_30_foot.png",
  },
  {
    id: 4,
    category: "RESIDENTIAL",
    title: "Ground Floor Residential Layout",
    description:
      "Architectural and structural layout planning for a ground floor residential unit measuring approximately 28 ft × 41 ft. The plan comprises three bedrooms, a central living and dining area, and an integrated staircase block for vertical circulation. Designed with an RCC framed structure, the layout ensures efficient room zoning, smooth internal movement, and adequate natural light and ventilation.",
    tags: [
      "Residential Planning",
      "Ground Floor Design",
      "RCC Frame Structure",
      "Staircase Block",
      "Compact Housing",
    ],
    image: "../assets/images/projects/Ground_Floor_28_x_41_foot.png",
  },
];