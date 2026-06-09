'use client';

import { Html } from "@react-three/drei";

export default function FullPageSkeleton() {
  return (
    <Html center>
      <div className="w-64 h-40 rounded-xl bg-neutral-800 animate-pulse" />
    </Html>
  );
}
