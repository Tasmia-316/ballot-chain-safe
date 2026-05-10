import mapImg from "@/assets/pakistan-map.png";

export function PakistanMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img
        src={mapImg}
        alt="Map of Pakistan"
        className="h-full w-full object-contain"
        style={{ background: "transparent" }}
      />
    </div>
  );
}
