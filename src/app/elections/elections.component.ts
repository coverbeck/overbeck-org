import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

interface HouseData {
  year: number;
  state: string;
  district: number;
  democrat: number;
  republican: number;
  other: number;
  total: number;
  winningParty: string;
  winningVotes: number;
  winningCandidate: string;
}


@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss']
})
export class ElectionsComponent implements OnInit {


  dataSource: MatTableDataSource<HouseData> = new MatTableDataSource<HouseData>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['year', 'state', 'district', 'winningParty', 'winningVotes'];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.httpClient.get<HouseData[]>('/api/elections/house')
      .subscribe(resp => {
        this.dataSource.data = resp;
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.firstPage();
      });
  }

}
