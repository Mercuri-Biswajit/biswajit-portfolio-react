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
 * @property {string} description - Short project description
 * @property {string} detailedDescription - Full technical specifications (HTML)
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
    description: `
      <p>Two-storey residential building with open parking at ground level. Designed for Zone III seismic loading.</p>
      
      <h4>Structural Specifications</h4>
      <ul>
        <li><strong>Columns:</strong> 9" x 9" using 4 nos. 12mm TMT bars with 8mm stirrups @ 150mm c/c</li>
        <li><strong>Beams:</strong> 9" x 12" using 3 nos. 16mm + 2 nos. 12mm TMT bars with 8mm stirrups @ 125mm c/c</li>
        <li><strong>Slab:</strong> 5" thick one-way slab with 10mm TMT bars @ 150mm c/c main and distribution reinforcement</li>
        <li><strong>Foundation:</strong> Isolated footings 4'6" x 4'6" x 1'6" deep with 12mm TMT bars @ 150mm c/c both ways</li>
        <li><strong>Plinth Beam:</strong> 9" x 12" with 4 nos. 12mm TMT bars and 8mm stirrups @ 200mm c/c</li>
      </ul>
      
      <h4>Concrete Grade & Mix</h4>
      <ul>
        <li><strong>Concrete Grade:</strong> M20 (1:1.5:3 mix ratio)</li>
        <li><strong>Cement:</strong> 43 grade OPC - approximately 46 bags for complete RCC work</li>
        <li><strong>Fine Aggregate (Sand):</strong> 5.0 cubic meters</li>
        <li><strong>Coarse Aggregate (20mm & 10mm):</strong> 10.1 cubic meters</li>
        <li><strong>Concrete Mixer:</strong> 10/7 CFT diesel/electric mixer used for consistent mix quality</li>
      </ul>
      
      <h4>Additional Materials</h4>
      <ul>
        <li><strong>Brickwork:</strong> 9" walls using Class-A burnt clay bricks - approximately 14,500 nos.</li>
        <li><strong>Plastering:</strong> 12mm thick internal, 15mm thick external cement plaster</li>
        <li><strong>Flooring:</strong> Standard ceramic tiles with 40mm thick PCC bed</li>
      </ul>
    `,
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
    description: `
      <p>Premium duplex with cantilever balconies and staircase slab. IS 456 compliant design.</p>
      
      <h4>Structural Specifications</h4>
      <ul>
        <li><strong>Columns:</strong> 12" x 12" using 8 nos. 16mm TMT bars with 8mm stirrups @ 125mm c/c in seismic zones</li>
        <li><strong>Main Beams:</strong> 12" x 16" using 4 nos. 20mm + 3 nos. 16mm TMT bars with 8mm stirrups @ 100mm c/c at supports</li>
        <li><strong>Secondary Beams:</strong> 9" x 12" with 4 nos. 16mm TMT bars and 8mm stirrups @ 150mm c/c</li>
        <li><strong>Slab:</strong> 6" thick two-way slab with 12mm TMT bars @ 125mm c/c both directions</li>
        <li><strong>Foundation:</strong> Combined footings 8' x 5' x 2' deep with 16mm TMT bars @ 125mm c/c grid</li>
        <li><strong>Shear Walls:</strong> 9" thick RC walls with 12mm bars @ 150mm c/c vertical and horizontal</li>
      </ul>
      
      <h4>Concrete Grade & Mix</h4>
      <ul>
        <li><strong>Concrete Grade:</strong> M25 for columns and beams, M20 for slabs (1:1:2 and 1:1.5:3 respectively)</li>
        <li><strong>Cement:</strong> 53 grade OPC - approximately 215 bags for entire structure</li>
        <li><strong>Fine Aggregate (Sand):</strong> 23.4 cubic meters</li>
        <li><strong>Coarse Aggregate (20mm & 10mm):</strong> 47.2 cubic meters</li>
        <li><strong>Concrete Mixer:</strong> 14/10 CFT heavy-duty diesel mixer for M25 grade consistency</li>
        <li><strong>Admixtures:</strong> Plasticizer used for better workability and reduced water-cement ratio</li>
      </ul>
      
      <h4>Additional Materials</h4>
      <ul>
        <li><strong>Brickwork:</strong> 9" external walls, 4.5" internal walls - approximately 68,000 bricks total</li>
        <li><strong>Reinforcement Steel:</strong> Total 22,344 kg TMT bars (Fe500 grade)</li>
        <li><strong>Waterproofing:</strong> Polymer-based membrane for terrace and bathroom areas</li>
        <li><strong>Formwork:</strong> Plywood shuttering for beams and slabs, steel props for support</li>
      </ul>
    `,
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
    description: `
      <p>Cost-optimized row housing project with 12 units. Standardized structural drawings for rapid construction.</p>
      
      <h4>Structural Specifications</h4>
      <ul>
        <li><strong>Load Bearing Walls:</strong> 9" thick brick masonry walls as primary load bearing elements</li>
        <li><strong>RCC Columns:</strong> 9" x 9" at staircase only, using 4 nos. 12mm TMT bars with 8mm stirrups @ 175mm c/c</li>
        <li><strong>Lintel Beams:</strong> 9" x 9" RCC lintels over all openings with 4 nos. 10mm TMT bars</li>
        <li><strong>Slab:</strong> 5" thick one-way slab spanning on load bearing walls with 10mm TMT bars @ 150mm c/c</li>
        <li><strong>Foundation:</strong> Strip footing 2'6" wide x 1'3" deep under load bearing walls with 10mm bars @ 200mm c/c</li>
        <li><strong>Plinth Band:</strong> 9" x 9" continuous band with 4 nos. 10mm bars and 6mm stirrups @ 200mm c/c</li>
      </ul>
      
      <h4>Concrete Grade & Mix</h4>
      <ul>
        <li><strong>Concrete Grade:</strong> M20 for all RCC work (1:1.5:3 mix)</li>
        <li><strong>Cement:</strong> 43 grade OPC - approximately 52 bags per unit (624 bags total for 12 units)</li>
        <li><strong>Fine Aggregate (Sand):</strong> 5.5 cubic meters per unit</li>
        <li><strong>Coarse Aggregate:</strong> 11.2 cubic meters per unit</li>
        <li><strong>Concrete Mixer:</strong> 7/5 CFT electric mixer for small batches, cost-effective for repetitive units</li>
      </ul>
      
      <h4>Additional Materials (Per Unit)</h4>
      <ul>
        <li><strong>Brickwork:</strong> Class-A burnt clay bricks - approximately 13,800 nos. per unit</li>
        <li><strong>Reinforcement Steel:</strong> 5,520 kg TMT bars per unit (Fe500 grade)</li>
        <li><strong>Mortar:</strong> Cement-sand mortar 1:5 for brickwork, 1:4 for plastering</li>
        <li><strong>DPC:</strong> 40mm thick concrete bed with waterproofing compound at plinth level</li>
      </ul>
    `,
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
    description: `
      <p>Mixed-use commercial building with showroom at ground and office at first floor. Heavy floor load design.</p>
      
      <h4>Structural Specifications</h4>
      <ul>
        <li><strong>Columns:</strong> 12" x 15" for ground floor commercial use, using 8 nos. 20mm TMT bars with 10mm stirrups @ 100mm c/c</li>
        <li><strong>First Floor Columns:</strong> 9" x 12" with 6 nos. 16mm TMT bars and 8mm stirrups @ 150mm c/c</li>
        <li><strong>Ground Floor Beams:</strong> 12" x 18" heavy beams using 5 nos. 25mm + 3 nos. 20mm TMT bars with 10mm stirrups @ 100mm c/c</li>
        <li><strong>First Floor Beams:</strong> 9" x 12" with 4 nos. 16mm TMT bars and 8mm stirrups @ 125mm c/c</li>
        <li><strong>Slab:</strong> 6" thick for commercial loading with 12mm TMT bars @ 100mm c/c main steel</li>
        <li><strong>Foundation:</strong> Raft foundation 1'9" thick with 16mm TMT bars @ 150mm c/c top and bottom mesh</li>
        <li><strong>Staircase:</strong> Waist slab staircase 6" thick with 12mm bars @ 125mm c/c</li>
      </ul>
      
      <h4>Concrete Grade & Mix</h4>
      <ul>
        <li><strong>Foundation:</strong> M25 grade (1:1:2 mix ratio) for raft foundation</li>
        <li><strong>Columns & Beams:</strong> M25 grade for ground floor, M20 for first floor</li>
        <li><strong>Slabs:</strong> M20 grade (1:1.5:3 mix)</li>
        <li><strong>Cement:</strong> 53 grade OPC - approximately 168 bags total</li>
        <li><strong>Fine Aggregate (Sand):</strong> 18.2 cubic meters</li>
        <li><strong>Coarse Aggregate (20mm):</strong> 36.8 cubic meters</li>
        <li><strong>Concrete Mixer:</strong> 14/10 CFT diesel mixer for consistent M25 grade mixing</li>
        <li><strong>Ready Mix Concrete:</strong> Option for M25 foundation to ensure uniform quality</li>
      </ul>
      
      <h4>Additional Materials</h4>
      <ul>
        <li><strong>Reinforcement Steel:</strong> Total 17,680 kg TMT bars (Fe500 grade)</li>
        <li><strong>Brickwork:</strong> 9" external walls - approximately 52,000 bricks</li>
        <li><strong>Commercial Flooring:</strong> Vitrified tiles for ground floor showroom area</li>
        <li><strong>Waterproofing:</strong> Cementitious waterproofing for raft foundation and terrace</li>
        <li><strong>Formwork:</strong> Heavy-duty steel formwork for raft foundation, plywood for vertical elements</li>
      </ul>
    `,
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
  {
    id: 5,
    category: "RESIDENTIAL",
    title: "Residential 3BHK Plan (33'6\" x 33'2\")",
    description: `
      <p>Ground floor 3BHK residential building measuring approximately 33'-6" x 33'-2" with central staircase and spacious dining hall. Designed as an RCC framed structure suitable for Zone III seismic loading with efficient column grid alignment.</p>
      
      <h4>Architectural Highlights</h4>
      <ul>
        <li><strong>Bedrooms:</strong> 3 nos. (11'-10" x 11'-10" approx.)</li>
        <li><strong>Kitchen:</strong> 7'-10" x 8'-7" with dedicated ventilation window</li>
        <li><strong>Dining Hall:</strong> 20'-5" x 11'-1" large common space</li>
        <li><strong>Bathrooms:</strong> 2 nos. attached/common (5'-5" x 8'-7" approx.)</li>
        <li><strong>Staircase:</strong> Central dog-legged RCC staircase</li>
        <li><strong>Front Verandah:</strong> 16'-1" wide entry projection</li>
      </ul>
      
      <h4>Structural Specifications</h4>
      <ul>
        <li><strong>Columns:</strong> 9" x 12" using 6 nos. 12mm TMT bars with 8mm stirrups @ 150mm c/c</li>
        <li><strong>Beams:</strong> 9" x 12" using 2 nos. 16mm + 2 nos. 12mm bottom bars and 2 nos. 12mm top bars with 8mm stirrups @ 125mm c/c</li>
        <li><strong>Slab:</strong> 5" thick two-way slab with 10mm TMT bars @ 150mm c/c both directions</li>
        <li><strong>Staircase:</strong> 6" waist slab with 10mm TMT bars @ 150mm c/c</li>
        <li><strong>Foundation:</strong> Isolated footings 5'-0" x 5'-0" x 1'-6" with 12mm TMT bars @ 150mm c/c both ways</li>
        <li><strong>Plinth Beam:</strong> 9" x 12" with 4 nos. 12mm TMT bars and 8mm stirrups @ 200mm c/c</li>
      </ul>
      
      <h4>Concrete Grade & Mix</h4>
      <ul>
        <li><strong>Concrete Grade:</strong> M20 (1:1.5:3 nominal mix)</li>
        <li><strong>Cement:</strong> 43 grade OPC – approximately 85 bags for complete RCC work</li>
        <li><strong>Fine Aggregate (Sand):</strong> 9.5 cubic meters</li>
        <li><strong>Coarse Aggregate (20mm & 10mm):</strong> 18.5 cubic meters</li>
        <li><strong>Concrete Mixer:</strong> 10/7 CFT diesel/electric mixer used for uniform batching</li>
      </ul>
      
      <h4>Additional Materials</h4>
      <ul>
        <li><strong>Brickwork:</strong> 9" external & 5" internal partition walls – approximately 18,000 nos. bricks</li>
        <li><strong>Plastering:</strong> 12mm internal and 15mm external cement plaster</li>
        <li><strong>Flooring:</strong> Vitrified/ceramic tiles with 40mm PCC base</li>
        <li><strong>Doors & Windows:</strong> Standard flush doors with aluminium sliding windows</li>
      </ul>
    `,
    tags: [
      "3BHK Plan",
      "Central Staircase",
      "RCC Residential",
      "Ground Floor Design",
      "Zone III Structure",
    ],
    image: "../assets/images/projects/Ground_Floor__33_x_33.5__Foot.png",
    plotArea: "1,115 sq.ft",
    estimatedCost: "₹22 Lakhs",
    structure: "RCC Frame",
    foundation: "Isolated Footing",
  },
];
