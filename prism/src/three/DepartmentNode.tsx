import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { MeshStandardMaterial, type Group, type Mesh } from 'three'
import type { Department } from '@/types'
import { statusStyle } from '@/utils/status'
import { useSceneStore } from '@/store/sceneStore'
import { DEPARTMENT_METRICS } from '@/data/departmentMetrics'
import { GlassPanel } from '@/ui/GlassPanel'
import { MetricTile } from '@/ui/MetricTile'
import { lerp } from '@/utils/format'

interface DepartmentNodeProps {
  department: Department
}

/**
 * A single department node — hover highlights it and dims the rest of
 * the scene, click selects it (opens `DepartmentView`). Camera fly-in
 * on click is Phase 5; this already works standalone without it.
 */
export function DepartmentNode({ department }: DepartmentNodeProps) {
  const group = useRef<Group>(null)
  const core = useRef<Mesh>(null)
  const coreMaterial = useRef<MeshStandardMaterial>(null)

  const hoveredId = useSceneStore((s) => s.hoveredId)
  const selectedId = useSceneStore((s) => s.selectedId)
  const setHovered = useSceneStore((s) => s.setHovered)
  const selectDepartment = useSceneStore((s) => s.selectDepartment)

  const isHovered = hoveredId === department.id
  const isSelected = selectedId === department.id
  const isFocused = isHovered || isSelected
  const isDimmed = (hoveredId !== null || selectedId !== null) && !isFocused

  const style = useMemo(() => statusStyle(department.status), [department.status])
  const detail = DEPARTMENT_METRICS[department.id]
  const radius = 0.4 + department.weight * 0.35

  // Stagger idle animation per-node so they don't breathe in lockstep.
  // Derived deterministically from the id (not Math.random()) so it's
  // stable across re-renders/StrictMode remounts.
  const phase = useMemo(() => {
    let hash = 0
    for (let i = 0; i < department.id.length; i++) {
      hash = (hash * 31 + department.id.charCodeAt(i)) >>> 0
    }
    return ((hash % 1000) / 1000) * Math.PI * 2
  }, [department.id])
  const pulseSpeed = department.status === 'critical' ? 1.6 : 0.7

  const focusAmount = useRef(0)

  useFrame((state, delta) => {
    if (core.current) {
      core.current.rotation.y += delta * 0.25
      core.current.rotation.x += delta * 0.08
    }

    const target = isFocused ? 1 : 0
    focusAmount.current = lerp(focusAmount.current, target, 1 - Math.pow(0.001, delta))

    if (group.current) {
      const idle = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed + phase) * 0.035
      const focusScale = 1 + focusAmount.current * 0.18
      const dimScale = isDimmed ? 0.94 : 1
      group.current.scale.setScalar(idle * focusScale * dimScale)
    }

    if (coreMaterial.current) {
      coreMaterial.current.emissiveIntensity = 0.55 + focusAmount.current * 0.9
    }
  })

  return (
    <group position={department.position}>
      <group
        ref={group}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(department.id)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(null)
          document.body.style.cursor = 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation()
          selectDepartment(department.id)
        }}
      >
        <mesh ref={core}>
          <octahedronGeometry args={[radius, 0]} />
          <meshStandardMaterial
            ref={coreMaterial}
            color={style.color}
            emissive={style.color}
            emissiveIntensity={0.55}
            roughness={0.35}
            metalness={0.5}
            transparent
            opacity={isDimmed ? 0.4 : 1}
          />  
        </mesh>

        {/* soft glow shell, faked without post-processing bloom */}
        <mesh scale={2.2}>
          <sphereGeometry args={[radius, 16, 16]} />
          <meshBasicMaterial
            color={style.color}
            transparent
            opacity={isDimmed ? 0.03 : isFocused ? 0.16 : 0.08}
            depthWrite={false}
          />  
        </mesh>
      </group>

      <Html
        center
        distanceFactor={14}
        position={[0, radius + 0.65, 0]}
        occlude
        style={{ pointerEvents: 'none' }}
      >
        <div
          className="flex flex-col items-center gap-1 whitespace-nowrap transition-opasity duration-200"
          style={{ opacity: isDimmed ? 0.35 : 1 }}
        >
          <span
            className="h-1 w-1 rounded-full"
            style={{ backgroundColor: style.color }}
          />
          <span className="text-[11px] font-medium tracking-[0.2em] text-ink-70 uppercase">
              {department.name}
          </span>     
        </div>    
      </Html>

      {isHovered && !isSelected && detail && (
        <Html
          center
          distanceFactor={11}
          position={[0, radius + 2.1, 0]}
          occlude
          style={{ pointerEvents: 'none' }}
        >
          <GlassPanel variant="raised" className="w-56 px-4 py-3.5">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-ink-50 uppercase">
              {department.name}
            </span>
            <div className="mt-3 flex flex-col gap-3">
              {detail.headline.map((stat) => (
                <MetricTile key={stat.label} {...stat} />
              ))}
            </div>
            {detail.note && (
              <p className="mt-3 border-t border-glass-border pt-3 text-xs text-warning">
                {detail.note}
              </p>
            )}
          </GlassPanel>
        </Html>  
      )}    
    </group>
  )
}