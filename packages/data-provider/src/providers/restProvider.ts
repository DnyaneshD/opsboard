import type { AlertFilter, DataProvider } from '../types';

export interface RestDataProviderOptions {
  baseUrl: string;
  fetch?: typeof fetch;
}

async function toJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

/**
 * DataProvider backed by a REST API. Same interface as the mock provider,
 * so consumers (MFEs, hooks) can swap implementations per environment
 * without touching any component code.
 */
export function createRestDataProvider({
  baseUrl,
  fetch: fetchImpl = fetch,
}: RestDataProviderOptions): DataProvider {
  return {
    async getEntities() {
      const response = await fetchImpl(`${baseUrl}/entities`);
      return toJson(response);
    },

    async getEntity(id: string) {
      const response = await fetchImpl(`${baseUrl}/entities/${id}`);
      if (response.status === 404) return undefined;
      return toJson(response);
    },

    async getMetrics(entityId?: string) {
      const query = entityId ? `?entityId=${encodeURIComponent(entityId)}` : '';
      const response = await fetchImpl(`${baseUrl}/metrics${query}`);
      return toJson(response);
    },

    async getAlerts(filter?: AlertFilter) {
      const params = new URLSearchParams();
      if (filter?.entityId) params.set('entityId', filter.entityId);
      if (filter?.severity) params.set('severity', filter.severity);
      const query = params.toString();
      const response = await fetchImpl(`${baseUrl}/alerts${query ? `?${query}` : ''}`);
      return toJson(response);
    },

    async acknowledgeAlert(id: string) {
      const response = await fetchImpl(`${baseUrl}/alerts/${id}/acknowledge`, { method: 'POST' });
      return toJson(response);
    },
  } satisfies DataProvider;
}
