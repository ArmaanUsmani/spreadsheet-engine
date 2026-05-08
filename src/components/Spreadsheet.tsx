import { useState } from "react";

import Cell from "./Cell";

import type { SpreadsheetData } from "../types/spreadsheet";

import {
  ROWS,
  COLS,
  COLUMN_NAMES,
} from "../utils/constants";

import { getCellId } from "../utils/helpers";

import { SpreadsheetEngine } from "../engine/spreadsheetEngine";

const engine = new SpreadsheetEngine();

const Spreadsheet = () => {
  const [data, setData] =
    useState<SpreadsheetData>({});

  const [undoStack, setUndoStack] =
    useState<SpreadsheetData[]>([]);

  const [redoStack, setRedoStack] =
    useState<SpreadsheetData[]>([]);
    

  const handleChange = (
    cellId: string,
    value: string
  ) => {
    const updated = engine.updateCell(
      cellId,
      value,
      data
    );

    // Save current state for undo
    setUndoStack((prev) => [
      ...prev,
      data,
    ]);

    // Clear redo history after new edit
    setRedoStack([]);

    setData({ ...updated });
  };

  const handleUndo = () => {
    if (undoStack.length === 0)
      return;

    const previous =
      undoStack[undoStack.length - 1];

    // Move current state to redo
    setRedoStack((prev) => [
      data,
      ...prev,
    ]);

    // Remove last undo state
    setUndoStack((prev) =>
      prev.slice(0, -1)
    );

    setData(previous);
  };

  const handleRedo = () => {
    if (redoStack.length === 0)
      return;

    const next = redoStack[0];

    // Save current state for undo
    setUndoStack((prev) => [
      ...prev,
      data,
    ]);

    // Remove restored state from redo
    setRedoStack((prev) =>
      prev.slice(1)
    );

    setData(next);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button onClick={handleUndo}>
          Undo
        </button>

        <button onClick={handleRedo}>
          Redo
        </button>
      </div>

      <div className="spreadsheet">
        <div className="header empty"></div>

        {COLUMN_NAMES.map((col) => (
          <div
            key={col}
            className="header"
          >
            {col}
          </div>
        ))}

        {Array.from({
          length: ROWS,
        }).map((_, row) => (
          <div
            key={row}
            style={{
              display: "contents",
            }}
          >
            <div className="header">
              {row + 1}
            </div>

            {Array.from({
              length: COLS,
            }).map((_, col) => {
              const cellId =
                getCellId(row, col);

              return (
                <Cell
                  key={cellId}
                  raw={
                    data[cellId]?.raw ||
                    ""
                  }
                  display={
                    data[cellId]
                      ?.value || ""
                  }
                  onChange={(value) =>
                    handleChange(
                      cellId,
                      value
                    )
                  }
                />
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Spreadsheet;