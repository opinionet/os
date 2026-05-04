import { NotificationsService } from '../../../src/modules/notifications/application/services/notifications.service';

describe('NotificationsService', () => {
  it('creates and fetches unread notifications', async () => {
    const create = jest.fn().mockResolvedValue({ id: 'n1' });
    const findMany = jest.fn().mockResolvedValue([{ id: 'n1', isRead: false }]);

    const service = new NotificationsService({
      notification: { create, findMany, update: jest.fn() },
    } as any);

    await service.create({ userId: 'u1', title: 'Alert', message: 'Road blocked' });
    const unread = await service.getUnread('u1');

    expect(create).toHaveBeenCalledTimes(1);
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId: 'u1', isRead: false },
      }),
    );
    expect(unread).toHaveLength(1);
  });
});
