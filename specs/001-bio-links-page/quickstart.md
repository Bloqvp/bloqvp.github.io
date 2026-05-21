# Quickstart: Bio Links Page

**Branch**: `001-bio-links-page` | **Date**: 2026-05-21

---

## Prerequisites

- Node.js 20+ (`node --version`)
- npm 10+ (`npm --version`)
- Git

---

## 1. Install dependencies

```bash
npm install
```

---

## 2. Run in development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. The page hot-reloads on every save.

---

## 3. Customize the page

Edit **only** `src/config.ts`. Change your name, handle, bio, links, theme colors,
and SEO metadata. Save the file and the browser will refresh automatically.

Refer to `specs/001-bio-links-page/contracts/config-contract.md` for the full
shape and constraints of the config object.

---

## 4. Add your avatar

Place your profile photo at `src/assets/avatar.jpg` (or update `profile.avatarUrl`
in `src/config.ts` to point to any public image URL).

---

## 5. Build for production

```bash
npm run build
```

Output is written to the `dist/` folder. No server required.

---

## 6. Preview the production build locally

```bash
npm run preview
```

Opens a local server at `http://localhost:4173` serving the `dist/` output.

---

## 7. Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `npm run build` first (`predeploy` script), then pushes `dist/` to the
`gh-pages` branch of your repository.

**First-time setup**: Go to your repo → Settings → Pages → Source: `gh-pages` branch.

**Custom domain**: Add a `CNAME` file to `public/` with your domain name before
deploying.

---

## 8. Deploy to Vercel or Netlify

Point your platform to the repository and set:
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **No environment variables required** (unless using a custom `VITE_BASE_URL`)

---

## Validation Checklist

After customization, verify:

- [ ] Page title and description show your info in the browser tab
- [ ] Profile card shows correct name, @handle, bio, and photo
- [ ] All links open in a new tab and reach the correct URL
- [ ] Page looks correct on a 320 px viewport (Chrome DevTools mobile simulation)
- [ ] `npm run build` completes with zero TypeScript errors
- [ ] `npx tsc --noEmit` reports zero errors

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Icon not showing | Check that the icon name in `links[].icon` exactly matches a `LucideIconName` in `types.ts` |
| Avatar not loading | Verify `profile.avatarUrl` is an absolute URL or a path relative to `public/` |
| GitHub Pages shows blank page | Set `VITE_BASE_URL=/your-repo-name/` before running `npm run build` |
| TypeScript error on `icon` field | Add the missing icon name to the `LucideIconName` union in `types.ts` |
