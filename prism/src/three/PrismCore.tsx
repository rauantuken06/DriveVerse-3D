import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'

/**
 * PRISM CORE — the central object every department orbits and connects
 * to. Deliberately not a department itself: a wireframe outer shell (the
 * "system boundary") around a slowly breathing inner solid (the "living
 * data" core), cold blue/cyan only — no status color, it never has a
 * health state of its own.
 */
export function PrismCore() {
  const group = useRef<Group>(null)
  const shell = useRef<Mesh>(null)
  const inner = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (shell.current) {
      shell.current.rotation.y += delta * 0.06
      shell.current.rotation.x += delta * 0.015
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.1
      const breathe = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.06
      inner.current.scale.setScalar(breathe)
    }
  })

  return (
    <group ref={group}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#5fd7e0" wireframe transparent opacity={0.35} />
      </mesh>

      <mesh ref={inner}>
        <octahedronGeometry args={[0.85, 0]} />
        <meshStandardMaterial
          color="#5b8dee"
          emissive="#5fd7e0"
          emissiveIntensity={0.9}
          roughness={0.25}
          metalness={0.6}
        />
      </mesh>

      {/* soft additive glow, faked without post-processing bloom */}
      <mesh scale={2.4}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color="#5fd7e0"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
