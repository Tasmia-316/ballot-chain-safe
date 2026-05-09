import { ShieldCheck, Vote } from "lucide-react";

export function Navbar({
  onCastVote,
  onHome,
  onCandidates,
  onVoterInfo,
}: {
  onCastVote: () => void;
  onHome: () => void;
  onCandidates: () => void;
  onVoterInfo: () => void;
}) {
  const links: { label: string; onClick?: () => void }[] = [
    { label: "Home", onClick: onHome },
    { label: "Parties" },
    { label: "Candidates", onClick: onCandidates },
    { label: "Conduct" },
    { label: "Voter Info", onClick: onVoterInfo },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <button onClick={onHome} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-mint">
            <ShieldCheck className="h-5 w-5 text-mint-ink" strokeWidth={1.75} />
          </div>
          <div className="leading-tight text-left">
            <p className="text-[14px] font-semibold tracking-tight text-navy-deep">
              ChainVote · ECP Portal
            </p>
            <p className="text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
              National Election Commission
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={l.onClick}
              className={`text-[13px] font-medium transition-colors ${
                l.onClick
                  ? "text-slate-ink hover:text-navy-deep"
                  : "text-muted-foreground/70 cursor-default"
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={onCastVote}
          className="inline-flex items-center gap-2 rounded-full bg-emerald px-4 py-2 text-[13px] font-semibold text-emerald-foreground shadow-soft transition hover:bg-emerald/90"
        >
          <Vote className="h-4 w-4" strokeWidth={2} />
          Cast Your Vote
        </button>
      </div>
    </header>
  );
}
