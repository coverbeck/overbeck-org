import { Injectable } from '@angular/core';

export interface HouseData {
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

export interface HouseSummaryData {
  year: number;
  democratSeats: number;
  republicanSeats: number;
  independentSeats: number;
  democratVotes: number;
  republicanVotes: number;
  independentVotes: number;
}

export interface HouseSummaryDataPlus extends HouseSummaryData {
  democratSeatsPercent: number;
  republicanSeatsPercent: number;
  independentSeatsPercent: number;
  democratVotesPercent: number;
  republicanVotesPercent: number;
  independentVotesPercent: number;
}

@Injectable({
  providedIn: 'root'
})
export class ElectionsService {

  constructor() { }

  public groupHouseDataByYear(houseData: HouseData[]) {
    return houseData.reduce((acc , currentValue) => {
      const key = currentValue.year.toString();
      if (!acc.get(key)) {
        acc.set(key, []);
      }
      acc.get(key).push(currentValue);
      return acc;
    }, new Map<string, HouseData[]>());
  }

  public extendHouseData(houseSummaryData: HouseSummaryData[]): HouseSummaryDataPlus[] {
    return houseSummaryData
      .map(row => {
        const totalVotes = row.democratVotes + row.republicanVotes + row.independentVotes;
        return {
          year: row.year,
          democratSeats: row.democratSeats,
          republicanSeats: row.republicanSeats,
          independentSeats: row.independentSeats,
          democratVotes: row.democratVotes,
          republicanVotes: row.republicanVotes,
          independentVotes: row.independentVotes,
          democratSeatsPercent: row.democratSeats * 100.0 / 435,
          republicanSeatsPercent: row.republicanSeats * 100.0 / 435,
          independentSeatsPercent: row.independentSeats * 100.0 / 435,
          democratVotesPercent: row.democratVotes * 100.0 / totalVotes,
          republicanVotesPercent: row.republicanVotes * 100.0 / totalVotes,
          independentVotesPercent: row.independentVotes * 100.0 / totalVotes
        };
      });
  }
}
