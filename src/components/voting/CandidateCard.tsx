import { ChevronRight, User } from "lucide-react";
import type { Candidate } from "./data";

export function CandidateCard({
  candidate,
  onSelect,
}: {
  candidate: Candidate;
  onSelect: (c: Candidate) => void;
}) {
  return (
    <article className="card-lift group relative overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
      {/* Top tinted band */}
      <div
        className={`relative h-28 bg-gradient-to-br ${candidate.accent} bg-navy/[0.02]`}
      >
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,oklch(0.22_0.06_258/0.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.22_0.06_258/0.06)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute -bottom-8 left-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-card bg-navy text-navy-foreground shadow-[var(--shadow-card)]">
          <User className="h-10 w-10 text-white/80" strokeWidth={1.4} />
        </div>
        <div className="absolute right-4 top-4 rounded-md bg-white/85 px-2 py-1 backdrop-blur-sm">
          <span className="font-mono text-[10px] font-semibold tracking-wider text-navy-deep">
            {candidate.partyShort}
          </span>
        </div>
      </div>

      <div className="px-6 pb-6 pt-12">
        <h3 className="text-[17px] font-semibold tracking-tight text-foreground">
          {candidate.name}
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{candidate.party}</p>
        <p className="mt-3 text-[12.5px] text-muted-foreground/90">
          {candidate.tagline}
        </p>

        <button
          onClick={() => onSelect(candidate)}
          className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-teal px-4 py-2.5 text-sm font-semibold text-teal-foreground transition-all duration-200 hover:bg-teal-glow hover:shadow-[var(--shadow-teal-glow)] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          Select Candidate
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}
