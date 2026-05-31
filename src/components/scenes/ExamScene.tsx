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
  isFinalRound: boolean;
  fadePhase: FadePhase;
  fadeLabel?: string;
  onCharacterClick: (index: number) => void;
  onFinishRound: () => void;
  onViewEnding: () => void;
}

export function ExamScene({
  round,
  students,
  activeIndex,
  dialogue,
  floatingPopups,
  randomEventActive,
  isFinalRound,
  fadePhase,
  fadeLabel,
  onCharacterClick,
  onFinishRound,
  onViewEnding,
}: ExamSceneProps) {
  const randomStudentIndex =
    dialogue?.kind === "random" ? dialogue.studentIndex : -1;
  const transitioning = fadePhase !== "none";

  return (
    <IngameShell
      bgVariant="exam"
      round={round}
      title="📝 시험 시간"
      subtitle="캐릭터를 클릭해 시험을 보세요"
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
            onCharacterClick={onCharacterClick}
            disabled={transitioning}
          />
        }
        footer={
          <div className="space-y-4">
            <DialogueBox
              line={dialogue}
              hint="캐릭터를 클릭하면 시험 결과가 표시됩니다."
            />

            <div className="flex justify-center">
              {isFinalRound ? (
                <SceneButton onClick={onViewEnding} disabled={transitioning}>
                  최종 결과 보기
                </SceneButton>
              ) : (
                <SceneButton onClick={onFinishRound} disabled={transitioning}>
                  다음 라운드로
                </SceneButton>
              )}
            </div>
          </div>
        }
      />
    </IngameShell>
  );
}
