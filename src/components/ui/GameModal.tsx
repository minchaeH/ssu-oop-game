import type { ReactNode } from "react";

interface GameModalProps {
  children: ReactNode;
  className?: string;
  size?: "md" | "lg" | "full";
}

const sizeClass = {
  md: "max-w-md",
  lg: "max-w-2xl",
  full: "max-w-4xl",
};

export function GameModal({
  children,
  className = "",
  size = "md",
}: GameModalProps) {
  return (
    <div
      className={`game-modal mx-auto w-full rounded-3xl bg-black/70 px-6 py-8 text-center backdrop-blur-sm sm:px-8 sm:py-10 ${sizeClass[size]} ${className}`}
    >
      {children}
    </div>
  );
}
