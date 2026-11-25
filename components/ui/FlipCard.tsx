"use client";

import {
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  className?: string;
};

export default function FlipCard({ front, back, className = "" }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const handlePointerMove = (event: MouseEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    setTilt({ x: (0.5 - y) * 5, y: (x - 0.5) * 5 });
    setGlare({ x: x * 100, y: y * 100 });
  };

  return (
    <button
      type="button"
      aria-pressed={flipped}
      aria-label={flipped ? "Show card front" : "Flip card to read more"}
      onClick={() => setFlipped((value) => !value)}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={`flip-card group relative block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-300 ${className}`}
      style={
        {
          "--tilt-x": `${tilt.x}deg`,
          "--tilt-y": `${tilt.y}deg`,
          "--glare-x": `${glare.x}%`,
          "--glare-y": `${glare.y}%`,
        } as CSSProperties
      }
    >
      <span className="flip-card-inner relative block h-full w-full">
        <span
          aria-hidden={flipped}
          className="flip-card-face relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 p-6"
        >
          {front}
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--glare-x)_var(--glare-y),rgba(167,139,250,0.14),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </span>
        <span
          aria-hidden={!flipped}
          className="flip-card-face flip-card-back absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-2xl border border-violet-300/20 bg-neutral-900 p-6"
        >
          {back}
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--glare-x)_var(--glare-y),rgba(167,139,250,0.13),transparent_42%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </span>
      </span>
    </button>
  );
}
