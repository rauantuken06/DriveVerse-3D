import { TopNav } from '@/components/TopNav'
import { IntelligencePanel } from '@/components/IntelligencePanel'
import { AICommandBar } from '@/components/AICommandBar'
import { DepartmentView } from '@/components/DepartmentView'
import { MetricsDashboard } from '@/components/MetricsDashboard'
import { ExecutiveAttentionPanel } from '@/components/ExecutiveAttentionPanel'
import { Scene } from '@/three/Scene'

/**
 * The main application frame: nav, the 3D stage, and the floating UI
 * docked over it. `<Scene>` (Phase 3) fills the stage; the panels are
 * plain DOM absolutely positioned on top of it, in normal stacking
 * order, so they always render above the canvas without extra z-index.
 */
export function AppShell() {
  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-void">
      <TopNav />

      <main className="relative flex-1">
        <div className="absolute inset-0">
          <Scene />
        </div>

        <MetricsDashboard />
        <ExecutiveAttentionPanel />
        <DepartmentView />
        <IntelligencePanel />

        <AICommandBar />
      </main>
    </div>
  )
}
