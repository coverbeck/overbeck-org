import { HttpClient } from "@angular/common/http"
import { Component, OnInit } from "@angular/core"

export enum CovidChart {
  TotalCases,
  CasesByDay,
  StateTotalCases,
  StateCasesByDay
}

export class CovidRow {
  "County Name": string = "";
  "Most Recent Date": string = "";
  "Total Count Confirmed": string;
  "Total Count Deaths": string;
  "COVID-19 Positive Patients": string;
  "Suspected COVID-19 Positive Patients": string;
  "ICU COVID-19 Positive Patients": string;
  "ICU COVID-19 Suspected Patients": string;
}

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {

  public data: CovidRow[] =  [];
  public loading = true;

  readonly CovidChart: typeof CovidChart = CovidChart;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get<Array<CovidRow>>("/api/covid")
      .subscribe(data => {
          this.data = data;
          this.loading = false;
        }
      );
  }
}
