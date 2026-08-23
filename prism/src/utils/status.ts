// Status is the one place color carries meaning in PRISM. Every other
// accent in the UI is cold/neutral (silver, blue, cyan) — red and green
// are reserved exclusively for this.

export type Status = 'positive' | 'stable' | 'warning' | 'critical'

interface StatusStyle {
  /** hex, for Three.js materials / SVG strokes */
  color: string
  /** Tailwind text color class */
  text: string
  /** Tailwind bg color class, low-opacity, for pills/badges */
  bg: string
  /** Tailwind border color class */
  border: string
  label: string
}

const STATUS_STYLES: Record<Status, StatusStyle> = {
  positive: {
    color: '#4ade80',
    text: 'text-positive',
    bg: 'bg-positive/10',
    border: 'border-positive/30',
    label: 'Healthy',
  },
  stable: {
    color: '#5b8dee',
    text: 'text-blue',
    bg: 'bg-blue/10',
    border: 'border-blue/30',
    label: 'Stable',
  },
  warning: {
    color: '#eab976',
    text: 'text-warning',
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    label: 'At Risk',
  },
  critical: {
    color: '#ef4444',
    text: 'text-critical',
    bg: 'bg-critical/10',
    border: 'border-critical/30',
    label: 'Critical',
  },
}

export function statusStyle(status: Status): StatusStyle {
  return STATUS_STYLES[status]
}

/** Derive a status from a 0-100 performance-style score. */
export function statusFromScore(score: number): Status {
  if (score >= 90) return 'positive'
  if (score >= 75) return 'stable'
  if (score >= 60) return 'warning'
  return 'critical'
}
