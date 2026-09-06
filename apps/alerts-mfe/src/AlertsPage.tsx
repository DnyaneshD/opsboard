import { useMemo } from 'react';
import { useAcknowledgeAlert, useAlerts } from '@opsboard/data-provider';
import type { SduiAction, SduiNode } from '@opsboard/sdui-renderer';
import { SduiRenderer } from '@opsboard/sdui-renderer';
import type { Alert } from '@opsboard/data-provider';

const severityTone: Record<Alert['severity'], 'danger' | 'warning' | 'info'> = {
  critical: 'danger',
  warning: 'warning',
  info: 'info',
};

function buildSchema(alerts: Alert[]): SduiNode {
  return {
    type: 'stack',
    gap: 4,
    children: [
      { type: 'text', value: 'Active alerts', variant: 'heading' },
      ...alerts.map(
        (alert): SduiNode => ({
          type: 'card',
          children: [
            {
              type: 'stack',
              direction: 'row',
              gap: 3,
              children: [
                { type: 'badge', label: alert.severity, tone: severityTone[alert.severity] },
                { type: 'text', value: alert.message },
              ],
            },
            alert.acknowledged
              ? { type: 'badge', label: 'acknowledged', tone: 'neutral' }
              : {
                  type: 'button',
                  label: 'Acknowledge',
                  variant: 'primary',
                  action: { type: 'acknowledgeAlert', alertId: alert.id },
                },
          ],
        }),
      ),
    ],
  };
}

export function AlertsPage() {
  const { data: alerts, isLoading } = useAlerts();
  const acknowledgeAlert = useAcknowledgeAlert();

  const schema = useMemo(() => buildSchema(alerts ?? []), [alerts]);

  function handleAction(action: SduiAction) {
    if (action.type === 'acknowledgeAlert') {
      acknowledgeAlert.mutate(action.alertId);
    }
  }

  if (isLoading) {
    return <p>Loading alerts…</p>;
  }

  return <SduiRenderer node={schema} onAction={handleAction} />;
}
