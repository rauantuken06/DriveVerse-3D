import { ArrowRight } from 'lucide-react'
import { GlassPanel } from '@/ui/GlassPanel'
import { MetricTile } from '@/ui/MetricTile'
import { StatusBadge } from '@/ui/Badge'
import { AnimatedNumber } from '@/ui/AnimatedNumber'
import { useUIStore } from '@/store/uiStore'
import { intelligence } from '@/data/company'
import { formatCurrency } from '@/utils/format'

/**
 * The floating right-side "PRISM INTELLIGENCE" dock (spec section 12).
 * Reads from `data/company` for now — once Phase 7/9/11 introduce live
 * risk state in the store, `activeRisks`/`criticalRisks`/`insight`
 * here move from static data to derived store selectors, but the
 * layout doesn't change.
 */
export function IntelligencePanel() {
  const setActiveSection = useUIStore((s) => s.setActiveSection)

  return (
    <GlassPanel variant="raised" className="flex w-[320px] flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-[0.2em] text-ink-50 uppercase">
          Prism Intelligence
        </span>
        <StatusBadge status={intelligence.status}>
          {intelligence.status === 'stable' ? 'Stable' : intelligence.status}
        </StatusBadge>
      </div>

      <div className="flex items-end justify-between border-b border-glass-border pb-5">
        <div>
          <span className="text-[11px] font-medium tracking-[0.15em] text-ink-50 uppercase">
            Company Health
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <AnimatedNumber
              value={intelligence.healthScore}
              format={(v) => v.toFixed(0)}
              className="font-mono text-3xl font-semibold text-ink-100"
            />
            <span className="font-mono text-sm text-ink-30">/100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        <MetricTile
          label="Revenue"
          value={intelligence.periodRevenue}
          format={formatCurrency}
          delta={intelligence.periodRevenueDelta}
        />
        <MetricTile
          label="Forecast"
          value={intelligence.forecast}
          format={formatCurrency}
        />
        <MetricTile
          label="Active Risks"
          value={intelligence.activeRisks}
          higherIsBetter={false}
        />
        <MetricTile
          label="Critical"
          value={intelligence.criticalRisks}
          higherIsBetter={false}
        />
      </div>

      <div className="rounded-xl border border-glass-border bg-white/[0.03] p-4">
        <span className="text-[11px] font-semibold tracking-[0.15em] text-ink-50 uppercase">
          Live Insights
        </span>
        <p className="mt-2 text-sm font-medium text-ink-100">
          {intelligence.insight.title}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-ink-50">
          {intelligence.insight.detail}
        </p>
        <button
          type="button"
          onClick={() => setActiveSection('insights')}
          className="mt-3 flex items-center gap-1.5 text-xs font-medium text-cyan transition-colors hover:text-ink-100"
        >
          View analysis
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </GlassPanel>
  )
}
