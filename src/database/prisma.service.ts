import { Injectable, Logger, OnModuleDestroy, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { TenantContextService } from '../common/context/tenant-context.service';

const TENANT_MODELS = new Set<string>([
  'Organization',
  'Subscription',
  'PaymentTransaction',
  'User',
  'GeoNode',
  'IotDevice',
  'CityReport',
  'Emergency',
  'Task',
  'AiJob',
  'TwinSnapshot',
  'CityEvent',
  'Notification',
  'AuditLog',
]);

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(private readonly tenantContext: TenantContextService) {
    super({
      log: [
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ],
    });

    this.$on('error', (event: Prisma.LogEvent) => this.logger.error(event.message));
    this.$on('warn', (event: Prisma.LogEvent) => this.logger.warn(event.message));

    this.registerTenantIsolationMiddleware();
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  private registerTenantIsolationMiddleware(): void {
    this.$use(async (params, next) => {
      if (!params.model || !TENANT_MODELS.has(params.model) || params.model === 'Organization') {
        return next(params);
      }

      const organizationId = this.tenantContext.organizationId;
      if (!organizationId) {
        throw new UnauthorizedException('Tenant context not set');
      }

      if (params.action === 'create' || params.action === 'createMany') {
        params.args.data = this.attachOrganizationId(params.args.data, organizationId);
      }

      if (['findMany', 'findFirst', 'updateMany', 'deleteMany', 'count'].includes(params.action)) {
        params.args.where = { ...(params.args.where ?? {}), organizationId };
      }

      if (['findUnique', 'update', 'delete', 'upsert'].includes(params.action)) {
        params.args.where = { ...(params.args.where ?? {}), organizationId };
      }

      return next(params);
    });
  }

  private attachOrganizationId(data: unknown, organizationId: string): unknown {
    if (Array.isArray(data)) {
      return data.map((entry) => ({ ...entry, organizationId }));
    }

    if (typeof data === 'object' && data !== null) {
      return { ...data, organizationId };
    }

    return data;
  }
}
