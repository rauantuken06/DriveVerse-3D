# store/

Zustand stores — the single source of truth the 3D scene, UI panels and
AI command center all read/write. Notably: which department is
hovered/selected, current camera state, CEO Mode on/off, active risk
chain, simulation inputs/results, chat history.

This is what lets "AI drives the 3D scene" work: the AI layer never
touches Three.js directly, it only writes to the store, and the scene
reacts to store changes.

Populated starting Phase 4.
