import type { ReactNode } from "react";

interface IngameSceneLayoutProps {
  stage: ReactNode;
  footer: ReactNode;
}

/** Scene 3·4 — 캐릭터 영역 중앙 / 대화창 하단 고정 */
export function IngameSceneLayout({ stage, footer }: IngameSceneLayoutProps) {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center px-2 pb-6 pt-2 sm:mt-12 md:mt-20 lg:mt-24">
        {stage}
      </div>
      <div className="mb-8 mt-auto w-full shrink-0">{footer}</div>
    </>
  );
}
