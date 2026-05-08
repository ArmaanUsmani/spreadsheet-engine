import { evaluate } from "mathjs";
import type { SpreadsheetData } from "../types/spreadsheet";
import { extractCellReferences } from "../utils/helpers";

export const evaluateFormula = (
  formula: string,
  data: SpreadsheetData
): string | number => {
  try {
    let expression = formula.slice(1);

    const refs = extractCellReferences(formula);

    refs.forEach(ref => {
      const value = data[ref]?.value;

      if (value === undefined || value === "") {
        expression = expression.replaceAll(ref, "0");
      } else if (
        value === "#ERROR" ||
        value === "#CIRCULAR"
      ) {
        throw new Error("Invalid reference");
      } else {
        expression = expression.replaceAll(ref, value.toString());
      }
    });

    return evaluate(expression);
  } catch {
    return "#ERROR";
  }
};