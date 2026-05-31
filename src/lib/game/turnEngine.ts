import type { StudentSlot } from "@/lib/students";
import type { DialogueLine } from "./types";
import { rollStudyRandomEvent } from "./randomEvents";
import { computeDeltas, snapshotStats } from "./statSnapshot";

function lineFromStudent(
  slot: StudentSlot,
  studentIndex: number,
  kind: DialogueLine["kind"],
  text: string,
  statDeltas?: DialogueLine["statDeltas"],
): DialogueLine {
  return {
    kind,
    speaker: slot.instance.name,
    emoji: slot.emoji,
    text,
    studentIndex,
    statDeltas,
  };
}

export function buildStudyTurnLines(
  slot: StudentSlot,
  studentIndex: number,
): DialogueLine[] {
  const lines: DialogueLine[] = [];
  const event = rollStudyRandomEvent();

  if (event) {
    const before = snapshotStats(slot.instance);
    slot.instance.applyBonus(event.intelligence, event.mental);
    const after = snapshotStats(slot.instance);
    lines.push(
      lineFromStudent(
        slot,
        studentIndex,
        "random",
        `✨ ${event.message}`,
        computeDeltas(before, after),
      ),
    );
  }

  const beforeStudy = snapshotStats(slot.instance);
  const studyMsg = slot.instance.study();
  const afterStudy = snapshotStats(slot.instance);
  lines.push(
    lineFromStudent(
      slot,
      studentIndex,
      "study",
      studyMsg,
      computeDeltas(beforeStudy, afterStudy),
    ),
  );

  return lines;
}

export function buildExamTurnLines(
  slot: StudentSlot,
  studentIndex: number,
): DialogueLine[] {
  const before = snapshotStats(slot.instance);
  const examMsg = slot.instance.takeExam();
  const after = snapshotStats(slot.instance);
  return [
    lineFromStudent(
      slot,
      studentIndex,
      "exam",
      examMsg,
      computeDeltas(before, after),
    ),
  ];
}

/** 클릭 1회 = 해당 캐릭터 전체 턴(랜덤+행동) 실행 후 대화창용 한 줄 */
export function runCharacterAction(
  slot: StudentSlot,
  studentIndex: number,
  mode: "study" | "exam",
): DialogueLine {
  const before = snapshotStats(slot.instance);
  const lines =
    mode === "study"
      ? buildStudyTurnLines(slot, studentIndex)
      : buildExamTurnLines(slot, studentIndex);
  const after = snapshotStats(slot.instance);

  const hasRandom = lines.some((l) => l.kind === "random");
  const primaryKind: DialogueLine["kind"] =
    mode === "exam" ? "exam" : hasRandom ? "random" : "study";

  return lineFromStudent(
    slot,
    studentIndex,
    primaryKind,
    lines.map((l) => l.text).join("\n\n"),
    computeDeltas(before, after),
  );
}

