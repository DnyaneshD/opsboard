import type { Alert, AlertFilter, DataProvider, Entity, Metric } from '../types';
import { mockAlerts, mockEntities, mockMetrics } from '../mocks/data';

function delay<T>(value: T, ms = 150): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/**
 * In-memory DataProvider backed by fixtures. Used for local development,
 * Storybook, and tests so MFEs can run without a backend.
 */
export function createMockDataProvider(): DataProvider {
  const entities = [...mockEntities];
  const metrics = [...mockMetrics];
  let alerts = [...mockAlerts];

  return {
    async getEntities() {
      return delay([...entities]);
    },

    async getEntity(id: string) {
      return delay(entities.find((entity) => entity.id === id));
    },

    async getMetrics(entityId?: string) {
      const result = entityId ? metrics.filter((metric) => metric.entityId === entityId) : metrics;
      return delay([...result]);
    },

    async getAlerts(filter?: AlertFilter) {
      let result: Alert[] = alerts;
      if (filter?.entityId) {
        result = result.filter((alert) => alert.entityId === filter.entityId);
      }
      if (filter?.severity) {
        result = result.filter((alert) => alert.severity === filter.severity);
      }
      return delay([...result]);
    },

    async acknowledgeAlert(id: string) {
      const existing = alerts.find((item) => item.id === id);
      if (!existing) {
        throw new Error(`Alert not found: ${id}`);
      }
      // Replace with a new object (rather than mutating in place) so consumers
      // that key on referential identity (React Query's structural sharing,
      // useMemo) correctly detect the change.
      const updated: Alert = { ...existing, acknowledged: true };
      alerts = alerts.map((item) => (item.id === id ? updated : item));
      return delay({ ...updated });
    },
  } satisfies DataProvider;
}

export type { Entity, Metric, Alert };
