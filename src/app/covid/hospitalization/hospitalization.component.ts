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

  public santaCruzBeds: ChartDataSets[] = [];
  public santaCruzBedsLabels: Label[];
  public californiaBeds: ChartDataSets[] = [];
  public californiaBedsLabels: Label[];

  constructor(private hospitalizationService: HospitalizationService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.length) {
      const santaCruzData = this.data
        .filter(r => r.county === 'Santa Cruz')
        .filter(r => r.all_hospital_beds);
      this.santaCruzBedsLabels = this.hospitalizationService.bedsLabels(santaCruzData);
      this.santaCruzBeds = this.hospitalizationService.beds(santaCruzData);
      const agg = this.hospitalizationService.aggregateBedsByDay(this.data);
      this.californiaBeds = this.hospitalizationService.beds(agg);
      this.californiaBedsLabels = this.hospitalizationService.bedsLabels(agg);
    }
  }

}
