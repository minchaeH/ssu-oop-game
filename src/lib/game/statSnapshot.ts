import type { StudentBase } from "@/lib/students";
import type { StatDeltas } from "./types";

export interface StatSnapshot {
  intelligence: number;
  mental: number;
  points: number;
}

export function snapshotStats(student: StudentBase): StatSnapshot {
  return {
    intelligence: student.intelligence,
    mental: student.mental,
    points: student.points,
  };
}

export function computeDeltas(before: StatSnapshot, after: StatSnapshot): StatDeltas | undefined {
  const deltas: StatDeltas = {
    intelligence: after.intelligence - before.intelligence,
    mental: after.mental - before.mental,
    points: after.points - before.points,
  };

  if (
    deltas.intelligence === 0 &&
    deltas.mental === 0 &&
    deltas.points === 0
  ) {
    return undefined;
  }

  return deltas;
}

export function deltasToLabels(deltas: StatDeltas): string[] {
  const labels: string[] = [];

  if (deltas.intelligence !== 0) {
    labels.push(
      `${deltas.intelligence > 0 ? "+" : ""}${deltas.intelligence} 지능!`,
    );
  }
  if (deltas.mental !== 0) {
    labels.push(`${deltas.mental > 0 ? "+" : ""}${deltas.mental} 멘탈..`);
  }
  if (deltas.points !== 0) {
    labels.push(`${deltas.points > 0 ? "+" : ""}${deltas.points} 승점!`);
  }

  return labels;
}
