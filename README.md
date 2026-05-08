# Spreadsheet Engine

A React-based spreadsheet engine supporting formula evaluation, dependency tracking, circular reference detection, and automatic recalculation similar to basic Excel functionality.

---

## Live Demo

https://react-spreadsheet-engine.vercel.app

---

## Features

### Grid System
- Dynamic spreadsheet grid
- Editable cells
- Excel-style cell IDs (A1, B2, etc.)
- Responsive layout

### Formula Support
Supports formulas starting with `=`

Examples:

```excel
=A1+3
=A1*2
=(A1+B1)/2
```

Supported operations:
- Addition (`+`)
- Subtraction (`-`)
- Multiplication (`*`)
- Division (`/`)
- Parentheses
- Multiple cell references

---

## Dependency Management

The application maintains a dependency graph to track relationships between cells.

Example:

```text
A1 → B1 → C1
```

When a referenced cell changes:
- only affected downstream cells are recalculated
- unnecessary recomputation is avoided

---

## Circular Reference Detection

Circular dependencies are detected using:

- Depth First Search (DFS)
- Recursion stack tracking

Example:

```excel
A1 = =B1+2
B1 = =A1+3
```

Result:

```text
#CIRCULAR
```

This prevents infinite recalculation loops.

---

## Error Handling

Invalid formulas are handled gracefully.

Example:

```excel
=A1+
```

Displays:

```text
#ERROR
```

without crashing the application.

---

## Bonus Features Implemented

- Undo / Redo functionality
- Dynamic grid sizing
- Optimized dependency-based recalculation
- Responsive UI
- Vercel deployment

---

## Tech Stack

- React
- TypeScript
- Vite
- mathjs

---

## Project Structure

```text
src/
│
├── components/
│   ├── Cell.tsx
│   ├── Spreadsheet.tsx
│
├── engine/
│   ├── dependencyGraph.ts
│   ├── evaluator.ts
│   ├── spreadsheetEngine.ts
│
├── utils/
│   ├── helpers.ts
│
├── types/
│   ├── spreadsheet.ts
```

---

## Architecture Overview

The application is divided into:

1. UI Layer
2. Spreadsheet Engine
3. Dependency Graph
4. Formula Evaluator

---

## Internal Workflow

When a user updates a cell:

1. Raw input is stored
2. Formula references are extracted using regex
3. Dependency graph is updated
4. DFS checks for circular references
5. Formula is evaluated
6. Dependent cells are recalculated recursively
7. React state updates trigger UI rerender

---

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd spreadsheet-engine
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

---

## Key Design Decisions

### Separate Raw and Computed Values

Each cell stores:

```ts
{
  raw: "=A1+3",
  value: 8
}
```

This allows formulas to be reevaluated whenever dependencies change.

---

### Dependency Graph

Two maps are maintained:

- dependencies
- dependents

This enables:
- efficient update propagation
- cycle detection
- optimized recalculation

---

### Optimized Recalculation

Instead of recalculating the entire spreadsheet, only affected downstream cells are updated.

---

## Future Improvements

- Formula bar
- Cell formatting
- Multi-sheet support
- Copy/paste support
- Excel-style AA/AB column scaling improvements

---

## Author

Armaan Usmani
