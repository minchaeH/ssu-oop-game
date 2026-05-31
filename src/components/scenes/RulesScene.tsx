import { SceneButton } from "@/components/game/SceneButton";
import { TOTAL_ROUNDS } from "@/lib/game";
import { GameModal } from "@/components/ui/GameModal";
import { SceneBackground } from "@/components/ui/SceneBackground";

interface RulesSceneProps {
  onStartRound: () => void;
}

export function RulesScene({ onStartRound }: RulesSceneProps) {
  return (
    <SceneBackground
      variant="campus"
      className="flex min-h-screen items-center justify-center px-4 py-10"
    >
      <GameModal className="flex flex-col items-center gap-8">
        <p className="text-lg font-medium text-white">&lt;시뮬레이션 규칙&gt;</p>

        <div className="space-y-4 text-base leading-relaxed text-white sm:text-lg">
          <p>
            본 시뮬레이션은 총{" "}
            <span className="game-highlight">{TOTAL_ROUNDS}차전</span>
            으로 구성되어 있습니다.
          </p>
          <p>
            <span className="game-highlight">[공부 시간 ➡️ 시험 시간]</span>이
            1사이클이며,
            <br />
            총 {TOTAL_ROUNDS}번의 사이클이 돌아갑니다.
          </p>
          <p className="game-subtext text-sm">
            캐릭터를 클릭해 공부·시험을 진행합니다.
            <br />
            공부 시간에는 30% 확률로 랜덤 이벤트가 발생합니다.
          </p>
        </div>

        <SceneButton onClick={onStartRound}>1차전 시작하기</SceneButton>
      </GameModal>
    </SceneBackground>
  );
}
