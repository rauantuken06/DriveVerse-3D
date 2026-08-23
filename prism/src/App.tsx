import { AppShell } from '@/components/AppShell'

// PRISM entry component. The Landing cinematic (Phase 12) will sit in
// front of this behind a screen-state switch in `store/`; for now
// AppShell renders directly so every phase after this one has the real
// shell to build against.
function App() {
  return <AppShell />
}

export default App
