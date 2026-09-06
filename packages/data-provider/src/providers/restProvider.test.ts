import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { createRestDataProvider } from './restProvider';
import type { Entity } from '../types';

const baseUrl = 'https://api.opsboard.test';

const sampleEntity: Entity = {
  id: 'entity-1',
  name: 'checkout-api',
  type: 'service',
  status: 'healthy',
  owner: 'payments-team',
  updatedAt: '2026-09-06T08:00:00.000Z',
};

const server = setupServer(
  http.get(`${baseUrl}/entities`, () => HttpResponse.json([sampleEntity])),
  http.get(`${baseUrl}/entities/:id`, ({ params }) => {
    if (params.id !== sampleEntity.id) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(sampleEntity);
  }),
  http.post(`${baseUrl}/alerts/:id/acknowledge`, ({ params }) =>
    HttpResponse.json({
      id: params.id,
      entityId: 'entity-1',
      severity: 'info',
      message: 'ack',
      createdAt: '2026-09-06T08:00:00.000Z',
      acknowledged: true,
    }),
  ),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('createRestDataProvider', () => {
  it('fetches entities from the configured base URL', async () => {
    const provider = createRestDataProvider({ baseUrl });
    const entities = await provider.getEntities();
    expect(entities).toEqual([sampleEntity]);
  });

  it('returns undefined for a 404 entity lookup', async () => {
    const provider = createRestDataProvider({ baseUrl });
    const entity = await provider.getEntity('missing');
    expect(entity).toBeUndefined();
  });

  it('posts to acknowledge an alert', async () => {
    const provider = createRestDataProvider({ baseUrl });
    const alert = await provider.acknowledgeAlert('alert-1');
    expect(alert.acknowledged).toBe(true);
  });

  it('throws on a non-ok response', async () => {
    server.use(http.get(`${baseUrl}/entities`, () => new HttpResponse(null, { status: 500 })));
    const provider = createRestDataProvider({ baseUrl });
    await expect(provider.getEntities()).rejects.toThrow();
  });
});
