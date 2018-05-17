import { TestBed, inject } from '@angular/core/testing';

import { UserCategoryDataService } from './user-category-data.service';

describe('UserCategoryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCategoryDataService]
    });
  });

  it('should be created', inject([UserCategoryDataService], (service: UserCategoryDataService) => {
    expect(service).toBeTruthy();
  }));
});
