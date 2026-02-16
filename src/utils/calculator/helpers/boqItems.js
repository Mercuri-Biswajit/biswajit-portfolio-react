/* eslint-disable no-unused-vars */
// ═══════════════════════════════════════════════════════════════════════════
// BOQ ITEM CREATORS
// ═══════════════════════════════════════════════════════════════════════════

import {
  calcExcavationVolume,
  calcPCCVolume,
  calcRCCVolume,
  calcBrickworkVolume,
  calcPlasterArea,
  calcFlooringArea,
} from "./volumeCalculations";

import {
  calcPCCRate,
  calcRCCRate,
  calcBrickworkRate,
  calcPlasterRate,
  calcFlooringRate,
  calcPaintingRate,
} from "./rateCalculations";

/**
 * Create excavation BOQ item
 */
export function createExcavationItem(srNo, plotArea, includeBasement, basementDepth) {
  const quantity = calcExcavationVolume(plotArea, includeBasement, basementDepth);
  const rate = 120;
  
  return {
    srNo,
    description: "Earthwork in Excavation for Foundation & Levelling",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate)
  };
}

/**
 * Create PCC BOQ item
 */
export function createPCCItem(srNo, plotArea, rates, labourCostPerDay) {
  const quantity = calcPCCVolume(plotArea);
  const rate = Math.round(calcPCCRate(rates, labourCostPerDay));
  
  return {
    srNo,
    description: "Plain Cement Concrete 1:4:8 (150mm thick) including compaction",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate)
  };
}

/**
 * Create RCC footing BOQ item
 */
export function createFootingItem(srNo, plotArea, rates, labourCostPerDay) {
  const quantity = calcRCCVolume(plotArea, 1.5 / plotArea);
  const rate = Math.round(calcRCCRate(8, 40, 6, rates, labourCostPerDay));
  
  return {
    srNo,
    description: "RCC Work in Footing (M20 grade) including reinforcement, formwork",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate)
  };
}

/**
 * Create RCC columns BOQ item
 */
export function createColumnsItem(srNo, totalArea, rates, labourCostPerDay) {
  const quantity = calcRCCVolume(totalArea, 0.12 * 35.31);
  const rate = Math.round(calcRCCRate(8, 60, 8, rates, labourCostPerDay));
  
  return {
    srNo,
    description: "RCC Work in Columns (M20 grade) with reinforcement & formwork",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate)
  };
}

/**
 * Create RCC beams BOQ item
 */
export function createBeamsItem(srNo, totalArea, rates, labourCostPerDay) {
  const quantity = calcRCCVolume(totalArea, 0.18 * 35.31);
  const rate = Math.round(calcRCCRate(8, 55, 7, rates, labourCostPerDay));
  
  return {
    srNo,
    description: "RCC Work in Beams (M20 grade) with reinforcement & formwork",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate)
  };
}

/**
 * Create RCC slab BOQ item
 */
export function createSlabItem(srNo, totalArea, rates, labourCostPerDay) {
  const quantity = calcRCCVolume(totalArea, 0.42);
  const rate = Math.round(calcRCCRate(8, 45, 5, rates, labourCostPerDay));
  
  return {
    srNo,
    description: "RCC Work in Slab (M20 grade, 125mm thick) with reinforcement",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate)
  };
}

/**
 * Create brickwork BOQ item
 */
export function createBrickworkItem(srNo, totalArea, materialQty, rates, labourCostPerDay) {
  const quantity = calcBrickworkVolume(totalArea);
  const bricksPerCum = materialQty.bricks / quantity;
  const rate = Math.round(calcBrickworkRate(bricksPerCum, rates, labourCostPerDay));
  
  return {
    srNo,
    description: "Brick Masonry in CM 1:6 (230mm thick) in superstructure",
    unit: "cum",
    quantity,
    rate,
    amount: Math.round(quantity * rate)
  };
}

/**
 * Create plastering BOQ item
 */
export function createPlasteringItem(srNo, totalArea, rates, labourCostPerDay) {
  const quantity = calcPlasterArea(totalArea);
  const rate = Math.round(calcPlasterRate(rates, labourCostPerDay));
  
  return {
    srNo,
    description: "Cement Plaster 1:4 (12mm thick internal, 15mm external)",
    unit: "sqm",
    quantity,
    rate,
    amount: Math.round(quantity * rate)
  };
}

/**
 * Create flooring BOQ item
 */
export function createFlooringItem(srNo, totalArea, materialQty, rates, labourCostPerDay) {
  const quantity = calcFlooringArea(totalArea);
  const tilesPerSqm = materialQty.tiles / quantity;
  const rate = Math.round(calcFlooringRate(tilesPerSqm, rates, labourCostPerDay));
  
  return {
    srNo,
    description: "Vitrified Tile Flooring 600x600mm with cement bed & grouting",
    unit: "sqm",
    quantity,
    rate,
    amount: Math.round(quantity * rate)
  };
}

/**
 * Create painting BOQ item
 */
export function createPaintingItem(srNo, totalArea, materialQty, rates, labourCostPerDay) {
  const plasterSqm = calcPlasterArea(totalArea);
  const paintLtrsPerSqm = materialQty.paint / plasterSqm;
  const rate = Math.round(calcPaintingRate(paintLtrsPerSqm, rates, labourCostPerDay));
  
  return {
    srNo,
    description: "Acrylic Emulsion Paint (2 coats) on plastered surface",
    unit: "sqm",
    quantity: plasterSqm,
    rate,
    amount: Math.round(plasterSqm * rate)
  };
}

/**
 * Create doors BOQ item
 */
export function createDoorsItem(srNo, totalArea, buildingType) {
  const quantity = Math.ceil(totalArea / 300);
  const rate = buildingType === 'villa' || buildingType === 'luxury' ? 15000 : 12000;
  
  return {
    srNo,
    description: "Flush Doors with Frame, Hardware & Painting",
    unit: "nos",
    quantity,
    rate,
    amount: quantity * rate
  };
}

/**
 * Create windows BOQ item
 */
export function createWindowsItem(srNo, totalArea, buildingType) {
  const quantity = Math.ceil(totalArea / 150);
  const rate = buildingType === 'villa' || buildingType === 'luxury' ? 10500 : 8500;
  
  return {
    srNo,
    description: "Aluminium Sliding Windows with Glass & Fittings",
    unit: "nos",
    quantity,
    rate,
    amount: quantity * rate
  };
}

/**
 * Create electrical BOQ item
 */
export function createElectricalItem(srNo, totalArea) {
  const rate = 150;
  
  return {
    srNo,
    description: "Electrical Wiring, Fittings & Fixtures (Complete installation)",
    unit: "sqft",
    quantity: totalArea,
    rate,
    amount: Math.round(totalArea * rate)
  };
}

/**
 * Create plumbing BOQ item
 */
export function createPlumbingItem(srNo, totalArea) {
  const rate = 120;
  
  return {
    srNo,
    description: "Plumbing, Sanitary Installation & Fixtures (Complete system)",
    unit: "sqft",
    quantity: totalArea,
    rate,
    amount: Math.round(totalArea * rate)
  };
}

/**
 * Create waterproofing BOQ item
 */
export function createWaterproofingItem(srNo, plotArea) {
  const quantity = Math.round(plotArea * 0.0929 * 10) / 10;
  const rate = 450;
  
  return {
    srNo,
    description: "Terrace Waterproofing (Polymer based membrane with protection)",
    unit: "sqm",
    quantity,
    rate,
    amount: Math.round(quantity * rate)
  };
}
