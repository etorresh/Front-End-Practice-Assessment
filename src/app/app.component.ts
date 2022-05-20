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

  constructor(private weather: WeatherService) {}

  ngOnInit() {
    this.weather.getCurrentWeatherData("calgary").subscribe(res => {
      console.log(res);
      console.log(res.weather)
      const dailyData: DailyData = {
        backgroundColor: "white",
        // backgroundColor: "#dddddd",
        day: this.dayOfWeekAsString(this.date.getDay()),
        max: String(res.main.temp_max),
        min: String(res.main.temp_min),
        icon: `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
      }
      this.weeklyData.push(dailyData);
    })
  }

  dayOfWeekAsString(dayIndex: number) {
    return ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex].substring(0, 3);
  }
}
