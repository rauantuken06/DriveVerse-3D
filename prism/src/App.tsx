// PRISM — entry component.
// This is intentionally a thin placeholder for Phase 1 (project setup).
// It exists only to confirm Tailwind, fonts and the dark theme tokens
// are wired correctly. It will be replaced in Phase 2/12 by the real
// Landing -> App shell flow (see src/store for the screen/camera state
// that will drive that transition).

function App() {
  return (
    <main className="flex h-full min-h-screen w-full items-center justify-center bg-void">
      <div className="glass-panel rounded-2xl px-10 py-8 text-center">
        <p className="font-mono text-xs tracking-[0.3em] text-cyan uppercase">
          Phase 1 · Project Setup
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink-100">
          PRISM
        </h1>
        <p className="mt-2 max-w-sm text-sm text-ink-50">
          Corporate Intelligence, Reimagined. Tooling is wired — ready for
          Phase 2.
        </p>
      </div>
    </main>
  )
}

export default App
