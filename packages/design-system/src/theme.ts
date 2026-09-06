export const theme = {
  color: {
    background: '#0b0f14',
    surface: '#141a22',
    surfaceRaised: '#1c2530',
    border: '#2a3542',
    text: '#e6edf3',
    textMuted: '#8b98a5',
    primary: '#4f9cff',
    success: '#3fb950',
    warning: '#d29922',
    danger: '#f85149',
    info: '#58a6ff',
  },
  space: (multiplier: number): string => `${multiplier * 4}px`,
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  font: {
    family: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
    size: {
      xs: '11px',
      sm: '13px',
      md: '15px',
      lg: '20px',
      xl: '28px',
    },
  },
} as const;

export type OpsBoardTheme = typeof theme;

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends OpsBoardTheme {}
}
