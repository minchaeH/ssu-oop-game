"use client";

import type { FloatingPopup } from "@/lib/game";

interface FloatingTextsProps {
  popups: FloatingPopup[];
}

export function FloatingTexts({ popups }: FloatingTextsProps) {
  return (
    <>
      {popups.map((popup) => (
        <div
          key={popup.id}
          className="pointer-events-none absolute left-1/2 top-0 z-30 flex -translate-x-1/2 flex-col items-center gap-1"
          style={{ minWidth: "120px" }}
        >
          {popup.labels.map((label, i) => (
            <span
              key={`${popup.id}-${i}`}
              className={`vn-float-text whitespace-nowrap text-sm font-black sm:text-base ${
                label.includes("멘탈") && label.startsWith("-")
                  ? "text-rose-400"
                  : label.includes("지능") || label.includes("승점")
                    ? "text-sky-300"
                    : "text-emerald-300"
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {label}
            </span>
          ))}
        </div>
      ))}
    </>
  );
}
