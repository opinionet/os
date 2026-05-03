import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TenantContextInterceptor } from './common/interceptors/tenant-context.interceptor';
import { PrismaModule } from './database/prisma.module';
import { TenantHealthController } from './modules/auth-tenant-core/infrastructure/controllers/tenant-health.controller';

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
  controllers: [TenantHealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TenantContextInterceptor,
    },
  ],
})
export class AppModule {}
