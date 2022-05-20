import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../weather.service";
import {DailyData} from "../interfaces/daily-data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather';
  weeklyData: DailyData[] = [];
  date = new Date();
  loaded = false;

  constructor(private weather: WeatherService) {}

  ngOnInit() {
    this.weather.getLocationLoaded().subscribe(value => {
      if(value) {
        this.weather.getCurrentWeatherData().subscribe(currentWeather => {
          const dailyData: DailyData = {
            backgroundColor: "#dddddd",
            time: String(this.date.toLocaleString('en-US', { hour: 'numeric', hour12: true})),
            max: String(currentWeather.main.temp_max),
            min: String(currentWeather.main.temp_min),
            icon: `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`
          }
          this.weeklyData.push(dailyData);
          // OpenWeatherMap doesn't offer daily forecasts for free. I'll use the 5 day forecast with 3 hour intervals.
          this.weather.getFiveDayForecast().subscribe(forecast => {
            for(let weather of forecast.list) {
              this.date.setTime(weather.dt * 1000);
              const dailyData: DailyData = {
                backgroundColor: "white",
                time: String(this.date.toLocaleString('en-US', { hour: 'numeric', hour12: true})),
                max: String(weather.main.temp_max),
                min: String(weather.main.temp_min),
                icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
              }
              this.weeklyData.push(dailyData);
            }
            this.loaded = true;
          });
        });
      }
    })
  }
}
