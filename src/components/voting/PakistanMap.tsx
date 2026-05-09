import mapSrc from "@/assets/pakistan-map.png";

export function PakistanMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <img
        src={mapSrc}
        alt="Map of Pakistan"
        className="h-full w-full object-contain"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(28%) sepia(38%) saturate(820%) hue-rotate(120deg) brightness(95%) contrast(92%)",
        }}
      />

      {/* Capital marker — Islamabad (north-east) */}
      <span className="pointer-events-none absolute left-[68%] top-[22%]">
        <span className="block h-2.5 w-2.5 rounded-full bg-emerald" />
        <span className="absolute -inset-1 animate-pulse rounded-full ring-2 ring-emerald/40" />
      </span>

      {/* City dots */}
      <span className="pointer-events-none absolute left-[72%] top-[34%] block h-1.5 w-1.5 rounded-full bg-mint-ink/70" />
      <span className="pointer-events-none absolute left-[40%] top-[78%] block h-1.5 w-1.5 rounded-full bg-mint-ink/70" />
      <span className="pointer-events-none absolute left-[55%] top-[58%] block h-1.5 w-1.5 rounded-full bg-mint-ink/60" />
    </div>
  );
}
