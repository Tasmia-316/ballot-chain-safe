export function PakistanMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 560"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Map of Pakistan"
    >
      <defs>
        <linearGradient id="mapfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.92 0.045 172)" />
          <stop offset="100%" stopColor="oklch(0.86 0.06 168)" />
        </linearGradient>
      </defs>

      {/* Recognizable silhouette of Pakistan (stylized but accurate proportions:
          narrow north (Gilgit-Baltistan/KP), wide southwest (Balochistan),
          coastline at south, eastern border with the Punjab bulge) */}
      <path
        d="
          M 332 38
          L 360 30 L 372 50 L 396 56 L 388 78 L 410 94
          L 400 118 L 422 138 L 446 152 L 458 178
          L 444 196 L 460 220 L 446 244 L 458 268
          L 446 292 L 432 312 L 412 326 L 392 348
          L 372 360 L 360 384 L 340 396 L 320 410
          L 300 426 L 278 438 L 256 450 L 238 470
          L 220 490 L 196 502
          L 174 506 L 152 502 L 132 506 L 110 510
          L 92 504 L 78 488
          L 64 470 L 56 446 L 50 422 L 56 398
          L 70 378 L 64 354 L 50 332 L 44 308
          L 56 286 L 72 268 L 64 246 L 52 226
          L 60 204 L 80 188 L 92 168
          L 108 150 L 120 132
          L 116 112 L 130 96 L 152 88 L 174 80
          L 196 72 L 218 62 L 244 56 L 268 50
          L 290 44 L 312 40 Z
        "
        fill="url(#mapfill)"
        stroke="oklch(0.45 0.10 165)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Province dividers (approximate) */}
      <g stroke="oklch(0.45 0.10 165)" strokeWidth="0.9" strokeOpacity="0.4" fill="none">
        {/* KP / Punjab */}
        <path d="M 240 110 Q 280 200 300 280" />
        {/* Punjab / Sindh */}
        <path d="M 300 280 Q 280 360 290 430" />
        {/* Balochistan / Sindh */}
        <path d="M 290 430 Q 220 410 160 420" />
        {/* Balochistan / KP */}
        <path d="M 160 280 Q 210 230 240 110" />
      </g>

      {/* City / voter density dots */}
      <g fill="oklch(0.40 0.11 165)" fillOpacity="0.6">
        {[
          [330, 100], [300, 150], [340, 180], [360, 230],
          [320, 270], [280, 320], [260, 380], [230, 430],
          [200, 470], [160, 460], [120, 440],
          [200, 350], [180, 280], [220, 220], [260, 170]
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.6} />
        ))}
      </g>

      {/* Islamabad — capital */}
      <g>
        <circle cx="318" cy="120" r="6" fill="oklch(0.58 0.15 158)" />
        <circle cx="318" cy="120" r="11" fill="none" stroke="oklch(0.58 0.15 158)" strokeOpacity="0.45" />
        <text x="328" y="118" fontSize="11" fill="oklch(0.30 0.05 250)" fontFamily="ui-sans-serif, system-ui">
          Islamabad
        </text>
      </g>

      {/* Karachi — south coast */}
      <g>
        <circle cx="160" cy="478" r="4.5" fill="oklch(0.30 0.05 250)" />
        <text x="168" y="482" fontSize="10" fill="oklch(0.30 0.05 250)" fontFamily="ui-sans-serif, system-ui">
          Karachi
        </text>
      </g>

      {/* Lahore — east */}
      <g>
        <circle cx="368" cy="200" r="4.5" fill="oklch(0.30 0.05 250)" />
        <text x="376" y="204" fontSize="10" fill="oklch(0.30 0.05 250)" fontFamily="ui-sans-serif, system-ui">
          Lahore
        </text>
      </g>
    </svg>
  );
}
