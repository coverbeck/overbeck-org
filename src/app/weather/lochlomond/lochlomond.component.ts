import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { ILochLomondData } from '../../shared/models/model';

@Component({
  selector: 'app-lochlomond',
  templateUrl: './lochlomond.component.html',
  styleUrls: ['./lochlomond.component.scss']
})
export class LochlomondComponent implements OnInit {
  lineChartData: ChartDataSets[];
  labels: string[];
  lastChecked: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<Array<ILochLomondData>>('/api/lochlomond')
      .subscribe(levels => {
        this.lineChartData = [
          {
            data: levels.map(l => l.percentFull),
            label: 'Reservoir Level',
            fill: true
          }
        ];
        this.labels = levels.map(l => l.recordingDate);
        this.lastChecked = this.labels[this.labels.length - 1];
      });
  }

}
