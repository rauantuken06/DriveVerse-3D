import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { CorporateWorld } from '@/three/CorporateWorld'
import { CameraRig } from '@/three/CameraRig'
import { useSceneStore } from '@/store/sceneStore'

/**
 * The Canvas boundary — everything Three.js-related mounts inside
 * here, everything else (nav, panels, command bar) stays plain React
 * DOM on top of it. Lighting is deliberately minimal (spec section 20:
 * avoid many realtime lights) — one ambient, one hemisphere, one
 * directional; the "glow" read on the core/nodes comes from emissive
 * materials, not extra lights.
 */
export function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 5, 19], fov: 42, near: 0.1, far: 100 }}
      onPointerMissed={() => useSceneStore.getState().closeDepartment()}
    >
      <color attach="background" args={['#050609']} />
      <fogExp2 attach="fog" args={['#050609', 0.026]} />

      <ambientLight intensity={0.35} />
      <hemisphereLight args={['#3a4a6b', '#050609', 0.45]} />
      <directionalLight position={[6, 10, 4]} intensity={0.55} color="#dfe6f5" />

      <Suspense fallback={null}>
        <CorporateWorld />
      </Suspense>

      <CameraRig />
    </Canvas>
  )
}
