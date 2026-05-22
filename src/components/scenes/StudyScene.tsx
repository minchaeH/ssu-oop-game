"use client";

import { CharacterRow } from "@/components/game/CharacterRow";
import { DialogueBox } from "@/components/game/DialogueBox";
import { IngameSceneLayout } from "@/components/game/IngameSceneLayout";
import { IngameShell } from "@/components/game/IngameShell";
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
}: StudySceneProps) {
  const randomStudentIndex =
    dialogue?.kind === "random" ? dialogue.studentIndex : -1;

  return (
    <IngameShell
      bgVariant="study"
      round={round}
      title="📚 공부 시간"
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
          <DialogueBox
            line={dialogue}
            hint="교수님이 공부를 시작하라고 했습니다…"
            autoPlay
          />
        }
      />
    </IngameShell>
  );
}
