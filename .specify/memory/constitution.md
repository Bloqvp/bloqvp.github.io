<!--
SYNC IMPACT REPORT
==================
Version change:     (none) → 1.0.0  [MAJOR — initial constitution; all principles are new]

Principles added:
  - I. Strict TypeScript & Component Discipline
  - II. Single-Source Configuration Architecture
  - III. Mobile-First Design & Accessibility
  - IV. SEO — Local & Structured Data
  - V. Static-First Deployment

Sections added:
  - Core Principles (5 principles)
  - Technology Stack
  - Development Workflow
  - Governance

Principles renamed:    N/A
Sections removed:      N/A

Templates reviewed:
  ✅ .specify/templates/plan-template.md
       — Constitution Check section already uses a dynamic gate driven by this file;
         no edits required.
  ✅ .specify/templates/spec-template.md
       — Generic placeholders; mobile-first and accessibility requirements will be
         captured in feature user stories as needed; no structural edits required.
  ✅ .specify/templates/tasks-template.md
       — Task phases are feature-driven; accessibility and SEO tasks MUST be included
         in Phase N (Polish) for any UI feature. No structural edits required.

Deferred TODOs:        None — all placeholders resolved.
-->

# Linktree Constitution

## Core Principles

### I. Strict TypeScript & Component Discipline

All TypeScript MUST be compiled with `strict: true` in `tsconfig.json`. Implicit `any`
is forbidden; every value MUST have an explicit or inferable type. Components MUST be
functional (arrow functions or `function` declarations); class components are prohibited.
Props MUST be typed with named interfaces defined in `src/types.ts` — inline object
types on component signatures are not permitted. Business logic (data transformation,
filtering, derived state) MUST NOT appear inside UI components; it belongs in
`src/config.ts` or dedicated utility functions.

**Rationale**: Strict typing eliminates an entire class of runtime bugs in a codebase
that has no backend safety net. Keeping business logic out of UI components makes the
page trivially customizable without requiring React knowledge.

### II. Single-Source Configuration Architecture

`src/config.ts` is the sole file a user MUST edit to fully customize the page (profile
data, links, theme overrides, metadata). No other source file MUST require modification
for a standard customization. The data flow MUST follow this unidirectional chain:

```
src/config.ts  →  src/types.ts  →  src/components/
  (data)            (contracts)       (UI only)
```

Runtime dependencies MUST be limited to: React, TypeScript, Vite, and one icon library.
No additional runtime packages may be added without a documented rationale and explicit
approval via the amendment process.

**Rationale**: A single entry point for customization makes the project accessible to
non-engineers. A minimal dependency surface reduces security exposure and long-term
maintenance burden for a static page.

### III. Mobile-First Design & Accessibility

Every component MUST render correctly and usably at a viewport width of 320 px. CSS MUST
be written mobile-first (base styles target small screens; `min-width` media queries
expand layout). `design-system.md` is the authoritative reference for all color tokens,
typographic scales, and spacing values — deviations require a documented exception.

Accessibility requirements (non-negotiable):
- Every `<a>` element MUST have an `aria-label` that describes the destination.
- Every `<img>` MUST have a descriptive `alt` attribute (empty string only for
  decorative images).
- All text/background color pairs MUST meet WCAG 2.1 AA contrast ratio (≥ 4.5:1 for
  normal text, ≥ 3:1 for large text).

**Rationale**: The page is a public-facing profile; a significant portion of users will
access it on low-end mobile devices. Accessibility is a legal and ethical baseline, not
an enhancement.

### IV. SEO — Local & Structured Data

The page MUST include complete Open Graph and Twitter Card meta tags derived from
`src/config.ts`. A JSON-LD `Person` schema (schema.org) MUST be rendered in `<head>`
and populated from `src/config.ts`. The `<html lang>` attribute MUST be set. The page
MUST have a unique, descriptive `<title>` and a `<meta name="description">` with
meaningful content.

**Rationale**: As a bio link page, discoverability in search engines and rich previews
on social platforms are first-class product requirements, not optional enhancements.

### V. Static-First Deployment

`vite build` output MUST be a fully self-contained static site deployable to any CDN
(GitHub Pages, Netlify, Cloudflare Pages) without server-side configuration, redirects,
or environment variables at runtime. The `vite.config.ts` MUST set `base` to support
GitHub Pages subdirectory deployments. No server-side rendering, edge functions, or
dynamic API calls are permitted.

**Rationale**: Static hosting is free, globally fast, and operationally trivial.
Eliminating server dependencies keeps the project permanently maintainable by a single
person.

## Technology Stack

- **Runtime**: React 19 (functional components, hooks)
- **Language**: TypeScript 5.x (`strict: true`)
- **Bundler**: Vite (latest stable)
- **Icons**: One icon library (e.g., `lucide-react` or `react-icons`) — decided at
  project start and documented in `src/config.ts` comments
- **Styling**: CSS Modules or plain CSS; Tailwind is acceptable if already present
- **Target browsers**: Last 2 versions of Chrome, Firefox, Safari, Edge; no IE support

No CSS-in-JS runtime libraries. No state management libraries (React built-ins suffice).

## Development Workflow

- Every PR MUST pass `tsc --noEmit` with zero errors before merge.
- `vite build` MUST succeed without warnings treated as errors before merge.
- Feature work MUST follow the Spec Kit workflow:
  `/speckit-specify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`.
- `design-system.md` MUST be consulted before introducing any new color, spacing, or
  typographic value.
- Accessibility checks (contrast, aria attributes) MUST be verified manually or via
  automated tooling (e.g., axe-core) before marking a UI task complete.

## Governance

This constitution supersedes all other development guidelines and informal conventions.
Amendments MUST be proposed as a pull request modifying this file with a documented
rationale. The version MUST be incremented according to semantic versioning rules
(MAJOR: principle removal/redefinition; MINOR: new principle or section; PATCH:
clarifications). All feature plans MUST include a Constitution Check gate (see
`plan-template.md`). Complexity that violates a principle MUST be justified in the
plan's Complexity Tracking table. Compliance review occurs at PR review time.

**Version**: 1.0.0 | **Ratified**: 2026-05-21 | **Last Amended**: 2026-05-21
