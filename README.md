# 🏫 숭실대 컴퓨터학부 시험기간 시뮬레이션
> **Python OOP 핵심 설계를 Next.js + TypeScript + Tailwind CSS 기반의 비주얼 노벨/RPG 스타일로 포팅 및 시각화한 프로젝트입니다.**

## 🚀 라이브 플레이 및 배포 링크
* **배포 URL:** https://ssu-oop-game.vercel.app/
* 로컬 접속 주소: http://localhost:3000

---

## 🎯 OOP (객체지향) 핵심 설계 및 시각화 포인트
본 프로젝트는 단순한 게임 구현을 넘어, 객체지향 프로그래밍(OOP)의 핵심 가치를 UI/UX로 시각화하는 데 집중했습니다.

* **추상화 (Abstraction):** `StudentADT` 추상 클래스를 통해 학생의 기본 행위(공부, 시험) 인터페이스 정의
* **상속 (Inheritance):** 공통 기능을 갖춘 부모 클래스 `StudentBase`를 구현하고, 이를 3종의 자식 클래스가 확장 (`extends`)
* **다형성 & 오버라이딩 (Polymorphism & Overriding):** 
  * 자식 클래스(`GPTAddict`, `CoffeeLover`, `Bokhaksaeng`)들이 부모의 `study()`와 `take_exam()` 메서드를 각자의 특성에 맞게 고유하게 재정의
  * **메인 인트로 화면에서 이 상속 계층 구조와 오버라이딩 명세를 UML 다이어그램 형태로 시각화**하여 OOP 구조를 한눈에 파악 가능하도록 구현

---

## 🎬 Scene 흐름
1. **타이틀** — UML 상속 다이어그램 구조 확인 + [시뮬레이션 시작]
2. **룰 설명** — 3차전 서바이벌 규칙 안내 + [1차전 시작하기]
3. **공부 시간 (교실)** — 유저 인터랙션 기반 수동 턴제 진행, 30% 확률의 돌발 랜덤 이벤트 발생
4. **시험 시간 (강의실)** — 턴제 결과 확인 및 다형성 로직 작동 + [다음 라운드 시작]
5. **엔딩** — 최종 성적 산출 및 최종 순위 발표 (3차전 완료 후)

---

## 🎮 조작 및 UI 기능
* **수동 턴제 시스템:** 자동 진행 방식을 배제하고 유저가 화면을 **클릭**할 때마다 대사와 턴이 넘어가도록 구현하여 높은 몰입도 제공
* **화면 전환 효과:** 교실 ↔ 강의실 전환 시 자연스러운 페이드 아웃 및 페이드 인 프로세스 적용
* **상태 시각화:** 능력치 변화 시 캐릭터 머리 위에 직관적인 `Floating 텍스트` (+지능 / -멘탈 등) 출력
* **이벤트 연출:** 랜덤 이벤트(30% 확률) 발생 시 카드 반짝임 효과 및 화면 테두리 강조 연출

---

## 📁 코드 구조 (Architecture)
* `src/lib/students/` — 핵심 OOP 클래스 설계 (`StudentBase` → 자식 3종 상속 구조)
* `src/lib/game/` — 게임 진행 상태 템플릿, 랜덤 이벤트 및 대사 생성 엔진
* `src/components/game/GameSimulation.tsx` — React State 기반의 메인 Scene 통제 및 수동 턴 관리 엔진
* `src/components/game/UmlDiagram.tsx` — 인트로 화면의 OOP 구조 시각화 컴포넌트
* `src/components/scenes/` — 각 스테이지별(Scene 1~4) 독립 UI 컴포넌트 분리

---

## 🛠️ 로컬 실행 방법
```bash
# 의존성 패키지 설치
npm install

# 로컬 개발 서버 실행
npm run dev
