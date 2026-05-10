import { useState } from "react";
import { X, Fingerprint, ShieldCheck, AlertTriangle } from "lucide-react";

const VALID_CNIC = "35202-1234567-1";

function formatCnic(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 13);
  const a = d.slice(0, 5);
  const b = d.slice(5, 12);
  const c = d.slice(12, 13);
  return [a, b, c].filter(Boolean).join("-");
}

export function CnicAuthModal({
  onClose,
  onVerified,
}: {
  onClose: () => void;
  onVerified: () => void;
}) {
  const [cnic, setCnic] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cnic.replace(/\D/g, "").length !== 13) {
      setStatus("error");
      setMsg("CNIC must be 13 digits.");
      return;
    }
    setStatus("verifying");
    setTimeout(() => {
      if (cnic === VALID_CNIC) {
        setStatus("success");
        setMsg("Identity Verified");
        setTimeout(onVerified, 900);
      } else {
        setStatus("error");
        setMsg("Voter Not Registered");
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-overlay-in" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-navy-deep/35 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-card animate-scale-in">
        <div className="flex items-center justify-between border-b border-border bg-mint px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Fingerprint className="h-5 w-5 text-mint-ink" strokeWidth={1.75} />
            <h2 className="text-[14px] font-semibold tracking-tight text-navy-deep">
              Voter Authentication
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full p-1 text-slate-ink hover:bg-white/60" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={submit} className="p-8">
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Module 2 · Identity Verification
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-navy-deep">
            Enter your CNIC
          </h3>
          <p className="mt-1.5 text-[13px] text-slate-ink">
            We verify your identity against the National Voter Roll before issuing a ballot.
          </p>

          <label className="mt-7 block">
            <span className="text-[12px] font-medium text-slate-ink">CNIC Number</span>
            <input
              autoFocus
              inputMode="numeric"
              value={cnic}
              onChange={(e) => {
                setCnic(formatCnic(e.target.value));
                if (status === "error") setStatus("idle");
              }}
              placeholder="00000-0000000-0"
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 font-mono text-[15px] tracking-wider text-navy-deep outline-none transition focus:border-emerald focus:ring-2 focus:ring-emerald/25"
            />
          </label>

          {status === "error" && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-[12.5px] text-destructive">
              <AlertTriangle className="h-4 w-4" /> {msg}
            </div>
          )}
          {status === "success" && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald/10 px-3 py-2 text-[12.5px] font-medium text-emerald">
              <ShieldCheck className="h-4 w-4" /> {msg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "verifying" || status === "success"}
            className="mt-7 w-full rounded-xl bg-emerald px-4 py-3 text-sm font-semibold text-emerald-foreground transition hover:bg-emerald/90 disabled:opacity-60"
          >
            {status === "verifying" ? "Verifying..." : status === "success" ? "Verified" : "Verify Identity"}
          </button>

        </form>
      </div>
    </div>
  );
}
