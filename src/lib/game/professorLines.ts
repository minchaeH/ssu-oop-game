export function professorStudyIntro(round: number): string {
  return `제 ${round}차전.\n자, 다들 주목. 이번 주차는 중간고사 대비 집중 공부 기간입니다. 다들 열공하도록!`;
}

export function professorExamIntro(round: number): string {
  return `제 ${round}차전.\n시험지 배부합니다. 다들 앞만 보시고, 지금부터 시험을 시작하세요!`;
}

export function professorRoundEnd(round: number, hasMoreRounds: boolean): string {
  if (!hasMoreRounds) {
    return "수고했습니다. 3차전 시험이 모두 끝났습니다. 최종 순위를 발표하겠습니다.";
  }
  return `${round}차전 시험이 끝났습니다. 잠깐 숨 고르고, 다음 차전을 준비하세요.`;
}
