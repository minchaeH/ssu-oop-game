"use client";

import Image from "next/image";
import type { StudentSlot } from "@/lib/students";
import type { DialogueLine, FloatingPopup } from "@/lib/game";
import { FloatingTexts } from "./FloatingTexts";

interface CharacterRowProps {
  students: StudentSlot[];
  activeIndex: number;
  bubbleLine: DialogueLine | null;
  floatingPopups: FloatingPopup[];
  randomEventActive: boolean;
  randomEventStudentIndex: number;
}

export function CharacterRow({
  students,
  activeIndex,
  bubbleLine,
  floatingPopups,
  randomEventActive,
  randomEventStudentIndex,
}: CharacterRowProps) {
  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-end gap-4 sm:grid-cols-3 sm:gap-3">
      {students.map((slot, i) => {
        const s = slot.instance;
        const isActive = i === activeIndex;
        const showBubble = isActive && bubbleLine && bubbleLine.studentIndex === i;
        const isRandomHero =
          randomEventActive && i === randomEventStudentIndex && bubbleLine?.kind === "random";
        const charFloats = floatingPopups.filter((p) => p.studentIndex === i);

        return (
          <div
            key={slot.id}
            className={`relative flex flex-col items-center transition-transform duration-300 ${
              isActive ? "z-10" : "z-0"
            }`}
          >
            <FloatingTexts popups={charFloats} />

            {showBubble && (
              <div
                className={`vn-bubble mb-2 w-full max-w-[200px] text-center text-xs leading-snug sm:text-sm ${
                  bubbleLine.kind === "random" ? "vn-bubble-random text-yellow-100" : ""
                }`}
              >
                {bubbleLine.text.split("\n")[0].slice(0, 56)}
                {(bubbleLine.text.length > 56 || bubbleLine.text.includes("\n")) && "…"}
              </div>
            )}

            <div
              className={`game-modal-sm flex flex-col items-center overflow-hidden rounded-2xl px-2 pb-1 pt-2 transition-all duration-300 ${
                isRandomHero
                  ? "vn-card-sparkle scale-105 border-2 border-yellow-400"
                  : isActive
                    ? "scale-105 border-2 border-[#5BC0DE] shadow-lg shadow-[#5BC0DE]/20"
                    : "scale-[0.97] opacity-80"
              }`}
            >
              <div className="relative h-32 w-32 shrink-0">
                <Image
                  src={slot.portrait}
                  alt={`${s.name} 일러스트`}
                  width={128}
                  height={128}
                  className="h-32 w-32 object-contain object-bottom"
                  priority={i === 0}
                />
              </div>
              <p className="mt-0.5 max-w-[8rem] truncate text-center text-[10px] font-medium text-white/80">
                {slot.className}
              </p>
            </div>

            <div
              className={`game-modal-sm mt-2 w-full min-w-[140px] max-w-[180px] rounded-2xl px-3 py-2.5 ${
                isRandomHero ? "vn-desk-sparkle border border-yellow-400/50" : ""
              }`}
            >
              <p className="truncate text-center text-sm font-semibold text-white">{s.name}</p>
              <div className="mt-1.5 grid grid-cols-3 gap-1 text-center text-[10px]">
                <div>
                  <p className="text-white/50">지능</p>
                  <p className="font-mono font-bold text-[#5BC0DE]">{s.intelligence}</p>
                </div>
                <div>
                  <p className="text-white/50">멘탈</p>
                  <p className="font-mono font-bold text-yellow-300">{s.mental}</p>
                </div>
                <div>
                  <p className="text-white/50">승점</p>
                  <p className="font-mono font-bold text-yellow-400">{s.points}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
