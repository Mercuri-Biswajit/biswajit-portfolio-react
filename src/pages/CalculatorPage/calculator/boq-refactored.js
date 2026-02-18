// ═══════════════════════════════════════════════════════════════════════════
// REFACTORED BOQ CALCULATOR - MODULAR APPROACH
// Breaking down calcFullBOQ into smaller, testable functions
// ═══════════════════════════════════════════════════════════════════════════

import { THUMB_RULES, MATERIAL_RATES } from "../../config/calculatorConstants";

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS - Calculate volumes and quantities
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate excavation volume in cubic meters
 */
function calcExcavationVolume(plotArea, includeBasement, basementDepth) {
  const depthFt = includeBasement ? basementDepth + 3 : 3;
  const volumeCft = plotArea * depthFt;
  return Math.round(volumeCft * 0.0283 * 100) / 100;
}

/**
 * Calculate PCC (Plain Cement Concrete) volume
 */
function calcPCCVolume(plotArea) {
  const volumeCft = plotArea * 0.5;
  return Math.round(volumeCft * 0.0283 * 100) / 100;
}

/**
 * Calculate RCC element volume (footing, columns, beams, slabs)
 */
function calcRCCVolume(totalArea, factorCft) {
  const volumeCft = totalArea * factorCft;
  return Math.round(volumeCft * 0.0283 * 100) / 100;
}

/**
 * Calculate brickwork volume
 */
function calcBrickworkVolume(totalArea) {
  const brickArea = totalArea * 3.5;
  const volumeCft = brickArea * 0.75;
  return Math.round(volumeCft * 0.0283 * 100) / 100;
}

/**
 * Calculate plastering area in square meters
 */
function calcPlasterArea(totalArea) {
  const brickArea = totalArea * 3.5;
  const plasterArea = brickArea * 2;
  return Math.round(plasterArea * 0.0929 * 10) / 10;
}

/**
 * Calculate flooring area in square meters
 */
function calcFlooringArea(totalArea) {
  return Math.round(totalArea * 0.0929 * 10) / 10;
}

// ═══════════════════════════════════════════════════════════════════════════
// RATE CALCULATION FUNCTIONS - Calculate cost per unit
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate PCC rate per cum
 */
function calcPCCRate(rates, labourCostPerDay) {
  const labourDaysPerCum = 4;
  return (
    4 * rates.cement +
    0.44 * rates.sand * 35.31 +
    0.88 * rates.aggregate * 35.31 +
    labourDaysPerCum * labourCostPerDay
  );
}

/**
 * Calculate RCC rate per cum
 * @param {number} cementBags - Cement bags per cum
 * @param {number} steelKg - Steel kg per cum
 * @param {number} labourDaysPerCum - Labour days per cum
 */
function calcRCCRate(
  cementBags,
  steelKg,
  labourDaysPerCum,
  rates,
  labourCostPerDay,
) {
  return (
    cementBags * rates.cement +
    0.45 * rates.sand * 35.31 +
    0.9 * rates.aggregate * 35.31 +
    steelKg * rates.steel +
    labourDaysPerCum * labourCostPerDay
  );
}

/**
 * Calculate brickwork rate per cum
 */
function calcBrickworkRate(bricksPerCum, rates, labourCostPerDay) {
  const labourDaysPerCum = 3.5;
  return (
    bricksPerCum * rates.bricks +
    1.2 * rates.cement +
    0.3 * rates.sand * 35.31 +
    labourDaysPerCum * labourCostPerDay
  );
}

/**
 * Calculate plastering rate per sqm
 */
function calcPlasterRate(rates, labourCostPerDay) {
  const labourDaysPerSqm = 0.15;
  return (
    0.018 * rates.cement +
    0.025 * rates.sand +
    labourDaysPerSqm * labourCostPerDay
  );
}

/**
 * Calculate flooring rate per sqm
 */
function calcFlooringRate(tilesPerSqm, rates, labourCostPerDay) {
  const labourDaysPerSqm = 0.25;
  return (
    tilesPerSqm * rates.tiles +
    0.5 * rates.cement +
    labourDaysPerSqm * labourCostPerDay
  );
}

/**
 * Calculate painting rate per sqm
 */
function calcPaintingRate(paintLtrsPerSqm, rates, labourCostPerDay) {
  const labourDaysPerSqm = 0.08;
  return paintLtrsPerSqm * rates.paint + labourDaysPerSqm * labourCostPerDay;
}

// ═══════════════════════════════════════════════════════════════════════════
// BOQ ITEM CREATORS - Create individual BOQ items
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Create excavation BOQ item
 */
function createExcavationItem(srNo, plotArea, includeBasement, basementDepth) {
  const quantity = calcExcavationVolume(
    plotArea,
    includeBasement,
    basementDepth,
  );
  const rate = 120;

  return {
    srNo,
    description: "Earthwork in Excavation for Foundation & Levelling",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate),
  };
}

/**
 * Create PCC BOQ item
 */
function createPCCItem(srNo, plotArea, rates, labourCostPerDay) {
  const quantity = calcPCCVolume(plotArea);
  const rate = Math.round(calcPCCRate(rates, labourCostPerDay));

  return {
    srNo,
    description:
      "Plain Cement Concrete 1:4:8 (150mm thick) including compaction",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate),
  };
}

/**
 * Create RCC footing BOQ item
 */
function createFootingItem(srNo, plotArea, rates, labourCostPerDay) {
  const quantity = calcRCCVolume(plotArea, 1.5 / plotArea);
  const rate = Math.round(calcRCCRate(8, 40, 6, rates, labourCostPerDay));

  return {
    srNo,
    description:
      "RCC Work in Footing (M20 grade) including reinforcement, formwork",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate),
  };
}

/**
 * Create RCC columns BOQ item
 */
function createColumnsItem(srNo, totalArea, rates, labourCostPerDay) {
  const quantity = calcRCCVolume(totalArea, 0.12 * 35.31);
  const rate = Math.round(calcRCCRate(8, 60, 8, rates, labourCostPerDay));

  return {
    srNo,
    description:
      "RCC Work in Columns (M20 grade) with reinforcement & formwork",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate),
  };
}

/**
 * Create RCC beams BOQ item
 */
function createBeamsItem(srNo, totalArea, rates, labourCostPerDay) {
  const quantity = calcRCCVolume(totalArea, 0.18 * 35.31);
  const rate = Math.round(calcRCCRate(8, 55, 7, rates, labourCostPerDay));

  return {
    srNo,
    description: "RCC Work in Beams (M20 grade) with reinforcement & formwork",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate),
  };
}

/**
 * Create RCC slab BOQ item
 */
function createSlabItem(srNo, totalArea, rates, labourCostPerDay) {
  const quantity = calcRCCVolume(totalArea, 0.42);
  const rate = Math.round(calcRCCRate(8, 45, 5, rates, labourCostPerDay));

  return {
    srNo,
    description: "RCC Work in Slab (M20 grade, 125mm thick) with reinforcement",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate),
  };
}

/**
 * Create brickwork BOQ item
 */
function createBrickworkItem(
  srNo,
  totalArea,
  materialQty,
  rates,
  labourCostPerDay,
) {
  const quantity = calcBrickworkVolume(totalArea);
  const bricksPerCum = materialQty.bricks / quantity;
  const rate = Math.round(
    calcBrickworkRate(bricksPerCum, rates, labourCostPerDay),
  );

  return {
    srNo,
    description: "Brick Masonry in CM 1:6 (230mm thick) in superstructure",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate),
  };
}

/**
 * Create plastering BOQ item
 */
function createPlasteringItem(srNo, totalArea, rates, labourCostPerDay) {
  const quantity = calcPlasterArea(totalArea);
  const rate = Math.round(calcPlasterRate(rates, labourCostPerDay));

  return {
    srNo,
    description: "Cement Plaster 1:4 (12mm thick internal, 15mm external)",
    unit: "sqm",
    quantity,
    rate,
    amount: Math.round(quantity * rate),
  };
}

/**
 * Create flooring BOQ item
 */
function createFlooringItem(
  srNo,
  totalArea,
  materialQty,
  rates,
  labourCostPerDay,
) {
  const quantity = calcFlooringArea(totalArea);
  const tilesPerSqm = materialQty.tiles / quantity;
  const rate = Math.round(
    calcFlooringRate(tilesPerSqm, rates, labourCostPerDay),
  );

  return {
    srNo,
    description: "Vitrified Tile Flooring 600x600mm with cement bed & grouting",
    unit: "sqm",
    quantity,
    rate,
    amount: Math.round(quantity * rate),
  };
}

/**
 * Create painting BOQ item
 */
function createPaintingItem(
  srNo,
  totalArea,
  materialQty,
  rates,
  labourCostPerDay,
) {
  const plasterSqm = calcPlasterArea(totalArea);
  const paintLtrsPerSqm = materialQty.paint / plasterSqm;
  const rate = Math.round(
    calcPaintingRate(paintLtrsPerSqm, rates, labourCostPerDay),
  );

  return {
    srNo,
    description: "Acrylic Emulsion Paint (2 coats) on plastered surface",
    unit: "sqm",
    quantity: plasterSqm,
    rate,
    amount: Math.round(plasterSqm * rate),
  };
}

/**
 * Create doors BOQ item
 */
function createDoorsItem(srNo, totalArea, buildingType) {
  const quantity = Math.ceil(totalArea / 300);
  const rate =
    buildingType === "villa" || buildingType === "luxury" ? 15000 : 12000;

  return {
    srNo,
    description: "Flush Doors with Frame, Hardware & Painting",
    unit: "nos",
    quantity,
    rate,
    amount: quantity * rate,
  };
}

/**
 * Create windows BOQ item
 */
function createWindowsItem(srNo, totalArea, buildingType) {
  const quantity = Math.ceil(totalArea / 150);
  const rate =
    buildingType === "villa" || buildingType === "luxury" ? 10500 : 8500;

  return {
    srNo,
    description: "Aluminium Sliding Windows with Glass & Fittings",
    unit: "nos",
    quantity,
    rate,
    amount: quantity * rate,
  };
}

/**
 * Create electrical BOQ item
 */
function createElectricalItem(srNo, totalArea) {
  const rate = 150;

  return {
    srNo,
    description:
      "Electrical Wiring, Fittings & Fixtures (Complete installation)",
    unit: "sqft",
    quantity: totalArea,
    rate,
    amount: Math.round(totalArea * rate),
  };
}

/**
 * Create plumbing BOQ item
 */
function createPlumbingItem(srNo, totalArea) {
  const rate = 120;

  return {
    srNo,
    description: "Plumbing, Sanitary Installation & Fixtures (Complete system)",
    unit: "sqft",
    quantity: totalArea,
    rate,
    amount: Math.round(totalArea * rate),
  };
}

/**
 * Create waterproofing BOQ item
 */
function createWaterproofingItem(srNo, plotArea) {
  const quantity = Math.round(plotArea * 0.0929 * 10) / 10;
  const rate = 450;

  return {
    srNo,
    description:
      "Terrace Waterproofing (Polymer based membrane with protection)",
    unit: "sqm",
    quantity,
    rate,
    amount: Math.round(quantity * rate),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// MATERIAL SUMMARY CALCULATOR
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate material summary from quantities
 */
function calcMaterialSummary(materialQty, rates) {
  return {
    cement: {
      quantity: materialQty.cement,
      unit: "bags",
      rate: rates.cement,
      amount: Math.round(materialQty.cement * rates.cement),
    },
    steel: {
      quantity: materialQty.steel,
      unit: "kg",
      rate: rates.steel,
      amount: Math.round(materialQty.steel * rates.steel),
    },
    sand: {
      quantity: materialQty.sand,
      unit: "cft",
      rate: rates.sand,
      amount: Math.round(materialQty.sand * rates.sand),
    },
    aggregate: {
      quantity: materialQty.aggregate,
      unit: "cft",
      rate: rates.aggregate,
      amount: Math.round(materialQty.aggregate * rates.aggregate),
    },
    bricks: {
      quantity: materialQty.bricks,
      unit: "nos",
      rate: rates.bricks,
      amount: Math.round(materialQty.bricks * rates.bricks),
    },
  };
}

/**
 * Calculate material quantities based on area
 */
function calcMaterialQuantities(totalArea) {
  return {
    cement: Math.round(totalArea * THUMB_RULES.cement_bags_per_sqft),
    steel: Math.round(totalArea * THUMB_RULES.steel_kg_per_sqft),
    sand: Math.round(totalArea * THUMB_RULES.sand_cft_per_sqft),
    aggregate: Math.round(totalArea * THUMB_RULES.aggregate_cft_per_sqft),
    bricks: Math.round(totalArea * THUMB_RULES.bricks_per_sqft),
    paint: Math.round(totalArea * THUMB_RULES.paint_ltr_per_sqft * 10) / 10,
    tiles: Math.round(totalArea * THUMB_RULES.tiles_sqft_per_sqft),
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN BOQ CALCULATION FUNCTION - REFACTORED
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Calculate Full BOQ - Refactored version with smaller functions
 */
export function calcFullBOQ(inputs) {
  const {
    length,
    breadth,
    floors,
    customRates,
    includeBasement,
    basementDepth,
    buildingType,
  } = inputs;

  // Calculate areas
  const plotArea = length * breadth;
  const totalArea = plotArea * floors + (includeBasement ? plotArea : 0);

  // Setup rates
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

  const labourCostPerDay = rates.labour;
  const materialQty = calcMaterialQuantities(totalArea);

  // Create BOQ items using modular functions
  const boqItems = [
    createExcavationItem("1", plotArea, includeBasement, basementDepth),
    createPCCItem("2", plotArea, rates, labourCostPerDay),
    createFootingItem("3", plotArea, rates, labourCostPerDay),
    createColumnsItem("4", totalArea, rates, labourCostPerDay),
    createBeamsItem("5", totalArea, rates, labourCostPerDay),
    createSlabItem("6", totalArea, rates, labourCostPerDay),
    createBrickworkItem("7", totalArea, materialQty, rates, labourCostPerDay),
    createPlasteringItem("8", totalArea, rates, labourCostPerDay),
    createFlooringItem("9", totalArea, materialQty, rates, labourCostPerDay),
    createPaintingItem("10", totalArea, materialQty, rates, labourCostPerDay),
    createDoorsItem("11", totalArea, buildingType),
    createWindowsItem("12", totalArea, buildingType),
    createElectricalItem("13", totalArea),
    createPlumbingItem("14", totalArea),
    createWaterproofingItem("15", plotArea),
  ];

  // Calculate totals
  const subtotal = boqItems.reduce((sum, item) => sum + item.amount, 0);
  const gst = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + gst;

  return {
    items: boqItems,
    summary: {
      subtotal,
      gst,
      grandTotal,
      totalItems: boqItems.length,
    },
    materialSummary: calcMaterialSummary(materialQty, rates),
    notes: [
      "All rates are inclusive of material, labour, and contractor profit",
      "Material rates based on your custom inputs or default market rates",
      "Labour calculated using realistic man-days per unit (4-8 days/cum for RCC)",
      "GST @ 18% applicable as per current tax regulations",
      "Quantities calculated using standard thumb rules for RCC construction",
      "Rates subject to ±5% variation based on site conditions and market",
    ],
  };
}
