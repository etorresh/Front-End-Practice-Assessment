import {Injectable} from "@angular/core";
import { environment } from "./environments/environment";
import { HttpClient } from "@angular/common/http";
import {CurrentWeather} from "./interfaces/current-weather";
import {ForecastWeather} from "./interfaces/forecast-weather";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  lat = 51.049999;
  lon = -114.066666;
  constructor(private http: HttpClient) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
      });
    }
  }
  getCurrentWeatherData() {
    return this.http.get<CurrentWeather>(`${environment.weatherApiUrl}/weather?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${environment.weatherApiKey}`);
  }
  getFiveDayForecast() {
    return this.http.get<ForecastWeather>(`${environment.weatherApiUrl}/forecast?lat=${this.lat}&lon=${this.lon}&cnt=4&units=metric&appid=${environment.weatherApiKey}`);
  }
}
