import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  liveness(): { status: 'ok'; service: string } {
    return { status: 'ok', service: 'cityos' };
  }

  async readiness(): Promise<{ status: 'ok'; checks: { database: 'ok' } }> {
    await this.prisma.$queryRaw`SELECT 1`;
    return { status: 'ok', checks: { database: 'ok' } };
  }
}
