# Implementation Plan: Bio Links Page

**Branch**: `001-bio-links-page` | **Date**: 2026-05-21 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-bio-links-page/spec.md`

## Summary

Build a static bio links page (Linktree alternative) as a React 19 + TypeScript + Vite
single-page application. All content and theme customization is driven exclusively by
`src/config.ts`. The page displays a profile card (avatar, name, handle, bio) followed
by a list of link buttons with icons. It is deployed as a static build to GitHub Pages
(primary target), Vercel, or Netlify without any server configuration.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode), React 19

**Primary Dependencies**:
- Vite (bundler + dev server, replaces CRA)
- Tailwind CSS 4 (utility-first styling)
- lucide-react (icon library)
- framer-motion (entrance animations — see Complexity Tracking)

**Storage**: N/A — entirely static; no persistence layer

**Testing**: Vitest + @testing-library/react (Vite-native test runner)

**Target Platform**: Static CDN (GitHub Pages primary); any modern browser (last 2
versions of Chrome, Firefox, Safari, Edge); no IE support

**Project Type**: Static web application (SPA, no routing)

**Performance Goals**:
- Page load < 2 s on 3G (~1.5 Mbps)
- JS bundle < 150 KB gzipped
- LCP < 2.5 s (Core Web Vitals Good threshold)

**Constraints**:
- Functional at 320 px viewport width
- Zero runtime environment variables
- `tsc --noEmit` passes with zero errors (`strict: true`)
- `design-system.md` MUST exist before implementing styles (see Phase 1 prerequisite)

**Scale/Scope**: Single-page, single-developer project; ~8–12 source files total

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|-----------|-------|--------|
| I. Strict TypeScript | `strict: true` in tsconfig; no `any`; all props typed in `types.ts` | ✅ PASS |
| II. Single-Source Config | `src/config.ts` is sole edit point; config→types→components chain enforced | ✅ PASS |
| III. Mobile-First Design | Tailwind mobile-first breakpoints; 320 px baseline; WCAG AA contrast; aria-labels on all links | ✅ PASS |
| IV. SEO | JSON-LD `Person`, Open Graph, Twitter Card rendered from `src/config.ts` in `<head>` | ✅ PASS |
| V. Static-First Deploy | Vite build produces pure static output; `base` configured for GitHub Pages subdir | ✅ PASS |

**Complexity Tracking note**: framer-motion is an additional runtime dependency beyond
the constitution's "minimal deps" rule. See Complexity Tracking below.

**Post-design re-check**: Performed after Phase 1. No new violations introduced.

## Project Structure

### Documentation (this feature)

```text
specs/001-bio-links-page/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── config-contract.md  # Phase 1 output — SiteConfig interface contract
└── tasks.md             # Phase 2 output (/speckit-tasks command)
```

### Source Code (repository root)

```text
src/
├── config.ts            # ONLY file the user edits
├── types.ts             # Named TypeScript interfaces
├── App.tsx              # Root component — assembles the page from config
├── main.tsx             # Entry point — injects CSS vars from theme, renders <App>
├── assets/
│   └── avatar.jpg       # Default profile photo placeholder
├── components/
│   ├── ProfileCard.tsx  # Avatar + name + handle + bio
│   ├── LinkButton.tsx   # Single link item (icon + title)
│   ├── LinkList.tsx     # Ordered list of LinkButton items
│   └── SocialIcons.tsx  # Row of social network icon links (flat, icon-only)
└── styles/
    └── globals.css      # CSS custom properties from theme + Tailwind base import

public/
└── index.html           # Meta tags (OG, Twitter Card), JSON-LD schema injected here

vite.config.ts           # base path for GitHub Pages, build config
tsconfig.json            # strict: true
tailwind.config.ts       # Tailwind v4 config
design-system.md         # ⚠ MUST be created before styles are implemented
```

**Structure Decision**: Single-project React SPA with flat component tree. No routing,
no backend, no monorepo. All source under `src/`; Vite outputs to `dist/`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| framer-motion (extra dep beyond constitution Principle II) | Entrance animations (staggered link buttons, profile fade-in) are a key UX quality signal for a portfolio/bio page | CSS-only keyframe animations cannot achieve the staggered per-item timing without JS; the user explicitly requested Framer Motion in the plan args |
