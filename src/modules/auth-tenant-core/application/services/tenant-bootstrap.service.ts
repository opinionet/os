import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { KafkaEventsPublisher } from '../../../../common/kafka/kafka-events.publisher';
import { PrismaService } from '../../../../database/prisma.service';
import { BootstrapOrganizationDto } from '../dto/bootstrap-organization.dto';

@Injectable()
export class TenantBootstrapService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafkaPublisher: KafkaEventsPublisher,
  ) {}

  async bootstrap(dto: BootstrapOrganizationDto): Promise<{ organizationId: string; adminUserId: string }> {
    const result = await this.prisma.$transaction(async (tx) => {
      const organization = await tx.organization.create({
        data: {
          name: dto.organizationName,
          domain: dto.organizationDomain,
          region: dto.region,
        },
      });

      const admin = await tx.user.create({
        data: {
          organizationId: organization.id,
          email: dto.adminEmail,
          passwordHash: dto.adminPasswordHash,
          role: Role.ORG_ADMIN,
          firstName: dto.adminFirstName,
          lastName: dto.adminLastName,
        },
      });

      return { organization, admin };
    });

    await this.kafkaPublisher.publish('cityos.organization.bootstrapped', {
      eventName: 'OrganizationBootstrapped',
      organizationId: result.organization.id,
      occurredAt: new Date().toISOString(),
      payload: {
        organizationId: result.organization.id,
        organizationName: result.organization.name,
        organizationDomain: result.organization.domain,
        adminUserId: result.admin.id,
        adminEmail: result.admin.email,
      },
    });

    return {
      organizationId: result.organization.id,
      adminUserId: result.admin.id,
    };
  }
}
