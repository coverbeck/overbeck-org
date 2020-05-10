import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core"
import { ChartDataSets, ChartOptions, ChartType } from "chart.js"
import { Color, Label } from "ng2-charts"
import { CovidRow } from "../../shared/models/CovidRow"
import { CovidChart } from "../covid.component"
import { ChhsGraphService } from "./chhs-graph.service"

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
  @Input()
  public county: string
  @Input()
  public title: string;

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
      this.lineChartOptions.title.text = this.title;
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
          this.lineChartData = counties.map(county => this.chhsGraphService.cumulativeCasesByDay(this.data, county));
          break;
        case CovidChart.CasesByDay:
          this.lineChartData = this.chhsGraphService.newCasesByDay(this.data, this.county);
          this.lineChartType = "bar";
          break;
        case CovidChart.StateTotalCases:
          this.lineChartData = [this.chhsGraphService.stateCumulativeCasesByDay(this.data)];
          break;
        case CovidChart.StateCasesByDay:
          this.lineChartData = this.chhsGraphService.chartDataForArray(this.chhsGraphService.differences(this.chhsGraphService.rawData(this.data)))
          this.lineChartType = "bar";

      }
      this.lineChartLabels = this.data.filter(row => row["County Name"] === counties[0]).map(row => row["Most Recent Date"]);
    }
  }

}
