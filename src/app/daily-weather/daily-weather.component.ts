import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../weather.service";

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.css']
})
export class DailyWeatherComponent implements OnInit {

  constructor(private weather: WeatherService) { }
  ngOnInit(): void {
    console.log(this.weather.getCurrentWeatherData("calgary").subscribe(res => {
      console.log(res);
    }));
    console.log(this.weather.getFiveDayForecast("calgary").subscribe(res => {
      console.log(res);
    }));
  }

}
