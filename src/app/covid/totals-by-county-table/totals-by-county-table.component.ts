import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CovidRow } from '../../shared/models/CovidRow';
import { ChhsGraphService } from '../chhs-graph/chhs-graph.service';

interface CountyData {
  county: string;
  total: number;
  totalPer100K: number;
}

@Component({
  selector: 'app-totals-by-county-table',
  templateUrl: './totals-by-county-table.component.html',
  styleUrls: ['./totals-by-county-table.component.scss']
})
export class TotalsByCountyTableComponent implements OnInit, OnChanges {

  @Input()
  public data: Array<CovidRow>;
  dataSource: MatTableDataSource<CountyData>;
  displayedColumns: string[] = ['county', 'total', 'totalPer100K'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private chhsGraphService: ChhsGraphService) {
    this.dataSource = new MatTableDataSource<CountyData>([]);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.data.length) {
      // Yeah, unnecessary step into chartDataSets.
      const covidRows = this.chhsGraphService.totalCasesByCounty(this.data, 75);
      this.dataSource.data = covidRows.map(row => {
        return {
          county: row['County Name'],
          total: Number(row['Total Count Confirmed']),
          totalPer100K: this.chhsGraphService.casesPerHundredThousand([row], row['County Name'])
        };
      });
      this.dataSource.sort = this.sort;
    }
  }

}
