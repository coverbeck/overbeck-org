import { Injectable } from "@angular/core"
import { CovidRow } from "../shared/models/CovidRow"

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor() { }

  public dateRange(rows: Array<CovidRow>): [string, string] {
    const startDate = rows[0]['Most Recent Date'];
    const endDate = rows[rows.length - 1]['Most Recent Date'];
    return [startDate, endDate];
  }
}
