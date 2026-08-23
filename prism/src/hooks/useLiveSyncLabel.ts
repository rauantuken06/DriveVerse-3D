import { useEffect, useState } from 'react'
import { useUIStore } from '@/store/uiStore'

const RESYNC_INTERVAL_MS = 12_000

/**
 * Simulates a live backend sync cadence: resets the "last sync" timer
 * roughly every 12s (touching `uiStore.lastSyncedAt`) and returns a
 * human label that ticks once a second in between — "Just now", "7s
 * ago", etc. Purely cosmetic (this is a demo), but it's what sells the
 * "this is a live system" read of the top nav.
 */
export function useLiveSyncLabel(): string {
  const lastSyncedAt = useUIStore((s) => s.lastSyncedAt)
  const touchSync = useUIStore((s) => s.touchSync)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    const resync = setInterval(touchSync, RESYNC_INTERVAL_MS)
    return () => clearInterval(resync)
  }, [touchSync])

  const seconds = Math.max(0, Math.round((now - lastSyncedAt) / 1000))
  if (seconds < 2) return 'Just now'
  return `${seconds}s ago`
}
