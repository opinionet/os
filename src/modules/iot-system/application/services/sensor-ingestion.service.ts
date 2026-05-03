import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../database/prisma.service';
import { KafkaEventsPublisher } from '../../../../common/kafka/kafka-events.publisher';
import { TenantContextService } from '../../../../common/context/tenant-context.service';
import { IngestSensorDataDto } from '../dto/ingest-sensor-data.dto';

@Injectable()
export class SensorIngestionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tenantContext: TenantContextService,
    private readonly kafkaPublisher: KafkaEventsPublisher,
  ) {}

  async ingest(dto: IngestSensorDataDto): Promise<{ status: 'accepted'; timestamp: string }> {
    const timestamp = dto.timestamp ?? new Date().toISOString();

    await this.prisma.sensorData.create({
      data: {
        deviceId: dto.deviceId,
        payload: dto.payload,
        timestamp: new Date(timestamp),
      },
    });

    await this.kafkaPublisher.publish('cityos.sensor-data.received', {
      eventName: 'SensorDataReceived',
      organizationId: this.tenantContext.organizationId ?? 'unknown',
      occurredAt: new Date().toISOString(),
      payload: {
        deviceId: dto.deviceId,
        geoHash: dto.geoHash,
        dataType: dto.dataType,
        timestamp,
      },
    });

    return { status: 'accepted', timestamp };
  }
}
