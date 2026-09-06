import { useMemo } from 'react';
import { useAcknowledgeAlert, useAlerts, useEntities, useMetrics } from '@opsboard/data-provider';
import type { SduiAction, SduiNode } from '@opsboard/sdui-renderer';
import { SduiRenderer } from '@opsboard/sdui-renderer';

function buildSchema(
  entities: ReturnType<typeof useEntities>['data'],
  metrics: ReturnType<typeof useMetrics>['data'],
  criticalAlertCount: number,
): SduiNode {
  return {
    type: 'stack',
    gap: 4,
    children: [
      { type: 'text', value: 'Fleet overview', variant: 'heading' },
      {
        type: 'stack',
        direction: 'row',
        gap: 4,
        children: [
          { type: 'metric', label: 'Entities tracked', value: entities?.length ?? 0 },
          { type: 'metric', label: 'Critical alerts', value: criticalAlertCount, trend: criticalAlertCount > 0 ? 'up' : 'flat' },
          { type: 'metric', label: 'Metrics streamed', value: metrics?.length ?? 0 },
        ],
      },
      {
        type: 'card',
        title: 'Entities',
        children: [
          {
            type: 'table',
            columns: [
              { key: 'name', header: 'Name', field: 'name' },
              { key: 'type', header: 'Type', field: 'type' },
              { key: 'status', header: 'Status', field: 'status' },
              { key: 'owner', header: 'Owner', field: 'owner' },
            ],
            rows: (entities ?? []) as unknown as Record<string, unknown>[],
          },
        ],
      },
    ],
  };
}

export function DashboardPage() {
  const { data: entities, isLoading: entitiesLoading } = useEntities();
  const { data: metrics, isLoading: metricsLoading } = useMetrics();
  const { data: alerts } = useAlerts({ severity: 'critical' });
  const acknowledgeAlert = useAcknowledgeAlert();

  const schema = useMemo(
    () => buildSchema(entities, metrics, alerts?.length ?? 0),
    [entities, metrics, alerts],
  );

  function handleAction(action: SduiAction) {
    if (action.type === 'acknowledgeAlert') {
      acknowledgeAlert.mutate(action.alertId);
    }
  }

  if (entitiesLoading || metricsLoading) {
    return <p>Loading dashboard…</p>;
  }

  return <SduiRenderer node={schema} onAction={handleAction} />;
}
