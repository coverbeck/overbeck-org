import { Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HospitalData } from '../../shared/models/cali-model';

@Injectable({
  providedIn: 'root'
})
export class HospitalizationService {

  constructor() { }

  public  beds(hospitalData: Array<HospitalData>): ChartDataSets[] {
    return [
      {
        data: hospitalData.map(r => r.all_hospital_beds),
        label: 'Total beds',
        fill: false
      },
      {
        data: hospitalData.map(r => r.hospitalized_covid_confirmed_patients),
        label: 'Confirmed COVID patient beds',
        fill: false
      }
    ];
  }

  public bedsLabels(hospitalData: Array<HospitalData>): Label[] {
    return hospitalData.map(r => r.todays_date);
  }
}
