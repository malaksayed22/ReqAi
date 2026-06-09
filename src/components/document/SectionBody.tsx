"use client";

interface SectionBodyProps {
  content: string;
  accent: string;
}

export function SectionBody({ content, accent }: SectionBodyProps) {
  const lines = content.split("\n").filter((l) => l.trim());

  return (
    <div className="flex flex-col gap-2">
      {lines.map((line, i) => {
        const t = line.trim();

        // Numbered list
        if (/^\d+\./.test(t)) {
          const num = parseInt(t.match(/^(\d+)/)![1]);
          const text = t.replace(/^\d+\.\s*/, "");
          return (
            <div key={i} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold mt-0.5 font-mono"
                style={{ background: `${accent}18`, border: `1px solid ${accent}35`, color: accent }}
              >
                {num}
              </span>
              <p className="text-sm leading-relaxed text-slate-400">{text}</p>
            </div>
          );
        }

        // Bullet with pipes (tech stack / risk table)
        const stripped = t.replace(/^[-•]\s*/, "");
        if (/^[-•]/.test(t) && stripped.includes("|")) {
          const parts = stripped.split("|").map((p) => p.trim());
          return (
            <div key={i} className="flex flex-wrap items-start gap-0 rounded-lg overflow-hidden border border-slate-700/50 bg-slate-800/40">
              {parts.map((p, pi) => (
                <span
                  key={pi}
                  className={`px-3 py-2 text-[13px] ${pi === 0
                    ? "font-semibold text-slate-200 bg-slate-800/60 min-w-[120px]"
                    : "text-slate-400 border-l border-slate-700/50"
                  }`}
                >
                  {p}
                </span>
              ))}
            </div>
          );
        }

        // Bullet with colon label (non-functional, timeline)
        if (/^[-•]/.test(t) && stripped.includes(":") && !stripped.startsWith("http")) {
          const colonIdx = stripped.indexOf(":");
          const label = stripped.slice(0, colonIdx).trim();
          const val = stripped.slice(colonIdx + 1).trim();
          return (
            <div key={i} className="flex items-start gap-3 px-3 py-2 rounded-lg bg-slate-800/40 border border-slate-700/40">
              <span
                className="flex-shrink-0 text-[11px] font-bold uppercase tracking-wider pt-0.5"
                style={{ color: accent }}
              >
                {label}
              </span>
              {val && <span className="text-[13px] text-slate-400 leading-relaxed">{val}</span>}
            </div>
          );
        }

        // Plain bullet
        if (/^[-•]/.test(t)) {
          return (
            <div key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-[7px]" style={{ background: accent }} />
              <p className="text-sm leading-relaxed text-slate-400">{stripped}</p>
            </div>
          );
        }

        // Phase line (timeline)
        if (/^Phase \d/i.test(t) || /^- Phase/i.test(t)) {
          return (
            <div key={i} className="pl-3 py-2 border-l-2 rounded-r-lg text-sm text-slate-400 leading-relaxed"
              style={{ borderColor: accent, background: `${accent}08` }}>
              {t.replace(/^-\s*/, "")}
            </div>
          );
        }

        // Plain paragraph
        return <p key={i} className="text-sm leading-relaxed text-slate-400">{t}</p>;
      })}
    </div>
  );
}
