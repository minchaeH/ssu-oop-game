"use client";

import type { DialogueLine } from "@/lib/game";

interface DialogueBoxProps {
  line: DialogueLine | null;
  hint?: string;
}

export function DialogueBox({ line, hint }: DialogueBoxProps) {
  const kindLabel =
    line?.kind === "random"
      ? "✨ 랜덤 이벤트"
      : line?.kind === "study"
        ? "📚 공부"
        : line?.kind === "exam"
          ? "📝 시험"
          : line?.kind === "system"
            ? "📢 교수님"
            : "";

  return (
    <div className="vn-dialogue-panel w-full">
      {line ? (
        <>
          <div className="mb-2 flex items-center gap-2">
            <span className="text-2xl">{line.emoji}</span>
            <div>
              <p className="text-xs text-yellow-400">{kindLabel}</p>
              <p className="font-bold text-white">{line.speaker}</p>
            </div>
          </div>
          <p className="whitespace-pre-line text-base leading-relaxed text-white">
            {line.text}
          </p>
        </>
      ) : (
        <p className="text-white/60">{hint ?? "…"}</p>
      )}
    </div>
  );
}
