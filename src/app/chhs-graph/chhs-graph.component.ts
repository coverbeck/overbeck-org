import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core"
import { ChartDataSets, ChartOptions, ChartType } from "chart.js"
import { Color, Label } from "ng2-charts"
import { CovidRow } from "../covid/covid.component"

@Component({
  selector: 'app-santa-cruz-covid',
  templateUrl: './chhs-graph.component.html',
  styleUrls: ['./chhs-graph.component.scss']
})
export class ChhsGraphComponent implements OnInit, OnChanges {

  @Input()
  public data: CovidRow[] = [];

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

  constructor() { }

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
      this.lineChartData = counties.map(county => this.data
        .filter(row => row["County Name"] === county))
        .map(covidRows => {
          return {
            data: covidRows.map(row => row["Total Count Confirmed"]).map(count => parseInt(count)),
            label: covidRows[0]["County Name"],
            fill: false,
          }
        });
      this.lineChartLabels = this.data.filter(row => row["County Name"] === counties[0]).map(row => row["Most Recent Date"]);
    }
  }

}
