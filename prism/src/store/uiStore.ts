import { create } from 'zustand'
import type { NavSection } from '@/types'

interface UIState {
  activeSection: NavSection
  setActiveSection: (section: NavSection) => void

  /** ms timestamp of the last simulated data sync, drives the
   * "Last sync Ns ago" indicator in TopNav. */
  lastSyncedAt: number
  touchSync: () => void
}

export const useUIStore = create<UIState>((set) => ({
  activeSection: 'overview',
  setActiveSection: (section) => set({ activeSection: section }),

  lastSyncedAt: Date.now(),
  touchSync: () => set({ lastSyncedAt: Date.now() }),
}))
