import { useEffect, useRef, useState } from "react";
import { Download, X } from "lucide-react";
import type { Candidate } from "./data";

type Phase = "details" | "processing" | "success";

export function VoteModal({
  candidate,
  onClose,
  onReturn,
}: {
  candidate: Candidate;
  onClose: () => void;
  onReturn: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("details");
  const [progress, setProgress] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => timers.current.forEach((t) => window.clearTimeout(t));
  }, []);

  const cast = () => {
    setPhase("processing");
    setProgress(0);
    const start = Date.now();
    const duration = 2400;
    const tick = () => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p < 100) {
        const id = window.requestAnimationFrame(tick);
        timers.current.push(id as unknown as number);
      } else {
        const done = window.setTimeout(() => setPhase("success"), 200);
        timers.current.push(done);
      }
    };
    tick();
  };

  const Symbol = candidate.symbol;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-overlay-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-navy-deep/30 backdrop-blur-sm"
        onClick={phase !== "processing" ? onClose : undefined}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-xl animate-scale-in">
        {/* Top progress line (visible during processing) */}
        {phase === "processing" && (
          <div className="absolute left-0 right-0 top-0 z-10 h-[2px] bg-muted">
            <div
              className="h-full bg-emerald transition-[width] duration-150 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {phase !== "processing" && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        )}

        {phase === "details" && (
          <div className="p-10">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <Symbol className="h-12 w-12 text-navy-deep" strokeWidth={1.25} />
              </div>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-navy-deep">
                {candidate.name}
              </h2>
              <p className="mt-1 text-[13px] text-muted-foreground">
                {candidate.party}
              </p>
              <p className="mt-5 text-[13px] font-medium uppercase tracking-[0.18em] text-navy-deep/70">
                {candidate.tagline}
              </p>
            </div>

            <button
              onClick={cast}
              className="mt-8 w-full rounded-xl bg-emerald px-4 py-3 text-sm font-semibold text-emerald-foreground transition hover:bg-emerald/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2"
            >
              Cast Vote
            </button>
          </div>
        )}

        {phase === "processing" && (
          <div className="p-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <Symbol className="h-12 w-12 text-navy-deep/60" strokeWidth={1.25} />
              </div>
              <p className="mt-8 text-[13px] uppercase tracking-[0.2em] text-muted-foreground">
                Recording to ledger
              </p>
            </div>
          </div>
        )}

        {phase === "success" && (
          <div className="p-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald/10">
                <svg viewBox="0 0 24 24" className="h-12 w-12">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="oklch(0.60 0.16 152)" strokeWidth="1.25" />
                  <path
                    d="M7.5 12.5l3 3L16.5 9"
                    fill="none"
                    stroke="oklch(0.60 0.16 152)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="check-draw"
                  />
                </svg>
              </div>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-navy-deep">
                Vote Cast
              </h2>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Recorded on the immutable ledger.
              </p>

              <button className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium text-navy-deep transition hover:bg-muted">
                <Download className="h-4 w-4" strokeWidth={1.5} />
                Download Receipt
              </button>

              <button
                onClick={onReturn}
                className="mt-3 text-[12px] text-muted-foreground hover:text-navy-deep"
              >
                Return to dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
