"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TitleScene } from "@/components/scenes/TitleScene";
import { RulesScene } from "@/components/scenes/RulesScene";
import { StudyScene } from "@/components/scenes/StudyScene";
import { ExamScene } from "@/components/scenes/ExamScene";
import { EndingScene } from "@/components/scenes/EndingScene";
import type { FadePhase } from "@/components/game/SceneTransitionOverlay";
import {
  AUTO_PLAY_MS,
  TOTAL_ROUNDS,
  buildExamTurnLines,
  buildStudyTurnLines,
  deltasToLabels,
  professorExamIntro,
  professorRoundEnd,
  professorStudyIntro,
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

type PhaseMode = "study" | "exam";

export function GameSimulation() {
  const [scene, setScene] = useState<SceneId>("title");
  const [round, setRound] = useState(1);
  const [students, setStudents] = useState<StudentSlot[]>(createInitialStudents);
  const [statsTick, setStatsTick] = useState(0);

  const [studentTurnIndex, setStudentTurnIndex] = useState(0);
  const [dialogueQueue, setDialogueQueue] = useState<DialogueLine[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [dialogue, setDialogue] = useState<DialogueLine | null>(null);
  const [canAdvance, setCanAdvance] = useState(false);
  const [awaitingPhaseIntro, setAwaitingPhaseIntro] = useState(false);
  const [examPhaseDone, setExamPhaseDone] = useState(false);

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
      setCanAdvance(true);
      bumpStats();
      spawnFloating(line);

      if (line.kind === "random") {
        setRandomEventActive(true);
      }
    },
    [bumpStats, spawnFloating],
  );

  const loadStudentTurn = useCallback(
    (index: number, mode: PhaseMode, slots: StudentSlot[]) => {
      const slot = slots[index];
      const lines =
        mode === "study"
          ? buildStudyTurnLines(slot, index)
          : buildExamTurnLines(slot, index);

      setStudentTurnIndex(index);
      setDialogueQueue(lines);
      setQueueIndex(0);
      showLine(lines[0]);
    },
    [showLine],
  );

  const openPhase = useCallback(
    (mode: PhaseMode, currentRound: number) => {
      setAwaitingPhaseIntro(true);
      setExamPhaseDone(false);
      setScene(mode);
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
      setCanAdvance(false);
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

  const advanceDialogue = useCallback(() => {
    if (!canAdvance || fadePhase !== "none") return;
    setCanAdvance(false);

    if (dialogue?.kind !== "random") {
      setRandomEventActive(false);
    }

    if (awaitingPhaseIntro) {
      setAwaitingPhaseIntro(false);
      const mode: PhaseMode = scene === "study" ? "study" : "exam";
      loadStudentTurn(0, mode, students);
      return;
    }

    const mode: PhaseMode = scene === "study" ? "study" : "exam";

    if (queueIndex < dialogueQueue.length - 1) {
      const nextIdx = queueIndex + 1;
      setQueueIndex(nextIdx);
      showLine(dialogueQueue[nextIdx]);
      return;
    }

    const nextStudent = studentTurnIndex + 1;
    if (nextStudent < students.length) {
      loadStudentTurn(nextStudent, mode, students);
      return;
    }

    if (mode === "study") {
      setDialogue(null);
      setRandomEventActive(false);
      runSceneTransition("교실 → 강의실", () => beginExamPhase(round));
      return;
    }

    setExamPhaseDone(true);
    setRandomEventActive(false);
    showLine(
      systemLine(professorRoundEnd(round, round < TOTAL_ROUNDS)),
    );
    setCanAdvance(false);
  }, [
    canAdvance,
    fadePhase,
    dialogue,
    awaitingPhaseIntro,
    scene,
    queueIndex,
    dialogueQueue,
    studentTurnIndex,
    students,
    loadStudentTurn,
    beginExamPhase,
    round,
    showLine,
    runSceneTransition,
  ]);

  const advanceRef = useRef(advanceDialogue);
  advanceRef.current = advanceDialogue;

  useEffect(() => {
    if (scene !== "study" && scene !== "exam") return;
    if (!canAdvance || fadePhase !== "none" || examPhaseDone) return;

    const timer = window.setTimeout(() => {
      advanceRef.current();
    }, AUTO_PLAY_MS);

    return () => window.clearTimeout(timer);
  }, [
    scene,
    canAdvance,
    fadePhase,
    examPhaseDone,
    dialogue,
    queueIndex,
    studentTurnIndex,
    awaitingPhaseIntro,
    round,
  ]);

  useEffect(() => {
    if (dialogue?.kind !== "random") return;
    const timer = window.setTimeout(() => setRandomEventActive(false), AUTO_PLAY_MS);
    return () => window.clearTimeout(timer);
  }, [dialogue]);

  const handleTitleStart = () => setScene("rules");

  const handleRulesStart = () => {
    setRound(1);
    setStudents(createInitialStudents());
    setStatsTick(0);
    setExamPhaseDone(false);
    setFloatingPopups([]);
    setRandomEventActive(false);
    beginStudyPhase(1);
  };

  const handleNextRound = () => {
    const nextRound = round + 1;
    setRound(nextRound);
    setExamPhaseDone(false);
    runSceneTransition("강의실 → 교실", () => beginStudyPhase(nextRound));
  };

  const handleViewEnding = () => setScene("ending");

  const handleRestart = () => {
    setScene("title");
    setRound(1);
    setStudents(createInitialStudents());
    setStatsTick(0);
    setStudentTurnIndex(0);
    setDialogue(null);
    setDialogueQueue([]);
    setQueueIndex(0);
    setCanAdvance(false);
    setAwaitingPhaseIntro(false);
    setExamPhaseDone(false);
    setFadePhase("none");
    setFadeLabel(undefined);
    setFloatingPopups([]);
    setRandomEventActive(false);
  };

  const activeIndex =
    dialogue && dialogue.kind !== "system" && dialogue.studentIndex >= 0
      ? dialogue.studentIndex
      : -1;

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
        examPhaseDone={examPhaseDone}
        isFinalRound={round >= TOTAL_ROUNDS}
        fadePhase={fadePhase}
        fadeLabel={fadeLabel}
        onNextRound={handleNextRound}
        onViewEnding={handleViewEnding}
      />
    );
  }

  return <EndingScene students={students} onRestart={handleRestart} />;
}
