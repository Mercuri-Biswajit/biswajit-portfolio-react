// ===========================
// EDUCATION DATA MODEL
// Central repository for education & certifications data
// ===========================

/**
 * Education array
 * @typedef {Object} Education
 * @property {string} icon     - Emoji icon
 * @property {string} year     - Year or range of completion
 * @property {string} degree   - Degree or certification name
 * @property {string} school   - Institution name
 * @property {string[]} details - Key highlights / subjects / skills gained
 */

export const education = [
  {
    icon: "🎓",
    year: "2016 – 2020",
    degree: "B.Tech Civil Engineering",
    school: "Surendra Institute of Engineering & Management",
    details: [
      "Structural analysis & RCC design",
      "Soil mechanics & foundation engineering",
      "Surveying, hydraulics & fluid mechanics",
      "Construction management & estimation",
    ],
  },
  {
    icon: "📐",
    year: "2021",
    degree: "AutoCAD 2D Drafting",
    school: "Udemy",
    details: [
      "2D floor plans, sections & elevations",
      "Layers, blocks & annotation tools",
      "Site layout & working drawings",
    ],
  },
  {
    icon: "🏗️",
    year: "2022",
    degree: "Practical Building Construction",
    school: "Udemy",
    details: [
      "RCC column, beam & slab construction",
      "Brick masonry & plastering techniques",
      "Site supervision & quality control",
    ],
  },
  {
    icon: "🗣️",
    year: "2023",
    degree: "Communication Skills",
    school: "Udemy",
    details: [
      "Professional written communication",
      "Client presentation & negotiation",
      "Team coordination & reporting",
    ],
  },
  {
    icon: "📊",
    year: "2024",
    degree: "Digital Marketing",
    school: "Google Digital Garage",
    details: [
      "SEO & search engine fundamentals",
      "Social media & content strategy",
      "Analytics & campaign measurement",
    ],
  },
];
