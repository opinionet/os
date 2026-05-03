import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TenantHeaderGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string | string[] | undefined> }>();
    const orgId = request.headers['x-organization-id'];
    const value = Array.isArray(orgId) ? orgId[0] : orgId;

    if (!value) {
      throw new UnauthorizedException('Missing x-organization-id header');
    }

    return true;
  }
}
