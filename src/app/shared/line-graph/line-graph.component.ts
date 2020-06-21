import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CovidTrackingRow } from '../models/covid-tracking-row';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit, OnChanges {

  @Input()
  public data: CovidTrackingRow[] = [];
  @Input()
  public dataTransformer: (data: Array<CovidTrackingRow>)  => [ChartDataSets[], Label[]];
  @Input()
  public title: string;

  public lineChartData: ChartDataSets[] = [{
    data: [1, 2, 3],
    label: 'Testing'
  }];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = { };

  public lineChartColors: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;

  constructor() { }

  ngOnInit(): void {
  this.lineChartOptions = {
      responsive: true,
      title: {
        display: true,
        text: this.title
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataTransformer(this.data);
    [this.lineChartData, this.lineChartLabels] = this.dataTransformer(this.data);
  }
}
