import { TestBed } from '@angular/core/testing';

import { AnagrammerService } from './anagrammer.service';

describe('AnagrammerService', () => {
  let service: AnagrammerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnagrammerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
