import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';

export interface RequestContextState {
  organizationId?: string;
  requestId?: string;
}

@Injectable()
export class TenantContextService {
  private readonly als = new AsyncLocalStorage<RequestContextState>();

  run<T>(state: RequestContextState, callback: () => T): T {
    return this.als.run(state, callback);
  }

  get organizationId(): string | undefined {
    return this.als.getStore()?.organizationId;
  }

  get requestId(): string | undefined {
    return this.als.getStore()?.requestId;
  }
}
