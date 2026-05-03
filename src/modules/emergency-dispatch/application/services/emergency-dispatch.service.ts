import { Injectable } from '@nestjs/common';
import { Emergency } from '@prisma/client';
import { TenantContextService } from '../../../../common/context/tenant-context.service';
import { KafkaEventsPublisher } from '../../../../common/kafka/kafka-events.publisher';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateEmergencyDto } from '../dto/create-emergency.dto';

@Injectable()
export class EmergencyDispatchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantContext: TenantContextService,
    private readonly kafkaPublisher: KafkaEventsPublisher,
  ) {}

  async createEmergency(dto: CreateEmergencyDto): Promise<Emergency> {
    const emergency = await this.prisma.emergency.create({
      data: {
        title: dto.title,
        severity: dto.severity,
        geoNodeId: dto.geoNodeId,
        detectedById: dto.detectedById,
      },
    });

    await this.kafkaPublisher.publish('cityos.emergency.detected', {
      eventName: 'EmergencyDetected',
      organizationId: this.tenantContext.organizationId ?? 'unknown',
      occurredAt: new Date().toISOString(),
      payload: {
        emergencyId: emergency.id,
        title: emergency.title,
        severity: emergency.severity,
        geoNodeId: emergency.geoNodeId,
        detectedById: emergency.detectedById ?? undefined,
      },
    });

    return emergency;
  }
}
