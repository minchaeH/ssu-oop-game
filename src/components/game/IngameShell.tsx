"use client";

import type { ReactNode } from "react";
import type { SceneBackgroundKey } from "@/components/ui/SceneBackground";
import { SceneBackground } from "@/components/ui/SceneBackground";
import { GameModal } from "@/components/ui/GameModal";
import type { FadePhase } from "./SceneTransitionOverlay";
import { SceneTransitionOverlay } from "./SceneTransitionOverlay";

interface IngameShellProps {
  bgVariant: Extract<SceneBackgroundKey, "study" | "exam">;
  round: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  fadePhase: FadePhase;
  fadeLabel?: string;
  randomEventActive: boolean;
}

export function IngameShell({
  bgVariant,
  round,
  title,
  subtitle,
  children,
  fadePhase,
  fadeLabel,
  randomEventActive,
}: IngameShellProps) {
  return (
    <SceneBackground
      variant={bgVariant}
      className={`relative flex min-h-screen flex-col ${randomEventActive ? "vn-random-border" : ""}`}
    >
      <SceneTransitionOverlay phase={fadePhase} label={fadeLabel} />

      <div className="px-4 pt-5 sm:px-6">
        <GameModal size="full" className="py-4 sm:py-5">
          <p className="text-xs tracking-widest text-yellow-400/90">
            제 {round}차전
          </p>
          <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">{title}</h2>
          <p className="mt-0.5 text-sm text-white/75">{subtitle}</p>
        </GameModal>
      </div>

      <main className="flex min-h-0 flex-1 flex-col px-4 sm:px-6">
        {children}
      </main>
    </SceneBackground>
  );
}
