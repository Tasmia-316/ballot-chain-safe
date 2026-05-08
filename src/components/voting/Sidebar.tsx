import { Home, Vote, User, Settings } from "lucide-react";

const items = [
  { icon: Home, label: "Home", active: true },
  { icon: Vote, label: "Ballot", active: false },
  { icon: User, label: "Profile", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 z-30 h-screen w-16 flex-col items-center border-r border-border bg-background py-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-deep">
        <span className="font-mono text-[11px] font-bold text-white">CV</span>
      </div>
      <nav className="mt-10 flex flex-col items-center gap-2">
        {items.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            aria-label={label}
            className={`group relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
              active
                ? "bg-navy-deep/5 text-navy-deep"
                : "text-muted-foreground hover:bg-muted hover:text-navy-deep"
            }`}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
            {active && (
              <span className="absolute left-0 h-5 w-[2px] rounded-r-full bg-navy-deep" />
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}
