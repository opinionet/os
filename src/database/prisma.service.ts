import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

/**
 * Central Prisma service.
 *
 * Notes:
 * - Kept as an extension point for tenant scoping middleware.
 * - Soft-delete transformations can be added here via Prisma middleware.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ],
    });

    this.$on('error', (event: Prisma.LogEvent) => {
      this.logger.error(event.message);
    });

    this.$on('warn', (event: Prisma.LogEvent) => {
      this.logger.warn(event.message);
    });

    this.registerMiddlewarePlaceholders();
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log('Prisma connection established');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    this.logger.log('Prisma connection closed');
  }

  private registerMiddlewarePlaceholders(): void {
    this.$use(async (params, next) => {
      // Future: inject request tenant context and enforce organizationId scoping.
      // Example guardrail: block queries missing organizationId for tenant-bound models.
      return next(params);
    });

    this.$use(async (params, next) => {
      // Future: translate hard deletes into soft deletes for selected models.
      return next(params);
    });
  }
}
