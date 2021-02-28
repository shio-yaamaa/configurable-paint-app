export class HistoryStack<T> {
  private readonly maxLength: number;
  private snapshots: T[] = [];
  private position = -1;

  constructor(maxLength: number) {
    this.maxLength = Math.max(maxLength, 1);
  }

  push(item: T): void {
    // Discard snapshots that have been preserved for redo
    this.snapshots = this.snapshots.slice(0, this.position + 1);
    this.snapshots.push(item);

    if (this.position < this.maxLength) {
      this.position++;
    } else {
      // No more snapshots can be saved; Discard the oldest one
      this.snapshots.shift();
    }
  }

  canUndo(): boolean {
    return this.snapshots[this.position - 1] !== undefined;
  }

  canRedo(): boolean {
    return this.snapshots[this.position + 1] !== undefined;
  }

  undo(): T | null {
    if (!this.canUndo()) return null;
    const snapshot = this.snapshots[this.position - 1];
    this.position--;
    return snapshot;
  }

  redo(): T | null {
    if (!this.canRedo()) return null;
    const snapshot = this.snapshots[this.position + 1];
    this.position++;
    return snapshot;
  }
}
