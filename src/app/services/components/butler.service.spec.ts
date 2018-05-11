import { TestBed, inject } from '@angular/core/testing';

import { ButlerService } from './butler.service';

describe('ButlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ButlerService]
    });
  });

  it('should be created', inject([ButlerService], (service: ButlerService) => {
    expect(service).toBeTruthy();
  }));
});
