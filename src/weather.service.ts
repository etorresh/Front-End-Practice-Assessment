import { Injectable } from '@angular/core';
import { environment } from "./environments/environment";
import { HttpClient } from "@angular/common/http";
import {CurrentWeather} from "./interfaces/current-weather";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}
  getCurrentWeatherData(city: string) {
    return this.http.get<CurrentWeather>(`${environment.weatherApiUrl}/weather?q=${city}&appid=${environment.weatherApiKey}`);
  }
}
