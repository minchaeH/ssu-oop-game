import type { ReactNode } from "react";

export type SceneBackgroundKey = "campus" | "study" | "exam";

const BACKGROUNDS: Record<SceneBackgroundKey, string> = {
  campus: "bg-[url('/ssupic.jpg')]",
  study: "bg-[url('/studypic.jpg')]",
  exam: "bg-[url('/testpic.jpg')]",
};

interface SceneBackgroundProps {
  variant: SceneBackgroundKey;
  children: ReactNode;
  className?: string;
}

export function SceneBackground({
  variant,
  children,
  className = "",
}: SceneBackgroundProps) {
  return (
    <div
      className={`min-h-screen bg-cover bg-center bg-no-repeat ${BACKGROUNDS[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
