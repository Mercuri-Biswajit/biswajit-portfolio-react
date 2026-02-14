// ═══════════════════════════════════════════════════════════════════════════
// ADVANCED CALCULATOR FUNCTIONS - FINAL VERSION WITH REALISTIC BOQ
// All calculations with corrected labour rates (5x reduction in costs)
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

  const plotArea = length * breadth;
  const totalArea = plotArea * floors + (includeBasement ? plotArea : 0);

  const typeFactor = BUILDING_TYPES[buildingType].costFactor;
  const finishFactor = FINISH_GRADES[finishGrade].factor;
  const soilFactor = SOIL_CONDITIONS[soilCondition].factor;

  const cement = totalArea * THUMB_RULES.cement_bags_per_sqft;
  const steel = totalArea * THUMB_RULES.steel_kg_per_sqft;
  const sand = totalArea * THUMB_RULES.sand_cft_per_sqft;
  const aggregate = totalArea * THUMB_RULES.aggregate_cft_per_sqft;
  const bricks = totalArea * THUMB_RULES.bricks_per_sqft;
  const paint = totalArea * THUMB_RULES.paint_ltr_per_sqft;
  const tiles = totalArea * THUMB_RULES.tiles_sqft_per_sqft;
  const labourDays = totalArea * THUMB_RULES.labour_days_per_sqft;

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

  const cementCost = cement * rates.cement;
  const steelCost = steel * rates.steel;
  const sandCost = sand * rates.sand;
  const aggregateCost = aggregate * rates.aggregate;
  const bricksCost = bricks * rates.bricks;
  const paintCost = paint * rates.paint;
  const tilesCost = tiles * rates.tiles;
  const labourCost = labourDays * rates.labour;

  const materialCost = cementCost + steelCost + sandCost + aggregateCost + bricksCost;
  const finishingCost = paintCost + tilesCost;

  const structureCost = materialCost * typeFactor * soilFactor;
  const adjustedFinishing = finishingCost * finishFactor;

  const electricalCost = totalArea * 150;
  const plumbingCost = totalArea * 120;
  const sanitaryCost = totalArea * 100;

  const basementCost = includeBasement ? plotArea * basementDepth * 800 : 0;

  const subtotal = structureCost + adjustedFinishing + labourCost + electricalCost + plumbingCost + sanitaryCost + basementCost;
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
export function calcStairDesign(length, breadth, floorHeight, floors, buildingType) {
  const fftMm = floorHeight * 304.8;
  const isComm = buildingType === "commercial" || buildingType === "apartment";
  const riser = isComm ? 175 : 150;
  const tread = isComm ? 250 : 270;

  const risersPerFlight = Math.round(fftMm / 2 / riser);
  const actualRiser = Math.round(fftMm / 2 / risersPerFlight);
  const treadsPerFlight = risersPerFlight - 1;
  const goingPerFlight = treadsPerFlight * tread;
  const landingWidth = Math.max(1000, Math.round(Math.min(length, breadth) * 304.8 * 0.15));
  const stairWidth = isComm ? 1200 : 900;

  const angle = Math.atan(actualRiser / tread);
  const slopedSpan = goingPerFlight / Math.cos(angle);
  const waistSlab = Math.max(100, Math.round(slopedSpan / 20 / 10) * 10);

  const headroomClear = fftMm - actualRiser * risersPerFlight;
  const headroom = headroomClear >= 2100 ? "✓ Adequate (≥2100mm)" : "⚠ Check Headroom";

  const twoRplusT = 2 * actualRiser + tread;
  const checkPass = twoRplusT >= 550 && twoRplusT <= 700 ? "✓ Pass" : "⚠ Review";

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
  const { floors, buildingType, soilCondition, includeBasement, avgColumnSpan } = inputs;

  const SBC = {
    hard_rock: 800,
    soft_rock: 440,
    normal: 200,
    black_cotton: 80,
    loose_fill: 80,
  }[soilCondition] || 200;

  const isComm = buildingType === "commercial" || buildingType === "apartment";
  const liveLoad = isComm ? 7.5 : 5.0;
  const deadLoad = 5.5;
  const totalLoad = (liveLoad + deadLoad) * 1.5;
  const tributaryM2 = (avgColumnSpan * 0.3048) ** 2;
  const columnLoad = totalLoad * tributaryM2 * (floors + (includeBasement ? 1 : 0));

  const footingAreaM2 = columnLoad / SBC;
  const footingRawSide = Math.sqrt(footingAreaM2);
  const footingSide = Math.ceil(footingRawSide * 10) / 10 + 0.1;
  const footingSideMm = Math.round((footingSide * 1000) / 50) * 50;

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
  const totalArea = length * breadth * floors + (includeBasement ? length * breadth : 0);

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

  const phases = [
    { name: "Site Preparation & Excavation", duration: 7 + (includeBasement ? 5 : 0), startDay: 1 },
    { name: "Foundation Work", duration: 14 + (includeBasement ? 10 : 0), startDay: 8 },
    { name: "Plinth & Ground Floor Slab", duration: 20, startDay: 22 },
  ];

  let currentDay = 42;
  for (let i = 1; i < floors; i++) {
    phases.push({ name: `Floor ${i} Structure`, duration: 25, startDay: currentDay });
    currentDay += 25;
  }

  phases.push(
    { name: "Roof Slab & Waterproofing", duration: 18, startDay: currentDay },
    { name: "Masonry & Plastering", duration: 30, startDay: currentDay + 18 },
    { name: "Electrical & Plumbing", duration: 20, startDay: currentDay + 48 },
    { name: "Flooring & Tiling", duration: 25, startDay: currentDay + 68 },
    { name: "Painting & Finishing", duration: 20, startDay: currentDay + 93 },
    { name: "Fixtures & Final Touches", duration: 15, startDay: currentDay + 113 },
  );

  const totalDays = phases[phases.length - 1].startDay + phases[phases.length - 1].duration - 1;
  const totalMonths = Math.ceil(totalDays / 30);

  return { totalDays, totalMonths, phases };
}

/**
 * Calculate structural design parameters
 */
export function calcStructureDesign(inputs) {
  const { length, breadth, floors, buildingType, floorHeight, avgColumnSpan } = inputs;

  const isComm = buildingType === "commercial" || buildingType === "apartment";
  const plotArea = length * breadth;

  const columnSpacing = avgColumnSpan;
  const totalColumns = Math.ceil(length / columnSpacing) * Math.ceil(breadth / columnSpacing);

  let columnSize;
  if (floors === 1) {
    columnSize = isComm ? '9" × 12"' : '9" × 9"';
  } else if (floors === 2) {
    columnSize = isComm ? '12" × 12"' : '9" × 12"';
  } else {
    columnSize = isComm ? '12" × 15"' : '12" × 12"';
  }

  const columnBars = floors <= 2 ? "4 nos. 12mm" : "6 nos. 16mm";
  const columnStirrup = "8mm @ 150mm c/c";

  const beamDepth = Math.round((floorHeight * 304.8) / 12);
  const beamDepthInch = Math.round(beamDepth / 25.4);
  const beamSize = `9" × ${beamDepthInch}"`;

  const beamTopBars = floors <= 2 ? "2 nos. 12mm" : "2 nos. 16mm";
  const beamBottomBars = floors <= 2 ? "2 nos. 16mm" : "3 nos. 16mm";
  const beamStirrup = "8mm @ 125mm c/c";

  const slabThickness = floors <= 2 ? '5"' : '6"';
  const slabBars = "10mm @ 150mm c/c";
  const slabType = length > breadth * 2 ? "One-way slab" : "Two-way slab";

  const plinthBeamSize = '9" × 12"';
  const plinthBars = "4 nos. 12mm";
  const plinthStirrup = "8mm @ 200mm c/c";

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
    walls: { external: externalWall, internal: internalWall },
    concrete: { grade: "M20", mix: "1:1.5:3", cement: "43 Grade OPC" },
    plotArea,
    totalBuiltArea: plotArea * floors,
  };
}

/**
 * Calculate Complete Bar Bending Schedule
 */
export function calcCompleteBBS(inputs) {
  const { length, breadth, floors, floorHeight, avgColumnSpan, includeBasement } = inputs;
  
  const totalArea = length * breadth * floors + (includeBasement ? length * breadth : 0);
  const totalSteel = totalArea * THUMB_RULES.steel_kg_per_sqft;
  
  const numColumns = Math.ceil(length / avgColumnSpan) * Math.ceil(breadth / avgColumnSpan);
  const columnHeight = floorHeight * floors * 304.8;
  
  const bbsItems = [];
  
  const colBarDia = floors <= 2 ? 12 : 16;
  const colBarsPerColumn = floors <= 2 ? 4 : 6;
  const colBarLength = columnHeight + 600;
  const colBarWeight = (colBarDia ** 2 / 162) * (colBarLength / 1000);
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
  
  const colWidth = floors <= 2 ? 229 : 305;
  const stirrupPerimeter = 2 * (colWidth + colWidth) + 200;
  const stirrupSpacing = 150;
  const stirrupsPerColumn = Math.ceil(columnHeight / stirrupSpacing);
  const stirrupWeight = (64 / 162) * (stirrupPerimeter / 1000);
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
  
  const totalBeamLength = (length * Math.ceil(breadth / avgColumnSpan) + breadth * Math.ceil(length / avgColumnSpan)) * 304.8;
  const beamTopBarWeight = (256 / 162) * (totalBeamLength / 1000) * 2;
  bbsItems.push({
    member: "Beam Top Bars",
    barDia: "16mm",
    quantity: Math.ceil(totalBeamLength / 12000) * 2,
    length: 12000,
    unit: "mm",
    shape: "Straight with anchorage",
    cuttingLength: 12000,
    totalWeight: Math.round(beamTopBarWeight * floors),
    bendingDetails: "90° hooks at supports, lap length 752mm (47d)"
  });
  
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
  
  const beamDepth = 305;
  const beamWidth = 229;
  const beamStirrupPerim = 2 * (beamWidth + beamDepth) + 200;
  const beamStirrupCount = Math.ceil(totalBeamLength / 125);
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
  
  const slabBarSpacing = 150;
  const slabBarsMain = Math.ceil(length * 304.8 / slabBarSpacing);
  const slabBarLength = breadth * 304.8;
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
  
  const footingSize = 1372;
  const footingBars = 10;
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
    wastageAllowance: Math.round(totalBBSWeight * 0.07),
    finalOrderQuantity: Math.round(totalBBSWeight * 1.07)
  };
}

/**
 * Calculate Full BOQ - REALISTIC VERSION (5x reduction in costs)
 */
export function calcFullBOQ(inputs) {
  const { length, breadth, floors, customRates, includeBasement, basementDepth, buildingType } = inputs;
  
  const plotArea = length * breadth;
  const totalArea = plotArea * floors + (includeBasement ? plotArea : 0);
  
  const rates = {
    cement: customRates.cement || MATERIAL_RATES.cement.rate,
    steel: customRates.steel || MATERIAL_RATES.steel.rate,
    sand: customRates.sand || MATERIAL_RATES.sand.rate,
    aggregate: customRates.aggregate || MATERIAL_RATES.aggregate.rate,
    bricks: MATERIAL_RATES.bricks.rate,
    paint: MATERIAL_RATES.paint.rate,
    tiles: MATERIAL_RATES.tiles.rate,
    labour: MATERIAL_RATES.labour.rate
  };
  
  const labourCostPerDay = rates.labour;
  
  const materialQty = {
    cement: Math.round(totalArea * THUMB_RULES.cement_bags_per_sqft),
    steel: Math.round(totalArea * THUMB_RULES.steel_kg_per_sqft),
    sand: Math.round(totalArea * THUMB_RULES.sand_cft_per_sqft),
    aggregate: Math.round(totalArea * THUMB_RULES.aggregate_cft_per_sqft),
    bricks: Math.round(totalArea * THUMB_RULES.bricks_per_sqft),
    paint: Math.round(totalArea * THUMB_RULES.paint_ltr_per_sqft * 10) / 10,
    tiles: Math.round(totalArea * THUMB_RULES.tiles_sqft_per_sqft),
  };
  
  const boqItems = [];
  
  // EARTHWORK
  const excavationVolume = includeBasement ? plotArea * (basementDepth + 3) : plotArea * 3;
  const excavationCum = Math.round(excavationVolume * 0.0283 * 100) / 100;
  
  boqItems.push({
    srNo: "1",
    description: "Earthwork in Excavation for Foundation & Levelling",
    unit: "cum",
    quantity: excavationCum,
    rate: 120,
    amount: Math.round(excavationCum * 120)
  });
  
  // PCC WORK
  const pccVolume = plotArea * 0.5;
  const pccCum = Math.round(pccVolume * 0.0283 * 100) / 100;
  const pccLabourDays = pccCum * 4;
  const pccRate = (4 * rates.cement) + 
                  (0.44 * rates.sand * 35.31) +
                  (0.88 * rates.aggregate * 35.31) +
                  ((pccLabourDays / pccCum) * labourCostPerDay);
  
  boqItems.push({
    srNo: "2",
    description: "Plain Cement Concrete 1:4:8 (150mm thick) including compaction",
    unit: "cum",
    quantity: pccCum,
    rate: Math.round(pccRate),
    amount: Math.round(pccCum * pccRate)
  });
  
  // RCC FOOTING
  const footingVolume = plotArea * 1.5;
  const footingCum = Math.round(footingVolume * 0.0283 * 100) / 100;
  const footingLabourDays = footingCum * 6;
  const footingRate = (8 * rates.cement) + 
                      (0.45 * rates.sand * 35.31) +
                      (0.90 * rates.aggregate * 35.31) +
                      (40 * rates.steel) +
                      ((footingLabourDays / footingCum) * labourCostPerDay);
  
  boqItems.push({
    srNo: "3",
    description: "RCC Work in Footing (M20 grade) including reinforcement, formwork",
    unit: "cum",
    quantity: footingCum,
    rate: Math.round(footingRate),
    amount: Math.round(footingCum * footingRate)
  });
  
  // RCC COLUMNS
  const columnVolumeCft = totalArea * 0.12 * 35.31;
  const columnCum = Math.round(columnVolumeCft * 0.0283 * 100) / 100;
  const columnLabourDays = columnCum * 8;
  const columnRate = (8 * rates.cement) +
                     (0.45 * rates.sand * 35.31) +
                     (0.90 * rates.aggregate * 35.31) +
                     (60 * rates.steel) +
                     ((columnLabourDays / columnCum) * labourCostPerDay);
  
  boqItems.push({
    srNo: "4",
    description: "RCC Work in Columns (M20 grade) with reinforcement & formwork",
    unit: "cum",
    quantity: columnCum,
    rate: Math.round(columnRate),
    amount: Math.round(columnCum * columnRate)
  });
  
  // RCC BEAMS
  const beamVolumeCft = totalArea * 0.18 * 35.31;
  const beamCum = Math.round(beamVolumeCft * 0.0283 * 100) / 100;
  const beamLabourDays = beamCum * 7;
  const beamRate = (8 * rates.cement) +
                   (0.45 * rates.sand * 35.31) +
                   (0.90 * rates.aggregate * 35.31) +
                   (55 * rates.steel) +
                   ((beamLabourDays / beamCum) * labourCostPerDay);
  
  boqItems.push({
    srNo: "5",
    description: "RCC Work in Beams (M20 grade) with reinforcement & formwork",
    unit: "cum",
    quantity: beamCum,
    rate: Math.round(beamRate),
    amount: Math.round(beamCum * beamRate)
  });
  
  // RCC SLABS
  const slabVolumeCft = totalArea * 0.42;
  const slabCum = Math.round(slabVolumeCft * 0.0283 * 100) / 100;
  const slabLabourDays = slabCum * 5;
  const slabRate = (8 * rates.cement) +
                   (0.45 * rates.sand * 35.31) +
                   (0.90 * rates.aggregate * 35.31) +
                   (45 * rates.steel) +
                   ((slabLabourDays / slabCum) * labourCostPerDay);
  
  boqItems.push({
    srNo: "6",
    description: "RCC Work in Slab (M20 grade, 125mm thick) with reinforcement",
    unit: "cum",
    quantity: slabCum,
    rate: Math.round(slabRate),
    amount: Math.round(slabCum * slabRate)
  });
  
  // BRICKWORK
  const brickArea = totalArea * 3.5;
  const brickVolumeCft = brickArea * 0.75;
  const brickVolumeCum = Math.round(brickVolumeCft * 0.0283 * 100) / 100;
  const bricksCount = materialQty.bricks;
  const bricksPerCum = bricksCount / brickVolumeCum;
  const brickLabourDays = brickVolumeCum * 3.5;
  const brickRate = (bricksPerCum * rates.bricks) +
                    (1.2 * rates.cement) +
                    (0.3 * rates.sand * 35.31) +
                    ((brickLabourDays / brickVolumeCum) * labourCostPerDay);
  
  boqItems.push({
    srNo: "7",
    description: "Brick Masonry in CM 1:6 (230mm thick) in superstructure",
    unit: "cum",
    quantity: brickVolumeCum,
    rate: Math.round(brickRate),
    amount: Math.round(brickVolumeCum * brickRate)
  });
  
  // PLASTERING
  const plasterArea = brickArea * 2;
  const plasterSqm = Math.round(plasterArea * 0.0929 * 10) / 10;
  const plasterLabourDays = plasterSqm * 0.15;
  const plasterRate = (0.018 * rates.cement) +
                      (0.025 * rates.sand) +
                      ((plasterLabourDays / plasterSqm) * labourCostPerDay);
  
  boqItems.push({
    srNo: "8",
    description: "Cement Plaster 1:4 (12mm thick internal, 15mm external)",
    unit: "sqm",
    quantity: plasterSqm,
    rate: Math.round(plasterRate),
    amount: Math.round(plasterSqm * plasterRate)
  });
  
  // FLOORING
  const flooringSqm = Math.round(totalArea * 0.0929 * 10) / 10;
  const flooringTiles = materialQty.tiles;
  const flooringLabourDays = flooringSqm * 0.25;
  const flooringRate = (flooringTiles / flooringSqm * rates.tiles) +
                       (0.5 * rates.cement) +
                       ((flooringLabourDays / flooringSqm) * labourCostPerDay);
  
  boqItems.push({
    srNo: "9",
    description: "Vitrified Tile Flooring 600x600mm with cement bed & grouting",
    unit: "sqm",
    quantity: flooringSqm,
    rate: Math.round(flooringRate),
    amount: Math.round(flooringSqm * flooringRate)
  });
  
  // PAINTING
  const paintingLtrs = materialQty.paint;
  const paintingLabourDays = plasterSqm * 0.08;
  const paintingRate = (paintingLtrs / plasterSqm * rates.paint) +
                       ((paintingLabourDays / plasterSqm) * labourCostPerDay);
  
  boqItems.push({
    srNo: "10",
    description: "Acrylic Emulsion Paint (2 coats) on plastered surface",
    unit: "sqm",
    quantity: plasterSqm,
    rate: Math.round(paintingRate),
    amount: Math.round(plasterSqm * paintingRate)
  });
  
  // DOORS & WINDOWS
  const doorCount = Math.ceil(totalArea / 300);
  const windowCount = Math.ceil(totalArea / 150);
  const doorRate = buildingType === 'villa' || buildingType === 'luxury' ? 15000 : 12000;
  const windowRate = buildingType === 'villa' || buildingType === 'luxury' ? 10500 : 8500;
  
  boqItems.push({
    srNo: "11",
    description: "Flush Doors with Frame, Hardware & Painting",
    unit: "nos",
    quantity: doorCount,
    rate: doorRate,
    amount: doorCount * doorRate
  });
  
  boqItems.push({
    srNo: "12",
    description: "Aluminium Sliding Windows with Glass & Fittings",
    unit: "nos",
    quantity: windowCount,
    rate: windowRate,
    amount: windowCount * windowRate
  });
  
  // ELECTRICAL
  boqItems.push({
    srNo: "13",
    description: "Electrical Wiring, Fittings & Fixtures (Complete installation)",
    unit: "sqft",
    quantity: totalArea,
    rate: 150,
    amount: Math.round(totalArea * 150)
  });
  
  // PLUMBING
  boqItems.push({
    srNo: "14",
    description: "Plumbing, Sanitary Installation & Fixtures (Complete system)",
    unit: "sqft",
    quantity: totalArea,
    rate: 120,
    amount: Math.round(totalArea * 120)
  });
  
  // WATERPROOFING
  const waterproofSqm = Math.round(plotArea * 0.0929 * 10) / 10;
  boqItems.push({
    srNo: "15",
    description: "Terrace Waterproofing (Polymer based membrane with protection)",
    unit: "sqm",
    quantity: waterproofSqm,
    rate: 450,
    amount: Math.round(waterproofSqm * 450)
  });
  
  const subtotal = boqItems.reduce((sum, item) => sum + item.amount, 0);
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;
  
  const materialSummary = {
    cement: {
      quantity: materialQty.cement,
      unit: "bags",
      rate: rates.cement,
      amount: Math.round(materialQty.cement * rates.cement)
    },
    steel: {
      quantity: materialQty.steel,
      unit: "kg",
      rate: rates.steel,
      amount: Math.round(materialQty.steel * rates.steel)
    },
    sand: {
      quantity: materialQty.sand,
      unit: "cft",
      rate: rates.sand,
      amount: Math.round(materialQty.sand * rates.sand)
    },
    aggregate: {
      quantity: materialQty.aggregate,
      unit: "cft",
      rate: rates.aggregate,
      amount: Math.round(materialQty.aggregate * rates.aggregate)
    },
    bricks: {
      quantity: materialQty.bricks,
      unit: "nos",
      rate: rates.bricks,
      amount: Math.round(materialQty.bricks * rates.bricks)
    }
  };
  
  return {
    items: boqItems,
    summary: { subtotal, gst, grandTotal, totalItems: boqItems.length },
    materialSummary,
    notes: [
      "All rates are inclusive of material, labour, and contractor profit",
      "Material rates based on your custom inputs or default market rates",
      "Labour calculated using realistic man-days per unit (4-8 days/cum for RCC)",
      "GST @ 18% applicable as per current tax regulations",
      "Quantities calculated using standard thumb rules for RCC construction",
      "Rates subject to ±5% variation based on site conditions and market"
    ]
  };
}