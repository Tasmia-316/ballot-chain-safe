import { ShieldCheck, UserCircle2, Lock } from "lucide-react";

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-navy-deep/95 backdrop-blur-md text-navy-foreground">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-teal/15 ring-1 ring-teal/40">
            <ShieldCheck className="h-5 w-5 text-teal" />
          </div>
          <div className="leading-tight">
            <p className="text-[13px] font-semibold tracking-wide">CHAINVOTE</p>
            <p className="text-[10.5px] uppercase tracking-[0.18em] text-white/50">
              Secure Ledger Voting
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1.5 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            <Lock className="h-3.5 w-3.5 text-teal" />
            <span className="text-[11px] font-medium tracking-wide text-teal">
              Secure Session · TLS 1.3
            </span>
          </div>
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
            <UserCircle2 className="h-5 w-5 text-white/70" />
            <span className="font-mono text-[12px] text-white/85">
              Voter: SP25-BCT-049
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
