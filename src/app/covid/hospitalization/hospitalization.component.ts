import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HospitalData } from '../../shared/models/cali-model';
import { HospitalizationService } from './hospitalization.service';

@Component({
  selector: 'app-hospitalization',
  templateUrl: './hospitalization.component.html',
  styleUrls: ['./hospitalization.component.scss']
})
export class HospitalizationComponent implements OnInit, OnChanges {

  @Input()
  public data: HospitalData[] = [];

  public bedsByCounty: ChartDataSets[] = [];
  public bedsByCountyLabels: Label[];

  constructor(private hospitalizationService: HospitalizationService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.length) {
      const hospitalData = this.data
        .filter(r => r.county === 'Santa Cruz')
        .filter(r => r.all_hospital_beds);
      this.bedsByCountyLabels = this.hospitalizationService.bedsLabels(hospitalData);
      this.bedsByCounty = this.hospitalizationService.beds(hospitalData);
    }
  }

}
