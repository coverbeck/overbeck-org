import { TestBed } from '@angular/core/testing';

import { HospitalizationService } from './hospitalization.service';

describe('HospitalizationService', () => {
  let service: HospitalizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
