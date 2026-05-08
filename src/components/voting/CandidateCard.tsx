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
      className="tile-hover group flex aspect-square flex-col items-center justify-center gap-5 rounded-2xl border border-border bg-card p-6 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-deep focus-visible:ring-offset-2"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-navy-deep/5">
        <Symbol
          className="h-10 w-10 text-navy-deep"
          strokeWidth={1.25}
        />
      </div>
      <h3 className="text-[15px] font-semibold leading-tight tracking-tight text-navy-deep">
        {candidate.name}
      </h3>
    </button>
  );
}
