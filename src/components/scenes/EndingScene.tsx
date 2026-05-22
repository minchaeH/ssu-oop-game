"use client";

import { SceneButton } from "@/components/game/SceneButton";
import type { StudentSlot } from "@/lib/students";
import { GameModal } from "@/components/ui/GameModal";
import { SceneBackground } from "@/components/ui/SceneBackground";

interface EndingSceneProps {
  students: StudentSlot[];
  onRestart: () => void;
}

export function EndingScene({ students, onRestart }: EndingSceneProps) {
  const ranked = [...students].sort(
    (a, b) =>
      b.instance.points - a.instance.points ||
      b.instance.intelligence - a.instance.intelligence,
  );

  return (
    <SceneBackground
      variant="campus"
      className="flex min-h-screen items-center justify-center px-4 py-10"
    >
      <GameModal size="lg" className="flex flex-col items-center gap-6">
        <div>
          <p className="text-4xl">🎉</p>
          <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">
            최종 생존자 명단 및 순위 발표
          </h2>
          <p className="mt-2 text-sm text-white/80">3차전을 모두 마쳤습니다!</p>
        </div>

        <ol className="w-full space-y-2 text-left">
          {ranked.map((slot, i) => (
            <li
              key={slot.id}
              className="game-modal-sm flex items-center justify-between rounded-2xl px-4 py-3"
            >
              <span className="text-white">
                <span className="game-highlight">{i + 1}등</span> {slot.emoji}{" "}
                {slot.instance.name}
              </span>
              <span className="text-xs text-white/70 sm:text-sm">
                승점 {slot.instance.points} · 지능 {slot.instance.intelligence}
              </span>
            </li>
          ))}
        </ol>

        <SceneButton onClick={onRestart}>처음부터 다시하기</SceneButton>
      </GameModal>
    </SceneBackground>
  );
}
