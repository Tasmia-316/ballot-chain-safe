import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sidebar } from "@/components/voting/Sidebar";
import { CandidateCard } from "@/components/voting/CandidateCard";
import { VoteModal } from "@/components/voting/VoteModal";
import { candidates, type Candidate } from "@/components/voting/data";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "ChainVote · Secure Voting" },
      {
        name: "description",
        content: "Cast your vote securely on an immutable distributed ledger.",
      },
    ],
  }),
});

function Dashboard() {
  const [selected, setSelected] = useState<Candidate | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:pl-16">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border px-6 md:px-10">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-semibold tracking-tight text-navy-deep">
              ChainVote
            </span>
          </div>
          <div className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-slate-ink">
            Voter ID: SP25-BCT-049
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
          <div className="mb-14 max-w-2xl">
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              2025 General Election
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy-deep md:text-5xl">
              Select your candidate.
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {candidates.map((c) => (
              <CandidateCard key={c.id} candidate={c} onSelect={setSelected} />
            ))}
          </div>
        </main>
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
