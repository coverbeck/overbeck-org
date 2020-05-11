import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { CovidRow } from '../../shared/models/CovidRow';
import { ChhsGraphService } from '../chhs-graph/chhs-graph.service';
import { CovidChart } from '../covid.component';

@Component({
  selector: 'app-chhs-horz-bar-graph',
  templateUrl: './chhs-horz-bar-graph.component.html',
  styleUrls: ['./chhs-horz-bar-graph.component.scss']
})
export class ChhsHorzBarGraphComponent implements OnInit, OnChanges {

  @Input()
  public data: CovidRow[] = [];
  @Input()
  public chartType: CovidChart;
  @Input()
  public county: string;
  @Input()
  public title: string;

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Top California 30 Counties with Cases, out of 58'
    }
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'horizontalBar';
  public lineChartPlugins = [];

  constructor(private chhsGraphService: ChhsGraphService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.length) {
      const covidRows = this.chhsGraphService.totalCasesByCounty(this.data, 30);
      this.lineChartData = [
        {
          data: covidRows.map(row => Number(row['Total Count Confirmed'])),
          label: 'Total Confimed Cases'
        }
      ];
      this.lineChartLabels = covidRows.map(row => row['County Name']);
    }
  }

}
