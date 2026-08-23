import { useEffect, useRef, useState } from 'react'
import { easeOutCubic } from '@/utils/format'

interface AnimatedNumberProps {
  value: number
  /** Formats the tweened raw number for display, e.g. formatCurrency. */
  format?: (value: number) => string
  /** ms, kept short — this is a data readout, not a hero animation. */
  duration?: number
  className?: string
}

/**
 * Tweens from its previous value to the next whenever `value` changes,
 * instead of snapping — every metric in PRISM (revenue, health score,
 * simulation output) should visibly *move* when the underlying data
 * changes, never jump-cut.
 */
export function AnimatedNumber({
  value,
  format = (v) => v.toFixed(0),
  duration = 700,
  className,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const frameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const from = fromRef.current
    const to = value
    if (from === to) return

    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = easeOutCubic(t)
      setDisplay(from + (to - from) * eased)
      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = to
      }
    }
    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [value, duration])

  return <span className={className}>{format(display)}</span>
}
