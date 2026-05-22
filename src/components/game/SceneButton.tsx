interface SceneButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function SceneButton({
  children,
  onClick,
  disabled = false,
  className = "",
}: SceneButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`game-btn w-full max-w-xs rounded-2xl border-b-4 border-[#3A8EAB] bg-[#5BC0DE] px-8 py-3.5 text-lg font-bold text-white transition active:translate-y-0.5 active:border-b-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[240px] ${className}`}
    >
      {children}
    </button>
  );
}
