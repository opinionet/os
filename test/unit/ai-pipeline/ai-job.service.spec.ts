import { AiJobService } from '../../../src/modules/ai-pipeline/application/services/ai-job.service';

describe('AiJobService', () => {
  it('creates job and emits AiJobQueued', async () => {
    const aiJob = {
      id: 'job-1',
      modelName: 'TRAFFIC_PREDICT_v2',
      targetType: 'REPORT',
      targetId: 'report-1',
    };

    const create = jest.fn().mockResolvedValue(aiJob);
    const publish = jest.fn().mockResolvedValue(undefined);

    const service = new AiJobService(
      { aiJob: { create } } as any,
      { organizationId: 'org-55' } as any,
      { publish } as any,
    );

    const result = await service.createJob({
      modelName: 'TRAFFIC_PREDICT_v2',
      inputPayload: { horizonMinutes: 15 },
      targetType: 'REPORT',
      targetId: 'report-1',
    });

    expect(result).toEqual(aiJob);
    expect(publish).toHaveBeenCalledWith(
      'cityos.ai.job.queued',
      expect.objectContaining({
        eventName: 'AiJobQueued',
        organizationId: 'org-55',
      }),
    );
  });
});
