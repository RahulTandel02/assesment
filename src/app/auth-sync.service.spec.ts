import { TestBed } from '@angular/core/testing';

import { AuthSyncService } from './auth-sync.service';

describe('AuthSyncService', () => {
  let service: AuthSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
