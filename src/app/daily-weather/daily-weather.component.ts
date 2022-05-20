import {Component, Input } from '@angular/core';
import {DailyData} from "../../interfaces/daily-data";

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.css']
})
export class DailyWeatherComponent {
  @Input() data!: DailyData;
}
