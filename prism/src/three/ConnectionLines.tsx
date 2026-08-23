import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { Vector3, type Mesh } from 'three'
import type { Connection, ConnectionKind } from '@/types'
import { CONNECTIONS, DEPARTMENTS_BY_ID } from '@/data/departments'
import { statusStyle } from '@/utils/status'

const CORE_POSITION: [number, number, number] = [0, 0, 0]

// Cold, neutral palette by dependency type — connections never carry
// status color themselves, only the pulses traveling along them do
// (see DataPulse below).
const KIND_COLOR: Record<ConnectionKind, string> = {
  financial: '#5b8dee',
  information: '#5fd7e0',
  operational: '#aab2c0',
}

function resolvePosition(node: Connection['from']): [number, number, number] {
  if (node === 'core') return CORE_POSITION
  return DEPARTMENTS_BY_ID[node]?.position ?? CORE_POSITION
}

interface DataPulseProps {
  start: Vector3
  end: Vector3
  color: string
  speed: number
  phase: number
}

/**
 * A single point of light traveling start→end on a loop. This is what
 * sells "data is constantly flowing through the company" (spec section
 * 5) without animating line geometry itself. Its color is the *source*
 * department's status color — the one place this file lets status
 * color appear, and only because that department really is in that
 * state (e.g. Supply Chain's outgoing pulses read red because Supply
 * Chain is genuinely critical right now).
 */
function DataPulse({ start, end, color, speed, phase }: DataPulseProps) {
  const mesh = useRef<Mesh>(null)
  const tmp = useMemo(() => new Vector3(), [])

  useFrame((state) => {
    if (!mesh.current) return
    const t = (state.clock.elapsedTime * speed + phase) % 1
    tmp.copy(start).lerp(end, t)
    mesh.current.position.copy(tmp)
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.07, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  )
}

/**
 * Renders every dependency edge (spec section 5): a static hairline
 * plus a traveling pulse per connection. Purely presentational — Phase
 * 9 (AI-driven scene) and Phase 11 (risk propagation) will highlight
 * specific edges by reading which departments are active/at-risk from
 * `store/` and passing that down, not by changing this file's shape.
 */
export function ConnectionLines() {
  const edges = useMemo(() => {
    return CONNECTIONS.map((connection) => {
      const start = resolvePosition(connection.from)
      const end = resolvePosition(connection.to)
      const sourceDept =
        connection.from === 'core' ? undefined : DEPARTMENTS_BY_ID[connection.from]
      const pulseColor = sourceDept
        ? statusStyle(sourceDept.status).color
        : KIND_COLOR[connection.kind]

      return {
        connection,
        start: new Vector3(...start),
        end: new Vector3(...end),
        pulseColor,
      }
    })
  }, [])

  return (
    <group>
      {edges.map(({ connection, start, end, pulseColor }, i) => (
        <group key={connection.id}>
          <Line
            points={[start, end]}
            color={KIND_COLOR[connection.kind]}
            transparent
            opacity={0.22}
            lineWidth={1}
          />
          <DataPulse
            start={start}
            end={end}
            color={pulseColor}
            speed={0.12 + (i % 3) * 0.03}
            phase={i * 0.37}
          />
        </group>
      ))}
    </group>
  )
}
