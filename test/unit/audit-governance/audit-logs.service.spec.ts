import { AuditLogsService } from '../../../src/modules/audit-governance/application/services/audit-logs.service';

describe('AuditLogsService', () => {
  it('creates and lists recent logs', async () => {
    const create = jest.fn().mockResolvedValue({ id: 'a1' });
    const findMany = jest.fn().mockResolvedValue([{ id: 'a1' }]);

    const service = new AuditLogsService({
      auditLog: { create, findMany },
    } as any);

    await service.create({ action: 'UPDATED_TASK', entityType: 'TASK', entityId: 't1' });
    const logs = await service.listRecent(20);

    expect(create).toHaveBeenCalledTimes(1);
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({ take: 20 }),
    );
    expect(logs).toHaveLength(1);
  });
});
