import { AnimatedNumber } from '@/ui/AnimatedNumber'
import { formatDelta } from '@/utils/format'
import { cn } from '@/utils/cn'

interface MetricTileProps {
  label: string
  value: number
  format?: (value: number) => string
  /** Signed percentage change, e.g. 8.3 or -4.2. Omit for no trend. */
  delta?: number
  /** Whether a positive delta is good — false flips the color read
   * (e.g. "delayed shipments" going up is bad even though it's a
   * positive number). Defaults to true. */
  higherIsBetter?: boolean
  size?: 'sm' | 'lg'
  className?: string
}

/**
 * The base readout used everywhere a single number needs to be shown
 * with context: department tooltips, Department View, the Intelligence
 * panel. Deliberately plain — label, number, trend, nothing else.
 */
export function MetricTile({
  label,
  value,
  format = (v) => v.toFixed(0),
  delta,
  higherIsBetter = true,
  size = 'sm',
  className,
}: MetricTileProps) {
  const deltaIsGood = delta === undefined ? null : higherIsBetter ? delta >= 0 : delta <= 0

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-[11px] font-medium tracking-[0.15em] text-ink-50 uppercase">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <AnimatedNumber
          value={value}
          format={format}
          className={cn(
            'font-mono font-semibold tabular-nums text-ink-100',
            size === 'lg' ? 'text-3xl' : 'text-xl',
          )}
        />
        {delta !== undefined && (
          <span
            className={cn(
              'font-mono text-xs font-medium tabular-nums',
              deltaIsGood ? 'text-positive' : 'text-critical',
            )}
          >
            {formatDelta(delta)}
          </span>
        )}
      </div>
    </div>
  )
}
