# OpsBoard - Claude Code Instructions

## Git
- Never commit or push code automatically. Always ask for explicit confirmation before running `git commit` or `git push`, no matter how small the change (including CI/config fixes).

## Stack
- pnpm workspaces + Turborepo monorepo: `apps/shell` (single-spa root config), `apps/dashboard-mfe`, `apps/alerts-mfe`, `packages/design-system`, `packages/sdui-renderer`, `packages/data-provider`.
- Package manager is pinned via `packageManager` in package.json — don't also pin a version in CI's `pnpm/action-setup` step, or it errors on the mismatch.

## Commands
- `pnpm dev` — run all dev servers (shell :8080, dashboard-mfe :8081, alerts-mfe :8082)
- `pnpm lint` / `pnpm typecheck` / `pnpm test` / `pnpm build` — run across the whole workspace via Turborepo
- `pnpm test:e2e` — Playwright e2e against the shell
