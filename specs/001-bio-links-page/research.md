# Research: Bio Links Page

**Branch**: `001-bio-links-page` | **Date**: 2026-05-21

## Decision Log

### D-001: Bundler — Vite over Create React App

**Decision**: Replace CRA (current `package.json`) with Vite 5.

**Rationale**: CRA is unmaintained; Vite provides faster HMR, native ESM, and
first-class TypeScript support without ejecting. The existing `src/*.js` files must be
migrated to `.tsx`/`.ts`.

**Migration impact**: Remove `react-scripts`; add `vite`, `@vitejs/plugin-react`.
Rename `public/index.html` → project root `index.html`. Update `package.json` scripts.

**Alternatives considered**: Parcel (less ecosystem support), Next.js (overkill for
static single page, adds SSR complexity incompatible with Principle V).

---

### D-002: Styling — Tailwind CSS 4

**Decision**: Tailwind CSS 4 (latest) with CSS-first configuration (`@import
"tailwindcss"` in globals.css; no `tailwind.config.js` unless needed for custom tokens).

**Rationale**: Tailwind v4 uses a new CSS-native engine; config can be done entirely
in CSS via `@theme` directive, which aligns with Principle II (CSS custom properties
from `src/config.ts` theme injected via inline style on `<html>`).

**Integration pattern**:
1. `src/main.tsx` reads `siteConfig.theme` and sets CSS custom properties on
   `document.documentElement` (e.g., `--color-primary`, `--color-bg`, `--color-btn`).
2. `globals.css` maps those custom properties into Tailwind's `@theme` block so
   utilities like `bg-[var(--color-bg)]` work or via `@theme { --color-primary: ... }`.
3. Components use Tailwind utility classes only — no inline style props (except the
   one-time root injection in `main.tsx`).

**Alternatives considered**: CSS Modules (more verbose, no utility ergonomics),
vanilla CSS (maintainable but slower iteration), styled-components (runtime cost,
violates Principle V static-first).

---

### D-003: Icon Library — lucide-react

**Decision**: `lucide-react` as sole icon library. Icons are referenced by name
(`LucideIconName` string union) in `LinkItem.icon`.

**Rationale**: lucide-react supports tree-shaking; only icons actually used are
bundled. Each `LinkButton` dynamically resolves the icon via a lookup map in
`src/components/LinkButton.tsx`. The lookup map is the only file that changes if
the icon library is swapped (Principle II satisfied — `config.ts` is untouched).

**Icon name type**: Use a `LucideIconName` type alias defined in `types.ts` as
`keyof typeof import('lucide-react')` narrowed to component keys, or a practical
string literal union of the ~20 icons expected in a bio page.

**Alternatives considered**: react-icons (larger bundle, multiple sub-packages),
heroicons (smaller set, less variety for social icons), Font Awesome (CSS font, not
tree-shakeable).

---

### D-004: Animations — Framer Motion

**Decision**: `framer-motion` for entrance animations only (profile fade-in,
staggered link button entrance). No layout animations, no scroll-triggered effects
(to keep bundle impact minimal).

**Bundle impact**: framer-motion adds ~40 KB gzipped. Combined with React (~45 KB)
and lucide-react (tree-shaken, ~5–10 KB), total stays under the 150 KB budget.

**Pattern**: Use `motion.div` with `initial/animate/transition` props. Stagger applied
via `staggerChildren` on the `LinkList` parent. No `AnimatePresence` needed (no
route transitions).

**Alternatives considered**: CSS `@keyframes` with JS-driven `animation-delay`
(fragile, hard to tune); GSAP (heavier, license concerns for commercial use); React
Spring (API complexity not warranted for this use case).

---

### D-005: SEO — Meta Tags + JSON-LD Strategy

**Decision**: Inject Open Graph, Twitter Card, and JSON-LD `Person` schema directly
in `public/index.html` at build time using Vite's HTML template variables, or via
`react-helmet-async` rendered in `App.tsx`.

**Chosen approach**: `react-helmet-async` (adds ~3 KB gzipped) injected in `App.tsx`,
populated from `siteConfig.meta` and `siteConfig.profile`. This keeps all data in
`config.ts` and avoids a separate build plugin.

**JSON-LD shape**:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "<profile.name>",
  "description": "<profile.bio>",
  "url": "<meta.canonicalUrl>",
  "image": "<profile.avatarUrl>",
  "sameAs": ["<link.url for each social LinkItem>"]
}
```

**Alternatives considered**: Vite HTML plugin with template vars (requires build-time
config baking, not runtime-friendly for development preview); next/head (requires
Next.js).

---

### D-006: Deploy — GitHub Pages

**Decision**: `gh-pages` npm package for the `npm run deploy` script. Vite `base`
config reads from `VITE_BASE_URL` env var (default `/`) so it works on both root
domains and `username.github.io/repo-name/` subpaths.

**`vite.config.ts`**:
```ts
base: process.env.VITE_BASE_URL ?? '/',
```

**`package.json` deploy script**:
```
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

**Alternatives considered**: Manual `dist/` upload (error-prone), Vercel CLI (adds
vendor lock-in for what is a static file), GitHub Actions (overkill for a solo project,
but can be added later without changing the build output).

---

### D-007: Testing Strategy

**Decision**: Vitest + @testing-library/react for unit and component tests. No E2E
tests in scope for this feature.

**Rationale**: Tests are OPTIONAL per spec (not explicitly requested). Vitest is
Vite-native, fast, and requires no additional config. If added, tests focus on:
- `config.ts` shape validation (types match interfaces)
- `LinkButton` renders correct href and target
- `ProfileCard` renders correct aria attributes

---

### D-008: `design-system.md` — Must Be Created

**Decision**: `design-system.md` is referenced by Principle III as the authoritative
design reference. It does NOT exist yet in the repository.

**Blocking**: Implementing styles without it violates Principle III. Task T-DS-001
in `tasks.md` MUST be completed before any CSS/Tailwind work begins.

**Minimum required content**: color palette (primary, background, button, text),
typographic scale (font family, size steps), spacing scale, border-radius tokens,
shadow tokens.

**Owner**: Assigned to the developer before implementation starts.
