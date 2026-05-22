"use client";

export type FadePhase = "none" | "out" | "black" | "in";

interface SceneTransitionOverlayProps {
  phase: FadePhase;
  label?: string;
}

export function SceneTransitionOverlay({ phase, label }: SceneTransitionOverlayProps) {
  if (phase === "none") return null;

  const animClass =
    phase === "out" ? "vn-fade-out" : phase === "in" ? "vn-fade-in" : "";

  return (
    <div
      className={`vn-fade-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black ${animClass} ${
        phase === "black" ? "opacity-100" : ""
      }`}
      aria-hidden={phase !== "black"}
    >
      {phase === "black" && label && (
        <p className="animate-pulse text-center text-sm tracking-[0.25em] text-slate-500">
          {label}
        </p>
      )}
    </div>
  );
}
