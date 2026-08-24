import { AnimatePresence, motion } from 'framer-motion'
import { GlassPanel } from '@/ui/GlassPanel'
import { MetricTile } from '@/ui/MetricTile'
import { useUIStore } from '@/store/uiStore'
import { useSceneStore } from '@/store/sceneStore'
import { useCeoModeStore } from '@/store/ceoModeStore'
import { company, companyDeltas } from '@/data/company'
import { formatCurrency, formatNumber, formatPercent } from '@/utils/format'

const percent0 = (v: number) => formatPercent(v, 0)
const percent2 = (v: number) => formatPercent(v, 2)

/**
 * Company-wide headline metrics (spec section 14) — the "Overview" nav
 * tab's dashboard, docked top-left. Distinct from `IntelligencePanel`
 * (period/risk-focused): this is the raw scale of the business.
 *
 * Hides while a department is selected (`DepartmentView` takes the
 * same left-hand real estate) or while CEO Mode is active
 * (`ExecutiveAttentionPanel` takes it instead) — the left column only
 * ever shows one of the three.
 */
export function MetricsDashboard() {
  const activeSection = useUIStore((s) => s.activeSection)
  const selectedId = useSceneStore((s) => s.selectedId)
  const ceoModeActive = useCeoModeStore((s) => s.active)
  const visible = activeSection === 'overview' && !selectedId && !ceoModeActive

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute top-6 left-6"
        >
          <GlassPanel variant="raised" className="flex w-[320px] flex-col gap-6 p-6">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-ink-50 uppercase">
                Company Overview
              </span>
              <p className="mt-1 text-xs text-ink-30">Fiscal year to date</p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5">
              <MetricTile
                label="Annual Revenue"
                value={company.annualRevenue}
                format={formatCurrency}
                delta={companyDeltas.annualRevenue}
              />
              <MetricTile
                label="EBITDA"
                value={company.ebitda}
                format={formatCurrency}
                delta={companyDeltas.ebitda}
              />
              <MetricTile
                label="Employees"
                value={company.employees}
                format={formatNumber}
                delta={companyDeltas.employees}
              />
              <MetricTile
                label="Customers"
                value={company.customers}
                format={formatNumber}
                delta={companyDeltas.customers}
              />
              <MetricTile
                label="Active Projects"
                value={company.activeProjects}
                format={formatNumber}
              />
              <MetricTile
                label="Op. Efficiency"
                value={company.operationalEfficiency}
                format={percent0}
                delta={companyDeltas.operationalEfficiency}
              />
              <MetricTile
                label="Satisfaction"
                value={company.customerSatisfaction}
                format={percent0}
                delta={companyDeltas.customerSatisfaction}
              />
              <MetricTile
                label="Availability"
                value={company.systemAvailability}
                format={percent2}
              />
            </div>
          </GlassPanel>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
