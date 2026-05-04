import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from '@prisma/client';
import { PrismaService } from '../../../../database/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status ?? TaskStatus.PENDING,
        assigneeId: dto.assigneeId,
        geoNodeId: dto.geoNodeId,
      },
    });
  }

  async listByStatus(status?: TaskStatus): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
  }
}
