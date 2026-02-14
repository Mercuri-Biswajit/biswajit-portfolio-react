// ═══════════════════════════════════════════════════════════════════════════
// ADVANCED CALCULATOR FUNCTIONS
// Building cost, stair design, footing, BBS, timeline, and structure design
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
  const totalStairLen = goingPerFlight * 2 + landingWidth * 2;

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
    totalStairLen: Math.round(totalStairLen),
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
