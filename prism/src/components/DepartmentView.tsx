import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useSceneStore } from '@/store/sceneStore'
import { DEPARTMENTS_BY_ID } from '@/data/departments'
import { DEPARTMENT_METRICS } from '@/data/departmentMetrics'
import { GlassPanel } from '@/ui/GlassPanel'
import { MetricTile } from '@/ui/MetricTile'
import { StatusBadge } from '@/ui/Badge'
import { statusStyle } from '@/utils/status'
import { formatDelta } from '@/utils/format'
import { cn } from '@/utils/cn'

/**
 * The expanded single-department readout (spec section 6), opened by
 * clicking a node in the 3D scene (`DepartmentNode.onClick` writes
 * `sceneStore.selectedId`). Camera fly-in to frame the department is
 * Phase 5 — this panel already works standalone without it.
 */
export function DepartmentView() {
  const selectedId = useSceneStore((s) => s.selectedId)
  const closeDepartment = useSceneStore((s) => s.closeDepartment)

  const department = selectedId ? DEPARTMENTS_BY_ID[selectedId] : undefined
  const detail = selectedId ? DEPARTMENT_METRICS[selectedId] : undefined

  return (
    <AnimatePresence>
      {department && detail && (
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute top-1/2 left-6 w-[380px] -translate-y-1/2"
        >
          <GlassPanel variant="raised" className="flex flex-col gap-6 p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.2em] text-ink-50 uppercase">
                  Department
                </span>
                <h2 className="mt-1 text-xl font-semibold text-ink-100">
                  {department.name}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={department.status}>
                  {statusStyle(department.status).label}
                </StatusBadge>
                <button
                  type="button"
                  onClick={closeDepartment}
                  className="text-ink-50 transition-colors hover:text-ink-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              {detail.stats.map((stat) => (
                <MetricTile key={stat.label} {...stat} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-glass-border pt-5">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium tracking-[0.15em] text-ink-50 uppercase">
                  Top Risk
                </span>
                <p className="text-sm leading-snug text-ink-100">{detail.topRisk}</p>
              </div>

              <MetricTile {...detail.outlook} />

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium tracking-[0.15em] text-ink-50 uppercase">
                  Trend
                </span>
                <span
                  className={cn(
                    'font-mono text-xl font-semibold tabular-nums',
                    detail.trend >= 0 ? 'text-positive' : 'text-critical',
                  )}
                >
                  {formatDelta(detail.trend)}
                </span>
              </div>
            </div>
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
