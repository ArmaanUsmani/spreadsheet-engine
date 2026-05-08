import type { SpreadsheetData } from "../types/spreadsheet";
import {
  extractCellReferences,
  isFormula,
} from "../utils/helpers";

import { evaluateFormula } from "./evaluator";
import { DependencyGraph } from "./dependencyGraph";

export class SpreadsheetEngine {
  graph: DependencyGraph;

  constructor() {
    this.graph = new DependencyGraph();
  }

  updateCell(
    cellId: string,
    rawValue: string,
    data: SpreadsheetData
  ): SpreadsheetData {
    const updatedData = { ...data };

    updatedData[cellId] = {
      raw: rawValue,
      value: rawValue,
    };

    if (!isFormula(rawValue)) {
      this.recalculateDependents(cellId, updatedData);
      return updatedData;
    }

    const refs = extractCellReferences(rawValue);

    this.graph.updateDependencies(cellId, refs);

    if (this.graph.hasCircularDependency(cellId)) {
      updatedData[cellId].value = "#CIRCULAR";
      return updatedData;
    }

    updatedData[cellId].value = evaluateFormula(
      rawValue,
      updatedData
    );

    this.recalculateDependents(cellId, updatedData);

    return updatedData;
  }

  recalculateDependents(
    cellId: string,
    data: SpreadsheetData
  ) {
    const dependents = this.graph.getDependents(cellId);

    for (const dep of dependents) {
      const raw = data[dep]?.raw;

      if (!raw || !isFormula(raw)) continue;

      data[dep].value = evaluateFormula(raw, data);

      this.recalculateDependents(dep, data);
    }
  }
}