import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

export interface DomainEvent<TPayload extends Record<string, unknown>> {
  eventName: string;
  organizationId: string;
  occurredAt: string;
  payload: TPayload;
}

@Injectable()
export class KafkaEventsPublisher implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaEventsPublisher.name);

  constructor(@Inject('CITYOS_KAFKA') private readonly kafkaClient: ClientKafka) {}

  async onModuleInit(): Promise<void> {
    await this.kafkaClient.connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.kafkaClient.close();
  }

  async publish<TPayload extends Record<string, unknown>>(topic: string, event: DomainEvent<TPayload>): Promise<void> {
    await this.kafkaClient.emit(topic, event);
    this.logger.debug(`Published ${event.eventName} -> ${topic}`);
  }
}
