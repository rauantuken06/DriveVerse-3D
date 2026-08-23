import { intelligence, company } from '@/data/company'
import { formatCurrency, formatNumber, formatPercent } from '@/utils/format'
import type { DepartmentDetail, DepartmentId } from '@/types'

const days = (v: number) => `${v.toFixed(0)} days`
const minutes = (v: number) => `${v.toFixed(1)} min`
const hours = (v: number) => `${v.toFixed(1)} hrs`
const percent0 = (v: number) => formatPercent(v, 0)
const percent2 = (v: number) => formatPercent(v, 2)

// 4.8M / 5.2M target ≈ 92% — matches the "Performance 92%" tooltip line
// in the spec exactly, kept as a literal so it never silently drifts.
const SALES_PERFORMANCE = 92

export const DEPARTMENT_METRICS: Record<DepartmentId, DepartmentDetail> = {
  sales: {
    headline: [
      { label: 'Revenue', value: 4_800_000, format: formatCurrency, delta: -4.2 },
      { label: 'Target', value: 5_200_000, format: formatCurrency },
      { label: 'Performance', value: SALES_PERFORMANCE, format: percent0 },
    ],
    note: '12 opportunities at risk',
    stats: [
      { label: 'Revenue', value: 4_800_000, format: formatCurrency, delta: -4.2 },
      { label: 'Target', value: 5_200_000, format: formatCurrency },
      { label: 'Pipeline', value: 14_300_000, format: formatCurrency },
      { label: 'Conversion', value: 18.7, format: percent0 },
      { label: 'Avg. Sales Cycle', value: 24, format: days, higherIsBetter: false },
      { label: 'Deals', value: 148, format: formatNumber },
    ],
    topRisk: 'Enterprise pipeline conversion',
    outlook: { label: 'Forecast Revenue', value: 5_050_000, format: formatCurrency },
    trend: -4.2,
  },

  finance: {
    headline: [
      {
        label: 'Revenue',
        value: intelligence.periodRevenue,
        format: formatCurrency,
        delta: intelligence.periodRevenueDelta,
      },
      { label: 'EBITDA', value: 3_100_000, format: formatCurrency },
      { label: 'Cash Flow', value: 2_400_000, format: formatCurrency },
    ],
    stats: [
      {
        label: 'Revenue',
        value: intelligence.periodRevenue,
        format: formatCurrency,
        delta: intelligence.periodRevenueDelta,
      },
      {
        label: 'Operating Cost',
        value: 13_200_000,
        format: formatCurrency,
        higherIsBetter: false,
      },
      { label: 'EBITDA', value: 3_100_000, format: formatCurrency },
      { label: 'Cash Flow', value: 2_400_000, format: formatCurrency },
    ],
    topRisk: 'Operating cost growth outpacing revenue',
    outlook: {
      label: 'Forecast Revenue',
      value: intelligence.forecast,
      format: formatCurrency,
    },
    trend: intelligence.periodRevenueDelta,
  },

  hr: {
    headline: [
      { label: 'Employees', value: company.employees, format: formatNumber },
      { label: 'Open Positions', value: 47, format: formatNumber },
      { label: 'Engagement', value: 82, format: percent0 },
    ],
    note: '6 critical roles unfilled 60+ days',
    stats: [
      { label: 'Employees', value: company.employees, format: formatNumber },
      { label: 'Open Positions', value: 47, format: formatNumber },
      { label: 'Turnover', value: 8.4, format: percent0, higherIsBetter: false },
      { label: 'Engagement', value: 82, format: percent0 },
    ],
    topRisk: 'Engineering role backfill time',
    outlook: { label: 'Forecast Engagement', value: 84, format: percent0 },
    trend: 2.4,
  },

  it: {
    headline: [
      { label: 'Availability', value: 99.94, format: percent2 },
      {
        label: 'Active Incidents',
        value: 4,
        format: formatNumber,
        higherIsBetter: false,
      },
      { label: 'Avg Response', value: 8.4, format: minutes, higherIsBetter: false },
    ],
    note: '1 critical incident open',
    stats: [
      { label: 'Availability', value: 99.94, format: percent2 },
      {
        label: 'Active Incidents',
        value: 4,
        format: formatNumber,
        higherIsBetter: false,
      },
      {
        label: 'Critical Incidents',
        value: 1,
        format: formatNumber,
        higherIsBetter: false,
      },
      { label: 'Avg Response', value: 8.4, format: minutes, higherIsBetter: false },
    ],
    topRisk: 'ERP latency increase',
    outlook: { label: 'Forecast Availability', value: 99.9, format: percent2 },
    trend: -0.04,
  },

  operations: {
    headline: [
      { label: 'Efficiency', value: company.operationalEfficiency, format: percent0 },
      { label: 'SLA Compliance', value: 94, format: percent0 },
      { label: 'Delayed', value: 146, format: formatNumber, higherIsBetter: false },
    ],
    note: '146 orders delayed',
    stats: [
      { label: 'Efficiency', value: company.operationalEfficiency, format: percent0 },
      { label: 'SLA Compliance', value: 94, format: percent0 },
      { label: 'Active Orders', value: 3_482, format: formatNumber },
      { label: 'Delayed', value: 146, format: formatNumber, higherIsBetter: false },
    ],
    topRisk: 'Delivery SLA compliance trending down',
    outlook: { label: 'Forecast SLA Compliance', value: 91, format: percent0 },
    trend: -3.2,
  },

  supplyChain: {
    headline: [
      { label: 'On Time', value: 91, format: percent0 },
      { label: 'Delayed', value: 116, format: formatNumber, higherIsBetter: false },
      { label: 'Inventory Health', value: 84, format: percent0 },
    ],
    note: '116 shipments delayed',
    stats: [
      { label: 'Shipments', value: 1_284, format: formatNumber },
      { label: 'On Time', value: 91, format: percent0 },
      { label: 'Delayed', value: 116, format: formatNumber, higherIsBetter: false },
      { label: 'Inventory Health', value: 84, format: percent0 },
    ],
    topRisk: 'Secondary vendor capacity constraint',
    outlook: { label: 'Forecast On-Time Rate', value: 86, format: percent0 },
    trend: -5.5,
  },

  customerExperience: {
    headline: [
      { label: 'Satisfaction', value: 89, format: percent0 },
      { label: 'NPS', value: 42, format: formatNumber },
      { label: 'Support Tickets', value: 1_204, format: formatNumber },
    ],
    note: '184 tickets escalated this period',
    stats: [
      { label: 'Satisfaction', value: 89, format: percent0 },
      { label: 'NPS', value: 42, format: formatNumber },
      { label: 'Support Tickets', value: 1_204, format: formatNumber },
      {
        label: 'Avg Resolution',
        value: 6.2,
        format: hours,
        higherIsBetter: false,
      },
    ],
    topRisk: 'Delivery delays driving satisfaction decline',
    outlook: { label: 'Forecast Satisfaction', value: 86, format: percent0 },
    trend: -3.3,
  },
}
