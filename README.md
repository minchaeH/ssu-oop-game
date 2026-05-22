# 숭실대 컴퓨터학부 시험기간 시뮬레이션

Python OOP 과제를 **Next.js + TypeScript + Tailwind** 비주얼 노벨/RPG 스타일 게임으로 포팅한 프로젝트입니다.

## Scene 흐름

1. **타이틀** — UML 상속 다이어그램 + [시뮬레이션 시작]
2. **룰 설명** — 3차전 규칙 안내 + [1차전 시작하기]
3. **공부 시간 (교실)** — 턴제 말풍선, 30% 랜덤 이벤트
4. **시험 시간 (강의실)** — 턴제 말풍선 + [다음 라운드 시작]
5. **엔딩** — 최종 순위 (3차전 완료 후)

## 실행

```bash
npm install
npm run dev
```

http://localhost:3000

## 조작

- Scene 3·4는 **1.5초 간격 자동 진행** (클릭 불필요, 컷신 감상)
- 교실↔강의실 전환 시 **페이드 아웃 → 검은 화면 → 페이드 인**
- 능력치 변화 시 캐릭터 머리 위 **Floating 텍스트** (+지능 / -멘탈 등)
- 랜덤 이벤트(30%) 시 카드 반짝임 + 화면 테두리 강조
- 시험 종료 후에만 [다음 라운드 시작] 버튼 클릭

## 코드 구조

- `src/lib/students/` — OOP 클래스 (`StudentBase` → 자식 3종)
- `src/lib/game/` — Scene 상태, 랜덤 이벤트, 턴 대사 생성
- `src/components/game/GameSimulation.tsx` — React State 기반 Scene/턴 관리
- `src/components/scenes/` — Scene 1~4 UI
