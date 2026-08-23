import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { GlassPanel } from '@/ui/GlassPanel'

interface ScreenTooltipProps {
  /** Screen-space position in pixels — the department hover tooltip
   * (Phase 4) derives this from the 3D object's projected position. */
  x: number
  y: number
  visible: boolean
  children: ReactNode
}

/**
 * A glass tooltip pinned to a screen coordinate rather than a DOM
 * anchor — what department hover cards and risk-chain callouts over
 * the 3D canvas are built from.
 */
export function ScreenTooltip({ x, y, visible, children }: ScreenTooltipProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.98 }}
          transition={{ duration: 0.16, ease: 'easeOut' }}
          style={{ left: x, top: y }}
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-[calc(100%+16px)]"
        >
          <GlassPanel variant="raised" className="min-w-[220px] px-4 py-3">
            {children}
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
