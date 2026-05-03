import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaEventsPublisher } from './common/kafka/kafka-events.publisher';
import { TenantContextInterceptor } from './common/interceptors/tenant-context.interceptor';
import { PrismaModule } from './database/prisma.module';
import { GeohashProximityService } from './modules/geo-intelligence/application/services/geohash-proximity.service';
import { GeoIntelligenceController } from './modules/geo-intelligence/infrastructure/controllers/geo-intelligence.controller';
import { TenantHealthController } from './modules/auth-tenant-core/infrastructure/controllers/tenant-health.controller';
import { validateEnv } from './config/env.validation';
import { SensorIngestionService } from './modules/iot-system/application/services/sensor-ingestion.service';
import { SensorIngestionController } from './modules/iot-system/infrastructure/controllers/sensor-ingestion.controller';
import { EmergencyDispatchService } from './modules/emergency-dispatch/application/services/emergency-dispatch.service';
import { EmergencyDispatchController } from './modules/emergency-dispatch/infrastructure/controllers/emergency-dispatch.controller';
import { TenantBootstrapService } from './modules/auth-tenant-core/application/services/tenant-bootstrap.service';
import { TenantBootstrapController } from './modules/auth-tenant-core/infrastructure/controllers/tenant-bootstrap.controller';
import { AiJobService } from './modules/ai-pipeline/application/services/ai-job.service';
import { AiJobController } from './modules/ai-pipeline/infrastructure/controllers/ai-job.controller';
import { NotificationsService } from './modules/notifications/application/services/notifications.service';
import { NotificationsController } from './modules/notifications/infrastructure/controllers/notifications.controller';
import { AuditLogsService } from './modules/audit-governance/application/services/audit-logs.service';
import { AuditLogsController } from './modules/audit-governance/infrastructure/controllers/audit-logs.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    PrismaModule,
    ClientsModule.registerAsync([
      {
        name: 'CITYOS_KAFKA',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>('KAFKA_CLIENT_ID', 'cityos-app'),
              brokers: configService
                .get<string>('KAFKA_BROKERS', 'localhost:9092')
                .split(',')
                .map((broker) => broker.trim())
                .filter(Boolean),
            },
            consumer: {
              groupId: configService.get<string>('KAFKA_GROUP_ID', 'cityos-consumer'),
            },
            producer: {
              allowAutoTopicCreation: false,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [TenantHealthController, TenantBootstrapController, GeoIntelligenceController, SensorIngestionController, EmergencyDispatchController, AiJobController, NotificationsController, AuditLogsController],
  providers: [
    GeohashProximityService,
    KafkaEventsPublisher,
    SensorIngestionService,
    EmergencyDispatchService,
    TenantBootstrapService,
    AiJobService,
    NotificationsService,
    AuditLogsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantContextInterceptor,
    },
  ],
})
export class AppModule {}
