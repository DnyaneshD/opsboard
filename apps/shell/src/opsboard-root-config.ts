import { registerApplication, start } from 'single-spa';
import { pathPrefix } from './router';

// These specifiers are resolved at runtime by the browser's native import
// map (see index.html), not by Vite. Keeping them in variables (rather than
// inline string literals) stops Vite's dev-time import analysis and the
// production Rollup build from trying to resolve them themselves.
const dashboardMfeSpecifier = '@opsboard/dashboard-mfe';
const alertsMfeSpecifier = '@opsboard/alerts-mfe';

/**
 * In dev, each MFE is served by its own Vite dev server and imported
 * cross-origin (never through that MFE's own index.html), so the
 * `@vitejs/plugin-react` Fast Refresh preamble it would normally inject
 * into an HTML page never runs. Without it, the first React component to
 * render throws "can't detect preamble". Installing the preamble by hand,
 * once per MFE origin, before importing the MFE, is the standard fix.
 * See https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports
 */
async function installReactRefreshPreamble(specifierUrl: string) {
  if (!import.meta.env.DEV) return;
  const origin = new URL(specifierUrl, location.href).origin;
  if (origin === location.origin) return;

  const refreshRuntime = await import(/* @vite-ignore */ `${origin}/@react-refresh`);
  refreshRuntime.injectIntoGlobalHook(window);
  window.$RefreshReg$ = () => {};
  window.$RefreshSig$ = () => (type: unknown) => type;
  window.__vite_plugin_react_preamble_installed__ = true;
}

async function loadMfe(specifier: string, devUrl: string) {
  await installReactRefreshPreamble(devUrl);
  return import(/* @vite-ignore */ specifier);
}

registerApplication({
  name: dashboardMfeSpecifier,
  app: () => loadMfe(dashboardMfeSpecifier, import.meta.env.VITE_DASHBOARD_MFE_URL),
  activeWhen: pathPrefix('/dashboard'),
});

registerApplication({
  name: alertsMfeSpecifier,
  app: () => loadMfe(alertsMfeSpecifier, import.meta.env.VITE_ALERTS_MFE_URL),
  activeWhen: pathPrefix('/alerts'),
});

if (location.pathname === '/') {
  history.replaceState(null, '', '/dashboard');
}

start();
