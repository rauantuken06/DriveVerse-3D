import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Planet } from "./three/Planet";
import { Atmosphere } from "./three/Atmosphere";

function App() {
  return (
    <div className="app">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={1.5} />

        <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={0.5} />

        <Suspense fallback={null}>
          <Planet />
          <Atmosphere color="#5fdde0" />
        </Suspense>

        <OrbitControls enablePan={false} minDistance={2.5} maxDistance={8} />
      </Canvas>
    </div>
  );
}

export default App;
