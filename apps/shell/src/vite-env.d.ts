/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DASHBOARD_MFE_URL: string;
  readonly VITE_ALERTS_MFE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  $RefreshReg$?: (type: unknown, id: string) => void;
  $RefreshSig$?: () => (type: unknown) => unknown;
  __vite_plugin_react_preamble_installed__?: boolean;
}
