import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
}
