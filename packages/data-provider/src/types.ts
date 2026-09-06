export type EntityStatus = 'healthy' | 'degraded' | 'down';

export interface Entity {
  id: string;
  name: string;
  type: string;
  status: EntityStatus;
  owner: string;
  updatedAt: string;
}

export type MetricTrend = 'up' | 'down' | 'flat';

export interface MetricPoint {
  timestamp: string;
  value: number;
}

export interface Metric {
  id: string;
  entityId: string;
  label: string;
  value: number;
  unit: string;
  trend: MetricTrend;
  history: MetricPoint[];
}

export type AlertSeverity = 'critical' | 'warning' | 'info';

export interface Alert {
  id: string;
  entityId: string;
  severity: AlertSeverity;
  message: string;
  createdAt: string;
  acknowledged: boolean;
}

export interface AlertFilter {
  entityId?: string;
  severity?: AlertSeverity;
}

/**
 * The contract every data source (mock, REST, GraphQL, ...) must satisfy.
 * MFEs and shared hooks depend only on this interface, never on a concrete
 * implementation, so the backing data source can be swapped per environment.
 */
export interface DataProvider {
  getEntities(): Promise<Entity[]>;
  getEntity(id: string): Promise<Entity | undefined>;
  getMetrics(entityId?: string): Promise<Metric[]>;
  getAlerts(filter?: AlertFilter): Promise<Alert[]>;
  acknowledgeAlert(id: string): Promise<Alert>;
}
