import { SimulationRunsService } from '../../../src/modules/digital-twin/application/services/simulation-runs.service';

describe('SimulationRunsService', () => {
  it('creates and lists simulation runs by snapshot', async () => {
    const create = jest.fn().mockResolvedValue({ id: 'r1' });
    const findMany = jest.fn().mockResolvedValue([{ id: 'r1' }]);

    const service = new SimulationRunsService({
      simulationRun: { create, findMany },
    } as any);

    await service.create({
      snapshotId: 'snap-1',
      scenarioName: 'HURRICANE_EVAC_TEST',
      parameters: { wind: 120 },
      results: { evacTime: 240 },
    });

    const runs = await service.listBySnapshot('snap-1', 10);
    expect(create).toHaveBeenCalledTimes(1);
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { snapshotId: 'snap-1' }, take: 10 }),
    );
    expect(runs).toHaveLength(1);
  });
});
