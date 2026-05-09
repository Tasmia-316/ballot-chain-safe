export function PakistanMap({ className = "" }: { className?: string }) {
  // Simplified vector silhouette of Pakistan (approximate, infographic style)
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 400 460"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-label="Map of Pakistan"
        role="img"
      >
        <defs>
          <filter id="pk-soft" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>
        <path
          fill="#C8E6C9"
          stroke="#7BC0A0"
          strokeWidth="1.5"
          strokeLinejoin="round"
          filter="url(#pk-soft)"
          d="M150,30 L175,18 L210,22 L238,40 L260,38 L285,48 L305,42 L322,55
             L340,52 L355,70 L348,92 L330,108 L320,128 L335,142 L348,160
             L342,178 L320,188 L302,182 L285,196 L292,214 L280,232
             L296,248 L304,272 L292,292 L300,316 L284,332 L262,338
             L246,360 L228,372 L218,398 L196,412 L172,408 L156,388
             L162,362 L148,344 L130,348 L112,332 L120,310 L108,290
             L92,278 L78,256 L86,236 L100,222 L118,212 L132,196
             L120,178 L100,170 L88,150 L96,128 L114,118 L120,98
             L108,82 L118,62 L138,50 Z"
        />
        {/* Capital marker — Islamabad */}
        <g>
          <circle cx="262" cy="110" r="5" fill="#10B981" />
          <circle cx="262" cy="110" r="10" fill="#10B981" fillOpacity="0.18" />
          <text x="272" y="114" fontSize="11" fontFamily="Inter, system-ui" fill="#0F3D2E" fontWeight="600">
            Islamabad
          </text>
        </g>
        {/* Lahore */}
        <circle cx="278" cy="168" r="3" fill="#0F3D2E" />
        <text x="284" y="171" fontSize="9.5" fontFamily="Inter, system-ui" fill="#0F3D2E">
          Lahore
        </text>
        {/* Karachi */}
        <circle cx="150" cy="372" r="3" fill="#0F3D2E" />
        <text x="100" y="375" fontSize="9.5" fontFamily="Inter, system-ui" fill="#0F3D2E">
          Karachi
        </text>
      </svg>
    </div>
  );
}
