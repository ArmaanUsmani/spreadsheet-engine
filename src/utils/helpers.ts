import { COLUMN_NAMES } from "./constants";

export const getCellId = (row: number, col: number) => {
  return `${COLUMN_NAMES[col]}${row + 1}`;
};

export const isFormula = (value: string) => {
  return value.startsWith("=");
};

export const extractCellReferences = (formula: string): string[] => {
  return formula.match(/[A-J](10|[1-9])/g) || [];
};

