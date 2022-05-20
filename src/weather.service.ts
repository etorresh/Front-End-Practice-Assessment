import { Injectable } from '@angular/core';
import { environment } from "./environments/environment";
import { HttpClient } from "@angular/common/http";
import {CurrentWeather} from "./interfaces/current-weather";
import {ForecastWeather} from "./interfaces/forecast-weather";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}
  getCurrentWeatherData(city: string) {
    return this.http.get<CurrentWeather>(`${environment.weatherApiUrl}/weather?q=${city}&units=metric&appid=${environment.weatherApiKey}`);
  }
  getFiveDayForecast(city: string) {
    return this.http.get<ForecastWeather>(`${environment.weatherApiUrl}/forecast?q=${city}&units=metric&appid=${environment.weatherApiKey}`);
  }
}
