import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { GlassPanel } from '@/ui/GlassPanel'
import { AnimatedNumber } from '@/ui/AnimatedNumber'
import { useCeoModeStore } from '@/store/ceoModeStore'
import { useSceneStore } from '@/store/sceneStore'
import { EXECUTIVE_ISSUES } from '@/data/executiveIssues'
import { formatDelta } from '@/utils/format'

/**
 * CEO Mode's centerpiece (spec section 7): exactly three ranked issues,
 * nothing else. Clicking a card drills into that department the same
 * way clicking its 3D node does — `selectDepartment` is the single
 * path for both, so the camera and Department View behave identically
 * either way.
 */
export function ExecutiveAttentionPanel() {
  const active = useCeoModeStore((s) => s.active)
  const selectedId = useSceneStore((s) => s.selectedId)
  const selectDepartment = useSceneStore((s) => s.selectDepartment)
  const visible = active && !selectedId

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute top-6 left-6 w-[360px]"
        >
          <GlassPanel variant="raised" className="flex flex-col gap-4 p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-warning" />
              <span className="text-[11px] font-semibold tracking-[0.2em] text-ink-50 uppercase">
                Executive Attention Required
              </span>
            </div>

            <div className="flex flex-col">
              {EXECUTIVE_ISSUES.map((issue) => (
                <button
                  key={issue.rank}
                  type="button"
                  onClick={() => selectDepartment(issue.departmentId)}
                  className="group flex gap-4 rounded-xl px-2 py-3 text-left transition-colors hover:bg-white/[0.04]"
                >
                  <span className="font-mono text-2xl font-semibold text-ink-30 transition-colors group-hover:text-ink-50">
                    {String(issue.rank).padStart(2, '0')}
                  </span>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <span className="text-[11px] font-semibold tracking-[0.15em] text-ink-50 uppercase">
                      {issue.department}
                    </span>

                    {issue.metric ? (
                      <>
                        <span className="text-xs text-ink-50">{issue.metric.label}</span>
                        <div className="flex items-baseline gap-2">
                          <AnimatedNumber
                            value={issue.metric.value}
                            format={issue.metric.format}
                            className="font-mono text-xl font-semibold text-ink-100"
                          />
                          {issue.metric.delta !== undefined && (
                            <span className="font-mono text-xs font-medium text-critical">
                              {formatDelta(issue.metric.delta)}
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <span className="text-base font-semibold text-critical">
                        {issue.headline}
                      </span>
                    )}

                    <p className="text-xs leading-relaxed text-ink-50">{issue.detail}</p>
                  </div>
                </button>
              ))}
            </div>
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
