import { Sparkles } from '@react-three/drei'

/**
 * Ambient floating particles + a faint dust layer (spec section 4/5) —
 * atmosphere, not data. Two cheap Sparkles instances instead of a
 * hand-rolled BufferGeometry: fewer moving parts, and drei already
 * renders them as a single instanced draw call each.
 */
export function ParticleField() {
  return (
    <>
      <Sparkles
        count={220}
        size={1.4}
        speed={0.15}
        opacity={0.35}
        scale={[24, 12, 24]}
        color="#aab2c0"
        noise={1}
      />
      <Sparkles
        count={80}
        size={2.2}
        speed={0.08}
        opacity={0.4}
        scale={[16, 8, 16]}
        color="#5fd7e0"
        noise={1}
      />
    </>
  )
}
