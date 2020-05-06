import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core"
import { ChartDataSets, ChartOptions, ChartType } from "chart.js"
import { Color, Label } from "ng2-charts"
import { CovidRow } from "../covid/covid.component"
import { ChhsGraphService } from "./chhs-graph.service"

export enum CovidChart {
  TotalCases,
  CasesByDay
}
@Component({
  selector: 'app-chhs-graph',
  templateUrl: './chhs-graph.component.html',
  styleUrls: ['./chhs-graph.component.scss']
})
export class ChhsGraphComponent implements OnInit, OnChanges {

  @Input()
  public data: CovidRow[] = [];
  @Input()
  public chartType: CovidChart;

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: "Total Cases by County"
    }
  };
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
      const counties = [
        "Los Angeles",
        "Monterey",
        "San Diego",
        "Santa Clara",
        "Santa Cruz",
        "San Francisco"
      ];
      switch (this.chartType) {
        case CovidChart.TotalCases:
          this.lineChartData = counties.map(county => this.chhsGraphService.casesByDay(this.data, county));
          this.lineChartOptions.title.text = "Total Cases by County"
          break;
        case CovidChart.CasesByDay:
          this.lineChartData = counties.map(county => this.chhsGraphService.newCasesByDay(this.data, county));
          this.lineChartOptions.title.text = "New Cases by County"
          break;
      }
      this.lineChartLabels = this.data.filter(row => row["County Name"] === counties[0]).map(row => row["Most Recent Date"]);
    }
  }

}
