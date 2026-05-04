import { UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { JwtAuthGuard } from '../../../src/common/guards/jwt-auth.guard';

describe('JwtAuthGuard', () => {
  it('accepts valid bearer token', () => {
    const guard = new JwtAuthGuard();
    const token = sign({ sub: 'u1', email: 'u@x.com', role: 'ORG_ADMIN', organizationId: 'org1' }, 'dev-cityos-secret');
    const request: any = { headers: { authorization: `Bearer ${token}` } };

    const context: any = {
      switchToHttp: () => ({ getRequest: () => request }),
    };

    expect(guard.canActivate(context)).toBe(true);
    expect(request.user?.sub).toBe('u1');
  });

  it('throws on missing token', () => {
    const guard = new JwtAuthGuard();
    const context: any = { switchToHttp: () => ({ getRequest: () => ({ headers: {} }) }) };
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });
});
