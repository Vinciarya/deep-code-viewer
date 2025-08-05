import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";

export function ThreeCanvas() {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <Scene />
    </Canvas>
  );
}
