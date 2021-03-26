import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CaliCases } from '../../shared/models/cali-model';
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
  public data: Array<CaliCases>;
  dataSource: MatTableDataSource<CountyData>;
  displayedColumns: string[] = ['index', 'county', 'total', 'totalPer100K', 'population'];
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
          county: row.area,
          total: Number(row.totalcountconfirmed),
          totalPer100K: this.chhsGraphService.casesPerHundredThousand([row], row.area),
          population: this.chhsGraphService.population(row.area)
        };
      });
      this.dataSource.sort = this.sort;
    }
  }

}
