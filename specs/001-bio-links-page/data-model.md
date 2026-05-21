# Data Model: Bio Links Page

**Branch**: `001-bio-links-page` | **Date**: 2026-05-21

All entities are defined as TypeScript interfaces in `src/types.ts` and consumed
exclusively through `src/config.ts`. No persistence layer; all data is static.

---

## Entities

### `Profile`

Identity information displayed in the profile card above the link list.

```typescript
interface Profile {
  name: string;          // Full display name, e.g. "Italo Sousa"
  handle: string;        // @username without the @ sign, e.g. "italosousa"
  bio: string;           // Short bio, max 160 characters recommended
  avatarUrl: string;     // Absolute URL or relative path to avatar image
                         // e.g. "/avatar.jpg" or "https://..."
}
```

**Validation rules**:
- `name`: non-empty string
- `handle`: non-empty string, no leading `@` (the UI adds it)
- `bio`: string, recommended max 160 chars (not enforced at runtime)
- `avatarUrl`: non-empty string; falls back to a generated initials avatar if the
  image fails to load (handled in `ProfileCard.tsx`)

---

### `LinkItem`

A single entry in the link list. Renders as a full-width button with icon and title.

```typescript
interface LinkItem {
  id: string;              // Unique stable identifier (used as React key)
  title: string;           // Button label, e.g. "Meu Portfolio"
  url: string;             // Destination URL (must be absolute)
  icon: LucideIconName;    // Icon name from lucide-react, e.g. "Globe", "Github"
  ariaLabel?: string;      // Overrides the default aria-label (title + " link")
  highlighted?: boolean;   // If true, renders with primary color accent
}
```

**Validation rules**:
- `id`: unique within `links[]`; kebab-case recommended
- `url`: must be a valid absolute URL (enforced by TypeScript template literal or
  runtime assertion in dev mode)
- `icon`: must be a valid lucide-react export name (TypeScript union type enforces this)
- `ariaLabel`: defaults to `"${title} link"` if omitted

---

### `Theme`

Visual customization tokens. Applied as CSS custom properties on `<html>` in `main.tsx`.

```typescript
interface Theme {
  primaryColor: string;       // CSS color value, e.g. "#6366f1" or "hsl(239 84% 67%)"
  backgroundColor: string;    // Page background
  buttonColor: string;        // Link button background
  buttonTextColor: string;    // Link button label color
  buttonBorderRadius?: string; // Default: "0.75rem" (12px)
}
```

**CSS custom properties mapping** (set on `document.documentElement`):

| Property | CSS var |
|----------|---------|
| `primaryColor` | `--color-primary` |
| `backgroundColor` | `--color-bg` |
| `buttonColor` | `--color-btn` |
| `buttonTextColor` | `--color-btn-text` |
| `buttonBorderRadius` | `--radius-btn` |

**Validation rules**:
- All color values MUST produce WCAG AA compliant contrast ratios when combined.
  This is the developer's responsibility — no runtime enforcement.

---

### `Meta`

SEO and social sharing metadata. Used to populate `<head>` tags via `react-helmet-async`.

```typescript
interface Meta {
  title: string;         // <title> and og:title
  description: string;   // <meta name="description"> and og:description
  canonicalUrl: string;  // og:url and JSON-LD url field
  ogImage?: string;      // og:image and twitter:image — defaults to profile.avatarUrl
  twitterHandle?: string; // twitter:site, e.g. "@italosousa"
}
```

---

### `SiteConfig`

Root configuration object exported from `src/config.ts`.

```typescript
interface SiteConfig {
  profile: Profile;
  links: LinkItem[];
  theme: Theme;
  meta: Meta;
}
```

---

## Type Aliases

```typescript
// All valid lucide-react icon component names available for use in LinkItem.icon.
// Practical union of the most common icons for bio pages:
type LucideIconName =
  | 'Globe'
  | 'Github'
  | 'Linkedin'
  | 'Twitter'
  | 'Instagram'
  | 'Youtube'
  | 'Mail'
  | 'Phone'
  | 'MessageCircle'  // WhatsApp
  | 'ShoppingBag'
  | 'BookOpen'
  | 'Briefcase'
  | 'Coffee'
  | 'Link'
  | 'ExternalLink'
  | 'Rss'
  | 'Play'
  | 'Music'
  | 'Camera'
  | 'Code';
  // Extend as needed — add new names to this union in types.ts
```

---

## State Transitions

This application is stateless. No user interactions produce state changes beyond:

- **Avatar load failure** → `ProfileCard` switches `<img>` `src` to an initials-based
  fallback (handled via `onError` handler in the component, no external state).
- **CSS custom properties** → written once to `document.documentElement` in `main.tsx`
  on mount; never updated.

No `useState`, `useReducer`, `useContext`, or external state library is used.
