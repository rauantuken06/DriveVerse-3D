import { Vector3 } from 'three'
import type { CameraState, DepartmentId } from '@/types'
import { DEPARTMENTS_BY_ID } from '@/data/departments'

export interface CameraTarget {
  position: Vector3
  lookAt: Vector3
}

const ORIGIN = new Vector3(0, 0, 0)

/** Fixed framings that don't depend on a focused department. */
const PRESETS: Record<'overview' | 'executive' | 'simulation', CameraTarget> = {
  overview: {
    position: new Vector3(0, 5, 19),
    lookAt: ORIGIN.clone(),
  },
  // Pulled back and elevated — the "step back and see the whole
  // system" framing CEO Mode (Phase 7) switches to.
  executive: {
    position: new Vector3(0, 10.5, 21),
    lookAt: new Vector3(0, 0.4, 1.5),
  },
  // Higher and further back so the whole graph reads clearly as the
  // Simulation panel (Phase 10) sweeps values and nodes react.
  simulation: {
    position: new Vector3(0, 14, 15),
    lookAt: new Vector3(0, -0.2, 2.5),
  },
}

/** Frame a single department: push the camera outward along the same
 * radial direction the department already sits on (relative to PRISM
 * CORE), lifted slightly — reads as "stepping toward" that part of the
 * company rather than an arbitrary angle. */
function departmentFraming(id: DepartmentId, pullback: number): CameraTarget {
  const department = DEPARTMENTS_BY_ID[id]
  const focus = new Vector3(...department.position)
  const direction = focus.clone().sub(ORIGIN)
  if (direction.lengthSq() < 0.0001) direction.set(0, 0, 1)
  direction.normalize()

  const position = focus
    .clone()
    .add(direction.multiplyScalar(pullback))
    .add(new Vector3(0, pullback * 0.25, 0))

  return { position, lookAt: focus }
}

/**
 * Resolves the current `sceneStore` camera state into a concrete
 * position/lookAt pair. `three/CameraRig` eases toward whatever this
 * returns — nothing here touches live Three.js scene objects.
 */
export function getCameraTarget(
  state: CameraState,
  focusDepartmentId: DepartmentId | null,
): CameraTarget {
  if (state === 'department' && focusDepartmentId) {
    return departmentFraming(focusDepartmentId, 6)
  }
  // Same department, pulled back further so the connections in/out of
  // it stay in view — Phase 11 passes the department a risk chain
  // currently originates from.
  if (state === 'risk' && focusDepartmentId) {
    return departmentFraming(focusDepartmentId, 9.5)
  }
  if (state === 'executive') return PRESETS.executive
  if (state === 'simulation') return PRESETS.simulation
  return PRESETS.overview
}
