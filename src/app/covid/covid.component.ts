import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  public loading = true;
  public startDate;
  public endDate;
  public county;
  public counties;

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
  }
}
