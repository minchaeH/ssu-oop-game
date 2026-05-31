export function UmlDiagram() {
  const childClasses = [
    {
      name: "GPTAddict",
      overrides: [
        "+ study() : 지능↑ 멘탈 방어",
        "+ take_exam() : 다형성 (대박 or 서버다운)",
      ],
    },
    {
      name: "CoffeeLover",
      overrides: [
        "+ study() : 지능 폭발, 멘탈 극소모",
        "+ take_exam() : 다형성 (각성 or 크래시)",
      ],
    },
    {
      name: "Bokhaksaeng",
      overrides: [
        "+ study() : 멘탈 회복",
        "+ take_exam() : 다형성 (멘탈 비례 보너스)",
      ],
    },
  ] as const;

  const methodTextClass =
    "text-[10px] font-normal leading-snug text-gray-400/90";

  return (
    <div
      className="w-full font-mono text-[10px] text-white/90"
      aria-label="UML 상속 구조 다이어그램"
    >
      <div className="game-modal-sm rounded-xl border border-yellow-400/40 px-3 py-2.5 text-center">
        <p className="text-[10px] uppercase tracking-widest text-yellow-400/90">
          &lt;&lt;abstract&gt;&gt;
        </p>
        <p className="text-base font-bold text-white">StudentADT</p>
        <p className="mt-0.5 text-[10px] text-white/60">공부 · 시험 · 자기소개</p>
      </div>

      <div className="mx-auto my-1 h-4 w-px bg-white/30" />

      <div className="game-modal-sm rounded-xl border border-[#5BC0DE]/50 px-3 py-2.5 text-center">
        <p className="text-[10px] uppercase tracking-widest text-[#5BC0DE]">class</p>
        <p className="text-base font-bold text-white">StudentBase</p>
        <p className="mt-0.5 text-[10px] text-white/60">implements StudentADT</p>
        <ul className={`mt-2 space-y-0.5 text-left ${methodTextClass}`}>
          <li>+ study() : 기본 지능/멘탈 증감 로직</li>
          <li>+ take_exam() : 기본 시험 진행 로직</li>
        </ul>
      </div>

      <div className="relative mx-auto my-1 h-6 w-[85%]">
        <div className="absolute left-[16.6%] top-0 h-3 w-px bg-white/30" />
        <div className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-white/30" />
        <div className="absolute right-[16.6%] top-0 h-3 w-px bg-white/30" />
        <div className="absolute left-[16.6%] right-[16.6%] top-3 h-px bg-white/30" />
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {childClasses.map(({ name, overrides }) => (
          <div
            key={name}
            className="game-modal-sm rounded-lg border border-emerald-400/40 px-1.5 py-2 text-center"
          >
            <p className="text-[8px] text-emerald-300/80">extends</p>
            <p className="text-[10px] font-semibold text-white sm:text-xs">{name}</p>
            <ul className={`mt-2 space-y-0.5 text-left ${methodTextClass}`}>
              {overrides.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
