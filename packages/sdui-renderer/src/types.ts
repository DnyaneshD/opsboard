import type { ComponentType } from 'react';
import type { BadgeTone, Trend } from '@opsboard/design-system';

export interface SduiTableColumn {
  key: string;
  header: string;
  field: string;
  align?: 'left' | 'right' | 'center';
}

export type SduiAction =
  | { type: 'acknowledgeAlert'; alertId: string }
  | { type: 'navigate'; href: string };

export type SduiNode =
  | { type: 'stack'; direction?: 'row' | 'column'; gap?: number; children: SduiNode[] }
  | { type: 'card'; title?: string; children: SduiNode[] }
  | { type: 'text'; value: string; variant?: 'body' | 'muted' | 'heading' }
  | { type: 'metric'; label: string; value: number; unit?: string; trend?: Trend }
  | { type: 'badge'; label: string; tone?: BadgeTone }
  | { type: 'table'; columns: SduiTableColumn[]; rows: Record<string, unknown>[] }
  | { type: 'button'; label: string; variant?: 'primary' | 'secondary' | 'danger'; action?: SduiAction };

export type SduiActionHandler = (action: SduiAction) => void;

export interface SduiNodeProps<T extends SduiNode = SduiNode> {
  node: T;
  onAction: SduiActionHandler;
}

export type SduiComponentRegistry = {
  [K in SduiNode['type']]: ComponentType<SduiNodeProps<Extract<SduiNode, { type: K }>>>;
};
