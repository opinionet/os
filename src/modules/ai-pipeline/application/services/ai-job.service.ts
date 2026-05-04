import { Injectable } from '@nestjs/common';
import { AiJob } from '@prisma/client';
import { TenantContextService } from '../../../../common/context/tenant-context.service';
import { KafkaEventsPublisher } from '../../../../common/kafka/kafka-events.publisher';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateAiJobDto } from '../dto/create-ai-job.dto';

@Injectable()
export class AiJobService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantContext: TenantContextService,
    private readonly kafkaPublisher: KafkaEventsPublisher,
  ) {}

  async createJob(dto: CreateAiJobDto): Promise<AiJob> {
    const job = await this.prisma.aiJob.create({
      data: {
        modelName: dto.modelName,
        inputPayload: dto.inputPayload,
        targetType: dto.targetType,
        targetId: dto.targetId,
      },
    });

    await this.kafkaPublisher.publish('cityos.ai.job.queued', {
      eventName: 'AiJobQueued',
      organizationId: this.tenantContext.organizationId ?? 'unknown',
      occurredAt: new Date().toISOString(),
      payload: {
        jobId: job.id,
        modelName: job.modelName,
        targetType: job.targetType,
        targetId: job.targetId,
      },
    });

    return job;
  }
}
