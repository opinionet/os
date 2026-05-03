import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from './database/prisma.module';

/**
 * Root module for CityOS modular monolith.
 *
 * Kafka client is registered once and reused by domain modules to publish
 * domain events (e.g., EmergencyDetected, SensorDataReceived).
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
                .split(','),
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
})
export class AppModule {}
