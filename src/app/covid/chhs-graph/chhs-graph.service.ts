import { Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { CovidRow } from '../../shared/models/CovidRow';

export class StateData {
  confirmed: number;
  deaths: number;
  positivePatients: number;
  suspectedPatients: number;
  icuPositivePatients: number;
  icuSuspectedPatients: number;

  constructor(covidRow: CovidRow) {
    this.confirmed = Number(covidRow['Total Count Confirmed']);
    this.deaths = Number(covidRow['Total Count Deaths']);
    this.positivePatients = Number(covidRow['COVID-19 Positive Patients']);
    this.suspectedPatients = Number(covidRow['Suspected COVID-19 Positive Patients']);
    this.icuPositivePatients = Number(covidRow['ICU COVID-19 Positive Patients']);
    this.icuSuspectedPatients = Number(covidRow['ICU COVID-19 Suspected Patients']);
  }
}

@Injectable({
  providedIn: 'root'
})

export class ChhsGraphService {

  constructor() { }

  public cumulativeCasesByDay(rows: Array<CovidRow>, county: string): ChartDataSets {
    const countyRows = rows.filter(row => row['County Name'] === county);
    return {
          data: countyRows.map(row => row['Total Count Confirmed']).map(countStr => Number(countStr)),
          label: countyRows[0]['County Name'],
          fill: false,
        };
      }

  public newCasesByDay(rows: Array<CovidRow>, county: string): ChartDataSets[] {
    const countyRows = rows.filter(row => row['County Name'] === county);
    return this.casesByDay(countyRows);
  }

  public casesByDay(rows: CovidRow[]) {
    const newCases = this.newCases(rows);
    return this.chartDataForArray(newCases);
  }

  public chartDataForArray(newCases: Array<number>) {
    return [{
      data: newCases,
      label: 'New Cases',
    },
      {
        data: this.movingAverage(newCases, 5),
        label: '5 Day Moving Average',
        type: 'line',
        fill: false,
      },
      // {
      //   data: this.movingAverage(newCases, 3),
      //   label: "3 Day Moving Average",
      //   type: "line",
      //   fill: false,
      // }
      ];
  }

  public newCases(rows: CovidRow[]): Array<number> {
    return rows.map((val, index, arr) => {
      const cases = Number(val['Total Count Confirmed']);
      if (index === 0) {
        return 0;
      } else {
        return cases - Number(arr[index - 1]['Total Count Confirmed']);
      }
    }).slice(1);
  }

  public stateCumulativeCasesByDay(rows: Array<CovidRow>): ChartDataSets {
    const data = this.rawData(rows);
    return {
      data,
      label: 'California',
      fill: false
    };
  }

  public differences(numbers: Array<number>): Array<number> {
    return numbers.map((val, index, arr) => {
      if (!index) {
        return 0;
      } else {
        return val - arr[index - 1];
      }
    });
  }

  public rawData(rows: Array<CovidRow>) {
    const data = [];
    let acc = 0;
    let date = null;
    for (const row of rows) {
      if (row['Most Recent Date'] !== date) {
        if (date) {
          data.push(acc);
          acc = 0;
        }
        date = row['Most Recent Date'];
      }
      acc = acc + Number(row['Total Count Confirmed']);
    }
    data.push(acc);
    return data;
  }

  public movingAverage(numbers: Array<number>, window: number): Array<number> {
    const result = [];
    // only works with odd numbers
    const  offset = Math.floor(window / 2);
    for (let i = 0; i < numbers.length; i++) {
      if ((i < window - 1 - offset) || (i > numbers.length - offset - 1)) {
        result.push(null);
      } else {
        result.push(numbers.slice(i - offset, i + 1 + offset).reduce((acc, val) => acc + val) / window);
      }
    }
    return result;
  }

  public totalCasesByCounty(rows: Array<CovidRow>, max = 20): Array<CovidRow> {
    const map = new Map<string, CovidRow>();
    rows.forEach(row => map.set(row['County Name'], row));
    const values: IterableIterator<CovidRow> = map.values();
    const ret = new Array<CovidRow>();
    let val = values.next();
    while (!val.done) {
      ret.push(val.value);
      val = values.next();
    }
    ret.sort((a, b) => Number(b['Total Count Confirmed']) - Number(a['Total Count Confirmed']));
    return ret.slice(0, max);
  }
}
