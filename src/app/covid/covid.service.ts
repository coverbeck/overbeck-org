import { Injectable } from '@angular/core';
import { CaliCases } from '../shared/models/cali-cases';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor() { }

  public dateRange(rows: Array<CaliCases>): [string, string] {
    const startDate = rows[0].date;
    const endDate = rows[rows.length - 1].date;
    return [startDate, endDate];
  }
}
