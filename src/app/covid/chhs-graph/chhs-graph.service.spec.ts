import { TestBed } from '@angular/core/testing';
import { ChhsGraphService } from './chhs-graph.service';

const LA_COUNTY = 'Los Angeles';

describe('ChhsGraphService', () => {
  let service: ChhsGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChhsGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
