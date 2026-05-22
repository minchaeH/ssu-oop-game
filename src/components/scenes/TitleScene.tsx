import { SceneButton } from "@/components/game/SceneButton";
import { UmlDiagram } from "@/components/game/UmlDiagram";
import { GameModal } from "@/components/ui/GameModal";
import { SceneBackground } from "@/components/ui/SceneBackground";

interface TitleSceneProps {
  onStart: () => void;
}

export function TitleScene({ onStart }: TitleSceneProps) {
  return (
    <SceneBackground
      variant="campus"
      className="flex min-h-screen flex-col items-center justify-center px-4 py-10"
    >
      <GameModal size="lg" className="flex flex-col items-center gap-6">
        <div>
          <h1 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
            숭실대 컴퓨터학부
            <br />
            시험기간 시뮬레이션
          </h1>
          <p className="mt-2 text-sm text-white/80">3차전 서바이벌</p>
        </div>

        <UmlDiagram />

        <SceneButton onClick={onStart}>시뮬레이션 시작</SceneButton>
      </GameModal>
    </SceneBackground>
  );
}
