import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { Task, TaskStatus } from '@prisma/client';
import { TenantHeaderGuard } from '../../../../common/guards/tenant-header.guard';
import { CreateTaskDto } from '../../application/dto/create-task.dto';
import { TasksService } from '../../application/services/tasks.service';

@Controller('tasks')
@UseGuards(TenantHeaderGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(dto);
  }

  @Get()
  async listByStatus(@Query('status') status?: TaskStatus): Promise<Task[]> {
    return this.tasksService.listByStatus(status);
  }
}
