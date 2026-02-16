/* eslint-disable no-unused-vars */
// ═══════════════════════════════════════════════════════════════════════════
// FULL BOQ CALCULATOR
// ═══════════════════════════════════════════════════════════════════════════

import { MATERIAL_RATES } from "../../../config/calculatorConstants";
import { calcMaterialQuantities, calcMaterialSummary } from "../helpers/materialCalculations";
import {
  createExcavationItem,
  createPCCItem,
  createFootingItem,
  createColumnsItem,
  createBeamsItem,
  createSlabItem,
  createBrickworkItem,
  createPlasteringItem,
  createFlooringItem,
  createPaintingItem,
  createDoorsItem,
  createWindowsItem,
  createElectricalItem,
  createPlumbingItem,
  createWaterproofingItem,
} from "../helpers/boqItems";

/**
 * Calculate Full BOQ - Refactored version with smaller functions
 */
export function calcFullBOQ(inputs) {
  const { 
    length, breadth, floors, customRates, 
    includeBasement, basementDepth, buildingType 
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
    labour: MATERIAL_RATES.labour.rate
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
    createWaterproofingItem("15", plotArea)
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
      totalItems: boqItems.length 
    },
    materialSummary: calcMaterialSummary(materialQty, rates),
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
