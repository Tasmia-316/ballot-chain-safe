import { useEffect, useRef, useState } from "react";
import { Check, Download, RotateCcw, ShieldCheck, X, User, Boxes } from "lucide-react";
import type { Candidate } from "./data";

type Phase = "confirm" | "processing" | "success";

const STAGES = [
  "Processing Selection",
  "Generating SHA-256 Hash of Vote",
  "Encrypting Data for Ledger Submission",
  "Broadcasting to Distributed Nodes",
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

    const start = Date.now();
    const duration = 4400;
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
        i * (duration / STAGES.length),
      );
      timers.current.push(id);
    });
    const done = window.setTimeout(() => setPhase("success"), duration + 250);
    timers.current.push(done);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-overlay-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm"
        onClick={phase !== "processing" ? onClose : undefined}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-border bg-card shadow-2xl animate-scale-in">
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
  const Symbol = candidate.symbol;
  return (
    <div className="p-7">
      <div className="flex items-center gap-2 text-emerald">
        <ShieldCheck className="h-4 w-4" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
          Verify Selection
        </span>
      </div>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-navy-deep">
        Confirm Your Selection
      </h2>

      <div className="mt-5 rounded-lg border border-border bg-muted/40 p-5">
        <div className="flex items-center gap-4">
          {/* Smooth zoom on symbol */}
          <div
            key={candidate.id}
            className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-navy-deep/15 bg-background animate-symbol-zoom"
          >
            <Symbol className="h-10 w-10 text-navy-deep" strokeWidth={1.6} />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {candidate.partyShort} · Symbol: {candidate.symbolName}
            </p>
            <p className="mt-0.5 text-[16px] font-semibold leading-tight text-foreground">
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
          className="flex-1 rounded-md bg-emerald px-4 py-2.5 text-sm font-semibold text-emerald-foreground transition hover:bg-emerald/90"
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
    <div className="bg-navy-deep p-8 text-navy-foreground">
      <BlockchainBridge />
      <div className="mt-7 space-y-2.5">
        {STAGES.map((label, i) => (
          <div
            key={label}
            className={`flex items-center gap-2.5 text-[13px] transition-opacity duration-300 ${
              i <= stage ? "opacity-100" : "opacity-30"
            }`}
          >
            {i < stage ? (
              <Check className="h-3.5 w-3.5 text-emerald" />
            ) : i === stage ? (
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald" />
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
            className="h-full rounded-full bg-emerald transition-[width] duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10.5px] text-white/55">
          <span>SECURE CHANNEL · AES-256-GCM</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}

function BlockchainBridge() {
  // Voter (left) → Blockchain (right). Tiny dots travel along the path.
  const dots = [0, 1, 2, 3, 4];
  return (
    <div className="relative mx-auto h-[150px] w-full max-w-[360px]">
      {/* Left: Voter */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald/40 bg-white/5">
          <User className="h-7 w-7 text-white" strokeWidth={1.6} />
        </div>
        <span className="font-mono text-[9.5px] uppercase tracking-wider text-white/60">
          Voter
        </span>
      </div>

      {/* Right: Blockchain */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald/40 bg-white/5">
          <Boxes className="h-7 w-7 text-emerald" strokeWidth={1.6} />
        </div>
        <span className="font-mono text-[9.5px] uppercase tracking-wider text-white/60">
          Blockchain
        </span>
      </div>

      {/* Bridge path */}
      <svg
        viewBox="0 0 360 150"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M 60 75 Q 180 30 300 75"
          fill="none"
          stroke="oklch(1 0 0 / 0.18)"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />
        <path
          d="M 60 75 Q 180 120 300 75"
          fill="none"
          stroke="oklch(1 0 0 / 0.18)"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />
      </svg>

      {/* Moving dots */}
      {dots.map((i) => (
        <span
          key={i}
          className="bridge-dot"
          style={{
            animationDelay: `${i * 0.32}s`,
            offsetPath: "path('M 60 75 Q 180 30 300 75')",
          }}
        />
      ))}
      {dots.map((i) => (
        <span
          key={`b-${i}`}
          className="bridge-dot"
          style={{
            animationDelay: `${i * 0.32 + 0.16}s`,
            offsetPath: "path('M 60 75 Q 180 120 300 75')",
          }}
        />
      ))}

      <style>{`
        .bridge-dot {
          position: absolute;
          left: 0; top: 0;
          width: 6px; height: 6px;
          margin-left: -3px; margin-top: -3px;
          border-radius: 9999px;
          background: var(--emerald);
          box-shadow: 0 0 6px var(--emerald);
          offset-rotate: 0deg;
          animation: bridge-dot 1.6s linear infinite;
        }
      `}</style>
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
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald/15 ring-1 ring-emerald/40 animate-scale-in">
        <svg viewBox="0 0 24 24" className="h-9 w-9">
          <circle cx="12" cy="12" r="10" fill="oklch(0.58 0.16 152)" />
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

      <h2 className="mt-4 text-center text-xl font-semibold tracking-tight text-navy-deep">
        Vote Cast Successfully!
      </h2>
      <p className="mt-1 text-center text-[13px] text-muted-foreground">
        Your ballot for{" "}
        <span className="font-medium text-foreground">{candidate.name}</span> has
        been recorded.
      </p>

      <dl className="mt-5 space-y-2 rounded-lg border border-border bg-muted/40 p-4 text-[12.5px]">
        <Row label="Status">
          <span className="inline-flex items-center gap-1.5 font-medium text-emerald">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
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
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-emerald px-4 py-2.5 text-sm font-semibold text-emerald-foreground transition hover:bg-emerald/90"
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
