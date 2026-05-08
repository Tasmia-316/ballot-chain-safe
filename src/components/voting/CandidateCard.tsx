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
    <button
      onClick={() => onSelect(candidate)}
      className="tile-hover group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
    >
      <div className="flex w-full items-center justify-between">
        <span className="rounded-full bg-mint px-2.5 py-1 font-mono text-[10px] tracking-wider text-mint-ink">
          #{candidate.serial}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {candidate.partyShort}
        </span>
      </div>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-mint ring-4 ring-mint/40 transition-colors group-hover:ring-mint-deep/40">
        <Symbol className="h-10 w-10 text-mint-ink" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-[14.5px] font-semibold leading-tight tracking-tight text-navy-deep">
          {candidate.name}
        </h3>
        <p className="mt-1 text-[11.5px] text-slate-ink">{candidate.party}</p>
      </div>
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-mint-ink">
        Symbol · {candidate.symbolName}
      </p>
    </button>
  );
}
