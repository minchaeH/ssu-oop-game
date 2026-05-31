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
  onCharacterClick: (index: number) => void;
  disabled?: boolean;
}

function InheritanceConnector() {
  return (
    <div className="relative mx-auto w-full max-w-4xl px-4">
      <div className="mx-auto h-4 w-px bg-[#5BC0DE]/40" aria-hidden />
      <div className="relative mx-auto hidden h-5 w-[88%] sm:block" aria-hidden>
        <div className="absolute left-[16.6%] top-0 h-2.5 w-px bg-[#5BC0DE]/35" />
        <div className="absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2 bg-[#5BC0DE]/35" />
        <div className="absolute right-[16.6%] top-0 h-2.5 w-px bg-[#5BC0DE]/35" />
        <div className="absolute left-[16.6%] right-[16.6%] top-2.5 h-px bg-[#5BC0DE]/35" />
        <div className="absolute left-[16.6%] top-2.5 h-2.5 w-px bg-[#5BC0DE]/35" />
        <div className="absolute left-1/2 top-2.5 h-2.5 w-px -translate-x-1/2 bg-[#5BC0DE]/35" />
        <div className="absolute right-[16.6%] top-2.5 h-2.5 w-px bg-[#5BC0DE]/35" />
      </div>
      <div className="mx-auto h-3 w-px bg-[#5BC0DE]/30 sm:hidden" aria-hidden />
    </div>
  );
}

export function CharacterRow({
  students,
  activeIndex,
  bubbleLine,
  floatingPopups,
  randomEventActive,
  randomEventStudentIndex,
  onCharacterClick,
  disabled = false,
}: CharacterRowProps) {
  return (
    <div
      className="mx-auto w-full max-w-5xl font-mono"
      aria-label="상속 구조: StudentBase와 자식 인스턴스"
    >
      <div className="flex flex-col items-center">
        <div className="game-modal-sm w-full max-w-sm rounded-xl border-2 border-[#5BC0DE]/60 bg-[#5BC0DE]/5 px-4 py-2.5 text-center shadow-lg shadow-[#5BC0DE]/10">
          <p className="text-[10px] uppercase tracking-widest text-[#5BC0DE]">parent class</p>
          <p className="text-sm font-bold text-white sm:text-base">[ CLASS : StudentBase ]</p>
          <p className="mt-1 text-[10px] text-white/55">
            study() · take_exam() — 자식 클래스가 오버라이딩
          </p>
        </div>
        <InheritanceConnector />
      </div>

      <div className="mx-auto grid w-full grid-cols-1 items-end gap-4 sm:grid-cols-3 sm:gap-3">
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
              <div
                className="pointer-events-none absolute -top-1 left-1/2 hidden h-3 w-px -translate-x-1/2 bg-emerald-400/30 sm:block"
                aria-hidden
              />

              <FloatingTexts popups={charFloats} />

              {showBubble && (
                <div
                  className={`vn-bubble mb-2 w-full max-w-[200px] text-center text-xs leading-snug sm:text-sm ${
                    bubbleLine.kind === "random" ? "vn-bubble-random text-yellow-100" : ""
                  }`}
                >
                  {bubbleLine.text.split("\n\n")[0].slice(0, 56)}
                  {(bubbleLine.text.length > 56 || bubbleLine.text.includes("\n")) && "…"}
                </div>
              )}

              <button
                type="button"
                disabled={disabled}
                onClick={() => onCharacterClick(i)}
                className={`game-modal-sm group flex w-full flex-col items-center overflow-hidden rounded-2xl border border-emerald-400/25 px-2 pb-1 pt-2 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                  isRandomHero
                    ? "vn-card-sparkle scale-105 border-2 border-yellow-400"
                    : isActive
                      ? "scale-105 border-2 border-[#5BC0DE] shadow-lg shadow-[#5BC0DE]/20"
                      : "scale-[0.97] opacity-80 hover:-translate-y-2 hover:opacity-100 hover:shadow-xl"
                } ${!disabled ? "cursor-pointer" : ""}`}
                aria-label={`${slot.className} extends StudentBase — ${s.name} 클릭하여 행동`}
              >
                <p className="mb-1 text-[8px] text-emerald-300/90">extends StudentBase</p>
                <div className="relative h-32 w-32 shrink-0">
                  <Image
                    src={slot.portrait}
                    alt={`${s.name} 일러스트`}
                    width={128}
                    height={128}
                    className="h-32 w-32 object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
                    priority={i === 0}
                  />
                </div>
                <p className="mt-0.5 max-w-[8rem] truncate text-center text-[10px] font-semibold text-emerald-200/90">
                  {slot.className}
                </p>
              </button>

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
    </div>
  );
}
