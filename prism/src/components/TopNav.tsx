import { motion } from 'framer-motion'
import { Crosshair } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useCeoModeStore } from '@/store/ceoModeStore'
import { useLiveSyncLabel } from '@/hooks/useLiveSyncLabel'
import { PrismMark } from '@/ui/PrismMark'
import { LiveBadge } from '@/ui/Badge'
import { Button } from '@/ui/Button'
import { cn } from '@/utils/cn'
import type { NavSection } from '@/types'

const NAV_ITEMS: Array<{ id: NavSection; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'departments', label: 'Departments' },
  { id: 'simulation', label: 'Simulation' },
  { id: 'insights', label: 'Insights' },
]

/**
 * The single top-level chrome element that's always on screen. Section
 * selection here is a store write like any other — later phases (the
 * camera rig, CEO Mode) react to `activeSection` the same way they
 * react to an AI command, so switching tabs and asking the AI to "show
 * me X" end up driving the exact same code path.
 */
export function TopNav() {
  const activeSection = useUIStore((s) => s.activeSection)
  const setActiveSection = useUIStore((s) => s.setActiveSection)
  const ceoModeActive = useCeoModeStore((s) => s.active)
  const toggleCeoMode = useCeoModeStore((s) => s.toggle)
  const syncLabel = useLiveSyncLabel()

  return (
    <header className="pointer-events-auto flex items-center justify-between border-b border-glass-border bg-void/60 px-6 py-4 backdrop-blur-xl">
      <div className="flex items-center gap-2.5">
        <PrismMark className="h-5 w-5 text-ink-100" />
        <span className="text-sm font-semibold tracking-[0.3em] text-ink-100 uppercase">
          Prism
        </span>
      </div>

      <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSection(item.id)}
              className={cn(
                'relative px-4 py-2 text-xs font-medium tracking-[0.1em] uppercase transition-colors duration-200',
                isActive ? 'text-ink-100' : 'text-ink-50 hover:text-ink-70',
              )}
            >
              {item.label}
              {isActive && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3 -bottom-[1px] h-px bg-cyan"
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              )}
            </button>
          )
        })}
      </nav>

      <div className="flex items-center gap-5">
        <span className="font-mono text-[11px] text-ink-30">
          Last sync <span className="text-ink-50">{syncLabel}</span>
        </span>
        <LiveBadge />
        <Button
          variant={ceoModeActive ? 'primary' : 'outline'}
          size="sm"
          onClick={toggleCeoMode}
          className="flex items-center gap-1.5"
        >
          <Crosshair className="h-3.5 w-3.5" />
          CEO Mode
        </Button>
      </div>
    </header>
  )
}
