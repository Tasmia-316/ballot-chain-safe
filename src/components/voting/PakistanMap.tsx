import mapSrc from "@/assets/pakistan-map.png";

export function PakistanMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <img
        src={mapSrc}
        alt="Map of Pakistan"
        className="h-full w-full object-contain"
      />
    </div>
  );
}
