import { Injectable } from '@nestjs/common';
import { AuditLog } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateAuditLogDto } from '../dto/create-audit-log.dto';

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAuditLogDto): Promise<AuditLog> {
    return this.prisma.auditLog.create({
      data: {
        userId: dto.userId,
        action: dto.action,
        entityType: dto.entityType,
        entityId: dto.entityId,
        previousState: dto.previousState,
        newState: dto.newState,
        ipAddress: dto.ipAddress,
        userAgent: dto.userAgent,
      },
    });
  }

  async listRecent(limit = 100): Promise<AuditLog[]> {
    return this.prisma.auditLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: Math.min(Math.max(limit, 1), 500),
    });
  }
}
