# GitHub Copilot / AI Agent Instructions for Nairobi DevOps site

Short, focused guidance so an AI coding agent can be immediately productive in this repo.

## Quick summary
- Frontend-only site: React + TypeScript + Vite + Tailwind, served from `client/` (Vite `root` is `client`).
- SPA routing uses **Wouter** (not React Router) — update `client/src/App.tsx` for new routes.
- Content is mostly static data in `client/src/data/*` and is the canonical source for page content.

## How to run (dev & build) ✅
- Install: `npm install`
- Dev server: `npm run dev` (Vite serves `client/` on default port, e.g. 5173)
- Build: `npm run build` (output → `dist/`)
- Preview production build locally: `npm run preview`
- Lint: `npm run lint` or `npm run lint:fix`

Notes:
- Vite `server.proxy` maps `/api/luma` → `https://api.luma.com` in development (see `vite.config.ts`).
- Deployment is configured for Vercel (SPA rewrite to `index.html` in `vercel.json`).

## Key files & where to look 🔎
- App shell & routing: `client/src/App.tsx` (Wouter routes, QueryClient + Theme providers)
- Entry: `client/src/main.tsx`
- Pages: `client/src/pages/*` (add page component + register a route in `App.tsx`)
- UI primitives & components: `client/src/components/ui/*` (Radix wrappers + cva patterns)
- Reusable components/layouts: `client/src/components/` (landing sections live under `landing/`)
- Static content: `client/src/data/*` (testimonials, partners, events, etc.) — update these to change site content
- Utilities: `client/src/lib/*` (notably `queryClient.ts`, `lumaCalendar.ts`, `youtube.ts`, `utils.ts`)
- Hooks: `client/src/hooks/*` (e.g., `useLumaEvents`)
- Styling & theme: `client/src/index.css` (CSS variables) + `tailwind.config.ts`
- Build config: `vite.config.ts`, `tsconfig.json` (note `paths` aliases like `@/*`)

## Conventions & patterns (do these to match the codebase) 🔧
- Use the `@/` alias for imports to reference `client/src` (e.g. `@/components/...`).
- UI components use Tailwind + `class-variance-authority` (cva) and the `cn` helper (`client/src/lib/utils.ts`) to compose classes. See `client/src/components/ui/button.tsx` for an example.
- Theme toggling uses `ThemeContext` which toggles `document.documentElement` class (`light` / `dark`). See `client/src/contexts/ThemeContext.tsx` and `client/src/index.css` for tokens.
- Keep components small & presentational; pages assemble components and read from data files in `client/src/data`.
- Data-first approach: prefer editing data files for copy/image content (e.g., events, testimonials) rather than hard-coding into components.

## External integrations & gotchas ⚠️
- Luma calendar
  - Source: `client/src/lib/lumaCalendar.ts` (parses ICAL using `ical.js`).
  - Dev proxy: in dev the hook `useLumaEvents` fetches `/api/luma/ics/get?entity=calendar&id=...` which is proxied to the Luma API by Vite (`vite.config.ts`). In production the code uses `allorigins.win` as a CORS proxy.
  - To change the calendar used, edit `LUMA_CALENDAR_ID` in `lumaCalendar.ts`.
- YouTube helpers: `client/src/lib/youtube.ts` provides `extractYouTubeId()` and `getYouTubeThumbnail()` helpers used across video components.
- React Query usage: `client/src/lib/queryClient.ts` sets the default `queryFn` to a fetch-based function; query keys are treated as URL segments joined together, so queries should be written with that in mind.

## Typical code tasks & how to do them (examples) 💡
- Add a page: create `client/src/pages/MyPage.tsx` → export default component → add a `<Route path="/my" component={MyPage} />` to `client/src/App.tsx`.
- Add a site content item (e.g., event): update `client/src/data/eventsData.ts` and the UI will reflect it (components are data-driven).
- Add a UI primitive: follow pattern in `client/src/components/ui/` using `cva` and `cn`, export both component and variant helpers when useful.
- Fix an API fetch: prefer `client/src/lib/queryClient.ts`/`apiRequest()` when adding new network logic so error behavior and credentials usage remain consistent.

## Code style & checks
- TypeScript `strict` is enabled (`tsconfig.json`) — keep types precise.
- ESLint is configured—run `npm run lint` and fix issues locally.

## Pull request tips
- Small, focused commits are preferred.
- Update or add doc references in `client/src/data` when changing copy/content.
- For behavior changes (e.g., calendar rules), include a short explanation and, if applicable, sample ICS payloads or a screenshot of the expected UI.

---
If anything here is unclear or you'd like additional examples (e.g., a small PR template or preferred commit message format), tell me what to expand and I’ll update this file. ✨
