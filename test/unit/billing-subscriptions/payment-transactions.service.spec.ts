import { PaymentStatus } from '@prisma/client';
import { PaymentTransactionsService } from '../../../src/modules/billing-subscriptions/application/services/payment-transactions.service';

describe('PaymentTransactionsService', () => {
  it('creates payment transaction and lists recent records', async () => {
    const create = jest.fn().mockResolvedValue({ id: 'p1', status: PaymentStatus.PENDING });
    const findMany = jest.fn().mockResolvedValue([{ id: 'p1' }]);

    const service = new PaymentTransactionsService({
      paymentTransaction: { create, findMany },
    } as any);

    await service.create({ amount: 99.5, currency: 'USD' });
    const rows = await service.listRecent(10);

    expect(create).toHaveBeenCalledTimes(1);
    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ take: 10 }));
    expect(rows).toHaveLength(1);
  });
});
