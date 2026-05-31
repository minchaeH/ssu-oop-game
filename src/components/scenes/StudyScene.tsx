"use client";

import { CharacterRow } from "@/components/game/CharacterRow";
import { DialogueBox } from "@/components/game/DialogueBox";
import { IngameSceneLayout } from "@/components/game/IngameSceneLayout";
import { IngameShell } from "@/components/game/IngameShell";
import { SceneButton } from "@/components/game/SceneButton";
import type { FadePhase } from "@/components/game/SceneTransitionOverlay";
import type { DialogueLine, FloatingPopup } from "@/lib/game";
import type { StudentSlot } from "@/lib/students";

interface StudySceneProps {
  round: number;
  students: StudentSlot[];
  activeIndex: number;
  dialogue: DialogueLine | null;
  floatingPopups: FloatingPopup[];
  randomEventActive: boolean;
  fadePhase: FadePhase;
  fadeLabel?: string;
  onCharacterClick: (index: number) => void;
  onGoToExam: () => void;
}

export function StudyScene({
  round,
  students,
  activeIndex,
  dialogue,
  floatingPopups,
  randomEventActive,
  fadePhase,
  fadeLabel,
  onCharacterClick,
  onGoToExam,
}: StudySceneProps) {
  const randomStudentIndex =
    dialogue?.kind === "random" ? dialogue.studentIndex : -1;
  const transitioning = fadePhase !== "none";

  return (
    <IngameShell
      bgVariant="study"
      round={round}
      title="📚 공부 시간"
      subtitle="캐릭터를 클릭해 공부하세요"
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
              hint="캐릭터를 클릭하면 공부 결과가 표시됩니다."
            />
            <div className="flex justify-center">
              <SceneButton onClick={onGoToExam} disabled={transitioning}>
                시험 보러 가기
              </SceneButton>
            </div>
          </div>
        }
      />
    </IngameShell>
  );
}
