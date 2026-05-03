import { Role } from '@prisma/client';
import { TenantBootstrapService } from '../../../src/modules/auth-tenant-core/application/services/tenant-bootstrap.service';

describe('TenantBootstrapService', () => {
  it('creates organization/admin and emits bootstrap event', async () => {
    const organization = { id: 'org1', name: 'Metro', domain: 'metro.city' };
    const admin = { id: 'user1', email: 'admin@metro.city' };

    const prismaMock = {
      $transaction: async (fn: (tx: any) => Promise<unknown>) =>
        fn({
          organization: { create: async () => organization },
          user: {
            create: async ({ data }: { data: { role: Role } }) => {
              expect(data.role).toBe(Role.ORG_ADMIN);
              return admin;
            },
          },
        }),
    } as any;

    const publish = jest.fn().mockResolvedValue(undefined);
    const kafkaMock = { publish } as any;

    const service = new TenantBootstrapService(prismaMock, kafkaMock);

    const result = await service.bootstrap({
      organizationName: 'Metro',
      organizationDomain: 'metro.city',
      region: 'US-East',
      adminEmail: 'admin@metro.city',
      adminPasswordHash: 'hashed_password_123',
      adminFirstName: 'Ada',
      adminLastName: 'Lovelace',
    });

    expect(result).toEqual({ organizationId: 'org1', adminUserId: 'user1' });
    expect(publish).toHaveBeenCalledWith(
      'cityos.organization.bootstrapped',
      expect.objectContaining({
        eventName: 'OrganizationBootstrapped',
        organizationId: 'org1',
      }),
    );
  });
});
