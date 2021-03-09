import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IWeatherData } from '../shared/models/model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weatherData: IWeatherData;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<IWeatherData>('/api/weather')
      .subscribe(data => {
        this.weatherData = data;
      });
  }

}
