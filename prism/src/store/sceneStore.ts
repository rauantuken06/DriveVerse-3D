import { create } from "zustand";
import type { DepartmentId } from "@/types";

interface SceneState {
    hoveredId: DepartmentId | null
    selectedId: DepartmentId | null
    setHovered: (id: DepartmentId | null) => void
    selectDepartment: (id: DepartmentId) => void
    closeDepartment: () => void
}

export const useSceneStore = create<SceneState>((set) => ({
    hoveredId: null,
    selectedId: null,
    setHovered: (id) => set({ hoveredId: id }),
    selectDepartment: (id) => set({ selectedId: id }),
    closeDepartment: () => set({ selectedId: null }),
}))