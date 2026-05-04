import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { Observable } from 'rxjs';
import { TenantContextService } from '../context/tenant-context.service';

@Injectable()
export class TenantContextInterceptor implements NestInterceptor {
  constructor(private readonly tenantContext: TenantContextService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string | string[] | undefined> }>();

    const organizationHeader = request.headers['x-organization-id'];
    const requestIdHeader = request.headers['x-request-id'];

    const organizationId = Array.isArray(organizationHeader) ? organizationHeader[0] : organizationHeader;
    const requestId = (Array.isArray(requestIdHeader) ? requestIdHeader[0] : requestIdHeader) ?? randomUUID();

    return this.tenantContext.run({ organizationId, requestId }, () => next.handle());
  }
}
