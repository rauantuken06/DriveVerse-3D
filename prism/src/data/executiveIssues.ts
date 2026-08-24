import type { DepartmentId } from '@/types'
import { formatPercent } from '@/utils/format'

const percent0 = (v: number) => formatPercent(v, 0)
const percent1 = (v: number) => formatPercent(v, 1)

export interface ExecutiveIssue {
  rank: number
  departmentId: DepartmentId
  department: string
  /** Big highlighted line for issues with no single hero metric
   * (Sales) — omitted when `metric` is set. */
  headline?: string
  /** A single hero metric (Operations/IT) — omitted when `headline`
   * carries the point instead. */
  metric?: {
    label: string
    value: number
    format: (value: number) => string
    delta?: number
  }
  detail: string
}

/**
 * The exactly-three issues CEO Mode surfaces (spec section 7). These
 * are deliberately a live "what needs attention right now" snapshot,
 * not the resting baseline in `data/departmentMetrics.ts` — IT reads
 * "stable" day to day, but CEO Mode is what surfaces that its ERP
 * latency has actually spiked. That gap between "the dashboard looks
 * fine" and "here's what actually needs you" is the point of the
 * feature, so the numbers here are allowed to diverge from the
 * baseline on purpose.
 */
export const EXECUTIVE_ISSUES: ExecutiveIssue[] = [
  {
    rank: 1,
    departmentId: 'sales',
    department: 'Sales',
    headline: '$1.4M revenue at risk',
    detail: '12 enterprise deals show declining probability.',
  },
  {
    rank: 2,
    departmentId: 'operations',
    department: 'Operations',
    metric: {
      label: 'Delivery SLA',
      value: 89,
      format: percent0,
      delta: -7.3,
    },
    detail: 'Down from 94% compliance this period.',
  },
  {
    rank: 3,
    departmentId: 'it',
    department: 'IT',
    metric: {
      label: 'Service Availability',
      value: 96.7,
      format: percent1,
    },
    detail: 'ERP latency increased by 38%.',
  },
]

export const EXECUTIVE_DEPARTMENT_IDS = new Set<DepartmentId>(
  EXECUTIVE_ISSUES.map((issue) => issue.departmentId),
)
