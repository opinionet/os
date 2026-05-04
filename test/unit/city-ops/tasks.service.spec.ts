import { TaskStatus } from '@prisma/client';
import { TasksService } from '../../../src/modules/city-ops/application/services/tasks.service';

describe('TasksService', () => {
  it('creates and lists tasks by status', async () => {
    const create = jest.fn().mockResolvedValue({ id: 't1' });
    const findMany = jest.fn().mockResolvedValue([{ id: 't1', status: TaskStatus.PENDING }]);

    const service = new TasksService({
      task: { create, findMany },
    } as any);

    await service.create({ title: 'Inspect water leak' });
    const tasks = await service.listByStatus(TaskStatus.PENDING);

    expect(create).toHaveBeenCalledTimes(1);
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: TaskStatus.PENDING } }),
    );
    expect(tasks).toHaveLength(1);
  });
});
