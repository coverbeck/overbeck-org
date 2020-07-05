import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {

  @Input()
  public lineChartData: ChartDataSets[] = [{
    data: [1, 2, 3],
    label: 'Testing'
  }];
  @Input()
  public lineChartLabels: Label[] = [];
  @Input()
  public title: string;

  public lineChartOptions: ChartOptions = {};

  public lineChartColors: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;

  constructor() {
  }

  ngOnInit(): void {
    this.lineChartOptions = {
      responsive: true,
      title: {
        display: true,
        text: this.title
      }
    };
  }

}
