import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ElectionsService, HouseSummaryData, HouseSummaryDataPlus } from './elections.service';


@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss'],
})
export class ElectionsComponent implements OnInit {


  dataSource: MatTableDataSource<HouseSummaryData> = new MatTableDataSource<HouseSummaryDataPlus>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  readonly displayedColumns: string[] = ['year', 'democratSeats', 'democratVotes',
    'republicanSeats', 'republicanVotes', 'independentSeats', 'independentVotes'];

  constructor(private httpClient: HttpClient, private electionsService: ElectionsService) {
  }

  ngOnInit(): void {
    this.httpClient.get<HouseSummaryData[]>('/api/elections/house?summary=true')
      .subscribe(resp => {
        this.dataSource.data = this.electionsService.extendHouseData(resp);
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.firstPage();
      });
  }

}
