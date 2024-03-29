import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { CaliCases } from '../../shared/models/cali-model';
import { ChhsGraphService } from '../chhs-graph/chhs-graph.service';
import { CovidChart } from '../covid.component';

@Component({
  selector: 'app-chhs-horz-bar-graph',
  templateUrl: './chhs-horz-bar-graph.component.html',
  styleUrls: ['./chhs-horz-bar-graph.component.scss']
})
export class ChhsHorzBarGraphComponent implements OnInit, OnChanges {

  @Input()
  public data: CaliCases[] = [];
  @Input()
  public chartType: CovidChart;
  @Input()
  public county: string;
  @Input()
  public title: string;
  @Input()
  public popAdjusted = false;

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Total Confirmed Cases by County'
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
      const covidRows = this.chhsGraphService.totalCasesByCounty(this.data.filter(r => r.area !== 'California'), 300);
      if (this.popAdjusted) {
        // TODO: Way ugly calculating cases per hundred thousand twice, forcing
        // it to be passed in as an array
        this.lineChartOptions.title.text = 'Total Confirmed Cases by County per 100,000';
        this.lineChartData = [
          {
            data: covidRows
              .filter(row => row.area !== 'California')
              .map(row => this.chhsGraphService
              .casesPerHundredThousand([row], row.area))
              .sort((a, b) => b - a),
            label: 'Cases per 100,000'
          }
        ];
        this.lineChartLabels = covidRows
          .sort((a, b) => {
            return this.chhsGraphService.casesPerHundredThousand([b], b.area) -
              this.chhsGraphService.casesPerHundredThousand([a], a.area);
          })
          .map(row => row.area);
      } else {
        this.lineChartData = [
          {
            data: covidRows.map(row => Number(row.cumulative_cases)),
            label: 'Total Confirmed Cases'
          }
        ];
        this.lineChartLabels = covidRows.map(row => row.area);
      }
    }
  }

}
