import { HealthService } from '../../../src/modules/platform/application/services/health.service';

describe('HealthService', () => {
  it('returns liveness payload', () => {
    const service = new HealthService({ $queryRaw: jest.fn() } as any);
    expect(service.liveness()).toEqual({ status: 'ok', service: 'cityos' });
  });

  it('runs readiness database check', async () => {
    const queryRaw = jest.fn().mockResolvedValue([{ '?column?': 1 }]);
    const service = new HealthService({ $queryRaw: queryRaw } as any);

    const result = await service.readiness();
    expect(queryRaw).toHaveBeenCalledTimes(1);
    expect(result.status).toBe('ok');
  });
});
