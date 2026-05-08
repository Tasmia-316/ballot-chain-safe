import { BadgeCheck, ChevronRight } from "lucide-react";
import type { Candidate } from "./data";

export function CandidateCard({
  candidate,
  onSelect,
}: {
  candidate: Candidate;
  onSelect: (c: Candidate) => void;
}) {
  const Symbol = candidate.symbol;
  return (
    <article className="card-lift group relative overflow-hidden rounded-md border border-border bg-card shadow-[var(--shadow-card)]">
      {/* Ballot header strip */}
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
            BALLOT · SR {candidate.serial}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-sm bg-emerald/10 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-emerald">
          <BadgeCheck className="h-3 w-3" />
          Verified
        </span>
      </div>

      <div className="flex gap-4 p-5">
        {/* Election Symbol */}
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-navy-deep/15 bg-background">
            <Symbol className="h-10 w-10 text-navy-deep" strokeWidth={1.6} />
          </div>
          <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {candidate.symbolName}
          </p>
        </div>

        {/* Candidate info */}
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {candidate.partyShort}
          </p>
          <h3 className="mt-0.5 text-[16px] font-semibold leading-tight tracking-tight text-foreground">
            {candidate.name}
          </h3>
          <p className="mt-0.5 text-[12.5px] text-slate-ink">
            {candidate.party}
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
            {candidate.tagline}
          </p>
        </div>
      </div>

      <div className="border-t border-border px-5 py-3">
        <button
          onClick={() => onSelect(candidate)}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-emerald px-4 py-2.5 text-sm font-semibold text-emerald-foreground transition-colors duration-150 hover:bg-emerald/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2"
        >
          Cast Vote for this Candidate
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}
