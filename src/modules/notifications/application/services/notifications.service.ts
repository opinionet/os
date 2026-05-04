import { Injectable } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateNotificationDto): Promise<Notification> {
    return this.prisma.notification.create({
      data: {
        userId: dto.userId,
        title: dto.title,
        message: dto.message,
        actionUrl: dto.actionUrl,
      },
    });
  }

  async getUnread(userId: string): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: {
        userId,
        isRead: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 100,
    });
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }
}
