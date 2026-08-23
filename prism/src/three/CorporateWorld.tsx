import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { PrismCore } from '@/three/PrismCore'
import { DepartmentNode } from '@/three/DepartmentNode'
import { ConnectionLines } from '@/three/ConnectionLines'
import { ParticleField } from '@/three/ParticleField'
import { DEPARTMENTS } from '@/data/departments'
import { useSceneStore } from '@/store/sceneStore'

/**
 * The whole company as one 3D group: core, departments, the
 * dependency graph between them, and ambient particles. Auto-rotation
 * pauses while a department is hovered/selected so tooltips and the
 * Department View stay put under the cursor.
 */
export function CorporateWorld() {
  const world = useRef<Group>(null)

  useFrame((_state, delta) => {
    const { hoveredId, selectedId } = useSceneStore.getState()
    if (world.current && !hoveredId && !selectedId) {
      world.current.rotation.y += delta * 0.015
    }
  })

  return (
    <group ref={world}>
      <PrismCore />
      {DEPARTMENTS.map((department) => (
        <DepartmentNode key={department.id} department={department} />
      ))}
      <ConnectionLines />
      <ParticleField />
    </group>
  )
}