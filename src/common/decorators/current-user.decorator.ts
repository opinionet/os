import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUserPayload } from '../guards/jwt-auth.guard';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): JwtUserPayload | undefined => {
    const request = ctx.switchToHttp().getRequest<{ user?: JwtUserPayload }>();
    return request.user;
  },
);
