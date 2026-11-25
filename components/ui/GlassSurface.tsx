import type { HTMLAttributes } from "react";

type GlassSurfaceProps = HTMLAttributes<HTMLDivElement>;

export default function GlassSurface({
  children,
  className = "",
  ...props
}: GlassSurfaceProps) {
  return (
    <div
      className={`border border-white/10 bg-white/[0.045] shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
