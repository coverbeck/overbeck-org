import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CaliCases } from '../../shared/models/cali-cases';
import { CovidChart } from '../covid.component';
import { ChhsGraphService } from './chhs-graph.service';

@Component({
  selector: 'app-chhs-graph',
  templateUrl: './chhs-graph.component.html',
  styleUrls: ['./chhs-graph.component.scss']
})
export class ChhsGraphComponent implements OnInit, OnChanges {

  @Input()
  public data: CaliCases[] = [];
  @Input()
  public chartType: CovidChart;
  @Input()
  public counties: Array<string>;
  @Input()
  public title: string;
  @Input()
  public metric: 'totalcountconfirmed' | 'totalcountdeaths';

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = { };

  public lineChartColors: Color[] = [
    {
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private chhsGraphService: ChhsGraphService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.length) {
      this.lineChartOptions = this.chartOptions(this.title);
      switch (this.chartType) {
        case CovidChart.CasesByDay:
          this.lineChartData = this.chhsGraphService.newCasesByDay(this.data, this.metric, this.counties);
          this.lineChartType = 'bar';
          break;
        case CovidChart.StateCasesByDay:
          this.lineChartData = this.chhsGraphService.newCasesByDay(this.data, this.metric);
          this.lineChartType = 'bar';

      }
      const firstCounty = this.data[0].county;
      this.lineChartLabels = this.data.filter(row => row.county === firstCounty).map(row => row.date);

      // If we're getting the differences, we don't have the diff for the very first date
      if (this.chartType === CovidChart.CasesByDay || this.chartType === CovidChart.StateCasesByDay) {
        this.lineChartLabels = this.lineChartLabels.slice(1);
      }
    }
  }

  private chartOptions(title: string): ChartOptions {
    return {
      responsive: true,
      title: {
        display: true,
        text: title
      }
    };
  }

}
