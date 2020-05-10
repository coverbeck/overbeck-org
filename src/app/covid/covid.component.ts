import { HttpClient } from "@angular/common/http"
import { Component, OnInit } from "@angular/core"
import { CovidRow } from "../shared/models/CovidRow"
import { CovidService } from "./covid.service"

export enum CovidChart {
  TotalCases,
  CasesByDay,
  StateTotalCases,
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

  readonly CovidChart: typeof CovidChart = CovidChart;

  constructor(private httpClient: HttpClient, private covidService: CovidService) {
  }

  ngOnInit(): void {
    this.httpClient.get<Array<CovidRow>>('/api/covid')
      .subscribe(data => {
          this.data = data;
          [this.startDate, this.endDate] = this.covidService.dateRange(data);
          this.loading = false;
        }
      );
  }
}
