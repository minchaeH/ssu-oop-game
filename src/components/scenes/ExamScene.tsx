"use client";

import { CharacterRow } from "@/components/game/CharacterRow";
import { DialogueBox } from "@/components/game/DialogueBox";
import { IngameSceneLayout } from "@/components/game/IngameSceneLayout";
import { IngameShell } from "@/components/game/IngameShell";
import { SceneButton } from "@/components/game/SceneButton";
import type { FadePhase } from "@/components/game/SceneTransitionOverlay";
import type { DialogueLine, FloatingPopup } from "@/lib/game";
import type { StudentSlot } from "@/lib/students";

interface ExamSceneProps {
  round: number;
  students: StudentSlot[];
  activeIndex: number;
  dialogue: DialogueLine | null;
  floatingPopups: FloatingPopup[];
  randomEventActive: boolean;
  examPhaseDone: boolean;
  isFinalRound: boolean;
  fadePhase: FadePhase;
  fadeLabel?: string;
  onNextRound: () => void;
  onViewEnding: () => void;
}

export function ExamScene({
  round,
  students,
  activeIndex,
  dialogue,
  floatingPopups,
  randomEventActive,
  examPhaseDone,
  isFinalRound,
  fadePhase,
  fadeLabel,
  onNextRound,
  onViewEnding,
}: ExamSceneProps) {
  const randomStudentIndex =
    dialogue?.kind === "random" ? dialogue.studentIndex : -1;

  return (
    <IngameShell
      bgVariant="exam"
      round={round}
      title="📝 시험 시간"
      subtitle="자동 진행 컷신"
      fadePhase={fadePhase}
      fadeLabel={fadeLabel}
      randomEventActive={randomEventActive}
    >
      <IngameSceneLayout
        stage={
          <CharacterRow
            students={students}
            activeIndex={activeIndex}
            bubbleLine={dialogue}
            floatingPopups={floatingPopups}
            randomEventActive={randomEventActive}
            randomEventStudentIndex={randomStudentIndex}
          />
        }
        footer={
          <div className="space-y-4">
            <DialogueBox
              line={dialogue}
              hint="시험지가 배포되었습니다…"
              autoPlay={!examPhaseDone}
            />

            {examPhaseDone && (
              <div className="flex justify-center animate-[fadeIn_0.5s_ease-out]">
                {isFinalRound ? (
                  <SceneButton onClick={onViewEnding}>최종 결과 보기</SceneButton>
                ) : (
                  <SceneButton onClick={onNextRound}>다음 라운드 시작</SceneButton>
                )}
              </div>
            )}
          </div>
        }
      />
    </IngameShell>
  );
}
