import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { Vector3 } from 'three'
import { useSceneStore } from '@/store/sceneStore'
import { getCameraTarget } from '@/three/cameraTargets'
import { easeOutCubic } from '@/utils/format'

const TRANSITION_DURATION = 1.4 // seconds

/**
 * Flies the camera to whatever `sceneStore.cameraState` currently
 * resolves to (spec section 17), then hands control back to
 * `OrbitControls` so the scene stays interactive — a department click
 * (or, later, an AI command / CEO Mode / Simulation / risk
 * propagation) doesn't lock the camera, it just retargets it.
 *
 * The transition is driven imperatively in `useFrame` rather than by
 * re-rendering, both for smoothness and so it never fights the user:
 * once the eased move finishes, this stops touching the camera every
 * frame until the target changes again.
 */
export function CameraRig() {
  const { camera } = useThree()
  const controls = useRef<OrbitControlsImpl>(null)

  const cameraState = useSceneStore((s) => s.cameraState)
  const focusDepartmentId = useSceneStore((s) => s.focusDepartmentId)

  const target = useMemo(
    () => getCameraTarget(cameraState, focusDepartmentId),
    [cameraState, focusDepartmentId],
  )

  const transition = useRef({
    elapsed: 0,
    active: true,
    fromPosition: new Vector3().copy(camera.position),
    fromTarget: new Vector3(),
  })

  useEffect(() => {
    const t = transition.current
    t.fromPosition.copy(camera.position)
    t.fromTarget.copy(controls.current?.target ?? new Vector3())
    t.elapsed = 0
    t.active = true
  }, [target, camera.position])

  useFrame((_state, delta) => {
    const t = transition.current
    if (!t.active || !controls.current) return

    t.elapsed += delta
    const progress = Math.min(t.elapsed / TRANSITION_DURATION, 1)
    const eased = easeOutCubic(progress)

    camera.position.lerpVectors(t.fromPosition, target.position, eased)
    controls.current.target.lerpVectors(t.fromTarget, target.lookAt, eased)
    controls.current.update()

    if (progress >= 1) t.active = false
  })

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      minDistance={9}
      maxDistance={30}
      maxPolarAngle={Math.PI / 2.05}
      enableDamping
      dampingFactor={0.08}
    />
  )
}
