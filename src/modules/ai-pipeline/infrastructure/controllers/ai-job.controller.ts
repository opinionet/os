import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiJob } from '@prisma/client';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { CreateAiJobDto } from '../../application/dto/create-ai-job.dto';
import { AiJobService } from '../../application/services/ai-job.service';

@Controller('ai/jobs')
@UseGuards(TenantHeaderGuard)
export class AiJobController {
  constructor(private readonly aiJobService: AiJobService) {}

  @Post()
  async create(@Body() dto: CreateAiJobDto): Promise<AiJob> {
    return this.aiJobService.createJob(dto);
  }
}
