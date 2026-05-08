export class DependencyGraph {
  dependencies: Map<string, Set<string>>;
  dependents: Map<string, Set<string>>;

  constructor() {
    this.dependencies = new Map();
    this.dependents = new Map();
  }

  updateDependencies(cell: string, refs: string[]) {
    // Remove old dependencies
    const oldDeps = this.dependencies.get(cell);

    if (oldDeps) {
      oldDeps.forEach(dep => {
        this.dependents.get(dep)?.delete(cell);
      });
    }

    // Add new dependencies
    this.dependencies.set(cell, new Set(refs));

    refs.forEach(ref => {
      if (!this.dependents.has(ref)) {
        this.dependents.set(ref, new Set());
      }

      this.dependents.get(ref)?.add(cell);
    });
  }

  getDependents(cell: string): string[] {
    return [...(this.dependents.get(cell) || [])];
  }

  hasCircularDependency(start: string): boolean {
    const visited = new Set<string>();
    const recursionStack = new Set<string>();

    const dfs = (cell: string): boolean => {
      if (recursionStack.has(cell)) {
        return true;
      }

      if (visited.has(cell)) {
        return false;
      }

      visited.add(cell);
      recursionStack.add(cell);

      const deps = this.dependencies.get(cell) || [];

      for (const dep of deps) {
        if (dfs(dep)) {
          return true;
        }
      }

      recursionStack.delete(cell);

      return false;
    };

    return dfs(start);
  }
}