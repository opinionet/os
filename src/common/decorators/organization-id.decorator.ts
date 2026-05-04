import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const OrganizationId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest<{ headers: Record<string, string | string[] | undefined> }>();
    const value = request.headers['x-organization-id'];
    return Array.isArray(value) ? value[0] : value;
  },
);
