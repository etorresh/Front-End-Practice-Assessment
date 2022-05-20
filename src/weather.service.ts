import {Injectable} from "@angular/core";
import { environment } from "./environments/environment";
import { HttpClient } from "@angular/common/http";
import {CurrentWeather} from "./interfaces/current-weather";
import {ForecastWeather} from "./interfaces/forecast-weather";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  lat = 51.049999;
  lon = -114.066666;
  private locationLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        this.locationLoaded.next(true);
      }, () => {
        this.lat = 51.049999;
        this.lon = -114.066666;
        this.locationLoaded.next(true);
      });
    }
  }
  getCurrentWeatherData() {
    return this.http.get<CurrentWeather>(`${environment.weatherApiUrl}/weather?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${environment.weatherApiKey}`);
  }
  getFiveDayForecast() {
    return this.http.get<ForecastWeather>(`${environment.weatherApiUrl}/forecast?lat=${this.lat}&lon=${this.lon}&cnt=4&units=metric&appid=${environment.weatherApiKey}`);
  }
  getLocationLoaded(): Observable<boolean> {
    return this.locationLoaded.asObservable();
  }
}
