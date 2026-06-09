'use client';

import { Html } from "@react-three/drei";

export default function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="w-48 h-48 rounded-xl bg-neutral-800 animate-pulse mb-4" />
        <p className="text-white text-lg">Loading...</p>
      </div>
    </Html>
  );
}
