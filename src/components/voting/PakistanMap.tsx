export function PakistanMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 420"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="mapfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.92 0.045 172)" />
          <stop offset="100%" stopColor="oklch(0.86 0.06 168)" />
        </linearGradient>
      </defs>
      {/* Stylized silhouette of Pakistan */}
      <path
        d="M120 30 L175 24 L210 40 L245 35 L290 55 L320 78 L348 70 L362 92 L350 122 L320 138 L300 168 L322 196 L308 224 L268 232 L262 262 L242 282 L260 308 L238 332 L210 326 L186 350 L158 358 L138 388 L112 392 L92 360 L74 332 L82 300 L62 274 L70 244 L52 216 L70 188 L58 158 L82 134 L70 104 L96 80 L88 56 Z"
        fill="url(#mapfill)"
        stroke="oklch(0.55 0.12 165)"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      {/* Province lines */}
      <g stroke="oklch(0.55 0.12 165)" strokeWidth="0.7" strokeOpacity="0.45" fill="none">
        <path d="M170 110 Q210 150 195 220 T220 300" />
        <path d="M100 180 Q150 200 195 220" />
        <path d="M195 220 Q240 240 280 220" />
      </g>
      {/* Voter density dots */}
      <g fill="oklch(0.45 0.12 165)" fillOpacity="0.55">
        {[
          [150, 110], [200, 130], [240, 100], [290, 110], [180, 175], [220, 200],
          [160, 230], [200, 260], [240, 280], [180, 310], [150, 340], [130, 290],
          [110, 240], [260, 200], [300, 170], [120, 150]
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.5} />
        ))}
      </g>
      {/* Capital marker */}
      <g>
        <circle cx="225" cy="115" r="6" fill="oklch(0.58 0.15 158)" />
        <circle cx="225" cy="115" r="11" fill="none" stroke="oklch(0.58 0.15 158)" strokeOpacity="0.4" />
      </g>
    </svg>
  );
}
