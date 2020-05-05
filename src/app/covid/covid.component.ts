import { HttpClient } from "@angular/common/http"
import { Component, OnInit } from "@angular/core"
import { CovidService } from "./covid.service"

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

  constructor(private httpClient: HttpClient, private covidService: CovidService) {
  }

  ngOnInit(): void {
    this.httpClient.get<Array<CovidRow>>("/api/covid")
      .subscribe(data => this.data = data );
  }
}
