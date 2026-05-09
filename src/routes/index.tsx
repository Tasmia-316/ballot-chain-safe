import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users,
  Award,
  ScrollText,
  Info,
  ArrowRight,
  Vote,
  ShieldCheck,
  Activity,
  X,
  ClipboardList,
  Image as ImageIcon,
} from "lucide-react";
import { Navbar } from "@/components/voting/Navbar";
import { PakistanMap } from "@/components/voting/PakistanMap";
import { CandidateCard } from "@/components/voting/CandidateCard";
import { VoteModal } from "@/components/voting/VoteModal";
import { CnicAuthModal } from "@/components/voting/CnicAuthModal";
import { VoterProfileModal } from "@/components/voting/VoterProfileModal";
import { candidates, type Candidate } from "@/components/voting/data";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "ChainVote · National Election Portal" },
      {
        name: "description",
        content:
          "Official secure election portal: parties, candidates, voter information, and blockchain-secured voting.",
      },
    ],
  }),
});

type View = "home" | "ballot";

const infoCards = [
  {
    key: "parties",
    icon: Users,
    title: "Political Parties",
    body: "Browse all 38 registered national & regional parties.",
    meta: "38 Parties",
  },
  {
    key: "candidates",
    icon: Award,
    title: "Candidates & Symbols",
    body: "View official candidates and their election symbols.",
    meta: `${candidates.length} Candidates`,
  },
  {
    key: "conduct",
    icon: ScrollText,
    title: "Election Code of Conduct",
    body: "Rules and guidelines issued by the Election Commission.",
    meta: "Read Guidelines",
  },
  {
    key: "voter",
    icon: Info,
    title: "Voter Information",
    body: "Polling stations, eligibility, and voter rights.",
    meta: "Find Station",
  },
] as const;

function Dashboard() {
  const [view, setView] = useState<View>("home");
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [showCandidates, setShowCandidates] = useState(false);
  const [profile, setProfile] = useState<Candidate | null>(null);

  const startVoting = () => setAuthOpen(true);
  const handleVerified = () => {
    setAuthOpen(false);
    setView("ballot");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCastVote={startVoting} onHome={() => setView("home")} />

      {view === "home" && (
        <main>
          {/* HERO */}
          <section className="relative overflow-hidden bg-mint">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,white,transparent_55%)]" />
            <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
              <div className="animate-fade-in">
                <span className="inline-flex items-center gap-2 rounded-full border border-mint-deep bg-white/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-mint-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> Live · 2025 General Election
                </span>
                <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-navy-deep md:text-6xl">
                  A secure, transparent vote — for every citizen.
                </h1>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-slate-ink">
                  ChainVote is the official blockchain-secured election portal of the
                  Election Commission of Pakistan. Verify your identity, cast your
                  ballot, and confirm it on an immutable distributed ledger.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    onClick={startVoting}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-emerald-foreground shadow-soft transition hover:bg-emerald/90"
                  >
                    <Vote className="h-4 w-4" /> Cast Your Vote
                  </button>
                  <button
                    onClick={() => setShowCandidates(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-medium text-navy-deep transition hover:bg-mint"
                  >
                    View Candidates <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-10 flex flex-wrap gap-6 text-[12px] text-slate-ink">
                  <Trust icon={ShieldCheck} label="AES-256 Encryption" />
                  <Trust icon={Activity} label="1,284 Validator Nodes" />
                  <Trust icon={ScrollText} label="ECP Audited" />
                </div>
              </div>

              {/* Map + stats */}
              <div className="relative">
                <div className="relative mx-auto max-w-md rounded-3xl border border-mint-deep bg-white/70 p-6 shadow-card backdrop-blur-sm">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-mint-ink">
                    National Voter Roll
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <h2 className="text-3xl font-semibold tracking-tight text-navy-deep">
                      120M+
                    </h2>
                    <span className="text-[12px] text-slate-ink">Registered Voters</span>
                  </div>

                  <PakistanMap className="mx-auto mt-2 h-64 w-full" />

                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <Stat label="Male Voters" value="64.2M" tone="navy" />
                    <Stat label="Female Voters" value="55.8M" tone="emerald" />
                  </div>
                </div>
                <div className="pointer-events-none absolute -right-3 -top-3 hidden h-24 w-24 rounded-full bg-emerald/10 blur-2xl md:block" />
              </div>
            </div>
          </section>

          {/* INTERACTIVE GRID */}
          <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-mint-ink">
                  Election Hub
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-navy-deep md:text-4xl">
                  Everything you need to vote informed.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {infoCards.map((c) => {
                const Icon = c.icon;
                const isCandidates = c.key === "candidates";
                return (
                  <button
                    key={c.key}
                    onClick={() => isCandidates && setShowCandidates(true)}
                    className="tile-hover group rounded-2xl border border-mint-deep bg-mint p-7 text-left"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 ring-1 ring-mint-deep">
                      <Icon className="h-6 w-6 text-mint-ink" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-6 text-[17px] font-semibold tracking-tight text-navy-deep">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-ink">
                      {c.body}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-mint-ink">
                        {c.meta}
                      </span>
                      <ArrowRight className="h-4 w-4 text-mint-ink transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Candidates panel (revealed) */}
          {showCandidates && (
            <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10 animate-fade-in">
              <div className="rounded-3xl border border-border bg-white p-8 shadow-soft md:p-10">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-mint-ink">
                      Module 4 · UC2
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-navy-deep md:text-3xl">
                      Candidates & Election Symbols
                    </h3>
                  </div>
                  <button
                    onClick={startVoting}
                    className="inline-flex items-center gap-2 rounded-full bg-navy-deep px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-navy"
                  >
                    Proceed to Vote <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {candidates.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setProfile(c)}
                      className="tile-hover group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-mint ring-4 ring-mint/40">
                        <c.symbol className="h-8 w-8 text-mint-ink" strokeWidth={1.5} />
                      </div>
                      <p className="text-[13px] font-semibold leading-tight text-navy-deep">
                        {c.name}
                      </p>
                      <p className="text-[10.5px] uppercase tracking-[0.16em] text-mint-ink">
                        {c.symbolName}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Footer */}
          <footer className="border-t border-border bg-mint/40">
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-8 text-[12px] text-slate-ink md:flex-row md:items-center md:px-10">
              <p>© 2025 Election Commission · ChainVote Secure Portal</p>
              <p className="font-mono text-[11px] text-muted-foreground">
                Build v4.2.1 · Ledger height #19,482,103
              </p>
            </div>
          </footer>
        </main>
      )}

      {view === "ballot" && (
        <main className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16 animate-fade-in">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <button
                onClick={() => setView("home")}
                className="text-[12px] font-medium uppercase tracking-[0.16em] text-mint-ink hover:text-navy-deep"
              >
                ← Back to Portal
              </button>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy-deep md:text-5xl">
                Official Ballot
              </h1>
              <p className="mt-2 text-[14px] text-slate-ink">
                Select one candidate. Your selection will be confirmed before recording.
              </p>
            </div>
            <div className="rounded-full border border-emerald/30 bg-emerald/10 px-4 py-2 text-[12px] font-medium text-emerald">
              ✓ Identity Verified · CNIC ending in •••7-1
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            {candidates.map((c) => (
              <CandidateCard key={c.id} candidate={c} onSelect={setSelected} />
            ))}
          </div>
        </main>
      )}

      {/* Candidate detail modal */}
      {profile && (
        <CandidateProfileModal candidate={profile} onClose={() => setProfile(null)} />
      )}

      {authOpen && (
        <CnicAuthModal onClose={() => setAuthOpen(false)} onVerified={handleVerified} />
      )}

      {selected && (
        <VoteModal
          candidate={selected}
          onClose={() => setSelected(null)}
          onReturn={() => {
            setSelected(null);
            setView("home");
          }}
        />
      )}
    </div>
  );
}

function Trust({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-emerald" strokeWidth={1.75} />
      <span>{label}</span>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "navy" | "emerald" }) {
  return (
    <div className="rounded-xl bg-white px-4 py-3">
      <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className={`mt-1 text-xl font-semibold tracking-tight ${tone === "emerald" ? "text-emerald" : "text-navy-deep"}`}>
        {value}
      </p>
    </div>
  );
}

function CandidateProfileModal({ candidate, onClose }: { candidate: Candidate; onClose: () => void }) {
  const Symbol = candidate.symbol;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-overlay-in" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-navy-deep/35 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-card animate-scale-in">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-slate-ink hover:bg-mint" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
        <div className="bg-mint px-8 pb-6 pt-10 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white ring-4 ring-mint-deep">
            <Symbol className="h-12 w-12 text-mint-ink" strokeWidth={1.5} />
          </div>
          <h3 className="mt-5 text-2xl font-semibold tracking-tight text-navy-deep">
            {candidate.name}
          </h3>
          <p className="mt-1 text-[13px] text-slate-ink">{candidate.party}</p>
        </div>
        <div className="space-y-3 p-7">
          <Field label="Serial Number" value={`#${candidate.serial}`} />
          <Field label="Election Symbol" value={candidate.symbolName} />
          <Field label="Party Code" value={candidate.partyShort} />
          <Field label="Manifesto" value={candidate.tagline} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-2 last:border-0">
      <span className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      <span className="text-[13px] font-medium text-navy-deep">{value}</span>
    </div>
  );
}
