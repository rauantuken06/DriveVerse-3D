import { create } from 'zustand'
import type { CameraState, DepartmentId } from '@/types'

interface SceneState {
  hoveredId: DepartmentId | null
  selectedId: DepartmentId | null
  setHovered: (id: DepartmentId | null) => void
  selectDepartment: (id: DepartmentId) => void
  closeDepartment: () => void

  /** Drives `three/CameraRig` — see `three/cameraTargets.ts` for what
   * each state actually frames. Selecting/closing a department already
   * keeps this in sync; Phases 7/9/10/11 will write it directly for CEO
   * Mode, AI answers, simulation and risk propagation. */
  cameraState: CameraState
  focusDepartmentId: DepartmentId | null
  setCameraState: (state: CameraState, focusDepartmentId?: DepartmentId | null) => void
}

export const useSceneStore = create<SceneState>((set) => ({
  hoveredId: null,
  selectedId: null,
  setHovered: (id) => set({ hoveredId: id }),
  selectDepartment: (id) =>
    set({ selectedId: id, cameraState: 'department', focusDepartmentId: id }),
  closeDepartment: () =>
    set({ selectedId: null, cameraState: 'overview', focusDepartmentId: null }),

  cameraState: 'overview',
  focusDepartmentId: null,
  setCameraState: (state, focusDepartmentId = null) =>
    set({ cameraState: state, focusDepartmentId }),
}))
