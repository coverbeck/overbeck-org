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

// From https://www.census.gov/content/census/en/search-results.html?stateGeo=none&q=california%20population%20ca&searchtype=web&page=1
const caCounties = [
  {
    County: 'Alameda',
    Population: 1671329
  },
  {
    County: 'Alpine',
    Population: 1129
  },
  {
    County: 'Amador',
    Population: 39752
  },
  {
    County: 'Butte',
    Population: 219186
  },
  {
    County: 'Calaveras',
    Population: 45905
  },
  {
    County: 'Colusa',
    Population: 21547
  },
  {
    County: 'Contra Costa',
    Population: 1153526
  },
  {
    County: 'Del Norte',
    Population: 27812
  },
  {
    County: 'El Dorado',
    Population: 192843
  },
  {
    County: 'Fresno',
    Population: 999101
  },
  {
    County: 'Glenn',
    Population: 28393
  },
  {
    County: 'Humboldt',
    Population: 135558
  },
  {
    County: 'Imperial',
    Population: 181215
  },
  {
    County: 'Inyo',
    Population: 18039
  },
  {
    County: 'Kern',
    Population: 900202
  },
  {
    County: 'Kings',
    Population: 152940
  },
  {
    County: 'Lake',
    Population: 64386
  },
  {
    County: 'Lassen',
    Population: 30573
  },
  {
    County: 'Los Angeles',
    Population: 10039107
  },
  {
    County: 'Madera',
    Population: 157327
  },
  {
    County: 'Marin',
    Population: 258826
  },
  {
    County: 'Mariposa',
    Population: 17203
  },
  {
    County: 'Mendocino',
    Population: 86749
  },
  {
    County: 'Merced',
    Population: 277680
  },
  {
    County: 'Modoc',
    Population: 8841
  },
  {
    County: 'Mono',
    Population: 14444
  },
  {
    County: 'Monterey',
    Population: 434061
  },
  {
    County: 'Napa',
    Population: 137744
  },
  {
    County: 'Nevada',
    Population: 99755
  },
  {
    County: 'Orange',
    Population: 3175692
  },
  {
    County: 'Placer',
    Population: 398329
  },
  {
    County: 'Plumas',
    Population: 18807
  },
  {
    County: 'Riverside',
    Population: 2470546
  },
  {
    County: 'Sacramento',
    Population: 1552058
  },
  {
    County: 'San Benito',
    Population: 62808
  },
  {
    County: 'San Bernardino',
    Population: 2180085
  },
  {
    County: 'San Diego',
    Population: 3338330
  },
  {
    County: 'San Francisco',
    Population: 881549
  },
  {
    County: 'San Joaquin',
    Population: 762148
  },
  {
    County: 'San Luis Obispo',
    Population: 283111
  },
  {
    County: 'San Mateo',
    Population: 766573
  },
  {
    County: 'Santa Barbara',
    Population: 446499
  },
  {
    County: 'Santa Clara',
    Population: 1927852
  },
  {
    County: 'Santa Cruz',
    Population: 273213
  },
  {
    County: 'Shasta',
    Population: 180080
  },
  {
    County: 'Sierra',
    Population: 3005
  },
  {
    County: 'Siskiyou',
    Population: 43539
  },
  {
    County: 'Solano',
    Population: 447643
  },
  {
    County: 'Sonoma',
    Population: 494336
  },
  {
    County: 'Stanislaus',
    Population: 550660
  },
  {
    County: 'Sutter',
    Population: 96971
  },
  {
    County: 'Tehama',
    Population: 65084
  },
  {
    County: 'Trinity',
    Population: 12285
  },
  {
    County: 'Tulare',
    Population: 466195
  },
  {
    County: 'Tuolumne',
    Population: 54478
  },
  {
    County: 'Ventura',
    Population: 846006
  },
  {
    County: 'Yolo',
    Population: 220500
  }
];


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

  public countyNames() {
    return caCounties.map(c => c.County);
  }

  public newCasesByDay(rows: Array<CovidRow>, metric: 'Total Count Confirmed' | 'Total Count Deaths',
                       counties: Array<string> | null = null): ChartDataSets[] {
    const countyRows = rows.filter(row => !counties || counties.some(county => row['County Name'] === county));
    const newCases = this.differences(this.rawData(countyRows, metric));
    return this.chartDataForArray(newCases, metric);
  }


  public chartDataForArray(newCases: Array<number>, metric: 'Total Count Confirmed' | 'Total Count Deaths') {
    return [{
      data: newCases,
      label: metric === 'Total Count Confirmed' ? 'New Cases' : 'Deaths',
    },
      {
        data: this.movingAverage(newCases, 5),
        label: '5 Day Moving Average',
        type: 'line',
        fill: false,
      }];
  }

  public stateCumulativeCasesByDay(rows: Array<CovidRow>): ChartDataSets {
    const data = this.rawData(rows, 'Total Count Confirmed');
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
    }).slice(1);
  }

  public rawData(rows: Array<CovidRow>, metric: 'Total Count Confirmed' | 'Total Count Deaths') {
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
      acc = acc + Number(row[metric]);
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

  public casesPerHundredThousand(rows: Array<CovidRow>, county: string): number {
    const rowsForCounty = rows.filter(row => row['County Name'] === county);
    const cases = Number(rowsForCounty[rowsForCounty.length - 1]['Total Count Confirmed']);
    const info = caCounties.find(c => c.County === county);
    if (!info) {
      return 0;
    }
    const population = info.Population;
    return (cases * 100000 / population);
  }
}
