// Shared TypeScript types for PRISM.
// Domain types (Department, Metric, RiskChain, SimulationInput,
// ChatMessage, CameraState) are added phase-by-phase as their owning
// systems are built, to keep this file honest about what actually exists.

import type { Status } from '@/utils/status'
export type { Status }

/** Top nav sections. Selecting one is a store write, same as everything
 * else — the camera system (Phase 5) reacts to this exactly like it
 * reacts to an AI command. */
export type NavSection = 'overview' | 'departments' | 'simulation' | 'insights'

// ---------------------------------------------------------------------
// 3D corporate world (Phase 3+)
// ---------------------------------------------------------------------

export type DepartmentId =
  | 'finance'
  | 'hr'
  | 'sales'
  | 'it'
  | 'operations'
  | 'supplyChain'
  | 'customerExperience'

export interface Department {
  id: DepartmentId
  name: string
  /** World-space position of the department node relative to PRISM CORE
   * at the origin. */
  position: [number, number, number]
  /** 0–1 relative importance — drives node size. Not a metric itself,
   * just a rendering hint (bigger nodes read as "matters more"). */
  weight: number
  status: Status
}

export type ConnectionKind = 'financial' | 'information' | 'operational'

export interface Connection {
  id: string
  /** 'core' means PRISM CORE itself, otherwise a department id. */
  from: DepartmentId | 'core'
  to: DepartmentId | 'core'
  kind: ConnectionKind
}

// ---------------------------------------------------------------------
// Department metrics (Phase 4+)
// ---------------------------------------------------------------------

export interface DepartmentMetricStat {
  label: string
  value: number
  format?: (value: number) => string
  delta?: number
  higherIsBetter?: boolean
}

export interface DepartmentDetail {
  /** 2–3 stats shown in the hover tooltip. */
  headline: DepartmentMetricStat[]
  /** Short caption under the hover tooltip, e.g. "12 opportunities at risk". */
  note?: string
  /** Full stat grid for the Department View panel. */
  stats: DepartmentMetricStat[]
  topRisk: string
  /** Forward-looking projection of this department's primary metric. */
  outlook: DepartmentMetricStat
  /** Signed % trend on that same primary metric. */
  trend: number
}

// ---------------------------------------------------------------------
// Camera system (Phase 5+)
// ---------------------------------------------------------------------

/** Named camera framings the 3D scene can be driven to — by clicking a
 * department, or later by CEO Mode, the AI layer, Simulation and risk
 * propagation (Phases 7, 9, 10, 11). `three/CameraRig` is what actually
 * flies the camera between these; `three/cameraTargets` resolves a
 * state into a concrete position/lookAt. */
export type CameraState = 'overview' | 'department' | 'risk' | 'simulation' | 'executive'

