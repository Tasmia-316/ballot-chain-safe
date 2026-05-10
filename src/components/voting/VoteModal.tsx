import { useEffect, useMemo, useRef, useState } from "react";
import SHA256 from "crypto-js/sha256";
import { Download, X, Check, Hash, Lock, ShieldCheck, Database, ArrowLeft, Copy } from "lucide-react";
import type { Candidate } from "./data";

type Phase = "confirm" | "processing" | "success";

const STEPS = [
  { label: "Generating SHA-256 Hash", code: "M4-UC3", icon: Hash },
  { label: "Encrypting Vote Data (AES-256)", code: "M4-UC4", icon: Lock },
  { label: "Verifying Vote Integrity", code: "M4-UC6", icon: ShieldCheck },
  { label: "Recording to Distributed Ledger", code: "M4-UC5", icon: Database },
];

const STEP_DURATION = 900;

export function VoteModal({
  candidate,
  userID,
  onClose,
  onReturn,
  onCast,
}: {
  candidate: Candidate;
  userID: string;
  onClose: () => void;
  onReturn: () => void;
  onCast: (voteHash: string) => void;
}) {
  const [phase, setPhase] = useState<Phase>("confirm");
  const [stepIndex, setStepIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const timers = useRef<number[]>([]);

  // SHA-256 hash of the vote payload — generated once when modal opens
  const voteHash = useMemo(() => {
    const payload = `${userID}|${candidate.id}|${candidate.name}|${Date.now()}`;
    return SHA256(payload).toString();
  }, [userID, candidate.id, candidate.name]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const cast = () => {
    setPhase("processing");
    setStepIndex(0);
    STEPS.forEach((_, i) => {
      const t = window.setTimeout(() => setStepIndex(i + 1), (i + 1) * STEP_DURATION);
      timers.current.push(t);
    });
    const done = window.setTimeout(() => {
      setPhase("success");
      onCast(voteHash);
    }, STEPS.length * STEP_DURATION + 500);
    timers.current.push(done);
  };

  const copyHash = () => {
    navigator.clipboard?.writeText(voteHash);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  const Symbol = candidate.symbol;
  const txId = "0x" + voteHash.slice(0, 38);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-overlay-in" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-navy-deep/40 backdrop-blur-sm"
        onClick={phase !== "processing" ? onClose : undefined}
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-card animate-scale-in">
        {phase !== "processing" && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-slate-ink transition-colors hover:bg-mint hover:text-navy-deep"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {phase === "confirm" && (
          <div className="p-10">
            <p className="text-center text-[12px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Confirm Your Vote
            </p>
            <div className="mt-6 flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-mint ring-8 ring-mint/40">
                <Symbol className="h-12 w-12 text-mint-ink" strokeWidth={1.5} />
              </div>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-navy-deep">
                {candidate.name}
              </h2>
              <p className="mt-1 text-[13px] text-slate-ink">{candidate.party}</p>
              <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-mint-ink">
                Symbol · {candidate.symbolName}
              </p>
            </div>

            <div className="mt-8 rounded-xl border border-border bg-mint/40 px-4 py-3 text-center text-[12px] text-slate-ink">
              Your vote is final and cannot be changed once recorded.
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={onClose}
                className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-navy-deep transition hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={cast}
                className="rounded-xl bg-emerald px-4 py-3 text-sm font-semibold text-emerald-foreground shadow-soft transition hover:bg-emerald/90"
              >
                Confirm & Cast
              </button>
            </div>
          </div>
        )}

        {phase === "processing" && (
          <div className="px-10 py-12">
            {/* Revolving node animation */}
            <div className="mx-auto flex h-32 w-32 items-center justify-center">
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 rounded-full border border-mint-deep" />
                <div className="absolute inset-3 rounded-full border border-mint-deep/70" />
                <div className="absolute inset-0 animate-spin-slow">
                  <span className="absolute left-1/2 top-0 -ml-1.5 h-3 w-3 rounded-full bg-emerald shadow-[0_0_0_4px_oklch(0.58_0.15_158/0.18)]" />
                  <span className="absolute right-2 top-1/2 -mt-1 h-2 w-2 rounded-full bg-mint-ink" />
                  <span className="absolute bottom-1 left-1/2 -ml-1 h-2 w-2 rounded-full bg-mint-ink/70" />
                  <span className="absolute left-2 top-1/2 -mt-1 h-2 w-2 rounded-full bg-mint-ink/50" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-deep">
                    <ShieldCheck className="h-6 w-6 text-white" strokeWidth={1.75} />
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center text-[12px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Securing Your Vote · Module 4
            </p>

            <ul className="mt-7 space-y-2.5">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const done = i < stepIndex;
                const active = i === stepIndex;
                return (
                  <li
                    key={s.code}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                      done
                        ? "border-emerald/30 bg-emerald/5"
                        : active
                        ? "border-mint-deep bg-mint"
                        : "border-border bg-background"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        done ? "bg-emerald text-white" : active ? "bg-white text-mint-ink" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {done ? (
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      ) : active ? (
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald" />
                      ) : (
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-[13px] font-medium ${done || active ? "text-navy-deep" : "text-slate-ink"}`}>
                        {s.label}
                      </p>
                      <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
                        {s.code}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {phase === "success" && (
          <div className="p-10">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald/10 ring-8 ring-emerald/5">
                <svg viewBox="0 0 24 24" className="h-12 w-12">
                  <circle cx="12" cy="12" r="10" fill="none" stroke="oklch(0.58 0.15 158)" strokeWidth="1.25" />
                  <path
                    d="M7.5 12.5l3 3L16.5 9"
                    fill="none"
                    stroke="oklch(0.58 0.15 158)"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="check-draw"
                  />
                </svg>
              </div>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-navy-deep">
                Vote Recorded
              </h2>
              <p className="mt-1.5 text-[13px] text-slate-ink">
                Your ballot has been sealed on the immutable distributed ledger.
              </p>
            </div>

            <div className="mt-7 space-y-2 rounded-xl border border-border bg-mint/30 p-4">
              <Row label="Status" value="Confirmed" valueClass="text-emerald font-semibold" />
              <Row label="Transaction ID" value={txId} mono />
              <Row label="Block Number" value="#19,482,103" mono />
              <Row label="Network" value="ChainVote Mainnet" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-navy-deep transition hover:bg-muted">
                <Download className="h-4 w-4" /> Download Receipt
              </button>
              <button
                onClick={onReturn}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy-deep px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy"
              >
                <ArrowLeft className="h-4 w-4" /> Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, mono, valueClass = "" }: { label: string; value: string; mono?: boolean; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[12.5px]">
      <span className="text-slate-ink">{label}</span>
      <span className={`${mono ? "font-mono" : ""} truncate text-navy-deep ${valueClass}`}>{value}</span>
    </div>
  );
}
