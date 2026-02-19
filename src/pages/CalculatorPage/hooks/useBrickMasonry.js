/* eslint-disable no-unused-vars */
import { useState } from "react";

const DEFAULT_INPUTS = {
  // Wall dimensions
  wallLength: "",
  wallHeight: "",
  wallThickness: "9", // inches: 4.5, 9, 13.5
  // Openings
  numDoors: "1",
  doorWidth: "3.5", // ft
  doorHeight: "7", // ft
  numWindows: "2",
  windowWidth: "4", // ft
  windowHeight: "4", // ft
  // Mortar
  mortarRatio: "1:6", // CM ratio
  // Brick type
  brickType: "standard", // standard | flyash | hollow
  // Wastage
  wastagePercent: "5",
};

// Brick sizes (mm): L x W x H
const BRICK_SIZES = {
  standard: {
    L: 230,
    W: 115,
    H: 75,
    label: "Standard Clay Brick (230×115×75mm)",
  },
  flyash: { L: 230, W: 110, H: 90, label: "Fly-Ash Brick (230×110×90mm)" },
  hollow: {
    L: 400,
    W: 200,
    H: 200,
    label: "Hollow Concrete Block (400×200×200mm)",
  },
};

const MORTAR_JOINT = 10; // mm

// Mortar proportions (cement : sand) → cement bags & sand cft per cum of mortar
const MORTAR_DATA = {
  "1:3": { cementBagsPerCum: 16.0, sandCftPerCum: 48.0 },
  "1:4": { cementBagsPerCum: 12.5, sandCftPerCum: 50.0 },
  "1:5": { cementBagsPerCum: 10.2, sandCftPerCum: 51.0 },
  "1:6": { cementBagsPerCum: 8.5, sandCftPerCum: 51.0 },
  "1:8": { cementBagsPerCum: 6.5, sandCftPerCum: 52.0 },
};

// Approximate mortar volume fraction by wall thickness
const MORTAR_FRACTION = 0.3; // ~30% of brickwork is mortar

export function calcBrickMasonry(inputs) {
  const {
    wallLength,
    wallHeight,
    wallThickness,
    numDoors,
    doorWidth,
    doorHeight,
    numWindows,
    windowWidth,
    windowHeight,
    mortarRatio,
    brickType,
    wastagePercent,
  } = inputs;

  const L = parseFloat(wallLength) || 0;
  const H = parseFloat(wallHeight) || 0;
  const Th = parseFloat(wallThickness); // inches
  const ThM = Th * 0.0254; // metres

  const nd = parseInt(numDoors) || 0;
  const dW = parseFloat(doorWidth) || 0;
  const dH = parseFloat(doorHeight) || 0;
  const nw = parseInt(numWindows) || 0;
  const wW = parseFloat(windowWidth) || 0;
  const wH = parseFloat(windowHeight) || 0;
  const waste = (parseFloat(wastagePercent) || 5) / 100;

  if (L <= 0 || H <= 0) return null;

  // Areas (sq ft)
  const grossArea = L * H;
  const doorArea = nd * dW * dH;
  const windowArea = nw * wW * wH;
  const netArea = Math.max(0, grossArea - doorArea - windowArea);

  // Convert to metres
  const netAreaM2 = netArea * 0.0929;

  // Volume of brickwork (cum)
  const brickworkVolCum = netAreaM2 * ThM;

  // Brick dimensions with mortar joint
  const brick = BRICK_SIZES[brickType];
  const bL = (brick.L + MORTAR_JOINT) / 1000; // m
  const bW = (brick.W + MORTAR_JOINT) / 1000;
  const bH = (brick.H + MORTAR_JOINT) / 1000;

  // Bricks per cum of brickwork
  // One brick volume (with joint) in the wall plane depends on wall thickness
  // For 9" (one-brick) wall: bricks laid in stretcher + header bond
  // Simplified: 1 / (bL × bH × ThM) but clamped to realistic range
  const bricksPerCum = 1 / ((bL * bH * (brick.W + MORTAR_JOINT)) / 1000);

  // Practical bricks per cum (IS standard)
  const bricksPerCumPractical =
    brickType === "hollow"
      ? Math.round(
          1 /
            ((((((brick.L + MORTAR_JOINT) / 1000) * (brick.H + MORTAR_JOINT)) /
              1000) *
              (brick.W + MORTAR_JOINT)) /
              1000),
        )
      : Math.round(bricksPerCum);

  const bricksNet = Math.round(brickworkVolCum * bricksPerCumPractical);
  const bricksWithWaste = Math.round(bricksNet * (1 + waste));

  // Mortar
  const mortarVolCum = brickworkVolCum * MORTAR_FRACTION;
  const md = MORTAR_DATA[mortarRatio] || MORTAR_DATA["1:6"];
  const cementBags = Math.round(mortarVolCum * md.cementBagsPerCum * 10) / 10;
  const sandCft = Math.round(mortarVolCum * md.sandCftPerCum * 10) / 10;

  // Labour (mason + helper): ~3.5 mason-days per cum for 9" wall
  const labourFactor = Th <= 4.5 ? 3.0 : Th <= 9 ? 3.5 : 4.2;
  const masonDays = Math.round(brickworkVolCum * labourFactor * 10) / 10;
  const helperDays = Math.round(masonDays * 1.5 * 10) / 10;

  return {
    grossArea: Math.round(grossArea * 10) / 10,
    doorArea: Math.round(doorArea * 10) / 10,
    windowArea: Math.round(windowArea * 10) / 10,
    netArea: Math.round(netArea * 10) / 10,
    netAreaM2: Math.round(netAreaM2 * 10) / 10,
    brickworkVolCum: Math.round(brickworkVolCum * 100) / 100,
    bricksPerCum: bricksPerCumPractical,
    bricksNet,
    bricksWithWaste,
    wastageCount: bricksWithWaste - bricksNet,
    mortarVolCum: Math.round(mortarVolCum * 100) / 100,
    cementBags,
    sandCft,
    masonDays,
    helperDays,
    wallThicknessLabel: `${Th}"`,
    brickLabel: BRICK_SIZES[brickType].label,
    mortarRatio,
  };
}

export function useBrickMasonry() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const calculate = () => {
    const r = calcBrickMasonry(inputs);
    setResults(r || { error: "Please enter valid wall dimensions." });
  };

  const reset = () => {
    setInputs(DEFAULT_INPUTS);
    setResults(null);
  };

  return { inputs, results, handleInputChange, calculate, reset };
}
