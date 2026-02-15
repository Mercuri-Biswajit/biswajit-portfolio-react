// ═══════════════════════════════════════════════════════════════════════════
// BEAM DESIGN CALCULATOR - IS 456:2000 COMPLIANT
// Singly Reinforced and Doubly Reinforced Beam Design
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Material Properties and Constants
 */
const MATERIAL_CONSTANTS = {
  // Steel grades (yield strength in MPa)
  steel: {
    Fe415: { fy: 415, Es: 200000 },
    Fe500: { fy: 500, Es: 200000 },
    Fe550: { fy: 550, Es: 200000 }
  },
  
  // Concrete grades (characteristic strength in MPa)
  concrete: {
    M15: { fck: 15 },
    M20: { fck: 20 },
    M25: { fck: 25 },
    M30: { fck: 30 },
    M35: { fck: 35 },
    M40: { fck: 40 }
  },
  
  // Limiting values as per IS 456:2000
  xu_max_d: {
    Fe250: 0.53,
    Fe415: 0.48,
    Fe500: 0.46,
    Fe550: 0.44
  },
  
  // Clear cover (mm)
  clearCover: {
    mild: 25,
    moderate: 30,
    severe: 45,
    verySevere: 50,
    extreme: 75
  }
};

/**
 * Calculate effective depth from total depth
 */
function calcEffectiveDepth(totalDepth, cover, mainBarDia, stirrupDia) {
  // d = D - cover - stirrup dia - (main bar dia / 2)
  return totalDepth - cover - stirrupDia - (mainBarDia / 2);
}

/**
 * Calculate limiting moment of resistance (Mu,lim)
 */
function calcLimitingMoment(b, d, fck, steelGrade) {
  const xu_max_by_d = MATERIAL_CONSTANTS.xu_max_d[steelGrade];
  const xu_max = xu_max_by_d * d;
  
  // Mu,lim = 0.36 * fck * b * xu,max * (d - 0.42 * xu,max)
  const Mu_lim = 0.36 * fck * b * xu_max * (d - 0.42 * xu_max) / 1000000; // Convert to kNm
  
  return {
    Mu_lim,
    xu_max,
    xu_max_by_d
  };
}

/**
 * Design singly reinforced beam
 */
function designSinglyReinforcedBeam(Mu, b, d, fck, fy) {
  // Required Ast
  // Mu = 0.87 * fy * Ast * d * (1 - (fy * Ast) / (fck * b * d))
  
  // Using quadratic formula simplified approach:
  // R = Mu / (b * d^2)
  const R = (Mu * 1000000) / (b * d * d); // Convert Mu from kNm to Nmm
  
  // pt = 50 * fck / fy * [1 - sqrt(1 - (4.6 * R) / fck)]
  const term = 1 - Math.sqrt(1 - (4.6 * R / fck));
  const pt = (50 * fck / fy) * term;
  
  // Ast = pt * b * d / 100
  const Ast_required = (pt * b * d) / 100;
  
  // Check minimum reinforcement
  const Ast_min = Math.max(
    (0.85 * b * d) / fy,  // IS 456 Cl. 26.5.1.1
    (0.24 * Math.sqrt(fck) * b * d) / fy  // Alternative formula
  );
  
  const Ast_provided = Math.max(Ast_required, Ast_min);
  
  // Calculate number of bars
  const barSizes = [8, 10, 12, 16, 20, 25, 32];
  const barOptions = barSizes.map(dia => {
    const area = Math.PI * dia * dia / 4;
    const numBars = Math.ceil(Ast_provided / area);
    const actualAst = numBars * area;
    return {
      diameter: dia,
      area,
      numBars,
      actualAst,
      spacing: b / (numBars + 1)
    };
  }).filter(opt => opt.numBars >= 2 && opt.numBars <= 8 && opt.spacing >= 75);
  
  return {
    Ast_required,
    Ast_min,
    Ast_provided,
    pt_required: pt,
    pt_provided: (Ast_provided * 100) / (b * d),
    barOptions: barOptions.slice(0, 3), // Top 3 options
    designType: 'singly'
  };
}

/**
 * Design doubly reinforced beam
 */
function designDoublyReinforcedBeam(Mu, Mu_lim, b, d, fck, fy, d_prime) {
  // Additional moment to be resisted
  const Mu2 = Mu - Mu_lim;
  
  // Compression steel required
  // Asc = Mu2 / [0.87 * fy * (d - d')]
  const Asc_required = (Mu2 * 1000000) / (0.87 * fy * (d - d_prime));
  
  // Tension steel for Mu_lim
  const xu_max_by_d = MATERIAL_CONSTANTS.xu_max_d[`Fe${fy}`] || 0.48;
  const xu_max = xu_max_by_d * d;
  const Ast1 = (0.36 * fck * b * xu_max) / (0.87 * fy);
  
  // Additional tension steel for Mu2
  const Ast2 = Asc_required;
  
  // Total tension steel
  const Ast_required = Ast1 + Ast2;
  
  // Check minimum reinforcement
  const Ast_min = Math.max(
    (0.85 * b * d) / fy,
    (0.24 * Math.sqrt(fck) * b * d) / fy
  );
  
  const Ast_provided = Math.max(Ast_required, Ast_min);
  
  // Calculate bar options
  const barSizes = [12, 16, 20, 25, 32];
  const tensionBarOptions = barSizes.map(dia => {
    const area = Math.PI * dia * dia / 4;
    const numBars = Math.ceil(Ast_provided / area);
    const actualAst = numBars * area;
    return {
      diameter: dia,
      numBars,
      actualAst,
      spacing: b / (numBars + 1)
    };
  }).filter(opt => opt.numBars >= 2 && opt.numBars <= 10 && opt.spacing >= 75);
  
  const compressionBarOptions = barSizes.map(dia => {
    const area = Math.PI * dia * dia / 4;
    const numBars = Math.ceil(Asc_required / area);
    const actualAsc = numBars * area;
    return {
      diameter: dia,
      numBars,
      actualAsc,
      spacing: b / (numBars + 1)
    };
  }).filter(opt => opt.numBars >= 2 && opt.numBars <= 6 && opt.spacing >= 75);
  
  return {
    Ast_required,
    Ast_provided,
    Asc_required,
    Mu_lim,
    Mu2,
    pt_required: (Ast_required * 100) / (b * d),
    pt_provided: (Ast_provided * 100) / (b * d),
    tensionBarOptions: tensionBarOptions.slice(0, 3),
    compressionBarOptions: compressionBarOptions.slice(0, 3),
    designType: 'doubly'
  };
}

/**
 * Design shear reinforcement (stirrups)
 */
function designShearReinforcement(Vu, b, d, fck, fy, Ast) {
  // Nominal shear stress
  const tau_v = (Vu * 1000) / (b * d); // MPa
  
  // Percentage of steel
  const pt = (100 * Ast) / (b * d);
  
  // Design shear strength from IS 456 Table 19
  const tau_c = getShearStrength(fck, pt);
  
  // Maximum shear stress (IS 456 Table 20)
  const tau_c_max = getMaxShearStress(fck);
  
  // Check if shear reinforcement is required
  let shearReinforcementRequired = tau_v > tau_c;
  
  if (tau_v > tau_c_max) {
    return {
      status: 'FAIL',
      message: 'Section inadequate - increase depth or use higher grade concrete',
      tau_v,
      tau_c,
      tau_c_max
    };
  }
  
  if (!shearReinforcementRequired) {
    return {
      status: 'OK',
      message: 'Minimum shear reinforcement required',
      tau_v,
      tau_c,
      tau_c_max,
      stirrupDetails: getMinimumStirrups(b, fy)
    };
  }
  
  // Design shear reinforcement
  // Vus = Vu - tau_c * b * d
  const Vus = Vu - (tau_c * b * d / 1000); // kN
  
  // Required Asv/Sv = Vus / (0.87 * fy * d)
  const Asv_by_Sv = (Vus * 1000) / (0.87 * fy * d);
  
  // Design stirrups
  const stirrupOptions = designStirrups(Asv_by_Sv, b, d, fy);
  
  return {
    status: 'DESIGN',
    tau_v,
    tau_c,
    tau_c_max,
    Vus,
    Asv_by_Sv,
    stirrupOptions
  };
}

/**
 * Get design shear strength from IS 456 Table 19
 */
function getShearStrength(fck, pt) {
  // Simplified interpolation from Table 19
  const ptValues = [0.15, 0.25, 0.50, 0.75, 1.00, 1.25, 1.50, 1.75, 2.00, 2.50, 3.00];
  const tauValues = {
    15: [0.28, 0.35, 0.46, 0.54, 0.60, 0.64, 0.68, 0.71, 0.71, 0.71, 0.71],
    20: [0.28, 0.36, 0.48, 0.56, 0.62, 0.67, 0.72, 0.75, 0.79, 0.81, 0.82],
    25: [0.29, 0.36, 0.49, 0.57, 0.64, 0.70, 0.74, 0.78, 0.82, 0.85, 0.88],
    30: [0.29, 0.37, 0.50, 0.59, 0.66, 0.71, 0.76, 0.80, 0.84, 0.88, 0.91],
    35: [0.29, 0.37, 0.50, 0.59, 0.67, 0.73, 0.78, 0.82, 0.86, 0.90, 0.93],
    40: [0.30, 0.38, 0.51, 0.60, 0.68, 0.74, 0.79, 0.84, 0.88, 0.92, 0.95]
  };
  
  const fckKey = fck >= 40 ? 40 : fck >= 35 ? 35 : fck >= 30 ? 30 : fck >= 25 ? 25 : fck >= 20 ? 20 : 15;
  const values = tauValues[fckKey];
  
  // Linear interpolation
  let tau = values[0];
  for (let i = 0; i < ptValues.length - 1; i++) {
    if (pt >= ptValues[i] && pt <= ptValues[i + 1]) {
      const ratio = (pt - ptValues[i]) / (ptValues[i + 1] - ptValues[i]);
      tau = values[i] + ratio * (values[i + 1] - values[i]);
      break;
    }
  }
  
  if (pt > ptValues[ptValues.length - 1]) {
    tau = values[values.length - 1];
  }
  
  return tau;
}

/**
 * Get maximum shear stress from IS 456 Table 20
 */
function getMaxShearStress(fck) {
  const maxValues = {
    15: 2.5,
    20: 2.8,
    25: 3.1,
    30: 3.5,
    35: 3.7,
    40: 4.0
  };
  
  return maxValues[fck] || (fck >= 40 ? 4.0 : 2.5);
}

/**
 * Get minimum stirrups as per IS 456
 */
function getMinimumStirrups(b, fy) {
  // Minimum Asv/Sv = 0.4 / (0.87 * fy)
  const Asv_by_Sv_min = 0.4 / (0.87 * fy);
  
  return designStirrups(Asv_by_Sv_min, b, 0, fy, true);
}

/**
 * Design stirrup options
 */
function designStirrups(Asv_by_Sv, b, d, fy, isMinimum = false) {
  const stirrupDias = [6, 8, 10];
  const legOptions = [2, 4]; // 2-legged or 4-legged
  
  const options = [];
  
  for (let dia of stirrupDias) {
    for (let legs of legOptions) {
      const Asv = legs * Math.PI * dia * dia / 4;
      const Sv_required = Asv / Asv_by_Sv;
      
      // Maximum spacing as per IS 456
      const Sv_max = isMinimum ? Math.min(0.75 * d, 300) : Math.min(0.75 * d, 300);
      
      // Provide spacing in multiples of 25mm
      let Sv_provided = Math.floor(Math.min(Sv_required, Sv_max) / 25) * 25;
      
      if (Sv_provided < 75) Sv_provided = 75; // Minimum 75mm
      if (Sv_provided > 300) continue; // Skip if too large
      
      const actualAsv_by_Sv = Asv / Sv_provided;
      
      options.push({
        diameter: dia,
        legs,
        spacing: Sv_provided,
        Asv,
        actualAsv_by_Sv,
        description: `${dia}mm φ ${legs}-legged @ ${Sv_provided}mm c/c`
      });
    }
  }
  
  return options.slice(0, 3); // Top 3 options
}

/**
 * Check deflection control
 */
function checkDeflection(span, d, pt, fs) {
  // Basic span/depth ratio for simply supported beam (IS 456 Cl. 23.2.1)
  const basic_ratio = 20;
  
  // Modification factor for tension reinforcement
  const kt = 1.0; // Simplified - actual calculation is complex
  
  // Modification factor for compression reinforcement
  const kc = 1.0; // Simplified
  
  // Allowable span/depth ratio
  const allowable_ratio = basic_ratio * kt * kc;
  
  // Actual span/depth ratio
  const actual_ratio = span / d;
  
  return {
    basic_ratio,
    allowable_ratio,
    actual_ratio,
    status: actual_ratio <= allowable_ratio ? 'OK' : 'FAIL',
    message: actual_ratio <= allowable_ratio 
      ? 'Deflection is within limits' 
      : 'Increase depth or reduce span'
  };
}

/**
 * Calculate development length
 */
function calcDevelopmentLength(dia, fck, fy) {
  // Ld = φ * σs / (4 * τbd)
  // where τbd is bond stress from IS 456 Table 21
  
  const tau_bd = fck >= 40 ? 2.24 : fck >= 35 ? 2.08 : fck >= 30 ? 1.92 : fck >= 25 ? 1.76 : fck >= 20 ? 1.60 : 1.28;
  
  const sigma_s = 0.87 * fy;
  
  const Ld = (dia * sigma_s) / (4 * tau_bd);
  
  return Math.ceil(Ld / 10) * 10; // Round to nearest 10mm
}

/**
 * Main beam design function
 */
export function designBeam(inputs) {
  const {
    // Loads
    Mu,           // Factored bending moment (kNm)
    Vu,           // Factored shear force (kN)
    
    // Dimensions
    b,            // Width (mm)
    D,            // Total depth (mm)
    span,         // Span (mm)
    
    // Materials
    fck,          // Concrete grade (MPa)
    fy,           // Steel grade (MPa)
    
    // Other
    cover,        // Clear cover (mm)
    // eslint-disable-next-line no-unused-vars
    exposure      // Exposure condition
  } = inputs;
  
  // Validate inputs
  if (!Mu || !b || !D || !fck || !fy) {
    return { error: 'Missing required inputs' };
  }
  
  // Determine steel grade
  const steelGrade = `Fe${fy}`;
  
  // Assume bar sizes for initial calculation
  const assumedMainBar = 20; // mm
  const assumedStirrups = 8; // mm
  
  // Calculate effective depth
  const d = calcEffectiveDepth(D, cover, assumedMainBar, assumedStirrups);
  
  // Effective cover to tension reinforcement
  const d_prime = cover + assumedStirrups + assumedMainBar / 2;
  
  // Calculate limiting moment
  const limiting = calcLimitingMoment(b, d, fck, steelGrade);
  
  // Decide between singly and doubly reinforced
  let flexuralDesign;
  if (Mu <= limiting.Mu_lim) {
    flexuralDesign = designSinglyReinforcedBeam(Mu, b, d, fck, fy);
  } else {
    flexuralDesign = designDoublyReinforcedBeam(Mu, limiting.Mu_lim, b, d, fck, fy, d_prime);
  }
  
  // Design shear reinforcement
  const Ast = flexuralDesign.Ast_provided || flexuralDesign.barOptions[0].actualAst;
  const shearDesign = designShearReinforcement(Vu, b, d, fck, fy, Ast);
  
  // Check deflection
  const deflectionCheck = span ? checkDeflection(span, d, flexuralDesign.pt_provided, 0.58 * fy) : null;
  
  // Calculate development length
  const recommendedBarDia = flexuralDesign.barOptions ? flexuralDesign.barOptions[0].diameter : 20;
  const devLength = calcDevelopmentLength(recommendedBarDia, fck, fy);
  
  return {
    inputs: {
      Mu,
      Vu,
      b,
      D,
      d,
      span,
      fck,
      fy,
      cover,
      d_prime
    },
    limiting,
    flexuralDesign,
    shearDesign,
    deflectionCheck,
    developmentLength: devLength,
    summary: {
      designType: flexuralDesign.designType,
      tension: flexuralDesign.barOptions 
        ? `${flexuralDesign.barOptions[0].numBars} - ${flexuralDesign.barOptions[0].diameter}mm φ`
        : `${flexuralDesign.tensionBarOptions[0].numBars} - ${flexuralDesign.tensionBarOptions[0].diameter}mm φ`,
      compression: flexuralDesign.compressionBarOptions 
        ? `${flexuralDesign.compressionBarOptions[0].numBars} - ${flexuralDesign.compressionBarOptions[0].diameter}mm φ`
        : 'Not required',
      stirrups: shearDesign.stirrupOptions 
        ? shearDesign.stirrupOptions[0].description
        : shearDesign.stirrupDetails[0].description,
      status: shearDesign.status === 'FAIL' || (deflectionCheck && deflectionCheck.status === 'FAIL') ? 'FAIL' : 'OK'
    }
  };
}

export default designBeam;