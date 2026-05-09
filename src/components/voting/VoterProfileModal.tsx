import { X, User, Fingerprint, Calendar, UserCircle2, ShieldCheck } from "lucide-react";

export function VoterProfileModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-overlay-in" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-navy-deep/35 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-card animate-scale-in">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-slate-ink hover:bg-mint"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="bg-mint px-8 pb-7 pt-10 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white ring-4 ring-mint-deep">
            <UserCircle2 className="h-14 w-14 text-mint-ink" strokeWidth={1.25} />
          </div>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-navy-deep">
            Tasmia Naeem
          </h3>
          <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-mint-ink">
            Registered Voter · NA-247
          </p>
        </div>

        <div className="space-y-3 p-7">
          <Row icon={User} label="Full Name" value="Tasmia Naeem" />
          <Row icon={Fingerprint} label="CNIC" value="35202-1234567-1" mono />
          <Row icon={UserCircle2} label="Gender" value="Female" />
          <Row icon={Calendar} label="Age" value="20" />

          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald/10 px-3 py-2.5 text-[12.5px] font-medium text-emerald">
            <ShieldCheck className="h-4 w-4" /> Identity verified · Eligible to vote
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border pb-2.5 last:border-0">
      <span className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
        {label}
      </span>
      <span className={`text-[13.5px] font-medium text-navy-deep ${mono ? "font-mono" : ""}`}>
        {value}
      </span>
    </div>
  );
}
