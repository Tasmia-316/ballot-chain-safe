import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, Lock, Network, FileCheck2, Shield } from "lucide-react";
import { TopNav } from "@/components/voting/TopNav";
import { CandidateCard } from "@/components/voting/CandidateCard";
import { VoteModal } from "@/components/voting/VoteModal";
import { candidates, type Candidate } from "@/components/voting/data";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "ChainVote · Official Blockchain Voting Portal" },
      {
        name: "description",
        content:
          "Cast your vote securely on an immutable distributed ledger. End-to-end encrypted, auditable, and tamper-proof.",
      },
    ],
  }),
});

function Dashboard() {
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () =>
      setTime(new Date().toUTCString().slice(17, 25) + " UTC");
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Watermark crest */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center"
      >
        <Shield
          className="h-[640px] w-[640px] text-navy-deep"
          strokeWidth={0.6}
          style={{ opacity: 0.035 }}
        />
      </div>

      <div className="relative z-10">
        <TopNav />

        {/* Hero strip */}
        <section className="relative overflow-hidden border-b border-border bg-navy-deep text-navy-foreground">
          <div className="absolute inset-0 bg-grid-navy opacity-50" />
          <div className="relative mx-auto max-w-7xl px-6 py-10">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-sm border border-emerald/30 bg-emerald/10 px-2.5 py-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald">
                    Module 04 · Official Ballot Submission
                  </span>
                </div>
                <h1 className="mt-3 text-[28px] font-semibold tracking-tight sm:text-[34px]">
                  Official Ballot · 2025 General Election
                </h1>
                <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-white/70">
                  Select one candidate to cast your vote securely. Your ballot is
                  encrypted with SHA-256 and recorded to a distributed,
                  tamper-proof ledger.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Stat icon={<Lock className="h-3.5 w-3.5" />} label="Encryption" value="AES-256" />
                <Stat icon={<Network className="h-3.5 w-3.5" />} label="Nodes" value="1,284" />
                <Stat icon={<FileCheck2 className="h-3.5 w-3.5" />} label="Audited" value="Live" />
              </div>
            </div>
          </div>
        </section>

        {/* Ballot Grid */}
        <main className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-6 flex items-baseline justify-between">
            <div>
              <h2 className="text-base font-semibold tracking-tight text-navy-deep">
                Candidates
              </h2>
              <p className="text-[12.5px] text-muted-foreground">
                {candidates.length} verified candidates · Single selection
              </p>
            </div>
            <div className="hidden items-center gap-1.5 font-mono text-[11px] text-muted-foreground sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
              Ledger sync · {time || "—"}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {candidates.map((c) => (
              <CandidateCard key={c.id} candidate={c} onSelect={setSelected} />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-8 border-t border-border bg-navy-deep text-navy-foreground/70">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-[11.5px]">
            <p className="font-mono">
              © 2025 ChainVote · Secure Voting Infrastructure
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald" />
              Verified by independent auditors · ISO/IEC 27001
            </p>
          </div>
        </footer>
      </div>

      {selected && (
        <VoteModal
          candidate={selected}
          onClose={() => setSelected(null)}
          onReturn={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/55">
        {icon}
        {label}
      </div>
      <p className="mt-0.5 font-mono text-[13px] text-white">{value}</p>
    </div>
  );
}
