import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { statusStyle, type Status } from '@/utils/status'

interface StatusBadgeProps {
  status: Status
  children: ReactNode
  className?: string
}

/** Small status pill — "Stable", "Critical", etc. */
export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  const s = statusStyle(status)
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase',
        s.text,
        s.bg,
        s.border,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', s.bg.replace('/10', ''))} />
      {children}
    </span>
  )
}

/** The pulsing "LIVE" indicator in the top nav. Plain CSS animation —
 * cheap, always running, no reason to spend a render loop on it. */
export function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-ink-50 uppercase">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-positive" />
      </span>
      Live
    </span>
  )
}
