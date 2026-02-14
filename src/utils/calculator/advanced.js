// ═══════════════════════════════════════════════════════════════════════════
// ADVANCED CALCULATOR FUNCTIONS - CLEANED VERSION
// No unused variables - optimized and clean
// ═══════════════════════════════════════════════════════════════════════════

import {
  THUMB_RULES,
  BUILDING_TYPES,
  FINISH_GRADES,
  SOIL_CONDITIONS,
  MATERIAL_RATES,
} from "../../config/calculatorConstants";

/**
 * Calculate comprehensive building construction cost
 */
export function calcBuildingCost(inputs) {
  const {
    length,
    breadth,
    floors,
    buildingType,
    finishGrade,
    soilCondition,
    includeBasement,
    basementDepth,
    customRates,
  } = inputs;

  // Total area
  const plotArea = length * breadth;
  const totalArea = plotArea * floors + (includeBasement ? plotArea : 0);

  // Get factors
  const typeFactor = BUILDING_TYPES[buildingType].costFactor;
  const finishFactor = FINISH_GRADES[finishGrade].factor;
  const soilFactor = SOIL_CONDITIONS[soilCondition].factor;

  // Material quantities
  const cement = totalArea * THUMB_RULES.cement_bags_per_sqft;
  const steel = totalArea * THUMB_RULES.steel_kg_per_sqft;
  const sand = totalArea * THUMB_RULES.sand_cft_per_sqft;
  const aggregate = totalArea * THUMB_RULES.aggregate_cft_per_sqft;
  const bricks = totalArea * THUMB_RULES.bricks_per_sqft;
  const paint = totalArea * THUMB_RULES.paint_ltr_per_sqft;
  const tiles = totalArea * THUMB_RULES.tiles_sqft_per_sqft;
  const labourDays = totalArea * THUMB_RULES.labour_days_per_sqft;

  // Material rates (custom or default)
  const rates = {
    cement: customRates.cement || MATERIAL_RATES.cement.rate,
    steel: customRates.steel || MATERIAL_RATES.steel.rate,
    sand: customRates.sand || MATERIAL_RATES.sand.rate,
    aggregate: customRates.aggregate || MATERIAL_RATES.aggregate.rate,
    bricks: MATERIAL_RATES.bricks.rate,
    paint: MATERIAL_RATES.paint.rate,
    tiles: MATERIAL_RATES.tiles.rate,
    labour: MATERIAL_RATES.labour.rate,
  };

  // Material costs
  const cementCost = cement * rates.cement;
  const steelCost = steel * rates.steel;
  const sandCost = sand * rates.sand;
  const aggregateCost = aggregate * rates.aggregate;
  const bricksCost = bricks * rates.bricks;
  const paintCost = paint * rates.paint;
  const tilesCost = tiles * rates.tiles;
  const labourCost = labourDays * rates.labour;

  // Subtotals
  const materialCost =
    cementCost + steelCost + sandCost + aggregateCost + bricksCost;
  const finishingCost = paintCost + tilesCost;

  // Apply factors
  const structureCost = materialCost * typeFactor * soilFactor;
  const adjustedFinishing = finishingCost * finishFactor;

  // Other costs
  const electricalCost = totalArea * 150;
  const plumbingCost = totalArea * 120;
  const sanitaryCost = totalArea * 100;

  // Basement cost
  const basementCost = includeBasement ? plotArea * basementDepth * 800 : 0;

  // Total
  const subtotal =
    structureCost +
    adjustedFinishing +
    labourCost +
    electricalCost +
    plumbingCost +
    sanitaryCost +
    basementCost;
  const contingency = subtotal * 0.08;
  const totalCost = subtotal + contingency;
  const costPerSqft = totalCost / totalArea;

  return {
    totalCost,
    costPerSqft,
    totalArea,
    breakdown: {
      structure: structureCost,
      finishing: adjustedFinishing,
      labour: labourCost,
      electrical: electricalCost,
      plumbing: plumbingCost,
      sanitary: sanitaryCost,
      basement: basementCost,
      contingency,
    },
    quantities: {
      structure: `${Math.round(cement)} bags cement, ${Math.round(steel)} kg steel`,
      finishing: `${Math.round(paint)} L paint, ${Math.round(tiles)} sq.ft tiles`,
      labour: `${Math.round(labourDays)} man-days`,
    },
  };
}

/**
 * Calculate staircase design (NBC 2016 compliant)
 */
export function calcStairDesign(
  length,
  breadth,
  floorHeight,
  floors,
  buildingType,
) {
  const fftMm = floorHeight * 304.8; // ft → mm
  const isComm = buildingType === "commercial" || buildingType === "apartment";
  const riser = isComm ? 175 : 150; // NBC 2016
  const tread = isComm ? 250 : 270;

  const risersPerFlight = Math.round(fftMm / 2 / riser);
  const actualRiser = Math.round(fftMm / 2 / risersPerFlight);
  const treadsPerFlight = risersPerFlight - 1;
  const goingPerFlight = treadsPerFlight * tread; // mm
  const landingWidth = Math.max(
    1000,
    Math.round(Math.min(length, breadth) * 304.8 * 0.15),
  );
  const stairWidth = isComm ? 1200 : 900;

  const angle = Math.atan(actualRiser / tread);
  const slopedSpan = goingPerFlight / Math.cos(angle);
  const waistSlab = Math.max(100, Math.round(slopedSpan / 20 / 10) * 10);

  const headroomClear = fftMm - actualRiser * risersPerFlight;
  const headroom =
    headroomClear >= 2100 ? "✓ Adequate (≥2100mm)" : "⚠ Check Headroom";

  const twoRplusT = 2 * actualRiser + tread;
  const checkPass =
    twoRplusT >= 550 && twoRplusT <= 700 ? "✓ Pass" : "⚠ Review";

  return {
    riser: actualRiser,
    tread,
    risersPerFlight,
    treadsPerFlight,
    goingPerFlight: Math.round(goingPerFlight),
    landingWidth,
    stairWidth,
    waistSlab,
    angle: ((angle * 180) / Math.PI).toFixed(1),
    headroom,
    twoRplusT,
    checkPass,
    totalFlights: floors * 2,
    mainBarDia: 10,
    mainBarSpacing: 150,
    distBarDia: 8,
    distBarSpacing: 200,
  };
}

/**
 * Calculate footing size (IS 1904 / Thumb Rules)
 */
export function calcFooting(inputs) {
  const {
    floors,
    buildingType,
    soilCondition,
    includeBasement,
    avgColumnSpan,
  } = inputs;

  // Safe Bearing Capacity by soil type (kN/m²)
  const SBC =
    {
      hard_rock: 800,
      soft_rock: 440,
      normal: 200,
      black_cotton: 80,
      loose_fill: 80,
    }[soilCondition] || 200;

  // Column load: tributary area × floor load × no. of floors
  const isComm = buildingType === "commercial" || buildingType === "apartment";
  const liveLoad = isComm ? 7.5 : 5.0; // kN/m²
  const deadLoad = 5.5; // kN/m² (slab + beam + wall self-wt)
  const totalLoad = (liveLoad + deadLoad) * 1.5; // factored (IS 456 combo)
  const tributaryM2 = (avgColumnSpan * 0.3048) ** 2; // m²
  const columnLoad =
    totalLoad * tributaryM2 * (floors + (includeBasement ? 1 : 0)); // kN

  // Isolated footing size: A = P / SBC  →  side = √A + 0.1m offset
  const footingAreaM2 = columnLoad / SBC;
  const footingRawSide = Math.sqrt(footingAreaM2);
  const footingSide = Math.ceil(footingRawSide * 10) / 10 + 0.1; // round up to nearest 100mm
  const footingSideMm = Math.round((footingSide * 1000) / 50) * 50; // nearest 50mm

  // Footing depth (thickness): D = footing side / 2 (thumb rule), min 300mm
  const footingDepthM = Math.max(0.3, footingSide / 2);
  const footingDepthMm = Math.round((footingDepthM * 1000) / 50) * 50;

  return {
    size: `${footingSideMm}mm × ${footingSideMm}mm`,
    depth: footingDepthMm,
    columnLoad,
    sbc: SBC,
    reinforcement: "12mm bars @ 150mm c/c both ways",
  };
}

/**
 * Calculate Bar Bending Schedule summary
 */
export function calcBarBending(inputs) {
  const { floors, includeBasement, length, breadth } = inputs;
  const totalArea =
    length * breadth * floors + (includeBasement ? length * breadth : 0);

  // Simplified BBS - based on typical distribution
  const totalSteel = totalArea * THUMB_RULES.steel_kg_per_sqft;

  const breakdown = {
    "8mm": totalSteel * 0.15,
    "10mm": totalSteel * 0.25,
    "12mm": totalSteel * 0.3,
    "16mm": totalSteel * 0.2,
    "20mm": totalSteel * 0.1,
  };

  return {
    totalWeight: totalSteel,
    breakdown,
  };
}

/**
 * Calculate project timeline
 */
export function calcProjectTimeline(inputs) {
  const { floors, includeBasement } = inputs;

  // Typical construction timeline (days)
  const phases = [
    {
      name: "Site Preparation & Excavation",
      duration: 7 + (includeBasement ? 5 : 0),
      startDay: 1,
    },
    {
      name: "Foundation Work",
      duration: 14 + (includeBasement ? 10 : 0),
      startDay: 8,
    },
    { name: "Plinth & Ground Floor Slab", duration: 20, startDay: 22 },
  ];

  let currentDay = 42;
  for (let i = 1; i < floors; i++) {
    phases.push({
      name: `Floor ${i} Structure`,
      duration: 25,
      startDay: currentDay,
    });
    currentDay += 25;
  }

  phases.push(
    { name: "Roof Slab & Waterproofing", duration: 18, startDay: currentDay },
    { name: "Masonry & Plastering", duration: 30, startDay: currentDay + 18 },
    { name: "Electrical & Plumbing", duration: 20, startDay: currentDay + 48 },
    { name: "Flooring & Tiling", duration: 25, startDay: currentDay + 68 },
    { name: "Painting & Finishing", duration: 20, startDay: currentDay + 93 },
    {
      name: "Fixtures & Final Touches",
      duration: 15,
      startDay: currentDay + 113,
    },
  );

  const totalDays =
    phases[phases.length - 1].startDay + phases[phases.length - 1].duration - 1;
  const totalMonths = Math.ceil(totalDays / 30);

  return {
    totalDays,
    totalMonths,
    phases,
  };
}

/**
 * Calculate structural design parameters (Columns, Beams, Slabs)
 * Based on IS 456:2000 and thumb rules
 */
export function calcStructureDesign(inputs) {
  const { length, breadth, floors, buildingType, floorHeight, avgColumnSpan } =
    inputs;

  const isComm = buildingType === "commercial" || buildingType === "apartment";
  const plotArea = length * breadth;

  // Column Design
  const columnSpacing = avgColumnSpan;
  const totalColumns =
    Math.ceil(length / columnSpacing) * Math.ceil(breadth / columnSpacing);

  // Column size based on floors and type
  let columnSize;
  if (floors === 1) {
    columnSize = isComm ? '9" × 12"' : '9" × 9"';
  } else if (floors === 2) {
    columnSize = isComm ? '12" × 12"' : '9" × 12"';
  } else {
    columnSize = isComm ? '12" × 15"' : '12" × 12"';
  }

  // Main reinforcement in columns
  const columnBars = floors <= 2 ? "4 nos. 12mm" : "6 nos. 16mm";
  const columnStirrup = "8mm @ 150mm c/c";

  // Beam Design
  const beamDepth = Math.round((floorHeight * 304.8) / 12); // Span/12 rule in mm
  const beamDepthInch = Math.round(beamDepth / 25.4);
  const beamSize = `9" × ${beamDepthInch}"`;

  // Beam reinforcement
  const beamTopBars = floors <= 2 ? "2 nos. 12mm" : "2 nos. 16mm";
  const beamBottomBars = floors <= 2 ? "2 nos. 16mm" : "3 nos. 16mm";
  const beamStirrup = "8mm @ 125mm c/c";

  // Slab Design
  const slabThickness = floors <= 2 ? '5"' : '6"';
  const slabBars = "10mm @ 150mm c/c";
  const slabType = length > breadth * 2 ? "One-way slab" : "Two-way slab";

  // Plinth Beam
  const plinthBeamSize = '9" × 12"';
  const plinthBars = "4 nos. 12mm";
  const plinthStirrup = "8mm @ 200mm c/c";

  // Wall thickness
  const externalWall = '9" brick wall';
  const internalWall = '4.5" brick wall';

  return {
    columns: {
      size: columnSize,
      count: totalColumns,
      spacing: `${columnSpacing}' c/c`,
      mainBars: columnBars,
      stirrup: columnStirrup,
    },
    beams: {
      size: beamSize,
      topBars: beamTopBars,
      bottomBars: beamBottomBars,
      stirrup: beamStirrup,
    },
    slab: {
      thickness: slabThickness,
      type: slabType,
      mainBars: slabBars,
      distributionBars: slabBars,
    },
    plinthBeam: {
      size: plinthBeamSize,
      bars: plinthBars,
      stirrup: plinthStirrup,
    },
    walls: {
      external: externalWall,
      internal: internalWall,
    },
    concrete: {
      grade: "M20",
      mix: "1:1.5:3",
      cement: "43 Grade OPC",
    },
    plotArea,
    totalBuiltArea: plotArea * floors,
  };
}

/**
 * Calculate Complete Bar Bending Schedule for Fabricator
 * Detailed BBS with cutting lengths, bending dimensions, and weights
 */
export function calcCompleteBBS(inputs) {
  const { length, breadth, floors, floorHeight, avgColumnSpan, includeBasement } = inputs;
  
  const totalArea = length * breadth * floors + (includeBasement ? length * breadth : 0);
  const totalSteel = totalArea * THUMB_RULES.steel_kg_per_sqft;
  
  // Calculate number of structural elements
  const numColumns = Math.ceil(length / avgColumnSpan) * Math.ceil(breadth / avgColumnSpan);
  const columnHeight = floorHeight * floors * 304.8; // mm
  
  // Detailed BBS items
  const bbsItems = [];
  
  // 1. Column Main Bars (12mm or 16mm)
  const colBarDia = floors <= 2 ? 12 : 16;
  const colBarsPerColumn = floors <= 2 ? 4 : 6;
  const colBarLength = columnHeight + 600; // 600mm for footing lap
  const colBarWeight = (colBarDia ** 2 / 162) * (colBarLength / 1000); // kg per bar
  bbsItems.push({
    member: "Column Main Bars",
    barDia: `${colBarDia}mm`,
    quantity: numColumns * colBarsPerColumn,
    length: Math.round(colBarLength),
    unit: "mm",
    shape: "Straight",
    cuttingLength: Math.round(colBarLength),
    totalWeight: Math.round(numColumns * colBarsPerColumn * colBarWeight),
    bendingDetails: "No bending - Straight bars with hooks at ends"
  });
  
  // 2. Column Stirrups (8mm)
  const colWidth = floors <= 2 ? 229 : 305; // 9" or 12" in mm
  const stirrupPerimeter = 2 * (colWidth + colWidth) + 200; // +200mm for hooks
  const stirrupSpacing = 150; // mm
  const stirrupsPerColumn = Math.ceil(columnHeight / stirrupSpacing);
  const stirrupWeight = (64 / 162) * (stirrupPerimeter / 1000); // 8mm dia
  bbsItems.push({
    member: "Column Stirrups",
    barDia: "8mm",
    quantity: numColumns * stirrupsPerColumn,
    length: Math.round(stirrupPerimeter),
    unit: "mm",
    shape: "Rectangular",
    cuttingLength: Math.round(stirrupPerimeter),
    totalWeight: Math.round(numColumns * stirrupsPerColumn * stirrupWeight),
    bendingDetails: `4 bends at 90°, hook length 100mm`
  });
  
  // 3. Beam Main Bars Top (16mm)
  const totalBeamLength = (length * Math.ceil(breadth / avgColumnSpan) + breadth * Math.ceil(length / avgColumnSpan)) * 304.8; // mm
  const beamTopBarWeight = (256 / 162) * (totalBeamLength / 1000) * 2; // 2 bars
  bbsItems.push({
    member: "Beam Top Bars",
    barDia: "16mm",
    quantity: Math.ceil(totalBeamLength / 12000) * 2, // Standard bar length 12m
    length: 12000,
    unit: "mm",
    shape: "Straight with anchorage",
    cuttingLength: 12000,
    totalWeight: Math.round(beamTopBarWeight * floors),
    bendingDetails: "90° hooks at supports, lap length 752mm (47d)"
  });
  
  // 4. Beam Bottom Bars (16mm)
  const beamBottomBarWeight = (256 / 162) * (totalBeamLength / 1000) * 2;
  bbsItems.push({
    member: "Beam Bottom Bars",
    barDia: "16mm",
    quantity: Math.ceil(totalBeamLength / 12000) * 2,
    length: 12000,
    unit: "mm",
    shape: "Straight",
    cuttingLength: 12000,
    totalWeight: Math.round(beamBottomBarWeight * floors),
    bendingDetails: "Straight bars with standard hooks"
  });
  
  // 5. Beam Stirrups (8mm)
  const beamDepth = 305; // 12" typical
  const beamWidth = 229; // 9"
  const beamStirrupPerim = 2 * (beamWidth + beamDepth) + 200;
  const beamStirrupCount = Math.ceil(totalBeamLength / 125); // 125mm spacing
  const beamStirrupWeight = (64 / 162) * (beamStirrupPerim / 1000);
  bbsItems.push({
    member: "Beam Stirrups",
    barDia: "8mm",
    quantity: beamStirrupCount * floors,
    length: Math.round(beamStirrupPerim),
    unit: "mm",
    shape: "Rectangular",
    cuttingLength: Math.round(beamStirrupPerim),
    totalWeight: Math.round(beamStirrupCount * beamStirrupWeight * floors),
    bendingDetails: "4 bends at 90°, hooks 100mm"
  });
  
  // 6. Slab Main Bars (10mm)
  const slabBarSpacing = 150; // mm
  const slabBarsMain = Math.ceil(length * 304.8 / slabBarSpacing);
  const slabBarLength = breadth * 304.8; // mm
  const slabMainWeight = (100 / 162) * (slabBarLength / 1000) * slabBarsMain;
  bbsItems.push({
    member: "Slab Main Bars",
    barDia: "10mm",
    quantity: slabBarsMain * floors,
    length: Math.round(slabBarLength),
    unit: "mm",
    shape: "Straight",
    cuttingLength: Math.round(slabBarLength),
    totalWeight: Math.round(slabMainWeight * floors),
    bendingDetails: "Straight bars, lap length 600mm (60d)"
  });
  
  // 7. Slab Distribution Bars (10mm)
  const slabBarsDist = Math.ceil(breadth * 304.8 / slabBarSpacing);
  const slabDistWeight = (100 / 162) * (length * 304.8 / 1000) * slabBarsDist;
  bbsItems.push({
    member: "Slab Distribution Bars",
    barDia: "10mm",
    quantity: slabBarsDist * floors,
    length: Math.round(length * 304.8),
    unit: "mm",
    shape: "Straight",
    cuttingLength: Math.round(length * 304.8),
    totalWeight: Math.round(slabDistWeight * floors),
    bendingDetails: "Straight bars, lap length 600mm"
  });
  
  // 8. Footing Bars (12mm)
  const footingSize = 1372; // 4.5ft in mm
  const footingBars = 10; // bars each direction
  const footingBarWeight = (144 / 162) * (footingSize / 1000);
  bbsItems.push({
    member: "Footing Bars (Both Ways)",
    barDia: "12mm",
    quantity: numColumns * footingBars * 2,
    length: Math.round(footingSize),
    unit: "mm",
    shape: "Straight with hooks",
    cuttingLength: Math.round(footingSize),
    totalWeight: Math.round(numColumns * footingBars * 2 * footingBarWeight),
    bendingDetails: "90° hooks at ends, hook length 150mm"
  });
  
  const totalBBSWeight = bbsItems.reduce((sum, item) => sum + item.totalWeight, 0);
  
  return {
    totalWeight: totalBBSWeight,
    items: bbsItems,
    wastageAllowance: Math.round(totalBBSWeight * 0.07), // 7% wastage
    finalOrderQuantity: Math.round(totalBBSWeight * 1.07)
  };
}

/**
 * Calculate Full Bill of Quantities (BOQ) with Material Rates
 * Complete itemized BOQ ready for tendering/contractor
 */
export function calcFullBOQ(inputs) {
  const { length, breadth, floors, customRates, includeBasement, basementDepth } = inputs;
  
  const plotArea = length * breadth;
  const totalArea = plotArea * floors + (includeBasement ? plotArea : 0);
  
  // Material rates (for material summary only)
  const rates = {
    cement: customRates.cement || MATERIAL_RATES.cement.rate,
    steel: customRates.steel || MATERIAL_RATES.steel.rate,
    sand: customRates.sand || MATERIAL_RATES.sand.rate,
    aggregate: customRates.aggregate || MATERIAL_RATES.aggregate.rate,
    bricks: MATERIAL_RATES.bricks.rate
  };
  
  const boqItems = [];
  
  // ========== EARTHWORK ==========
  const excavationVolume = includeBasement 
    ? plotArea * (basementDepth + 3) // Basement + foundation depth
    : plotArea * 3; // Just foundation depth
  
  boqItems.push({
    srNo: "1",
    description: "Earthwork in Excavation",
    unit: "cum",
    quantity: Math.round(excavationVolume * 10) / 10,
    rate: 120,
    amount: Math.round(excavationVolume * 120)
  });
  
  // ========== PCC WORK ==========
  const pccVolume = plotArea * 0.15; // 6" thick PCC
  
  boqItems.push({
    srNo: "2",
    description: "Plain Cement Concrete 1:4:8 (150mm thick)",
    unit: "cum",
    quantity: Math.round(pccVolume * 100) / 100,
    rate: 4200,
    amount: Math.round(pccVolume * 4200)
  });
  
  // ========== RCC FOOTING ==========
  const footingVolume = plotArea * 0.45; // Approx footing volume
  
  boqItems.push({
    srNo: "3",
    description: "RCC Work in Footing (M20 grade)",
    unit: "cum",
    quantity: Math.round(footingVolume * 100) / 100,
    rate: 6800,
    amount: Math.round(footingVolume * 6800)
  });
  
  // ========== RCC COLUMNS ==========
  const columnVolume = totalArea * 0.12; // Approx
  boqItems.push({
    srNo: "4",
    description: "RCC Work in Columns (M20 grade)",
    unit: "cum",
    quantity: Math.round(columnVolume * 100) / 100,
    rate: 7200,
    amount: Math.round(columnVolume * 7200)
  });
  
  // ========== RCC BEAMS ==========
  const beamVolume = totalArea * 0.18;
  boqItems.push({
    srNo: "5",
    description: "RCC Work in Beams (M20 grade)",
    unit: "cum",
    quantity: Math.round(beamVolume * 100) / 100,
    rate: 7000,
    amount: Math.round(beamVolume * 7000)
  });
  
  // ========== RCC SLABS ==========
  const slabVolume = totalArea * 0.127; // 5" slab
  boqItems.push({
    srNo: "6",
    description: "RCC Work in Slab (M20 grade, 125mm thick)",
    unit: "cum",
    quantity: Math.round(slabVolume * 100) / 100,
    rate: 6500,
    amount: Math.round(slabVolume * 6500)
  });
  
  // ========== BRICKWORK ==========
  const brickArea = totalArea * 3.5; // Wall area (both sides)
  const brickVolume = brickArea * 0.23; // 9" wall
  const bricksCount = totalArea * THUMB_RULES.bricks_per_sqft;
  
  boqItems.push({
    srNo: "7",
    description: "Brick Masonry in CM 1:6 (230mm thick)",
    unit: "cum",
    quantity: Math.round(brickVolume * 10) / 10,
    rate: 4500,
    amount: Math.round(brickVolume * 4500)
  });
  
  // ========== PLASTERING ==========
  const plasterArea = brickArea * 2; // Both sides
  boqItems.push({
    srNo: "8",
    description: "Cement Plaster 1:4 (12mm thick internal, 15mm external)",
    unit: "sqm",
    quantity: Math.round(plasterArea * 0.0929 * 10) / 10,
    rate: 280,
    amount: Math.round(plasterArea * 0.0929 * 280)
  });
  
  // ========== FLOORING ==========
  boqItems.push({
    srNo: "9",
    description: "Vitrified Tile Flooring 600x600mm with bed",
    unit: "sqm",
    quantity: Math.round(totalArea * 0.0929 * 10) / 10,
    rate: 850,
    amount: Math.round(totalArea * 0.0929 * 850)
  });
  
  // ========== PAINTING ==========
  boqItems.push({
    srNo: "10",
    description: "Acrylic Emulsion Paint (2 coats)",
    unit: "sqm",
    quantity: Math.round(plasterArea * 0.0929 * 10) / 10,
    rate: 180,
    amount: Math.round(plasterArea * 0.0929 * 180)
  });
  
  // ========== DOORS & WINDOWS ==========
  const doorCount = Math.ceil(totalArea / 300);
  const windowCount = Math.ceil(totalArea / 150);
  
  boqItems.push({
    srNo: "11",
    description: "Flush Doors with Frame & Hardware",
    unit: "nos",
    quantity: doorCount,
    rate: 12000,
    amount: doorCount * 12000
  });
  
  boqItems.push({
    srNo: "12",
    description: "Aluminium Sliding Windows with Glass",
    unit: "nos",
    quantity: windowCount,
    rate: 8500,
    amount: windowCount * 8500
  });
  
  // ========== ELECTRICAL ==========
  boqItems.push({
    srNo: "13",
    description: "Electrical Wiring & Fittings (Complete)",
    unit: "sqft",
    quantity: totalArea,
    rate: 150,
    amount: totalArea * 150
  });
  
  // ========== PLUMBING ==========
  boqItems.push({
    srNo: "14",
    description: "Plumbing & Sanitary Installation (Complete)",
    unit: "sqft",
    quantity: totalArea,
    rate: 120,
    amount: totalArea * 120
  });
  
  // ========== WATERPROOFING ==========
  boqItems.push({
    srNo: "15",
    description: "Terrace Waterproofing (Polymer based)",
    unit: "sqm",
    quantity: Math.round(plotArea * 0.0929 * 10) / 10,
    rate: 450,
    amount: Math.round(plotArea * 0.0929 * 450)
  });
  
  // Calculate totals
  const subtotal = boqItems.reduce((sum, item) => sum + item.amount, 0);
  const gst = subtotal * 0.18; // 18% GST
  const grandTotal = subtotal + gst;
  
  // Material summary
  const materialSummary = {
    cement: {
      quantity: Math.round(totalArea * THUMB_RULES.cement_bags_per_sqft),
      unit: "bags",
      rate: rates.cement,
      amount: Math.round(totalArea * THUMB_RULES.cement_bags_per_sqft * rates.cement)
    },
    steel: {
      quantity: Math.round(totalArea * THUMB_RULES.steel_kg_per_sqft),
      unit: "kg",
      rate: rates.steel,
      amount: Math.round(totalArea * THUMB_RULES.steel_kg_per_sqft * rates.steel)
    },
    sand: {
      quantity: Math.round(totalArea * THUMB_RULES.sand_cft_per_sqft),
      unit: "cft",
      rate: rates.sand,
      amount: Math.round(totalArea * THUMB_RULES.sand_cft_per_sqft * rates.sand)
    },
    aggregate: {
      quantity: Math.round(totalArea * THUMB_RULES.aggregate_cft_per_sqft),
      unit: "cft",
      rate: rates.aggregate,
      amount: Math.round(totalArea * THUMB_RULES.aggregate_cft_per_sqft * rates.aggregate)
    },
    bricks: {
      quantity: Math.round(bricksCount),
      unit: "nos",
      rate: rates.bricks,
      amount: Math.round(bricksCount * rates.bricks)
    }
  };
  
  return {
    items: boqItems,
    summary: {
      subtotal,
      gst,
      grandTotal,
      totalItems: boqItems.length
    },
    materialSummary,
    notes: [
      "All rates are inclusive of material, labour, and contractor profit",
      "GST @ 18% applicable as per current tax regulations",
      "Rates subject to change based on market conditions",
      "Quantities are approximate and may vary by ±5% during execution"
    ]
  };
}