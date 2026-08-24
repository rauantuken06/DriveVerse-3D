import { statusFromScore, type Status } from '@/utils/status'

/**
 * Company-wide mock metrics (spec section 14). These are the headline
 * numbers for the Overview screen (Phase 6).
 *
 * Note on scale: `periodRevenue` below (the Intelligence panel's
 * "$18.4M") is this quarter's revenue-to-date, not the annual figure —
 * 184.2M / 4 quarters ≈ 46M is the pace for a *strong* quarter, and
 * 18.4M is deliberately below that pace, which is exactly the "Sales
 * below target" story the AI layer narrates in Phase 9. Keeping this
 * one comment here so the two numbers never drift back out of sync.
 */
export const company = {
  annualRevenue: 184_200_000,
  ebitda: 28_400_000,
  employees: 1_842,
  customers: 12_483,
  activeProjects: 47,
  operationalEfficiency: 87, // %
  customerSatisfaction: 92, // %
  systemAvailability: 99.94, // %
}

/**
 * YoY deltas for the Overview metrics grid (Phase 6). Deliberately
 * omitted for `activeProjects` (a snapshot count, not a trend) and
 * `systemAvailability` (already near-ceiling). `customerSatisfaction`'s
 * -1.8% is the same softening the Customer Experience department shows
 * in `data/departmentMetrics.ts` — same story, two places.
 */
export const companyDeltas = {
  annualRevenue: 6.1,
  ebitda: 4.8,
  employees: 3.2,
  customers: 9.7,
  operationalEfficiency: 1.4,
  customerSatisfaction: -1.8,
}

export interface LiveInsight {
  title: string
  detail: string
}

export const intelligence: {
  healthScore: number
  status: Status
  periodRevenue: number
  periodRevenueDelta: number
  forecast: number
  activeRisks: number
  criticalRisks: number
  insight: LiveInsight
} = {
  healthScore: 87,
  status: statusFromScore(87),
  periodRevenue: 18_400_000,
  periodRevenueDelta: 8.3,
  forecast: 21_100_000,
  activeRisks: 7,
  criticalRisks: 2,
  insight: {
    title: 'Revenue risk detected',
    detail: 'Enterprise sales conversion declined 6.4% this period.',
  },
}
