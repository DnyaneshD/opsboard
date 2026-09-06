// Microfrontends are loaded at runtime via the browser's native import map
// (see index.html), not installed as real workspace dependencies of the
// shell. These ambient declarations let TypeScript resolve the bare
// specifiers used in opsboard-root-config.ts.
declare module '@opsboard/dashboard-mfe';
declare module '@opsboard/alerts-mfe';
