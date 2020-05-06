import { Injectable } from "@angular/core"
import { ChartDataSets } from "chart.js"
import { CovidRow } from "../covid/covid.component"

export class StateData {
  date: string;
  confirmed: number;
  deaths: number;
  positivePatients: number;
  suspectedPatients: number;
  icuPositivePatients: number;
  icuSuspectedPatients: number;
}
@Injectable({
  providedIn: 'root'
})

export class ChhsGraphService {

  constructor() { }

  public casesByDay(rows: Array<CovidRow>, county: string): ChartDataSets {
    const countyRows = rows.filter(row => row["County Name"] === county);
    return {
          data: countyRows.map(row => row["Total Count Confirmed"]).map(countStr => parseInt(countStr)),
          label: countyRows[0]["County Name"],
          fill: false,
        }
      };

  public newCasesByDay(rows: Array<CovidRow>, county: string): ChartDataSets {
    const countyRows = rows.filter(row => row["County Name"] === county);
    const newCases = countyRows.map((val, index, arr) => {
      const cases = parseInt(val["Total Count Confirmed"]);
      if (index === 0) {
        return 0;
      }
      else {
        return cases - parseInt(arr[index - 1]["Total Count Confirmed"]);
      }
    }).slice(1);
    return {
      data: newCases,
      label: countyRows[0]["County Name"],
      fill: false,
    }
  };

  public stateTotals(rows: Array<CovidRow>): ChartDataSets {
    return null;
  }
}
