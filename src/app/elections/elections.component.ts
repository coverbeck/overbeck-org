import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<HouseData[]>('/api/elections/house')
      .pipe(
      )
      .subscribe(resp => {
        console.log(resp);
      });
  }

}
