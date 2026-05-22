"use client";

import type { DialogueLine } from "@/lib/game";

interface DialogueBoxProps {
  line: DialogueLine | null;
  hint?: string;
  autoPlay?: boolean;
}

export function DialogueBox({ line, hint, autoPlay = false }: DialogueBoxProps) {
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
      {autoPlay && (
        <p className="mt-3 flex items-center justify-end gap-2 text-xs text-yellow-400/90">
          <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#5BC0DE]" />
          자동 진행 중… 🍿
        </p>
      )}
    </div>
  );
}
