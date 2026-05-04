import { UnauthorizedException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthService } from '../../../src/modules/auth-tenant-core/application/services/auth.service';

describe('AuthService', () => {
  it('returns token for valid credentials', async () => {
    const user = {
      id: 'u1',
      email: 'admin@metro.city',
      role: Role.ORG_ADMIN,
      organizationId: 'org1',
      passwordHash: 'hash12345',
      isActive: true,
    };

    const service = new AuthService({
      user: { findFirst: jest.fn().mockResolvedValue(user) },
    } as any);

    const result = await service.login({ email: user.email, passwordHash: 'hash12345' });
    expect(result.user.email).toBe(user.email);
    expect(result.accessToken).toBeDefined();
  });

  it('throws for invalid credentials', async () => {
    const service = new AuthService({
      user: { findFirst: jest.fn().mockResolvedValue(null) },
    } as any);

    await expect(service.login({ email: 'x@y.com', passwordHash: 'badpass123' })).rejects.toThrow(UnauthorizedException);
  });
});
