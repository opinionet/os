import { UnauthorizedException } from '@nestjs/common';
import { TenantHeaderGuard } from '../../../src/common/guards/tenant-header.guard';

describe('TenantHeaderGuard', () => {
  const guard = new TenantHeaderGuard();

  it('allows request when x-organization-id is present', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { 'x-organization-id': 'org-123' } }),
      }),
    } as any;

    expect(guard.canActivate(context)).toBe(true);
  });

  it('throws unauthorized when x-organization-id is missing', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
      }),
    } as any;

    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });
});
