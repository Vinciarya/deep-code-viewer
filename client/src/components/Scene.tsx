import React, { Suspense } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Model } from "./Model";

export function Scene() {
  return (
    <>
      {/* We don't need much base lighting since the model glows on its own */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />

      <Suspense fallback={null}>
        {/* The EffectComposer is the root for all post-processing effects */}
        <EffectComposer>
          {/* This effect makes emissive materials glow */}
          <Bloom
            intensity={1.2} // The bloom intensity.
            luminanceThreshold={0.9} // Only objects brighter than this will glow.
            luminanceSmoothing={0.03} // Smoothness of the glow transition.
          />

          {/* Your model and environment go inside the EffectComposer */}
          <group position={[0, 0.01, 0]} scale={3.2}>
            <Model />
          </group>
        </EffectComposer>
      </Suspense>

      <OrbitControls enableZoom={false} enablePan={true} />
    </>
  );
}
