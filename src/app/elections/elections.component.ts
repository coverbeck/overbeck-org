import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ElectionsService, HouseSummaryData, HouseSummaryDataPlus } from './elections.service';


@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss'],
})
export class ElectionsComponent implements OnInit {


  dataSource: MatTableDataSource<HouseSummaryData> = new MatTableDataSource<HouseSummaryDataPlus>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  labels: Label[];
  graphData: ChartDataSets[];

  readonly displayedColumns: string[] = ['year', 'democratSeats', 'democratVotes',
    'republicanSeats', 'republicanVotes', 'independentSeats', 'independentVotes'];

  constructor(private httpClient: HttpClient, private electionsService: ElectionsService) {
  }

  ngOnInit(): void {
    this.httpClient.get<HouseSummaryData[]>('/api/elections/house?summary=true')
      .subscribe(resp => {
        const extendHouseData = this.electionsService.extendHouseData(resp);
        this.dataSource.data = extendHouseData;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.firstPage();
        this.labels = resp.map(r => r.year + '');
        this.graphData = [
          {
            data: extendHouseData.map(r => r.republicanVotesPercent),
            label: 'Republican Vote Percentage',
            fill: false
          }, {
           data: extendHouseData.map(r => r.democratVotesPercent),
           label: 'Democrat Vote Percentage',
           fill: false
          },
          {
            data: extendHouseData.map(r => r.republicanSeatsPercent),
            label: 'Republican Percentage Seats',
            fill: false
          }, {
            data: extendHouseData.map(r => r.democratSeatsPercent),
            label: 'Democrat Percentage Seats',
            fill: false
          }
        ];
      });
  }

}
