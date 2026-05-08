import { useEffect, useRef, useState } from "react";
import { Check, Download, RotateCcw, ShieldCheck, X } from "lucide-react";
import type { Candidate } from "./data";

type Phase = "confirm" | "processing" | "success";

const STAGES = [
  "Processing Selection...",
  "Generating SHA-256 Hash of Vote...",
  "Encrypting Data for Ledger submission...",
  "Broadcasting to Distributed Nodes...",
];

export function VoteModal({
  candidate,
  onClose,
  onReturn,
}: {
  candidate: Candidate;
  onClose: () => void;
  onReturn: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("confirm");
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    return () => timers.current.forEach((t) => window.clearTimeout(t));
  }, []);

  const startProcessing = () => {
    setPhase("processing");
    setStage(0);
    setProgress(0);

    // Smooth progress
    const start = Date.now();
    const duration = 4200;
    const tick = () => {
      const p = Math.min(100, ((Date.now() - start) / duration) * 100);
      setProgress(p);
      if (p < 100) {
        const id = window.requestAnimationFrame(tick);
        timers.current.push(id as unknown as number);
      }
    };
    tick();

    STAGES.forEach((_, i) => {
      const id = window.setTimeout(
        () => setStage(i),
        i * (4200 / STAGES.length),
      );
      timers.current.push(id);
    });
    const done = window.setTimeout(() => setPhase("success"), 4400);
    timers.current.push(done);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-overlay-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-navy-deep/70 backdrop-blur-sm"
        onClick={phase !== "processing" ? onClose : undefined}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-scale-in">
        {phase !== "processing" && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {phase === "confirm" && (
          <ConfirmView candidate={candidate} onCancel={onClose} onConfirm={startProcessing} />
        )}
        {phase === "processing" && (
          <ProcessingView stage={stage} progress={progress} />
        )}
        {phase === "success" && (
          <SuccessView candidate={candidate} onReturn={onReturn} />
        )}
      </div>
    </div>
  );
}

/* ---------------- Confirm ---------------- */
function ConfirmView({
  candidate,
  onCancel,
  onConfirm,
}: {
  candidate: Candidate;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="p-7">
      <div className="flex items-center gap-2 text-teal">
        <ShieldCheck className="h-4 w-4" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
          Verify Selection
        </span>
      </div>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">
        Confirm Your Selection
      </h2>

      <div className="mt-5 rounded-xl border border-border bg-muted/40 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-navy-foreground">
            <span className="font-mono text-[11px] font-bold">
              {candidate.partyShort}
            </span>
          </div>
          <div>
            <p className="text-[15px] font-semibold leading-tight">
              {candidate.name}
            </p>
            <p className="text-xs text-muted-foreground">{candidate.party}</p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
        Your vote is private, encrypted end-to-end, and recorded on an immutable
        distributed ledger. This action cannot be undone.
      </p>

      <div className="mt-6 flex gap-2.5">
        <button
          onClick={onCancel}
          className="flex-1 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 rounded-md bg-teal px-4 py-2.5 text-sm font-semibold text-teal-foreground transition hover:bg-teal-glow hover:shadow-[var(--shadow-teal-glow)]"
        >
          Confirm &amp; Cast Vote
        </button>
      </div>
    </div>
  );
}

/* ---------------- Processing ---------------- */
function ProcessingView({ stage, progress }: { stage: number; progress: number }) {
  return (
    <div className="bg-gradient-to-br from-navy-deep to-navy p-8 text-navy-foreground">
      <NodeAnimation />
      <div className="mt-7 space-y-3">
        {STAGES.map((label, i) => (
          <div
            key={label}
            className={`flex items-center gap-2.5 text-[13px] transition-opacity duration-300 ${
              i <= stage ? "opacity-100" : "opacity-30"
            }`}
          >
            {i < stage ? (
              <Check className="h-3.5 w-3.5 text-teal" />
            ) : i === stage ? (
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal" />
              </span>
            ) : (
              <span className="h-2.5 w-2.5 rounded-full border border-white/30" />
            )}
            <span className={i === stage ? "font-medium text-white" : "text-white/70"}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal to-teal-glow transition-[width] duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10.5px] text-white/50">
          <span>SECURE CHANNEL · AES-256-GCM</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}

function NodeAnimation() {
  // 5 nodes connected by a soft hexagon
  const nodes = [
    { x: 80, y: 20 },
    { x: 140, y: 60 },
    { x: 120, y: 130 },
    { x: 40, y: 130 },
    { x: 20, y: 60 },
  ];
  return (
    <div className="relative mx-auto h-[160px] w-[160px]">
      <svg viewBox="0 0 160 160" className="absolute inset-0">
        <g
          stroke="oklch(0.72 0.16 180 / 0.45)"
          strokeWidth="1"
          fill="none"
        >
          {nodes.map((n, i) =>
            nodes.slice(i + 1).map((m, j) => (
              <line
                key={`${i}-${j}`}
                x1={n.x}
                y1={n.y}
                x2={m.x}
                y2={m.y}
              />
            )),
          )}
        </g>
      </svg>
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 160 160" className="h-full w-full">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="oklch(0.72 0.16 180 / 0.25)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </svg>
      </div>
      {nodes.map((n, i) => (
        <span
          key={i}
          className="node-pulse absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal shadow-[0_0_12px_var(--teal)]"
          style={{
            left: `${(n.x / 160) * 100}%`,
            top: `${(n.y / 160) * 100}%`,
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_18px_white]" />
    </div>
  );
}

/* ---------------- Success ---------------- */
function SuccessView({
  candidate,
  onReturn,
}: {
  candidate: Candidate;
  onReturn: () => void;
}) {
  const txHash = "0x7e3f9b21c8a04e6d5b1f9a8c2d4e7f10a1c3df";
  const block = "19,482,103";
  return (
    <div className="p-7">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal/15 ring-1 ring-teal/40 animate-scale-in">
        <svg viewBox="0 0 24 24" className="h-9 w-9">
          <circle cx="12" cy="12" r="10" fill="oklch(0.72 0.16 180)" />
          <path
            d="M7 12.5l3.2 3.2L17 9"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="check-draw"
          />
        </svg>
      </div>

      <h2 className="mt-4 text-center text-xl font-semibold tracking-tight">
        Vote Cast Successfully!
      </h2>
      <p className="mt-1 text-center text-[13px] text-muted-foreground">
        Your ballot for{" "}
        <span className="font-medium text-foreground">{candidate.name}</span> has
        been recorded.
      </p>

      <dl className="mt-5 space-y-2 rounded-xl border border-border bg-muted/40 p-4 text-[12.5px]">
        <Row label="Status">
          <span className="inline-flex items-center gap-1.5 font-medium text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Recorded on Immutable Ledger
          </span>
        </Row>
        <Row label="Transaction Hash">
          <span className="font-mono text-hash text-foreground">
            {txHash.slice(0, 6)}…{txHash.slice(-6)}
          </span>
        </Row>
        <Row label="Block Number">
          <span className="font-mono text-foreground">#{block}</span>
        </Row>
        <Row label="Network">
          <span className="text-foreground">ChainVote · Mainnet</span>
        </Row>
      </dl>

      <div className="mt-6 flex gap-2.5">
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted">
          <Download className="h-4 w-4" />
          Download Receipt
        </button>
        <button
          onClick={onReturn}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-teal px-4 py-2.5 text-sm font-semibold text-teal-foreground transition hover:bg-teal-glow hover:shadow-[var(--shadow-teal-glow)]"
        >
          <RotateCcw className="h-4 w-4" />
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
