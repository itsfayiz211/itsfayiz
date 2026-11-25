"use client";

import {
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";

export type BentoCard = {
  title: string;
  eyebrow: string;
  description: string;
  detail?: string;
  visual?: "chart";
  icon?: ReactNode;
  href?: string;
};

type MagicBentoProps = {
  cards: BentoCard[];
  columns: number;
  rowHeight: number;
  gap: number;
  radius: number;
  enableBorderGlow: boolean;
  enableSpotlight: boolean;
  spotlightRadius: number;
  clickEffect: boolean;
  enableStars: boolean;
  particleCount: number;
  enableTilt: boolean;
  enableMagnetism: boolean;
  textAutoHide: boolean;
  intro: boolean;
};

export default function MagicBento({
  cards,
  columns,
  rowHeight,
  gap,
  radius,
  enableBorderGlow,
  enableSpotlight,
  spotlightRadius,
  clickEffect,
  enableStars,
  particleCount,
  enableTilt,
  enableMagnetism,
  textAutoHide,
  intro,
}: MagicBentoProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    if (!enableSpotlight) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--spotlight-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--spotlight-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  return (
    <div
      className="magic-bento-grid"
      style={
        {
          "--magic-columns": columns,
          "--magic-gap": `${gap}px`,
          "--magic-row-height": `${rowHeight}px`,
          "--magic-radius": `${radius}px`,
          "--spotlight-radius": `${spotlightRadius}px`,
        } as CSSProperties
      }
      data-stars={enableStars}
      data-particles={particleCount}
      data-tilt={enableTilt}
      data-magnetism={enableMagnetism}
      data-text-auto-hide={textAutoHide}
    >
      {cards.map((card, index) => {
        const content = (
          <>
            <div className="mb-5 flex items-start justify-between gap-4">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-sky-300/80">
                {card.eyebrow}
              </span>
              {card.icon && <span className="text-sky-300">{card.icon}</span>}
            </div>
            <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {card.title}
            </h3>
            <p
              className={`mt-3 max-w-sm text-sm leading-6 text-neutral-300 ${
                textAutoHide ? "magic-bento-description" : ""
              }`}
            >
              {card.description}
            </p>
            {card.detail && (
              <p className="mt-4 text-xs leading-5 text-neutral-500">{card.detail}</p>
            )}
            {card.visual === "chart" && (
              <svg
                aria-hidden="true"
                viewBox="0 0 300 92"
                className="mt-auto h-[4.25rem] w-full overflow-visible"
                fill="none"
              >
                <path d="M1 74H299M1 46H299M1 18H299" stroke="white" strokeOpacity=".08" />
                <motion.path
                  d="m2 70 29-8 22 5 26-28 25 12 23-19 24 11 22-25 23 14 25-18 25 8 28-17 20 7"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={intro ? { pathLength: 0, opacity: 0.4 } : false}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 1.4, delay: index * 0.08, ease: "easeOut" }}
                />
                <circle cx="298" cy="12" r="3" fill="#7dd3fc" />
              </svg>
            )}
            {card.href && (
              <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-sky-300">
                Explore project <span aria-hidden="true">↗</span>
              </span>
            )}
          </>
        );

        return (
          <motion.article
            key={card.title}
            initial={intro ? { opacity: 0, y: 18 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            onMouseMove={handlePointerMove}
            onClick={() => {
              if (clickEffect) setActiveCard(index);
            }}
            onAnimationEnd={() => {
              if (activeCard === index) setActiveCard(null);
            }}
            className={`magic-bento-card group relative flex min-h-52 flex-col overflow-hidden p-6 ${
              enableBorderGlow ? "magic-bento-glow" : ""
            } ${activeCard === index ? "magic-bento-click" : ""}`}
            style={
              {
                borderRadius: "var(--magic-radius)",
                minHeight: "var(--magic-row-height)",
                "--spotlight-x": "50%",
                "--spotlight-y": "50%",
              } as CSSProperties
            }
          >
            {card.href ? (
              <a
                href={card.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${card.title} (opens in a new tab)`}
                className="flex min-h-full flex-1 flex-col"
              >
                {content}
              </a>
            ) : (
              content
            )}
          </motion.article>
        );
      })}
    </div>
  );
}
