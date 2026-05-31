"use client";

import { useCallback, useState } from "react";
import { TitleScene } from "@/components/scenes/TitleScene";
import { RulesScene } from "@/components/scenes/RulesScene";
import { StudyScene } from "@/components/scenes/StudyScene";
import { ExamScene } from "@/components/scenes/ExamScene";
import { EndingScene } from "@/components/scenes/EndingScene";
import type { FadePhase } from "@/components/game/SceneTransitionOverlay";
import {
  TOTAL_ROUNDS,
  deltasToLabels,
  professorExamIntro,
  professorStudyIntro,
  runCharacterAction,
  type DialogueLine,
  type FloatingPopup,
  type SceneId,
} from "@/lib/game";
import { createInitialStudents, type StudentSlot } from "@/lib/students";

const FADE_OUT_MS = 450;
const FADE_BLACK_MS = 400;
const FADE_IN_MS = 450;

function systemLine(text: string): DialogueLine {
  return {
    kind: "system",
    speaker: "교수님",
    emoji: "👨‍🏫",
    text,
    studentIndex: -1,
  };
}

export function GameSimulation() {
  const [scene, setScene] = useState<SceneId>("title");
  const [round, setRound] = useState(1);
  const [students, setStudents] = useState<StudentSlot[]>(createInitialStudents);
  const [statsTick, setStatsTick] = useState(0);

  const [dialogue, setDialogue] = useState<DialogueLine | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const [fadePhase, setFadePhase] = useState<FadePhase>("none");
  const [fadeLabel, setFadeLabel] = useState<string | undefined>();
  const [floatingPopups, setFloatingPopups] = useState<FloatingPopup[]>([]);
  const [randomEventActive, setRandomEventActive] = useState(false);

  const bumpStats = useCallback(() => setStatsTick((t) => t + 1), []);

  const spawnFloating = useCallback((line: DialogueLine) => {
    if (line.studentIndex < 0 || !line.statDeltas) return;
    const labels = deltasToLabels(line.statDeltas);
    if (labels.length === 0) return;

    const id = `float-${Date.now()}-${line.studentIndex}`;
    setFloatingPopups((prev) => [
      ...prev.filter((p) => p.studentIndex !== line.studentIndex),
      { id, studentIndex: line.studentIndex, labels },
    ]);

    window.setTimeout(() => {
      setFloatingPopups((prev) => prev.filter((p) => p.id !== id));
    }, 1300);
  }, []);

  const showLine = useCallback(
    (line: DialogueLine) => {
      setDialogue(line);
      bumpStats();
      spawnFloating(line);
      setRandomEventActive(line.kind === "random");
    },
    [bumpStats, spawnFloating],
  );

  const openPhase = useCallback(
    (mode: "study" | "exam", currentRound: number) => {
      setScene(mode);
      setActiveIndex(-1);
      setRandomEventActive(false);
      const intro =
        mode === "study"
          ? professorStudyIntro(currentRound)
          : professorExamIntro(currentRound);
      showLine(systemLine(intro));
    },
    [showLine],
  );

  const beginStudyPhase = useCallback(
    (currentRound: number) => {
      openPhase("study", currentRound);
    },
    [openPhase],
  );

  const beginExamPhase = useCallback(
    (currentRound: number) => {
      openPhase("exam", currentRound);
    },
    [openPhase],
  );

  const runSceneTransition = useCallback(
    (label: string, onMid: () => void) => {
      setFadePhase("out");

      window.setTimeout(() => {
        setFadePhase("black");
        setFadeLabel(label);
        window.setTimeout(() => {
          onMid();
          setFadePhase("in");
          window.setTimeout(() => {
            setFadePhase("none");
            setFadeLabel(undefined);
          }, FADE_IN_MS);
        }, FADE_BLACK_MS);
      }, FADE_OUT_MS);
    },
    [],
  );

  const handleCharacterClick = useCallback(
    (index: number) => {
      if (fadePhase !== "none") return;
      if (scene !== "study" && scene !== "exam") return;

      const slot = students[index];
      const mode = scene === "study" ? "study" : "exam";
      const line = runCharacterAction(slot, index, mode);

      setActiveIndex(index);
      showLine(line);
    },
    [fadePhase, scene, students, showLine],
  );

  const handleGoToExam = useCallback(() => {
    if (fadePhase !== "none") return;
    runSceneTransition("교실 → 강의실", () => beginExamPhase(round));
  }, [fadePhase, round, beginExamPhase, runSceneTransition]);

  const handleFinishRound = useCallback(() => {
    if (fadePhase !== "none") return;
    if (round >= TOTAL_ROUNDS) {
      setScene("ending");
      return;
    }
    const nextRound = round + 1;
    runSceneTransition("강의실 → 교실", () => {
      setRound(nextRound);
      beginStudyPhase(nextRound);
    });
  }, [fadePhase, round, beginStudyPhase, runSceneTransition]);

  const handleViewEnding = useCallback(() => {
    if (fadePhase !== "none") return;
    setScene("ending");
  }, [fadePhase]);

  const handleTitleStart = () => setScene("rules");

  const handleRulesStart = () => {
    setRound(1);
    setStudents(createInitialStudents());
    setStatsTick(0);
    setDialogue(null);
    setActiveIndex(-1);
    setFloatingPopups([]);
    setRandomEventActive(false);
    beginStudyPhase(1);
  };

  const handleRestart = () => {
    setScene("title");
    setRound(1);
    setStudents(createInitialStudents());
    setStatsTick(0);
    setDialogue(null);
    setActiveIndex(-1);
    setFadePhase("none");
    setFadeLabel(undefined);
    setFloatingPopups([]);
    setRandomEventActive(false);
  };

  void statsTick;

  if (scene === "title") {
    return <TitleScene onStart={handleTitleStart} />;
  }

  if (scene === "rules") {
    return <RulesScene onStartRound={handleRulesStart} />;
  }

  if (scene === "study") {
    return (
      <StudyScene
        round={round}
        students={students}
        activeIndex={activeIndex}
        dialogue={dialogue}
        floatingPopups={floatingPopups}
        randomEventActive={randomEventActive}
        fadePhase={fadePhase}
        fadeLabel={fadeLabel}
        onCharacterClick={handleCharacterClick}
        onGoToExam={handleGoToExam}
      />
    );
  }

  if (scene === "exam") {
    return (
      <ExamScene
        round={round}
        students={students}
        activeIndex={activeIndex}
        dialogue={dialogue}
        floatingPopups={floatingPopups}
        randomEventActive={randomEventActive}
        isFinalRound={round === TOTAL_ROUNDS}
        fadePhase={fadePhase}
        fadeLabel={fadeLabel}
        onCharacterClick={handleCharacterClick}
        onFinishRound={handleFinishRound}
        onViewEnding={handleViewEnding}
      />
    );
  }

  return <EndingScene students={students} onRestart={handleRestart} />;
}
