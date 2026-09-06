import type { AlertFilter } from './types';

export const queryKeys = {
  entities: () => ['entities'] as const,
  entity: (id: string) => ['entities', id] as const,
  metrics: (entityId?: string) => ['metrics', entityId ?? 'all'] as const,
  alerts: (filter?: AlertFilter) => ['alerts', filter ?? {}] as const,
};
