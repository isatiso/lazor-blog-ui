import { TestBed, async, inject } from '@angular/core/testing';

import { AlreadyAuthGuard } from './already-auth.guard';

describe('AlreadyAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlreadyAuthGuard]
    });
  });

  it('should ...', inject([AlreadyAuthGuard], (guard: AlreadyAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
