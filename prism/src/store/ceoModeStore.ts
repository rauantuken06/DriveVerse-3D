import { create } from 'zustand'
import { useSceneStore } from '@/store/sceneStore'

interface CEOModeState {
  active: boolean
  enable: () => void
  disable: () => void
  toggle: () => void
}

/**
 * CEO Mode (spec section 7) — a single boolean that everything else
 * reacts to: `three/DepartmentNode` dims every department except the
 * three in `data/executiveIssues`, `three/CameraRig` flies to the
 * 'executive' framing (Phase 5), and `MetricsDashboard`/
 * `IntelligencePanel` step aside for `ExecutiveAttentionPanel`.
 *
 * Reaches into `sceneStore` on enable/disable rather than each UI
 * component doing it — one toggle, one place that defines what it
 * means, same pattern as `selectDepartment` already driving the camera.
 */
export const useCeoModeStore = create<CEOModeState>((set, get) => ({
  active: false,
  enable: () => {
    if (get().active) return
    set({ active: true })
    useSceneStore.getState().closeDepartment()
    useSceneStore.getState().setCameraState('executive')
  },
  disable: () => {
    if (!get().active) return
    set({ active: false })
    useSceneStore.getState().setCameraState('overview')
  },
  toggle: () => (get().active ? get().disable() : get().enable()),
}))
