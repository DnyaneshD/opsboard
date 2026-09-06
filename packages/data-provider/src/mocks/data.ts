import type { Alert, Entity, Metric } from '../types';

export const mockEntities: Entity[] = [
  {
    id: 'entity-1',
    name: 'checkout-api',
    type: 'service',
    status: 'healthy',
    owner: 'payments-team',
    updatedAt: '2026-09-06T08:00:00.000Z',
  },
  {
    id: 'entity-2',
    name: 'orders-db',
    type: 'database',
    status: 'degraded',
    owner: 'platform-team',
    updatedAt: '2026-09-06T07:45:00.000Z',
  },
  {
    id: 'entity-3',
    name: 'notification-worker',
    type: 'worker',
    status: 'down',
    owner: 'growth-team',
    updatedAt: '2026-09-06T07:30:00.000Z',
  },
  {
    id: 'entity-4',
    name: 'search-index',
    type: 'service',
    status: 'healthy',
    owner: 'search-team',
    updatedAt: '2026-09-06T08:10:00.000Z',
  },
];

function buildHistory(base: number, volatility: number): { timestamp: string; value: number }[] {
  return Array.from({ length: 12 }, (_, i) => ({
    timestamp: new Date(Date.UTC(2026, 8, 6, 0, i * 5)).toISOString(),
    value: Math.max(0, Math.round(base + Math.sin(i / 2) * volatility)),
  }));
}

export const mockMetrics: Metric[] = [
  {
    id: 'metric-1',
    entityId: 'entity-1',
    label: 'p99 latency',
    value: 240,
    unit: 'ms',
    trend: 'up',
    history: buildHistory(220, 30),
  },
  {
    id: 'metric-2',
    entityId: 'entity-1',
    label: 'error rate',
    value: 0.4,
    unit: '%',
    trend: 'flat',
    history: buildHistory(0.5, 0.2),
  },
  {
    id: 'metric-3',
    entityId: 'entity-2',
    label: 'replication lag',
    value: 12.3,
    unit: 's',
    trend: 'up',
    history: buildHistory(8, 5),
  },
  {
    id: 'metric-4',
    entityId: 'entity-3',
    label: 'queue depth',
    value: 5400,
    unit: 'msgs',
    trend: 'up',
    history: buildHistory(3000, 1500),
  },
  {
    id: 'metric-5',
    entityId: 'entity-4',
    label: 'p99 latency',
    value: 85,
    unit: 'ms',
    trend: 'down',
    history: buildHistory(100, 15),
  },
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    entityId: 'entity-3',
    severity: 'critical',
    message: 'notification-worker has stopped processing the queue.',
    createdAt: '2026-09-06T07:31:00.000Z',
    acknowledged: false,
  },
  {
    id: 'alert-2',
    entityId: 'entity-2',
    severity: 'warning',
    message: 'orders-db replication lag exceeds 10s.',
    createdAt: '2026-09-06T07:46:00.000Z',
    acknowledged: false,
  },
  {
    id: 'alert-3',
    entityId: 'entity-1',
    severity: 'info',
    message: 'checkout-api p99 latency trending upward over the last hour.',
    createdAt: '2026-09-06T08:01:00.000Z',
    acknowledged: true,
  },
];
