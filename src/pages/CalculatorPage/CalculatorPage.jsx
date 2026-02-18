/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import { formatCurrency } from "../../utils/helpers";
import {
  calcBuildingCost,
  calcStairDesign,
  calcFooting,
  calcBarBending,
  calcProjectTimeline,
  calcStructureDesign,
  calcCompleteBBS,
  calcStandardBOQ,
  calcPremiumBOQ,
  calcFloorWiseBOQ,
} from "../../utils/calculator/advanced";

import { useBeamDesign } from "./hooks/useBeamDesign";
import { useColumnDesign } from "./hooks/useColumnDesign";
import { useCostingInputs } from "./hooks/useCostingInputs";

import { HeroSection } from "./components/HeroSection";
import { CostingInputPanel } from "./components/CostingInputPanel";
import { CostingResults } from "./components/CostingResults";
import { BeamDesignTab } from "./components/BeamDesignTab";
import { ColumnDesignTab } from "./components/ColumnDesignTab";

import "./styles/CalculatorPage.css";
import "./styles/design-calculator-styles.css";

function CalculatorsPage() {
  const [mainTab, setMainTab] = useState("costing");
  const [costingResults, setCostingResults] = useState(null);
  const [costingSubTab, setCostingSubTab] = useState("cost");

  const { inputs, updateField, resetInputs } = useCostingInputs();
  const beam = useBeamDesign();
  const column = useColumnDesign();

  // Auto-populate beam/column from structure design when switching tabs
  useEffect(() => {
    if (
      costingResults?.structureDesign &&
      mainTab === "beam" &&
      !beam.inputs.b
    ) {
      beam.populateFromStructure(
        costingResults.structureDesign,
        inputs.floorHeight,
      );
    }
  }, [mainTab, costingResults]);

  useEffect(() => {
    if (
      costingResults?.structureDesign &&
      mainTab === "column" &&
      !column.inputs.b
    ) {
      column.populateFromStructure(
        costingResults.structureDesign,
        inputs.floorHeight,
      );
    }
  }, [mainTab, costingResults]);

  const handleCalculate = () => {
    const { length, breadth, floors, floorHeight } = inputs;

    if (
      !length ||
      !breadth ||
      parseFloat(length) <= 0 ||
      parseFloat(breadth) <= 0
    ) {
      alert(
        "Please enter valid building dimensions (length and breadth must be greater than 0).",
      );
      return;
    }

    const calcInputs = {
      ...inputs,
      length: parseFloat(length),
      breadth: parseFloat(breadth),
      floors: parseInt(floors),
      floorHeight: parseFloat(floorHeight),
      basementDepth: parseFloat(inputs.basementDepth),
      avgColumnSpan: parseFloat(inputs.avgColumnSpan),
      customRates: {
        cement: inputs.customCementRate
          ? parseFloat(inputs.customCementRate)
          : null,
        steel: inputs.customSteelRate
          ? parseFloat(inputs.customSteelRate)
          : null,
        sand: inputs.customSandRate ? parseFloat(inputs.customSandRate) : null,
        aggregate: inputs.customAggregateRate
          ? parseFloat(inputs.customAggregateRate)
          : null,
      },
    };

    setCostingResults({
      buildingCost: calcBuildingCost(calcInputs),
      stairDesign: calcInputs.includeStaircase
        ? calcStairDesign(
            calcInputs.length,
            calcInputs.breadth,
            calcInputs.floorHeight,
            calcInputs.floors,
            calcInputs.buildingType,
          )
        : null,
      footing: calcFooting(calcInputs),
      barBending: calcBarBending(calcInputs),
      timeline: calcProjectTimeline(calcInputs),
      structureDesign: calcStructureDesign(calcInputs),
      completeBBS: calcCompleteBBS(calcInputs),
      standardBOQ: calcStandardBOQ(calcInputs),
      premiumBOQ: calcPremiumBOQ(calcInputs),
      floorWiseBOQ: calcFloorWiseBOQ({
        ...calcInputs,
        finishGrade: calcInputs.finishGrade,
      }),
    });
  };

  const handleReset = () => {
    resetInputs();
    setCostingResults(null);
    setCostingSubTab("cost");
  };

  return (
    <div className="calc-page">
      <HeroSection
        mainTab={mainTab}
        onTabChange={(tab) => {
          setMainTab(tab);
          if (
            tab === "beam" &&
            costingResults?.structureDesign &&
            !beam.inputs.b
          ) {
            beam.populateFromStructure(
              costingResults.structureDesign,
              inputs.floorHeight,
            );
          }
          if (
            tab === "column" &&
            costingResults?.structureDesign &&
            !column.inputs.b
          ) {
            column.populateFromStructure(
              costingResults.structureDesign,
              inputs.floorHeight,
            );
          }
        }}
      />

      <main className="calc-main">
        {mainTab === "costing" && (
          <>
            <CostingInputPanel
              inputs={inputs}
              updateField={updateField}
              onCalculate={handleCalculate}
              onReset={handleReset}
            />
            {costingResults && (
              <CostingResults
                results={costingResults}
                inputs={inputs}
                subTab={costingSubTab}
                onSubTabChange={setCostingSubTab}
                onReset={handleReset}
                formatCurrency={formatCurrency}
              />
            )}
          </>
        )}

        {mainTab === "beam" && (
          <section className="calc-results-section">
            {costingResults?.structureDesign && (
              <div
                className="calc-alert calc-alert-info"
                style={{ marginBottom: "1.5rem" }}
              >
                <strong>ℹ️ Auto-populated from Structure Design:</strong> Beam
                dimensions and material grades have been filled based on your
                building estimate. You can modify them as needed.
              </div>
            )}
            <BeamDesignTab
              inputs={beam.inputs}
              onInputChange={beam.handleInputChange}
              onCalculate={beam.calculate}
              results={beam.results}
            />
          </section>
        )}

        {mainTab === "column" && (
          <section className="calc-results-section">
            {costingResults?.structureDesign && (
              <div
                className="calc-alert calc-alert-info"
                style={{ marginBottom: "1.5rem" }}
              >
                <strong>ℹ️ Auto-populated from Structure Design:</strong> Column
                dimensions and material grades have been filled based on your
                building estimate. You can modify them as needed.
              </div>
            )}
            <ColumnDesignTab
              inputs={column.inputs}
              onInputChange={column.handleInputChange}
              onCalculate={column.calculate}
              results={column.results}
            />
          </section>
        )}
      </main>
    </div>
  );
}

export default CalculatorsPage;