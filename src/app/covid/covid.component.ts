import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Papa } from 'ngx-papaparse';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CaliCases, HospitalData } from '../shared/models/cali-model';
import { CovidTrackingRow } from '../shared/models/covid-tracking-row';
import { ChhsGraphService } from './chhs-graph/chhs-graph.service';
import { CovidService } from './covid.service';


export enum CovidChart {
  CasesByDay,
  StateCasesByDay
}

interface Resource {
  name: string;
  url: string;
}

interface InnerResult {
  results: Array<Result>;
}
interface SearchResult {
  result: InnerResult;
}
interface Result {
  name: string;
  resources: Array<Resource>;
}

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {

  public cases: CaliCases[] =  [];
  public hospitalData: HospitalData[] = [];
  public loading = true;
  public startDate;
  public endDate;
  public county;
  public counties;
  public readonly NORCAL_COUNTIES = ['San Francisco', 'Santa Clara', 'Alameda', 'San Mateo',
    'Contra Costa', 'Marin', 'Solano', 'Sonoma', 'Napa'];
  public readonly SOCAL_COUNTIES = ['Imperial', 'Kern', 'Los Angeles', 'Orange', 'Riverside',
    'San Bernardino', 'San Diego', 'Santa Barbara', 'San Luis Obispo', 'Ventura'];
  public readonly SOCAL_CONFIRMED_TITLE = `SoCal Confirmed Cases by Day ( ${this.SOCAL_COUNTIES.join(', ')})`;
  public readonly NORCAL_CONFIRMED_TITLE = `NorCal Confirmed Cases by Day ( ${this.NORCAL_COUNTIES.join(', ')})`;
  public readonly SOCAL_DEATHS_TITLE = `SoCal Deaths by Day ( ${this.SOCAL_COUNTIES.join(', ')})`;
  public readonly NORCAL_DEATHS_TITLE = `NorCal Deaths by Day ( ${this.NORCAL_COUNTIES.join(', ')})`;

  public cumulativeTestData: ChartDataSets[];
  public dailyTestData: ChartDataSets[];
  public dailyPositiveTestData: ChartDataSets[];
  public testLabels: Label[];
  public rateLabels: Label[];

  readonly CovidChart: typeof CovidChart = CovidChart;
  private readonly END_FUNKY_DATA = 20200425; // Negative/positive testing rates are funky before this


  constructor(private httpClient: HttpClient,
              private covidService: CovidService,
              private chhsGraphService: ChhsGraphService,
              private csvParser: Papa) {
  }

  ngOnInit(): void {

    this.httpClient.get<SearchResult>('https://data.chhs.ca.gov/api/3/action/package_search?q=covid&rows=100')
      .pipe(
        map(data => {
          const results = data.result.results;
          const result = results.find(r => r.name === 'covid-19-time-series-metrics-by-county-and-state');
          const caseUrl = result.resources.find(r => r.name === 'Statewide COVID-19 Cases Deaths Tests').url;
          const hospitals = results.find(r => r.name === 'covid-19-hospital-data');
          const hospitalsUrl = hospitals.resources.find(r => r.name === 'Statewide Covid-19 Hospital County Data').url;
          return [caseUrl, hospitalsUrl];
        }),
        switchMap((urls) => {
          const [casesUrl, hospitalsUrl] = urls;
          return forkJoin([
            this.httpClient.get(casesUrl, {responseType: 'text'}),
            this.httpClient.get(hospitalsUrl, {responseType: 'text'})]);
        })
      )
      .subscribe((data: [string, string]) => {
        const [cases, hospitalData] = data;
        const rows = this.csvParser.parse(cases, { header: true, dynamicTyping: true }).data
          .filter(row => row.area && row.date) // There is a null county somehow
          .map((caliCase, index, arr) => {
            return caliCase;
          });
        this.cases = rows.sort((a, b) => a.date.localeCompare(b.date));
        [this.startDate, this.endDate] = this.covidService.dateRange(this.cases);
        this.hospitalData = this.csvParser.parse(hospitalData, {header: true, dynamicTyping: true})
          .data.filter(row => row.county);
        this.loading = false;
      });
    this.httpClient.get<Array<CovidTrackingRow>>('https://api.covidtracking.com/v1/states/ca/daily.json')
      .subscribe(data => {
        this.counties = this.chhsGraphService.countyNames();
        this.county = this.counties[0];
        this.testLabels = this.testingLabels(data);
        this.rateLabels = this.ratingLabels(data);
        this.cumulativeTestData = this.cumulativeTests(data);
        this.dailyPositiveTestData = this.dailyPositiveTestRate(data);
        this.dailyTestData = this.dailyTests(data);
      });
  }

  testingLabels(data: Array<CovidTrackingRow>): Label[] {
    const sortedByDate = data.sort((a, b) => a.date - b.date);
    return sortedByDate.map(r => r.date + '');
  }

  ratingLabels(data: Array<CovidTrackingRow>): Label[] {
    return this.testingLabels(data.filter(r => r.date > this.END_FUNKY_DATA ));
  }

  cumulativeTests(data: Array<CovidTrackingRow>): ChartDataSets[] {
    if (!data) {
      return [];
    }
    const sortedByDate = data.sort((a, b) => a.date - b.date);
    const lineChartData = [
      {
        data: sortedByDate.map(r => r.total),
        label: 'Total Tests',
        fill: false
      },
      {
        data: sortedByDate.map(r => r.positive),
        label: 'Total Positive',
        fill: false
      },
      {
        data: sortedByDate.map(r => r.negative),
        label: 'Total Negative',
        fill: false
      },
      {
        data: sortedByDate.map(r => r.positive / r.total),
        label: 'Percentage positive tests',
        fill: false
      }
    ];
    // const lineChartLabels = sortedByDate.map(r => r.date + '');
    return lineChartData;
  }

  dailyTests(data: Array<CovidTrackingRow>): ChartDataSets[] {
    if (!data) {
      return [];
    }
    const sortedByDate = data.sort((a, b) => a.date - b.date);
    const lineChartData = [
      {
        data: sortedByDate.map(r => r.positiveIncrease),
        label: 'Positive Tests',
        fill: false
      },
      {
        data: sortedByDate.map(r => r.negativeIncrease),
        label: 'Negative Tests',
        fill: false
      }
    ];
    return lineChartData;
  }

  dailyPositiveTestRate(data: Array<CovidTrackingRow>): ChartDataSets[] {
    if (!data) {
      return [];
    }
    const sortedByDate = data
      // Funky data before then
      .filter(r => r.date > this.END_FUNKY_DATA )
      .sort((a, b) => a.date - b.date);
    const dailyPercents = sortedByDate.map(r => r.positiveIncrease / (r.positiveIncrease + r.negativeIncrease) * 100);

    // Terrible, terrible hard-coding. Because this is invoked from a child component,
    // "this" is not set to this component
    const movingAverage = [];
    const window = 5;
    // only works with odd numbers
    const  offset = Math.floor(window / 2);
    for (let i = 0; i < dailyPercents.length; i++) {
      if ((i < window - 1 - offset) || (i > dailyPercents.length - offset - 1)) {
        movingAverage.push(null);
      } else {
        movingAverage.push(dailyPercents.slice(i - offset, i + 1 + offset).reduce((acc, val) => acc + val) / window);
      }
    }
    const lineChartData = [
      {
        data: dailyPercents,
        label: 'Positive Tests Rate',
        fill: false
      },
      {
        data: movingAverage,
        label: '5 Day Moving Average',
        fill: false
      }
    ];
    return lineChartData;
  }
}
