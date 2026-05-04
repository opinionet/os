import { ReportStatus } from '@prisma/client';
import { CityReportsService } from '../../../src/modules/city-ops/application/services/city-reports.service';

describe('CityReportsService', () => {
  it('creates and lists reports by status', async () => {
    const create = jest.fn().mockResolvedValue({ id: 'r1' });
    const findMany = jest.fn().mockResolvedValue([{ id: 'r1', status: ReportStatus.OPEN }]);

    const service = new CityReportsService({
      cityReport: { create, findMany },
    } as any);

    await service.create({ title: 'Pothole', description: 'Large pothole on 5th street' });
    const reports = await service.listByStatus(ReportStatus.OPEN);

    expect(create).toHaveBeenCalledTimes(1);
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { status: ReportStatus.OPEN } }),
    );
    expect(reports).toHaveLength(1);
  });
});
