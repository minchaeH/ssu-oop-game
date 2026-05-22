import type { StudentKind, StudentSlot } from "@/lib/students";

export type SceneId = "title" | "rules" | "study" | "exam" | "ending";

export type DialogueKind = "system" | "random" | "study" | "exam";

export interface StatDeltas {
  intelligence: number;
  mental: number;
  points: number;
}

export interface DialogueLine {
  kind: DialogueKind;
  speaker: string;
  emoji: string;
  text: string;
  studentIndex: number;
  statDeltas?: StatDeltas;
}

export interface FloatingPopup {
  id: string;
  studentIndex: number;
  labels: string[];
}

export const AUTO_PLAY_MS = 1500;

export interface GameSnapshot {
  scene: SceneId;
  round: number;
  students: StudentSlot[];
  studentTurnIndex: number;
  dialogue: DialogueLine | null;
  dialogueQueue: DialogueLine[];
  studyPhaseDone: boolean;
  examPhaseDone: boolean;
  statsTick: number;
}

export const TOTAL_ROUNDS = 3;
export const STUDENT_ORDER: StudentKind[] = ["gpt", "coffee", "bokhak"];
