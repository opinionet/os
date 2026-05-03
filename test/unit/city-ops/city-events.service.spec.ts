import { EventType } from '@prisma/client';
import { CityEventsService } from '../../../src/modules/city-ops/application/services/city-events.service';

describe('CityEventsService', () => {
  it('creates and lists city events', async () => {
    const create = jest.fn().mockResolvedValue({ id: 'e1' });
    const findMany = jest.fn().mockResolvedValue([{ id: 'e1' }]);

    const service = new CityEventsService({
      cityEvent: { create, findMany },
    } as any);

    await service.create({
      type: EventType.SYSTEM,
      sourceName: 'SYSTEM_CRON',
      payload: { message: 'heartbeat' },
    });

    const events = await service.listRecent(10);

    expect(create).toHaveBeenCalledTimes(1);
    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ take: 10 }));
    expect(events).toHaveLength(1);
  });
});
