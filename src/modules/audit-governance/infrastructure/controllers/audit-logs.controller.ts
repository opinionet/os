import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuditLog } from '@prisma/client';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { CreateAuditLogDto } from '../../application/dto/create-audit-log.dto';
import { AuditLogsService } from '../../application/services/audit-logs.service';

@Controller('audit-logs')
@UseGuards(TenantHeaderGuard)
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Post()
  async create(@Body() dto: CreateAuditLogDto): Promise<AuditLog> {
    return this.auditLogsService.create(dto);
  }

  @Get()
  async listRecent(@Query('limit') limitRaw = '100'): Promise<AuditLog[]> {
    return this.auditLogsService.listRecent(Number(limitRaw));
  }
}
