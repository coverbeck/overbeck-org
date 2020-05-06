import { TestBed } from "@angular/core/testing"
import { CovidRow } from "../covid/covid.component"

import { ChhsGraphService } from "./chhs-graph.service"

const SMALL_RESPONSE: Array<CovidRow> = [
  {
    "County Name": "Los Angeles",
    "Most Recent Date": "4/1/2020",
    "Total Count Confirmed": "3502",
    "Total Count Deaths": "66",
    "COVID-19 Positive Patients": "739",
    "Suspected COVID-19 Positive Patients": "1332",
    "ICU COVID-19 Positive Patients": "335",
    "ICU COVID-19 Suspected Patients": "220"
  },
  {
    "County Name": "San Bernardino",
    "Most Recent Date": "4/1/2020",
    "Total Count Confirmed": "245",
    "Total Count Deaths": "5",
    "COVID-19 Positive Patients": "95",
    "Suspected COVID-19 Positive Patients": "196",
    "ICU COVID-19 Positive Patients": "39",
    "ICU COVID-19 Suspected Patients": "52"
  },
  {
    "County Name": "Los Angeles",
    "Most Recent Date": "4/2/2020",
    "Total Count Confirmed": "4040",
    "Total Count Deaths": "79",
    "COVID-19 Positive Patients": "818",
    "Suspected COVID-19 Positive Patients": "1270",
    "ICU COVID-19 Positive Patients": "346",
    "ICU COVID-19 Suspected Patients": "193"
  },
  {
    "County Name": "San Bernardino",
    "Most Recent Date": "4/2/2020",
    "Total Count Confirmed": "335",
    "Total Count Deaths": "8",
    "COVID-19 Positive Patients": "126",
    "Suspected COVID-19 Positive Patients": "185",
    "ICU COVID-19 Positive Patients": "50",
    "ICU COVID-19 Suspected Patients": "45"
  },
  {
    "County Name": "Los Angeles",
    "Most Recent Date": "4/3/2020",
    "Total Count Confirmed": "4566",
    "Total Count Deaths": "91",
    "COVID-19 Positive Patients": "962",
    "Suspected COVID-19 Positive Patients": "1239",
    "ICU COVID-19 Positive Patients": "422",
    "ICU COVID-19 Suspected Patients": "209"
  },
  {
    "County Name": "San Bernardino",
    "Most Recent Date": "4/3/2020",
    "Total Count Confirmed": "356",
    "Total Count Deaths": "11",
    "COVID-19 Positive Patients": "118",
    "Suspected COVID-19 Positive Patients": "204",
    "ICU COVID-19 Positive Patients": "44",
    "ICU COVID-19 Suspected Patients": "53"
  }
];

const LA_COUNTY = "Los Angeles"

describe('ChhsGraphService', () => {
  let service: ChhsGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChhsGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate cases by day', () => {
    const chartDataSets = service.casesByDay(SMALL_RESPONSE, LA_COUNTY)
    expect(chartDataSets.data).toEqual([3502, 4040, 4566]); // 3 data points for LA
    expect(chartDataSets.label).toEqual(LA_COUNTY);
  });

  it('should count new cases by day', () => {
    const newCasesByDay = service.newCasesByDay(SMALL_RESPONSE, LA_COUNTY);
    expect(newCasesByDay.data).toEqual([538, 526]);
  })
});
