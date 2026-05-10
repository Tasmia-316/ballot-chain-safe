export function PakistanMap({ className = "" }: { className?: string }) {
  // Vector silhouette of Pakistan, modeled on the provided reference image.
  // Transparent background — no fill or backdrop on the SVG canvas.
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 500"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        style={{ background: "transparent" }}
        aria-label="Map of Pakistan"
        role="img"
      >
        <path
          fill="#C8E6C9"
          stroke="#2F6B4F"
          strokeWidth="2.25"
          strokeLinejoin="round"
          strokeLinecap="round"
          d="M126,40
             C140,30 158,28 176,32
             C190,28 206,30 220,40
             L244,46
             C258,42 272,46 282,58
             C296,56 310,62 318,74
             C330,72 342,80 346,94
             C352,104 348,118 340,126
             C330,138 322,152 330,166
             C338,180 348,196 342,212
             C332,224 314,228 300,224
             C288,232 282,246 290,260
             C300,272 304,290 296,304
             C306,318 308,338 296,352
             C284,360 268,358 256,366
             C246,378 238,394 224,402
             C214,414 200,422 184,420
             C172,418 162,406 158,394
             C150,386 138,388 130,380
             C118,370 110,356 116,342
             C108,330 96,318 96,302
             C94,286 104,272 116,262
             C108,250 100,236 104,222
             C110,210 122,204 132,198
             C124,184 116,168 122,152
             C114,142 104,130 108,116
             C110,104 120,96 130,90
             C124,78 118,64 122,52
             Z"
        />
        {/* Capital marker — Islamabad */}
        <g>
          <circle cx="268" cy="120" r="5" fill="#10B981" />
          <circle cx="268" cy="120" r="11" fill="#10B981" fillOpacity="0.18" />
          <text x="278" y="124" fontSize="11" fontFamily="Inter, system-ui" fill="#0F3D2E" fontWeight="600">
            Islamabad
          </text>
        </g>
        {/* Lahore */}
        <circle cx="288" cy="180" r="3" fill="#0F3D2E" />
        <text x="294" y="184" fontSize="9.5" fontFamily="Inter, system-ui" fill="#0F3D2E">
          Lahore
        </text>
        {/* Karachi */}
        <circle cx="156" cy="380" r="3" fill="#0F3D2E" />
        <text x="104" y="384" fontSize="9.5" fontFamily="Inter, system-ui" fill="#0F3D2E">
          Karachi
        </text>
      </svg>
    </div>
  );
}
