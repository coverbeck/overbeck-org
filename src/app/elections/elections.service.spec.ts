import { TestBed } from '@angular/core/testing';

import { ElectionsService } from './elections.service';

const DATA_SNIPPET = [
  {
    year: 1976,
    state: 'AK',
    district: 0,
    democrat: 34194,
    republican: 83722,
    other: 292,
    total: 118208,
    winningParty: 'republican',
    winningVotes: 83722,
    winningCandidate: 'Don Young',
  },
  {
    year: 1976,
    state: 'AL',
    district: 1,
    democrat: 58906,
    republican: 98257,
    other: 7,
    total: 157170,
    winningParty: 'republican',
    winningVotes: 98257,
    winningCandidate: 'Jack Edwards',
  },
  {
    year: 1976,
    state: 'AL',
    district: 2,
    democrat: 66288,
    republican: 90069,
    other: 5,
    total: 156362,
    winningParty: 'republican',
    winningVotes: 90069,
    winningCandidate: 'William L. \\\\Bill\\\\ Dickinson',
  },
  {
    year: 1976,
    state: 'AL',
    district: 3,
    democrat: 106935,
    republican: 0,
    other: 1113,
    total: 108048,
    winningParty: 'democrat',
    winningVotes: 106935,
    winningCandidate: 'Bill Nichols',
  },
  {
    year: 2018,
    state: 'WV',
    district: 2,
    democrat: 88011,
    republican: 110504,
    other: 6277,
    total: 204792,
    winningParty: 'republican',
    winningVotes: 110504,
    winningCandidate: 'Alex X. Mooney',
  },
  {
    year: 2018,
    state: 'WV',
    district: 3,
    democrat: 76340,
    republican: 98645,
    other: 0,
    total: 174985,
    winningParty: 'republican',
    winningVotes: 98645,
    winningCandidate: 'Carol Miller',
  },
  {
    year: 2018,
    state: 'WY',
    district: 0,
    democrat: 59903,
    republican: 127963,
    other: 13379,
    total: 201245,
    winningParty: 'republican',
    winningVotes: 127963,
    winningCandidate: 'Liz Cheney',
  },
];

describe('ElectionsService', () => {
  let service: ElectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return two years', () => {
    const map = service.groupHouseDataByYear(DATA_SNIPPET);
    expect(map.size).toBe(2);
  });
});
