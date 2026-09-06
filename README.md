# OpsBoard

A reference architecture for data-dense internal tools: single-spa
microfrontends, a shared design system, a server-driven UI renderer, and a
pluggable data layer — wired together with pnpm workspaces and Turborepo.

## Layout

```
apps/
  shell/            single-spa root config (registers & routes MFEs)
  dashboard-mfe/     fleet overview, built with the SDUI renderer
  alerts-mfe/        alert list with acknowledge action
packages/
  design-system/    styled-components primitives + theme
  sdui-renderer/     JSON -> React renderer, backed by design-system
  data-provider/     DataProvider interface + mock/REST implementations,
                      TanStack Query hooks
```

### How the pieces fit together

- **Data layer**: every MFE talks to data only through the `DataProvider`
  interface in `@opsboard/data-provider` (`getEntities`, `getMetrics`,
  `getAlerts`, `acknowledgeAlert`). `createMockDataProvider()` is in-memory
  fixtures for local dev and tests; `createRestDataProvider({ baseUrl })`
  hits a real API. Swapping one for the other means changing a single line
  at each MFE's composition root (`root.component.tsx`) — no component
  changes.
- **Server-driven UI**: MFEs describe screens as a JSON `SduiNode` tree
  (`stack`, `card`, `text`, `metric`, `badge`, `table`, `button`) and hand it
  to `<SduiRenderer />`, which maps each node type to a design-system
  component via a registry. Actions (e.g. "acknowledge this alert") are
  plain data (`{ type: 'acknowledgeAlert', alertId }`) dispatched through an
  `onAction` callback, so the schema stays serializable.
- **Microfrontends**: `dashboard-mfe` and `alerts-mfe` are independent
  single-spa applications (`single-spa-react`), each with its own Vite dev
  server and its own standalone `index.html` for isolated development.
  `shell` is the single-spa root config: it registers both apps by URL path
  (`/dashboard`, `/alerts`) and resolves them through a native browser
  `<script type="importmap">`, so no bundler-level module federation is
  required. Dev vs. prod import map targets are controlled by
  `.env.development` / `.env.production`.

## Getting started

```bash
pnpm install
pnpm dev      # shell on :8080, dashboard-mfe on :8081, alerts-mfe on :8082
```

Open http://localhost:8080 — it redirects to `/dashboard`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Run every app's dev server via Turborepo |
| `pnpm build` | Typecheck + build every package/app |
| `pnpm lint` | ESLint across the workspace |
| `pnpm typecheck` | `tsc --noEmit` across the workspace |
| `pnpm test` | Vitest (+ React Testing Library, MSW) unit tests |
| `pnpm test:e2e` | Playwright end-to-end test against the running shell |

## Production deployment note

`shell`'s `.env.production` points the import map at `/dashboard-mfe/...`
and `/alerts-mfe/...`. That assumes each app's `dist/` is deployed under a
shared static origin at those subpaths (e.g. `dist/`, `dashboard-mfe/dist/`
copied to `dashboard-mfe/`, `alerts-mfe/dist/` copied to `alerts-mfe/`) —
adjust the env values to match your actual CDN/hosting layout.
