import { Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HospitalData } from '../../shared/models/cali-model';

@Injectable({
  providedIn: 'root'
})
export class HospitalizationService {

  constructor() { }

  public beds(hospitalData: Array<HospitalData>): ChartDataSets[] {
    return [
      // {
      //   data: hospitalData.map(r => r.all_hospital_beds),
      //   label: 'Total beds',
      //   fill: false
      // },
      {
        data: hospitalData.map(r => r.hospitalized_covid_confirmed_patients),
        label: 'Confirmed COVID patient beds',
        fill: false
      },
      {
        data: hospitalData.map(r => r.hospitalized_suspected_covid_patients),
        label: 'Suspected COVID patient beds',
        fill: false
      },
      {
        data: hospitalData.map(r => r.icu_covid_confirmed_patients),
        label: 'Confirmed ICU COVID beds',
        fill: false
      },
      {
        data: hospitalData.map(r => r.icu_available_beds),
        label: 'ICU Available Beds',
        fill: false
      }
    ];
  }

  public bedsLabels(hospitalData: Array<HospitalData>): Label[] {
    return hospitalData.map(r => r.todays_date);
  }

  public aggregateBedsByDay(hospitalData: Array<HospitalData>): Array<HospitalData> {
    const sortedRows = [...hospitalData];
    sortedRows.sort((a, b) => a.todays_date.localeCompare(b.todays_date));
    const aggregate: Array<HospitalData> = [];
    let date = null;
    let acc: HospitalData = this.newHospitalData();
    for (const row of sortedRows) {
      if (row.todays_date !== date) {
        if (date) {
          aggregate.push(acc);
          acc = this.newHospitalData();
        }
        date = row.todays_date;
      }
      acc.todays_date = row.todays_date;
      acc.icu_available_beds += row.icu_available_beds;
      acc.icu_covid_confirmed_patients += row.icu_covid_confirmed_patients;
      acc.all_hospital_beds += row.all_hospital_beds;
      acc.hospitalized_covid_confirmed_patients += row.hospitalized_covid_confirmed_patients;
      acc.hospitalized_suspected_covid_patients += row.hospitalized_suspected_covid_patients;
    }
    return aggregate;
  }

  private newHospitalData(): HospitalData {
    const hospitalData = new HospitalData();
    hospitalData.hospitalized_covid_confirmed_patients = 0;
    hospitalData.all_hospital_beds = 0;
    hospitalData.icu_covid_confirmed_patients = 0;
    hospitalData.icu_available_beds = 0;
    hospitalData.hospitalized_covid_patients = 0;
    hospitalData.icu_suspected_covid_patients = 0;
    hospitalData.hospitalized_suspected_covid_patients = 0;
    return hospitalData;
}
}
