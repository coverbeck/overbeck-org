import { Injectable } from "@angular/core"
import { ChartDataSets } from "chart.js"
import { CovidRow } from "./covid.component"

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor() { }

  covidToChartData(covidRows: Array<CovidRow>): ChartDataSets {
    return {
      data: covidRows.map(r => r["Total Count Confirmed"]).map(n => parseInt(n)),
      label: covidRows[0]["County Name"]
    }
  }
}
