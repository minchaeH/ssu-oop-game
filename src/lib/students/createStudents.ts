import { Bokhaksaeng, CoffeeLover, GPTAddict } from "./Students";
import type { StudentBase } from "./StudentBase";

export type StudentKind = "gpt" | "coffee" | "bokhak";

export const CHARACTER_PORTRAITS: Record<StudentKind, string> = {
  gpt: "/char-gpt.png",
  coffee: "/char-coffee.png",
  bokhak: "/char-bokhak.png",
};

export interface StudentSlot {
  id: StudentKind;
  className: string;
  emoji: string;
  portrait: string;
  accent: string;
  instance: StudentBase;
}

export function createInitialStudents(): StudentSlot[] {
  return [
    {
      id: "gpt",
      className: "GPTAddict",
      emoji: "🤖",
      portrait: CHARACTER_PORTRAITS.gpt,
      accent: "from-violet-500/20 to-purple-600/30 border-violet-400/50",
      instance: new GPTAddict("지피티중독자", "Python"),
    },
    {
      id: "coffee",
      className: "CoffeeLover",
      emoji: "☕",
      portrait: CHARACTER_PORTRAITS.coffee,
      accent: "from-amber-500/20 to-orange-600/30 border-amber-400/50",
      instance: new CoffeeLover("카페인중독자", "Java"),
    },
    {
      id: "bokhak",
      className: "Bokhaksaeng",
      emoji: "🎓",
      portrait: CHARACTER_PORTRAITS.bokhak,
      accent: "from-emerald-500/20 to-teal-600/30 border-emerald-400/50",
      instance: new Bokhaksaeng("복학생", "C"),
    },
  ];
}
