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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.length) {
      const sortedByDate = this.data.sort((a, b) => a.date - b.date);
      this.lineChartData = [
        {
          data: sortedByDate.map(r => r.total),
          label: 'Total Tests',
          fill: false
        },
        {
          data: sortedByDate.map(r => r.positive),
          label: 'Total Positive',
          fill: false
        },
        {
          data: sortedByDate.map(r => r.negative),
          label: 'Total Negative',
          fill: false
        },
        {
          data: sortedByDate.map(r => r.positive / r.total),
          label: 'Percentage positive tests',
          fill: false
        }
      ];
      this.lineChartLabels = sortedByDate.map(r => r.date + '');
    }
  }

}
