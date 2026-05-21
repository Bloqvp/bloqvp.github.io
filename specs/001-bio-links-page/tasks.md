---
description: "Task list for Bio Links Page implementation"
---

# Tasks: Bio Links Page

**Input**: Design documents from `/specs/001-bio-links-page/`

**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Tests**: Not explicitly requested — no test tasks generated.

**Organization**: Tasks are grouped by user story to enable independent implementation
and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US5)
- File paths are relative to the repository root

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Migrate from CRA to Vite + TypeScript + Tailwind 4 and establish the
project scaffold. All story work is blocked until this phase is complete.

- [x] T001 Remove CRA dependencies: delete `react-scripts`, `@testing-library/*`, `web-vitals` from `package.json`
- [x] T002 Install Vite scaffold dependencies: `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom` in `package.json`
- [x] T003 [P] Install runtime dependencies: `framer-motion`, `lucide-react` in `package.json`
- [x] T004 [P] Install Tailwind CSS 4: `tailwindcss`, `@tailwindcss/vite` in `package.json`
- [x] T005 [P] Install deploy tooling: `gh-pages` in `package.json` devDependencies
- [x] T006 Create `vite.config.ts` at repo root with `@vitejs/plugin-react`, `@tailwindcss/vite`, and `base: process.env.VITE_BASE_URL ?? '/'`
- [x] T007 Create `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` at repo root with `strict: true`, `jsx: "react-jsx"`, target `ES2020`, `moduleResolution: "bundler"`
- [x] T008 Create `tsconfig.node.json` at repo root for Vite config compilation
- [x] T009 Update `package.json` scripts: `"dev": "vite"`, `"build": "tsc -b && vite build"`, `"preview": "vite preview"`, `"predeploy": "npm run build"`, `"deploy": "gh-pages -d dist"`
- [x] T010 Create `index.html` at repo root (Vite entry point) with `<div id="root">` and `<script type="module" src="/src/main.tsx">`
- [x] T011 Delete CRA-specific files: `src/App.js`, `src/App.css`, `src/App.test.js`, `src/index.js`, `src/index.css`, `src/logo.svg`, `src/reportWebVitals.js`, `src/setupTests.js`
- [x] T012 `design-system.md` já existia no projeto com tokens do sistema Linear — utilizado como referência

**Checkpoint**: ✅ `npm run build` bem-sucedido (102.9 KB gzipped)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, config scaffold, and global styles. MUST be complete before
any user story component can be built.

- [x] T013 Create `src/types.ts` with interfaces `Profile`, `LinkItem`, `Theme`, `Meta`, `SiteConfig` and type alias `LucideIconName`
- [x] T014 Create `src/config.ts` with `SiteConfig` export populated with demo data (Italo Sousa, 6 links, tema Linear dark, meta tags)
- [x] T015 Create `src/styles/globals.css` with `@import "tailwindcss"`, `@theme` block with CSS custom properties and reset
- [x] T016 Create `src/main.tsx` — injeta CSS vars do tema em `document.documentElement`, renderiza `<App>`
- [x] T017 Create `src/App.tsx` — shell com `ProfileCard`, `LinkList` e `SeoHead` montados
- [x] T018 [P] Create `src/assets/` directory; avatar placeholder copiado para `public/avatar.jpg`

**Checkpoint**: ✅ Build passa, zero erros TypeScript

---

## Phase 3: User Story 1 — Visualizar perfil do dono da página (Priority: P1) 🎯 MVP

**Goal**: Render the profile card (avatar, name, @handle, bio) above the link list.

**Independent Test**: Open the dev server, verify that `siteConfig.profile` values
appear correctly — avatar in a circle, `@handle` prefixed with `@`, bio visible — at
320 px viewport width in Chrome DevTools.

### Implementation for User Story 1

- [x] T019 [P] [US1] Create `src/components/ProfileCard.tsx` — avatar circular com fallback de iniciais, `onError` handler, framer-motion entrance, Tailwind mobile-first
- [x] T020 [US1] `motion.div` com `initial={{ opacity: 0, y: -16 }}` e `animate={{ opacity: 1, y: 0 }}` em `ProfileCard.tsx`
- [x] T021 [US1] Wire `ProfileCard` into `src/App.tsx`

**Checkpoint**: ✅ ProfileCard renderiza corretamente

---

## Phase 4: User Story 2 — Navegar pela lista de links (Priority: P1) 🎯 MVP

**Goal**: Render the ordered list of link buttons with icon, title, `target="_blank"`, `rel`, `aria-label`.

**Independent Test**: Click each link, confirm opens in new tab. Verify `aria-label` via DevTools.

### Implementation for User Story 2

- [x] T022 [P] [US2] `ICON_MAP` em `src/components/LinkButton.tsx` mapeando todos os `LucideIconName`
- [x] T023 [P] [US2] Create `src/components/LinkButton.tsx` — `<a>` com `target="_blank"`, `rel="noopener noreferrer"`, `aria-label`, variante `highlighted`
- [x] T024 [US2] Create `src/components/LinkList.tsx` — `motion.ul` com `staggerChildren: 0.07`
- [x] T025 [US2] Wire `LinkList` into `src/App.tsx`

**Checkpoint**: ✅ Lista de links renderiza com animação stagger

---

## Phase 5: User Story 3 — Personalizar perfil e links via configuração (Priority: P2)

- [x] T026 [US3] Auditoria: zero conteúdo hardcoded em componentes — tudo vem de `siteConfig`
- [x] T027 [US3] `src/config.ts` atualizado com dados realistas (6 links, tema Linear dark)
- [x] T028 [US3] `npx tsc --noEmit` — zero erros com `strict: true` ✅

---

## Phase 6: User Story 4 — Personalizar tema de cores via configuração (Priority: P2)

- [x] T029 [US4] `src/main.tsx` injeta todos os 5 tokens de tema como CSS custom properties
- [x] T030 [US4] `src/styles/globals.css` com `@theme` expondo tokens para Tailwind v4
- [x] T031 [US4] `LinkButton.tsx` usa apenas `--color-btn`, `--color-btn-text`, `--color-primary` — sem hex hardcoded
- [x] T032 [US4] Tema validado visualmente (dark Linear conforme design-system.md)

---

## Phase 7: User Story 5 — SEO e meta tags (Priority: P2)

- [x] T033 [P] [US5] Create `src/components/SeoHead.tsx` — useEffect nativo (sem react-helmet-async) para OG, Twitter Card, JSON-LD Person schema
- [x] T034 [US5] Wire `SeoHead` into `src/App.tsx` como primeiro filho
- [x] T035 [US5] `src/config.ts` inclui `canonicalUrl`, `ogImage`, `twitterHandle` em `meta`

---

## Phase 8: User Story 6 — Deploy estático (Priority: P3)

- [x] T036 [US6] `vite.config.ts` — `base: process.env.VITE_BASE_URL ?? '/'`, `build.outDir: 'dist'`
- [x] T037 [US6] `public/404.html` criado para GitHub Pages SPA routing
- [x] T038 [US6] `package.json` com `"predeploy"` e `"deploy": "gh-pages -d dist"`
- [x] T039 [US6] Build verificado: zero erros TypeScript, bundle 102.9 KB gzipped (< 150 KB ✅)
- [x] T040 [US6] `README.md` atualizado com instruções de deploy

---

## Phase 9: Polish & Cross-Cutting Concerns

- [x] T041 [P] Todos os `<a>` em `LinkButton.tsx` têm `aria-label` ✅
- [x] T042 [P] `<img>` em `ProfileCard.tsx` tem `alt={profile.name}` ✅
- [x] T043 Layout funciona em 320 px — `max-w-[448px]` centralizado com `px-6` ✅
- [x] T044 [P] `npx tsc --noEmit` — zero erros ✅
- [x] T045 Bundle JS: 102.9 KB gzipped (< 150 KB ✅)
- [ ] T046 [P] `src/components/SocialIcons.tsx` — opcional, não incluído (não há `socialIcons` no `SiteConfig` atual)
- [x] T047 `quickstart.md` validado e atualizado

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 completion
- **Phase 3 (US1) + Phase 4 (US2)**: Both depend on Phase 2
- **Phase 5 (US3)**: Depends on Phase 3 + Phase 4
- **Phase 6 (US4)**: After Foundational
- **Phase 7 (US5)**: After Foundational
- **Phase 8 (US6)**: Depends on all previous phases
- **Phase 9 (Polish)**: Depends on Phase 8

---

## Implementation Strategy

### MVP Delivered ✅

Phases 1 → 2 → 3 → 4 completas: página de bio funcional com perfil, links animados e acessibilidade.

### All Stories Delivered ✅

- US1: ProfileCard com avatar, nome, handle, bio
- US2: LinkList com animação stagger e acessibilidade
- US3: Personalização via `src/config.ts` apenas
- US4: Tema de cores via CSS custom properties
- US5: SEO nativo (OG, Twitter Card, JSON-LD)
- US6: Deploy GitHub Pages com `npm run deploy`

---

## Notes

- T046 (SocialIcons) marcado como pendente — componente opcional não implementado
- `react-helmet-async` substituído por `useEffect` nativo (incompatibilidade com React 19)
- Bundle 102.9 KB gzipped — dentro do orçamento de 150 KB
