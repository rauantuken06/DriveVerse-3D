# PRISM — Corporate Intelligence, Reimagined

An AI-powered 3D digital twin of a company. Instead of a dozen disconnected
CRM/ERP/Finance/HR/IT dashboards, PRISM renders the organization as a single
living 3D system — departments as nodes, dependencies as living connections,
risk as something you can literally watch propagate.

> Don't give executives more dashboards. Show them how the company actually
> works.

Built for a hackathon demo: cinematic landing → live company overview → CEO
Mode → AI command center that drives the 3D scene directly → business
simulation → recommended action.

## Stack

- React 19 + TypeScript + Vite
- React Three Fiber + Drei + Three.js (3D scene)
- Tailwind CSS v4 (UI)
- Framer Motion + GSAP (animation/camera easing)
- Zustand (shared scene/UI state)
- Lucide React (icons)

## Structure

```
src/
  components/   top-level screens & panels (Landing, AppShell, CEO Mode, Simulation, AI bar)
  three/        the R3F scene (PrismCore, DepartmentNode, connections, camera rig, effects)
  ui/           small presentational primitives (GlassPanel, MetricTile, AnimatedNumber, ...)
  data/         mock enterprise data + AI response scripts
  hooks/        camera control, interaction, animation hooks
  store/        Zustand stores — the single source of truth scene + UI both read/write
  types/        shared TypeScript domain types
  utils/        formatting, easing, math helpers
```

Each `src/*` folder has its own `README.md` explaining its role and when it
gets populated — see the phase plan below.

## Development

```bash
npm install
npm run dev
```

## Build order (see project phase plan)

1. Project setup ✅
2. Base premium UI shell
3. Three.js corporate world
4. Departments + hover/click interaction
5. Camera navigation system
6. Metrics dashboard
7. CEO Mode
8. AI command interface
9. AI-driven scene transitions
10. Business simulation
11. Risk propagation visualization
12. Landing cinematic sequence
13. Final polish & performance pass
