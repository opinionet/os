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
  controllers: [TenantHealthController, GeoIntelligenceController],
  providers: [
    GeohashProximityService,
    KafkaEventsPublisher,
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantContextInterceptor,
    },
  ],
})
export class AppModule {}
