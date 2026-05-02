# Beanstalk Coffee v3 — Todo

## Phase 1: Infrastructure ✅
- [x] package.json (Next.js 16, Framer Motion, Zustand)
- [x] tsconfig.json, postcss.config.mjs, next.config.ts
- [x] cup.png in /public/
- [ ] npm install
- [ ] git init + initial commit

## Phase 2: Foundation ✅
- [x] prd.md — Full feature spec
- [x] design.md — Nature-Boutique color tokens
- [x] .antigravityrules — Stack + code standards
- [x] todo.md — This file
- [ ] .stitch/DESIGN.md — Stitch prompt design system
- [ ] .stitch/SITE.md + .stitch/next-prompt.md — Baton files

## Phase 3: True 3D WebGL Engine
- [ ] `src/components/Scene3D.tsx` — Full-screen fixed R3F Canvas with lights
- [ ] `src/components/CoffeeCup3D.tsx` — Procedural cylinder cup with `framer-motion-3d` scroll mapping
- [ ] `src/components/CoffeeParticles3D.tsx` — 15 floating 3D bean geometries
- [ ] Delete `FloatingCup.tsx` and `CoffeeParticles.tsx`

## Phase 4 & 5: Transparent HTML Integration
- [ ] `src/app/globals.css` — Remove body background colors so canvas is visible
- [ ] Verify `TheVibe.tsx` glassmorphism allows canvas passthrough
- [ ] Update `page.tsx` assembly (Canvas behind `pointer-events-none` wrapper)

## Phase 6: Assembly + Stitch Loop
- [ ] `src/app/page.tsx` — Compose all components
- [ ] .stitch/ baton files
- [ ] `npm run build` — Verify clean build

## Verification
- [ ] TypeScript: `npx tsc --noEmit`
- [ ] Build: `npm run build`
- [ ] Browser: All 7 features checked
