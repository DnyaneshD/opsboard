import { describe, expect, it } from 'vitest';
import { createMockDataProvider } from './mockProvider';

describe('createMockDataProvider', () => {
  it('lists all entities', async () => {
    const provider = createMockDataProvider();
    const entities = await provider.getEntities();
    expect(entities.length).toBeGreaterThan(0);
  });

  it('filters metrics by entity id', async () => {
    const provider = createMockDataProvider();
    const metrics = await provider.getMetrics('entity-1');
    expect(metrics.every((metric) => metric.entityId === 'entity-1')).toBe(true);
  });

  it('filters alerts by severity', async () => {
    const provider = createMockDataProvider();
    const alerts = await provider.getAlerts({ severity: 'critical' });
    expect(alerts.every((alert) => alert.severity === 'critical')).toBe(true);
  });

  it('acknowledges an alert and persists the change', async () => {
    const provider = createMockDataProvider();
    const [firstAlert] = await provider.getAlerts();
    if (!firstAlert) throw new Error('expected at least one seeded alert');

    const acknowledged = await provider.acknowledgeAlert(firstAlert.id);
    expect(acknowledged.acknowledged).toBe(true);

    const refetched = await provider.getAlerts();
    expect(refetched.find((alert) => alert.id === firstAlert.id)?.acknowledged).toBe(true);
  });

  it('rejects acknowledging an unknown alert', async () => {
    const provider = createMockDataProvider();
    await expect(provider.acknowledgeAlert('does-not-exist')).rejects.toThrow();
  });

  it('does not mutate previously-fetched alert objects in place', async () => {
    // Consumers (React Query's structural sharing, useMemo dependency
    // arrays) key change detection on referential identity. Mutating a
    // returned alert object in place would leave stale references
    // "silently" up to date, masking the fact that nothing new was fetched.
    const provider = createMockDataProvider();
    const before = await provider.getAlerts();
    const target = before[0];
    if (!target) throw new Error('expected at least one seeded alert');

    await provider.acknowledgeAlert(target.id);

    expect(target.acknowledged).toBe(false);
    const after = await provider.getAlerts();
    expect(after.find((alert) => alert.id === target.id)?.acknowledged).toBe(true);
  });
});
