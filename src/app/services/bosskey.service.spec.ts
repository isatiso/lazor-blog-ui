import { TestBed, inject } from '@angular/core/testing';

import { BosskeyService } from './bosskey.service';

describe('BosskeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BosskeyService]
    });
  });

  it('should be created', inject([BosskeyService], (service: BosskeyService) => {
    expect(service).toBeTruthy();
  }));
});
