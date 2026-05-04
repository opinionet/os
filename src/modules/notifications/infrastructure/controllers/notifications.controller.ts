import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { CreateNotificationDto } from '../../application/dto/create-notification.dto';
import { NotificationsService } from '../../application/services/notifications.service';

@Controller('notifications')
@UseGuards(TenantHeaderGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() dto: CreateNotificationDto): Promise<Notification> {
    return this.notificationsService.create(dto);
  }

  @Get('unread/:userId')
  async getUnread(@Param('userId') userId: string): Promise<Notification[]> {
    return this.notificationsService.getUnread(userId);
  }

  @Patch(':notificationId/read')
  async markAsRead(@Param('notificationId') notificationId: string): Promise<Notification> {
    return this.notificationsService.markAsRead(notificationId);
  }
}
