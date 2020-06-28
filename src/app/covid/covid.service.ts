import { Injectable } from '@angular/core';
import { CaliCases } from '../shared/models/cali-cases';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor() { }

  public dateRange(rows: Array<CaliCases>): [string, string] {
    const sortedRows = [...rows];
    sortedRows.sort((a, b) => a.date.localeCompare(b.date));
    const startDate = sortedRows[0].date;
    const endDate = sortedRows[sortedRows.length - 1].date;
    return [startDate, endDate];
  }
}
