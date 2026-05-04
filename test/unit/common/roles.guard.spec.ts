import { Role } from '@prisma/client';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../../../src/common/guards/roles.guard';

describe('RolesGuard', () => {
  it('allows matching role', () => {
    const reflector = { getAllAndOverride: jest.fn().mockReturnValue([Role.ORG_ADMIN]) } as unknown as Reflector;
    const guard = new RolesGuard(reflector);

    const context: any = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({ getRequest: () => ({ user: { role: Role.ORG_ADMIN } }) }),
    };

    expect(guard.canActivate(context)).toBe(true);
  });

  it('denies non-matching role', () => {
    const reflector = { getAllAndOverride: jest.fn().mockReturnValue([Role.ORG_ADMIN]) } as unknown as Reflector;
    const guard = new RolesGuard(reflector);

    const context: any = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({ getRequest: () => ({ user: { role: Role.WORKER } }) }),
    };

    expect(guard.canActivate(context)).toBe(false);
  });
});
