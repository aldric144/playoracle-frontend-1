
export function SVGGlowMask() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: 'absolute', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <defs>
        {/* Soft glow filter for text highlights */}
        <filter
          id="soft-glow"
          filterUnits="objectBoundingBox"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0
                    0 0.902 0 0 0.482
                    0 0 0 0 0.463
                    0 0 0 0.6 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Intense glow for dramatic highlights */}
        <filter
          id="intense-glow"
          filterUnits="objectBoundingBox"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur2" />
          <feColorMatrix
            in="blur1"
            type="matrix"
            values="0 0 0 0 0
                    0 0.902 0 0 0.482
                    0 0 0 0 0.463
                    0 0 0 0.8 0"
            result="glow1"
          />
          <feColorMatrix
            in="blur2"
            type="matrix"
            values="0 0 0 0 0
                    0 0.902 0 0 0.482
                    0 0 0 0 0.463
                    0 0 0 1 0"
            result="glow2"
          />
          <feMerge>
            <feMergeNode in="glow1" />
            <feMergeNode in="glow2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Ambient background glow */}
        <filter
          id="ambient-glow"
          filterUnits="objectBoundingBox"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0
                    0 0.902 0 0 0.482
                    0 0 0 0 0.463
                    0 0 0 0.3 0"
          />
        </filter>
      </defs>
    </svg>
  );
}
