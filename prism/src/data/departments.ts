import type { Connection, Department } from '@/types'

/**
 * Layout for the 3D corporate world (spec section 5). Positions are
 * hand-placed rather than computed from an even radial split, so the
 * layout can stay legible and demo-directed: Supply Chain and Customer
 * Experience sit front-and-center (closest to the default camera —
 * see `three/Scene.tsx`) because they're where the Phase 9 AI demo and
 * the Phase 11 risk-propagation story both originate. Finance/HR/Sales/
 * IT/Operations ring around behind them.
 *
 * `status` here is the *current* department status shown at rest —
 * Phase 6 attaches the full metrics behind each of these, Phase 7 (CEO
 * Mode) and Phase 11 (risk propagation) both read/override it live via
 * `store/`, this is just the default.
 */
export const DEPARTMENTS: Department[] = [
  {
    id: 'finance',
    name: 'Finance',
    position: [0, 1.4, -7.2],
    weight: 0.85,
    status: 'stable',
  },
  {
    id: 'hr',
    name: 'HR',
    position: [-6.6, 0.6, -2.0],
    weight: 0.55,
    status: 'positive',
  },
  {
    id: 'sales',
    name: 'Sales',
    position: [6.6, 0.9, -2.0],
    weight: 1,
    status: 'warning',
  },
  {
    id: 'it',
    name: 'IT',
    position: [-6.2, -0.1, 4.4],
    weight: 0.6,
    status: 'stable',
  },
  {
    id: 'operations',
    name: 'Operations',
    position: [6.2, 0, 4.4],
    weight: 0.8,
    status: 'warning',
  },
  {
    id: 'supplyChain',
    name: 'Supply Chain',
    position: [0, -0.6, 7.6],
    weight: 0.75,
    status: 'critical',
  },
  {
    id: 'customerExperience',
    name: 'Customer Experience',
    position: [3.4, -0.2, 6.4],
    weight: 0.65,
    status: 'warning',
  },
]

export const DEPARTMENTS_BY_ID: Record<string, Department> = Object.fromEntries(
  DEPARTMENTS.map((d) => [d.id, d]),
)

/**
 * Dependency graph between departments (spec section 5): financial
 * dependency, information flow, operational dependency. Color/behavior
 * is derived from `kind`, never hardcoded per edge — see
 * `three/ConnectionLines.tsx`.
 *
 * This is also the exact graph the Phase 11 risk-propagation animation
 * walks: supplyChain → operations → customerExperience → sales →
 * finance is the "Supply Chain disruption tanks revenue" chain from
 * spec section 1.
 */
export const CONNECTIONS: Connection[] = [
  { id: 'core-finance', from: 'core', to: 'finance', kind: 'financial' },
  { id: 'core-sales', from: 'core', to: 'sales', kind: 'financial' },
  { id: 'core-hr', from: 'core', to: 'hr', kind: 'operational' },
  { id: 'core-it', from: 'core', to: 'it', kind: 'information' },
  { id: 'core-operations', from: 'core', to: 'operations', kind: 'operational' },
  { id: 'core-supplyChain', from: 'core', to: 'supplyChain', kind: 'operational' },
  {
    id: 'core-customerExperience',
    from: 'core',
    to: 'customerExperience',
    kind: 'information',
  },

  // the risk-propagation chain
  {
    id: 'supplyChain-operations',
    from: 'supplyChain',
    to: 'operations',
    kind: 'operational',
  },
  {
    id: 'operations-customerExperience',
    from: 'operations',
    to: 'customerExperience',
    kind: 'operational',
  },
  {
    id: 'customerExperience-sales',
    from: 'customerExperience',
    to: 'sales',
    kind: 'information',
  },
  { id: 'sales-finance', from: 'sales', to: 'finance', kind: 'financial' },

  // supporting cross-links
  { id: 'it-operations', from: 'it', to: 'operations', kind: 'information' },
  { id: 'hr-operations', from: 'hr', to: 'operations', kind: 'operational' },
]
