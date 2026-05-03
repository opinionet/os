export interface AiJobQueuedEventPayload {
  jobId: string;
  modelName: string;
  targetType: string;
  targetId: string;
}
