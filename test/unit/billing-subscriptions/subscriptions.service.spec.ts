import { SubscriptionTier } from '@prisma/client';
import { SubscriptionsService } from '../../../src/modules/billing-subscriptions/application/services/subscriptions.service';

describe('SubscriptionsService', () => {
  it('creates subscription and fetches active one', async () => {
    const create = jest.fn().mockResolvedValue({ id: 'sub1' });
    const findFirst = jest.fn().mockResolvedValue({ id: 'sub1', isActive: true });

    const service = new SubscriptionsService({
      subscription: { create, findFirst },
    } as any);

    await service.create({ tier: SubscriptionTier.PROFESSIONAL, stripeSubId: 'sub_123' });
    const active = await service.getActive();

    expect(create).toHaveBeenCalledTimes(1);
    expect(findFirst).toHaveBeenCalledWith(
      expect.objectContaining({ where: { isActive: true } }),
    );
    expect(active?.id).toBe('sub1');
  });
});
