// Formatting + math helpers used across metric tiles, tooltips, the
// simulation engine and the AI response layer. Framework-agnostic.

/** $184.2M / $4.8M / $920K style compact currency, always 1 decimal. */
export function formatCurrency(value: number): string {
  const abs = Math.abs(value)
  const sign = value < 0 ? '-' : ''

  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(1)}B`
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`
  return `${sign}$${abs.toFixed(0)}`
}

/** 1,842 / 12,483 style thousands separators. */
export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString('en-US')
}

/** 92% / 8.4% style percentage. `decimals` defaults to 1. */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

/** +8.3% / -4.2% style signed delta, for trend indicators. */
export function formatDelta(value: number, decimals = 1): string {
  const sign = value > 0 ? '+' : value < 0 ? '' : '±'
  return `${sign}${value.toFixed(decimals)}%`
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1)
}

/** Standard ease-out-cubic, used for camera + number tween timing. */
export function easeOutCubic(t: number): number {
  const c = clamp(t, 0, 1)
  return 1 - Math.pow(1 - c, 3)
}
