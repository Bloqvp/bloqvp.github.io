# Config Contract: `src/config.ts`

**Branch**: `001-bio-links-page` | **Date**: 2026-05-21

`src/config.ts` is the public interface between the page owner (user) and the
application. It is the only file that MUST be edited for any customization. This
document defines its exact shape and constraints.

---

## Export Contract

`src/config.ts` MUST export a single default or named constant of type `SiteConfig`:

```typescript
// src/config.ts
import type { SiteConfig } from './types';

const siteConfig: SiteConfig = {
  profile: { ... },
  links: [ ... ],
  theme: { ... },
  meta: { ... },
};

export default siteConfig;
```

No other exports are permitted from `config.ts`. No imports from React, components,
or any external library are permitted.

---

## Example Valid Config

```typescript
import type { SiteConfig } from './types';

const siteConfig: SiteConfig = {
  profile: {
    name: 'Italo Sousa',
    handle: 'italosousa',
    bio: 'Dev & criador de conteúdo. Construindo coisas na web.',
    avatarUrl: '/avatar.jpg',
  },

  links: [
    {
      id: 'portfolio',
      title: 'Meu Portfolio',
      url: 'https://italosousa.dev',
      icon: 'Globe',
      highlighted: true,
    },
    {
      id: 'github',
      title: 'GitHub',
      url: 'https://github.com/italosousa',
      icon: 'Github',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/italosousa',
      icon: 'Linkedin',
    },
    {
      id: 'whatsapp',
      title: 'Fale comigo no WhatsApp',
      url: 'https://wa.me/5511999999999',
      icon: 'MessageCircle',
      ariaLabel: 'Enviar mensagem via WhatsApp',
    },
  ],

  theme: {
    primaryColor: '#6366f1',
    backgroundColor: '#0f172a',
    buttonColor: '#1e293b',
    buttonTextColor: '#f8fafc',
    buttonBorderRadius: '0.75rem',
  },

  meta: {
    title: 'Italo Sousa — Links',
    description: 'Dev & criador de conteúdo. Todos os meus links em um só lugar.',
    canonicalUrl: 'https://italosousa.dev/links',
    ogImage: 'https://italosousa.dev/og-image.jpg',
    twitterHandle: '@italosousa',
  },
};

export default siteConfig;
```

---

## Breaking Change Policy

Any change to the `SiteConfig` interface that removes or renames a required field is
a **breaking change** and MUST:
1. Bump the constitution version (MAJOR).
2. Provide a migration note in the PR description.
3. Update this contract document and `data-model.md`.

Adding optional fields (`?:`) is a non-breaking change.

---

## Invariants (enforced by TypeScript)

- `links[].id` values MUST be unique (not enforced by TypeScript; dev responsibility).
- `links[].url` MUST be an absolute URL string (convention; runtime assertion
  recommended in dev mode).
- `links[].icon` MUST be a value from the `LucideIconName` union in `types.ts`.
- `theme.*Color` fields MUST be valid CSS color values (runtime unvalidated; dev
  responsibility to verify WCAG contrast).
