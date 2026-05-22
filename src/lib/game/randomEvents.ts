export interface RandomStudyEvent {
  message: string;
  intelligence: number;
  mental: number;
}

/** 30% 랜덤 이벤트 — 3라운드 밸런스를 깨지 않도록 소폭 보정만 */
export const STUDY_RANDOM_EVENTS: RandomStudyEvent[] = [
  { message: "아! 족보를 찾았다!", intelligence: 10, mental: -4 },
  { message: "갑자기 뇌가 맑아진다!", intelligence: 6, mental: 10 },
  { message: "교수님이 복도에서 핵심 한 줄 툭 던져주셨다!", intelligence: 8, mental: 4 },
  { message: "선배가 카톡으로 정리본을 보내줬다!", intelligence: 7, mental: 6 },
  { message: "유튜브 추천이 이번엔 진짜 레전드 강의다!", intelligence: 8, mental: -5 },
  { message: "스터디 카페 각 잡고 1시간만 더!", intelligence: 9, mental: -6 },
];

export const RANDOM_EVENT_CHANCE = 0.3;

export function rollStudyRandomEvent(): RandomStudyEvent | null {
  if (Math.random() >= RANDOM_EVENT_CHANCE) return null;
  const index = Math.floor(Math.random() * STUDY_RANDOM_EVENTS.length);
  return STUDY_RANDOM_EVENTS[index];
}
