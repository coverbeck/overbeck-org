import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CovidTrackingRow } from '../shared/models/covid-tracking-row';
import { CovidRow } from '../shared/models/CovidRow';
import { ChhsGraphService } from './chhs-graph/chhs-graph.service';
import { CovidService } from './covid.service';

export enum CovidChart {
  CasesByDay,
  StateCasesByDay
}

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {

  public data: CovidRow[] =  [];
  public trackingData: CovidTrackingRow[] = [];
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

  readonly CovidChart: typeof CovidChart = CovidChart;

  constructor(private httpClient: HttpClient,
              private covidService: CovidService,
              private chhsGraphService: ChhsGraphService) {
  }

  ngOnInit(): void {
    this.httpClient.get<Array<CovidRow>>('/api/covid')
      .subscribe(data => {
          this.counties = this.chhsGraphService.countyNames();
          this.county = this.counties[0];
          this.data = data;
          [this.startDate, this.endDate] = this.covidService.dateRange(data);
          this.loading = false;
        }
      );
    this.httpClient.get<Array<CovidTrackingRow>>('https://covidtracking.com/api/v1/states/ca/daily.json')
      .subscribe(data => {
        this.trackingData = data;
      });
  }

  cumulativeTests(data: Array<CovidTrackingRow>): [ChartDataSets[], Label[]] {
    if (!data) {
      return [[], []];
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
    const lineChartLabels = sortedByDate.map(r => r.date + '');
    return [lineChartData, lineChartLabels];
  }

  dailyTests(data: Array<CovidTrackingRow>): [ChartDataSets[], Label[]] {
    if (!data) {
      return [[], []];
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
    const lineChartLabels = sortedByDate.map(r => r.date + '');
    return [lineChartData, lineChartLabels];
  }

  dailyPositiveTestRate(data: Array<CovidTrackingRow>): [ChartDataSets[], Label[]] {
    if (!data) {
      return [[], []];
    }
    const sortedByDate = data
      // Funky data before then
      .filter(r => r.date > 20200425 )
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
    const lineChartLabels = sortedByDate.map(r => r.date + '');
    return [lineChartData, lineChartLabels];
  }
}
