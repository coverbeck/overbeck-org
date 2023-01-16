export interface ILochLomondData {
  recordingDate: string;
  percentFull: number;
  createdDate: string;
}

export interface IUSHouseDataSlim {
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

export interface IUSHouseSummary {
  year: number;
  democratSeats: number;
  republicanSeats: number;
  independentSeats: number;
  democratVotes: number;
  republicanVotes: number;
  independentVotes: number;
}

export interface IWeatherData {
  outdoorTemp: number;
  indoorTemp: number;
  windDirection: number;
  windSpeedMph: number;
  hourlyRain: number;
  eventRain: number;
  dailyRain: number;
  date: string;
}
