import { TwinSnapshotsService } from '../../../src/modules/digital-twin/application/services/twin-snapshots.service';

describe('TwinSnapshotsService', () => {
  it('creates and lists snapshots', async () => {
    const create = jest.fn().mockResolvedValue({ id: 's1' });
    const findMany = jest.fn().mockResolvedValue([{ id: 's1' }]);

    const service = new TwinSnapshotsService({
      twinSnapshot: { create, findMany },
    } as any);

    await service.create({ version: 'v1', stateData: { traffic: 'normal' } });
    const snapshots = await service.listRecent(5);

    expect(create).toHaveBeenCalledTimes(1);
    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ take: 5 }));
    expect(snapshots).toHaveLength(1);
  });
});
