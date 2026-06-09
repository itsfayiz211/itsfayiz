'use client';

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Computers from "./Computers";
import CanvasLoader from "./CanvasLoader";

export default function ComputersCanvas() {
  return (
    <Canvas
      camera={{ position: [5, 5, 12], fov: 40 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls enableZoom={false} />
        <Computers />
      </Suspense>
    </Canvas>
  );
}
