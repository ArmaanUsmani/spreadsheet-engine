export type Cell = {
  raw: string;
  value: string | number;
};

export type SpreadsheetData = {
  [cellId: string]: Cell;
};